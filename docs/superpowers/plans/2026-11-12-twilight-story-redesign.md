# Twilight Story Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the portfolio into a scroll story (four project chapters → tools picked up → workspace interlude → about → interests → contact) colored by the real sky over Lucena City, with a layered parallax starfield.

**Architecture:** A pure `src/lib/sky.ts` module owns the time bands, colors, the pre-paint inline script, and the CSS overrides for `--accent-text` / `--on-accent`, so one table drives server HTML, client updates, and tests. Chapter copy lives in `src/data/portfolio.ts` as a new `chapter` field; a pure `src/lib/picked-up.ts` derives the tools section from project stacks and skills. Everything else is edits to existing section components and the existing canvas starfield.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind 3, framer-motion (already installed), Radix Dialog. Tests are plain Node scripts (`tests/*.cjs`, using `typescript.transpileModule` like `tests/project-content.cjs`) and Playwright browser scripts (`tests/*.browser.cjs`).

**Spec:** `docs/superpowers/specs/2026-11-12-twilight-story-redesign-design.md`

## Global Constraints

- Work on branch `feat/twilight-story-redesign` off `master`.
- No new dependencies. No generated images or new external assets.
- Banned: gradient-clipped text, gradient backgrounds/buttons, cutesy labels ("golden hour"), more than one accent hue on screen at a time. Name stays solid rosewater.
- No parallax or scroll-linked motion on content (text, screenshots, headings). Parallax only in the starfield.
- No scroll hijacking, pinning that holds the user, or spacer elements.
- No invented technical claims: chapter copy is used verbatim from the spec §3 (light copyediting only). OwlSet says **llama.rn**, never Ollama.
- Home page stays statically rendered; do not add `dynamic`, `headers()`, or `cookies()` to it.
- Keep: no-JS readability, reduced-motion static scene, 44px targets, visible focus, dialog focus return, AA contrast (4.5:1 text).
- Before touching Next.js APIs (inline scripts/`<head>` in the root layout), read the relevant guide in `node_modules/next/dist/docs/` (per `AGENTS.md`).
- Browser tests run against a production server: `npm run build && npm run start -- --port 3120`, then `PORTFOLIO_BASE_URL=http://localhost:3120 node tests/<name>.browser.cjs`. Locally set `PLAYWRIGHT_MODULE="$(npm root -g)/@playwright/cli/node_modules/playwright"` and `CHROMIUM_PATH="$HOME/.cache/ms-playwright/chromium_headless_shell-1248/chrome-headless-shell-linux64/chrome-headless-shell"`. New browser tests copy the setup/`test()` helper pattern from `tests/essentials.browser.cjs`.
- Existing tests that assert removed structure are updated in the task that removes it, keeping the same coverage intent; none are deleted wholesale.

## Review Focus

1. A tab left open across a band boundary (17:29 → 17:30 PHT) switches accent, clock dot, and sky line without reload, fading over ~2s, instantly under reduced motion. → Task 2, `band change while open`.
2. A visitor in another timezone (`America/New_York`) still gets the Lucena band. → Task 2, `visitor timezone does not matter`.
3. Every band in light mode keeps 4.5:1 contrast for links and for button text. → Task 1 contrast test + Task 2 `light theme uses latte value`.
4. JavaScript disabled: today's mauve accent, no sky line, chapters fully readable. → Task 2 `no-JS falls back to evening` + Task 4 assertion.
5. Toggling "Remove the bloat" while reading the workspace interlude keeps the reader at About instead of jumping. → Task 6 `essentials from workspace anchors to about`.

---

### Task 1: Sky model

**Files:**
- Create: `src/lib/sky.ts`
- Test: `tests/sky.cjs`

