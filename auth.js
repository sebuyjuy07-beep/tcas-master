const crypto = require('crypto');
const db = require('./database/db');

function hashPassword(password, salt) {
    return crypto.scryptSync(password, salt, 64).toString('hex');
}

function generateSalt() {
    return crypto.randomBytes(16).toString('hex');
}

function generateToken() {
    return 'tok_' + crypto.randomBytes(32).toString('hex');
}

// Ensure guest user exists for unauthenticated operations
try {
    db.prepare(`
        INSERT OR IGNORE INTO users (id, username, password_hash, salt, display_name, avatar_url, role)
        VALUES ('usr_guest', 'guest', 'guest_locked', 'guest', 'ผู้ใช้งานทั่วไป', '👤', 'guest')
    `).run();
} catch (e) {}

// Authentication Middleware
function authMiddleware(req, res, next) {
    try {
        let token = null;
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.substring(7).trim();
        } else if (req.headers['x-auth-token']) {
            token = req.headers['x-auth-token'].trim();
        } else if (req.query && req.query.token) {
            token = req.query.token.trim();
        }

        if (token) {
            const user = db.prepare(`
                SELECT u.id, u.username, u.display_name, u.avatar_url, u.role, u.created_at
                FROM user_auth_tokens t
                JOIN users u ON t.user_id = u.id
                WHERE t.token = ?
            `).get(token);

            if (user) {
                req.user = user;
                req.token = token;
                return next();
            }
        }

        // Unauthenticated visitor (guest)
        req.user = {
            id: 'usr_guest',
            username: 'guest',
            display_name: 'ผู้ใช้งานทั่วไป',
            avatar_url: '👤',
            role: 'guest'
        };
        req.token = null;
        next();
    } catch (err) {
        console.error('Auth middleware error:', err);
        req.user = { id: 'usr_guest', username: 'guest', display_name: 'ผู้ใช้งานทั่วไป', avatar_url: '👤', role: 'guest' };
        req.token = null;
        next();
    }
}

// User Registration
function registerUser({ username, password, display_name, avatar_url }) {
    if (!username || !password) {
        throw new Error('กรุณากรอกชื่อผู้ใช้และรหัสผ่าน');
    }

    const cleanUsername = username.trim().toLowerCase();
    if (cleanUsername.length < 3) {
        throw new Error('ชื่อผู้ใช้ต้องมีความยาวอย่างน้อย 3 ตัวอักษร');
    }
    if (!/^[a-zA-Z0-9_]+$/.test(cleanUsername)) {
        throw new Error('ชื่อผู้ใช้ต้องเป็นตัวอักษรภาษาอังกฤษ ตัวเลข หรือขีดล่าง (_) เท่านั้น');
    }
    if (password.length < 4) {
        throw new Error('รหัสผ่านต้องมีความยาวอย่างน้อย 4 ตัวอักษร');
    }

    // Check if username already exists
    const existing = db.prepare('SELECT id FROM users WHERE LOWER(username) = ?').get(cleanUsername);
    if (existing) {
        throw new Error('ชื่อผู้ใช้นี้มีผู้อื่นใช้งานแล้ว กรุณาเลือกชื่ออื่น');
    }

    const userId = 'usr_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6);
    const salt = generateSalt();
    const passwordHash = hashPassword(password, salt);
    const cleanDisplayName = (display_name || '').trim() || cleanUsername;
    const cleanAvatar = (avatar_url || '').trim() || '👨‍🎓';

    db.prepare(`
        INSERT INTO users (id, username, password_hash, salt, display_name, avatar_url, role, created_at, last_login_at)
        VALUES (?, ?, ?, ?, ?, ?, 'student', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `).run(userId, cleanUsername, passwordHash, salt, cleanDisplayName, cleanAvatar);

    // Issue auth token
    const token = generateToken();
    db.prepare(`
        INSERT INTO user_auth_tokens (token, user_id, created_at)
        VALUES (?, ?, CURRENT_TIMESTAMP)
    `).run(token, userId);

    const user = getUserProfile(userId);
    return { token, user };
}

// User Login
function loginUser({ username, password }) {
    if (!username || !password) {
        throw new Error('กรุณากรอกชื่อผู้ใช้และรหัสผ่าน');
    }

    const cleanUsername = username.trim().toLowerCase();
    const userRow = db.prepare('SELECT * FROM users WHERE LOWER(username) = ?').get(cleanUsername);
    if (!userRow) {
        throw new Error('ไม่พบบัญชีผู้ใช้นี้ หรือรหัสผ่านไม่ถูกต้อง');
    }

    const testHash = hashPassword(password, userRow.salt);
    if (testHash !== userRow.password_hash) {
        throw new Error('รหัสผ่านไม่ถูกต้อง');
    }

    // Update last login
    db.prepare('UPDATE users SET last_login_at = CURRENT_TIMESTAMP WHERE id = ?').run(userRow.id);

    // Issue auth token
    const token = generateToken();
    db.prepare(`
        INSERT INTO user_auth_tokens (token, user_id, created_at)
        VALUES (?, ?, CURRENT_TIMESTAMP)
    `).run(token, userRow.id);

    const user = getUserProfile(userRow.id);
    return { token, user };
}

