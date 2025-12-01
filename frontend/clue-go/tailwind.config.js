/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class", "media"],
  content: [
    "./index.html",
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
      },
      fontFamily: {
        sans: ["Nunito", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
