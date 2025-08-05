import { configDefaults } from 'vitest/config';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';

import vue from '@vitejs/plugin-vue';
// @ts-expect-error Type definitions not properly exposed
import eslint from 'vite-plugin-eslint';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vite.dev/config/
export default defineConfig({
  plugins: [eslint(), vue(), vueJsx(), vueDevTools()],
  base: '/mine-vue',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
