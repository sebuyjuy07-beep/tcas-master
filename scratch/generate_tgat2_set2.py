# -*- coding: utf-8 -*-
"""
Generator for TGAT2 Set 2: Analytical Precision, Smart Tech & Scientific Logic
80 Questions strictly calibrated to Official MyTCAS Blueprint (16 subtopics x 5 questions)
Domain 1: Verbal Ability (20 questions)
Domain 2: Numerical Ability (20 questions)
Domain 3: Spatial Ability (20 questions)
Domain 4: Logical Reasoning (20 questions)
"""

import json
import os

questions = []

# =========================================================================
# DOMAIN 1: ความสามารถทางภาษา (VERBAL ABILITY) - 20 Questions (Q01 - Q20)
# =========================================================================

# 1.1 การสื่อความหมาย (tgat2_lang_meaning) - Q01 to Q05
meaning_data = [
    {
        "id": "q_tgat2_s2_01",
        "blueprint_id": "tgat2_lang_meaning",
        "question_text": "คำหรือกลุ่มคำในข้อใดต่อไปนี้มี \"ขอบเขตความหมายแคบที่สุด\"",
        "stimulus": None,
        "difficulty": "easy",
        "explanation": "\"ดาวเทียมสื่อสารวงโคจรต่ำรุ่นใหม่นี้\" มีคำระบุประเภทเฉพาะ (ดาวเทียมสื่อสาร), ตำแหน่งวงโคจร (ต่ำ), รุ่น (ใหม่) และคำชี้เฉพาะเจาะจง (\"นี้\") จึงมีความหมายจำเพาะเจาะจงแคบที่สุดเมื่อเทียบกับหมวดหมู่อื่น",
        "trap_analysis": "ระวังเลือกคำว่า \"ดาวเทียม\" เพราะคิดว่าเป็นสิ่งของชิ้นเดียว ในทางภาษาศาสตร์ คำที่มีคำชี้เฉพาะ (\"นี้\") จะมีขอบเขตความหมายแคบที่สุดเสมอ",
        "options": [
            {"label": "1", "content": "อุปกรณ์อิเล็กทรอนิกส์สำหรับอวกาศ", "is_correct": 0},
            {"label": "2", "content": "เทคโนโลยีโทรคมนาคมไร้สาย", "is_correct": 0},
            {"label": "3", "content": "ดาวเทียมสื่อสารวงโคจรต่ำรุ่นใหม่นี้", "is_correct": 1},
            {"label": "4", "content": "ดาวเทียมสำรวจทรัพยากรธรรมชาติ", "is_correct": 0},
            {"label": "5", "content": "ยานอวกาศไร้คนขับ", "is_correct": 0}
        ]
    },
    {
        "id": "q_tgat2_s2_02",
        "blueprint_id": "tgat2_lang_meaning",
        "question_text": "คำในข้อใดมี \"ความหมายกว้างที่สุด\" ที่สามารถครอบคลุมคำอื่นในตัวเลือกทั้งหมดได้",
        "stimulus": None,
        "difficulty": "easy",
        "explanation": "\"ปัญญาประดิษฐ์ (Artificial Intelligence)\" เป็นคำที่มีขอบเขตความหมายกว้างที่สุด เพราะครอบคลุมทั้งการเรียนรู้ของเครื่อง (Machine Learning), โครงข่ายประสาทเทียม (Neural Networks), และแบบจำลองภาษาขนาดใหญ่ (LLMs)",
        "trap_analysis": "ผู้สอบมักสับสนระหว่าง AI กับ Machine Learning ซึ่ง Machine Learning เป็นเพียงสาขาย่อยหนึ่งของ AI",
        "options": [
            {"label": "1", "content": "การเรียนรู้เชิงลึก (Deep Learning)", "is_correct": 0},
            {"label": "2", "content": "โครงข่ายประสาทเทียมแบบสังเคราะห์", "is_correct": 0},
            {"label": "3", "content": "แบบจำลองภาษาขนาดใหญ่ (LLMs)", "is_correct": 0},
            {"label": "4", "content": "ปัญญาประดิษฐ์ (Artificial Intelligence)", "is_correct": 1},
            {"label": "5", "content": "การเรียนรู้ของเครื่อง (Machine Learning)", "is_correct": 0}
        ]
    },
    {
        "id": "q_tgat2_s2_03",
        "blueprint_id": "tgat2_lang_meaning",
        "question_text": "ข้อใดมีการใช้คำที่มี \"ความหมายไม่ตรงกับบริบท\" ของประโยค",
        "stimulus": None,
        "difficulty": "medium",
        "explanation": "คำว่า \"สังคายนา\" หมายถึง การรวบรวมและตรวจชำระพระไตรปิฎกให้ถูกต้อง หรือใช้ในความหมายเปรียบเทียบว่าการปรับปรุงแก้ไขระบบใหญ่ แต่การซ่อมบำรุงเซิร์ฟเวอร์ประจำสัปดาห์ควรใช้คำว่า \"บำรุงรักษา\" หรือ \"ตรวจสอบระบบ\"",
        "trap_analysis": "ระวังการใช้คำระดับสูงหรือคำทางศาสนาผิดระดับและผิดบริบทในงานด้านเทคโนโลยี",
        "options": [
            {"label": "1", "content": "ฝ่ายรักษาความปลอดภัยไซเบอร์ตรวจสอบช่องโหว่ของไฟร์วอลล์อย่างสม่ำเสมอ", "is_correct": 0},
            {"label": "2", "content": "วิศวกรระบบดำเนินการสังคายนาเครื่องแม่ข่ายประจำสัปดาห์เพื่อลบไฟล์ขยะ", "is_correct": 1},
            {"label": "3", "content": "คณะกรรมการมีมติเห็นชอบการจัดสรรงบประมาณพัฒนานวัตกรรมดิจิทัล", "is_correct": 0},
            {"label": "4", "content": "โปรแกรมเมอร์ปรับปรุงอัลกอริทึมเพื่อเพิ่มความเร็วในการประมวลผลข้อมูล", "is_correct": 0},
            {"label": "5", "content": "ศูนย์คอมพิวเตอร์ประกาศระงับการให้บริการชั่วคราวเพื่ออัปเกรดระบบ", "is_correct": 0}
        ]
    },
    {
        "id": "q_tgat2_s2_04",
        "blueprint_id": "tgat2_lang_meaning",
        "question_text": "ข้อความใดมีคำที่มี \"ความหมายโดยนัย\" (ความหมายแฝง / ความหมายเชิงเปรียบเทียบ)",
        "stimulus": None,
        "difficulty": "medium",
        "explanation": "คำว่า \"ม้ามืด\" ในประโยค \"สตาร์ตอัปหน้าใหม่กลายเป็นม้ามืดที่สามารถคว้ารางวัลชนะเลิศ\" เป็นความหมายโดยนัย หมายถึง ผู้ที่ไม่ได้รับการคาดหมายว่าจะมีชัยชนะแต่กลับชนะขึ้นมาได้ ไม่เกี่ยวกับม้าจริง ๆ",
        "trap_analysis": "คำว่า \"ม้ามืด\" เป็นสำนวนความหมายแฝงที่พบบ่อยในข่าวการแข่งขันธุรกิจและกีฬา",
        "options": [
            {"label": "1", "content": "ห้องปฏิบัติการคอมพิวเตอร์เปิดไฟสว่างตลอดทั้งคืนเพื่อให้นักศึกษาทำงาน", "is_correct": 0},
            {"label": "2", "content": "ฟาร์มแห่งนี้เพาะเลี้ยงม้าสีดำพันธุ์แท้เพื่อใช้ในการแข่งขันระดับชาติ", "is_correct": 0},
            {"label": "3", "content": "สตาร์ตอัปหน้าใหม่กลายเป็นม้ามืดที่สามารถคว้ารางวัลชนะเลิศนวัตกรรมปัญญาประดิษฐ์", "is_correct": 1},
            {"label": "4", "content": "หน้าจอแท็บเล็ตแสดงผลความละเอียดสูงช่วยลดอาการเมื่อยล้าของสายตา", "is_correct": 0},
            {"label": "5", "content": "ดาวเทียมโคจรรอบโลกด้วยความเร็วคงที่ตามกฎฟิสิกส์แรงโน้มถ่วง", "is_correct": 0}
        ]
    },
    {
        "id": "q_tgat2_s2_05",
        "blueprint_id": "tgat2_lang_meaning",
        "question_text": "ข้อความในข้อใดสามารถใช้คำว่า \"กระชับ\" แทนคำที่ขีดเส้นใต้ได้อย่างถูกต้องและเหมาะสมที่สุด",
        "stimulus": "โฆษกประจำบริษัทแถลงข่าวชี้แจงสถานการณ์วิกฤตด้วยถ้อยคำที่ [สั้น ชัดเจน และได้ใจความตรงประเด็น] เพื่อไม่ให้ประชาชนเกิดความสับสน",
        "difficulty": "medium",
        "explanation": "คำว่า \"กระชับ\" หมายถึง กะทัดรัด สั้น ตรงประเด็น เข้าใจง่าย เหมาะกับการอธิบายการสื่อสารหรือถ้อยคำแถลงการณ์",
        "trap_analysis": "ระวังสับสนกับ \"รัดกุม\" (เน้นป้องกันข้อผิดพลาด/ไม่ให้มีช่องโหว่) หรือ \"จำกัด\" (เน้นขอบเขตปริมาณ)",
        "options": [
            {"label": "1", "content": "รัดกุม", "is_correct": 0},
            {"label": "2", "content": "กระชับ", "is_correct": 1},
            {"label": "3", "content": "จำกัด", "is_correct": 0},
            {"label": "4", "content": "ย่อหย่อน", "is_correct": 0},
            {"label": "5", "content": "ประณีต", "is_correct": 0}
        ]
    }
]

# 1.2 การใช้ภาษา (tgat2_lang_usage) - Q06 to Q10
usage_data = [
    {
        "id": "q_tgat2_s2_06",
        "blueprint_id": "tgat2_lang_usage",
        "question_text": "ข้อใดสะกดคำได้ \"ถูกต้องทุกคำ\" ตามพจนานุกรมฉบับราชบัณฑิตยสถาน",
        "stimulus": None,
        "difficulty": "medium",
        "explanation": "\"อัปเกรด, โลกาภิวัตน์, กฎเกณฑ์, สังเกต\" สะกดถูกต้องทุกคำ\n(ข้ออื่นผิด: อนุญาติ -> อนุญาต, ปรากฎ -> ปรากฏ, กฏหมาย -> กฎหมาย, มงกุฏ -> มงกุฎ)",
        "trap_analysis": "จุดที่ผิดบ่อย: อนุญาต (ไม่มีสระอิ), ปรากฏ (ฏ ชฎา หรือ ฏ ปฏัก? ปรากฏ ใช้ ฏ ปฏัก 2 หยัก, กฎเกณฑ์ ใช้ ฎ ชฎา 1 หยัก)",
        "options": [
            {"label": "1", "content": "อัปเกรด, โลกาภิวัตน์, กฎเกณฑ์, สังเกต", "is_correct": 1},
            {"label": "2", "content": "อัพเกรด, โลกาภิวัฒน์, กฏเกณฑ์, สังเกตุ", "is_correct": 0},
            {"label": "3", "content": "อนุญาติ, ปรากฏการณ์, กฎหมาย, สัมมนา", "is_correct": 0},
            {"label": "4", "content": "มงกุฏ, รสนิยม, วิวัฒนาการ, คลีนิก", "is_correct": 0},
            {"label": "5", "content": "กะทัดรัด, กะเพรา, ปรากฎการณ์, ลายเซ็นต์", "is_correct": 0}
        ]
    },
    {
        "id": "q_tgat2_s2_07",
        "blueprint_id": "tgat2_lang_usage",
        "question_text": "ข้อใด \"ไม่มี\" การใช้สำนวนโครงสร้างภาษาต่างประเทศ (Passive voice / คำฟุ่มเฟือยแบบแปลตรงตัว)",
        "stimulus": None,
        "difficulty": "hard",
        "explanation": "ข้อ 3 \"นักวิจัยนำเสนอแบบจำลองการทำนายภูมิอากาศต่อที่ประชุมนานาชาติ\" ใช้โครงสร้างประโยคแบบประธานทำกริยาโดยตรง ไม่มีโครงสร้าง \"ได้รับการ...\" หรือ \"ถูก...\" ในความหมายที่ดี",
        "trap_analysis": "ข้ออื่นมีสำนวนต่างประเทศ: \"ได้รับการยกย่อง\" (สำนวนถูกกระทำในทางดี), \"ทำการทดสอบ\" (ฟุ่มเฟือย), \"มีความจำเป็นที่จะต้อง\" (ฟุ่มเฟือย)",
        "options": [
            {"label": "1", "content": "ระบบคอมพิวเตอร์ใหม่ได้รับการยกย่องว่ามีความเสถียรสูงสุด", "is_correct": 0},
            {"label": "2", "content": "วิศวกรได้ทำการทดสอบประสิทธิภาพของเซมิคอนดักเตอร์รุ่นล่าสุด", "is_correct": 0},
            {"label": "3", "content": "นักวิจัยนำเสนอแบบจำลองการทำนายสภาพภูมิอากาศต่อที่ประชุมวิชาการนานาชาติ", "is_correct": 1},
            {"label": "4", "content": "มันมีความจำเป็นที่จะต้องสำรองข้อมูลลงในระบบคลาวด์ทุกวัน", "is_correct": 0},
            {"label": "5", "content": "โครงการวิจัยนี้ถูกค้นพบโดยกลุ่มนักศึกษาคณะวิทยาศาสตร์", "is_correct": 0}
        ]
    },
    {
        "id": "q_tgat2_s2_08",
        "blueprint_id": "tgat2_lang_usage",
        "question_text": "ข้อความใดใช้ \"ภาษาระดับทางการ\" (Formal Language) ได้อย่างถูกต้องสมบูรณ์",
        "stimulus": None,
        "difficulty": "medium",
        "explanation": "\"มหาวิทยาลัยขอเชิญคณาจารย์และนักศึกษาเข้าร่วมการประชุมวิชาการระดับชาติ\" เป็นภาษาระดับทางการ ปราศจากคำภาษาปากหรือคำสแลง",
        "trap_analysis": "ตัวเลือกอื่นมีคำภาษาปาก: \"แจ่มแจ๋ว\", \"กินข้าว\", \"เจ๋งเป้ง\", \"เคลียร์ปัญหา\"",
        "options": [
            {"label": "1", "content": "นวัตกรรมตัวนี้ถือว่าแจ่มแจ๋วมากสำหรับการประหยัดพลังงานในอาคาร", "is_correct": 0},
            {"label": "2", "content": "มหาวิทยาลัยขอเรียนเชิญคณาจารย์และนักวิจัยเข้าร่วมการประชุมวิชาการระดับชาติ", "is_correct": 1},
            {"label": "3", "content": "คณะกรรมการต้องรีบเคลียร์ปัญหาหนี้สินให้เสร็จสิ้นภายในสิ้นเดือนนี้", "is_correct": 0},
            {"label": "4", "content": "ถ้าทุกคนร่วมมือร่วมใจกัน งานวิจัยนี้ก็คงสำเร็จไปได้ด้วยดีแบบชิลๆ", "is_correct": 0},
            {"label": "5", "content": "ผู้บริหารคนใหม่เข้ามาคุมทีมและสั่งการให้ลูกน้องเร่งรัดโปรเจกต์ทันที", "is_correct": 0}
        ]
    },
    {
        "id": "q_tgat2_s2_09",
        "blueprint_id": "tgat2_lang_usage",
        "question_text": "จงเรียงลำดับข้อความต่อไปนี้ให้เป็นประโยคที่ถูกต้อง สละสลวย และได้ใจความสมบูรณ์\n(ก) ช่วยให้แพทย์สามารถวินิจฉัยโรคได้อย่างแม่นยำยิ่งขึ้น\n(ข) การนำระบบปัญญาประดิษฐ์มาประยุกต์ใช้ในการประมวลผลภาพถ่ายทางการแพทย์\n(ค) ซึ่งส่งผลให้การวางแผนการรักษาผู้ป่วยมีประสิทธิภาพสูงสุด\n(ง) และลดระยะเวลาในการรอคอยผลตรวจของคนไข้",
        "stimulus": None,
        "difficulty": "medium",
        "explanation": "ลำดับที่ถูกต้อง: (ข) นำระบบปัญญาประดิษฐ์... -> (ก) ช่วยให้แพทย์สามารถวินิจฉัย... -> (ง) และลดระยะเวลา... -> (ค) ซึ่งส่งผลให้การวางแผน...",
        "trap_analysis": "สังเกตประธานของประโยคต้องขึ้นต้นด้วย (ข) จากนั้นตามด้วยกริยาหลักใน (ก) และเชื่อมด้วย (ง) ปิดท้ายด้วยผลสรุปรวมใน (ค)",
        "options": [
            {"label": "1", "content": "(ข) - (ก) - (ง) - (ค)", "is_correct": 1},
            {"label": "2", "content": "(ก) - (ข) - (ค) - (ง)", "is_correct": 0},
            {"label": "3", "content": "(ข) - (ค) - (ก) - (ง)", "is_correct": 0},
            {"label": "4", "content": "(ง) - (ก) - (ข) - (ค)", "is_correct": 0},
            {"label": "5", "content": "(ข) - (ง) - (ค) - (ก)", "is_correct": 0}
        ]
    },
    {
        "id": "q_tgat2_s2_10",
        "blueprint_id": "tgat2_lang_usage",
        "question_text": "ข้อความใดมี \"ความกำกวมทางภาษา\" (ตีความโครงสร้างประโยคได้มากกว่าหนึ่งความหมาย)",
        "stimulus": None,
        "difficulty": "hard",
        "explanation": "\"วิศวกรสั่งคอมพิวเตอร์ใหม่ที่มีการ์ดจอประสิทธิภาพสูงสองเครื่อง\": คำว่า \"สองเครื่อง\" กำกวมว่า ขยาย \"คอมพิวเตอร์ใหม่\" (มีคอมพิวเตอร์ 2 เครื่อง) หรือขยาย \"การ์ดจอ\" (คอมพิวเตอร์ 1 เครื่อง แต่มีการ์ดจอ 2 ตัว)",
        "trap_analysis": "ความกำกวมจากการวางส่วนขยายผิดตำแหน่ง เป็นข้อสอบยอดนิยมของ TGAT2 พาร์ตภาษาไทย",
        "options": [
            {"label": "1", "content": "วิศวกรสั่งซื้อคอมพิวเตอร์รุ่นใหม่ที่มีการ์ดจอประสิทธิภาพสูงสองเครื่อง", "is_correct": 1},
            {"label": "2", "content": "นักวิทยาศาสตร์ค้นพบสารประกอบชนิดใหม่ในห้องทดลองทางเคมี", "is_correct": 0},
            {"label": "3", "content": "โรงพยาบาลติดตั้งเครื่องฟอกอากาศเพื่อลดปริมาณฝุ่นละอองขนาดเล็ก", "is_correct": 0},
            {"label": "4", "content": "ผู้บริหารอนุมัติงบประมาณประจำปีสำหรับการจัดซื้ออุปกรณ์วิทยาศาสตร์", "is_correct": 0},
            {"label": "5", "content": "นักเรียนทุกคนเข้าแถวเคารพธงชาติอย่างเป็นระเบียบเรียบร้อยในตอนเช้า", "is_correct": 0}
        ]
    }
]

