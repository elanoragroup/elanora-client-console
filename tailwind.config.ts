import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // Performance optimizations
  future: {
    hoverOnlyWhenSupported: true,
  },
  // Enable JIT mode for faster builds
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1E293B',
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
        accent: {
          DEFAULT: '#C9A227',
          50: '#FEF7E0',
          100: '#FDEFC1',
          200: '#F9E4A8',
          300: '#E5D4A8',
          400: '#D4B84E',
          500: '#C9A227',
          600: '#A68620',
          700: '#836A19',
          800: '#604E12',
          900: '#3D320B',
        },
        neutral: {
          bg: '#F8FAFC',
          white: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(30, 41, 59, 0.04), 0 1px 3px rgba(30, 41, 59, 0.02)',
        'soft-lg': '0 8px 24px rgba(30, 41, 59, 0.08), 0 2px 6px rgba(30, 41, 59, 0.04)',
        'soft-xl': '0 16px 48px rgba(30, 41, 59, 0.12), 0 4px 12px rgba(30, 41, 59, 0.06)',
      },
    },
  },
  plugins: [],
}
export default config

