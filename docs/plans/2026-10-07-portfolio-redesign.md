# Neo-Tokyo Cyber-Editorial Portfolio Implementation Plan

> **For Agent:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task.

**Goal:** Build a bespoke, high-craft personal portfolio for Jose Raphael Jaro (Twilight) in Next.js 15, React 19, and Tailwind CSS, featuring the Neo-Tokyo Cyber-Editorial aesthetic, accessible Catppuccin dual theme (Latte & Mocha), Emil Kowalski motion craft, and verified tech credentials targeting an OJT / internship position.

**Architecture:** Next.js 15 App Router with `next-themes` and CSS variable tokens. Single-source-of-truth data engine in `src/data/portfolio.ts` mapped to `content/about.md`. Atomic component architecture in `src/components/` with Radix UI Dialog for accessible modals.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS, `next-themes`, `@radix-ui/react-dialog`, Framer Motion, Lucide React.

---

### Task 1: Portfolio Data Engine & Type System Update

**Files:**
- Modify: `src/types/portfolio.ts`
- Modify: `src/data/portfolio.ts`

**Step 1: Update TypeScript interfaces in `src/types/portfolio.ts`**
Include fields for:
- 4-line case study structure (`problem`, `role`, `stack`, `outcome`, `isTeamProject`)
- Anime artwork attribution (`artAttribution?: string`)
- Rice telemetry specification (`wm`, `bar`, `kernel`, `shell`, `terminals`, `audioTuning`)
- Verified tech arsenal categories

**Step 2: Update `src/data/portfolio.ts`**
Populate data strictly matching `content/about.md`:
- Personal: Jose Raphael Jaro, Lucena City, OJT availability
- Projects: WebC Student Clearance System (Thesis / Team Project), Sphere8 Construction, Lily Chou-Chou, Wayland Rice & Dotfiles
- Verified Tech Stack: Frontend, Backend & Data, DevOps & QA, Mobile & Game Dev, Tools & Linux
- Socials: GitHub, LinkedIn, Facebook, Instagram, Discord

**Step 3: Verify TypeScript compilation**
Run: `npx tsc --noEmit`
Expected: 0 errors

**Step 4: Commit**
Run: `git add src/types/portfolio.ts src/data/portfolio.ts && git commit -m "feat: update portfolio data engine with verified stack and thesis details"`

---

### Task 2: Catppuccin Theme Provider & Layout Shell

**Files:**
- Create: `src/components/providers/ThemeProvider.tsx`
- Modify: `src/app/layout.tsx`
- Create: `src/app/not-found.tsx`

**Step 1: Create `src/components/providers/ThemeProvider.tsx`**
Wrap children with `ThemeProvider` from `next-themes` with `attribute="class"`, `defaultTheme="dark"`, `enableSystem={true}`.

**Step 2: Update `src/app/layout.tsx`**
- Set `suppressHydrationWarning` on `<html>`.
- Add Google Fonts (`JetBrains_Mono`, `Plus_Jakarta_Sans`, `Playfair_Display` / Japanese font).
- Add Skip-to-content link: `<a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-accent-text text-white rounded-lg">Skip to content</a>`.
- Metadata: Title `"Jose Raphael Jaro (Twilight) | Aspiring Full-Stack Developer"`, description, and OpenGraph metadata.

**Step 3: Create `src/app/not-found.tsx`**
A themed Catppuccin 404 page with telemetry coordinates, Japanese glitch tag `404 // 虚無 (VOID)`, and a button returning to `/`.

**Step 4: Verify build**
Run: `npx tsc --noEmit`
Expected: 0 errors

**Step 5: Commit**
Run: `git add src/components/providers/ThemeProvider.tsx src/app/layout.tsx src/app/not-found.tsx && git commit -m "feat: add theme provider, accessible layout shell, and 404 page"`

---

### Task 3: Floating Waybar Header & Mobile Bottom Dock

**Files:**
- Create: `src/components/ui/ManilaClock.tsx`
- Create: `src/components/ui/ThemeToggle.tsx`
- Create: `src/components/layout/WaybarHeader.tsx`

**Step 1: Create `src/components/ui/ManilaClock.tsx`**
Client-only time formatter with two-pass mount pattern: renders `--:--:-- PHT` with `suppressHydrationWarning` before mount, then updates live `Asia/Manila` time every second.

**Step 2: Create `src/components/ui/ThemeToggle.tsx`**
Flicker-free theme toggle with `mounted` guard, cycling between Catppuccin Latte (Light) and Mocha (Dark).

