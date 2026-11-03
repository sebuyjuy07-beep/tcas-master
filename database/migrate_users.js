const crypto = require('crypto');
const path = require('path');
const Database = require('better-sqlite3');

function hashPassword(password, salt) {
    return crypto.scryptSync(password, salt, 64).toString('hex');
}

function generateSalt() {
    return crypto.randomBytes(16).toString('hex');
}

function migrateUsers(targetDb) {
    if (!targetDb) {
        const dbPath = path.join(__dirname, 'tcas_exam.db');
        targetDb = new Database(dbPath);
    }
    console.log('🔄 Running User Account & Score Tracking Migration...');

    // 1. Create users table & auth tokens
    targetDb.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            username TEXT NOT NULL UNIQUE,
            password_hash TEXT NOT NULL,
            salt TEXT NOT NULL,
            display_name TEXT NOT NULL,
            avatar_url TEXT DEFAULT '👨‍🎓',
            role TEXT DEFAULT 'student',
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
    `);

    // 2. Ensure default demo user exists
    let defaultUser = targetDb.prepare('SELECT * FROM users WHERE username = ?').get('student');
    if (!defaultUser) {
        const defaultId = 'usr_default_student';
        const salt = generateSalt();
        const hash = hashPassword('password123', salt);
        targetDb.prepare(`
            INSERT INTO users (id, username, password_hash, salt, display_name, avatar_url, role)
            VALUES (?, 'student', ?, ?, 'นักรบ TCAS (Student)', '👨‍🎓', 'student')
        `).run(defaultId, hash, salt);
        defaultUser = targetDb.prepare('SELECT * FROM users WHERE id = ?').get(defaultId);
        console.log('  ✅ Created default user: student / password123');
    }

    // Helper to safely add column if not exists
    function addColumnIfNotExists(table, column, colDef) {
        const columns = targetDb.prepare(`PRAGMA table_info(${table})`).all();
        const hasCol = columns.some(c => c.name === column);
        if (!hasCol) {
            console.log(`  ➕ Adding column '${column}' to table '${table}'`);
            targetDb.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${colDef}`);
        }
    }

    addColumnIfNotExists('exam_sessions', 'user_id', 'TEXT REFERENCES users(id)');
    addColumnIfNotExists('vocab_bank', 'user_id', 'TEXT REFERENCES users(id)');
    addColumnIfNotExists('cefr_quiz_history', 'user_id', 'TEXT REFERENCES users(id)');
    addColumnIfNotExists('questions', 'set_number', 'INTEGER DEFAULT 1');

    // 3. Recreate mistake_notebook with UNIQUE(user_id, question_id)
    targetDb.exec(`
        CREATE TABLE IF NOT EXISTS mistake_notebook_upgrade (
            id TEXT PRIMARY KEY,
            user_id TEXT NOT NULL REFERENCES users(id),
            question_id TEXT NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
            user_note TEXT,
            mastery_status TEXT DEFAULT 'need_review',
            times_wrong INTEGER DEFAULT 1,
            last_reviewed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            UNIQUE(user_id, question_id)
        );
    `);

    const hasOldMistakes = targetDb.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='mistake_notebook'").get();
    if (hasOldMistakes) {
        const oldCols = targetDb.prepare("PRAGMA table_info(mistake_notebook)").all();
        const hasUserId = oldCols.some(c => c.name === 'user_id');
        const userSelect = hasUserId ? `COALESCE(user_id, '${defaultUser.id}')` : `'${defaultUser.id}'`;

        targetDb.exec(`
            INSERT OR IGNORE INTO mistake_notebook_upgrade (id, user_id, question_id, user_note, mastery_status, times_wrong, last_reviewed_at, created_at)
            SELECT 
                COALESCE(id, 'mst_' || ${userSelect} || '_' || question_id),
                ${userSelect},
                question_id,
                user_note,
                COALESCE(mastery_status, 'need_review'),
                COALESCE(times_wrong, 1),
                COALESCE(last_reviewed_at, CURRENT_TIMESTAMP),
                COALESCE(created_at, CURRENT_TIMESTAMP)
            FROM mistake_notebook;
            DROP TABLE mistake_notebook;
            ALTER TABLE mistake_notebook_upgrade RENAME TO mistake_notebook;
        `);
        console.log('  ✅ Upgraded mistake_notebook table with multi-user UNIQUE(user_id, question_id)');
    }

    // 4. Recreate cefr_word_mastery with PRIMARY KEY(user_id, word_id)
    targetDb.exec(`
        CREATE TABLE IF NOT EXISTS cefr_word_mastery_upgrade (
            user_id TEXT NOT NULL REFERENCES users(id),
            word_id TEXT NOT NULL REFERENCES cefr_vocab_words(id) ON DELETE CASCADE,
            times_seen INTEGER DEFAULT 0,
            times_correct INTEGER DEFAULT 0,
            consecutive_correct INTEGER DEFAULT 0,
            is_starred INTEGER DEFAULT 0,
            mastery_level TEXT DEFAULT 'learning',
            last_practiced_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY(user_id, word_id)
        );
    `);

    const hasOldMastery = targetDb.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='cefr_word_mastery'").get();
    if (hasOldMastery) {
        const oldMasteryCols = targetDb.prepare("PRAGMA table_info(cefr_word_mastery)").all();
        const hasUserIdMastery = oldMasteryCols.some(c => c.name === 'user_id');
        const userMasterySelect = hasUserIdMastery ? `COALESCE(user_id, '${defaultUser.id}')` : `'${defaultUser.id}'`;

        targetDb.exec(`
            INSERT OR IGNORE INTO cefr_word_mastery_upgrade (user_id, word_id, times_seen, times_correct, consecutive_correct, is_starred, mastery_level, last_practiced_at)
            SELECT 
                ${userMasterySelect},
                word_id,
                COALESCE(times_seen, 0),
                COALESCE(times_correct, 0),
                COALESCE(consecutive_correct, 0),
                COALESCE(is_starred, 0),
                COALESCE(mastery_level, 'learning'),
                COALESCE(last_practiced_at, CURRENT_TIMESTAMP)
            FROM cefr_word_mastery;
            DROP TABLE cefr_word_mastery;
            ALTER TABLE cefr_word_mastery_upgrade RENAME TO cefr_word_mastery;
        `);
        console.log('  ✅ Upgraded cefr_word_mastery table with multi-user PRIMARY KEY(user_id, word_id)');
    }

    // 5. Migrate any existing records without user_id to defaultUser.id
    targetDb.prepare('UPDATE exam_sessions SET user_id = ? WHERE user_id IS NULL OR user_id = \'\'').run(defaultUser.id);
    targetDb.prepare('UPDATE vocab_bank SET user_id = ? WHERE user_id IS NULL OR user_id = \'\'').run(defaultUser.id);
    targetDb.prepare('UPDATE cefr_quiz_history SET user_id = ? WHERE user_id IS NULL OR user_id = \'\'').run(defaultUser.id);

    // 6. Create Indexes
    targetDb.exec(`
        CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
        CREATE INDEX IF NOT EXISTS idx_user_auth_tokens ON user_auth_tokens(token);
        CREATE INDEX IF NOT EXISTS idx_sessions_user ON exam_sessions(user_id);
        CREATE INDEX IF NOT EXISTS idx_mistakes_user ON mistake_notebook(user_id);
        CREATE INDEX IF NOT EXISTS idx_vocab_user ON vocab_bank(user_id);
        CREATE INDEX IF NOT EXISTS idx_cefr_quiz_user ON cefr_quiz_history(user_id);
        CREATE INDEX IF NOT EXISTS idx_cefr_mastery_user ON cefr_word_mastery(user_id);
    `);

    // 7. Ensure user_mastered_questions exists & backfill from previous completed sessions
    targetDb.exec(`
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
    `);

    // Backfill from user_answers where is_correct = 1
    try {
        targetDb.exec(`
            INSERT OR IGNORE INTO user_mastered_questions (user_id, question_id, first_passed_at, last_passed_at, times_correct)
            SELECT es.user_id, ua.question_id, MIN(ua.answered_at), MAX(ua.answered_at), COUNT(ua.id)
            FROM user_answers ua
            JOIN exam_sessions es ON ua.session_id = es.id
            WHERE ua.is_correct = 1 AND es.user_id IS NOT NULL
            GROUP BY es.user_id, ua.question_id;
        `);
    } catch (bfErr) {
        // Ignore if already backfilled
    }

    console.log('✅ User Account, Mastered Questions & Score Tracking Migration completed successfully!');
    return defaultUser;
}

if (require.main === module) {
    migrateUsers();
}

module.exports = { migrateUsers, hashPassword, generateSalt };
