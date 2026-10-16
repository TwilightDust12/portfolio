# Portfolio Personal Layer Implementation Plan

> **For agentic workers:** Implement this approved plan task by task.

**Goal:** Integrate authentic personal notes into the portfolio—a compact "Now" note in About, personal anime (Re:Zero) and gaming (Apex Legends) notes in Interests, and an approved personal reflection story for WebC in its case-study dialog—while preserving existing visuals, themes, and uncommitted GitHub section changes.

**Architecture:** Extend typed data in `src/types/portfolio.ts` and `src/data/portfolio.ts`. Render server-side where possible (ChronicleSection), integrate into client components where needed (MoodSection, ProjectModal), and add responsive styles in `src/app/globals.css`.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind 3, Radix Dialog.

---

## Content & Design Decisions

1. **Now Note (About / ChronicleSection):**
   - Placement: Inside `ChronicleSection` (`#about`).
   - Wording: *"Lately, I’m learning to trust the process—coding whatever comes to mind, playing games, and watching a few anime. Taking things little by little and following my curiosity."*
   - Updated Date: *"October 2026"* (manually maintained).
   - Layout: Compact panel styled with Catppuccin surface & line colors, mono metadata, rendered on server.

2. **Personal Notes on Favorites (Interests / MoodSection):**
   - Independent of Last.fm and Letterboxd feeds so notes stay attached to the intended titles regardless of feed status.
   - **Re:Zero**:
     - Visible headline: **Re:Zero** — Just finished watching, and honestly, it was peak.
     - Native `<details><summary>Show spoilers</summary>...</details>` containing the character-development reflection: *"Seeing Subaru begin to accept himself and try to love himself more really stayed with me."* and quote: *“You really are an amazing guy, Natsuki Subaru.”*
   - **Apex Legends**:
     - Visible note: **Apex Legends** — *"I keep coming back for the ranked climb, even if I’ve been hardstuck for a while. Lately, I’m learning when to step back and give myself a break. The rank can wait."*

3. **WebC Case-Study Story (ProjectModal):**
   - Optional fields (`contribution`, `learned`, `difficultDecision`, `improvement`) on `Project`.
   - Populated for WebC:
     - **My contribution:** *"I spent a lot of time trying out features and reworking WebC’s UI/UX. The visual style kept bothering me, so I kept changing it. I’m kind of satisfied with where it is now—for now."*
     - **What I learned:** *"Every time I thought I was satisfied, I eventually found something else to improve. WebC taught me that being happy with a version doesn’t mean there’s nothing left to work on."*
   - Unfilled optional fields remain hidden. Team attribution and existing project media behavior stay intact.

4. **Preserved Scope & Constraints:**
   - Keep uncommitted `GithubSection` and related changes intact.
   - Maintain light and dark Catppuccin palettes.
   - Retain keyboard accessibility, dialog escape/focus restore, and reduced-motion compatibility.

---

## Tasks

### Task 1: Type definitions and data model
- [x] Update `src/types/portfolio.ts` to support:
  - `NowUpdate` under `personal.now`
  - `CuratedAnimeNote` on `AnimeInterests.notes`
  - `CuratedGameNote` on `GamingInterests.notes`
  - `ProjectStory` on `Project.story`
- [x] Update `src/data/portfolio.ts` with the approved content for Now, Re:Zero, Apex Legends, and WebC.
- [x] Run `node tests/project-content.cjs` and `npx tsc --noEmit`.

### Task 2: Component updates and CSS styling
- [x] Update `src/components/sections/ChronicleSection.tsx` to render the Now panel with last-updated timestamp.
- [x] Update `src/components/sections/MoodSection.tsx` to render the curated anime note (with spoiler disclosure) and gaming note.
- [x] Update `src/components/ui/ProjectModal.tsx` to render the optional project story sections (`My contribution`, `What I learned`, etc.) when present.
- [x] Update `src/app/globals.css` with styling for `.now-card`, `.spoiler-disclosure`, and case study story typography matching Catppuccin tokens.

### Task 3: Verification & regression checks
- [x] Run `npx tsc --noEmit`.
- [x] Run `node tests/project-content.cjs`.
- [x] Run `npm run build`.
- [x] Run `node tests/personal-layer.cjs`.
- [x] Verify uncommitted GitHub section files and git diff remain clean and preserved.
