import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#FAF8F5',
        surface: '#FFFFFF',
        'surface-warm': '#F2EDE6',
        border: '#E8E2D9',
        'border-dark': '#C8BFB0',
        accent: {
          DEFAULT: '#8B7355',
          light: '#B5956A',
          dark: '#6A5840',
        },
        dark: '#1A1714',
        'text-main': '#2D2926',
        muted: '#6B6459',
        stone: '#9E9189',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Montserrat', '"Helvetica Neue"', 'sans-serif'],
        body: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'subtle': '0 2px 20px rgba(0,0,0,0.06)',
        'card': '0 4px 30px rgba(0,0,0,0.08)',
        'card-hover': '0 8px 40px rgba(0,0,0,0.12)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'marquee': 'marquee 20s linear infinite',
        'marquee-reverse': 'marquee-reverse 20s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-red': 'pulse-red 2s ease-in-out infinite',
        'glitch': 'glitch 3s infinite',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-red': {
          '0%, 100%': { boxShadow: '0 0 10px rgba(255,0,0,0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(255,0,0,0.8)' },
        },
        glitch: {
          '0%, 95%, 100%': { transform: 'translate(0)' },
          '96%': { transform: 'translate(-2px, 1px)' },
          '97%': { transform: 'translate(2px, -1px)' },
          '98%': { transform: 'translate(-1px, 2px)' },
          '99%': { transform: 'translate(1px, -2px)' },
        },
        scanline: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 100vh' },
        },
      },
    },
  },
  plugins: [],
}

export default config
