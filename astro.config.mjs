// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  // Replace this with your actual GitHub Pages URL or custom domain
  site: 'https://K4yan0.github.io',

  // If your repo is named 'portfolio', uncomment the line below:
  base: '/portfolio',

  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [react()]
});