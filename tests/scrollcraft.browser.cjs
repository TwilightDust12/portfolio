// Run against the portfolio preview. Screenshots go to /tmp/portfolio-scrollcraft.
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const { before, after, test } = require('node:test');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const sharp = require('sharp');

const base = process.env.PORTFOLIO_BASE_URL || 'http://localhost:3120';
const out = process.env.SCROLLCRAFT_SHOTS || '/tmp/portfolio-scrollcraft';
let browser;

before(async () => {
  browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
  await fs.mkdir(out, { recursive: true });
});
after(async () => { await browser?.close(); });

async function open(options = {}, waitUntil = 'networkidle') {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, ...options });
  await page.addInitScript(() => {
    Element.prototype.requestPointerLock = async function () { throw new Error('Native pointer lock disabled'); };
    Element.prototype.setPointerCapture = function () {};
    Element.prototype.releasePointerCapture = function () {};
    Document.prototype.exitPointerLock = function () {};
  });
  if (process.env.DISABLE_SCROLL_TIMELINES) {
    await page.addInitScript(() => { delete window.ScrollTimeline; delete window.ViewTimeline; });
  }
  await page.route('**/api/github', (route) => route.abort());
  await page.route('**/api/music', (route) => route.fulfill({ json: {
    title: 'A quiet track', artist: 'A favorite artist', album: 'A favorite album',
    albumArt: '', isPlaying: false, isFallback: true,
  } }));
  await page.route('**/api/cinema', (route) => route.fulfill({ json: { films: [], isFallback: true } }));
  await page.goto(base, { waitUntil });
  await page.evaluate(() => document.fonts.ready);
  return page;
}

const transform = (page, selector) => page.locator(selector).evaluate((el) => getComputedStyle(el).transform);
async function jump(page, top) {
  await page.evaluate((y) => scrollTo({ top: y, behavior: 'instant' }), top);
  await page.waitForTimeout(160);
}

test('opening title appears on a fresh visit and reload, then clears itself', async () => {
  const page = await open({}, 'domcontentloaded');
  try {
    for (const visit of ['first', 'reload']) {
      if (visit === 'reload') {
        await page.getByRole('button', { name: /Switch to Latte light/ }).click();
        await page.reload({ waitUntil: 'domcontentloaded' });
        assert.equal(await page.locator('html').evaluate((el) => el.classList.contains('dark')), false, 'Reload retains the selected light theme');
      }
      const opening = page.locator('.opening-sequence');
      await page.waitForFunction(() => document.querySelector('.opening-sequence').getAnimations().some((a) => a.animationName === 'opening-veil'));
      const start = await opening.evaluate((el) => {
        const animation = el.getAnimations()[0];
        animation.pause();
        animation.currentTime = 200;
        return { opacity: Number(getComputedStyle(el).opacity), pointerEvents: getComputedStyle(el).pointerEvents, duration: animation.effect.getTiming().duration };
      });
      assert.equal(start.opacity, 1, `${visit}: opening is visible`);
      assert.equal(start.pointerEvents, 'none', 'The opening never captures input');
      assert.equal(start.duration, 1500);
      assert.equal(await opening.getAttribute('aria-hidden'), 'true');
      await page.screenshot({ path: path.join(out, `opening-${visit}.png`) });
      const middle = await opening.evaluate((el) => {
        el.getAnimations()[0].currentTime = 900;
        return Number(getComputedStyle(el).opacity);
      });
      assert(middle > 0 && middle < 1, 'The title dissolves instead of disappearing abruptly');
      await opening.evaluate((el) => { el.getAnimations()[0].finish(); });
      await page.waitForFunction(() => document.querySelector('.page-shell').hasAttribute('data-opening-complete'));
      assert.equal(await opening.evaluate((el) => getComputedStyle(el).display), 'none');
      assert.equal(await page.locator('.hero-name').evaluate((el) => getComputedStyle(el).opacity), '1');
      await page.setViewportSize({ width: 390, height: 844 });
      assert.equal(await opening.evaluate((el) => el.getAnimations().length), 0, 'Resizing does not replay the opening');
    }
  } finally { await page.close(); }
});

