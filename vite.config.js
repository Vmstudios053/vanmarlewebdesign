import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // GitHub Pages serveert dit project op /vanmarlewebdesign/.
  // Let op: wijzig dit naar '/' zodra de site op het eigen domein (root) draait.
  base: '/vanmarlewebdesign/',
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          gsap: ['gsap', 'lenis'],
        },
      },
    },
  },
})
