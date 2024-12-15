import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000'
    } // anytime the vue app makes a request to anything with /api in file path, vite dev server is going to send the request to our express server (we have running in localhost:3000)
  }
})
