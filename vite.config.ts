import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/jl-jl-2024/',
  plugins: [react()],
  build: {
    target: 'es2022',
  },
})
