/**
 * Subject Module: A-Level ฟิสิกส์ (64)
 * Owned by: Exam Subject Agent (alevel_phy)
 * See rules: database/subjects/AGENTS.md
 */

module.exports = {
    subject: {
    "id": "alevel_phy",
    "code": "64",
    "name_th": "A-Level ฟิสิกส์",
    "name_en": "Physics",
    "category": "A_LEVEL",
    "total_questions": 30,
    "total_score": 100,
    "duration_minutes": 90,
    "description": "กลศาสตร์ คลื่นกลและแสง ไฟฟ้าแม่เหล็ก อุณหพลศาสตร์ และฟิสิกส์ยุคใหม่",
    "icon_name": "zap",
    "status": "coming_soon"
},
    blueprints: [
    {
        "id": "bp_phy_1",
        "subject_id": "alevel_phy",
        "domain_name": "กลศาสตร์",
        "subtopic_name": "การเคลื่อนที่ แรง กฎนิวตัน งาน พลังงาน โมเมนตัม",
        "description": "กลศาสตร์ - การเคลื่อนที่ แรง กฎนิวตัน งาน พลังงาน โมเมนตัม",
        "target_questions": 10,
        "score_weight": 32,
        "order_index": 1
    },
    {
        "id": "bp_phy_2",
        "subject_id": "alevel_phy",
        "domain_name": "คลื่นกลและแสง",
        "subtopic_name": "คลื่น เสียง แสงเชิงกายภาพและเรขาคณิต",
        "description": "คลื่นกลและแสง - คลื่น เสียง แสงเชิงกายภาพและเรขาคณิต",
        "target_questions": 6,
        "score_weight": 20,
        "order_index": 2
    },
    {
        "id": "bp_phy_3",
        "subject_id": "alevel_phy",
        "domain_name": "ไฟฟ้าและแม่เหล็ก",
        "subtopic_name": "ไฟฟ้าสถิต ไฟฟ้ากระแส แม่เหล็กไฟฟ้า",
        "description": "ไฟฟ้าและแม่เหล็ก - ไฟฟ้าสถิต ไฟฟ้ากระแส แม่เหล็กไฟฟ้า",
        "target_questions": 7,
        "score_weight": 24,
        "order_index": 3
    },
    {
        "id": "bp_phy_4",
        "subject_id": "alevel_phy",
        "domain_name": "อุณหพลศาสตร์และสมบัติสาร",
        "subtopic_name": "ความร้อน แก๊ส ของแข็งและของไหล",
        "description": "อุณหพลศาสตร์และสมบัติสาร - ความร้อน แก๊ส ของแข็งและของไหล",
        "target_questions": 4,
        "score_weight": 12,
        "order_index": 4
    },
    {
        "id": "bp_phy_5",
        "subject_id": "alevel_phy",
        "domain_name": "ฟิสิกส์แผนใหม่",
        "subtopic_name": "ฟิสิกส์อะตอม ฟิสิกส์นิวเคลียร์และอนุภาค",
        "description": "ฟิสิกส์แผนใหม่ - ฟิสิกส์อะตอม ฟิสิกส์นิวเคลียร์และอนุภาค",
        "target_questions": 3,
        "score_weight": 12,
        "order_index": 5
    }
],
    cheatsheet: null,
    // Add per-set question files inside database/subjects/questions/, e.g. './questions/alevel_phy_set1'
    questionFiles: [],
    legacyGenerators: []
};
