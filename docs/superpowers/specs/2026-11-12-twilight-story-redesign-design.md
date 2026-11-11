# Twilight story redesign — design

Date: 2026-11-12. Status: draft for Jose's approval.

Source of truth for intent is the brainstorming conversation of this date. Anything marked **(Jose)** is his decision; anything marked **(call)** is the designer's call and may be overridden.

## Intent

The current site is well built and already personal (Catppuccin, Wayland/Linux, anime, live music and film feeds), but it under-uses its identity and reads like a styled résumé: the palette is effectively lavender-on-dark, the four projects share one identical template, and skills are a list of names.

Jose wants visitors to come away thinking he's **a guy who knows things** and to see the thing the current site hides: **he adapts to new things quickly (Jose)**. He wants the page to feel like it is **telling a story as you scroll (Jose)**, and to stay colorful and his, not another monochrome portfolio **(Jose)**.

The story, in one line **(Jose, agreed)**: *every project asked me to learn something new, and I learned it fast.*

## Goals

1. Color that is unmistakably "twilight" and alive, driven by the real time in Lucena City.
2. A page that reads top-to-bottom as one story: opening → four chapters → what I picked up → the workspace → about → away from the keyboard → contact.
3. Each project shows what it demanded, what Jose had to figure out, and what shipped — so expertise is *demonstrated*, not claimed.
4. Depth in the background (layered parallax sky) that supports the story without competing with content.

## Non-goals

- Rewriting Jose's voice. The modest tone ("a little curious", "little by little") stays **(Jose)**. Confidence comes from evidence, not bolder copy.
- Changing the hiring target, palettes' family (Catppuccin Mocha/Latte), typefaces, portrait deck, feeds, GitHub skyline, theme toggle, "Remove the bloat" control, or résumé download.
- New dependencies, generated images, or paid APIs (carried from `scrollcraft/builds/twilight-workspace/BRIEF.md`).

## Anti-goals (failure even if it "works")

- **Looking AI-generated (Jose).** Specifically banned: gradient-clipped text, gradient backgrounds or gradient buttons, cutesy labels ("golden hour"), rainbow multi-accent screens. Jose rejected the first gradient mockup on exactly these grounds.
- Parallax or motion on content (text, screenshots, headings).
- Scroll hijacking, pinned sections that hold the user, or scroll-length spacers.
- Inventing technical decisions, metrics, or outcomes. Every claim in the chapters comes from Jose (see copy below) or existing `src/data/portfolio.ts`.
- Overclaiming Sphere8 traffic or SEO.

## Constraints

- Next.js 16 / React 19 / Tailwind 3 / framer-motion as already installed. Read `node_modules/next/dist/docs/` before touching framework APIs (per `AGENTS.md`).
- The home page is statically rendered. Do not make it dynamic just for the color.
- Existing accessibility guarantees stay: no-JS readability, reduced-motion static scene, 44px targets, visible focus, dialog focus return, AA contrast.
- Existing browser test suites in `tests/` must keep passing or be updated to the new structure with the same coverage intent.

## 1. Color: the real sky over Lucena (Jose chose this, "B2")

**One accent at a time (Jose).** The whole site uses a single accent, selected by the current time in `Asia/Manila`, regardless of the visitor's timezone.

