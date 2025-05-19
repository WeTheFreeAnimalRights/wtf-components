import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.js',
  },
  resolve: {
    alias: {
      '_': path.resolve(__dirname, 'src/_shadcn'),
    },
  },
});
