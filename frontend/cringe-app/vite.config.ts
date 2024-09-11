import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../../backend/cringe-app/src/main/resources/static',
    assetsDir: '.',
    emptyOutDir: true,
  },
});

