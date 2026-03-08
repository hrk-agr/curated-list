import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: 'https://curated.example.com',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
});
