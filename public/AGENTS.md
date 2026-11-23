# Frontend & RPG Card Art Rules (`public/`)

กฎเฉพาะสำหรับ Agent ที่ดูแลหน้าเว็บไซต์ (`public/index.html`, `public/css/`, `public/js/`) และ Agent สายอาร์ตการ์ดตัวละคร (`rpg-card`)

---

## 1. โครงสร้างโมดูล Frontend (Zero-Build Extension Pattern)
- `public/js/app.js` ประกาศออบเจกต์หลัก `const app = { ... }` และเรียก `app.init()` เมื่อ `DOMContentLoaded`
- โมดูลย่อยใน `public/js/modules/*.js` (`rpg-card.js`, `ai-tutor.js`, `cefr.js`, `auth.js`, `vocab-mistakes.js`) **ต้องขยายความสามารถผ่าน `Object.assign(app, { ... })`** เท่านั้น เพื่อรักษา `onclick="app.methodName()"` ใน HTML
- ไอคอน Vector ทั้งหมดรวมอยู่ที่ `public/js/modules/icons.js` (`TCAS_ICONS`, `TCAS_AVATARS`) — ห้ามสร้างไอคอนแบบ Emoji

---

## 2. กฎสำหรับ RPG Card & Level Art Agent
- **ไฟล์ที่รับผิดชอบ:** `public/css/rpg-card.css`, `public/js/modules/rpg-card.js`, และ `TCAS_AVATARS` ใน `public/js/modules/icons.js`
- **สถาปัตยกรรม 3D สองชั้น (ห้ามแก้ไขเด็ดขาด):**
  - ชั้นนอก `#tcas-card-tilt` คุมการเอียงตามเมาส์/สัมผัสเท่านั้น
  - ชั้นใน `#tcas-card-flip` คุมการพลิก `.is-flipped` (`rotateY(180deg)`) เท่านั้น — **ห้าม** สั่ง `style.transform` ทับ `#tcas-card-flip` จาก JS
  - ลูกใน `.tcas-card-face *` ต้องคง `transform-style: flat !important;` และซ่อนด้านที่ไม่ได้แสดงเพื่อกัน Avatar/Badge ทะลุแกน Z
- **Level Tiers:** `tier-bronze` (Lv.1–4), `tier-silver` (Lv.5–9), `tier-gold` (Lv.10–19), `tier-mythic` (Lv.20+) ถูกกำหนดใน `RPG_CARD_TIERS` ของ `rpg-card.js` และ `rpg-card.css`
- **Dual Theme:** การ์ด 3D และหน้า Status Radar ต้องอ่านง่ายในทั้ง `theme-dark` และ `theme-light`

---

## 3. กฎสำหรับ Theme / Exam UI Agent
- ตัวแปรสีหลักและ Dark Mode อยู่ใน `public/css/style.css`; Academic Light Mode (`body.theme-light`) อยู่ใน `public/css/theme-light.css`
- ในห้องสอบ (`#view-exam`): โหมด **Free Roam** (`activeSession.is_free_roam === true`) ต้องไม่แสดงตัวเลขจับเวลาเดินหน้า/ถอยหลัง และเปิดปุ่มถาม AI สดได้; ส่วนโหมด **Standard Timed** ต้องจับเวลาถอยหลังและล็อกผู้ช่วย AI ระหว่างสอบ
