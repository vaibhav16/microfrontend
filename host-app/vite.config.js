import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'host',
      remotes: {
        price: 'http://localhost:5001/assets/remoteEntry.js',
        portfolio: 'http://localhost:5002/assets/remoteEntry.js',
        newsfeed: 'http://localhost:5003/assets/remoteEntry.js',
        wallet: 'http://localhost:5004/assets/remoteEntry.js'
      },
      shared: ['react', 'react-dom'],
      exposes: {'./eventBus': './src/EventBus.js', 
  },
      
    })
  ],
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  },
  server: {
    port: 5000,
    cors: true
  }
});
