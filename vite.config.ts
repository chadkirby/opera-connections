import { defineConfig } from 'vite';

export default defineConfig({
  root: 'app',
  build: {
    outDir: '../dist',
    target: ['chrome89', 'firefox89', 'edge89', 'safari15'],
  },
  assetsInclude: ['**/*.JPG', '**/*.PNG'],
});
