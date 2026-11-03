const { insertQuestionsBatch } = require('../add_questions_helper');

function generateTgat1Batch() {
    const questions = [];

    // 1. Question-Response (q_tgat1_57 to 65) - 9 questions
    const qrScenarios = [
        {
            id: 'q_tgat1_57', bp: 'tgat1_spk_qr',
            stim: 'Tour Guide: "Could everyone please gather near the north gate before the museum closes?"',
            q: 'Which response indicates cooperative compliance by a tourist?',
            c: 'We are on our way right now; thanks for the heads-up.',
            w: ['Why are you ordering us around like soldiers?', 'I want to live in this museum forever.', 'Gates are made of iron.'],
            exp: 'สำนวน "We are on our way right now; thanks for the heads-up." เป็นการตอบรับคำแนะนำของมัคคุเทศก์ด้วยความร่วมมือและขอบคุณ',
            trap: 'ระวังตัวเลือกที่ก้าวร้าวหรือไม่เข้าใจบริบทกลุ่มทัวร์'
        },
        {
            id: 'q_tgat1_58', bp: 'tgat1_spk_qr',
            stim: 'Neighbor: "Would you mind if I parked my delivery van in front of your driveway for just five minutes?"',
            q: 'Choose the most polite conditional agreement:',
            c: 'Not at all, as long as you move it once the delivery is complete.',
            w: ['Yes, park there forever and never leave.', 'Never mind, my driveway is public property.', 'I mind everything you do in life.'],
            exp: 'การตอบรับ "Not at all, as long as..." หมายถึงไม่ขัดข้อง โดยมีเงื่อนไขว่าต้องเลื่อนรถเมื่อส่งของเสร็จ',
            trap: 'ระวังตอบ Yes ซึ่งในไวยากรณ์ภาษาอังกฤษแปลว่า "รังเกียจ / ไม่อนุญาต"'
        },
        {
            id: 'q_tgat1_59', bp: 'tgat1_spk_qr',
            stim: 'Barista: "Would you like oat milk, almond milk, or regular whole milk in your flat white?"',
            q: 'Which response clearly states a dairy preference?',
            c: 'I would prefer oat milk, please.',
            w: ['Milk is produced by mammals.', 'Give me black coffee without water.', 'Whatever liquid you have on the floor.'],
            exp: 'สำนวน "I would prefer oat milk, please." ชัดเจน สุภาพ และตรงคำถาม',
            trap: 'ระวังตัวเลือกที่ตอบไม่ตรงกับช้อยส์ที่พนักงานถาม'
        },
        {
            id: 'q_tgat1_60', bp: 'tgat1_spk_qr',
            stim: 'Colleague: "Are you free to jump on a quick five-minute sync call regarding the marketing budget?"',
            q: 'Which response politely indicates immediate availability?',
            c: 'Sure, send over the invite link and I will join right now.',
            w: ['I hate talking to marketing people.', 'Meetings are the bane of human existence.', 'Call me in the year 2050.'],
            exp: 'สำนวน "Sure, send over the invite link..." สุภาพและพร้อมคุยงานทันที',
            trap: 'ระวังตัวเลือกที่ตัดรอนความสัมพันธ์เพื่อนร่วมงาน'
        },
        {
            id: 'q_tgat1_61', bp: 'tgat1_spk_qr',
            stim: 'Dentist: "Does it hurt when I apply pressure to this lower molar?"',
            q: 'Which response accurately describes pain level to a clinician?',
            c: 'Just a slight dull ache, but no sharp pain.',
            w: ['Teeth are made of enamel.', 'I don\'t have any lower teeth.', 'You are pressing on my elbow.'],
            exp: 'สำนวน "Just a slight dull ache, but no sharp pain." บรรยายอาการปวดตื้อๆ ได้อย่างชัดเจนตามบริบทการแพทย์',
            trap: 'ระวังตัวเลือกที่ตอบไม่ตรงคำถามทางคลินิก'
        },
        {
            id: 'q_tgat1_62', bp: 'tgat1_spk_qr',
            stim: 'Librarian: "I\'m afraid this reference volume cannot be checked out overnight."',
            q: 'What is the most appropriate student response?',
            c: 'Understood. Can I use the scanner over there to take copies of the required chapter?',
            w: ['I will sneak it into my backpack anyway.', 'Libraries are completely obsolete.', 'Burn the book if I cannot borrow it.'],
            exp: 'นักศึกษาตอบรับกฎของห้องสมุดและถามหาทางเลือกอื่น: "Understood. Can I use the scanner...?"',
            trap: 'ระวังตัวเลือกที่ขู่ทำลายทรัพย์สินหรือละเมิดกฎ'
        },
        {
            id: 'q_tgat1_63', bp: 'tgat1_spk_qr',
            stim: 'Hotel Concierge: "Would you prefer a table by the window or in the private dining pavilion tonight?"',
            q: 'Which statement clearly indicates seating preference?',
            c: 'A window table with a skyline view would be wonderful, thank you.',
            w: ['I prefer eating standing on the roof.', 'Tables are made of mahogany.', 'Do not ask me difficult questions.'],
            exp: 'สำนวน "A window table with a skyline view would be wonderful..." สุภาพและระบุความต้องการชัดเจน',
            trap: 'ระวังตัวเลือกที่ประชดประชันหรือไม่เกี่ยวข้องกับการจอง'
        },
        {
            id: 'q_tgat1_64', bp: 'tgat1_spk_qr',
            stim: 'Gym Trainer: "Shall we increase the dumbbell weight for your next set of bench presses?"',
            q: 'Which response reflects safe personal limits?',
            c: 'Let us stick with this current weight until my form is fully stable.',
            w: ['Put one thousand kilograms on the bar.', 'Weightlifting is completely unnatural.', 'I refuse to move my arms today.'],
            exp: 'สำนวน "Let us stick with this current weight until my form is fully stable." แสดงการประเมินตนเองอย่างปลอดภัย',
            trap: 'ระวังตัวเลือกที่เกินจริงหรือเสี่ยงอันตราย'
        },
        {
            id: 'q_tgat1_65', bp: 'tgat1_spk_qr',
            stim: 'Postal Clerk: "Would you like standard parcel post or express guaranteed delivery for this package?"',
            q: 'What is the best customer response based on urgency?',
            c: 'It contains urgent legal contracts, so express guaranteed, please.',
            w: ['Drop it into the nearest ocean.', 'Parcels are rectangular boxes.', 'Whichever takes five years to arrive.'],
            exp: 'สำนวน "It contains urgent legal contracts, so express guaranteed, please." ให้เหตุผลและเลือกบริการถูกต้อง',
            trap: 'ระวังตัวเลือกที่ไร้สาระหรือไม่ตรงคำถาม'
        }
    ];

    qrScenarios.forEach(s => {
        questions.push({
            id: s.id, subject_id: 'tgat1', blueprint_id: s.bp,
            stimulus: null, question_text: `${s.stim}\n\n${s.q}`, difficulty: 'easy',
            explanation: s.exp, trap_analysis: s.trap,
            options: [
                { label: '1', content: s.c, is_correct: 1 },
                { label: '2', content: s.w[0], is_correct: 0 },
                { label: '3', content: s.w[1], is_correct: 0 },
                { label: '4', content: s.w[2], is_correct: 0 }
            ]
        });
    });

    // 2. Short Conversation (q_tgat1_66 to 74) - 9 questions
    const scScenarios = [
        {
            id: 'q_tgat1_66', bp: 'tgat1_spk_sc',
            stim: 'Manager: "We need someone to present our pitch deck in Singapore next week."\nAlex: "_______! I have already led three successful client pitches in that market."',
            q: 'Which expression best conveys eager volunteering?',
            c: 'I would be thrilled to take the lead on that presentation',
            w: ['I will quit my job if you make me travel', 'Singapore is too far from my bed', 'Ask someone who doesn\'t care about work'],
            exp: 'สำนวน "I would be thrilled to take the lead..." แสดงความกระตือรือร้นและมั่นใจในประสบการณ์',
            trap: 'ระวังตัวเลือกที่ปฏิเสธแบบไร้เหตุผล'
        },
        {
            id: 'q_tgat1_67', bp: 'tgat1_spk_sc',
            stim: 'Student A: "I completely bombed the calculus quiz yesterday."\nStudent B: "_______! It only accounts for two percent of the final grade, so you can easily bounce back."',
            q: 'Which phrase best offers perspective and comfort?',
            c: 'Don\'t be too hard on yourself; it was just a minor quiz',
            w: ['You should drop out of school right now', 'I got a perfect hundred so you look bad', 'Math is impossible for people like you'],
            exp: 'สำนวน "Don\'t be too hard on yourself..." ช่วยปลอบใจและชี้ให้เห็นว่าสัดส่วนคะแนนน้อยมาก',
            trap: 'ระวังคำพูดซ้ำเติมความรู้สึก'
        },
        {
            id: 'q_tgat1_68', bp: 'tgat1_spk_sc',
            stim: 'Landlord: "I noticed your rent transfer was two days behind schedule this month."\nTenant: "_______! My banking app experienced a technical glitch, but I initiated an instant wire transfer this morning."',
            q: 'Which phrase best conveys an accountable apology?',
            c: 'I sincerely apologize for the oversight and delay',
            w: ['Why are you so obsessed with money?', 'Rent is an oppressive social concept', 'I will pay you next year instead'],
            exp: 'สำนวน "I sincerely apologize for the oversight and delay" แสดงความรับผิดชอบอย่างเป็นมืออาชีพ',
            trap: 'ระวังตัวเลือกที่ต่อว่าเจ้าของห้อง'
        },
        {
            id: 'q_tgat1_69', bp: 'tgat1_spk_sc',
            stim: 'Doctor: "Your cholesterol levels have improved dramatically over the last six months."\nPatient: "_______! Cutting down on processed meats and brisk walking every morning really made a difference."',
            q: 'Which reaction best expresses satisfaction and validation?',
            c: 'That is such a relief to hear',
            w: ['I knew laboratory equipment was faulty', 'Doctors never tell the truth', 'I will start eating fried butter daily'],
            exp: 'สำนวน "That is such a relief to hear" แสดงความโล่งใจและพึงพอใจต่อผลสุขภาพ',
            trap: 'ระวังตัวเลือกที่ไม่สอดคล้องกับข่าวดีทางการแพทย์'
        },
        {
            id: 'q_tgat1_70', bp: 'tgat1_spk_sc',
            stim: 'Interviewer: "Where do you envision yourself five years from now in our engineering organization?"\nCandidate: "_______, mentoring junior developers while spearheading sustainable infrastructure initiatives."',
            q: 'Which response demonstrates strategic career ambition?',
            c: 'I hope to grow into a senior technical leadership role',
            w: ['I plan to take your job and fire you', 'I hope to retire and do nothing on an island', 'Five years is too long to think about anything'],
            exp: 'สำนวน "I hope to grow into a senior technical leadership role..." สอดคล้องกับการเป็นพี่เลี้ยงและคุมโครงการ',
            trap: 'ระวังคำตอบที่ก้าวร้าวหรือขาดความทะเยอทะยาน'
        },
        {
            id: 'q_tgat1_71', bp: 'tgat1_spk_sc',
            stim: 'Chef: "Is there any particular dish you found lacking in flavor tonight?"\nPatron: "On the contrary, _______! The pan-seared sea bass with saffron sauce was sublime."',
            q: 'Which statement clarifies that the meal was exceptional?',
            c: 'every course exceeded our expectations thoroughly',
            w: ['the food tasted like wet cardboard', 'your restaurant should be shut down', 'we threw our plates out the window'],
            exp: 'สำนวน "On the contrary..." (ในทางตรงกันข้าม) ตามด้วยคำชม "every course exceeded our expectations thoroughly"',
            trap: 'ระวังคำศัพท์ที่ขัดแย้งกับคำชม subline'
        },
        {
            id: 'q_tgat1_72', bp: 'tgat1_spk_sc',
            stim: 'Colleague A: "I\'m swamped with three client presentations due by 5 PM."\nColleague B: "_______! Send me the raw data for the second deck, and I will format the chart graphics for you."',
            q: 'Which statement best offers practical assistance?',
            c: 'Let me take some of that pressure off your shoulders',
            w: ['You are terrible at time management', 'I have nothing to do but I won\'t help you', 'Work faster or you will be disciplined'],
            exp: 'สำนวน "Let me take some of that pressure off your shoulders" เป็นการเสนอตัวช่วยแบ่งเบาภาระงานอย่างมีน้ำใจ',
            trap: 'ระวังตัวเลือกที่ตำหนิเพื่อนร่วมงาน'
        },
        {
            id: 'q_tgat1_73', bp: 'tgat1_spk_sc',
            stim: 'Professor: "Your term essay demonstrates deep historical analysis, but several web references are missing publication dates."\nStudent: "_______! I will consult the archive databases and update the bibliography according to Chicago style by tonight."',
            q: 'Which response demonstrates receptive academic diligence?',
            c: 'Thank you for pointing that out, Professor',
            w: ['Publication dates are completely meaningless', 'You are just being overly nitpicky', 'I copied those links from Wikipedia without looking'],
            exp: 'สำนวน "Thank you for pointing that out, Professor" แสดงความขอบคุณต่อคำแนะนำและพร้อมแก้ไข',
            trap: 'ระวังตัวเลือกที่ยอมรับว่าลอกงานมาหรือเถียงอาจารย์'
        },
        {
            id: 'q_tgat1_74', bp: 'tgat1_spk_sc',
            stim: 'IT Support: "Did restarting the local gateway router resolve your office internet connectivity?"\nOffice Worker: "_______! All twelve workstations reconnected to the server instantly."',
            q: 'Which phrase confirms complete troubleshooting success?',
            c: 'Yes, that did the trick like a charm',
            w: ['No, the router exploded in smoke', 'Routers are dangerous electronic traps', 'I unplugged the entire power grid'],
            exp: 'สำนวน "that did the trick like a charm" แปลว่า ได้ผลชะงัด / ใช้งานได้ดีเยี่ยมทันที',
            trap: 'ระวังตัวเลือกเชิงลบที่ขัดกับประโยคถัดไป'
        }
    ];

    scScenarios.forEach(s => {
        questions.push({
            id: s.id, subject_id: 'tgat1', blueprint_id: s.bp,
            stimulus: s.stim, question_text: s.q, difficulty: 'medium',
            explanation: s.exp, trap_analysis: s.trap,
            options: [
                { label: '1', content: s.c, is_correct: 1 },
                { label: '2', content: s.w[0], is_correct: 0 },
                { label: '3', content: s.w[1], is_correct: 0 },
                { label: '4', content: s.w[2], is_correct: 0 }
            ]
        });
    });

    // 3. Long Conversation (q_tgat1_75 to 82) - 8 questions
    const lcScenarios = [
        {
            id: 'q_tgat1_75', bp: 'tgat1_spk_lc',
            stim: 'Advisor: "Congratulations on completing your honors thesis defense, Clara."\nClara: "Thank you, Dr. Vance. I am now evaluating two graduate fellowship offers—one in behavioral neuroscience at Cambridge, and another in applied machine learning in Zurich."\nAdvisor: "Both institutions are world-renowned. Cambridge offers peerless cognitive theory, whereas Zurich provides exceptional technical industry partnerships. (1)_______?"\nClara: "I lean towards algorithmic engineering that directly powers neuro-prosthetics."',
            q: 'Which question by Dr. Vance best frames Clara\'s practical preference in blank (1)?',
            c: 'Which technical environment aligns better with the tangible applications you hope to build?',
            w: ['Why don\'t you just flip a coin and stop thinking?', 'Which country has cheaper restaurant food?', 'Do you honestly believe you are smart enough for Europe?'],
            exp: 'คำถามที่เจาะลึกถึงเป้าหมายการประยุกต์ใช้งานจริง (tangible applications) สอดคล้องกับคำตอบของคลาร่าเรื่อง neuro-prosthetics',
            trap: 'ระวังคำถามที่ดูแคลนหรือถามเรื่องไร้สาระ'
        },
        {
            id: 'q_tgat1_76', bp: 'tgat1_spk_lc',
            stim: 'Supplier: "Due to unprecedented shipping bottlenecks in the Red Sea, ocean freight tariffs have increased by eighteen percent."\nProcurement Officer: "Our wholesale margins cannot absorb that full hike without renegotiating our retail agreements. (1)_______."\nSupplier: "We could absorb seven percent if you commit to a twelve-month exclusive supply contract."\nProcurement Officer: "That is a constructive compromise we can present to our finance committee."',
            q: 'Which negotiation stance by the Procurement Officer best completes blank (1)?',
            c: 'Can we explore cost-sharing options or a volume-based discount to cushion the blow?',
            w: ['We will cancel all commercial business with you immediately and forever.', 'Freight charges are completely imaginary anyway.', 'You must ship all our goods for free by air.'],
            exp: 'การเจรจาต่อรองแบบมืออาชีพต้องเสนอทางออกแบบ Cost-sharing หรือส่วนลดตามปริมาณเพื่อประนีประนอม',
            trap: 'ระวังตัวเลือกที่ตัดสัมพันธ์ทางการค้าทันทีโดยไม่เจรจา'
        },
        {
            id: 'q_tgat1_77', bp: 'tgat1_spk_lc',
            stim: 'Department Chair: "We have noticed a thirty percent drop in engineering student attendance in early morning lecture halls."\nFaculty Member: "Many students commute over an hour and struggle with peak transit congestion. What if we adopt a hybrid flipped-classroom model? (1)_______."\nDepartment Chair: "That would allow students to master theoretical lectures at home and utilize classroom hours for interactive lab drills."',
            q: 'Which explanatory detail best completes the Faculty Member\'s proposal in blank (1)?',
            c: 'We could record conceptual lectures asynchronously and preserve in-person time for group problem-solving.',
            w: ['We should cancel all engineering classes and award free degrees.', 'Students should be forced to sleep in the university parking garage.', 'Attendance records should be burned.'],
            exp: 'แนวคิด Flipped Classroom คือการบันทึกบรรยายล่วงหน้า (asynchronous) และใช้เวลาในห้องเรียนทำกิจกรรมกลุ่ม',
            trap: 'ระวังตัวเลือกที่ประชดประชันหรือไม่ใช่หลักการศึกษา'
        },
        {
            id: 'q_tgat1_78', bp: 'tgat1_spk_lc',
            stim: 'Architect: "Here are the preliminary blueprints for the downtown community recreation pavilion."\nMayor: "The glass atrium is visually stunning, but how will it fare during summer heatwaves?"\nArchitect: "We specified electrochromic smart glass and automated passive ventilation louvers. (1)_______."\nMayor: "Excellent, that addresses our energy efficiency mandates and operating budget limits."',
            q: 'Which technical reassurance best completes the Architect\'s explanation in blank (1)?',
            c: 'This design minimizes solar heat gain by over 60%, drastically cutting air-conditioning costs.',
            w: ['The glass will shatter instantly when exposed to direct sunlight.', 'Visitors will just have to endure intense heat and sweat.', 'Air conditioning is banned by our architecture firm.'],
            exp: 'สถาปนิกอธิบายว่ากระจกอัจฉริยะช่วยลดความร้อนจากแสงแดดลง 60% และลดค่าไฟเครื่องปรับอากาศ ซึ่งตรงกับคำชมของนายกเทศมนตรี',
            trap: 'ระวังตัวเลือกที่บอกว่ากระจกจะแตก'
        },
        {
            id: 'q_tgat1_79', bp: 'tgat1_spk_lc',
            stim: 'HR Director: "We need to address the rising employee turnover in our regional logistics division."\nOperations Lead: "Exit interviews indicate that warehouse staff feel their advancement pathways are opaque. (1)_______."\nHR Director: "I agree completely. Transparent career roadmaps and internal certification programs will boost retention."',
            q: 'Which policy recommendation by the Operations Lead fits blank (1)?',
            c: 'We should institute a structured apprenticeship pipeline with clear wage milestones for every technical skill mastered.',
            w: ['We should lock the warehouse doors so workers cannot physically leave.', 'Workers do not deserve any promotions or recognition.', 'Turnover is great because we don\'t have to remember names.'],
            exp: 'การแก้ปัญหาการลาออกเนื่องจากเส้นทางอาชีพไม่ชัดเจน คือการสร้างระบบฝึกอบรมและเกณฑ์ปรับเงินเดือนที่โปร่งใส',
            trap: 'ระวังตัวเลือกที่ละเมิดสิทธิแรงงาน'
        },
        {
            id: 'q_tgat1_80', bp: 'tgat1_spk_lc',
            stim: 'Software Tester: "I found a critical edge-case vulnerability where simultaneous database transactions cause record duplication."\nLead Developer: "Good catch! How reproducible is the defect under controlled testing?"\nSoftware Tester: "It occurs consistently whenever the automated load exceeds five hundred concurrent requests per second. (1)_______."\nLead Developer: "I will implement a distributed redis locking mechanism to serialize those write operations right away."',
            q: 'Which diagnostic insight by the Software Tester best completes blank (1)?',
            c: 'The root cause appears to be race conditions during checkout state synchronization.',
            w: ['The computer decided to duplicate records because it was bored.', 'We should delete the customer database and start selling shoes.', 'Software bugs cannot be fixed by humans.'],
            exp: 'คำอธิบายเชิงเทคนิคเรื่อง "race conditions during state synchronization" ตรงกับสาเหตุของการเกิดข้อมูลซ้ำซ้อนในฐานข้อมูล',
            trap: 'ระวังคำตอบที่ไม่เป็นวิทยาศาสตร์คอมพิวเตอร์'
        },
        {
            id: 'q_tgat1_81', bp: 'tgat1_spk_lc',
            stim: 'Environmental Officer: "Runoff from the adjacent construction site is depositing silt into the municipal reservoir."\nSite Foreman: "We installed straw wattles, but yesterday\'s torrential downpour breached the lower perimeter."\nEnvironmental Officer: "You must deploy reinforced geotextile sediment barriers immediately. (1)_______."\nSite Foreman: "Our crew is already unrolling the heavy-duty silt fences along the drainage ditch."',
            q: 'Which compliance warning by the Environmental Officer best completes blank (1)?',
            c: 'Failure to contain the runoff by nightfall will trigger statutory stop-work orders and municipal fines.',
            w: ['Silt is great for the water taste so keep polluting.', 'Let us throw more mud into the drinking water.', 'Environmental laws are just polite suggestions.'],
            exp: 'เจ้าหน้าที่สิ่งแวดล้อมเตือนว่าหากไม่ควบคุมตะกอนภายในค่ำนี้จะถูกสั่งระงับการก่อสร้างและปรับตามกฎหมาย',
            trap: 'ระวังตัวเลือกที่บอกว่าโคลนมีประโยชน์ต่อน้ำดื่ม'
        },
        {
            id: 'q_tgat1_82', bp: 'tgat1_spk_lc',
            stim: 'Conference Organizer: "Two keynote speakers had their transpacific flights grounded due to volcanic ash clouds."\nEvent Coordinator: "The opening plenary starts in three hours! What contingency plan can we execute?"\nConference Organizer: "We have dedicated high-speed fiber lines in the main auditorium. (1)_______."\nEvent Coordinator: "Superb idea! I will set up the two-way live streaming feed and interactive audience Q&A app."',
            q: 'Which solution by the Conference Organizer best solves the keynote speaker emergency?',
            c: 'We can broadcast their presentations virtually via interactive high-definition teleconference.',
            w: ['Let us cancel the entire three-day international summit immediately.', 'We will ask audience members to pretend to be the speakers.', 'Volcanic ash is harmless so tell them to fly anyway.'],
            exp: 'การแก้ปัญหาเร่งด่วนเมื่อวิทยากรบินมาไม่ได้ คือการจัดบรรยายสดผ่านระบบ Teleconference ทางไกล',
            trap: 'ระวังตัวเลือกที่ยกเลิกงานกะทันหัน'
        }
    ];

    lcScenarios.forEach(s => {
        questions.push({
            id: s.id, subject_id: 'tgat1', blueprint_id: s.bp,
            stimulus: s.stim, question_text: s.q, difficulty: 'hard',
            explanation: s.exp, trap_analysis: s.trap,
            options: [
                { label: '1', content: s.c, is_correct: 1 },
                { label: '2', content: s.w[0], is_correct: 0 },
                { label: '3', content: s.w[1], is_correct: 0 },
                { label: '4', content: s.w[2], is_correct: 0 }
            ]
        });
    });

    // 4. Text Completion (q_tgat1_83 to 91) - 9 questions
    const tcScenarios = [
        {
            id: 'q_tgat1_83', bp: 'tgat1_rd_tc',
            stim: 'Quantum cryptography exploits the fundamental principles of quantum superposition and entanglement. Any attempt by an unauthorized third party to intercept a quantum key exchange unavoidably alters the quantum states, (1)_______ alerting the communicating parties to the presence of an eavesdropper.',
            q: 'Choose the adverb that best completes blank (1):',
            c: 'instantaneously',
            w: ['reluctantly', 'deceitfully', 'superficially'],
            exp: 'ตามฟิสิกส์ควอนตัม การแอบดักฟังจะเปลี่ยนสถานะโฟตอนและแจ้งเตือนผู้รับส่งสาร "ในทันทีทันใด" (instantaneously)',
            trap: 'คำว่า reluctantly แปลว่า อย่างไม่เต็มใจ ซึ่งไม่เกี่ยวกับกฎธรรมชาติ'
        },
        {
            id: 'q_tgat1_84', bp: 'tgat1_rd_tc',
            stim: 'Epidemiologists studying zoonotic spillover events emphasize that deforestation fragments pristine wilderness buffers. As human settlements encroach upon previously isolated forest frontiers, the likelihood of novel viral pathogens transmitting across wild reservoirs into domestic animals becomes markedly (1)_______.',
            q: 'Choose the adjective that best fills blank (1):',
            c: 'heightened',
            w: ['extinguished', 'diminished', 'obliterated'],
            exp: 'การบุกรุกป่าทำให้โอกาสที่เชื้อไวรัสชนิดใหม่จะแพร่ข้ามสายพันธุ์ "สูงขึ้นอย่างเห็นได้ชัด" (heightened / elevated)',
            trap: 'คำว่า diminished แปลว่า ลดลง ซึ่งขัดแย้งกับคำเตือนทางระบาดวิทยา'
        },
        {
            id: 'q_tgat1_85', bp: 'tgat1_rd_tc',
            stim: 'Rather than solely relying on finite fossil reserves, developing nations are investing heavily in decentralized microgrids powered by photovoltaic arrays. These localized clean energy installations (1)_______ remote rural villages to enjoy reliable electricity without waiting for expensive national grid extensions.',
            q: 'Choose the correct verb form for blank (1):',
            c: 'empower',
            w: ['empowers', 'empowering', 'has empowered'],
            exp: 'ประธานคือ "These localized clean energy installations" เป็นพหูพจน์ กริยาแท้ใน Present Simple คือ "empower" ไม่เติม -s',
            trap: 'ระวังหลงคิดว่าประธานคือ energy ซึ่งเป็นเอกพจน์'
        },
        {
            id: 'q_tgat1_86', bp: 'tgat1_rd_tc',
            stim: 'Neuroscientists have discovered that chronic stress triggers sustained cortisol secretion, which in turn causes the dendritic spines of hippocampal neurons to (1)_______. Consequently, prolonged psychological pressure directly impairs the encoding of declarative memories.',
            q: 'Which verb best describes the degenerative biological damage in blank (1)?',
            c: 'atrophy',
            w: ['flourish', 'multiply', 'invigorate'],
            exp: 'คำว่า "atrophy" แปลว่า ฝ่อลีบ / เสื่อมสลาย สอดคล้องกับผลเสียของฮอร์โมนความเครียดต่อเซลล์ประสาทสมอง',
            trap: 'คำว่า flourish หรือ invigorate แปลว่า เจริญงอกงาม/มีชีวิตชีวา ซึ่งตรงข้ามกับบริบท'
        },
        {
            id: 'q_tgat1_87', bp: 'tgat1_rd_tc',
            stim: 'In antitrust economics, regulatory agencies monitor mega-mergers between dominant tech conglomerates. When a single corporation captures monopolistic market power, it can unilaterally inflate prices and stifle consumer choice (1)_______ vigorous regulatory oversight intervenes.',
            q: 'Choose the most suitable conditional conjunction for blank (1):',
            c: 'unless',
            w: ['because', 'although', 'inasmuch as'],
            exp: 'ความหมายคือ "บริษัทจะขึ้นราคาและจำกัดทางเลือกผู้บริโภค... เว้นแต่ว่า (unless) จะมีหน่วยงานกำกับดูแลเข้าแทรกแซง"',
            trap: 'ระวังคำว่า because ซึ่งจะทำให้ความหมายผิดทิศทาง'
        },
        {
            id: 'q_tgat1_88', bp: 'tgat1_rd_tc',
            stim: 'Marine ecologists studying oceanic dead zones have determined that agricultural fertilizer runoff causes explosive algal blooms. When these massive mats of algae die and decompose, bacteria consume vast quantities of dissolved oxygen, rendering surrounding waters virtually (1)_______ to fish and shellfish.',
            q: 'Which adjective best completes blank (1)?',
            c: 'uninhabitable',
            w: ['inviting', 'nutritious', 'transparent'],
            exp: 'เมื่อออกซิเจนในน้ำหมดไป แหล่งน้ำจะ "ไม่สามารถอยู่อาศัยได้" (uninhabitable) สำหรับสัตว์น้ำ',
            trap: 'คำว่า nutritious แปลว่า มีสารอาหาร ซึ่งไม่ตรงกับสภาวะน้ำเน่าเสีย'
        },
        {
            id: 'q_tgat1_89', bp: 'tgat1_rd_tc',
            stim: 'Despite substantial advancements in synthetic materials, structural engineers still admire timber for modern architecture. When harvested from sustainably certified plantations, cross-laminated timber sequesters carbon within building frames, acting as an effective carbon (1)_______ throughout the building’s lifecycle.',
            q: 'Choose the correct environmental noun for blank (1):',
            c: 'sink',
            w: ['emitter', 'combustion', 'contaminant'],
            exp: 'คำว่า "carbon sink" เป็นศัพท์เฉพาะทางสิ่งแวดล้อม หมายถึง "แหล่งกักเก็บคาร์บอน"',
            trap: 'คำว่า carbon emitter แปลว่า แหล่งปล่อยคาร์บอน ซึ่งตรงข้ามกับความหมาย'
        },
        {
            id: 'q_tgat1_90', bp: 'tgat1_rd_tc',
            stim: 'In literary analysis, unreliable narrators are protagonists whose credibility has been compromised by psychological distress, personal bias, or deliberate deceit. Readers must scrutinize their accounts with skepticism, (1)_______ accepting their version of narrative events uncritically.',
            q: 'Select the prepositional phrase that best fits blank (1):',
            c: 'rather than',
            w: ['in addition to', 'as well as', 'owing to'],
            exp: 'สำนวน "rather than doing something" แปลว่า "แทนที่จะทำ..." (ผู้อ่านต้องพิจารณาด้วยความสงสัย แทนที่จะยอมรับเรื่องเล่าโดยไม่ไตร่ตรอง)',
            trap: 'คำว่า in addition to แปลว่า นอกจากนี้ ซึ่งจะทำให้ใจความขัดกัน'
        },
        {
            id: 'q_tgat1_91', bp: 'tgat1_rd_tc',
            stim: 'Autonomous drones deployed in precision agriculture capture multispectral aerial imagery. Machine vision algorithms analyze vegetation indices to detect nutrient deficiencies weeks (1)_______ symptoms become visible to the naked eye.',
            q: 'Choose the temporal preposition for blank (1):',
            c: 'before',
            w: ['after', 'while', 'since'],
            exp: 'โดรนตรวจจับภาวะขาดสารอาหารได้ "หลายสัปดาห์ก่อนที่ (weeks before)" อาการจะปรากฏให้เห็นด้วยตาเปล่า',
            trap: 'ระวังคำว่า after ซึ่งทำให้ข้อความเสียจุดประสงค์การตรวจจับล่วงหน้า'
        }
    ];

    tcScenarios.forEach(s => {
        questions.push({
            id: s.id, subject_id: 'tgat1', blueprint_id: s.bp,
            stimulus: s.stim, question_text: s.q, difficulty: 'medium',
            explanation: s.exp, trap_analysis: s.trap,
            options: [
                { label: '1', content: s.c, is_correct: 1 },
                { label: '2', content: s.w[0], is_correct: 0 },
                { label: '3', content: s.w[1], is_correct: 0 },
                { label: '4', content: s.w[2], is_correct: 0 }
            ]
        });
    });

    // 5. Reading Comprehension (q_tgat1_92 to 100) - 9 questions
    const rcScenarios = [
        {
            id: 'q_tgat1_92', bp: 'tgat1_rd_rc',
            stim: 'Passage A:\nCircadian biology research reveals that adolescent biological clocks naturally shift forward by up to two hours during puberty—a biological phenomenon termed "sleep phase delay." While adults can easily adjust to 7:00 AM work routines, teenagers forced into 7:30 AM high school starts experience chronic social jetlag. Clinical studies indicate that postponing high school start times to 8:30 AM correlates directly with improved academic performance, reduced depressive symptoms, and a 65% reduction in morning student vehicular accidents.',
            q: 'What is the primary physiological cause of teenagers struggling with early morning school schedules?',
            c: 'A natural biological circadian shift that delays melatonin secretion during puberty.',
            w: ['Excessive addiction to morning video games.', 'A severe genetic inability to digest breakfast foods.', 'Refusal to read textbooks after dinner.'],
            exp: 'บทความระบุว่าเกิดจาก "sleep phase delay" ซึ่งเป็นปรากฏการณ์ทางชีววิทยาที่นาฬิกาชีวิตวัยรุ่นเลื่อนไปข้างหน้าตามธรรมชาติ 2 ชั่วโมง',
            trap: 'ระวังตัวเลือกที่โทษพฤติกรรมส่วนตัว เช่น ติดเกม ซึ่งไม่ใช่สาเหตุทางสรีรวิทยาตามบทความ'
        },
        {
            id: 'q_tgat1_93', bp: 'tgat1_rd_rc',
            stim: 'Passage A:\nCircadian biology research reveals that adolescent biological clocks naturally shift forward by up to two hours during puberty—a biological phenomenon termed "sleep phase delay." While adults can easily adjust to 7:00 AM work routines, teenagers forced into 7:30 AM high school starts experience chronic social jetlag. Clinical studies indicate that postponing high school start times to 8:30 AM correlates directly with improved academic performance, reduced depressive symptoms, and a 65% reduction in morning student vehicular accidents.',
            q: 'What significant public safety improvement was documented when school start times were delayed?',
            c: 'A sixty-five percent drop in morning student car accidents.',
            w: ['Total elimination of all teenage homework assignments.', 'Free bus passes distributed to all citizens.', 'All school athletic competitions were cancelled.'],
            exp: 'ข้อความระบุชัดเจน: "a 65% reduction in morning student vehicular accidents"',
            trap: 'ระวังตัวเลือกที่เกินจริงหรือไม่มีในบทความ'
        },
        {
            id: 'q_tgat1_94', bp: 'tgat1_rd_rc',
            stim: 'Passage B:\nTraditional silicon-based semiconductors are approaching their physical miniaturization limits, as quantum tunneling leaks electrical current across gate nodes narrower than three nanometers. Materials scientists are therefore pioneering carbon nanotube field-effect transistors (CNFETs). Carbon nanotubes offer ten times greater electrical conductivity and dissipate operational heat far more efficiently than silicon, paving the way for ultra-dense microprocessors that consume a fraction of modern datacenters\' electrical demands.',
            q: 'Why are scientists seeking alternatives to silicon semiconductors according to Passage B?',
            c: 'Silicon faces physical quantum leakage constraints at scales under three nanometers.',
            w: ['Silicon has become completely extinct across planet Earth.', 'Silicon cannot conduct any electricity under any temperature.', 'Silicon is banned by international space treaties.'],
            exp: 'บทความระบุว่า ซิลิคอนติดขีดจำกัดทางกายภาพเนื่องจากเกิดกระแสไฟฟ้ารั่วไหลจากปรากฏการณ์ควอนตัมทันเนลลิง (quantum tunneling)',
            trap: 'ระวังตัวเลือกที่บอกว่าซิลิคอนหมดไปจากโลก'
        },
        {
            id: 'q_tgat1_95', bp: 'tgat1_rd_rc',
            stim: 'Passage B:\nTraditional silicon-based semiconductors are approaching their physical miniaturization limits, as quantum tunneling leaks electrical current across gate nodes narrower than three nanometers. Materials scientists are therefore pioneering carbon nanotube field-effect transistors (CNFETs). Carbon nanotubes offer ten times greater electrical conductivity and dissipate operational heat far more efficiently than silicon, paving the way for ultra-dense microprocessors that consume a fraction of modern datacenters\' electrical demands.',
            q: 'What advantage do carbon nanotubes possess according to the passage?',
            c: 'Superior electrical conductivity combined with significantly more efficient heat dissipation.',
            w: ['They are made of liquid gold and never heat up.', 'They require no electrical power whatsoever to calculate data.', 'They are edible and dissolve harmlessly in water.'],
            exp: 'ข้อความระบุ: "offer ten times greater electrical conductivity and dissipate operational heat far more efficiently"',
            trap: 'ระวังตัวเลือกที่บอกว่าไม่ต้องใช้ไฟฟ้าเลย'
        },
        {
            id: 'q_tgat1_96', bp: 'tgat1_rd_rc',
            stim: 'Passage C:\nPsychological studies on the "Dunning-Kruger effect" demonstrate a striking metacognitive asymmetry: novices with minimal knowledge in a domain regularly overestimate their competence, falsely believing their skills rival experts. Conversely, seasoned experts frequently underestimate their relative mastery, incorrectly assuming that concepts they find straightforward must be equally intuitive to everyone else. Real expertise, therefore, is characterized by an acute awareness of what one does not know.',
            q: 'According to Passage C, how do true subject-matter experts typically perceive their own knowledge?',
            c: 'They recognize the vast boundaries of knowledge and often assume their expertise is ordinary.',
            w: ['They boast loudly about their intellectual supremacy in public.', 'They believe they know every single scientific fact in the universe.', 'They forget their own names and qualifications.'],
            exp: 'ผู้เชี่ยวชาญตัวจริงมักประเมินความสามารถตนเองต่ำกว่าความเป็นจริง และตระหนักดีว่าตนเองยังมีสิ่งที่ไม่รู้อีกมาก',
            trap: 'ระวังตัวเลือกที่บอกว่าผู้เชี่ยวชาญชอบโอ้อวด ซึ่งตรงข้ามกับลักษณะ metacognitive asymmetry'
        },
        {
            id: 'q_tgat1_97', bp: 'tgat1_rd_rc',
            stim: 'Passage C:\nPsychological studies on the "Dunning-Kruger effect" demonstrate a striking metacognitive asymmetry: novices with minimal knowledge in a domain regularly overestimate their competence, falsely believing their skills rival experts. Conversely, seasoned experts frequently underestimate their relative mastery, incorrectly assuming that concepts they find straightforward must be equally intuitive to everyone else. Real expertise, therefore, is characterized by an acute awareness of what one does not know.',
            q: 'What cognitive error do novices commit according to the text?',
            c: 'They vastly overestimate their mastery due to an inability to recognize their own incompetence.',
            w: ['They refuse to read any books written before 1900.', 'They perform mathematical calculations too rapidly.', 'They intentionally give incorrect answers to confuse researchers.'],
            exp: 'ผู้เริ่มต้นมักประเมินความสามารถตนเองสูงเกินจริง เนื่องจากขาดความรู้ที่จะรู้ว่าตนเองยังบกพร่องตรงไหน',
            trap: 'ระวังตัวเลือกที่ไม่เกี่ยวข้องกับทฤษฎีจิตวิทยา'
        },
        {
            id: 'q_tgat1_98', bp: 'tgat1_rd_rc',
            stim: 'Passage D:\nMicroplastics have now been detected across every biome on Earth, from the Mariana Trench to the glaciers of Mount Everest. Atmospheric scientists have proven that oceanic wave action and wind shear propel microscopic synthetic fibers into the jet stream, creating an atmospheric particulate cycle akin to the natural water cycle. Precipitating down in remote alpine snowpack, these dark particles reduce surface albedo, accelerating glacier melt rates and perturbing downstream freshwater supplies.',
            q: 'How do atmospheric microplastics accelerate glacial melting according to Passage D?',
            c: 'Dark synthetic particles reduce snow surface reflectivity (albedo), absorbing more solar heat.',
            w: ['They emit radioactive thermal energy directly into the ice.', 'They drill physical holes through the mountains with mechanical lasers.', 'They freeze the air so hard that glaciers explode.'],
            exp: 'อนุภาคไมโครพลาสติกสีคล้ำไปลดค่า Albedo (การสะท้อนแสง) ของหิมะ ทำให้ดูดซับความร้อนจากแสงแดดมากขึ้น น้ำแข็งจึงละลายเร็วขึ้น',
            trap: 'ระวังตัวเลือกวิทยาศาสตร์ลวงโลก เช่น แผ่รังสีหรือใช้เลเซอร์'
        },
        {
            id: 'q_tgat1_99', bp: 'tgat1_rd_rc',
            stim: 'Passage D:\nMicroplastics have now been detected across every biome on Earth, from the Mariana Trench to the glaciers of Mount Everest. Atmospheric scientists have proven that oceanic wave action and wind shear propel microscopic synthetic fibers into the jet stream, creating an atmospheric particulate cycle akin to the natural water cycle. Precipitating down in remote alpine snowpack, these dark particles reduce surface albedo, accelerating glacier melt rates and perturbing downstream freshwater supplies.',
            q: 'What does "albedo" mean in this planetary science context?',
            c: 'The proportion of incident solar radiation reflected by a surface.',
            w: ['The chemical toxicity level of drinking water.', 'The thickness of subglacial bedrock layers.', 'The total weight of plastic produced per year.'],
            exp: 'Albedo ในทางวิทยาศาสตร์คือ ค่าสัดส่วนการสะท้อนรังสีของพื้นผิววัตถุ (Surface reflectivity)',
            trap: 'ระวังตอบเรื่องความหนาหรือความเป็นพิษ'
        },
        {
            id: 'q_tgat1_100', bp: 'tgat1_rd_rc',
            stim: 'Passage E:\nTelemedicine adoption accelerated exponentially during global pandemics, demonstrating that remote diagnostic consultations can effectively resolve minor ailments without overburdening emergency rooms. Nevertheless, health equity advocates warn of a "digital divide." Elderly patients, rural communities lacking broadband connectivity, and low-income families without smartphones face disenfranchisement from modern digital healthcare, proving that technological innovation must be matched with inclusive infrastructure.',
            q: 'What is the author\'s main conclusion regarding telemedicine in Passage E?',
            c: 'While beneficial, digital healthcare risks widening inequities unless infrastructure access is universalized.',
            w: ['Telemedicine should be immediately outlawed worldwide.', 'Traditional hospitals should be completely dismantled.', 'Elderly patients should be prohibited from seeing doctors.'],
            exp: 'ผู้เขียนสรุปว่า แม้การแพทย์ทางไกลจะมีประโยชน์มาก แต่มีความเสี่ยงที่จะเพิ่มความเหลื่อมล้ำ หากไม่พัฒนาโครงสร้างพื้นฐานให้ครอบคลุมทุกคน',
            trap: 'ระวังตัวเลือกที่เสนอให้แบนการแพทย์ทางไกล'
        }
    ];

    rcScenarios.forEach(s => {
        questions.push({
            id: s.id, subject_id: 'tgat1', blueprint_id: s.bp,
            stimulus: s.stim, question_text: s.q, difficulty: 'hard',
            explanation: s.exp, trap_analysis: s.trap,
            options: [
                { label: '1', content: s.c, is_correct: 1 },
                { label: '2', content: s.w[0], is_correct: 0 },
                { label: '3', content: s.w[1], is_correct: 0 },
                { label: '4', content: s.w[2], is_correct: 0 }
            ]
        });
    });

    insertQuestionsBatch(questions);
    console.log(`🎉 TGAT1 completed! 44 new questions added. Total TGAT1 is now 100 questions.`);
}

module.exports = { generateTgat1Batch };

if (require.main === module) {
    generateTgat1Batch();
}