**Where it shows (Jose).** Only where `--accent-text` already appears: the period after "Jaro", buttons, section numbers, links, active nav, focus rings, selection, reading-progress bar, portrait-frame corners, hero orbit. Everything else stays Mocha/Latte neutrals. Name stays solid rosewater. No gradients anywhere (the existing `.page-shell::before` radial glow may stay only if it reads as ambient light, not a visible gradient; builder's judgment, lean to removing).

**Bands (call):**

| Band | PHT | Mocha accent |
|---|---|---|
| dawn | 05:00–07:00 | flamingo `#f2cdcd` |
| morning | 07:00–11:00 | sky `#89dceb` |
| midday | 11:00–15:00 | yellow `#f9e2af` |
| afternoon | 15:00–17:30 | peach `#fab387` |
| sunset | 17:30–19:00 | pink `#f5c2e7` |
| evening | 19:00–22:00 | mauve `#cba6f7` |
| night | 22:00–05:00 | blue `#89b4fa` |

**Light mode (call):** use the Catppuccin Latte counterpart of each band, darkened where needed so every band's `--accent-text` meets 4.5:1 on the Latte base and `--on-accent` button text meets 4.5:1. Several raw Latte colors (yellow, sky) will fail and must be adjusted. Exact values are the builder's, verified by a contrast check.

**No flash (call, revised from the conversation).** In the conversation this was described as "computed on the server". Because the page is static, instead set a `data-sky="<band>"` attribute on `<html>` with a tiny inline pre-paint script in the root layout (same pattern `next-themes` uses), and define each band's tokens in CSS keyed off `[data-sky]` × `.dark`. Without JS, fall back to the evening (mauve) accent — today's look. While a tab stays open, re-check each minute; on a band change, transition the accent over ~2s (instant under reduced motion).

**The clock (call).** `ManilaClock` gains a small dot in the current accent and one quiet plain-language line near it, e.g. "It's evening in Lucena City." Wording per band is the builder's, plain and literal.

**Starfield density (call, least certain).** Fewer stars in daytime bands, full field at night.

## 2. Page story and order (Jose: "nothing's missing")

1. **Opening.** Existing hero, portrait deck, tagline unchanged.
2. **Four chapters.** WebC, OwlSet, Sphere8, Lily Chou-Chou (current order). Each chapter has three beats: *What it asked of me* / *What I had to figure out* / *What shipped* (media sits with "what shipped"). Copy below.
3. **"Picked up along the way" (call).** Replaces the Skills table (`ArsenalSection`). Tools are grouped under the chapter where they were learned, so the range reads as one learning story. Tools not tied to a chapter (Docker, GitHub Actions, Playwright, ASP.NET, Unity, SQL Server, etc.) go in a short final group, e.g. "And along the way". Exact grouping is the builder's, using only tools already in `portfolio.ts`.
4. **Interlude — the workspace (call).** The Wayland rice, currently tacked on after the four projects, becomes a short break between the work and the person.
5. **About + GitHub skyline.** "Little by little." Existing content.
6. **Away from the keyboard.** Existing interests/music/cinema section.
7. **Contact.** Existing.

**Chapter layout.** The four chapters must not share one identical template — that sameness was a main critique. They share the three-beat structure and the ordinal, but vary in composition (e.g. media side, media scale, OwlSet's phone video vs Sphere8's wide desktop shot vs Lily's full-bleed still). Lily Chou-Chou, the most personal and visual piece, may take the most space. Specific compositions are the builder's. The sticky project index plus header currently eats ~150px on desktop while scrolling projects; reduce that (merge into the header or shrink).

## 3. Chapter copy

Use as written; light copyediting allowed, no new claims. Data model: `ProjectStory` in `src/types/portfolio.ts` already has `contribution`, `difficultDecision`, `learned`, `improvement`. Map beats onto it or add fields (`asked`, `figuredOut`) — builder's choice.

**01 · WebC** (from existing data)
- *What it asked of me:* Not just building the student, department and admin dashboards, but leading our four-person capstone team as Project Manager and Quality Officer, applying the ISO Process Approach.
- *What I had to figure out:* That a working version can still need refinement — I kept testing features and reviewing the UI as the project developed instead of treating the first complete version as the end.
- *What shipped:* Existing WebC outcome + screenshots.

**02 · OwlSet** (Jose)
- *What it asked of me:* Our first hackathon outside STI College Lucena, built around an idea none of us knew how to build yet: AI that runs on the phone itself.
- *What I had to figure out:* How to run a language model locally on Android. We had the app download a small model that runs on ordinary phones, then ran it inside the app with llama.rn, so the scope checks work without a server or an internet connection.
- *What shipped:* An Android test build that drafts project scope, stores confirmed agreements, and checks new client requests against them. (demo video)

**03 · Sphere8 Construction** (Jose)
- *What it asked of me:* Nobody asked. I wanted another project, so I offered to build my cousin's construction company a website they could show clients. That made it my first build for a real business.
- *What I had to figure out:* Building it was the familiar part. Shipping it wasn't. I deployed it on Netlify, set up the inquiry form for real client messages, and learned that launching a site and getting it found are two different jobs. Search visibility is what I'm working on next.
- *What shipped:* A live company site with 25 project photos, category filters, a lightbox, and an inquiry form. (live demo)

**04 · All About Lily Chou-Chou** (Jose)
- *What it asked of me:* Nothing, except that I couldn't stop thinking about the film: the music, the cinematography, and the way it captures what different people are feeling without saying it. I wanted to make something that felt like the film, not a page about it.
- *What I had to figure out:* Making the Discman listening room feel smooth instead of broken. It was my first time with the Web Audio API, and I kept tinkering with the playback and the real-time visualizer until switching tracks felt like using a real Discman.
- *What shipped:* An interactive tribute with a still gallery, a nine-track Discman listening room, and real-time audio visualizations. (live demo)

## 4. Parallax sky (Jose asked; scoped by call)

Split the existing pixel starfield into 2–3 depth layers that translate at different rates with scroll (far ≈ barely, near ≈ a little). Background only; never content. Keep the single-fixed-canvas performance characteristics (≤16 FPS twinkle, pause in hidden tab) or better. Reduced motion: still sky, no scroll translation. Shooting stars stay.

## 5. Settled after builder review (calls)

- **Case-study modal stays (call).** It becomes the technical-depth layer: `longDescription`, `highlights`, full stack, screenshots. Remove `problem` / `contribution` / `learned` from it, since the chapter beats now carry the story inline. Dialog and focus-return guarantees and tests stay. This is where concrete technical evidence (Azure login, Drizzle, structured data, etc.) lives, which supports "knows things".
- **"Remove the bloat" / essentials view (call).** Chapters keep all three beats as text. "What shipped" shows the outcome sentence plus links, without media. The workspace interlude, GitHub skyline, interests, and stars are dropped, as today. About stays. If the existing `main` height budget in `tests/essentials.browser.cjs` breaks, raise it only as much as the three-beat text needs, and record the new number in the test with a comment.
- **"Picked up along the way" grouping (call).** The data can't prove where each tool was *learned*, so group by **first chapter that used it** in page order (WebC → OwlSet → Sphere8 → Lily). A tool in several stacks goes under its first chapter. Tools in no chapter go in a final group titled "Also worked with", with no claim about when. The section heading may keep "Picked up along the way" (colloquial). No per-tool "learned in X" wording.

## Left to the builder

- Exact light-mode band values (subject to contrast).
- Per-band clock line wording.
- Chapter compositions and the sticky-index fix.
- Skills regrouping details.
- Parallax implementation (multiple canvases vs one canvas with layered offsets).
- How existing tests are updated to the new structure.

## Confirmed after review (Jose)

- OwlSet ran the model inside the app with **llama.rn** (matches existing `portfolio.ts`). Ollama is not mentioned anywhere.
- Lily Chou-Chou was his first time using the Web Audio API.
