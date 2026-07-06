import { defineConfig } from 'vite';

export default defineConfig({
  // When deployed to GitHub Pages at wildducktheories.github.io/collatz/apps/collatz-graph/
  // set base to '/collatz/apps/collatz-graph/' for production.
  // For local dev, '/' is fine.
  base: process.env.VITE_BASE_PATH || '/',
});