**Interfaces:**
- Produces:
  - `type SkyBand = 'dawn' | 'morning' | 'midday' | 'afternoon' | 'sunset' | 'evening' | 'night'`
  - `interface SkyBandDef { id: SkyBand; start: number /* minutes after 00:00 PHT */; label: string; mocha: string; latte: string }`
  - `const SKY_BANDS: readonly SkyBandDef[]` ordered by `start`
  - `function skyBandAt(date: Date): SkyBand` — PHT is fixed UTC+8 (no DST), so compute from UTC hours/minutes; no `Intl`.
  - `function skyScript(): string` — self-contained IIFE that sets `document.documentElement.dataset.sky` using the same table (embed `SKY_BANDS` starts/ids via `JSON.stringify`).
  - `function skyCss(): string` — for each band: `html[data-sky="<id>"]{--accent-text:<latte>;--on-accent:#ffffff}` and `html.dark[data-sky="<id>"]{--accent-text:<mocha>;--on-accent:#11111b}`.
  - `const SKY_LIGHT_BASE = '#eff1f5'`, `const SKY_DARK_BASE = '#1e1e2e'`

Band table (spec §1). `mocha` values are fixed; `latte` values are yours, darkened from the Catppuccin Latte counterpart until the contrast test passes:

| id | start (PHT) | label | mocha |
|---|---|---|---|
| dawn | 05:00 | It's early morning in Lucena City. | `#f2cdcd` |
| morning | 07:00 | It's morning in Lucena City. | `#89dceb` |
| midday | 11:00 | It's midday in Lucena City. | `#f9e2af` |
| afternoon | 15:00 | It's late afternoon in Lucena City. | `#fab387` |
| sunset | 17:30 | It's sunset in Lucena City. | `#f5c2e7` |
| evening | 19:00 | It's evening in Lucena City. | `#cba6f7` |
| night | 22:00 | It's late at night in Lucena City. | `#89b4fa` |

- [ ] **Step 1: Create the branch**

Run: `git switch -c feat/twilight-story-redesign`

- [ ] **Step 2: Write the failing test `tests/sky.cjs`**

Load `src/lib/sky.ts` with `ts.transpileModule` + `new Function('exports', ...)` exactly as `tests/project-content.cjs` loads `portfolio.ts`. Assertions:

