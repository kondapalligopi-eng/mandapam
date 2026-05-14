/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Royal maroon — the brand primary for ShubhMandap.
        maroon: {
          50:  '#fbf2f3',
          100: '#f6e4e6',
          200: '#ecc1c5',
          300: '#dc8b94',
          400: '#c75664',
          500: '#a8333f',
          600: '#8a232e',
          700: '#6f1c25',
          800: '#591a21',
          900: '#3f1217',
          950: '#240a0d',
        },
        // Festive gold — accent / CTAs / dividers.
        gold: {
          50:  '#fdf9ed',
          100: '#fbf0c8',
          200: '#f6df8e',
          300: '#f0c84f',
          400: '#e6b023',
          500: '#c8901a',
          600: '#a06d15',
          700: '#7a5212',
          800: '#583a0e',
          900: '#3a260a',
        },
        cream: {
          50:  '#fdfbf6',
          100: '#faf5e8',
          200: '#f1e6c8',
          300: '#e5d49a',
          400: '#d4b865',
          500: '#b89c46',
        },
        warm: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
        }
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
