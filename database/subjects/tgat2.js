/**
 * Subject Module: TGAT2 การคิดอย่างมีเหตุผล (92)
 * Owned by: Exam Subject Agent (tgat2)
 * See rules: database/subjects/AGENTS.md
 */

module.exports = {
    subject: {
    "id": "tgat2",
    "code": "92",
    "name_th": "TGAT2 การคิดอย่างมีเหตุผล",
    "name_en": "Critical & Logical Thinking",
    "category": "TGAT",
    "total_questions": 80,
    "total_score": 100,
    "duration_minutes": 60,
    "description": "วัดความสามารถทางภาษา, ตัวเลข, มิติสัมพันธ์ และเหตุผล เน้นความเร็วและความแม่นยำ (เฉลี่ยข้อละ 45 วินาที)",
    "icon_name": "brain",
    "status": "ready"
},
    blueprints: [
    {
        "id": "tgat2_lang_meaning",
        "subject_id": "tgat2",
        "domain_name": "ความสามารถทางภาษา (Verbal Ability)",
        "subtopic_name": "1.1 การสื่อความหมาย",
        "description": "ความหมายกว้าง-แคบ ความหมายอุปมา นัยตรง-นัยประหวัด และคำที่มีความหมายใกล้เคียงกัน",
        "target_questions": 5,
        "score_weight": 6.25,
        "order_index": 1
    },
    {
        "id": "tgat2_lang_usage",
        "subject_id": "tgat2",
        "domain_name": "ความสามารถทางภาษา (Verbal Ability)",
        "subtopic_name": "1.2 การใช้ภาษา",
        "description": "การใช้คำให้ถูกต้องตามบริบทและหลักไวยากรณ์ การสะกดคำ และระดับภาษา",
        "target_questions": 5,
        "score_weight": 6.25,
        "order_index": 2
    },
    {
        "id": "tgat2_lang_reading",
        "subject_id": "tgat2",
        "domain_name": "ความสามารถทางภาษา (Verbal Ability)",
        "subtopic_name": "1.3 การอ่านเข้าใจ",
        "description": "การจับใจความสำคัญ สรุปความ ตีความ และอนุมานจากข้อความสั้นหรือบทความ",
        "target_questions": 5,
        "score_weight": 6.25,
        "order_index": 3
    },
    {
        "id": "tgat2_lang_idioms",
        "subject_id": "tgat2",
        "domain_name": "ความสามารถทางภาษา (Verbal Ability)",
        "subtopic_name": "1.4 การเข้าใจสำนวน",
        "description": "สำนวน สุภาษิต คำพังเพย และการนำไปใช้ในสถานการณ์จริง",
        "target_questions": 5,
        "score_weight": 6.25,
        "order_index": 4
    },
    {
        "id": "tgat2_num_matrix",
        "subject_id": "tgat2",
        "domain_name": "ความสามารถทางตัวเลข (Numerical Ability)",
        "subtopic_name": "2.1 อนุกรมมิติ",
        "description": "ตารางเมทริกซ์ตัวเลข 3x3 ค้นหาความสัมพันธ์ตามแถวและคอลัมน์เพื่อหาค่าตัวแปร",
        "target_questions": 5,
        "score_weight": 6.25,
        "order_index": 5
    },
    {
        "id": "tgat2_num_columns",
        "subject_id": "tgat2",
        "domain_name": "ความสามารถทางตัวเลข (Numerical Ability)",
        "subtopic_name": "2.2 การเปรียบเทียบเชิงปริมาณ (สดมภ์)",
        "description": "เปรียบเทียบค่าระหว่าง สดมภ์ ก. สดมภ์ ข. และสดมภ์ ค.",
        "target_questions": 5,
        "score_weight": 6.25,
        "order_index": 6
    },
    {
        "id": "tgat2_num_sufficiency",
        "subject_id": "tgat2",
        "domain_name": "ความสามารถทางตัวเลข (Numerical Ability)",
        "subtopic_name": "2.3 ความเพียงพอของข้อมูล",
        "description": "พิจารณาเงื่อนไข (1) และ (2) ว่าเพียงพอต่อการตอบคำถามของโจทย์หรือไม่",
        "target_questions": 5,
        "score_weight": 6.25,
        "order_index": 7
    },
    {
        "id": "tgat2_num_wordproblems",
        "subject_id": "tgat2",
        "domain_name": "ความสามารถทางตัวเลข (Numerical Ability)",
        "subtopic_name": "2.4 โจทย์ปัญหา",
        "description": "โจทย์ประยุกต์คณิตศาสตร์ในชีวิตประจำวัน กำไรขาดทุน อัตราส่วน อัตราเร็ว และสมการ",
        "target_questions": 5,
        "score_weight": 6.25,
        "order_index": 8
    },
    {
        "id": "tgat2_spatial_cube",
        "subject_id": "tgat2",
        "domain_name": "ความสามารถทางมิติสัมพันธ์ (Spatial Ability)",
        "subtopic_name": "3.1 แบบพับกล่อง",
        "description": "การพับรูปคลี่สองมิติให้เป็นลูกบาศก์สามมิติ และตรวจสอบหน้าตรงข้ามและหน้าที่อยู่ติดกัน",
        "target_questions": 5,
        "score_weight": 6.25,
        "order_index": 9
    },
    {
        "id": "tgat2_spatial_odd",
        "subject_id": "tgat2",
        "domain_name": "ความสามารถทางมิติสัมพันธ์ (Spatial Ability)",
        "subtopic_name": "3.2 แบบหาภาพต่าง",
        "description": "เปรียบเทียบรูปทรงเรขาคณิตสามมิติหรือการสะท้อน/หมุนเพื่อหารูปที่ไม่เข้าพวก",
        "target_questions": 5,
        "score_weight": 6.25,
        "order_index": 10
    },
    {
        "id": "tgat2_spatial_rotate3d",
        "subject_id": "tgat2",
        "domain_name": "ความสามารถทางมิติสัมพันธ์ (Spatial Ability)",
        "subtopic_name": "3.3 แบบหมุนภาพสามมิติ",
        "description": "การหมุนวัตถุในมุมมองรอบทิศทาง 3 มิติ (แกน X, Y, Z) หรือมุมมอง Top/Front/Side",
        "target_questions": 5,
        "score_weight": 6.25,
        "order_index": 11
    },
    {
        "id": "tgat2_spatial_assemble",
        "subject_id": "tgat2",
        "domain_name": "ความสามารถทางมิติสัมพันธ์ (Spatial Ability)",
        "subtopic_name": "3.4 แบบประกอบภาพ",
        "description": "การนำชิ้นส่วนย่อยมาประกอบเข้าด้วยกันให้เป็นรูปทรงเรขาคณิตหรือภาพที่สมบูรณ์",
        "target_questions": 5,
        "score_weight": 6.25,
        "order_index": 12
    },
    {
        "id": "tgat2_reason_series",
        "subject_id": "tgat2",
        "domain_name": "ความสามารถทางเหตุผล (Logical Reasoning)",
        "subtopic_name": "4.1 อนุกรมภาพ",
        "description": "การจับรูปแบบและกฎเกณฑ์การเปลี่ยนแปลงลำดับภาพเรขาคณิต (หมุน เคลื่อนที่ สลับเฉด เพิ่มลด)",
        "target_questions": 5,
        "score_weight": 6.25,
        "order_index": 13
    },
    {
        "id": "tgat2_reason_analogy",
        "subject_id": "tgat2",
        "domain_name": "ความสามารถทางเหตุผล (Logical Reasoning)",
        "subtopic_name": "4.2 อุปมาอุปไมยภาพ",
        "description": "ความสัมพันธ์เชิงเปรียบเทียบระหว่างรูปภาพคู่แรก เพื่อนำกฎเกณฑ์ไปใช้กับรูปภาพคู่หลัง",
        "target_questions": 5,
        "score_weight": 6.25,
        "order_index": 14
    },
    {
        "id": "tgat2_reason_deduction",
        "subject_id": "tgat2",
        "domain_name": "ความสามารถทางเหตุผล (Logical Reasoning)",
        "subtopic_name": "4.3 สรุปความ",
        "description": "ตรรกศาสตร์เชิงนิรนัย (Deductive Logic) แผนภาพเวนน์-ออยเลอร์ และการอ้างเหตุผลสมเหตุสมผล",
        "target_questions": 5,
        "score_weight": 6.25,
        "order_index": 15
    },
    {
        "id": "tgat2_reason_analytical",
        "subject_id": "tgat2",
        "domain_name": "ความสามารถทางเหตุผล (Logical Reasoning)",
        "subtopic_name": "4.4 การวิเคราะห์ข้อความ",
        "description": "เงื่อนไขสัญลักษณ์และการจัดลำดับข้อมูล วิเคราะห์ข้อสรุป ก. และ ข. ว่าจริง เท็จ หรือไม่แน่ชัด",
        "target_questions": 5,
        "score_weight": 6.25,
        "order_index": 16
    }
],
    cheatsheet: {
    "subject_id": "tgat2",
    "title": "สรุปสูตร & แนวข้อสอบ TGAT2 92 การคิดอย่างมีเหตุผล",
    "badge": "TGAT2 • 92",
    "description": "รวมสูตรลัดคณิตศาสตร์ เทคนิคข้อสอบสดมภ์ ความเพียงพอของข้อมูล กฎพับลูกบาศก์ และตรรกศาสตร์",
    "sections": [
        {
            "title": "🔢 1. สูตรคำนวณคณิตศาสตร์ & ตัวเลข (Numerical Ability)",
            "icon": "calculator",
            "content": "\n<div class=\"cheat-grid\">\n    <div class=\"cheat-card\">\n        <h4>📈 อนุกรมและเมทริกซ์ $3 \\times 3$</h4>\n        <ul>\n            <li><strong>อนุกรมผลต่างชั้นที่สอง:</strong> หาผลต่างระหว่างพจน์ที่ติดกัน หากไม่คงที่ให้หาผลต่างชั้นที่สอง</li>\n            <li><strong>เมทริกซ์ 3x3:</strong> มักสัมพันธ์กันตาม <em>แถว</em> หรือ <em>หลัก</em> เช่น:\n                <br>• $A + B = C$ หรือ $A \\times B = C$\n                <br>• $(A + B) / 2 = C$ (ค่าเฉลี่ย)\n                <br>• $A^2 + B = C$ หรือ ผลรวมทุกแถวเท่ากัน\n            </li>\n        </ul>\n    </div>\n\n    <div class=\"cheat-card\">\n        <h4>💰 กำไร-ขาดทุน & ร้อยละ</h4>\n        <ul>\n            <li>$\\text{เปอร์เซ็นต์กำไร} = \\frac{\\text{ราคาขาย} - \\text{ราคาทุน}}{\\text{ราคาทุน}} \\times 100\\%$</li>\n            <li>$\\text{ราคาขาย} = \\text{ราคาทุน} \\times (1 + \\%\\text{กำไร})$</li>\n            <li><strong>ส่วนลดซ้อน 2 ครั้ง ($d_1\\%, d_2\\%$):</strong>\n                <br>$\\text{ราคาจ่ายจริง} = \\text{ราคาป้าย} \\times (1 - d_1) \\times (1 - d_2)$\n            </li>\n        </ul>\n    </div>\n\n    <div class=\"cheat-card\">\n        <h4>🧪 อัตราส่วนผสม (Alligation)</h4>\n        <ul>\n            <li><strong>การผสมสารละลาย 2 ชนิด:</strong>\n                <br>$$C_1 V_1 + C_2 V_2 = C_{\\text{รวม}} (V_1 + V_2)$$\n                <br>โดย $C$ คือความเข้มข้น และ $V$ คือปริมาตร\n            </li>\n            <li><strong>เทคนิคคานดีดคานงัด:</strong>\n                <br>$$\\frac{V_1}{V_2} = \\frac{|C_2 - C_{\\text{รวม}}|}{|C_1 - C_{\\text{รวม}}|}$$\n            </li>\n        </ul>\n    </div>\n\n    <div class=\"cheat-card\">\n        <h4>⚡ อัตราเร็ว & งานร่วมกัน</h4>\n        <ul>\n            <li><strong>ระยะทาง:</strong> $s = v \\times t$</li>\n            <li><strong>อัตราเร็วเฉลี่ย:</strong>\n                <br>$$v_{\\text{avg}} = \\frac{s_{\\text{รวม}}}{t_{\\text{รวม}}} = \\frac{2 v_1 v_2}{v_1 + v_2} \\text{ (กรณีระยะทางไป-กลับเท่ากัน)}$$\n                <br><span style=\"color:#f43f5e;\">⚠️ อย่าหาค่าเฉลี่ยโดยนำความเร็วมาบวกกันหาร 2 เด็ดขาด!</span>\n            </li>\n            <li><strong>ทำงานร่วมกัน:</strong> $\\frac{1}{A} + \\frac{1}{B} = \\frac{1}{T_{\\text{รวม}}}$</li>\n        </ul>\n    </div>\n</div>\n"
        },
        {
            "title": "⚖️ 2. เทคนิคข้อสอบสดมภ์ (ก., ข., ค.)",
            "icon": "scale",
            "content": "\n<div class=\"cheat-alert alert-info\">\n    <strong>💡 กฎเหล็กของข้อสอบสดมภ์:</strong> เปรียบเทียบปริมาณระหว่าง สดมภ์ ก., ข., ค. และเลือกตัวเลือก 1-5 ตามค่าที่มากที่สุด\n</div>\n<div class=\"cheat-grid\">\n    <div class=\"cheat-card\">\n        <h4>ตัวเลือกมาตรฐาน ทปอ.</h4>\n        <ol>\n            <li>สดมภ์ ก. มีค่ามากที่สุด</li>\n            <li>สดมภ์ ข. มีค่ามากที่สุด</li>\n            <li>สดมภ์ ค. มีค่ามากที่สุด</li>\n            <li>ทั้งสามสดมภ์มีค่าเท่ากัน</li>\n            <li><strong>ข้อมูลไม่เพียงพอที่จะเปรียบเทียบได้แน่นอน</strong></li>\n        </ol>\n    </div>\n    <div class=\"cheat-card\">\n        <h4>🎯 4 ค่าดักจุดลวง (Plug-in Test)</h4>\n        <p>หากโจทย์ให้ตัวแปรมาโดยไม่ระบุว่าเป็นจำนวนเต็มบวก ต้องทดสอบค่า 4 กลุ่มนี้เสมอ:</p>\n        <ul>\n            <li>1. <strong>จำนวนบวก:</strong> เช่น $x = 2$</li>\n            <li>2. <strong>จำนวนลบ:</strong> เช่น $x = -2$ (เครื่องหมายจะพลิก)</li>\n            <li>3. <strong>ศูนย์ ($0$):</strong> ตัวคูณกลายเป็นศูนย์</li>\n            <li>4. <strong>เศษส่วนแท้ ($0 < x < 1$):</strong> เช่น $x = 0.5$ ยิ่งยกกำลังค่ายิ่งลดลง ($x^2 < x$)</li>\n        </ul>\n        <p style=\"color:#f59e0b;\">* หากแทนค่าต่างกันแล้วได้ผลลัพธ์ไม่เหมือนกัน $\\implies$ <strong>ตอบตัวเลือก 5 ทันที</strong></p>\n    </div>\n</div>\n"
        },
        {
            "title": "🔍 3. เทคนิคความเพียงพอของข้อมูล (Data Sufficiency)",
            "icon": "search",
            "content": "\n<div class=\"cheat-card\">\n    <h4>📋 Decision Matrix (โฟลว์ชาร์ตการเลือกช้อยส์ 1 - 5)</h4>\n    <table class=\"cheat-table\">\n        <thead>\n            <tr>\n                <th>เงื่อนไข (1)</th>\n                <th>เงื่อนไข (2)</th>\n                <th>รวม (1) + (2)</th>\n                <th>คำตอบที่ต้องเลือก</th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr>\n                <td><span class=\"badge-yes\">ตอบได้</span></td>\n                <td><span class=\"badge-no\">ตอบไม่ได้</span></td>\n                <td>-</td>\n                <td><strong>ตัวเลือก 1</strong> (ข้อมูล 1 เพียงพอ แต่ 2 ไม่พอ)</td>\n            </tr>\n            <tr>\n                <td><span class=\"badge-no\">ตอบไม่ได้</span></td>\n                <td><span class=\"badge-yes\">ตอบได้</span></td>\n                <td>-</td>\n                <td><strong>ตัวเลือก 2</strong> (ข้อมูล 2 เพียงพอ แต่ 1 ไม่พอ)</td>\n            </tr>\n            <tr>\n                <td><span class=\"badge-no\">ตอบไม่ได้</span></td>\n                <td><span class=\"badge-no\">ตอบไม่ได้</span></td>\n                <td><span class=\"badge-yes\">ตอบได้</span></td>\n                <td><strong>ตัวเลือก 3</strong> (ต้องใช้ทั้ง 1 และ 2 ร่วมกัน)</td>\n            </tr>\n            <tr>\n                <td><span class=\"badge-yes\">ตอบได้</span></td>\n                <td><span class=\"badge-yes\">ตอบได้</span></td>\n                <td>-</td>\n                <td><strong>ตัวเลือก 4</strong> (ข้อมูล 1 หรือ 2 ข้อใดข้อหนึ่งก็ตอบได้)</td>\n            </tr>\n            <tr>\n                <td><span class=\"badge-no\">ตอบไม่ได้</span></td>\n                <td><span class=\"badge-no\">ตอบไม่ได้</span></td>\n                <td><span class=\"badge-no\">ยังตอบไม่ได้</span></td>\n                <td><strong>ตัวเลือก 5</strong> (แม้ใช้ทั้ง 1 และ 2 ก็ยังไม่พอ)</td>\n            </tr>\n        </tbody>\n    </table>\n    <p style=\"margin-top:0.75rem; color:var(--text-muted); font-size:0.85rem;\">\n        * จำไว้ว่า: หน้าที่ของเราไม่ใช่การคำนวณจนได้ตัวเลขสุดท้าย แต่คือการตัดสินว่า <em>\"มีข้อมูลพอที่จะหาคำตอบเดียวที่แน่นอนได้หรือไม่\"</em>\n    </p>\n</div>\n"
        },
        {
            "title": "📦 4. มิติสัมพันธ์ & การพับลูกบาศก์ (Spatial Ability)",
            "icon": "box",
            "content": "\n<div class=\"cheat-grid\">\n    <div class=\"cheat-card\">\n        <h4>🧊 กฎหน้าตรงข้าม (Opposite Faces)</h4>\n        <ul>\n            <li><strong>กฎข้าม 1 ช่อง:</strong> ในรูปคลี่ หน้าที่อยู่ในแนวตรงเดียวกันและคั่นด้วย 1 ช่อง จะเป็น <em>หน้าตรงข้ามกันเสมอ</em></li>\n            <li><strong>กฎแขนพับ:</strong> แผ่นที่ยื่นออกมาคนละฝั่งของแถวหลัก เมื่อพับขึ้นมาจะกลายเป็นหน้าตรงข้ามกัน</li>\n            <li><span style=\"color:#f43f5e; font-weight:700;\">กฎการตัดช้อยส์:</span> <strong>หน้าที่อยู่ตรงข้ามกัน จะไม่มีทางมองเห็นติดกันบนลูกบาศก์ลูกเดียวกันได้</strong> หากช้อยส์ไหนมีคู่ตรงข้ามโผล่มาพร้อมกัน $\\implies$ ตัดทิ้งทันที!</li>\n        </ul>\n    </div>\n    <div class=\"cheat-card\">\n        <h4>🔄 การหมุนภาพ 3 มิติ</h4>\n        <ul>\n            <li>เช็กจุดสังเกตเฉพาะ (Anchor Points) เช่น มุมบาก บล็อกสีเข้ม หรือรูปทรงที่ยื่นออก</li>\n            <li>ทดสอบทิศทางตามแกนหลัก: แกน $X$ (หมุนขึ้น/ลง), แกน $Y$ (หมุนซ้าย/ขวา), แกน $Z$ (หมุนตาม/ทวนเข็ม)</li>\n            <li><strong>ระวังภาพสะท้อนกระจก:</strong> การหมุนวัตถุจริงจะไม่สามารถกลับด้านซ้าย-ขวาแบบกระจกเงาได้</li>\n        </ul>\n    </div>\n</div>\n"
        },
        {
            "title": "🧠 5. ตรรกศาสตร์ & การวิเคราะห์ข้อความ (Logical Reasoning)",
            "icon": "brain",
            "content": "\n<div class=\"cheat-grid\">\n    <div class=\"cheat-card\">\n        <h4>🎯 กฎตรรกศาสตร์นิรนัย</h4>\n        <ul>\n            <li><strong>Modus Ponens:</strong> ถ้าเหตุการณ์เป็นจริง ผลย่อมเป็นจริง\n                <br>• โจทย์: ถ้าฝนตก ถนนจะเปียก ($P \\to Q$)\n                <br>• เกิด: ฝนตก ($P$) $\\implies$ สรุป: ถนนเปียก ($Q$) [จริงแน่นอน]\n            </li>\n            <li><strong>Modus Tollens:</strong> ถ้านิเสธผล ย่อมนิเสธเหตุ\n                <br>• เกิด: ถนนไม่เปียก ($\\sim Q$) $\\implies$ สรุป: ฝนไม่ตก ($\\sim P$) [จริงแน่นอน]\n            </li>\n            <li><span style=\"color:#f43f5e;\">⚠️ จุดลวง:</span> ถนนเปียก ($Q$) $\\implies$ <em>สรุปไม่ได้</em>ว่าฝนตกหรือไม่ (อาจมีคนรดน้ำต้นไม้)</li>\n        </ul>\n    </div>\n    <div class=\"cheat-card\">\n        <h4>⚖️ เงื่อนไขสัญลักษณ์ (ข้อสรุป ก. และ ข.)</h4>\n        <ul>\n            <li><strong>เครื่องหมายทางเดียวกัน:</strong> $A > B \\ge C > D \\implies A > D$ (จริง)</li>\n            <li><strong>เครื่องหมายสวนทางกัน:</strong> $A > B < C \\implies$ สรุปความสัมพันธ์ระหว่าง $A$ กับ $C$ <strong>\"ไม่แน่ชัด\"</strong></li>\n            <li><strong>ตัวเลือกมาตรฐาน:</strong>\n                <br>1. ก และ ข ถูก\n                <br>2. ก และ ข ผิด\n                <br>3. สรุปไม่ได้แน่ชัดทั้งคู่\n                <br>4. ก ถูก ส่วน ข ผิดหรือไม่แน่ชัด\n                <br>5. ข ถูก ส่วน ก ผิดหรือไม่แน่ชัด\n            </li>\n        </ul>\n    </div>\n</div>\n"
        }
    ]
},
    // Add per-set question files inside database/subjects/questions/, e.g. './questions/tgat2_set1'
    questionFiles: [],
    legacyGenerators: ["database/seed_tgat2_official.js","database/generators/tgat2/build_tgat2_all.js"]
};