```js
const at = (iso) => sky.skyBandAt(new Date(iso)); // ISO in UTC; PHT = UTC+8
assert.equal(at('2026-11-12T09:29:00Z'), 'afternoon'); // 17:29 PHT
assert.equal(at('2026-11-12T09:30:00Z'), 'sunset');    // 17:30
assert.equal(at('2026-11-12T20:59:00Z'), 'night');     // 04:59
assert.equal(at('2026-11-12T21:00:00Z'), 'dawn');      // 05:00
assert.equal(at('2026-11-12T14:00:00Z'), 'night');     // 22:00
assert.equal(at('2026-11-12T04:00:00Z'), 'midday');    // 12:00
assert.equal(at('2026-11-12T12:00:00Z'), 'evening');   // 20:00
assert.deepEqual(sky.SKY_BANDS.map((b) => b.id), ['dawn','morning','midday','afternoon','sunset','evening','night']);
// contrast (WCAG relative luminance; write a 10-line helper in the test)
for (const b of sky.SKY_BANDS) {
  assert(contrast(b.latte, sky.SKY_LIGHT_BASE) >= 4.5, `${b.id} latte link contrast`);
  assert(contrast('#ffffff', b.latte) >= 4.5, `${b.id} latte button contrast`);
  assert(contrast(b.mocha, sky.SKY_DARK_BASE) >= 4.5, `${b.id} mocha link contrast`);
  assert(contrast('#11111b', b.mocha) >= 4.5, `${b.id} mocha button contrast`);
}
// inline script agrees with skyBandAt for every 15 minutes of a day
for (let m = 0; m < 1440; m += 15) {
  const t = Date.UTC(2026, 10, 12, 0, 0) + (m - 480) * 60000;
  class FakeDate extends Date { constructor(...a) { super(...(a.length ? a : [t])); } static now() { return t; } }
  const document = { documentElement: { dataset: {} } };
  vm.runInNewContext(sky.skyScript(), { document, Date: FakeDate });
  assert.equal(document.documentElement.dataset.sky, sky.skyBandAt(new Date(t)));
}
const css = sky.skyCss();
for (const b of sky.SKY_BANDS) {
  assert(css.includes(`html[data-sky="${b.id}"]{--accent-text:${b.latte}`));
  assert(css.includes(`html.dark[data-sky="${b.id}"]{--accent-text:${b.mocha}`));
}
assert(!/gradient/i.test(css));
console.log('Sky model checks passed.');
```

- [ ] **Step 3: Run it to verify it fails**

Run: `node tests/sky.cjs`
Expected: FAIL (cannot read `src/lib/sky.ts`).

- [ ] **Step 4: Implement `src/lib/sky.ts`** with the interfaces above. `sky.ts` must not import React or anything else, so the Node test can evaluate it.

- [ ] **Step 5: Run it to verify it passes**

Run: `node tests/sky.cjs`
Expected: `Sky model checks passed.`

- [ ] **Step 6: Commit**

```bash
git add src/lib/sky.ts tests/sky.cjs
git commit -m "feat(sky): add Lucena time bands and accent tokens"
```

---

### Task 2: Wire the sky into the page

**Files:**
- Modify: `src/app/layout.tsx` (inject `skyScript()` as a pre-paint inline `<script>` and `skyCss()` as `<style>` in `<head>`)
- Modify: `src/app/globals.css` (register `@property --accent-text` with `syntax:'<color>'; inherits:true; initial-value:#cba6f7`; `html[data-sky-transition]{transition:--accent-text 2s ease}` outside reduced motion; remove the `.page-shell::before` radial gradient at line 65; style `.sky-dot` and `.sky-line`)
- Create: `src/components/ui/useSkyBand.ts`
- Create: `src/components/ui/SkyLine.tsx`
- Modify: `src/components/ui/ManilaClock.tsx`
- Modify: `src/components/sections/HeroSection.tsx` (render `<SkyLine />` in the hero eyebrow row after "Jose's corner of the internet")
- Test: `tests/sky.browser.cjs`

**Interfaces:**
- Consumes: `SKY_BANDS`, `skyBandAt`, `skyScript`, `skyCss`, `SkyBand` from Task 1.
- Produces:
  - `function useSkyBand(): SkyBand | null` — `useSyncExternalStore` over a `MutationObserver` on `<html>` `data-sky`; server snapshot `null`.
  - `<SkyLine />` — renders the band's `label` in a `<p class="sky-line">`, nothing when `null`.
  - `ManilaClock` keeps its markup and adds `<span class="sky-dot" aria-hidden="true">` (background `var(--accent-text)`). On each tick, if `skyBandAt(now)` differs from `document.documentElement.dataset.sky`, set `data-sky-transition` on `<html>`, update `data-sky`, and remove `data-sky-transition` after 2100ms. Skip the transition attribute when `prefers-reduced-motion: reduce`.

- [ ] **Step 1: Write the failing test `tests/sky.browser.cjs`**

Each case creates a context, calls `page.clock.install({ time })` **before** `page.goto`. Tests:

```js
test('sunset band paints before hydration', async () => {
  // 2026-11-12T10:00Z = 18:00 PHT
  assert.equal(await page.evaluate(() => document.documentElement.dataset.sky), 'sunset');
  assert.equal(await cssVar('--accent-text'), SUNSET.mocha); // dark is default theme
  assert.match(await page.locator('.sky-line').innerText(), /It's sunset in Lucena City\./);
});
test('visitor timezone does not matter', /* context { timezoneId: 'America/New_York' }, same time, expect 'sunset' */);
test('band change while open', async () => {
  // install at 09:29:30Z (17:29:30 PHT); expect 'afternoon'
  await page.clock.runFor(60_000);
  // expect data-sky 'sunset', .sky-line text updated, data-sky-transition present then gone after runFor(2_200)
});
test('reduced motion switches without transition', /* reducedMotion: 'reduce'; after runFor, data-sky-transition never set */);
test('light theme uses latte value', /* click theme toggle → light; cssVar equals SUNSET.latte */);
test('no-JS falls back to evening', async () => {
  // context { javaScriptEnabled: false } — page scripts don't run; Playwright's evaluate still reads styles
  assert.equal(await page.evaluate(() => document.documentElement.dataset.sky), undefined);
  assert.equal(await cssVar('--accent-text'), '#cba6f7');
  assert.equal(await page.locator('.sky-line').count(), 0);
});
```

Read `SUNSET` values from `src/lib/sky.ts` the same way `tests/sky.cjs` does. Also assert `getComputedStyle(document.querySelector('.page-shell'), '::before').backgroundImage` is `none`.

- [ ] **Step 2: Build, start, run to verify it fails**

Run: `npm run build && (npm run start -- --port 3120 &) && node tests/sky.browser.cjs`
Expected: FAIL (`data-sky` undefined).

- [ ] **Step 3: Implement the files listed above.**

- [ ] **Step 4: Rebuild, restart, run to verify it passes**

Run: same as Step 2.
Expected: all cases pass.

- [ ] **Step 5: Regression run**

Run: `node tests/theme-hydration.browser.cjs && node tests/scrollcraft.browser.cjs && npx tsc --noEmit && npm run lint`
Expected: pass. (Theme hydration covers that the extra head script does not break `next-themes`.)

- [ ] **Step 6: README** — in `README.md`, add one paragraph under "Content and integrations" describing `src/lib/sky.ts` and the band table, and add `node tests/sky.cjs` / `node tests/sky.browser.cjs` to "Verification".

- [ ] **Step 7: Commit**

```bash
git add src/app/layout.tsx src/app/globals.css src/components/ui/useSkyBand.ts src/components/ui/SkyLine.tsx src/components/ui/ManilaClock.tsx src/components/sections/HeroSection.tsx tests/sky.browser.cjs README.md
git commit -m "feat(sky): color the site by the time in Lucena City"
```

---

### Task 3: Chapter data

**Files:**
- Modify: `src/types/portfolio.ts` (add `ProjectChapter`; add `chapter?: ProjectChapter` to `Project`; remove `ProjectStory` and `story`)
- Modify: `src/data/portfolio.ts` (add `chapter` to the four featured projects; remove WebC `story`)
- Modify: `tests/personal-layer.cjs` (replace the story block, lines 36–49 and 65–66)
- Modify: `tests/project-content.cjs`

**Interfaces:**
- Produces: `interface ProjectChapter { asked: string; figuredOut: string; shipped: string }`

Copy (spec §3, verbatim). WebC `shipped` = WebC's existing `outcome` string.

- [ ] **Step 1: Write failing assertions**

In `tests/project-content.cjs`:

```js
const featured = projects.filter((p) => p.featured);
for (const p of featured) for (const k of ['asked', 'figuredOut', 'shipped']) assert(p.chapter?.[k]?.length > 20, `${p.id}.chapter.${k}`);
assert(!projects.find((p) => p.id === 'wayland-rice').chapter);
const owl = projects.find((p) => p.id === 'owlset');
assert.match(owl.chapter.figuredOut, /llama\.rn/);
assert.doesNotMatch(JSON.stringify(projects), /ollama/i);
assert.match(owl.chapter.asked, /first hackathon outside STI College Lucena/);
assert.match(projects.find((p) => p.id === 'sphere8').chapter.figuredOut, /Netlify[\s\S]*Search visibility is what I'm working on next/);
assert.match(projects.find((p) => p.id === 'lily-chou-chou').chapter.figuredOut, /first time with the Web Audio API/);
assert.equal(projects.find((p) => p.id === 'webc').chapter.shipped, projects.find((p) => p.id === 'webc').outcome);
```

In `tests/personal-layer.cjs`, replace the story checks with: WebC `chapter.asked` matches `/four-person capstone team as Project Manager and Quality Officer/`; WebC `chapter.figuredOut` matches `/a working version can still need refinement/`; no project has a `story` key; `ProjectModal.tsx` source does **not** contain `project.story`.

- [ ] **Step 2: Run to verify they fail**

Run: `node tests/project-content.cjs; node tests/personal-layer.cjs`
Expected: FAIL on `chapter`.

- [ ] **Step 3: Update types and data.** Remove the `story` rendering lines from `src/components/ui/ProjectModal.tsx` (lines with `project.story?.…`) and the `"The problem"` block, so `tsc` passes; keep "My role", "The result", "Built with", "Inside the project", "Implementation details" (spec §5: modal is the technical-depth layer).

- [ ] **Step 4: Run to verify they pass**

Run: `node tests/project-content.cjs && node tests/personal-layer.cjs && npx tsc --noEmit`
Expected: pass.

- [ ] **Step 5: Commit**

```bash
git add src/types/portfolio.ts src/data/portfolio.ts src/components/ui/ProjectModal.tsx tests/project-content.cjs tests/personal-layer.cjs
git commit -m "feat(projects): add three-beat chapter copy"
```

---

### Task 4: Chapters on the page

**Files:**
- Modify: `src/components/sections/ProjectsSection.tsx`
- Modify: `src/app/globals.css` (chapter layouts; `.project-index` drops `position: sticky`)
- Modify: `tests/essentials.browser.cjs`, `tests/motion.browser.cjs`, `tests/scrollcraft.browser.cjs` as needed
- Test: `tests/chapters.browser.cjs`

**Interfaces:**
- Consumes: `Project.chapter` from Task 3.
- Produces: each featured `<article class="project-feature" id="project-<id>" data-layout="<layout>">` with `<dl class="chapter-beats">` containing `<dt>`s exactly `What it asked of me`, `What I had to figure out`, `What shipped`. Layout map: `webc → media-left`, `owlset → phone`, `sphere8 → media-right`, `lily-chou-chou → full-bleed`. The `.supporting-projects` block is removed (the rice moves to Task 6).

Rules: role stays as a single line under the title (hiring-relevant). Media sits with "What shipped" (inside or directly beside the third beat, per layout). In essentials the media is omitted; "What shipped" shows `chapter.shipped` plus links. The four layouts must differ in composition, and `full-bleed` gives Lily the widest media. Keep `.project-index` with `aria-current` tracking, but not sticky. The "Selected projects." heading and eyebrow may be retitled; keep `id="works"` and the `#projects` alias.

- [ ] **Step 1: Write the failing test `tests/chapters.browser.cjs`**

```js
test('four chapters with three beats each', async () => {
  const chapters = page.locator('article.project-feature');
  assert.equal(await chapters.count(), 4);
  for (const id of ['webc', 'owlset', 'sphere8', 'lily-chou-chou']) {
    const dts = await page.locator(`#project-${id} .chapter-beats dt`).allInnerTexts();
    assert.deepEqual(dts, ['What it asked of me', 'What I had to figure out', 'What shipped']);
  }
  assert.deepEqual(await chapters.evaluateAll((els) => els.map((e) => e.dataset.layout)), ['media-left', 'phone', 'media-right', 'full-bleed']);
  assert.match(await page.locator('#project-owlset').innerText(), /llama\.rn/);
});
test('layouts actually differ', async () => {
  // desktop 1440x900: the media boxes of the four chapters do not share the same (x, width) pair
});
test('project index no longer sticks', async () => {
  assert.notEqual(await page.locator('.project-index').evaluate((e) => getComputedStyle(e).position), 'sticky');
});
test('no-JS readable chapters', /* javaScriptEnabled:false: all 12 beat <dd> texts are visible and non-empty */);
test('no gradients on chapter text', /* every element under #works has computed backgroundClip !== 'text' */);
```

- [ ] **Step 2: Build, start, run to verify it fails**

Run: `npm run build && (npm run start -- --port 3120 &) && node tests/chapters.browser.cjs`
Expected: FAIL (no `.chapter-beats`).

- [ ] **Step 3: Implement** the component and CSS changes above.

- [ ] **Step 4: Update affected tests**

- `tests/essentials.browser.cjs`: add that in essentials each chapter still shows 3 `<dt>`s and no `video`/`img` under `.project-feature`. If the `scrollHeight < 6500` budget fails, raise it to the measured height rounded up to the next 500, with a comment `// three-beat chapters (2026-11-12 spec §5)`.
- `tests/motion.browser.cjs` / `tests/scrollcraft.browser.cjs`: fix only selectors that referenced removed `.project-facts` / `.supporting-project` markup.