# 1.3 การอ่านเข้าใจ (tgat2_lang_reading) - Q11 to Q15
reading_data = [
    {
        "id": "q_tgat2_s2_11",
        "blueprint_id": "tgat2_lang_reading",
        "stimulus": "แม้ว่าเทคโนโลยีปัญญาประดิษฐ์จะสามารถประมวลผลข้อมูลมหาศาลและสร้างสรรค์ผลงานได้อย่างรวดเร็วเกินกว่าขีดจำกัดของมนุษย์ ทว่าหัวใจสำคัญของการสร้างสรรค์อย่างมีคุณค่ามิได้อยู่ที่ความเร็วหรือปริมาณ หากแต่อยู่ที่ \"วิจารณญาณทางจริยธรรมและความเข้าอกเข้าใจในความเป็นมนุษย์\" ซึ่งเป็นสิ่งที่มีเพียงสิ่งมีชีวิตที่มีความรู้สึกเท่านั้นจึงจะสามารถส่งมอบให้แก่กันได้อย่างแท้จริง",
        "question_text": "ข้อความข้างต้นมี \"ใจความสำคัญ\" ตรงกับข้อใดมากที่สุด",
        "difficulty": "medium",
        "explanation": "ใจความสำคัญอยู่ที่ประโยคหลังคำเชื่อมแย้ง \"ทว่า...\": เน้นย้ำว่าคุณค่าที่แท้จริงของการสร้างสรรค์คือวิจารณญาณทางจริยธรรมและความเป็นมนุษย์ที่ AI ไม่อาจทดแทนได้",
        "trap_analysis": "ระวังเลือกข้อความส่วนแรกที่พูดถึงความเร็วและปริมาณของ AI ซึ่งเป็นเพียงประเด็นรองที่นำมาเปรียบเทียบ",
        "options": [
            {"label": "1", "content": "ปัญญาประดิษฐ์สามารถทำงานสร้างสรรค์ได้รวดเร็วกว่ามนุษย์ในทุกมิติ", "is_correct": 0},
            {"label": "2", "content": "คุณค่าที่แท้จริงของงานสร้างสรรค์ขึ้นอยู่กับมิติด้านจริยธรรมและความเข้าอกเข้าใจซึ่ง AI ทดแทนไม่ได้", "is_correct": 1},
            {"label": "3", "content": "มนุษย์ควรเลิกใช้เทคโนโลยีปัญญาประดิษฐ์ในการทำงานศิลปะและการประมวลผล", "is_correct": 0},
            {"label": "4", "content": "ในอนาคตเทคโนโลยีจะสามารถพัฒนาความรู้สึกและความเข้าอกเข้าใจได้เช่นเดียวกับมนุษย์", "is_correct": 0},
            {"label": "5", "content": "การประมวลผลข้อมูลปริมาณมากเป็นอุปสรรคสำคัญต่อการพัฒนาจริยธรรมในสังคม", "is_correct": 0}
        ]
    },
    {
        "id": "q_tgat2_s2_12",
        "blueprint_id": "tgat2_lang_reading",
        "stimulus": "การปล่อยให้เด็กเล็กใช้อุปกรณ์หน้าจอเป็นเวลานานโดยปราศจากการมีปฏิสัมพันธ์กับผู้ปกครอง ไม่เพียงแต่ขัดขวางพัฒนาการทางภาษาและการสื่อสาร แต่ยังส่งผลต่อวงจรการควบคุมอารมณ์และสมาธิในระยะยาว ผู้ปกครองจึงต้องตระหนักว่า อุปกรณ์ดิจิทัลมิใช่พี่เลี้ยงเด็ก แต่เป็นเครื่องมือที่ต้องได้รับการดูแลและกำหนดขอบเขตการใช้งานอย่างเคร่งครัด",
        "question_text": "\"จุดประสงค์หลักของผู้เขียน\" ในข้อความข้างต้นคือข้อใด",
        "difficulty": "easy",
        "explanation": "ผู้เขียนชี้ให้เห็นโทษของการปล่อยให้เด็กดูหน้าจอลำพัง และเตือนสติผู้ปกครองว่าต้องกำกับดูแลอย่างเคร่งครัด: \"เพื่อเตือนสติผู้ปกครองให้ควบคุมการใช้อุปกรณ์หน้าจอของเด็กเล็กอย่างใกล้ชิด\"",
        "trap_analysis": "ตัวเลือกอื่นเกินขอบเขต เช่น สั่งห้ามผลิตแท็บเล็ต หรือระบุว่าอุปกรณ์ดิจิทัลเป็นสิ่งผิดกฎหมาย",
        "options": [
            {"label": "1", "content": "เพื่อเตือนสติและกระตุ้นให้ผู้ปกครองควบคุมการใช้อุปกรณ์หน้าจอของเด็กอย่างใกล้ชิด", "is_correct": 1},
            {"label": "2", "content": "เพื่อเสนอแนะให้ยกเลิกการผลิตและจัดจำหน่ายแท็บเล็ตสำหรับเด็กในประเทศ", "is_correct": 0},
            {"label": "3", "content": "เพื่อวิจารณ์ระบบการศึกษาปฐมวัยที่นำเทคโนโลยีดิจิทัลมาใช้ในห้องเรียน", "is_correct": 0},
            {"label": "4", "content": "เพื่ออธิบายการทำงานของคลื่นสมองส่วนหน้าเมื่อเด็กมองแสงสีฟ้า", "is_correct": 0},
            {"label": "5", "content": "เพื่อเปรียบเทียบข้อดีและข้อเสียของการจ้างพี่เลี้ยงเด็กกับเทคโนโลยีดิจิทัล", "is_correct": 0}
        ]
    },
    {
        "id": "q_tgat2_s2_13",
        "blueprint_id": "tgat2_lang_reading",
        "stimulus": "การสำรวจพฤติกรรมการนอนของวัยรุ่นไทยพบว่า มากกว่าร้อยละ 60 เข้านอนหลังเที่ยงคืนเนื่องจากการเล่นเกมและใช้งานโซเชียลมีเดีย ส่งผลให้มีอาการง่วงซึมในชั่วโมงเรียนตอนเช้า สมาธิสั้นลง และมีผลสัมฤทธิ์ทางการเรียนลดลงอย่างมีนัยสำคัญทางสถิติเมื่อเทียบกับกลุ่มที่นอนหลับพักผ่อนอย่างน้อย 8 ชั่วโมงต่อวัน",
        "question_text": "ข้อใดสามารถ \"อนุมาน (Inference)\" ได้อย่างสมเหตุสมผลที่สุดจากข้อความข้างต้น",
        "difficulty": "medium",
        "explanation": "จากข้อความ กลุ่มที่นอนอย่างน้อย 8 ชม. มีสมาธิและผลการเรียนดีกว่ากลุ่มอดนอน จึงอนุมานได้ว่า \"การปรับพฤติกรรมการนอนให้เพียงพอมีแนวโน้มช่วยยกระดับความสามารถในการเรียนรู้ของวัยรุ่น\"",
        "trap_analysis": "ระวังข้อที่สรุปเกินจริง เช่น โซเชียลมีเดียทำให้เด็กทุกคนสอบตก หรือเด็กที่นอนหลังเที่ยงคืนเป็นคนเกเร",
        "options": [
            {"label": "1", "content": "การนอนหลับพักผ่อนที่เพียงพอมีส่วนช่วยส่งเสริมสมรรถนะการเรียนรู้และสมาธิของนักเรียน", "is_correct": 1},
            {"label": "2", "content": "วัยรุ่นทุกคนที่เล่นเกมออนไลน์จะมีผลการเรียนต่ำกว่าเกณฑ์มาตรฐานเสมอ", "is_correct": 0},
            {"label": "3", "content": "การเลื่อนเวลาเริ่มเรียนเป็นช่วงบ่ายจะสามารถแก้ปัญหาการติดเกมของวัยรุ่นได้ทั้งหมด", "is_correct": 0},
            {"label": "4", "content": "โซเชียลมีเดียเป็นสาเหตุเดียวที่ทำให้ผลการศึกษาของเยาวชนไทยตกต่ำลง", "is_correct": 0},
            {"label": "5", "content": "การนอนมากกว่า 10 ชั่วโมงต่อวันจะทำให้นักเรียนสอบได้คะแนนเต็มในทุกวิชา", "is_correct": 0}
        ]
    },
    {
        "id": "q_tgat2_s2_14",
        "blueprint_id": "tgat2_lang_reading",
        "stimulus": "การทุ่มงบประมาณมหาศาลไปกับการจัดซื้อเทคโนโลยีนำเข้าอันทันสมัย โดยละเลยการเสริมสร้างทักษะพื้นฐานและความสามารถในการคิดวิเคราะห์ของผู้ใช้งาน ก็เปรียบเสมือนการซื้อรถสปอร์ตราคาแพงให้แก่ผู้ที่ขับรถไม่เป็น นอกจากจะไม่ช่วยให้เดินทางได้รวดเร็วขึ้นแล้ว ยังเสี่ยงต่อการเกิดอุบัติเหตุที่สร้างความสูญเสียอย่างประเมินค่ามิได้",
        "question_text": "ผู้เขียนใช้ \"น้ำเสียง (Tone)\" แบบใดในข้อความข้างต้น",
        "difficulty": "medium",
        "explanation": "ผู้เขียนใช้การเปรียบเทียบเชิงอุปมาอุปไมยเพื่อชี้ให้เห็นความผิดพลาดของการทุ่มงบประมาณโดยไม่พัฒนาคน: น้ำเสียงจึงเป็นการ \"ตักเตือนเชิงวิพากษ์วิจารณ์ (Critical and Warning)\"",
        "trap_analysis": "ตัวเลือกอื่นไม่ตรง เช่น ชื่นชมยินดี (Celebratory), สิ้นหวังยอมจำนน (Defeatist), ประชดประชันอย่างก้าวร้าว (Hostile)",
        "options": [
            {"label": "1", "content": "วิพากษ์วิจารณ์และตักเตือนอย่างมีเหตุผล", "is_correct": 1},
            {"label": "2", "content": "ชื่นชมยินดีในความก้าวหน้าของเทคโนโลยี", "is_correct": 0},
            {"label": "3", "content": "สิ้นหวังและท้อแท้ต่ออนาคตของประเทศ", "is_correct": 0},
            {"label": "4", "content": "เยาะเย้ยถากถางด้วยความสะใจ", "is_correct": 0},
            {"label": "5", "content": "เฉยเมยและไม่ให้ความสำคัญกับปัญหา", "is_correct": 0}
        ]
    },
    {
        "id": "q_tgat2_s2_15",
        "blueprint_id": "tgat2_lang_reading",
        "stimulus": "การทดลองทางคลินิกพบว่า การเดินเร็ววันละ 30 นาที สัปดาห์ละ 5 วัน มีประสิทธิภาพในการลดระดับน้ำตาลในเลือดสะสมและควบคุมความดันโลหิต เทียบเท่ากับการรับประทานยาลดระดับน้ำตาลบางชนิดในผู้ป่วยเบาหวานระยะเริ่มต้น ทั้งยังช่วยกระตุ้นการหลั่งสารเอนดอร์ฟินซึ่งช่วยลดความเครียดและปรับปรุงคุณภาพการนอนหลับให้ดียิ่งขึ้น",
        "question_text": "จากข้อความข้างต้น ข้อใด \"ไม่สอดคล้อง\" กับผลการทดลอง",
        "difficulty": "easy",
        "explanation": "ข้อความระบุว่า \"เทียบเท่ากับการรับประทานยาบางชนิดในผู้ป่วยเบาหวานระยะเริ่มต้น\" ไม่ได้ระบุว่า \"สามารถทดแทนยารักษาโรคทุกชนิดในผู้ป่วยทุกระยะได้อย่างสิ้นเชิง\"",
        "trap_analysis": "คำว่า \"ทุกชนิด\" และ \"ทุกระยะ\" เป็นคำชี้สัมบูรณ์ (Absolute statement) ที่มักผิดตามหลักการอ่านจับใจความ",
        "options": [
            {"label": "1", "content": "การเดินเร็วสามารถช่วยปรับปรุงคุณภาพการนอนหลับและบรรเทาความเครียดได้", "is_correct": 0},
            {"label": "2", "content": "การออกกำลังกายด้วยการเดินเร็วช่วยลดระดับน้ำตาลสะสมในกระแสเลือด", "is_correct": 0},
            {"label": "3", "content": "การเดินเร็วสามารถใช้ทดแทนยารักษาโรคเบาหวานทุกชนิดในผู้ป่วยทุกระยะได้อย่างสิ้นเชิง", "is_correct": 1},
            {"label": "4", "content": "การออกกำลังกายช่วยกระตุ้นให้ร่างกายหลั่งสารแห่งความสุขหรือเอนดอร์ฟิน", "is_correct": 0},
            {"label": "5", "content": "การควบคุมความดันโลหิตสามารถทำได้ผ่านการเดินเร็วอย่างสม่ำเสมอสัปดาห์ละ 5 วัน", "is_correct": 0}
        ]
    }
]

# 1.4 การเข้าใจสำนวน (tgat2_lang_idioms) - Q16 to Q20
idiom_data = [
    {
        "id": "q_tgat2_s2_16",
        "blueprint_id": "tgat2_lang_idioms",
        "question_text": "บริษัทตรวจพบช่องโหว่ความปลอดภัยในระบบ จึงรีบจัดตั้งทีมผู้เชี่ยวชาญเพื่ออัปเดตระบบรักษาความปลอดภัยทันที \"ก่อนที่จะมีข้อมูลลูกค้ารั่วไหล\" การกระทำนี้ตรงกับสำนวนใด",
        "stimulus": None,
        "difficulty": "easy",
        "explanation": "\"กันไว้ดีกว่าแก้\" หมายถึง การเตรียมการป้องกันปัญหาก่อนที่ความเสียหายจะเกิดขึ้น (ตรงข้ามกับ วัวหายล้อมคอก ที่เกิดเรื่องแล้วจึงมาป้องกัน)",
        "trap_analysis": "ระวังเลือก \"วัวหายล้อมคอก\" เพราะในโจทย์ระบุชัดเจนว่าทำ \"ก่อนที่จะมีข้อมูลลูกค้ารั่วไหล\"",
        "options": [
            {"label": "1", "content": "วัวหายล้อมคอก", "is_correct": 0},
            {"label": "2", "content": "กันไว้ดีกว่าแก้", "is_correct": 1},
            {"label": "3", "content": "ขี่ช้างจับตั๊กแตน", "is_correct": 0},
            {"label": "4", "content": "จับปลาสองมือ", "is_correct": 0},
            {"label": "5", "content": "ชักหน้าไม่ถึงหลัง", "is_correct": 0}
        ]
    },
    {
        "id": "q_tgat2_s2_17",
        "blueprint_id": "tgat2_lang_idioms",
        "question_text": "สำนวนในข้อใดมีความหมาย \"ตรงข้าม\" กับสำนวน \"จับปลาสองมือ\" มากที่สุด",
        "stimulus": None,
        "difficulty": "medium",
        "explanation": "\"จับปลาสองมือ\" หมายถึง หมายจะได้ทั้งสองอย่างพร้อมกันจนสุดท้ายอาจไม่ได้อะไรเลย ความหมายตรงข้ามคือการมุ่งมั่นจดจ่อทำสิ่งเดียวให้สำเร็จอย่างแน่วแน่: \"มุ่งมั่นทำสิ่งเดียวให้เกิดความเชี่ยวชาญจนสำเร็จ (นกน้อยทำรังแต่พอตัว / กัดไม่ปล่อย)\"",
        "trap_analysis": "วิเคราะห์แก่นของสำนวน: จับปลาสองมือ = โลภ/ทำหลายอย่างพร้อมกันจนพัง ตรงข้ามกับความแน่วแน่ทำทีละอย่าง",
        "options": [
            {"label": "1", "content": "เหยียบเรือสองแคม", "is_correct": 0},
            {"label": "2", "content": "ทำสิ่งเดียวอย่างแน่วแน่และทุ่มเทจนเชี่ยวชาญ", "is_correct": 1},
            {"label": "3", "content": "งมเข็มในมหาสมุทร", "is_correct": 0},
            {"label": "4", "content": "ตำน้ำพริกละลายแม่น้ำ", "is_correct": 0},
            {"label": "5", "content": "ชุบมือเปิบ", "is_correct": 0}
        ]
    },
    {
        "id": "q_tgat2_s2_18",
        "blueprint_id": "tgat2_lang_idioms",
        "question_text": "การลงทุนสร้างศูนย์ข้อมูลมูลค่าพันล้านบาทเพื่อนำมาใช้เก็บแค่ไฟล์เอกสารข้อความไม่กี่ฉบับ เปรียบได้กับสำนวนใด",
        "stimulus": None,
        "difficulty": "easy",
        "explanation": "\"ขี่ช้างจับตั๊กแตน\" หมายถึง การลงทุนลงแรงเป็นอันมากเพื่อทำงานชิ้นเล็กนิดเดียว ซึ่งได้ผลตอบแทนไม่คุ้มค่ากับการลงทุน",
        "trap_analysis": "ตำน้ำพริกละลายแม่น้ำ หมายถึง ลงทุนไปแล้วสูญเปล่าไม่ได้อะไรกลับมาเลย ส่วน ขี่ช้างจับตั๊กแตน เน้นความไม่สมส่วนระหว่างการลงทุนที่มหาศาลกับเป้าหมายที่เล็กน้อย",
        "options": [
            {"label": "1", "content": "ขี่ช้างจับตั๊กแตน", "is_correct": 1},
            {"label": "2", "content": "น้ำขึ้นให้รีบตัก", "is_correct": 0},
            {"label": "3", "content": "เข้าเมืองตาหลิ่วต้องหลิ่วตาตาม", "is_correct": 0},
            {"label": "4", "content": "น้ำพึ่งเรือเสือพึ่งป่า", "is_correct": 0},
            {"label": "5", "content": "คางคกขึ้นวอ", "is_correct": 0}
        ]
    },
    {
        "id": "q_tgat2_s2_19",
        "blueprint_id": "tgat2_lang_idioms",
        "question_text": "ผู้จัดการคนนี้มักจะพูดยกย่องพนักงานในที่สาธารณะ แต่พอลับหลังกลับนำข้อบกพร่องเล็ก ๆ น้อย ๆ ไปนินทาให้ผู้บริหารระดับสูงฟัง ตรงกับสำนวนใด",
        "stimulus": None,
        "difficulty": "medium",
        "explanation": "\"หน้าไหว้หลังหลอก\" หมายถึง ต่อหน้าทำเป็นนับถือและพูดดี แต่พอลับหลังกลับคิดร้ายหรือนินทาว่าร้าย",
        "trap_analysis": "ปากหวานก้นเปรี้ยว หมายถึง พูดจาอ่อนหวานแต่ในใจคิดร้าย ส่วน หน้าไหว้หลังหลอก เน้นการแสดงออกต่อหน้าดีแต่ลับหลังหักหลัง",
        "options": [
            {"label": "1", "content": "หน้าไหว้หลังหลอก", "is_correct": 1},
            {"label": "2", "content": "ชักศึกเข้าบ้าน", "is_correct": 0},
            {"label": "3", "content": "ชี้โพรงให้กระรอก", "is_correct": 0},
            {"label": "4", "content": "หมาหวงก้าง", "is_correct": 0},
            {"label": "5", "content": "กวนน้ำให้ขุ่น", "is_correct": 0}
        ]
    },
    {
        "id": "q_tgat2_s2_20",
        "blueprint_id": "tgat2_lang_idioms",
        "question_text": "วิศวกรฝึกงานพยายามจะไปอธิบายทฤษฎีการเขียนโค้ดขั้นพื้นฐานให้แก่หัวหน้าสถาปนิกซอฟต์แวร์ที่มีประสบการณ์มากว่ายี่สิบปี ตรงกับสำนวนใด",
        "stimulus": None,
        "difficulty": "easy",
        "explanation": "\"สอนจระเข้ให้ว่ายน้ำ\" หรือ \"สอนหนังสือสังฆราช\" หมายถึง การไปสั่งสอนหรืออวดรู้กับผู้ที่มีความรู้และความชำนาญมากกว่าตนเองอย่างเทียบไม่ได้",
        "trap_analysis": "ระวังเลือก \"เอามะพร้าวห้าวไปขายสวน\" (เน้นเรื่องการนำของที่มีมากอยู่แล้วไปขาย) ในบริบทการสอนความรู้สำนวนที่ตรงที่สุดคือ \"สอนจระเข้ให้ว่ายน้ำ\"",
        "options": [
            {"label": "1", "content": "สอนจระเข้ให้ว่ายน้ำ", "is_correct": 1},
            {"label": "2", "content": "ไก่เห็นตีนงู งูเห็นนมไก่", "is_correct": 0},
            {"label": "3", "content": "กิ้งก่าได้ทอง", "is_correct": 0},
            {"label": "4", "content": "จับปูใส่กระด้ง", "is_correct": 0},
            {"label": "5", "content": "ขวานผ่าซาก", "is_correct": 0}
        ]
    }
]

for q in meaning_data + usage_data + reading_data + idiom_data:
    q["subject_id"] = "tgat2"
    q["set_number"] = 2
    questions.append(q)

# =========================================================================
# DOMAIN 2: ความสามารถทางตัวเลข (NUMERICAL ABILITY) - 20 Questions (Q21 - Q40)
# =========================================================================

