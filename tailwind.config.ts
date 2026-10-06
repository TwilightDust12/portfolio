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
        studio: {
          950: "#09090b",
          900: "#101014",
          850: "#16161a",
          800: "#202024",
          700: "#2b2b32",
          600: "#3f3f46",
        },
        ivory: {
          50: "#fafafa",
          100: "#f4f4f5",
          200: "#e4e4e7",
          300: "#d4d4d8",
          400: "#a1a1aa",
        },
        accent: {
          warm: "#d4a359",
          amber: "#e2b876",
          silver: "#e4e4e7",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Newsreader", "Shippori Mincho", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "Space Mono", "JetBrains Mono", "monospace"],
      },
      transitionTimingFunction: {
        "out-ui": "cubic-bezier(0.23, 1, 0.32, 1)",
        "in-out-ui": "cubic-bezier(0.77, 0, 0.175, 1)",
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "spring": "cubic-bezier(0.175, 0.885, 0.32, 1.1)",
      },
    },
  },
  plugins: [],
};

export default config;
