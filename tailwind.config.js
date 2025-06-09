/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Norzek"', 'sans-serif'],
        body: ['"Forest Trophy Rounded"', 'sans-serif'],
        textured: ['"Forest Trophy Textured"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};