// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import dotenv from 'dotenv';

// Load variables from .env
dotenv.config();

// Get values from process.env
const enable = process.env.ENABLE === 'true';
const hostUrl = process.env.VITE_HOST_URL?.replace(/\/$/, '');

const hostRemoteEntry = enable && hostUrl
  ? `${hostUrl}/assets/remoteEntry.js`
  : 'http://localhost:5000/assets/remoteEntry.js';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'price',
      filename: 'remoteEntry.js',
      exposes: {
        './PriceWidget': './src/PriceWidget.jsx'
      },
      shared: ['react', 'react-dom'],
       remotes: {
        //host: 'http://localhost:5000/assets/remoteEntry.js', // 👈 Add this line
        host: hostRemoteEntry
      },
    })
  ],
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
    outDir: 'dist',
  },
  server: {
    port: 5001,
    cors: true, // ✅ This alone is usually enough for Vite dev
    headers: {
      'Access-Control-Allow-Origin': '*', // ✅ For extra safety during dev
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': '*',
    },
  }
});