# 2.1 อนุกรมมิติ (tgat2_num_matrix) - Q21 to Q25
matrix_data = [
    {
        "id": "q_tgat2_s2_21",
        "blueprint_id": "tgat2_num_matrix",
        "question_text": "พิจารณาตารางความสัมพันธ์เชิงตัวเลขขนาด 3x3 ดังต่อไปนี้:\n\n<div style=\"text-align:center; margin:14px 0;\">\n<table style=\"margin:0 auto; border-collapse:collapse; background:rgba(30,41,59,0.7); border-radius:8px; border:1px solid #475569;\">\n  <tr style=\"border-bottom:1px solid #475569;\"><td style=\"padding:12px 20px; font-weight:bold; color:#f8fafc;\">3</td><td style=\"padding:12px 20px; font-weight:bold; color:#f8fafc;\">7</td><td style=\"padding:12px 20px; font-weight:bold; color:#38bdf8;\">23</td></tr>\n  <tr style=\"border-bottom:1px solid #475569;\"><td style=\"padding:12px 20px; font-weight:bold; color:#f8fafc;\">5</td><td style=\"padding:12px 20px; font-weight:bold; color:#f8fafc;\">6</td><td style=\"padding:12px 20px; font-weight:bold; color:#38bdf8;\">32</td></tr>\n  <tr><td style=\"padding:12px 20px; font-weight:bold; color:#f8fafc;\">8</td><td style=\"padding:12px 20px; font-weight:bold; color:#f8fafc;\">4</td><td style=\"padding:12px 20px; font-weight:bold; color:#f59e0b; font-size:1.1rem;\">[ ? ]</td></tr>\n</table>\n</div>\n\nตัวเลขในตำแหน่ง [ ? ] มีค่าเท่าใด",
        "stimulus": None,
        "difficulty": "medium",
        "explanation": "พิจารณาความสัมพันธ์ตามแนวนอน (แถว):\n- แถวที่ 1: $(3 \\times 7) + 2 = 21 + 2 = 23$\n- แถวที่ 2: $(5 \\times 6) + 2 = 30 + 2 = 32$\n- แถวที่ 3: กฎคือ (ตัวแรก $\\times$ ตัวสอง) $+ 2 \\to (8 \\times 4) + 2 = 32 + 2 = 34$\nดังนั้น [ ? ] = 34",
        "trap_analysis": "ระวังคิดว่าเป็นการบวกธรรมดา เช่น $3+7 = 10$ ไม่สอดคล้องกับ 23",
        "options": [
            {"label": "1", "content": "30", "is_correct": 0},
            {"label": "2", "content": "32", "is_correct": 0},
            {"label": "3", "content": "34", "is_correct": 1},
            {"label": "4", "content": "36", "is_correct": 0},
            {"label": "5", "content": "38", "is_correct": 0}
        ]
    },
    {
        "id": "q_tgat2_s2_22",
        "blueprint_id": "tgat2_num_matrix",
        "question_text": "พิจารณาตารางตัวเลขต่อไปนี้:\n\n<div style=\"text-align:center; margin:14px 0;\">\n<table style=\"margin:0 auto; border-collapse:collapse; background:rgba(30,41,59,0.7); border-radius:8px; border:1px solid #475569;\">\n  <tr style=\"border-bottom:1px solid #475569;\"><td style=\"padding:12px 20px; font-weight:bold; color:#f8fafc;\">4</td><td style=\"padding:12px 20px; font-weight:bold; color:#f8fafc;\">9</td><td style=\"padding:12px 20px; font-weight:bold; color:#38bdf8;\">5</td></tr>\n  <tr style=\"border-bottom:1px solid #475569;\"><td style=\"padding:12px 20px; font-weight:bold; color:#f8fafc;\">16</td><td style=\"padding:12px 20px; font-weight:bold; color:#f8fafc;\">25</td><td style=\"padding:12px 20px; font-weight:bold; color:#38bdf8;\">9</td></tr>\n  <tr><td style=\"padding:12px 20px; font-weight:bold; color:#f8fafc;\">36</td><td style=\"padding:12px 20px; font-weight:bold; color:#f8fafc;\">49</td><td style=\"padding:12px 20px; font-weight:bold; color:#f59e0b; font-size:1.1rem;\">[ ? ]</td></tr>\n</table>\n</div>\n\nตัวเลขในตำแหน่ง [ ? ] มีค่าเท่าใด",
        "stimulus": None,
        "difficulty": "easy",
        "explanation": "สังเกตความสัมพันธ์ของรากที่สอง (Square root) ในแต่ละแถว:\n- แถวที่ 1: $\\sqrt{4} + \\sqrt{9} = 2 + 3 = 5$\n- แถวที่ 2: $\\sqrt{16} + \\sqrt{25} = 4 + 5 = 9$\n- แถวที่ 3: $\\sqrt{36} + \\sqrt{49} = 6 + 7 = 13$\nดังนั้น [ ? ] = 13",
        "trap_analysis": "มองตัวเลขเป็นกำลังสองสมบูรณ์ ($4=2^2, 9=3^2, 16=4^2, 25=5^2$) นำฐานมาบวกกัน",
        "options": [
            {"label": "1", "content": "11", "is_correct": 0},
            {"label": "2", "content": "12", "is_correct": 0},
            {"label": "3", "content": "13", "is_correct": 1},
            {"label": "4", "content": "14", "is_correct": 0},
            {"label": "5", "content": "15", "is_correct": 0}
        ]
    },
    {
        "id": "q_tgat2_s2_23",
        "blueprint_id": "tgat2_num_matrix",
        "question_text": "พิจารณาตารางตัวเลขขนาด 3x3 ดังต่อไปนี้:\n\n<div style=\"text-align:center; margin:14px 0;\">\n<table style=\"margin:0 auto; border-collapse:collapse; background:rgba(30,41,59,0.7); border-radius:8px; border:1px solid #475569;\">\n  <tr style=\"border-bottom:1px solid #475569;\"><td style=\"padding:12px 20px; font-weight:bold; color:#f8fafc;\">6</td><td style=\"padding:12px 20px; font-weight:bold; color:#f8fafc;\">4</td><td style=\"padding:12px 20px; font-weight:bold; color:#38bdf8;\">20</td></tr>\n  <tr style=\"border-bottom:1px solid #475569;\"><td style=\"padding:12px 20px; font-weight:bold; color:#f8fafc;\">8</td><td style=\"padding:12px 20px; font-weight:bold; color:#f8fafc;\">5</td><td style=\"padding:12px 20px; font-weight:bold; color:#38bdf8;\">39</td></tr>\n  <tr><td style=\"padding:12px 20px; font-weight:bold; color:#f8fafc;\">9</td><td style=\"padding:12px 20px; font-weight:bold; color:#f8fafc;\">7</td><td style=\"padding:12px 20px; font-weight:bold; color:#f59e0b; font-size:1.1rem;\">[ ? ]</td></tr>\n</table>\n</div>\n\nตัวเลขในตำแหน่ง [ ? ] มีค่าเท่าใด",
        "stimulus": None,
        "difficulty": "medium",
        "explanation": "พิจารณาความสัมพันธ์ผลต่างกำลังสอง (Difference of squares):\n- แถวที่ 1: $6^2 - 4^2 = 36 - 16 = 20$\n- แถวที่ 2: $8^2 - 5^2 = 64 - 25 = 39$\n- แถวที่ 3: $9^2 - 7^2 = 81 - 49 = 32$\nดังนั้น [ ? ] = 32",
        "trap_analysis": "สังเกต $a^2 - b^2$: $36-16=20, 64-25=39, 81-49=32$",
        "options": [
            {"label": "1", "content": "28", "is_correct": 0},
            {"label": "2", "content": "30", "is_correct": 0},
            {"label": "3", "content": "32", "is_correct": 1},
            {"label": "4", "content": "34", "is_correct": 0},
            {"label": "5", "content": "36", "is_correct": 0}
        ]
    },
    {
        "id": "q_tgat2_s2_24",
        "blueprint_id": "tgat2_num_matrix",
        "question_text": "พิจารณาตารางตัวเลขขนาด 3x3 ดังต่อไปนี้:\n\n<div style=\"text-align:center; margin:14px 0;\">\n<table style=\"margin:0 auto; border-collapse:collapse; background:rgba(30,41,59,0.7); border-radius:8px; border:1px solid #475569;\">\n  <tr style=\"border-bottom:1px solid #475569;\"><td style=\"padding:12px 20px; font-weight:bold; color:#f8fafc;\">12</td><td style=\"padding:12px 20px; font-weight:bold; color:#f8fafc;\">8</td><td style=\"padding:12px 20px; font-weight:bold; color:#38bdf8;\">5</td></tr>\n  <tr style=\"border-bottom:1px solid #475569;\"><td style=\"padding:12px 20px; font-weight:bold; color:#f8fafc;\">15</td><td style=\"padding:12px 20px; font-weight:bold; color:#f8fafc;\">9</td><td style=\"padding:12px 20px; font-weight:bold; color:#38bdf8;\">6</td></tr>\n  <tr><td style=\"padding:12px 20px; font-weight:bold; color:#f8fafc;\">21</td><td style=\"padding:12px 20px; font-weight:bold; color:#f8fafc;\">11</td><td style=\"padding:12px 20px; font-weight:bold; color:#f59e0b; font-size:1.1rem;\">[ ? ]</td></tr>\n</table>\n</div>\n\nตัวเลขในตำแหน่ง [ ? ] มีค่าเท่าใด",
        "stimulus": None,
        "difficulty": "medium",
        "explanation": "พิจารณาผลรวมแล้วหารด้วย 4:\n- แถวที่ 1: $(12 + 8) \\div 4 = 20 \\div 4 = 5$\n- แถวที่ 2: $(15 + 9) \\div 4 = 24 \\div 4 = 6$\n- แถวที่ 3: $(21 + 11) \\div 4 = 32 \\div 4 = 8$\nดังนั้น [ ? ] = 8",
        "trap_analysis": "สูตรคือ $(A + B) / 4 = C$",
        "options": [
            {"label": "1", "content": "7", "is_correct": 0},
            {"label": "2", "content": "8", "is_correct": 1},
            {"label": "3", "content": "9", "is_correct": 0},
            {"label": "4", "content": "10", "is_correct": 0},
            {"label": "5", "content": "11", "is_correct": 0}
        ]
    },
    {
        "id": "q_tgat2_s2_25",
        "blueprint_id": "tgat2_num_matrix",
        "question_text": "พิจารณาตารางตัวเลขขนาด 3x3 ดังต่อไปนี้:\n\n<div style=\"text-align:center; margin:14px 0;\">\n<table style=\"margin:0 auto; border-collapse:collapse; background:rgba(30,41,59,0.7); border-radius:8px; border:1px solid #475569;\">\n  <tr style=\"border-bottom:1px solid #475569;\"><td style=\"padding:12px 20px; font-weight:bold; color:#f8fafc;\">2</td><td style=\"padding:12px 20px; font-weight:bold; color:#f8fafc;\">3</td><td style=\"padding:12px 20px; font-weight:bold; color:#38bdf8;\">13</td></tr>\n  <tr style=\"border-bottom:1px solid #475569;\"><td style=\"padding:12px 20px; font-weight:bold; color:#f8fafc;\">4</td><td style=\"padding:12px 20px; font-weight:bold; color:#f8fafc;\">1</td><td style=\"padding:12px 20px; font-weight:bold; color:#38bdf8;\">17</td></tr>\n  <tr><td style=\"padding:12px 20px; font-weight:bold; color:#f8fafc;\">3</td><td style=\"padding:12px 20px; font-weight:bold; color:#f8fafc;\">4</td><td style=\"padding:12px 20px; font-weight:bold; color:#f59e0b; font-size:1.1rem;\">[ ? ]</td></tr>\n</table>\n</div>\n\nตัวเลขในตำแหน่ง [ ? ] มีค่าเท่าใด",
        "stimulus": None,
        "difficulty": "easy",
        "explanation": "พิจารณาผลรวมกำลังสอง:\n- แถวที่ 1: $2^2 + 3^2 = 4 + 9 = 13$\n- แถวที่ 2: $4^2 + 1^2 = 16 + 1 = 17$\n- แถวที่ 3: $3^2 + 4^2 = 9 + 16 = 25$\nดังนั้น [ ? ] = 25",
        "trap_analysis": "รูปแบบคลาสสิก $A^2 + B^2 = C$",
        "options": [
            {"label": "1", "content": "21", "is_correct": 0},
            {"label": "2", "content": "23", "is_correct": 0},
            {"label": "3", "content": "25", "is_correct": 1},
            {"label": "4", "content": "27", "is_correct": 0},
            {"label": "5", "content": "29", "is_correct": 0}
        ]
    }
]

# 2.2 การเปรียบเทียบเชิงปริมาณ (สดมภ์) (tgat2_num_columns) - Q26 to Q30
columns_data = [
    {
        "id": "q_tgat2_s2_26",
        "blueprint_id": "tgat2_num_columns",
        "question_text": "กำหนดให้ $x$ เป็นจำนวนจริงบวก ซึ่งสอดคล้องกับสมการ $x^2 - 7x + 12 = 0$\n\nพิจารณาปริมาณในสดมภ์ ก และสดมภ์ ข:\n- สดมภ์ ก: ค่าเฉลี่ยเลขคณิตของค่า $x$ ที่เป็นไปได้ทั้งหมด\n- สดมภ์ ข: $3.5$\n\nข้อใดสรุปถูกต้อง",
        "stimulus": None,
        "difficulty": "easy",
        "explanation": "แก้สมการ $x^2 - 7x + 12 = (x - 3)(x - 4) = 0 \\to x = 3, 4$\n- สดมภ์ ก: ค่าเฉลี่ยของ $3$ และ $4$ คือ $(3 + 4) / 2 = 3.5$\n- สดมภ์ ข: $3.5$\nดังนั้น สดมภ์ ก เท่ากับ สดมภ์ ข (ก = ข)",
        "trap_analysis": "คำตอบคือ ก = ข (เลือกข้อ 3)",
        "options": [
            {"label": "1", "content": "สดมภ์ ก มีค่ามากกว่า สดมภ์ ข", "is_correct": 0},
            {"label": "2", "content": "สดมภ์ ข มีค่ามากกว่า สดมภ์ ก", "is_correct": 0},
            {"label": "3", "content": "สดมภ์ ก มีค่าเท่ากับ สดมภ์ ข", "is_correct": 1},
            {"label": "4", "content": "ข้อมูลไม่เพียงพอที่จะเปรียบเทียบค่าของทั้งสองสดมภ์ได้", "is_correct": 0},
            {"label": "5", "content": "ทั้งสองสดมภ์มีค่าเป็นศูนย์ทั้งคู่", "is_correct": 0}
        ]
    },
    {
        "id": "q_tgat2_s2_27",
        "blueprint_id": "tgat2_num_columns",
        "question_text": "กำหนดให้ รถยนต์คันหนึ่งวิ่งจากเมือง A ไปเมือง B ด้วยความเร็วคงที่ 60 กม./ชม. และวิ่งกลับจากเมือง B มาเมือง A ตามเส้นทางเดิมด้วยความเร็วคงที่ 40 กม./ชม.\n\n- สดมภ์ ก: ความเร็วเฉลี่ยตลอดการเดินทางไปและกลับ (กม./ชม.)\n- สดมภ์ ข: 50 กม./ชม.\n\nข้อใดสรุปถูกต้อง",
        "stimulus": None,
        "difficulty": "medium",
        "explanation": "ความเร็วเฉลี่ยตลอดการเดินทางไปกลับเมื่อระยะทางเท่ากัน คำนวณจาก Harmonic Mean:\n$V_{avg} = \\frac{2 v_1 v_2}{v_1 + v_2} = \\frac{2 \\times 60 \\times 40}{60 + 40} = \\frac{4800}{100} = 48$ กม./ชม.\n- สดมภ์ ก = 48 กม./ชม.\n- สดมภ์ ข = 50 กม./ชม.\nดังนั้น สดมภ์ ข มากกว่า สดมภ์ ก",
        "trap_analysis": "จุดลวงคลาสสิก: ผู้สอบมักนำ $(60 + 40) / 2 = 50$ มาเฉลี่ยตรง ๆ ซึ่งผิดหลักฟิสิกส์ เพราะเวลาที่วิ่งด้วยความเร็ว 40 กม./ชม. ใช้เวลานานกว่า",
        "options": [
            {"label": "1", "content": "สดมภ์ ก มีค่ามากกว่า สดมภ์ ข", "is_correct": 0},
            {"label": "2", "content": "สดมภ์ ข มีค่ามากกว่า สดมภ์ ก", "is_correct": 1},
            {"label": "3", "content": "สดมภ์ ก มีค่าเท่ากับ สดมภ์ ข", "is_correct": 0},
            {"label": "4", "content": "ข้อมูลไม่เพียงพอที่จะเปรียบเทียบค่าของทั้งสองสดมภ์ได้", "is_correct": 0},
            {"label": "5", "content": "ไม่สามารถคำนวณความเร็วเฉลี่ยได้เนื่องจากไม่ทราบระยะทาง", "is_correct": 0}
        ]
    },
    {
        "id": "q_tgat2_s2_28",
        "blueprint_id": "tgat2_num_columns",
        "question_text": "พิจารณาการคำนวณส่วนลดสินค้าชิ้นหนึ่งราคาป้าย 1,000 บาท:\n- สดมภ์ ก: ราคาหลังลด 20% แล้วลดเพิ่มอีก 10% จากราคาที่ลดแล้ว\n- สดมภ์ ข: ราคาหลังลด 28% ครั้งเดียวจากราคาป้าย\n\nข้อใดสรุปถูกต้อง",
        "stimulus": None,
        "difficulty": "medium",
        "explanation": "- สดมภ์ ก: ลด 20% เหลือ $1,000 \\times 0.80 = 800$ บาท จากนั้นลดอีก 10% เหลือ $800 \\times 0.90 = 720$ บาท (ลดรวม $28\\%$)\n- สดมภ์ ข: ลด 28% เหลือ $1,000 \\times (1 - 0.28) = 720$ บาท\nดังนั้น ทั้งสองสดมภ์มีค่าเท่ากัน (720 บาท = 720 บาท)",
        "trap_analysis": "ส่วนลดซ้อน $20\\% + 10\\%$ คือ $1 - (0.8 \\times 0.9) = 1 - 0.72 = 0.28$ หรือ $28\\%$ เท่ากับการลด $28\\%$ พอดี",
        "options": [
            {"label": "1", "content": "สดมภ์ ก มีค่ามากกว่า สดมภ์ ข", "is_correct": 0},
            {"label": "2", "content": "สดมภ์ ข มีค่ามากกว่า สดมภ์ ก", "is_correct": 0},
            {"label": "3", "content": "สดมภ์ ก มีค่าเท่ากับ สดมภ์ ข", "is_correct": 1},
            {"label": "4", "content": "ข้อมูลไม่เพียงพอที่จะเปรียบเทียบค่าของทั้งสองสดมภ์ได้", "is_correct": 0},
            {"label": "5", "content": "สดมภ์ ก มีค่าเป็น 700 บาท", "is_correct": 0}
        ]
    },
    {
        "id": "q_tgat2_s2_29",
        "blueprint_id": "tgat2_num_columns",
        "question_text": "กำหนดให้ $a$ และ $b$ เป็นจำนวนจริงใด ๆ โดยที่ $a > b$\n\n- สดมภ์ ก: $a^2$\n- สดมภ์ ข: $b^2$\n\nข้อใดสรุปถูกต้อง",
        "stimulus": None,
        "difficulty": "medium",
        "explanation": "เนื่องจากโจทย์ไม่ได้กำหนดเครื่องหมายของ $a$ และ $b$:\n- กรณี 1: $a = 3, b = 2 \\to a^2 = 9, b^2 = 4$ (ก > ข)\n- กรณี 2: $a = 1, b = -3 \\to a > b$ แต่ $a^2 = 1, b^2 = 9$ (ก < ข)\n- กรณี 3: $a = 2, b = -2 \\to a > b$ แต่ $a^2 = 4, b^2 = 4$ (ก = ข)\nดังนั้น ข้อมูลไม่เพียงพอที่จะสรุปความสัมพันธ์ของทั้งสองสดมภ์ได้",
        "trap_analysis": "ระวังด่วนสรุปว่า $a > b$ แล้ว $a^2$ ต้องมากกว่า $b^2$ เสมอ เพราะหากมีจำนวนลบจะทำให้ผลลัพธ์กลับทิศ",
        "options": [
            {"label": "1", "content": "สดมภ์ ก มีค่ามากกว่า สดมภ์ ข", "is_correct": 0},
            {"label": "2", "content": "สดมภ์ ข มีค่ามากกว่า สดมภ์ ก", "is_correct": 0},
            {"label": "3", "content": "สดมภ์ ก มีค่าเท่ากับ สดมภ์ ข", "is_correct": 0},
            {"label": "4", "content": "ข้อมูลไม่เพียงพอที่จะเปรียบเทียบค่าของทั้งสองสดมภ์ได้", "is_correct": 1},
            {"label": "5", "content": "ทั้งสองสดมภ์หาค่าไม่ได้เนื่องจากติดค่าสัมบูรณ์", "is_correct": 0}
        ]
    },
    {
        "id": "q_tgat2_s2_30",
        "blueprint_id": "tgat2_num_columns",
        "question_text": "พิจารณาพื้นที่ของรูปทรงเรขาคณิตต่อไปนี้:\n- สดมภ์ ก: พื้นที่ของสี่เหลี่ยมจัตุรัสที่มีความยาวเส้นรอบรูปเท่ากับ 24 เซนติเมตร\n- สดมภ์ ข: พื้นที่ของสี่เหลี่ยมผืนผ้าที่มีความยาวเส้นรอบรูปเท่ากับ 24 เซนติเมตร และมีด้านยาวยาว 8 เซนติเมตร\n\nข้อใดสรุปถูกต้อง",
        "stimulus": None,
        "difficulty": "easy",
        "explanation": "- สดมภ์ ก: สี่เหลี่ยมจัตุรัสเส้นรอบรูป 24 ซม. แสดงว่าด้านยาวด้านละ $24 / 4 = 6$ ซม. $\\to$ พื้นที่ $= 6 \\times 6 = 36$ ตร.ซม.\n- สดมภ์ ข: สี่เหลี่ยมผืนผ้าเส้นรอบรูป 24 ซม. ด้านยาว 8 ซม. แสดงว่า $2(8 + กว้าง) = 24 \\to กว้าง = 4$ ซม. $\\to$ พื้นที่ $= 8 \\times 4 = 32$ ตร.ซม.\nดังนั้น สดมภ์ ก (36 ตร.ซม.) มีค่ามากกว่า สดมภ์ ข (32 ตร.ซม.)",
        "trap_analysis": "ในบรรดารูปสี่เหลี่ยมที่มีเส้นรอบรูปเท่ากัน รูปสี่เหลี่ยมจัตุรัสจะมีพื้นที่มากที่สุดเสมอ",
        "options": [
            {"label": "1", "content": "สดมภ์ ก มีค่ามากกว่า สดมภ์ ข", "is_correct": 1},
            {"label": "2", "content": "สดมภ์ ข มีค่ามากกว่า สดมภ์ ก", "is_correct": 0},
            {"label": "3", "content": "สดมภ์ ก มีค่าเท่ากับ สดมภ์ ข", "is_correct": 0},
            {"label": "4", "content": "ข้อมูลไม่เพียงพอที่จะเปรียบเทียบค่าของทั้งสองสดมภ์ได้", "is_correct": 0},
            {"label": "5", "content": "พื้นที่ของทั้งสองรูปทรงเท่ากับ 48 ตารางเซนติเมตร", "is_correct": 0}
        ]
    }
]

