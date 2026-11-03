const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');
const { migrateUsers } = require('./migrate_users');

const DB_PATH = path.join(__dirname, 'tcas_exam.db');
const SCHEMA_PATH = path.join(__dirname, 'schema.sql');

// Initialize Database connection
const db = new Database(DB_PATH, {
    // verbose: console.log 
});

// Enable WAL mode for high concurrency & performance
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

function initSchema() {
    // Ensure user accounts and multi-user migrations are active first
    try {
        migrateUsers(db);
    } catch (migErr) {
        console.error('Migration notice:', migErr.message);
    }

    if (fs.existsSync(SCHEMA_PATH)) {
        const schema = fs.readFileSync(SCHEMA_PATH, 'utf-8');
        db.exec(schema);
        console.log('✅ SQLite Schema initialized successfully at', DB_PATH);
    }
}

// Auto init schema on module load
initSchema();

module.exports = db;