- [ ] **Step 5: Run to verify all pass**

Run: `node tests/chapters.browser.cjs && node tests/essentials.browser.cjs && node tests/motion.browser.cjs && node tests/scrollcraft.browser.cjs && npx tsc --noEmit && npm run lint`
Expected: pass.

- [ ] **Step 6: README** — rewrite item 2 of "Page structure" to describe the four three-beat chapters.

- [ ] **Step 7: Commit**

```bash
git add src/components/sections/ProjectsSection.tsx src/app/globals.css tests/chapters.browser.cjs tests/essentials.browser.cjs tests/motion.browser.cjs tests/scrollcraft.browser.cjs README.md
git commit -m "feat(projects): present projects as story chapters"
```

---

### Task 5: "Picked up along the way"

**Files:**
- Create: `src/lib/picked-up.ts`
- Modify: `src/components/sections/ArsenalSection.tsx`
- Test: `tests/picked-up.cjs`

**Interfaces:**
- Consumes: `Project`, `SkillCategory` types.
- Produces:
  - `function toolKey(name: string): string` — lowercase, drop parenthetical `(…)`, drop a trailing version number (`" 15"`), trim.
  - `interface ToolGroup { projectId: string | null; tools: string[] }`
  - `function pickedUp(projects: Project[], skills: SkillCategory[]): ToolGroup[]` — groups in order: featured projects (data order), then non-featured projects, then `{ projectId: null }`. Each project group lists its `stack` entries (original spelling) whose `toolKey` has not appeared in an earlier group. The `null` group lists skill names (data order) for which **no** `" / "`-separated part's `toolKey` matched any stack entry. Groups with no tools are omitted.

