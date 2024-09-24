import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import { BASE_PATH, manifest, URL } from './src/utils/seo';
import sitemap from '@astrojs/sitemap';
import compress from 'astro-compress';
import robotsTxt from 'astro-robots-txt';
import AstroPWA from '@vite-pwa/astro';

// https://astro.build/config
export default defineConfig({
  site: URL,
  base: BASE_PATH,
  output: 'static',
  build: {
    format: 'file',
    inlineStylesheets: 'always'
  },
  integrations: [
    react(),
    tailwind(),
    sitemap(),
    compress(),
    robotsTxt(),
    AstroPWA({
      registerType: 'autoUpdate',
      manifest,
      manifestFilename: 'manifest.webmanifest',
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
});
