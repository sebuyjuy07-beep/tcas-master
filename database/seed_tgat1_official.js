// Official TGAT1 (รหัส 91 การสื่อสารภาษาอังกฤษ) Question Bank Seeder
// Blueprint: MyTCAS Official 100% Calibrated (60 questions, 100 score, 60 minutes)
// Generated automatically from authentic curriculum specifications

const db = require('./db');

console.log('🗣️ Seeding Official MyTCAS TGAT1 (รหัส 91 การสื่อสารภาษาอังกฤษ)...');

const tgat1Blueprints = [
  {
    "id": "tgat1_spk_qr",
    "subject_id": "tgat1",
    "domain_name": "ทักษะการพูด (Speaking Skill)",
    "subtopic_name": "1.1 การถาม–ตอบ (Question-Response)",
    "description": "คำถาม-คำตอบในสถานการณ์จริง วัดการตอบสนองที่ถูกต้องตามเจตนาการสื่อสารและโครงสร้างไวยากรณ์",
    "target_questions": 10,
    "score_weight": 16.67,
    "order_index": 1
  },
  {
    "id": "tgat1_spk_sc",
    "subject_id": "tgat1",
    "domain_name": "ทักษะการพูด (Speaking Skill)",
    "subtopic_name": "1.2 เติมบทสนทนาแบบสั้น (Short Conversations)",
    "description": "บทสนทนาสั้น 3 บทสนทนา (3-4 ข้อต่อบทสนทนา) ในบริบทชีวิตประจำวัน การซื้อสินค้า และการศึกษา",
    "target_questions": 10,
    "score_weight": 16.67,
    "order_index": 2
  },
  {
    "id": "tgat1_spk_lc",
    "subject_id": "tgat1",
    "domain_name": "ทักษะการพูด (Speaking Skill)",
    "subtopic_name": "1.3 เติมบทสนทนาแบบยาว (Long Conversations)",
    "description": "บทสนทนายาว 2 บทสนทนา (บทสนทนาละ 5 ข้อ) ในสถานการณ์การทำงาน การสัมภาษณ์งาน และการเดินทางระหว่างประเทศ",
    "target_questions": 10,
    "score_weight": 16.67,
    "order_index": 3
  },
  {
    "id": "tgat1_rd_tc",
    "subject_id": "tgat1",
    "domain_name": "ทักษะการอ่าน (Reading Skill)",
    "subtopic_name": "2.1 เติมข้อความในเนื้อเรื่องให้สมบูรณ์ (Text Completion)",
    "description": "บทความเติมคำ 2 บทความ (7-8 ข้อต่อบทความ) วัดคำศัพท์ตามบริบท โครงสร้างไวยากรณ์ และความสอดคล้องของเนื้อเรื่อง",
    "target_questions": 15,
    "score_weight": 25.0,
    "order_index": 4
  },
  {
    "id": "tgat1_rd_rc",
    "subject_id": "tgat1",
    "domain_name": "ทักษะการอ่าน (Reading Skill)",
    "subtopic_name": "2.2 อ่านเพื่อจับใจความ (Reading Comprehension)",
    "description": "บทความอ่านจับใจความ 3 บทความ (บทความละ 5 ข้อ) ข่าวประชาสัมพันธ์ สารคดีวิทยาศาสตร์ และสิ่งแวดล้อม",
    "target_questions": 15,
    "score_weight": 25.0,
    "order_index": 5
  }
];

