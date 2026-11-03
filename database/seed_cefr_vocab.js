const { seedAllCefrVocab } = require('./seed_all_cefr');

if (require.main === module) {
    seedAllCefrVocab();
}

module.exports = { seedCefrVocab: seedAllCefrVocab };