**Step 3: Create `src/components/layout/WaybarHeader.tsx`**
- Desktop: Floating pill at top with workspace numbers `[ 1 : hero ] [ 2 : about ] [ 3 : works ] [ 4 : arsenal ] [ 5 : comms ]`, system badge (`cachyos // hyprland`), `<ManilaClock />`, and `<ThemeToggle />`. Active workspace highlighted via IntersectionObserver.
- Mobile (<640px): Collapses to a sleek bottom navigation dock with `[ 1 ] [ 2 ] [ 3 ] [ 4 ] [ 5 ]` pills, hiding telemetry and clock to save screen space.

**Step 4: Verify build**
Run: `npx tsc --noEmit`
Expected: 0 errors

**Step 5: Commit**
Run: `git add src/components/ui/ManilaClock.tsx src/components/ui/ThemeToggle.tsx src/components/layout/WaybarHeader.tsx && git commit -m "feat: add waybar header and mobile bottom dock navigation"`

---

### Task 4: Chapter 01 // Hero (Swiss-Japanese Telemetry & Framed Portrait)

**Files:**
- Create: `src/components/ui/SwissFrame.tsx`
- Create: `src/components/sections/HeroSection.tsx`

**Step 1: Create `src/components/ui/SwissFrame.tsx`**
Reusable precision framing container with corner calipers (`┌ ┐ └ ┘`), hairline borders, and optional crosshairs (`+`) inspired by `evangelion.jpg` and `molar.jpg`.

**Step 2: Create `src/components/sections/HeroSection.tsx`**
- Telemetry badge: `[LOC-01] // 13.9319° N, 121.6172° E · LUCENA CITY, PH`.
- HTML heading: `<h1>Jose Raphael Jaro</h1>` styled with CSS `lowercase font-mono tracking-tight text-3xl sm:text-5xl lg:text-6xl`.
- Subtitle: `"aspiring full-stack developer"` with `"systems enthusiast"` badge.
- OJT Availability Pill with pulsing emerald dot: `"Seeking OJT / Internship Opportunities"`.
- Buttons:
  - Primary: **"Download CV ↓"** (`href="/cv.pdf" download`).
  - Secondary: **"View Works ↘"** (`href="#works"`).
- Right column: Portrait (`profile.jpg`) framed in `<SwissFrame>` with vertical kanji rail (`writing-mode: vertical-rl`, `lang="ja"`, `黄昏 // TWILIGHT`), plus interactive Bocchi sticker (`bocchifunni.jpg`) with hover quote and CloverWorks attribution.

**Step 3: Verify build**
Run: `npx tsc --noEmit`
Expected: 0 errors

**Step 4: Commit**
Run: `git add src/components/ui/SwissFrame.tsx src/components/sections/HeroSection.tsx && git commit -m "feat: implement chapter 01 hero section with swiss-japanese portrait framing"`

---

### Task 5: Chapter 02 // Chronicle & Wayland Rice Environment

**Files:**
- Create: `src/components/ui/RiceSpecSheet.tsx`
- Create: `src/components/sections/ChronicleSection.tsx`

**Step 1: Create `src/components/ui/RiceSpecSheet.tsx`**
Interactive CachyOS/Hyprland technical spec sheet with system badges: Kernel, Waybar, Pywal color generation, GPU terminals (Alacritty/Kitty), PipeWire audio tuning, and Spicetify.

**Step 2: Create `src/components/sections/ChronicleSection.tsx`**
- Section id `about`.
- Editorial quote: *"Doing things, little by little."*
- Academic Foundation card: Saint Philomena (2012-2021), STI College Senior High High Honors (95 avg, VP of CodeArts Online 2021-2023), STI College BS CS (2023-2027).
- Passions card: Anime & Gaming showcase featuring slice-of-life/rom-com favorites with Reze/Rika artwork accents and visible studio attribution badges.
- Mounts `<RiceSpecSheet />`.

**Step 3: Verify build**
Run: `npx tsc --noEmit`
Expected: 0 errors

**Step 4: Commit**
Run: `git add src/components/ui/RiceSpecSheet.tsx src/components/sections/ChronicleSection.tsx && git commit -m "feat: implement chapter 02 chronicle and rice spec sheet"`

---

### Task 6: Chapter 03 // Works (4-Line Case Studies & Radix Dialog Modal)

**Files:**
- Create: `src/components/ui/ProjectModal.tsx`
- Create: `src/components/sections/ProjectsSection.tsx`

**Step 1: Create `src/components/ui/ProjectModal.tsx`**
Accessible modal using `@radix-ui/react-dialog` with `Dialog.Root`, `Dialog.Portal`, `Dialog.Overlay`, and `Dialog.Content`. Features focus trap, `Esc` to close, accessible title/description, and detailed technical walkthrough.

