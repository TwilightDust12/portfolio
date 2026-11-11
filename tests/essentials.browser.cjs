const assert = require('node:assert/strict');
const { before, after, test } = require('node:test');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

const base = process.env.PORTFOLIO_BASE_URL || 'http://localhost:3120';
let browser;
before(async () => { browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined }); });
after(async () => { await browser?.close(); });

async function open(options = {}) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, ...options });
  await page.route('**/api/**', (route) => route.fulfill({ json: {} }));
  await page.goto(base, { waitUntil: 'networkidle' });
  return page;
}

async function switchMode(page, essentials) {
  const button = page.getByRole('button', { name: essentials ? 'Remove the bloat' : 'Bring back the bloat' });
  const box = await button.boundingBox();
  await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
  await page.waitForFunction((mode) => document.querySelector('.page-shell').dataset.mode === mode, essentials ? 'essentials' : 'workspace');
  await page.waitForTimeout(550);
}

test('the portfolio transforms, keeps its core content, and restores the workspace', async () => {
  const page = await open();
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  try {
    await page.screenshot({ path: '/tmp/portfolio-workspace-desktop.png' });
    const fullHeight = await page.locator('main').evaluate((el) => el.scrollHeight);
    const theme = await page.locator('html').getAttribute('class');
    assert.equal(await page.locator('.opening-sequence').count(), 0);
    assert.equal(await page.locator('a[download]').count(), 0);
    assert.equal(await page.locator('.project-stage').count(), 4);
    assert.equal(await page.locator('#project-webc img').evaluateAll((images) => images.every((img) => /2026/.test(img.src))), true);
    await page.locator('#project-sphere8 .media-expand').scrollIntoViewIfNeeded();
    await page.locator('#project-sphere8 .media-expand').click();
    assert.match(await page.getByRole('dialog').locator('.screenshot-full').getAttribute('src'), /company-website-2026/);
    await page.keyboard.press('Escape');
    await page.getByRole('dialog').waitFor({ state: 'hidden' });
    await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
    await switchMode(page, true);
    assert.equal(await page.getByRole('button', { name: 'Bring back the bloat' }).getAttribute('aria-pressed'), 'true');
    assert.equal(await page.locator('html').getAttribute('class'), theme, 'The theme survives the transformation');
    assert.equal(await page.locator('main').evaluate((el) => el.scrollHeight < 6500), true, 'Essentials is a compact document');
    assert(await page.locator('main').evaluate((el) => el.scrollHeight) < fullHeight);
    assert.equal(await page.locator('#github, #mood, .project-stage, .pixel-stars').count(), 0);
    assert.equal(await page.locator('.waybar-links a[href="#mood"]').count(), 0);
    assert.equal(await page.locator('.project-feature').count(), 4);
    for (const chapter of await page.locator('.project-feature').all()) assert.equal(await chapter.locator('.chapter-beats dt').count(), 3, 'Each chapter keeps its three beats');
    assert.equal(await page.locator('.project-feature :is(video, img)').count(), 0, 'Essentials chapters carry no media');
    assert.equal(await page.locator('.hero-portrait').evaluate((el) => el.getAnimations().length), 0);
    await page.screenshot({ path: '/tmp/portfolio-essentials-desktop.png' });
    const study = page.getByRole('button', { name: 'Read WebC case study' });
    await study.click();
    await page.getByRole('dialog').getByRole('heading', { name: 'The result' }).waitFor();
    await page.keyboard.press('Escape');
    await page.getByRole('dialog').waitFor({ state: 'hidden' });
    await page.waitForFunction((el) => el === document.activeElement, await study.elementHandle());
    await switchMode(page, false);
    assert.equal(await page.locator('.project-stage').count(), 4);
    assert.equal(await page.locator('#github, #mood').count(), 2);
    assert.deepEqual(errors, []);
  } finally { await page.close(); }
});

