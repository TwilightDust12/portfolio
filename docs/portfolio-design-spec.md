# Portfolio Redesign Specification: Neo-Tokyo Cyber-Editorial

## 1. Executive Summary & Purpose
A bespoke, high-craft personal portfolio for **Jose Raphael Jaro (Twilight)** built with **Next.js 15**, **React 19**, and **Tailwind CSS**. Designed to replace generic AI and corporate portfolio templates with an authentic, art-directed digital presence celebrating full-stack software craftsmanship, Wayland Linux desktop ricing (CachyOS + Hyprland), anime culture, and gaming enthusiasm.

**Primary Goal:** Position Jose Raphael Jaro as a top-tier candidate to secure an On-the-Job Training (OJT) / internship role. Every layout, interaction, and content decision directly reinforces this objective.

---

## 2. Visual World & Aesthetic Identity
- **Art Direction**: Neo-Tokyo Cyber-Editorial (Experience Mode via `impeccable`), synthesized from user-provided design inspirations:
  - **`evangelion.jpg`**: Swiss-Japanese typographic structure, vertical kanji rails (`黄昏 // TWILIGHT`), hairline framing borders, registration crosshairs (`+`), and duotone portrait crops.
  - **`gojo.jpg`**: High-impact bubblegum magenta / hot pink energy slash accents against monochrome ink, bold stencil typography, and manga screentone textures.
  - **`molar.jpg`**: Dot-matrix coordinate grid canvas, precision HUD brackets (`┌ ┐`), and cerulean sky-blue accent frames.
- **Palette**: **Catppuccin Dual Theme with Accessible Contrast**
  - **Light Mode (Catppuccin Latte)**:
    - Base Canvas: `--bg: #eff1f5` (Latte Base)
    - Primary Text: `--ink: #4c4f69` (Dark Slate, high contrast on paper)
    - Accent Text: `--accent-text: #8839ef` (Latte Mauve, ~4.8:1 contrast on `#eff1f5`, safe for body/subheads)
    - Graphic Accents & Borders: `--accent-pink: #ea76cb` and `--accent-sky: #04a5e5` (fills and decorative borders only; never for light-mode text)
    - On-Accent Button Text: `--on-accent: #11111b` (dark text over pink/sky button fills)
  - **Dark Mode (Catppuccin Mocha)**:
    - Base Canvas: `--bg: #11111b` (Mocha Crust)
    - Primary Text: `--ink: #cdd6f4` (Mocha Text)
    - Luminous Accents: Mauve (`#cba6f7`), Electric Sky (`#89dceb`), and Neon Pink (`#f5c2e7`) (all pass WCAG AA against `#11111b`)

---

## 3. Motion Engineering Principles (`emil-design-eng`)
- **Custom Easing**: `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`.
- **Tactile Feedback**: Pressable items (buttons, project cards, Waybar pills) compress with `scale(0.97)` on `:active` with `160ms ease-out`.
- **Zero `scale(0)` Entrances**: Modals and cards emerge from `scale(0.95)` with `opacity: 0` to prevent unnatural pop-ins.
- **Snappy Durations**: UI transitions capped at 150ms–220ms; zero sluggish `ease-in`.
- **Micro-Staggers**: List items and tech badges stagger into view with 30ms–50ms delays.
- **Hardware Acceleration**: Only animate `transform` and `opacity` on the GPU.
- **Reduced Motion Support**: All motion strictly respects `prefers-reduced-motion`.
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
  ```

---

## 4. Content Architecture & Chapter Breakdown
Hydrated directly from `content/about.md` and `public/assets/`:

### 4.1 Floating Waybar Header
- **Desktop Layout**: Floating frosted Waybar pill at top with numbered workspaces `[ 1 : hero ] [ 2 : about ] [ 3 : works ] [ 4 : arsenal ] [ 5 : comms ]`, system telemetry badge (`cachyos-x86_64 // hyprland`), live Manila clock, and Catppuccin theme toggle.
- **Mobile Responsive Layout**: Collapses on small screens (<640px) into a bottom navigation dock with only the `[ 1 ] [ 2 ] [ 3 ] [ 4 ] [ 5 ]` workspace pills; telemetry badges and live clock are hidden on mobile to maximize viewport area.
- **Hydration-Safe Clock**: Renders `--:--:-- PHT` on SSR, updates to live `Asia/Manila` time on client mount with `suppressHydrationWarning`.
- **Flicker-Free Theme Toggle**: `<html>` tag includes `suppressHydrationWarning`, and the theme icon only renders after client mount (`mounted` state).

