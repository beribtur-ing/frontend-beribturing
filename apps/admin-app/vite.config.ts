import react from '@vitejs/plugin-react';
// @ts-ignore
import {defineConfig} from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: './postcss.config.mjs',
  },
  plugins: [
    tsconfigPaths(),
    react({
      include: [/\.tsx?$/, /\.jsx?$/, /\.css$/],
    }),
  ],
  build: {
    rollupOptions: {
      external: (id) => {
        return id.startsWith('@radix-ui/') ||
               id.startsWith('@formatjs/') ||
               ['intl-messageformat', 'tslib', 'hoist-non-react-statics', '@tanstack/query-core', '@tanstack/react-query', 'react-router', 'react-router-dom', 'recharts', 'embla-carousel-react', 'use-sync-external-store', 'class-variance-authority', 'clsx', 'cmdk', 'tailwind-merge', 'lucide-react'].includes(id);
      }
    }
  },
  resolve: {
    preserveSymlinks: true,
    alias: [
      {
        find: '@beribturing/api-stub',
        replacement: path.resolve(__dirname, '../../packages/api-stub/src'),
      },
      {
        find: '@assets',
        replacement: path.resolve(__dirname, 'public'),
      },
    ],
  },
  server: {
    port: 3003,
    proxy: {
      '/api': {
        // target: 'http://localhost:8888',
        target: 'http://206.189.55.6:8080',
        rewrite: (path) => path.replace('/api', '/'),
        changeOrigin: true,
        ws: true,
        configure: (proxy) =>
          proxy.on('proxyReq', (proxy) => console.log(`-> ${proxy.protocol}//${proxy.host}${proxy.path}`)),
      },
    },
  },
  base: '/admin',
});