# 2.3 ความเพียงพอของข้อมูล (tgat2_num_sufficiency) - Q31 to Q35
suff_data = [
    {
        "id": "q_tgat2_s2_31",
        "blueprint_id": "tgat2_num_sufficiency",
        "question_text": "คำถาม: นักเรียนห้องหนึ่งมีทั้งหมดกี่คน?\n\nข้อมูลที่กำหนดให้:\n(1) นักเรียนชายมีจำนวนคิดเป็น 40% ของนักเรียนทั้งหมดในห้อง\n(2) ในห้องนี้มีนักเรียนหญิงมากกว่านักเรียนชายอยู่ 8 คน\n\nจงพิจารณาว่าต้องใช้ข้อมูลใดบ้างในการตอบคำถามนี้",
        "stimulus": None,
        "difficulty": "medium",
        "explanation": "- ใช้ (1) เพียงข้อเดียว: รู้แค่อัตราส่วน ชาย 40% หญิง 60% แต่ไม่รู้จำนวนคนจริง จึงไม่เพียงพอ\n- ใช้ (2) เพียงข้อเดียว: รู้ว่า หญิง - ชาย = 8 คน แต่ไม่รู้อัตราส่วน จึงไม่เพียงพอ\n- ใช้ (1) และ (2) ร่วมกัน: หญิงมี 60% ชายมี 40% ผลต่างคือ 20% ซึ่งเท่ากับ 8 คน ดังนั้น 100% = $(8 / 20) \\times 100 = 40$ คน ตอบได้แน่นอน\nดังนั้น ต้องใช้ข้อมูล (1) และ (2) ร่วมกันจึงจะเพียงพอ",
        "trap_analysis": "ตอบตัวเลือก 3: ต้องใช้ทั้งสองข้อร่วมกัน",
        "options": [
            {"label": "1", "content": "ข้อมูล (1) เพียงข้อเดียวก็เพียงพอ แต่ข้อมูล (2) เพียงข้อเดียวไม่เพียงพอ", "is_correct": 0},
            {"label": "2", "content": "ข้อมูล (2) เพียงข้อเดียวก็เพียงพอ แต่ข้อมูล (1) เพียงข้อเดียวไม่เพียงพอ", "is_correct": 0},
            {"label": "3", "content": "ต้องใช้ข้อมูล (1) และ (2) ร่วมกัน จึงจะเพียงพอ", "is_correct": 1},
            {"label": "4", "content": "ข้อมูล (1) เพียงข้อเดียว หรือข้อมูล (2) เพียงข้อเดียว ต่างก็เพียงพอ", "is_correct": 0},
            {"label": "5", "content": "ข้อมูล (1) และ (2) ร่วมกัน ก็ยังไม่เพียงพอที่จะตอบคำถามได้", "is_correct": 0}
        ]
    },
    {
        "id": "q_tgat2_s2_32",
        "blueprint_id": "tgat2_num_sufficiency",
        "question_text": "คำถาม: $x$ มีค่าเท่าใด?\n\nข้อมูลที่กำหนดให้:\n(1) $x^2 - 16 = 0$\n(2) $x > 0$\n\nจงพิจารณาว่าต้องใช้ข้อมูลใดบ้างในการตอบคำถามนี้",
        "stimulus": None,
        "difficulty": "easy",
        "explanation": "- จาก (1): $x^2 = 16 \\to x = 4$ หรือ $-4$ มีสองคำตอบ ไม่เพียงพอ\n- จาก (2): $x > 0$ บอกแค่ว่าเป็นบวก ไม่รู้ค่าแน่นอน ไม่เพียงพอ\n- ใช้ (1) และ (2) ร่วมกัน: $x = 4$ หรือ $-4$ และ $x > 0$ สรุปได้แน่นอนว่า $x = 4$\nดังนั้น ต้องใช้ (1) และ (2) ร่วมกันจึงจะเพียงพอ",
        "trap_analysis": "ถ้าใช้ (1) อย่างเดียวจะมี 2 ค่า ต้องมี (2) มาคัดกรองเครื่องหมาย",
        "options": [
            {"label": "1", "content": "ข้อมูล (1) เพียงข้อเดียวก็เพียงพอ แต่ข้อมูล (2) เพียงข้อเดียวไม่เพียงพอ", "is_correct": 0},
            {"label": "2", "content": "ข้อมูล (2) เพียงข้อเดียวก็เพียงพอ แต่ข้อมูล (1) เพียงข้อเดียวไม่เพียงพอ", "is_correct": 0},
            {"label": "3", "content": "ต้องใช้ข้อมูล (1) และ (2) ร่วมกัน จึงจะเพียงพอ", "is_correct": 1},
            {"label": "4", "content": "ข้อมูล (1) เพียงข้อเดียว หรือข้อมูล (2) เพียงข้อเดียว ต่างก็เพียงพอ", "is_correct": 0},
            {"label": "5", "content": "ข้อมูล (1) และ (2) ร่วมกัน ก็ยังไม่เพียงพอที่จะตอบคำถามได้", "is_correct": 0}
        ]
    },
    {
        "id": "q_tgat2_s2_33",
        "blueprint_id": "tgat2_num_sufficiency",
        "question_text": "คำถาม: วงกลม $C$ มีพื้นที่กี่ตารางหน่วย?\n\nข้อมูลที่กำหนดให้:\n(1) วงกลม $C$ มีความยาวเส้นรอบวงเท่ากับ $10\\pi$ หน่วย\n(2) วงกลม $C$ แนบในรูปสี่เหลี่ยมจัตุรัสที่มีความยาวด้าน 10 หน่วย\n\nจงพิจารณาว่าต้องใช้ข้อมูลใดบ้างในการตอบคำถามนี้",
        "stimulus": None,
        "difficulty": "easy",
        "explanation": "- จาก (1): เส้นรอบวง $2\\pi r = 10\\pi \\to r = 5 \\to$ พื้นที่ $= \\pi (5^2) = 25\\pi$ หาได้ทันที (เพียงพอ)\n- จาก (2): วงกลมแนบในสี่เหลี่ยมจัตุรัสด้านยาว 10 แสดงว่าเส้นผ่านศูนย์กลาง $= 10 \\to r = 5 \\to$ พื้นที่ $= 25\\pi$ หาได้ทันทีเช่นกัน (เพียงพอ)\nดังนั้น ข้อมูล (1) เพียงข้อเดียว หรือข้อมูล (2) เพียงข้อเดียว ต่างก็เพียงพอ (ตอบตัวเลือก 4)",
        "trap_analysis": "ทั้งสองข้อให้ข้อมูลรัศมี $r=5$ อย่างอิสระต่อกัน จึงตอบตัวเลือก 4",
        "options": [
            {"label": "1", "content": "ข้อมูล (1) เพียงข้อเดียวก็เพียงพอ แต่ข้อมูล (2) เพียงข้อเดียวไม่เพียงพอ", "is_correct": 0},
            {"label": "2", "content": "ข้อมูล (2) เพียงข้อเดียวก็เพียงพอ แต่ข้อมูล (1) เพียงข้อเดียวไม่เพียงพอ", "is_correct": 0},
            {"label": "3", "content": "ต้องใช้ข้อมูล (1) และ (2) ร่วมกัน จึงจะเพียงพอ", "is_correct": 0},
            {"label": "4", "content": "ข้อมูล (1) เพียงข้อเดียว หรือข้อมูล (2) เพียงข้อเดียว ต่างก็เพียงพอ", "is_correct": 1},
            {"label": "5", "content": "ข้อมูล (1) และ (2) ร่วมกัน ก็ยังไม่เพียงพอที่จะตอบคำถามได้", "is_correct": 0}
        ]
    },
    {
        "id": "q_tgat2_s2_34",
        "blueprint_id": "tgat2_num_sufficiency",
        "question_text": "คำถาม: รถไฟขบวนหนึ่งมีความเร็วเท่าใด?\n\nข้อมูลที่กำหนดให้:\n(1) รถไฟใช้เวลา 10 วินาทีในการแล่นผ่านเสาโทรเลขต้นหนึ่ง\n(2) รถไฟมีความยาวขบวน 150 เมตร\n\nจงพิจารณาว่าต้องใช้ข้อมูลใดบ้างในการตอบคำถามนี้",
        "stimulus": None,
        "difficulty": "easy",
        "explanation": "- เมื่อรถไฟแล่นผ่านเสาโทรเลข ระยะทางที่แล่นผ่านคือ \"ความยาวของขบวนรถไฟเอง\"\n- จาก (1) รู้เวลา $t = 10$ วินาที แต่ไม่รู้ระยะทาง ไม่เพียงพอ\n- จาก (2) รู้ความยาวรถไฟ $s = 150$ เมตร แต่ไม่รู้เวลา ไม่เพียงพอ\n- นำ (1) และ (2) ร่วมกัน: ความเร็ว $v = s / t = 150 / 10 = 15$ เมตร/วินาที สรุปได้แน่นอน\nดังนั้น ต้องใช้ข้อมูล (1) และ (2) ร่วมกันจึงจะเพียงพอ",
        "trap_analysis": "สูตร $v = s / t$ ต้องรู้ทั้งระยะทาง (ความยาวรถไฟ) และเวลา",
        "options": [
            {"label": "1", "content": "ข้อมูล (1) เพียงข้อเดียวก็เพียงพอ แต่ข้อมูล (2) เพียงข้อเดียวไม่เพียงพอ", "is_correct": 0},
            {"label": "2", "content": "ข้อมูล (2) เพียงข้อเดียวก็เพียงพอ แต่ข้อมูล (1) เพียงข้อเดียวไม่เพียงพอ", "is_correct": 0},
            {"label": "3", "content": "ต้องใช้ข้อมูล (1) และ (2) ร่วมกัน จึงจะเพียงพอ", "is_correct": 1},
            {"label": "4", "content": "ข้อมูล (1) เพียงข้อเดียว หรือข้อมูล (2) เพียงข้อเดียว ต่างก็เพียงพอ", "is_correct": 0},
            {"label": "5", "content": "ข้อมูล (1) และ (2) ร่วมกัน ก็ยังไม่เพียงพอที่จะตอบคำถามได้", "is_correct": 0}
        ]
    },
    {
        "id": "q_tgat2_s2_35",
        "blueprint_id": "tgat2_num_sufficiency",
        "question_text": "คำถาม: จำนวนเต็มบวก $N$ เป็นจำนวนคู่หรือไม่?\n\nข้อมูลที่กำหนดให้:\n(1) $3N + 1$ เป็นจำนวนคี่\n(2) $N^2 + N$ เป็นจำนวนคู่\n\nจงพิจารณาว่าต้องใช้ข้อมูลใดบ้างในการตอบคำถามนี้",
        "stimulus": None,
        "difficulty": "medium",
        "explanation": "- จาก (1): $3N + 1$ เป็นคี่ แสดงว่า $3N$ ต้องเป็นคู่ ซึ่งส่งผลให้ $N$ ต้องเป็นจำนวนคู่แน่นอน (เพราะเลขคี่คูณเลขคู่จึงได้เลขคู่) $\\to$ ข้อมูล (1) เพียงพอ\n- จาก (2): $N^2 + N = N(N + 1)$ ซึ่งเป็นผลคูณของจำนวนเต็มติดกันสองจำนวน ผลคูณของจำนวนติดกันย่อมเป็นเลขคู่เสมอไม่ว่า $N$ จะเป็นคู่หรือคี่ (เช่น $N=2 \\to 2(3)=6$, $N=3 \\to 3(4)=12$) จึงไม่สามารถระบุได้ว่า $N$ เป็นคู่หรือคี่ $\\to$ ข้อมูล (2) ไม่เพียงพอ\nดังนั้น ข้อมูล (1) เพียงข้อเดียวก็เพียงพอ แต่ข้อมูล (2) ไม่เพียงพอ (ตอบตัวเลือก 1)",
        "trap_analysis": "$N(N+1)$ เป็นคู่เสมอสำหรับทุกจำนวนเต็ม $N$ ทำให้ (2) ไม่ให้ข้อมูลเจาะจงเกี่ยวกับภาวะคู่คี่ของ $N$",
        "options": [
            {"label": "1", "content": "ข้อมูล (1) เพียงข้อเดียวก็เพียงพอ แต่ข้อมูล (2) เพียงข้อเดียวไม่เพียงพอ", "is_correct": 1},
            {"label": "2", "content": "ข้อมูล (2) เพียงข้อเดียวก็เพียงพอ แต่ข้อมูล (1) เพียงข้อเดียวไม่เพียงพอ", "is_correct": 0},
            {"label": "3", "content": "ต้องใช้ข้อมูล (1) และ (2) ร่วมกัน จึงจะเพียงพอ", "is_correct": 0},
            {"label": "4", "content": "ข้อมูล (1) เพียงข้อเดียว หรือข้อมูล (2) เพียงข้อเดียว ต่างก็เพียงพอ", "is_correct": 0},
            {"label": "5", "content": "ข้อมูล (1) และ (2) ร่วมกัน ก็ยังไม่เพียงพอที่จะตอบคำถามได้", "is_correct": 0}
        ]
    }
]

# 2.4 โจทย์ปัญหา (tgat2_num_wordproblems) - Q36 to Q40
wordproblems_data = [
    {
        "id": "q_tgat2_s2_36",
        "blueprint_id": "tgat2_num_wordproblems",
        "question_text": "คนงาน 8 คนช่วยกันติดตั้งเสาสัญญาณ 5G เสร็จในเวลา 15 วัน หากผู้รับเหมาต้องการให้งานติดตั้งเสาสัญญาณรูปแบบเดียวกันนี้เสร็จสิ้นภายใน 10 วัน จะต้องจ้างคนงานที่มีความสามารถเท่ากันมา \"เพิ่มอีกกี่คน\"",
        "stimulus": None,
        "difficulty": "easy",
        "explanation": "ปริมาณงานรวม $= 8 \\times 15 = 120$ คน-วัน\nหากต้องการให้เสร็จใน 10 วัน ต้องใช้คนงานทั้งหมด $= 120 / 10 = 12$ คน\nโจทย์ถามว่าต้องจ้างคนงานมา \"เพิ่มอีกกี่คน\" $= 12 - 8 = 4$ คน",
        "trap_analysis": "ระวังตอบ 12 คน เพราะโจทย์ถามว่าต้องเพิ่มอีกกี่คน ไม่ใช่จำนวนคนงานทั้งหมด",
        "options": [
            {"label": "1", "content": "2 คน", "is_correct": 0},
            {"label": "2", "content": "4 คน", "is_correct": 1},
            {"label": "3", "content": "6 คน", "is_correct": 0},
            {"label": "4", "content": "8 คน", "is_correct": 0},
            {"label": "5", "content": "12 คน", "is_correct": 0}
        ]
    },
    {
        "id": "q_tgat2_s2_37",
        "blueprint_id": "tgat2_num_wordproblems",
        "question_text": "พ่อค้าซื้อสมาร์ตโฟนมาในราคาเครื่องละ 12,000 บาท ตั้งราคาขายโดยบวกกำไรไว้ 30% แต่ในช่วงจัดโปรโมชัน ได้ติดป้ายลดราคาให้ลูกค้า 10% จากราคาป้าย พ่อค้าจะได้กำไรจากการขายเครื่องละกี่บาท",
        "stimulus": None,
        "difficulty": "medium",
        "explanation": "1. ราคาทุน = 12,000 บาท\n2. ตั้งราคาขายบวกกำไร 30% $= 12,000 \\times 1.30 = 15,600$ บาท\n3. ลดราคา 10% จากราคาป้าย $= 15,600 \\times 0.90 = 14,040$ บาท\n4. กำไรที่ได้จริง $= 14,040 - 12,000 = 2,040$ บาท",
        "trap_analysis": "อย่าคิดว่า กำไร $30\\% - 10\\% = 20\\%$ เพราะ $10\\%$ ที่ลด คิดจากราคาป้าย (15,600) ไม่ใช่คิดจากราคาทุน",
        "options": [
            {"label": "1", "content": "1,800 บาท", "is_correct": 0},
            {"label": "2", "content": "2,040 บาท", "is_correct": 1},
            {"label": "3", "content": "2,400 บาท", "is_correct": 0},
            {"label": "4", "content": "2,600 บาท", "is_correct": 0},
            {"label": "5", "content": "3,600 บาท", "is_correct": 0}
        ]
    },
    {
        "id": "q_tgat2_s2_38",
        "blueprint_id": "tgat2_num_wordproblems",
        "question_text": "ปัจจุบันกานต์มีอายุเป็น 3 เท่าของขวัญ อีก 6 ปีข้างหน้า กานต์จะมีอายุเป็น 2 เท่าของขวัญ ปัจจุบันกานต์และขวัญมีอายุรวมกันกี่ปี",
        "stimulus": None,
        "difficulty": "medium",
        "explanation": "ให้ปัจจุบัน ขวัญ อายุ $x$ ปี, กานต์ อายุ $3x$ ปี\nอีก 6 ปีข้างหน้า:\nกานต์อายุ $3x + 6$, ขวัญอายุ $x + 6$\nสมการ: $3x + 6 = 2(x + 6) \\to 3x + 6 = 2x + 12 \\to x = 6$\nดังนั้น ปัจจุบัน ขวัญอายุ 6 ปี, กานต์อายุ $3(6) = 18$ ปี\nอายุรวมกัน $= 18 + 6 = 24$ ปี",
        "trap_analysis": "โจทย์ถามผลรวมอายุ $(18 + 6 = 24)$ ระวังตอบแค่อายุของกานต์ (18) หรือของขวัญ (6)",
        "options": [
            {"label": "1", "content": "18 ปี", "is_correct": 0},
            {"label": "2", "content": "20 ปี", "is_correct": 0},
            {"label": "3", "content": "24 ปี", "is_correct": 1},
            {"label": "4", "content": "28 ปี", "is_correct": 0},
            {"label": "5", "content": "30 ปี", "is_correct": 0}
        ]
    },
    {
        "id": "q_tgat2_s2_39",
        "blueprint_id": "tgat2_num_wordproblems",
        "question_text": "กล่องทึบใบหนึ่งมีลูกบอลขนาดเท่ากันทั้งหมด 20 ลูก ประกอบด้วย สีแดง 8 ลูก สีเขียว 7 ลูก และสีน้ำเงิน 5 ลูก หากสุ่มหยิบลูกบอลขึ้นมาพร้อมกัน 1 ลูก ความน่าจะเป็นที่จะ \"ไม่ได้ลูกบอลสีแดง\" มีค่าเท่าใด",
        "stimulus": None,
        "difficulty": "easy",
        "explanation": "ลูกบอลทั้งหมด = 20 ลูก\nลูกบอลที่ไม่ใช่สีแดง = ลูกบอลสีเขียว + สีน้ำเงิน $= 7 + 5 = 12$ ลูก\nความน่าจะเป็น $= 12 / 20 = 3 / 5 = 0.60$",
        "trap_analysis": "ระวังคิดความน่าจะเป็นที่จะได้สีแดง $(8/20 = 0.40)$ ซึ่งเป็นส่วนตรงข้าม",
        "options": [
            {"label": "1", "content": "2/5", "is_correct": 0},
            {"label": "2", "content": "1/2", "is_correct": 0},
            {"label": "3", "content": "3/5", "is_correct": 1},
            {"label": "4", "content": "7/20", "is_correct": 0},
            {"label": "5", "content": "4/5", "is_correct": 0}
        ]
    },
    {
        "id": "q_tgat2_s2_40",
        "blueprint_id": "tgat2_num_wordproblems",
        "question_text": "ฝากเงินต้น 40,000 บาท ไว้กับธนาคารที่ให้อัตราดอกเบี้ย 5% ต่อปี โดยคิดดอกเบี้ยทบต้นปีละหนึ่งครั้ง เมื่อสิ้นสุดปีที่ 2 จะมีเงินรวมในบัญชีทั้งหมดกี่บาท (ไม่มีการฝากหรือถอนเพิ่ม)",
        "stimulus": None,
        "difficulty": "easy",
        "explanation": "สูตรดอกเบี้ยทบต้น: $A = P(1 + r)^t$\n- สิ้นปีที่ 1: เงินรวม $= 40,000 \\times 1.05 = 42,000$ บาท\n- สิ้นปีที่ 2: เงินรวม $= 42,000 \\times 1.05 = 44,100$ บาท",
        "trap_analysis": "ระวังคิดแบบดอกเบี้ยเชิงเดี่ยว $(40,000 + 4,000 = 44,000)$ เพราะดอกเบี้ยทบต้นจะได้รับดอกเบี้ยของปีแรกเพิ่มอีก 100 บาท",
        "options": [
            {"label": "1", "content": "42,000 บาท", "is_correct": 0},
            {"label": "2", "content": "44,000 บาท", "is_correct": 0},
            {"label": "3", "content": "44,100 บาท", "is_correct": 1},
            {"label": "4", "content": "44,200 บาท", "is_correct": 0},
            {"label": "5", "content": "45,000 บาท", "is_correct": 0}
        ]
    }
]

