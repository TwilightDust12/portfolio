# Jose Raphael Jaro / Twilight

A personal portfolio for full-stack internship opportunities, built with Next.js 16, React 19, TypeScript, and Tailwind CSS 3. The visual identity combines Catppuccin Latte/Mocha, restrained Wayland navigation, and Japanese editorial details.

## Page structure

1. **Introduction:** portrait switching, consistent internship availability, project and email actions.
2. **Selected projects:** WebC and Lily Chou-Chou with desktop/mobile screenshots; Sphere8 (in development) and Wayland rice as supporting projects. Case studies open directly from each project.
3. **Skills:** readable categories with links to relevant project evidence.
4. **About:** background and concise education.
5. **Personal interests:** music, cinema, anime, and games in one section.
6. **Contact:** email, working clipboard feedback, and social profiles.

The existing CV PDF is a placeholder and is deliberately not linked. Replace it with the real résumé before restoring a download action.

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

Copy `.env.example` to `.env.local` and supply your own Last.fm and Letterboxd settings to enable the feeds. Secrets stay in server routes. The personal section labels curated responses and handles unavailable feeds and failed artwork.

The portrait glitch is skipped for reduced-motion users. Native anchor navigation, visible keyboard focus, 44px controls, dialog focus return, and system-aware theme switching are supported.

## Verification

```bash
npx tsc --noEmit
npm run build
```

The refinement plan and verification record are in [docs/superpowers/plans/2026-10-08-portfolio-refinement.md](docs/superpowers/plans/2026-10-08-portfolio-refinement.md).

Project screenshots and portraits live under `public/assets/`. `content/about.md` and `docs/portfolio-design-spec.md` retain the original content and visual brief; the refinement plan records the later approved hierarchy and presentation.
