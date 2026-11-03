/**
 * TGAT1 SET 2: Digital World, AI Innovation & Tech Lifestyle
 * 60 Questions strictly calibrated to Official MyTCAS Blueprint
 * Domain 1: Speaking Skill (30 questions: QR 10, SC 10, LC 10)
 * Domain 2: Reading Skill (30 questions: TC 15, RC 15)
 */

const set2Questions = [
    // =========================================================================
    // PART 1.1: QUESTION-RESPONSE (Questions 1 - 10)
    // =========================================================================
    {
        id: 'q_tgat1_s2_01',
        subject_id: 'tgat1',
        set_number: 2,
        blueprint_id: 'tgat1_spk_qr',
        stimulus: 'A: "Would you mind sharing your screen so we can troubleshoot this bug together?"\nB: "____________________________________"',
        question_text: 'Choose the most appropriate response to complete the dialogue.',
        difficulty: 'medium',
        explanation: 'โครงสร้าง "Would you mind + V.ing...?" (คุณจะรังเกียจไหมหาก...) หากยินดีทำ ต้องตอบปฏิเสธความรังเกียจ เช่น "Not at all. Let me open the window right now." (ไม่รังเกียจเลย เดี๋ยวฉันเปิดหน้าต่างจอให้เดี๋ยวนี้)',
        trap_analysis: 'ระวังตอบ "Yes, certainly." เพราะในภาษาอังกฤษจะแปลว่า "ใช่ ฉันรังเกียจ (ไม่ยอมแชร์จอ)"',
        options: [
            { label: '1', content: 'Yes, certainly; I will hide my desktop.', is_correct: 0 },
            { label: '2', content: 'Not at all. Let me grant screen permissions right now.', is_correct: 1 },
            { label: '3', content: 'Never mind, I hate debugging software.', is_correct: 0 },
            { label: '4', content: 'Screens are made of liquid crystal displays.', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s2_02',
        subject_id: 'tgat1',
        set_number: 2,
        blueprint_id: 'tgat1_spk_qr',
        stimulus: 'A: "How do you find the new AI-powered note-taking app we adopted last week?"\nB: "____________________________________"',
        question_text: 'Choose the most appropriate response to complete the dialogue.',
        difficulty: 'easy',
        explanation: 'คำถาม "How do you find...?" เป็นสำนวนถามความคิดเห็น/ความรู้สึก (What is your opinion of...?) คำตอบที่ตรงคำถามคือการบอกความรู้สึก เช่น "It has streamlined my workflow significantly." (มันช่วยจัดระเบียบงานได้ดีเยี่ยมมาก)',
        trap_analysis: 'ระวังสับสนกับการหาของหาย เช่น "I found it in the App Store" ซึ่งไม่ตรงกับความหมายของสำนวน',
        options: [
            { label: '1', content: 'I found it by typing its name in the search bar.', is_correct: 0 },
            { label: '2', content: 'It has streamlined my workflow significantly; I love the automated summary feature.', is_correct: 1 },
            { label: '3', content: 'Yes, I look for it every single morning.', is_correct: 0 },
            { label: '4', content: 'Notes should be written strictly with fountain pens.', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s2_03',
        subject_id: 'tgat1',
        set_number: 2,
        blueprint_id: 'tgat1_spk_qr',
        stimulus: 'A: "What do you say we grab a quick bubble tea before the tech symposium starts?"\nB: "____________________________________"',
        question_text: 'Choose the most appropriate response to complete the dialogue.',
        difficulty: 'easy',
        explanation: 'สำนวน "What do you say we...?" เป็นการชักชวน (Making a suggestion) การตอบตกลงตามสำนวนสากลคือ "Count me in! I could use a little caffeine boost." (เอาด้วยเลย! กำลังอยากได้คาเฟอีนพอดี)',
        trap_analysis: 'ระวังตอบประโยคปฏิเสธแบบไม่มีมารยาท หรือตอบไม่ตรงโครงสร้างการชวน',
        options: [
            { label: '1', content: 'Count me in! I could really use a little caffeine boost.', is_correct: 1 },
            { label: '2', content: 'I already told you that symposiums are crowded.', is_correct: 0 },
            { label: '3', content: 'Tea leaves originate from East Asian plantations.', is_correct: 0 },
            { label: '4', content: 'No, you must say whatever you want.', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s2_04',
        subject_id: 'tgat1',
        set_number: 2,
        blueprint_id: 'tgat1_spk_qr',
        stimulus: 'A: "Should we back up our source code on a cloud repository or on an encrypted local drive?"\nB: "____________________________________"',
        question_text: 'Choose the most appropriate response to complete the dialogue.',
        difficulty: 'medium',
        explanation: 'เป็นคำถามแบบ Alternative Question (A or B?) ซึ่งห้ามตอบ Yes หรือ No แต่ต้องเลือกอย่างใดอย่างหนึ่ง หรือเสนอทางเลือกที่มีเหตุผล เช่น "Let\'s opt for the cloud repository so the remote team can access it."',
        trap_analysis: 'ระวังตัวเลือกที่ตอบ "Yes, please." หรือ "No, never." ซึ่งผิดหลักการตอบ Alternative Question ทันที',
        options: [
            { label: '1', content: 'Yes, that sounds like a fantastic idea.', is_correct: 0 },
            { label: '2', content: 'Let’s opt for the cloud repository so the remote contractors can sync seamlessly.', is_correct: 1 },
            { label: '3', content: 'Hard drives were invented in the mid-twentieth century.', is_correct: 0 },
            { label: '4', content: 'Neither of us knows what a computer is.', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s2_05',
        subject_id: 'tgat1',
        set_number: 2,
        blueprint_id: 'tgat1_spk_qr',
        stimulus: 'A: "I accidentally clicked a phishing link and entered my student credentials!"\nB: "____________________________________"',
        question_text: 'Choose the most appropriate response to complete the dialogue.',
        difficulty: 'medium',
        explanation: 'เพื่อนกำลังตกอยู่ในภาวะวิกฤตความปลอดภัยไซเบอร์ (Cybersecurity emergency) การตอบสนองที่ดีที่สุดคือการให้คำแนะนำเร่งด่วน: "Change your password immediately and notify IT security!"',
        trap_analysis: 'ระวังตัวเลือกที่ตำหนิอย่างไร้ประโยชน์ หรือพูดเรื่องอื่นที่ไม่ช่วยแก้ปัญหาเฉพาะหน้า',
        options: [
            { label: '1', content: 'Change your password immediately and notify the campus IT helpdesk!', is_correct: 1 },
            { label: '2', content: 'Congratulations, you must be very thrilled!', is_correct: 0 },
            { label: '3', content: 'Fish prefer swimming in clean freshwater rivers.', is_correct: 0 },
            { label: '4', content: 'Never mind, everyone loses their computer eventually.', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s2_06',
        subject_id: 'tgat1',
        set_number: 2,
        blueprint_id: 'tgat1_spk_qr',
        stimulus: 'A: "Could I possibly borrow your noise-canceling headphones for my virtual interview?"\nB: "____________________________________"',
        question_text: 'Choose the most appropriate response to complete the dialogue.',
        difficulty: 'easy',
        explanation: 'คำถามเป็นการขอยืมของอย่างสุภาพ (Requesting permission) คำตอบที่ยินยอมและมีน้ำใจคือ "By all means. They are fully charged on my desk." (ได้แน่นอนเลย วางชาร์จแบตเต็มอยู่บนโต๊ะ)',
        trap_analysis: 'ระวังตัวเลือกที่แปลคำศัพท์ตรงตัว เช่น Noise หรือ Waves',
        options: [
            { label: '1', content: 'By all means. They are sitting fully charged on my desk.', is_correct: 1 },
            { label: '2', content: 'No, sound waves travel faster through solids.', is_correct: 0 },
            { label: '3', content: 'You should interview everyone in the dormitory.', is_correct: 0 },
            { label: '4', content: 'Headphones are worn over human ears.', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s2_07',
        subject_id: 'tgat1',
        set_number: 2,
        blueprint_id: 'tgat1_spk_qr',
        stimulus: 'A: "I\'m terribly sorry for missing this morning’s sprint stand-up; my broadband went down."\nB: "____________________________________"',
        question_text: 'Choose the most appropriate response to complete the dialogue.',
        difficulty: 'easy',
        explanation: 'เป็นการกล่าวขอโทษเพราะเหตุสุดวิสัย (Apology for technical failure) คำตอบรับคำขอโทษที่สุภาพและเข้าใจสถานการณ์คือ "Don’t sweat it. Just read the meeting notes in the Slack channel."',
        trap_analysis: 'ระวังสำนวน "Don\'t sweat it" ซึ่งแปลว่า "ไม่ต้องกังวล / ไม่เป็นไรเลย"',
        options: [
            { label: '1', content: 'Don’t sweat it. Just review the action items posted in our project channel.', is_correct: 1 },
            { label: '2', content: 'Broadband routers emit radio frequency radiation.', is_correct: 0 },
            { label: '3', content: 'I will never speak to anyone without internet access.', is_correct: 0 },
            { label: '4', content: 'Yes, apologize to the entire company in writing right now.', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s2_08',
        subject_id: 'tgat1',
        set_number: 2,
        blueprint_id: 'tgat1_spk_qr',
        stimulus: 'A: "We managed to clinch first place in the university automated robotics hackathon!"\nB: "____________________________________"',
        question_text: 'Choose the most appropriate response to complete the dialogue.',
        difficulty: 'easy',
        explanation: 'เพื่อนมาบอกข่าวดีที่เพิ่งชนะเลิศ (Expressing congratulations) คำตอบที่เหมาะสมที่สุดคือ "That’s phenomenal news! All your late-night coding sessions truly paid off!"',
        trap_analysis: 'ระวังตัวเลือกที่อิจฉา หรือแสดงความไม่พอใจ',
        options: [
            { label: '1', content: 'That’s phenomenal news! All those late-night coding sessions truly paid off!', is_correct: 1 },
            { label: '2', content: 'Robots are destined to replace human labor anyway.', is_correct: 0 },
            { label: '3', content: 'I am so sorry to hear about your terrible defeat.', is_correct: 0 },
            { label: '4', content: 'Hackathons consume significant amounts of electrical energy.', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s2_09',
        subject_id: 'tgat1',
        set_number: 2,
        blueprint_id: 'tgat1_spk_qr',
        stimulus: 'A: "Do you happen to know where the campus IT hardware repair center has moved?"\nB: "____________________________________"',
        question_text: 'Choose the most appropriate response to complete the dialogue.',
        difficulty: 'medium',
        explanation: 'ถามสถานที่ตั้งใหม่ของศูนย์ซ่อม IT คำตอบที่ตรงจุดคือการบอกพิกัด: "It relocated to the ground floor of the Innovation Hub behind the library."',
        trap_analysis: 'ระวังตัวเลือกที่ตอบแค่ Yes/No โดยไม่บอกทาง หรือตอบเรื่องอะไหล่คอมพิวเตอร์',
        options: [
            { label: '1', content: 'It relocated to the ground floor of the Innovation Hub behind the library.', is_correct: 1 },
            { label: '2', content: 'Hardware consists of physical circuitry and microchips.', is_correct: 0 },
            { label: '3', content: 'Yes, I know what a screwdriver looks like.', is_correct: 0 },
            { label: '4', content: 'Moving heavy boxes causes acute lumbar strain.', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s2_10',
        subject_id: 'tgat1',
        set_number: 2,
        blueprint_id: 'tgat1_spk_qr',
        stimulus: 'A: "I am having immense trouble understanding this recursive algorithm problem."\nB: "____________________________________"',
        question_text: 'Choose the most appropriate response to complete the dialogue.',
        difficulty: 'medium',
        explanation: 'เพื่อนกำลังมีปัญหาเรื่องการเรียน (Offering assistance) คำตอบที่แสดงความมีน้ำใจในการช่วยเหลือคือ "If you have twenty minutes, I can walk you through the base cases step by step."',
        trap_analysis: 'ระวังตัวเลือกที่ตัดกำลังใจหรือเยาะเย้ย',
        options: [
            { label: '1', content: 'If you have twenty minutes, I can walk you through the base cases on the whiteboard.', is_correct: 1 },
            { label: '2', content: 'Recursion means a function calls itself until infinity.', is_correct: 0 },
            { label: '3', content: 'You will never pass this course if you don\'t already know it.', is_correct: 0 },
            { label: '4', content: 'Whiteboards are cleaned using felt erasers.', is_correct: 0 }
        ]
    },

    // =========================================================================
    // PART 1.2: SHORT CONVERSATIONS (Questions 11 - 20)
    // =========================================================================
    // Dialogue 1: Smart Home Setup Troubles (Questions 11 - 13)
    {
        id: 'q_tgat1_s2_11',
        subject_id: 'tgat1',
        set_number: 2,
        blueprint_id: 'tgat1_spk_sc',
        stimulus: 'Situation: Maya is trying to connect her smart thermostat to the apartment Wi-Fi while her roommate, Ken, watches.\n\nMaya: "I have reset this hub three times, but the companion app still refuses to pair."\nKen: "____(11)____? Some smart appliances can only detect 2.4 GHz frequencies."\nMaya: "Good point! My smartphone was auto-connected to the 5 GHz band."\nKen: "____(12)____, and let’s see if the discovery screen picks it up."\nMaya: "It worked! The blue indicator light just turned solid green."\nKen: "____(13)____! Technology is great when it actually cooperates."',
        question_text: 'Select the best phrase for blank (11).',
        difficulty: 'medium',
        explanation: 'Ken กำลังให้ข้อเสนอแนะทางเทคนิคเกี่ยวกับคลื่น Wi-Fi: "Did you check whether your router is broadcasting dual-band Wi-Fi?" (เธอเช็กหรือยังว่าเราเตอร์ปล่อยสัญญาณสองย่านความถี่?)',
        trap_analysis: 'ตัวเลือกอื่นไม่ตรงกับบริบททางเทคนิคของการต่อสัญญาณ Wi-Fi',
        options: [
            { label: '1', content: 'Did you check whether your router is broadcasting dual-band Wi-Fi?', is_correct: 1 },
            { label: '2', content: 'Why didn’t you buy an analog thermometer from the flea market?', is_correct: 0 },
            { label: '3', content: 'Are you aware that electricity costs money every month?', is_correct: 0 },
            { label: '4', content: 'Who told you that apartments have walls?', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s2_12',
        subject_id: 'tgat1',
        set_number: 2,
        blueprint_id: 'tgat1_spk_sc',
        stimulus: 'Situation: Maya is trying to connect her smart thermostat to the apartment Wi-Fi while her roommate, Ken, watches.\n\nMaya: "I have reset this hub three times, but the companion app still refuses to pair."\nKen: "Did you check whether your router is broadcasting dual-band Wi-Fi? Some smart appliances can only detect 2.4 GHz frequencies."\nMaya: "Good point! My smartphone was auto-connected to the 5 GHz band."\nKen: "____(12)____, and let’s see if the discovery screen picks it up."\nMaya: "It worked! The blue indicator light just turned solid green."\nKen: "____(13)____! Technology is great when it actually cooperates."',
        question_text: 'Select the best phrase for blank (12).',
        difficulty: 'easy',
        explanation: 'Ken แนะนำให้ Maya สลับคลื่นสัญญาณในโทรศัพท์: "Switch your phone over to the 2.4 GHz network temporarily" (ลองสลับโทรศัพท์ไปจับสัญญาณ 2.4 GHz ดูชั่วคราว)',
        trap_analysis: 'ระวังตัวเลือกที่บอกให้ปิดโทรศัพท์ทิ้งหรือทุบเราเตอร์',
        options: [
            { label: '1', content: 'Switch your phone over to the 2.4 GHz network temporarily', is_correct: 1 },
            { label: '2', content: 'Throw your smartphone out of the balcony window', is_correct: 0 },
            { label: '3', content: 'Cancel our home lease agreement right this minute', is_correct: 0 },
            { label: '4', content: 'Turn off all electrical circuit breakers in the building', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s2_13',
        subject_id: 'tgat1',
        set_number: 2,
        blueprint_id: 'tgat1_spk_sc',
        stimulus: 'Situation: Maya is trying to connect her smart thermostat to the apartment Wi-Fi while her roommate, Ken, watches.\n\nMaya: "I have reset this hub three times, but the companion app still refuses to pair."\nKen: "Did you check whether your router is broadcasting dual-band Wi-Fi? Some smart appliances can only detect 2.4 GHz frequencies."\nMaya: "Good point! My smartphone was auto-connected to the 5 GHz band."\nKen: "Switch your phone over to the 2.4 GHz network temporarily, and let’s see if the discovery screen picks it up."\nMaya: "It worked! The blue indicator light just turned solid green."\nKen: "____(13)____! Technology is great when it actually cooperates."',
        question_text: 'Select the best phrase for blank (13).',
        difficulty: 'easy',
        explanation: 'Ken แสดงความโล่งอกและความยินดีที่การแก้ปัญหาสำเร็จ: "Phew, what a relief" (เฮ้อ โล่งอกไปที!)',
        trap_analysis: 'ระวังตัวเลือกที่แสดงความโกรธหรือไม่พอใจ',
        options: [
            { label: '1', content: 'Phew, what a relief', is_correct: 1 },
            { label: '2', content: 'What an unforgivable disaster', is_correct: 0 },
            { label: '3', content: 'I despise modern gadgets completely', is_correct: 0 },
            { label: '4', content: 'You owe me ten thousand dollars', is_correct: 0 }
        ]
    },

    // Dialogue 2: Virtual Internship Interview (Questions 14 - 17)
    {
        id: 'q_tgat1_s2_14',
        subject_id: 'tgat1',
        set_number: 2,
        blueprint_id: 'tgat1_spk_sc',
        stimulus: 'Situation: Liam is being interviewed by an HR Manager via a video call for a data science internship.\n\nInterviewer: "Good morning, Liam. Before we dive into technical questions, ____(14)____?"\nLiam: "Loud and clear on my end, thank you. I am eager to discuss the internship role."\nInterviewer: "Splendid. I noticed on your resume that you built a predictive sales model. ____(15)____?"\nLiam: "The most formidable bottleneck was handling sparse and missing customer transaction data."\nInterviewer: "____(16)____?"\nLiam: "We implemented an iterative imputation technique rather than dropping records outright."\nInterviewer: "That demonstrates mature engineering discernment. ____(17)____."',
        question_text: 'Select the best phrase for blank (14).',
        difficulty: 'easy',
        explanation: 'ในการสัมภาษณ์ออนไลน์ ก่อนเริ่มมักจะเช็กระบบเสียง/ภาพ: "can you hear and see me clearly?" (ได้ยินและเห็นภาพชัดเจนไหมครับ?)',
        trap_analysis: 'ดูประโยคตอบรับของ Liam: "Loud and clear on my end" แสดงว่าคำถามต้องถามเรื่องสัญญาณเสียงแน่นอน',
        options: [
            { label: '1', content: 'can you hear and see me clearly', is_correct: 1 },
            { label: '2', content: 'how much money are you expecting to make today', is_correct: 0 },
            { label: '3', content: 'why did you dress up in a formal suit at home', is_correct: 0 },
            { label: '4', content: 'do you know what time zone the sun rises in', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s2_15',
        subject_id: 'tgat1',
        set_number: 2,
        blueprint_id: 'tgat1_spk_sc',
        stimulus: 'Situation: Liam is being interviewed by an HR Manager via a video call for a data science internship.\n\nInterviewer: "Splendid. I noticed on your resume that you built a predictive sales model. ____(15)____?"\nLiam: "The most formidable bottleneck was handling sparse and missing customer transaction data."',
        question_text: 'Select the best phrase for blank (15).',
        difficulty: 'medium',
        explanation: 'Liam ตอบว่า "The most formidable bottleneck was handling missing data..." (อุปสรรคที่ยากที่สุดคือการจัดการข้อมูลที่ขาดหาย) คำถามจึงต้องถามถึงความท้าทายหรืออุปสรรค: "What was the most challenging hurdle you encountered during development?"',
        trap_analysis: 'ระวังตัวเลือกที่ถามเรื่องราคาโปรเจกต์ หรือถามว่าใครสั่งให้ทำ',
        options: [
            { label: '1', content: 'What was the most challenging hurdle you encountered during development', is_correct: 1 },
            { label: '2', content: 'How many laptops did you purchase to complete the assignment', is_correct: 0 },
            { label: '3', content: 'Why did you choose to study at a university instead of working', is_correct: 0 },
            { label: '4', content: 'Did you copy your algorithms from an online public forum', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s2_16',
        subject_id: 'tgat1',
        set_number: 2,
        blueprint_id: 'tgat1_spk_sc',
        stimulus: 'Situation: Liam is being interviewed by an HR Manager via a video call for a data science internship.\n\nLiam: "The most formidable bottleneck was handling sparse and missing customer transaction data."\nInterviewer: "____(16)____?"\nLiam: "We implemented an iterative imputation technique rather than dropping records outright."',
        question_text: 'Select the best phrase for blank (16).',
        difficulty: 'medium',
        explanation: 'ผู้สัมภาษณ์ถามถึงแนวทางการแก้ไขปัญหา: "How did your team ultimately address that data integrity issue?" (ทีมของคุณจัดการกับปัญหาข้อมูลนั้นอย่างไร?)',
        trap_analysis: 'Liam ตอบด้วยวิธีการแก้ปัญหา (imputation technique) ดังนั้นคำถามต้องถาม "How" แน่นอน',
        options: [
            { label: '1', content: 'How did your team ultimately address that data integrity issue', is_correct: 1 },
            { label: '2', content: 'Why didn’t you abandon the project and take an easier elective', is_correct: 0 },
            { label: '3', content: 'Where do customers keep their credit card receipts', is_correct: 0 },
            { label: '4', content: 'Can algorithms think with real human emotional consciousness', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s2_17',
        subject_id: 'tgat1',
        set_number: 2,
        blueprint_id: 'tgat1_spk_sc',
        stimulus: 'Situation: Liam is being interviewed by an HR Manager via a video call for a data science internship.\n\nLiam: "We implemented an iterative imputation technique rather than dropping records outright."\nInterviewer: "That demonstrates mature engineering discernment. ____(17)____."',
        question_text: 'Select the best phrase for blank (17).',
        difficulty: 'easy',
        explanation: 'ผู้สัมภาษณ์ประทับใจคำตอบและกล่าวปิดท้ายอย่างมืออาชีพ: "We are very impressed with your analytical approach" (พวกเราประทับใจกระบวนการคิดเชิงวิเคราะห์ของคุณมาก)',
        trap_analysis: 'ระวังตัวเลือกที่ปฏิเสธทันควัน ซึ่งขัดกับคำชมประโยคก่อนหน้า',
        options: [
            { label: '1', content: 'We are very impressed with your structured analytical approach', is_correct: 1 },
            { label: '2', content: 'Unfortunately, your logic makes no sense whatsoever', is_correct: 0 },
            { label: '3', content: 'You should never apply for software engineering positions again', is_correct: 0 },
            { label: '4', content: 'Please hang up the call because our lunch break has started', is_correct: 0 }
        ]
    },

    // Dialogue 3: Group Project Cloud Syncing (Questions 18 - 20)
    {
        id: 'q_tgat1_s2_18',
        subject_id: 'tgat1',
        set_number: 2,
        blueprint_id: 'tgat1_spk_sc',
        stimulus: 'Situation: Two university students, Chloe and Dave, are collaborating on a shared digital slide deck.\n\nChloe: "Dave, did you overwrite slide 14? The market analysis chart I uploaded just vanished."\nDave: "Oh no! ____(18)____. I was editing the financial projections at the same time."\nChloe: "Don\'t panic yet. ____(19)____ and roll back to the version from ten minutes ago."\nDave: "Brilliant idea! Look, the revision history log captured your chart perfectly."\nChloe: "Phew! ____(20)____ before making further edits so we don\'t collide again."',
        question_text: 'Select the best phrase for blank (18).',
        difficulty: 'easy',
        explanation: 'Dave ยอมรับความผิดพลาดด้วยความตกใจและกล่าวขอโทษ: "I am so terribly sorry; there must have been a sync conflict." (ขอโทษจริงๆ ต้องเกิดปัญหาเซฟทับกันแน่เลย)',
        trap_analysis: 'ระวังตัวเลือกที่โยนความผิดให้เพื่อน',
        options: [
            { label: '1', content: 'I am so terribly sorry; there must have been an unintentional sync conflict', is_correct: 1 },
            { label: '2', content: 'Charts are unnecessary for university business presentations anyway', is_correct: 0 },
            { label: '3', content: 'You shouldn’t have drawn such an ugly visual illustration', is_correct: 0 },
            { label: '4', content: 'I deliberately deleted it because I dislike the color blue', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s2_19',
        subject_id: 'tgat1',
        set_number: 2,
        blueprint_id: 'tgat1_spk_sc',
        stimulus: 'Situation: Two university students, Chloe and Dave, are collaborating on a shared digital slide deck.\n\nChloe: "Don\'t panic yet. ____(19)____ and roll back to the version from ten minutes ago."\nDave: "Brilliant idea! Look, the revision history log captured your chart perfectly."',
        question_text: 'Select the best phrase for blank (19).',
        difficulty: 'medium',
        explanation: 'Chloe เสนอวิธีแก้ปัญหาโดยการเปิดประวัติการแก้ไขของระบบคลาวด์: "We can easily inspect the cloud version history" (เราสามารถเข้าไปดู Version History บนคลาวด์ได้ง่ายๆ)',
        trap_analysis: 'ดูคำตอบของ Dave: "the revision history log captured your chart" ยืนยันว่า Chloe พูดถึง version history แน่นอน',
        options: [
            { label: '1', content: 'We can easily inspect the cloud version history', is_correct: 1 },
            { label: '2', content: 'We should format our entire laptop hard drive right now', is_correct: 0 },
            { label: '3', content: 'Let’s email the professor and drop out of the course immediately', is_correct: 0 },
            { label: '4', content: 'We have no choice but to print empty white paper', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s2_20',
        subject_id: 'tgat1',
        set_number: 2,
        blueprint_id: 'tgat1_spk_sc',
        stimulus: 'Situation: Two university students, Chloe and Dave, are collaborating on a shared digital slide deck.\n\nDave: "Brilliant idea! Look, the revision history log captured your chart perfectly."\nChloe: "Phew! ____(20)____ before making further edits so we don\'t collide again."',
        question_text: 'Select the best phrase for blank (20).',
        difficulty: 'medium',
        explanation: 'Chloe เสนอให้แบ่งหน้าที่กันให้ชัดเจนเพื่อไม่ให้แก้ไฟล์ชนกันอีก: "Let’s explicitly assign separate slides to each other" (เรามาแบ่งสไลด์คนละส่วนให้ชัดเจนดีกว่า)',
        trap_analysis: 'ระวังตัวเลือกที่บอกให้เลิกทำงานกลุ่ม',
        options: [
            { label: '1', content: 'Let’s explicitly assign designated slides to each of us', is_correct: 1 },
            { label: '2', content: 'Let’s never communicate with each other again for the rest of term', is_correct: 0 },
            { label: '3', content: 'We should both click every single button simultaneously', is_correct: 0 },
            { label: '4', content: 'Let’s ask an elementary school student to finish our degree', is_correct: 0 }
        ]
    },

    // =========================================================================
    // PART 1.3: LONG CONVERSATIONS (Questions 21 - 30)
    // =========================================================================
    // Long Conversation 1: AI Ethics Debate in University Club (Questions 21 - 25)
    {
        id: 'q_tgat1_s2_21',
        subject_id: 'tgat1',
        set_number: 2,
        blueprint_id: 'tgat1_spk_lc',
        stimulus: 'Situation: Sarah, Marcus, and Dr. Evans are discussing guidelines for generative AI usage in university term papers.\n\nSarah: "Dr. Evans, our student union is drafting policy recommendations on generative AI. Some faculty members advocate an outright ban, while students argue it should be leveraged as an educational tutor."\nDr. Evans: "Total prohibition is both technologically unenforceable and pedagogically counterproductive. ____(21)____."\nMarcus: "Exactly! Instead of banning the technology, we should require students to submit their prompt logs and critically evaluate the AI’s generated output."\nSarah: "____(22)____? Some students might still blindly copy-paste text and claim it as their original conceptual framework."\nDr. Evans: "That is where redesigned assessment criteria come in. We ought to place greater grading weight on oral defenses and in-class synthesis ____(23)____."\nMarcus: "That sounds equitable. But what about students who cannot afford paid premium subscriptions? ____(24)____."\nDr. Evans: "You have raised an indispensable ethical point regarding digital equity. The university senate is currently negotiating a campus-wide enterprise license ____(25)____."\nSarah: "If that materializes, it would level the playing field remarkably."',
        question_text: 'Select the best option for blank (21).',
        difficulty: 'medium',
        explanation: 'Dr. Evans แย้งว่าการแบนใช้ไม่ได้ผล สิ่งที่ต้องทำคือการสอนให้ใช้อย่างรู้เท่าทัน: "What we must foster instead is critical AI literacy and transparent attribution." (สิ่งที่เราต้องส่งเสริมแทนคือความรู้เท่าทัน AI และการอ้างอิงที่โปร่งใส)',
        trap_analysis: 'ระวังตัวเลือกที่สนับสนุนการแบน ซึ่งขัดแย้งกับคำว่า "Total prohibition is counterproductive"',
        options: [
            { label: '1', content: 'What we must foster instead is critical AI literacy and transparent attribution', is_correct: 1 },
            { label: '2', content: 'Therefore, all digital devices must be confiscated at the campus perimeter', is_correct: 0 },
            { label: '3', content: 'Students should only be evaluated using stone tablets and charcoal pens', is_correct: 0 },
            { label: '4', content: 'Universities should eliminate essays and replace them with multiple-choice quizzes exclusively', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s2_22',
        subject_id: 'tgat1',
        set_number: 2,
        blueprint_id: 'tgat1_spk_lc',
        stimulus: 'Situation: Sarah, Marcus, and Dr. Evans are discussing guidelines for generative AI usage in university term papers.\n\nMarcus: "Instead of banning the technology, we should require students to submit their prompt logs and critically evaluate the AI’s generated output."\nSarah: "____(22)____? Some students might still blindly copy-paste text and claim it as their original conceptual framework."',
        question_text: 'Select the best option for blank (22).',
        difficulty: 'hard',
        explanation: 'Sarah กำลังตั้งคำถามถึงความรัดกุมในการตรวจสอบ: "How would we effectively verify the authenticity of those disclosures" (เราจะตรวจสอบความโปร่งใสของประวัติการใช้เหล่านั้นได้อย่างมีประสิทธิภาพจริงหรือ?)',
        trap_analysis: 'Sarah กังวลว่านักเรียนจะแอบก๊อบปี้ จึงต้องถามวิธีตรวจสอบ (verification)',
        options: [
            { label: '1', content: 'How would we effectively verify the authenticity of those disclosures', is_correct: 1 },
            { label: '2', content: 'Why should anyone ever care about plagiarism in academic institutions', is_correct: 0 },
            { label: '3', content: 'Do you believe artificial intelligence possesses an immortal spiritual soul', is_correct: 0 },
            { label: '4', content: 'Can we force the computer algorithm to write handwritten letters', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s2_23',
        subject_id: 'tgat1',
        set_number: 2,
        blueprint_id: 'tgat1_spk_lc',
        stimulus: 'Situation: Sarah, Marcus, and Dr. Evans are discussing guidelines for generative AI usage in university term papers.\n\nDr. Evans: "That is where redesigned assessment criteria come in. We ought to place greater grading weight on oral defenses and in-class synthesis ____(23)____."',
        question_text: 'Select the best option for blank (23).',
        difficulty: 'medium',
        explanation: 'Dr. Evans แนะนำให้เน้นการสอบปากเปล่าและการสังเคราะห์ในห้องเรียน มากกว่าแค่รายงานที่พิมพ์มาส่ง: "rather than relying exclusively on unproctored take-home writing assignments" (แทนที่จะพึ่งพาเพียงการสั่งรายงานกลับไปเขียนที่บ้านโดยไม่มีผู้คุมสอบ)',
        trap_analysis: 'คำเชื่อม "rather than" ใช้เปรียบเทียบระหว่างวิธีการประเมินใหม่กับวิธีการเก่า',
        options: [
            { label: '1', content: 'rather than relying exclusively on unproctored take-home writing assignments', is_correct: 1 },
            { label: '2', content: 'in order to make students drop out of higher education permanently', is_correct: 0 },
            { label: '3', content: 'because oral communication requires no intellectual cognitive thought', is_correct: 0 },
            { label: '4', content: 'so professors will never have to grade another student assignment again', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s2_24',
        subject_id: 'tgat1',
        set_number: 2,
        blueprint_id: 'tgat1_spk_lc',
        stimulus: 'Situation: Sarah, Marcus, and Dr. Evans are discussing guidelines for generative AI usage in university term papers.\n\nMarcus: "That sounds equitable. But what about students who cannot afford paid premium subscriptions? ____(24)____."',
        question_text: 'Select the best option for blank (24).',
        difficulty: 'medium',
        explanation: 'Marcus กังวลเรื่องความเหลื่อมล้ำทางดิจิทัล (Digital Divide): "That could exacerbate socioeconomic disparities among the student body." (นั่นอาจยิ่งตอกย้ำช่องว่างความเหลื่อมล้ำทางเศรษฐกิจระหว่างนักศึกษา)',
        trap_analysis: 'โจทย์พูดถึง "cannot afford paid subscriptions" คำตอบต้องเกี่ยวกับความเหลื่อมล้ำทางเศรษฐกิจ (socioeconomic disparities)',
        options: [
            { label: '1', content: 'That could exacerbate socioeconomic disparities across the student body', is_correct: 1 },
            { label: '2', content: 'Everyone knows that free software is always superior to paid software', is_correct: 0 },
            { label: '3', content: 'Computers should be banned from families with lower annual incomes', is_correct: 0 },
            { label: '4', content: 'Subscriptions are only purchased by people who dislike learning', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s2_25',
        subject_id: 'tgat1',
        set_number: 2,
        blueprint_id: 'tgat1_spk_lc',
        stimulus: 'Situation: Sarah, Marcus, and Dr. Evans are discussing guidelines for generative AI usage in university term papers.\n\nDr. Evans: "You have raised an indispensable ethical point regarding digital equity. The university senate is currently negotiating a campus-wide enterprise license ____(25)____."\nSarah: "If that materializes, it would level the playing field remarkably."',
        question_text: 'Select the best option for blank (25).',
        difficulty: 'medium',
        explanation: 'มหาวิทยาลัยกำลังเจรจาซื้อลิขสิทธิ์แบบสถาบัน เพื่อให้นักศึกษาทุกคนเข้าถึงเครื่องมือขั้นสูงได้ฟรีอย่างเท่าเทียม: "so that every enrolled student has unrestricted access to state-of-the-art tools." (เพื่อให้นักศึกษาทุกคนที่ลงทะเบียนมีสิทธิ์ใช้งานเครื่องมือชั้นนำได้อย่างทั่วถึง)',
        trap_analysis: 'ดูประโยคถัดไปของ Sarah: "level the playing field remarkably" (ทำให้เกิดความเท่าเทียมอย่างมาก)',
        options: [
            { label: '1', content: 'so that every enrolled student has unrestricted access to state-of-the-art tools', is_correct: 1 },
            { label: '2', content: 'to ensure the university can sell student data to third-party advertisers', is_correct: 0 },
            { label: '3', content: 'which will block all search engines from functioning on campus Wi-Fi', is_correct: 0 },
            { label: '4', content: 'in order to replace human faculty members with automated teaching bots', is_correct: 0 }
        ]
    },

    // Long Conversation 2: E-Commerce Cybersecurity & Customer Dispute (Questions 26 - 30)
    {
        id: 'q_tgat1_s2_26',
        subject_id: 'tgat1',
        set_number: 2,
        blueprint_id: 'tgat1_spk_lc',
        stimulus: 'Situation: Elena is calling customer care regarding an unauthorized charge on her digital wallet.\n\nRepresentative: "Thank you for calling Apex Pay customer support. My name is Julian. How may I assist you today?"\nElena: "Hi Julian. I just received an SMS alert for a $350 international software purchase, but ____(26)____!"\nRepresentative: "I completely understand how alarming that must be, Ms. Vance. First, ____(27)____ to prevent any subsequent transactions."\nElena: "Thank you. Yes, please freeze it right away. Will I be held liable for this fraudulent sum?"\nRepresentative: "Rest assured, as long as you did not willingly disclose your one-time passcode (OTP), ____(28)____."\nElena: "I definitely did not share any OTP. What is the next procedure to recover my funds?"\nRepresentative: "I will open a formal fraud dispute ticket right now. ____(29)____."\nElena: "How long does the provisional credit typically take to reflect in my bank account?"\nRepresentative: "____(30)____, but our dispute investigations team usually resolves unauthorized claims within three business days."',
        question_text: 'Select the best option for blank (26).',
        difficulty: 'easy',
        explanation: 'Elena ได้รับข้อความตัดเงินแต่ตนเองไม่ได้ทำรายการ: "I never initiated or authorized this transaction" (ฉันไม่เคยทำรายการหรืออนุมัติยอดนี้เลย)',
        trap_analysis: 'เป็นสถานการณ์แจ้งยอดบัตรผิดปกติ (Fraudulent transaction)',
        options: [
            { label: '1', content: 'I never initiated or authorized this transaction', is_correct: 1 },
            { label: '2', content: 'I bought three expensive gaming laptops yesterday', is_correct: 0 },
            { label: '3', content: 'I love donating money to international software developers', is_correct: 0 },
            { label: '4', content: 'I am calling to praise your outstanding security protocols', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s2_27',
        subject_id: 'tgat1',
        set_number: 2,
        blueprint_id: 'tgat1_spk_lc',
        stimulus: 'Situation: Elena is calling customer care regarding an unauthorized charge on her digital wallet.\n\nElena: "I just received an SMS alert for a $350 international software purchase, but I never initiated or authorized this transaction!"\nRepresentative: "I completely understand how alarming that must be, Ms. Vance. First, ____(27)____ to prevent any subsequent transactions."',
        question_text: 'Select the best option for blank (27).',
        difficulty: 'medium',
        explanation: 'ขั้นตอนแรกของเจ้าหน้าที่เมื่อพบบัตรถูกแฮกคือการระงับบัญชี/บัตรชั่วคราว: "allow me to temporarily freeze your digital card" (ขออนุญาตระงับบัตรดิจิทัลของคุณชั่วคราว)',
        trap_analysis: 'ดูประโยคถัดไปของ Elena: "Yes, please freeze it right away" ชัดเจนว่าถามเรื่องการ freeze บัตร',
        options: [
            { label: '1', content: 'allow me to temporarily freeze your digital card and linked accounts', is_correct: 1 },
            { label: '2', content: 'you must transfer an additional thousand dollars into our holding account', is_correct: 0 },
            { label: '3', content: 'please delete your email address and throw your smartphone away', is_correct: 0 },
            { label: '4', content: 'let us celebrate this milestone with an interactive customer survey', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s2_28',
        subject_id: 'tgat1',
        set_number: 2,
        blueprint_id: 'tgat1_spk_lc',
        stimulus: 'Situation: Elena is calling customer care regarding an unauthorized charge on her digital wallet.\n\nElena: "Will I be held liable for this fraudulent sum?"\nRepresentative: "Rest assured, as long as you did not willingly disclose your one-time passcode (OTP), ____(28)____."',
        question_text: 'Select the best option for blank (28).',
        difficulty: 'hard',
        explanation: 'เจ้าหน้าที่ปลอบใจว่าลูกค้าไม่ต้องรับผิดชอบยอดเงินทุจริตตามนโยบายคุ้มครอง: "our zero-liability fraud policy protects you from all unauthorized deductions." (นโยบายคุ้มครองความรับผิดชอบเป็นศูนย์จะปกป้องคุณจากการหักเงินโดยไม่ได้รับอนุญาตทั้งหมด)',
        trap_analysis: 'Elena ถามว่า "Will I be held liable...?" คำตอบต้องเกี่ยวข้องกับความรับผิดชอบ (liability / protection)',
        options: [
            { label: '1', content: 'our zero-liability fraud protection policy covers you completely', is_correct: 1 },
            { label: '2', content: 'you will have to work as an unpaid intern at our headquarters', is_correct: 0 },
            { label: '3', content: 'the bank reserves the legal right to seize your private personal vehicle', is_correct: 0 },
            { label: '4', content: 'hackers are legally entitled to retain all stolen funds under international law', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s2_29',
        subject_id: 'tgat1',
        set_number: 2,
        blueprint_id: 'tgat1_spk_lc',
        stimulus: 'Situation: Elena is calling customer care regarding an unauthorized charge on her digital wallet.\n\nElena: "I definitely did not share any OTP. What is the next procedure to recover my funds?"\nRepresentative: "I will open a formal fraud dispute ticket right now. ____(29)____."',
        question_text: 'Select the best option for blank (29).',
        difficulty: 'medium',
        explanation: 'เจ้าหน้าที่แจ้งขั้นตอนการส่งเอกสารยืนยันตัวตน: "You will receive an automated confirmation email containing an affidavit of fraud form to sign." (คุณจะได้รับอีเมลยืนยันอัตโนมัติพร้อมแบบฟอร์มยืนยันรายการทุจริตเพื่อลงนาม)',
        trap_analysis: 'ขั้นตอนการเคลมเงินคืนทางธนาคารต้องมีเอกสารยืนยัน (affidavit / confirmation email)',
        options: [
            { label: '1', content: 'You will receive an automated confirmation email with an incident reference number and affidavit', is_correct: 1 },
            { label: '2', content: 'Please fly to our corporate branch in Zurich to sign a paper contract', is_correct: 0 },
            { label: '3', content: 'We will post your personal mobile number on our social media page', is_correct: 0 },
            { label: '4', content: 'You must memorize a twenty-digit secret code within thirty seconds', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s2_30',
        subject_id: 'tgat1',
        set_number: 2,
        blueprint_id: 'tgat1_spk_lc',
        stimulus: 'Situation: Elena is calling customer care regarding an unauthorized charge on her digital wallet.\n\nElena: "How long does the provisional credit typically take to reflect in my bank account?"\nRepresentative: "____(30)____, but our dispute investigations team usually resolves unauthorized claims within three business days."',
        question_text: 'Select the best option for blank (30).',
        difficulty: 'medium',
        explanation: 'ตอบเรื่องระยะเวลาการคืนเงิน: "It depends somewhat on your issuing bank’s clearing processing times" (ขึ้นอยู่กับระยะเวลาประมวลผลของธนาคารเจ้าของบัตรของคุณด้วยส่วนหนึ่ง)',
        trap_analysis: 'คำถามถาม "How long does it typically take...?" คำตอบต้องระบุเงื่อนไขเวลาและกระบวนการของธนาคาร',
        options: [
            { label: '1', content: 'It depends slightly on your receiving bank’s internal processing cycle', is_correct: 1 },
            { label: '2', content: 'Banks refuse to open their doors during spring and autumn seasons', is_correct: 0 },
            { label: '3', content: 'Credit scores are calculated by astrology and celestial planetary alignments', is_correct: 0 },
            { label: '4', content: 'Nobody has ever received a refund in the history of global finance', is_correct: 0 }
        ]
    },

    // =========================================================================
    // PART 2.1: TEXT COMPLETION (Questions 31 - 45)
    // =========================================================================
    // Passage 1: The Transformative Ascent of Generative Artificial Intelligence (Questions 31 - 37)
    {
        id: 'q_tgat1_s2_31',
        subject_id: 'tgat1',
        set_number: 2,
        blueprint_id: 'tgat1_rd_tc',
        stimulus: 'Passage 1 (Questions 31 - 37)\n\nIn recent years, generative artificial intelligence has progressed at an astonishing pace, fundamentally altering how humans create, communicate, and solve problems. Unlike traditional predictive models that solely categorize historical data, generative algorithms possess the uncanny ability ____(31)____ completely novel content, ranging from photorealistic artwork to intricate lines of computer code. This unprecedented capability has prompted industries across the globe to ____(32)____ their standard operating workflows. Proponents argue that by automating monotonous clerical tasks, generative tools liberate human workers to focus on creative synthesis and strategic leadership. ____(33)____, skeptics warn that unchecked adoption may lead to profound labor displacement and intellectual complacency.\n\nFurthermore, the proliferation of synthesized media has spawned urgent ethical dilemmas. The emergence of deepfakes—synthetic videos so authentic that they easily deceive the casual observer—presents serious challenges to digital forensics and democratic integrity. ____(34)____ regulatory bodies implement robust authentication frameworks, malicious actors will continue to exploit these tools to disseminate disinformation at scale. Experts insist that technology companies ____(35)____ cryptographic watermarking into all generated media. Only through proactive governance ____(36)____ to preserve public trust in online information ecosystems. Ultimately, the future of artificial intelligence will not be decided by algorithmic capabilities alone, but by our collective commitment to ____(37)____ human values throughout technological evolution.',
        question_text: 'Select the best answer for blank (31).',
        difficulty: 'medium',
        explanation: 'โครงสร้าง "possess the ability + to-infinitive": "the ability to produce" (ความสามารถในการผลิต/สร้างสรรค์เนื้อหาใหม่)',
        trap_analysis: 'หลัง ability มักตามด้วย to + V.inf ไม่ใช่ V.ing หรือ bare infinitive',
        options: [
            { label: '1', content: 'to produce', is_correct: 1 },
            { label: '2', content: 'producing', is_correct: 0 },
            { label: '3', content: 'produced', is_correct: 0 },
            { label: '4', content: 'having produced', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s2_32',
        subject_id: 'tgat1',
        set_number: 2,
        blueprint_id: 'tgat1_rd_tc',
        stimulus: 'Passage 1 (Questions 31 - 37)\n\nUnlike traditional predictive models that solely categorize historical data, generative algorithms possess the uncanny ability to produce completely novel content... This unprecedented capability has prompted industries across the globe to ____(32)____ their standard operating workflows.',
        question_text: 'Select the best answer for blank (32).',
        difficulty: 'medium',
        explanation: 'โครงสร้าง "prompt someone to + V.inf" และความหมายคือ "ปรับโครงสร้าง / ยกเครื่องกระบวนการทำงานใหม่": "restructure" (ปรับโครงสร้าง)',
        trap_analysis: 'ตัวเลือกอื่นมีความหมายเชิงลบหรือไม่เข้ากับบริบท เช่น deteriorate (เสื่อมโทรม), stagnate (หยุดนิ่ง)',
        options: [
            { label: '1', content: 'restructure', is_correct: 1 },
            { label: '2', content: 'deteriorate', is_correct: 0 },
            { label: '3', content: 'stagnate', is_correct: 0 },
            { label: '4', content: 'surrender', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s2_33',
        subject_id: 'tgat1',
        set_number: 2,
        blueprint_id: 'tgat1_rd_tc',
        stimulus: 'Passage 1 (Questions 31 - 37)\n\nProponents argue that by automating monotonous clerical tasks, generative tools liberate human workers to focus on creative synthesis and strategic leadership. ____(33)____, skeptics warn that unchecked adoption may lead to profound labor displacement and intellectual complacency.',
        question_text: 'Select the best answer for blank (33).',
        difficulty: 'easy',
        explanation: 'ประโยคหน้าพูดถึงข้อดี (Proponents argue...) ประโยคหลังพูดถึงข้อเสียและคำเตือน (skeptics warn...) คำเชื่อมที่แสดงความขัดแย้งระหว่างสองมุมมองคือ "Conversely" หรือ "However": "Conversely" (ในทางกลับกัน)',
        trap_analysis: 'Furthermore, Consequently, Therefore เป็นคำเชื่อมแสดงการคล้อยตามหรือผลลัพธ์ ไม่แสดงความขัดแย้ง',
        options: [
            { label: '1', content: 'Conversely', is_correct: 1 },
            { label: '2', content: 'Furthermore', is_correct: 0 },
            { label: '3', content: 'Consequently', is_correct: 0 },
            { label: '4', content: 'Similarly', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s2_34',
        subject_id: 'tgat1',
        set_number: 2,
        blueprint_id: 'tgat1_rd_tc',
        stimulus: 'Passage 1 (Questions 31 - 37)\n\n____(34)____ regulatory bodies implement robust authentication frameworks, malicious actors will continue to exploit these tools to disseminate disinformation at scale.',
        question_text: 'Select the best answer for blank (34).',
        difficulty: 'medium',
        explanation: 'บริบทบอกว่า "หากหน่วยงานกำกับดูแลไม่นำกรอบตรวจสอบมาใช้ ผู้ไม่หวังดีก็จะเผยแพร่ข้อมูลเท็จต่อไป" คำเชื่อมเงื่อนไขปฏิเสธ (if not) คือ "Unless" (เว้นแต่ว่า / ถ้า...ไม่)',
        trap_analysis: 'หากใช้ Although ความหมายจะขัดกับผลลัพธ์ของประโยคหลัง ส่วน In case แปลว่า เผื่อว่า',
        options: [
            { label: '1', content: 'Unless', is_correct: 1 },
            { label: '2', content: 'Although', is_correct: 0 },
            { label: '3', content: 'In case', is_correct: 0 },
            { label: '4', content: 'Provided that', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s2_35',
        subject_id: 'tgat1',
        set_number: 2,
        blueprint_id: 'tgat1_rd_tc',
        stimulus: 'Passage 1 (Questions 31 - 37)\n\nExperts insist that technology companies ____(35)____ cryptographic watermarking into all generated media.',
        question_text: 'Select the best answer for blank (35).',
        difficulty: 'hard',
        explanation: 'กฎไวยากรณ์ **Subjunctive Mood** หลังกริยาแสดงข้อเรียกร้อง/คำแนะนำอย่างหนักแน่น (insist that + Subject + [should] + V.base form): ต้องใช้รูปกริยาฐาน "embed" (ไม่มี s, ed หรือ ing)',
        trap_analysis: 'ข้อสอบชอบออกจุดนี้มาก! ผู้เรียนมักเลือก embeds ตามประธาน หรือ embedded ตามอดีต ซึ่งผิดกฎ Subjunctive Mood',
        options: [
            { label: '1', content: 'embed', is_correct: 1 },
            { label: '2', content: 'embedded', is_correct: 0 },
            { label: '3', content: 'embeds', is_correct: 0 },
            { label: '4', content: 'embedding', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s2_36',
        subject_id: 'tgat1',
        set_number: 2,
        blueprint_id: 'tgat1_rd_tc',
        stimulus: 'Passage 1 (Questions 31 - 37)\n\nOnly through proactive governance ____(36)____ to preserve public trust in online information ecosystems.',
        question_text: 'Select the best answer for blank (36).',
        difficulty: 'hard',
        explanation: 'กฎไวยากรณ์ **Inversion**: เมื่อประโยคขึ้นต้นด้วยวลีปฏิเสธหรือจำกัดเงื่อนไขเข้มงวด เช่น "Only through..." โครงสร้างต้องสลับกริยาช่วยขึ้นก่อนประธาน: "will society be able" (กริยาช่วย will + ประธาน society + be able)',
        trap_analysis: 'ระวังตอบ "society will be able" ซึ่งเป็นโครงสร้างประโยคบอกเล่าธรรมดาที่ผิดกฎ Inversion',
        options: [
            { label: '1', content: 'will society be able', is_correct: 1 },
            { label: '2', content: 'society will be able', is_correct: 0 },
            { label: '3', content: 'is society being able', is_correct: 0 },
            { label: '4', content: 'society is able', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s2_37',
        subject_id: 'tgat1',
        set_number: 2,
        blueprint_id: 'tgat1_rd_tc',
        stimulus: 'Passage 1 (Questions 31 - 37)\n\nUltimately, the future of artificial intelligence will not be decided by algorithmic capabilities alone, but by our collective commitment to ____(37)____ human values throughout technological evolution.',
        question_text: 'Select the best answer for blank (37).',
        difficulty: 'hard',
        explanation: 'โครงสร้าง "commitment to + V.ing" (คำว่า commitment to ในที่นี้ to เป็น preposition จึงต้องตามด้วย gerund V.ing): "upholding" (การเชิดชู/ยึดมั่นในคุณค่าความเป็นมนุษย์)',
        trap_analysis: 'ผู้เรียนมักคิดว่าหลัง to ต้องเป็น V.inf เสมอ แต่ commitment to / look forward to / object to เป็น preposition ต้องตามด้วย V.ing!',
        options: [
            { label: '1', content: 'upholding', is_correct: 1 },
            { label: '2', content: 'uphold', is_correct: 0 },
            { label: '3', content: 'upheld', is_correct: 0 },
            { label: '4', content: 'have upheld', is_correct: 0 }
        ]
    },

    // Passage 2: The Neuroscience of Digital Distraction & Focus (Questions 38 - 45)
    {
        id: 'q_tgat1_s2_38',
        subject_id: 'tgat1',
        set_number: 2,
        blueprint_id: 'tgat1_rd_tc',
        stimulus: 'Passage 2 (Questions 38 - 45)\n\nIn our hyper-connected contemporary society, the human attention span has become an increasingly scarce commodity. With smartphones incessantly vibrating and social algorithms engineered to maximize user engagement, individuals find themselves in a state of continuous partial attention. Neuroscientists have discovered that every incoming ping ____(38)____ a micro-dose of dopamine in the brain\'s reward circuitry, conditioning us to seek instantaneous gratification. Consequently, long-form reading and contemplative inquiry are frequently ____(39)____ by habitual screen checking.\n\nThis chronic fragmentation of focus incurs significant cognitive penalties. When a worker is interrupted during a complex task, research indicates that it requires an average of twenty-three minutes to ____(40)____ full concentration. ____(41)____ believed that multitasking was an admirable badge of efficiency, cognitive psychologists now confirm that the human prefrontal cortex cannot process simultaneous high-load attentional streams; rather, it rapidly switches back and forth, ____(42)____ substantial mental fatigue.\n\nTo reclaim sovereign control over their cognitive faculties, many knowledge workers are adopting deliberate digital detox strategies. Some utilize application blockers during working hours, whereas others schedule offline sabbaticals on weekends. It is essential that modern professionals ____(43)____ clear digital boundaries to safeguard their psychological well-being. Were individuals ____(44)____ to cultivate sustained deep work habits, their career longevity and personal satisfaction would flourish remarkably. Learning to filter out extraneous sensory input is no longer an optional luxury; it is ____(45)____ survival skill of the twenty-first century.',
        question_text: 'Select the best answer for blank (38).',
        difficulty: 'easy',
        explanation: 'ประธานคือ "every incoming ping" เป็นเอกพจน์ (Singular subject) กริยาใน Present Simple แสดงข้อเท็จจริงทางวิทยาศาสตร์จึงต้องเติม s: "triggers" (กระตุ้นการหลั่งโดปามีน)',
        trap_analysis: 'ระวังตอบ trigger รูปพหูพจน์ หรือ triggering ที่ไม่ใช่กริยาแท้',
        options: [
            { label: '1', content: 'triggers', is_correct: 1 },
            { label: '2', content: 'trigger', is_correct: 0 },
            { label: '3', content: 'triggering', is_correct: 0 },
            { label: '4', content: 'have triggered', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s2_39',
        subject_id: 'tgat1',
        set_number: 2,
        blueprint_id: 'tgat1_rd_tc',
        stimulus: 'Passage 2 (Questions 38 - 45)\n\nConsequently, long-form reading and contemplative inquiry are frequently ____(39)____ by habitual screen checking.',
        question_text: 'Select the best answer for blank (39).',
        difficulty: 'medium',
        explanation: 'โครงสร้าง Passive Voice (are frequently + V.3 + by...): "displaced" (ถูกแทนที่ / ถูกเบียดบังโดยพฤติกรรมการเช็กหน้าจอ)',
        trap_analysis: 'คำว่า displaced เข้ากับบริบทการถูกแทนที่ที่สุด ตัวเลือกอื่นเช่น elevated (ยกย่อง) ขัดแย้งกับบริบท',
        options: [
            { label: '1', content: 'displaced', is_correct: 1 },
            { label: '2', content: 'elevated', is_correct: 0 },
            { label: '3', content: 'amplified', is_correct: 0 },
            { label: '4', content: 'commemorated', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s2_40',
        subject_id: 'tgat1',
        set_number: 2,
        blueprint_id: 'tgat1_rd_tc',
        stimulus: 'Passage 2 (Questions 38 - 45)\n\nWhen a worker is interrupted during a complex task, research indicates that it requires an average of twenty-three minutes to ____(40)____ full concentration.',
        question_text: 'Select the best answer for blank (40).',
        difficulty: 'easy',
        explanation: 'โครงสร้าง "requires twenty-three minutes to + V.inf": "resume" (กลับมาเริ่มต้นทำต่อ / ดึงสมาธิกลับมา)',
        trap_analysis: 'to resume แปลว่า ดำเนินต่อหลังจากถูกขัดจังหวะ ตัวเลือกอื่นเช่น terminate (ยุติ) ไม่ตรงความหมาย',
        options: [
            { label: '1', content: 'resume', is_correct: 1 },
            { label: '2', content: 'terminate', is_correct: 0 },
            { label: '3', content: 'forfeit', is_correct: 0 },
            { label: '4', content: 'demolish', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s2_41',
        subject_id: 'tgat1',
        set_number: 2,
        blueprint_id: 'tgat1_rd_tc',
        stimulus: 'Passage 2 (Questions 38 - 45)\n\n____(41)____ believed that multitasking was an admirable badge of efficiency, cognitive psychologists now confirm that the human prefrontal cortex cannot process simultaneous high-load attentional streams...',
        question_text: 'Select the best answer for blank (41).',
        difficulty: 'medium',
        explanation: 'ประโยคแสดงการลดรูป Participial Phrase (Concession): "Once widely believed" (ครั้งหนึ่งเคยเป็นที่เชื่อกันอย่างกว้างขวางว่าการทำหลายงานพร้อมกันคือสัญลักษณ์ของประสิทธิภาพ)',
        trap_analysis: 'รูปอดีต Passive ของความเชื่อในอดีตที่ถูกหักล้างในปัจจุบันคือ "Once widely believed"',
        options: [
            { label: '1', content: 'Once widely believed', is_correct: 1 },
            { label: '2', content: 'Having believing', is_correct: 0 },
            { label: '3', content: 'To have belief', is_correct: 0 },
            { label: '4', content: 'Because belief', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s2_42',
        subject_id: 'tgat1',
        set_number: 2,
        blueprint_id: 'tgat1_rd_tc',
        stimulus: 'Passage 2 (Questions 38 - 45)\n\n...rather, it rapidly switches back and forth, ____(42)____ substantial mental fatigue.',
        question_text: 'Select the best answer for blank (42).',
        difficulty: 'medium',
        explanation: 'ลดรูป Participle Clause แสดงผลลัพธ์ที่ตามมา (Resulting participle): ", causing substantial mental fatigue" (ส่งผลให้เกิดความเหนื่อยล้าทางสมองอย่างมีนัยสำคัญ)',
        trap_analysis: 'เครื่องหมาย comma คั่นตามด้วยผลลัพธ์ที่ประธานเป็นผู้กระทำ ใช้ Present Participle (V.ing)',
        options: [
            { label: '1', content: 'causing', is_correct: 1 },
            { label: '2', content: 'causes', is_correct: 0 },
            { label: '3', content: 'caused', is_correct: 0 },
            { label: '4', content: 'to have caused', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s2_43',
        subject_id: 'tgat1',
        set_number: 2,
        blueprint_id: 'tgat1_rd_tc',
        stimulus: 'Passage 2 (Questions 38 - 45)\n\nIt is essential that modern professionals ____(43)____ clear digital boundaries to safeguard their psychological well-being.',
        question_text: 'Select the best answer for blank (43).',
        difficulty: 'hard',
        explanation: 'โครงสร้าง **Subjunctive Mood** หลังคุณศัพท์แสดงความจำเป็นยิ่งยวด (It is essential that + Subject + [should] + V.base form): ต้องใช้ "establish" ในรูปกริยาฐาน',
        trap_analysis: 'ระวังหลงเลือก establishes ตามประธาน หรือ established ตามความคุ้นชิน',
        options: [
            { label: '1', content: 'establish', is_correct: 1 },
            { label: '2', content: 'established', is_correct: 0 },
            { label: '3', content: 'establishes', is_correct: 0 },
            { label: '4', content: 'establishing', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s2_44',
        subject_id: 'tgat1',
        set_number: 2,
        blueprint_id: 'tgat1_rd_tc',
        stimulus: 'Passage 2 (Questions 38 - 45)\n\nWere individuals ____(44)____ to cultivate sustained deep work habits, their career longevity and personal satisfaction would flourish remarkably.',
        question_text: 'Select the best answer for blank (44).',
        difficulty: 'hard',
        explanation: 'ไวยากรณ์ **Inversion of Conditional (Type 2)**: ละ If โดยขึ้นต้นด้วย Were (Were + Subject + to-infinitive): "Were individuals to learn to cultivate..." (หากบุคคลเรียนรู้ที่จะบ่มเพาะนิสัยการทำงานลึกซึ้งได้จริง)',
        trap_analysis: 'โครงสร้าง Inversion ของ If clause แบบที่ 2 เมื่อละ If และใช้ Were จะเป็น "Were + S + to + V.inf"',
        options: [
            { label: '1', content: 'to learn', is_correct: 1 },
            { label: '2', content: 'learned', is_correct: 0 },
            { label: '3', content: 'learning', is_correct: 0 },
            { label: '4', content: 'have learned', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s2_45',
        subject_id: 'tgat1',
        set_number: 2,
        blueprint_id: 'tgat1_rd_tc',
        stimulus: 'Passage 2 (Questions 38 - 45)\n\nLearning to filter out extraneous sensory input is no longer an optional luxury; it is ____(45)____ survival skill of the twenty-first century.',
        question_text: 'Select the best answer for blank (45).',
        difficulty: 'easy',
        explanation: 'ต้องการคำคุณศัพท์ที่มีความหมายว่า "จำเป็นอย่างยิ่ง / ขาดไม่ได้": "an indispensable" (ทักษะเอาชีวิตรอดที่ขาดไม่ได้ในศตวรรษที่ 21)',
        trap_analysis: 'indispensable แปลว่า ขาดไม่ได้ ส่วน dispensable แปลว่า ไม่จำเป็น',
        options: [
            { label: '1', content: 'an indispensable', is_correct: 1 },
            { label: '2', content: 'a dispensable', is_correct: 0 },
            { label: '3', content: 'a superficial', is_correct: 0 },
            { label: '4', content: 'an obsolete', is_correct: 0 }
        ]
    },

    // =========================================================================
    // PART 2.2: READING COMPREHENSION (Questions 46 - 60)
    // =========================================================================
    // Reading Passage 1: Public Notice - Autonomous Campus Transit System (Questions 46 - 50)
    {
        id: 'q_tgat1_s2_46',
        subject_id: 'tgat1',
        set_number: 2,
        blueprint_id: 'tgat1_rd_rc',
        stimulus: `OFFICIAL MEMORANDUM: METROPOLITAN UNIVERSITY CAMPUS MOBILITY INITIATIVE\nDate: November 12, 2026\nTo: All Faculty, Staff, and Students\nSubject: Launch of Phase II Autonomous Electric Shuttle Service\n\nBeginning Monday, December 1, Metropolitan University will commence full-scale deployment of our zero-emission Autonomous Electric Shuttles (AES-Fleet). Following an eight-month trial period across perimeter lots, the service will now expand into the congested central academic corridor, connecting the East Residence Quad, the Central Research Complex, and the Science & Engineering Promenade.\n\nOperational Protocols & Passenger Guidelines:\n1. Schedule and Frequency: Shuttles operate continuously on weekdays between 06:30 and 22:30 at eight-minute headways during peak periods (08:00–10:30 and 16:00–18:30) and twelve-minute intervals off-peak.\n2. Safety Redundancies: Each twelve-passenger vehicle is equipped with multi-spectrum LiDAR, optical computer vision cameras, and automated pedestrian-detection sensors. A certified Safety Operator remains onboard every vehicle throughout Phase II to manually override vehicle controls should unexpected weather anomalies or erratic pedestrian movements occur.\n3. Accessibility & Boarding: All shuttles feature low-floor pneumatic ramps complying with universal accessibility standards. Boarding is entirely cashless; passengers simply tap their verified digital student identity cards at the contactless turnstile near the vehicle threshold.\n4. Pedestrian & Cyclist Priority: Autonomous shuttles are programmed to yield unconditionally to human pedestrians and cyclists at all designated crosswalks. The fleet maintains a maximum velocity ceiling of 20 km/h across pedestrian zones.\n\nFor real-time vehicle tracking, seat occupancy updates, and lost-property claims, please download the "MetroCampus Transit" application from iOS and Android repositories. Direct feedback and incident reporting should be channeled to transport-initiative@metro.edu.`,
        question_text: 'What is the primary objective of the memorandum?',
        difficulty: 'easy',
        explanation: 'เนื้อเรื่องของประกาศแจ้งเกี่ยวกับการเปิดให้บริการรถบัสไฟฟ้าไร้คนขับระยะที่ 2 ในมหาวิทยาลัยอย่างเป็นทางการ: "To announce the full-scale operational rollout of autonomous electric shuttles across central campus"',
        trap_analysis: 'ตัวเลือกอื่นพูดถึงแค่การวิจัย หรือพูดถึงการห้ามขี่จักรยาน ซึ่งไม่ใช่ใจความหลัก',
        options: [
            { label: '1', content: 'To announce the full-scale operational rollout of autonomous electric shuttles across central campus', is_correct: 1 },
            { label: '2', content: 'To notify students that personal bicycles are strictly prohibited in the academic corridor', is_correct: 0 },
            { label: '3', content: 'To recruit student volunteers to test experimental battery technology', is_correct: 0 },
            { label: '4', content: 'To explain why parking fees will double starting next semester', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s2_47',
        subject_id: 'tgat1',
        set_number: 2,
        blueprint_id: 'tgat1_rd_rc',
        stimulus: `OFFICIAL MEMORANDUM: METROPOLITAN UNIVERSITY CAMPUS MOBILITY INITIATIVE\n...A certified Safety Operator remains onboard every vehicle throughout Phase II to manually override vehicle controls should unexpected weather anomalies or erratic pedestrian movements occur.`,
        question_text: 'According to the passage, why is a human Safety Operator stationed aboard each autonomous shuttle?',
        difficulty: 'medium',
        explanation: 'ประกาศระบุชัดเจนว่าเจ้าหน้าที่ความปลอดภัยมีไว้เพื่อเข้าควบคุมรถแบบแมนนวลกรณีเกิดสภาพอากาศแปรปรวนผิดปกติหรือคนเดินถนนเคลื่อนไหวไม่คาดคิด: "To intervene manually if erratic pedestrian behavior or severe weather compromises vehicle sensors."',
        trap_analysis: 'ไม่ใช่คนเก็บเงิน (เพราะระบบเป็น cashless แตะบัตร) และไม่ใช่คนขับรถตลอดเวลา',
        options: [
            { label: '1', content: 'To intervene manually if erratic pedestrian behavior or severe weather compromises vehicle safety', is_correct: 1 },
            { label: '2', content: 'To collect cash fares from passengers who do not carry digital identity cards', is_correct: 0 },
            { label: '3', content: 'To manually steer and accelerate the shuttle along the entire designated route', is_correct: 0 },
            { label: '4', content: 'To inspect student backpacks for prohibited electronic equipment', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s2_48',
        subject_id: 'tgat1',
        set_number: 2,
        blueprint_id: 'tgat1_rd_rc',
        stimulus: `OFFICIAL MEMORANDUM: METROPOLITAN UNIVERSITY CAMPUS MOBILITY INITIATIVE\n...Shuttles operate continuously on weekdays between 06:30 and 22:30 at eight-minute headways during peak periods (08:00–10:30 and 16:00–18:30) and twelve-minute intervals off-peak.`,
        question_text: 'The word "headways" in Section 1 is closest in meaning to:',
        difficulty: 'hard',
        explanation: 'คำว่า "headway" ในวงการคมนาคมขนส่งสาธารณะหมายถึง "ระยะเวลาห่างระหว่างเที่ยวรถคันหนึ่งกับคันถัดไป": "intervals between successive vehicles" (ช่วงเวลาห่างระหว่างรถ)',
        trap_analysis: 'ระวังแปลความหมายตรงตัวว่า หัวทาง หรือความเร็วรถ',
        options: [
            { label: '1', content: 'intervals between successive vehicles', is_correct: 1 },
            { label: '2', content: 'maximum passenger capacity limits', is_correct: 0 },
            { label: '3', content: 'top acceleration speeds recorded', is_correct: 0 },
            { label: '4', content: 'distances traveled without recharging', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s2_49',
        subject_id: 'tgat1',
        set_number: 2,
        blueprint_id: 'tgat1_rd_rc',
        stimulus: `OFFICIAL MEMORANDUM: METROPOLITAN UNIVERSITY CAMPUS MOBILITY INITIATIVE\n...Boarding is entirely cashless; passengers simply tap their verified digital student identity cards at the contactless turnstile near the vehicle threshold.`,
        question_text: 'Which of the following is TRUE regarding boarding procedures for the AES-Fleet?',
        difficulty: 'medium',
        explanation: 'ข้อความระบุว่า "Boarding is entirely cashless; passengers simply tap their verified digital student identity cards" คือต้องใช้บัตรประจำตัวดิจิทัลแตะที่เครื่องสแกน: "Passengers validate their rides digitally via contactless card authentication."',
        trap_analysis: 'ตัวเลือกที่ระบุว่าจ่ายเงินสดหรือต้องซื้อตั๋วกระดาษล่วงหน้าล้วนผิดความจริง',
        options: [
            { label: '1', content: 'Passengers validate their rides digitally via contactless card authentication', is_correct: 1 },
            { label: '2', content: 'Cash payments are accepted during weekend night operations only', is_correct: 0 },
            { label: '3', content: 'Paper ticketing booths have been erected at every shuttle stop', is_correct: 0 },
            { label: '4', content: 'Students must submit biometric retinal scans prior to boarding', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s2_50',
        subject_id: 'tgat1',
        set_number: 2,
        blueprint_id: 'tgat1_rd_rc',
        stimulus: `OFFICIAL MEMORANDUM: METROPOLITAN UNIVERSITY CAMPUS MOBILITY INITIATIVE\n...Autonomous shuttles are programmed to yield unconditionally to human pedestrians and cyclists at all designated crosswalks. The fleet maintains a maximum velocity ceiling of 20 km/h across pedestrian zones.`,
        question_text: 'What can be inferred about the university’s traffic policy from Section 4?',
        difficulty: 'medium',
        explanation: 'การที่รถถูกตั้งโปรแกรมให้ชะลอและหยุดให้คนข้ามเสมอ (yield unconditionally) และจำกัดความเร็วต่ำ สะท้อนว่า: "Pedestrian and cyclist safety takes precedence over vehicle transit speed." (ความปลอดภัยของคนเดินเท้าและผู้ขี่จักรยานมีความสำคัญเหนือความเร็วในการเดินทาง)',
        trap_analysis: 'ไม่ใช่การห้ามคนเดิน แต่เป็นการให้ความสำคัญสูงสุดกับคนเดินถนน',
        options: [
            { label: '1', content: 'Pedestrian and cyclist safety takes absolute precedence over transit speed', is_correct: 1 },
            { label: '2', content: 'Shuttles are encouraged to accelerate past crosswalks to maintain schedules', is_correct: 0 },
            { label: '3', content: 'Cyclists must dismount and walk whenever an autonomous shuttle is in sight', is_correct: 0 },
            { label: '4', content: 'Autonomous vehicles have legal right-of-way over all biological entities', is_correct: 0 }
        ]
    },

    // Reading Passage 2: Deep-Sea Bioluminescence and Biomedical Breakthroughs (Questions 51 - 55)
    {
        id: 'q_tgat1_s2_51',
        subject_id: 'tgat1',
        set_number: 2,
        blueprint_id: 'tgat1_rd_rc',
        stimulus: `In the pitch-black abyss of the bathypelagic zone, where sunlight never penetrates and crushing pressures exceed one thousand atmospheres, life flourishes through cold biological light. Approximately ninety percent of deep-sea marine fauna utilize bioluminescence—the production and emission of light generated through internal biochemical reactions. While terrestrial creatures rarely glow, deep-sea organisms have harnessed luminescence for an astonishing array of evolutionary functions: attracting mates in the void, projecting dazzling flashes to temporarily blind predators, and generating faint ventral illumination to match downwelling ambient light, a cloaking phenomenon known as counter-illumination.\n\nThe biochemical mechanism driving this living light typically involves two core components: a light-emitting substrate called a luciferin, and an enzyme catalyst known as a luciferase. When luciferase catalyzes the oxidation of luciferin in the presence of adenosine triphosphate (ATP) and oxygen, energy is released almost entirely as visible light photons rather than thermal heat. This remarkable biochemical efficiency has transfixed medical researchers and molecular biologists worldwide.\n\nOver the past two decades, engineered derivatives of marine luciferases have catalyzed a revolution in biomedical imaging. By tagging specific cancer cells or infectious pathogens with luciferase-encoding genes, oncologists can monitor tumor metastasis and track immune responses non-invasively in real time within living laboratory models. Unlike conventional fluorescent dyes, which require intense external ultraviolet radiation that can inadvertently damage delicate cellular structures, bioluminescent reporters generate their own light internally, eliminating autofluorescence and yielding unparalleled optical clarity.\n\nFurthermore, recent breakthroughs in optogenetics—a biological technique that utilizes light to control cellular activity—have integrated deep-sea luciferases to stimulate light-sensitive ion channels in neural tissue. This enables neuroscientists to modulate neurological circuits deep within the brain without implanting invasive physical optic fibers. As deep-sea exploration submersible technology advances, scientists are unlocking novel luciferin variants from hydrothermal vent hydrothermal ecosystems, each possessing unique biochemical stability and wavelength emissions that promise to expand human diagnostic medicine into realms once deemed science fiction.`,
        question_text: 'Which title best captures the core theme of the passage?',
        difficulty: 'easy',
        explanation: 'บทความกล่าวถึงการกำเนิดแสงชีวภาพ (Bioluminescence) ของสิ่งมีชีวิตใต้ทะเลลึก และการนำเอนไซม์ luciferase มาปฏิวัติการแพทย์และการตรวจวินิจฉัยโรค: "From Abyssal Depths to Modern Clinics: The Medical Revolution of Bioluminescence"',
        trap_analysis: 'ตัวเลือกอื่นเน้นแค่การทำลายสิ่งแวดล้อมหรือพูดถึงเรื่องเรือดำน้ำ ซึ่งไม่ใช่แก่นเรื่อง',
        options: [
            { label: '1', content: 'From Abyssal Depths to Modern Clinics: The Medical Revolution of Bioluminescence', is_correct: 1 },
            { label: '2', content: 'The Environmental Destruction of Deep-Sea Hydrothermal Ecosystems', is_correct: 0 },
            { label: '3', content: 'Why Sunken Submersibles Struggle in High-Pressure Ocean Zones', is_correct: 0 },
            { label: '4', content: 'The Extinction Crisis Facing Terrestrial Insects and Fireflies', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s2_52',
        subject_id: 'tgat1',
        set_number: 2,
        blueprint_id: 'tgat1_rd_rc',
        stimulus: `...While terrestrial creatures rarely glow, deep-sea organisms have harnessed luminescence for an astonishing array of evolutionary functions: attracting mates in the void, projecting dazzling flashes to temporarily blind predators, and generating faint ventral illumination to match downwelling ambient light, a cloaking phenomenon known as counter-illumination.`,
        question_text: 'According to paragraph 1, how does "counter-illumination" help deep-sea creatures survive?',
        difficulty: 'medium',
        explanation: 'ในย่อหน้าที่ 1 ระบุว่า counter-illumination คือการเปล่งแสงเรืองๆ ใต้ท้องเพื่อพรางตัวให้กลมกลืนกับแสงจากเบื้องบน: "It functions as camouflage by matching ventral light with faint downwelling ambient light."',
        trap_analysis: 'ระวังตัวเลือกที่บอกว่าใช้เผาเหยื่อด้วยความร้อน ซึ่งขัดแย้งกับคำว่า "cold biological light"',
        options: [
            { label: '1', content: 'It acts as camouflage by matching ventral light with downwelling ambient illumination', is_correct: 1 },
            { label: '2', content: 'It incinerates microscopic plankton using intense bursts of thermal heat', is_correct: 0 },
            { label: '3', content: 'It reflects sunlight directly back toward surface ocean waves', is_correct: 0 },
            { label: '4', content: 'It broadcasts sound waves that disrupt the sonar systems of killer whales', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s2_53',
        subject_id: 'tgat1',
        set_number: 2,
        blueprint_id: 'tgat1_rd_rc',
        stimulus: `...Unlike conventional fluorescent dyes, which require intense external ultraviolet radiation that can inadvertently damage delicate cellular structures, bioluminescent reporters generate their own light internally, eliminating autofluorescence and yielding unparalleled optical clarity.`,
        question_text: 'Why are bioluminescent reporters considered superior to conventional fluorescent dyes in cellular imaging?',
        difficulty: 'medium',
        explanation: 'ย่อหน้าที่ 3 อธิบายข้อได้เปรียบว่าสารเรืองแสงชีวภาพเปล่งแสงได้เองภายในโดยไม่ต้องฉายรังสี UV ภายนอกที่อาจทำลายเซลล์: "They produce internal light without requiring damaging external ultraviolet radiation."',
        trap_analysis: 'ดูประโยค "Unlike conventional fluorescent dyes, which require intense external UV radiation..."',
        options: [
            { label: '1', content: 'They emit light internally without requiring potentially destructive external ultraviolet radiation', is_correct: 1 },
            { label: '2', content: 'They are significantly cheaper to manufacture than distilled saline water', is_correct: 0 },
            { label: '3', content: 'They completely cure cancer cells upon initial contact in living tissue', is_correct: 0 },
            { label: '4', content: 'They dissolve instantly without leaving any detectable molecular trace', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s2_54',
        subject_id: 'tgat1',
        set_number: 2,
        blueprint_id: 'tgat1_rd_rc',
        stimulus: `...Furthermore, recent breakthroughs in optogenetics—a biological technique that utilizes light to control cellular activity—have integrated deep-sea luciferases to stimulate light-sensitive ion channels in neural tissue. This enables neuroscientists to modulate neurological circuits deep within the brain without implanting invasive physical optic fibers.`,
        question_text: 'The author mentions "optogenetics" in paragraph 4 primarily to:',
        difficulty: 'hard',
        explanation: 'ผู้เขียนยกตัวอย่าง optogenetics เพื่อแสดงให้เห็นว่าการประยุกต์ใช้ luciferase กำลังขยายขอบเขตไปสู่การรักษาทางประสาทวิทยาศาสตร์ขั้นสูงแบบไม่ต้องผ่าตัดฝังสายไฟ: "illustrate how marine enzymes facilitate non-invasive neurological manipulation deep within brain tissue."',
        trap_analysis: 'ผู้เขียนไม่ได้วิพากษ์วิจารณ์ แต่ยกขึ้นมาเป็นตัวอย่างความก้าวหน้าทางชีวการแพทย์ (biomedical breakthrough)',
        options: [
            { label: '1', content: 'illustrate how marine enzymes facilitate non-invasive manipulation of deep neurological circuits', is_correct: 1 },
            { label: '2', content: 'argue that optical fibers are the safest medical instruments ever invented', is_correct: 0 },
            { label: '3', content: 'warn patients against participating in brain experimental research trials', is_correct: 0 },
            { label: '4', content: 'prove that deep-sea animals possess higher intellectual cognition than humans', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s2_55',
        subject_id: 'tgat1',
        set_number: 2,
        blueprint_id: 'tgat1_rd_rc',
        stimulus: `...When luciferase catalyzes the oxidation of luciferin in the presence of adenosine triphosphate (ATP) and oxygen, energy is released almost entirely as visible light photons rather than thermal heat. This remarkable biochemical efficiency has transfixed medical researchers and molecular biologists worldwide.`,
        question_text: 'The word "transfixed" in paragraph 2 is closest in meaning to:',
        difficulty: 'medium',
        explanation: 'คำว่า "transfix" ในที่นี้หมายถึง "ดึงดูดความสนใจอย่างตรึงใจ / ทำให้หลงใหล": "captivated" (สะกดความสนใจของนักวิจัยทั่วโลก)',
        trap_analysis: 'คำว่า terrified (หวาดกลัว) หรือ repulsed (รังเกียจ) ไม่เข้ากับบริบทความชื่นชมในประสิทธิภาพ',
        options: [
            { label: '1', content: 'captivated', is_correct: 1 },
            { label: '2', content: 'terrified', is_correct: 0 },
            { label: '3', content: 'repulsed', is_correct: 0 },
            { label: '4', content: 'infuriated', is_correct: 0 }
        ]
    },

    // Reading Passage 3: Algorithmic Recommendation Engines and Adolescent Psychology (Questions 56 - 60)
    {
        id: 'q_tgat1_s2_56',
        subject_id: 'tgat1',
        set_number: 2,
        blueprint_id: 'tgat1_rd_rc',
        stimulus: `In the contemporary digital economy, attention is the premier currency. To maximize user dwell time and platform monetization, social media conglomerates have engineered sophisticated algorithmic recommendation architectures. These engines do not merely present content requested by the consumer; rather, they continually monitor micro-behaviors—such as the millisecond pause over an image, re-watches of brief video clips, and navigation swipe velocities—to construct intricate psychological profiles. While these hyper-personalized recommendation feeds deliver compelling entertainment, developmental psychologists are sounding alarms regarding their profound ramifications on adolescent emotional regulation and self-concept.\n\nDuring adolescence, the human brain undergoes substantial synaptic pruning and socio-emotional remodeling. Teenagers possess a biologically heightened sensitivity to peer approval, social comparison, and status hierarchies, mediated by developing neurochemical reward systems. Recommendation engines exploit this developmental vulnerability by serving content that elicits potent emotional arousal, predominantly outrage, anxiety, and body-image dissatisfaction. Sociological analyses demonstrate that sensationalist or distress-inducing posts receive up to six times more algorithmic amplification than nuanced or measured discourse, ensnaring impressionable youths in ideological echo chambers and self-reinforcing spirals of despair, a phenomenon colloquially termed "doomscrolling."\n\nFurthermore, the relentless curated perfection showcased across short-form video feeds distorts normative perceptions of reality. Constant exposure to digitally altered physiques and hyper-affluent lifestyle snippets breeds "upward social comparison," leaving vulnerable teens with pervasive feelings of inadequacy and depressive symptoms. Longitudinal studies reveal a distressing correlation between excessive daily feed exposure and skyrocketing rates of youth anxiety and self-harm, particularly among teenage girls.\n\nIn response to mounting public scrutiny, legislators in several jurisdictions are advancing legal mandates requiring digital platforms to institute "algorithmic transparency," disable infinite-scroll mechanics for minors, and offer chronological, uncurated feed alternatives. However, technology analysts contend that superficial user interface tweaks are insufficient as long as the underlying corporate business model remains anchored to engagement-based advertising revenue. Until systemic accountability is codified into regulatory law, the responsibility of safeguarding adolescent cognitive autonomy will continue to burden parents and educators navigating an uneven battle against mathematical optimization.`,
        question_text: 'What is the author’s primary argument in the passage?',
        difficulty: 'medium',
        explanation: 'ประเด็นหลักของบทความคือ อัลกอริทึมของโซเชียลมีเดียถูกออกแบบมาเพื่อดึงดูดความสนใจโดยแสวงหาประโยชน์จากความเปราะบางทางจิตวิทยาของวัยรุ่น ส่งผลเสียต่อสุขภาพจิตและการเห็นคุณค่าในตนเอง: "Algorithmic recommendation engines systematically exploit adolescent psychological vulnerabilities, contributing to severe mental health consequences."',
        trap_analysis: 'ตัวเลือกอื่นเน้นแค่เทคนิคคอมพิวเตอร์ หรือบอกว่าวัยรุ่นต้องเลิกใช้มือถือ 100% ซึ่งไม่ใช่ข้อสรุปของบทความ',
        options: [
            { label: '1', content: 'Algorithmic recommendation feeds exploit adolescent vulnerabilities, causing significant psychological distress', is_correct: 1 },
            { label: '2', content: 'Social media companies should completely shut down operations to save humanity', is_correct: 0 },
            { label: '3', content: 'Teenagers are biologically immune to online advertising and commercial incentives', is_correct: 0 },
            { label: '4', content: 'Chronological feeds have proven to generate higher advertising profits than algorithmic feeds', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s2_57',
        subject_id: 'tgat1',
        set_number: 2,
        blueprint_id: 'tgat1_rd_rc',
        stimulus: `...These engines do not merely present content requested by the consumer; rather, they continually monitor micro-behaviors—such as the millisecond pause over an image, re-watches of brief video clips, and navigation swipe velocities—to construct intricate psychological profiles.`,
        question_text: 'According to paragraph 1, how do recommendation algorithms construct detailed psychological profiles of users?',
        difficulty: 'easy',
        explanation: 'ย่อหน้าที่ 1 ระบุว่าระบบจับพฤติกรรมย่อยๆ เช่น การหยุดดูรูปแม้เพียงเสี้ยววินาที การดูคลิปซ้ำ และความเร็วในการปัดหน้าจอ: "By tracking subtle micro-behaviors, such as dwell time on images and swipe speeds."',
        trap_analysis: 'ผู้ใช้ไม่ได้กรอกแบบสอบถาม แต่อัลกอริทึมแอบจับ micro-behaviors เอง',
        options: [
            { label: '1', content: 'By analyzing subtle behavioral metrics, such as milliseconds spent pausing over images and swipe velocities', is_correct: 1 },
            { label: '2', content: 'By requiring every user to complete an extensive psychiatric evaluation upon registration', is_correct: 0 },
            { label: '3', content: 'By interviewing family members and classroom teachers regarding adolescent personality traits', is_correct: 0 },
            { label: '4', content: 'By scanning national criminal records and medical prescription databases', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s2_58',
        subject_id: 'tgat1',
        set_number: 2,
        blueprint_id: 'tgat1_rd_rc',
        stimulus: `...Sociological analyses demonstrate that sensationalist or distress-inducing posts receive up to six times more algorithmic amplification than nuanced or measured discourse, ensnaring impressionable youths in ideological echo chambers and self-reinforcing spirals of despair, a phenomenon colloquially termed "doomscrolling."`,
        question_text: 'The term "doomscrolling" in paragraph 2 refers to:',
        difficulty: 'medium',
        explanation: 'สำนวน "doomscrolling" ในบทความหมายถึง "พฤติกรรมการเสพติดการเลื่อนดูข่าวสารหรือโพสต์แง่ลบและน่าหดหู่อย่างต่อเนื่องจนหยุดไม่ได้": "the compulsive habit of continuously scrolling through negative, distressing digital content."',
        trap_analysis: 'ไม่ใช่การเล่นเกมแนว Doom และไม่ใช่การกดลบแอป',
        options: [
            { label: '1', content: 'the compulsive habit of endlessly scrolling through negative and distressing online content', is_correct: 1 },
            { label: '2', content: 'a competitive video game genre featuring high-speed digital combat', is_correct: 0 },
            { label: '3', content: 'the act of deleting all social media applications to protect one\'s eyesight', is_correct: 0 },
            { label: '4', content: 'an automated software script designed to block advertisements on web browsers', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s2_59',
        subject_id: 'tgat1',
        set_number: 2,
        blueprint_id: 'tgat1_rd_rc',
        stimulus: `...However, technology analysts contend that superficial user interface tweaks are insufficient as long as the underlying corporate business model remains anchored to engagement-based advertising revenue.`,
        question_text: 'Why do technology analysts view proposed interface modifications (e.g., disabling infinite scroll) as insufficient?',
        difficulty: 'hard',
        explanation: 'นักวิเคราะห์มองว่าแค่แก้ UI เล็กๆ น้อยๆ ไม่พอ ตราบใดที่โมเดลธุรกิจของบริษัทยังผูกติดอยู่กับรายได้จากโฆษณาที่วัดจากการทำให้คนติดจอ (engagement-based ad revenue): "Because the underlying profit model remains dependent on maximizing user engagement and screen time."',
        trap_analysis: 'ดูประโยค "...as long as the underlying corporate business model remains anchored to engagement-based advertising revenue"',
        options: [
            { label: '1', content: 'Because the fundamental corporate profit model is still driven by maximizing engagement and screen time', is_correct: 1 },
            { label: '2', content: 'Because teenagers refuse to purchase smartphones that lack infinite scrolling capabilities', is_correct: 0 },
            { label: '3', content: 'Because chronological feeds consume twice as much server electrical energy', is_correct: 0 },
            { label: '4', content: 'Because legislators do not possess the constitutional authority to regulate software design', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s2_60',
        subject_id: 'tgat1',
        set_number: 2,
        blueprint_id: 'tgat1_rd_rc',
        stimulus: `...Until systemic accountability is codified into regulatory law, the responsibility of safeguarding adolescent cognitive autonomy will continue to burden parents and educators navigating an uneven battle against mathematical optimization.`,
        question_text: 'The author’s tone in the final sentence of the passage can best be described as:',
        difficulty: 'medium',
        explanation: 'ประโยคสุดท้ายสะท้อนความรู้สึกจริงจัง วิตกกังวล และเตือนให้ตระหนักถึงการต่อสู้ที่ไม่เท่าเทียมกันระหว่างมนุษย์กับอัลกอริทึม: "grave and cautionary" (สุขุม จริงจัง และเตือนให้ตระหนักถึงภัยเงียบ)',
        trap_analysis: 'ผู้เขียนไม่ได้มองโลกในแง่ดี (optimistic) หรือเยาะเย้ย (sarcastic) แต่มีความกังวลอย่างจริงจังต่ออนาคตของเด็ก',
        options: [
            { label: '1', content: 'grave and cautionary', is_correct: 1 },
            { label: '2', content: 'indifferent and detached', is_correct: 0 },
            { label: '3', content: 'exuberant and celebratory', is_correct: 0 },
            { label: '4', content: 'mocking and sarcastic', is_correct: 0 }
        ]
    }
];

module.exports = { set2Questions };
