# Design Specification: Ethereal Editorial Personal Portfolio

## Overview
A responsive, high-performance personal portfolio web application built with an **Ethereal Editorial Hybrid** aesthetic. The design marries high-fashion editorial magazine layouts (sharp typographic hierarchy, high-contrast serif headlines, numbered chapter indices, structured multi-column grids) with dreamy ethereal atmosphere (deep obsidian void, soft violet and cyan radiant ambient auras, frosted glassmorphism, and smooth Framer Motion interactions).

The portfolio features a single-page smooth scroll architecture with chapter tracking and includes dedicated sections for **Home (Hero)**, **About Me**, **Projects Showcase** (with an interactive detail modal), **Tech Stack** (categorized bento grid), **Certifications & Milestones**, and an **Editorial Contact & Social Matrix** (featuring GitHub, LinkedIn, Instagram, Facebook, and a one-click copyable email action).

---

## Technical Stack & Architecture

### Core Dependencies
* **Framework:** Next.js 15 (React 19, App Router)
* **Styling:** Tailwind CSS with custom ethereal design tokens
* **Animations:** Framer Motion (viewport-triggered scroll reveals, ambient glow pulsation, modal springs)
* **Iconography:** `lucide-react`
* **Typography (`next/font/google`):**
  * *Editorial Serif (Headings & Accents):* `Playfair Display`
  * *Sans-Serif (Body & UI):* `Plus Jakarta Sans`
  * *Monospace (Indices & Badges):* `JetBrains Mono`

### Directory Structure
```text
/home/twilight/sideproject/
├── docs/
│   └── superpowers/
│       └── specs/
│           └── 2026-10-06-personal-portfolio-design.md
├── public/
│   ├── images/
│   └── certs/
├── src/
│   ├── app/
│   │   ├── layout.tsx                # Global HTML structure, font variables, ambient canvas
│   │   ├── page.tsx                  # Single-page assembly of sections
│   │   └── globals.css               # Noise texture, custom aura keyframes, glass utilities
│   ├── components/
│   │   ├── layout/
│   │   │   ├── NavigationBar.tsx     # Floating chapter indicator & smooth anchor links
│   │   │   ├── AmbientBackground.tsx # Radial glow orbs with subtle continuous drift
│   │   │   └── Footer.tsx            # Epilogue, copyright, back-to-top trigger
│   │   ├── ui/
│   │   │   ├── GlassCard.tsx         # Reusable frosted glass container with glow border
│   │   │   ├── SectionHeader.tsx     # Standardized editorial chapter title & index
│   │   │   ├── ProjectModal.tsx      # Interactive expand modal for project deep-dives
│   │   │   └── CopyEmailButton.tsx   # Interactive copy-to-clipboard pill with toast feedback
│   │   └── sections/
│   │       ├── HeroSection.tsx       # Chapter 01: Hero / Headline / Manifestos
│   │       ├── AboutSection.tsx      # Chapter 02: Narrative bio & highlight metrics
│   │       ├── ProjectsSection.tsx   # Chapter 03: Editorial projects grid & tags
│   │       ├── TechStackSection.tsx  # Chapter 04: Bento grid categorized by domain
│   │       ├── CertificationsSection.tsx # Chapter 05: Credentials & verification links
│   │       └── ContactSection.tsx    # Chapter 06: Transmission hub & social channels matrix
│   ├── data/
│   │   └── portfolio.ts              # Single source of truth containing all portfolio content
│   └── types/
│       └── portfolio.ts              # TypeScript interfaces for profile, projects, certs, skills
├── .gitignore
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## Visual Design & Atmospheric System

### 1. Palette & Surface Tokens
* **Background Primary:** `#090A0F` (Obsidian void with faint film-grain SVG noise filter)
* **Card Surface:** `rgba(18, 20, 29, 0.65)` with `backdrop-blur-xl` and `border border-white/[0.08]`
* **Card Hover State:** Border transitions to `rgba(168, 85, 247, 0.35)` with an ambient soft box shadow
* **Ambient Lighting Halos:**
  * Primary Aura: Radiant Violet (`rgba(168, 85, 247, 0.16)`)
  * Secondary Aura: Starlight Azure / Cyan (`rgba(56, 189, 248, 0.12)`)
  * Tertiary Accent: Soft Rose / Lilac (`rgba(244, 114, 182, 0.10)`)
