/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx,jsx}"],
  theme: {
    extend: {
      colors: {
        green: "#49af03",
        red: "#e12200",
        lightgrey: "#ccc",
        darkgrey: "#333",
      },
    },
  },
  plugins: [],
};
