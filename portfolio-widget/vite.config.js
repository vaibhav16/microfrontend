import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'portfolio',
      filename: 'remoteEntry.js',
      exposes: {
        './PortfolioWidget': './src/PortfolioWidget.jsx'
      },
      shared: ['react', 'react-dom'],
      remotes: {
        host: 'http://localhost:5000/assets/remoteEntry.js', // 👈 Add this line
      },
    })
  ],
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
    outDir: 'dist', // ✅ optional but good for clarity
  },
  server: {
    port: 5002,
    cors: true, // ✅ standard CORS setting
    headers: {
      'Access-Control-Allow-Origin': '*', // ✅ For extra safety during dev
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': '*',
    },
  }
});
