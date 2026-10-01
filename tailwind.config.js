/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        teal: {
          950: "#06201d",
          900: "#0a2b28",
          800: "#0f3d3a",
          700: "#175350",
          600: "#206a66",
        },
        rose: {
          300: "#e8bfae",
          400: "#d9a08c",
          500: "#c48370",
          600: "#b2705c",
        },
        ivory: { DEFAULT: "#faf5f0", 100: "#f3ebe3", 200: "#e8ddd1" },
        charcoal: { DEFAULT: "#2b3133", 800: "#1f2527", 900: "#151a1b" },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', "Georgia", "serif"],
        sans: ["Jost", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "rose-gold":
          "linear-gradient(135deg, #f0cdbd 0%, #d9a08c 38%, #b2705c 70%, #e4b4a1 100%)",
      },
      keyframes: {
        wallUp: {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(-50%)" },
        },
        wallDown: {
          from: { transform: "translateY(-50%)" },
          to: { transform: "translateY(0)" },
        },
        twinkle: {
          "0%,100%": { opacity: "0.35", transform: "scale(0.85)" },
          "50%": { opacity: "1", transform: "scale(1.1)" },
        },
      },
      animation: {
        "wall-up": "wallUp 60s linear infinite",
        "wall-up-slow": "wallUp 85s linear infinite",
        "wall-down": "wallDown 70s linear infinite",
        twinkle: "twinkle 3.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