// Get User Profile & Personal Stats
function getUserProfile(userId) {
    const user = db.prepare('SELECT id, username, display_name, avatar_url, role, created_at, last_login_at FROM users WHERE id = ?').get(userId);
    if (!user) return null;

    const sessionStats = db.prepare(`
        SELECT COUNT(*) as total_exams,
               COALESCE(SUM(score_earned), 0) as total_score,
               COALESCE(SUM(time_spent_seconds), 0) as total_time
        FROM exam_sessions 
        WHERE user_id = ? AND status = 'completed'
    `).get(userId);

    const answerStats = db.prepare(`
        SELECT COUNT(ua.id) as total_answered,
               COALESCE(SUM(ua.is_correct), 0) as total_correct
        FROM user_answers ua
        JOIN exam_sessions es ON ua.session_id = es.id
        WHERE es.user_id = ?
    `).get(userId);

    const mistakesStats = db.prepare(`
        SELECT COUNT(*) as active_mistakes,
               COALESCE(SUM(CASE WHEN mastery_status = 'mastered' THEN 1 ELSE 0 END), 0) as mastered_mistakes
        FROM mistake_notebook
        WHERE user_id = ?
    `).get(userId);

    const vocabStats = db.prepare(`
        SELECT COUNT(*) as total_vocab
        FROM vocab_bank
        WHERE user_id = ?
    `).get(userId);

    const cefrStats = db.prepare(`
        SELECT COALESCE(SUM(exp_earned), 0) as cefr_exp,
               COALESCE(SUM(correct_count), 0) as cefr_correct,
               COUNT(*) as quizzes_taken
        FROM cefr_quiz_history
        WHERE user_id = ?
    `).get(userId);

    const activeDates = db.prepare(`
        SELECT DISTINCT substr(started_at, 1, 10) as act_date
        FROM exam_sessions
        WHERE user_id = ? AND status = 'completed'
        ORDER BY act_date DESC
        LIMIT 14
    `).all(userId).map(r => r.act_date);
    let streak = activeDates.length > 0 ? Math.min(activeDates.length, 7) : 0;
    if (sessionStats.total_exams > 0 && streak === 0) streak = 1;

    let totalMastered = 0;
    try {
        const mRow = db.prepare('SELECT COUNT(*) as c FROM user_mastered_questions WHERE user_id = ?').get(userId);
        if (mRow) totalMastered = mRow.c;
    } catch (e) {}

    const totalXp = (answerStats.total_correct * 25) +
                    (sessionStats.total_exams * 120) +
                    (mistakesStats.mastered_mistakes * 50) +
                    (vocabStats.total_vocab * 20) +
                    (cefrStats.cefr_exp) +
                    (streak * 75);

    const level = Math.max(1, Math.floor(Math.sqrt(totalXp / 80)) + 1);
    const accuracy = answerStats.total_answered > 0
        ? Math.round((answerStats.total_correct / answerStats.total_answered) * 100)
        : 0;

    return {
        ...user,
        stats: {
            total_exams: sessionStats.total_exams,
            total_score: Math.round(sessionStats.total_score * 10) / 10,
            total_time_minutes: Math.round(sessionStats.total_time / 60),
            total_answered: answerStats.total_answered,
            total_correct: answerStats.total_correct,
            accuracy_pct: accuracy,
            active_mistakes: mistakesStats.active_mistakes,
            mastered_mistakes: mistakesStats.mastered_mistakes,
            total_vocab: vocabStats.total_vocab,
            total_mastered: totalMastered,
            streak_days: streak,
            cefr_quizzes: cefrStats.quizzes_taken,
            total_xp: totalXp,
            level
        }
    };
}

// Get Global Leaderboard
function getLeaderboard() {
    const allUsers = db.prepare("SELECT id, username, display_name, avatar_url FROM users WHERE role != 'guest'").all();
    
    const board = allUsers.map(u => {
        const prof = getUserProfile(u.id);
        return {
            id: u.id,
            username: u.username,
            display_name: u.display_name,
            avatar_url: u.avatar_url || '👨‍🎓',
            total_exams: prof ? prof.stats.total_exams : 0,
            total_score: prof ? prof.stats.total_score : 0,
            accuracy_pct: prof ? prof.stats.accuracy_pct : 0,
            level: prof ? prof.stats.level : 1,
            total_xp: prof ? prof.stats.total_xp : 0
        };
    });

    board.sort((a, b) => b.total_xp - a.total_xp || b.total_score - a.total_score);
    return board.slice(0, 20);
}

module.exports = {
    hashPassword,
    generateSalt,
    generateToken,
    authMiddleware,
    registerUser,
    loginUser,
    getUserProfile,
    getLeaderboard
};
