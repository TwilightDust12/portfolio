# Twilight workspace verification

Historical baseline: the later [motion refinement and opportunities report](../../../docs/animation-opportunities.md) supersedes this report for entrance animation behavior and records its focused verification.

Completed after resuming the requested pause on 2026-11-03. Application source was unchanged during the resumed verification; the final production build was reused. Changes remain uncommitted and have not been deployed.

## Direction and result

The [interview brief](BRIEF.md) records the user's melancholy, lost mood, distinct workspace scenes, and desire to retain their overall personality. The chosen grammar is a personal workspace album. [SCORE.md](SCORE.md) explains why the eight standard grammars did not fit and records the layer contract, sequence, and runtime ownership.

The signature is a scroll-opening portrait stack using existing alternate profiles. Catppuccin themes, Waybar navigation, anime, Linux, music, and cinema remain part of the page. Projects appear early, with internships leading the hiring pitch and junior roles welcome. The project collection owns the largest combined span through real content, without artificial pinning or spacers. The contact scene closes with useful email actions.

Intended curve: wistful curiosity → confidence → release → trust → intimacy → resolve.

Observed visual curve: quiet/personal → useful/confident → release → trustworthy → personal → settled. Desktop, phone, compact-phone, and reduced-motion contact sheets were inspected across the full journey. The reduced-motion version retains complete scenes without positional animation.

## Corrections verified

- Compact mobile portrait placement avoids overlap and keeps projects visible earlier.
- Artwork masking, quieter stars, and light-theme text adjustments improve composited contrast. Minimum sampled body-text contrast is 5.30:1; sampled large heading contrast is at least 4.79:1. These are sampled results, not a complete accessibility audit.
- Motion teardown cancels animations before detaching timelines and restores inline styles. Live preference changes leave no fractional clipping, hidden content, or browser errors.
- Existing installed Motion owns animation. Archived skill engine copies are not loaded into production; no new dependency was added.

## Proof

- Final-source scroll-craft browser acceptance: **9/9 passed**. Includes independent portrait movement, pointer/keyboard cycling, compact layouts at 320/360/390px, live reduced-motion changes, rendered text contrast in both themes, no-JavaScript reading, and an actual résumé PDF download.
- **264 scroll samples**: 11 scenes × 6 positions × desktop, phone, compact phone, and reduced motion. Twelve contact sheets show three sampled positions per scene; the individual screenshots remain temporary artifacts.
- Existing hiring acceptance: **11/11 passed on final source**, including early projects and sharing metadata.
- Earlier regression checks passed: production build, lint, TypeScript, content checks, native and forced-JavaScript motion suites, plus three focused fallback checks. The resumed run changed documentation and saved evidence only.
- Local production preview returned HTTP 200 at `http://127.0.0.1:3134`.

The browser harness is [tests/scrollcraft.browser.cjs](../../../tests/scrollcraft.browser.cjs). Durable evidence lives in [evidence/](evidence/): `desktop-sheet-0.jpg` through `desktop-sheet-2.jpg`, equivalent phone/compact/reduced sheets, four state reports, and `contrast.json`.

## Limits

Browser verification used Chromium and emulated viewports. Real phones, Firefox, and WebKit were not checked. External feeds were intercepted for deterministic browser checks, so these results do not verify live upstream availability. No deployment, DNS changes, commit, push, new dependencies, or generated imagery was performed.
