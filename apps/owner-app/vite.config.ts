import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: './postcss.config.mjs',
  },
  plugins: [
    tsconfigPaths(),
    react(),
  ],
  build: {
    sourcemap: false,
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
  resolve: {
    preserveSymlinks: true,
    alias: {
      '@beribturing/api-stub': path.resolve(__dirname, '../../packages/api-stub/src'),
      '@assets': path.resolve(__dirname, './public'),
      '~': path.resolve(__dirname, './src'),
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://206.189.55.6:8080',
        rewrite: (path) => path.replace('/api', '/'),
        changeOrigin: true,
        ws: true,
        configure: (proxy) =>
          proxy.on('proxyReq', (proxy) => console.log(`-> ${proxy.protocol}//${proxy.host}${proxy.path}`)),
      },
    },
  },
  base: '/owner',
  esbuild: {
    logOverride: { 
      'this-is-undefined-in-esm': 'silent',
      'direct-eval': 'silent'
    },
  },
  optimizeDeps: {
    include: [
      '@mui/material',
      '@mui/icons-material',
      '@emotion/react',
      '@emotion/styled',
      'react',
      'react-dom',
      'i18next',
      'react-i18next'
    ],
  },
});
