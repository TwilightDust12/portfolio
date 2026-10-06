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
        obsidian: {
          950: "#050608",
          900: "#090A0F",
          850: "#0D0F17",
          800: "#12141D",
        },
        ethereal: {
          violet: "#A855F7",
          cyan: "#38BDF8",
          lilac: "#C084FC",
          rose: "#F43F5E",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      animation: {
        "aura-slow": "auraDrift 16s ease-in-out infinite alternate",
        "aura-reverse": "auraReverse 20s ease-in-out infinite alternate",
      },
      keyframes: {
        auraDrift: {
          "0%": { transform: "translate(0, 0) scale(1)", opacity: "0.14" },
          "50%": { transform: "translate(40px, -30px) scale(1.1)", opacity: "0.22" },
          "100%": { transform: "translate(-30px, 20px) scale(0.95)", opacity: "0.16" },
        },
        auraReverse: {
          "0%": { transform: "translate(0, 0) scale(1)", opacity: "0.12" },
          "50%": { transform: "translate(-40px, 35px) scale(1.15)", opacity: "0.18" },
          "100%": { transform: "translate(25px, -20px) scale(1)", opacity: "0.14" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
