import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      '/thread':{
        target:'https://thread-clone-flame-mu.vercel.app/',
        secure:false,
      }
    }
  }
})
