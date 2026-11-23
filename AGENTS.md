# TCAS Master — Multi-Agent Workspace Rules

กฎกลางประจำโปรเจกต์ `c:\MaMan` (โหลดอัตโนมัติในทุกแชท) เพื่อให้เอเจนท์หลายตัวทำงานขนานกันได้อย่างราบรื่น ไม่เขียนทับไฟล์กัน และคงมาตรฐานเดียวกันทั้งระบบ

---

## 1. Tech Stack & Runtime
- **Backend:** Node.js + Express (`server.js`) + SQLite (`better-sqlite3` ที่ `database/tcas_exam.db`)
- **Frontend:** Vanilla HTML/CSS/JS แบบ Zero-Build (`public/index.html`, `public/css/`, `public/js/`) + KaTeX สำหรับสมการคณิตศาสตร์
- **Local Server:** รันที่ `http://localhost:3000` (`node server.js`)

---

## 2. แผนผังแบ่งขอบเขตไฟล์สำหรับหลายเอเจนท์ (Multi-Agent File Ownership)
เมื่อเปิดแชทใหม่ ให้แก้ไข **เฉพาะไฟล์ในขอบเขตหน้าที่ของตัวเอง** เพื่อป้องกันการทำงานชนกัน:

| บทบาท Agent | ไฟล์/โฟลเดอร์ที่รับผิดชอบ | ห้ามแก้ไขโดยไม่จำเป็น |
| :--- | :--- | :--- |
| **UI / Theme / Dashboard Agent** | `public/index.html`, `public/css/style.css`, `public/css/theme-light.css`, `public/js/app.js` | โค้ดอาร์ตการ์ด, ไฟล์ข้อสอบรายวิชา |
| **RPG Card & Level Art Agent** | `public/css/rpg-card.css`, `public/js/modules/rpg-card.js`, `TCAS_AVATARS` ใน `public/js/modules/icons.js` | ระบบ Exam Simulator, Server API, Database |
| **Exam Subject Agent (รายวิชา)** | `database/subjects/<subject_id>.js` และ `database/subjects/questions/<subject_id>_*.js` | วิชาอื่น, ไฟล์ UI (`public/`), `server.js` |
| **AI Tutor & Vocab/CEFR Agent** | `public/js/modules/ai-tutor.js`, `public/js/modules/cefr.js`, `public/js/modules/vocab-mistakes.js` | การ์ด RPG, ไฟล์ข้อสอบรายวิชา |
| **Auth & Backend Core Agent** | `auth.js`, `server.js`, `database/schema.sql`, `database/migrate_users.js` | อาร์ตการ์ด, เนื้อหาข้อสอบ |

---

## 3. กฎบังคับร่วมกันทุกแชท (Mandatory Standards)

1. **Zero-Emoji UI Policy:**
   - ห้ามใส่ Unicode Emoji (`😀`, `🎯`, `🔥`, `✅`, `⏳`, `🚀`, `👨‍🎓`, ฯลฯ) ลงใน HTML, UI labels, Toast alerts, หรือปุ่มใดๆ
   - ให้ใช้ Vector SVG ผ่าน `app.svg('icon-name', { size, color })` หรือ Inline `<svg>` เท่านั้น (ยกเว้น `TCAS_AVATAR_MAP` ใน `icons.js` ที่ใช้แปลงข้อมูลเก่าใน DB)
2. **Dual-Theme & Multi-Device Parity:**
   - UI ใหม่ทุกชิ้นต้องรองรับทั้ง **`body.theme-dark`** (Deep Slate เดิม) และ **`body.theme-light`** (Academic Light) รวมถึงหน้าจอ Desktop, iPad, และมือถือ (`<= 768px`)
3. **AI Communication Policy (Equality):**
   - ห้ามใช้คำว่า `"พี่"` หรือ `"น้อง"` ใน Prompt หรือข้อความของ `TCAS Master AI` เด็ดขาด ให้ใช้สรรพนามที่เท่าเทียมกัน เช่น `"ผม"`, `"เรา"`, `"คุณ"`
4. **Multi-User & Guest Safety:**
   - ห้ามบันทึกประวัติข้อผิดพลาด (`mistake_notebook`), ข้อสอบที่พิชิตแล้ว (`user_mastered_questions`), หรือ CEFR history ลงในบัญชี Guest (`usr_guest`)
   - ผู้ใช้ที่ยังไม่เคยสอบ (`total_answered === 0`) ต้องแสดงสถิติ `0` จริง ห้ามใส่ตัวเลขสมมติ
5. **Verification & Git Guardrail:**
   - หลังแก้ไขโค้ด `.js` ต้องตรวจ syntax ด้วย `node -c <file>` ทุกครั้ง และเช็กว่าไม่ทำลายหน้าเว็บที่ `http://localhost:3000`
   - **ห้าม** `git commit` หรือ `git push` ขึ้น GitHub เอง จนกว่าผู้ใช้จะสั่งอย่างชัดเจน
