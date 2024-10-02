import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  base:'./',
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3000,
    open: true, // Automatically open the browser
  },
  resolve: {
    alias: {
      '@': '/src', // Update if you have aliases for imports
    },
  },
});