test('switching modes preserves the current project and supports keyboard input', async () => {
  const page = await open();
  try {
    await page.locator('#project-sphere8').evaluate((el) => scrollTo({ top: scrollY + el.getBoundingClientRect().top - 120, behavior: 'instant' }));
    await switchMode(page, true);
    let box = await page.locator('#project-sphere8').boundingBox();
    assert(box.y >= 0 && box.y < 250, `The same project remains at the reading line: ${JSON.stringify({ box, scrollY: await page.evaluate(() => scrollY) })}`);
    const toggle = page.locator('.mode-toggle');
    await toggle.evaluate((el) => el.focus({ preventScroll: true }));
    await page.keyboard.press('Enter');
    await page.waitForFunction(() => document.querySelector('.page-shell').dataset.mode === 'workspace');
    await page.waitForTimeout(550);
    box = await page.locator('#project-sphere8').boundingBox();
    assert(box.y >= 0 && box.y < 250, 'Restoring the workspace retains the project');
    assert(await toggle.evaluate((el) => el === document.activeElement), 'The mode control keeps keyboard focus');
    await page.locator('#mood').evaluate((el) => scrollTo({ top: scrollY + el.getBoundingClientRect().top - 120, behavior: 'instant' }));
    await switchMode(page, true);
    box = await page.locator('#about').boundingBox();
    assert(box.y >= 0 && box.y < 250, 'A removed personal section lands at the surviving about section');
  } finally { await page.close(); }
});

for (const options of [{ reducedMotion: 'reduce' }, { fallback: true }]) {
  test(`mode changes work with ${options.fallback ? 'no View Transitions API' : 'reduced motion'}`, async () => {
    const page = await open(options.fallback ? {} : options);
    try {
      if (options.fallback) await page.evaluate(() => { document.startViewTransition = undefined; });
      else await page.evaluate(() => { document.startViewTransition = () => { throw new Error('Reduced motion must not start a spatial transition'); }; });
      await switchMode(page, true);
      await switchMode(page, false);
      assert.equal(await page.locator('.project-stage').count(), 4);
    } finally { await page.close(); }
  });
}

test('both compositions fit small screens and keep navigation and the theme usable', async () => {
  const page = await open({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  try {
    for (const width of [390, 360, 320, 768, 1024]) {
      await page.setViewportSize({ width, height: 844 });
      await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
      for (const essentials of [false, true]) {
        if (essentials) await switchMode(page, true);
        assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `No overflow at ${width}px in ${essentials ? 'essentials' : 'workspace'}`);
        const toggle = await page.getByRole('button', { name: essentials ? 'Bring back the bloat' : 'Remove the bloat' }).boundingBox();
        assert(toggle.x >= 0 && toggle.x + toggle.width <= width, 'The complete mode control fits');
        if (width === 390) await page.screenshot({ path: `/tmp/portfolio-${essentials ? 'essentials' : 'workspace'}-mobile.png` });
      }
      await switchMode(page, false);
    }
    await page.getByRole('button', { name: 'Switch to Latte light theme' }).click();
    await switchMode(page, true);
    assert.equal(await page.locator('html').evaluate((el) => el.classList.contains('dark')), false);
    await page.screenshot({ path: '/tmp/portfolio-essentials-light.png' });
  } finally { await page.close(); }
});

test('workspace interlude sits between tools and about', async () => {
  const page = await open();
  try {
    const order = await page.evaluate(() => [...document.querySelectorAll('main section[id]')].map((s) => s.id));
    assert(order.indexOf('arsenal') < order.indexOf('workspace') && order.indexOf('workspace') < order.indexOf('about'), order.join());
  } finally { await page.close(); }
});

test('essentials from workspace anchors to about', async () => {
  const page = await open();
  try {
    await page.locator('#workspace').scrollIntoViewIfNeeded();
    await switchMode(page, true);
    assert.equal(await page.locator('#workspace').count(), 0);
    const top = await page.locator('#about').evaluate((e) => e.getBoundingClientRect().top);
    assert(top >= 0 && top < 400, `about near top, got ${top}`);
  } finally { await page.close(); }
});
