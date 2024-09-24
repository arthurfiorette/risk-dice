import type { Props } from 'astro-seo';
import type { ManifestOptions } from 'vite-plugin-pwa';

export const DOMAIN = 'https://arthur.run';
export const BASE_PATH = process.env.BASE_URL || '';

export const URL = `${DOMAIN}/${BASE_PATH}`;

export const SeoProps: Props = {
  title: 'Risk Dice Roller',
  description:
    'A simple dice roller for the board game Risk. Roll the dice and see the results of your attack or defense.',
  openGraph: {
    basic: {
      image: `${URL}/android-chrome-512.png`,
      type: 'website',
      title: 'Risk Dice Roller'
    }
  },
  twitter: {
    creator: '@arthurfiorette'
  },
  extend: {
    link: [
      { rel: 'icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '48x48', href: '/favicon-48.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16.png' },
      { rel: 'manifest', href: '/manifest.json' }
    ],
    meta: [
      { name: 'msapplication-TileColor', content: '#EF7244' },
      { name: 'theme-color', content: '#EF7244' }
    ]
  }
};

/**
 * Defines the configuration for PWA webmanifest.
 */
export const manifest: Partial<ManifestOptions> = {
  name: 'Risk Dice Roller',
  short_name: 'Risk Roller',
  description:
    'A simple dice roller for the board game Risk. Roll the dice and see the results of your attack or defense.',
  theme_color: '#eab308',
  background_color: '#ef7244',
  display: 'standalone',
  icons: [
    {
      src: '/android-chrome-192x192.png',
      sizes: '192x192',
      type: 'image/png'
    },
    {
      src: '/android-chrome-512x512.png',
      sizes: '512x512',
      type: 'image/png'
    }
  ]
};
