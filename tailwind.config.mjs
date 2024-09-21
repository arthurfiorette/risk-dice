import tailwindScrollbar from 'tailwind-scrollbar';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      height: {
        screen: ['100vh', '100dvh']
      },
      animation: {
        grow: 'grow 100ms ease-in-out'
      },
      keyframes: {
        grow: {
          '0%': { maxWidth: '0' },
          '100%': { maxWidth: '100%' }
        }
      }
    }
  },
  plugins: [tailwindScrollbar]
};
