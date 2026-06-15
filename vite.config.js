import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// แหล่งข้อมูลอ้างอิงการตั้งค่า Base Path อย่างเป็นทางการ: https://vitejs.dev/guide/static-deploy.html#github-pages
export default defineConfig({
  plugins: [react()],
  base: '/wed/', // กำหนด Base Path ให้ตรงกับชื่อ Repository บน GitHub เพื่อแก้ไขปัญหาโหลดไฟล์ไม่เจอ (404)
})