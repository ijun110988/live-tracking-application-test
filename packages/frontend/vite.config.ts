import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@live-tracking/shared': path.resolve(__dirname, '../shared/src'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3005',
        changeOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      external: ['@live-tracking/shared'],
    },
  },
  optimizeDeps: {
    include: ['react-leaflet', 'leaflet'],
    exclude: ['@live-tracking/shared'],
  },
});
