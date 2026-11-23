/**
 * Seed and verify a single subject module cleanly without touching other subjects.
 * Usage: node database/subjects/seed_subject.js <subject_id|all>
 */
const path = require('path');
const db = require('../db');
const { insertQuestionsBatch } = require('../add_questions_helper');
const { modules, getSubjectModule } = require('./index');

const target = process.argv[2];
if (!target) {
    console.error('Usage: node database/subjects/seed_subject.js <subject_id|all>');
    process.exit(1);
}

const upsertSubject = db.prepare(`
    INSERT INTO subjects (id, code, name_th, name_en, category, total_questions, total_score, duration_minutes, description, icon_name, status)
    VALUES (@id, @code, @name_th, @name_en, @category, @total_questions, @total_score, @duration_minutes, @description, @icon_name, @status)
    ON CONFLICT(id) DO UPDATE SET
        code = excluded.code,
        name_th = excluded.name_th,
        name_en = excluded.name_en,
        category = excluded.category,
        total_questions = excluded.total_questions,
        total_score = excluded.total_score,
        duration_minutes = excluded.duration_minutes,
        description = excluded.description,
        icon_name = excluded.icon_name,
        status = excluded.status
`);

const upsertBlueprint = db.prepare(`
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

function seedOne(mod) {
    const { subject, blueprints = [], questionFiles = [] } = mod;
    if (!subject || !subject.id) throw new Error('Invalid subject module');

    db.transaction(() => {
        upsertSubject.run({ status: 'coming_soon', icon_name: 'book', ...subject });
        for (const bp of blueprints) {
            upsertBlueprint.run(bp);
        }
    })();

    let loadedCount = 0;
    for (const qFile of questionFiles) {
        const resolved = path.resolve(__dirname, qFile);
        const batch = require(resolved);
        const list = Array.isArray(batch) ? batch : (batch.questions || []);
        if (list.length > 0) {
            insertQuestionsBatch(list);
            loadedCount += list.length;
        }
    }

    const totalInDb = db.prepare('SELECT COUNT(*) as c FROM questions WHERE subject_id = ?').get(subject.id).c;
    const badOpts = db.prepare(`
        SELECT q.id, COUNT(o.id) as opt_count, SUM(o.is_correct) as correct_count
        FROM questions q
        LEFT JOIN question_options o ON q.id = o.question_id
        WHERE q.subject_id = ?
        GROUP BY q.id
        HAVING opt_count < 4 OR correct_count != 1
    `).all(subject.id);

    console.log(`[${subject.id}] blueprints: ${blueprints.length}, newly seeded: ${loadedCount}, total in DB: ${totalInDb}`);
    if (badOpts.length > 0) {
        console.error(`  INTEGRITY WARNING for ${subject.id}:`, badOpts);
        process.exitCode = 1;
    } else {
        console.log(`  Integrity check passed for ${subject.id}`);
    }
}

if (target === 'all') {
    for (const m of modules) seedOne(m);
} else {
    const mod = getSubjectModule(target);
    if (!mod) {
        console.error(`Subject module not found: database/subjects/${target}.js`);
        process.exit(1);
    }
    seedOne(mod);
}
