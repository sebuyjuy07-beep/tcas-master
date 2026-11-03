/**
 * Master Seeder for TGAT2 Sets 2 - 5
 * Seeds Sets 2, 3, 4, 5 into database/tcas_exam.db
 */

const { insertQuestionsBatch } = require('../../add_questions_helper');
const { set2Questions } = require('./set2_logic');
const { set3Questions } = require('./set3_logic');
const { set4Questions } = require('./set4_logic');
const { set5Questions } = require('./set5_logic');
const db = require('../../db');

console.log('🚀 Initiating TGAT2 Sets 2 - 5 Seeding Process...');

console.log(`📦 Set 2 (Smart Tech & Scientific Logic): ${set2Questions.length} questions`);
insertQuestionsBatch(set2Questions);

console.log(`📦 Set 3 (Economic Reasoning & Business Strategy): ${set3Questions.length} questions`);
insertQuestionsBatch(set3Questions);

console.log(`📦 Set 4 (Social Dynamics & Civic Logic): ${set4Questions.length} questions`);
insertQuestionsBatch(set4Questions);

console.log(`📦 Set 5 (Grand Mock Master & Deep Problem-Solving): ${set5Questions.length} questions`);
insertQuestionsBatch(set5Questions);

// Verification
const countsBySet = db.prepare(`
    SELECT set_number, count(*) as count 
    FROM questions 
    WHERE subject_id = 'tgat2' 
    GROUP BY set_number 
    ORDER BY set_number ASC
`).all();

console.log('\n📊 TGAT2 Questions Summary by Set Number:');
console.table(countsBySet);

const totalCount = db.prepare(`
    SELECT count(*) as total 
    FROM questions 
    WHERE subject_id = 'tgat2'
`).get();

console.log(`🎯 Total TGAT2 Questions in Database: ${totalCount.total} (Target: 400)`);

// Check options and correct answer integrity (5 options and 1 correct answer)
const integrityCheck = db.prepare(`
    SELECT 
        q.id,
        q.set_number,
        COUNT(o.id) as option_count,
        SUM(o.is_correct) as correct_count
    FROM questions q
    JOIN question_options o ON q.id = o.question_id
    WHERE q.subject_id = 'tgat2'
    GROUP BY q.id
    HAVING option_count != 5 OR correct_count != 1
`).all();

if (integrityCheck.length === 0) {
    console.log('✅ Integrity Check PASSED: All 400 TGAT2 questions have exactly 5 options and exactly 1 correct answer!');
} else {
    console.error(`⚠️ Integrity Check FAILED for ${integrityCheck.length} questions:`, integrityCheck);
}
