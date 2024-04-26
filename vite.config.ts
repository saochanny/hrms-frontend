import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      "/api":{
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        ws: false
      },
      '/socket.io': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
      '/documentUpload': {
        target: 'https://dev.allweb.com.kh:88/storage/uploads/',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    }
  }
})
