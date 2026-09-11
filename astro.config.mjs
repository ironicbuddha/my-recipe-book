// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { retirementRedirects } from './src/lib/library.ts';

// https://astro.build/config
export default defineConfig({
  redirects: {
    '/recipes/2026-02-19-singapore-chicken-rice/':
      '/recipes/singapore-chicken-rice/',
    ...retirementRedirects(),
  },
  site: 'https://recipes.carlokruger.com',
  integrations: [sitemap()],
});