### 4.2 Chapter 01 // Hero (Telemetry & Identity)
- **Left Column**:
  - Telemetry badge: `[LOC-01] // 13.93° N, 121.61° E · LUCENA CITY, PH`.
  - Name Typography: Clean HTML element containing `Jose Raphael Jaro` styled with CSS `text-transform: lowercase` (preserves screen readers and SEO indexing).
  - Subtitle: `"aspiring full-stack developer"` (with `"systems enthusiast"` as secondary technical tag).
  - OJT Status Pill: Pulsing starlight badge `"Seeking OJT / Internship Opportunities"`.
  - Action Buttons:
    - Primary Button: **"Download CV ↓"** (links directly to `public/cv.pdf`).
    - Secondary Button: **"View Works ↘"** (smooth-scrolls to `#works`).
- **Right Column (Graphic Portrait Frame)**:
  - Framed portrait of Jose Raphael Jaro (`profile.jpg` / `profile2.jpg`) within the Swiss-Japanese duotone crop box with corner brackets (`┌ ┐`).
  - Vertical Kanji Rail: `writing-mode: vertical-rl` with `lang="ja"` rendering `黄昏 // TWILIGHT` using subset Japanese fonts.
  - Interactive tactile sticker badge featuring `bocchifunni.jpg` with a hover quote and small subtle artist credit.

### 4.3 Chapter 02 // Chronicle & Rice Environment
- **Philosophy**: Editorial quote: *"Doing things, little by little."*
- **Academic Foundation**: STI College Lucena (BS CS 2023–2027), High Honors graduate (95 average, VP of CodeArts Online).
- **Personal Passions**: Anime & Gaming showcase cards (slice-of-life/rom-com favorites, competitive shooter + single-player gaming).
- **Wayland Rice Spec Sheet**: Technical spec card documenting actual CachyOS / Hyprland / Waybar / Pywal / Spicetify / Cava / PipeWire audio tuning setup.

### 4.4 Chapter 03 // Works (Curated Case Studies)
Every project follows a standardized 4-line case study specification (*problem, role, stack, outcome*):