for q in matrix_data + columns_data + suff_data + wordproblems_data:
    q["subject_id"] = "tgat2"
    q["set_number"] = 2
    questions.append(q)

# =========================================================================
# DOMAIN 3: ความสามารถทางมิติสัมพันธ์ (SPATIAL ABILITY) - 20 Questions (Q41 - Q60)
# =========================================================================

# 3.1 แบบพับกล่อง (tgat2_spatial_cube) - Q41 to Q45
cube_data = [
    {
        "id": "q_tgat2_s2_41",
        "blueprint_id": "tgat2_spatial_cube",
        "question_text": "พิจารณาแผ่นคลี่ของลูกบาศก์ (Cube Net) รูปตัว T ดังต่อไปนี้:\n\n<div style=\"text-align:center; margin:16px 0;\">\n<svg width=\"220\" height=\"280\" viewBox=\"0 0 220 280\" style=\"background:#1e293b; border-radius:12px; border:1px solid #475569; padding:10px;\">\n  <g stroke=\"#94a3b8\" stroke-width=\"2\" fill=\"#0f172a\">\n    <!-- Row 1: Faces 1, 2, 3 at y=20 -->\n    <rect x=\"20\" y=\"20\" width=\"55\" height=\"55\" rx=\"4\" />\n    <text x=\"47\" y=\"55\" font-size=\"20\" fill=\"#38bdf8\" font-weight=\"bold\" text-anchor=\"middle\">P</text>\n    <rect x=\"80\" y=\"20\" width=\"55\" height=\"55\" rx=\"4\" />\n    <text x=\"107\" y=\"55\" font-size=\"20\" fill=\"#f8fafc\" font-weight=\"bold\" text-anchor=\"middle\">Q</text>\n    <rect x=\"140\" y=\"20\" width=\"55\" height=\"55\" rx=\"4\" />\n    <text x=\"167\" y=\"55\" font-size=\"20\" fill=\"#38bdf8\" font-weight=\"bold\" text-anchor=\"middle\">R</text>\n    <!-- Column below Q: Faces S, T, U -->\n    <rect x=\"80\" y=\"80\" width=\"55\" height=\"55\" rx=\"4\" />\n    <text x=\"107\" y=\"115\" font-size=\"20\" fill=\"#38bdf8\" font-weight=\"bold\" text-anchor=\"middle\">S</text>\n    <rect x=\"80\" y=\"140\" width=\"55\" height=\"55\" rx=\"4\" />\n    <text x=\"107\" y=\"175\" font-size=\"20\" fill=\"#f8fafc\" font-weight=\"bold\" text-anchor=\"middle\">T</text>\n    <rect x=\"80\" y=\"200\" width=\"55\" height=\"55\" rx=\"4\" />\n    <text x=\"107\" y=\"235\" font-size=\"20\" fill=\"#38bdf8\" font-weight=\"bold\" text-anchor=\"middle\">U</text>\n  </g>\n</svg>\n</div>\n\nเมื่อพับแผ่นคลี่นี้ขึ้นมาเป็นลูกบาศก์ทึบ หน้าใดจะอยู่ \"ตรงข้าม\" กับหน้า P",
        "stimulus": None,
        "difficulty": "medium",
        "explanation": "หลักการของแผ่นคลี่ลูกบาศก์:\n1. ในแถวแนวนอนด้านบน มีหน้า P, Q, R ซึ่งหน้า P และ R มีหน้า Q คั่นกลางอยู่ 1 ช่อง ดังนั้น P และ R จะพับแล้วอยู่ตรงข้ามกันเสมอ\n2. ในแนวตั้ง Q, S, T, U: หน้า Q ตรงข้ามกับ T (มี S คั่น) และหน้า S ตรงข้ามกับ U (มี T คั่น)\nดังนั้น หน้าที่อยู่ตรงข้ามกับหน้า P คือ \"หน้า R\"",
        "trap_analysis": "หน้าในแถวเดียวกันที่เว้น 1 ช่องจะอยู่ตรงข้ามกันเสมอ (P เว้น Q ไปเจอ R)",
        "options": [
            {"label": "1", "content": "หน้า Q", "is_correct": 0},
            {"label": "2", "content": "หน้า R", "is_correct": 1},
            {"label": "3", "content": "หน้า S", "is_correct": 0},
            {"label": "4", "content": "หน้า T", "is_correct": 0},
            {"label": "5", "content": "หน้า U", "is_correct": 0}
        ]
    },
    {
        "id": "q_tgat2_s2_42",
        "blueprint_id": "tgat2_spatial_cube",
        "question_text": "ลูกบาศก์ลูกหนึ่งมีแต้มตัวเลข 1, 2, 3, 4, 5, 6 อยู่บนแต่ละหน้า เมื่อหมุนสังเกตพบว่า:\n- มุมมองที่ 1: หน้าด้านบนเป็น 1, หน้าด้านหน้าเป็น 2, หน้าด้านขวาเป็น 3\n- มุมมองที่ 2: หน้าด้านบนเป็น 1, หน้าด้านหน้าเป็น 3, หน้าด้านขวาเป็น 5\n\nหน้าที่อยู่ \"ตรงข้าม\" กับหน้าที่มีแต้ม 2 คือหน้าที่มีแต้มใด",
        "stimulus": None,
        "difficulty": "medium",
        "explanation": "จากทั้งสองมุมมอง หน้าบนเป็นแต้ม 1 เหมือนกัน\nเมื่อหมุนรอบแกนดิ่ง: ด้านหน้าเดิม (2) หมุนไปทางซ้าย และด้านขวาเดิม (3) หมุนมาอยู่ด้านหน้าแทน ขณะที่ด้านขวาใหม่คือ (5)\nแสดงว่าแต้มรอบแกนตามเข็มนาฬิกาคือ: 2 -> 3 -> 5 -> ?\nดังนั้น หน้า 2 จะอยู่ตรงข้ามกับหน้า 5 พอดี",
        "trap_analysis": "หมุนลูกบาศก์ทวนเข็มรอบแกนดิ่ง 90 องศา: หน้าขวา (3) กลายเป็นหน้าหน้า และหน้าหลังหมุนมาเป็นหน้าขวา (5)",
        "options": [
            {"label": "1", "content": "แต้ม 3", "is_correct": 0},
            {"label": "2", "content": "แต้ม 4", "is_correct": 0},
            {"label": "3", "content": "แต้ม 5", "is_correct": 1},
            {"label": "4", "content": "แต้ม 6", "is_correct": 0},
            {"label": "5", "content": "แต้ม 1", "is_correct": 0}
        ]
    },
    {
        "id": "q_tgat2_s2_43",
        "blueprint_id": "tgat2_spatial_cube",
        "question_text": "แผ่นคลี่ลูกบาศก์แผ่นหนึ่งถูกระบายสี 3 หน้าเป็นสีน้ำเงิน และอีก 3 หน้าเป็นสีขาว หากต้องการพับให้เป็นลูกบาศก์โดยที่ \"ไม่มีหน้าสีน้ำเงินหน้าใดอยู่ตรงข้ามกับหน้าสีน้ำเงินเลย\" แผ่นคลี่นั้นจะต้องมีลักษณะเช่นไร",
        "stimulus": None,
        "difficulty": "hard",
        "explanation": "ลูกบาศก์มีคู่หน้าตรงข้ามกัน 3 คู่ (บน-ล่าง, หน้า-หลัง, ซ้าย-ขวา)\nหากไม่มีหน้าสีน้ำเงินอยู่ตรงข้ามกันเลย แสดงว่าในแต่ละคู่ต้องมีสีน้ำเงิน 1 หน้า และสีขาว 1 หน้าพอดี\nดังนั้น หน้าสีน้ำเงินทั้ง 3 หน้าจะต้องอยู่ติดกันและมาบรรจบกันที่มุมหนึ่งมุมใดของลูกบาศก์เสมอ",
        "trap_analysis": "หน้าตรงข้ามมี 3 คู่ ถ้าไม่ให้สีเดียวกันตรงข้ามกันเลย แสดงว่าแต่ละคู่ต้องเป็นต่างสีกัน (น้ำเงิน-ขาว ทั้ง 3 คู่)",
        "options": [
            {"label": "1", "content": "หน้าสีน้ำเงินทั้งสามหน้าต้องเรียงเป็นเส้นตรงแถวเดียวกัน 3 ช่อง", "is_correct": 0},
            {"label": "2", "content": "หน้าสีน้ำเงินทั้งสามหน้าจะต้องมาบรรจบกันที่จุดยอดมุมเดียวกันโดยไม่มีหน้าใดอยู่ตรงข้ามกัน", "is_correct": 1},
            {"label": "3", "content": "หน้าสีขาวทั้งสามหน้าต้องอยู่เรียงเป็นรูปกากบาท", "is_correct": 0},
            {"label": "4", "content": "เป็นไปไม่ได้ที่จะพับให้ไม่มีสีเดียวกันอยู่ตรงข้ามกัน", "is_correct": 0},
            {"label": "5", "content": "หน้าสีน้ำเงินต้องอยู่เฉพาะที่ปีกซ้ายและปีกขวาเท่านั้น", "is_correct": 0}
        ]
    },
    {
        "id": "q_tgat2_s2_44",
        "blueprint_id": "tgat2_spatial_cube",
        "question_text": "ลูกบาศก์ไม้ขนาด 3 x 3 x 3 หน่วย ถูกทาสีแดงทั้ง 6 หน้าภายนอก จากนั้นถูกเลื่อยแบ่งเป็นลูกบาศก์ย่อยขนาด 1 x 1 x 1 หน่วย จำนวน 27 ลูก\n\nจะมีลูกบาศก์ย่อยที่มี \"การทาสีแดงเพียง 2 หน้า\" จำนวนกี่ลูก",
        "stimulus": None,
        "difficulty": "medium",
        "explanation": "ตำแหน่งของลูกบาศก์ย่อยในก้อน 3x3x3:\n- ทาสี 3 หน้า = มุมทั้ง 8 มุม (8 ลูก)\n- ทาสี 2 หน้า = กึ่งกลางของขอบทั้ง 12 ขอบ: ขอบละ 1 ลูก $\\to 12 \\times 1 = 12$ ลูก\n- ทาสี 1 หน้า = กึ่งกลางของหน้าทั้ง 6 หน้า: หน้าละ 1 ลูก $\\to 6 \\times 1 = 6$ ลูก\n- ไม่ถูกทาสีเลย = แกนกลางภายใน $= (3-2)^3 = 1$ ลูก\nโจทย์ถาม ทาสี 2 หน้า จึงมีทั้งหมด 12 ลูก",
        "trap_analysis": "ลูกบาศก์ 2 หน้าจะอยู่ตามขอบ (Edge pieces) ซึ่งลูกบาศก์มี 12 ขอบเสมอ",
        "options": [
            {"label": "1", "content": "6 ลูก", "is_correct": 0},
            {"label": "2", "content": "8 ลูก", "is_correct": 0},
            {"label": "3", "content": "12 ลูก", "is_correct": 1},
            {"label": "4", "content": "16 ลูก", "is_correct": 0},
            {"label": "5", "content": "18 ลูก", "is_correct": 0}
        ]
    },
    {
        "id": "q_tgat2_s2_45",
        "blueprint_id": "tgat2_spatial_cube",
        "question_text": "จากข้อคำถามก่อนหน้า (ลูกบาศก์ 3x3x3 ทาสีภายนอกแล้วตัดเป็น 27 ลูกย่อย) จะมีลูกบาศก์ย่อยที่ \"ไม่ถูกทาสีแดงเลยแม้แต่หน้าเดียว\" จำนวนกี่ลูก",
        "stimulus": None,
        "difficulty": "easy",
        "explanation": "ลูกบาศก์ย่อยที่ไม่ถูกทาสีเลย คือลูกบาศก์ที่อยู่ภายในแกนกลาง ซึ่งมีมิติ $(n - 2) \\times (n - 2) \\times (n - 2) = (3 - 2)^3 = 1^3 = 1$ ลูก",
        "trap_analysis": "ลูกที่อยู่ใจกลางสุดจะไม่สัมผัสกับพื้นผิวด้านนอกเลยแม้แต่ด้านเดียว มี 1 ลูก",
        "options": [
            {"label": "1", "content": "0 ลูก", "is_correct": 0},
            {"label": "2", "content": "1 ลูก", "is_correct": 1},
            {"label": "3", "content": "2 ลูก", "is_correct": 0},
            {"label": "4", "content": "3 ลูก", "is_correct": 0},
            {"label": "5", "content": "6 ลูก", "is_correct": 0}
        ]
    }
]

# 3.2 แบบหาภาพต่าง (tgat2_spatial_odd) - Q46 to Q50
odd_data = [
    {
        "id": "q_tgat2_s2_46",
        "blueprint_id": "tgat2_spatial_odd",
        "question_text": "พิจารณารูปทรงเรขาคณิต 5 ภาพต่อไปนี้ ภาพใดเป็น \"ภาพต่าง\" ที่ไม่เข้าพวก (เกิดจากการสะท้อนในกระจก ไม่ใช่การหมุนในระนาบ)",
        "stimulus": "กำหนดให้ภาพต้นแบบเป็นรูปตัวอักษร 'F'\n(1) รูปตัว F ปกติ\n(2) รูปตัว F หมุนตามเข็มนาฬิกา 90 องศา\n(3) รูปตัว F หมุน 180 องศา (กลับหัว)\n(4) รูปตัว F กลับด้านซ้าย-ขวา (Mirror Reflection)\n(5) รูปตัว F หมุนทวนเข็มนาฬิกา 90 องศา",
        "difficulty": "easy",
        "explanation": "ภาพ (1), (2), (3), (5) เป็นการหมุนรูปทรงในระนาบสองมิติ (Rigid 2D Rotation) โดยโครงสร้างภายในคงเดิม แต่ภาพ (4) เป็นการกลับด้านซ้าย-ขวาแบบกระจกเงา (Chiral reflection) จึงไม่สามารถเกิดจากการหมุนในระนาบได้",
        "trap_analysis": "การหาภาพต่างใน TGAT2 มักออกข้อสอบเรื่อง Chiral Anomaly (ภาพสะท้อนกระจกปะปนกับการหมุน)",
        "options": [
            {"label": "1", "content": "ภาพที่ (1)", "is_correct": 0},
            {"label": "2", "content": "ภาพที่ (2)", "is_correct": 0},
            {"label": "3", "content": "ภาพที่ (3)", "is_correct": 0},
            {"label": "4", "content": "ภาพที่ (4)", "is_correct": 1},
            {"label": "5", "content": "ภาพที่ (5)", "is_correct": 0}
        ]
    },
    {
        "id": "q_tgat2_s2_47",
        "blueprint_id": "tgat2_spatial_odd",
        "question_text": "พิจารณาจำนวนแกนสมมาตร (Lines of Symmetry) ของรูปทรงต่อไปนี้ รูปใดมีจำนวนแกนสมมาตร \"ต่างจากพวก\"",
        "stimulus": None,
        "difficulty": "medium",
        "explanation": "- สี่เหลี่ยมจัตุรัส มี 4 แกนสมมาตร\n- สี่เหลี่ยมผืนผ้า มี 2 แกนสมมาตร (แนวนอนและแนวตั้ง)\n- สี่เหลี่ยมขนมเปียกปูน มี 2 แกนสมมาตร (แนวเส้นทแยงมุม)\n- วงรี มี 2 แกนสมมาตร (แกนเอกและแกนโท)\n- รูปสี่เหลี่ยมด้านขนานทั่วไป มี 0 แกนสมมาตร\nดังนั้น รูปสี่เหลี่ยมจัตุรัส มี 4 แกน ซึ่งมากกว่ารูปอื่นที่มี 2 แกนสมมาตร",
        "trap_analysis": "สี่เหลี่ยมผืนผ้า ขนมเปียกปูน และวงรี ล้วนมี 2 แกนสมมาตรเท่ากัน มีเพียงสี่เหลี่ยมจัตุรัสที่มี 4 แกน",
        "options": [
            {"label": "1", "content": "รูปสี่เหลี่ยมจัตุรัส", "is_correct": 1},
            {"label": "2", "content": "รูปสี่เหลี่ยมผืนผ้า", "is_correct": 0},
            {"label": "3", "content": "รูปสี่เหลี่ยมขนมเปียกปูน", "is_correct": 0},
            {"label": "4", "content": "รูปวงรี", "is_correct": 0},
            {"label": "5", "content": "รูปตัวอักษร 'H'", "is_correct": 0}
        ]
    },
    {
        "id": "q_tgat2_s2_48",
        "blueprint_id": "tgat2_spatial_odd",
        "question_text": "พิจารณารูปทรงปิดที่เกิดจากส่วนของเส้นตรงต่อไปนี้ รูปใดมีคุณสมบัติโครงสร้าง \"ต่างจากพวก\"",
        "stimulus": "(1) รูปสามเหลี่ยมด้านเท่า\n(2) รูปสี่เหลี่ยมจัตุรัส\n(3) รูปห้าเหลี่ยมด้านเท่ามุมเท่า\n(4) รูปหกเหลี่ยมด้านเท่ามุมเท่า\n(5) รูปวงกลม",
        "difficulty": "easy",
        "explanation": "ภาพ (1), (2), (3), (4) ล้วนเป็นรูปหลายเหลี่ยม (Polygons) ที่สร้างจากส่วนของเส้นตรงและมีมุมที่ชัดเจน ขณะที่ (5) รูปวงกลมเป็นเส้นโค้งต่อเนื่อง ไม่มีจุดยอดมุมและไม่ใช่รูปหลายเหลี่ยม",
        "trap_analysis": "วงกลมเป็นเส้นโค้งเพียงรูปเดียวในกลุ่มรูปหลายเหลี่ยม",
        "options": [
            {"label": "1", "content": "ภาพ (1) รูปสามเหลี่ยม", "is_correct": 0},
            {"label": "2", "content": "ภาพ (2) รูปสี่เหลี่ยม", "is_correct": 0},
            {"label": "3", "content": "ภาพ (3) รูปห้าเหลี่ยม", "is_correct": 0},
            {"label": "4", "content": "ภาพ (4) รูปหกเหลี่ยม", "is_correct": 0},
            {"label": "5", "content": "ภาพ (5) รูปวงกลม", "is_correct": 1}
        ]
    },
    {
        "id": "q_tgat2_s2_49",
        "blueprint_id": "tgat2_spatial_odd",
        "question_text": "พิจารณาการจัดวางลูกศรสองหัวและจุดดำภายในวงกลม:\n- ภาพ (1): เมื่อลูกศรชี้ขึ้น จุดดำอยู่ด้านขวา\n- ภาพ (2): เมื่อลูกศรชี้ไปทางขวา จุดดำอยู่ด้านล่าง\n- ภาพ (3): เมื่อลูกศรชี้ลง จุดดำอยู่ด้านซ้าย\n- ภาพ (4): เมื่อลูกศรชี้ไปทางซ้าย จุดดำอยู่ด้านล่าง\n- ภาพ (5): เมื่อลูกศรชี้ไปทางซ้าย จุดดำอยู่ด้านบน\n\nภาพใดคือ \"ภาพต่าง\"",
        "stimulus": None,
        "difficulty": "hard",
        "explanation": "สังเกตความสัมพันธ์ตามเข็มนาฬิกา:\n- ในภาพ (1), (2), (3), (5): จุดดำจะอยู่ตามทิศ \"ตามเข็มนาฬิกา 90 องศา\" จากหัวลูกศรเสมอ (ขึ้น->ขวา, ขวา->ล่าง, ลง->ซ้าย, ซ้าย->บน)\n- แต่ในภาพ (4): เมื่อลูกศรชี้ซ้าย จุดดำกลับอยู่ด้านล่าง ซึ่งเป็นทิศทวนเข็มนาฬิกา จึงเป็นภาพต่าง",
        "trap_analysis": "หมุนลูกศรให้ชี้ทิศเดียวกัน (ชี้ขึ้น) แล้วดูตำแหน่งของจุดดำ",
        "options": [
            {"label": "1", "content": "ภาพ (1)", "is_correct": 0},
            {"label": "2", "content": "ภาพ (2)", "is_correct": 0},
            {"label": "3", "content": "ภาพ (3)", "is_correct": 0},
            {"label": "4", "content": "ภาพ (4)", "is_correct": 1},
            {"label": "5", "content": "ภาพ (5)", "is_correct": 0}
        ]
    },
    {
        "id": "q_tgat2_s2_50",
        "blueprint_id": "tgat2_spatial_odd",
        "question_text": "พิจารณาจำนวนพื้นที่ย่อยที่เกิดจากการลากเส้นตรง 3 เส้นตัดกันภายในวงกลมหนึ่งวง จำนวนพื้นที่ย่อยในข้อใด \"เป็นไปไม่ได้\" ที่จะเกิดขึ้น",
        "stimulus": None,
        "difficulty": "hard",
        "explanation": "การลากเส้นตรง 3 เส้นตัดในวงกลม:\n- ขนานกันทั้ง 3 เส้น = เกิด 4 ส่วน\n- 2 เส้นขนานกัน ตัดกับอีก 1 เส้น = เกิด 6 ส่วน\n- 3 เส้นตัดกันที่จุดเดียว = เกิด 6 ส่วน\n- 3 เส้นตัดกันเกิดรูปสามเหลี่ยมตรงกลาง (ทั่วไป) = เกิด 7 ส่วน\nจำนวนพื้นที่ย่อยที่เป็นไปได้คือ 4, 6, หรือ 7 ส่วนเท่านั้น จึงไม่มีทางเกิด \"8 ส่วน\" ขึ้นได้",
        "trap_analysis": "สูตรจำนวนชิ้นมากที่สุดจากการตัด $n$ เส้นคือ $L_n = \\frac{n(n+1)}{2} + 1 \\to L_3 = 6/2 + 1 + 3 = 7$ ชิ้นเท่านั้น",
        "options": [
            {"label": "1", "content": "เกิด 4 ส่วน", "is_correct": 0},
            {"label": "2", "content": "เกิด 5 ส่วน", "is_correct": 0},
            {"label": "3", "content": "เกิด 6 ส่วน", "is_correct": 0},
            {"label": "4", "content": "เกิด 7 ส่วน", "is_correct": 0},
            {"label": "5", "content": "เกิด 9 ส่วน", "is_correct": 1}
        ]
    }
]

