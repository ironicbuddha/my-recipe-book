// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { publisherRedirects, retirementRedirects } from './src/lib/library.ts';

// https://astro.build/config
export default defineConfig({
  redirects: {
    ...publisherRedirects(),
    ...retirementRedirects(),
  },
  site: 'https://recipes.carlokruger.com',
  integrations: [sitemap()],
});
