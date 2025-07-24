import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ✅ Add base for correct asset paths in production
export default defineConfig({
  plugins: [react()],
  base: '/',  // 👈 THIS LINE IS CRITICAL
})
