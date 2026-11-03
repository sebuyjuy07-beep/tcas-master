const { insertQuestionsBatch } = require('./add_questions_helper');

const batch1Questions = [
    {
        id: 'q_tgat1_07',
        subject_id: 'tgat1',
        blueprint_id: 'tgat1_spk_qr',
        stimulus: 'Stranger: "Pardon me, would you happen to know if this bus heads toward the central library?"',
        question_text: 'Which is the most natural and polite response if you are uncertain?',
        difficulty: 'easy',
        explanation: 'สำนวน "I am afraid I am not familiar with this route either; you might want to ask the driver." เป็นการปฏิเสธอย่างสุภาพพร้อมทั้งให้คำแนะนำที่เป็นประโยชน์ สำนวน "I am afraid..." นิยมใช้แสดงความเสียใจที่ช่วยไม่ได้อย่างเป็นทางการ',
        trap_analysis: 'ระวังตัวเลือกที่ห้วนเกินไป เช่น "No, find out yourself" หรือแปลตรงตัวจากไทย "I don\'t know anything about buses" ซึ่งดูไม่สุภาพในภาษาอังกฤษ',
        options: [
            { label: '1', content: 'No, find out yourself on Google Maps.', is_correct: 0 },
            { label: '2', content: 'I am afraid I am not familiar with this route; you might want to ask the driver.', is_correct: 1 },
            { label: '3', content: 'Why are you riding the bus without a map?', is_correct: 0 },
            { label: '4', content: 'The library is closed forever anyway.', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_08',
        subject_id: 'tgat1',
        blueprint_id: 'tgat1_spk_qr',
        stimulus: 'Interviewer: "Do you mind relocating to another province if the position requires frequent site visits?"',
        question_text: 'Choose the best response that demonstrates enthusiasm while answering the grammatical structure correctly:',
        difficulty: 'medium',
        explanation: 'คำถามที่ขึ้นต้นด้วย "Do you mind...?" (คุณรังเกียจไหม / ขัดข้องไหม) หากยินดีไป ต้องตอบด้วยความหมายเชิงปฏิเสธ เช่น "Not at all, I welcome the opportunity to gain diverse field experience." (ไม่ขัดข้องเลย ยินดีอย่างยิ่ง) หากตอบ "Yes" จะหมายถึงรังเกียจหรือไม่สะดวกไป',
        trap_analysis: 'จุดหลอกยอดนิยมระดับประเทศ: สับสนระหว่าง "Do you mind" กับ "Would you like". ผู้สอบมักเผลอตอบ "Yes, I like relocating" ซึ่งในหลักไวยากรณ์แปลว่า "ใช่ ฉันรังเกียจการย้าย"',
        options: [
            { label: '1', content: 'Yes, of course, I love traveling around very much.', is_correct: 0 },
            { label: '2', content: 'Not at all; I welcome the opportunity to gain hands-on field experience.', is_correct: 1 },
            { label: '3', content: 'I definitely mind because my family lives here.', is_correct: 0 },
            { label: '4', content: 'Never mind, let us talk about salary first.', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_09',
        subject_id: 'tgat1',
        blueprint_id: 'tgat1_spk_sc',
        stimulus: 'Customer: "Excuse me, I ordered this soup nearly forty minutes ago, and it still hasn\'t arrived."\nRestaurant Manager: "_______, let me head directly to the kitchen and check on your ticket right now."',
        question_text: 'Which response best illustrates professional accountability in customer service?',
        difficulty: 'medium',
        explanation: 'ในการบริการลูกค้า เมื่อเกิดความล่าช้า ผู้จัดการควรขออภัยอย่างจริงใจและแสดงความรับผิดชอบทันที: "I truly apologize for the unacceptable delay" จากนั้นจึงรีบไปตรวจสอบที่ครัว',
        trap_analysis: 'ระวังตัวเลือกที่ปัดความรับผิดชอบไปให้พ่อครัว เช่น "The chef is very slow today" หรือตำหนิลูกค้าว่า "You should have ordered something faster"',
        options: [
            { label: '1', content: 'The kitchen staff is having an argument right now, so please wait.', is_correct: 0 },
            { label: '2', content: 'I truly apologize for the unacceptable delay;', is_correct: 1 },
            { label: '3', content: 'You should have chosen a cold sandwich if you were in a hurry.', is_correct: 0 },
            { label: '4', content: 'Forty minutes is quite normal for our restaurant standard.', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_10',
        subject_id: 'tgat1',
        blueprint_id: 'tgat1_spk_sc',
        stimulus: 'Hannah: "I finally received my acceptance letter from the faculty of biomedical engineering!"\nBen: "_______! All those sleepless nights preparing for the entrance exams truly paid off."',
        question_text: 'Which expression best conveys heartfelt congratulations in this context?',
        difficulty: 'easy',
        explanation: 'สำนวน "That is fantastic news, congratulations!" เหมาะสมที่สุดในการแสดงความยินดีกับความสำเร็จด้านการศึกษา',
        trap_analysis: 'ระวังสำนวน "Break a leg" ซึ่งใช้สำหรับอวยพรก่อนขึ้นเวทีการแสดง ไม่ใช้เมื่อทำสำเร็จแล้ว และสำนวน "Good grief" แสดงความตกใจเชิงหงุดหงิด',
        options: [
            { label: '1', content: 'Break a leg', is_correct: 0 },
            { label: '2', content: 'Good grief', is_correct: 0 },
            { label: '3', content: 'That is fantastic news, congratulations', is_correct: 1 },
            { label: '4', content: 'Better luck next time', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_11',
        subject_id: 'tgat1',
        blueprint_id: 'tgat1_spk_qr',
        stimulus: 'Colleague: "How about grabbing a quick iced coffee before the presentation starts?"',
        question_text: 'Which response indicates a polite decline due to time constraints?',
        difficulty: 'easy',
        explanation: 'การปฏิเสธคำชวนอย่างสุภาพ (Declining an invitation) ควรขอบคุณและให้เหตุผล: "I would love to, but I still need to review my talking points for ten minutes."',
        trap_analysis: 'ระวังตัวเลือกที่ปฏิเสธแบบไม่มีมารยาท เช่น "Coffee is bad for my heart" หรือ "Don\'t bother me"',
        options: [
            { label: '1', content: 'I would love to, but I need to review my speaking notes one more time.', is_correct: 1 },
            { label: '2', content: 'Coffee is completely useless for presentations.', is_correct: 0 },
            { label: '3', content: 'Why do you always waste money on coffee?', is_correct: 0 },
            { label: '4', content: 'You can buy me one, and hurry up.', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_12',
        subject_id: 'tgat1',
        blueprint_id: 'tgat1_spk_sc',
        stimulus: 'Doctor: "Your blood test indicates elevated fasting glucose levels. I strongly recommend reducing sugary beverages."\nPatient: "_______, Doctor. Should I also consult a clinical nutritionist for a meal plan?"',
        question_text: 'Which sentence best fits the patient\'s cooperative attitude?',
        difficulty: 'medium',
        explanation: 'ผู้ป่วยตอบรับคำแนะนำของแพทย์ด้วยความเข้าใจ: "I appreciate the warning and will make the adjustments" ก่อนถามเรื่องนักโภชนาการต่อ',
        trap_analysis: 'ระวังตัวเลือกที่ต่อต้านคำแนะนำแพทย์ เช่น "I don\'t think you know what you are saying" หรือ "Sugar has nothing to do with glucose"',
        options: [
            { label: '1', content: 'I rarely believe in laboratory test results anyway', is_correct: 0 },
            { label: '2', content: 'I appreciate the warning and will make the adjustments', is_correct: 1 },
            { label: '3', content: 'Eating desserts is my personal business', is_correct: 0 },
            { label: '4', content: 'You must prescribe me pills so I can drink whatever I like', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_13',
        subject_id: 'tgat1',
        blueprint_id: 'tgat1_spk_qr',
        stimulus: 'Hotel Receptionist: "May I assist you with your luggage up to the fourteenth floor, ma\'am?"',
        question_text: 'Which response politely declines assistance because you prefer carrying it yourself?',
        difficulty: 'easy',
        explanation: 'สำนวนสากลในการปฏิเสธความช่วยเหลืออย่างสุภาพคือ "Thank you, but I can manage just fine on my own." (ขอบคุณครับ/ค่ะ แต่ฉันจัดการเองได้สบายมาก)',
        trap_analysis: 'ระวังสำนวน "Leave me alone" ซึ่งแปลว่าอย่ามายุ่ง หรือ "Don\'t touch my stuff" ที่ดูก้าวร้าวเกินไป',
        options: [
            { label: '1', content: 'Leave me alone right this second.', is_correct: 0 },
            { label: '2', content: 'Thank you, but I can manage just fine on my own.', is_correct: 1 },
            { label: '3', content: 'Do not touch my property without permission.', is_correct: 0 },
            { label: '4', content: 'You look too frail to lift heavy bags.', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_14',
        subject_id: 'tgat1',
        blueprint_id: 'tgat1_spk_sc',
        stimulus: 'Team Member A: "We have two viable approaches: rapid prototyping with high risk, or thorough modular testing."\nTeam Member B: "Given our tight investor demonstration next week, _______."',
        question_text: 'Which choice logically supports Team Member B\'s rationale regarding the upcoming deadline?',
        difficulty: 'medium',
        explanation: 'เมื่อมีกำหนดการสาธิตต่อนักลงทุนที่กระชั้นชิดในสัปดาห์หน้า ตัวเลือก "we should lean toward rapid prototyping to have a working demo ready in time" เป็นเหตุเป็นผลและสอดคล้องกับข้อจำกัดเรื่องเวลาที่สุด',
        trap_analysis: 'ระวังตัวเลือกที่ขัดแย้งกับเหตุผลเรื่องเวลา เช่น "we should postpone the meeting for six months" หรือ "neither approach matters"',
        options: [
            { label: '1', content: 'we should cancel the investor meeting altogether and relax.', is_correct: 0 },
            { label: '2', content: 'we should lean toward rapid prototyping so we have a working demo ready.', is_correct: 1 },
            { label: '3', content: 'it makes no difference whether we deliver any project or not.', is_correct: 0 },
            { label: '4', content: 'let us spend three months debating without writing any code.', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_15',
        subject_id: 'tgat1',
        blueprint_id: 'tgat1_spk_qr',
        stimulus: 'Bank Clerk: "Could you please endorse the back of this cashier\'s check and present your government ID?"',
        question_text: 'What is the most appropriate customer response to facilitate the transaction?',
        difficulty: 'easy',
        explanation: 'สำนวน "Certainly, here is my national ID card and my signature." สุภาพ ชัดเจน และตรงจุดประสงค์ในการทำธุรกรรมการเงิน',
        trap_analysis: 'ระวังตัวเลือกที่ถามกลับอย่างไม่เข้าใจขั้นตอนธนาคาร เช่น "Why do you care who I am?"',
        options: [
            { label: '1', content: 'Why do you care about my personal identity?', is_correct: 0 },
            { label: '2', content: 'Certainly, here is my signed check along with my identity card.', is_correct: 1 },
            { label: '3', content: 'Give me the cash first, and then I will think about it.', is_correct: 0 },
            { label: '4', content: 'I forgot who I am today, sorry.', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_16',
        subject_id: 'tgat1',
        blueprint_id: 'tgat1_spk_sc',
        stimulus: 'David: "I\'m terribly sorry, Sarah. I accidentally spilled black tea over your research notes."\nSarah: "_______! Luckily I scanned the entire notebook to my cloud storage this morning."',
        question_text: 'Which phrase best reassures David and de-escalates the tension?',
        difficulty: 'easy',
        explanation: 'สำนวน "Don\'t worry about it at all" หรือ "No harm done" เป็นการปลอบใจและบอกว่าไม่เป็นไรเมื่ออีกฝ่ายกล่าวขอโทษ',
        trap_analysis: 'ระวังคำว่า "You did it on purpose!" หรือ "I will never forgive you" ซึ่งขัดแย้งกับประโยคถัดไปที่บอกว่าโชคดีที่สแกนเก็บไว้แล้ว',
        options: [
            { label: '1', content: 'You ruined my entire academic future!', is_correct: 0 },
            { label: '2', content: 'Don\'t worry about it at all, no harm done', is_correct: 1 },
            { label: '3', content: 'Buy me a new laptop right this instant', is_correct: 0 },
            { label: '4', content: 'I will never speak to you again', is_correct: 0 }
        ]
    }
];

insertQuestionsBatch(batch1Questions);
