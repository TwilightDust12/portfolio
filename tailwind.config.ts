import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        ink: "var(--ink)",
        "ink-dark": "var(--ink-dark)",
        "card-bg": "var(--card-bg)",
        "card-border": "var(--card-border)",
        "card-border-subtle": "var(--card-border-subtle)",
        "accent-text": "var(--accent-text)",
        "accent-pink": "var(--accent-pink)",
        "accent-sky": "var(--accent-sky)",
        "accent-peach": "var(--accent-peach)",
        "accent-green": "var(--accent-green)",
        "accent-sapphire": "var(--accent-sapphire)",
        "on-accent": "var(--on-accent)",
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
