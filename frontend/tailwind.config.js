/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        terracotta: '#C4713A',
        cream: '#FDF6EC',
        'cream-dark': '#F0E6D3',
        sage: '#5A7A5E',
        'sage-dark': '#3D5940',
        bark: '#2C1A0E',
        'bark-light': '#6B4226',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
