/**
 * Subject Module: A-Level เคมี (65)
 * Owned by: Exam Subject Agent (alevel_chem)
 * See rules: database/subjects/AGENTS.md
 */

module.exports = {
    subject: {
    "id": "alevel_chem",
    "code": "65",
    "name_th": "A-Level เคมี",
    "name_en": "Chemistry",
    "category": "A_LEVEL",
    "total_questions": 35,
    "total_score": 100,
    "duration_minutes": 90,
    "description": "สมบัติอะตอมและตารางธาตุ พันธะเคมี ปริมาณสารสัมพันธ์ สมดุลเคมี กรด-เบส เคมีอินทรีย์",
    "icon_name": "droplet",
    "status": "coming_soon"
},
    blueprints: [
    {
        "id": "bp_chm_1",
        "subject_id": "alevel_chem",
        "domain_name": "โครงสร้างและสมบัติของสาร",
        "subtopic_name": "อะตอม ตารางธาตุ พันธะเคมี และสารประกอบ",
        "description": "โครงสร้างและสมบัติของสาร - อะตอม ตารางธาตุ พันธะเคมี และสารประกอบ",
        "target_questions": 9,
        "score_weight": 25,
        "order_index": 1
    },
    {
        "id": "bp_chm_2",
        "subject_id": "alevel_chem",
        "domain_name": "การเปลี่ยนแปลงและปฏิกิริยาเคมี",
        "subtopic_name": "ปริมาณสารสัมพันธ์ อัตราการเกิดปฏิกิริยา สมดุลเคมี",
        "description": "การเปลี่ยนแปลงและปฏิกิริยาเคมี - ปริมาณสารสัมพันธ์ อัตราการเกิดปฏิกิริยา สมดุลเคมี",
        "target_questions": 15,
        "score_weight": 45,
        "order_index": 2
    },
    {
        "id": "bp_chm_3",
        "subject_id": "alevel_chem",
        "domain_name": "เคมีอินทรีย์และสารชีวโมเลกุล",
        "subtopic_name": "สารประกอบไฮโดรคาร์บอน พอลิเมอร์ และพลังงาน",
        "description": "เคมีอินทรีย์และสารชีวโมเลกุล - สารประกอบไฮโดรคาร์บอน พอลิเมอร์ และพลังงาน",
        "target_questions": 11,
        "score_weight": 30,
        "order_index": 3
    }
],
    cheatsheet: null,
    // Add per-set question files inside database/subjects/questions/, e.g. './questions/alevel_chem_set1'
    questionFiles: [],
    legacyGenerators: []
};
