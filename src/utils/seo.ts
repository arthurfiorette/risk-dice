import type { Props } from 'astro-seo';
import { pwaAssetsHead } from 'virtual:pwa-assets/head';
import { PUBLIC_URL } from './url';

export const SeoProps: Props = {
  title: 'Risk Dice Roller',
  description:
    'A simple dice roller for the board game Risk. Roll the dice and see the results of your attack or defense.',
  openGraph: {
    basic: {
      image: `${PUBLIC_URL}/android-chrome-512.png`,
      type: 'website',
      title: 'Risk Dice Roller'
    }
  },
  twitter: {
    creator: '@arthurfiorette'
  },
  extend: {
    link: pwaAssetsHead.links,
    meta: [
      { name: 'msapplication-TileColor', content: '#EF7244' },
      pwaAssetsHead.themeColor!
    ]
  }
};
