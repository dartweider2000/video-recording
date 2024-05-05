/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx,scss}"],
  theme: {
    extend: {
      screens: {
        "max-md": { max: "768px" },
      },
    },
  },
  plugins: [],
};
