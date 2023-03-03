/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryColor: "rgba(240, 200, 180, 1)",
        primaryColorFade: "rgba(240, 200, 180, 0)",
        primaryColor100: "rgba(228, 200, 180, 1)",
        primaryColor200: "rgba(215, 200, 180, 1)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
