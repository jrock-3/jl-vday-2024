import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/jl-vday-2024/',
  plugins: [react()],
  build: {
    target: 'es2022',
  },
})
