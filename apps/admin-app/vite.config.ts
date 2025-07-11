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
    // @ts-ignore
    tsconfigPaths(),
    react({
      include: [/\.tsx?$/, /\.jsx?$/, /\.css$/],
    }),
  ],
  build: {
    sourcemap: false,
    rollupOptions: {
    },
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
        target: 'http://localhost:9093',
        rewrite: (path) => path.replace('/api', '/'),
        changeOrigin: true,
        ws: true,
        configure: (proxy) =>
          proxy.on('proxyReq', (proxy) => console.log(`-> ${proxy.protocol}//${proxy.host}${proxy.path}`)),
      },
    },
  },
  base: '/',
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
      'react-dom'
    ],
  },
});
