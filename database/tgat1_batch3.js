const { insertQuestionsBatch } = require('./add_questions_helper');

const batch3Questions = [
    {
        id: 'q_tgat1_27',
        subject_id: 'tgat1',
        blueprint_id: 'tgat1_rd_tc',
        stimulus: 'Traditional incandescent bulbs generate light primarily as a byproduct of thermal radiation, wasting over ninety percent of consumed electricity as ambient heat. Light-emitting diodes (LEDs), (1)_______, convert electrons directly into photons through semiconductor electroluminescence, thereby drastically diminishing energy consumption and operational carbon footprints.',
        question_text: 'Choose the most appropriate transition word to complete blank (1):',
        difficulty: 'medium',
        explanation: 'ประโยคแรกกล่าวถึงหลอดไส้แบบดั้งเดิมที่สิ้นเปลืองพลังงาน ประโยคถัดมากล่าวถึงหลอด LED ที่แปลงพลังงานเป็นแสงโดยตรงอย่างมีประสิทธิภาพ เป็นการเปรียบเทียบความแตกต่างตรงกันข้าม จึงต้องใช้ตัวเชื่อมแสดงความขัดแย้ง: "by contrast" (ในทางตรงกันข้าม)',
        trap_analysis: 'คำว่า "consequently" (ดังนั้น/เป็นผลสืบเนื่อง) หรือ "furthermore" (ยิ่งไปกว่านั้น) ใช้เชื่อมประโยคที่คล้อยตามกัน ไม่ใช่ประโยคที่เปรียบเทียบสองสิ่งที่ตรงข้ามกัน',
        options: [
            { label: '1', content: 'furthermore', is_correct: 0 },
            { label: '2', content: 'by contrast', is_correct: 1 },
            { label: '3', content: 'consequently', is_correct: 0 },
            { label: '4', content: 'for instance', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_28',
        subject_id: 'tgat1',
        blueprint_id: 'tgat1_rd_tc',
        stimulus: 'Recent clinical trials evaluating mindfulness-based stress reduction (MBSR) protocols among healthcare workers have revealed tangible biomarker changes. Cortisol levels sampled upon waking dropped precipitously in the intervention group, (1)_______ that consistent meditation practices exert genuine physiological impacts beyond mere subjective feelings of tranquility.',
        question_text: 'Which participle form correctly completes the dependent clause in blank (1)?',
        difficulty: 'medium',
        explanation: 'โครงสร้างประโยคหลักเสร็จสมบูรณ์แล้ว (Cortisol levels... dropped precipitously) ส่วนท้ายที่ตามหลังเครื่องหมาย comma ทำหน้าที่เป็น Present Participle (-ing) แสดงผลลัพธ์หรือขยายความประโยคหลัก: "demonstrating that..." (แสดงให้เห็นว่า...)',
        trap_analysis: 'ระวังการใช้ "demonstrated" (อาจทำให้สับสนเป็นกริยาแท้อดีตซ้อนกันโดยไม่มีตัวเชื่อม) หรือ "demonstrates" (ขาดคำเชื่อมประโยค)',
        options: [
            { label: '1', content: 'demonstrates', is_correct: 0 },
            { label: '2', content: 'demonstrating', is_correct: 1 },
            { label: '3', content: 'demonstrated', is_correct: 0 },
            { label: '4', content: 'to be demonstrated', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_29',
        subject_id: 'tgat1',
        blueprint_id: 'tgat1_rd_tc',
        stimulus: 'In the realm of international arbitration, commercial contracts frequently stipulate that any dispute arising from cross-border intellectual property licensing must be mediated before a neutral tribunal. Such clauses are specifically designed to (1)_______ prolonged and ruinously expensive litigation across multiple competing legal jurisdictions.',
        question_text: 'Choose the most precise academic verb for blank (1):',
        difficulty: 'hard',
        explanation: 'คำว่า "circumvent" หรือ "avert" แปลว่า หลีกเลี่ยง / ป้องกันไม่ให้เกิด (เหตุการณ์ร้ายแรง เช่น การฟ้องร้องที่กินเวลายืดเยื้อและสิ้นเปลืองค่าใช้จ่ายมหาศาล) เป็นคำศัพท์ทางการระดับสูงที่พบบ่อยในข้อสอบ TGAT และ A-Level',
        trap_analysis: 'คำว่า "instigate" (ยุยงให้เกิด) และ "provoke" (ยั่วยุ) มีความหมายตรงกันข้าม ส่วน "undergo" แปลว่า ต้องเผชิญ/ผ่านพบ ซึ่งขัดแย้งกับเจตนาของข้อสัญญาที่ต้องการป้องกันการฟ้องร้อง',
        options: [
            { label: '1', content: 'instigate', is_correct: 0 },
            { label: '2', content: 'avert', is_correct: 1 },
            { label: '3', content: 'undergo', is_correct: 0 },
            { label: '4', content: 'perpetuate', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_30',
        subject_id: 'tgat1',
        blueprint_id: 'tgat1_rd_rc',
        stimulus: 'MEMORANDUM\nTo: All Department Heads & Lab Personnel\nFrom: Environmental Health & Safety Office\nDate: October 14, 2026\nSubject: Mandatory Chemical Inventory Audit\n\nPlease be advised that all research laboratories must complete their annualized chemical inventory reconciliation by Friday, October 24, at 5:00 PM. Unlabeled reagent containers or outdated organic solvents must be flagged for hazardous waste disposal. Laboratories failing to submit their verified manifests by the deadline will face temporary suspension of procurement privileges.',
        question_text: 'According to the memorandum, what consequence will laboratories incur if they miss the audit submission deadline?',
        difficulty: 'easy',
        explanation: 'จากข้อความในบรรทัดสุดท้าย: "Laboratories failing to submit their verified manifests by the deadline will face temporary suspension of procurement privileges." (ห้องปฏิบัติการที่ส่งไม่ทันจะถูกระงับสิทธิการสั่งซื้อสารเคมี/อุปกรณ์ชั่วคราว)',
        trap_analysis: 'ระวังตัวเลือกที่เกินจริง เช่น "ถูกปิดถาวร" หรือ "ถูกปรับเงินส่วนตัว" ซึ่งไม่มีระบุในประกาศ',
        options: [
            { label: '1', content: 'Their research grants will be cancelled permanently.', is_correct: 0 },
            { label: '2', content: 'Their ability to purchase new laboratory supplies will be temporarily suspended.', is_correct: 1 },
            { label: '3', content: 'All personnel will be required to evacuate the facility immediately.', is_correct: 0 },
            { label: '4', content: 'They will be fined two thousand dollars per day.', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_31',
        subject_id: 'tgat1',
        blueprint_id: 'tgat1_rd_rc',
        stimulus: 'MEMORANDUM\nTo: All Department Heads & Lab Personnel\nFrom: Environmental Health & Safety Office\nDate: October 14, 2026\nSubject: Mandatory Chemical Inventory Audit\n\nPlease be advised that all research laboratories must complete their annualized chemical inventory reconciliation by Friday, October 24, at 5:00 PM. Unlabeled reagent containers or outdated organic solvents must be flagged for hazardous waste disposal. Laboratories failing to submit their verified manifests by the deadline will face temporary suspension of procurement privileges.',
        question_text: 'What is the closest synonym of "reconciliation" in this inventory audit context?',
        difficulty: 'medium',
        explanation: 'ในบริบทการตรวจสอบบัญชีสต็อกสินค้าหรือคลังสารเคมี (Inventory audit) คำว่า "reconciliation" หมายถึง การตรวจนับและเทียบยอดให้ตรงกัน (verification / cross-checking against records) ไม่ใช่การไกล่เกลี่ยความขัดแย้งระหว่างบุคคล',
        trap_analysis: 'จุดหลอกสำคัญ: "reconciliation" มีความหมายทั่วไปคือการคืนดีกันหลังจากทะเลาะกัน แต่ในบริบทธุรกิจและบัญชีหมายถึง "การตรวจสอบความถูกต้องของยอดคงเหลือ"',
        options: [
            { label: '1', content: 'peacemaking between rivals', is_correct: 0 },
            { label: '2', content: 'verification and balancing of records', is_correct: 1 },
            { label: '3', content: 'speedy disposal of contaminated goods', is_correct: 0 },
            { label: '4', content: 'unauthorized duplication of equipment', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_32',
        subject_id: 'tgat1',
        blueprint_id: 'tgat1_rd_rc',
        stimulus: 'PUBLIC TRANSIT NOTICE\nEffective November 1st, City Metro will inaugurate contactless tap-to-pay terminals across all light rail turnstiles. Commuters utilizing standard credit cards or smartphone digital wallets will automatically receive daily fare capping, guaranteeing that total transit charges never exceed $7.50 in a single calendar day, regardless of the number of transfers.',
        question_text: 'What is the primary customer benefit of the "fare capping" feature mentioned in the notice?',
        difficulty: 'easy',
        explanation: 'เนื้อหาระบุว่า: "guaranteeing that total transit charges never exceed $7.50 in a single calendar day, regardless of the number of transfers." หมายความว่าผู้โดยสารจะจ่ายค่าเดินทางไม่เกินเพดาน 7.50 ดอลลาร์ต่อวัน ไม่ว่าจะต่อรถกี่รอบก็ตาม',
        trap_analysis: 'ระวังตัวเลือกที่บอกว่า "เดินทางฟรีตลอดไป" หรือ "ต้องซื้อบัตรพิเศษเพิ่ม" ซึ่งตรงกันข้ามกับข้อความที่บอกว่าใช้บัตรเครดิตหรือสมาร์ตโฟนทั่วไปได้เลย',
        options: [
            { label: '1', content: 'Riders can travel for free during the entire weekend.', is_correct: 0 },
            { label: '2', content: 'Passengers will not be billed more than $7.50 per day no matter how often they ride.', is_correct: 1 },
            { label: '3', content: 'Users must purchase a dedicated plastic Metro card at the ticket booth.', is_correct: 0 },
            { label: '4', content: 'Fares will double during morning peak transit hours.', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_33',
        subject_id: 'tgat1',
        blueprint_id: 'tgat1_rd_tc',
        stimulus: 'In dry arid climates, indigenous desert succulents employ Crassulacean Acid Metabolism (CAM) photosynthesis. Unlike typical plants that open their stomata during broad daylight, CAM plants absorb carbon dioxide exclusively at night, (1)_______ water loss through evaporation during blazing midday temperatures.',
        question_text: 'Select the verb phrase that correctly fills blank (1):',
        difficulty: 'medium',
        explanation: 'พืช CAM เปิดปากใบตอนกลางคืนเพื่อ "ลดการสูญเสียน้ำให้น้อยที่สุด" กริยา "minimizing" (Present Participle แสดงผลลัพธ์ของการกระทำ) สอดคล้องกับไวยากรณ์และความหมายทางชีววิทยา',
        trap_analysis: 'คำว่า "exacerbating" แปลว่า ทำให้ทรุดหนัก/แย่ลง และ "accelerating" แปลว่า เร่งให้เร็วขึ้น ซึ่งตรงข้ามกับกลไกการเอาชีวิตรอดของพืชทะเลทราย',
        options: [
            { label: '1', content: 'minimizing', is_correct: 1 },
            { label: '2', content: 'exacerbating', is_correct: 0 },
            { label: '3', content: 'accelerating', is_correct: 0 },
            { label: '4', content: 'disregarding', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_34',
        subject_id: 'tgat1',
        blueprint_id: 'tgat1_rd_rc',
        stimulus: 'JOB OPENING: SUSTAINABILITY DATA ANALYST\nEcoMetrics Global is seeking an experienced analyst to quantify supply chain greenhouse gas emissions across Tier 1 and Tier 2 manufacturing partners. Candidates must possess proficiency in SQL, Python data libraries, and familiarity with GHG Protocol corporate reporting standards. A minimum of three years in carbon accounting or environmental compliance auditing is required.',
        question_text: 'Which candidate profile most closely meets the stated prerequisites for the position?',
        difficulty: 'medium',
        explanation: 'คุณสมบัติที่ระบุในประกาศ: ความชำนาญ SQL/Python, คุ้นเคยกับ GHG Protocol, และมีประสบการณ์ carbon accounting / audit อย่างน้อย 3 ปี ตัวเลือกที่ระบุประสบการณ์วิเคราะห์คาร์บอน 4 ปีพร้อมทักษะไวยากรณ์โค้ดจึงตรงที่สุด',
        trap_analysis: 'ระวังตัวเลือกที่มีทักษะการเขียนโปรแกรมสูงแต่ขาดประสบการณ์ด้าน Carbon accounting/GHG protocol หรือมีประสบการณ์ไม่ถึง 3 ปี',
        options: [
            { label: '1', content: 'A recent high school graduate with passion for social media environmental activism.', is_correct: 0 },
            { label: '2', content: 'An analyst with four years of corporate carbon auditing experience fluent in SQL and Python.', is_correct: 1 },
            { label: '3', content: 'A graphic designer who specializes in drawing recycled product logos.', is_correct: 0 },
            { label: '4', content: 'A mechanical engineer with ten years of diesel engine repair experience but no coding background.', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_35',
        subject_id: 'tgat1',
        blueprint_id: 'tgat1_rd_tc',
        stimulus: 'The transition from fossil-fueled vehicles to electrification requires unprecedented volumes of lithium, nickel, and cobalt. Environmental geologists caution that unless battery recycling infrastructures are aggressively expanded, the ecological devastation wrought by terrestrial mining could (1)_______ the very environmental gains promised by zero-emission transport.',
        question_text: 'Choose the best verb to complete blank (1):',
        difficulty: 'hard',
        explanation: 'นักธรณีวิทยาสิ่งแวดล้อมเตือนว่า การทำเหมืองแร่อาจ "ทำลายล้าง / หักล้าง / บดบัง" ผลประโยชน์ด้านสิ่งแวดล้อมที่ได้จากรถยนต์ไฟฟ้า คำว่า "undermine" (บ่อนทำลาย / ลดทอนคุณค่า) หรือ "negate" (ลบล้าง) เหมาะสมที่สุดในบริบทนี้',
        trap_analysis: 'คำว่า "reinforce" (เสริมสร้าง) หรือ "augment" (เพิ่มพูน) มีความหมายตรงกันข้ามกับคำเตือนเรื่องความเสียหายทางระบบนิเวศ (ecological devastation)',
        options: [
            { label: '1', content: 'undermine', is_correct: 1 },
            { label: '2', content: 'reinforce', is_correct: 0 },
            { label: '3', content: 'augment', is_correct: 0 },
            { label: '4', content: 'substantiate', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_36',
        subject_id: 'tgat1',
        blueprint_id: 'tgat1_rd_rc',
        stimulus: 'PRODUCT RECALL ADVISORY\nBrand: NutriPure Baby Food Pouches\nBatch Codes: NP-2026-08A through NP-2026-08F\nReason: Packaging integrity defect causing potential seal compromise and premature spoilage.\nRemedy: Consumers should discontinue use immediately and return pouches to any authorized retailer for an unconditional 100% refund or exchange voucher. No proof of receipt is required.',
        question_text: 'What should consumers who purchased the recalled product do according to the advisory?',
        difficulty: 'easy',
        explanation: 'ประกาศระบุชัดเจน: "Consumers should discontinue use immediately and return pouches to any authorized retailer for an unconditional 100% refund or exchange voucher. No proof of receipt is required." (หยุดใช้ทันทีและนำไปคืนที่ร้านค้าเพื่อรับเงินคืนเต็มจำนวนหรือบัตรกำนัล โดยไม่ต้องใช้ใบเสร็จ)',
        trap_analysis: 'ระวังตัวเลือกที่บอกว่า "ต้องหาใบเสร็จให้เจอก่อนจึงจะคืนได้" หรือ "ต้มก่อนให้เด็กกินได้" ซึ่งขัดกับคำสั่งของประกาศ',
        options: [
            { label: '1', content: 'Boil the food pouches thoroughly before feeding children.', is_correct: 0 },
            { label: '2', content: 'Stop feeding the pouches to infants immediately and bring them back for a full refund.', is_correct: 1 },
            { label: '3', content: 'Mail the defective pouches directly to the foreign manufacturer at own expense.', is_correct: 0 },
            { label: '4', content: 'Keep using the food unless the packaging has changed color.', is_correct: 0 }
        ]
    }
];

insertQuestionsBatch(batch3Questions);
