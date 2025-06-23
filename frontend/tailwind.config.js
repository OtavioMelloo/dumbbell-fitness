/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bebas: ["var(--font-bebas)", "Bebas Neue", "sans-serif"],
        roboto: ["var(--font-roboto)", "Roboto", "Arial", "sans-serif"],
      },
      colors: {
        "primary-green": "var(--color-primary-green)",
        "primary-dark-green": "var(--color-primary-dark-green)",
        "primary-light-green": "var(--color-primary-light-green)",
        "secundary-purple": "var(--color-secundary-purple)",
        "secundary-dark-purple": "var(--color-secundary-dark-purple)",
        "secundary-light-purple": "var(--color-secundary-light-purple)",
        white: "var(--color-white)",
        gray: "var(--color-grayp)",
        gray1: "var(--color-gray1)",
        gray2: "var(--color-gray2)",
        gray3: "var(--color-gray3)",
        confirm: "var(--color-confirm)",
        information: "var(--color-information)",
        error: "var(--color-error)",
        warning: "var(--color-warning)",
      },
      borderRadius: {
        4: "var(--radius-4)",
        8: "var(--radius-8)",
        12: "var(--radius-12)",
        16: "var(--radius-16)",
        20: "var(--radius-20)",
        24: "var(--radius-24)",
      },
    },
  },
  plugins: [],
};
