
# 📚 Book Management System

พัฒนาโดยใช้ Vue 3 + Vuetify + Pinia พร้อมฟีเจอร์จัดเต็มสำหรับจัดการข้อมูลหนังสือ เช่น เข้าระบบ, ค้นหา, เพิ่ม, แก้ไข และลบข้อมูล

---

## ✅ Features

- 🔐 **เข้าสู่ระบบ** ด้วยชื่อผู้ใช้และรหัสผ่าน
- 🔎 **ค้นหาหนังสือ** จากชื่อหรือผู้แต่ง
- 📄 **ดึงข้อมูลแบบ Pagination** พร้อมเลือกจำนวนต่อหน้าได้
- ➕ **เพิ่มข้อมูลหนังสือ** ด้วย Dialog และ Validation
- ✏️ **แก้ไขข้อมูลหนังสือ** ที่มีอยู่
- 🗑️ **ลบข้อมูลหนังสือ** พร้อมยืนยันก่อนลบ

---

## 🚀 Tech Stack

| Tech | Description |
|------|-------------|
| 🖼️ Vue 3 | Frontend Framework |
| 🧩 Vuetify 3 | Material Design UI Framework |
| 📦 Pinia | State Management |
| 🌐 Axios | HTTP Client |
| 🕒 Day.js | Date Formatting |
| 🍪 js-cookie | ใช้จัดการ token |
| ⚠️ SweetAlert2 | Dialog / Alert UI |

---

## 🗂️ Project Structure

```bash
📁 public                 # ไฟล์ static ที่ไม่ต้อง build เช่น รูป, favicon
📁 src                   # โฟลเดอร์หลักของ source code

├── 📁 assets            # ไฟล์รูปภาพ, ไอคอน หรือ assets อื่น ๆ
├── 📁 components        # Vue components ที่สามารถนำกลับมาใช้ซ้ำได้
├── 📁 css               # ไฟล์ CSS แยก เช่น style.css
├── 📁 router            # การกำหนดเส้นทางของแอป (Vue Router)
├── 📁 stores            # Global state management ด้วย Pinia
├── 📁 types             # กำหนดชนิดข้อมูลด้วย TypeScript (interfaces / types)
├── 📁 utils             # ฟังก์ชันช่วยเหลือ เช่น axios instance หรือ date formatter
├── 📁 views             # หน้าจอหลักแต่ละหน้า เช่น Login, BookList

├── 📄 App.vue           # Root component ที่แสดง layout หลักของแอป
├── 📄 main.ts           # Entry point สำหรับสร้างและ mount Vue app
├── 📄 .env              # ตัวแปรสภาพแวดล้อม เช่น VITE_API_URL
├── 📄 index.html        # HTML template หลักสำหรับแอป Vue
```

---

## ▶️ Run Local

```bash
# ติดตั้ง dependency
npm install

# รันในโหมด development
npm run dev
```
