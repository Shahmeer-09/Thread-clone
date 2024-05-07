import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      '/thread':{
        target:'http://localhost:5100',
        changeOrigin:true,
        secure:false,
      }
    }
  }
})
