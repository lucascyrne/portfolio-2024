import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        text: '#0C0809',
        background: '#FDFCFC',
        'primary-light': '#D98A97',
        primary: '#B65466',
        'primary-dark': '#8C3A4B',
        secondary: '#E09EAA',
        accent: 'rgb(244, 96, 123)',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        inria: ['Inria Serif', 'serif'],
      },
      fontSize: {
        xsm: ['0.563rem', { lineHeight: '1.5' }],
        sm: ['0.75rem', { lineHeight: '1.5' }],
        base: ['1rem', { lineHeight: '1.5' }],
        lg: ['1.333rem', { lineHeight: '1.5' }],
        xl: ['1.777rem', { lineHeight: '1.5' }],
        '2xl': ['2.369rem', { lineHeight: '1.5' }],
        '3xl': ['3.157rem', { lineHeight: '1.5' }],
        '4xl': ['4.209rem', { lineHeight: '1.5' }],
      },
      backgroundImage: {
        'nebula-vignette': `radial-gradient(circle, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0) 100%), url('/assets/images/nebulosa.webp')`,
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
      animation: {
        'fade-in': 'fade-in 1.6s ease-in-out',
        'fade-in-xs': 'fade-in 0.8s ease-in-out',
        'fade-out': 'fade-out 1.6s ease-in-out',
      },
    },
  },
  plugins: [],
};
export default config;
