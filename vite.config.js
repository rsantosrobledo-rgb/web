import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        hola: resolve(import.meta.dirname, 'hola/index.html'),
        hello: resolve(import.meta.dirname, 'hello/index.html'),
      },
    },
  },
})