test('opening yields immediately to pointer, keyboard, scrolling, and motion preferences', async () => {
  const page = await open({}, 'domcontentloaded');
  try {
    for (const input of ['pointer', 'keyboard', 'wheel', 'preference']) {
      if (input !== 'pointer') await page.reload({ waitUntil: 'domcontentloaded' });
      await page.locator('.opening-sequence').evaluate((el) => {
        const animation = el.getAnimations()[0];
        if (animation) { animation.pause(); animation.currentTime = 200; }
      });
      await page.getByRole('button', { name: /Switch to Latte light/ }).waitFor();
      if (input === 'pointer') {
        await page.getByRole('link', { name: 'View projects' }).click({ force: true });
        assert.equal(new URL(page.url()).hash, '#works', 'Underlying navigation works during the opening');
      } else if (input === 'keyboard') await page.keyboard.press('Tab');
      else if (input === 'wheel') await page.mouse.wheel(0, 120);
      else await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.waitForFunction(() => document.querySelector('.page-shell').hasAttribute('data-opening-complete'));
      assert.equal(await page.locator('.opening-sequence').evaluate((el) => getComputedStyle(el).display), 'none', `${input}: opening dismisses`);
      assert.equal(await page.locator('.hero-name').evaluate((el) => el.getAnimations().length), 0, `${input}: content is immediately settled`);
    }
  } finally { await page.close(); }
});

test('reduced motion gets a short opening fade without movement or later replay', async () => {
  const page = await open({ reducedMotion: 'reduce' }, 'domcontentloaded');
  try {
    for (const selector of ['.opening-lockup', '.opening-rule', '.hero-name', '.portrait-card[data-slot="0"] .portrait-frame', '.portrait-deck']) {
      assert.equal(await page.locator(selector).evaluate((el) => getComputedStyle(el).animationName), 'none');
    }
    await page.waitForFunction(() => document.querySelector('.page-shell').hasAttribute('data-opening-complete'));
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    assert.equal(await page.locator('.opening-sequence').evaluate((el) => getComputedStyle(el).display), 'none');
    assert.equal(await page.locator('.hero-name').evaluate((el) => el.getAnimations().length), 0, 'Preference changes do not restart the opening');
  } finally { await page.close(); }
});

test('portrait planes move independently and the real profile switch remains usable', async () => {
  const page = await open();
  try {
    const selectors = ['.hero-portrait', '.portrait-sheet-1', '.portrait-sheet-2', '.hero-watermark', '.hero-kanji'];
    const initial = await Promise.all(selectors.map((s) => transform(page, s)));
    await page.screenshot({ path: path.join(out, 'hero-opening.png') });
    await jump(page, 300);
    const middle = await Promise.all(selectors.map((s) => transform(page, s)));
    for (let i = 0; i < selectors.length; i++) assert.notEqual(middle[i], initial[i], `${selectors[i]} follows scroll`);
    assert.equal(new Set(middle).size, middle.length, 'Planes have different trajectories');
    await page.screenshot({ path: path.join(out, 'hero-middle.png') });
    await jump(page, 0);
    const portrait = page.getByRole('button', { name: /Change portrait/ });
    const before = await page.locator('.hero-portrait').screenshot();
    await portrait.click();
    await page.waitForTimeout(240);
    assert.match(await portrait.getAttribute('aria-label'), /2 of 3/);
    assert.notDeepEqual(await page.locator('.hero-portrait').screenshot(), before, 'Profile selection changes actual pixels');
    await portrait.click();
    assert.match(await portrait.getAttribute('aria-label'), /Reze.*3 of 3/);
    await portrait.focus();
    await page.keyboard.press('Enter');
    assert.match(await portrait.getAttribute('aria-label'), /1 of 3/);
    assert.equal(await page.locator('.portrait-plane[aria-hidden=true] img').evaluateAll((imgs) => imgs.every((img) => img.alt === '' && img.closest('[aria-hidden=true]'))), true);
    assert.equal(await page.locator('.hero img').evaluateAll((imgs) => imgs.every((img) => img.complete && img.naturalWidth > 0)), true);
    await page.getByRole('link', { name: 'View projects' }).click();
    await page.waitForTimeout(600);
    assert.equal(new URL(page.url()).hash, '#works');
  } finally { await page.close(); }
});