* **Typography Colors:**
  * Headline / Hero Titles: `#F8FAFC` (pure crisp white) with subtle gradient text mask
  * Body Copy: `#94A3B8` (muted slate-zinc)
  * Chapter Indices & Subtitles: `#C084FC` (ethereal purple) and `#64748B` (cool slate)

### 2. Motion Design
* **Ambient Breathing:** Subtle continuous CSS animation (`scale` 1.0 to 1.08, `opacity` 0.8 to 1.0) on background aura blobs across 14-second loops.
* **Scroll Entry:** Framer Motion `motion.div` containers triggering when 20% into view (`y: 20 -> 0`, `opacity: 0 -> 1`, duration: 0.6s, ease: "easeOut").
* **Card Hover:** Subtle upward translation (`y: -3px`) and border highlight.
* **Modal Motion:** AnimatePresence with backdrop blur transition and scale-in dialog animation (`scale: 0.96 -> 1`).

---

## Component Specifications

### 1. Floating Navigation (`NavigationBar.tsx`)
* Fixed top navbar with `backdrop-blur-md` and rounded pill or editorial edge.
* Active section observer (`IntersectionObserver`) dynamically highlights the current active chapter:
  * `01 // INTRO`
  * `02 // BIO`
  * `03 // WORKS`
  * `04 // TECH`
  * `05 // CERTS`
  * `06 // TRANSMISSION`
* Includes quick-access social links and a mobile dropdown navigation drawer for smaller viewports.

### 2. Chapter 01: Hero (`HeroSection.tsx`)
* **Editorial Headline:** Large serif typography (`Playfair Display`) with mixed italicized emphasis (e.g., *"Crafting Digital Systems in the Ambient Ether"*).
* **Status Pill:** Glowing indicator: `● Available for select opportunities`.
* **Action Row:**
  * Primary Button: *"Explore Works ↘"* (smooth scrolls to `#projects`)
  * Secondary Button: *"Initiate Transmission ✦"* (smooth scrolls to `#contact`)
* **Micro-manifesto:** Concise personal statement establishing identity and focus.

### 3. Chapter 02: About Me, Experience & Education (`AboutSection.tsx`)
* **Editorial Layout:** Multi-part magazine spread structured into three harmonious facets:
  * **02.1 Profile & Philosophy:**
    * Two-column split: Left features large stylized pull-quote, avatar glow ring, location (`Manila / Remote`), and status badge; Right features narrative biography detailing engineering mindset and passion for elegant systems.
    * Highlight metric cards: e.g. *"Fullstack & Systems"*, *"Open Source Focus"*, *"Modern Web & Linux Architect"*.
  * **02.2 Experience Ledger (Timeline):**
    * Editorial timeline/ledger showcasing career milestones, developer roles, internships, and key project lead experience.
    * Displays role/title, company or organization, active date range, impact bullet points, and core technologies leveraged.
  * **02.3 Education & Academia:**
    * Academic background cards with degree/program, institution/university, honors/awards, and coursework focus.
    * Sleek frosted glass cards with subtle graduation/academic iconography.


### 4. Chapter 03: Projects Showcase (`ProjectsSection.tsx` & `ProjectModal.tsx`)
* Asymmetric responsive grid showcasing curated projects.
* Each card includes:
  * Cover image / generative gradient banner fallback
  * Numbered index tag (`PROJECT // 01`)
  * Title & one-line description
  * Technology tags (e.g. `Next.js`, `Tailwind`, `Rust`, `TypeScript`)
  * Outbound links: Live Demo (`↗`) and GitHub Repository (`<svg>`)
  * *"Read Case Study / Architecture ✦"* button that opens the modal.
* **Project Modal:**
  * Full background blur overlay.
  * Detailed architecture overview, challenges solved, key highlights, and preview images.
  * Closes via Escape key, overlay click, or close button.

