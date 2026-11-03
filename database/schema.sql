-- TCAS Master Database Schema
-- Optimized for SQLite 3

PRAGMA foreign_keys = ON;

-- 0. Users & Authentication Tables (ระบบบัญชีผู้ใช้)
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,                       -- e.g. 'usr_1729000000_abcd'
    username TEXT NOT NULL UNIQUE,             -- ชื่อผู้ใช้สำหรับล็อกอิน
    password_hash TEXT NOT NULL,               -- รหัสผ่านแฮช (scrypt)
    salt TEXT NOT NULL,                        -- Salt สุ่มประจำบัญชี
    display_name TEXT NOT NULL,                -- ชื่อแสดงผล / นามปากกา
    avatar_url TEXT DEFAULT '👨‍🎓',             -- ไอคอน Avatar หรืออิโมจิ
    role TEXT DEFAULT 'student',               -- 'student', 'admin'
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_login_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_auth_tokens (
    token TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    expires_at DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 1. Subjects Table (วิชาสอบ)
CREATE TABLE IF NOT EXISTS subjects (
    id TEXT PRIMARY KEY,               -- e.g. 'tgat1', 'tgat2', 'tgat3', 'alevel_math1'
    code TEXT NOT NULL,                 -- e.g. '91', '92', '93', '61'
    name_th TEXT NOT NULL,             -- e.g. 'TGAT1 การสื่อสารภาษาอังกฤษ'
    name_en TEXT NOT NULL,             -- e.g. 'English Communication'
    category TEXT NOT NULL,            -- 'TGAT', 'TPAT', 'A_LEVEL'
    total_questions INTEGER NOT NULL,  -- จำนวนข้อรวม
    total_score REAL NOT NULL,         -- คะแนนเต็ม
    duration_minutes INTEGER NOT NULL, -- เวลาสอบจริง (นาที)
    description TEXT,
    icon_name TEXT DEFAULT 'book-open'
);

-- 2. Blueprints Table (โครงสร้างสาระ / สัดส่วนข้อสอบตามประกาศ ทปอ.)
CREATE TABLE IF NOT EXISTS blueprints (
    id TEXT PRIMARY KEY,               -- e.g. 'tgat1_speaking_qr'
    subject_id TEXT NOT NULL,          -- FK to subjects
    domain_name TEXT NOT NULL,         -- e.g. 'ทักษะการพูด (Speaking Skill)'
    subtopic_name TEXT NOT NULL,       -- e.g. 'Question-Response'
    description TEXT,                  -- ขอบเขตเนื้อหา
    target_questions INTEGER NOT NULL, -- จำนวนข้อในพาร์ทนี้ตามเกณฑ์
    score_weight REAL NOT NULL,        -- น้ำหนักคะแนน
    order_index INTEGER DEFAULT 0,
    FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE
);

-- 3. Questions Table (คลังข้อสอบ)
CREATE TABLE IF NOT EXISTS questions (
    id TEXT PRIMARY KEY,               -- e.g. 'q_tgat1_001'
    subject_id TEXT NOT NULL,
    blueprint_id TEXT NOT NULL,
    stimulus TEXT,                     -- บทความ / Passage / บทสนทนาส่วนกลาง
    question_text TEXT NOT NULL,       -- คำถาม (รองรับ Markdown / LaTeX)
    image_url TEXT,                    -- รูปรอบโจทย์ (ถ้ามี)
    difficulty TEXT DEFAULT 'medium',  -- 'easy', 'medium', 'hard'
    explanation TEXT NOT NULL,         -- เฉลยละเอียดและหลักการคิด
    trap_analysis TEXT,                -- จุดที่คนชอบโดนหลอก (Common Traps)
    is_custom INTEGER DEFAULT 0,       -- 1 if user added manually
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE,
    FOREIGN KEY (blueprint_id) REFERENCES blueprints(id) ON DELETE CASCADE
);

-- 4. Question Options Table (ตัวเลือก ก ข ค ง จ)
CREATE TABLE IF NOT EXISTS question_options (
    id TEXT PRIMARY KEY,               -- e.g. 'opt_q_tgat1_001_A'
    question_id TEXT NOT NULL,
    label TEXT NOT NULL,               -- '1', '2', '3', '4', '5' หรือ 'A', 'B', 'C', 'D'
    content TEXT NOT NULL,             -- ข้อความตัวเลือก
    is_correct INTEGER NOT NULL DEFAULT 0, -- 1 = ถูก, 0 = ผิด
    order_index INTEGER DEFAULT 0,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);

-- 5. Exam Sessions Table (รอบการทำข้อสอบ - ผูกกับ user_id เพื่อจดจำคะแนน)
CREATE TABLE IF NOT EXISTS exam_sessions (
    id TEXT PRIMARY KEY,
    user_id TEXT REFERENCES users(id),
    subject_id TEXT NOT NULL,
    session_type TEXT NOT NULL,        -- 'full_mock', 'topic_drill', 'mistakes_review'
    filter_blueprint_id TEXT,          -- ถ้าเจาะจงพาร์ท
    total_questions INTEGER NOT NULL,
    correct_count INTEGER DEFAULT 0,
    score_earned REAL DEFAULT 0,
    max_score REAL NOT NULL,
    time_limit_seconds INTEGER NOT NULL,
    time_spent_seconds INTEGER DEFAULT 0,
    status TEXT DEFAULT 'in_progress', -- 'in_progress', 'completed', 'abandoned'
    started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    finished_at DATETIME,
    FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE
);

-- 6. User Answers Table (การตอบแต่ละข้อ)
CREATE TABLE IF NOT EXISTS user_answers (
    id TEXT PRIMARY KEY,
    session_id TEXT NOT NULL,
    question_id TEXT NOT NULL,
    selected_option_id TEXT,
    is_correct INTEGER DEFAULT 0,
    time_spent_seconds INTEGER DEFAULT 0,
    is_flagged INTEGER DEFAULT 0,      -- ปักหมุดไว้ทบทวน
    answered_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (session_id) REFERENCES exam_sessions(id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE,
    FOREIGN KEY (selected_option_id) REFERENCES question_options(id) ON DELETE SET NULL
);

-- 6.1. Mastered / Completed Questions Table (คลังข้อสอบที่ทำถูกต้องแล้ว & ตัดออกจากข้อสอบหลัก)
CREATE TABLE IF NOT EXISTS user_mastered_questions (
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    question_id TEXT NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    first_passed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_passed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    times_correct INTEGER DEFAULT 1,
    PRIMARY KEY(user_id, question_id)
);
CREATE INDEX IF NOT EXISTS idx_mastered_q_user ON user_mastered_questions(user_id);
CREATE INDEX IF NOT EXISTS idx_mastered_q_qid ON user_mastered_questions(question_id);

-- 7. Mistake Notebook Table (สมุดบันทึกข้อผิดพลาด & จุดอ่อน - ผูกตาม user_id)
CREATE TABLE IF NOT EXISTS mistake_notebook (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id),
    question_id TEXT NOT NULL,
    user_note TEXT,
    mastery_status TEXT DEFAULT 'need_review', -- 'need_review', 'reviewing', 'mastered'
    times_wrong INTEGER DEFAULT 1,
    last_reviewed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, question_id),
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);

