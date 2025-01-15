import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  assetsInclude: ["**/*.glb"],
  resolve: {
    alias: {
      $: "jquery",
    },
  },
   build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'], // Example for splitting dependencies
        },
      },
    },
  },
})
