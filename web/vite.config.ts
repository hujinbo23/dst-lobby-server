import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/lobby': {
        target: "http://localhost:80",
        changeOrigin: true, //需要代理跨域
        // rewrite: (path) => path.replace(/^\/api/, ''),

      },
    },
  },
})