1. **WebC — Student Clearance System** *(Thesis Capstone / Team Project)*
   - *Problem:* Manual, paper-reliant academic clearance workflows cause bottlenecks, delayed graduation filings, and lost records between college departments.
   - *Role:* Full-Stack Developer (Team Project).
   - *Stack:* Next.js 15, TypeScript, Supabase, Drizzle ORM, Microsoft Azure MSAL, Tailwind CSS.
   - *Outcome:* Centralized multi-role web portal featuring role-based dashboards (Student, Department, Admin), automated clearance approval pipelines, and institutional Azure login.
   - *Repository:* [https://github.com/sudosetnametoAsh/next-webc](https://github.com/sudosetnametoAsh/next-webc)

2. **Sphere8 Construction Company Website** *(Commercial Client Project)*
   - *Problem:* Traditional construction contracting suffers from friction in client intake and fragmented offline project portfolios.
   - *Role:* Lead Frontend & Full-Stack Developer.
   - *Stack:* Next.js, React, Tailwind CSS, TypeScript.
   - *Outcome:* Modern corporate web portal featuring structured showcase galleries and direct service inquiry funnels (In Active Development).

3. **All About Lily Chou-Chou Themed Portfolio** *(Creative / Experimental)*
   - *Problem:* Conventional portfolios lack sensory identity and emotional depth.
   - *Role:* Creator & Designer.
   - *Stack:* Next.js, Tailwind CSS, Web Audio API, TypeScript.
   - *Outcome:* Atmospheric web archive integrating real-time Web Audio API ambient sound synthesis, filmic scanlines, and retro typography.
   - *Repository:* [https://github.com/TwilightDust12/lily-chou-chou-themed-portfolio](https://github.com/TwilightDust12/lily-chou-chou-themed-portfolio)

4. **Wayland Rice & Dotfiles** *(Systems & Environment)*
   - *Problem:* Default desktop environments lack workflow efficiency and cohesive visual customization.
   - *Role:* Maintainer & Ricer.
   - *Stack:* CachyOS, Hyprland, Waybar, Pywal, Bash, PipeWire.
   - *Outcome:* Automated Wayland rice environment with dynamic wallpaper-extracted color palettes, custom IPC status bars, and low-latency audio daemons.

- **Case Study Modal**: Implemented using accessible **Radix Dialog** (`@radix-ui/react-dialog`) with focus trapping, `Escape` key dismissal, and `aria-modal="true"`.

### 4.5 Chapter 04 // Tech Arsenal (Verified Stack)
Strictly matches `content/about.md` with verified tools:
1. **Frontend:** Next.js, React, TypeScript, Tailwind CSS, Vite, Bootstrap
2. **Backend & Data:** Node.js, Supabase, Drizzle ORM, SQL Server, ASP.NET (Web Forms & MVC - Academic)
3. **DevOps & QA:** Docker, GitHub Actions, Playwright, Git & GitHub
4. **Mobile & Game Dev:** Android (Kotlin, Jetpack Compose, Room, MVVM), Unity (C#)
5. **Tools & Linux:** CachyOS, Hyprland, Waybar, Bash, Linux Administration

### 4.6 Chapter 05 // Transmission & Social Matrix
- **Direct Mail Action**: One-click email copy button for `jyrum12@gmail.com` with instant clipboard feedback toast and `mailto:` fallback.
- **Social Matrix**: Tactile cards for GitHub (`TwilightDust12`), LinkedIn (`jose-raphael-jaro`), Facebook, Instagram, and Discord (`twilightdust`).
- **Terminal Colophon**: Editorial footer reading build commit hash from `process.env.VERCEL_GIT_COMMIT_SHA` at build time (with local fallback), build timestamp, and Catppuccin palette indicator pills.

---

## 5. Site Architecture, Accessibility & Artwork Attribution
- **Skip-to-Content Link**: Hidden accessible link (`href="#main-content"`) revealed on `:focus-visible` for keyboard navigation.
- **Focus Indicators**: High-visibility `:focus-visible` ring styled with Latte Mauve / Mocha Mauve across all interactive elements.
- **SEO & Metadata**: Complete Next.js Metadata API setup (Page title, description, OpenGraph image, Twitter card, Canonical URL).
- **Custom 404 Page**: Themed Catppuccin 404 error screen with a "Return to Terminal / Home" button.
- **Artwork & Copyright Policy**: External anime inspiration images (`bocchifunni.jpg`, `reze.jpg`, `rika.png`, `evangelion.jpg`, `gojo.jpg`) include visible artist/studio attribution badges (e.g., *Bocchi the Rock! © CloverWorks*, *Chainsaw Man © MAPPA*, *Jujutsu Kaisen © MAPPA*, *Evangelion © Studio Khara*).

---

## 6. Consolidated Decision Log
| Decision | Choice | Rationale |
| :--- | :--- | :--- |
| **Primary Goal** | Land OJT / Internship | Drives hero CTA ("Download CV ↓"), verified tech stack, and clear academic achievements. |
| **Color System** | Catppuccin Dual with Accessible Contrast | Passes WCAG AA: Mauve for text, pink/sky for fills/borders with dark text on buttons. |
| **Motion Guidelines** | Emil Kowalski Rules + Reduced Motion | Tactile `:active` scale, no scale(0), snappiness under 220ms, full `prefers-reduced-motion` compliance. |
| **Modal Engine** | Radix UI Dialog | Fully accessible, automatic focus trap, Esc-to-close, no custom dialog bugs. |
| **Hydration Safety** | Two-pass mount pattern for Clock & Theme | Prevents SSR hydration mismatch errors. |
| **Tech Stack** | Verified stack with thesis tools | Accurately highlights Docker, GitHub Actions, Playwright, Vite, Supabase, and Drizzle ORM. |
| **Thesis Feature** | WebC Clearance System (Team Project) | High-signal real-world project demonstrating enterprise full-stack collaboration. |
| **Mobile Header** | Bottom docked workspace pills | Eliminates header clutter on small screens while keeping chapter navigation effortless. |
