# Ethereal Editorial Personal Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a fully responsive personal portfolio web application with an Ethereal Editorial Hybrid aesthetic featuring 6 chapters (Hero, About with Experience & Education, Projects with detail modal, Tech Stack bento grid, Certifications ledger, and Contact transmission matrix with social channels).

**Architecture:** Next.js 15 App Router architecture driven by a centralized, strictly typed data configuration (`src/data/portfolio.ts`). The UI is composed of modular client/server React components styled with Tailwind CSS, ambient CSS keyframe auras, frosted glassmorphism, and Framer Motion viewport-driven scroll transitions.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS, Framer Motion, Lucide React, Google Fonts (`Playfair Display`, `Plus Jakarta Sans`, `JetBrains Mono`).

---

## File Structure Map

```text
/home/twilight/sideproject/
├── docs/superpowers/
│   ├── specs/2026-10-06-personal-portfolio-design.md
│   └── plans/2026-10-06-personal-portfolio.md
├── public/
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.tsx                # Font variables, metadata, global ambient container
│   │   ├── page.tsx                  # Main single-page scroll layout mounting all chapters
│   │   └── globals.css               # Film grain noise filter, glassmorphism utilities, glow animations
│   ├── components/
│   │   ├── layout/
│   │   │   ├── NavigationBar.tsx     # Floating chapter tracker with mobile drawer & smooth scroll
│   │   │   ├── AmbientBackground.tsx # Radial glow orbs with continuous slow drift
│   │   │   └── Footer.tsx            # Editorial colophon, copyright, back-to-top trigger
│   │   ├── ui/
│   │   │   ├── GlassCard.tsx         # Reusable frosted glass card with subtle border & hover glow
│   │   │   ├── SectionHeader.tsx     # Standardized editorial chapter title, index & subtitle
│   │   │   ├── ProjectModal.tsx      # Interactive expand modal for project architecture details
│   │   │   └── CopyEmailButton.tsx   # Interactive copy-to-clipboard pill with feedback toast
│   │   └── sections/
│   │       ├── HeroSection.tsx       # Chapter 01: Status badge, headline, manifestos, CTAs
│   │       ├── AboutSection.tsx      # Chapter 02: Bio, metrics, experience ledger & education
│   │       ├── ProjectsSection.tsx   # Chapter 03: Editorial projects grid & case study triggers
│   │       ├── TechStackSection.tsx  # Chapter 04: Domain-categorized bento grid & skill badges
│   │       ├── CertificationsSection.tsx # Chapter 05: Editorial credentials ledger & verification links
│   │       └── ContactSection.tsx    # Chapter 06: Transmission hub, email copy pill & social matrix
│   ├── data/
│   │   └── portfolio.ts              # Single source of truth containing all portfolio data
│   └── types/
│       └── portfolio.ts              # TypeScript interfaces for portfolio content
├── .gitignore
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

### Task 1: Project Initialization & Configuration

**Files:**
- Create: `package.json`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.mjs`, `next.config.ts`, `src/app/globals.css`
- Modify: `.gitignore`

- [x] **Step 1: Initialize Next.js project with Tailwind CSS and dependencies**

Run:
```bash
npm init -y
npm install next@latest react@latest react-dom@latest lucide-react framer-motion clsx tailwind-merge
npm install -D typescript @types/node @types/react @types/react-dom tailwindcss@^3.4.1 postcss autoprefixer eslint eslint-config-next
npx tailwindcss init -p
```

- [x] **Step 2: Configure TypeScript (`tsconfig.json`)**

Write `tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [x] **Step 3: Configure Tailwind CSS (`tailwind.config.ts`)**

Write `tailwind.config.ts`:
```typescript
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
```

- [x] **Step 4: Create Next.js configuration and global CSS (`src/app/globals.css`)**

Write `next.config.ts`:
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
```

