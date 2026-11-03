const db = require('./db');

console.log('🚀 Starting Clean Questions Migration...');

const allQuestions = db.prepare('SELECT * FROM questions').all();
console.log(`Total questions in database: ${allQuestions.length}`);

let updatedCount = 0;
let bracketsRemovedCount = 0;
let stimulusMergedCount = 0;

const updateStmt = db.prepare(`
    UPDATE questions 
    SET stimulus = @stimulus, question_text = @question_text 
    WHERE id = @id
`);

const bracketRegex = /^\s*\[[^\]]+\]\s*/;

const transaction = db.transaction(() => {
    for (const q of allQuestions) {
        let stim = q.stimulus ? q.stimulus.trim() : '';
        let qText = q.question_text ? q.question_text.trim() : '';
        const initialStim = stim;
        const initialQText = qText;

        // 1. Remove bracket tags
        let hadBracket = false;
        while (bracketRegex.test(stim)) {
            stim = stim.replace(bracketRegex, '').trim();
            hadBracket = true;
        }
        while (bracketRegex.test(qText)) {
            qText = qText.replace(bracketRegex, '').trim();
            hadBracket = true;
        }
        if (hadBracket) bracketsRemovedCount++;

        // 2. Subject-specific transformation
        // A-Level Math 1: All standalone math questions
        if (q.subject_id === 'alevel_math1') {
            if (stim.length > 0) {
                qText = `${stim}\n\n${qText}`;
                stim = null;
                stimulusMergedCount++;
            } else {
                stim = null;
            }
        }
        // TPAT3: All engineering calculation / spatial / physics / computing
        else if (q.subject_id === 'tpat3') {
            if (stim.length > 0) {
                qText = `${stim}\n\n${qText}`;
                stim = null;
                stimulusMergedCount++;
            } else {
                stim = null;
            }
        }
        // TGAT3: All workplace scenario questions
        else if (q.subject_id === 'tgat3') {
            if (stim.length > 0) {
                qText = `${stim}\n\n${qText}`;
                stim = null;
                stimulusMergedCount++;
            } else {
                stim = null;
            }
        }
        // TGAT2: Critical & Logical Thinking
        else if (q.subject_id === 'tgat2') {
            if (q.blueprint_id === 'tgat2_verbal') {
                if (stim.includes('จงเลือกคู่คำที่มีความสัมพันธ์เหมือนกับ')) {
                    // Analogy question: The whole prompt is in stim
                    qText = stim;
                    stim = null;
                    stimulusMergedCount++;
                } else if (stim.includes('ข้อความใดใช้ภาษาแสดงเหตุผลได้ถูกต้องและสละสลวยที่สุด?')) {
                    qText = 'ข้อความใดใช้ภาษาแสดงเหตุผลได้ถูกต้องและสละสลวยที่สุดตามหลักภาษาไทย?';
                    stim = null;
                    stimulusMergedCount++;
                } else if (stim.includes('พิจารณาข้อความ:')) {
                    if (stim.includes('ข้อความนี้มีจุดประสงค์หลักเพื่ออะไร?')) {
                        qText = stim;
                    } else {
                        qText = `${stim}\n\n${qText}`;
                    }
                    stim = null;
                    stimulusMergedCount++;
                } else {
                    if (stim.length > 0) {
                        qText = `${stim}\n\n${qText}`;
                        stim = null;
                        stimulusMergedCount++;
                    }
                }
            } else {
                // tgat2_numerical, tgat2_spatial, tgat2_reasoning
                if (stim.length > 0) {
                    qText = `${stim}\n\n${qText}`;
                    stim = null;
                    stimulusMergedCount++;
                } else {
                    stim = null;
                }
            }
        }
        // TGAT1: English Communication
        else if (q.subject_id === 'tgat1') {
            if (q.blueprint_id === 'tgat1_spk_qr') {
                // 1-line Question-Response
                if (stim.length > 0) {
                    qText = `${stim}\n\n${qText}`;
                    stim = null;
                    stimulusMergedCount++;
                } else {
                    stim = null;
                }
            } else {
                // tgat1_spk_sc, tgat1_spk_lc, tgat1_rd_tc, tgat1_rd_rc
                // Keep reading passages and multi-line dialogues in stimulus
                stim = stim.length > 0 ? stim : null;
            }
        }

        // Apply update if changed
        if (stim !== initialStim || qText !== initialQText) {
            updateStmt.run({
                id: q.id,
                stimulus: stim,
                question_text: qText
            });
            updatedCount++;
        }
    }
});

transaction();

console.log('✅ Migration completed successfully!');
console.log(`   - Total questions modified: ${updatedCount}`);
console.log(`   - Bracket tags stripped: ${bracketsRemovedCount}`);
console.log(`   - Stimulus merged into full-width questions: ${stimulusMergedCount}`);

// Post-check verification
const remainingBrackets = db.prepare("SELECT count(*) as c FROM questions WHERE stimulus LIKE '%[%' OR question_text LIKE '%[%'").get().c;
console.log(`   - Remaining bracket tags in database: ${remainingBrackets}`);

const stimBySubject = db.prepare("SELECT subject_id, count(*) as count FROM questions WHERE stimulus IS NOT NULL GROUP BY subject_id").all();
console.log('   - Remaining stimulus by subject (Reading Passages/Dialogues):', stimBySubject);
