import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      src: '/src',
    },
  },
  plugins: [react(), eslint(), svgr(), tsconfigPaths()],
});
