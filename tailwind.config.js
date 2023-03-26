const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./pages/**/*.js",
    "./components/**/*.js"
  ],
  safelist: [
    "aspect-w-16",
    "aspect-h-9",
    "text-magenta",
    "text-cyan",
    "text-yellow",
    "text-red"
  ],
  darkMode: "class",
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.neutral,
      magenta: {
        DEFAULT: "#f0f"
      },
      cyan: {
        DEFAULT: "#0ff"
      },
      yellow: {
        DEFAULT: "#f8e61b"
      },
      red: {
        DEFAULT: "#DC2626"
      }
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        sm: "2rem",
        md: "3rem",
        lg: "4rem",
        xl: "5rem"
      }
    },
    fontFamily: {
      sans: ["Sharp Sans", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"]
    },
    extend: {
      screens: {
        "xs": "480px"
      }
    }
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require("@tailwindcss/typography")
  ]
};
