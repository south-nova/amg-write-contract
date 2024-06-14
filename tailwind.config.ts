import scrollHide from 'tailwind-scrollbar-hide';
import { Config } from 'tailwindcss';
import tailwindAnimate from 'tailwindcss-animate';

const pxToRem = (px: number, base = 16) => `${px / base}rem`;
const range = (start: number, end: number, unit = 1) => {
  const length = Math.ceil((end - start) / unit + 1);
  return Array.from({ length }, (_, i) => start + i * unit);
};

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: { mobile: '768px', tablet: '1024px' },
    colors: {
      transparent: 'transparent',
      currentColor: 'currentColor',
      white: '#fff',
      black: '#121212',
      ring: 'var(--ring)',
      background: 'var(--background)',
      foreground: {
        DEFAULT: 'var(--foreground)',
        muted: 'var(--foreground-muted)',
      },
      surface: {
        DEFAULT: 'var(--surface)',
        accent: 'var(--surface-accent)',
        foreground: 'var(--surface-foreground)',
      },
      primary: {
        DEFAULT: 'var(--primary)',
        accent: 'var(--primary-accent)',
        surface: 'var(--primary-surface)',
        foreground: 'var(--primary-foreground)',
      },
      secondary: {
        DEFAULT: 'var(--secondary)',
        accent: 'var(--secondary-accent)',
        foreground: 'var(--secondary-foreground)',
      },
      border: {
        DEFAULT: 'var(--border)',
        accent: 'var(--border-accent)',
      },
      card: {
        DEFAULT: 'var(--card)',
        foreground: 'var(--card-foreground)',
      },
    },
    extend: {
      spacing: {
        ...range(1, 100).reduce((acc: { [key: string]: string }, px) => {
          acc[`${px}pxr`] = pxToRem(px);
          return acc;
        }, {}),
      },
      listStyleType: {
        circle: 'circle',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [tailwindAnimate, scrollHide],
};
export default config;