Write `src/app/globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #090A0F;
  --foreground: #F8FAFC;
}

body {
  background-color: var(--background);
  color: var(--foreground);
  font-family: var(--font-sans), system-ui, sans-serif;
  overflow-x: hidden;
  selection-background-color: rgba(168, 85, 247, 0.3);
  selection-color: #ffffff;
}

/* Glassmorphism helpers */
.glass-panel {
  background: rgba(18, 20, 29, 0.65);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.glass-panel-hover {
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
.glass-panel-hover:hover {
  background: rgba(22, 25, 37, 0.75);
  border-color: rgba(168, 85, 247, 0.35);
  box-shadow: 0 10px 30px -10px rgba(168, 85, 247, 0.15);
}

/* Subtle Film Grain Noise Overlay */
.noise-overlay {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E");
}
```

- [x] **Step 5: Verify build works**

Run: `npx next build`
Expected: Build passes with zero errors.

- [x] **Step 6: Commit initialization**

```bash
git add package.json tsconfig.json tailwind.config.ts postcss.config.mjs next.config.ts src/app/globals.css
git commit -m "chore: initialize next.js 15 with tailwind and ethereal theme tokens"
```

---

### Task 2: Type System & Centralized Data Engine

**Files:**
- Create: `src/types/portfolio.ts`
- Create: `src/data/portfolio.ts`

- [x] **Step 1: Write TypeScript interfaces (`src/types/portfolio.ts`)**

```typescript
export interface SocialLink {
  platform: 'github' | 'linkedin' | 'instagram' | 'facebook' | 'email' | string;
  label: string;
  url: string;
  username: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  tags: string[];
  featured: boolean;
  image?: string;
  demoUrl?: string;
  githubUrl?: string;
  highlights: string[];
}

export interface SkillItem {
  name: string;
  level?: 'Proficient' | 'Advanced' | 'Familiar';
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: SkillItem[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location?: string;
  description: string[];
  technologies: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  location?: string;
  honors?: string;
  details?: string[];
}

export interface PortfolioConfig {
  personal: {
    name: string;
    title: string;
    tagline: string;
    bioParagraphs: string[];
    location: string;
    email: string;
    availability: string;
  };
  socials: SocialLink[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
  skills: SkillCategory[];
  certifications: Certification[];
}
```

- [x] **Step 2: Create initial portfolio data (`src/data/portfolio.ts`)**

Populate `src/data/portfolio.ts` with authentic, rich placeholder content reflecting fullstack development, systems, Linux, creative tools, and social channels (GitHub, LinkedIn, Instagram, Facebook).

- [x] **Step 3: Verify type checking**

Run: `npx tsc --noEmit`
Expected: 0 errors.

- [x] **Step 4: Commit data layer**

```bash
git add src/types/portfolio.ts src/data/portfolio.ts
git commit -m "feat: add typed portfolio configuration and initial data schema"
```

---

### Task 3: Atmospheric Base Layout & Ambient Aura Canvas

**Files:**
- Create: `src/components/layout/AmbientBackground.tsx`
- Create: `src/components/ui/GlassCard.tsx`
- Create: `src/components/ui/SectionHeader.tsx`
- Modify: `src/app/layout.tsx`

- [x] **Step 1: Create `AmbientBackground.tsx`**
  Implements multi-layered radial gradients with fixed position, pointer-events-none, smooth CSS keyframe breathing animations, and film-grain noise texture.

- [x] **Step 2: Create `GlassCard.tsx`**
  Reusable container component with `glass-panel glass-panel-hover`, optional glowing top border, and Framer Motion hover state.

- [x] **Step 3: Create `SectionHeader.tsx`**
  Standardized editorial header featuring chapter index (`[01] // PROLOGUE`), high-contrast Playfair serif title, and subtle subtitle.

- [x] **Step 4: Configure `src/app/layout.tsx`**
  Configures Google Fonts (`Playfair_Display`, `Plus_Jakarta_Sans`, `JetBrains_Mono`), page metadata (title, description, OpenGraph), and wraps children inside the ambient background container.

- [x] **Step 5: Verify build**

Run: `npx next build`
Expected: Passes without errors.

- [x] **Step 6: Commit base layout**

```bash
git add src/components/layout/AmbientBackground.tsx src/components/ui/GlassCard.tsx src/components/ui/SectionHeader.tsx src/app/layout.tsx
git commit -m "feat: add ambient background, glass cards, and editorial layout fonts"
```

---

### Task 4: Floating Chapter Navigation & Epilogue Footer

