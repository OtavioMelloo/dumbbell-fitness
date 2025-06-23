/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-roboto)", "sans-serif"],
        bebas: ["var(--font-bebas)", "cursive"],
      },
      colors: {
        dumbCinza: "#1c1c1c",
      },
    },
  },
  plugins: [],
};