test('portrait cards shuffle physically, accept rapid input, and keep their images', async () => {
  const page = await open();
  try {
    const deck = page.getByRole('button', { name: /Change portrait/ });
    const sources = await deck.locator('.portrait-photo').evaluateAll((images) => images.map((img) => img.getAttribute('src')));
    await page.mouse.click(20, 100);
    await deck.click();
    const departing = page.locator('.portrait-card[data-departing=true]');
    await departing.waitFor();
    const travel = await departing.evaluate((el) => {
      const animation = el.getAnimations().find((a) => a.transitionProperty === 'transform');
      animation.pause();
      animation.currentTime = 125;
      const matrix = new DOMMatrixReadOnly(getComputedStyle(el).transform);
      return { x: matrix.m41, opacity: getComputedStyle(el).opacity, depth: getComputedStyle(el.parentElement).zIndex };
    });
    assert(travel.x < -20, 'The actual front card travels sideways');
    assert.equal(travel.opacity, '1', 'Shuffling does not fade the card away');
    assert.equal(travel.depth, '4', 'The departing card stays in front until it is tucked behind');
    await page.screenshot({ path: path.join(out, 'portrait-shuffle-middle.png') });
    await departing.evaluate((el) => el.getAnimations()[0].finish());
    await page.waitForFunction(() => !document.querySelector('.portrait-card[data-departing=true]'));
    for (let i = 0; i < 7; i++) await deck.click({ delay: 0 });
    assert.match(await deck.getAttribute('aria-label'), /3 of 3/);
    await page.waitForFunction(() => !document.querySelector('.portrait-card[data-departing=true]'));
    await page.waitForTimeout(300);
    assert.deepEqual(await deck.locator('.portrait-photo').evaluateAll((images) => images.map((img) => img.getAttribute('src'))), sources, 'Each persistent card retains its own photograph');
    assert.equal(await deck.locator('[data-active=true]').count(), 1);
    await deck.focus();
    await page.keyboard.press('Enter');
    assert.match(await deck.getAttribute('aria-label'), /1 of 3/);
    assert.equal(await deck.locator('.portrait-card').evaluateAll((cards) => cards.reduce((n, el) => n + el.getAnimations().length, 0)), 0, 'Keyboard selection is immediate');
    await deck.click();
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForFunction(() => !document.querySelector('.portrait-card[data-departing=true]'));
    assert.equal(await deck.locator('[data-departing=true]').count(), 0);
    assert.equal(await deck.locator('.portrait-card').evaluateAll((cards) => cards.reduce((n, el) => n + el.getAnimations().length, 0)), 0, 'A live motion preference change settles every card');
  } finally { await page.close(); }
});

test('portrait color returns through a pixel mask and reverses cleanly on pointer exit', async () => {
  const page = await open();
  try {
    await page.mouse.click(20, 100);
    const deck = page.getByRole('button', { name: /Change portrait/ });
    const photo = page.locator('.portrait-card[data-slot="0"] .portrait-window');
    const chroma = async (buffer) => {
      const { data, info } = await sharp(buffer).removeAlpha().raw().toBuffer({ resolveWithObject: true });
      let total = 0;
      for (let i = 0; i < data.length; i += info.channels) total += Math.max(data[i], data[i + 1], data[i + 2]) - Math.min(data[i], data[i + 1], data[i + 2]);
      return total / (info.width * info.height);
    };
    const gray = await chroma(await photo.screenshot());
    await deck.hover();
    const mixed = await photo.locator('.portrait-pixel').evaluateAll((tiles) => {
      for (const tile of tiles) for (const animation of tile.getAnimations()) { animation.pause(); animation.currentTime = 80; }
      return tiles.map((tile) => Number(getComputedStyle(tile).opacity));
    });
    assert(mixed.some((opacity) => opacity > 0) && mixed.some((opacity) => opacity === 0), 'Color arrives in staggered pixels');
    await page.screenshot({ path: path.join(out, 'portrait-pixel-middle.png') });
    await photo.locator('.portrait-pixel').evaluateAll((tiles) => { for (const tile of tiles) for (const animation of tile.getAnimations()) animation.play(); });
    await page.waitForTimeout(350);
    const color = await chroma(await photo.screenshot({ path: path.join(out, 'portrait-color.png') }));
    assert(color > gray + 5, `Rendered color becomes visible: ${gray.toFixed(2)} → ${color.toFixed(2)}`);
    await page.mouse.move(20, 100);
    await page.waitForTimeout(200);
    assert(Math.abs(await chroma(await photo.screenshot()) - gray) < 1, 'Pointer exit returns to the same monochrome image');
    await page.emulateMedia({ reducedMotion: 'reduce' });
    assert.equal(await photo.locator('.portrait-color-photo').evaluate((el) => getComputedStyle(el).maskImage), 'none');
    await deck.hover();
    await page.waitForTimeout(150);
    assert.equal(await photo.locator('.portrait-color-photo').evaluate((el) => getComputedStyle(el).opacity), '1', 'Reduced motion keeps a short, unmasked color fade');
  } finally { await page.close(); }
});

