const db = require('./db');

function insertQuestionsBatch(questions) {
    const insertQuestion = db.prepare(`
        INSERT OR REPLACE INTO questions (id, subject_id, blueprint_id, stimulus, question_text, image_url, difficulty, explanation, trap_analysis, is_custom, set_number)
        VALUES (@id, @subject_id, @blueprint_id, @stimulus, @question_text, @image_url, @difficulty, @explanation, @trap_analysis, 0, @set_number)
    `);

    const insertOption = db.prepare(`
        INSERT OR REPLACE INTO question_options (id, question_id, label, content, is_correct, order_index)
        VALUES (@id, @question_id, @label, @content, @is_correct, @order_index)
    `);

    const transaction = db.transaction((qList) => {
        for (const q of qList) {
            insertQuestion.run({
                id: q.id,
                subject_id: q.subject_id,
                blueprint_id: q.blueprint_id,
                stimulus: q.stimulus || '',
                question_text: q.question_text,
                image_url: q.image_url || null,
                difficulty: q.difficulty || 'medium',
                explanation: q.explanation || '',
                trap_analysis: q.trap_analysis || '',
                set_number: q.set_number || 1
            });

            q.options.forEach((opt, idx) => {
                insertOption.run({
                    id: `${q.id}_opt_${idx + 1}`,
                    question_id: q.id,
                    label: opt.label || String(idx + 1),
                    content: opt.content,
                    is_correct: opt.is_correct ? 1 : 0,
                    order_index: idx
                });
            });
        }
    });

    transaction(questions);
    console.log(`✅ Successfully inserted ${questions.length} questions into SQLite!`);
}

module.exports = { insertQuestionsBatch };
