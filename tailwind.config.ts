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
        canvas: "#08080a",
        surface: {
          950: "#0c0c10",
          900: "#121217",
          850: "#18181f",
          800: "#22222b",
        },
      },
      fontFamily: {
        pixel: ["var(--font-pixel)", "Silkscreen", "monospace"],
        mono: ["var(--font-mono)", "Space Mono", "JetBrains Mono", "monospace"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
