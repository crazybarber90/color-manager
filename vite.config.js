import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    proxy: {
      // redirect na api
      '/colors': 'http://localhost:5000',
    },
  },
  plugins: [react()],
})