-- 8. Vocabulary Bank Table (คลังคำศัพท์และจดจำศัพท์อังกฤษ - ผูกตาม user_id)
CREATE TABLE IF NOT EXISTS vocab_bank (
    id TEXT PRIMARY KEY,
    user_id TEXT REFERENCES users(id),
    word TEXT NOT NULL,
    phonetic TEXT,
    definition_th TEXT NOT NULL,
    part_of_speech TEXT,
    context_sentence TEXT,
    mastery_status TEXT DEFAULT 'learning', -- 'learning', 'reviewing', 'mastered'
    source_question_id TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (source_question_id) REFERENCES questions(id) ON DELETE SET NULL
);

-- ==========================================
-- 9. CEFR Vocabulary Quiz Tables (A1 - C2)
-- ==========================================

-- 9.1 คลังคำศัพท์จัดตามระดับสากล CEFR
CREATE TABLE IF NOT EXISTS cefr_vocab_words (
    id TEXT PRIMARY KEY,                       -- e.g. 'v_b2_001'
    word TEXT NOT NULL,                        -- e.g. 'reconciliation'
    part_of_speech TEXT NOT NULL,              -- e.g. 'noun', 'verb', 'adjective', 'adverb'
    cefr_level TEXT NOT NULL,                  -- 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'
    phonetic TEXT,                             -- e.g. '/ˌrek.ənˌsɪl.iˈeɪ.ʃən/'
    meaning_th TEXT NOT NULL,                  -- คำแปลภาษาไทย
    meaning_en TEXT,                           -- คำนิยามภาษาอังกฤษ
    example_sentence TEXT,                     -- ประโยคตัวอย่างการใช้
    synonyms TEXT,                             -- JSON string หรือคำเหมือนคั่นด้วยจุลภาค
    antonyms TEXT,                             -- JSON string หรือคำตรงข้าม
    frequency_tier INTEGER DEFAULT 1,          -- 1 = ออกสอบบ่อยใน TGAT/A-Level
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 9.2 บันทึกประวัติและสถิติการเล่นควิซ CEFR แต่ละรอบ (ผูกตาม user_id)
CREATE TABLE IF NOT EXISTS cefr_quiz_history (
    id TEXT PRIMARY KEY,                       -- e.g. 'quiz_1729000000'
    user_id TEXT REFERENCES users(id),
    cefr_level TEXT NOT NULL,                  -- 'A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'MIXED'
    quiz_mode TEXT NOT NULL DEFAULT 'meaning', -- 'meaning', 'context_clues', 'synonym_match'
    total_questions INTEGER NOT NULL DEFAULT 10,
    correct_count INTEGER DEFAULT 0,
    score_percentage REAL DEFAULT 0.0,
    exp_earned INTEGER DEFAULT 0,
    time_spent_seconds INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 9.3 ระบบติดตามการจดจำรายคำศัพท์ (Spaced Repetition & Mastery Tracking - ผูกตาม user_id)
CREATE TABLE IF NOT EXISTS cefr_word_mastery (
    user_id TEXT NOT NULL REFERENCES users(id),
    word_id TEXT NOT NULL REFERENCES cefr_vocab_words(id) ON DELETE CASCADE,
    times_seen INTEGER DEFAULT 0,              -- เคยเจอแล้วกี่ครั้ง
    times_correct INTEGER DEFAULT 0,           -- ตอบถูกกี่ครั้ง
    consecutive_correct INTEGER DEFAULT 0,     -- ตอบถูกติดต่อกันกี่ครั้ง
    is_starred INTEGER DEFAULT 0,              -- 1 = ติดดาวไว้ทบทวน
    mastery_level TEXT DEFAULT 'learning',     -- 'learning', 'reviewing', 'mastered'
    last_practiced_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(user_id, word_id)
);

-- 10. AI Tutor System Tables (ระบบ TCAS Master AI วิเคราะห์ข้อสอบและคู่คิดทางวิชาการ)

-- 10.1 ตารางข้อสอบที่ผู้ใช้บันทึกไว้ถาม AI
CREATE TABLE IF NOT EXISTS ai_saved_questions (
    id TEXT PRIMARY KEY,                       -- e.g. 'ais_usr_123_q_tgat1_001'
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    question_id TEXT NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    session_id TEXT REFERENCES exam_sessions(id) ON DELETE SET NULL,
    user_selected_option TEXT,                 -- ตัวเลือกที่ผู้ใช้ตอบไว้ (เช่น '1', '2', 'A')
    notes TEXT,                                -- โน้ตย่อหรือคำถามของผู้ใช้
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, question_id)
);

-- 10.2 ตารางประวัติการสนทนาโต้ตอบกับ AI รายข้อสอบ
CREATE TABLE IF NOT EXISTS ai_chat_messages (
    id TEXT PRIMARY KEY,                       -- e.g. 'msg_1729000000_abcd'
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    question_id TEXT NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    role TEXT NOT NULL,                        -- 'user' หรือ 'assistant'
    content TEXT NOT NULL,                     -- ข้อความสนทนา (รองรับ Markdown/LaTeX)
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for high performance
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_user_auth_tokens ON user_auth_tokens(token);
CREATE INDEX IF NOT EXISTS idx_blueprints_subject ON blueprints(subject_id);
CREATE INDEX IF NOT EXISTS idx_questions_subject ON questions(subject_id);
CREATE INDEX IF NOT EXISTS idx_questions_blueprint ON questions(blueprint_id);
CREATE INDEX IF NOT EXISTS idx_options_question ON question_options(question_id);
CREATE INDEX IF NOT EXISTS idx_answers_session ON user_answers(session_id);
CREATE INDEX IF NOT EXISTS idx_sessions_user ON exam_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_mistakes_user ON mistake_notebook(user_id);
CREATE INDEX IF NOT EXISTS idx_vocab_user ON vocab_bank(user_id);
CREATE INDEX IF NOT EXISTS idx_cefr_level ON cefr_vocab_words(cefr_level);
CREATE INDEX IF NOT EXISTS idx_cefr_word ON cefr_vocab_words(word);
CREATE INDEX IF NOT EXISTS idx_cefr_quiz_user ON cefr_quiz_history(user_id);
CREATE INDEX IF NOT EXISTS idx_cefr_mastery_user ON cefr_word_mastery(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_saved_user ON ai_saved_questions(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_saved_question ON ai_saved_questions(question_id);
CREATE INDEX IF NOT EXISTS idx_ai_chat_user_q ON ai_chat_messages(user_id, question_id);

