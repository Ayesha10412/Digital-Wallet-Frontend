import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      fontFamily: {
        serif: ["Cambria", '"Times New Roman"', "Times", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        gold: {
          400: "#FFD700", // adds support for to-gold-400
        },
        blue: {
          400: "#2563EB", // professional fintech blue
        },
      },
    },
  },
};

export default config;
