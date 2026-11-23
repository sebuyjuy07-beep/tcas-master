/**
 * Subject Module: A-Level ภาษาเยอรมัน (84)
 * Owned by: Exam Subject Agent (alevel_deu)
 * See rules: database/subjects/AGENTS.md
 */

module.exports = {
    subject: {
    "id": "alevel_deu",
    "code": "84",
    "name_th": "A-Level ภาษาเยอรมัน",
    "name_en": "German Language",
    "category": "A_LEVEL",
    "total_questions": 50,
    "total_score": 100,
    "duration_minutes": 90,
    "description": "Grammatik, Wortschatz, Leseverstehen und Kommunikation",
    "icon_name": "flag",
    "status": "coming_soon"
},
    blueprints: [
    {
        "id": "bp_deu_1",
        "subject_id": "alevel_deu",
        "domain_name": "ไวยากรณ์และคำศัพท์",
        "subtopic_name": "Grammatik und Grundwortschatz",
        "description": "ไวยากรณ์และคำศัพท์ - Grammatik und Grundwortschatz",
        "target_questions": 25,
        "score_weight": 50,
        "order_index": 1
    },
    {
        "id": "bp_deu_2",
        "subject_id": "alevel_deu",
        "domain_name": "การอ่านและการสื่อสาร",
        "subtopic_name": "Leseverstehen und Alltagssituationen",
        "description": "การอ่านและการสื่อสาร - Leseverstehen und Alltagssituationen",
        "target_questions": 25,
        "score_weight": 50,
        "order_index": 2
    }
],
    cheatsheet: null,
    // Add per-set question files inside database/subjects/questions/, e.g. './questions/alevel_deu_set1'
    questionFiles: [],
    legacyGenerators: []
};
