# Jose Raphael Jaro (Twilight) · Portfolio

> Neo-Tokyo Cyber-Editorial developer portfolio engineered with Next.js 16, React 19, Tailwind CSS, and Catppuccin dual themes.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Theme](https://img.shields.io/badge/Theme-Catppuccin%20(Latte%20%2F%20Mocha)-cba6f7?style=flat-square)](https://github.com/catppuccin/catppuccin)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald?style=flat-square)](LICENSE)

**Live Production:** [https://sideproject-rosy.vercel.app](https://sideproject-rosy.vercel.app)

---

## Overview

Personal web portfolio for **Jose Raphael Jaro (Twilight)**, an aspiring full-stack developer and systems enthusiast based in Lucena City, Philippines. Built specifically to showcase hands-on production engineering, thesis capstone architecture, and Linux environment craft for On-the-Job Training (OJT) and software engineering internships.

The design fuses **Swiss typographic print**, **Japanese editorial framing**, and **Wayland Linux telemetry** into a fluid, tactile web experience.

---

## Highlights & Features

- **Catppuccin Dual Theme Engine:** Hand-calibrated Latte (Light) and Mocha (Dark) palettes with verified WCAG AA contrast (4.8:1+ on light, 8.1:1+ on dark accent buttons).
- **Waybar & Telemetry Dock:** Floating top bar on desktop modeled after Wayland/Hyprland status bars, with a live hydration-safe Manila (PHT) clock and dynamic mobile bottom navigation dock.
- **Interactive Avatar Matrix:** Profile card with click-to-cycle photo sequence and an 8x8 pixel mosaic glitch transition.
- **4-Line Structured Case Studies:** Standardized project breakdowns (*Problem*, *Role*, *Stack*, *Outcome*) with accessible Radix Dialog deep-dive modals.
- **Strictly Verified Tech Arsenal:** Categorized index of languages, frameworks, databases, and testing tools with hands-on production or thesis experience.
- **Physical Motion Engineering:** Emil Kowalski and Apple Design easing physics (`--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`), tactile `:active` press feedback, and zero cartoonish bounce curves.
- **Tactile Clipboard Actions:** One-click copy for email and Discord handle with instant Sonner toast notifications.
- **Accessibility & Touch Ergonomics:** Semantic HTML5 landmarks, global `:focus-visible` rings, accessible skip link, and 44x44px minimum touch hit targets.

---

## Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **UI Library** | React 19, TypeScript |
| **Styling** | Tailwind CSS 3.4, Custom CSS Tokens, PostCSS |
| **Theme System** | `next-themes` (Catppuccin Latte & Mocha) |
| **Accessible Primitives** | `@radix-ui/react-dialog` |
| **Typography** | `next/font` (JetBrains Mono, Plus Jakarta Sans, Noto Sans JP) |
| **Feedback** | `sonner` (Toast notifications) |
| **Icons** | `lucide-react` |
| **Deployment** | Vercel |

---

## Featured Projects

1. **WebC (Student Clearance System)** · STI College Lucena Thesis Capstone  
   Centralized multi-role web portal eliminating manual paper clearance queues with automated approval pipelines, Supabase database, and institutional Microsoft Azure MSAL login.
2. **Sphere8 Construction Portal** · Commercial Client Portal  
   Corporate web platform featuring structured showcase galleries and direct service inquiry funnels.
3. **All About Lily Chou-Chou Portfolio** · Ambient Sound Archive  
   Atmospheric web archive integrating real-time Web Audio API ambient sound synthesis, filmic scanlines, and retro typography.
4. **Wayland Rice & Dotfiles** · CachyOS / Hyprland Environment  
   Custom Wayland desktop rice featuring dynamic Pywal wallpaper color extraction, custom Waybar CSS, and low-latency PipeWire audio routing.

---

## Project Structure

```text
sideproject/
├── content/
│   └── about.md               # Source of truth for portfolio data
├── public/
│   ├── assets/                # Visual media, avatars, and icons
│   └── cv.pdf                 # Curriculum Vitae download file
├── src/
│   ├── app/
│   │   ├── globals.css        # Theme variables, easing tokens, and base styles
│   │   ├── layout.tsx         # Root layout, fonts, and skip link
│   │   ├── not-found.tsx      # Custom Catppuccin 404 page
│   │   └── page.tsx           # Main page assembling all chapters
│   ├── components/
│   │   ├── layout/
│   │   │   ├── ColophonFooter.tsx   # System specs, commit telemetry, copyright
│   │   │   └── WaybarHeader.tsx     # Waybar desktop bar & mobile bottom dock
│   │   ├── providers/
│   │   │   └── ThemeProvider.tsx    # next-themes wrapper
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx      # Chapter 01: Hero & framed portrait
│   │   │   ├── ChronicleSection.tsx # Chapter 02: Academia & rice spec sheet
│   │   │   ├── ProjectsSection.tsx  # Chapter 03: Selected works & modal
│   │   │   ├── ArsenalSection.tsx   # Chapter 04: Verified tech bento grid
│   │   │   └── ContactSection.tsx   # Chapter 05: Transmission & social matrix
│   │   └── ui/
│   │       ├── CopyEmailButton.tsx  # Clipboard copy action with toast
│   │       ├── Icons.tsx            # Custom brand SVGs (GitHub, LinkedIn, etc.)
│   │       ├── ManilaClock.tsx      # Live hydration-safe PHT clock
│   │       ├── ProjectModal.tsx     # Radix Dialog case study modal
│   │       ├── RiceSpecSheet.tsx    # Fastfetch terminal spec card
│   │       ├── SwissFrame.tsx       # Hairline container with corner calipers
│   │       └── ThemeToggle.tsx      # Dual theme switch with fluid rotation
│   ├── data/
│   │   └── portfolio.ts       # Typed portfolio content store
│   └── types/
│       └── portfolio.ts       # TypeScript domain interfaces
├── package.json
└── tsconfig.json
```

---

## Getting Started

### Prerequisites

- Node.js 20+ (Node.js 22+ recommended)
- npm or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/TwilightDust12/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the local development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

---

## Author & Contact

**Jose Raphael Jaro (Twilight)**  
Aspiring Full-Stack Developer · Lucena City, Quezon Province, Philippines

- **Email:** [jyrum12@gmail.com](mailto:jyrum12@gmail.com)
- **GitHub:** [@TwilightDust12](https://github.com/TwilightDust12)
- **LinkedIn:** [jose-raphael-jaro](https://linkedin.com/in/jose-raphael-jaro)
- **Discord:** `twilightdust`

---

## License

This project is open-source under the [MIT License](LICENSE).
