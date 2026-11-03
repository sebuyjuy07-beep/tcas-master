/**
 * TGAT1 SET 3: Green Planet, Climate Change & Sustainable Future
 * 60 Questions strictly calibrated to Official MyTCAS Blueprint
 * Domain 1: Speaking Skill (30 questions: QR 10, SC 10, LC 10)
 * Domain 2: Reading Skill (30 questions: TC 15, RC 15)
 */

const set3Questions = [
    // =========================================================================
    // PART 1.1: QUESTION-RESPONSE (Questions 1 - 10)
    // =========================================================================
    {
        id: 'q_tgat1_s3_01',
        subject_id: 'tgat1',
        set_number: 3,
        blueprint_id: 'tgat1_spk_qr',
        stimulus: 'A: "Would you mind bringing your reusable tote bag when we go grocery shopping?"\nB: "____________________________________"',
        question_text: 'Choose the most appropriate response to complete the dialogue.',
        difficulty: 'medium',
        explanation: 'โครงสร้าง "Would you mind + V.ing...?" (คุณจะรังเกียจไหมหาก...) ตอบรับด้วยความยินยอมต้องใช้ "Not at all. I already have two canvas totes packed by the doorway." (ไม่รังเกียจเลย ฉันเตรียมถุงผ้าไว้ 2 ใบตรงประตูแล้ว)',
        trap_analysis: 'ระวังตอบ "Yes, certainly" เพราะแปลว่ารังเกียจที่จะนำถุงผ้าไป',
        options: [
            { label: '1', content: 'Yes, of course; plastic bags are so convenient.', is_correct: 0 },
            { label: '2', content: 'Not at all. I already have two canvas totes waiting by the front door.', is_correct: 1 },
            { label: '3', content: 'Never mind, I never eat food or purchase groceries.', is_correct: 0 },
            { label: '4', content: 'Groceries are purchased in supermarkets worldwide.', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s3_02',
        subject_id: 'tgat1',
        set_number: 3,
        blueprint_id: 'tgat1_spk_qr',
        stimulus: 'A: "How do you like the municipal bicycle-sharing scheme launched downtown?"\nB: "____________________________________"',
        question_text: 'Choose the most appropriate response to complete the dialogue.',
        difficulty: 'easy',
        explanation: 'ถามความเห็นเกี่ยวกับโครงการแชร์จักรยานสาธารณะ: "It has dramatically cut down my morning commute time and saved bus fares." (มันช่วยลดเวลาเดินทางตอนเช้าและประหยัดค่ารถเมล์ได้เยอะมาก)',
        trap_analysis: 'ระวังตอบวิธีหาจักรยาน (How to find) ซึ่งไม่ตรงกับความหมายของสำนวน How do you like',
        options: [
            { label: '1', content: 'I found the bicycle parked near the central post office.', is_correct: 0 },
            { label: '2', content: 'It has dramatically cut down my commute time and reduced my carbon footprint.', is_correct: 1 },
            { label: '3', content: 'Bicycles have two rubber pneumatic tires.', is_correct: 0 },
            { label: '4', content: 'No, I prefer riding horses on paved highways.', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s3_03',
        subject_id: 'tgat1',
        set_number: 3,
        blueprint_id: 'tgat1_spk_qr',
        stimulus: 'A: "What do you say we volunteer for the mangrove reforestation drive this Saturday?"\nB: "____________________________________"',
        question_text: 'Choose the most appropriate response to complete the dialogue.',
        difficulty: 'easy',
        explanation: 'ชวนไปเป็นอาสาสมัครปลูกป่าชายเลน ("What do you say we...?"): ตอบตกลงด้วยความกระตือรือร้น "Sounds wonderful! Planting saplings is a fantastic way to spend the weekend."',
        trap_analysis: 'ระวังตัวเลือกที่ตอบปฏิเสธห้วนๆ หรือพูดเรื่องอื่นที่ไม่เกี่ยวกับการไปทำกิจกรรม',
        options: [
            { label: '1', content: 'Sounds wonderful! Planting saplings is a fantastic way to give back.', is_correct: 1 },
            { label: '2', content: 'Mangroves are trees that grow along tropical coastlines.', is_correct: 0 },
            { label: '3', content: 'I refuse to walk on soil under any circumstances.', is_correct: 0 },
            { label: '4', content: 'Saturday is the day following Friday.', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s3_04',
        subject_id: 'tgat1',
        set_number: 3,
        blueprint_id: 'tgat1_spk_qr',
        stimulus: 'A: "Should we install solar thermal panels on the rooftop or invest in home battery storage first?"\nB: "____________________________________"',
        question_text: 'Choose the most appropriate response to complete the dialogue.',
        difficulty: 'medium',
        explanation: 'เป็น Alternative question (A or B?): ให้เลือกระหว่างโซลาร์เซลล์หรือแบตเตอรี่บ้าน คำตอบที่สมเหตุสมผลคือ "Let’s start with the solar panels so we can generate electricity immediately."',
        trap_analysis: 'ห้ามตอบ Yes/No เด็ดขาดในคำถามแบบ A or B',
        options: [
            { label: '1', content: 'Yes, please turn on all the light switches right now.', is_correct: 0 },
            { label: '2', content: 'Let’s start with the solar panels so we can generate clean power immediately.', is_correct: 1 },
            { label: '3', content: 'The sun is a medium-sized yellow dwarf star.', is_correct: 0 },
            { label: '4', content: 'Neither of us has ever lived in a residential dwelling.', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s3_05',
        subject_id: 'tgat1',
        set_number: 3,
        blueprint_id: 'tgat1_spk_qr',
        stimulus: 'A: "I just realized our kitchen faucet has been steadily dripping all weekend!"\nB: "____________________________________"',
        question_text: 'Choose the most appropriate response to complete the dialogue.',
        difficulty: 'easy',
        explanation: 'ก๊อกน้ำรั่วทิ้งทั้งวันหยุด: แนะนำวิธีแก้ไขอย่างเร่งด่วน "Let’s shut off the main water valve and replace the worn rubber washer."',
        trap_analysis: 'ตัวเลือกอื่นแสดงความไม่ใส่ใจหรือพูดเรื่องไม่ช่วยแก้ปัญหา',
        options: [
            { label: '1', content: 'Let’s shut off the main water valve right away and replace the worn washer.', is_correct: 1 },
            { label: '2', content: 'Congratulations on producing such delightful musical water sounds!', is_correct: 0 },
            { label: '3', content: 'Water molecules consist of hydrogen and oxygen atoms.', is_correct: 0 },
            { label: '4', content: 'Never mind, oceans contain millions of gallons of water.', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s3_06',
        subject_id: 'tgat1',
        set_number: 3,
        blueprint_id: 'tgat1_spk_qr',
        stimulus: 'A: "Could I drop off my obsolete lithium laptop batteries at this recycling depot?"\nB: "____________________________________"',
        question_text: 'Choose the most appropriate response to complete the dialogue.',
        difficulty: 'easy',
        explanation: 'สอบถามเรื่องจุดทิ้งขยะอันตราย (แบตเตอรี่ลิเทียม): คำตอบตอบรับอย่างสุภาพและบอกจุดทิ้ง "Certainly. Please place them in the yellow hazardous waste bin over there."',
        trap_analysis: 'ระวังตัวเลือกที่บอกให้โยนลงถังขยะเปียก ซึ่งอันตรายและผิดกฎหมาย',
        options: [
            { label: '1', content: 'Certainly. Please deposit them in the yellow hazardous e-waste receptacle over there.', is_correct: 1 },
            { label: '2', content: 'Batteries store electrochemical potential energy.', is_correct: 0 },
            { label: '3', content: 'You should bury them in your vegetable garden.', is_correct: 0 },
            { label: '4', content: 'No, throw them into the municipal lake.', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s3_07',
        subject_id: 'tgat1',
        set_number: 3,
        blueprint_id: 'tgat1_spk_qr',
        stimulus: 'A: "I am terribly sorry for forgetting to switch off the air conditioning unit before leaving the seminar room."\nB: "____________________________________"',
        question_text: 'Choose the most appropriate response to complete the dialogue.',
        difficulty: 'easy',
        explanation: 'เพื่อนขอโทษที่ลืมปิดแอร์: ตอบรับคำขอโทษอย่างเข้าใจและเสนอทางแก้ป้องกันซ้ำ "No worries; I turned it off. Let’s set a reminder on the exit door for next time."',
        trap_analysis: 'ระวังตัวเลือกที่ก้าวร้าวหรือลงโทษเกินกว่าเหตุ',
        options: [
            { label: '1', content: 'No harm done; I switched it off. Let’s put up an exit reminder for next time.', is_correct: 1 },
            { label: '2', content: 'Air conditioners cool rooms through refrigerant condensation.', is_correct: 0 },
            { label: '3', content: 'You must pay the entire campus electric utility bill for this year.', is_correct: 0 },
            { label: '4', content: 'I am so glad the polar ice caps melted because of you.', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s3_08',
        subject_id: 'tgat1',
        set_number: 3,
        blueprint_id: 'tgat1_spk_qr',
        stimulus: 'A: "Our university student club successfully diverted three tons of food scraps from landfills this semester!"\nB: "____________________________________"',
        question_text: 'Choose the most appropriate response to complete the dialogue.',
        difficulty: 'easy',
        explanation: 'เพื่อนมาบอกความสำเร็จในการนำเศษอาหารไปทำปุ๋ยหมวดหมู่ Zero-waste: แสดงความยินดีและชื่นชม "What an extraordinary achievement! Your composting initiative is genuinely inspirational."',
        trap_analysis: 'ระวังตัวเลือกที่ดูถูกความพยายามของชมรม',
        options: [
            { label: '1', content: 'What an extraordinary achievement! Your composting initiative is genuinely inspirational.', is_correct: 1 },
            { label: '2', content: 'Landfills are filled with decomposing organic matter.', is_correct: 0 },
            { label: '3', content: 'I cannot stand eating vegetables or fruit peels.', is_correct: 0 },
            { label: '4', content: 'Nobody in the world cares about environmental conservation.', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s3_09',
        subject_id: 'tgat1',
        set_number: 3,
        blueprint_id: 'tgat1_spk_qr',
        stimulus: 'A: "Do you happen to know where the campus refill station for drinking water is located?"\nB: "____________________________________"',
        question_text: 'Choose the most appropriate response to complete the dialogue.',
        difficulty: 'medium',
        explanation: 'ถามจุดเติมน้ำดื่มเพื่อลดขยะขวดพลาสติก: บอกทิศทางชัดเจน "It is right next to the student lounge near the east entrance."',
        trap_analysis: 'ระวังตัวเลือกที่ตอบแค่เรื่องโครงสร้างโมเลกุลน้ำ',
        options: [
            { label: '1', content: 'It’s right beside the student lounge near the east entrance on the first floor.', is_correct: 1 },
            { label: '2', content: 'Water is composed of two hydrogen atoms and one oxygen atom.', is_correct: 0 },
            { label: '3', content: 'I have never felt thirsty in my entire lifetime.', is_correct: 0 },
            { label: '4', content: 'Bottles are made from polyethylene terephthalate plastic.', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s3_10',
        subject_id: 'tgat1',
        set_number: 3,
        blueprint_id: 'tgat1_spk_qr',
        stimulus: 'A: "I am having real trouble keeping these heirloom tomato seedlings alive on my balcony."\nB: "____________________________________"',
        question_text: 'Choose the most appropriate response to complete the dialogue.',
        difficulty: 'medium',
        explanation: 'เพื่อนปลูกต้นมะเขือเทศแล้วเหี่ยว: แนะนำเคล็ดลับการดูแลต้นไม้ "Make sure they get at least six hours of direct sunlight and avoid overwatering the soil."',
        trap_analysis: 'ระวังตัวเลือกที่บอกให้ตัดทิ้งหรือพูดเรื่องราคามะเขือเทศในห้าง',
        options: [
            { label: '1', content: 'Make sure they get plenty of morning sunlight and check that the drainage holes aren’t clogged.', is_correct: 1 },
            { label: '2', content: 'Tomatoes are botanically categorized as berries.', is_correct: 0 },
            { label: '3', content: 'You should buy canned tomato paste from the supermarket instead.', is_correct: 0 },
            { label: '4', content: 'Balconies are elevated platforms attached to buildings.', is_correct: 0 }
        ]
    },

    // =========================================================================
    // PART 1.2: SHORT CONVERSATIONS (Questions 11 - 20)
    // =========================================================================
    // Dialogue 1: Zero-Waste Bulk Store (Questions 11 - 13)
    {
        id: 'q_tgat1_s3_11',
        subject_id: 'tgat1',
        set_number: 3,
        blueprint_id: 'tgat1_spk_sc',
        stimulus: 'Situation: Nina is visiting a zero-waste refill grocer for the first time and asks the shop assistant, Toby, for guidance.\n\nNina: "Excuse me, I brought my own glass mason jars, but ____(11)____?"\nToby: "Welcome! First, place your clean jars on the scale by the door to tare their weight."\nNina: "Ah, so the weight of the glass isn’t included in the final purchase price?"\nToby: "Exactly! ____(12)____, you can dispense whatever grains, nuts, or liquid detergents you need."\nNina: "That is wonderfully straightforward. ____(13)____?"\nToby: "Over near aisle three; we have cold-pressed olive oils and biodegradable dish soaps on tap."',
        question_text: 'Select the best phrase for blank (11).',
        difficulty: 'medium',
        explanation: 'Nina มาเป็นครั้งแรกจึงถามขั้นตอนการชั่งน้ำหนักขวดโหลแก้ว: "I’m not entirely sure how the refill weighing process works." (ฉันไม่ค่อยแน่ใจว่าขั้นตอนการชั่งของรีฟิลทำงานอย่างไร)',
        trap_analysis: 'ดูคำตอบของ Toby: "First, place your clean jars on the scale to tare their weight"',
        options: [
            { label: '1', content: 'I am not entirely sure how the refill weighing procedure works', is_correct: 1 },
            { label: '2', content: 'why are you selling expensive glass containers in a grocery store', is_correct: 0 },
            { label: '3', content: 'who gave you permission to operate a business without plastic packaging', is_correct: 0 },
            { label: '4', content: 'can you wash my dirty laundry while I look around the aisles', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s3_12',
        subject_id: 'tgat1',
        set_number: 3,
        blueprint_id: 'tgat1_spk_sc',
        stimulus: 'Situation: Nina is visiting a zero-waste refill grocer for the first time...\n\nToby: "Exactly! ____(12)____, you can dispense whatever grains, nuts, or liquid detergents you need."\nNina: "That is wonderfully straightforward. ____(13)____?"',
        question_text: 'Select the best phrase for blank (12).',
        difficulty: 'easy',
        explanation: 'พนักงานอธิบายขั้นตอนต่อไปหลังจากแปะบาร์โค้ดน้ำหนักภาชนะ: "Once you print the tare barcode sticker and attach it to the jar" (เมื่อคุณพิมพ์สติกเกอร์น้ำหนักภาชนะเปล่าแล้วแปะลงบนขวดโหล)',
        trap_analysis: 'ขั้นตอนของร้าน refill คือ Tare weight -> Fill ingredients -> Pay by net weight',
        options: [
            { label: '1', content: 'Once you print and attach the tare weight barcode label', is_correct: 1 },
            { label: '2', content: 'After you shatter the glass jar onto the concrete floor', is_correct: 0 },
            { label: '3', content: 'Before you confess all your personal secrets to the cashier', is_correct: 0 },
            { label: '4', content: 'Unless you agree to purchase the entire store building', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s3_13',
        subject_id: 'tgat1',
        set_number: 3,
        blueprint_id: 'tgat1_spk_sc',
        stimulus: 'Situation: Nina is visiting a zero-waste refill grocer for the first time...\n\nNina: "That is wonderfully straightforward. ____(13)____?"\nToby: "Over near aisle three; we have cold-pressed olive oils and biodegradable dish soaps on tap."',
        question_text: 'Select the best phrase for blank (13).',
        difficulty: 'easy',
        explanation: 'Nina ถามหาตำแหน่งของแผนกน้ำยา/น้ำมัน: "Where can I locate the liquid refill pumps?" (ฉันจะหาสถานีเติมของเหลวได้ตรงไหนคะ?)',
        trap_analysis: 'ดูคำตอบของ Toby: "Over near aisle three; we have cold-pressed olive oils and dish soaps on tap"',
        options: [
            { label: '1', content: 'Where can I locate the bulk liquid refill stations', is_correct: 1 },
            { label: '2', content: 'Why do human beings require liquid hydration to survive', is_correct: 0 },
            { label: '3', content: 'Do you sell frozen packaged microwave dinners here', is_correct: 0 },
            { label: '4', content: 'Can I borrow your car to drive to the nearest shopping mall', is_correct: 0 }
        ]
    },

    // Dialogue 2: Eco-Tourism Homestay in Northern Thailand (Questions 14 - 17)
    {
        id: 'q_tgat1_s3_14',
        subject_id: 'tgat1',
        set_number: 3,
        blueprint_id: 'tgat1_spk_sc',
        stimulus: 'Situation: George is inquiring about an eco-friendly community homestay in Mae Hong Son.\n\nHost: "Sawadee khrup! Mae La Eco-Lodge. How may we welcome you to our mountain village?"\nGeorge: "Hello! I am planning a four-day retreat. ____(14)____?"\nHost: "All our electricity is supplied by micro-hydro turbines in the stream, and our kitchen prepares 100% organic locally harvested produce."\nGeorge: "That aligns wonderfully with my values! ____(15)____?"\nHost: "Yes, we arrange guided treks led by indigenous village elders ____(16)____."\nGeorge: "That sounds profoundly authentic. Are single-use plastic bottles permitted on the trail?"\nHost: "____(17)____. We provide every guest with a complimentary stainless steel flask and spring-water refills."',
        question_text: 'Select the best phrase for blank (14).',
        difficulty: 'medium',
        explanation: 'George ถามถึงแนวปฏิบัติด้านความยั่งยืนของโฮมสเตย์: "Could you tell me more about your environmental sustainability practices?" (ช่วยเล่าแนวทางการท่องเที่ยวเชิงอนุรักษ์สิ่งแวดล้อมของคุณให้ฟังหน่อยได้ไหมครับ?)',
        trap_analysis: 'ดูคำตอบของ Host: "All electricity is supplied by micro-hydro turbines, and our kitchen prepares organic produce"',
        options: [
            { label: '1', content: 'Could you tell me more about your environmental sustainability practices', is_correct: 1 },
            { label: '2', content: 'How many luxury air-conditioned limousines do you have in your garage', is_correct: 0 },
            { label: '3', content: 'Why are there mountains located in northern geographic territories', is_correct: 0 },
            { label: '4', content: 'Can I build a commercial shopping complex during my four-day holiday', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s3_15',
        subject_id: 'tgat1',
        set_number: 3,
        blueprint_id: 'tgat1_spk_sc',
        stimulus: 'Situation: George is inquiring about an eco-friendly community homestay in Mae Hong Son...\n\nGeorge: "That aligns wonderfully with my values! ____(15)____?"\nHost: "Yes, we arrange guided treks led by indigenous village elders who share traditional herbal knowledge."',
        question_text: 'Select the best phrase for blank (15).',
        difficulty: 'medium',
        explanation: 'George ถามเกี่ยวกับกิจกรรมเดินป่าเชิงวัฒนธรรมร่วมกับคนท้องถิ่น: "Do you offer community-led nature hikes and cultural immersions?"',
        trap_analysis: 'Host ตอบ "Yes, we arrange guided treks led by indigenous village elders"',
        options: [
            { label: '1', content: 'Do you offer community-led nature hikes and cultural immersions', is_correct: 1 },
            { label: '2', content: 'Are guests allowed to hunt endangered wildlife in national parks', is_correct: 0 },
            { label: '3', content: 'Why do elderly people live in rural provincial communities', is_correct: 0 },
            { label: '4', content: 'Can we cut down ancient teak trees for campfire firewood', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s3_16',
        subject_id: 'tgat1',
        set_number: 3,
        blueprint_id: 'tgat1_spk_sc',
        stimulus: 'Situation: George is inquiring about an eco-friendly community homestay in Mae Hong Son...\n\nHost: "Yes, we arrange guided treks led by indigenous village elders ____(16)____."',
        question_text: 'Select the best phrase for blank (16).',
        difficulty: 'medium',
        explanation: 'ขยายความว่าผู้นำชุมชนจะพาไปทำอะไร: "who share ancestral botanical medicine and forest preservation folklore" (ผู้จะมาแบ่งปันความรู้สมุนไพรพื้นบ้านและนิทานพื้นบ้านการรักษาผืนป่า)',
        trap_analysis: 'โฮมสเตย์เชิงอนุรักษ์เน้นการแลกเปลี่ยนความรู้ทางพฤกษศาสตร์และวัฒนธรรม',
        options: [
            { label: '1', content: 'who share ancestral botanical knowledge and forest stewardship traditions', is_correct: 1 },
            { label: '2', content: 'who will convince you to purchase industrial petrochemical shares', is_correct: 0 },
            { label: '3', content: 'who have never stepped foot into a natural woodland environment', is_correct: 0 },
            { label: '4', content: 'who will instruct you on how to pave mountain trails with asphalt', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s3_17',
        subject_id: 'tgat1',
        set_number: 3,
        blueprint_id: 'tgat1_spk_sc',
        stimulus: 'Situation: George is inquiring about an eco-friendly community homestay in Mae Hong Son...\n\nGeorge: "Are single-use plastic bottles permitted on the trail?"\nHost: "____(17)____. We provide every guest with a complimentary stainless steel flask and spring-water refills."',
        question_text: 'Select the best phrase for blank (17).',
        difficulty: 'easy',
        explanation: 'George ถามว่าอนุญาตให้นำขวดพลาสติกแบบใช้ครั้งเดียวทิ้งเข้าไปในเส้นทางเดินป่าไหม เจ้าของที่พักตอบปฏิเสธอย่างสุภาพเพื่อรักษาสิ่งแวดล้อม: "We strictly prohibit single-use plastics to protect our forest trails." (เราห้ามใช้พลาสติกแบบใช้ครั้งเดียวทิ้งอย่างเข้มงวดเพื่ออนุรักษ์เส้นทางธรรมชาติ)',
        trap_analysis: 'ดูประโยคถัดไป: "We provide every guest with a stainless steel flask" แสดงว่าไม่อนุญาตให้นำขวดพลาสติกใช้ครั้งเดียวทิ้งเข้าแน่นอน',
        options: [
            { label: '1', content: 'We maintain a strict zero-single-use-plastic policy across all trails', is_correct: 1 },
            { label: '2', content: 'Yes, please discard plastic bottles wherever you wish along the river', is_correct: 0 },
            { label: '3', content: 'Plastic bottles are our village’s primary artistic cultural export', is_correct: 0 },
            { label: '4', content: 'We encourage visitors to bury empty tin cans near mountain springs', is_correct: 0 }
        ]
    },

    // Dialogue 3: Electric Vehicle Charging Station Etiquette (Questions 18 - 20)
    {
        id: 'q_tgat1_s3_18',
        subject_id: 'tgat1',
        set_number: 3,
        blueprint_id: 'tgat1_spk_sc',
        stimulus: 'Situation: Sam and Priya are waiting at a crowded suburban EV fast-charging hub.\n\nSam: "Look at that sedan in bay two; its battery has been at 100% for over forty minutes!"\nPriya: "____(18)____! The charging bay is meant for active replenishing, not free parking."\nSam: "Should we check if the driver left a contact card on the windshield dashboard?"\nPriya: "Good thinking. ____(19)____ and send them a polite notification."\nSam: "Look, they just sprinted out from the cafe holding an iced latte. Here they come."\nPriya: "____(20)____. Let’s plug our car in as soon as they unplug."',
        question_text: 'Select the best phrase for blank (18).',
        difficulty: 'medium',
        explanation: 'Priya แสดงความเห็นเรื่องมารยาทการชาร์จรถไฟฟ้า: "That is such irresponsible charging station etiquette" (นั่นเป็นมารยาทการชาร์จที่ไร้ความรับผิดชอบมากเลย!)',
        trap_analysis: 'คนจอดแช่ที่ชาร์จทั้งที่แบตเต็มแล้ว 40 นาที ทำให้คนอื่นเดือดร้อน',
        options: [
            { label: '1', content: 'That is really inconsiderate charging station etiquette', is_correct: 1 },
            { label: '2', content: 'What a generous driver to leave their car there for weeks', is_correct: 0 },
            { label: '3', content: 'Batteries explode whenever they reach ninety-nine percent', is_correct: 0 },
            { label: '4', content: 'Electric motors generate power from steam propulsion', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s3_19',
        subject_id: 'tgat1',
        set_number: 3,
        blueprint_id: 'tgat1_spk_sc',
        stimulus: 'Situation: Sam and Priya are waiting at a crowded suburban EV fast-charging hub...\n\nSam: "Should we check if the driver left a contact card on the windshield dashboard?"\nPriya: "Good thinking. ____(19)____ and send them a polite notification."',
        question_text: 'Select the best phrase for blank (19).',
        difficulty: 'easy',
        explanation: 'Priya สนับสนุนความคิดของ Sam ในการสแกนหรือโทรแจ้งเจ้าของรถ: "We can scan their EV network QR sticker" (เราสามารถสแกนสติกเกอร์คิวอาร์โค้ดของแอปชาร์จเพื่อส่งแจ้งเตือนเขาได้)',
        trap_analysis: 'ระวังตัวเลือกที่บอกให้ทุบกระจกหรือทำลายทรัพย์สิน',
        options: [
            { label: '1', content: 'We can scan their network QR badge on the windshield', is_correct: 1 },
            { label: '2', content: 'Let’s slash all four of their tires with a pocket knife', is_correct: 0 },
            { label: '3', content: 'We should set fire to the charging kiosk immediately', is_correct: 0 },
            { label: '4', content: 'Let’s buy ten gasoline generators and plug them in', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s3_20',
        subject_id: 'tgat1',
        set_number: 3,
        blueprint_id: 'tgat1_spk_sc',
        stimulus: 'Situation: Sam and Priya are waiting at a crowded suburban EV fast-charging hub...\n\nSam: "Look, they just sprinted out from the cafe holding an iced latte. Here they come."\nPriya: "____(20)____. Let’s plug our car in as soon as they unplug."',
        question_text: 'Select the best phrase for blank (20).',
        difficulty: 'easy',
        explanation: 'Priya พอใจที่เรื่องคลี่คลายโดยไม่ต้องทะเลาะกัน: "At least they are vacating the spot without any argument." (อย่างน้อยเขาก็มาขยับรถออกโดยไม่มีเรื่องบาดหมาง)',
        trap_analysis: 'ระวังตัวเลือกที่ชวนทะเลาะวิวาท',
        options: [
            { label: '1', content: 'At least they are vacating the bay without any fuss', is_correct: 1 },
            { label: '2', content: 'Let’s challenge them to an armed duel in the parking lot', is_correct: 0 },
            { label: '3', content: 'Never charge any vehicle until the next solar eclipse', is_correct: 0 },
            { label: '4', content: 'We should abandon our electric car in the highway ditch', is_correct: 0 }
        ]
    },

    // =========================================================================
    // PART 1.3: LONG CONVERSATIONS (Questions 21 - 30)
    // =========================================================================
    // Long Conversation 1: Campus Climate Action Committee (Questions 21 - 25)
    {
        id: 'q_tgat1_s3_21',
        subject_id: 'tgat1',
        set_number: 3,
        blueprint_id: 'tgat1_spk_lc',
        stimulus: 'Situation: Professor Lin, Student Representative Tara, and Facilities Director Greg are convening the university Climate Advisory Board.\n\nProf. Lin: "Thank you all for attending. Our mandate today is evaluating the feasibility of achieving net-zero campus greenhouse emissions by 2035."\nTara: "From the student perspective, our primary ambition is phasing out single-use disposable cafeteria packaging ____(21)____."\nGreg: "While we endorse that philosophy wholeheartedly, commercial dining vendors raise legitimate financial apprehensions. Biodegradable sugarcane clam-shells cost three times as much as expanded polystyrene containers."\nProf. Lin: "____(22)____? If the university commits to bulk procurement across all twelve campus cafeterias, we could negotiate substantial volume discounts."\nGreg: "That would indeed mitigate unit costs. Furthermore, we could implement a reusable container deposit program ____(23)____."\nTara: "Students would gladly pay a nominal two-dollar deposit that gets refunded when the container is returned to automated washing kiosks!"\nProf. Lin: "Excellent synergy. What about our thermal heating and cooling footprint? ____(24)____."\nGreg: "Our aging steam boilers are notoriously inefficient. Transitioning to commercial ground-source geothermal heat pumps would cut natural gas consumption by 65%."\nTara: "____(25)____. We could apply for federal clean-energy green infrastructure grants to co-fund the capital installation costs."',
        question_text: 'Select the best option for blank (21).',
        difficulty: 'medium',
        explanation: 'Tara นำเสนอนโยบายลดขยะในโรงอาหาร: "and mandating 100% compostable or reusable dining ware across all food courts." (และกำหนดให้ใช้ภาชนะที่ย่อยสลายได้หรือใช้ซ้ำได้ 100% ทั่วทุกศูนย์อาหาร)',
        trap_analysis: 'ตัวเลือกอื่นสนับสนุนการใช้โฟมหรือห้ามกินอาหารในมหาลัย',
        options: [
            { label: '1', content: 'and mandating compostable or reusable alternatives across all vendor stalls', is_correct: 1 },
            { label: '2', content: 'by forcing students to eat their meals with bare hands on the grass', is_correct: 0 },
            { label: '3', content: 'while importing millions of disposable plastic cups from overseas daily', is_correct: 0 },
            { label: '4', content: 'in order to close down every cafeteria and starve the campus community', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s3_22',
        subject_id: 'tgat1',
        set_number: 3,
        blueprint_id: 'tgat1_spk_lc',
        stimulus: 'Situation: Professor Lin, Student Representative Tara, and Facilities Director Greg are convening...\n\nGreg: "Biodegradable sugarcane clam-shells cost three times as much as expanded polystyrene containers."\nProf. Lin: "____(22)____? If the university commits to bulk procurement across all twelve campus cafeterias, we could negotiate substantial volume discounts."',
        question_text: 'Select the best option for blank (22).',
        difficulty: 'medium',
        explanation: 'Prof. Lin เสนอทางออกเพื่อแก้ปัญหาต้นทุนแพงด้วยการซื้อเหมาล็อตใหญ่: "Have we explored centralized cooperative purchasing agreements" (เราได้ศึกษาเรื่องการทำสัญญาจัดซื้อร่วมแบบรวมศูนย์แล้วหรือยัง?)',
        trap_analysis: 'ดูประโยคถัดไป: "If the university commits to bulk procurement, we could negotiate volume discounts"',
        options: [
            { label: '1', content: 'Have we explored centralized cooperative purchasing agreements with eco-packaging suppliers', is_correct: 1 },
            { label: '2', content: 'Why don’t we demand that vendors operate at a catastrophic financial loss', is_correct: 0 },
            { label: '3', content: 'Is sugarcane grown on floating space stations orbiting Mars', is_correct: 0 },
            { label: '4', content: 'Should we replace all cafeteria food with synthetic vitamin tablets', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s3_23',
        subject_id: 'tgat1',
        set_number: 3,
        blueprint_id: 'tgat1_spk_lc',
        stimulus: 'Situation: Professor Lin, Student Representative Tara, and Facilities Director Greg are convening...\n\nGreg: "Furthermore, we could implement a reusable container deposit program ____(23)____."\nTara: "Students would gladly pay a nominal two-dollar deposit that gets refunded when the container is returned to automated washing kiosks!"',
        question_text: 'Select the best option for blank (23).',
        difficulty: 'medium',
        explanation: 'Greg อธิบายระบบมัดจำกล่องข้าว: "where diners pay a small deposit that is reimbursed upon returning the clean container" (ที่ซึ่งผู้รับประทานจ่ายเงินมัดจำเล็กน้อยแล้วได้คืนเมื่อนำกล่องมาคืน)',
        trap_analysis: 'ดูคำตอบของ Tara: "Students would gladly pay a nominal two-dollar deposit that gets refunded"',
        options: [
            { label: '1', content: 'modeled after successful circular container systems on European campuses', is_correct: 1 },
            { label: '2', content: 'that confiscates fifty percent of every student’s monthly bank savings', is_correct: 0 },
            { label: '3', content: 'requiring users to bury their dirty lunchboxes in forest soil', is_correct: 0 },
            { label: '4', content: 'which punishes anyone who drinks water with permanent expulsion', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s3_24',
        subject_id: 'tgat1',
        set_number: 3,
        blueprint_id: 'tgat1_spk_lc',
        stimulus: 'Situation: Professor Lin, Student Representative Tara, and Facilities Director Greg are convening...\n\nProf. Lin: "What about our thermal heating and cooling footprint? ____(24)____."\nGreg: "Our aging steam boilers are notoriously inefficient. Transitioning to commercial ground-source geothermal heat pumps would cut natural gas consumption by 65%."',
        question_text: 'Select the best option for blank (24).',
        difficulty: 'hard',
        explanation: 'Prof. Lin ชวนคุยเรื่องการลดคาร์บอนจากการใช้พลังงานความร้อน/แอร์ในอาคาร: "That sector accounts for over forty percent of our scope-one emissions." (ภาคส่วนนั้นปล่อยก๊าซเรือนกระจกขอบเขตที่หนึ่งเกิน 40% ของทั้งมหาวิทยาลัย)',
        trap_analysis: 'เรื่องความร้อนและความเย็น (heating and cooling) สัมพันธ์กับ scope-one emissions และ steam boilers',
        options: [
            { label: '1', content: 'That sector represents our single largest source of direct scope-one emissions', is_correct: 1 },
            { label: '2', content: 'Nobody ever uses heating or cooling during cold winter months', is_correct: 0 },
            { label: '3', content: 'Air conditioners emit toxic radioactive plutonium gas into lecture halls', is_correct: 0 },
            { label: '4', content: 'We can easily survive without any indoor temperature regulation forever', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s3_25',
        subject_id: 'tgat1',
        set_number: 3,
        blueprint_id: 'tgat1_spk_lc',
        stimulus: 'Situation: Professor Lin, Student Representative Tara, and Facilities Director Greg are convening...\n\nGreg: "Transitioning to commercial ground-source geothermal heat pumps would cut natural gas consumption by 65%."\nTara: "____(25)____. We could apply for federal clean-energy green infrastructure grants to co-fund the capital installation costs."',
        question_text: 'Select the best option for blank (25).',
        difficulty: 'medium',
        explanation: 'Tara เห็นชอบกับข้อเสนอและเสนอแหล่งเงินทุนสนับสนุน: "That would be a monumental leap forward toward our carbon neutrality timeline." (นั่นจะเป็นก้าวสำคัญอันยิ่งใหญ่สู่เป้าหมายความเป็นกลางทางคาร์บอนของเรา)',
        trap_analysis: 'ตัวเลือกนี้แสดงความเห็นพ้องอย่างกระตือรือร้นและเชื่อมโยงกับ grants',
        options: [
            { label: '1', content: 'That would be a monumental milestone toward our decarbonization timeline', is_correct: 1 },
            { label: '2', content: 'That sounds like a completely useless and wasteful distraction', is_correct: 0 },
            { label: '3', content: 'Geothermal heat comes from mythical dragons residing in Earth’s mantle', is_correct: 0 },
            { label: '4', content: 'Natural gas is the cleanest fuel in the entire known universe', is_correct: 0 }
        ]
    },

    // Long Conversation 2: Corporate ESG & Sustainable Supply Chains (Questions 26 - 30)
    {
        id: 'q_tgat1_s3_26',
        subject_id: 'tgat1',
        set_number: 3,
        blueprint_id: 'tgat1_spk_lc',
        stimulus: 'Situation: Elena, a Chief Sustainability Officer, is briefing an apparel brand executive, Richard.\n\nElena: "Richard, our audit of Tier-2 textile mills in South Asia revealed critical compliance violations regarding untreated effluent discharge into local riverways."\nRichard: "That is profoundly alarming. If watchdog NGOs catch wind of this, ____(26)____."\nElena: "Reputational fallout aside, we have an ethical obligation to remediation. Terminating the contract overnight is not the solution; ____(27)____."\nRichard: "What constructive intervention do you propose instead?"\nElena: "We should co-invest in a modern closed-loop wastewater purification facility ____(28)____."\nRichard: "How will our board of directors view capital co-investment for a contracted supplier?"\nElena: "It protects our supply security and ____(29)____ under upcoming European Union supply chain due diligence directives."\nRichard: "That makes compelling strategic sense. Let’s prepare the joint investment proposal ____(30)____."',
        question_text: 'Select the best option for blank (26).',
        difficulty: 'medium',
        explanation: 'Richard กังวลเรื่องภาพลักษณ์แบรนด์หากข่าวเรื่องโรงงานปล่อยน้ำเสียรั่วไหลออกไป: "our global brand reputation could suffer irreversible consumer boycotts." (ชื่อเสียงแบรนด์ระดับโลกของเราอาจถูกผู้บริโภคคว่ำบาตรจนไม่อาจกู้คืนได้)',
        trap_analysis: 'ความเสี่ยงของแบรนด์แฟชั่นเมื่อโรงงานทำผิดกฎหมายสิ่งแวดล้อมคือ consumer boycotts',
        options: [
            { label: '1', content: 'our international brand equity could suffer catastrophic consumer boycotts', is_correct: 1 },
            { label: '2', content: 'all clothing stores worldwide will instantly run out of fabric', is_correct: 0 },
            { label: '3', content: 'customers will celebrate our environmental negligence with praise', is_correct: 0 },
            { label: '4', content: 'rivers will magically purify themselves overnight without intervention', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s3_27',
        subject_id: 'tgat1',
        set_number: 3,
        blueprint_id: 'tgat1_spk_lc',
        stimulus: 'Situation: Elena, a Chief Sustainability Officer, is briefing an apparel brand executive, Richard...\n\nElena: "Terminating the contract overnight is not the solution; ____(27)____."',
        question_text: 'Select the best option for blank (27).',
        difficulty: 'hard',
        explanation: 'Elena อธิบายว่าการตัดสัญญาหนีปัญหาจะทำให้คนงานตกงานและโรงงานก็ไปรับงานอื่นที่ไม่มีการคุมมลพิษอยู่ดี: "that would simply drive the supplier to less scrupulous buyers while devastating local livelihoods." (นั่นจะเพียงผลักให้โรงงานไปรับงานจากผู้ซื้อที่ไร้จรรยาบรรณกว่าเดิม และทำลายวิถีชีวิตคนงานท้องถิ่น)',
        trap_analysis: 'แนวคิด ESG ยุคใหม่เน้น Remediation (การร่วมฟื้นฟูแก้ไข) มากกว่าการทิ้งปัญหา (Cut-and-run)',
        options: [
            { label: '1', content: 'it would merely drive them to less scrupulous buyers while crushing local employment', is_correct: 1 },
            { label: '2', content: 'because textile workers enjoy inhaling toxic chemical vapors daily', is_correct: 0 },
            { label: '3', content: 'since untreated chemical dye improves the reproductive health of river fish', is_correct: 0 },
            { label: '4', content: 'so we can dump our own office garbage into their municipal canals', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s3_28',
        subject_id: 'tgat1',
        set_number: 3,
        blueprint_id: 'tgat1_spk_lc',
        stimulus: 'Situation: Elena, a Chief Sustainability Officer, is briefing an apparel brand executive, Richard...\n\nElena: "We should co-invest in a modern closed-loop wastewater purification facility ____(28)____."',
        question_text: 'Select the best option for blank (28).',
        difficulty: 'medium',
        explanation: 'Elena เสนอให้ร่วมลงทุนทำระบบบำบัดน้ำเสียแบบหมุนเวียน: "which recycles ninety-eight percent of industrial dye water back into the manufacturing process." (ซึ่งจะรีไซเคิลน้ำย้อมผ้าถึง 98% กลับมาใช้ใหม่ในกระบวนการผลิต)',
        trap_analysis: 'closed-loop หมายถึงระบบหมุนเวียนน้ำกลับมาใช้ซ้ำ (recycles water back into manufacturing)',
        options: [
            { label: '1', content: 'that recycles over ninety-five percent of processing water back into production', is_correct: 1 },
            { label: '2', content: 'which pumps raw sulfuric acid directly into residential drinking wells', is_correct: 0 },
            { label: '3', content: 'in order to increase chemical toxicity across agricultural farmlands', is_correct: 0 },
            { label: '4', content: 'so that factory workers will have to swim in boiling industrial dye', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s3_29',
        subject_id: 'tgat1',
        set_number: 3,
        blueprint_id: 'tgat1_spk_lc',
        stimulus: 'Situation: Elena, a Chief Sustainability Officer, is briefing an apparel brand executive, Richard...\n\nElena: "It protects our supply security and ____(29)____ under upcoming European Union supply chain due diligence directives."',
        question_text: 'Select the best option for blank (29).',
        difficulty: 'hard',
        explanation: 'การร่วมลงทุนด้านความยั่งยืนช่วยให้แบรนด์ผ่านเกณฑ์กฎหมายตรวจสอบห่วงโซ่อุปทานของสหภาพยุโรป: "ensures full regulatory compliance to avoid punitive trade embargoes and fines." (ช่วยรับประกันการปฏิบัติตามกฎหมายอย่างครบถ้วนเพื่อหลีกเลี่ยงการถูกสั่งห้ามค้าหรือปรับเงินก้อนโต)',
        trap_analysis: 'คำสำคัญคือ "compliance under EU directives"',
        options: [
            { label: '1', content: 'guarantees statutory compliance to avert severe cross-border regulatory sanctions', is_correct: 1 },
            { label: '2', content: 'encourages European customs officers to burn our imported garments', is_correct: 0 },
            { label: '3', content: 'proves that our corporation has no interest in environmental protection', is_correct: 0 },
            { label: '4', content: 'allows us to ignore international labor conventions without penalty', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s3_30',
        subject_id: 'tgat1',
        set_number: 3,
        blueprint_id: 'tgat1_spk_lc',
        stimulus: 'Situation: Elena, a Chief Sustainability Officer, is briefing an apparel brand executive, Richard...\n\nRichard: "That makes compelling strategic sense. Let’s prepare the joint investment proposal ____(30)____."',
        question_text: 'Select the best option for blank (30).',
        difficulty: 'medium',
        explanation: 'Richard สรุปว่าจะนำข้อเสนอไปยื่นต่อที่ประชุมคณะกรรมการบริหารในไตรมาสถัดไป: "for presentation at next month’s executive board meeting." (เพื่อนำเสนอต่อที่ประชุมบอร์ดบริหารในเดือนหน้า)',
        trap_analysis: 'การนัดหมายเสนอโครงการต่อที่ประชุมผู้บริหาร',
        options: [
            { label: '1', content: 'for formal review at next month’s executive board meeting', is_correct: 1 },
            { label: '2', content: 'and immediately shred every single printed document into dust', is_correct: 0 },
            { label: '3', content: 'so we can hide all environmental pollution from government inspectors', is_correct: 0 },
            { label: '4', content: 'before firing our entire sustainability department this afternoon', is_correct: 0 }
        ]
    },

    // =========================================================================
    // PART 2.1: TEXT COMPLETION (Questions 31 - 45)
    // =========================================================================
    // Passage 1: Vertical Farming and Urban Agriculture in Megacities (Questions 31 - 37)
    {
        id: 'q_tgat1_s3_31',
        subject_id: 'tgat1',
        set_number: 3,
        blueprint_id: 'tgat1_rd_tc',
        stimulus: 'Passage 1 (Questions 31 - 37)\n\nAs the global human population rapidly approaches ten billion, conventional agriculture faces insurmountable ecological constraints. Arable land is diminishing due to soil erosion, while protracted droughts exacerbated by climate destabilization threaten global food security. In response to this compounding crisis, agronomists are pioneering vertical farming—an innovative agricultural model ____(31)____ crops are cultivated in vertically stacked tiers within climate-controlled indoor facilities. By utilizing precise LED light spectra and aeroponic misting systems, vertical farms eliminate the necessity for synthetic pesticides and consume up to ninety-five percent less water ____(32)____ traditional open-field farms.\n\nFurthermore, locating vertical farms within urban metropolises drastically reduces food transportation mileage. Traditional produce often travels thousands of miles from rural farms to urban dinner tables, ____(33)____ substantial greenhouse gas emissions along the cold-chain transit network. By growing greens inside converted warehouses just blocks from metropolitan supermarkets, urban farmers guarantee peak freshness while minimizing logistical carbon overhead. Critics, however, point out that vertical farms demand enormous quantities of electricity to power artificial illumination and ventilation. Agronomists demand that municipal planners ____(34)____ vertical agricultural hubs directly with dedicated grid-scale solar and wind installations.\n\n____(35)____ the high initial capital expenditure of automated indoor hydroponics, the sector continues to attract billions in venture funding. Not until recently ____(36)____ the convergence of robotics, energy-efficient photonics, and machine learning make commercial indoor farming economically viable at scale. As technology advances, vertical agriculture promises to transform concrete jungles into lush, self-sufficient bastions of sustainable nutrition, ____(37)____ humanity to cultivate abundant harvests without plundering the earth.',
        question_text: 'Select the best answer for blank (31).',
        difficulty: 'medium',
        explanation: 'โครงสร้างประพฤติตามสถานที่ (Relative Adverb of place): "an agricultural model in which / wherein / where crops are cultivated" (โมเดลเกษตรกรรมที่ซึ่งพืชผลถูกปลูกในชั้นซ้อนกัน)',
        trap_analysis: 'where ใช้แทนสถานที่หรือโมเดลเชิงพื้นที่ ไม่ใช่ which ลอยๆ โดยไม่มี preposition',
        options: [
            { label: '1', content: 'wherein', is_correct: 1 },
            { label: '2', content: 'which', is_correct: 0 },
            { label: '3', content: 'whose', is_correct: 0 },
            { label: '4', content: 'that', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s3_32',
        subject_id: 'tgat1',
        set_number: 3,
        blueprint_id: 'tgat1_rd_tc',
        stimulus: 'Passage 1 (Questions 31 - 37)\n\n...and consume up to ninety-five percent less water ____(32)____ traditional open-field farms.',
        question_text: 'Select the best answer for blank (32).',
        difficulty: 'easy',
        explanation: 'การเปรียบเทียบขั้นกว่า (Comparative): "less water than traditional open-field farms" (ใช้น้ำน้อยกว่าฟาร์มเปิดแบบดั้งเดิมถึง 95%)',
        trap_analysis: 'less คู่กับ than เสมอ ไม่ใช่ as หรือ from',
        options: [
            { label: '1', content: 'than', is_correct: 1 },
            { label: '2', content: 'as', is_correct: 0 },
            { label: '3', content: 'from', is_correct: 0 },
            { label: '4', content: 'against', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s3_33',
        subject_id: 'tgat1',
        set_number: 3,
        blueprint_id: 'tgat1_rd_tc',
        stimulus: 'Passage 1 (Questions 31 - 37)\n\nTraditional produce often travels thousands of miles from rural farms to urban dinner tables, ____(33)____ substantial greenhouse gas emissions along the cold-chain transit network.',
        question_text: 'Select the best answer for blank (33).',
        difficulty: 'medium',
        explanation: 'ลดรูป Participle Clause แสดงผลลัพธ์ที่ตามมา: ", generating substantial greenhouse gas emissions" (ส่งผลให้เกิดการปล่อยก๊าซเรือนกระจกปริมาณมหาศาล)',
        trap_analysis: 'เครื่องหมาย comma คั่นตามด้วย V.ing แสดงผลลัพธ์ของประโยคหน้า',
        options: [
            { label: '1', content: 'generating', is_correct: 1 },
            { label: '2', content: 'generated', is_correct: 0 },
            { label: '3', content: 'generates', is_correct: 0 },
            { label: '4', content: 'to have generated', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s3_34',
        subject_id: 'tgat1',
        set_number: 3,
        blueprint_id: 'tgat1_rd_tc',
        stimulus: 'Passage 1 (Questions 31 - 37)\n\nAgronomists demand that municipal planners ____(34)____ vertical agricultural hubs directly with dedicated grid-scale solar and wind installations.',
        question_text: 'Select the best answer for blank (34).',
        difficulty: 'hard',
        explanation: 'กฎ **Subjunctive Mood** หลังกริยาแสดงข้อเรียกร้อง (demand that + S + [should] + V.base form): ต้องใช้รูปกริยาฐาน "integrate" (ไม่มี s หรือ d)',
        trap_analysis: 'ระวังตอบ integrates หรือ integrated ซึ่งผิดกฎไวยากรณ์ Subjunctive',
        options: [
            { label: '1', content: 'integrate', is_correct: 1 },
            { label: '2', content: 'integrates', is_correct: 0 },
            { label: '3', content: 'integrated', is_correct: 0 },
            { label: '4', content: 'integrating', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s3_35',
        subject_id: 'tgat1',
        set_number: 3,
        blueprint_id: 'tgat1_rd_tc',
        stimulus: 'Passage 1 (Questions 31 - 37)\n\n____(35)____ the high initial capital expenditure of automated indoor hydroponics, the sector continues to attract billions in venture funding.',
        question_text: 'Select the best answer for blank (35).',
        difficulty: 'medium',
        explanation: 'แสดงความขัดแย้งนำหน้ากลุ่มคำนาม (Noun phrase: "the high initial capital expenditure..."): ต้องใช้ Preposition "Despite" หรือ "In spite of": "Despite" (แม้จะมีต้นทุนเริ่มแรกสูง)',
        trap_analysis: 'Although และ Even though ต้องตามด้วยประโยค (Subject + Verb) ส่วน Despite ตามด้วยคำนาม/กลุ่มคำนาม',
        options: [
            { label: '1', content: 'Despite', is_correct: 1 },
            { label: '2', content: 'Although', is_correct: 0 },
            { label: '3', content: 'Even though', is_correct: 0 },
            { label: '4', content: 'Because of', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s3_36',
        subject_id: 'tgat1',
        set_number: 3,
        blueprint_id: 'tgat1_rd_tc',
        stimulus: 'Passage 1 (Questions 31 - 37)\n\nNot until recently ____(36)____ the convergence of robotics, energy-efficient photonics, and machine learning make commercial indoor farming economically viable at scale.',
        question_text: 'Select the best answer for blank (36).',
        difficulty: 'hard',
        explanation: 'กฎ **Inversion**: เมื่อประโยคขึ้นต้นด้วย "Not until..." โครงสร้างต้องสลับกริยาช่วย (did) ขึ้นหน้าประธาน: "did the convergence... make" (กริยาช่วย did + ประธาน + V.inf make)',
        trap_analysis: 'ข้อสอบ TCAS ชอบออก Inversion มาก! ห้ามเลือก had หรือ was make',
        options: [
            { label: '1', content: 'did', is_correct: 1 },
            { label: '2', content: 'had', is_correct: 0 },
            { label: '3', content: 'was', is_correct: 0 },
            { label: '4', content: 'does', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s3_37',
        subject_id: 'tgat1',
        set_number: 3,
        blueprint_id: 'tgat1_rd_tc',
        stimulus: 'Passage 1 (Questions 31 - 37)\n\nAs technology advances, vertical agriculture promises to transform concrete jungles into lush, self-sufficient bastions of sustainable nutrition, ____(37)____ humanity to cultivate abundant harvests without plundering the earth.',
        question_text: 'Select the best answer for blank (37).',
        difficulty: 'medium',
        explanation: 'ลดรูป Participle Clause แสดงผลลัพธ์และคุณประโยชน์: "enabling humanity to cultivate" (ช่วยให้มนุษยชาติสามารถเพาะปลูกผลผลิตอันอุดมสมบูรณ์ได้)',
        trap_analysis: 'โครงสร้าง enable someone to do something ในรูป Present Participle คือ enabling',
        options: [
            { label: '1', content: 'enabling', is_correct: 1 },
            { label: '2', content: 'enabled', is_correct: 0 },
            { label: '3', content: 'enables', is_correct: 0 },
            { label: '4', content: 'having enabled', is_correct: 0 }
        ]
    },

    // Passage 2: The Global Hydrogen Energy Transition (Questions 38 - 45)
    {
        id: 'q_tgat1_s3_38',
        subject_id: 'tgat1',
        set_number: 3,
        blueprint_id: 'tgat1_rd_tc',
        stimulus: 'Passage 2 (Questions 38 - 45)\n\nIn the worldwide crusade to decarbonize heavy industry and maritime transport, green hydrogen has emerged as a cornerstone energy carrier. Unlike solar and wind power, ____(38)____ are inherently intermittent and challenging to store across seasons, hydrogen can be compressed, liquefied, and stored in subterranean salt caverns for months at a time. When combusted in fuel cells, hydrogen produces solely pure water vapor as its byproduct, ____(39)____ zero greenhouse emissions at the point of consumption.\n\nHowever, the environmental virtue of hydrogen depends entirely on its production pathway. Today, the vast majority of commercial hydrogen is classified as "grey hydrogen," meaning it is synthesized from natural gas through steam methane reforming—a process that ____(40)____ hundreds of millions of metric tons of carbon dioxide annually into the atmosphere. To achieve genuine climate neutrality, energy consortia must accelerate the transition toward "green hydrogen," which is produced through the electrolysis of water ____(41)____ by surplus renewable electricity.\n\nHad industrialized nations ____(42)____ earlier in electrolysis infrastructure, the current cost disparity between fossil fuels and clean hydrogen would already be negligible. Currently, green hydrogen remains twice as expensive as its fossil-derived counterparts. Consequently, international governments are implementing carbon taxation mechanisms and capital subsidies to bridge the pricing gulf. It is imperative that international standards organizations ____(43)____ a rigorous certification framework to prevent greenwashing in cross-border hydrogen trade. Only by ____(44)____ absolute transparency across the supply chain can we unlock the full thermodynamic potential of hydrogen, ____(45)____ a resilient, carbon-free future for generations to come.',
        question_text: 'Select the best answer for blank (38).',
        difficulty: 'easy',
        explanation: 'ประธานของอนุประโยคคือ "solar and wind power" (สิ่งไม่มีชีวิตในรูปพหูพจน์ คั่นด้วยเครื่องหมาย comma): ต้องใช้ Relative Pronoun "which" (ซึ่งพลังงานแสงอาทิตย์และลมนั้นไม่สม่ำเสมอโดยธรรมชาติ)',
        trap_analysis: 'หลังเครื่องหมาย comma ใน Non-defining relative clause ห้ามใช้ that เด็ดขาด!',
        options: [
            { label: '1', content: 'which', is_correct: 1 },
            { label: '2', content: 'that', is_correct: 0 },
            { label: '3', content: 'whose', is_correct: 0 },
            { label: '4', content: 'who', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s3_39',
        subject_id: 'tgat1',
        set_number: 3,
        blueprint_id: 'tgat1_rd_tc',
        stimulus: 'Passage 2 (Questions 38 - 45)\n\nWhen combusted in fuel cells, hydrogen produces solely pure water vapor as its byproduct, ____(39)____ zero greenhouse emissions at the point of consumption.',
        question_text: 'Select the best answer for blank (39).',
        difficulty: 'medium',
        explanation: 'ลดรูป Participle แสดงผลลัพธ์ (Resulting participle): ", releasing zero greenhouse emissions" (ปล่อยก๊าซเรือนกระจกเป็นศูนย์ ณ จุดใช้งาน)',
        trap_analysis: 'comma + V.ing ใช้แสดงผลลัพธ์ที่เกิดตามมาจากประโยคหลัก',
        options: [
            { label: '1', content: 'releasing', is_correct: 1 },
            { label: '2', content: 'released', is_correct: 0 },
            { label: '3', content: 'releases', is_correct: 0 },
            { label: '4', content: 'to have released', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s3_40',
        subject_id: 'tgat1',
        set_number: 3,
        blueprint_id: 'tgat1_rd_tc',
        stimulus: 'Passage 2 (Questions 38 - 45)\n\n...meaning it is synthesized from natural gas through steam methane reforming—a process that ____(40)____ hundreds of millions of metric tons of carbon dioxide annually into the atmosphere.',
        question_text: 'Select the best answer for blank (40).',
        difficulty: 'medium',
        explanation: 'ประธานคือ "a process" เป็นเอกพจน์ กริยาใน Relative clause แสดงข้อเท็จจริงปัจจุบัน (Present Simple): "discharges" (ปล่อยคาร์บอนไดออกไซด์หลายร้อยล้านตันสู่ชั้นบรรยากาศ)',
        trap_analysis: 'ประธาน a process เป็นเอกพจน์ กริยาต้องเติม s',
        options: [
            { label: '1', content: 'discharges', is_correct: 1 },
            { label: '2', content: 'discharge', is_correct: 0 },
            { label: '3', content: 'discharging', is_correct: 0 },
            { label: '4', content: 'have discharged', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s3_41',
        subject_id: 'tgat1',
        set_number: 3,
        blueprint_id: 'tgat1_rd_tc',
        stimulus: 'Passage 2 (Questions 38 - 45)\n\n...which is produced through the electrolysis of water ____(41)____ by surplus renewable electricity.',
        question_text: 'Select the best answer for blank (41).',
        difficulty: 'medium',
        explanation: 'ลดรูป Passive Voice (น้ำที่ถูกแยกด้วยไฟฟ้าซึ่งขับเคลื่อนด้วยพลังงานหมุนเวียน): "powered by surplus renewable electricity"',
        trap_analysis: 'มี preposition "by" ตามหลัง แสดงว่าต้องเป็นรูปถูกกระทำ (Past Participle V.3: powered)',
        options: [
            { label: '1', content: 'powered', is_correct: 1 },
            { label: '2', content: 'powering', is_correct: 0 },
            { label: '3', content: 'powers', is_correct: 0 },
            { label: '4', content: 'to power', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s3_42',
        subject_id: 'tgat1',
        set_number: 3,
        blueprint_id: 'tgat1_rd_tc',
        stimulus: 'Passage 2 (Questions 38 - 45)\n\nHad industrialized nations ____(42)____ earlier in electrolysis infrastructure, the current cost disparity between fossil fuels and clean hydrogen would already be negligible.',
        question_text: 'Select the best answer for blank (42).',
        difficulty: 'hard',
        explanation: 'ไวยากรณ์ **Inversion of Conditional (Mixed / Type 3)**: ละ If โดยสลับ Had ขึ้นหน้าประธาน (Had + Subject + V.3): "Had industrialized nations invested earlier..." (หากกลุ่มประเทศอุตสาหกรรมได้ลงทุนเร็วกว่านี้ในอดีต)',
        trap_analysis: 'หลัง Had + Subject โครงสร้าง Inversion ต้องตามด้วย V.3 (invested) เสมอ',
        options: [
            { label: '1', content: 'invested', is_correct: 1 },
            { label: '2', content: 'invest', is_correct: 0 },
            { label: '3', content: 'investing', is_correct: 0 },
            { label: '4', content: 'to invest', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s3_43',
        subject_id: 'tgat1',
        set_number: 3,
        blueprint_id: 'tgat1_rd_tc',
        stimulus: 'Passage 2 (Questions 38 - 45)\n\nIt is imperative that international standards organizations ____(43)____ a rigorous certification framework to prevent greenwashing in cross-border hydrogen trade.',
        question_text: 'Select the best answer for blank (43).',
        difficulty: 'hard',
        explanation: 'กฎ **Subjunctive Mood** หลังคุณศัพท์แสดงความจำเป็นอย่างยิ่ง (It is imperative that + S + [should] + V.base form): ต้องใช้รูปกริยาฐาน "enact" (ไม่มี s, ed หรือ ing)',
        trap_analysis: 'ระวังตอบ enacts ตามประธาน organizations หรือ enacted ตามความคุ้นชิน',
        options: [
            { label: '1', content: 'enact', is_correct: 1 },
            { label: '2', content: 'enacts', is_correct: 0 },
            { label: '3', content: 'enacted', is_correct: 0 },
            { label: '4', content: 'enacting', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s3_44',
        subject_id: 'tgat1',
        set_number: 3,
        blueprint_id: 'tgat1_rd_tc',
        stimulus: 'Passage 2 (Questions 38 - 45)\n\nOnly by ____(44)____ absolute transparency across the supply chain can we unlock the full thermodynamic potential of hydrogen...',
        question_text: 'Select the best answer for blank (44).',
        difficulty: 'easy',
        explanation: 'หลังบุพบท "by" ต้องตามด้วย Gerund (V.ing): "Only by demanding / ensuring absolute transparency..." -> "ensuring" (ด้วยการรับประกันความโปร่งใสสมบูรณ์เท่านั้น)',
        trap_analysis: 'หลัง preposition ทุกตัว (ยกเว้น to-infinitive บางกรณี) ต้องใช้ V.ing',
        options: [
            { label: '1', content: 'ensuring', is_correct: 1 },
            { label: '2', content: 'ensure', is_correct: 0 },
            { label: '3', content: 'ensured', is_correct: 0 },
            { label: '4', content: 'to ensure', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s3_45',
        subject_id: 'tgat1',
        set_number: 3,
        blueprint_id: 'tgat1_rd_tc',
        stimulus: 'Passage 2 (Questions 38 - 45)\n\n...unlock the full thermodynamic potential of hydrogen, ____(45)____ a resilient, carbon-free future for generations to come.',
        question_text: 'Select the best answer for blank (45).',
        difficulty: 'medium',
        explanation: 'ลดรูป Participle แสดงผลลัพธ์ของการปลดล็อกพลังงานไฮโดรเจน: "fostering a resilient, carbon-free future" (บ่มเพาะและสร้างอนาคตที่ไร้คาร์บอนให้คงอยู่สืบไป)',
        trap_analysis: 'foster แปลว่า ส่งเสริม บ่มเพาะ ในรูป Present Participle คือ fostering',
        options: [
            { label: '1', content: 'fostering', is_correct: 1 },
            { label: '2', content: 'fostered', is_correct: 0 },
            { label: '3', content: 'fosters', is_correct: 0 },
            { label: '4', content: 'to foster', is_correct: 0 }
        ]
    },

    // =========================================================================
    // PART 2.2: READING COMPREHENSION (Questions 46 - 60)
    // =========================================================================
    // Reading Passage 1: Public Notice - City Organic Waste Mandate (Questions 46 - 50)
    {
        id: 'q_tgat1_s3_46',
        subject_id: 'tgat1',
        set_number: 3,
        blueprint_id: 'tgat1_rd_rc',
        stimulus: `MUNICIPAL ENVIRONMENTAL ORDINANCE NO. 44-B\nCity of Greenvale Department of Sanitation & Resource Recovery\nEffective Date: January 15, 2027\n\nSubject: Mandatory Residential Organic Waste Separation and Curbside Composting Collection\n\nTo achieve our municipal climate milestone of zero landfill-destined organic refuse by 2030, all single-family homeowners, multi-unit apartment complexes, and commercial food service establishments within Greenvale city limits must comply with the following mandatory waste diversion standards:\n\n1. Mandatory Source Separation: Effective January 15, food scraps, coffee grounds, soiled paper napkins, and yard trimmings must be segregated from ordinary municipal solid waste and deposited exclusively into the designated ventilated green bins provided by the city.\n2. Contamination Thresholds: Prohibited materials include plastic packaging, pet waste, styrofoam, metals, and non-certified bioplastics. Audits will be conducted via smart optical sensors installed on automated collection trucks. Bins exhibiting contamination exceeding 10% by volume will receive an initial formal warning sticker; recurrent violations will incur a fifty-dollar municipal utility penalty.\n3. Collection Logistics: Green bins must be placed at the curbside by 07:00 on alternating Tuesdays. The city guarantees that 100% of collected organics will be routed to the Greenvale Regional Anaerobic Digestion Facility, where waste is transformed into nutrient-rich compost and renewable biomethane gas that powers our public electric bus fleet.\n4. Free Community Compost Distribution: Commencing April 1, processed high-grade organic compost will be available free of charge to all registered Greenvale residents at city parks on the first Saturday of every month (maximum two cubic yards per household).\n\nFor replacements of damaged bins or to request free kitchen countertop mini-caddies with odor-neutralizing charcoal filters, please visit www.greenvale-compost.gov or call municipal hotline 311.`,
        question_text: 'What is the primary purpose of Municipal Ordinance No. 44-B?',
        difficulty: 'easy',
        explanation: 'ประกาศเทศบาลแจ้งข้อบังคับให้แยกขยะอินทรีย์และเศษอาหารจากบ้านเรือนและร้านอาหารเพื่อนำไปหมักทำปุ๋ยและผลิตไบโอมีเทน: "To mandate the segregation of household organic waste and establish curbside collection protocols"',
        trap_analysis: 'ตัวเลือกอื่นเน้นแค่เรื่องค่าปรับ หรือบอกว่าห้ามทำอาหารในบ้าน ซึ่งไม่ใช่จุดประสงค์หลัก',
        options: [
            { label: '1', content: 'To mandate the segregation of organic waste and establish curbside collection rules across the city', is_correct: 1 },
            { label: '2', content: 'To announce that garbage collection services will be permanently discontinued on Tuesdays', is_correct: 0 },
            { label: '3', content: 'To prohibit restaurants from serving meat and dairy products to customers', is_correct: 0 },
            { label: '4', content: 'To force residents to purchase private compost bins from commercial hardware stores', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s3_47',
        subject_id: 'tgat1',
        set_number: 3,
        blueprint_id: 'tgat1_rd_rc',
        stimulus: `...Audits will be conducted via smart optical sensors installed on automated collection trucks. Bins exhibiting contamination exceeding 10% by volume will receive an initial formal warning sticker; recurrent violations will incur a fifty-dollar municipal utility penalty.`,
        question_text: 'According to Section 2, what will happen if a resident repeatedly places non-organic items into their green bin?',
        difficulty: 'medium',
        explanation: 'ข้อความระบุชัดเจนว่าหากทำผิดซ้ำ (recurrent violations) จะถูกปรับเงิน 50 ดอลลาร์ในบิลค่าสาธารณูปโภค: "They will be fined fifty dollars on their municipal utility bill."',
        trap_analysis: 'ครั้งแรกจะได้แค่ warning sticker แต่ครั้งที่ทำซ้ำจะโดนค่าปรับ 50 ดอลลาร์',
        options: [
            { label: '1', content: 'They will incur a fifty-dollar financial penalty on their city utility bill', is_correct: 1 },
            { label: '2', content: 'Their home will be disconnected from the municipal electric grid immediately', is_correct: 0 },
            { label: '3', content: 'They will be sentenced to community service at the regional landfill', is_correct: 0 },
            { label: '4', content: 'The sanitation truck will permanently confiscate their garbage bins', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s3_48',
        subject_id: 'tgat1',
        set_number: 3,
        blueprint_id: 'tgat1_rd_rc',
        stimulus: `...The city guarantees that 100% of collected organics will be routed to the Greenvale Regional Anaerobic Digestion Facility, where waste is transformed into nutrient-rich compost and renewable biomethane gas that powers our public electric bus fleet.`,
        question_text: 'How does the city utilize the byproducts generated from collected organic waste?',
        difficulty: 'medium',
        explanation: 'ขยะอินทรีย์จะถูกนำไปผลิตเป็นปุ๋ยบำรุงดินและก๊าซไบโอมีเทนหมุนเวียนเพื่อจ่ายไฟให้รถเมล์ไฟฟ้าของเมือง: "By converting it into organic fertilizer and renewable gas to fuel the public transit fleet."',
        trap_analysis: 'ดูข้อความ "nutrient-rich compost and renewable biomethane gas that powers our public electric bus fleet"',
        options: [
            { label: '1', content: 'By producing enriched fertilizer and renewable gas that fuels the city’s electric bus fleet', is_correct: 1 },
            { label: '2', content: 'By exporting all collected compost to international agricultural markets for profit', is_correct: 0 },
            { label: '3', content: 'By incinerating the waste to heat municipal outdoor swimming pools during winter', is_correct: 0 },
            { label: '4', content: 'By selling raw biomethane directly to private aviation companies', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s3_49',
        subject_id: 'tgat1',
        set_number: 3,
        blueprint_id: 'tgat1_rd_rc',
        stimulus: `...Commencing April 1, processed high-grade organic compost will be available free of charge to all registered Greenvale residents at city parks on the first Saturday of every month (maximum two cubic yards per household).`,
        question_text: 'Which of the following statements is TRUE regarding the community compost distribution program?',
        difficulty: 'medium',
        explanation: 'ชาวเมืองที่ลงทะเบียนสามารถมารับปุ๋ยหมักฟรีได้ที่สวนสาธารณะในวันเสาร์แรกของทุกเดือน จำกัดไม่เกิน 2 ลูกบาศก์หลาต่อครัวเรือน: "Registered residents can pick up free compost monthly up to a designated volume limit."',
        trap_analysis: 'ตัวเลือกอื่นระบุว่าต้องจ่ายเงินซื้อ หรือไม่จำกัดปริมาณ ซึ่งขัดแย้งกับประกาศ',
        options: [
            { label: '1', content: 'Registered residents may collect free compost monthly, subject to a two-cubic-yard household ceiling', is_correct: 1 },
            { label: '2', content: 'Residents must pay an entrance fee to access city parks on distribution Saturdays', is_correct: 0 },
            { label: '3', content: 'Commercial landscaping firms have exclusive priority to collect all available compost', is_correct: 0 },
            { label: '4', content: 'Compost is delivered directly to residential doorsteps via autonomous drones', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s3_50',
        subject_id: 'tgat1',
        set_number: 3,
        blueprint_id: 'tgat1_rd_rc',
        stimulus: `...For replacements of damaged bins or to request free kitchen countertop mini-caddies with odor-neutralizing charcoal filters, please visit www.greenvale-compost.gov or call municipal hotline 311.`,
        question_text: 'The word "caddies" in the final paragraph refers to:',
        difficulty: 'easy',
        explanation: 'คำว่า "caddy" ในบริบทนี้คือ "ถังหรือภาชนะขนาดกะทัดรัดสำหรับวางบนเคาน์เตอร์ครัวไว้ใส่เศษอาหาร": "compact containers designed for storing kitchen scraps"',
        trap_analysis: 'ระวังหลงกับคำว่าแคดดี้ในสนามกอล์ฟ',
        options: [
            { label: '1', content: 'small portable containers for holding food waste indoors', is_correct: 1 },
            { label: '2', content: 'assistants who carry golf clubs for professional athletes', is_correct: 0 },
            { label: '3', content: 'chemical sprays used to dissolve stubborn grease stains', is_correct: 0 },
            { label: '4', content: 'digital meters that calculate electricity consumption', is_correct: 0 }
        ]
    },

    // Reading Passage 2: Microplastics in Atmospheric Cloud Formations (Questions 51 - 55)
    {
        id: 'q_tgat1_s3_51',
        subject_id: 'tgat1',
        set_number: 3,
        blueprint_id: 'tgat1_rd_rc',
        stimulus: `Plastic pollution has long been visualized as a marine catastrophe—seas choked with synthetic bags, shorelines blanketed in discarded polystyrene, and aquatic fauna ensnared in ghost fishing nets. However, atmospheric research spearheaded by atmospheric chemists has unmasked an even more insidious dimension of synthetic debris: airborne microplastics are now omnipresent in the planet\'s troposphere, directly altering meteorological cycles and weather formation.\n\nMicroplastics—synthetic polymer particles measuring less than five millimeters—originate from a multitude of terrestrial and maritime sources: synthetic garment microfibers sloughed off during residential laundry, microscopic tyre wear aerosolized from metropolitan highways, and degradation of agricultural plastic mulch. Due to their ultra-low mass and aerodynamic surface-to-volume ratio, these particles are hoisted into the upper atmosphere by convective thermal drafts, where global jet streams transport them thousands of kilometers across uninhabited continents and polar ice sheets.\n\nRecent empirical sampling conducted atop Mount Fuji and the French Pyrenees revealed staggering concentrations of hydrophilic plastic fragments within pristine cloud water. Crucially, laboratory simulations indicate that these airborne polymers act as potent "ice-nucleating particles" (INPs). In clean skies, supercooled water droplets require temperatures approaching minus thirty-eight degrees Celsius to spontaneously freeze. However, when microplastic particulates are present, they provide an adhesive catalytic lattice that triggers ice crystal nucleation at temperatures as warm as minus twelve degrees Celsius.\n\nBy artificially catalyzing ice crystal formation at warmer altitudes, atmospheric microplastics distort cloud reflectivity, precipitation frequency, and storm longevity. High-altitude clouds composed predominantly of ice crystals reflect less incoming solar radiation back into space than dense liquid-water clouds, potentially intensifying global thermal retention. As global plastics production continues its unabated exponential trajectory, meteorologists warn that humanity has inadvertently introduced a chaotic, unregulated geoengineering agent into Earth\'s climate machinery.`,
        question_text: 'What is the central finding discussed in the passage?',
        difficulty: 'easy',
        explanation: 'แก่นเรื่องหลักของบทความคือการค้นพบว่าอนุภาคไมโครพลาสติกในชั้นบรรยากาศทำหน้าที่เป็นแกนสร้างเกล็ดน้ำแข็งในเมฆและส่งผลกระทบต่อสภาพอากาศโลก: "Airborne microplastics have infiltrated cloud formations and are altering weather and precipitation patterns."',
        trap_analysis: 'ตัวเลือกอื่นพูดถึงแค่พลาสติกในทะเล หรือการรีไซเคิลเสื้อผ้า',
        options: [
            { label: '1', content: 'Airborne microplastics have infiltrated cloud formations, altering meteorological cycles and precipitation', is_correct: 1 },
            { label: '2', content: 'Mount Fuji has become the primary global manufacturing center for synthetic textiles', is_correct: 0 },
            { label: '3', content: 'Supercooled water droplets have been declared toxic to human lung tissue', is_correct: 0 },
            { label: '4', content: 'Global jet streams are permanently slowing down due to atmospheric friction', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s3_52',
        subject_id: 'tgat1',
        set_number: 3,
        blueprint_id: 'tgat1_rd_rc',
        stimulus: `...In clean skies, supercooled water droplets require temperatures approaching minus thirty-eight degrees Celsius to spontaneously freeze. However, when microplastic particulates are present, they provide an adhesive catalytic lattice that triggers ice crystal nucleation at temperatures as warm as minus twelve degrees Celsius.`,
        question_text: 'According to paragraph 3, how do microplastics influence the freezing point of supercooled water in clouds?',
        difficulty: 'medium',
        explanation: 'บทความระบุว่าในท้องฟ้าปกติ ละอองน้ำจะแข็งตัวที่ -38 °C แต่เมื่อมีไมโครพลาสติกเป็นตัวเร่ง มันจะกระตุ้นให้เกิดผลึกน้ำแข็งที่อุณหภูมิอุ่นขึ้นถึง -12 °C: "They raise the temperature at which water droplets freeze by acting as ice-nucleating particles."',
        trap_analysis: 'ระวังเรื่องตัวเลขอุณหภูมิ -12 °C คือ "อุ่นกว่า" (warmer) -38 °C ดังนั้นจึงทำให้แข็งตัวง่ายขึ้นที่อุณหภูมิสูงขึ้น',
        options: [
            { label: '1', content: 'They allow droplets to freeze at significantly warmer temperatures than in pristine air', is_correct: 1 },
            { label: '2', content: 'They prevent cloud water from freezing under any meteorological circumstance', is_correct: 0 },
            { label: '3', content: 'They force water droplets to evaporate instantly into gaseous helium', is_correct: 0 },
            { label: '4', content: 'They lower the required freezing threshold down to minus two hundred degrees', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s3_53',
        subject_id: 'tgat1',
        set_number: 3,
        blueprint_id: 'tgat1_rd_rc',
        stimulus: `...Microplastics—synthetic polymer particles measuring less than five millimeters—originate from a multitude of terrestrial and maritime sources: synthetic garment microfibers sloughed off during residential laundry, microscopic tyre wear aerosolized from metropolitan highways, and degradation of agricultural plastic mulch.`,
        question_text: 'Which of the following is NOT cited in paragraph 2 as a primary source of airborne microplastics?',
        difficulty: 'medium',
        explanation: 'ในย่อหน้าที่ 2 ระบุแหล่งกำเนิดได้แก่: เส้นใยเสื้อผ้าสังเคราะห์จากเครื่องซักผ้า, ฝุ่นยางรถยนต์บนทางหลวง, และพลาสติกคลุมดินทางการเกษตร ดังนั้นตัวเลือกที่ไม่ได้กล่าวถึงคือ: "Emissions from industrial geothermal power plants"',
        trap_analysis: 'สังเกตคำถาม "NOT cited"',
        options: [
            { label: '1', content: 'Thermal emissions from volcanic geothermal power plants', is_correct: 1 },
            { label: '2', content: 'Synthetic textile microfibers shed during domestic clothes washing', is_correct: 0 },
            { label: '3', content: 'Microscopic rubber tyre dust abraded from vehicular highways', is_correct: 0 },
            { label: '4', content: 'Degradation of thin plastic film sheets used in agricultural farming', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s3_54',
        subject_id: 'tgat1',
        set_number: 3,
        blueprint_id: 'tgat1_rd_rc',
        stimulus: `...High-altitude clouds composed predominantly of ice crystals reflect less incoming solar radiation back into space than dense liquid-water clouds, potentially intensifying global thermal retention.`,
        question_text: 'What is the climatic consequence of clouds containing more ice crystals relative to liquid water?',
        difficulty: 'hard',
        explanation: 'เมฆที่ประกอบด้วยผลึกน้ำแข็งจะสะท้อนรังสีดวงอาทิตย์กลับสู่อวกาศได้น้อยกว่าเมฆละอองน้ำหนาแน่น จึงอาจทำให้โลกรักษาความร้อนไว้มากขึ้น (เพิ่มภาวะโลกร้อน): "They reflect less solar radiation, potentially accelerating global warming."',
        trap_analysis: 'ดูประโยค "reflect less incoming solar radiation back into space... potentially intensifying global thermal retention"',
        options: [
            { label: '1', content: 'They reflect less solar radiation back into space, potentially exacerbating planetary warming', is_correct: 1 },
            { label: '2', content: 'They permanently deflect all cosmic ultraviolet rays away from polar ice caps', is_correct: 0 },
            { label: '3', content: 'They induce an immediate and irreversible ice age across equatorial continents', is_correct: 0 },
            { label: '4', content: 'They deplete the stratospheric ozone layer through catalytic chlorine reactions', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s3_55',
        subject_id: 'tgat1',
        set_number: 3,
        blueprint_id: 'tgat1_rd_rc',
        stimulus: `...As global plastics production continues its unabated exponential trajectory, meteorologists warn that humanity has inadvertently introduced a chaotic, unregulated geoengineering agent into Earth\'s climate machinery.`,
        question_text: 'The author uses the phrase "inadvertently introduced a chaotic, unregulated geoengineering agent" in the final sentence to convey that:',
        difficulty: 'medium',
        explanation: 'ผู้เขียนต้องการสื่อว่ามนุษย์ได้ปล่อยสารที่ไปเปลี่ยนแปลงระบบภูมิอากาศโลกโดยไม่ได้ตั้งใจและไร้การควบคุม จากการผลิตและทิ้งพลาสติกอย่างไร้ความรับผิดชอบ: "Humanity has accidentally interfered with atmospheric systems on a global scale through unchecked plastic pollution."',
        trap_analysis: 'inadvertently แปลว่า โดยไม่เจตนา/โดยไม่รู้ตัว',
        options: [
            { label: '1', content: 'Human activities have unintentionally altered global climate mechanisms through plastic pollution', is_correct: 1 },
            { label: '2', content: 'Scientists have deliberately released microplastics into the sky to manipulate weather', is_correct: 0 },
            { label: '3', content: 'Meteorologists are currently facing worldwide government bans on climate research', is_correct: 0 },
            { label: '4', content: 'Plastic manufacturing is legally classified as an international weapon of war', is_correct: 0 }
        ]
    },

    // Reading Passage 3: Ethical Consumerism vs. Structural Systemic Decarbonization (Questions 56 - 60)
    {
        id: 'q_tgat1_s3_56',
        subject_id: 'tgat1',
        set_number: 3,
        blueprint_id: 'tgat1_rd_rc',
        stimulus: `For over two decades, corporate marketing campaigns have championed the gospel of "individual carbon footprints"—a metric popularized in 2004 by oil conglomerate British Petroleum to measure personal environmental impact. Consumers have been relentlessly urged to carry bamboo straws, eschew incandescent lightbulbs, and calculate their personal flight emissions. While individual ecological mindfulness is unquestionably virtuous, an escalating cohort of environmental economists argues that the hyper-fixation on personal lifestyle ethics serves as a sophisticated corporate smokescreen, obfuscating the urgent necessity for systemic regulatory reform.\n\nEmpirical data reveals the profound mathematical absurdity of relying on voluntary consumer choices to halt climate breakdown. Even if a citizen were to adopt an austere lifestyle—relinquishing private vehicular travel, adhering strictly to vegan nutrition, and zeroing out domestic energy consumption—the entrenched societal infrastructure (national electrical grids, heavy cargo freight, petrochemical manufacturing, and military operations) ensures that their baseline carbon footprint remains stubbornly high. Studies establish that one hundred fossil fuel producers have generated over seventy percent of global industrial greenhouse emissions since 1988. Expecting fragmented individuals to dismantle a centuries-old carbon-extractive economy through consumer boycotts is akin to asking beachgoers to drain an incoming tsunami with plastic teaspoons.\n\nFurthermore, this relentless moralization of individual consumption breeds pervasive cognitive fatigue, cynicism, and eco-anxiety. When well-intentioned citizens are shamed for utilizing a plastic sandwich bag while governments concurrently subsidize fossil fuel exploration to the tune of trillions annually, public faith in collective climate governance fractures. The emphasis on ethical consumerism shifts political accountability away from corporate boardrooms and legislative chambers onto household kitchens.\n\nTrue climate progress demands moving beyond the narrow confines of consumer activism toward robust political mobilization. Systemic decarbonization requires structural interventions: legally binding carbon price ceilings, immediate termination of fossil subsidies, public investments in high-speed rail, and stringent corporate environmental disclosure mandates. Individual actions are meaningful not as substitute market mechanisms, but as catalysts for civic solidarity. We must cease evaluating citizens solely by what they purchase at the grocery checkout, and begin mobilizing them as active democratic participants demanding legislative transformation.`,
        question_text: 'What is the primary thesis advanced by the author in the passage?',
        difficulty: 'medium',
        explanation: 'บทความนำเสนอว่าการเน้นแต่เรื่องความรับผิดชอบส่วนบุคคล (carbon footprint ของประชาชน) คือม่านควันเบี่ยงเบนความสนใจจากโครงสร้างระบบอุตสาหกรรมและนโยบายรัฐ ซึ่งการแก้ปัญหาโลกร้อนที่แท้จริงต้องเป็นการปฏิรูประดับโครงสร้างและกฎหมาย: "Individual consumer choices cannot substitute for systemic regulatory reform and corporate accountability."',
        trap_analysis: 'ผู้เขียนไม่ได้บอกว่าการทำความดีส่วนบุคคลเป็นเรื่องแย่ แต่บอกว่ามันไม่เพียงพอที่จะหยุดยั้งวิกฤตได้หากไร้การปฏิรูปเชิงโครงสร้าง',
        options: [
            { label: '1', content: 'Focusing exclusively on individual consumer choices distracts from the vital need for systemic regulatory and corporate reform', is_correct: 1 },
            { label: '2', content: 'Individuals should abandon all eco-friendly habits and maximize their personal fossil fuel consumption', is_correct: 0 },
            { label: '3', content: 'Vegan diets and bamboo straws have successfully halted planetary greenhouse gas emissions', is_correct: 0 },
            { label: '4', content: 'Oil conglomerates were completely unaware of climate change until recent academic studies', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s3_57',
        subject_id: 'tgat1',
        set_number: 3,
        blueprint_id: 'tgat1_rd_rc',
        stimulus: `...Studies establish that one hundred fossil fuel producers have generated over seventy percent of global industrial greenhouse emissions since 1988. Expecting fragmented individuals to dismantle a centuries-old carbon-extractive economy through consumer boycotts is akin to asking beachgoers to drain an incoming tsunami with plastic teaspoons.`,
        question_text: 'The author uses the metaphor of "asking beachgoers to drain an incoming tsunami with plastic teaspoons" to illustrate:',
        difficulty: 'medium',
        explanation: 'การเปรียบเทียบว่า "เหมือนขอให้คนไปตักน้ำสึนามิด้วยช้อนชาพลาสติก" ต้องการสื่อถึง: "ความไม่สมส่วนอย่างยิ่งและไร้ประสิทธิผลของการพึ่งพาเพียงพฤติกรรมผู้บริโภคย่อยๆ ไปต้านทานระบบอุตสาหกรรมขนาดมหึมา": "the overwhelming futility and disproportionate scale of relying on personal actions against massive industrial forces."',
        trap_analysis: 'อุปมาอุปไมยนี้เน้นเรื่องความไม่สมส่วนระหว่างปัญหากับวิธีการแก้ปัญหา',
        options: [
            { label: '1', content: 'the profound inadequacy and futility of relying solely on individual consumer habits against systemic industrial emissions', is_correct: 1 },
            { label: '2', content: 'the danger of swimming near coastal shorelines during high-tide meteorological conditions', is_correct: 0 },
            { label: '3', content: 'the necessity of replacing plastic spoons with stainless steel cutlery on public beaches', is_correct: 0 },
            { label: '4', content: 'the economic benefits of utilizing tsunamis to generate renewable ocean wave power', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s3_58',
        subject_id: 'tgat1',
        set_number: 3,
        blueprint_id: 'tgat1_rd_rc',
        stimulus: `...For over two decades, corporate marketing campaigns have championed the gospel of "individual carbon footprints"—a metric popularized in 2004 by oil conglomerate British Petroleum to measure personal environmental impact... the hyper-fixation on personal lifestyle ethics serves as a sophisticated corporate smokescreen, obfuscating the urgent necessity for systemic regulatory reform.`,
        question_text: 'According to paragraph 1, why did fossil fuel corporations promote the concept of the "carbon footprint"?',
        difficulty: 'medium',
        explanation: 'บทความระบุว่าบริษัทน้ำมันผลักดันแนวคิด carbon footprint ส่วนบุคคล เพื่อใช้เป็นม่านควัน (smokescreen) เบี่ยงเบนความสนใจของสังคมออกจากการเรียกร้องกฎหมายปฏิรูปอุตสาหกรรม: "To deflect public attention away from corporate accountability and legal regulation."',
        trap_analysis: 'คำสำคัญคือ "corporate smokescreen, obfuscating the urgent necessity for systemic regulatory reform"',
        options: [
            { label: '1', content: 'To shift responsibility away from systemic corporate practices and delay regulatory intervention', is_correct: 1 },
            { label: '2', content: 'To encourage all citizens to invest their retirement savings in renewable solar energy', is_correct: 0 },
            { label: '3', content: 'To assist environmental activists in filing international human rights lawsuits', is_correct: 0 },
            { label: '4', content: 'To accurately calculate the precise tax penalties owed by oil extraction executives', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s3_59',
        subject_id: 'tgat1',
        set_number: 3,
        blueprint_id: 'tgat1_rd_rc',
        stimulus: `...Systemic decarbonization requires structural interventions: legally binding carbon price ceilings, immediate termination of fossil subsidies, public investments in high-speed rail, and stringent corporate environmental disclosure mandates.`,
        question_text: 'Which of the following policy actions is advocated by the author in paragraph 4?',
        difficulty: 'easy',
        explanation: 'ย่อหน้าที่ 4 เรียกร้องให้มีมาตรการเชิงโครงสร้าง ได้แก่: การกำหนดเพดานราคาคาร์บอน, การยกเลิกเงินอุดหนุนเชื้อเพลิงฟอสซิล, การลงทุนในรถไฟความเร็วสูง, และการบังคับเปิดเผยข้อมูลสิ่งแวดล้อม: "Ending government subsidies for fossil fuels and investing in public rail infrastructure."',
        trap_analysis: 'ตัวเลือกนี้ตรงกับสิ่งที่ระบุไว้ในย่อหน้าสุดท้าย',
        options: [
            { label: '1', content: 'Eliminating government subsidies for fossil fuels and funding public rail infrastructure', is_correct: 1 },
            { label: '2', content: 'Banning citizens from voting in national democratic general elections', is_correct: 0 },
            { label: '3', content: 'Doubling financial subsidies provided to private petroleum exploration ventures', is_correct: 0 },
            { label: '4', content: 'Outlawing all public recycling programs across municipal urban centers', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_s3_60',
        subject_id: 'tgat1',
        set_number: 3,
        blueprint_id: 'tgat1_rd_rc',
        stimulus: `...Individual actions are meaningful not as substitute market mechanisms, but as catalysts for civic solidarity. We must cease evaluating citizens solely by what they purchase at the grocery checkout, and begin mobilizing them as active democratic participants demanding legislative transformation.`,
        question_text: 'According to the final paragraph, what is the true value of individual ecological choices?',
        difficulty: 'hard',
        explanation: 'ผู้เขียนสรุปว่าคุณค่าที่แท้จริงของการกระทำส่วนบุคคลไม่ใช่การเป็นกลไกตลาดทดแทน แต่คือการเป็น "จุดประกายพลังความสมานฉันท์ของพลเมืองเพื่อเรียกร้องความเปลี่ยนแปลงทางกฎหมาย": "They serve as catalysts to foster civic solidarity and political mobilization for structural change."',
        trap_analysis: 'ดูประโยค "Individual actions are meaningful not as substitute market mechanisms, but as catalysts for civic solidarity"',
        options: [
            { label: '1', content: 'They build civic solidarity and empower democratic participation to demand structural policy changes', is_correct: 1 },
            { label: '2', content: 'They generate massive personal wealth for eco-friendly lifestyle influencers', is_correct: 0 },
            { label: '3', content: 'They completely replace the need for environmental laws and international treaties', is_correct: 0 },
            { label: '4', content: 'They prove that corporate executives bear no moral responsibility for environmental damage', is_correct: 0 }
        ]
    }
];

module.exports = { set3Questions };
