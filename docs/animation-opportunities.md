# Portfolio motion refinement and opportunities

## Implemented refinement

Applied the local [apple-design skill](../.agents/skills/apple-design/SKILL.md) and Emil Kowalski's upstream [animate skill](https://github.com/emilkowalski/skills/blob/main/skills/animate/SKILL.md), including its fade/stagger and once-only scroll recipes. `animate` was read upstream because it was not installed locally. The subsequent [find-animation-opportunities pass](../.agents/skills/find-animation-opportunities/SKILL.md) is read-only: the suggestions below have not been implemented.

Gate: occasional portfolio visits; purpose is preventing jarring section appearances. The existing `ScrollEffects.tsx` owns the behavior, so no component, dependency, or parallel animation engine was added.

| Before | After | Why |
| --- | --- | --- |
| Section entrances: 14px rise, 620ms, opacity 0.8 → 1 | Native WAAPI fade-up: 8px → 0, opacity 0 → 1, 300ms, existing `cubic-bezier(0.23, 1, 0.32, 1)` | Short travel and a quick settle suit the quiet workspace |
| Project media scrubbed through a rise, scale, rotation, opacity, and clipping | Same once-only fade-up used by the other entrances | Screenshots settle and stay available to read |
| Entrances reconnected on breakpoint and motion-preference changes | Seen elements persist in a `WeakSet` for the mounted page | Resizing does not replay the same scene |
| Entrance animation could run during keyboard travel | Navigation keys cancel active entrances and suppress new ones until pointer/wheel interaction | Keyboard users get immediately readable content |

Eligible scroll entrances cover section headings, project stages, skills, biography, interests, and contact. Simultaneous entries stagger by 50ms, capped at 100ms. The introduction now belongs to the opening choreography described below. Content is present in server HTML; animations never disable controls. Reduced motion keeps entrances static and retains existing short opacity feedback on interactive state changes. Portrait depth and the interlude continue to track scroll directly; no delayed spring was added to scroll input.

## Opening on visits and reloads

The user subsequently requested an opening animation on first visits and reloads, then extended it to 1.5 seconds. A decorative, noninteractive title card shows `黄昏`, `twilight`, and `twilightdust.me` in the current Catppuccin theme. It begins dissolving at 525ms, is transparent by 1200ms, and completes at 1500ms. The introduction and portrait use the existing 8px fade-up with 50ms offsets as the card clears. Its thin accent rule is decoration, not a loading-progress indicator.

CSS starts the sequence before hydration and clears it even with JavaScript disabled. `ScrollEffects.tsx` dismisses it immediately on a keypress, pointer press, wheel input, or motion-preference change. Focus also bypasses the opening through CSS. Nothing locks scrolling, captures pointers, or waits for images/feeds. Reduced motion uses a 200ms opacity fade with no positional animation. No storage suppresses the sequence on a subsequent document visit or reload; resizing and preference changes after completion cannot replay it. Late hydration detects an already-completed CSS animation and settles it immediately.

Verification before the duration adjustment: nine focused browser checks passed across the opening, existing fade-up/portrait behavior, compact layouts, keyboard input, live reduced motion, and no-JavaScript reading/PDF download. The existing Chromium motion interaction suite also passed. One no-JavaScript test was corrected to wait outside the page because its original RAF polling cannot run with JavaScript disabled. The final 1.5-second version passed production build/TypeScript, lint, content checks, and all four focused opening/no-JavaScript browser checks. Desktop and phone title cards were inspected; `opening-first.png` and `opening-reload.png` are saved in the evidence folder. Real devices and other browser engines remain untested.

## Earlier fade-up verification

- Production build and TypeScript passed. Lint and diff formatting passed.
- Five targeted browser checks passed with native timelines, and the same five passed with native timelines disabled. They cover portrait interactions, 320/360/390px layouts, live motion preferences, sampled fade progression, once-only behavior after resizing, and immediate keyboard cancellation.
- The existing Chromium motion interaction suite passed, covering rapid profile/screenshot switching, dialogs, nested focus restoration, keyboard skips, reduced motion, touch emulation, mobile overflow, and both themes. Its focus checks now await Radix focus restoration; its entrance check awaits animation completion instead of assuming a fixed delay is enough.
- Inspected desktop hero/project, compact skills, and reduced-motion interests screenshots. [Evidence](../scrollcraft/builds/twilight-workspace/evidence/) includes `fluid-hero.png`, `fluid-project.png`, `fluid-mobile-skills.png`, and `fluid-reduced-interests.png`.

