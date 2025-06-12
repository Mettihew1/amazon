import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', 
     sourcemap: false,
    chunkSizeWarningLimit: 1000, // Increase chunk size warning limit
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor chunks
          mui: ['@mui/material', '@mui/icons-material'],
          framer: ['framer-motion'],
          react: ['react', 'react-dom'],
        }
      }
    }
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@mui/material',
      '@mui/icons-material'
    ],
    exclude: ['source-map-js'], // if you're using this
  }
});
