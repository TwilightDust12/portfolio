# Portfolio Hiring Evidence Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Deliver the six accepted portfolio review improvements while retaining its personal identity.

**Architecture:** Keep content in `portfolioData`, media behavior in `ProjectMedia`, and feed ownership in `GithubSection`. Use existing Next metadata APIs and installed ESLint; add no application dependencies.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind 3, Radix Dialog, Framer Motion, Playwright.

**Spec:** The accepted review and user decisions in this conversation, recorded in `CONTEXT.md`: internships primary, junior roles welcome, personal identity retained, WebC implementation and leadership/QA both represented. The public domain is `https://twilightdust.me`.

## Global Constraints

- Preserve truthful attribution; no invented outcomes, performance metrics, or technical decisions.
- Keep the Catppuccin palette, Linux/anime identity, keyboard support, reduced motion, dialogs, and portrait switching.
- Use `https://twilightdust.me` for canonical, sharing, and résumé links.
- No generated contribution data may appear as personal history.
- No deployment, publishing, unrelated cleanup, or new application dependency.

## Review Focus

- Pending, failed, or malformed GitHub responses must retain labeled real historical data.
- A successful feed must replace the snapshot without stale labeling.
- Mobile portrait/layout changes must keep project evidence earlier without overflow or broken focus.
- App video must be visible without opening a case study and must not autoplay/download eagerly.
- Résumé editing must retain all other text, layout, links, and its single-page structure.

### Task 1: Trustworthy GitHub history and usable controls

**Files:** `src/components/sections/GithubSection.tsx`, `src/components/ui/contribution-skyline.tsx`, `tests/portfolio-hiring.browser.cjs`.

**Interfaces:** Consume the existing contribution snapshot and `GithubContributionsData`; keep the reusable skyline's demo behavior and public props intact.

- [x] Write browser checks for failed, pending, malformed, and successful feeds, plus minimum 44px skyline controls.
- [x] Run against current source; expect failures for fabricated history and undersized controls.
- [x] Initialize the personal section from the real snapshot, validate upstream payloads, retain the snapshot on errors, and date-label historical totals.
- [x] Enlarge control hit areas while retaining small visible swatches; preserve toggle indicator alignment.
- [x] Run the browser checks; expect all Task 1 cases to pass.

### Task 2: Earlier, truthful hiring evidence

**Files:** `src/data/portfolio.ts`, `src/components/sections/HeroSection.tsx`, `src/components/sections/ProjectsSection.tsx`, `src/app/globals.css`, `tests/personal-layer.cjs`, `tests/portfolio-hiring.browser.cjs`, `public/cv.pdf`, `CONTEXT.md`.

**Interfaces:** Reuse `ProjectMedia`'s existing `showVideo` prop; preserve all anchor IDs and data interfaces.

- [x] Add browser acceptance checks for earlier projects at desktop/phone widths and an inline OwlSet demo with controls and no autoplay.
- [x] Run against current source; expect the layout and video checks to fail.
- [x] Reduce hero whitespace and mobile portrait size, relocate the decorative interlude after projects, and keep existing motion selectors.
- [x] Present internships first and junior roles as welcome; show WebC's documented development, four-person team leadership, and quality responsibilities without inventing specifics.
- [x] Show existing project videos directly through `ProjectMedia`; update affected content assertions.
- [x] Update only the résumé objective and portfolio link, preserving original formatting and other content.
- [x] Run content/browser checks and compare extracted résumé text, page count, links, and rendered page.

### Task 3: Sharing metadata, working lint, and documentation

**Files:** `src/app/layout.tsx`, `src/app/opengraph-image.tsx`, `eslint.config.mjs`, `package.json`, `README.md`, `tests/portfolio-hiring.browser.cjs`.

**Interfaces:** Use native `Metadata`, `ImageResponse`, and installed `eslint-config-next` flat config; share one OG image with Twitter.

- [x] Check current head tags and lint command; expect missing image/canonical metadata and an unusable lint command.
- [x] Set metadata base/canonical/OG URL to `https://twilightdust.me`; add an OG image and large-image Twitter card.
- [x] Configure installed ESLint directly; resolve task-relevant diagnostics and document any unrelated baseline findings.
- [x] Correct README résumé/feed/media/testing instructions and add a safe `.env.example` if its documented setup requires one.
- [x] Run lint, TypeScript, content checks, production build, focused browser checks, existing motion/theme/GitHub/star browser checks, and diff checks.
- [x] Request one independent whole-change review, address important findings, and leave the changes reviewable on the feature branch.
