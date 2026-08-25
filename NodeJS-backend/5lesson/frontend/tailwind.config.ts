import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Фирменные цвета Untitled UI (Brand / Primary)
        brand: {
          25: "#f5f8ff",
          50: "#eff4ff",
          100: "#d1e0ff",
          200: "#b2ccff",
          300: "#84adff",
          400: "#528bff",
          500: "#2970ff",
          600: "#1570ef",
          700: "#175cd3",
          800: "#1849a9",
          900: "#194185",
        },
      },
    },
  },
  plugins: [],
};
export default config;