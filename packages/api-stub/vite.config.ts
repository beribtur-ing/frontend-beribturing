import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// @ts-ignore
const packageJson = require('./package.json');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react({
      exclude: /\.stories\.(mdx|[tj]sx?)$/,
      include: [/\.tsx?$/, /\.jsx?$/, /\.css$/],
    }),
  ],
  build: {
    lib: {
      entry: './src/index.ts',
      name: packageJson.name,
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['axios'],
      output: {
        globals: {},
      },
    },
  },
});
