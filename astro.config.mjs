import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import { BASE_PATH, manifest } from './src/utils/seo';
import sitemap from '@astrojs/sitemap';
import compress from 'astro-compress';
import { VitePWA } from 'vite-plugin-pwa';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  base: BASE_PATH,
  integrations: [react(), tailwind(), sitemap(), compress()],
  vite: {
    plugins: [
      VitePWA({
        registerType: 'autoUpdate',
        manifest,
        base: BASE_PATH,
        workbox: {
          globDirectory: 'dist',
          globPatterns: ['**/*.{js,css,svg,png,jpg,jpeg,gif,webp,woff,woff2,ttf,eot,ico}'],
          // Don't fallback on document based (e.g. `/some-page`) requests
          // This removes an errant console.log message from showing up.
          navigateFallback: null
        }
      })
    ]
  }
});
