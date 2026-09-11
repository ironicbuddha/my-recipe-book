// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  redirects: {
    '/recipes/2026-02-19-singapore-chicken-rice/': '/recipes/singapore-chicken-rice/',
  },
  site: 'https://recipes.carlokruger.com',
  integrations: [sitemap()],
});