- [ ] **Step 1: Write the failing test `tests/picked-up.cjs`** (load both `portfolio.ts` and `picked-up.ts` via transpile; `picked-up.ts` must use `import type` only)

```js
assert.deepEqual(pickedUp(data.projects, data.skills), [
  { projectId: 'webc', tools: ['Next.js 15', 'TypeScript', 'Supabase', 'Drizzle ORM', 'Azure MSAL', 'Tailwind CSS'] },
  { projectId: 'owlset', tools: ['React Native', 'Expo', 'SQLite', 'Zod', 'llama.rn'] },
  { projectId: 'sphere8', tools: ['React', 'Vite', 'Netlify Forms'] },
  { projectId: 'lily-chou-chou', tools: ['HTML', 'CSS', 'JavaScript', 'Web Audio API'] },
  { projectId: 'wayland-rice', tools: ['CachyOS', 'Hyprland', 'Waybar', 'Pywal', 'Bash', 'PipeWire'] },
  { projectId: null, tools: ['Bootstrap', 'Node.js', 'SQL Server', 'ASP.NET (Web Forms & MVC)', 'Docker', 'GitHub Actions', 'Playwright', 'Git & GitHub', 'Android (Kotlin)', 'Jetpack Compose', 'Room Database', 'MVVM Architecture', 'Unity (C#)', 'Linux Administration'] },
]);
assert.equal(toolKey('Next.js 15'), 'next.js');
assert.equal(toolKey('Hyprland (Wayland)'), 'hyprland');
assert.notEqual(toolKey('React'), toolKey('React Native'));
```

