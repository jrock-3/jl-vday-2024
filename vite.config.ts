import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/jlxjl/',
  plugins: [react()],
  build: {
    target: 'es2022',
  },
})