**Files:**
- Create: `src/components/layout/NavigationBar.tsx`
- Create: `src/components/layout/Footer.tsx`

- [x] **Step 1: Create `NavigationBar.tsx`**
  - Uses `IntersectionObserver` to highlight the current active chapter in real time as the user scrolls (`#hero`, `#about`, `#projects`, `#tech`, `#certifications`, `#contact`).
  - Includes smooth scroll anchor navigation.
  - Features quick-access social icon links.
  - Includes a mobile-friendly slide-over menu for small screens.

- [x] **Step 2: Create `Footer.tsx`**
  - Editorial magazine colophon.
  - Quick back-to-top button with smooth scroll.
  - Copyright and timestamp display.

- [x] **Step 3: Verify build**

Run: `npx next build`
Expected: Passes without errors.

- [x] **Step 4: Commit navigation and footer**

```bash
git add src/components/layout/NavigationBar.tsx src/components/layout/Footer.tsx
git commit -m "feat: add floating chapter navigation bar and editorial footer"
```

---

### Task 5: Chapter 01 — Hero Section

**Files:**
- Create: `src/components/sections/HeroSection.tsx`
- Modify: `src/app/page.tsx`

- [x] **Step 1: Implement `HeroSection.tsx`**
  - Displays status badge (`● Available for select opportunities`).
  - Large serif title with italicized typography and gradient highlight.
  - Editorial sub-manifesto describing design and technical philosophy.
  - Call-to-action buttons: *"Explore Works ↘"* (scrolls to `#projects`) and *"Initiate Transmission ✦"* (scrolls to `#contact`).
  - Quick social links row with subtle hover glow.

- [x] **Step 2: Mount Hero in `src/app/page.tsx`**

- [x] **Step 3: Verify build**

Run: `npx next build`
Expected: Passes without errors.

- [x] **Step 4: Commit hero section**

```bash
git add src/components/sections/HeroSection.tsx src/app/page.tsx
git commit -m "feat: implement chapter 01 hero section"
```

---

### Task 6: Chapter 02 — About Me, Experience & Education

**Files:**
- Create: `src/components/sections/AboutSection.tsx`
- Modify: `src/app/page.tsx`

- [x] **Step 1: Implement `AboutSection.tsx`**
  - **Subsection 02.1 Profile:** Bio narrative, stylized pull-quote, avatar glow ring, location, and key metric badges.
  - **Subsection 02.2 Experience Ledger:** Chronological timeline cards displaying role, company, period, responsibilities, and tech tags.
  - **Subsection 02.3 Education & Academia:** Degree, institution, academic honors, and coursework cards.

- [x] **Step 2: Mount AboutSection in `src/app/page.tsx`**

- [x] **Step 3: Verify build**

Run: `npx next build`
Expected: Passes without errors.

- [x] **Step 4: Commit about section**

```bash
git add src/components/sections/AboutSection.tsx src/app/page.tsx
git commit -m "feat: implement chapter 02 about section with experience and education"
```

---

### Task 7: Chapter 03 — Projects Showcase & Interactive Modal

**Files:**
- Create: `src/components/ui/ProjectModal.tsx`
- Create: `src/components/sections/ProjectsSection.tsx`
- Modify: `src/app/page.tsx`

- [x] **Step 1: Implement `ProjectModal.tsx`**
  - Built with Framer Motion `AnimatePresence`.
  - Accessible dialog with Escape key listener, backdrop blur click-to-close, and close button.
  - Full project architecture writeup, highlights checklist, tech stack tags, and outbound live demo / GitHub links.

- [x] **Step 2: Implement `ProjectsSection.tsx`**
  - Asymmetric editorial grid showcasing featured projects.
  - Card hover effects with glowing borders and outbound links.
  - *"Architecture & Case Study ✦"* button triggers modal.

- [x] **Step 3: Mount ProjectsSection in `src/app/page.tsx`**

- [x] **Step 4: Verify build**

Run: `npx next build`
Expected: Passes without errors.

- [x] **Step 5: Commit projects section**

```bash
git add src/components/ui/ProjectModal.tsx src/components/sections/ProjectsSection.tsx src/app/page.tsx
git commit -m "feat: implement chapter 03 projects showcase with case study modal"
```