- [ ] **Step 2: Run to verify it fails**

Run: `node tests/picked-up.cjs`
Expected: FAIL (module missing).

- [ ] **Step 3: Implement `src/lib/picked-up.ts`.**

- [ ] **Step 4: Rewrite `ArsenalSection`.** Keep `id="arsenal"` and the `#tech` / `#stack` aliases. Heading "Picked up along the way." Each group is a `.skill-row` (scrollcraft tests animate `.skill-row`): `<h3>` is the chapter's display name linking to `#project-<id>` (the rice links to `#workspace`), the `null` group's `<h3>` is "Also worked with" with no link and no claim about when. Move `DISPLAY_NAMES` out of `ProjectsSection.tsx` into `src/data/display-names.ts` (`export const DISPLAY_NAMES: Record<string, string>`) and import it in both. No per-tool "learned in" wording.

- [ ] **Step 5: Run to verify**

Run: `node tests/picked-up.cjs && npx tsc --noEmit && npm run lint`, then rebuild/restart and `node tests/scrollcraft.browser.cjs`
Expected: pass.

- [ ] **Step 6: README** — rewrite "Page structure" item 3.

- [ ] **Step 7: Commit**

```bash
git add src/lib/picked-up.ts src/data/display-names.ts src/components/sections/ArsenalSection.tsx src/components/sections/ProjectsSection.tsx tests/picked-up.cjs README.md
git commit -m "feat(skills): group tools by the chapter that used them"
```

