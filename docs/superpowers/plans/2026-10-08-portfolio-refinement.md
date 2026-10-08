# Portfolio Refinement Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement this approved plan task by task. Progress is recorded below.

**Goal:** Make the portfolio easier to read and evaluate for a full-stack internship while preserving its Catppuccin, Wayland, and Japanese editorial identity.

**Architecture:** Retain the Next.js App Router, typed portfolio content, Radix dialogs, Tailwind 3, and existing Framer Motion dependency. Replace repetitive panel layouts with a clear editorial hierarchy and stable project previews. Keep interactive behavior in client components and static sections on the server where practical.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind 3, Framer Motion, Radix Dialog, next-themes, Sonner.

**Spec:** The user-approved recommendations in this session supersede `docs/portfolio-design-spec.md` where hierarchy, density, navigation labels, or availability differ.

## Approved design

- Preserve Catppuccin Latte/Mocha, mono display typography, portrait interaction, subtle dot texture, Japanese details, and a restrained Wayland navigation.
- Order: Hero → Projects → Skills → About → Personal interests → Contact.
- Hero: a clear full-stack introduction; View projects primary; Contact me secondary. No link to the placeholder CV.
- Feature WebC and Lily Chou-Chou with real screenshots. Sphere8 is a supporting project labeled In development. Preserve Wayland video access.
- Open project details directly from stable cards. Retain screenshot/device switching and accessible dialogs. Label GitHub/demo actions when destinations exist.
- Simplify frames, badges, headings, and typography. Increase descriptive text and contrast in both themes.
- Consolidate anime, gaming, music, and cinema in the personal section. Keep truthful loading, fallback, and error states.
- Use “Seeking full-stack internship opportunities” consistently; no invented dates, hours, results, project ownership, or metrics.
- Keep portrait glitch as a single signature interaction. Use short purposeful transitions, no repeated entrance choreography, and honor reduced motion.

## Global constraints

- Preserve existing source data and routes; do not invent missing links or assets.
- No framework migration or runtime dependency additions.
- Maintain keyboard navigation, focus return, readable mobile navigation, and both themes.
- Use existing confirmed claims only; project implementation details are not personal ownership claims.
- Work in the user's current workspace, leaving changes reviewable and uncommitted.

## Review focus

1. At 320–390px, navigation and project controls must fit without horizontal page overflow.
2. Dialog dismissal must restore focus; changing projects must reset gallery selection.
3. Reduced motion must disable JS-driven movement as well as CSS animations.
4. Failed/empty telemetry must render understandable content without broken images or false live status.
5. Contact success feedback must follow a successful clipboard write; links must have real destinations.

## Task 1: Foundation and primary journey

**Files:** `src/app/{page.tsx,globals.css}`, `src/components/layout/WaybarHeader.tsx`, `src/components/sections/HeroSection.tsx`, `src/components/ui/{ThemeToggle,MotionFadeUp}.tsx`, `src/data/portfolio.ts`.

**Interfaces:** Retain `hero`, `works`, `arsenal`, `about`, `mood`, `comms` IDs and old anchor aliases. Shared CSS classes provide content width, section spacing, readable secondary text, buttons, and links.

- [ ] Establish palette-derived surface, text, border, interaction tokens and responsive editorial layout classes.
- [ ] Reorder page; simplify navigation and hero; remove placeholder CV action and ambiguous availability.
- [ ] Make theme toggle system-aware and shared motion visible by default/reduced-motion safe.
- [ ] Verify with TypeScript and browser checks at desktop/mobile sizes.

## Task 2: Project evidence and supporting content

**Files:** `src/components/sections/{ProjectsSection,ArsenalSection,ChronicleSection,MoodSection,ContactSection}.tsx`, `src/components/ui/{ProjectModal,ProjectMedia,CopyEmailButton}.tsx`, `src/components/layout/ColophonFooter.tsx`.

**Interfaces:** `ProjectMedia({ project: Project, compact?: boolean })` displays real screenshots with labeled stateful controls or video. `ProjectModal` retains its public props, is keyed by project, and returns focus to the clicked case-study button.

- [ ] Build two stable featured project articles, two smaller supporting projects, and direct dialogs.
- [ ] Simplify skills into evidence-linked rows; condense About to current education and background.
- [ ] Consolidate personal interests and preserve music/cinema integrations with explicit loading/error/fallback states.
- [ ] Simplify contact/footer; keep working mail, social links, and truthful copy feedback.
- [ ] Verify TypeScript, project assets, dialog/gallery behavior, clipboard success/failure, and telemetry states.

## Task 3: Verification and review

- [ ] Run production build and TypeScript check.
- [ ] Inspect a batched desktop/mobile × Latte/Mocha screenshot set; check intermediate width and 320px overflow.
- [ ] Exercise navigation, project dialogs, gallery/device controls, theme switching, reduced motion, and failure states in a real browser.
- [ ] Run Impeccable detector once on changed UI; distinguish preserved theme motifs from actionable defects.
- [ ] Request an independent whole-diff review, resolve substantive issues, and record results.
- [ ] Update README to match final structure and report any limits honestly.

## Progress

- Baseline: working tree clean; `tsc --noEmit` passed.
- User has repeatedly approved the design decisions and explicitly requested implementation. Proceed without repeating design approval.
- Native execution selected for tightly connected visual changes; independent final review follows. Existing workspace retained because this task targets the shared checkout and Git metadata is read-only in the sandbox.
- Verification uses browser behavior, TypeScript, and build checks. No implementation-mirroring tests for presentational edits.
