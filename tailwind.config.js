/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hasaki: {
          dark: '#1b4d3e',
          DEFAULT: '#276347',
          light: '#357a58',
          sage: '#8ba699',
          input: '#91aca0',
          bg: '#eef5f1',
          accent: '#0d3826'
        }
      },
      fontFamily: {
        sans: ['"Inter"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
