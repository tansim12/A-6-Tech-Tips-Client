// tailwind.config.js
import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // ...
    // make sure it's pointing to the ROOT node_module
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#0866ff", // your base color
        lightText: "#000000", // black text for light mode
        darkText: "#ffffff", // white text for dark mode
        default:"#000000"
      },
    },
  },
  darkMode: "class", // enables class-based dark mode
  plugins: [nextui()],
};
