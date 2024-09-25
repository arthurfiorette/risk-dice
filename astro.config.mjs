import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import compress from 'astro-compress';
import robotsTxt from 'astro-robots-txt';
import AstroPWA from '@vite-pwa/astro';
import { BasePath, Url } from './src/utils/url';

// https://astro.build/config
export default defineConfig({
  site: Url,
  base: BasePath,
  output: 'static',
  build: {
    format: 'file',
  },
  integrations: [
    react(),
    tailwind(),
    sitemap(),
    compress(),
    robotsTxt(),
    AstroPWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Risk Dice Roller',
        short_name: 'Risk Roller',
        description:
          'A simple dice roller for the board game Risk. Roll the dice and see the results of your attack or defense.',
        theme_color: '#eab308',
        background_color: '#ef4444',
        display: 'fullscreen'
      },
      includeAssets: ['favicon.svg'],
      workbox: {
        globDirectory: 'dist',
        globPatterns: ['**/*.{js,css,svg,png,jpg,jpeg,gif,webp,woff,woff2,ttf,eot,ico}'],
        // Don't fallback on document based (e.g. `/some-page`) requests
        // This removes an errant console.log message from showing up.
        navigateFallback: null
      },
      devOptions: {
        enabled: true
      },
      pwaAssets: {
        config: true
      }
    })
  ]
});
