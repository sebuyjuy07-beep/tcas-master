/**
 * Subject Module: A-Level ภาษาฝรั่งเศส (83)
 * Owned by: Exam Subject Agent (alevel_fra)
 * See rules: database/subjects/AGENTS.md
 */

module.exports = {
    subject: {
    "id": "alevel_fra",
    "code": "83",
    "name_th": "A-Level ภาษาฝรั่งเศส",
    "name_en": "French Language",
    "category": "A_LEVEL",
    "total_questions": 50,
    "total_score": 100,
    "duration_minutes": 90,
    "description": "Grammaire, Vocabulaire, Expression, et Compréhension écrite",
    "icon_name": "flag",
    "status": "coming_soon"
},
    blueprints: [
    {
        "id": "bp_fra_1",
        "subject_id": "alevel_fra",
        "domain_name": "ไวยากรณ์และคำศัพท์",
        "subtopic_name": "Grammaire et Vocabulaire fondamental",
        "description": "ไวยากรณ์และคำศัพท์ - Grammaire et Vocabulaire fondamental",
        "target_questions": 25,
        "score_weight": 50,
        "order_index": 1
    },
    {
        "id": "bp_fra_2",
        "subject_id": "alevel_fra",
        "domain_name": "การอ่านและการสื่อสาร",
        "subtopic_name": "Compréhension écrite et situations quotidiennes",
        "description": "การอ่านและการสื่อสาร - Compréhension écrite et situations quotidiennes",
        "target_questions": 25,
        "score_weight": 50,
        "order_index": 2
    }
],
    cheatsheet: null,
    // Add per-set question files inside database/subjects/questions/, e.g. './questions/alevel_fra_set1'
    questionFiles: [],
    legacyGenerators: []
};
