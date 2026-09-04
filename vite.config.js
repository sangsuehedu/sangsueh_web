import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        summer: resolve(__dirname, 'summer-2026.html')
      }
    }
  },
  server: {
    port: 3000,
    open: false
  }
})
