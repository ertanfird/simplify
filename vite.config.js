import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   origin: 'http://25.61.167.150:5173',
  //   proxy: 'http://localhost:5000'
  // }
})