# 3.3 แบบหมุนภาพสามมิติ (tgat2_spatial_rotate3d) - Q51 to Q55
rotate3d_data = [
    {
        "id": "q_tgat2_s2_51",
        "blueprint_id": "tgat2_spatial_rotate3d",
        "question_text": "วัตถุสามมิติทรงตัว 'L' สร้างจากลูกบาศก์ 4 ลูก (3 ลูกเรียงแนวตั้ง และ 1 ลูกยื่นออกไปทางขวาที่ฐาน)\n\nหากนำวัตถุนี้มา \"หมุนตามเข็มนาฬิกา 90 องศาในระนาบดิ่ง\" แล้วตามด้วย \"หมุนรอบแกนดิ่ง 180 องศา\" วัตถุจะมีลักษณะเช่นไร",
        "stimulus": None,
        "difficulty": "medium",
        "explanation": "1. เริ่มต้น: ก้าน 3 ลูกชี้ขึ้น ปลายฐานยื่นไปทางขวา\n2. หมุนตามเข็ม 90 องศาในระนาบหน้า: ก้าน 3 ลูกกลายเป็นแนวนอนชี้ไปทางขวา และปลายฐานยื่นชี้ลงล่าง\n3. หมุนรอบแกนดิ่ง 180 องศา (หันหลังกลับ): ก้าน 3 ลูกจะชี้ไปทางซ้าย และปลายฐานยังคงยื่นชี้ลงล่างแต่อยู่ด้านหน้า",
        "trap_analysis": "การหมุนผสม 2 แกน ต้องคิดทีละสเต็ปอย่างเป็นระบบ",
        "options": [
            {"label": "1", "content": "ก้าน 3 ลูกทอดแนวนอนชี้ไปทางซ้าย และมีปุ่มยื่นลงล่าง", "is_correct": 1},
            {"label": "2", "content": "ก้าน 3 ลูกตั้งตรงชี้ขึ้นฟ้า และมีปุ่มยื่นไปทางซ้าย", "is_correct": 0},
            {"label": "3", "content": "ก้าน 3 ลูกทอดแนวนอนชี้ไปทางขวา และมีปุ่มยื่นขึ้นบน", "is_correct": 0},
            {"label": "4", "content": "กลายเป็นก้อนลูกบาศก์ขนาด 2x2 พอดี", "is_correct": 0},
            {"label": "5", "content": "วัตถุกลับมาอยู่ในตำแหน่งเริ่มต้นเดิมทุกประการ", "is_correct": 0}
        ]
    },
    {
        "id": "q_tgat2_s2_52",
        "blueprint_id": "tgat2_spatial_rotate3d",
        "question_text": "พิจารณาทรงกระบอกทึบที่มีแถบสีดำทาไว้ครึ่งหนึ่งตามแนวยาว เมื่อนำทรงกระบอกนี้มาวางในแนวนอนแล้วกลิ้งไปข้างหน้า 1 รอบครึ่ง (540 องศา) แถบสีดำจะอยู่ตำแหน่งใดหากเริ่มต้นแถบสีดำอยู่ด้านบนสุด",
        "stimulus": None,
        "difficulty": "easy",
        "explanation": "- กลิ้งครบ 1 รอบ (360 องศา): แถบสีดำกลับมาอยู่ด้านบนสุดเหมือนเดิม\n- กลิ้งต่ออีกครึ่งรอบ (180 องศา): แถบสีดำจะหมุนจากด้านบนลงไปอยู่ \"ด้านล่างสุด\"",
        "trap_analysis": "1 รอบครึ่ง = 360 + 180 องศา ส่งผลให้ตำแหน่งกลับทิศตรงข้าม จากบนลงล่าง",
        "options": [
            {"label": "1", "content": "อยู่ด้านบนสุดเช่นเดิม", "is_correct": 0},
            {"label": "2", "content": "อยู่ด้านล่างสุดสัมผัสกับพื้น", "is_correct": 1},
            {"label": "3", "content": "อยู่ด้านข้างฝั่งซ้าย", "is_correct": 0},
            {"label": "4", "content": "อยู่ด้านข้างฝั่งขวา", "is_correct": 0},
            {"label": "5", "content": "แถบสีดำจะเลือนหายไป", "is_correct": 0}
        ]
    },
    {
        "id": "q_tgat2_s2_53",
        "blueprint_id": "tgat2_spatial_rotate3d",
        "question_text": "ลูกเต๋ามาตรฐานลูกหนึ่งวางอยู่บนโต๊ะโดยหงายแต้ม 6 ขึ้นด้านบน และแต้ม 2 หันเข้าหาตัวผู้สังเกต\n\nหากกลิ้งลูกเต๋าไปข้างหน้า 1 ครั้ง (หมุน 90 องศา) แล้วกลิ้งไปทางขวา 1 ครั้ง (หมุน 90 องศา) แต้มใดจะหงายขึ้นด้านบน",
        "stimulus": None,
        "difficulty": "hard",
        "explanation": "ตามกฎลูกเต๋ามาตรฐาน: หน้าตรงข้ามรวมกันได้ 7 (บน 6 - ล่าง 1, หน้า 2 - หลัง 5, ซ้าย 3/4 - ขวา 4/3)\n1. กลิ้งไปข้างหน้า 1 ครั้ง: หน้าหลัง (5) จะขึ้นมาอยู่ด้านบนแทน และหน้าบนเดิม (6) จะกลายมาอยู่ด้านหน้า\n2. กลิ้งไปทางขวา 1 ครั้ง: หน้าซ้ายจะหมุนขึ้นมาอยู่ด้านบนแทน ซึ่งหน้าซ้ายเดิมคือแต้ม 3 หรือ 4 (ตามการวางมาตรฐานของลูกเต๋าคือ 3)\nดังนั้น หน้าด้านบนจะเป็นแต้ม 3",
        "trap_analysis": "ต้องจำกฎหน้าตรงข้ามผลรวมเท่ากับ 7 และสังเกตการเปลี่ยนทิศทางของการกลิ้ง",
        "options": [
            {"label": "1", "content": "แต้ม 1", "is_correct": 0},
            {"label": "2", "content": "แต้ม 2", "is_correct": 0},
            {"label": "3", "content": "แต้ม 3", "is_correct": 1},
            {"label": "4", "content": "แต้ม 4", "is_correct": 0},
            {"label": "5", "content": "แต้ม 5", "is_correct": 0}
        ]
    },
    {
        "id": "q_tgat2_s2_54",
        "blueprint_id": "tgat2_spatial_rotate3d",
        "question_text": "วัตถุรูปทรงพีระมิดฐานสี่เหลี่ยมจัตุรัส มีสีทาที่หน้าสามเหลี่ยมทั้ง 4 ด้านแตกต่างกัน ได้แก่ แดง, เหลือง, เขียว, น้ำเงิน ตามลำดับตามเข็มนาฬิกา\n\nหากมองพีระมิดนี้จากมุมมอง \"ด้านบนลงมาตรง ๆ (Top View)\" จะเห็นเป็นรูปภาพใด",
        "stimulus": None,
        "difficulty": "easy",
        "explanation": "การมองพีระมิดฐานสี่เหลี่ยมจากด้านบน จะเห็นเป็นกรอบรูปสี่เหลี่ยมจัตุรัสที่มีเส้นทแยงมุม 2 เส้นตัดกันเป็นรูปกากบาทตรงกลาง แบ่งพื้นที่ออกเป็นรูปสามเหลี่ยม 4 ช่องที่มีสี แดง, เหลือง, เขียว, น้ำเงิน เรียงตามเข็มนาฬิกา",
        "trap_analysis": "Top view ของพีระมิดฐานสี่เหลี่ยมคือสี่เหลี่ยมที่มีเส้นทแยงมุมตัดกันตรงกลางยอด",
        "options": [
            {"label": "1", "content": "สี่เหลี่ยมจัตุรัสที่มีเส้นกากบาทตัดกันตรงกลางแบ่งเป็น 4 ส่วนสีเรียงตามเข็มนาฬิกา", "is_correct": 1},
            {"label": "2", "content": "รูปสามเหลี่ยมขนาดใหญ่รูปเดียว", "is_correct": 0},
            {"label": "3", "content": "รูปวงกลมที่มีจุดศูนย์กลาง", "is_correct": 0},
            {"label": "4", "content": "สี่เหลี่ยมจัตุรัสทึบสีดำปราศจากเส้นแบ่งใด ๆ", "is_correct": 0},
            {"label": "5", "content": "รูปหกเหลี่ยมด้านเท่ามุมเท่า", "is_correct": 0}
        ]
    },
    {
        "id": "q_tgat2_s2_55",
        "blueprint_id": "tgat2_spatial_rotate3d",
        "question_text": "การหมุนวัตถุสามมิติรอบแกนใดแกนหนึ่งเป็นมุม 360 องศา จะส่งผลต่อตำแหน่งของวัตถุอย่างไร",
        "stimulus": None,
        "difficulty": "easy",
        "explanation": "การหมุนครบ 360 องศา คือการหมุนครบหนึ่งรอบวงกลมสมบูรณ์ วัตถุจะกลับมาอยู่ในตำแหน่งและทิศทางเดิมทุกประการเสมอ",
        "trap_analysis": "มุม 360 องศา เทียบเท่ากับการไม่หมุน (Identity rotation)",
        "options": [
            {"label": "1", "content": "วัตถุจะกลับหัวในแนวดิ่ง", "is_correct": 0},
            {"label": "2", "content": "วัตถุจะกลับด้านซ้ายขวาแบบกระจกเงา", "is_correct": 0},
            {"label": "3", "content": "วัตถุจะกลับคืนสู่ตำแหน่งและทิศทางเริ่มต้นเดิมทุกประการ", "is_correct": 1},
            {"label": "4", "content": "วัตถุจะเบี่ยงเบนไปจากเดิม 90 องศา", "is_correct": 0},
            {"label": "5", "content": "วัตถุจะสูญเสียคุณสมบัติความสมมาตรทั้งหมด", "is_correct": 0}
        ]
    }
]

# 3.4 แบบประกอบภาพ (tgat2_spatial_assemble) - Q56 to Q60
assemble_data = [
    {
        "id": "q_tgat2_s2_56",
        "blueprint_id": "tgat2_spatial_assemble",
        "question_text": "กำหนดให้มีชิ้นส่วนรูปสามเหลี่ยมมุมฉากที่มีด้านประกอบมุมฉากยาว 3 และ 4 หน่วย จำนวน 2 ชิ้น\n\nเมื่อนำชิ้นส่วนทั้งสองนี้มาประกบติดกันตามแนวด้านตรงข้ามมุมฉาก (ด้านที่ยาว 5 หน่วย) โดยไม่ซ้อนทับกัน รูปทรงที่ได้จะเป็นรูปใด",
        "stimulus": None,
        "difficulty": "medium",
        "explanation": "สามเหลี่ยมมุมฉาก 3-4-5 สองรูป เมื่อนำมาประกบกันที่ด้านตรงข้ามมุมฉาก (ด้านยาว 5):\n- หากประกบในทิศทางสลับกัน จะได้รูปสี่เหลี่ยมผืนผ้าขนาด 3x4 หน่วย\n- หรือหากประกบแบบสมมาตร จะได้รูปสี่เหลี่ยมรูปว่าว\nดังนั้น รูปทรงที่เป็นไปได้คือ \"รูปสี่เหลี่ยมผืนผ้า\"",
        "trap_analysis": "สามเหลี่ยมมุมฉาก 2 รูปที่เท่ากันทุกประการ ประกบด้านตรงข้ามมุมฉากจะได้สี่เหลี่ยมผืนผ้า",
        "options": [
            {"label": "1", "content": "รูปสี่เหลี่ยมจัตุรัส", "is_correct": 0},
            {"label": "2", "content": "รูปสี่เหลี่ยมผืนผ้า", "is_correct": 1},
            {"label": "3", "content": "รูปสี่เหลี่ยมคางหมู", "is_correct": 0},
            {"label": "4", "content": "รูปหกเหลี่ยม", "is_correct": 0},
            {"label": "5", "content": "รูปวงกลม", "is_correct": 0}
        ]
    },
    {
        "id": "q_tgat2_s2_57",
        "blueprint_id": "tgat2_spatial_assemble",
        "question_text": "พิจารณาบล็อกลูกบาศก์จำนวน 6 ลูกที่นำมาวางเรียงซ้อนกันเป็นขั้นบันได:\n- ชั้นที่ 1 (ฐาน): วางลูกบาศก์ 3 ลูกเรียงแถวยาว\n- ชั้นที่ 2: วางลูกบาศก์ 2 ลูกซ้อนบนแถวด้านซ้าย\n- ชั้นที่ 3: วางลูกบาศก์ 1 ลูกซ้อนบนสุดมุมซ้าย\n\nเมื่อมองจาก \"ด้านบน (Top View)\" จะเห็นเป็นภาพใด",
        "stimulus": None,
        "difficulty": "easy",
        "explanation": "เมื่อมองจากด้านบนลงมาตรง ๆ ความสูงในแนวดิ่งจะถูกยุบรวมเป็นระนาบเดียวกัน:\nเนื่องจากฐานชั้นที่ 1 วางเรียงกัน 3 ลูกเป็นแนวยาว และไม่มีลูกบาศก์ใดยื่นออกนอกแนวกว้าง\nภาพด้านบน (Top View) จึงเห็นเป็น \"รูปสี่เหลี่ยมผืนผ้าที่แบ่งเป็น 3 ช่องแถวเดียว\"",
        "trap_analysis": "Top view ไม่แสดงระดับความสูง เห็นเพียงพื้นที่ครอบคลุมบนพื้นราบ",
        "options": [
            {"label": "1", "content": "รูปสี่เหลี่ยมผืนผ้าแถวเดียวแบ่งเป็น 3 ช่องเรียงกัน", "is_correct": 1},
            {"label": "2", "content": "รูปสามเหลี่ยมขั้นบันได 3 ขั้น", "is_correct": 0},
            {"label": "3", "content": "รูปสี่เหลี่ยมจัตุรัสขนาด 3x3", "is_correct": 0},
            {"label": "4", "content": "รูปสี่เหลี่ยมจัตุรัสช่องเดียว", "is_correct": 0},
            {"label": "5", "content": "รูปตัว L สองมิติ", "is_correct": 0}
        ]
    },
    {
        "id": "q_tgat2_s2_58",
        "blueprint_id": "tgat2_spatial_assemble",
        "question_text": "โมเดลสถาปัตยกรรมชิ้นหนึ่งเมื่อมองภาพฉายพบว่า:\n- ภาพด้านหน้า (Front View): เป็นรูปสี่เหลี่ยมผืนผ้า\n- ภาพด้านข้าง (Side View): เป็นรูปสี่เหลี่ยมผืนผ้า\n- ภาพด้านบน (Top View): เป็นรูปวงกลม\n\nโมเดลชิ้นนี้คือรูปทรงสามมิติชนิดใด",
        "stimulus": None,
        "difficulty": "easy",
        "explanation": "วัตถุที่มีภาพด้านบนเป็นวงกลม และภาพด้านหน้ากับด้านข้างเป็นสี่เหลี่ยมผืนผ้า คือ \"ทรงกระบอก (Cylinder)\"",
        "trap_analysis": "ถ้าเป็นทรงกรวย ด้านหน้าจะเป็นสามเหลี่ยม ถ้าเป็นทรงกลมทุกด้านจะเป็นวงกลม",
        "options": [
            {"label": "1", "content": "ทรงกลม (Sphere)", "is_correct": 0},
            {"label": "2", "content": "ทรงกระบอก (Cylinder)", "is_correct": 1},
            {"label": "3", "content": "ทรงกรวย (Cone)", "is_correct": 0},
            {"label": "4", "content": "ปริซึมสามเหลี่ยม (Prism)", "is_correct": 0},
            {"label": "5", "content": "พีระมิดยอดตัด (Frustum)", "is_correct": 0}
        ]
    },
    {
        "id": "q_tgat2_s2_59",
        "blueprint_id": "tgat2_spatial_assemble",
        "question_text": "โมเดลชิ้นหนึ่งมีลักษณะ:\n- ภาพด้านหน้า (Front View): เป็นรูปสามเหลี่ยมหน้าจั่ว\n- ภาพด้านข้าง (Side View): เป็นรูปสามเหลี่ยมหน้าจั่ว\n- ภาพด้านบน (Top View): เป็นรูปวงกลม\n\nโมเดลชิ้นนี้คือรูปทรงสามมิติชนิดใด",
        "stimulus": None,
        "difficulty": "easy",
        "explanation": "วัตถุที่มีภาพด้านบนเป็นวงกลม และภาพมองจากด้านข้างทุกด้านเป็นสามเหลี่ยมหน้าจั่ว คือ \"ทรงกรวย (Cone)\"",
        "trap_analysis": "ยอดแหลมทำให้มุมมองด้านหน้าเป็นสามเหลี่ยม ฐานกลมทำให้มุมมองด้านบนเป็นวงกลม",
        "options": [
            {"label": "1", "content": "ทรงกระบอก", "is_correct": 0},
            {"label": "2", "content": "ทรงกรวย (Cone)", "is_correct": 1},
            {"label": "3", "content": "พีระมิดฐานสี่เหลี่ยม", "is_correct": 0},
            {"label": "4", "content": "ทรงกลมผ่าครึ่ง", "is_correct": 0},
            {"label": "5", "content": "ทรงสี่หน้าปรกติ", "is_correct": 0}
        ]
    },
    {
        "id": "q_tgat2_s2_60",
        "blueprint_id": "tgat2_spatial_assemble",
        "question_text": "หากตัดชิ้นไม้รูปลูกบาศก์ด้วยระนาบเรียบระนาบหนึ่ง รอยตัดหรือหน้าตัด (Cross-section) ในข้อใดที่ \"ไม่มีทางเกิดขึ้นได้\"",
        "stimulus": None,
        "difficulty": "hard",
        "explanation": "ลูกบาศก์มี 6 หน้า ดังนั้นระนาบตัดสามารถตัดผ่านหน้าได้ตั้งแต่ 3 หน้าถึง 6 หน้า:\n- ตัดผ่าน 3 หน้า = รูปสามเหลี่ยม\n- ตัดผ่าน 4 หน้า = รูปสี่เหลี่ยม\n- ตัดผ่าน 5 หน้า = รูปห้าเหลี่ยม\n- ตัดผ่าน 6 หน้า = รูปหกเหลี่ยม\nเนื่องจากลูกบาศก์มีเพียง 6 หน้า จึงเป็นไปไม่ได้เลยที่ระนาบตัดจะตัดผ่าน 7 หน้าเกิดเป็น \"รูปเจ็ดเหลี่ยม\"",
        "trap_analysis": "จำนวนเหลี่ยมของหน้าตัดที่มากที่สุดที่จะเกิดขึ้นได้จากลูกบาศก์คือ 6 เหลี่ยม (ตามจำนวนหน้า)",
        "options": [
            {"label": "1", "content": "รูปสามเหลี่ยมด้านเท่า", "is_correct": 0},
            {"label": "2", "content": "รูปสี่เหลี่ยมผืนผ้า", "is_correct": 0},
            {"label": "3", "content": "รูปหกเหลี่ยม", "is_correct": 0},
            {"label": "4", "content": "รูปห้าเหลี่ยม", "is_correct": 0},
            {"label": "5", "content": "รูปเจ็ดเหลี่ยม", "is_correct": 1}
        ]
    }
]

