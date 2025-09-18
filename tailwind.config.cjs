/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef9ff",
          100: "#d9f0ff",
          200: "#b8e3ff",
          300: "#88d0ff",
          400: "#54b5ff",
          500: "#2a93ff",
          600: "#1a73e8",
          700: "#185ec1",
          800: "#174b96",
          900: "#153f7b",
        },
      },
    },
  },
  darkMode: "media",
  plugins: [],
};
