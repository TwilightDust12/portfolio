# Jose Raphael Jaro / Twilight

A personal portfolio at [twilightdust.me](https://twilightdust.me), primarily for full-stack internships, with junior roles also welcome. Built with Next.js 16, React 19, TypeScript, and Tailwind CSS 3. The visual identity combines Catppuccin Latte/Mocha, restrained Wayland navigation, and Japanese editorial details.

## Page structure

1. **Introduction:** a shuffling portrait deck with a pixel color reveal on hover, consistent internship availability, project and email actions.
2. **Selected projects:** WebC, OwlSet, Sphere8, and The Ether film tribute, each told as a three-beat chapter (what it asked of me, what I had to figure out, what shipped) with its own layout: media-left, phone, media-right, and full-bleed. Role stays on one line under the title, and media sits with “What shipped”. In essentials mode the media is omitted and each chapter keeps its three beats. OwlSet’s app demo plays on demand, and case studies open directly from each project. The Wayland rice moves to the workspace interlude.
3. **Picked up along the way:** tools grouped by the project chapter that first used them, each linking back to its chapter, plus an “Also worked with” group for the rest.
4. **Workspace interlude:** a short break with the Wayland rice video and a GitHub profile link; omitted in essentials mode.
5. **About:** background and concise education.
6. **Personal interests:** music, cinema, anime, and games in one section.
7. **Contact:** email, working clipboard feedback, and social profiles.

The real one-page résumé is available from the introduction's download action at `public/cv.pdf`.

## Development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build
npm run start
```

For environments where Turbopack's local worker ports are restricted, Next.js also supports `npm run build -- --webpack`.

## Content and integrations

- `src/data/portfolio.ts`: typed content used by the portfolio.
- `src/types/portfolio.ts`: content interfaces.
- `src/components/ui/ProjectMedia.tsx`: shared screenshot/device controls and on-demand video playback.
- `src/components/ui/ProjectModal.tsx`: accessible Radix case-study dialog.
- `src/app/globals.css`: both palettes, editorial layout, responsive styles, and interaction motion.
- `src/app/api/music/route.ts`: Last.fm recent music, cached server responses, and curated fallback.
- `src/app/api/cinema/route.ts`: Letterboxd RSS diary, cached server responses, and curated fallback.
- `src/components/sections/GithubSection.tsx`: interactive 2D/3D contribution skyline powered by `/api/github`. Pending, failed, and invalid responses retain a dated, labeled snapshot of real public history. Generated sample data is reserved for the separate skyline demo. No token is required.
- `src/app/layout.tsx` and `src/app/opengraph-image.tsx`: canonical and social-sharing metadata for `https://twilightdust.me`, with a generated preview image.

Copy `.env.example` to `.env.local` and supply your own Last.fm and Letterboxd settings to enable the feeds. Secrets stay in server routes. The personal section labels curated responses and handles unavailable feeds and failed artwork.

The existing Motion library drives layered portrait parallax, orbiting artwork, a drifting typographic interlude, project reveals, quiet section entrances, and reading progress, with a JavaScript fallback in browsers without native scroll timelines. The scroll-craft direction is recorded in `scrollcraft/builds/twilight-workspace/BRIEF.md` and `SCORE.md`. The mobile portrait sits beside the name so projects remain early. A sticky project index follows the current project on desktop. Content remains readable without JavaScript. Portraits and screenshot previews crossfade without blocking repeated clicks. Screenshots open in a full-size, scrollable viewer. Reduced-motion users get a complete static scene and short interaction fades; keyboard-triggered switches and dialogs skip motion. Native anchor navigation, visible keyboard focus, 44px controls, dialog focus return, and system-aware theme switching are supported.

`src/lib/sky.ts` colors the site by the current time in Lucena City (Asia/Manila), whatever the visitor's timezone. Seven bands (dawn 05:00, morning 07:00, midday 11:00, afternoon 15:00, sunset 17:30, evening 19:00, night 22:00) each set an accent for Mocha and Latte. An inline head script sets `<html data-sky>` before first paint; `ManilaClock` updates it while the page is open, fading the accent over 2s unless reduced motion is requested. Without JS the default accent applies.

## Verification

Run `node tests/sky.cjs` for the band logic and `node tests/sky.browser.cjs` (against a running production server) for pre-paint colouring, live band changes, themes and the no-JS fallback.

The page uses UI Capsule's MIT-licensed [Background Pixel Stars](https://21st.dev/@uicapsule/components/background-pixel-stars), adapted to the Catppuccin palette. A single fixed, viewport-sized canvas stays behind all sections as visitors scroll. Stars sit in three layers that drift at different speeds as the page scrolls (still under reduced motion), and thin out to 35–60% by day according to the Lucena time band. Stars twinkle at up to 16 FPS with occasional shooting stars; rendering pauses in a hidden tab. Reduced-motion users receive a still starfield. The component and a standalone demo are in `src/components/ui/background-pixel-stars.tsx` and `background-pixel-stars-demo.tsx`; no additional dependencies or assets are needed. The existing skyline demo remains separate.

Run `node tests/pixel-stars.browser.cjs` after a production build to verify animation, theme switching, reduced motion, and responsive sizing. It uses the same `PLAYWRIGHT_MODULE` and `CHROMIUM_PATH` overrides as the GitHub browser check.

```bash
npx tsc --noEmit
npm run lint
node tests/project-content.cjs
node tests/personal-layer.cjs
npm run build
node tests/github.browser.cjs
```

The GitHub browser check requires Playwright and Chromium. If installed outside this project, set `PLAYWRIGHT_MODULE` to the Playwright package path and `CHROMIUM_PATH` to the browser executable.

With a production server running, `node tests/portfolio-hiring.browser.cjs` checks feed failures and malformed data, touch targets, earlier project visibility, inline app media, and sharing metadata. After building, run `npm run start -- --port 3120` in another terminal. Set `PORTFOLIO_BASE_URL` to the server URL (defaults to `http://localhost:3120`); the same Playwright and Chromium overrides apply. Production mode is required for the public image URL assertion because Next.js deliberately uses localhost for generated image metadata in development.

The browser regression check is `tests/motion.browser.cjs`. It starts a production preview on port 3108 and requires Playwright with its browser binaries installed in your environment. Run `node tests/motion.browser.cjs` after building; set `BROWSER_ENGINE=firefox` or `BROWSER_ENGINE=webkit` for those engines. `DISABLE_SCROLL_TIMELINES=1` exercises the JavaScript scroll fallback in Chromium.

With a production server running, `node tests/scrollcraft.browser.cjs` checks the opening on visits/reloads and early dismissal, independent portrait planes, profile switching, compact layouts, live motion-preference changes, once-only fade-up progression, keyboard cancellation, composited text contrast, no-JavaScript reading, and the résumé download. It also captures six positions in each scene at desktop, phone, compact-phone, and reduced-motion settings. Screenshots, contact sheets, and state records are written to `/tmp/portfolio-scrollcraft` (override with `SCROLLCRAFT_SHOTS`). It uses the same browser and server environment overrides as the hiring checks; `SCROLLCRAFT_VARIANT` selects one screenshot setting, and `DISABLE_SCROLL_TIMELINES=1` exercises the fallback.

The current entrance recipe, focused verification, and read-only opportunity review are in [docs/animation-opportunities.md](docs/animation-opportunities.md).

`src/components/ui/PortraitDeck.tsx` owns the portrait cards. Click/tap tucks the front card behind the next; fine-pointer hover reveals color through a staggered SVG pixel mask. Keyboard selection is immediate, and reduced motion keeps static card placement with a short color fade. The photographs stay mounted and keep their image sources while shuffling; scroll depth lives on separate parent planes.

The refinement plan and verification record are in [docs/superpowers/plans/2026-10-08-portfolio-refinement.md](docs/superpowers/plans/2026-10-08-portfolio-refinement.md).

Project screenshots and portraits live under `public/assets/`. `content/about.md` and `docs/portfolio-design-spec.md` retain the original content and visual brief; the refinement plan records the later approved hierarchy and presentation.
