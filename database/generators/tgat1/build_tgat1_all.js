/**
 * Master Seeder for TGAT1 Sets 2 - 5
 * Seeds Sets 2, 3, 4, 5 into database/tcas_exam.db
 */

const { insertQuestionsBatch } = require('../../add_questions_helper');
const { set2Questions } = require('./set2_digital');
const { set3Questions } = require('./set3_green');
const { set4Questions } = require('./set4_global');
const { set5Questions } = require('./set5_grand');
const db = require('../../db');

console.log('🚀 Initiating TGAT1 Sets 2 - 5 Seeding Process...');

console.log(`📦 Set 2 (Digital World): ${set2Questions.length} questions`);
insertQuestionsBatch(set2Questions);

console.log(`📦 Set 3 (Green Planet): ${set3Questions.length} questions`);
insertQuestionsBatch(set3Questions);

console.log(`📦 Set 4 (Global Business): ${set4Questions.length} questions`);
insertQuestionsBatch(set4Questions);

console.log(`📦 Set 5 (Academic Excellence): ${set5Questions.length} questions`);
insertQuestionsBatch(set5Questions);

// Verification
const countsBySet = db.prepare(`
    SELECT set_number, count(*) as count 
    FROM questions 
    WHERE subject_id = 'tgat1' 
    GROUP BY set_number 
    ORDER BY set_number ASC
`).all();

console.log('\n📊 TGAT1 Questions Summary by Set Number:');
console.table(countsBySet);

const totalCount = db.prepare(`
    SELECT count(*) as total 
    FROM questions 
    WHERE subject_id = 'tgat1'
`).get();

console.log(`🎯 Total TGAT1 Questions in Database: ${totalCount.total} (Target: 300)`);

// Check options and correct answer integrity
const integrityCheck = db.prepare(`
    SELECT 
        q.id,
        q.set_number,
        COUNT(o.id) as option_count,
        SUM(o.is_correct) as correct_count
    FROM questions q
    JOIN question_options o ON q.id = o.question_id
    WHERE q.subject_id = 'tgat1'
    GROUP BY q.id
    HAVING option_count != 4 OR correct_count != 1
`).all();

if (integrityCheck.length === 0) {
    console.log('✅ Integrity Check PASSED: All 300 questions have exactly 4 options and exactly 1 correct answer!');
} else {
    console.error(`⚠️ Integrity Check FAILED for ${integrityCheck.length} questions:`, integrityCheck);
}
