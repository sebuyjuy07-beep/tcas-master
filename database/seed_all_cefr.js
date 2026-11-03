const fs = require('fs');
const path = require('path');
const db = require('./db');

function seedAllCefrVocab(customDb = null) {
    const targetDb = customDb || db;
    console.log('🌱 Loading and seeding 1,800 CEFR Vocabulary words (300 per level)...');

    const datasetDir = path.join(__dirname, 'cefr_dataset');
    const levels = ['a1', 'a2', 'b1', 'b2', 'c1', 'c2'];
    let allWords = [];

    for (const lvl of levels) {
        const filePath = path.join(datasetDir, `${lvl}_words.json`);
        if (!fs.existsSync(filePath)) {
            throw new Error(`Dataset file not found: ${filePath}`);
        }
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        console.log(`  Loaded ${lvl.toUpperCase()}: ${data.length} words`);
        allWords = allWords.concat(data);
    }

    console.log(`Total words loaded: ${allWords.length}`);
    if (allWords.length !== 1800) {
        throw new Error(`Expected exactly 1800 words, got ${allWords.length}`);
    }

    // Begin database transaction
    const insertStmt = targetDb.prepare(`
        INSERT INTO cefr_vocab_words (
            id, word, part_of_speech, cefr_level, phonetic,
            meaning_th, meaning_en, example_sentence, synonyms, antonyms, frequency_tier
        ) VALUES (
            @id, @word, @part_of_speech, @cefr_level, @phonetic,
            @meaning_th, @meaning_en, @example_sentence, @synonyms, @antonyms, @frequency_tier
        )
        ON CONFLICT(id) DO UPDATE SET
            word = excluded.word,
            part_of_speech = excluded.part_of_speech,
            cefr_level = excluded.cefr_level,
            phonetic = excluded.phonetic,
            meaning_th = excluded.meaning_th,
            meaning_en = excluded.meaning_en,
            example_sentence = excluded.example_sentence,
            synonyms = excluded.synonyms,
            antonyms = excluded.antonyms,
            frequency_tier = excluded.frequency_tier;
    `);

    // Remove legacy 50-word test entries with old format ID like 'v_a1_01'
    targetDb.prepare(`DELETE FROM cefr_word_mastery WHERE word_id NOT IN (SELECT id FROM cefr_vocab_words)`).run();
    targetDb.prepare(`DELETE FROM cefr_vocab_words WHERE id NOT LIKE 'v_%_%' OR length(id) < 8`).run();

    const seedTransaction = targetDb.transaction((words) => {
        for (const w of words) {
            insertStmt.run(w);
        }
    });

    seedTransaction(allWords);

    // Verify counts in DB
    const counts = targetDb.prepare(`
        SELECT cefr_level, COUNT(*) as count 
        FROM cefr_vocab_words 
        GROUP BY cefr_level 
        ORDER BY cefr_level
    `).all();

    console.log('📊 Verification of CEFR levels in database:');
    console.table(counts);

    const totalInDb = targetDb.prepare('SELECT COUNT(*) as total FROM cefr_vocab_words').get().total;
    console.log(`✅ Total CEFR words in SQLite: ${totalInDb} (Target: 1,800)`);
    return counts;
}

if (require.main === module) {
    seedAllCefrVocab();
}

module.exports = { seedAllCefrVocab };
