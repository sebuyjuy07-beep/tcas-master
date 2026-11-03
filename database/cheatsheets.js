// Official MyTCAS Blueprint & Formula Cheat Sheets
// Curated high-yield formulas, decision frameworks, and exam guidelines for TCAS Master

const cheatsheets = {
    tgat2: {
        subject_id: 'tgat2',
        title: 'สรุปสูตร & แนวข้อสอบ TGAT2 92 การคิดอย่างมีเหตุผล',
        badge: 'TGAT2 • 92',
        description: 'รวมสูตรลัดคณิตศาสตร์ เทคนิคข้อสอบสดมภ์ ความเพียงพอของข้อมูล กฎพับลูกบาศก์ และตรรกศาสตร์',
        sections: [
            {
                title: '🔢 1. สูตรคำนวณคณิตศาสตร์ & ตัวเลข (Numerical Ability)',
                icon: 'calculator',
                content: `
<div class="cheat-grid">
    <div class="cheat-card">
        <h4>📈 อนุกรมและเมทริกซ์ $3 \\times 3$</h4>
        <ul>
            <li><strong>อนุกรมผลต่างชั้นที่สอง:</strong> หาผลต่างระหว่างพจน์ที่ติดกัน หากไม่คงที่ให้หาผลต่างชั้นที่สอง</li>
            <li><strong>เมทริกซ์ 3x3:</strong> มักสัมพันธ์กันตาม <em>แถว</em> หรือ <em>หลัก</em> เช่น:
                <br>• $A + B = C$ หรือ $A \\times B = C$
                <br>• $(A + B) / 2 = C$ (ค่าเฉลี่ย)
                <br>• $A^2 + B = C$ หรือ ผลรวมทุกแถวเท่ากัน
            </li>
        </ul>
    </div>

    <div class="cheat-card">
        <h4>💰 กำไร-ขาดทุน & ร้อยละ</h4>
        <ul>
            <li>$\\text{เปอร์เซ็นต์กำไร} = \\frac{\\text{ราคาขาย} - \\text{ราคาทุน}}{\\text{ราคาทุน}} \\times 100\\%$</li>
            <li>$\\text{ราคาขาย} = \\text{ราคาทุน} \\times (1 + \\%\\text{กำไร})$</li>
            <li><strong>ส่วนลดซ้อน 2 ครั้ง ($d_1\\%, d_2\\%$):</strong>
                <br>$\\text{ราคาจ่ายจริง} = \\text{ราคาป้าย} \\times (1 - d_1) \\times (1 - d_2)$
            </li>
        </ul>
    </div>

    <div class="cheat-card">
        <h4>🧪 อัตราส่วนผสม (Alligation)</h4>
        <ul>
            <li><strong>การผสมสารละลาย 2 ชนิด:</strong>
                <br>$$C_1 V_1 + C_2 V_2 = C_{\\text{รวม}} (V_1 + V_2)$$
                <br>โดย $C$ คือความเข้มข้น และ $V$ คือปริมาตร
            </li>
            <li><strong>เทคนิคคานดีดคานงัด:</strong>
                <br>$$\\frac{V_1}{V_2} = \\frac{|C_2 - C_{\\text{รวม}}|}{|C_1 - C_{\\text{รวม}}|}$$
            </li>
        </ul>
    </div>

    <div class="cheat-card">
        <h4>⚡ อัตราเร็ว & งานร่วมกัน</h4>
        <ul>
            <li><strong>ระยะทาง:</strong> $s = v \\times t$</li>
            <li><strong>อัตราเร็วเฉลี่ย:</strong>
                <br>$$v_{\\text{avg}} = \\frac{s_{\\text{รวม}}}{t_{\\text{รวม}}} = \\frac{2 v_1 v_2}{v_1 + v_2} \\text{ (กรณีระยะทางไป-กลับเท่ากัน)}$$
                <br><span style="color:#f43f5e;">⚠️ อย่าหาค่าเฉลี่ยโดยนำความเร็วมาบวกกันหาร 2 เด็ดขาด!</span>
            </li>
            <li><strong>ทำงานร่วมกัน:</strong> $\\frac{1}{A} + \\frac{1}{B} = \\frac{1}{T_{\\text{รวม}}}$</li>
        </ul>
    </div>
</div>
`
            },
            {
                title: '⚖️ 2. เทคนิคข้อสอบสดมภ์ (ก., ข., ค.)',
                icon: 'scale',
                content: `
<div class="cheat-alert alert-info">
    <strong>💡 กฎเหล็กของข้อสอบสดมภ์:</strong> เปรียบเทียบปริมาณระหว่าง สดมภ์ ก., ข., ค. และเลือกตัวเลือก 1-5 ตามค่าที่มากที่สุด
</div>
<div class="cheat-grid">
    <div class="cheat-card">
        <h4>ตัวเลือกมาตรฐาน ทปอ.</h4>
        <ol>
            <li>สดมภ์ ก. มีค่ามากที่สุด</li>
            <li>สดมภ์ ข. มีค่ามากที่สุด</li>
            <li>สดมภ์ ค. มีค่ามากที่สุด</li>
            <li>ทั้งสามสดมภ์มีค่าเท่ากัน</li>
            <li><strong>ข้อมูลไม่เพียงพอที่จะเปรียบเทียบได้แน่นอน</strong></li>
        </ol>
    </div>
    <div class="cheat-card">
        <h4>🎯 4 ค่าดักจุดลวง (Plug-in Test)</h4>
        <p>หากโจทย์ให้ตัวแปรมาโดยไม่ระบุว่าเป็นจำนวนเต็มบวก ต้องทดสอบค่า 4 กลุ่มนี้เสมอ:</p>
        <ul>
            <li>1. <strong>จำนวนบวก:</strong> เช่น $x = 2$</li>
            <li>2. <strong>จำนวนลบ:</strong> เช่น $x = -2$ (เครื่องหมายจะพลิก)</li>
            <li>3. <strong>ศูนย์ ($0$):</strong> ตัวคูณกลายเป็นศูนย์</li>
            <li>4. <strong>เศษส่วนแท้ ($0 < x < 1$):</strong> เช่น $x = 0.5$ ยิ่งยกกำลังค่ายิ่งลดลง ($x^2 < x$)</li>
        </ul>
        <p style="color:#f59e0b;">* หากแทนค่าต่างกันแล้วได้ผลลัพธ์ไม่เหมือนกัน $\\implies$ <strong>ตอบตัวเลือก 5 ทันที</strong></p>
    </div>
</div>
`
            },
            {
                title: '🔍 3. เทคนิคความเพียงพอของข้อมูล (Data Sufficiency)',
                icon: 'search',
                content: `
<div class="cheat-card">
    <h4>📋 Decision Matrix (โฟลว์ชาร์ตการเลือกช้อยส์ 1 - 5)</h4>
    <table class="cheat-table">
        <thead>
            <tr>
                <th>เงื่อนไข (1)</th>
                <th>เงื่อนไข (2)</th>
                <th>รวม (1) + (2)</th>
                <th>คำตอบที่ต้องเลือก</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><span class="badge-yes">ตอบได้</span></td>
                <td><span class="badge-no">ตอบไม่ได้</span></td>
                <td>-</td>
                <td><strong>ตัวเลือก 1</strong> (ข้อมูล 1 เพียงพอ แต่ 2 ไม่พอ)</td>
            </tr>
            <tr>
                <td><span class="badge-no">ตอบไม่ได้</span></td>
                <td><span class="badge-yes">ตอบได้</span></td>
                <td>-</td>
                <td><strong>ตัวเลือก 2</strong> (ข้อมูล 2 เพียงพอ แต่ 1 ไม่พอ)</td>
            </tr>
            <tr>
                <td><span class="badge-no">ตอบไม่ได้</span></td>
                <td><span class="badge-no">ตอบไม่ได้</span></td>
                <td><span class="badge-yes">ตอบได้</span></td>
                <td><strong>ตัวเลือก 3</strong> (ต้องใช้ทั้ง 1 และ 2 ร่วมกัน)</td>
            </tr>
            <tr>
                <td><span class="badge-yes">ตอบได้</span></td>
                <td><span class="badge-yes">ตอบได้</span></td>
                <td>-</td>
                <td><strong>ตัวเลือก 4</strong> (ข้อมูล 1 หรือ 2 ข้อใดข้อหนึ่งก็ตอบได้)</td>
            </tr>
            <tr>
                <td><span class="badge-no">ตอบไม่ได้</span></td>
                <td><span class="badge-no">ตอบไม่ได้</span></td>
                <td><span class="badge-no">ยังตอบไม่ได้</span></td>
                <td><strong>ตัวเลือก 5</strong> (แม้ใช้ทั้ง 1 และ 2 ก็ยังไม่พอ)</td>
            </tr>
        </tbody>
    </table>
    <p style="margin-top:0.75rem; color:var(--text-muted); font-size:0.85rem;">
        * จำไว้ว่า: หน้าที่ของเราไม่ใช่การคำนวณจนได้ตัวเลขสุดท้าย แต่คือการตัดสินว่า <em>"มีข้อมูลพอที่จะหาคำตอบเดียวที่แน่นอนได้หรือไม่"</em>
    </p>
</div>
`
            },
            {
                title: '📦 4. มิติสัมพันธ์ & การพับลูกบาศก์ (Spatial Ability)',
                icon: 'box',
                content: `
<div class="cheat-grid">
    <div class="cheat-card">
        <h4>🧊 กฎหน้าตรงข้าม (Opposite Faces)</h4>
        <ul>
            <li><strong>กฎข้าม 1 ช่อง:</strong> ในรูปคลี่ หน้าที่อยู่ในแนวตรงเดียวกันและคั่นด้วย 1 ช่อง จะเป็น <em>หน้าตรงข้ามกันเสมอ</em></li>
            <li><strong>กฎแขนพับ:</strong> แผ่นที่ยื่นออกมาคนละฝั่งของแถวหลัก เมื่อพับขึ้นมาจะกลายเป็นหน้าตรงข้ามกัน</li>
            <li><span style="color:#f43f5e; font-weight:700;">กฎการตัดช้อยส์:</span> <strong>หน้าที่อยู่ตรงข้ามกัน จะไม่มีทางมองเห็นติดกันบนลูกบาศก์ลูกเดียวกันได้</strong> หากช้อยส์ไหนมีคู่ตรงข้ามโผล่มาพร้อมกัน $\\implies$ ตัดทิ้งทันที!</li>
        </ul>
    </div>
    <div class="cheat-card">
        <h4>🔄 การหมุนภาพ 3 มิติ</h4>
        <ul>
            <li>เช็กจุดสังเกตเฉพาะ (Anchor Points) เช่น มุมบาก บล็อกสีเข้ม หรือรูปทรงที่ยื่นออก</li>
            <li>ทดสอบทิศทางตามแกนหลัก: แกน $X$ (หมุนขึ้น/ลง), แกน $Y$ (หมุนซ้าย/ขวา), แกน $Z$ (หมุนตาม/ทวนเข็ม)</li>
            <li><strong>ระวังภาพสะท้อนกระจก:</strong> การหมุนวัตถุจริงจะไม่สามารถกลับด้านซ้าย-ขวาแบบกระจกเงาได้</li>
        </ul>
    </div>
</div>
`
            },
            {
                title: '🧠 5. ตรรกศาสตร์ & การวิเคราะห์ข้อความ (Logical Reasoning)',
                icon: 'brain',
                content: `
<div class="cheat-grid">
    <div class="cheat-card">
        <h4>🎯 กฎตรรกศาสตร์นิรนัย</h4>
        <ul>
            <li><strong>Modus Ponens:</strong> ถ้าเหตุการณ์เป็นจริง ผลย่อมเป็นจริง
                <br>• โจทย์: ถ้าฝนตก ถนนจะเปียก ($P \\to Q$)
                <br>• เกิด: ฝนตก ($P$) $\\implies$ สรุป: ถนนเปียก ($Q$) [จริงแน่นอน]
            </li>
            <li><strong>Modus Tollens:</strong> ถ้านิเสธผล ย่อมนิเสธเหตุ
                <br>• เกิด: ถนนไม่เปียก ($\\sim Q$) $\\implies$ สรุป: ฝนไม่ตก ($\\sim P$) [จริงแน่นอน]
            </li>
            <li><span style="color:#f43f5e;">⚠️ จุดลวง:</span> ถนนเปียก ($Q$) $\\implies$ <em>สรุปไม่ได้</em>ว่าฝนตกหรือไม่ (อาจมีคนรดน้ำต้นไม้)</li>
        </ul>
    </div>
    <div class="cheat-card">
        <h4>⚖️ เงื่อนไขสัญลักษณ์ (ข้อสรุป ก. และ ข.)</h4>
        <ul>
            <li><strong>เครื่องหมายทางเดียวกัน:</strong> $A > B \\ge C > D \\implies A > D$ (จริง)</li>
            <li><strong>เครื่องหมายสวนทางกัน:</strong> $A > B < C \\implies$ สรุปความสัมพันธ์ระหว่าง $A$ กับ $C$ <strong>"ไม่แน่ชัด"</strong></li>
            <li><strong>ตัวเลือกมาตรฐาน:</strong>
                <br>1. ก และ ข ถูก
                <br>2. ก และ ข ผิด
                <br>3. สรุปไม่ได้แน่ชัดทั้งคู่
                <br>4. ก ถูก ส่วน ข ผิดหรือไม่แน่ชัด
                <br>5. ข ถูก ส่วน ก ผิดหรือไม่แน่ชัด
            </li>
        </ul>
    </div>
</div>
`
            }
        ]
    },

    tgat1: {
        subject_id: 'tgat1',
        title: 'สรุปสูตร & เทคนิคพิชิต TGAT1 91 การสื่อสารภาษาอังกฤษ',
        badge: 'TGAT1 • 91',
        description: 'รวมสำนวน Question-Response, กฎไวยากรณ์ Text Completion และเทคนิคการอ่านจับใจความ Reading',
        sections: [
            {
                title: '🗣️ 1. ทักษะการพูด (Speaking & Conversation Mastery)',
                icon: 'message-circle',
                content: `
<div class="cheat-grid">
    <div class="cheat-card">
        <h4>❓ Question-Response Patterns</h4>
        <ul>
            <li><strong>Would you mind...?</strong> (คุณจะรังเกียจไหม...)
                <br>• ตอบตกลง (ยินดีทำ): <em>Not at all. / Of course not. / I'd be glad to.</em>
                <br>• <span style="color:#f43f5e;">ห้ามตอบ Yes, of course</span> เพราะจะแปลว่า รังเกียจ!
            </li>
            <li><strong>How do you like...?</strong> (คุณรู้สึกอย่างไรกับ...)
                <br>• ถามความเห็น/ความประทับใจ → <em>It's fascinating / I'm enjoying it.</em>
            </li>
            <li><strong>What do you say we...?</strong> (เรา...กันดีไหม)
                <br>• เป็นการชักชวน → <em>Sounds like a plan! / Count me in!</em>
            </li>
            <li><strong>Alternative Questions (A or B?):</strong>
                <br>• ห้ามตอบ Yes หรือ No ต้องเลือกสิ่งใดสิ่งหนึ่ง
            </li>
        </ul>
    </div>
    <div class="cheat-card">
        <h4>🤝 Situational Idioms (สำนวนยอดฮิต)</h4>
        <ul>
            <li><strong>ขอโทษ / ปลอบใจ:</strong> <em>Don't worry about it. / These things happen.</em></li>
            <li><strong>แสดงความยินดี:</strong> <em>Congratulations! / I knew you could do it!</em></li>
            <li><strong>เสนอตัวช่วยเหลือ:</strong> <em>Could I give you a hand? / Can I be of any assistance?</em></li>
            <li><strong>ขอเวลา:</strong> <em>Give me a second. / Hold on a moment.</em></li>
        </ul>
    </div>
</div>
`
            },
            {
                title: '📖 2. ไวยากรณ์สำคัญใน Text Completion (Grammar Cheat Sheet)',
                icon: 'book-open',
                content: `
<div class="cheat-grid">
    <div class="cheat-card">
        <h4>✨ Subjunctive Mood (ข้อสอบชอบออก!)</h4>
        <p style="color: var(--text-secondary); font-size: 0.88rem; margin-bottom: 0.4rem;">หลังกริยา/คุณศัพท์แสดงคำแนะนำ ข้อกำหนด (recommend, suggest, insist, vital, essential, mandatory):</p>
        <div class="grammar-rule-badge">
            It is recommended that <span class="syntax-hl">S + (should) + V<sub>base form</sub></span>
        </div>
        <p style="font-size: 0.85rem; margin-top: 0.5rem; line-height: 1.5;">เช่น: <em>It is vital that every student <strong>be</strong> on time.</em> (ไม่ใช่ is)</p>
        <p style="font-size: 0.85rem; line-height: 1.5;">เช่น: <em>She suggested that he <strong>study</strong> harder.</em> (ไม่ใช่ studies)</p>
    </div>
    <div class="cheat-card">
        <h4>🌪️ Inversion (การสลับประธาน-กริยา)</h4>
        <p style="color: var(--text-secondary); font-size: 0.88rem; margin-bottom: 0.4rem;">เมื่อขึ้นต้นประโยคด้วยคำปฏิเสธ (Negative Adverbs):</p>
        <div class="grammar-rule-badge">
            <span class="syntax-keyword">Not only / Rarely / Seldom / Scarcely</span> + <span class="syntax-hl">V<sub>ช่วย</sub> + S + V<sub>แท้</sub></span>
        </div>
        <p style="font-size: 0.85rem; margin-top: 0.5rem; line-height: 1.5;">เช่น: <em>Not only <strong>does this show</strong> respect, but it also opens doors...</em></p>
    </div>
    <div class="cheat-card">
        <h4>🧩 Participle Clauses (ลดรูปร่วมประธาน)</h4>
        <ul>
            <li><strong>Present Participle (V<sub>ing</sub>):</strong> ประธานกระทำเอง
                <br>• <em>..., enabling clinicians to detect tumors early.</em>
            </li>
            <li><strong>Past Participle (V<sub>3</sub>):</strong> ประธานถูกกระทำ
                <br>• <em>Designed in 1977, the museum reopened today.</em>
            </li>
        </ul>
    </div>
    <div class="cheat-card">
        <h4>⏳ Conditionals (ประโยคเงื่อนไข)</h4>
        <ul>
            <li><strong>Type 1:</strong> If + Present Simple, will + V.inf (เป็นไปได้ในอนาคต)</li>
            <li><strong>Type 2:</strong> If + Past Simple, would + V.inf (สมมติตรงข้ามปัจจุบัน)</li>
            <li><strong>Type 3:</strong> If + had + V.3, would have + V.3 (เสียดายในอดีต)</li>
        </ul>
    </div>
</div>
`
            },
            {
                title: '📰 3. กลยุทธ์การทำ Reading Comprehension',
                icon: 'file-text',
                content: `
<div class="cheat-grid">
    <div class="cheat-card">
        <h4>🎯 4 ขั้นตอนทำข้อสอบจับใจความ</h4>
        <ol>
            <li><strong>อ่านโจทย์ก่อนอ่านเนื้อเรื่อง:</strong> ขีดเส้นใต้คีย์เวิร์ดในคำถาม (ชื่อคน ปี พ.ศ. คำเฉพาะ)</li>
            <li><strong>Skimming:</strong> กวาดสายตาอ่านย่อหน้าแรกและย่อหน้าสุดท้ายเพื่อจับ Main Idea</li>
            <li><strong>Scanning:</strong> มองหาคีย์เวิร์ดในเนื้อหาเพื่อตอบข้อคำถามเจาะจง</li>
            <li><strong>Context Clues:</strong> หาความหมายคำศัพท์จากคำเชื่อมและบริบทข้างเคียง</li>
        </ol>
    </div>
    <div class="cheat-card">
        <h4>🚫 4 ช้อยส์ลวงยอดนิยม (Trap Choices)</h4>
        <ul>
            <li>1. <strong>Too Broad:</strong> ความหมายกว้างเกินเนื้อเรื่องที่กำหนด</li>
            <li>2. <strong>Too Narrow:</strong> ถูกต้องตามข้อเท็จจริง แต่เป็นเพียงตัวอย่างย่อย ไม่ใช่ Main Idea</li>
            <li>3. <strong>Extreme Words:</strong> ตัวเลือกที่มีคำเด็ดขาด เช่น <em>always, never, completely, all</em> มักจะผิด</li>
            <li>4. <strong>Not Mentioned:</strong> ฟังดูดีแต่ไม่มีระบุในบทความ</li>
        </ul>
    </div>
</div>
`
            }
        ]
    },

    tgat3: {
        subject_id: 'tgat3',
        title: 'สรุปแนวคิด & ทัศนคติพิชิต TGAT3 93 สมรรถนะการทำงาน',
        badge: 'TGAT3 • 93',
        description: 'กรอบแนวคิดสมรรถนะการทำงาน 4 ด้าน การคิดเชิงวิเคราะห์ การแก้ปัญหาซับซ้อน วุฒิภาวะทางอารมณ์ และพลเมืองโลก',
        sections: [
            {
                title: '💡 1. การสร้างคุณค่าและนวัตกรรม (Value Creation)',
                icon: 'zap',
                content: `
<div class="cheat-grid">
    <div class="cheat-card">
        <h4>🔍 การคิดเชิงวิเคราะห์ (Analytical Thinking)</h4>
        <ul>
            <li>มองลึกถึง <strong>รากเหง้าของปัญหา (Root Cause)</strong> ไม่ใช่แค่ดูอาการผิวเผิน (Symptom)</li>
            <li>แยกแยะข้อเท็จจริง (Facts) ออกจากความรู้สึกหรืออคติส่วนตัว</li>
            <li>รวบรวมข้อมูลจากผู้มีส่วนได้ส่วนเสียรอบด้าน (Multi-stakeholders)</li>
        </ul>
    </div>
    <div class="cheat-card">
        <h4>🚀 ความคิดเชิงนวัตกรรม (Innovative Thinking)</h4>
        <ul>
            <li><strong>User-Centric Design:</strong> ปรับเทคโนโลยีให้เข้ากับพฤติกรรมผู้ใช้ ไม่บังคับให้ผู้ใช้ฝืนธรรมชาติ</li>
            <li><strong>Shared Value Creation:</strong> สร้างคุณค่าที่ทั้งธุรกิจเติบโตและสังคมได้ประโยชน์ร่วมกันอย่างยั่งยืน</li>
            <li>การทดลองต้นแบบขนาดเล็ก (MVP / Pilot Test) ก่อนทุ่มงบประมาณก้อนใหญ่</li>
        </ul>
    </div>
</div>
`
            },
            {
                title: '🧩 2. การแก้ไขปัญหาที่ซับซ้อน (Complex Problem Solving)',
                icon: 'crosshair',
                content: `
<div class="cheat-card">
    <h4>🔄 วงจร 4 ขั้นตอนการแก้ปัญหาตามพิมพ์เขียว ทปอ.</h4>
    <div class="steps-flow">
        <div class="step-box">
            <span class="step-num">1</span>
            <strong>ระบุปัญหา (Identifying)</strong>
            <p>ทำความเข้าใจบริบทแวดล้อม หาสาเหตุที่แท้จริง และดึงผู้เกี่ยวข้องมาร่วมระบุปัญหา</p>
        </div>
        <div class="step-arrow">→</div>
        <div class="step-box">
            <span class="step-num">2</span>
            <strong>แสวงหาทางออก (Solutions)</strong>
            <p>ระดมความคิดสร้างทางเลือกที่หลากหลาย และประเมินทางเลือกที่ลดความเสี่ยงสูงสุด</p>
        </div>
        <div class="step-arrow">→</div>
        <div class="step-box">
            <span class="step-num">3</span>
            <strong>นำไปปฏิบัติ (Implementation)</strong>
            <p>ลงมือตามแผนอย่างยืดหยุ่น ปรับเปลี่ยนตามสถานการณ์เฉพาะหน้าอย่างรอบคอบ</p>
        </div>
        <div class="step-arrow">→</div>
        <div class="step-box">
            <span class="step-num">4</span>
            <strong>ประเมินผล (Evaluation)</strong>
            <p>วัดผลลัพธ์จากข้อมูลจริง สรุปบทเรียนเพื่อการพัฒนาปรับปรุงอย่างต่อเนื่อง</p>
        </div>
    </div>
</div>
`
            },
            {
                title: '❤️ 3. การบริหารจัดการอารมณ์ (Emotional Intelligence)',
                icon: 'heart',
                content: `
<div class="cheat-grid">
    <div class="cheat-card">
        <h4>🧘 ความตระหนักรู้ & ควบคุมตนเอง (Self Awareness)</h4>
        <ul>
            <li>รู้เท่าทันอารมณ์ตนเองในเสี้ยววินาทีแรก (เช่น น้อยใจ, วิตกกังวล, โกรธ)</li>
            <li><strong>De-escalation:</strong> ควบคุมสติ สีหน้า ท่าทาง และน้ำเสียง ไม่โต้เถียงด้วยอารมณ์ในที่สาธารณะ</li>
            <li>แยกแยะ <em>"ข้อผิดพลาดในเนื้องาน"</em> ออกจาก <em>"คุณค่าในตัวเอง"</em></li>
        </ul>
    </div>
    <div class="cheat-card">
        <h4>🤝 ความเข้าใจผู้อื่น (Interpersonal Understanding)</h4>
        <ul>
            <li><strong>Empathy:</strong> มองทะลุพฤติกรรมก้าวร้าวเพื่อค้นหาความต้องการแท้จริง (Core Needs) เช่น ความยุติธรรม หรือความช่วยเหลือ</li>
            <li><strong>Assertive Communication:</strong> สื่อสารความรู้สึกและข้อเท็จจริงอย่างสุภาพ ตรงไปตรงมา และไม่ก้าวร้าว</li>
            <li>เปลี่ยนความขัดแย้งให้เป็นความร่วมมือโดยเน้นเป้าหมายร่วม</li>
        </ul>
    </div>
</div>
`
            },
            {
                title: '🌍 4. การเป็นพลเมืองที่มีส่วนร่วมของสังคม (Civic Engagement)',
                icon: 'globe',
                content: `
<div class="cheat-grid">
    <div class="cheat-card">
        <h4>🌿 สิ่งแวดล้อม & ความยั่งยืน</h4>
        <ul>
            <li><strong>Paris Agreement (COP21):</strong> เป้าหมายสำคัญคือ <em>ควบคุมการเพิ่มขึ้นของอุณหภูมิโลกไม่ให้เกิน 1.5 - 2.0 °C</em></li>
            <li><strong>Circular Economy (เศรษฐกิจหมุนเวียน):</strong> การนำขยะ/เศษอาหารกลับมาแปรรูปเป็นทรัพยากรหมุนเวียน 100%</li>
            <li><strong>การจัดการขยะยั่งยืน:</strong> มุ่งเน้นการสอนคัดแยกขยะตั้งแต่ต้นทาง (ผลกระทบต่อวิถีชีวิตน้อยที่สุด)</li>
        </ul>
    </div>
    <div class="cheat-card">
        <h4>🏘️ ประโยชน์ของท้องถิ่น & บริการสังคม</h4>
        <ul>
            <li>การพัฒนาสินค้าชุมชน (เช่น ข้าวแต๋นลำปาง, ผ้าคราม) ต้องชวนคนในชุมชนร่วมคิดเรื่อง <em>อัตลักษณ์, การตลาด และการดีไซน์</em></li>
            <li>Universal Design (อารยสถาปัตย์) เพื่อความเท่าเทียมของผู้พิการและผู้สูงอายุ</li>
            <li>การฟื้นฟูศักดิ์ศรีความเป็นมนุษย์ (ให้โอกาสฝึกอาชีพ) ดีกว่าการแจกของสงเคราะห์อย่างเดียว</li>
        </ul>
    </div>
</div>
`
            }
        ]
    },

    alevel_math1: {
        subject_id: 'alevel_math1',
        title: 'สรุปสูตร A-Level คณิตศาสตร์ประยุกต์ 1 (Math 1)',
        badge: 'A-Level • 61',
        description: 'รวมสูตรสำคัญ แคลคูลัส สถิติ ตรีโกณมิติ ลำดับและอนุกรม เมทริกซ์ เวกเตอร์ และจำนวนจริง',
        sections: [
            {
                title: '📐 1. แคลคูลัส (Calculus)',
                icon: 'trending-up',
                content: `
<div class="cheat-grid">
    <div class="cheat-card">
        <h4>⚡ สูตรอนุพันธ์พื้นฐาน</h4>
        <ul>
            <li>$\\frac{d}{dx}(x^n) = n x^{n-1}$</li>
            <li>กฎผลคูณ: $(uv)' = u'v + uv'$</li>
            <li>กฎผลหาร: $\\left(\\frac{u}{v}\\right)' = \\frac{u'v - uv'}{v^2}$</li>
            <li>กฎลูกโซ่ (Chain Rule): $\\frac{df}{dx} = f'(g(x)) \\cdot g'(x)$</li>
            <li><strong>จุดวิกฤต:</strong> จุดที่ $f'(x) = 0$ หรือหาค่าไม่ได้
                <br>• $f''(x) > 0 \\implies$ จุดต่ำสุดสัมพัทธ์
                <br>• $f''(x) < 0 \\implies$ จุดสูงสุดสัมพัทธ์
            </li>
        </ul>
    </div>
    <div class="cheat-card">
        <h4>∫ ปริพันธ์ (Integration)</h4>
        <ul>
            <li>$\\int x^n dx = \\frac{x^{n+1}}{n+1} + c \\quad (n \\neq -1)$</li>
            <li>ทฤษฎีบทมูลฐาน: $\\int_a^b f(x) dx = F(b) - F(a)$</li>
            <li><strong>พื้นที่ปิดล้อมด้วยเส้นโค้ง:</strong>
                <br>$$A = \\int_a^b |f(x) - g(x)| dx$$
            </li>
        </ul>
    </div>
</div>
`
            },
            {
                title: '📊 2. สถิติ & การแจกแจงความน่าจะเป็น',
                icon: 'bar-chart-2',
                content: `
<div class="cheat-grid">
    <div class="cheat-card">
        <h4>🎯 ค่ามาตรฐาน & การแจกแจงปกติ</h4>
        <ul>
            <li><strong>ค่ามาตรฐาน (Z-Score):</strong>
                <br>$$z = \\frac{x - \\mu}{\\sigma}$$
            </li>
            <li>พื้นที่ใต้โค้งปกติมาตรฐานรวมเท่ากับ $1.0$ (สมมาตรรอบ $z = 0$)</li>
            <li>$P(\\mu - \\sigma < X < \\mu + \\sigma) \\approx 68.2\\%$</li>
            <li>$P(\\mu - 2\\sigma < X < \\mu + 2\\sigma) \\approx 95.4\\%$</li>
        </ul>
    </div>
    <div class="cheat-card">
        <h4>🎲 ความน่าจะเป็น & การแจกแจงทวินาม</h4>
        <ul>
            <li>กฎการนับ: $P_{n,r} = \\frac{n!}{(n-r)!}$, $C_{n,r} = \\binom{n}{r} = \\frac{n!}{r!(n-r)!}$</li>
            <li><strong>การแจกแจงทวินาม $X \\sim B(n, p)$:</strong>
                <br>• $P(X = x) = \\binom{n}{x} p^x (1-p)^{n-x}$
                <br>• ค่าคาดหมาย: $\\mu = E(X) = np$
                <br>• ส่วนเบี่ยงเบนมาตรฐาน: $\\sigma = \\sqrt{np(1-p)}$
            </li>
        </ul>
    </div>
</div>
`
            },
            {
                title: '🔺 3. ตรีโกณมิติ & เวกเตอร์',
                icon: 'triangle',
                content: `
<div class="cheat-grid">
    <div class="cheat-card">
        <h4>📐 เอกลักษณ์ตรีโกณมิติ</h4>
        <ul>
            <li>$\\sin^2 \\theta + \\cos^2 \\theta = 1$</li>
            <li>$\\sin(A \\pm B) = \\sin A \\cos B \\pm \\cos A \\sin B$</li>
            <li>$\\cos(A \\pm B) = \\cos A \\cos B \\mp \\sin A \\sin B$</li>
            <li>$\\sin 2A = 2\\sin A \\cos A$</li>
            <li>$\\cos 2A = \\cos^2 A - \\sin^2 A = 2\\cos^2 A - 1 = 1 - 2\\sin^2 A$</li>
            <li><strong>กฎของโคไซน์:</strong> $c^2 = a^2 + b^2 - 2ab\\cos C$</li>
        </ul>
    </div>
    <div class="cheat-card">
        <h4>🧭 เวกเตอร์ & เมทริกซ์</h4>
        <ul>
            <li><strong>Dot Product:</strong> $\\vec{u} \\cdot \\vec{v} = |\\vec{u}||\\vec{v}|\\cos\\theta = u_1 v_1 + u_2 v_2 + u_3 v_3$
                <br>• ถ้า $\\vec{u} \\perp \\vec{v} \\iff \\vec{u} \\cdot \\vec{v} = 0$
            </li>
            <li><strong>Cross Product:</strong> $|\\vec{u} \\times \\vec{v}| = |\\vec{u}||\\vec{v}|\\sin\\theta$ (ได้พื้นที่สี่เหลี่ยมด้านขนาน)</li>
            <li><strong>Matrix Inverse (2x2):</strong>
                <br>$$A^{-1} = \\frac{1}{\\det A} \\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix}$$
            </li>
        </ul>
    </div>
</div>
`
            },
            {
                title: '🔢 4. ลำดับและอนุกรม (Sequences & Series)',
                icon: 'layers',
                content: `
<div class="cheat-grid">
    <div class="cheat-card">
        <h4>🔢 ลำดับเลขคณิต & เรขาคณิต</h4>
        <ul>
            <li><strong>ลำดับเลขคณิต:</strong> $a_n = a_1 + (n-1)d$
                <br>• ผลรวม: $S_n = \\frac{n}{2}(a_1 + a_n) = \\frac{n}{2}[2a_1 + (n-1)d]$
            </li>
            <li><strong>ลำดับเรขาคณิต:</strong> $a_n = a_1 r^{n-1}$
                <br>• ผลรวมจำกัด: $S_n = \\frac{a_1 (1 - r^n)}{1 - r} \\quad (r \\neq 1)$
            </li>
            <li><strong>อนุกรมเรขาคณิตอนันต์ ($|r| < 1$):</strong>
                <br>$$S_\\infty = \\frac{a_1}{1 - r}$$
            </li>
        </ul>
    </div>
    <div class="cheat-card">
        <h4>🌱 ดอกเบี้ยทบต้นและมูลค่าเงินตามเวลา</h4>
        <ul>
            <li><strong>ดอกเบี้ยทบต้น:</strong>
                <br>$$A = P \\left(1 + \\frac{r}{k}\\right)^{kn}$$
                <br>($P$ เงินต้น, $r$ อัตราดอกเบี้ยต่อปี, $k$ จำนวนครั้งที่ทบต้นต่อปี, $n$ จำนวนปี)
            </li>
            <li><strong>มูลค่าปัจจุบัน (Present Value):</strong>
                <br>$$P = A \\left(1 + \\frac{r}{k}\\right)^{-kn}$$
            </li>
        </ul>
    </div>
</div>
`
            }
        ]
    }
};

module.exports = cheatsheets;