test('touch portrait shuffles fit compact screens without sticky pixel hover', async () => {
  const page = await open({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  try {
    const deck = page.getByRole('button', { name: /Change portrait/ });
    for (const width of [390, 360, 320]) {
      await page.setViewportSize({ width, height: 844 });
      await deck.tap();
      for (let step = 0; step < 6; step++) {
        assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Shuffle stays within ${width}px at sample ${step}`);
        await page.waitForTimeout(90);
      }
      assert.equal(await deck.locator('.portrait-pixel').evaluateAll((tiles) => tiles.every((tile) => getComputedStyle(tile).opacity === '0')), true, 'Touch does not enable the hover effect');
    }
    await page.screenshot({ path: path.join(out, 'portrait-touch.png') });
  } finally { await page.close(); }
});

test('compact portrait composition keeps the introduction and projects clear', async () => {
  const page = await open({ reducedMotion: 'reduce' });
  try {
    for (const width of [390, 360, 320]) {
      await page.setViewportSize({ width, height: 844 });
      await jump(page, 0);
      const portrait = await page.locator('.portrait-card[data-slot="0"] .portrait-frame').boundingBox();
      const intro = await page.locator('.hero-intro').boundingBox();
      assert(portrait.y + portrait.height <= intro.y, `Portrait clears introductory copy at ${width}px`);
      assert((await page.locator('#works h2').boundingBox()).y < 1000, `Projects arrive early at ${width}px`);
      assert((await page.getByRole('link', { name: 'View projects' }).boundingBox()).y < 700);
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `No overflow at ${width}px`);
      await page.getByRole('button', { name: /Change portrait/ }).click();
    }
    await page.getByRole('button', { name: /Switch to Latte light/ }).click();
    await page.waitForTimeout(250);
    await page.screenshot({ path: path.join(out, 'compact-light.png') });
  } finally { await page.close(); }
});

test('motion preference changes restore a stable, complete scene', async () => {
  const page = await open();
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  try {
    await jump(page, 300);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForTimeout(100);
    const selector = '.hero-portrait, .portrait-sheet, .hero-kanji, .hero-watermark, .project-stage, .project-reveal, .interlude-track, .skill-row, .personal-panel';
    assert.equal(await page.locator(selector).evaluateAll((els) => els.reduce((n, el) => n + el.getAnimations().length, 0)), 0);
    const stable = await transform(page, '.portrait-sheet-1');
    await jump(page, 0);
    assert.equal(await transform(page, '.portrait-sheet-1'), stable, 'Reduced motion leaves a static layered composition');
    assert.match(await page.locator('.project-reveal').first().evaluate((el) => getComputedStyle(el).clipPath), /^(?:none|inset\(0px(?: 0(?:px|%)){0,3} round 10px\))$/, 'No preview remains clipped');
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await jump(page, 300);
    assert.notEqual(await transform(page, '.portrait-sheet-1'), stable, 'Motion resumes when requested');
    assert.deepEqual(errors, [], 'Changing motion preference produces no browser errors');
  } finally { await page.close(); }
});

test('fade-up entrances progress smoothly, settle once, and survive resizing', async () => {
  const page = await open();
  try {
    const row = page.locator('.skill-row').first();
    await row.evaluate((el) => scrollTo({ top: scrollY + el.getBoundingClientRect().top - innerHeight / 2, behavior: 'instant' }));
    await page.waitForFunction(() => document.querySelector('.skill-row').getAnimations().some((a) => a.playState === 'running'));
    const samples = await row.evaluate((el) => {
      const animation = el.getAnimations()[0];
      animation.pause();
      const timing = animation.effect.getTiming();
      const samples = [0, 150, 300].map((time) => {
        animation.currentTime = timing.delay + time;
        const style = getComputedStyle(el);
        return { opacity: Number(style.opacity), y: style.transform === 'none' ? 0 : new DOMMatrixReadOnly(style.transform).m42 };
      });
      animation.finish();
      return { timing, samples };
    });
    assert.equal(samples.timing.duration, 300);
    assert.equal(samples.timing.easing, 'cubic-bezier(0.23, 1, 0.32, 1)');
    assert(samples.timing.delay <= 100, 'Stagger cannot hold content back for more than 100ms');
    assert.equal(samples.samples[0].opacity, 0);
    assert.equal(samples.samples[0].y, 8);
    assert(samples.samples[1].opacity > 0 && samples.samples[1].opacity < 1);
    assert(samples.samples[1].y > 0 && samples.samples[1].y < 8);
    assert.equal(samples.samples[2].opacity, 1);
    assert.equal(samples.samples[2].y, 0);
    await jump(page, 0);
    await row.evaluate((el) => el.scrollIntoView({ behavior: 'instant', block: 'center' }));
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(100);
    assert.equal(await row.evaluate((el) => el.getAnimations().length), 0, 'Seen content does not replay after scroll or breakpoint changes');
    assert.equal(await row.evaluate((el) => getComputedStyle(el).opacity), '1');
    await row.evaluate((el) => el.scrollIntoView({ behavior: 'instant', block: 'center' }));
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(out, 'fluid-mobile-skills.png') });
  } finally { await page.close(); }
});

test('keyboard travel and live reduced motion cancel an entrance without hiding content', async () => {
  const page = await open();
  try {
    const stage = page.locator('.project-stage').last();
    await stage.evaluate((el) => scrollTo({ top: scrollY + el.getBoundingClientRect().top - innerHeight / 2, behavior: 'instant' }));
    await page.waitForFunction(() => document.querySelector('.project-feature:last-of-type .project-stage').getAnimations().some((a) => a.playState === 'running'));
    await stage.evaluate((el) => { const a = el.getAnimations()[0]; a.pause(); a.currentTime = 100; });
    await page.keyboard.press('Tab');
    assert.equal(await stage.evaluate((el) => el.getAnimations().length), 0);
    assert.equal(await stage.evaluate((el) => getComputedStyle(el).opacity), '1');
    await page.locator('.waybar-links a[href="#arsenal"]').focus();
    await page.keyboard.press('Enter');
    await page.waitForTimeout(700);
    assert.equal(await page.locator('.skill-row').evaluateAll((rows) => rows.reduce((n, el) => n + el.getAnimations().length, 0)), 0, 'Keyboard navigation never triggers entrances');
    await page.mouse.wheel(0, 100);
    const panel = page.locator('.personal-panel').first();
    await panel.evaluate((el) => scrollTo({ top: scrollY + el.getBoundingClientRect().top - innerHeight / 2, behavior: 'instant' }));
    await page.waitForFunction(() => document.querySelector('.personal-panel').getAnimations().some((a) => a.playState === 'running'));
    await panel.evaluate((el) => { const a = el.getAnimations()[0]; a.pause(); a.currentTime = 100; });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForTimeout(50);
    assert.equal(await panel.evaluate((el) => el.getAnimations().length), 0);
    assert.equal(await panel.evaluate((el) => getComputedStyle(el).opacity), '1');
    assert.equal(await panel.evaluate((el) => getComputedStyle(el).transform), 'none');
    await panel.evaluate((el) => el.scrollIntoView({ behavior: 'instant', block: 'center' }));
    await page.screenshot({ path: path.join(out, 'fluid-reduced-interests.png') });
  } finally { await page.close(); }
});

test('essential copy clears contrast over the composited scene in both themes', async () => {
  const page = await open({ reducedMotion: 'reduce' });
  const luminance = (rgb) => rgb.map((v) => {
    const c = v / 255;
    return c <= .04045 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4;
  }).reduce((sum, c, i) => sum + c * [.2126, .7152, .0722][i], 0);
  const results = [];
  try {
    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: 1000 });
      for (const theme of ['dark', 'light']) {
        await page.evaluate((mode) => document.documentElement.classList.toggle('dark', mode === 'dark'), theme);
        for (const selector of ['.hero-name', '.hero-intro', '.hero-availability', '#project-webc .project-description', '#about .about-copy > p:first-child', '#comms .contact-email']) {
          const el = page.locator(selector);
          await el.scrollIntoViewIfNeeded();
          await page.waitForTimeout(200);
          const info = await el.evaluate((element) => {
            const lines = [];
            const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
            while (walker.nextNode()) {
              if (!walker.currentNode.textContent.trim()) continue;
              const range = document.createRange();
              range.selectNodeContents(walker.currentNode);
              const style = getComputedStyle(walker.currentNode.parentElement);
              for (const rect of range.getClientRects()) lines.push({ x: rect.x, y: rect.y, width: rect.width, height: rect.height, color: style.color, size: parseFloat(style.fontSize) });
            }
            return { lines, visibility: element.style.visibility };
          });
          await el.evaluate((element) => { element.style.visibility = 'hidden'; });
          const background = await page.screenshot();
          await el.evaluate((element, visibility) => { element.style.visibility = visibility; }, info.visibility);
          for (const line of info.lines) {
            const ink = luminance(line.color.match(/[\d.]+/g).slice(0, 3).map(Number));
            const pixels = await sharp(background).extract({
              left: Math.max(0, Math.ceil(line.x)), top: Math.max(0, Math.ceil(line.y)),
              width: Math.floor(Math.min(line.width, width - line.x)), height: Math.floor(Math.min(line.height, 1000 - line.y)),
            }).removeAlpha().raw().toBuffer();
            let worst = Infinity;
            for (let i = 0; i < pixels.length; i += 3) {
              const bg = luminance([pixels[i], pixels[i + 1], pixels[i + 2]]);
              worst = Math.min(worst, (Math.max(ink, bg) + .05) / (Math.min(ink, bg) + .05));
            }
            const threshold = line.size >= 24 ? 3 : 4.5;
            results.push({ width, theme, selector, ratio: Number(worst.toFixed(2)) });
            if (worst < threshold) {
              await page.screenshot({ path: path.join(out, 'contrast-failure.png') });
              await fs.writeFile(path.join(out, 'contrast-failure.json'), JSON.stringify({ info, results }, null, 2));
            }
            assert(worst >= threshold, `${theme} ${width}px ${selector}: ${worst.toFixed(2)}:1`);
          }
        }
      }
    }
    await fs.writeFile(path.join(out, 'contrast.json'), JSON.stringify(results, null, 2));
  } finally { await page.close(); }
});

test('the page remains complete without JavaScript and the résumé download is a real PDF', async () => {
  const page = await open({ javaScriptEnabled: false });
  try {
    // RAF polling cannot run in the JavaScript-disabled browser context.
    await page.waitForTimeout(1600);
    assert.equal(await page.locator('.opening-sequence').evaluate((el) => getComputedStyle(el).opacity), '0', 'The CSS opening clears without JavaScript');
    assert.equal(await page.locator('.opening-sequence').evaluate((el) => getComputedStyle(el).pointerEvents), 'none', 'The CSS opening clears without JavaScript');
    assert.equal(await page.getByRole('heading', { level: 1 }).count(), 1);
    assert.equal(await page.locator('.project-feature').count(), 4);
    assert.equal(await page.locator('.hero img').evaluateAll((imgs) => imgs.every((img) => img.complete && img.naturalWidth > 0)), true);
    assert.equal(await transform(page, '.hero-portrait'), 'none');
    assert.equal(await page.locator('#comms a[href^="mailto:"]').count(), 2);
    const pdf = await page.request.get(`${base}/cv.pdf`);
    assert.equal(pdf.status(), 200);
    assert.equal((await pdf.body()).subarray(0, 5).toString(), '%PDF-');
  } finally { await page.close(); }
});

// Six positions per scene, including each project's intermediate reveal.
const scenes = ['#hero', '#project-webc', '#project-owlset', '#project-sphere8', '#project-lily-chou-chou', '.creative-interlude', '#github', '#arsenal', '#about', '#mood', '#comms'];
const variants = process.env.SCROLLCRAFT_VARIANT ? [process.env.SCROLLCRAFT_VARIANT] : ['desktop', 'phone', 'compact', 'reduced'];
for (const variant of variants) {
  test(`${variant}: inspect every scene at six scroll positions`, async () => {
    const phone = variant === 'phone' || variant === 'compact';
    const viewport = { width: phone ? (variant === 'compact' ? 360 : 390) : 1440, height: variant === 'compact' ? 640 : phone ? 844 : 1000 };
    const page = await open({ viewport, reducedMotion: variant === 'reduced' ? 'reduce' : 'no-preference', ...(phone ? { isMobile: true, hasTouch: true } : {}) });
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    const report = [];
    const thumbnails = [];
    try {
      for (const [sceneIndex, selector] of scenes.entries()) {
        const bounds = await page.locator(selector).evaluate((el) => ({ top: el.getBoundingClientRect().top + scrollY, height: el.getBoundingClientRect().height }));
        for (let step = 0; step < 6; step++) {
          const y = Math.max(0, bounds.top - viewport.height * .12 + Math.max(0, bounds.height - viewport.height * .4) * step / 5);
          await jump(page, y);
          if (step === 0) await page.waitForTimeout(650);
          assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${variant} ${selector}: no overflow`);
          const state = await page.locator(selector).evaluate((el) => ({
            scrollY, top: el.getBoundingClientRect().top, height: el.getBoundingClientRect().height,
            images: [...el.querySelectorAll('img')].filter((img) => img.getBoundingClientRect().top < innerHeight && img.getBoundingClientRect().bottom > 0).map((img) => ({ src: img.getAttribute('src'), loaded: img.complete && img.naturalWidth > 0 })),
          }));
          assert(state.images.every((img) => img.loaded), `${variant} ${selector}: visible images load`);
          const shot = await page.screenshot({ path: path.join(out, `${variant}-${sceneIndex}-${step}.png`) });
          report.push({ scene: selector, step, ...state });
          if ([0, 2, 5].includes(step)) thumbnails.push(await sharp(shot).resize({ width: 280 }).toBuffer());
        }
      }
      const thumbHeight = Math.round(viewport.height * 280 / viewport.width);
      for (let start = 0; start < scenes.length; start += 4) {
        const rows = Math.min(4, scenes.length - start);
        await sharp({ create: { width: 840, height: rows * thumbHeight, channels: 3, background: '#11111b' } })
          .composite(thumbnails.slice(start * 3, (start + rows) * 3).map((input, i) => ({ input, left: i % 3 * 280, top: Math.floor(i / 3) * thumbHeight })))
          .jpeg({ quality: 85 }).toFile(path.join(out, `${variant}-sheet-${start / 4}.jpg`));
      }
      await fs.writeFile(path.join(out, `${variant}-states.json`), JSON.stringify(report, null, 2));
      const contact = page.locator('#comms');
      await contact.scrollIntoViewIfNeeded();
      assert.equal(await contact.getByRole('link', { name: 'Open mail app' }).getAttribute('href'), 'mailto:jyrum12@gmail.com');
      await page.screenshot({ path: path.join(out, `${variant}-close.png`) });
      assert.deepEqual(errors, []);
    } finally { await page.close(); }
  });
}