---

### Task 6: Workspace interlude

**Files:**
- Create: `src/components/sections/WorkspaceInterlude.tsx`
- Modify: `src/app/page.tsx` (render between `<ArsenalSection />` and `<ChronicleSection />`)
- Modify: `src/components/providers/PortfolioExperience.tsx` (anchor list `["github", "mood"]` becomes `["github", "mood", "workspace"]` → `"about"`; status text unchanged)
- Modify: `src/app/globals.css`
- Modify: `tests/essentials.browser.cjs`, `tests/scrollcraft.browser.cjs` (add `'#workspace'` to `scenes` after `'#arsenal'`)

**Interfaces:**
- Consumes: the `wayland-rice` project from `portfolioData`, `DISPLAY_NAMES` from Task 5, `useEssentials()`, the existing case-study modal pattern (or simple GitHub link; your choice, but keep the rice's existing `videoUrl` as its media).
- Produces: `<section id="workspace" class="portfolio-section workspace-interlude">`; returns `null` in essentials.

It reads as a short break between the work and the person: the rice video, the one-line description, and the GitHub profile link. Shorter than a chapter, no three-beat structure.

- [ ] **Step 1: Write failing tests** in `tests/essentials.browser.cjs`:

```js
test('workspace interlude sits between tools and about', async () => {
  const order = await page.evaluate(() => [...document.querySelectorAll('main section[id]')].map((s) => s.id));
  assert(order.indexOf('arsenal') < order.indexOf('workspace') && order.indexOf('workspace') < order.indexOf('about'));
});
test('essentials from workspace anchors to about', async () => {
  await page.locator('#workspace').scrollIntoViewIfNeeded();
  await page.getByRole('button', { name: 'Remove the bloat' }).click();
  assert.equal(await page.locator('#workspace').count(), 0);
  const top = await page.locator('#about').evaluate((e) => e.getBoundingClientRect().top);
  assert(top >= 0 && top < 400, `about near top, got ${top}`);
});
```

- [ ] **Step 2: Build, start, run to verify it fails**

Run: `npm run build && (npm run start -- --port 3120 &) && node tests/essentials.browser.cjs`
Expected: FAIL (no `#workspace`).

- [ ] **Step 3: Implement.**

- [ ] **Step 4: Run to verify**

Run: `node tests/essentials.browser.cjs && node tests/scrollcraft.browser.cjs && npx tsc --noEmit && npm run lint`
Expected: pass.

- [ ] **Step 5: README** — add the interlude to "Page structure".

- [ ] **Step 6: Commit**

```bash
git add src/components/sections/WorkspaceInterlude.tsx src/app/page.tsx src/components/providers/PortfolioExperience.tsx src/app/globals.css tests/essentials.browser.cjs tests/scrollcraft.browser.cjs README.md
git commit -m "feat(workspace): move the Wayland rice into an interlude"
```

---

### Task 7: Parallax sky and daytime density

**Files:**
- Modify: `src/components/ui/background-pixel-stars.tsx`
- Modify: `tests/pixel-stars.browser.cjs`

**Interfaces:**
- Consumes: `SkyBand` and `data-sky` on `<html>` from Tasks 1–2.
- Produces on the `<canvas>`: `data-layers="3"`, `data-star-count="<n>"`, `data-scroll-offset="<rounded scrollY used in last draw>"`.

Rules:
- Each star gets `depth` from `[0.03, 0.08, 0.15]` (equal thirds). Draw y as `((star.y - scrollY * depth) % height + height) % height`. Redraw on `scroll` through one pending `requestAnimationFrame` (don't wait for the 16 FPS twinkle tick). Keep the ≤16 FPS twinkle cap, hidden-tab pause, and shooting stars.
- Reduced motion: no scroll offset (`data-scroll-offset` stays `"0"`), still sky.
- Density factor by band: `evening`, `night` → 1; `dawn`, `sunset` → 0.6; `morning`, `midday`, `afternoon` → 0.35. Missing `data-sky` → 1. Apply to the existing count formula; recompute when `data-sky` changes (add `'data-sky'` to the existing `MutationObserver` `attributeFilter`).

- [ ] **Step 1: Write failing tests** in `tests/pixel-stars.browser.cjs`:

```js
test('three layers drift with scroll', async () => {
  assert.equal(await canvas.getAttribute('data-layers'), '3');
  await page.mouse.wheel(0, 1200); await page.waitForTimeout(200);
  assert(Number(await canvas.getAttribute('data-scroll-offset')) > 0);
});
test('reduced motion keeps the sky still', /* reducedMotion:'reduce'; after wheel, data-scroll-offset === '0' */);
test('fewer stars by day', async () => {
  // clock.install at 04:00Z (12:00 PHT) vs 15:00Z (23:00 PHT), same 1440x900 viewport
  assert(dayCount <= Math.ceil(nightCount * 0.35) && dayCount > 0);
});
```

- [ ] **Step 2: Build, start, run to verify it fails**

Run: `npm run build && (npm run start -- --port 3120 &) && node tests/pixel-stars.browser.cjs`
Expected: FAIL (`data-layers` null).

- [ ] **Step 3: Implement.**

- [ ] **Step 4: Run to verify**

Run: `node tests/pixel-stars.browser.cjs && node tests/motion.browser.cjs && npx tsc --noEmit && npm run lint`
Expected: pass.

- [ ] **Step 5: README** — update the pixel-stars paragraph (layers, daytime density).

- [ ] **Step 6: Commit**

```bash
git add src/components/ui/background-pixel-stars.tsx tests/pixel-stars.browser.cjs README.md
git commit -m "feat(stars): layered parallax sky that thins out by day"
```

---

### Task 8: Full verification

- [ ] **Step 1: Run every check from a clean build**

```bash
npx tsc --noEmit && npm run lint && node tests/project-content.cjs && node tests/personal-layer.cjs && node tests/sky.cjs && node tests/picked-up.cjs && npm run build
npm run start -- --port 3120 &
for t in sky chapters essentials motion scrollcraft pixel-stars github portfolio-hiring theme-hydration; do node tests/$t.browser.cjs || exit 1; done
```

Expected: every script prints its pass line; no failures.

- [ ] **Step 2: Look at it.** Capture desktop (1440×900) and phone (390×844) screenshots in dark and light at 12:00, 18:00, and 23:00 PHT. Confirm by eye: one accent hue per screen, no gradients, chapters visibly differ, name solid rosewater. Note anything off and fix it before the branch review.
