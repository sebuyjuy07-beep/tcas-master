/**
 * Subject Module: A-Level ภาษาจีน (87)
 * Owned by: Exam Subject Agent (alevel_chn)
 * See rules: database/subjects/AGENTS.md
 */

module.exports = {
    subject: {
    "id": "alevel_chn",
    "code": "87",
    "name_th": "A-Level ภาษาจีน",
    "name_en": "Chinese Language",
    "category": "A_LEVEL",
    "total_questions": 50,
    "total_score": 100,
    "duration_minutes": 90,
    "description": "สัทอักษร พินอิน ไวยากรณ์ คำศัพท์ และการอ่านบทความ (ระดับ HSK 3 - 4)",
    "icon_name": "flag",
    "status": "coming_soon"
},
    blueprints: [
    {
        "id": "bp_chn_1",
        "subject_id": "alevel_chn",
        "domain_name": "สัทศาสตร์ ไวยากรณ์และคำศัพท์",
        "subtopic_name": "语音・词汇・语法 (Phonetics, Vocab, Grammar)",
        "description": "สัทศาสตร์ ไวยากรณ์และคำศัพท์ - 语音・词汇・语法 (Phonetics, Vocab, Grammar)",
        "target_questions": 25,
        "score_weight": 50,
        "order_index": 1
    },
    {
        "id": "bp_chn_2",
        "subject_id": "alevel_chn",
        "domain_name": "การอ่านจับใจความและวัฒนธรรม",
        "subtopic_name": "阅读理解・中国文化 (Reading & Culture)",
        "description": "การอ่านจับใจความและวัฒนธรรม - 阅读理解・中国文化 (Reading & Culture)",
        "target_questions": 25,
        "score_weight": 50,
        "order_index": 2
    }
],
    cheatsheet: null,
    // Add per-set question files inside database/subjects/questions/, e.g. './questions/alevel_chn_set1'
    questionFiles: [],
    legacyGenerators: []
};