for q in cube_data + odd_data + rotate3d_data + assemble_data:
    q["subject_id"] = "tgat2"
    q["set_number"] = 2
    questions.append(q)

# =========================================================================
# DOMAIN 4: ความสามารถทางเหตุผล (LOGICAL REASONING) - 20 Questions (Q61 - Q80)
# =========================================================================

# 4.1 อนุกรมภาพ (tgat2_reason_series) - Q61 to Q65
series_data = [
    {
        "id": "q_tgat2_s2_61",
        "blueprint_id": "tgat2_reason_series",
        "question_text": "พิจารณาอนุกรมเรขาคณิตที่มีการเปลี่ยนแปลงดังนี้:\n- รูปที่ 1: รูปสามเหลี่ยมด้านเท่า (3 ด้าน) มีจุดดำ 1 จุดตรงกลาง\n- รูปที่ 2: รูปสี่เหลี่ยมจัตุรัส (4 ด้าน) มีจุดดำ 2 จุดตรงกลาง\n- รูปที่ 3: รูปห้าเหลี่ยมด้านเท่า (5 ด้าน) มีจุดดำ 3 จุดตรงกลาง\n- รูปที่ 4: รูปหกเหลี่ยมด้านเท่า (6 ด้าน) มีจุดดำ 4 จุดตรงกลาง\n\nรูปที่ 5 ในอนุกรมควรเป็นรูปใด",
        "stimulus": None,
        "difficulty": "easy",
        "explanation": "กฎของอนุกรมมี 2 มิติพร้อมกัน:\n1. จำนวนด้านของรูปหลายเหลี่ยมเพิ่มขึ้นทีละ 1 ด้าน: $3 \\to 4 \\to 5 \\to 6 \\to 7$ (รูปเจ็ดเหลี่ยม)\n2. จำนวนจุดดำตรงกลางเพิ่มขึ้นทีละ 1 จุด: $1 \\to 2 \\to 3 \\to 4 \\to 5$ จุด\nดังนั้น รูปที่ 5 คือ \"รูปเจ็ดเหลี่ยมที่มีจุดดำ 5 จุดตรงกลาง\"",
        "trap_analysis": "นับจำนวนด้าน ($N$) และจำนวนจุด ($N - 2$)",
        "options": [
            {"label": "1", "content": "รูปหกเหลี่ยมที่มีจุดดำ 5 จุดตรงกลาง", "is_correct": 0},
            {"label": "2", "content": "รูปเจ็ดเหลี่ยมที่มีจุดดำ 5 จุดตรงกลาง", "is_correct": 1},
            {"label": "3", "content": "รูปแปดเหลี่ยมที่มีจุดดำ 6 จุดตรงกลาง", "is_correct": 0},
            {"label": "4", "content": "รูปเจ็ดเหลี่ยมที่มีจุดดำ 4 จุดตรงกลาง", "is_correct": 0},
            {"label": "5", "content": "รูปวงกลมที่มีจุดดำ 5 จุดตรงกลาง", "is_correct": 0}
        ]
    },
    {
        "id": "q_tgat2_s2_62",
        "blueprint_id": "tgat2_reason_series",
        "question_text": "พิจารณาเข็มบอกเวลาในหน้าปัดนาฬิกาที่มีเข็มเดียว:\n- ตำแหน่งที่ 1: ชี้ที่เลข 12\n- ตำแหน่งที่ 2: ชี้ที่เลข 2 (หมุนตามเข็ม 2 ช่อง)\n- ตำแหน่งที่ 3: ชี้ที่เลข 5 (หมุนตามเข็มเพิ่มขึ้น 3 ช่อง)\n- ตำแหน่งที่ 4: ชี้ที่เลข 9 (หมุนตามเข็มเพิ่มขึ้น 4 ช่อง)\n\nตำแหน่งที่ 5 เข็มจะชี้ที่ตัวเลขใด",
        "stimulus": None,
        "difficulty": "medium",
        "explanation": "ระยะการหมุนตามเข็มเพิ่มขึ้นทีละ 1 ช่อง:\n- จาก 12 ไป 2 = $+2$ ช่อง\n- จาก 2 ไป 5 = $+3$ ช่อง\n- จาก 5 ไป 9 = $+4$ ช่อง\n- ก้าวถัดไปต้องหมุน $= +5$ ช่อง จากเลข 9:\n$9 + 5 = 14 \\to$ ในหน้าปัด 12 ชั่วโมง $14 - 12 = 2$\nดังนั้น เข็มจะวนกลับมาชี้ที่ \"เลข 2\"",
        "trap_analysis": "หน้าปัดมี 12 เลข เมื่อเกิน 12 ให้นำมาลบ 12 ($9+5=14 \\to 14-12=2$)",
        "options": [
            {"label": "1", "content": "เลข 1", "is_correct": 0},
            {"label": "2", "content": "เลข 2", "is_correct": 1},
            {"label": "3", "content": "เลข 3", "is_correct": 0},
            {"label": "4", "content": "เลข 12", "is_correct": 0},
            {"label": "5", "content": "เลข 11", "is_correct": 0}
        ]
    },
    {
        "id": "q_tgat2_s2_63",
        "blueprint_id": "tgat2_reason_series",
        "question_text": "พิจารณาตารางขนาด 2x2 ที่มีช่อง 4 ช่อง (บนซ้าย, บนขวา, ล่างขวา, ล่างซ้าย):\n- ลำดับที่ 1: แถบสีดำอยู่ที่ช่อง \"บนซ้าย\"\n- ลำดับที่ 2: แถบสีดำขยับตามเข็มนาฬิกาไปช่อง \"บนขวา\"\n- ลำดับที่ 3: แถบสีดำขยับตามเข็มนาฬิกาไปช่อง \"ล่างขวา\"\n- ลำดับที่ 4: แถบสีดำขยับตามเข็มนาฬิกาไปช่อง \"ล่างซ้าย\"\n\nในลำดับที่ 10 แถบสีดำจะอยู่ที่ช่องใด",
        "stimulus": None,
        "difficulty": "easy",
        "explanation": "รอบการวนมี 4 ช่อง (คาบ $= 4$):\n- ลำดับที่หารด้วย 4 เหลือเศษ 1 = บนซ้าย (1, 5, 9)\n- ลำดับที่หารด้วย 4 เหลือเศษ 2 = บนขวา (2, 6, 10)\nลำดับที่ 10: $10 \\div 4 = 2$ เศษ 2\nดังนั้น แถบสีดำจะอยู่ที่ช่อง \"บนขวา\"",
        "trap_analysis": "ใช้ระบบมอดุโล (Modulo 4): $10 \\equiv 2 \\pmod 4$",
        "options": [
            {"label": "1", "content": "ช่องบนซ้าย", "is_correct": 0},
            {"label": "2", "content": "ช่องบนขวา", "is_correct": 1},
            {"label": "3", "content": "ช่องล่างขวา", "is_correct": 0},
            {"label": "4", "content": "ช่องล่างซ้าย", "is_correct": 0},
            {"label": "5", "content": "อยู่ตรงกึ่งกลางของทั้งสี่ช่อง", "is_correct": 0}
        ]
    },
    {
        "id": "q_tgat2_s2_64",
        "blueprint_id": "tgat2_reason_series",
        "question_text": "พิจารณาลำดับภาพสลับรูปแบบ:\n- รูปที่ 1: วงกลมสีขาว 1 วง\n- รูปที่ 2: วงกลมสีดำ 2 วง\n- รูปที่ 3: สี่เหลี่ยมสีขาว 3 รูป\n- รูปที่ 4: สี่เหลี่ยมสีดำ 4 รูป\n- รูปที่ 5: สามเหลี่ยมสีขาว 5 รูป\n\nรูปถัดไป (รูปที่ 6) ควรเป็นรูปใด",
        "stimulus": None,
        "difficulty": "easy",
        "explanation": "กฎของอนุกรม:\n1. รูปร่างเปลี่ยนทุก 2 ลำดับ: วงกลม (1,2) $\\to$ สี่เหลี่ยม (3,4) $\\to$ สามเหลี่ยม (5,6)\n2. สีสลับ ขาว $\\to$ ดำ: รูปที่ 5 เป็นสีขาว ดังนั้นรูปที่ 6 ต้องเป็น \"สีดำ\"\n3. จำนวนเพิ่มขึ้นทีละ 1: รูปที่ 6 มี 6 ชิ้น\nดังนั้น รูปที่ 6 คือ \"สามเหลี่ยมสีดำ 6 รูป\"",
        "trap_analysis": "สังเกตคู่ของรูปร่างและสีที่สลับขาว-ดำ",
        "options": [
            {"label": "1", "content": "สามเหลี่ยมสีขาว 6 รูป", "is_correct": 0},
            {"label": "2", "content": "สามเหลี่ยมสีดำ 6 รูป", "is_correct": 1},
            {"label": "3", "content": "ห้าเหลี่ยมสีดำ 6 รูป", "is_correct": 0},
            {"label": "4", "content": "สี่เหลี่ยมสีดำ 6 รูป", "is_correct": 0},
            {"label": "5", "content": "วงกลมสีดำ 6 รูป", "is_correct": 0}
        ]
    },
    {
        "id": "q_tgat2_s2_65",
        "blueprint_id": "tgat2_reason_series",
        "question_text": "พิจารณาลูกศรในวงกลมที่มีการหมุนดังนี้:\n- ขั้นที่ 1: ชี้ทิศเหนือ ($0^\\circ$)\n- ขั้นที่ 2: ชี้ทิศตะวันออกเฉียงเหนือ ($45^\\circ$)\n- ขั้นที่ 3: ชี้ทิศตะวันออก ($90^\\circ$)\n- ขั้นที่ 4: ชี้ทิศตะวันออกเฉียงใต้ ($135^\\circ$)\n\nในขั้นที่ 7 ลูกศรจะชี้ไปในทิศทางใด",
        "stimulus": None,
        "difficulty": "easy",
        "explanation": "ลูกศรหมุนตามเข็มนาฬิกาทีละ $45^\\circ$:\n- ขั้นที่ 1: $0^\\circ$ (เหนือ)\n- ขั้นที่ 2: $45^\\circ$ (ต.อ.เฉียงเหนือ)\n- ขั้นที่ 3: $90^\\circ$ (ต.อ.)\n- ขั้นที่ 4: $135^\\circ$ (ต.อ.เฉียงใต้)\n- ขั้นที่ 5: $180^\\circ$ (ใต้)\n- ขั้นที่ 6: $225^\\circ$ (ต.ต.เฉียงใต้)\n- ขั้นที่ 7: $270^\\circ$ (ทิศตะวันตก)\nดังนั้น ขั้นที่ 7 ชี้ไปทาง \"ทิศตะวันตก\"",
        "trap_analysis": "ขั้นที่ 7 คือหมุนไป 6 ครั้ง $\\times 45^\\circ = 270^\\circ$ ซึ่งคือทิศตะวันตกตรงพอดี",
        "options": [
            {"label": "1", "content": "ทิศใต้", "is_correct": 0},
            {"label": "2", "content": "ทิศตะวันตกเฉียงใต้", "is_correct": 0},
            {"label": "3", "content": "ทิศตะวันตก", "is_correct": 1},
            {"label": "4", "content": "ทิศตะวันตกเฉียงเหนือ", "is_correct": 0},
            {"label": "5", "content": "ทิศเหนือ", "is_correct": 0}
        ]
    }
]

# 4.2 อุปมาอุปไมย (tgat2_reason_analogy) - Q66 to Q70
analogy_data = [
    {
        "id": "q_tgat2_s2_66",
        "blueprint_id": "tgat2_reason_analogy",
        "question_text": "กล้องดูดาว : นักดาราศาสตร์ = กล้องจุลทรรศน์ : [ ? ]",
        "stimulus": None,
        "difficulty": "easy",
        "explanation": "ความสัมพันธ์แบบ \"เครื่องมือประจำวิชาชีพ\":\n- กล้องดูดาว เป็นเครื่องมือหลักของ นักดาราศาสตร์\n- กล้องจุลทรรศน์ เป็นเครื่องมือหลักของ นักจุลชีววิทยา / นักชีววิทยา",
        "trap_analysis": "จับคู่เครื่องมือที่ใช้ส่องดูสิ่งมีชีวิตขนาดเล็กกับผู้เชี่ยวชาญ",
        "options": [
            {"label": "1", "content": "นักโบราณคดี", "is_correct": 0},
            {"label": "2", "content": "นักจุลชีววิทยา", "is_correct": 1},
            {"label": "3", "content": "นักธรณีวิทยา", "is_correct": 0},
            {"label": "4", "content": "นักประวัติศาสตร์", "is_correct": 0},
            {"label": "5", "content": "วิศวกรเครื่องกล", "is_correct": 0}
        ]
    },
    {
        "id": "q_tgat2_s2_67",
        "blueprint_id": "tgat2_reason_analogy",
        "question_text": "วัคซีน : โรคระบาด = ไฟร์วอลล์ (Firewall) : [ ? ]",
        "stimulus": None,
        "difficulty": "easy",
        "explanation": "ความสัมพันธ์แบบ \"การป้องกันภัยคุกคาม\":\n- วัคซีน ใช้ป้องกันการแพร่กระจายของ โรคระบาด ในสิ่งมีชีวิต\n- ไฟร์วอลล์ ใช้ป้องกันการโจมตีหรือการบุกรุกจาก ไวรัสคอมพิวเตอร์ / ภัยคุกคามทางไซเบอร์",
        "trap_analysis": "เปรียบเทียบกลไกภูมิคุ้มกันทางชีววิทยากับความมั่นคงปลอดภัยทางคอมพิวเตอร์",
        "options": [
            {"label": "1", "content": "การเขียนโปรแกรม", "is_correct": 0},
            {"label": "2", "content": "การโจมตีทางไซเบอร์ / ไวรัสคอมพิวเตอร์", "is_correct": 1},
            {"label": "3", "content": "การประมวลผลข้อมูล", "is_correct": 0},
            {"label": "4", "content": "หน้าจอแสดงผล", "is_correct": 0},
            {"label": "5", "content": "สายเคเบิลใยแก้ว", "is_correct": 0}
        ]
    },
    {
        "id": "q_tgat2_s2_68",
        "blueprint_id": "tgat2_reason_analogy",
        "question_text": "ใบเรือ : พลังงานลม = กังหันน้ำ : [ ? ]",
        "stimulus": None,
        "difficulty": "easy",
        "explanation": "ความสัมพันธ์แบบ \"อุปกรณ์ : แหล่งพลังงานกลที่ขับเคลื่อน\":\n- ใบเรือ รับพลังงานขับเคลื่อนจาก พลังงานลม\n- กังหันน้ำ รับพลังงานขับเคลื่อนจาก พลังงานกระแสน้ำ (หรือพลังงานน้ำไหล)",
        "trap_analysis": "ดูแหล่งพลังงานตามธรรมชาติที่ทำให้อุปกรณ์ทำงาน",
        "options": [
            {"label": "1", "content": "พลังงานแสงอาทิตย์", "is_correct": 0},
            {"label": "2", "content": "พลังงานกระแสน้ำ", "is_correct": 1},
            {"label": "3", "content": "พลังงานความร้อนใต้พิภพ", "is_correct": 0},
            {"label": "4", "content": "พลังงานนิวเคลียร์", "is_correct": 0},
            {"label": "5", "content": "กระแสไฟฟ้าสถิต", "is_correct": 0}
        ]
    },
    {
        "id": "q_tgat2_s2_69",
        "blueprint_id": "tgat2_reason_analogy",
        "question_text": "วาทยกร (Conductor) : วงออร์เคสตรา = ผู้กำกับการแสดง : [ ? ]",
        "stimulus": None,
        "difficulty": "medium",
        "explanation": "ความสัมพันธ์แบบ \"ผู้นำผู้ควบคุมทิศทาง : กลุ่มผู้ปฏิบัติงานร่วมกัน\":\n- วาทยกร เป็นผู้ควบคุมการบรรเลงของ วงออร์เคสตรา\n- ผู้กำกับการแสดง เป็นผู้ควบคุมดูแลการแสดงของ ทีมนักแสดงและกองถ่ายภาพยนตร์",
        "trap_analysis": "จับคู่ผู้กำกับศิลป์กับกลุ่มคณะทำงานของตน",
        "options": [
            {"label": "1", "content": "โรงละคร", "is_correct": 0},
            {"label": "2", "content": "กองถ่ายทำภาพยนตร์และทีมนักแสดง", "is_correct": 1},
            {"label": "3", "content": "ผู้ชมในหอประชุม", "is_correct": 0},
            {"label": "4", "content": "บทภาพยนตร์", "is_correct": 0},
            {"label": "5", "content": "ตั๋วชมการแสดง", "is_correct": 0}
        ]
    },
    {
        "id": "q_tgat2_s2_70",
        "blueprint_id": "tgat2_reason_analogy",
        "question_text": "เครื่องยนต์ : น้ำมันเชื้อเพลิง = สมองมนุษย์ : [ ? ]",
        "stimulus": None,
        "difficulty": "medium",
        "explanation": "ความสัมพันธ์แบบ \"อวัยวะ/เครื่องจักร : แหล่งพลังงานทางชีวเคมีหลัก\":\n- เครื่องยนต์ สันดาป น้ำมันเชื้อเพลิง เพื่อขับเคลื่อน\n- สมองมนุษย์ บริโภค น้ำตาลกลูโคส (และออกซิเจน) เป็นแหล่งพลังงานชีวเคมีหลักในการส่งกระแสประสาท",
        "trap_analysis": "พลังงานพื้นฐานที่สุดที่เซลล์ประสาทสมองนำไปใช้คือ น้ำตาลกลูโคส",
        "options": [
            {"label": "1", "content": "ออกซิเจนและน้ำตาลกลูโคส", "is_correct": 1},
            {"label": "2", "content": "วิตามินซี", "is_correct": 0},
            {"label": "3", "content": "กรดไขมันทรานส์", "is_correct": 0},
            {"label": "4", "content": "เกลือแร่โซเดียม", "is_correct": 0},
            {"label": "5", "content": "เส้นใยอาหาร", "is_correct": 0}
        ]
    }
]

