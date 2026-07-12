/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: "#FBF3E0",
          100: "#F5E4B8",
          200: "#EDD088",
          300: "#E4BC58",
          400: "#DCAD3D",
          500: "#D4AF37",
          600: "#B8941F",
          700: "#8F7118",
          800: "#665111",
          900: "#3D310A",
        },
        ink: {
          950: "#0B0B0D",
          900: "#121214",
          800: "#1A1A1D",
          700: "#242427",
          600: "#333336",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
      },
      keyframes: {
        "slow-zoom": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.12)" },
        },
      },
      animation: {
        "slow-zoom": "slow-zoom 18s ease-out infinite alternate",
      },
    },
  },
  plugins: [],
};