Preview: `http://127.0.0.1:3135`. These focused checks supersede the earlier scroll-craft report for the changed entrance behavior. The previous 264-sample capture remains historical evidence, not a new run of this revision.

## Opportunities table

Recon: Next.js 16 / React 19, existing Motion 14 scroll drivers, native WAAPI entrances, Radix dialogs, Sonner feedback, and CSS state transitions. The house curves live in `src/app/globals.css:25–27`. Personality remains melancholy, restrained, and personal. Navigation is frequent; preview switching is occasional; asynchronous personal feeds load once per mount. No new hover motion is proposed.

| # | Location | Today | Purpose | Frequency | Suggested motion |
| --- | --- | --- | --- | --- | --- |
| 1 | `src/components/sections/HeroSection.tsx:45` | Rear sheet images replace their source instantly; the front portrait already crossfades | Preventing a jarring change | Occasional pointer profile changes; keyboard changes stay instant | Keep rear image variants mounted like the front portrait. Transition only opacity 0 ↔ 0.6 over **200ms `var(--ease-out)`**, exactly `cubic-bezier(0.23, 1, 0.32, 1)`. Retarget current opacity on rapid presses. Reduced motion: **120ms**, no movement; keyboard: **0ms**. Function gate: preserves sheet position and the usable front button. |
| 2 | `src/components/sections/MoodSection.tsx:58` and `:74` | Feed placeholders switch directly to music/film or fallback content | State indication | Once per feed load; only useful when the panel is already visible | Fade the newly resolved content from opacity **0 → 1 over 180ms `var(--ease-out)`**, exactly `cubic-bezier(0.23, 1, 0.32, 1)`, with **0ms delay**. Reduced motion: **120ms opacity only**. Do not replay the panel entrance, animate layout, or delay links; skip the extra fade when the panel is offscreen or its entrance is still active. Function gate: bridges the state change without moving readable data. |

Both rows pass the frequency, purpose, sub-300ms speed, and function gates. Neither introduces hover behavior. The rear-image overlap and async handoff should be checked at 2–5× playback speed before implementation is accepted; code alone cannot establish their feel.

## Rejected candidates

- `src/components/layout/WaybarHeader.tsx:41`: animated workspace navigation or focus travel. **Rejected at frequency gate: keyboard-initiated navigation must remain immediate.**
- `src/components/ui/contribution-skyline.tsx:1151`: extra count-up, wave, or hover flourishes on contribution statistics. **Rejected at function gate: these are numbers visitors are reading.** Existing view/orbit interactions already explain the data's spatial arrangement.
- `src/components/ui/CopyEmailButton.tsx:33`: a celebratory checkmark or button bounce. **Rejected at purpose gate: the checkmark, live label, and toast already confirm copying.** Extra motion adds no needed feedback.
- `src/components/sections/MoodSection.tsx:95`: animated spoiler prose disclosure. **Rejected at function gate: immediately readable text and predictable document movement matter more than decoration here.** Keep native keyboard behavior.

Sweep coverage: existing press controls already have subtle feedback; asynchronous feed replacement and rear portraits are the surviving state seams; Radix surfaces already have entrances/exits and focus handling; group entrances are covered by the new fade-up; the existing canvas owns its drag/orbit behavior; there are no destructive actions requiring hold-to-confirm. Loading, empty, and error feed states belong to the same handoff in row 2. No separate celebration is warranted.

## Verdict

The portfolio now has enough page motion. The highest-value remaining refinement is the rear portrait crossfade because it would complete the existing signature interaction. Keep both suggestions optional and bounded. Handoff: `improve-animations plan crossfade the rear portrait sheets using opportunity 1 in docs/animation-opportunities.md`.

Not deployed. Validation used Chromium with emulated touch and deterministic feeds; real devices, Firefox, WebKit, and physical frame pacing were not tested.
