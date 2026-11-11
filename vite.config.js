import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  css: {
    postcss: {},
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        404: resolve(__dirname, '404.html'),
        spares_pumps: resolve(__dirname, 'spares/pumps/index.html'),
      },
    },
  },
});
