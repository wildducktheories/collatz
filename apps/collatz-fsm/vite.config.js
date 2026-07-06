import { defineConfig } from 'vite';

export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/collatz/apps/collatz-fsm/dist/',
  build: {
    outDir: 'dist',
  },
});
