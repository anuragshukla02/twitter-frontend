import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port:3000,
    proxy:{
      "/api":{
        target:"http://ec2-3-90-26-21.compute-1.amazonaws.com",
        changeOrigin:true,
      }
    }
  }
})