### 5. Chapter 04: Tech Stack (`TechStackSection.tsx`)
* Categorized Bento Grid divided into clean technical domains:
  1. *Languages & Core:* TypeScript, JavaScript, Python, Rust, HTML5, CSS3/Tailwind
  2. *Frontend & UI:* Next.js, React, Framer Motion, Responsive Design, State Management
  3. *Backend & Databases:* Node.js, Express, Supabase, PostgreSQL, REST & GraphQL APIs
  4. *Tools, Systems & DevOps:* Linux / Shell Scripting, Git, Hyprland / Desktop Customization, Docker, Vercel
* Each tech item displays an icon, tool name, and optional proficiency tag.

### 6. Chapter 05: Certifications (`CertificationsSection.tsx`)
* Editorial ledger layout displaying verified achievements and certifications.
* Each certification item displays:
  * Issuing organization & credential title
  * Issue date & credential ID
  * Direct verification link (`Verify Credential ↗`)
  * Badge/Shield indicator

### 7. Chapter 06: Contact & Social Matrix (`ContactSection.tsx`)
* Typographic headline (*"Initiate Transmission"* / *"Let's build together"*).
* **Interactive One-Click Email Copy:**
  * Prominently displays the email address.
  * Clicking copies to clipboard with visual feedback (*"Copied to clipboard ✓"*).
  * Direct `mailto:` action button as backup.
* **Social Channels Grid:**
  * Dedicated interactive cards for:
    * **GitHub** (with repo count / username preview)
    * **LinkedIn** (professional profile link)
    * **Instagram** (creative / lifestyle presence)
    * **Facebook** (social connection)
  * Each card has frosted glass styling, icon, hover glow, and external link arrow.

### 8. Epilogue: Footer (`Footer.tsx`)
* Minimalist magazine colophon:
  * Designed & engineered by the author
  * Next.js 15 & Tailwind CSS stack callout
  * "Back to Top ↑" smooth scroll button
  * Copyright notice

---

## Data Schema & Content Engine (`src/data/portfolio.ts`)

All content is centralized in a typed configuration file to allow easy edits without touching React code:

```typescript
export interface SocialLink {
  platform: 'github' | 'linkedin' | 'instagram' | 'facebook' | 'email' | string;
  label: string;
  url: string;
  username?: string;
  icon: string;
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

export interface SkillCategory {
  category: string;
  skills: { name: string; level?: 'Proficient' | 'Advanced' | 'Familiar'; icon?: string }[];
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
  location?: string;
  period: string; // e.g. "2024 - Present"
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

---

## Accessibility, Resilience & Performance

1. **Accessibility (a11y):**
   * High contrast ratio (> 4.5:1) for all typography against dark surfaces.
   * Full keyboard navigation (tabbing through nav links, cards, modals, and social buttons).
   * ARIA labels on all icon-only links and buttons.
   * `prefers-reduced-motion` CSS query disables continuous floating effects and replaces animations with simple fades.
2. **Resilience & Fallbacks:**
   * Missing project image paths automatically render a stylized cosmic gradient fallback with project initials.
   * Clipboard API fallback handles restricted iframe or permission environments.
   * External links open with `target="_blank" rel="noopener noreferrer"`.
3. **Performance Optimization:**
   * Zero server database overhead; pure static generation with Next.js App Router.
   * Optimized Google Fonts loading via `next/font/google`.
   * Fast initial page load under 100kB gzip JavaScript bundle.

---

## Verification & Quality Gates

1. **Type Safety:** Run `npx tsc --noEmit` to verify 0 type errors.
2. **Production Build:** Run `npm run build` to verify clean static site generation.
3. **Interactive Validation:**
   * Scroll across all 6 chapters and confirm active navigation indicator tracks correctly.
   * Open and close the Project Detail Modal with Esc, backdrop click, and close button.
   * Test the Copy Email interaction to ensure toast state triggers and resets properly.
   * Confirm all external links (GitHub, LinkedIn, Instagram, Facebook) open properly.
4. **Responsive Testing:**
   * Mobile (< 640px)
   * Tablet (768px)
   * Desktop (> 1024px)
