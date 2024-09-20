// @ts-check

import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  base: process.env.BASE_URL || '/',
  integrations: [react(), tailwind()]
});