---

### Task 8: Chapter 04 — Tech Stack Bento Grid

**Files:**
- Create: `src/components/sections/TechStackSection.tsx`
- Modify: `src/app/page.tsx`

- [x] **Step 1: Implement `TechStackSection.tsx`**
  - Categorized bento grid:
    1. Languages & Core
    2. Frontend & UI
    3. Backend & Databases
    4. Systems, Linux & Tools
  - Frosted pills with Lucide icons, skill labels, and subtle hover illumination.

- [x] **Step 2: Mount TechStackSection in `src/app/page.tsx`**

- [x] **Step 3: Verify build**

Run: `npx next build`
Expected: Passes without errors.

- [x] **Step 4: Commit tech stack section**

```bash
git add src/components/sections/TechStackSection.tsx src/app/page.tsx
git commit -m "feat: implement chapter 04 tech stack bento grid"
```

---

### Task 9: Chapter 05 — Certifications & Milestones

**Files:**
- Create: `src/components/sections/CertificationsSection.tsx`
- Modify: `src/app/page.tsx`

- [x] **Step 1: Implement `CertificationsSection.tsx`**
  - Editorial ledger cards for verified certifications.
  - Displays issuer, title, issue date, credential ID, and direct verification link (`Verify Credential ↗`).
  - Shield/Award icons with ethereal starlight glow.

- [x] **Step 2: Mount CertificationsSection in `src/app/page.tsx`**

- [x] **Step 3: Verify build**

Run: `npx next build`
Expected: Passes without errors.

- [x] **Step 4: Commit certifications section**

```bash
git add src/components/sections/CertificationsSection.tsx src/app/page.tsx
git commit -m "feat: implement chapter 05 certifications ledger"
```

---

### Task 10: Chapter 06 — Contact Transmission Hub & Social Matrix

**Files:**
- Create: `src/components/ui/CopyEmailButton.tsx`
- Create: `src/components/sections/ContactSection.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Implement `CopyEmailButton.tsx`**
  - Interactive email pill with copy-to-clipboard functionality via `navigator.clipboard`.
  - Toast visual state (*"Copied to clipboard ✓"* with glowing purple ring).
  - Fallback prompt if clipboard permission is restricted.

- [ ] **Step 2: Implement `ContactSection.tsx`**
  - Editorial header: *"Initiate Transmission"*.
  - Prominent quick-copy email action pill.
  - **Social Channels Matrix:** Frosted glass cards for **GitHub**, **LinkedIn**, **Instagram**, and **Facebook**, each with platform icon, handle, description, and outbound arrow (`↗`).

- [ ] **Step 3: Mount ContactSection in `src/app/page.tsx`**

- [ ] **Step 4: Verify build**

Run: `npx next build`
Expected: Passes without errors.

- [ ] **Step 5: Commit contact section**

```bash
git add src/components/ui/CopyEmailButton.tsx src/components/sections/ContactSection.tsx src/app/page.tsx
git commit -m "feat: implement chapter 06 contact section and social channels matrix"
```

---

### Task 11: End-to-End Polish, Responsiveness & Verification

**Files:**
- Audit & Verify: all components in `src/`

- [ ] **Step 1: Type check entire project**

Run: `npx tsc --noEmit`
Expected: 0 errors.

- [ ] **Step 2: Run production Next.js build**

Run: `npm run build`
Expected: Successful static compilation of all routes.

- [ ] **Step 3: Responsive audit across breakpoints**
  - Mobile (<640px): verify single-column stacking, mobile navigation drawer, and touch targets.
  - Tablet (768px): verify 2-column bento grids.
  - Desktop (1280px): verify full editorial magazine spread and sticky chapter navigation.

- [ ] **Step 4: Test user interactions**
  - Verify smooth chapter navigation clicking jumps to correct sections.
  - Test Project Modal open, close with Esc, and backdrop click.
  - Test Copy Email button triggers feedback toast.
  - Confirm all external social links open with `rel="noopener noreferrer"`.

- [ ] **Step 5: Final git commit**

```bash
git add .
git commit -m "feat: complete ethereal editorial portfolio implementation"
```
