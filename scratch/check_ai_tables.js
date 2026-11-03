const db = require('../database/db');

console.log('Verifying AI tables in tcas_exam.db...');
const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name LIKE 'ai_%'").all();
console.log('AI Tables in DB:', tables);