const tgat1Questions = [
  {
    "id": "q_tgat1_qr01",
    "subject_id": "tgat1",
    "blueprint_id": "tgat1_spk_qr",
    "stimulus": "Q: How many hours do you study every day?\nR: ____________________________________",
    "question_text": "Choose the most appropriate response to complete the dialogue.",
    "difficulty": "easy",
    "explanation": "คำถามถามว่า \"คุณอ่านหนังสือวันละกี่ชั่วโมง?\" (How many hours) คำตอบที่ตรงคำถามเชิงปริมาณเวลาคือ \"Eight.\" (8 ชั่วโมง) ส่วน Sometimes ตอบ How often, Until six o'clock ตอบ Until what time",
    "trap_analysis": "ระวังสับสนกับ How often (บ่อยแค่ไหน) ซึ่งจะตอบ Sometimes หรือ Every day",
    "options": [
      {
        "label": "1",
        "content": "Eight.",
        "is_correct": 1
      },
      {
        "label": "2",
        "content": "Sometimes.",
        "is_correct": 0
      },
      {
        "label": "3",
        "content": "Until six o’clock.",
        "is_correct": 0
      },
      {
        "label": "4",
        "content": "Yes, every day.",
        "is_correct": 0
      }
    ]
  },
  {
    "id": "q_tgat1_qr02",
    "subject_id": "tgat1",
    "blueprint_id": "tgat1_spk_qr",
    "stimulus": "Q: Would you mind opening the window? It’s getting stuffy in here.\nR: ____________________________________",
    "question_text": "Choose the most appropriate response to complete the dialogue.",
    "difficulty": "medium",
    "explanation": "โครงสร้าง \"Would you mind...?\" (คุณจะรังเกียจไหมถ้า...) หากยินดีทำให้ ต้องตอบปฏิเสธความรังเกียจ เช่น \"Not at all.\" (ไม่รังเกียจเลย/ยินดีครับ) แล้วจึงเปิดหน้าต่าง",
    "trap_analysis": "จุดลวงยอดฮิต: ผู้เรียนมักตอบ \"Yes, of course.\" ซึ่งในภาษาอังกฤษแปลว่า \"ใช่ ฉันรังเกียจมาก (ไม่เปิดให้)\"",
    "options": [
      {
        "label": "1",
        "content": "Yes, of course.",
        "is_correct": 0
      },
      {
        "label": "2",
        "content": "Not at all. I’ll do it right away.",
        "is_correct": 1
      },
      {
        "label": "3",
        "content": "Never mind about the weather.",
        "is_correct": 0
      },
      {
        "label": "4",
        "content": "Yes, I would love to close it.",
        "is_correct": 0
      }
    ]
  },
  {
    "id": "q_tgat1_qr03",
    "subject_id": "tgat1",
    "blueprint_id": "tgat1_spk_qr",
    "stimulus": "Q: Could you tell me how to get to the nearest MRT station?\nR: ____________________________________",
    "question_text": "Choose the most appropriate response to complete the dialogue.",
    "difficulty": "easy",
    "explanation": "คำถามเป็นการถามทาง (Asking for directions) คำตอบที่ถูกต้องคือการบอกทิศทาง \"Walk straight ahead for two blocks; it's on your right.\"",
    "trap_analysis": "ตัวเลือกอื่นเป็นการตอบรับหรือบอกเวลาซึ่งไม่ตรงกับคำถามที่ถามวิธีเดินทาง (How to get to...)",
    "options": [
      {
        "label": "1",
        "content": "It departs every fifteen minutes.",
        "is_correct": 0
      },
      {
        "label": "2",
        "content": "Walk straight ahead for two blocks; it’s on your right.",
        "is_correct": 1
      },
      {
        "label": "3",
        "content": "I usually take the commuter train.",
        "is_correct": 0
      },
      {
        "label": "4",
        "content": "Yes, the ticket fare is fifty baht.",
        "is_correct": 0
      }
    ]
  },
  {
    "id": "q_tgat1_qr04",
    "subject_id": "tgat1",
    "blueprint_id": "tgat1_spk_qr",
    "stimulus": "Q: How do you like your new internship position at the tech firm?\nR: ____________________________________",
    "question_text": "Choose the most appropriate response to complete the dialogue.",
    "difficulty": "medium",
    "explanation": "\"How do you like...?\" เป็นสำนวนถามความคิดเห็นหรือความรู้สึก (What is your opinion of...?) ไม่ใช่ถามว่าชอบแบบไหน คำตอบที่เหมาะสมคือการบอกความรู้สึกต่องาน \"It’s challenging, but I’m learning a lot.\"",
    "trap_analysis": "ระวังคิดว่าถามความชอบอาหารหรือกาแฟ (เช่น I like it hot/cold) หรือตอบว่า Yes, I like it ซึ่งไม่เป็นธรรมชาติ",
    "options": [
      {
        "label": "1",
        "content": "I like it with milk and sugar.",
        "is_correct": 0
      },
      {
        "label": "2",
        "content": "It’s challenging, but I’m learning a lot.",
        "is_correct": 1
      },
      {
        "label": "3",
        "content": "I applied there two months ago.",
        "is_correct": 0
      },
      {
        "label": "4",
        "content": "By commuting on the electric bus.",
        "is_correct": 0
      }
    ]
  },
  {
    "id": "q_tgat1_qr05",
    "subject_id": "tgat1",
    "blueprint_id": "tgat1_spk_qr",
    "stimulus": "Q: I’m terribly sorry for misplacing your presentation slides.\nR: ____________________________________",
    "question_text": "Choose the most appropriate response to complete the dialogue.",
    "difficulty": "easy",
    "explanation": "เมื่อมีคนกล่าวขอโทษอย่างจริงจัง การตอบรับอย่างสุภาพและผ่อนคลายสถานการณ์ (Accepting an apology) คือ \"Don't worry about it; I have a backup copy on my drive.\"",
    "trap_analysis": "\"You're welcome\" ใช้ตอบรับคำขอบคุณ ไม่ใช่คำขอโทษ",
    "options": [
      {
        "label": "1",
        "content": "You’re welcome anytime.",
        "is_correct": 0
      },
      {
        "label": "2",
        "content": "Don’t worry about it; I have a backup copy on my drive.",
        "is_correct": 1
      },
      {
        "label": "3",
        "content": "Yes, please do it immediately.",
        "is_correct": 0
      },
      {
        "label": "4",
        "content": "Congratulations on the presentation.",
        "is_correct": 0
      }
    ]
  },
  {
    "id": "q_tgat1_qr06",
    "subject_id": "tgat1",
    "blueprint_id": "tgat1_spk_qr",
    "stimulus": "Q: Why hasn’t the financial report been finalized yet?\nR: ____________________________________",
    "question_text": "Choose the most appropriate response to complete the dialogue.",
    "difficulty": "medium",
    "explanation": "คำถามขึ้นต้นด้วย Why (ทำไม) เพื่อถามหาเหตุผลที่รายงานยังไม่เสร็จ คำตอบที่ให้เหตุผลตรงประเด็นคือ \"We’re still waiting for the auditing team's figures.\" (เรายังคงรอตัวเลขจากทีมตรวจสอบบัญชีอยู่)",
    "trap_analysis": "ตัวเลือกที่มี Because บางครั้งอาจเป็นข้อความไร้สาระ ในข้อสอบจริงมักละ Because แล้วตอบด้วยประโยคบอกเล่าที่เป็นเหตุผลโดยตรง",
    "options": [
      {
        "label": "1",
        "content": "We’re still waiting for the auditing team’s figures.",
        "is_correct": 1
      },
      {
        "label": "2",
        "content": "Yes, I will read it tomorrow morning.",
        "is_correct": 0
      },
      {
        "label": "3",
        "content": "On the top shelf next to the printer.",
        "is_correct": 0
      },
      {
        "label": "4",
        "content": "About twenty pages in total.",
        "is_correct": 0
      }
    ]
  },
  {
    "id": "q_tgat1_qr07",
    "subject_id": "tgat1",
    "blueprint_id": "tgat1_spk_qr",
    "stimulus": "Q: Should we submit our college applications online or by mail?\nR: ____________________________________",
    "question_text": "Choose the most appropriate response to complete the dialogue.",
    "difficulty": "medium",
    "explanation": "คำถามแบบทางเลือก (Alternative question) \"A or B?\" คำตอบต้องเลือกสิ่งใดสิ่งหนึ่งหรือระบุเงื่อนไข เช่น \"The admission office prefers digital submission via their portal.\"",
    "trap_analysis": "คำถาม Alternative question ที่มี \"or\" จะไม่ตอบ \"Yes\" หรือ \"No\"",
    "options": [
      {
        "label": "1",
        "content": "Yes, I should submit it.",
        "is_correct": 0
      },
      {
        "label": "2",
        "content": "The admission office prefers digital submission via their portal.",
        "is_correct": 1
      },
      {
        "label": "3",
        "content": "No, I haven’t received the mail.",
        "is_correct": 0
      },
      {
        "label": "4",
        "content": "The campus is very beautiful.",
        "is_correct": 0
      }
    ]
  },
  {
    "id": "q_tgat1_qr08",
    "subject_id": "tgat1",
    "blueprint_id": "tgat1_spk_qr",
    "stimulus": "Q: I passed the first round of the scholarship interview!\nR: ____________________________________",
    "question_text": "Choose the most appropriate response to complete the dialogue.",
    "difficulty": "easy",
    "explanation": "เมื่อคู่สนทนาบอกข่าวดีว่าสอบสัมภาษณ์ผ่าน การแสดงความยินดี (Congratulating) คือ \"That's fantastic news! I knew all your preparation would pay off.\"",
    "trap_analysis": "\"Good luck\" ใช้ก่อนการสอบ แต่เมื่อผ่านแล้วต้องแสดงความยินดี",
    "options": [
      {
        "label": "1",
        "content": "Better luck next time.",
        "is_correct": 0
      },
      {
        "label": "2",
        "content": "That’s fantastic news! I knew all your preparation would pay off.",
        "is_correct": 1
      },
      {
        "label": "3",
        "content": "I apologize for being late.",
        "is_correct": 0
      },
      {
        "label": "4",
        "content": "You ought to reschedule it.",
        "is_correct": 0
      }
    ]
  },
  {
    "id": "q_tgat1_qr09",
    "subject_id": "tgat1",
    "blueprint_id": "tgat1_spk_qr",
    "stimulus": "Q: Have you had a chance to look over the revised budget proposal?\nR: ____________________________________",
    "question_text": "Choose the most appropriate response to complete the dialogue.",
    "difficulty": "medium",
    "explanation": "คำถาม Present Perfect \"Have you had a chance to...?\" (คุณพอมีโอกาสได้ดู...หรือยัง) คำตอบที่สอดคล้องคือ \"Not yet, but I have scheduled time to review it this afternoon.\"",
    "trap_analysis": "\"Yes, I like the price\" ตอบไม่ตรงคำถามเรื่องการตรวจดูเอกสารงบประมาณ",
    "options": [
      {
        "label": "1",
        "content": "Not yet, but I have scheduled time to review it this afternoon.",
        "is_correct": 1
      },
      {
        "label": "2",
        "content": "It cost more than three hundred dollars.",
        "is_correct": 0
      },
      {
        "label": "3",
        "content": "I don’t want to buy any books today.",
        "is_correct": 0
      },
      {
        "label": "4",
        "content": "Yes, we spent all of our budget yesterday.",
        "is_correct": 0
      }
    ]
  },
  {
    "id": "q_tgat1_qr10",
    "subject_id": "tgat1",
    "blueprint_id": "tgat1_spk_qr",
    "stimulus": "Q: What do you say we take a quick coffee break before the next session?\nR: ____________________________________",
    "question_text": "Choose the most appropriate response to complete the dialogue.",
    "difficulty": "medium",
    "explanation": "\"What do you say (that) we...?\" เป็นสำนวนการชักชวน (Making a suggestion) มีความหมายเดียวกับ \"How about we...?\" หรือ \"Why don't we...?\" คำตอบที่ตอบรับการชักชวนคือ \"Sounds like a plan; I could really use a cup.\"",
    "trap_analysis": "ระวังเข้าใจผิดว่าเป็นการถามคำศัพท์หรือการพูดคุยทั่วไป (What do you say)",
    "options": [
      {
        "label": "1",
        "content": "I said hello to the barista.",
        "is_correct": 0
      },
      {
        "label": "2",
        "content": "Sounds like a plan; I could really use a cup.",
        "is_correct": 1
      },
      {
        "label": "3",
        "content": "The conference has five sessions.",
        "is_correct": 0
      },
      {
        "label": "4",
        "content": "Coffee is grown in tropical regions.",
        "is_correct": 0
      }
    ]
  },
  {
    "id": "q_tgat1_sc11",
    "subject_id": "tgat1",
    "blueprint_id": "tgat1_spk_sc",
    "stimulus": "At the office during lunch break:\n\nAlex: ____(1)____\nBrenda: Let’s have Chinese food.\nAlex: Do you want to try the new noodle restaurant on the corner?\nBrenda: Okay. ____(2)____\nAlex: Great, but we’d better hurry. It usually gets packed by noon.\nBrenda: Don't worry, ____(3)____",
    "question_text": "Choose the best option to complete blank (1).",
    "difficulty": "medium",
    "explanation": "จากคำตอบของ Brenda ที่ว่า \"Let's have Chinese food.\" (ไปทานอาหารจีนกันเถอะ) แสดงว่า Alex ต้องถามคำถามที่เปิดตัวเลือกอาหาร เช่น \"Would you rather have seafood or Chinese food?\" หรือถามว่าอยากทานอะไร",
    "trap_analysis": "หากถามว่า \"Do you like Chinese food?\" คำตอบจะเป็น Yes/No ไม่ใช่ \"Let's have...\"",
    "options": [
      {
        "label": "1",
        "content": "Do you like Chinese food?",
        "is_correct": 0
      },
      {
        "label": "2",
        "content": "What kind of food is available here?",
        "is_correct": 0
      },
      {
        "label": "3",
        "content": "What do you usually eat for lunch?",
        "is_correct": 0
      },
      {
        "label": "4",
        "content": "Would you rather have seafood or Chinese food?",
        "is_correct": 1
      }
    ]
  },
  {
    "id": "q_tgat1_sc12",
    "subject_id": "tgat1",
    "blueprint_id": "tgat1_spk_sc",
    "stimulus": "At the office during lunch break:\n\nAlex: [Would you rather have seafood or Chinese food?]\nBrenda: Let’s have Chinese food.\nAlex: Do you want to try the new noodle restaurant on the corner?\nBrenda: Okay. ____(2)____\nAlex: Great, but we’d better hurry. It usually gets packed by noon.\nBrenda: Don't worry, ____(3)____",
    "question_text": "Choose the best option to complete blank (2).",
    "difficulty": "easy",
    "explanation": "Brenda ตอบตกลงที่จะลองร้านใหม่ ดังนั้นประโยคที่สนับสนุนความคิดเห็นคือ \"That's a good idea.\" (นั่นเป็นความคิดที่ดีเลย)",
    "trap_analysis": "\"Don't worry\" หรือ \"We won't get lost\" ไม่เข้ากับบริบทการตอบรับร้านอาหาร",
    "options": [
      {
        "label": "1",
        "content": "Don’t worry.",
        "is_correct": 0
      },
      {
        "label": "2",
        "content": "That’s a good idea.",
        "is_correct": 1
      },
      {
        "label": "3",
        "content": "We won’t get lost.",
        "is_correct": 0
      },
      {
        "label": "4",
        "content": "Do you have the time?",
        "is_correct": 0
      }
    ]
  },
  {
    "id": "q_tgat1_sc13",
    "subject_id": "tgat1",
    "blueprint_id": "tgat1_spk_sc",
    "stimulus": "At the office during lunch break:\n\nAlex: [Would you rather have seafood or Chinese food?]\nBrenda: Let’s have Chinese food.\nAlex: Do you want to try the new noodle restaurant on the corner?\nBrenda: Okay. [That's a good idea.]\nAlex: Great, but we’d better hurry. It usually gets packed by noon.\nBrenda: Don't worry, ____(3)____",
    "question_text": "Choose the best option to complete blank (3).",
    "difficulty": "medium",
    "explanation": "Alex เตือนว่าคนจะแน่นตอนเที่ยง Brenda จึงปลอบว่าไม่ต้องกังวล \"I already reserved a table for us online.\" (ฉันจองโต๊ะออนไลน์ไว้ล่วงหน้าให้พวกเราแล้ว)",
    "trap_analysis": "ตัวเลือกอื่นไม่ช่วยคลี่คลายความกังวลเรื่องคนแน่นร้าน",
    "options": [
      {
        "label": "1",
        "content": "I already reserved a table for us online.",
        "is_correct": 1
      },
      {
        "label": "2",
        "content": "the noodles are very spicy.",
        "is_correct": 0
      },
      {
        "label": "3",
        "content": "I forgot my wallet at home.",
        "is_correct": 0
      },
      {
        "label": "4",
        "content": "the restaurant is closed on Mondays.",
        "is_correct": 0
      }
    ]
  },
  {
    "id": "q_tgat1_sc14",
    "subject_id": "tgat1",
    "blueprint_id": "tgat1_spk_sc",
    "stimulus": "At a customer service counter:\n\nCustomer: Excuse me, ____(4)____. I purchased these wireless headphones yesterday, but the left earbud doesn't produce any sound.\nClerk: I’m terribly sorry to hear that. Do you have your receipt with you?\nCustomer: Yes, right here.\nClerk: Thank you. Since it has been less than seven days, ____(5)____\nCustomer: A direct replacement would be wonderful. How long does the testing process take?\nClerk: ____(6)____. Just take a seat for a moment.",
    "question_text": "Choose the best option to complete blank (4).",
    "difficulty": "medium",
    "explanation": "ลูกค้ามาที่เคาน์เตอร์บริการเพื่อแจ้งปัญหาเกี่ยวกับสินค้า สำนวนสุภาพในการแจ้งเรื่องคือ \"I’d like to make an inquiry regarding an exchange.\" หรือ \"I have an issue with an item I bought.\"",
    "trap_analysis": "การเริ่มต้นด้วยการตะโกนหรือตำหนิพนักงานทันทีไม่สุภาพตามมาตรฐานข้อสอบภาษาอังกฤษ",
    "options": [
      {
        "label": "1",
        "content": "I have an issue with an item I bought.",
        "is_correct": 1
      },
      {
        "label": "2",
        "content": "you must give me all my money right now.",
        "is_correct": 0
      },
      {
        "label": "3",
        "content": "can you teach me how to listen to music?",
        "is_correct": 0
      },
      {
        "label": "4",
        "content": "where did you buy these headphones?",
        "is_correct": 0
      }
    ]
  },
  {
    "id": "q_tgat1_sc15",
    "subject_id": "tgat1",
    "blueprint_id": "tgat1_spk_sc",
    "stimulus": "At a customer service counter:\n\nCustomer: [I have an issue with an item I bought.]\nClerk: I’m terribly sorry to hear that. Do you have your receipt with you?\nCustomer: Yes, right here.\nClerk: Thank you. Since it has been less than seven days, ____(5)____\nCustomer: A direct replacement would be wonderful. How long does the testing process take?\nClerk: [____(6)____]. Just take a seat for a moment.",
    "question_text": "Choose the best option to complete blank (5).",
    "difficulty": "medium",
    "explanation": "พนักงานตรวจสอบใบเสร็จและแจ้งนโยบายว่า ซื้อไม่เกิน 7 วันสามารถเปลี่ยนเครื่องใหม่หรือขอเงินคืนได้: \"we can offer you an instant replacement or a full refund.\"",
    "trap_analysis": "สังเกตจากคำตอบถัดไปของลูกค้า \"A direct replacement would be wonderful\" ซึ่งแสดงว่าพนักงานต้องเสนอทางเลือกระหว่างเปลี่ยนของหรือคืนเงิน",
    "options": [
      {
        "label": "1",
        "content": "you will have to pay an extra penalty fee.",
        "is_correct": 0
      },
      {
        "label": "2",
        "content": "we can offer you an instant replacement or a full refund.",
        "is_correct": 1
      },
      {
        "label": "3",
        "content": "our store policy strictly prohibits any returns.",
        "is_correct": 0
      },
      {
        "label": "4",
        "content": "you must contact the overseas factory directly.",
        "is_correct": 0
      }
    ]
  },
  {
    "id": "q_tgat1_sc16",
    "subject_id": "tgat1",
    "blueprint_id": "tgat1_spk_sc",
    "stimulus": "At a customer service counter:\n\nCustomer: [I have an issue with an item I bought.]\nClerk: Thank you. Since it has been less than seven days, [we can offer you an instant replacement or a full refund.]\nCustomer: A direct replacement would be wonderful. How long does the testing process take?\nClerk: ____(6)____. Just take a seat for a moment.",
    "question_text": "Choose the best option to complete blank (6).",
    "difficulty": "easy",
    "explanation": "ลูกค้าถามว่าการทดสอบใช้เวลานานเท่าไร (How long...?) พนักงานจึงตอบระยะเวลาสั้น ๆ เช่น \"It will take only about five minutes.\" สอดคล้องกับ \"Just take a seat for a moment.\"",
    "trap_analysis": "ตัวเลือกอื่นไม่ได้บอกระยะเวลาตามที่ลูกค้าถาม",
    "options": [
      {
        "label": "1",
        "content": "It will take only about five minutes.",
        "is_correct": 1
      },
      {
        "label": "2",
        "content": "The headphones are black and silver.",
        "is_correct": 0
      },
      {
        "label": "3",
        "content": "We do not sell wireless devices here.",
        "is_correct": 0
      },
      {
        "label": "4",
        "content": "You need to show your passport.",
        "is_correct": 0
      }
    ]
  },
  {
    "id": "q_tgat1_sc17",
    "subject_id": "tgat1",
    "blueprint_id": "tgat1_spk_sc",
    "stimulus": "In a professor's office:\n\nStudent: Good afternoon, Professor Evans. ____(7)____\nProfessor: Of course, Liam. Come on in. What’s on your mind?\nStudent: I’m feeling overwhelmed by the term paper requirements. ____(8)____\nProfessor: Well, narrowing down your research scope is key. Have you selected a specific thesis statement?\nStudent: Not yet. Everything I read seems fascinating.\nProfessor: That’s a common pitfall. ____(9)____\nStudent: That makes a lot of sense. Should I send you an outline first?\nProfessor: Definitely. ____(10)____, and we can discuss it during office hours.",
    "question_text": "Choose the best option to complete blank (7).",
    "difficulty": "easy",
    "explanation": "นักเรียนมาพบอาจารย์ที่ห้องทำงาน ต้องขออนุญาตและถามความสะดวกก่อนอย่างสุภาพ: \"Do you have a few minutes to talk?\"",
    "trap_analysis": "การสั่งให้อาจารย์ช่วยเดี๋ยวนี้ถือว่าไม่สุภาพและไม่เหมาะสมในบริบทวิชาการ",
    "options": [
      {
        "label": "1",
        "content": "Do you have a few minutes to talk?",
        "is_correct": 1
      },
      {
        "label": "2",
        "content": "Why are you sitting in your office?",
        "is_correct": 0
      },
      {
        "label": "3",
        "content": "Give me an extension on my deadline right now.",
        "is_correct": 0
      },
      {
        "label": "4",
        "content": "I don't think you graded my quiz fairly.",
        "is_correct": 0
      }
    ]
  },
  {
    "id": "q_tgat1_sc18",
    "subject_id": "tgat1",
    "blueprint_id": "tgat1_spk_sc",
    "stimulus": "In a professor's office:\n\nStudent: [Do you have a few minutes to talk?]\nProfessor: Of course, Liam. Come on in. What’s on your mind?\nStudent: I’m feeling overwhelmed by the term paper requirements. ____(8)____\nProfessor: Well, narrowing down your research scope is key. Have you selected a specific thesis statement?",
    "question_text": "Choose the best option to complete blank (8).",
    "difficulty": "medium",
    "explanation": "นักเรียนรู้สึก overwhelmed (รับมือไม่ไหว) ประโยคถัดมาจึงขยายความปัญหาของตนเองว่า \"I’m having trouble figuring out where to begin.\" (ผมสับสนไม่รู้ว่าจะเริ่มจากตรงไหนดี)",
    "trap_analysis": "\"I already finished writing all chapters\" ขัดแย้งกับคำว่า overwhelmed",
    "options": [
      {
        "label": "1",
        "content": "I already finished writing all twenty pages.",
        "is_correct": 0
      },
      {
        "label": "2",
        "content": "I’m having trouble figuring out where to begin.",
        "is_correct": 1
      },
      {
        "label": "3",
        "content": "your lectures are too simple for me.",
        "is_correct": 0
      },
      {
        "label": "4",
        "content": "I would like to drop out of school.",
        "is_correct": 0
      }
    ]
  },
  {
    "id": "q_tgat1_sc19",
    "subject_id": "tgat1",
    "blueprint_id": "tgat1_spk_sc",
    "stimulus": "In a professor's office:\n\nStudent: Not yet. Everything I read seems fascinating.\nProfessor: That’s a common pitfall. ____(9)____\nStudent: That makes a lot of sense. Should I send you an outline first?",
    "question_text": "Choose the best option to complete blank (9).",
    "difficulty": "medium",
    "explanation": "อาจารย์แนะนำวิธีแก้ปัญหาความอยากเขียนทุกเรื่อง: \"Try focusing on one specific case study rather than trying to cover the entire century.\" (ลองโฟกัสกรณีศึกษาเฉพาะกรณีเดียว ดีกว่าพยายามครอบคลุมทั้งศตวรรษ)",
    "trap_analysis": "อาจารย์จะไม่แนะนำให้ลอกรายงานหรือเลิกทำ",
    "options": [
      {
        "label": "1",
        "content": "Try focusing on one specific case study rather than trying to cover the entire century.",
        "is_correct": 1
      },
      {
        "label": "2",
        "content": "You should just copy an article from Wikipedia.",
        "is_correct": 0
      },
      {
        "label": "3",
        "content": "You must read fifty more books before next week.",
        "is_correct": 0
      },
      {
        "label": "4",
        "content": "Writing papers is useless in the modern world.",
        "is_correct": 0
      }
    ]
  },
  {
    "id": "q_tgat1_sc20",
    "subject_id": "tgat1",
    "blueprint_id": "tgat1_spk_sc",
    "stimulus": "In a professor's office:\n\nStudent: That makes a lot of sense. Should I send you an outline first?\nProfessor: Definitely. ____(10)____, and we can discuss it during office hours.",
    "question_text": "Choose the best option to complete blank (10).",
    "difficulty": "easy",
    "explanation": "นักเรียนถามว่าจะส่งโครงร่าง (outline) มาให้อาจารย์ก่อนได้ไหม อาจารย์เห็นด้วยและนัดหมายเวลา: \"Email it to me by Thursday afternoon\"",
    "trap_analysis": "ตัวเลือกอื่นไม่สอดคล้องกับการส่งโครงร่างงานวิชาการ",
    "options": [
      {
        "label": "1",
        "content": "Email it to me by Thursday afternoon",
        "is_correct": 1
      },
      {
        "label": "2",
        "content": "Do not show your work to anyone",
        "is_correct": 0
      },
      {
        "label": "3",
        "content": "You have failed this assignment",
        "is_correct": 0
      },
      {
        "label": "4",
        "content": "I will grade your final draft immediately",
        "is_correct": 0
      }
    ]
  },
  {
    "id": "q_tgat1_lc21",
    "subject_id": "tgat1",
    "blueprint_id": "tgat1_spk_lc",
    "stimulus": "Job Interview Dialogue:\n\nInterviewer: Good morning, Clara. Welcome to Innovatech. Please have a seat.\nClara: Good morning. ____(11)____\nInterviewer: To begin with, could you walk us through your background and what motivated you to apply for the Project Coordinator role?\nClara: Certainly. During my university years, I served as president of the environmental club where I coordinated cross-functional teams and managed outreach campaigns. ____(12)____\nInterviewer: That’s impressive. In fast-paced projects, tight deadlines often lead to unforeseen conflicts among team members. ____(13)____\nClara: I believe open communication is paramount. I typically schedule a brief one-on-one session with each party to understand the underlying bottleneck. ____(14)____\nInterviewer: Excellent approach. Lastly, where do you see yourself developing professionally over the next five years?\nClara: ____(15)____",
    "question_text": "Choose the best option to complete blank (11).",
    "difficulty": "easy",
    "explanation": "เมื่อผู้สัมภาษณ์เชิญนั่ง การตอบรับอย่างสุภาพและแสดงความขอบคุณคือ \"Thank you for having me today. I’m thrilled to be here.\"",
    "trap_analysis": "การพูดว่าเหนื่อยหรือรอนานจะสร้างความประทับใจแรกที่ไม่ดีอย่างยิ่งในการสัมภาษณ์งาน",
    "options": [
      {
        "label": "1",
        "content": "Thank you for having me today. I’m thrilled to be here.",
        "is_correct": 1
      },
      {
        "label": "2",
        "content": "I have been waiting in the lobby for half an hour.",
        "is_correct": 0
      },
      {
        "label": "3",
        "content": "Can we finish this quickly? I have another appointment.",
        "is_correct": 0
      },
      {
        "label": "4",
        "content": "Where is the compensation contract?",
        "is_correct": 0
      }
    ]
  },
  {
    "id": "q_tgat1_lc22",
    "subject_id": "tgat1",
    "blueprint_id": "tgat1_spk_lc",
    "stimulus": "Job Interview Dialogue:\n\nInterviewer: ...could you walk us through your background and what motivated you to apply for the Project Coordinator role?\nClara: Certainly. During my university years, I served as president of the environmental club where I coordinated cross-functional teams and managed outreach campaigns. ____(12)____\nInterviewer: That’s impressive. In fast-paced projects, tight deadlines often lead to unforeseen conflicts among team members...",
    "question_text": "Choose the best option to complete blank (12).",
    "difficulty": "medium",
    "explanation": "Clara อธิบายประสบการณ์ และเชื่อมโยงว่าทักษะดังกล่าวตรงกับตำแหน่งที่สมัครอย่างไร: \"This experience honed my organizational skills, and I am eager to apply them to your renewable energy initiatives.\"",
    "trap_analysis": "ต้องแสดงความเชื่อมโยงระหว่างอดีตกับความพร้อมที่จะสร้างคุณค่าให้แก่บริษัท",
    "options": [
      {
        "label": "1",
        "content": "This experience honed my organizational skills, and I am eager to apply them to your renewable energy initiatives.",
        "is_correct": 1
      },
      {
        "label": "2",
        "content": "I realized that environmental protection is completely unprofitable.",
        "is_correct": 0
      },
      {
        "label": "3",
        "content": "None of the members liked my leadership style.",
        "is_correct": 0
      },
      {
        "label": "4",
        "content": "I only want a job that gives me thirty days of annual leave.",
        "is_correct": 0
      }
    ]
  },
  {
    "id": "q_tgat1_lc23",
    "subject_id": "tgat1",
    "blueprint_id": "tgat1_spk_lc",
    "stimulus": "Job Interview Dialogue:\n\nInterviewer: That’s impressive. In fast-paced projects, tight deadlines often lead to unforeseen conflicts among team members. ____(13)____\nClara: I believe open communication is paramount. I typically schedule a brief one-on-one session with each party to understand the underlying bottleneck...",
    "question_text": "Choose the best option to complete blank (13).",
    "difficulty": "medium",
    "explanation": "ผู้สัมภาษณ์กำลังตั้งคำถามเชิงพฤติกรรม (Behavioral question) เพื่อทดสอบการรับมือความขัดแย้ง: \"How do you handle interpersonal disagreements under pressure?\"",
    "trap_analysis": "สังเกตจากคำตอบของ Clara ที่เน้นเรื่อง \"open communication\" และ \"one-on-one session\"",
    "options": [
      {
        "label": "1",
        "content": "How do you handle interpersonal disagreements under pressure?",
        "is_correct": 1
      },
      {
        "label": "2",
        "content": "Why do people hate working in teams?",
        "is_correct": 0
      },
      {
        "label": "3",
        "content": "Do you prefer working completely alone in an isolated room?",
        "is_correct": 0
      },
      {
        "label": "4",
        "content": "Can you fire underperforming staff immediately?",
        "is_correct": 0
      }
    ]
  },
  {
    "id": "q_tgat1_lc24",
    "subject_id": "tgat1",
    "blueprint_id": "tgat1_spk_lc",
    "stimulus": "Job Interview Dialogue:\n\nClara: I believe open communication is paramount. I typically schedule a brief one-on-one session with each party to understand the underlying bottleneck. ____(14)____\nInterviewer: Excellent approach. Lastly, where do you see yourself developing professionally over the next five years?",
    "question_text": "Choose the best option to complete blank (14).",
    "difficulty": "medium",
    "explanation": "Clara อธิบายขั้นตอนถัดไปของการแก้ปัญหาความขัดแย้ง: \"Then, we realign our shared objectives and agree on a collaborative path forward.\"",
    "trap_analysis": "การบังคับให้คนผิดลาออกไม่ใช่แนวทางของ Project Coordinator มืออาชีพ",
    "options": [
      {
        "label": "1",
        "content": "Then, we realign our shared objectives and agree on a collaborative path forward.",
        "is_correct": 1
      },
      {
        "label": "2",
        "content": "After that, I report them to human resources so they get penalized.",
        "is_correct": 0
      },
      {
        "label": "3",
        "content": "I usually pick the side of the person I personally like more.",
        "is_correct": 0
      },
      {
        "label": "4",
        "content": "I let them argue until someone gives up exhausted.",
        "is_correct": 0
      }
    ]
  },
  {
    "id": "q_tgat1_lc25",
    "subject_id": "tgat1",
    "blueprint_id": "tgat1_spk_lc",
    "stimulus": "Job Interview Dialogue:\n\nInterviewer: Excellent approach. Lastly, where do you see yourself developing professionally over the next five years?\nClara: ____(15)____",
    "question_text": "Choose the best option to complete blank (15).",
    "difficulty": "medium",
    "explanation": "คำถาม 5-year goal ต้องแสดงถึงความมุ่งมั่นในการเรียนรู้และการเติบโตไปพร้อมกับองค์กร: \"I aspire to master project management methodologies and eventually lead strategic cross-border sustainable initiatives.\"",
    "trap_analysis": "การตอบว่าอยากย้ายไปบริษัทคู่แข่งหรืออยากเป็นผู้บริหารแทนผู้สัมภาษณ์เป็นคำตอบต้องห้าม",
    "options": [
      {
        "label": "1",
        "content": "I aspire to master project management methodologies and eventually lead strategic sustainable initiatives here.",
        "is_correct": 1
      },
      {
        "label": "2",
        "content": "I hope to earn enough money to retire early by age twenty-eight.",
        "is_correct": 0
      },
      {
        "label": "3",
        "content": "I plan to take over your job as head of department next month.",
        "is_correct": 0
      },
      {
        "label": "4",
        "content": "I will probably switch to an entirely different industry every year.",
        "is_correct": 0
      }
    ]
  },
  {
    "id": "q_tgat1_lc26",
    "subject_id": "tgat1",
    "blueprint_id": "tgat1_spk_lc",
    "stimulus": "At an airport service desk during a severe storm:\n\nPassenger: Good evening. I was supposed to be on Flight TG920 to Frankfurt, but the departure monitor just showed it was cancelled. ____(16)____\nAgent: Yes, sir. Due to the severe typhoon along the flight corridor, all westbound flights have been grounded for safety. ____(17)____\nPassenger: I understand safety comes first, but I have an urgent business summit in Frankfurt tomorrow afternoon. Is there any way to rebook me on an alternative route?\nAgent: Let me check our partner alliance network... ____(18)____ It departs via Munich at 6:30 AM tomorrow. Would that work for you?\nPassenger: Yes, that should still get me there in time. ____(19)____\nAgent: Absolutely. Because the cancellation was weather-related, our airline provides complimentary vouchers for the airport transit hotel and breakfast. ____(20)____",
    "question_text": "Choose the best option to complete blank (16).",
    "difficulty": "easy",
    "explanation": "ผู้โดยสารต้องการการยืนยันและสอบถามข้อมูลเรื่องเที่ยวบินที่ถูกยกเลิก: \"Could you please clarify what our options are?\"",
    "trap_analysis": "การเริ่มด้วยการด่าทอจะไม่ช่วยให้ได้รับการแก้ไขปัญหาอย่างรวดเร็ว",
    "options": [
      {
        "label": "1",
        "content": "Could you please clarify what our options are?",
        "is_correct": 1
      },
      {
        "label": "2",
        "content": "Why did you break the airplane?",
        "is_correct": 0
      },
      {
        "label": "3",
        "content": "I am never flying with any airline again.",
        "is_correct": 0
      },
      {
        "label": "4",
        "content": "Please give me a free first-class ticket to Tokyo.",
        "is_correct": 0
      }
    ]
  },
  {
    "id": "q_tgat1_lc27",
    "subject_id": "tgat1",
    "blueprint_id": "tgat1_spk_lc",
    "stimulus": "At an airport service desk during a severe storm:\n\nPassenger: Could you please clarify what our options are?\nAgent: Yes, sir. Due to the severe typhoon along the flight corridor, all westbound flights have been grounded for safety. ____(17)____\nPassenger: I understand safety comes first, but I have an urgent business summit in Frankfurt tomorrow afternoon...",
    "question_text": "Choose the best option to complete blank (17).",
    "difficulty": "medium",
    "explanation": "เจ้าหน้าที่สายการบินแสดงความเสียใจและเห็นอกเห็นใจต่อความไม่สะดวก: \"We sincerely apologize for the disruption to your travel plans.\"",
    "trap_analysis": "พนักงานบริการต้องรักษามาตรฐานความสุภาพและการขออภัยในความไม่สะดวก แม้จะเป็นสภาพอากาศก็ตาม",
    "options": [
      {
        "label": "1",
        "content": "We sincerely apologize for the disruption to your travel plans.",
        "is_correct": 1
      },
      {
        "label": "2",
        "content": "You should check the weather forecast before coming to the airport.",
        "is_correct": 0
      },
      {
        "label": "3",
        "content": "It is not our problem, so please step aside.",
        "is_correct": 0
      },
      {
        "label": "4",
        "content": "You will have to sleep on the terminal floor tonight.",
        "is_correct": 0
      }
    ]
  },
  {
    "id": "q_tgat1_lc28",
    "subject_id": "tgat1",
    "blueprint_id": "tgat1_spk_lc",
    "stimulus": "At an airport service desk during a severe storm:\n\nPassenger: Is there any way to rebook me on an alternative route?\nAgent: Let me check our partner alliance network... ____(18)____ It departs via Munich at 6:30 AM tomorrow. Would that work for you?\nPassenger: Yes, that should still get me there in time...",
    "question_text": "Choose the best option to complete blank (18).",
    "difficulty": "medium",
    "explanation": "เจ้าหน้าที่ตรวจสอบระบบและพบที่นั่งว่างในเที่ยวบินเปลี่ยนเครื่อง: \"I’ve located a confirmed seat on an early flight with Lufthansa.\"",
    "trap_analysis": "สังเกตจากประโยคถัดไป \"It departs via Munich at 6:30 AM tomorrow.\"",
    "options": [
      {
        "label": "1",
        "content": "I’ve located a confirmed seat on an early flight with Lufthansa.",
        "is_correct": 1
      },
      {
        "label": "2",
        "content": "There are no flights available anywhere for the next two weeks.",
        "is_correct": 0
      },
      {
        "label": "3",
        "content": "You can take a taxi directly to Germany instead.",
        "is_correct": 0
      },
      {
        "label": "4",
        "content": "Our computers have completely crashed.",
        "is_correct": 0
      }
    ]
  },
  {
    "id": "q_tgat1_lc29",
    "subject_id": "tgat1",
    "blueprint_id": "tgat1_spk_lc",
    "stimulus": "At an airport service desk during a severe storm:\n\nPassenger: Yes, that should still get me there in time. ____(19)____\nAgent: Absolutely. Because the cancellation was weather-related, our airline provides complimentary vouchers for the airport transit hotel and breakfast...",
    "question_text": "Choose the best option to complete blank (19).",
    "difficulty": "medium",
    "explanation": "ผู้โดยสารต้องค้างคืนเพื่อรอเที่ยวบินเช้า จึงสอบถามเรื่องที่พักระหว่างคืน: \"What about accommodations for tonight since the flight is early tomorrow?\"",
    "trap_analysis": "สังเกตจากคำตอบของเจ้าหน้าที่ \"complimentary vouchers for the airport transit hotel and breakfast\"",
    "options": [
      {
        "label": "1",
        "content": "What about accommodations for tonight since the flight is early tomorrow?",
        "is_correct": 1
      },
      {
        "label": "2",
        "content": "Can I leave my bags unsupervised in the terminal corridor?",
        "is_correct": 0
      },
      {
        "label": "3",
        "content": "Will you pay for my luxury shopping spree?",
        "is_correct": 0
      },
      {
        "label": "4",
        "content": "Why is the coffee here so expensive?",
        "is_correct": 0
      }
    ]
  },
  {
    "id": "q_tgat1_lc30",
    "subject_id": "tgat1",
    "blueprint_id": "tgat1_spk_lc",
    "stimulus": "At an airport service desk during a severe storm:\n\nAgent: Absolutely. Because the cancellation was weather-related, our airline provides complimentary vouchers for the airport transit hotel and breakfast. ____(20)____",
    "question_text": "Choose the best option to complete blank (20).",
    "difficulty": "easy",
    "explanation": "เจ้าหน้าที่ออกเอกสารบัตรขึ้นเครื่องและคูปองโรงแรมให้เรียบร้อย: \"Here are your boarding passes and hotel confirmation. The shuttle bus stops at Gate 4.\"",
    "trap_analysis": "ตัวเลือกปิดท้ายบทสนทนาการบริการต้องสรุปสิ่งที่ส่งมอบให้ผู้โดยสาร",
    "options": [
      {
        "label": "1",
        "content": "Here are your boarding passes and hotel confirmation. The shuttle bus stops at Gate 4.",
        "is_correct": 1
      },
      {
        "label": "2",
        "content": "Please find your own way through the dark streets.",
        "is_correct": 0
      },
      {
        "label": "3",
        "content": "You will need to pay cash before taking these papers.",
        "is_correct": 0
      },
      {
        "label": "4",
        "content": "Don't bother coming back tomorrow morning.",
        "is_correct": 0
      }
    ]
  },
  {
    "id": "q_tgat1_tc31",
    "subject_id": "tgat1",
    "blueprint_id": "tgat1_rd_tc",
    "stimulus": "Passage 1 (Questions 31 - 37):\n\nMoving to an unfamiliar country is rarely a simple journey. If your new neighborhood is a vibrant, close-knit ____(31)____, you will undoubtedly be able to settle in more smoothly. In residential complexes like Navapat Thani, welcoming staff and bilingual coordinators can help international residents quickly ____(32)____ at home. The faster you overcome initial culture shock, the faster you can get out and explore the exciting heritage of Thailand!\n\nRecent sociological studies ____(33)____ that social cohesion directly enhances mental wellbeing among expatriates. When newcomers actively participate in local festivities, their sense of isolation drops ____(34)____. Moreover, language barriers ____(35)____ overcome through daily interactions with friendly local vendors. It is highly recommended that every newcomer ____(36)____ an effort to learn basic Thai phrases. Not only does this show genuine respect for the host culture, but it also opens doors to lasting friendships ____(37)____ enrich one's global perspective.",
    "question_text": "Choose the best option to complete blank (31).",
    "difficulty": "easy",
    "explanation": "ตามตัวอย่างทางการ MyTCAS คำนามที่สอดคล้องกับคุณศัพท์ \"multicultural, close-knit\" (หลากหลายวัฒนธรรมและผูกพันใกล้ชิด) คือ \"community\" (ชุมชน)",
    "trap_analysis": "facility (สิ่งอำนวยความสะดวก), resource (ทรัพยากร), relationship (ความสัมพันธ์) ไม่สอดคล้องกับบริบทของพื้นที่อยู่อาศัยของเพื่อนบ้าน",
    "options": [
      {
        "label": "1",
        "content": "facility",
        "is_correct": 0
      },
      {
        "label": "2",
        "content": "resource",
        "is_correct": 0
      },
      {
        "label": "3",
        "content": "relationship",
        "is_correct": 0
      },
      {
        "label": "4",
        "content": "community",
        "is_correct": 1
      }
    ]
  },
  {
    "id": "q_tgat1_tc32",
    "subject_id": "tgat1",
    "blueprint_id": "tgat1_rd_tc",
    "stimulus": "Passage 1 (Questions 31 - 37):\n\n...In residential complexes like Navapat Thani, welcoming staff and bilingual coordinators can help international residents quickly ____(32)____ at home...",
    "question_text": "Choose the best option to complete blank (32).",
    "difficulty": "easy",
    "explanation": "โครงสร้างไวยากรณ์ \"help someone (to) do something\" หลัง help + object ใช้ Verb รูป Base Form (Infinitive without to): \"help residents quickly feel at home\" (ช่วยให้รู้สึกอบอุ่นเหมือนอยู่บ้าน)",
    "trap_analysis": "ตามตัวอย่างทางการ MyTCAS ต้องใช้รูปกริยาฐาน \"feel\"",
    "options": [
      {
        "label": "1",
        "content": "feel",
        "is_correct": 1
      },
      {
        "label": "2",
        "content": "felt",
        "is_correct": 0
      },
      {
        "label": "3",
        "content": "feeling",
        "is_correct": 0
      },
      {
        "label": "4",
        "content": "and feel",
        "is_correct": 0
      }
    ]
  },
  {
    "id": "q_tgat1_tc33",
    "subject_id": "tgat1",
    "blueprint_id": "tgat1_rd_tc",
    "stimulus": "Passage 1 (Questions 31 - 37):\n\n...Recent sociological studies ____(33)____ that social cohesion directly enhances mental wellbeing among expatriates...",
    "question_text": "Choose the best option to complete blank (33).",
    "difficulty": "medium",
    "explanation": "ประธานคือคำนามพหูพจน์ \"Recent sociological studies\" (ผลการศึกษาเร็ว ๆ นี้) กริยาแท้ในรูป Present Perfect เพื่อเชื่อมโยงผลการวิจัยล่าสุดคือ \"have demonstrated\" (ได้แสดงให้เห็นแล้วว่า)",
    "trap_analysis": "has demonstrated ใช้กับประธานเอกพจน์, is demonstrating ไม่เหมาะกับข้อเท็จจริงทางสถิติ",
    "options": [
      {
        "label": "1",
        "content": "have demonstrated",
        "is_correct": 1
      },
      {
        "label": "2",
        "content": "has demonstrated",
        "is_correct": 0
      },
      {
        "label": "3",
        "content": "is demonstrating",
        "is_correct": 0
      },
      {
        "label": "4",
        "content": "was demonstrated",
        "is_correct": 0
      }
    ]
  },
  {
    "id": "q_tgat1_tc34",
    "subject_id": "tgat1",
    "blueprint_id": "tgat1_rd_tc",
    "stimulus": "Passage 1 (Questions 31 - 37):\n\n...When newcomers actively participate in local festivities, their sense of isolation drops ____(34)____...",
    "question_text": "Choose the best option to complete blank (34).",
    "difficulty": "medium",
    "explanation": "ต้องการ Adverb มาขยายกริยา \"drops\" (ลดลง) คำที่แปลว่า \"อย่างเห็นได้ชัด / อย่างมาก\" คือ \"dramatically\"",
    "trap_analysis": "dramatic เป็น Adjective ไม่สามารถขยายคำกริยา drops ได้",
    "options": [
      {
        "label": "1",
        "content": "dramatic",
        "is_correct": 0
      },
      {
        "label": "2",
        "content": "dramatically",
        "is_correct": 1
      },
      {
        "label": "3",
        "content": "dramatize",
        "is_correct": 0
      },
      {
        "label": "4",
        "content": "drama",
        "is_correct": 0
      }
    ]
  },
  {
    "id": "q_tgat1_tc35",
    "subject_id": "tgat1",
    "blueprint_id": "tgat1_rd_tc",
    "stimulus": "Passage 1 (Questions 31 - 37):\n\n...Moreover, language barriers ____(35)____ overcome through daily interactions with friendly local vendors...",
    "question_text": "Choose the best option to complete blank (35).",
    "difficulty": "medium",
    "explanation": "ประธานคือ \"language barriers\" (อุปสรรคทางภาษา) ซึ่งเป็นสิ่งไม่มีชีวิต ต้องถูกกริยากระทำ จึงใช้รูป Passive Voice: Modal + be + V.3 $\\to$ \"can be easily overcome\" (สามารถถูกก้าวข้ามได้อย่างง่ายดาย)",
    "trap_analysis": "active voice \"can easily overcome\" จะแปลว่าอุปสรรคทางภาษาไปก้าวข้ามสิ่งอื่น ซึ่งผิดความหมาย",
    "options": [
      {
        "label": "1",
        "content": "can easily overcome",
        "is_correct": 0
      },
      {
        "label": "2",
        "content": "can be easily overcome",
        "is_correct": 1
      },
      {
        "label": "3",
        "content": "easily overcoming",
        "is_correct": 0
      },
      {
        "label": "4",
        "content": "have easily overcome",
        "is_correct": 0
      }
    ]
  },
  {
    "id": "q_tgat1_tc36",
    "subject_id": "tgat1",
    "blueprint_id": "tgat1_rd_tc",
    "stimulus": "Passage 1 (Questions 31 - 37):\n\n...It is highly recommended that every newcomer ____(36)____ an effort to learn basic Thai phrases...",
    "question_text": "Choose the best option to complete blank (36).",
    "difficulty": "hard",
    "explanation": "โครงสร้าง Subjunctive Mood หลังกริยาหรือคุณศัพท์ที่แสดงคำแนะนำ (recommend, suggest, insist, vital, essential) ในโครงสร้าง \"It is recommended that S + (should) + V.infinitive\": ทุกประธานต้องใช้รูปกริยาฐาน \"make\"",
    "trap_analysis": "หลายคนเผลอเติม -s เป็น \"makes\" เพราะเห็นประธานเป็น \"every newcomer\" (เอกพจน์) แต่ใน Subjunctive ต้องใช้ Base Form เสมอ",
    "options": [
      {
        "label": "1",
        "content": "make",
        "is_correct": 1
      },
      {
        "label": "2",
        "content": "makes",
        "is_correct": 0
      },
      {
        "label": "3",
        "content": "made",
        "is_correct": 0
      },
      {
        "label": "4",
        "content": "making",
        "is_correct": 0
      }
    ]
  },
  {
    "id": "q_tgat1_tc37",
    "subject_id": "tgat1",
    "blueprint_id": "tgat1_rd_tc",
    "stimulus": "Passage 1 (Questions 31 - 37):\n\n...Not only does this show genuine respect for the host culture, but it also opens doors to lasting friendships ____(37)____ enrich one's global perspective.",
    "question_text": "Choose the best option to complete blank (37).",
    "difficulty": "medium",
    "explanation": "ต้องการ Relative Pronoun มาทำหน้าที่เป็นประธานของอนุประโยคขยายคำนามพหูพจน์ \"lasting friendships\" (มิตรภาพที่ยั่งยืน ซึ่งเป็นสิ่งนามธรรม/สิ่งของ) จึงใช้ \"that\" หรือ \"which\"",
    "trap_analysis": "whom ใช้กับกรรมที่เป็นคน, whose ใช้แสดงความเป็นเจ้าของ, who ใช้กับคน",
    "options": [
      {
        "label": "1",
        "content": "that",
        "is_correct": 1
      },
      {
        "label": "2",
        "content": "whom",
        "is_correct": 0
      },
      {
        "label": "3",
        "content": "whose",
        "is_correct": 0
      },
      {
        "label": "4",
        "content": "who",
        "is_correct": 0
      }
    ]
  },
  {
    "id": "q_tgat1_tc38",
    "subject_id": "tgat1",
    "blueprint_id": "tgat1_rd_tc",
    "stimulus": "Passage 2 (Questions 38 - 45):\n\nThe integration of artificial intelligence (AI) into clinical medicine is revolutionizing patient outcomes across the globe. Today, deep-learning algorithms can analyze high-resolution MRI scans with ____(38)____ accuracy that rival veteran radiologists. Rather than replacing medical practitioners, however, AI acts as a sophisticated cognitive assistant, ____(39)____ clinicians to detect malignant tumors at earlier, more treatable stages.\n\nDespite these undeniable benefits, medical ethicists continue to voice ____(40)____ regarding data privacy and algorithmic bias. If historical diagnostic data primarily reflects affluent demographics, the predictive models ____(41)____ less reliable for underprivileged populations. To prevent such disparities, health authorities are implementing stringent regulations that require algorithms to be trained on diverse datasets ____(42)____ clinical deployment.\n\nFurthermore, maintaining patient trust requires transparency. Patients must understand why a specific treatment plan was recommended, ____(43)____ a purely black-box algorithm makes human oversight nearly impossible. ____(44)____ technology evolves, the compassionate touch of human caregivers will remain the foundational cornerstone of patient care. In conclusion, the ultimate goal of healthcare innovation is to harness computing power ____(45)____ safeguarding human dignity.",
    "question_text": "Choose the best option to complete blank (38).",
    "difficulty": "medium",
    "explanation": "ต้องการ Adjective มาขยายคำนาม \"accuracy\" (ความแม่นยำ) บริบทคืออัลกอริทึมวิเคราะห์ภาพสแกนได้เทียบเท่ารังสีแพทย์ผู้เชี่ยวชาญ คำที่หมายถึง \"น่าประทับใจ / โดดเด่นเป็นพิเศษ\" คือ \"remarkable\"",
    "trap_analysis": "reluctant (ลังเลใจ), negligible (เล็กน้อยแทบไม่มีค่า), careless (ประมาท) ขัดแย้งกับใจความเชิงบวก",
    "options": [
      {
        "label": "1",
        "content": "remarkable",
        "is_correct": 1
      },
      {
        "label": "2",
        "content": "reluctant",
        "is_correct": 0
      },
      {
        "label": "3",
        "content": "negligible",
        "is_correct": 0
      },
      {
        "label": "4",
        "content": "careless",
        "is_correct": 0
      }
    ]
  },
  {
    "id": "q_tgat1_tc39",
    "subject_id": "tgat1",
    "blueprint_id": "tgat1_rd_tc",
    "stimulus": "Passage 2 (Questions 38 - 45):\n\n...Rather than replacing medical practitioners, however, AI acts as a sophisticated cognitive assistant, ____(39)____ clinicians to detect malignant tumors at earlier, more treatable stages...",
    "question_text": "Choose the best option to complete blank (39).",
    "difficulty": "medium",
    "explanation": "โครงสร้าง Participle Clause แสดงผลลัพธ์ต่อเนื่อง โดยประธานคือ AI ทำหน้าที่กระทำกริยาเอง จึงใช้ Present Participle (V.ing): \"enabling clinicians to detect...\" (ช่วยให้แพทย์สามารถตรวจพบ...)",
    "trap_analysis": "enable เป็นกริยาแท้ไม่มีตัวเชื่อม, enabled เป็น Past หรือ Passive ซึ่งไม่ตรงโครงสร้าง",
    "options": [
      {
        "label": "1",
        "content": "enabling",
        "is_correct": 1
      },
      {
        "label": "2",
        "content": "enabled",
        "is_correct": 0
      },
      {
        "label": "3",
        "content": "enable",
        "is_correct": 0
      },
      {
        "label": "4",
        "content": "to have enabled",
        "is_correct": 0
      }
    ]
  },
  {
    "id": "q_tgat1_tc40",
    "subject_id": "tgat1",
    "blueprint_id": "tgat1_rd_tc",
    "stimulus": "Passage 2 (Questions 38 - 45):\n\n...Despite these undeniable benefits, medical ethicists continue to voice ____(40)____ regarding data privacy and algorithmic bias...",
    "question_text": "Choose the best option to complete blank (40).",
    "difficulty": "medium",
    "explanation": "สำนวน \"voice concerns\" แปลว่า \"แสดงความกังวล / ส่งเสียงเตือนข้อกังวล\" เกี่ยวกับความเป็นส่วนตัวของข้อมูล",
    "trap_analysis": "satisfaction (ความพอใจ), celebration (การฉลอง), ignorance (ความไม่รู้) ไม่เข้ากับคำว่า despite และ bias",
    "options": [
      {
        "label": "1",
        "content": "concerns",
        "is_correct": 1
      },
      {
        "label": "2",
        "content": "satisfactions",
        "is_correct": 0
      },
      {
        "label": "3",
        "content": "celebrations",
        "is_correct": 0
      },
      {
        "label": "4",
        "content": "ignorances",
        "is_correct": 0
      }
    ]
  },
  {
    "id": "q_tgat1_tc41",
    "subject_id": "tgat1",
    "blueprint_id": "tgat1_rd_tc",
    "stimulus": "Passage 2 (Questions 38 - 45):\n\n...If historical diagnostic data primarily reflects affluent demographics, the predictive models ____(41)____ less reliable for underprivileged populations...",
    "question_text": "Choose the best option to complete blank (41).",
    "difficulty": "medium",
    "explanation": "ประโยคเงื่อนไข Conditional Sentence Type 1 (If + Present Simple, S + will/may + V.inf): \"If data reflects..., the predictive models will become less reliable...\"",
    "trap_analysis": "would become ใช้กับ Type 2 (สมมติในอดีต/ไม่จริงในปัจจุบัน) แต่นี่คือความจริงทางสถิติที่มีแนวโน้มเกิดขึ้นจริง",
    "options": [
      {
        "label": "1",
        "content": "will become",
        "is_correct": 1
      },
      {
        "label": "2",
        "content": "would have become",
        "is_correct": 0
      },
      {
        "label": "3",
        "content": "had become",
        "is_correct": 0
      },
      {
        "label": "4",
        "content": "becoming",
        "is_correct": 0
      }
    ]
  },
  {
    "id": "q_tgat1_tc42",
    "subject_id": "tgat1",
    "blueprint_id": "tgat1_rd_tc",
    "stimulus": "Passage 2 (Questions 38 - 45):\n\n...require algorithms to be trained on diverse datasets ____(42)____ clinical deployment...",
    "question_text": "Choose the best option to complete blank (42).",
    "difficulty": "easy",
    "explanation": "บุพบทบอกลำดับเวลาที่สมเหตุสมผลคือ ต้องฝึกโมเดลให้ครอบคลุม \"ก่อนหน้า (prior to / before)\" ที่จะนำไปใช้งานจริงทางคลินิก",
    "trap_analysis": "contrary to (ขัดแย้งกับ), in spite of (ทั้ง ๆ ที่), owing to (เนื่องจาก) ไม่บอกลำดับขั้นตอน",
    "options": [
      {
        "label": "1",
        "content": "prior to",
        "is_correct": 1
      },
      {
        "label": "2",
        "content": "contrary to",
        "is_correct": 0
      },
      {
        "label": "3",
        "content": "in spite of",
        "is_correct": 0
      },
      {
        "label": "4",
        "content": "owing to",
        "is_correct": 0
      }
    ]
  },
  {
    "id": "q_tgat1_tc43",
    "subject_id": "tgat1",
    "blueprint_id": "tgat1_rd_tc",
    "stimulus": "Passage 2 (Questions 38 - 45):\n\n...Patients must understand why a specific treatment plan was recommended, ____(43)____ a purely black-box algorithm makes human oversight nearly impossible...",
    "question_text": "Choose the best option to complete blank (43).",
    "difficulty": "medium",
    "explanation": "ต้องการคำเชื่อมบอกเหตุผล (Conjunction of cause): \"as\" หรือ \"because / since\" เพื่ออธิบายเหตุผลว่าทำไมคนไข้ต้องเข้าใจแผนการรักษา เพราะอัลกอริทึมที่เป็นกล่องดำจะทำให้มนุษย์ตรวจสอบไม่ได้",
    "trap_analysis": "unless (เว้นแต่ว่า), although (แม้ว่า), so that (เพื่อที่ว่า) ให้ความหมายผิดความสัมพันธ์ทางตรรกะ",
    "options": [
      {
        "label": "1",
        "content": "as",
        "is_correct": 1
      },
      {
        "label": "2",
        "content": "unless",
        "is_correct": 0
      },
      {
        "label": "3",
        "content": "although",
        "is_correct": 0
      },
      {
        "label": "4",
        "content": "so that",
        "is_correct": 0
      }
    ]
  },
  {
    "id": "q_tgat1_tc44",
    "subject_id": "tgat1",
    "blueprint_id": "tgat1_rd_tc",
    "stimulus": "Passage 2 (Questions 38 - 45):\n\n...____(44)____ technology evolves, the compassionate touch of human caregivers will remain the foundational cornerstone of patient care...",
    "question_text": "Choose the best option to complete blank (44).",
    "difficulty": "medium",
    "explanation": "\"No matter how rapidly...\" หรือ \"Regardless of how quickly...\" แปลว่า \"ไม่ว่าเทคโนโลยีจะพัฒนาไปเร็วเพียงใดก็ตาม... สัมผัสความเมตตาของมนุษย์จะยังคงเป็นเสาหลักเสมอ\"",
    "trap_analysis": "In case of ต้องตามด้วยคำนาม, As soon as บอกเวลาทันที ไม่สื่อถึงความขัดแย้งเชิงคุณค่า",
    "options": [
      {
        "label": "1",
        "content": "No matter how rapidly",
        "is_correct": 1
      },
      {
        "label": "2",
        "content": "In case of",
        "is_correct": 0
      },
      {
        "label": "3",
        "content": "As soon as",
        "is_correct": 0
      },
      {
        "label": "4",
        "content": "Because of",
        "is_correct": 0
      }
    ]
  },
  {
    "id": "q_tgat1_tc45",
    "subject_id": "tgat1",
    "blueprint_id": "tgat1_rd_tc",
    "stimulus": "Passage 2 (Questions 38 - 45):\n\n...In conclusion, the ultimate goal of healthcare innovation is to harness computing power ____(45)____ safeguarding human dignity.",
    "question_text": "Choose the best option to complete blank (45).",
    "difficulty": "easy",
    "explanation": "คำเชื่อมที่บอกการกระทำสองสิ่งควบคู่กันไป \"...is to harness computing power while safeguarding human dignity.\" (ใช้ประโยชน์จากพลังการประมวลผลไปพร้อม ๆ กับการปกป้องศักดิ์ศรีความเป็นมนุษย์)",
    "trap_analysis": "instead of (แทนที่จะ) จะแปลว่าไม่ปกป้องศักดิ์ศรี ซึ่งผิดหลักจริยธรรมการแพทย์",
    "options": [
      {
        "label": "1",
        "content": "while",
        "is_correct": 1
      },
      {
        "label": "2",
        "content": "instead of",
        "is_correct": 0
      },
      {
        "label": "3",
        "content": "without",
        "is_correct": 0
      },
      {
        "label": "4",
        "content": "despite",
        "is_correct": 0
      }
    ]
  },
  {
    "id": "q_tgat1_rc46",
    "subject_id": "tgat1",
    "blueprint_id": "tgat1_rd_rc",
    "stimulus": "Read the following news article and answer questions 46 to 50:\n\nThe Centre Pompidou in Paris will close for three years from the end of 2023 for essential maintenance work, the museum announced today in an official statement. The ambitious plan is for France’s national museum for Modern and Contemporary art, designed by legendary architects Richard Rogers and Renzo Piano and inaugurated in 1977, to reopen in time for its 50th anniversary in 2027.\n\n“There were two options on the table: one consisting of restoring the Centre whilst keeping it open, the other was closing it completely,” France’s Culture Minister, Roselyne Bachelot told the French daily Le Figaro. “I chose the second option because it turned out to be less time-consuming and a bit less expensive.” The extensive overhaul will focus on replacing aging external escalators, asbestos removal, and modernizing cooling systems to dramatically improve energy efficiency across the landmark complex.",
    "question_text": "What is the main purpose of the passage?",
    "difficulty": "easy",
    "explanation": "ตามเฉลยทางการ MyTCAS วัตถุประสงค์หลักของบทความคือแจ้งให้ผู้อ่านทราบว่าพิพิธภัณฑ์ศิลปะแห่งชาติจะปิดปรับปรุงชั่วคราว: \"To inform readers that a museum will temporarily close\"",
    "trap_analysis": "ไม่ใช่การชวนมาเที่ยว (persuade tourists) หรือการโปรโมทศิลปะทั่วไป (promote art)",
    "options": [
      {
        "label": "1",
        "content": "To promote Modern and Contemporary art",
        "is_correct": 0
      },
      {
        "label": "2",
        "content": "To persuade tourists to visit a new museum",
        "is_correct": 0
      },
      {
        "label": "3",
        "content": "To explain how France celebrated its anniversary",
        "is_correct": 0
      },
      {
        "label": "4",
        "content": "To inform readers that a museum will temporarily close",
        "is_correct": 1
      }
    ]
  },
  {
    "id": "q_tgat1_rc47",
    "subject_id": "tgat1",
    "blueprint_id": "tgat1_rd_rc",
    "stimulus": "Refer to the Centre Pompidou article above.",
    "question_text": "Which of the following is TRUE about the year 2027?",
    "difficulty": "easy",
    "explanation": "ตามเฉลยทางการ MyTCAS ในย่อหน้าแรกระบุว่า พิพิธภัณฑ์เปิดครั้งแรกในปี 1977 ดังนั้นในปี 2027 พิพิธภัณฑ์จะมีอายุครบ 50 ปีพอดี (50th anniversary in 2027): \"The national museum will be 50 years old.\"",
    "trap_analysis": "คำตอบตรงกับข้อความในบทความอย่างชัดเจน: 2027 - 1977 = 50 ปี",
    "options": [
      {
        "label": "1",
        "content": "The national museum will permanently close down.",
        "is_correct": 0
      },
      {
        "label": "2",
        "content": "The national museum will be 50 years old.",
        "is_correct": 1
      },
      {
        "label": "3",
        "content": "A brand new museum will be designed by Richard Rogers.",
        "is_correct": 0
      },
      {
        "label": "4",
        "content": "Modern and contemporary art will no longer be displayed.",
        "is_correct": 0
      }
    ]
  },
  {
    "id": "q_tgat1_rc48",
    "subject_id": "tgat1",
    "blueprint_id": "tgat1_rd_rc",
    "stimulus": "Refer to the Centre Pompidou article above.",
    "question_text": "What does France’s culture minister support?",
    "difficulty": "easy",
    "explanation": "ตามเฉลยทางการ MyTCAS รัฐมนตรีระบุชัดเจนว่า \"I chose the second [closing it completely] because it turned out to be less time-consuming and a bit less expensive\": \"Closing the museum completely for maintenance\"",
    "trap_analysis": "รัฐมนตรีเลือกปิดทั้งหมด ไม่ใช่เปิดไปซ่อมไป (keeping it open)",
    "options": [
      {
        "label": "1",
        "content": "Keeping the museum open during maintenance",
        "is_correct": 0
      },
      {
        "label": "2",
        "content": "Charging a higher admission fee to tourists",
        "is_correct": 0
      },
      {
        "label": "3",
        "content": "Closing the museum completely for maintenance",
        "is_correct": 1
      },
      {
        "label": "4",
        "content": "Demolishing the original 1977 landmark building",
        "is_correct": 0
      }
    ]
  },
  {
    "id": "q_tgat1_rc49",
    "subject_id": "tgat1",
    "blueprint_id": "tgat1_rd_rc",
    "stimulus": "Refer to the Centre Pompidou article above.",
    "question_text": "The word \"overhaul\" in paragraph 2 is closest in meaning to ________.",
    "difficulty": "medium",
    "explanation": "คำว่า \"overhaul\" ในบริบทการบูรณะอาคาร (replacing escalators, asbestos removal, modernizing cooling) หมายถึง \"การปรับปรุงซ่อมแซมใหญ่ (renovation / major repair)\"",
    "trap_analysis": "destruction (การทำลาย), celebration (การฉลอง), relocation (การย้ายที่ตั้ง)",
    "options": [
      {
        "label": "1",
        "content": "renovation",
        "is_correct": 1
      },
      {
        "label": "2",
        "content": "destruction",
        "is_correct": 0
      },
      {
        "label": "3",
        "content": "relocation",
        "is_correct": 0
      },
      {
        "label": "4",
        "content": "celebration",
        "is_correct": 0
      }
    ]
  },
  {
    "id": "q_tgat1_rc50",
    "subject_id": "tgat1",
    "blueprint_id": "tgat1_rd_rc",
    "stimulus": "Refer to the Centre Pompidou article above.",
    "question_text": "Which of the following is NOT mentioned as part of the renovation work?",
    "difficulty": "medium",
    "explanation": "ในบทความระบุงาน 3 อย่าง: 1) replacing aging external escalators, 2) asbestos removal, 3) modernizing cooling systems แต่ไม่ได้พูดถึง \"การสร้างลานจอดเฮลิคอปเตอร์ (building a rooftop helipad)\"",
    "trap_analysis": "ตรวจสอบข้อมูลเทียบกับประโยคสุดท้ายของบทความ",
    "options": [
      {
        "label": "1",
        "content": "Replacing aging external escalators",
        "is_correct": 0
      },
      {
        "label": "2",
        "content": "Asbestos removal",
        "is_correct": 0
      },
      {
        "label": "3",
        "content": "Modernizing cooling systems",
        "is_correct": 0
      },
      {
        "label": "4",
        "content": "Constructing a rooftop helipad for VIPs",
        "is_correct": 1
      }
    ]
  },
  {
    "id": "q_tgat1_rc51",
    "subject_id": "tgat1",
    "blueprint_id": "tgat1_rd_rc",
    "stimulus": "Read the following scientific excerpt and answer questions 51 to 55:\n\nFor decades, neuroscientists were puzzled by how the human brain rids itself of metabolic waste. While the rest of the body relies on the lymphatic system to flush away cellular debris, the central nervous system lacks traditional lymphatic vessels. In 2012, researchers at the University of Rochester made a breakthrough discovery: the \"glymphatic system.\" This specialized network of fluid-filled channels uses cerebrospinal fluid (CSF) to wash through brain tissue, clearing harmful metabolic byproducts such as amyloid-beta proteins, which are closely linked to Alzheimer’s disease.\n\nCrucially, this cellular cleaning process operates almost exclusively during deep, slow-wave sleep. When we enter non-REM sleep, brain cells shrink by approximately 60 percent, creating wider interstitial spaces that allow cerebrospinal fluid to surge through like a dishwasher cycle. Chronic sleep deprivation severely impedes this natural detoxification. Over time, the uninhibited accumulation of toxic proteins can trigger neuroinflammation and cognitive decline. These scientific insights underscore that adequate sleep is not merely a passive state of rest, but an active, indispensable biological requirement for long-term brain health.",
    "question_text": "What is the primary topic of the passage?",
    "difficulty": "easy",
    "explanation": "บทความมุ่งเน้นอธิบายกลไกของ Glymphatic System ที่ทำหน้าที่ชำระล้างของเสียในสมองระหว่างการนอนหลับลึก: \"The biological mechanism of brain waste clearance during deep sleep\"",
    "trap_analysis": "ไม่ได้พูดถึงประวัติการค้นพบยา หรือการออกกำลังกาย แต่เน้นเรื่องระบบขับของเสียในสมองกับการนอนหลับ",
    "options": [
      {
        "label": "1",
        "content": "The biological mechanism of brain waste clearance during deep sleep",
        "is_correct": 1
      },
      {
        "label": "2",
        "content": "The commercial manufacturing of artificial cerebrospinal fluid",
        "is_correct": 0
      },
      {
        "label": "3",
        "content": "Why traditional lymphatic vessels exist throughout the human brain",
        "is_correct": 0
      },
      {
        "label": "4",
        "content": "Dietary supplements that can permanently cure Alzheimer’s disease",
        "is_correct": 0
      }
    ]
  },
  {
    "id": "q_tgat1_rc52",
    "subject_id": "tgat1",
    "blueprint_id": "tgat1_rd_rc",
    "stimulus": "Refer to the Glymphatic System passage above.",
    "question_text": "According to the passage, what happens to brain cells during slow-wave sleep?",
    "difficulty": "medium",
    "explanation": "ในย่อหน้าที่ 2 ระบุชัดเจนว่า \"When we enter non-REM sleep, brain cells shrink by approximately 60 percent...\" (เซลล์สมองจะหดตัวลงประมาณ 60% เพื่อเปิดช่องว่างให้ของเหลวไหลผ่าน)",
    "trap_analysis": "เซลล์สมองหดตัวลง (shrink) ไม่ได้ขยายตัว (expand) หรือตายลง (die)",
    "options": [
      {
        "label": "1",
        "content": "They expand by sixty percent to absorb more oxygen.",
        "is_correct": 0
      },
      {
        "label": "2",
        "content": "They shrink significantly, creating wider channels for fluid flow.",
        "is_correct": 1
      },
      {
        "label": "3",
        "content": "They stop consuming glucose and enter total hibernation.",
        "is_correct": 0
      },
      {
        "label": "4",
        "content": "They multiply rapidly to replace damaged neurons.",
        "is_correct": 0
      }
    ]
  },
  {
    "id": "q_tgat1_rc53",
    "subject_id": "tgat1",
    "blueprint_id": "tgat1_rd_rc",
    "stimulus": "Refer to the Glymphatic System passage above.",
    "question_text": "The word \"impedes\" in paragraph 2 is closest in meaning to ________.",
    "difficulty": "medium",
    "explanation": "ประโยค \"Chronic sleep deprivation severely impedes this natural detoxification.\" (การอดนอนเรื้อรังจะขัดขวาง/ชะลอกระบวนการล้างพิษตามธรรมชาตินี้อย่างรุนแรง) ดังนั้น \"impedes\" มีความหมายเดียวกับ \"hinders\" หรือ \"obstructs\" (ขัดขวาง)",
    "trap_analysis": "accelerates (เร่ง), facilitates (อำนวยความสะดวก), initiates (เริ่มต้น)",
    "options": [
      {
        "label": "1",
        "content": "hinders",
        "is_correct": 1
      },
      {
        "label": "2",
        "content": "accelerates",
        "is_correct": 0
      },
      {
        "label": "3",
        "content": "facilitates",
        "is_correct": 0
      },
      {
        "label": "4",
        "content": "initiates",
        "is_correct": 0
      }
    ]
  },
  {
    "id": "q_tgat1_rc54",
    "subject_id": "tgat1",
    "blueprint_id": "tgat1_rd_rc",
    "stimulus": "Refer to the Glymphatic System passage above.",
    "question_text": "Why does the author mention a \"dishwasher cycle\" in paragraph 2?",
    "difficulty": "medium",
    "explanation": "ผู้เขียนใช้การเปรียบเทียบเชิงอุปมา (Metaphor/Analogy) กับเครื่องล้างจานเพื่อช่วยให้ผู้อ่านเห็นภาพชัดเจนว่าน้ำหล่อเลี้ยงสมองและไขสันหลัง (CSF) ไหลเวียนชะล้างโปรตีนที่เป็นพิษออกไปอย่างไร: \"To illustrate vividly how cerebrospinal fluid washes through brain tissue\"",
    "trap_analysis": "ไม่ใช่เพื่อบอกให้ทำความสะอาดเครื่องครัว แต่เป็นการเปรียบเทียบกระบวนการทางชีววิทยา",
    "options": [
      {
        "label": "1",
        "content": "To illustrate vividly how cerebrospinal fluid washes through brain tissue",
        "is_correct": 1
      },
      {
        "label": "2",
        "content": "To recommend kitchen appliances that reduce cognitive fatigue",
        "is_correct": 0
      },
      {
        "label": "3",
        "content": "To warn against sleeping near noisy household machines",
        "is_correct": 0
      },
      {
        "label": "4",
        "content": "To prove that the human brain operates like an electrical motor",
        "is_correct": 0
      }
    ]
  },
  {
    "id": "q_tgat1_rc55",
    "subject_id": "tgat1",
    "blueprint_id": "tgat1_rd_rc",
    "stimulus": "Refer to the Glymphatic System passage above.",
    "question_text": "What can be inferred from the final sentence of the passage?",
    "difficulty": "hard",
    "explanation": "ประโยคสุดท้าย \"adequate sleep is not merely a passive state of rest, but an active, indispensable biological requirement...\" สรุปอนุมานได้ว่า \"การนอนหลับมีบทบาททางสรีรวิทยาเชิงรุกที่สำคัญต่อการป้องกันโรคทางสมอง ไม่ใช่แค่การนอนพักเฉย ๆ\": \"Prioritizing quality sleep is an essential preventive measure against neurological disorders.\"",
    "trap_analysis": "การคิดว่านอนน้อยแล้วชดเชยด้วยยาได้ขัดแย้งกับข้อสรุปของบทความ",
    "options": [
      {
        "label": "1",
        "content": "Prioritizing quality sleep is an essential preventive measure against neurological disorders.",
        "is_correct": 1
      },
      {
        "label": "2",
        "content": "Humans can easily train their brains to eliminate waste without sleeping.",
        "is_correct": 0
      },
      {
        "label": "3",
        "content": "Amyloid-beta proteins are completely harmless to young individuals.",
        "is_correct": 0
      },
      {
        "label": "4",
        "content": "Traditional lymphatic vessels will eventually grow inside the brain.",
        "is_correct": 0
      }
    ]
  },
  {
    "id": "q_tgat1_rc56",
    "subject_id": "tgat1",
    "blueprint_id": "tgat1_rd_rc",
    "stimulus": "Read the following environmental feature and answer questions 56 to 60:\n\nAs the global population approaches 9.8 billion by 2050, conventional agriculture faces an unprecedented crisis. Arable land is diminishing due to soil erosion, while unpredictable climate shocks frequently decimate open-field harvests. In response to these pressing vulnerabilities, urban agricultural pioneers are looking upward. Vertical farming—the practice of cultivating crops in stacked vertical layers inside climate-controlled buildings—is emerging as a transformative solution to urban food security.\n\nUnlike traditional farming, vertical farms utilize closed-loop aeroponic or hydroponic systems that recycle up to 95 percent less water while eliminating the need for synthetic pesticides. By optimizing specialized LED light wavelengths, growers can simulate ideal photosynthetic conditions 24 hours a day, achieving crop yields up to twenty times higher per square meter than conventional farmland. Furthermore, growing produce directly within metropolitan centers slashes \"food miles\"—the long transportation routes that generate substantial carbon emissions before fresh vegetables reach consumers' plates.\n\nNonetheless, vertical agriculture is not without formidable hurdles. The initial capital expenditure for advanced robotics and high-efficiency lighting remains exorbitant. Moreover, the massive electricity demands of continuous climate control can offset environmental benefits if facilities are powered by fossil fuels rather than renewable energy grids. Industry leaders emphasize that as solar and geothermal costs plummet, vertical farming will evolve from a niche enterprise into a cornerstone of sustainable urban living.",
    "question_text": "What is the author's primary focus in this passage?",
    "difficulty": "easy",
    "explanation": "บทความสำรวจศักยภาพของเกษตรกรรมแนวดิ่งในเมือง ทั้งข้อดีในการประหยัดทรัพยากรและอุปสรรคด้านต้นทุนและพลังงาน: \"Examining the advantages and challenges of vertical farming in urban areas\"",
    "trap_analysis": "ไม่ได้เชิญชวนให้เลิกทำฟาร์มแบบเดิมทั้งหมด แต่เป็นการวิเคราะห์นวัตกรรมเกษตรแนวดิ่ง",
    "options": [
      {
        "label": "1",
        "content": "Examining the advantages and challenges of vertical farming in urban areas",
        "is_correct": 1
      },
      {
        "label": "2",
        "content": "Criticizing traditional farmers for excessive water consumption",
        "is_correct": 0
      },
      {
        "label": "3",
        "content": "Promoting the exclusive use of fossil fuels in modern skyscrapers",
        "is_correct": 0
      },
      {
        "label": "4",
        "content": "Arguing that the global population will decrease dramatically by 2050",
        "is_correct": 0
      }
    ]
  },
  {
    "id": "q_tgat1_rc57",
    "subject_id": "tgat1",
    "blueprint_id": "tgat1_rd_rc",
    "stimulus": "Refer to the Vertical Farming passage above.",
    "question_text": "According to paragraph 2, how does vertical farming benefit the environment?",
    "difficulty": "medium",
    "explanation": "ย่อหน้า 2 ระบุว่าระบบปิดใช้น้ำน้อยลงถึง 95% ไม่ใช้ยาฆ่าแมลงสังเคราะห์ และลดระยะทางการขนส่งอาหาร (slashes food miles): \"It conserves up to 95% of water and reduces transportation-related carbon emissions.\"",
    "trap_analysis": "ตัวเลือกอื่นบิดเบือนข้อมูล เช่น บอกว่าใช้ยาฆ่าแมลงมากขึ้น หรือใช้น้ำมากกว่าเดิม",
    "options": [
      {
        "label": "1",
        "content": "It conserves up to 95% of water and reduces transportation-related carbon emissions.",
        "is_correct": 1
      },
      {
        "label": "2",
        "content": "It requires large tracts of natural rainforest to be cleared.",
        "is_correct": 0
      },
      {
        "label": "3",
        "content": "It releases chemical runoff into municipal groundwater reservoirs.",
        "is_correct": 0
      },
      {
        "label": "4",
        "content": "It relies exclusively on natural sunlight during monsoon seasons.",
        "is_correct": 0
      }
    ]
  },
  {
    "id": "q_tgat1_rc58",
    "subject_id": "tgat1",
    "blueprint_id": "tgat1_rd_rc",
    "stimulus": "Refer to the Vertical Farming passage above.",
    "question_text": "The word \"exorbitant\" in paragraph 3 is closest in meaning to ________.",
    "difficulty": "medium",
    "explanation": "\"exorbitant\" หมายถึง \"แพงลิบลิ่ว / สูงเกินสมควร (extremely high / excessive)\" ใช้กับค่าใช้จ่ายเริ่มต้น (capital expenditure)",
    "trap_analysis": "reasonable (สมเหตุสมผล), affordable (จับต้องได้), declining (ลดลง)",
    "options": [
      {
        "label": "1",
        "content": "extremely high",
        "is_correct": 1
      },
      {
        "label": "2",
        "content": "very reasonable",
        "is_correct": 0
      },
      {
        "label": "3",
        "content": "completely free",
        "is_correct": 0
      },
      {
        "label": "4",
        "content": "rapidly declining",
        "is_correct": 0
      }
    ]
  },
  {
    "id": "q_tgat1_rc59",
    "subject_id": "tgat1",
    "blueprint_id": "tgat1_rd_rc",
    "stimulus": "Refer to the Vertical Farming passage above.",
    "question_text": "Which condition is necessary for vertical farms to be truly environmentally sustainable?",
    "difficulty": "medium",
    "explanation": "ในย่อหน้า 3 ระบุว่าการใช้พลังงานไฟฟ้ามหาศาลจะหักลบประโยชน์ต่อสิ่งแวดล้อมหากยังใช้เชื้อเพลิงฟอสซิล ดังนั้นฟาร์มแนวดิ่งจะยั่งยืนจริงได้เมื่อ: \"They must be powered by clean, renewable energy sources.\"",
    "trap_analysis": "ตัวเลือกที่บอกว่าต้องย้ายไปในป่าลึกขัดแย้งกับหลักการสร้างในเมือง (urban centers)",
    "options": [
      {
        "label": "1",
        "content": "They must be powered by clean, renewable energy sources.",
        "is_correct": 1
      },
      {
        "label": "2",
        "content": "They should be relocated to remote rural wilderness areas.",
        "is_correct": 0
      },
      {
        "label": "3",
        "content": "They must use diesel generators during peak daytime hours.",
        "is_correct": 0
      },
      {
        "label": "4",
        "content": "They should stop using LED lighting completely.",
        "is_correct": 0
      }
    ]
  },
  {
    "id": "q_tgat1_rc60",
    "subject_id": "tgat1",
    "blueprint_id": "tgat1_rd_rc",
    "stimulus": "Refer to the Vertical Farming passage above.",
    "question_text": "What is the author's tone toward the future of vertical farming?",
    "difficulty": "medium",
    "explanation": "ผู้เขียนชี้ให้เห็นทั้งศักยภาพและอุปสรรค พร้อมสรุปในประโยคสุดท้ายด้วยมุมมองที่มีความหวังแต่ตั้งอยู่บนความเป็นจริง (Cautiously optimistic): มองว่าเมื่อต้นทุนพลังงานสะอาดลดลง เทคโนโลยีนี้จะกลายเป็นเสาหลักที่ยั่งยืน",
    "trap_analysis": "sarcastic (เสียดสี), deeply pessimistic (มองโลกในแง่ร้ายสิ้นหวัง), completely indifferent (ไม่แยแส)",
    "options": [
      {
        "label": "1",
        "content": "Cautiously optimistic",
        "is_correct": 1
      },
      {
        "label": "2",
        "content": "Deeply pessimistic",
        "is_correct": 0
      },
      {
        "label": "3",
        "content": "Mocking and sarcastic",
        "is_correct": 0
      },
      {
        "label": "4",
        "content": "Completely indifferent",
        "is_correct": 0
      }
    ]
  }
];