**Step 2: Create `src/components/sections/ProjectsSection.tsx`**
- Section id `works`.
- Chapter index: `[03] // SELECTED WORKS`.
- Maps 4 curated projects:
  1. WebC — Student Clearance System (Thesis Capstone / Team Project)
  2. Sphere8 Construction Company Website (Commercial Client Project)
  3. All About Lily Chou-Chou Themed Portfolio (Creative Audio Experiment)
  4. Wayland Rice & Dotfiles (Linux Systems & Rice)
- Each card displays the 4-line breakdown (*Problem, Role, Stack, Outcome*), plus a "Case Study Deep-Dive ✦" button opening the modal, and outbound repository/demo links.

**Step 3: Verify build**
Run: `npx tsc --noEmit`
Expected: 0 errors

**Step 4: Commit**
Run: `git add src/components/ui/ProjectModal.tsx src/components/sections/ProjectsSection.tsx && git commit -m "feat: implement chapter 03 works with radix dialog case study modals"`

---

### Task 7: Chapter 04 // Verified Tech Arsenal Bento Grid

**Files:**
- Create: `src/components/sections/ArsenalSection.tsx`

**Step 1: Create `src/components/sections/ArsenalSection.tsx`**
- Section id `arsenal`.
- Chapter index: `[04] // TECH ARSENAL`.
- 5 verified domain cards styled with `<SwissFrame>`:
  1. Frontend: Next.js, React, TypeScript, Tailwind CSS, Vite, Bootstrap
  2. Backend & Data: Node.js, Supabase, Drizzle ORM, SQL Server, ASP.NET (Web Forms & MVC)
  3. DevOps & QA: Docker, GitHub Actions, Playwright, Git & GitHub
  4. Mobile & Game Dev: Android (Kotlin, Jetpack Compose, Room, MVVM), Unity (C#)
  5. Tools & Linux: CachyOS, Hyprland, Waybar, Bash, Linux Administration
- Tactile hover feedback (`btn-press`, `scale(0.97)` on active).

**Step 2: Verify build**
Run: `npx tsc --noEmit`
Expected: 0 errors

**Step 3: Commit**
Run: `git add src/components/sections/ArsenalSection.tsx && git commit -m "feat: implement chapter 04 tech arsenal bento grid with verified stack"`

---

### Task 8: Chapter 05 // Transmission & Colophon Footer

**Files:**
- Create: `src/components/ui/CopyEmailButton.tsx`
- Create: `src/components/sections/ContactSection.tsx`
- Create: `src/components/layout/ColophonFooter.tsx`

**Step 1: Create `src/components/ui/CopyEmailButton.tsx`**
Tactile button copying `jyrum12@gmail.com` to clipboard with instant toast state ("Copied to clipboard ✓"), `mailto:` secondary link, and Emil Kowalski `:active` scale feedback.

**Step 2: Create `src/components/sections/ContactSection.tsx`**
- Section id `comms`.
- Chapter index: `[05] // TRANSMISSION & COMMS`.
- Primary CTA invitation: "Let's connect for OJT and full-stack opportunities."
- Mounts `<CopyEmailButton />`.
- Social channels matrix: GitHub (`TwilightDust12`), LinkedIn (`jose-raphael-jaro`), Facebook, Instagram, Discord (`twilightdust`).

**Step 3: Create `src/components/layout/ColophonFooter.tsx`**
Terminal-style colophon reading `process.env.VERCEL_GIT_COMMIT_SHA` (with fallback to local short sha or timestamp), Catppuccin palette indicator dots (Latte / Mocha), and copyright.

**Step 4: Verify build**
Run: `npx tsc --noEmit`
Expected: 0 errors

**Step 5: Commit**
Run: `git add src/components/ui/CopyEmailButton.tsx src/components/sections/ContactSection.tsx src/components/layout/ColophonFooter.tsx && git commit -m "feat: implement chapter 05 contact section and terminal colophon"`

---

### Task 9: Page Assembly, End-to-End Polish & Build Verification

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/globals.css` (if needed)

**Step 1: Assemble `src/app/page.tsx`**
Integrate `<WaybarHeader />`, `<HeroSection />`, `<ChronicleSection />`, `<ProjectsSection />`, `<ArsenalSection />`, `<ContactSection />`, and `<ColophonFooter />` into `<main id="main-content">`.

**Step 2: Production Build & Lint Verification**
Run: `npx tsc --noEmit`
Run: `npm run build`
Ensure 0 errors, successful static generation.

**Step 3: Final Verification Commit**
Run: `git add . && git commit -m "feat: complete neo-tokyo cyber-editorial portfolio implementation"`
