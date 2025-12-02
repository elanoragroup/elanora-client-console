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
          DEFAULT: '#0E2F5A',
          50: '#E8EDF4',
          100: '#D1DBE9',
          200: '#A3B7D3',
          300: '#7593BD',
          400: '#476FA7',
          500: '#0E2F5A',
          600: '#0B2648',
          700: '#081C36',
          800: '#061324',
          900: '#030912',
        },
        accent: {
          DEFAULT: '#F5B400',
          50: '#FEF7E0',
          100: '#FDEFC1',
          200: '#FCDF83',
          300: '#FACF45',
          400: '#F5B400',
          500: '#C79000',
          600: '#996C00',
          700: '#6B4800',
          800: '#3D2400',
          900: '#0F0000',
        },
        neutral: {
          bg: '#F8FAFC',
          white: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
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
        'soft': '0 2px 8px rgba(14, 47, 90, 0.04), 0 1px 3px rgba(14, 47, 90, 0.02)',
        'soft-lg': '0 8px 24px rgba(14, 47, 90, 0.08), 0 2px 6px rgba(14, 47, 90, 0.04)',
        'soft-xl': '0 16px 48px rgba(14, 47, 90, 0.12), 0 4px 12px rgba(14, 47, 90, 0.06)',
      },
    },
  },
  plugins: [],
}
export default config

