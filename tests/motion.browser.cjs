// Run against a production build with Playwright available on NODE_PATH.
const { spawn } = require('node:child_process');
const path = require('node:path');
const assert = require('node:assert/strict');
const { chromium, firefox, webkit } = require('playwright');
const engine = process.env.BROWSER_ENGINE || 'chromium';

const root = path.resolve(__dirname, '..');
const server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '--port', '3108'], {
  cwd: root, stdio: ['ignore', 'pipe', 'inherit'],
});

(async () => {
  let browser;
  try {
    await new Promise((resolve, reject) => {
      server.stdout.on('data', (data) => { if (data.toString().includes('Ready')) resolve(); });
      server.on('exit', (code) => reject(new Error(`Preview exited: ${code}`)));
      setTimeout(() => reject(new Error('Preview startup timed out')), 15000).unref();
    });
    browser = await ({ chromium, firefox, webkit }[engine]).launch();
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    if (process.env.DISABLE_SCROLL_TIMELINES) {
      await page.addInitScript(() => { delete window.ScrollTimeline; delete window.ViewTimeline; });
    }
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.route('**/api/music', (route) => route.fulfill({ json: { title: 'Test track', artist: 'Test artist', album: 'Test album', isPlaying: false, isFallback: true } }));
    await page.route('**/api/cinema', (route) => route.fulfill({ json: { films: [], isFallback: true } }));
    await page.goto('http://localhost:3108', { waitUntil: 'networkidle' });

    if (process.env.DISABLE_SCROLL_TIMELINES) {
      assert(await page.evaluate(() => window.ScrollTimeline === undefined && window.ViewTimeline === undefined), 'Native timelines are removed for the fallback test');
    }
    const heroPortrait = page.locator('.hero-portrait');
    const heroBefore = await heroPortrait.evaluate((el) => getComputedStyle(el).transform);
    const progressBefore = await page.locator('.reading-progress').evaluate((el) => getComputedStyle(el).transform);
    const orbitBefore = await page.locator('.hero-orbit').evaluate((el) => getComputedStyle(el).transform);
    await page.evaluate(() => scrollTo({ top: 300, behavior: 'instant' }));
    await page.waitForTimeout(100);
    const heroAfter = await heroPortrait.evaluate((el) => getComputedStyle(el).transform);
    assert.notEqual(heroAfter, heroBefore, 'Hero artwork follows scrolling');
    assert.notEqual(await page.locator('.reading-progress').evaluate((el) => getComputedStyle(el).transform), progressBefore, 'Reading progress follows scrolling');
    assert.notEqual(await page.locator('.hero-orbit').evaluate((el) => getComputedStyle(el).transform), orbitBefore, 'Orbit follows scrolling');
    const interludeBefore = await page.locator('.interlude-track').evaluate((el) => getComputedStyle(el).transform);
    assert.equal(await page.locator('.project-stage').count(), 4);
    await page.locator('#project-owlset').evaluate((el) => scrollTo({ top: scrollY + el.getBoundingClientRect().top - 200, behavior: 'instant' }));
    await page.waitForTimeout(100);
    assert.match(await page.locator('.project-index [aria-current]').getAttribute('href'), /owlset/);
    assert.notEqual(await page.locator('.interlude-track').evaluate((el) => getComputedStyle(el).transform), interludeBefore, 'Typographic strip follows scrolling');
    assert.equal(await page.locator('#project-owlset .project-stage').evaluate((el) => Number(getComputedStyle(el).opacity)), 1, 'Project entrance settles into a readable state');
    await page.screenshot({ path: `/tmp/portfolio-creative-projects-${engine}.png` });
    await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
    await page.waitForTimeout(100);
    await page.screenshot({ path: `/tmp/portfolio-creative-hero-${engine}.png` });

    const portrait = page.getByRole('button', { name: /Change portrait/ });
    for (let i = 0; i < 5; i++) await portrait.click({ delay: 0 });
    assert.match(await portrait.getAttribute('aria-label'), /3 of 3/);
    assert.equal(await portrait.locator('[data-active=true]').count(), 1);
    await portrait.focus();
    await page.keyboard.press('Enter');
    assert.match(await portrait.getAttribute('aria-label'), /1 of 3/);
    assert.equal(await portrait.locator('[data-active=true]').evaluate((el) => getComputedStyle(el).transitionDuration), '0s');

    const webc = page.locator('#project-webc');
    for (const name of ['Faculty', 'Admin', 'Student', 'Admin']) await webc.getByRole('button', { name, exact: true }).click();
    assert.equal(await webc.locator('.media-image-frame[data-active=true]').count(), 1);
    assert.match(await webc.locator('.media-expand').getAttribute('aria-label'), /Admin Dashboard/);
    await webc.getByRole('button', { name: 'Student', exact: true }).focus();
    await page.keyboard.press('Enter');
    assert.equal(await webc.locator('.media-image-frame[data-active=true]').evaluate((el) => getComputedStyle(el).transitionDuration), '0s');

    const lily = page.locator('#project-lily-chou-chou');
    const preview = lily.getByRole('button', { name: /Enlarge/ });
    await preview.click();
    let viewer = page.getByRole('dialog');
    await viewer.waitFor();
    await viewer.locator('.screenshot-full').evaluate((img) => img.decode());
    assert(await viewer.evaluate((el) => el.scrollHeight > el.clientHeight), 'Long screenshot is scrollable');
    await page.waitForTimeout(220);
    await page.screenshot({ path: `/tmp/portfolio-screenshot-viewer-${engine}.png` });
    await page.keyboard.press('Escape');
    await viewer.waitFor({ state: 'hidden' });
    assert(await preview.evaluate((el) => el === document.activeElement), 'Viewer restores focus');

    const study = webc.getByRole('button', { name: 'Read WebC case study' });
    await study.click();
    const caseStudy = page.getByRole('dialog');
    await caseStudy.getByRole('button', { name: /Enlarge/ }).click();
    assert.equal(await page.locator('[role=dialog]').count(), 2);
    assert.equal(await page.getByRole('dialog').count(), 1, 'Only the top dialog is exposed to assistive technology');
    await page.keyboard.press('Escape');
    await page.waitForTimeout(150);
    assert.equal(await page.getByRole('dialog').count(), 1);
    assert(await caseStudy.getByRole('button', { name: /Enlarge/ }).evaluate((el) => el === document.activeElement), 'Nested focus returns inside case study');
    await caseStudy.getByRole('button', { name: /Enlarge/ }).click();
    await page.getByRole('button', { name: 'Close screenshot' }).click();
    await page.locator('.screenshot-dialog').waitFor({ state: 'hidden' });
    assert.equal(await page.getByRole('dialog').count(), 1, 'Pointer close preserves parent dialog');
    await page.keyboard.press('Escape');
    await caseStudy.waitFor({ state: 'hidden' });
    assert(await study.evaluate((el) => el === document.activeElement));
    await study.focus();
    await page.keyboard.press('Enter');
    assert.equal(await page.getByRole('dialog').getAttribute('data-motion'), 'false');
    await page.keyboard.press('Escape');
    await page.getByRole('dialog').waitFor({ state: 'hidden' });

    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForTimeout(100);
    assert.equal(await heroPortrait.evaluate((el) => el.getAnimations().length), 0, 'Reduced motion cancels scroll animations');
    assert.equal(await heroPortrait.evaluate((el) => getComputedStyle(el).animationName), 'none');
    assert.equal(await page.locator('.project-stage').first().evaluate((el) => getComputedStyle(el).animationName), 'none');
    assert.equal(await page.locator('.interlude-track').evaluate((el) => getComputedStyle(el).animationName), 'none');
    await portrait.click();
    assert.equal(await portrait.locator('[data-active=true]').evaluate((el) => getComputedStyle(el).transitionDuration), '0.12s');
    await study.click();
    assert.equal(await page.getByRole('dialog').evaluate((el) => getComputedStyle(el).animationName), 'overlay-in');
    await page.keyboard.press('Escape');
    await page.getByRole('dialog').waitFor({ state: 'hidden' });

    const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, ...(engine !== 'firefox' ? { isMobile: true } : {}), hasTouch: true });
    await mobile.route('**/api/**', (route) => route.fulfill({ json: {} }));
    await mobile.goto('http://localhost:3108', { waitUntil: 'networkidle' });
    const mobilePortrait = mobile.locator('.hero-portrait');
    const mobileBefore = await mobilePortrait.evaluate((el) => getComputedStyle(el).transform);
    await mobile.evaluate(() => scrollTo({ top: 400, behavior: 'instant' }));
    await mobile.waitForTimeout(100);
    assert.notEqual(await mobilePortrait.evaluate((el) => getComputedStyle(el).transform), mobileBefore, 'Parallax works at phone width');
    const sphere = mobile.locator('#project-sphere8');
    await sphere.getByRole('button', { name: 'Mobile', exact: true }).tap();
    await sphere.getByRole('button', { name: /Enlarge/ }).tap();
    assert.match(await mobile.getByRole('dialog').locator('img').getAttribute('src'), /Sphere8 Mobile/);
    await mobile.getByRole('button', { name: 'Close screenshot' }).tap();
    await mobile.getByRole('dialog').waitFor({ state: 'hidden' });
    assert.equal(await sphere.locator('.media-expand-hint').evaluate((el) => getComputedStyle(el).opacity), '1');
    for (const width of [390, 320]) {
      await mobile.setViewportSize({ width, height: 844 });
      assert(await mobile.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `No overflow at ${width}px`);
    }
    await mobile.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
    await mobile.screenshot({ path: `/tmp/portfolio-creative-mobile-${engine}.png` });
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
    await page.getByRole('button', { name: /Switch to Latte light/ }).click();
    await page.waitForTimeout(200);
    await page.screenshot({ path: `/tmp/portfolio-creative-light-${engine}.png` });
    assert.deepEqual(errors, []);
    console.log(engine + ' motion checks passed: cross-browser scroll effects, active project index, rapid retargeting, keyboard skips, full screenshots, nested focus, reduced motion, touch, and mobile overflow.');
  } finally {
    if (browser) await browser.close();
    server.kill('SIGTERM');
  }
})().catch((error) => { console.error(error); process.exitCode = 1; });
