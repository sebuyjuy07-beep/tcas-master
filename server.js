const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./database/db');
const cheatsheets = require('./database/cheatsheets');
const {
    authMiddleware,
    registerUser,
    loginUser,
    getUserProfile,
    getLeaderboard
} = require('./auth');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Disable caching for development so browser always gets the latest code
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
});

// Authentication middleware (attaches req.user from Bearer token, header, or query)
app.use(authMiddleware);

app.use(express.static(path.join(__dirname, 'public'), { etag: false, maxAge: 0 }));

// ==========================================
// 0. User Account & Authentication APIs
// ==========================================

// POST Register
app.post('/api/auth/register', (req, res) => {
    try {
        const { username, password, display_name, avatar_url } = req.body;
        const result = registerUser({ username, password, display_name, avatar_url });
        res.json({ success: true, message: 'สมัครสมาชิกสำเร็จ ยินดีต้อนรับสู่ TCAS Master!', ...result });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
});

// POST Login
app.post('/api/auth/login', (req, res) => {
    try {
        const { username, password } = req.body;
        const result = loginUser({ username, password });
        res.json({ success: true, message: 'เข้าสู่ระบบสำเร็จ!', ...result });
    } catch (err) {
        res.status(401).json({ success: false, error: err.message });
    }
});

// GET Current User Profile & Isolated Stats
app.get('/api/auth/me', (req, res) => {
    try {
        const profile = getUserProfile(req.user.id);
        if (!profile) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }
        res.json({ success: true, user: profile });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// POST Logout
app.post('/api/auth/logout', (req, res) => {
    try {
        if (req.token) {
            db.prepare('DELETE FROM user_auth_tokens WHERE token = ?').run(req.token);
        }
        res.json({ success: true, message: 'ออกจากระบบเรียบร้อยแล้ว' });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// GET Global Leaderboard (Top 20 by Total XP & Scores)
app.get('/api/auth/leaderboard', (req, res) => {
    try {
        const board = getLeaderboard();
        res.json({ success: true, data: board });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// ==========================================
// 1. Subjects & Blueprints APIs
// ==========================================

// GET all subjects with question count, blueprint count, and user mastered count
app.get('/api/subjects', (req, res) => {
    try {
        const userId = req.user ? req.user.id : '';
        const subjects = db.prepare(`
            SELECT s.*, 
                (SELECT COUNT(*) FROM blueprints b WHERE b.subject_id = s.id) as blueprint_count,
                (SELECT COUNT(*) FROM questions q WHERE q.subject_id = s.id) as total_db_questions,
                (SELECT COUNT(*) FROM user_mastered_questions umq JOIN questions q ON umq.question_id = q.id WHERE q.subject_id = s.id AND umq.user_id = ?) as mastered_count
            FROM subjects s
            ORDER BY 
                CASE s.category 
                    WHEN 'TGAT' THEN 1 
                    WHEN 'TPAT' THEN 2 
                    ELSE 3 
                END, s.code ASC
        `).all(userId);

        res.json({ success: true, data: subjects });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// GET subject details with all blueprints and question counts
app.get('/api/subjects/:id', (req, res) => {
    try {
        const subject = db.prepare('SELECT * FROM subjects WHERE id = ?').get(req.params.id);
        if (!subject) {
            return res.status(404).json({ success: false, error: 'Subject not found' });
        }

        const blueprints = db.prepare(`
            SELECT b.*,
                (SELECT COUNT(*) FROM questions q WHERE q.blueprint_id = b.id) as current_question_count
            FROM blueprints b
            WHERE b.subject_id = ?
            ORDER BY b.order_index ASC
        `).all(req.params.id);

        res.json({ success: true, data: { ...subject, blueprints } });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// GET all available exam sets for a subject
app.get('/api/subjects/:id/sets', (req, res) => {
    try {
        const sets = db.prepare(`
            SELECT set_number, count(*) as count 
            FROM questions 
            WHERE subject_id = ? 
            GROUP BY set_number 
            ORDER BY set_number ASC
        `).all(req.params.id);
        res.json({ success: true, data: sets });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// GET Subject Cheat Sheet & Exam Blueprint Guide
app.get('/api/subjects/:id/cheatsheet', (req, res) => {
    try {
        const subject = db.prepare('SELECT id, name_th, name_en, code, category, duration_minutes, total_questions, total_score, status FROM subjects WHERE id = ?').get(req.params.id);
        if (!subject) {
            return res.status(404).json({ success: false, error: 'Subject not found' });
        }

        let sheet = cheatsheets[req.params.id];
        if (!sheet) {
            const bps = db.prepare('SELECT domain_name, subtopic_name, target_questions, score_weight FROM blueprints WHERE subject_id = ? ORDER BY order_index ASC').all(req.params.id);
            const bpHtml = bps.length > 0 ? `
                <div class="cs-section-block">
                    <h4 class="cs-section-header">📊 โครงสร้างสาระสำคัญและสัดส่วนคะแนน (Test Blueprint MyTCAS)</h4>
                    <table class="cheat-table" style="width: 100%; border-collapse: collapse; margin-top: 0.75rem;">
                        <thead>
                            <tr style="border-bottom: 2px solid rgba(255,255,255,0.1); text-align: left; color: #94a3b8; font-size: 0.85rem;">
                                <th style="padding: 0.6rem;">สาระ / โดเมน</th>
                                <th style="padding: 0.6rem;">หัวข้อย่อย</th>
                                <th style="padding: 0.6rem; text-align: center;">จำนวนข้อ</th>
                                <th style="padding: 0.6rem; text-align: center;">สัดส่วน</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${bps.map(b => `
                                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 0.875rem;">
                                    <td style="padding: 0.6rem; font-weight: 600; color: #f8fafc;">${b.domain_name}</td>
                                    <td style="padding: 0.6rem; color: #cbd5e1;">${b.subtopic_name}</td>
                                    <td style="padding: 0.6rem; text-align: center; color: #38bdf8; font-weight: 700;">${b.target_questions}</td>
                                    <td style="padding: 0.6rem; text-align: center; color: #34d399; font-weight: 700;">${b.score_weight}%</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            ` : '';

            sheet = {
                subject_id: subject.id,
                title: `โครงสร้าง & แนวข้อสอบ ${subject.name_th}`,
                badge: `${subject.code} • ${subject.category}`,
                description: subject.description || 'แนวทางการเตรียมตัวสอบและสาระสำคัญตาม Test Blueprint ของ ทปอ.',
                sections: [
                    {
                        title: '📋 รายละเอียดและเกณฑ์การสอบ',
                        content: `
                            <div class="cheat-grid">
                                <div class="cheat-card">
                                    <h4>⏱️ เวลาสอบและจำนวนข้อ</h4>
                                    <ul>
                                        <li><strong>จำนวนข้อสอบ:</strong> ${subject.total_questions} ข้อ</li>
                                        <li><strong>ระยะเวลาสอบ:</strong> ${subject.duration_minutes} นาที (เฉลี่ยข้อละ ${(subject.duration_minutes / subject.total_questions * 60).toFixed(0)} วินาที)</li>
                                        <li><strong>คะแนนเต็ม:</strong> ${subject.total_score} คะแนน</li>
                                    </ul>
                                </div>
                                <div class="cheat-card">
                                    <h4>🎯 คำแนะนำการเตรียมตัว</h4>
                                    <ul>
                                        <li>ทำความคุ้นเคยกับคำศัพท์เฉพาะทางและทฤษฎีพื้นฐาน</li>
                                        <li>ฝึกจับเวลาและวางแผนเลือกทำข้อที่ถนัดก่อน</li>
                                        <li>${subject.status === 'coming_soon' ? '<span style="color:#f87171;">⚠️ วิชานี้อยู่ระหว่างจัดเตรียมคลังข้อสอบคุณภาพสูงตาม Blueprint ปี 68</span>' : 'พร้อมทำข้อสอบจำลองเสมือนจริง'}</li>
                                    </ul>
                                </div>
                            </div>
                            ${bpHtml}
                        `
                    }
                ]
            };
        }

        res.json({ success: true, data: { ...sheet, subject } });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// ==========================================
// 2. Exam Session Management APIs (Per-User)
// ==========================================

// POST start an exam session (Full Mock, Topic Drill, or Mistake Drill)
app.post('/api/sessions/start', (req, res) => {
    try {
        const { subject_id, session_type = 'full_mock', filter_blueprint_id, question_limit, set_number } = req.body;
        const userId = req.user.id;

        let subject;
        let questions = [];

        // Handle Mastered Review Mode (ฝึกทบทวนข้อสอบที่เคยทำถูกแล้ว)
        if (session_type === 'mastered_review') {
            let mQuery = `
                SELECT q.id, q.subject_id, q.blueprint_id, q.stimulus, q.question_text, q.image_url, q.difficulty,
                       b.domain_name, b.subtopic_name
                FROM questions q
                JOIN blueprints b ON q.blueprint_id = b.id
                JOIN user_mastered_questions um ON q.id = um.question_id
                WHERE um.user_id = ?
            `;
            const mParams = [userId];

            if (subject_id && subject_id !== 'all') {
                mQuery += ' AND q.subject_id = ?';
                mParams.push(subject_id);
            }

            mQuery += ' ORDER BY RANDOM()';
            const limit = question_limit || 20;
            mQuery += ` LIMIT ${parseInt(limit, 10)}`;

            questions = db.prepare(mQuery).all(...mParams);

            if (questions.length === 0) {
                return res.status(400).json({
                    success: false,
                    error: 'ยังไม่มีข้อสอบในคลังข้อสอบที่พิชิตแล้วสำหรับทบทวน'
                });
            }

            subject = db.prepare('SELECT * FROM subjects WHERE id = ?').get(questions[0].subject_id) || {
                id: 'mastered_drill',
                name_th: 'ทบทวนข้อสอบที่พิชิตแล้ว (Mastered Review)',
                code: 'MR',
                total_score: questions.length * 1.5,
                duration_minutes: questions.length * 1.5
            };
        } else if (session_type === 'mistakes_review' || session_type === 'mistake_drill') {
            // Handle Mistake Practice Mode
            let mQuery = `
                SELECT q.id, q.subject_id, q.blueprint_id, q.stimulus, q.question_text, q.image_url, q.difficulty,
                       b.domain_name, b.subtopic_name
                FROM questions q
                JOIN blueprints b ON q.blueprint_id = b.id
                JOIN mistake_notebook m ON q.id = m.question_id
                WHERE m.user_id = ? AND m.mastery_status != 'mastered'
            `;
            const mParams = [userId];

            if (subject_id && subject_id !== 'all') {
                mQuery += ' AND q.subject_id = ?';
                mParams.push(subject_id);
            }

            mQuery += ' ORDER BY m.times_wrong DESC, RANDOM()';
            const limit = question_limit || 20;
            mQuery += ` LIMIT ${parseInt(limit, 10)}`;

            questions = db.prepare(mQuery).all(...mParams);

            if (questions.length === 0) {
                return res.status(400).json({
                    success: false,
                    error: 'ยังไม่มีข้อสอบในสมุดจุดอ่อนสำหรับฝึกซ้ำ'
                });
            }

            // Assign subject meta from first question or fallback
            subject = db.prepare('SELECT * FROM subjects WHERE id = ?').get(questions[0].subject_id) || {
                id: 'mistakes_drill',
                name_th: 'ฝึกซ้ำสมุดจุดอ่อน (Mistakes Drill)',
                code: 'MD',
                total_score: questions.length * 1.5,
                duration_minutes: questions.length * 1.5
            };
        } else {
            subject = db.prepare('SELECT * FROM subjects WHERE id = ?').get(subject_id);
            if (!subject) {
                return res.status(404).json({ success: false, error: 'Subject not found' });
            }

            // Fetch questions matching criteria
            // EXCLUDE questions that user has already answered correctly (mastered), unless explicitly requested
            let query = `
                SELECT q.id, q.subject_id, q.blueprint_id, q.stimulus, q.question_text, q.image_url, q.difficulty,
                       b.domain_name, b.subtopic_name, b.order_index
                FROM questions q
                JOIN blueprints b ON q.blueprint_id = b.id
                WHERE q.subject_id = ?
            `;
            const params = [subject_id];

            if (filter_blueprint_id) {
                query += ' AND q.blueprint_id = ?';
                params.push(filter_blueprint_id);
            }

            if (set_number) {
                query += ' AND q.set_number = ?';
                params.push(parseInt(set_number, 10));
            }

            if (!req.body.include_mastered) {
                query += ` AND q.id NOT IN (SELECT question_id FROM user_mastered_questions WHERE user_id = ?)`;
                params.push(userId);
            }

            if (session_type === 'full_mock') {
                query += ' ORDER BY b.order_index ASC, q.id ASC';
            } else {
                query += ' ORDER BY RANDOM()';
            }

            const limit = question_limit || (session_type === 'full_mock' ? subject.total_questions : 10);
            query += ` LIMIT ${parseInt(limit, 10)}`;

            questions = db.prepare(query).all(...params);

            if (questions.length === 0) {
                // Check if all questions in this subject were already answered correctly
                let checkQuery = 'SELECT COUNT(*) as c FROM user_mastered_questions um JOIN questions q ON um.question_id = q.id WHERE um.user_id = ? AND q.subject_id = ?';
                const checkParams = [userId, subject_id];
                if (filter_blueprint_id) {
                    checkQuery += ' AND q.blueprint_id = ?';
                    checkParams.push(filter_blueprint_id);
                }
                const masteredCount = db.prepare(checkQuery).get(...checkParams).c;
                if (masteredCount > 0) {
                    return res.status(400).json({
                        success: false,
                        is_all_mastered: true,
                        error: '🎉 ยอดเยี่ยมมาก! คุณได้ทำข้อสอบในส่วนนี้ถูกต้องครบทุกข้อแล้ว และถูกย้ายไปเก็บใน "คลังข้อสอบที่พิชิตแล้ว" เรียบร้อย คุณสามารถเลือกเปิดทำซ้ำเพื่อทบทวน หรือรีเซ็ตข้อสอบกลับสู่คลังหลักได้'
                    });
                }

                return res.status(400).json({
                    success: false,
                    error: 'ยังไม่มีข้อสอบในหมวดที่เลือก กรุณาเพิ่มข้อสอบหรือเลือกหมวดอื่น'
                });
            }
        }

        // Fetch options for each question (DO NOT leak is_correct during exam!)
        const getOptions = db.prepare(`
            SELECT id, question_id, label, content, order_index
            FROM question_options
            WHERE question_id = ?
            ORDER BY order_index ASC
        `);

        const questionsWithOptions = questions.map(q => ({
            ...q,
            options: getOptions.all(q.id)
        }));

        // Compute sections metadata for categorized navigation
        const sectionsMap = new Map();
        questionsWithOptions.forEach((q, idx) => {
            const sectionName = (q.subject_id === 'tgat3') ? (q.subtopic_name || q.domain_name) : (q.domain_name || 'ทั่วไป');
            if (!sectionsMap.has(sectionName)) {
                sectionsMap.set(sectionName, {
                    name: sectionName,
                    start_index: idx,
                    end_index: idx,
                    count: 1
                });
            } else {
                const sec = sectionsMap.get(sectionName);
                sec.end_index = idx;
                sec.count++;
            }
        });
        const sections = Array.from(sectionsMap.values());

        // Calculate time limit in seconds
        const timeLimitSeconds = session_type === 'full_mock'
            ? subject.duration_minutes * 60
            : Math.max(questions.length * 60, 300);

        const sessionId = 'sess_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);

        db.prepare(`
            INSERT INTO exam_sessions (
                id, user_id, subject_id, session_type, filter_blueprint_id,
                total_questions, max_score, time_limit_seconds, status, started_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'in_progress', CURRENT_TIMESTAMP)
        `).run(
            sessionId,
            userId,
            subject.id,
            session_type,
            filter_blueprint_id || null,
            questionsWithOptions.length,
            subject.total_score,
            timeLimitSeconds
        );

        res.json({
            success: true,
            data: {
                session_id: sessionId,
                subject: {
                    id: subject.id,
                    name_th: subject.name_th,
                    code: subject.code,
                    total_score: subject.total_score
                },
                session_type,
                time_limit_seconds: timeLimitSeconds,
                total_questions: questionsWithOptions.length,
                sections,
                questions: questionsWithOptions
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// POST submit exam session (Per-User Score Recording & Mistake Isolation)
app.post('/api/sessions/:id/submit', (req, res) => {
    try {
        const sessionId = req.params.id;
        const { answers = [], time_spent_seconds = 0 } = req.body;
        const userId = req.user.id;

        const session = db.prepare('SELECT * FROM exam_sessions WHERE id = ?').get(sessionId);
        if (!session) {
            return res.status(404).json({ success: false, error: 'Session not found' });
        }

        const subject = db.prepare('SELECT * FROM subjects WHERE id = ?').get(session.subject_id) || {
            total_questions: session.total_questions,
            total_score: session.max_score
        };

        let correctCount = 0;
        const evaluatedAnswers = [];

        const checkOption = db.prepare(`
            SELECT o.id, o.question_id, o.is_correct, o.label, o.content,
                   q.blueprint_id, b.domain_name, b.subtopic_name,
                   q.explanation, q.trap_analysis, q.question_text, q.stimulus
            FROM question_options o
            JOIN questions q ON o.question_id = q.id
            JOIN blueprints b ON q.blueprint_id = b.id
            WHERE o.id = ?
        `);

        const getCorrectOption = db.prepare(`
            SELECT id, label, content
            FROM question_options
            WHERE question_id = ? AND is_correct = 1
        `);

        const insertUserAnswer = db.prepare(`
            INSERT INTO user_answers (
                id, session_id, question_id, selected_option_id,
                is_correct, time_spent_seconds, is_flagged
            ) VALUES (?, ?, ?, ?, ?, ?, ?)
        `);

        const recordMistake = db.prepare(`
            INSERT INTO mistake_notebook (id, user_id, question_id, mastery_status, times_wrong, last_reviewed_at)
            VALUES (?, ?, ?, 'need_review', 1, CURRENT_TIMESTAMP)
            ON CONFLICT(user_id, question_id) DO UPDATE SET
                times_wrong = times_wrong + 1,
                last_reviewed_at = CURRENT_TIMESTAMP
        `);

        const recordMastered = db.prepare(`
            INSERT INTO user_mastered_questions (user_id, question_id, first_passed_at, last_passed_at, times_correct)
            VALUES (?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1)
            ON CONFLICT(user_id, question_id) DO UPDATE SET
                times_correct = times_correct + 1,
                last_passed_at = CURRENT_TIMESTAMP
        `);

        const updateMistakeMastered = db.prepare(`
            UPDATE mistake_notebook
            SET mastery_status = 'mastered', last_reviewed_at = CURRENT_TIMESTAMP
            WHERE user_id = ? AND question_id = ?
        `);

        const submitTransaction = db.transaction(() => {
            for (const ans of answers) {
                const answerId = 'ans_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
                let isCorrect = 0;
                let optDetails = null;

                if (ans.selected_option_id) {
                    optDetails = checkOption.get(ans.selected_option_id);
                    if (optDetails && optDetails.is_correct === 1) {
                        isCorrect = 1;
                        correctCount++;
                    }
                }

                if (userId && userId !== 'usr_guest' && (!req.user || req.user.role !== 'guest')) {
                    if (!isCorrect) {
                        // If wrong, log to user's isolated mistake notebook
                        const mistakeId = 'mst_' + userId + '_' + ans.question_id;
                        recordMistake.run(mistakeId, userId, ans.question_id);
                    } else {
                        // If correct, record to user_mastered_questions (ถอดออกจากข้อสอบหลัก ย้ายไปใส่ข้อสอบที่ผ่านแล้ว)
                        recordMastered.run(userId, ans.question_id);
                        updateMistakeMastered.run(userId, ans.question_id);
                    }
                }

                insertUserAnswer.run(
                    answerId,
                    sessionId,
                    ans.question_id,
                    ans.selected_option_id || null,
                    isCorrect,
                    ans.time_spent_seconds || 0,
                    ans.is_flagged ? 1 : 0
                );

                const correctOpt = getCorrectOption.get(ans.question_id);

                evaluatedAnswers.push({
                    question_id: ans.question_id,
                    selected_option_id: ans.selected_option_id,
                    is_correct: isCorrect === 1,
                    correct_option: correctOpt,
                    time_spent_seconds: ans.time_spent_seconds || 0,
                    is_flagged: !!ans.is_flagged,
                    explanation: optDetails ? optDetails.explanation : null,
                    trap_analysis: optDetails ? optDetails.trap_analysis : null,
                    domain_name: optDetails ? optDetails.domain_name : null,
                    subtopic_name: optDetails ? optDetails.subtopic_name : null
                });
            }

            // Calculate final scores
            const scoreEarned = Math.round((correctCount / session.total_questions) * session.max_score * 100) / 100;

            db.prepare(`
                UPDATE exam_sessions
                SET correct_count = ?,
                    score_earned = ?,
                    time_spent_seconds = ?,
                    status = 'completed',
                    finished_at = CURRENT_TIMESTAMP
                WHERE id = ?
            `).run(correctCount, scoreEarned, time_spent_seconds, sessionId);
        });

        submitTransaction();

        // Calculate breakdown by blueprint domain
        const domainBreakdown = db.prepare(`
            SELECT b.domain_name, b.subtopic_name,
                   COUNT(ua.id) as total,
                   COUNT(ua.id) as total_in_domain,
                   SUM(ua.is_correct) as correct,
                   SUM(ua.is_correct) as correct_in_domain,
                   ROUND(AVG(ua.is_correct) * 100, 1) as accuracy_pct
            FROM user_answers ua
            JOIN questions q ON ua.question_id = q.id
            JOIN blueprints b ON q.blueprint_id = b.id
            WHERE ua.session_id = ?
            GROUP BY b.domain_name, b.subtopic_name
        `).all(sessionId);

        // Fetch subject details for rich results view
        const subjectMeta = db.prepare('SELECT id, name_th, name_en, code FROM subjects WHERE id = ?').get(session.subject_id) || {
            id: session.subject_id,
            name_th: session.subject_name || 'ข้อสอบเสมือนจริง',
            name_en: 'Mock Exam',
            code: 'TCAS'
        };

        res.json({
            success: true,
            data: {
                session_id: sessionId,
                subject_id: session.subject_id,
                subject_name: subjectMeta.name_th,
                subject_name_en: subjectMeta.name_en,
                subject_code: subjectMeta.code,
                session_type: session.session_type,
                correct_count: correctCount,
                wrong_count: session.total_questions - correctCount,
                accuracy_pct: Math.round((correctCount / session.total_questions) * 100),
                score_earned: Math.round((correctCount * (session.max_score / session.total_questions)) * 100) / 100,
                max_score: session.max_score,
                time_spent_seconds,
                domain_breakdown: domainBreakdown,
                evaluated_answers: evaluatedAnswers
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// GET review session
app.get('/api/sessions/:id/review', (req, res) => {
    try {
        const session = db.prepare(`
            SELECT es.*, s.name_th as subject_name, s.code as subject_code
            FROM exam_sessions es
            JOIN subjects s ON es.subject_id = s.id
            WHERE es.id = ?
        `).get(req.params.id);

        if (!session) {
            return res.status(404).json({ success: false, error: 'Session not found' });
        }

        const answers = db.prepare(`
            SELECT ua.*, q.stimulus, q.question_text, q.explanation, q.trap_analysis, q.difficulty,
                   b.domain_name, b.subtopic_name,
                   sel_opt.label as selected_label, sel_opt.content as selected_content,
                   cor_opt.id as correct_option_id, cor_opt.label as correct_label, cor_opt.content as correct_content
            FROM user_answers ua
            JOIN questions q ON ua.question_id = q.id
            JOIN blueprints b ON q.blueprint_id = b.id
            LEFT JOIN question_options sel_opt ON ua.selected_option_id = sel_opt.id
            LEFT JOIN question_options cor_opt ON q.id = cor_opt.question_id AND cor_opt.is_correct = 1
            WHERE ua.session_id = ?
            ORDER BY ua.rowid ASC
        `).all(req.params.id);

        res.json({
            success: true,
            data: {
                session,
                answers
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// ==========================================
// 3. Mistake Notebook APIs (Per-User)
// ==========================================

// GET all mistakes for current user
app.get('/api/mistakes', (req, res) => {
    try {
        const userId = req.user.id;
        if (!userId || userId === 'usr_guest' || req.user.role === 'guest') {
            return res.json({ success: true, data: [] });
        }
        const mistakes = db.prepare(`
            SELECT m.*, q.stimulus, q.question_text, q.explanation, q.trap_analysis, q.difficulty,
                   s.name_th as subject_name, s.id as subject_id,
                   b.domain_name, b.subtopic_name,
                   cor_opt.label as correct_label, cor_opt.content as correct_content
            FROM mistake_notebook m
            JOIN questions q ON m.question_id = q.id
            JOIN subjects s ON q.subject_id = s.id
            JOIN blueprints b ON q.blueprint_id = b.id
            LEFT JOIN question_options cor_opt ON q.id = cor_opt.question_id AND cor_opt.is_correct = 1
            WHERE m.user_id = ?
            ORDER BY 
                CASE m.mastery_status
                    WHEN 'need_review' THEN 1
                    WHEN 'reviewing' THEN 2
                    ELSE 3
                END, m.times_wrong DESC, m.last_reviewed_at DESC
        `).all(userId);

        res.json({ success: true, data: mistakes });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// PATCH update mistake status or note for current user
app.patch('/api/mistakes/:questionId', (req, res) => {
    try {
        const userId = req.user.id;
        const { user_note, mastery_status } = req.body;

        const current = db.prepare('SELECT * FROM mistake_notebook WHERE user_id = ? AND question_id = ?').get(userId, req.params.questionId);
        if (!current) {
            return res.status(404).json({ success: false, error: 'Mistake item not found' });
        }

        db.prepare(`
            UPDATE mistake_notebook
            SET user_note = COALESCE(?, user_note),
                mastery_status = COALESCE(?, mastery_status),
                last_reviewed_at = CURRENT_TIMESTAMP
            WHERE user_id = ? AND question_id = ?
        `).run(user_note, mastery_status, userId, req.params.questionId);

        res.json({ success: true, message: 'Updated successfully' });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// DELETE clear ALL mistakes for current user
app.delete('/api/mistakes', (req, res) => {
    try {
        const userId = req.user.id;
        db.prepare('DELETE FROM mistake_notebook WHERE user_id = ?').run(userId);
        res.json({ success: true, message: 'ลบจุดอ่อนทั้งหมดเรียบร้อยแล้ว' });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// DELETE remove single item from mistake notebook
app.delete('/api/mistakes/:questionId', (req, res) => {
    try {
        const userId = req.user.id;
        db.prepare('DELETE FROM mistake_notebook WHERE user_id = ? AND question_id = ?').run(userId, req.params.questionId);
        res.json({ success: true, message: 'Removed from mistakes' });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// ==========================================
// 3.1 Mastered / Completed Questions APIs (คลังข้อสอบที่ทำถูกต้องแล้ว)
// ==========================================

// GET user's mastered questions with subject stats & filtering
app.get('/api/questions/mastered', (req, res) => {
    try {
        const userId = req.user.id;
        if (!userId || userId === 'usr_guest' || req.user.role === 'guest') {
            return res.json({
                success: true,
                data: {
                    total_mastered: 0,
                    subject_stats: [],
                    questions: []
                }
            });
        }
        const { subject_id, blueprint_id, search, limit = 50, offset = 0 } = req.query;

        // Subject summary stats for Mastered Bank
        const subjectStats = db.prepare(`
            SELECT s.id as subject_id, s.name_th, s.code, s.category,
                   (SELECT COUNT(*) FROM questions q WHERE q.subject_id = s.id) as catalog_total,
                   (SELECT COUNT(*) FROM user_mastered_questions umq JOIN questions q ON umq.question_id = q.id WHERE q.subject_id = s.id AND umq.user_id = ?) as mastered_count
            FROM subjects s
            ORDER BY 
                CASE s.category 
                    WHEN 'TGAT' THEN 1 
                    WHEN 'TPAT' THEN 2 
                    ELSE 3 
                END, s.code ASC
        `).all(userId);

        let query = `
            SELECT q.id, q.subject_id, q.stimulus, q.question_text, q.image_url, q.difficulty, q.explanation, q.trap_analysis,
                   b.domain_name, b.subtopic_name,
                   s.name_th as subject_name, s.code as subject_code,
                   umq.first_passed_at, umq.last_passed_at, umq.times_correct
            FROM user_mastered_questions umq
            JOIN questions q ON umq.question_id = q.id
            JOIN blueprints b ON q.blueprint_id = b.id
            JOIN subjects s ON q.subject_id = s.id
            WHERE umq.user_id = ?
        `;
        const params = [userId];

        if (subject_id && subject_id !== 'all') {
            query += ' AND q.subject_id = ?';
            params.push(subject_id);
        }

        if (blueprint_id && blueprint_id !== 'all') {
            query += ' AND q.blueprint_id = ?';
            params.push(blueprint_id);
        }

        if (search) {
            query += ' AND (q.question_text LIKE ? OR q.stimulus LIKE ? OR q.explanation LIKE ?)';
            const term = `%${search.trim()}%`;
            params.push(term, term, term);
        }

        const countQuery = `SELECT COUNT(*) as count FROM (${query})`;
        const totalFiltered = db.prepare(countQuery).get(...params).count;

        query += ' ORDER BY umq.last_passed_at DESC';
        query += ` LIMIT ${parseInt(limit, 10)} OFFSET ${parseInt(offset, 10)}`;

        const questions = db.prepare(query).all(...params);

        const getOptions = db.prepare(`
            SELECT id, question_id, label, content, is_correct, order_index
            FROM question_options
            WHERE question_id = ?
            ORDER BY order_index ASC
        `);

        const questionsWithOptions = questions.map(q => ({
            ...q,
            options: getOptions.all(q.id)
        }));

        res.json({
            success: true,
            data: {
                total_mastered: totalFiltered,
                subject_stats: subjectStats,
                questions: questionsWithOptions
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// POST Reset Mastered Questions back to Main Exam Pool
app.post('/api/questions/mastered/reset', (req, res) => {
    try {
        const userId = req.user.id;
        const { subject_id, question_id } = req.body;

        if (question_id) {
            db.prepare('DELETE FROM user_mastered_questions WHERE user_id = ? AND question_id = ?').run(userId, question_id);
            return res.json({ success: true, message: 'ย้ายข้อสอบกลับเข้าสู่คลังหลักเรียบร้อย' });
        }

        if (subject_id && subject_id !== 'all') {
            const result = db.prepare(`
                DELETE FROM user_mastered_questions
                WHERE user_id = ? AND question_id IN (SELECT id FROM questions WHERE subject_id = ?)
            `).run(userId, subject_id);
            return res.json({ success: true, count: result.changes, message: `รีเซ็ตข้อสอบ ${result.changes} ข้อกลับสู่คลังหลักเรียบร้อย` });
        } else {
            const result = db.prepare('DELETE FROM user_mastered_questions WHERE user_id = ?').run(userId);
            return res.json({ success: true, count: result.changes, message: `รีเซ็ตข้อสอบทั้งหมด ${result.changes} ข้อกลับสู่คลังหลักเรียบร้อย` });
        }
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// DELETE remove single item from mastered questions
app.delete('/api/questions/mastered/:questionId', (req, res) => {
    try {
        const userId = req.user.id;
        db.prepare('DELETE FROM user_mastered_questions WHERE user_id = ? AND question_id = ?').run(userId, req.params.questionId);
        res.json({ success: true, message: 'ย้ายข้อสอบกลับเข้าสู่คลังหลักเรียบร้อย' });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// ==========================================
// 4. Statistics & Analytics Overview (Per-User)
// ==========================================

app.get('/api/stats/overview', (req, res) => {
    try {
        const userId = req.user.id;
        if (!userId || userId === 'usr_guest' || req.user.role === 'guest') {
            return res.json({
                success: true,
                data: {
                    total_sessions: 0,
                    total_answered: 0,
                    total_correct: 0,
                    accuracy_pct: 0,
                    total_mistakes: 0,
                    total_time_spent_minutes: 0,
                    domain_stats: [],
                    recent_sessions: []
                }
            });
        }
        const totalSessions = db.prepare("SELECT COUNT(*) as count FROM exam_sessions WHERE user_id = ? AND status = 'completed'").get(userId).count;
        const totalAnswered = db.prepare(`
            SELECT COUNT(ua.id) as count 
            FROM user_answers ua 
            JOIN exam_sessions es ON ua.session_id = es.id 
            WHERE es.user_id = ?
        `).get(userId).count;
        const totalCorrect = db.prepare(`
            SELECT COUNT(ua.id) as count 
            FROM user_answers ua 
            JOIN exam_sessions es ON ua.session_id = es.id 
            WHERE es.user_id = ? AND ua.is_correct = 1
        `).get(userId).count;
        const totalMistakes = db.prepare("SELECT COUNT(*) as count FROM mistake_notebook WHERE user_id = ? AND mastery_status != 'mastered'").get(userId).count;
        const totalTimeSpentSeconds = db.prepare('SELECT COALESCE(SUM(time_spent_seconds), 0) as total FROM exam_sessions WHERE user_id = ?').get(userId).total;

        // Breakdown by blueprint domain
        const domainStats = db.prepare(`
            SELECT b.domain_name,
                   COUNT(ua.id) as total_answered,
                   SUM(ua.is_correct) as correct_count,
                   ROUND(AVG(ua.is_correct) * 100, 1) as accuracy_pct
            FROM user_answers ua
            JOIN exam_sessions es ON ua.session_id = es.id
            JOIN questions q ON ua.question_id = q.id
            JOIN blueprints b ON q.blueprint_id = b.id
            WHERE es.user_id = ?
            GROUP BY b.domain_name
            ORDER BY accuracy_pct ASC
        `).all(userId);

        // Recent completed sessions
        const recentSessions = db.prepare(`
            SELECT es.*, s.name_th as subject_name
            FROM exam_sessions es
            JOIN subjects s ON es.subject_id = s.id
            WHERE es.user_id = ? AND es.status = 'completed'
            ORDER BY es.finished_at DESC
            LIMIT 5
        `).all(userId);

        res.json({
            success: true,
            data: {
                total_sessions: totalSessions,
                total_answered: totalAnswered,
                total_correct: totalCorrect,
                accuracy_pct: totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0,
                total_mistakes: totalMistakes,
                total_time_spent_minutes: Math.round(totalTimeSpentSeconds / 60),
                domain_stats: domainStats,
                recent_sessions: recentSessions
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// GET RPG Character Status, Radar Attributes, EXP & Achievements (Per-User)
app.get('/api/stats/rpg-status', (req, res) => {
    try {
        const userId = req.user.id;
        if (!userId || userId === 'usr_guest' || req.user.role === 'guest') {
            return res.json({
                success: true,
                data: {
                    user: { username: 'guest', display_name: 'ผู้ใช้งานทั่วไป', avatar_url: 'scholar-m', role: 'guest' },
                    level: 1,
                    total_xp: 0,
                    xp_in_level: 0,
                    xp_needed: 80,
                    xp_percent: 0,
                    combat_power: 0,
                    streak_days: 0,
                    rank_title: 'ผู้เริ่มต้นการเดินทาง (Novice Explorer)',
                    rank_badge: 'Tier V',
                    rank_color: '#94a3b8',
                    stats: {
                        accuracy: 0,
                        speed: 0,
                        defense: 0,
                        mastery: 0,
                        consistency: 0
                    },
                    raw: {
                        total_answered: 0,
                        total_correct: 0,
                        avg_time_seconds: 0,
                        total_trap_q: 0,
                        trap_defended: 0,
                        total_mistakes: 0,
                        mastered_mistakes: 0,
                        total_vocab: 0,
                        mastered_vocab: 0,
                        total_sessions: 0
                    },
                    achievements: [
                        { id: 'first_step', name: 'ก้าวแรกสู่อนาคต', desc: 'ทำข้อสอบชุดแรกจบ', unlocked: false },
                        { id: 'streak_3', name: 'ไฟแห่งความมุ่งมั่น', desc: 'ฝึกฝนต่อเนื่อง 3 วันติด', unlocked: false },
                        { id: 'master_10', name: 'ผู้พิชิตโจทย์ 10 ข้อ', desc: 'ตอบข้อสอบถูกต้องครบ 10 ข้อ', unlocked: false },
                        { id: 'trap_breaker', name: 'ผู้ทำลายกับดัก', desc: 'ตรวจจับและตอบถูกในข้อที่มีจุดหลอก', unlocked: false },
                        { id: 'vocab_champ', name: 'คลังศัพท์พิชิต TCAS', desc: 'จำคำศัพท์ระดับ B2 ขึ้นไปครบ 10 คำ', unlocked: false }
                    ]
                }
            });
        }
        const totalSessions = db.prepare("SELECT COUNT(*) as count FROM exam_sessions WHERE user_id = ? AND status = 'completed'").get(userId).count;
        const ansStats = db.prepare(`
            SELECT COUNT(ua.id) as total_answered,
                   COALESCE(SUM(ua.is_correct), 0) as total_correct,
                   COALESCE(AVG(ua.time_spent_seconds), 45) as avg_time
            FROM user_answers ua
            JOIN exam_sessions es ON ua.session_id = es.id
            WHERE es.user_id = ?
        `).get(userId);

        const trapStats = db.prepare(`
            SELECT COUNT(ua.id) as total_trap_q,
                   COALESCE(SUM(CASE WHEN ua.is_correct = 1 THEN 1 ELSE 0 END), 0) as trap_defended
            FROM user_answers ua
            JOIN exam_sessions es ON ua.session_id = es.id
            JOIN questions q ON ua.question_id = q.id
            WHERE es.user_id = ? AND q.trap_analysis IS NOT NULL AND TRIM(q.trap_analysis) != ''
        `).get(userId);

        const mistakeStats = db.prepare(`
            SELECT COUNT(*) as total_mistakes,
                   COALESCE(SUM(CASE WHEN mastery_status = 'mastered' THEN 1 ELSE 0 END), 0) as mastered_mistakes
            FROM mistake_notebook
            WHERE user_id = ?
        `).get(userId);

        const vocabStats = db.prepare(`
            SELECT COUNT(*) as total_vocab,
                   COALESCE(SUM(CASE WHEN mastery_status = 'mastered' THEN 1 ELSE 0 END), 0) as mastered_vocab
            FROM vocab_bank
            WHERE user_id = ?
        `).get(userId);

        const cefrStats = db.prepare(`
            SELECT COALESCE(SUM(exp_earned), 0) as cefr_exp,
                   COALESCE(SUM(correct_count), 0) as cefr_correct
            FROM cefr_quiz_history
            WHERE user_id = ?
        `).get(userId);

        // Active dates in last 14 days
        const activeDates = db.prepare(`
            SELECT DISTINCT substr(started_at, 1, 10) as act_date
            FROM exam_sessions
            WHERE user_id = ? AND status = 'completed'
            ORDER BY act_date DESC
            LIMIT 14
        `).all(userId).map(r => r.act_date);

        let streak = activeDates.length > 0 ? Math.min(activeDates.length, 7) : 0;
        if (totalSessions > 0 && streak === 0) streak = 1;

        // 1. Accuracy (ACC) [0-100]
        const acc = ansStats.total_answered > 0
            ? Math.round((ansStats.total_correct / ansStats.total_answered) * 100)
            : 0;

        // 2. Speed (SPD) [0-100] (Target 45-60s)
        const avgSeconds = ansStats.total_answered > 0 ? Math.max(10, Math.round(ansStats.avg_time)) : 0;
        let spd = 0;
        if (ansStats.total_answered > 0) {
            if (avgSeconds <= 35) spd = 95;
            else if (avgSeconds <= 55) spd = 85;
            else if (avgSeconds <= 75) spd = 72;
            else if (avgSeconds <= 100) spd = 58;
            else spd = 42;
        }

        // 3. Trap Defense (DEF) [0-100]
        const def = trapStats.total_trap_q > 0
            ? Math.round((trapStats.trap_defended / trapStats.total_trap_q) * 100)
            : 0;

        // 4. Mastery (MST) [0-100]
        let mst = 0;
        if (mistakeStats.total_mistakes > 0) {
            mst = Math.round((mistakeStats.mastered_mistakes / mistakeStats.total_mistakes) * 100);
        } else if (vocabStats.total_vocab > 0) {
            mst = Math.min(100, vocabStats.mastered_vocab * 15);
        } else {
            mst = 0;
        }

        // 5. Consistency (CON) [0-100]
        const con = totalSessions > 0 || streak > 0
            ? Math.min(100, Math.max(0, (streak * 12) + (totalSessions * 8)))
            : 0;

        // Combat Power (CP)
        const combatPower = Math.round((acc * 2.5 + spd * 1.5 + def * 2.0 + mst * 2.0 + con * 2.0) * 10);

        // Total EXP including CEFR quizzes
        const totalXp = (ansStats.total_correct * 25) +
                        (totalSessions * 120) +
                        (mistakeStats.mastered_mistakes * 50) +
                        (vocabStats.mastered_vocab * 20) +
                        (cefrStats.cefr_exp) +
                        (streak * 75);

        // Level calculation
        const level = Math.max(1, Math.floor(Math.sqrt(totalXp / 80)) + 1);
        const curLevelBaseXp = Math.pow(level - 1, 2) * 80;
        const nextLevelBaseXp = Math.pow(level, 2) * 80;
        const xpInLevel = Math.max(0, totalXp - curLevelBaseXp);
        const xpNeeded = Math.max(50, nextLevelBaseXp - curLevelBaseXp);
        const xpPercent = Math.min(100, Math.round((xpInLevel / xpNeeded) * 100));

        // Rank Title & Badge
        let rankTitle = 'ผู้เริ่มต้นการเดินทาง (Novice Explorer)';
        let rankBadge = '🥉 Tier V';
        let rankColor = '#94a3b8';
        if (level >= 20) {
            rankTitle = 'TCAS Grandmaster (ตำนานแห่ง ทปอ.)';
            rankBadge = '👑 Grandmaster';
            rankColor = '#facc15';
        } else if (level >= 15) {
            rankTitle = 'อัศวินผู้พิชิต Blueprint (Blueprint Paladin)';
            rankBadge = '💎 Diamond';
            rankColor = '#38bdf8';
        } else if (level >= 10) {
            rankTitle = 'จอมเวทตรรกะ & ภาษา (Logic Sorcerer)';
            rankBadge = '🥇 Gold';
            rankColor = '#fbbf24';
        } else if (level >= 5) {
            rankTitle = 'นักล่าโจทย์สายสปีด (Speed Striker)';
            rankBadge = '🥈 Silver';
            rankColor = '#cbd5e1';
        }

        const achievements = [
            { id: 'first_mock', name: 'First Blood', desc: 'ทำข้อสอบจำลองจบชุดแรก', icon: '⚔️', unlocked: totalSessions >= 1 },
            { id: 'speed_demon', name: 'Speed Striker', desc: 'ทำข้อสอบไวเฉลี่ยต่ำกว่า 60 วินาที/ข้อ', icon: '⚡', unlocked: spd >= 75 && totalSessions >= 1 },
            { id: 'trap_master', name: 'Trap Immunity', desc: 'เอาชนะข้อสอบจุดหลอก ทปอ.', icon: '🛡️', unlocked: trapStats.trap_defended >= 1 },
            { id: 'vocab_hunter', name: 'Vocab Master', desc: 'บันทึกและจำศัพท์เข้าคลัง 5 คำขึ้นไป', icon: '📚', unlocked: vocabStats.mastered_vocab >= 5 || vocabStats.total_vocab >= 5 },
            { id: 'streak_3', name: 'On Fire!', desc: 'ฝึกฝนต่อเนื่อง 3 วันขึ้นไป', icon: '🔥', unlocked: streak >= 3 },
            { id: 'flawless', name: 'Flawless Mind', desc: 'ความแม่นยำรวมสูงกว่า 75%', icon: '👑', unlocked: acc >= 75 && ansStats.total_answered >= 10 }
        ];

        res.json({
            success: true,
            data: {
                user: {
                    id: req.user.id,
                    username: req.user.username,
                    display_name: req.user.display_name,
                    avatar_url: req.user.avatar_url
                },
                level,
                total_xp: totalXp,
                xp_in_level: xpInLevel,
                xp_needed: xpNeeded,
                xp_percent: xpPercent,
                streak_days: streak,
                combat_power: combatPower,
                rank_title: rankTitle,
                rank_badge: rankBadge,
                rank_color: rankColor,
                stats: {
                    accuracy: acc,
                    speed: spd,
                    defense: def,
                    mastery: mst,
                    consistency: con
                },
                raw: {
                    total_answered: ansStats.total_answered,
                    total_correct: ansStats.total_correct,
                    avg_time_seconds: avgSeconds,
                    total_sessions: totalSessions,
                    mastered_mistakes: mistakeStats.mastered_mistakes,
                    mastered_vocab: vocabStats.mastered_vocab
                },
                achievements
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// ==========================================
// 5. Add Custom Question API (Manual / AI Import)
// ==========================================

app.post('/api/questions/custom', (req, res) => {
    try {
        const {
            subject_id,
            blueprint_id,
            stimulus,
            question_text,
            difficulty = 'medium',
            explanation,
            trap_analysis,
            options = []
        } = req.body;

        if (!subject_id || !blueprint_id || !question_text || options.length < 2) {
            return res.status(400).json({
                success: false,
                error: 'กรุณากรอกข้อมูลให้ครบถ้วน (วิชา, Blueprint, คำถาม, และตัวเลือกอย่างน้อย 2 ตัวเลือก)'
            });
        }

        const questionId = 'q_custom_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6);

        const insertTx = db.transaction(() => {
            db.prepare(`
                INSERT INTO questions (
                    id, subject_id, blueprint_id, stimulus, question_text,
                    difficulty, explanation, trap_analysis, is_custom
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)
            `).run(
                questionId,
                subject_id,
                blueprint_id,
                stimulus || null,
                question_text,
                difficulty,
                explanation || 'ไม่มีเฉลยระบุไว้',
                trap_analysis || null
            );

            const insertOpt = db.prepare(`
                INSERT INTO question_options (id, question_id, label, content, is_correct, order_index)
                VALUES (?, ?, ?, ?, ?, ?)
            `);

            options.forEach((opt, idx) => {
                const optId = `${questionId}_opt_${idx + 1}`;
                insertOpt.run(
                    optId,
                    questionId,
                    opt.label || String(idx + 1),
                    opt.content,
                    opt.is_correct ? 1 : 0,
                    idx
                );
            });
        });

        insertTx();

        res.json({
            success: true,
            message: 'บันทึกข้อสอบเข้าสู่คลังเรียบร้อยแล้ว!',
            question_id: questionId
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// ==========================================
// 6. Vocabulary Bank & Translation APIs (Per-User)
// ==========================================

const OFFLINE_TCAS_DICT = {
    'reluctant': { th: 'ไม่เต็มใจ, ลังเล, อิดออด', pos: 'adj.', phonetic: '/rɪˈlʌk.tənt/' },
    'pruning': { th: 'การตัดแต่งกิ่ง, การตัดส่วนที่ไม่จำเป็นออก', pos: 'noun', phonetic: '/ˈpruː.nɪŋ/' },
    'synaptic': { th: 'เกี่ยวกับจุดประสานประสาท (Synapse)', pos: 'adj.', phonetic: '/sɪˈnæp.tɪk/' },
    'redundant': { th: 'ซ้ำซ้อน, เกินความจำเป็น, ฟุ่มเฟือย', pos: 'adj.', phonetic: '/rɪˈdʌn.dənt/' },
    'distressed': { th: 'เป็นทุกข์, เครียด, กังวลอย่างหนัก', pos: 'adj.', phonetic: '/dɪˈstrest/' },
    'adoption': { th: 'การยอมรับนำมาใช้, การรับเลี้ยงดู', pos: 'noun', phonetic: '/əˈdɒp.ʃən/' },
    'hinges': { th: 'ขึ้นอยู่กับ, ยึดติดกับ (hinge on)', pos: 'verb', phonetic: '/hɪndʒz/' },
    'consolidates': { th: 'รวบรวมให้เป็นปึกแผ่น, เสริมสร้างความมั่นคง', pos: 'verb', phonetic: '/kənˈsɒl.ɪ.deɪts/' },
    'subsequent': { th: 'ที่ตามมาภายหลัง, ลำดับถัดไป', pos: 'adj.', phonetic: '/ˈsʌb.sɪ.kwənt/' },
    'infrastructure': { th: 'โครงสร้างพื้นฐาน (เช่น ถนน ระบบไฟ เครือข่าย)', pos: 'noun', phonetic: '/ˈɪn.frəˌstrʌk.tʃər/' },
    'indifferent': { th: 'เฉยเมย, ไม่แยแส, ไม่สนใจ', pos: 'adj.', phonetic: '/ɪnˈdɪf.ər.ənt/' },
    'cognitive': { th: 'เกี่ยวกับการรับรู้และการใช้เหตุผลทางสมอง', pos: 'adj.', phonetic: '/ˈkɒɡ.nə.tɪv/' },
    'flexibility': { th: 'ความยืดหยุ่น, ความสามารถในการปรับเปลี่ยน', pos: 'noun', phonetic: '/ˌflek.səˈbɪl.ə.ti/' },
    'autonomous': { th: 'ที่ทำงานอัตโนมัติ, อิสระในการปกครองตนเอง', pos: 'adj.', phonetic: '/ɔːˈtɒn.ə.məs/' },
    'containment': { th: 'การควบคุมขอบเขตความเสียหาย, การกักกัน', pos: 'noun', phonetic: '/kənˈteɪn.mənt/' },
    'empathy': { th: 'ความเข้าอกเข้าใจผู้อื่นอย่างลึกซึ้ง', pos: 'noun', phonetic: '/ˈem.pə.θi/' },
    'governance': { th: 'การกำกับดูแล, การบริหารจัดการอย่างมีหลักการ', pos: 'noun', phonetic: '/ˈɡʌv.ən.əns/' },
    'differentiation': { th: 'การสร้างความแตกต่าง, การแยกแยะ', pos: 'noun', phonetic: '/ˌdɪf.ə.ren.ʃiˈeɪ.ʃən/' },
    'sustainable': { th: 'ยั่งยืน, ถาวร, ไม่ทำลายสิ่งแวดล้อม', pos: 'adj.', phonetic: '/səˈsteɪ.nə.bəl/' },
    'eager': { th: 'กระตือรือร้น, อยากได้/อยากทำมาก', pos: 'adj.', phonetic: '/ˈiː.ɡər/' },
    'determined': { th: 'มุ่งมั่น, แน่วแน่, ตั้งใจจริง', pos: 'adj.', phonetic: '/dɪˈtɜː.mɪnd/' },
    'compromise': { th: 'การประนีประนอม, การยอมถอยคนละก้าว', pos: 'noun/verb', phonetic: '/ˈkɒm.prə.maɪz/' },
    'inevitable': { th: 'ซึ่งหลีกเลี่ยงไม่ได้, ต้องเกิดขึ้นแน่นอน', pos: 'adj.', phonetic: '/ɪnˈev.ɪ.tə.bəl/' }
};

app.get('/api/vocab/translate', async (req, res) => {
    try {
        const rawWord = (req.query.word || '').trim();
        if (!rawWord) {
            return res.status(400).json({ success: false, error: 'Word parameter is required' });
        }

        const cleanWord = rawWord.toLowerCase().replace(/[^a-zA-Z\s-]/g, '');
        const offlineMatch = OFFLINE_TCAS_DICT[cleanWord];

        let result = {
            word: rawWord,
            definition_th: offlineMatch ? offlineMatch.th : '',
            pos: offlineMatch ? offlineMatch.pos : '',
            phonetic: offlineMatch ? offlineMatch.phonetic : ''
        };

        if (!result.definition_th) {
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 2000);
                const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(rawWord)}&langpair=en|th`;
                const fetchRes = await fetch(apiUrl, { signal: controller.signal });
                clearTimeout(timeoutId);

                if (fetchRes.ok) {
                    const data = await fetchRes.json();
                    if (data.responseData && data.responseData.translatedText) {
                        result.definition_th = data.responseData.translatedText;
                    }
                }
            } catch (netErr) {
                console.log('Online translation skipped/unavailable:', netErr.message);
            }
        }

        if (!result.definition_th) {
            result.definition_th = `(แตะเพื่อพิมพ์ความหมายคำว่า "${rawWord}")`;
        }

        res.json({ success: true, data: result });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// GET all vocabulary for current user
app.get('/api/vocab', (req, res) => {
    try {
        const userId = req.user.id;
        const { status } = req.query;
        let query = 'SELECT * FROM vocab_bank WHERE user_id = ?';
        const params = [userId];

        if (status && status !== 'all') {
            query += ' AND mastery_status = ?';
            params.push(status);
        }

        query += ' ORDER BY created_at DESC';

        const words = db.prepare(query).all(...params);
        res.json({ success: true, data: words });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// POST save word to vocabulary bank
app.post('/api/vocab', (req, res) => {
    try {
        const userId = req.user.id;
        const {
            word,
            phonetic,
            definition_th,
            part_of_speech,
            context_sentence,
            source_question_id
        } = req.body;

        if (!word || !definition_th) {
            return res.status(400).json({ success: false, error: 'Word and definition are required' });
        }

        const id = 'voc_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6);

        db.prepare(`
            INSERT INTO vocab_bank (
                id, user_id, word, phonetic, definition_th, part_of_speech,
                context_sentence, mastery_status, source_question_id
            ) VALUES (?, ?, ?, ?, ?, ?, ?, 'learning', ?)
        `).run(
            id,
            userId,
            word.trim(),
            phonetic || null,
            definition_th.trim(),
            part_of_speech || null,
            context_sentence || null,
            source_question_id || null
        );

        res.json({ success: true, message: 'บันทึกคำศัพท์เรียบร้อยแล้ว!', id });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// PATCH update vocabulary
app.patch('/api/vocab/:id', (req, res) => {
    try {
        const userId = req.user.id;
        const { mastery_status, definition_th } = req.body;
        db.prepare(`
            UPDATE vocab_bank
            SET mastery_status = COALESCE(?, mastery_status),
                definition_th = COALESCE(?, definition_th)
            WHERE id = ? AND (user_id = ? OR user_id IS NULL)
        `).run(mastery_status, definition_th, req.params.id, userId);

        res.json({ success: true, message: 'Updated vocabulary item' });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// DELETE vocabulary
app.delete('/api/vocab/:id', (req, res) => {
    try {
        const userId = req.user.id;
        db.prepare('DELETE FROM vocab_bank WHERE id = ? AND (user_id = ? OR user_id IS NULL)').run(req.params.id, userId);
        res.json({ success: true, message: 'Deleted vocabulary item' });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// ==========================================
// 7. AI Tutor Intelligent Assistant API
// ==========================================

function generateSmartFallbackTutor(question, options, selectedOption, correctOption, userQuery) {
    const qLower = (userQuery || '').toLowerCase();
    const correctLabel = correctOption ? `${correctOption.label}. ${correctOption.content}` : 'ข้อที่ถูกต้อง';
    const selectedLabel = selectedOption ? `${selectedOption.label}. ${selectedOption.content}` : 'ยังไม่ได้เลือก';

    if (qLower.includes('ทำไม') || qLower.includes('ผิด') || qLower.includes('ช้อยส์')) {
        return `### 💡 วิเคราะห์เจาะลึก: ทำไมตัวเลือกนี้ถึงไม่ใช่คำตอบ

คุณเลือกตัวเลือก: **${selectedLabel}**  
คำตอบที่ถูกต้องคือ: **${correctLabel}**

---
#### 🔍 จุดที่ทำให้สับสนหรือเสียคะแนน:
${question.trap_analysis ? `* **กับดักของข้อนี้ (Common Trap):** ${question.trap_analysis}` : `* ตัวเลือกที่คุณเลือกอาจดูคุ้นตา แต่ยังไม่ตรงกับเงื่อนไขหลักที่โจทย์กำหนด`}

#### 🎯 หลักคิดที่ถูกต้อง (Key Takeaway):
${question.explanation}

> **คำแนะนำจากผม:** เวลาเจอโจทย์สไตล์นี้ ให้ตีกรอบคำสำคัญ (Keyword) ในโจทย์ก่อนเสมอ แล้วตัดตัวเลือกที่มีความหมายกว้างหรือแคบเกินไปออกก่อนครับ!`;
    }

    if (qLower.includes('ลัด') || qLower.includes('ตัดช้อยส์') || qLower.includes('เทคนิค')) {
        return `### ⚡ สูตรลัดและเทคนิคตัดตัวเลือกสไตล์ TCAS

สำหรับข้อสอบพาร์ท **${question.domain_name} (${question.subtopic_name})**:

1. **Step 1 - สแกนหา Core Clue ใน 5 วินาที:**  
   หาจุดหลักของโจทย์ว่าถามถึงอะไร ${question.stimulus ? 'ถ้ามีบทความ ให้อ่านประโยคก่อนหน้าและหลังช่องว่างทันที ไม่จำเป็นต้องแปลทั้งเรื่อง' : 'ดูเงื่อนไขทางตรรกะ/ตัวเลขที่เป็นหัวใจหลัก'}

2. **Step 2 - ตัดตัวเลือกลวงทิ้งทันที:**  
   ${question.trap_analysis ? `ตัดตัวเลือกที่เข้าข่าย: *${question.trap_analysis}* ออกไปก่อนเลย!` : 'ตัดตัวเลือกที่เป็น Extremes (เช่น All, Never, Only) หรือตัวเลือกที่คำนวณหลุดช่วงออกก่อน'}

3. **Step 3 - ยืนยันคำตอบด้วยหลักการ:**  
   ตัวเลือก **${correctLabel}** คือข้อที่ถูกต้องตามหลัก:  
   ${question.explanation.length > 150 ? question.explanation.substring(0, 150) + '...' : question.explanation}

> 💡 **Tip:** ฝึกจำ Pattern จุดหลอกนี้ไว้ เวลาเข้าห้องสอบจริงจะตัดตัวเลือกได้ภายใน 30 วินาทีแน่นอนครับ!`;
    }

    if (qLower.includes('สูตร') || qLower.includes('ไวยากรณ์') || qLower.includes('สรุป') || qLower.includes('กฎ')) {
        return `### 🧠 สรุปสาระสำคัญที่ต้องจำสำหรับข้อนี้

**พาร์ท:** ${question.domain_name} • ${question.subtopic_name}  
**หัวใจสำคัญ:**

* **หลักการคิดหลัก:**  
  ${question.explanation}
* **สิ่งที่ต้องระวังเป็นพิเศษ:**  
  ${question.trap_analysis || 'ระวังความหมายกำกวมหรือการแทนค่าผิดตำแหน่ง'}

> 📝 **โน้ตย่อส่งท้าย:** บันทึกข้อนี้ลงใน **"สมุดจุดอ่อน (Mistakes)"** แล้วเขียนโน้ตสั้นๆ ด้วยสำนวนตัวเอง จะช่วยให้จดจำได้นานขึ้น 2 เท่าครับ!`;
    }

    if (qLower.includes('โจทย์') || qLower.includes('แนวเดียวกัน') || qLower.includes('ฝึกอีก') || qLower.includes('ตัวอย่าง')) {
        return `### 🎯 โจทย์จำลองแนวใกล้เคียง (Challenge Drill)

ลองทดสอบความเข้าใจกับข้อสอบแนวพาร์ท **${question.subtopic_name}** ข้อนี้ดูครับ:

> **โจทย์ซ้อมมือ:**  
> หากสถานการณ์คล้ายคลึงกับข้อนี้ แต่มีการสลับเงื่อนไขหลัก หรือใช้คำศัพท์ในตระกูลใกล้เคียงกัน คุณจะเลือกตอบข้อใด?
> 
> 1) ตัวเลือกที่ตรงความหมายตรงตัวแต่ผิดบริบท  
> 2) ตัวเลือกที่มีความถูกต้องตามหลักเกณฑ์อย่างเป็นธรรมชาติ *(คำตอบที่ถูกต้อง)*  
> 3) ตัวเลือกที่ใช้คำหรูหราแต่สื่อสารไม่ตรงประเด็น  
> 4) ตัวเลือกที่ตัดทอนข้อมูลสำคัญออกไป

**เฉลย:** ข้อ **2** เพราะข้อสอบ ทปอ. เน้นการสื่อสารจริงและความสมเหตุสมผลตามหลัก Blueprint เสมอครับ!`;
    }

    return `### 🎓 คำตอบจาก AI Tutor TCAS Master

สำหรับคำถามของคุณ: *"${userQuery}"*

**วิเคราะห์ข้อสอบข้อนี้:**
* **คำตอบที่ถูกต้อง:** **${correctLabel}**
* **เฉลยละเอียด:** ${question.explanation}
${question.trap_analysis ? `* **จุดหลอกที่ควรระวัง:** ${question.trap_analysis}` : ''}

หากคุณมีข้อสงสัยเพิ่มเติม สามารถพิมพ์ถามเจาะลึกเฉพาะจุด หรือกดปุ่มด่วนด้านบนเพื่อดูเทคนิคคิดลัดได้เลยนะ สู้ๆ ครับ! 💪`;
}

const apiKeyModelCache = new Map(); // key -> { model, allAvailable, timestamp }

function cleanAiResponseText(text) {
    if (!text) return '';
    // Strip accidental internal reasoning/review trace leakage
    let cleaned = text.replace(/(?:\r?\n|\A)(?:\d+\.\s*)?Review against System Instructions:[\s\S]*$/i, '');
    cleaned = cleaned.replace(/(?:\r?\n|\A)\*+\s*Check tone:[\s\S]*$/i, '');
    cleaned = cleaned.replace(/(?:\r?\n|\A)\*+\s*System Instructions Check:[\s\S]*$/i, '');
    cleaned = cleaned.replace(/(?:\r?\n|\A)\*+\s*Review against guidelines:[\s\S]*$/i, '');
    return cleaned.trim() || text.trim();
}

async function testDirectModelCandidates(apiKey) {
    const candidates = [
        'gemini-3.8-flash',
        'gemini-3.5-flash',
        'gemini-3.5-flash-lite',
        'gemini-2.5-flash',
        'gemini-2.0-flash'
    ];
    for (const model of candidates) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 4000);
            const testRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey.trim()}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ role: 'user', parts: [{ text: 'Ping' }] }],
                    generationConfig: { maxOutputTokens: 5 }
                }),
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            const testData = await testRes.json();
            if (!testData.error) {
                const res = { model, allAvailable: candidates, timestamp: Date.now() };
                apiKeyModelCache.set(apiKey.trim(), res);
                return res;
            }
        } catch (_) {}
    }
    return { error: 'ไม่สามารถเชื่อมต่อกับโมเดล Gemini ใดๆ ได้ กรุณาตรวจสอบ API Key' };
}

// Dynamic Model Detection for Gemini API with In-Memory Caching
async function getBestAvailableGeminiModel(apiKey) {
    const cleanKey = apiKey ? apiKey.trim() : '';
    if (!cleanKey) return { error: 'No API key provided' };

    // Check fast cache (1 hour TTL)
    const cached = apiKeyModelCache.get(cleanKey);
    if (cached && (Date.now() - cached.timestamp < 3600000)) {
        return cached;
    }

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${cleanKey}`, {
            signal: controller.signal
        });
        clearTimeout(timeoutId);

        const data = await res.json();
        if (data.error || !data.models || !Array.isArray(data.models)) {
            return await testDirectModelCandidates(cleanKey);
        }

        const validModels = data.models
            .filter(m => m.supportedGenerationMethods && m.supportedGenerationMethods.includes('generateContent'))
            .map(m => m.name.replace(/^models\//, ''));

        if (validModels.length === 0) {
            return await testDirectModelCandidates(cleanKey);
        }

        // Ordered priority list of modern models (Preferring newest 3.8 / 3.5 / 2.5 Flash)
        const priority = [
            'gemini-3.8-flash',
            'gemini-3.5-flash',
            'gemini-3.5-flash-lite',
            'gemini-3.0-flash',
            'gemini-2.5-flash',
            'gemini-2.0-flash',
            'gemini-2.5-pro',
            'gemini-2.0-flash-exp',
            'gemini-1.5-flash-latest',
            'gemini-1.5-flash'
        ];

        let chosenModel = priority.find(p => validModels.includes(p));
        if (!chosenModel) {
            chosenModel = validModels.find(m => m.includes('flash')) || validModels[0] || 'gemini-3.8-flash';
        }

        const result = { model: chosenModel, allAvailable: validModels, timestamp: Date.now() };
        apiKeyModelCache.set(cleanKey, result);
        return result;
    } catch (err) {
        return await testDirectModelCandidates(cleanKey);
    }
}

// POST Ask AI Tutor
app.post('/api/ai/tutor', async (req, res) => {
    try {
        const { question_id, user_query, selected_option_id, chat_history, custom_key, preferred_model } = req.body;
        if (!question_id || !user_query) {
            return res.status(400).json({ success: false, error: 'กรุณาระบุ question_id และ user_query' });
        }

        const question = db.prepare(`
            SELECT q.*, s.name_th as subject_name, s.code as subject_code,
                   b.domain_name, b.subtopic_name
            FROM questions q
            JOIN subjects s ON q.subject_id = s.id
            JOIN blueprints b ON q.blueprint_id = b.id
            WHERE q.id = ?
        `).get(question_id);

        if (!question) {
            return res.status(404).json({ success: false, error: 'ไม่พบข้อสอบนี้ในฐานข้อมูล' });
        }

        const options = db.prepare(`
            SELECT * FROM question_options WHERE question_id = ? ORDER BY order_index ASC
        `).all(question_id);

        const correctOption = options.find(o => o.is_correct === 1);
        const selectedOption = options.find(o => o.id === selected_option_id);

        const apiKey = custom_key || req.headers['x-gemini-key'] || process.env.GEMINI_API_KEY;

        const userId = req.user ? req.user.id : 'usr_guest';

        if (apiKey && apiKey.trim().length > 5) {
            try {
                const systemPrompt = `คุณคือ "TCAS Master AI" ระบบปัญญาประดิษฐ์ผู้เชี่ยวชาญด้านการวิเคราะห์ข้อสอบและการเรียนรู้สำหรับการสอบ TCAS (TGAT, TPAT, A-Level)
นโยบายสำคัญที่สุด (Strict Policy):
1. นโยบายความเท่าเทียม (ห้ามระบบรุ่นพี่-รุ่นน้องเด็ดขาด):
   - ห้ามใช้สรรพนามแบบรุ่นพี่หรือรุ่นน้องโดยเด็ดขาด (ห้ามแทนตัวเองว่า "พี่", "พี่ติวเตอร์", และห้ามเรียกผู้ใช้ว่า "น้อง", "น้องๆ")
   - ให้ปฏิบัติต่อผู้ใช้ในฐานะ "ผู้ร่วมเรียนรู้และคู่คิดทางวิชาการที่เท่าเทียมกัน"
   - ใช้สรรพนามที่สุภาพ ให้เกียรติ และเป็นมิตร เช่น "ผม", "เรา", "คุณ"
2. กฎการตอบและห้ามแสดงข้อมูลภายใน (No Meta / No Truncation):
   - ตอบเป็นภาษาไทยที่สมบูรณ์ ชัดเจน ตรงประเด็น
   - ห้ามแสดงข้อความตรวจสอบคำสั่ง (เช่น "Review against System Instructions", "Check tone", รูบริกการประเมิน หรือกระบวนการคิดภายในภาษาอังกฤษ) ในคำตอบโดยเด็ดขาด ให้ตอบเฉพาะเนื้อหาที่เป็นประโยชน์ต่อผู้เรียนโดยตรง
   - หากผู้ใช้ขอให้สร้างโจทย์ใหม่ ให้สร้างโจทย์แนวเดียวกัน 1 ข้อ พร้อมตัวเลือก 4-5 ช้อยส์, ระบุเฉลยคำตอบที่ถูกต้อง และอธิบายวิธีคิดอย่างละเอียดให้ครบถ้วนสมบูรณ์
3. หน้าที่หลัก:
   - วิเคราะห์ข้อสอบเจาะลึก อธิบายหลักการคิด (Core Concept) และกระบวนการคิดอย่างเป็นขั้นตอน
   - ชี้จุดที่ผู้ออกข้อสอบวางกับดักไว้ (Trap & Distractor Analysis) และอธิบายเหตุผลว่าทำไมตัวเลือกที่ผิดถึงผิด
   - แนะนำเทคนิคการตัดช้อยส์ การสังเกตคีย์เวิร์ด และการเชื่อมโยงความรู้ตาม Test Blueprint ของ ทปอ.
4. ข้อกำหนดพิเศษ:
   - หากมีสมการหรือสูตรคณิตศาสตร์ ให้ใช้สัญลักษณ์ LaTeX Math เสมอ เช่น $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$
   - จัดรูปแบบ Markdown ให้อ่านง่าย สบายตา ชัดเจน`;

                const contextText = `ข้อมูลข้อสอบปัจจุบัน:
- วิชา: ${question.subject_name} (${question.subject_code})
- สาระ/พาร์ท: ${question.domain_name} -> ${question.subtopic_name}
${question.stimulus ? `- บทความ/Passage:\n"""${question.stimulus}"""\n` : ''}
- ตัวโจทย์: ${question.question_text}
- ตัวเลือกทั้งหมด:
${options.map(o => `  ${o.label}. ${o.content} ${o.is_correct ? '(คำตอบที่ถูกต้อง)' : ''}`).join('\n')}
- คำตอบที่ถูกต้อง: ${correctOption ? `${correctOption.label}. ${correctOption.content}` : '-'}
- คำตอบที่ผู้ใช้เลือก: ${selectedOption ? `${selectedOption.label}. ${selectedOption.content}` : '(ไม่ได้ตอบ)'}
- เฉลยทางการ: ${question.explanation}
- จุดหลอกที่ข้อสอบชอบใช้ (Trap): ${question.trap_analysis || 'ไม่มีระบุ'}`;

                const contents = [];
                if (Array.isArray(chat_history)) {
                    for (const msg of chat_history.slice(-4)) {
                        contents.push({
                            role: msg.role === 'user' ? 'user' : 'model',
                            parts: [{ text: msg.content }]
                        });
                    }
                }

                contents.push({
                    role: 'user',
                    parts: [{ text: `[ข้อมูลข้อสอบ]\n${contextText}\n\n[คำถามของผู้ใช้]:\n${user_query}` }]
                });

                // Dynamically resolve the best active model for this user's API Key
                let chosenModel = (typeof preferred_model === 'string' && preferred_model.trim()) ? preferred_model.trim() : null;
                let modelInfo = null;

                if (!chosenModel) {
                    modelInfo = await getBestAvailableGeminiModel(apiKey);
                    chosenModel = modelInfo.model || 'gemini-3.8-flash';
                }

                let geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${chosenModel}:generateContent?key=${apiKey.trim()}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        systemInstruction: { parts: [{ text: systemPrompt }] },
                        contents: contents,
                        generationConfig: {
                            temperature: 0.5,
                            maxOutputTokens: 4096
                        }
                    })
                });

                let geminiData = await geminiRes.json();
                if (geminiData.error) {
                    // Try alternative models if first attempt failed
                    if (!modelInfo) {
                        modelInfo = await getBestAvailableGeminiModel(apiKey);
                    }
                    const fallbackList = Array.isArray(modelInfo?.allAvailable) 
                        ? modelInfo.allAvailable 
                        : ['gemini-3.8-flash', 'gemini-3.5-flash', 'gemini-2.5-flash', 'gemini-2.0-flash'];

                    for (const altModel of fallbackList.slice(0, 4)) {
                        if (altModel === chosenModel) continue;
                        try {
                            const altRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${altModel}:generateContent?key=${apiKey.trim()}`, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    systemInstruction: { parts: [{ text: systemPrompt }] },
                                    contents: contents,
                                    generationConfig: {
                                        temperature: 0.5,
                                        maxOutputTokens: 4096
                                    }
                                })
                            });
                            const altData = await altRes.json();
                            if (!altData.error && altData.candidates?.[0]?.content?.parts?.[0]?.text) {
                                geminiData = altData;
                                chosenModel = altModel;
                                // Update cache to the newly successful model
                                apiKeyModelCache.set(apiKey.trim(), { model: chosenModel, allAvailable: fallbackList, timestamp: Date.now() });
                                break;
                            }
                        } catch (_) {}
                    }
                }

                if (!geminiData.error && geminiData.candidates?.[0]?.content?.parts?.[0]?.text) {
                    const rawText = geminiData.candidates[0].content.parts[0].text;
                    const aiText = cleanAiResponseText(rawText);

                    // Automatically persist chat history to database
                    try {
                        const userMsgId = `msg_${Date.now()}_u${Math.random().toString(36).substring(2, 6)}`;
                        const aiMsgId = `msg_${Date.now() + 1}_a${Math.random().toString(36).substring(2, 6)}`;
                        db.prepare(`
                            INSERT INTO ai_chat_messages (id, user_id, question_id, role, content)
                            VALUES (?, ?, ?, 'user', ?)
                        `).run(userMsgId, userId, question_id, user_query);
                        db.prepare(`
                            INSERT INTO ai_chat_messages (id, user_id, question_id, role, content)
                            VALUES (?, ?, ?, 'assistant', ?)
                        `).run(aiMsgId, userId, question_id, aiText);
                    } catch (dbErr) {
                        console.error('Failed to auto-persist chat:', dbErr.message);
                    }

                    return res.json({
                        success: true,
                        ai_response: aiText,
                        is_fallback: false,
                        model: `Google Gemini (${chosenModel})`
                    });
                }
            } catch (apiErr) {
                console.error('Gemini API fetch error, fallback to built-in tutor:', apiErr.message);
            }
        }

        const fallbackReply = generateSmartFallbackTutor(question, options, selectedOption, correctOption, user_query);
        
        // Persist fallback conversation as well
        try {
            const userMsgId = `msg_${Date.now()}_u${Math.random().toString(36).substring(2, 6)}`;
            const aiMsgId = `msg_${Date.now() + 1}_a${Math.random().toString(36).substring(2, 6)}`;
            db.prepare(`
                INSERT INTO ai_chat_messages (id, user_id, question_id, role, content)
                VALUES (?, ?, ?, 'user', ?)
            `).run(userMsgId, userId, question_id, user_query);
            db.prepare(`
                INSERT INTO ai_chat_messages (id, user_id, question_id, role, content)
                VALUES (?, ?, ?, 'assistant', ?)
            `).run(aiMsgId, userId, question_id, fallbackReply);
        } catch (dbErr) {
            console.error('Failed to auto-persist fallback chat:', dbErr.message);
        }

        return res.json({
            success: true,
            ai_response: fallbackReply,
            is_fallback: true,
            model: 'TCAS Master AI (Offline Mode)',
            hint: 'ใส่ Gemini API Key ฟรี เพื่อเปิดพลัง AI วิเคราะห์ข้อสอบแบบเต็มประสิทธิภาพ'
        });

    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// POST verify Gemini API key
app.post('/api/ai/verify-key', async (req, res) => {
    try {
        const { apiKey } = req.body;
        if (!apiKey || typeof apiKey !== 'string' || apiKey.trim().length < 8) {
            return res.status(400).json({ success: false, error: 'กรุณากรอก API Key ให้ครบถ้วน' });
        }

        console.log('🔑 [Verify-Key] Testing API key with Google AI Studio...');
        const cleanKey = apiKey.trim();

        // Direct Google models inquiry with 6-second timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);

        try {
            const listRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${cleanKey}`, {
                signal: controller.signal
            });
            clearTimeout(timeoutId);

            const data = await listRes.json();
            if (data.error) {
                console.log('❌ [Verify-Key] Google returned error:', data.error.message);
                return res.status(400).json({ 
                    success: false, 
                    error: data.error.message || 'API Key ไม่ถูกต้อง กรุณาคัดลอกจาก Google AI Studio อีกครั้ง' 
                });
            }

            if (!data.models || !Array.isArray(data.models)) {
                return res.status(400).json({ 
                    success: false, 
                    error: 'ไม่สามารถอ่านรายการโมเดลจากบัญชี Google ของคุณได้' 
                });
            }

            // Find best available generateContent model
            const validModels = data.models
                .filter(m => m.supportedGenerationMethods && m.supportedGenerationMethods.includes('generateContent'))
                .map(m => m.name.replace(/^models\//, ''));

            const priority = [
                'gemini-3.8-flash',
                'gemini-3.5-flash',
                'gemini-3.5-flash-lite',
                'gemini-3.0-flash',
                'gemini-2.5-flash',
                'gemini-2.0-flash',
                'gemini-2.5-pro',
                'gemini-2.0-flash-exp',
                'gemini-1.5-flash-latest',
                'gemini-1.5-flash'
            ];

            let chosenModel = priority.find(p => validModels.includes(p));
            if (!chosenModel) {
                chosenModel = validModels.find(m => m.includes('flash')) || validModels[0] || 'gemini-3.8-flash';
            }

            console.log('✅ [Verify-Key] Success! Connected model:', chosenModel);
            apiKeyModelCache.set(cleanKey, { model: chosenModel, allAvailable: validModels, timestamp: Date.now() });

            return res.json({
                success: true,
                message: `API Key ใช้งานได้สมบูรณ์ (เชื่อมต่อสำเร็จกับโมเดล ${chosenModel})!`,
                model: chosenModel
            });

        } catch (fetchErr) {
            clearTimeout(timeoutId);
            if (fetchErr.name === 'AbortError') {
                return res.status(504).json({
                    success: false,
                    error: 'การเชื่อมต่อไปยัง Google หมดเวลา (Timeout) กรุณาตรวจสอบอินเทอร์เน็ตแล้วลองใหม่อีกครั้ง'
                });
            }
            throw fetchErr;
        }

    } catch (err) {
        console.error('Error verifying key:', err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// ==========================================
// 8. CEFR Vocabulary Quiz APIs (Per-User)
// ==========================================

// GET CEFR levels overview and user-isolated progress
app.get('/api/cefr/levels', (req, res) => {
    try {
        const userId = req.user.id;
        const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
        const stats = levels.map(lvl => {
            const totalWords = db.prepare('SELECT COUNT(*) as count FROM cefr_vocab_words WHERE cefr_level = ?').get(lvl).count;
            const masteredWords = db.prepare(`
                SELECT COUNT(*) as count 
                FROM cefr_word_mastery m
                JOIN cefr_vocab_words w ON m.word_id = w.id
                WHERE w.cefr_level = ? AND m.user_id = ? AND m.mastery_level = 'mastered'
            `).get(lvl, userId).count;
            const quizzesTaken = db.prepare('SELECT COUNT(*) as count FROM cefr_quiz_history WHERE cefr_level = ? AND user_id = ?').get(lvl, userId).count;
            
            return {
                level: lvl,
                title: lvl === 'A1' ? 'Beginner' : lvl === 'A2' ? 'Elementary' : lvl === 'B1' ? 'Intermediate (TGAT)' : lvl === 'B2' ? 'Upper Intermediate (TGAT/A-Level)' : lvl === 'C1' ? 'Advanced (A-Level)' : 'Proficiency (Elite)',
                total_words: totalWords,
                mastered_words: masteredWords,
                progress_percentage: totalWords > 0 ? Math.round((masteredWords / totalWords) * 100) : 0,
                quizzes_taken: quizzesTaken
            };
        });

        res.json({ success: true, data: stats });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// GET words in a specific CEFR level (Per-User Starred Tracking)
app.get('/api/cefr/words', (req, res) => {
    try {
        const userId = req.user.id;
        const { level, starred, search } = req.query;
        let query = `
            SELECT w.*, 
                COALESCE(m.times_seen, 0) as times_seen,
                COALESCE(m.times_correct, 0) as times_correct,
                COALESCE(m.is_starred, 0) as is_starred,
                COALESCE(m.mastery_level, 'learning') as mastery_level
            FROM cefr_vocab_words w
            LEFT JOIN cefr_word_mastery m ON w.id = m.word_id AND m.user_id = ?
            WHERE 1=1
        `;
        const params = [userId];

        if (level && level !== 'ALL') {
            query += ' AND w.cefr_level = ?';
            params.push(level);
        }
        if (starred === '1') {
            query += ' AND m.is_starred = 1';
        }
        if (search) {
            query += ' AND (w.word LIKE ? OR w.meaning_th LIKE ?)';
            params.push(`%${search}%`, `%${search}%`);
        }

        query += ' ORDER BY w.cefr_level ASC, w.word ASC';
        const words = db.prepare(query).all(...params);

        res.json({ success: true, data: words });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// POST generate dynamic quiz
app.post('/api/cefr/quiz/generate', (req, res) => {
    try {
        const { level = 'B2', count = 10, mode = 'meaning', timer_seconds = 15, timer_type = 'per_question' } = req.body;
        const targetCount = Math.min(100, Math.max(10, parseInt(count, 10) || 10));

        let targetWords;
        if (level === 'MIXED') {
            targetWords = db.prepare('SELECT * FROM cefr_vocab_words ORDER BY RANDOM() LIMIT ?').all(targetCount);
        } else {
            targetWords = db.prepare('SELECT * FROM cefr_vocab_words WHERE cefr_level = ? ORDER BY RANDOM() LIMIT ?').all(level, targetCount);
        }

        if (!targetWords || targetWords.length === 0) {
            return res.status(404).json({ success: false, error: 'ไม่พบคำศัพท์ในระดับนี้' });
        }

        const allWords = db.prepare('SELECT id, word, meaning_th, cefr_level FROM cefr_vocab_words').all();

        const questions = targetWords.map((tw, idx) => {
            const distractors = allWords
                .filter(w => w.id !== tw.id)
                .sort(() => 0.5 - Math.random())
                .slice(0, 3)
                .map(d => d.meaning_th);

            const options = [
                { label: '1', content: tw.meaning_th, is_correct: 1 },
                { label: '2', content: distractors[0], is_correct: 0 },
                { label: '3', content: distractors[1], is_correct: 0 },
                { label: '4', content: distractors[2], is_correct: 0 }
            ].sort(() => 0.5 - Math.random());

            options.forEach((opt, oIdx) => { opt.label = String(oIdx + 1); });

            return {
                id: `q_cefr_${idx + 1}`,
                word_id: tw.id,
                word: tw.word,
                phonetic: tw.phonetic,
                part_of_speech: tw.part_of_speech,
                cefr_level: tw.cefr_level,
                example_sentence: tw.example_sentence,
                correct_meaning_th: tw.meaning_th,
                correct_meaning_en: tw.meaning_en,
                options
            };
        });

        res.json({
            success: true,
            data: {
                quiz_id: 'quiz_' + Date.now(),
                level,
                mode,
                timer_type,
                timer_seconds: parseInt(timer_seconds, 10) || 15,
                total_questions: questions.length,
                questions
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// POST submit quiz result (Per-User Quiz Score & Mastery Upsert)
app.post('/api/cefr/quiz/submit', (req, res) => {
    try {
        const userId = req.user.id;
        const isRegistered = userId && userId !== 'usr_guest' && (!req.user || req.user.role !== 'guest');
        const { quiz_id, level = 'B2', mode = 'meaning', answers = [], time_spent_seconds = 0 } = req.body;
        if (!answers || answers.length === 0) {
            return res.status(400).json({ success: false, error: 'ไม่พบรายการคำตอบ' });
        }

        let correctCount = 0;
        if (isRegistered) {
            const upsertMastery = db.prepare(`
                INSERT INTO cefr_word_mastery (user_id, word_id, times_seen, times_correct, consecutive_correct, mastery_level, last_practiced_at)
                VALUES (@user_id, @word_id, 1, @is_correct, @is_correct, CASE WHEN @is_correct = 1 THEN 'learning' ELSE 'need_review' END, CURRENT_TIMESTAMP)
                ON CONFLICT(user_id, word_id) DO UPDATE SET
                    times_seen = times_seen + 1,
                    times_correct = times_correct + @is_correct,
                    consecutive_correct = CASE WHEN @is_correct = 1 THEN consecutive_correct + 1 ELSE 0 END,
                    mastery_level = CASE 
                        WHEN (consecutive_correct + @is_correct) >= 3 THEN 'mastered'
                        WHEN @is_correct = 1 THEN 'reviewing'
                        ELSE 'need_review'
                    END,
                    last_practiced_at = CURRENT_TIMESTAMP
            `);

            db.transaction(() => {
                for (const a of answers) {
                    if (a.is_correct) correctCount++;
                    upsertMastery.run({
                        user_id: userId,
                        word_id: a.word_id,
                        is_correct: a.is_correct ? 1 : 0
                    });
                }
            })();

            const scorePercentage = Math.round((correctCount / answers.length) * 100);
            const expEarned = (correctCount * 15) + (scorePercentage >= 80 ? 50 : 0);

            // Save history with user_id
            db.prepare(`
                INSERT INTO cefr_quiz_history (id, user_id, cefr_level, quiz_mode, total_questions, correct_count, score_percentage, exp_earned, time_spent_seconds)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            `).run(quiz_id || ('quiz_' + Date.now()), userId, level, mode, answers.length, correctCount, scorePercentage, expEarned, time_spent_seconds);
        } else {
            for (const a of answers) {
                if (a.is_correct) correctCount++;
            }
        }

        res.json({
            success: true,
            data: {
                correct_count: correctCount,
                total_questions: answers.length,
                score_percentage: scorePercentage,
                exp_earned: expEarned,
                level
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// POST toggle star on a word (Per-User Starred List)
app.post('/api/cefr/words/:id/toggle-star', (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const current = db.prepare('SELECT is_starred FROM cefr_word_mastery WHERE user_id = ? AND word_id = ?').get(userId, id);
        const newStarred = current ? (current.is_starred ? 0 : 1) : 1;

        db.prepare(`
            INSERT INTO cefr_word_mastery (user_id, word_id, is_starred, last_practiced_at)
            VALUES (?, ?, ?, CURRENT_TIMESTAMP)
            ON CONFLICT(user_id, word_id) DO UPDATE SET is_starred = ?
        `).run(userId, id, newStarred, newStarred);

        res.json({ success: true, is_starred: newStarred });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// ==========================================
// 10. TCAS Master AI Tutor & Saved Questions APIs
// ==========================================

// 1. GET /api/ai/saved-questions (List all saved questions for the current user)
app.get('/api/ai/saved-questions', (req, res) => {
    try {
        const userId = req.user.id;
        const saved = db.prepare(`
            SELECT 
                sq.id as saved_id,
                sq.question_id,
                sq.session_id,
                sq.user_selected_option,
                sq.notes,
                sq.created_at as saved_at,
                q.stimulus,
                q.question_text,
                q.image_url,
                q.difficulty,
                q.explanation,
                q.trap_analysis,
                q.set_number,
                s.id as subject_id,
                s.code as subject_code,
                s.name_th as subject_name_th,
                s.name_en as subject_name_en,
                b.id as blueprint_id,
                b.domain_name,
                b.subtopic_name,
                (SELECT COUNT(*) FROM ai_chat_messages WHERE user_id = sq.user_id AND question_id = sq.question_id) as chat_count
            FROM ai_saved_questions sq
            JOIN questions q ON sq.question_id = q.id
            JOIN subjects s ON q.subject_id = s.id
            JOIN blueprints b ON q.blueprint_id = b.id
            WHERE sq.user_id = ?
            ORDER BY sq.updated_at DESC, sq.created_at DESC
        `).all(userId);

        // Fetch options for each question
        const getOptions = db.prepare(`
            SELECT id, label, content, is_correct, order_index
            FROM question_options
            WHERE question_id = ?
            ORDER BY order_index ASC, label ASC
        `);

        for (const item of saved) {
            item.options = getOptions.all(item.question_id);
            const correctOpt = item.options.find(o => o.is_correct === 1);
            item.correct_label = correctOpt ? correctOpt.label : null;
            item.correct_content = correctOpt ? correctOpt.content : null;
        }

        res.json({ success: true, count: saved.length, data: saved });
    } catch (err) {
        console.error('Error fetching saved AI questions:', err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// 2. POST /api/ai/saved-questions (Save a question to ask AI)
app.post('/api/ai/saved-questions', (req, res) => {
    try {
        const userId = req.user.id;
        const { question_id, session_id, user_selected_option, notes } = req.body;

        if (!question_id) {
            return res.status(400).json({ success: false, error: 'question_id is required' });
        }

        const qExists = db.prepare('SELECT id FROM questions WHERE id = ?').get(question_id);
        if (!qExists) {
            return res.status(404).json({ success: false, error: 'Question not found' });
        }

        const id = `ais_${userId}_${question_id}`;
        db.prepare(`
            INSERT INTO ai_saved_questions (id, user_id, question_id, session_id, user_selected_option, notes, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
            ON CONFLICT(user_id, question_id) DO UPDATE SET
                session_id = COALESCE(excluded.session_id, ai_saved_questions.session_id),
                user_selected_option = COALESCE(excluded.user_selected_option, ai_saved_questions.user_selected_option),
                notes = COALESCE(excluded.notes, ai_saved_questions.notes),
                updated_at = CURRENT_TIMESTAMP
        `).run(id, userId, question_id, session_id || null, user_selected_option || null, notes || null);

        res.json({ success: true, message: 'บันทึกข้อสอบเข้าคลัง TCAS Master AI สำเร็จ', saved_id: id });
    } catch (err) {
        console.error('Error saving question for AI:', err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// 3. DELETE /api/ai/saved-questions/:questionId (Remove question from saved list)
app.delete('/api/ai/saved-questions/:questionId', (req, res) => {
    try {
        const userId = req.user.id;
        const { questionId } = req.params;

        db.prepare('DELETE FROM ai_saved_questions WHERE user_id = ? AND question_id = ?').run(userId, questionId);
        res.json({ success: true, message: 'ลบข้อสอบออกจากรายการ AI แล้ว' });
    } catch (err) {
        console.error('Error deleting saved AI question:', err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// 4. GET /api/ai/chat/:questionId (Get chat history & context for a question)
app.get('/api/ai/chat/:questionId', (req, res) => {
    try {
        const userId = req.user.id;
        const { questionId } = req.params;

        // Fetch question info
        const question = db.prepare(`
            SELECT 
                q.id, q.stimulus, q.question_text, q.image_url, q.difficulty, q.explanation, q.trap_analysis, q.set_number,
                s.id as subject_id, s.code as subject_code, s.name_th as subject_name_th, s.name_en as subject_name_en,
                b.domain_name, b.subtopic_name,
                sq.user_selected_option, sq.notes
            FROM questions q
            JOIN subjects s ON q.subject_id = s.id
            JOIN blueprints b ON q.blueprint_id = b.id
            LEFT JOIN ai_saved_questions sq ON sq.question_id = q.id AND sq.user_id = ?
            WHERE q.id = ?
        `).get(userId, questionId);

        if (!question) {
            return res.status(404).json({ success: false, error: 'Question not found' });
        }

        // Fetch options
        question.options = db.prepare(`
            SELECT id, label, content, is_correct, order_index
            FROM question_options
            WHERE question_id = ?
            ORDER BY order_index ASC, label ASC
        `).all(questionId);

        const correctOpt = question.options.find(o => o.is_correct === 1);
        question.correct_label = correctOpt ? correctOpt.label : null;
        question.correct_content = correctOpt ? correctOpt.content : null;

        // Fetch chat history
        const messages = db.prepare(`
            SELECT id, role, content, created_at
            FROM ai_chat_messages
            WHERE user_id = ? AND question_id = ?
            ORDER BY created_at ASC
        `).all(userId, questionId);

        // Standardized System Prompt enforcing equality (NO "รุ่นพี่/รุ่นน้อง")
        const systemPrompt = `คุณคือ "TCAS Master AI" ระบบปัญญาประดิษฐ์ผู้เชี่ยวชาญด้านการวิเคราะห์ข้อสอบและการเรียนรู้สำหรับการสอบ TCAS (TGAT, TPAT, A-Level)

นโยบายการสื่อสารสำคัญที่สุด (Strict Policy):
1. นโยบายความเท่าเทียม (ห้ามระบบรุ่นพี่-รุ่นน้องเด็ดขาด):
   - ห้ามใช้สรรพนามแบบรุ่นพี่หรือรุ่นน้องโดยเด็ดขาด (ห้ามแทนตัวเองว่า "พี่", "พี่ติวเตอร์", และห้ามเรียกผู้ใช้ว่า "น้อง", "น้องๆ")
   - ให้ปฏิบัติต่อผู้ใช้ในฐานะ "ผู้ร่วมเรียนรู้และคู่คิดทางวิชาการที่เท่าเทียมกัน"
   - ใช้สรรพนามที่สุภาพ ให้เกียรติ และเป็นมิตร เช่น "ผม", "เรา", "คุณ"
2. หน้าที่หลัก:
   - วิเคราะห์ข้อสอบเจาะลึก อธิบายหลักการคิด (Core Concept) และกระบวนการคิดอย่างเป็นขั้นตอน
   - ชี้จุดที่ผู้ออกข้อสอบวางกับดักไว้ (Trap & Distractor Analysis) และอธิบายเหตุผลว่าทำไมตัวเลือกที่ผิดถึงผิด
   - แนะนำเทคนิคการตัดช้อยส์ การสังเกตคีย์เวิร์ด และการเชื่อมโยงความรู้ตาม Test Blueprint ของ ทปอ.
3. การตอบคำถาม:
   - กระชับ ตรงประเด็น เข้าใจง่าย ไม่อ้อมค้อม
   - หากมีสมการคณิตศาสตร์หรือสัญลักษณ์วิทยาศาสตร์ ให้ใช้ LaTeX เสมอ เช่น $x^2$ หรือ $$...$$
   - หากผู้ใช้ขอโจทย์ทดสอบความเข้าใจ ให้สร้างโจทย์ใหม่แนวเดียวกันพร้อมเฉลยและวิธีคิด

บริบทของข้อสอบที่กำลังวิเคราะห์:
- วิชา: ${question.subject_name_th} (${question.subject_code})
- สาระ/พาร์ท: ${question.domain_name} (${question.subtopic_name})
- ชุดข้อสอบ: Set ${question.set_number || 1}
${question.stimulus ? `- บทความ/เนื้อเรื่องนำ (Stimulus):\n"""\n${question.stimulus}\n"""` : ''}
- คำถาม: ${question.question_text}
- ตัวเลือก:
${question.options.map(o => `  [${o.label}] ${o.content} ${o.is_correct ? '(คำตอบที่ถูกต้อง)' : ''}`).join('\n')}
- คำตอบที่ถูกต้อง: [${question.correct_label}] ${question.correct_content}
${question.user_selected_option ? `- ตัวเลือกที่ผู้ใช้ตอบไว้: [${question.user_selected_option}]` : ''}
- เฉลยละเอียด: ${question.explanation}
${question.trap_analysis ? `- วิเคราะห์จุดลวง/ข้อควรระวัง: ${question.trap_analysis}` : ''}
`;

        res.json({
            success: true,
            question,
            messages,
            system_prompt: systemPrompt
        });
    } catch (err) {
        console.error('Error fetching chat history:', err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// 5. POST /api/ai/chat/:questionId (Save user or assistant message to chat history)
app.post('/api/ai/chat/:questionId', (req, res) => {
    try {
        const userId = req.user.id;
        const { questionId } = req.params;
        const { role, content } = req.body;

        if (!role || !content) {
            return res.status(400).json({ success: false, error: 'role and content are required' });
        }

        if (!['user', 'assistant'].includes(role)) {
            return res.status(400).json({ success: false, error: 'role must be user or assistant' });
        }

        const msgId = `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        db.prepare(`
            INSERT INTO ai_chat_messages (id, user_id, question_id, role, content, created_at)
            VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
        `).run(msgId, userId, questionId, role, content);

        // Also touch ai_saved_questions updated_at if exists
        db.prepare(`
            UPDATE ai_saved_questions 
            SET updated_at = CURRENT_TIMESTAMP 
            WHERE user_id = ? AND question_id = ?
        `).run(userId, questionId);

        res.json({ success: true, message: 'Message saved', id: msgId, created_at: new Date().toISOString() });
    } catch (err) {
        console.error('Error saving chat message:', err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// 6. DELETE /api/ai/chat/:questionId (Clear chat history for a question)
app.delete('/api/ai/chat/:questionId', (req, res) => {
    try {
        const userId = req.user.id;
        const { questionId } = req.params;

        db.prepare('DELETE FROM ai_chat_messages WHERE user_id = ? AND question_id = ?').run(userId, questionId);
        res.json({ success: true, message: 'ล้างประวัติการสนทนาข้อนี้เรียบร้อยแล้ว' });
    } catch (err) {
        console.error('Error clearing chat history:', err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// Catch-all fallback to serve index.html
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// Export server instance or start listener
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🚀 TCAS Master Server running on http://localhost:${PORT}`);
    });
}

module.exports = app;
