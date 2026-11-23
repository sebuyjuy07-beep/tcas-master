// Modularized: aggregates subjects & blueprints from database/subjects/*.js
const db = require('./db');
const { subjects, blueprints } = require('./subjects');

function seed() {
    const insertSubject = db.prepare(`
        INSERT INTO subjects (id, code, name_th, name_en, category, total_questions, total_score, duration_minutes, description, icon_name)
        VALUES (@id, @code, @name_th, @name_en, @category, @total_questions, @total_score, @duration_minutes, @description, @icon_name)
        ON CONFLICT(id) DO UPDATE SET
            code = excluded.code,
            name_th = excluded.name_th,
            name_en = excluded.name_en,
            category = excluded.category,
            total_questions = excluded.total_questions,
            total_score = excluded.total_score,
            duration_minutes = excluded.duration_minutes,
            description = excluded.description,
            icon_name = excluded.icon_name
    `);

    const insertBlueprint = db.prepare(`
        INSERT INTO blueprints (id, subject_id, domain_name, subtopic_name, description, target_questions, score_weight, order_index)
        VALUES (@id, @subject_id, @domain_name, @subtopic_name, @description, @target_questions, @score_weight, @order_index)
        ON CONFLICT(id) DO UPDATE SET
            subject_id = excluded.subject_id,
            domain_name = excluded.domain_name,
            subtopic_name = excluded.subtopic_name,
            description = excluded.description,
            target_questions = excluded.target_questions,
            score_weight = excluded.score_weight,
            order_index = excluded.order_index
    `);

    const transaction = db.transaction(() => {
        for (const s of subjects) insertSubject.run(s);
        for (const b of blueprints) insertBlueprint.run(b);
    });

    transaction();
    console.log(`Seeded ${subjects.length} subjects and ${blueprints.length} blueprints successfully!`);
}

if (require.main === module) {
    seed();
}

module.exports = { seed, subjects, blueprints };
