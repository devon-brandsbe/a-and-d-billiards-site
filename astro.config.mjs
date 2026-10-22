// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Set SITE_URL in the deploy environment once the domain is chosen.
// It drives canonical URLs, Open Graph tags and the sitemap.
const site = process.env.SITE_URL || 'https://www.adbilliardsllc.com';

export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [sitemap()],
});
