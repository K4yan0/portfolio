// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import rehypeExternalLinks from 'rehype-external-links';

// https://astro.build/config
export default defineConfig({
  // Replace this with your actual GitHub Pages URL or custom domain
  site: 'https://K4yan0.github.io',

  // If your repo is named 'portfolio', uncomment the line below:
  base: '/portfolio',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
    routing: {
      prefixDefaultLocale: false
    }
  },

  markdown: {
    rehypePlugins: [
      [rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }]
    ]
  },

  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [react()]
});