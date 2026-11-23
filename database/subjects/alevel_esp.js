/**
 * Subject Module: A-Level ภาษาสเปน (89)
 * Owned by: Exam Subject Agent (alevel_esp)
 * See rules: database/subjects/AGENTS.md
 */

module.exports = {
    subject: {
    "id": "alevel_esp",
    "code": "89",
    "name_th": "A-Level ภาษาสเปน",
    "name_en": "Spanish Language",
    "category": "A_LEVEL",
    "total_questions": 50,
    "total_score": 100,
    "duration_minutes": 90,
    "description": "Gramática, Vocabulario, Lectura y Comunicación en español (DELE A2 - B1)",
    "icon_name": "flag",
    "status": "coming_soon"
},
    blueprints: [
    {
        "id": "bp_esp_1",
        "subject_id": "alevel_esp",
        "domain_name": "ไวยากรณ์และคำศัพท์",
        "subtopic_name": "Gramática y Vocabulario (DELE A2-B1)",
        "description": "ไวยากรณ์และคำศัพท์ - Gramática y Vocabulario (DELE A2-B1)",
        "target_questions": 25,
        "score_weight": 50,
        "order_index": 1
    },
    {
        "id": "bp_esp_2",
        "subject_id": "alevel_esp",
        "domain_name": "การอ่านและการสื่อสาร",
        "subtopic_name": "Comprensión de lectura y situaciones",
        "description": "การอ่านและการสื่อสาร - Comprensión de lectura y situaciones",
        "target_questions": 25,
        "score_weight": 50,
        "order_index": 2
    }
],
    cheatsheet: null,
    // Add per-set question files inside database/subjects/questions/, e.g. './questions/alevel_esp_set1'
    questionFiles: [],
    legacyGenerators: []
};
