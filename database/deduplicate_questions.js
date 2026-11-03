const db = require('./db');

console.log('🧹 Starting Question Deduplication Process...');

// 1. Check all questions
const allQuestions = db.prepare('SELECT id, subject_id, blueprint_id, stimulus, question_text FROM questions ORDER BY id ASC').all();
console.log(`Total questions before deduplication: ${allQuestions.length}`);

// Group by normalized key: subject_id + ":::" + (stimulus || '') + ":::" + question_text.trim() + ":::" + options
const getOptions = db.prepare('SELECT content FROM question_options WHERE question_id = ? ORDER BY order_index ASC');
const seen = new Map();
const toDelete = [];
const kept = [];

for (const q of allQuestions) {
    const normText = (q.question_text || '').trim().replace(/\s+/g, ' ');
    const normStim = (q.stimulus || '').trim().replace(/\s+/g, ' ');
    const optTexts = getOptions.all(q.id).map(o => (o.content || '').trim()).join('|||');
    const key = `${q.subject_id}:::${normStim}:::${normText}:::${optTexts}`;

    if (seen.has(key)) {
        toDelete.push(q);
    } else {
        seen.set(key, q.id);
        kept.push(q);
    }
}

console.log(`\nIdentified ${toDelete.length} duplicate questions to remove.`);
console.log(`Keeping ${kept.length} unique questions.`);

// 2. Perform deletion in a transaction
const deleteOptionStmt = db.prepare('DELETE FROM question_options WHERE question_id = ?');
const deleteMistakeStmt = db.prepare('DELETE FROM mistake_notebook WHERE question_id = ?');
const deleteMasteredStmt = db.prepare('DELETE FROM user_mastered_questions WHERE question_id = ?');
const deleteUserAnswerStmt = db.prepare('DELETE FROM user_answers WHERE question_id = ?');
const deleteQuestionStmt = db.prepare('DELETE FROM questions WHERE id = ?');

const deleteTx = db.transaction(() => {
    for (const q of toDelete) {
        deleteOptionStmt.run(q.id);
        deleteMistakeStmt.run(q.id);
        deleteMasteredStmt.run(q.id);
        deleteUserAnswerStmt.run(q.id);
        deleteQuestionStmt.run(q.id);
    }
});

deleteTx();

console.log('✅ Duplicates successfully removed!');

// 3. Print breakdown by subject
const summary = db.prepare(`
    SELECT s.id, s.code, s.name_th, count(q.id) as remaining_count
    FROM subjects s
    LEFT JOIN questions q ON s.id = q.subject_id
    GROUP BY s.id
    ORDER BY s.id
`).all();

console.log('\n📊 Summary of Unique Questions Remaining:');
console.table(summary);