# 4.3 สรุปความ / ตรรกศาสตร์นิรนัย (tgat2_reason_deduction) - Q71 to Q75
deduction_data = [
    {
        "id": "q_tgat2_s2_71",
        "blueprint_id": "tgat2_reason_deduction",
        "question_text": "กำหนดข้อเท็จจริง:\n(1) นักวิจัยทุกคนเป็นคนช่างสังเกต\n(2) คนช่างสังเกตบางคนเป็นนักประดิษฐ์\n(3) ภาคินเป็นนักวิจัย\n\nข้อใดต่อไปนี้สามารถ \"สรุปได้อย่างถูกต้องและสมเหตุสมผลแน่นอน\"",
        "stimulus": None,
        "difficulty": "medium",
        "explanation": "- จาก (1) และ (3): ภาคินเป็นนักวิจัย และนักวิจัยทุกคนเป็นคนช่างสังเกต $\\to$ \"ภาคินเป็นคนช่างสังเกตแน่นอน\"\n- จาก (2) บอกว่าคนช่างสังเกต \"บางคน\" เป็นนักประดิษฐ์ จึงไม่อาจสรุปได้แน่นอนว่าภาคินเป็นนักประดิษฐ์หรือไม่\nดังนั้น ข้อสรุปที่ถูกต้องแน่นอนคือ \"ภาคินเป็นคนช่างสังเกต\"",
        "trap_analysis": "ระวังข้อที่สรุปเกินว่า ภาคินเป็นนักประดิษฐ์ เพราะคำว่า \"บางคน\" ไม่ครอบคลุมทุกคน",
        "options": [
            {"label": "1", "content": "ภาคินเป็นนักประดิษฐ์แน่นอน", "is_correct": 0},
            {"label": "2", "content": "ภาคินเป็นคนช่างสังเกตอย่างแน่นอน", "is_correct": 1},
            {"label": "3", "content": "นักประดิษฐ์ทุกคนคือนักวิจัย", "is_correct": 0},
            {"label": "4", "content": "ภาคินไม่ได้เป็นนักประดิษฐ์", "is_correct": 0},
            {"label": "5", "content": "คนช่างสังเกตทุกคนคือนักวิจัย", "is_correct": 0}
        ]
    },
    {
        "id": "q_tgat2_s2_72",
        "blueprint_id": "tgat2_reason_deduction",
        "question_text": "กำหนดเงื่อนไขทางตรรกศาสตร์:\n\"ถ้ามีสัญญาณเตือนภัยดังขึ้น เจ้าหน้าที่ทุกคนต้องอพยพออกจากอาคารทันที\"\n\nผลปรากฏว่า: \"ขณะนี้เจ้าหน้าที่สมชายยังคงนั่งทำงานอยู่ในอาคารและไม่ได้อพยพ\"\n\nข้อใดเป็นข้อสรุปที่ถูกต้องตามหลักตรรกศาสตร์",
        "stimulus": None,
        "difficulty": "medium",
        "explanation": "ตามกฎแย้งสลับที่ (Modus Tollens):\n- ประพจน์: ถ้า P (สัญญาณดัง) แล้ว Q (ต้องอพยพ)\n- ข้อเท็จจริง: ไม่ได้ Q (ไม่ได้อพยพ)\n- สรุปได้แน่นอนว่า: ต้องไม่ใช่ P (สัญญาณเตือนภัยไม่ได้ดังขึ้น)",
        "trap_analysis": "ถ้า $P \\to Q$ แล้ว $\\sim Q \\to \\sim P$",
        "options": [
            {"label": "1", "content": "สัญญาณเตือนภัยไม่ได้ดังขึ้น", "is_correct": 1},
            {"label": "2", "content": "สัญญาณเตือนภัยดังขึ้นแล้วแต่สมชายหูตึง", "is_correct": 0},
            {"label": "3", "content": "สมชายทำผิดกฎหมายอาญา", "is_correct": 0},
            {"label": "4", "content": "อาคารกำลังเกิดเพลิงไหม้อย่างรุนแรง", "is_correct": 0},
            {"label": "5", "content": "เจ้าหน้าที่ทุกคนอพยพหมดแล้วยกเว้นสมชาย", "is_correct": 0}
        ]
    },
    {
        "id": "q_tgat2_s2_73",
        "blueprint_id": "tgat2_reason_deduction",
        "question_text": "มีคน 5 คน ได้แก่ ก, ข, ค, ง, จ ยืนเรียงแถวหน้ากระดานตามเงื่อนไขต่อไปนี้:\n- ค ยืนอยู่กึ่งกลางแถวพอดี (ตำแหน่งที่ 3)\n- ก ยืนอยู่ทางซ้ายมือของ ค\n- ข ยืนอยู่ติดกับ จ โดยที่ จ ยืนอยู่ขวาสุดของแถว (ตำแหน่งที่ 5)\n- ง ยืนอยู่ซ้ายสุดของแถว (ตำแหน่งที่ 1)\n\nใครยืนอยู่ในตำแหน่งที่ 2 จากซ้าย",
        "stimulus": None,
        "difficulty": "easy",
        "explanation": "ตำแหน่ง 1 ถึง 5 จากซ้ายไปขวา:\n- ตำแหน่ง 1: ง (ซ้ายสุด)\n- ตำแหน่ง 3: ค (กึ่งกลาง)\n- ตำแหน่ง 5: จ (ขวาสุด)\n- ตำแหน่ง 4: ข (ติดกับ จ)\n- ตำแหน่งที่เหลือคือ ตำแหน่ง 2 ต้องเป็น \"ก\" (ซึ่งอยู่ทางซ้ายของ ค ตามเงื่อนไขพอดี)\nดังนั้น คนที่ยืนตำแหน่งที่ 2 คือ \"ก\"",
        "trap_analysis": "ไล่ตำแหน่งจาก 1 ถึง 5: ง, ก, ค, ข, จ",
        "options": [
            {"label": "1", "content": "ก", "is_correct": 1},
            {"label": "2", "content": "ข", "is_correct": 0},
            {"label": "3", "content": "ค", "is_correct": 0},
            {"label": "4", "content": "ง", "is_correct": 0},
            {"label": "5", "content": "จ", "is_correct": 0}
        ]
    },
    {
        "id": "q_tgat2_s2_74",
        "blueprint_id": "tgat2_reason_deduction",
        "question_text": "กำหนดข้อเท็จจริง:\n(1) ไม่มีปลาวาฬตัวใดเป็นปลา (ปลาวาฬทุกตัวเป็นสัตว์เลี้ยงลูกด้วยนม)\n(2) สัตว์เลี้ยงลูกด้วยนมทุกตัวต้องหายใจด้วยปอด\n\nข้อใดเป็นข้อสรุปที่ถูกต้องตามหลักตรรกศาสตร์",
        "stimulus": None,
        "difficulty": "easy",
        "explanation": "จาก (1) ปลาวาฬเป็นสัตว์เลี้ยงลูกด้วยนม\nและจาก (2) สัตว์เลี้ยงลูกด้วยนมทุกตัวต้องหายใจด้วยปอด\nสรุปได้แน่นอนว่า: \"ปลาวาฬทุกตัวต้องหายใจด้วยปอด\"",
        "trap_analysis": "ตรรกศาสตร์เชื่อมโยง $A \\subset B$ และ $B \\subset C \\to A \\subset C$",
        "options": [
            {"label": "1", "content": "ปลาวาฬทุกตัวต้องหายใจด้วยปอด", "is_correct": 1},
            {"label": "2", "content": "ปลาทุกชนิดสามารถหายใจด้วยปอดได้", "is_correct": 0},
            {"label": "3", "content": "สัตว์ที่หายใจด้วยปอดทุกชนิดคือปลาวาฬ", "is_correct": 0},
            {"label": "4", "content": "ปลาวาฬสามารถอาศัยอยู่บนบกได้เช่นเดียวกับมนุษย์", "is_correct": 0},
            {"label": "5", "content": "ไม่มีสัตว์เลี้ยงลูกด้วยนมชนิดใดที่อาศัยอยู่ในน้ำ", "is_correct": 0}
        ]
    },
    {
        "id": "q_tgat2_s2_75",
        "blueprint_id": "tgat2_reason_deduction",
        "question_text": "เพื่อน 3 คน A, B, C คนหนึ่งพูดจริงเสมอ คนหนึ่งพูดโกหกเสมอ และอีกคนพูดสลับจริงเท็จ\n\nเมื่อถามว่าใครทำแจกันแตก:\n- A พูดว่า: \"ฉันไม่ได้ทำแตก\"\n- B พูดว่า: \"A พูดจริง\"\n- C พูดว่า: \"A เป็นคนทำแตก\"\n\nหากมีคนทำแตกเพียงคนเดียว และมีคนพูดจริงเพียงคนเดียว ใครคือคนทำแจกันแตก",
        "stimulus": None,
        "difficulty": "hard",
        "explanation": "พิจารณาคำพูด:\n- A พูดว่า \"ฉันไม่ได้ทำ\"\n- C พูดว่า \"A เป็นคนทำ\"\nคำพูดของ A และ C ขัดแย้งกันโดยตรง แสดงว่าต้องมีคนหนึ่งพูดจริงและอีกคนพูดเท็จ\nโจทย์กำหนดว่า \"มีคนพูดจริงเพียงคนเดียว\"\nดังนั้น คนที่พูดจริงต้องเป็น A หรือ C เท่านั้น ส่งผลให้ B ต้องพูดเท็จแน่นอน\nเมื่อ B พูดเท็จ (\"A พูดจริง\" เป็นเท็จ) $\\to$ แสดงว่า A พูดโกหก!\nเมื่อ A พูดโกหก ประโยค \"ฉันไม่ได้ทำแตก\" ของ A จึงเป็นเท็จ $\\to$ สรุปว่า \"A เป็นคนทำแจกันแตก\" พอดี (และทำให้ C เป็นคนพูดจริง)",
        "trap_analysis": "คู่ขัดแย้ง A กับ C ต้องมีจริงหนึ่งเท็จหนึ่ง เมื่อคนพูดจริงมีคนเดียว B จึงต้องโกหก ทำให้ได้ข้อสรุปว่า A โกหก",
        "options": [
            {"label": "1", "content": "A", "is_correct": 1},
            {"label": "2", "content": "B", "is_correct": 0},
            {"label": "3", "content": "C", "is_correct": 0},
            {"label": "4", "content": "ทั้งสามคนช่วยกันทำแตก", "is_correct": 0},
            {"label": "5", "content": "ข้อมูลไม่เพียงพอที่จะระบุตัวผู้กระทำได้", "is_correct": 0}
        ]
    }
]

# 4.4 การวิเคราะห์ข้อความ (tgat2_reason_analytical) - Q76 to Q80
analytical_data = [
    {
        "id": "q_tgat2_s2_76",
        "blueprint_id": "tgat2_reason_analytical",
        "question_text": "ข้อโต้แย้ง: \"รัฐบาลควรส่งเสริมการติดตั้งระบบผลิตไฟฟ้าพลังงานแสงอาทิตย์บนหลังคาบ้านเรือนของประชาชนอย่างเร่งด่วน เพราะจะช่วยลดการพึ่งพาก๊าซธรรมชาติในการผลิตไฟฟ้า และช่วยลดปริมาณการปล่อยก๊าซเรือนกระจกของประเทศได้อย่างยั่งยืน\"\n\nข้อใดเป็น \"ข้อสมมติฐานเบื้องต้น (Underlying Assumption)\" ของข้อโต้แย้งข้างต้น",
        "stimulus": None,
        "difficulty": "medium",
        "explanation": "ข้อสมมติฐานคือสิ่งที่ผู้พูดไม่ได้กล่าวออกมาตรง ๆ แต่ต้องเป็นจริงเพื่อให้ข้อสรุปตั้งอยู่ได้: ผู้พูดเชื่อว่า \"การผลิตไฟฟ้าพลังงานแสงอาทิตย์บนหลังคาบ้านสามารถนำมาทดแทนการใช้ก๊าซธรรมชาติได้อย่างมีนัยสำคัญและประชาชนสามารถเข้าถึงการติดตั้งได้จริง\"",
        "trap_analysis": "ข้อสมมติฐานต้องเป็นสะพานเชื่อมระหว่างเหตุผล (ลดก๊าซธรรมชาติ) กับข้อเสนอ (ติดโซลาร์เซลล์บนหลังคา)",
        "options": [
            {"label": "1", "content": "แสงแดดในประเทศมีเพียงพอที่จะผลิตไฟฟ้าทดแทนเชื้อเพลิงฟอสซิลได้อย่างมีนัยสำคัญ", "is_correct": 1},
            {"label": "2", "content": "โรงไฟฟ้าพลังงานก๊าซธรรมชาติทั้งหมดในประเทศกำลังจะหมดอายุการใช้งานในสัปดาห์หน้า", "is_correct": 0},
            {"label": "3", "content": "แผงโซลาร์เซลล์ไม่มีต้นทุนในการผลิตและบำรุงรักษาเลย", "is_correct": 0},
            {"label": "4", "content": "ประชาชนทุกคนในประเทศมีความรู้ด้านวิศวกรรมไฟฟ้าเป็นอย่างดี", "is_correct": 0},
            {"label": "5", "content": "ก๊าซธรรมชาติไม่เคยก่อให้เกิดมลพิษทางอากาศ", "is_correct": 0}
        ]
    },
    {
        "id": "q_tgat2_s2_77",
        "blueprint_id": "tgat2_reason_analytical",
        "question_text": "ข้ออ้าง: \"การจำกัดเวลาการใช้สมาร์ตโฟนของพนักงานระหว่างเวลาทำงานจะช่วยเพิ่มประสิทธิภาพและผลผลิตของบริษัทได้อย่างแน่นอน\"\n\nข้อมูลในข้อใด หากเป็นจริง จะช่วย \"สนับสนุน (Strengthen)\" ข้ออ้างข้างต้นได้ดีที่สุด",
        "stimulus": None,
        "difficulty": "medium",
        "explanation": "ข้อที่ช่วยสนับสนุนได้ดีที่สุดต้องแสดงให้เห็นว่าการใช้สมาร์ตโฟนคือตัวการลดประสิทธิภาพจริง: \"ผลสำรวจพบว่าการแจ้งเตือนจากโซเชียลมีเดียบนสมาร์ตโฟนทำให้พนักงานเสียสมาธิและต้องใช้เวลาเฉลี่ยถึง 20 นาทีกว่าจะกลับมาจดจ่อกับงานเดิมได้\"",
        "trap_analysis": "ตัวเลือกที่สนับสนุนต้องชี้ให้เห็นความเชื่อมโยงโดยตรงระหว่างการใช้สมาร์ตโฟนกับความสูญเสียประสิทธิภาพของงาน",
        "options": [
            {"label": "1", "content": "การแจ้งเตือนจากสมาร์ตโฟนทำให้พนักงานเสียสมาธิและต้องใช้เวลาเฉลี่ยถึง 20 นาทีกว่าจะกลับมาจดจ่อกับงานได้", "is_correct": 1},
            {"label": "2", "content": "สมาร์ตโฟนรุ่นใหม่มีราคาสูงขึ้นกว่ารุ่นเดิมถึง 15%", "is_correct": 0},
            {"label": "3", "content": "พนักงานบางคนจำเป็นต้องใช้สมาร์ตโฟนในการติดต่อประสานงานกับลูกค้าต่างประเทศ", "is_correct": 0},
            {"label": "4", "content": "บริษัทคู่แข่งเพิ่งแจกสมาร์ตโฟนฟรีให้แก่พนักงานทุกคน", "is_correct": 0},
            {"label": "5", "content": "การดื่มกาแฟในตอนเช้าช่วยให้พนักงานรู้สึกสดชื่นกระปรี้กระเปร่า", "is_correct": 0}
        ]
    },
    {
        "id": "q_tgat2_s2_78",
        "blueprint_id": "tgat2_reason_analytical",
        "question_text": "ข้ออ้าง: \"บริษัทควรเปลี่ยนมาใช้นโยบายให้พนักงานทำงานจากที่บ้าน (Work from Home) 100% ตลอดไป เพราะช่วยประหยัดค่าเช่าอาคารสำนักงานและค่าไฟฟ้าของบริษัทได้หลายล้านบาทต่อปี\"\n\nข้อมูลในข้อใด หากเป็นจริง จะทำหน้าที่ \"หักล้างหรือลดน้ำหนัก (Weaken)\" ข้ออ้างข้างต้นได้รุนแรงที่สุด",
        "stimulus": None,
        "difficulty": "medium",
        "explanation": "ข้อที่หักล้างอย่างรุนแรงต้องแสดงให้เห็นผลเสียร้ายแรงที่มากกว่าค่าเช่าที่ประหยัดได้: \"การสื่อสารทางไกลทำให้ความร่วมมือเชิงนวัตกรรมและการสร้างสรรค์ลดลง ส่งผลให้บริษัทสูญเสียรายได้จากผลิตภัณฑ์ใหม่ไปมากกว่าค่าเช่าที่ประหยัดได้ถึงสิบเท่า\"",
        "trap_analysis": "การหักล้างที่ดีที่สุดต้องพิสูจน์ว่าผลประโยชน์ที่อ้าง (ประหยัดค่าเช่า) เกิดผลเสียที่ใหญ่หลวงกว่าจนไม่คุ้มค่า",
        "options": [
            {"label": "1", "content": "การทำงานทางไกลส่งผลให้การประสานงานคิดค้นนวัตกรรมล้มเหลว จนบริษัทสูญเสียรายได้มากกว่าค่าเช่าที่ประหยัดได้หลายเท่า", "is_correct": 1},
            {"label": "2", "content": "พนักงานบางคนชอบนั่งทำงานในร้านกาแฟมากกว่าห้องนอน", "is_correct": 0},
            {"label": "3", "content": "โปรแกรมประชุมออนไลน์มีการอัปเดตระบบความปลอดภัยใหม่ทุกเดือน", "is_correct": 0},
            {"label": "4", "content": "ค่าโดยสารรถไฟฟ้าปรับตัวสูงขึ้นเล็กน้อยในไตรมาสที่ผ่านมา", "is_correct": 0},
            {"label": "5", "content": "พนักงานสามารถประหยัดเวลาการเดินทางบนท้องถนนได้วันละ 1-2 ชั่วโมง", "is_correct": 0}
        ]
    },
    {
        "id": "q_tgat2_s2_79",
        "blueprint_id": "tgat2_reason_analytical",
        "question_text": "ข้อความ: \"นาย ก อ้างว่าโครงการสร้างสวนสาธารณะแห่งนี้ไร้ประโยชน์และควรถูกยกเลิก เพราะผู้ริเริ่มโครงการนี้เคยถูกดำเนินคดีข้อหาจอดรถในที่ห้ามจอดเมื่อห้าปีก่อน\"\n\nการให้เหตุผลของ นาย ก มี \"ข้อบกพร่องทางตรรกะ (Logical Fallacy)\" ตรงกับข้อใด",
        "stimulus": None,
        "difficulty": "medium",
        "explanation": "การโจมตีตัวบุคคล (Ad Hominem) คือการปฏิเสธข้อเสนอหรือโครงการโดยการไปโจมตีพฤติกรรมส่วนตัวหรือประวัติในอดีตของผู้เสนอ แทนที่จะพิจารณาเนื้อหาข้อดีข้อเสียของโครงการนั้นจริง ๆ",
        "trap_analysis": "Ad Hominem = การนำความประพฤติส่วนตัวที่ไม่เกี่ยวข้องมาหักล้างข้อเสนอที่มีเหตุผล",
        "options": [
            {"label": "1", "content": "การโจมตีตัวบุคคลโดยไม่พิจารณาเนื้อหาของข้อเสนอ (Ad Hominem)", "is_correct": 1},
            {"label": "2", "content": "การอ้างคนส่วนมากว่าถูกต้องเสมอ (Bandwagon Fallacy)", "is_correct": 0},
            {"label": "3", "content": "การสรุปเหมารวมอย่างรีบด่วน (Hasty Generalization)", "is_correct": 0},
            {"label": "4", "content": "การวนเป็นวงกลม (Circular Reasoning)", "is_correct": 0},
            {"label": "5", "content": "การสร้างหุ่นไล่กา (Straw Man Fallacy)", "is_correct": 0}
        ]
    },
    {
        "id": "q_tgat2_s2_80",
        "blueprint_id": "tgat2_reason_analytical",
        "question_text": "ข้อความ: \"ผลการสำรวจพบว่าเมืองที่มีจำนวนเสาไฟส่องสว่างบนท้องถนนมาก จะมีอัตราการเกิดอุบัติเหตุบนท้องถนนสูงกว่าเมืองที่มีเสาไฟน้อย นักวิจัยจึงสรุปว่า การติดตั้งเสาไฟส่องสว่างคือสาเหตุที่ทำให้เกิดอุบัติเหตุบนท้องถนนเพิ่มขึ้น\"\n\nข้อบกพร่องที่ร้ายแรงที่สุดของข้อสรุปข้างต้นคืออะไร",
        "stimulus": None,
        "difficulty": "hard",
        "explanation": "การด่วนสรุปความเป็นเหตุเป็นผลจากความสัมพันธ์ของข้อมูล (Correlation does not imply causation): เมืองที่มีเสาไฟมากมักเป็นเมืองใหญ่ที่มีปริมาณการจราจรและประชากรหนาแน่นมาก ซึ่งปริมาณรถที่มากต่างหากคือสาเหตุแท้จริงของอุบัติเหตุ ไม่ใช่ตัวเสาไฟ",
        "trap_analysis": "สับสนระหว่าง Correlation (ความสัมพันธ์ร่วม) กับ Causation (ความเป็นเหตุเป็นผล) โดยละเลยตัวแปรกวน (Confounding variable)",
        "options": [
            {"label": "1", "content": "สับสนระหว่างความสัมพันธ์ร่วมกับความเป็นเหตุเป็นผล โดยละเลยปัจจัยเรื่องความหนาแน่นของการจราจร", "is_correct": 1},
            {"label": "2", "content": "ใช้ตัวอย่างในการสำรวจน้อยเกินไป", "is_correct": 0},
            {"label": "3", "content": "เสาไฟฟ้าราคาแพงเกินกว่าจะนำมาวิจัย", "is_correct": 0},
            {"label": "4", "content": "ไม่ได้ทำการทดลองในเวลากลางวัน", "is_correct": 0},
            {"label": "5", "content": "นักวิจัยไม่ได้จบการศึกษาด้านวิศวกรรมส่องสว่าง", "is_correct": 0}
        ]
    }
]

for q in series_data + analogy_data + deduction_data + analytical_data:
    q["subject_id"] = "tgat2"
    q["set_number"] = 2
    questions.append(q)

print(f"Total Set 2 Questions compiled: {len(questions)}")

# Verify blueprint counts
bp_counts = {}
for q in questions:
    bp = q["blueprint_id"]
    bp_counts[bp] = bp_counts.get(bp, 0) + 1

print("\nBlueprint distribution:")
for bp, cnt in sorted(bp_counts.items()):
    print(f"  {bp}: {cnt}")

assert len(questions) == 80, f"Expected 80 questions, got {len(questions)}"
for bp, cnt in bp_counts.items():
    assert cnt == 5, f"Blueprint {bp} has {cnt} questions, expected 5"

# Output JavaScript
js_content = """/**
 * TGAT2 SET 2: Analytical Precision, Smart Tech & Scientific Logic
 * 80 Questions strictly calibrated to Official MyTCAS Blueprint (16 subtopics x 5 questions)
 */

const set2Questions = """ + json.dumps(questions, ensure_ascii=False, indent=4) + """;

module.exports = { set2Questions };
"""

output_path = os.path.abspath("database/generators/tgat2/set2_logic.js")
os.makedirs(os.path.dirname(output_path), exist_ok=True)
with open(output_path, "w", encoding="utf-8") as f:
    f.write(js_content)

print(f"✅ Successfully written Set 2 to {output_path}")