function seed() {
    console.log('1. Cleaning previous TGAT1 records...');

    // Get old TGAT1 questions
    const oldQRows = db.prepare("SELECT id FROM questions WHERE subject_id = 'tgat1'").all();
    const oldQIds = oldQRows.map(r => r.id);
    console.log(`Found ${oldQIds.length} existing questions for TGAT1 to be replaced.`);

    const delOption = db.prepare("DELETE FROM question_options WHERE question_id = ?");
    const delMistake = db.prepare("DELETE FROM mistake_notebook WHERE question_id = ?");
    const delMastered = db.prepare("DELETE FROM user_mastered_questions WHERE question_id = ?");
    const delAnswer = db.prepare("DELETE FROM user_answers WHERE question_id = ?");
    const delQ = db.prepare("DELETE FROM questions WHERE id = ?");

    const deleteTx = db.transaction(() => {
        for (const qid of oldQIds) {
            delOption.run(qid);
            delMistake.run(qid);
            delMastered.run(qid);
            delAnswer.run(qid);
            delQ.run(qid);
        }
    });
    deleteTx();
    console.log('✅ Cleaned old TGAT1 questions and related child records.');

    // 2. Upsert Blueprints for TGAT1
    console.log('2. Updating blueprints for TGAT1 (5 subtopics)...');
    db.prepare("DELETE FROM blueprints WHERE subject_id = 'tgat1'").run();

    const insertBp = db.prepare(`
        INSERT INTO blueprints (id, subject_id, domain_name, subtopic_name, description, target_questions, score_weight, order_index)
        VALUES (@id, @subject_id, @domain_name, @subtopic_name, @description, @target_questions, @score_weight, @order_index)
    `);

    const bpTx = db.transaction(() => {
        for (const bp of tgat1Blueprints) {
            insertBp.run(bp);
        }
    });
    bpTx();
    console.log(`✅ Seeded ${tgat1Blueprints.length} official TGAT1 blueprints.`);

    // 3. Insert questions and options
    console.log('3. Inserting 60 authentic TGAT1 questions with 240 options...');
    const insertQ = db.prepare(`
        INSERT INTO questions (id, subject_id, blueprint_id, stimulus, question_text, image_url, difficulty, explanation, trap_analysis, is_custom)
        VALUES (@id, @subject_id, @blueprint_id, @stimulus, @question_text, @image_url, @difficulty, @explanation, @trap_analysis, 0)
    `);

    const insertOpt = db.prepare(`
        INSERT INTO question_options (id, question_id, label, content, is_correct, order_index)
        VALUES (@id, @question_id, @label, @content, @is_correct, @order_index)
    `);

    const insertTx = db.transaction(() => {
        for (const q of tgat1Questions) {
            insertQ.run({
                id: q.id,
                subject_id: q.subject_id,
                blueprint_id: q.blueprint_id,
                stimulus: q.stimulus || null,
                question_text: q.question_text,
                image_url: q.image_url || null,
                difficulty: q.difficulty || 'medium',
                explanation: q.explanation || '',
                trap_analysis: q.trap_analysis || ''
            });

            q.options.forEach((opt, idx) => {
                insertOpt.run({
                    id: `${q.id}_opt_${idx + 1}`,
                    question_id: q.id,
                    label: opt.label,
                    content: opt.content,
                    is_correct: opt.is_correct,
                    order_index: idx
                });
            });
        }
    });
    insertTx();
    console.log(`✅ Successfully seeded all ${tgat1Questions.length} official TGAT1 questions with options!`);

    // 4. Update subjects metadata for TGAT1 (60 questions, 100 score, 60 mins)
    console.log('4. Updating subjects table metadata for TGAT1...');
    db.prepare(`
        UPDATE subjects 
        SET total_questions = 60, total_score = 100, duration_minutes = 60
        WHERE id = 'tgat1'
    `).run();

    console.log('🎉 TGAT1 Official Blueprint Calibration Completed Successfully!');
}

if (require.main === module) {
    seed();
}

module.exports = { seed, tgat1Questions, tgat1Blueprints };
