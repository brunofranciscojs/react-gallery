/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./contexts/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'xxs': '500px',
      'sm': '640px',
      'md': '768px',
      'cl': '960px',
      'lg': '1024px',
      'xl': '1280px',
      'lpt': '1366px',
      '1xl': '1450px',
      '2xl': '1536px',
    },
  },
  plugins: [],
}

