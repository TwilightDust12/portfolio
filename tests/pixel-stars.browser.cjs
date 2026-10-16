const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

const server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '--port', '3112'], {
  cwd: require('node:path').resolve(__dirname, '..'), stdio: ['ignore', 'pipe', 'inherit'],
});

(async () => {
  let browser;
  try {
    await new Promise((resolve, reject) => {
      server.stdout.on('data', (data) => { if (data.toString().includes('Ready')) resolve(); });
      server.on('exit', (code) => reject(new Error(`Preview exited: ${code}`)));
      setTimeout(() => reject(new Error('Preview startup timed out')), 15000).unref();
    });
    browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 2 });
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.addInitScript(() => {
      const clear = CanvasRenderingContext2D.prototype.clearRect;
      CanvasRenderingContext2D.prototype.clearRect = function (...args) {
        if (this.canvas.classList.contains('pixel-stars')) this.canvas.starFrames = (this.canvas.starFrames || 0) + 1;
        return clear.apply(this, args);
      };
      const rotate = CanvasRenderingContext2D.prototype.rotate;
      CanvasRenderingContext2D.prototype.rotate = function (...args) {
        if (this.canvas.classList.contains('pixel-stars')) this.canvas.shootingFrames = (this.canvas.shootingFrames || 0) + 1;
        return rotate.apply(this, args);
      };
    });
    await page.route('**/api/**', (route) => route.fulfill({ json: {} }));
    await page.goto('http://localhost:3112/', { waitUntil: 'domcontentloaded' });
    await page.getByRole('button', { name: /Switch to .* theme/ }).waitFor();
    await page.waitForFunction(() => document.querySelector('.pixel-stars')?.starFrames > 4);
    const canvas = page.locator('.page-stars .pixel-stars');
    assert.equal(await canvas.count(), 1, 'One canvas covers the page');
    assert.equal(await canvas.getAttribute('aria-hidden'), 'true');
    assert.equal(await canvas.evaluate((el) => getComputedStyle(el).pointerEvents), 'none');
    assert(await canvas.evaluate((el) => el.width === Math.round(el.clientWidth * 2)), 'Retina canvas uses CSS dimensions and device scale');
    const image = await canvas.evaluate((el) => el.toDataURL());
    await page.waitForTimeout(700);
    assert.notEqual(await canvas.evaluate((el) => el.toDataURL()), image, 'Stars remain animated');
    await page.waitForFunction(() => document.querySelector('.pixel-stars').shootingFrames > 0, null, { timeout: 10000 });
    await page.screenshot({ path: '/tmp/pixel-stars-dark.png' });
    await page.getByRole('button', { name: 'Switch to Latte light theme' }).click();
    await page.screenshot({ path: '/tmp/pixel-stars-light.png' });
    const portrait = page.getByRole('button', { name: /Change portrait/ });
    await portrait.click();
    assert.match(await portrait.getAttribute('aria-label'), /2 of 3/);

    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForTimeout(200);
    const still = await canvas.evaluate((el) => ({ image: el.toDataURL(), frames: el.starFrames }));
    await page.waitForTimeout(400);
    assert.equal(await canvas.evaluate((el) => el.starFrames), still.frames, 'Reduced motion stops canvas updates');
    assert(await canvas.evaluate((el, image) => el.toDataURL() === image, still.image), 'Reduced-motion starfield stays still');
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.waitForFunction((before) => document.querySelector('.pixel-stars').starFrames > before, still.frames);

    for (const section of ['#works', '#about', '#mood', '#comms']) {
      await page.locator(section).scrollIntoViewIfNeeded();
      const before = await canvas.evaluate((el) => el.starFrames);
      await page.waitForFunction((frames) => document.querySelector('.pixel-stars').starFrames > frames, before);
      assert(await canvas.evaluate((el) => {
        const rect = el.getBoundingClientRect();
        return rect.top === 0 && rect.left === 0 && rect.width === innerWidth && rect.height === innerHeight;
      }), `Animated background fills the viewport at ${section}`);
    }
    await page.screenshot({ path: '/tmp/pixel-stars-contact.png' });
    await page.evaluate(() => {
      Object.defineProperty(document, 'hidden', { configurable: true, value: true });
      document.dispatchEvent(new Event('visibilitychange'));
    });
    const hiddenFrames = await canvas.evaluate((el) => el.starFrames);
    await page.waitForTimeout(400);
    assert.equal(await canvas.evaluate((el) => el.starFrames), hiddenFrames, 'Hidden document stops drawing');
    await page.evaluate(() => {
      delete document.hidden;
      document.dispatchEvent(new Event('visibilitychange'));
    });
    await page.waitForFunction((frames) => document.querySelector('.pixel-stars').starFrames > frames, hiddenFrames);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));

    for (const width of [375, 320]) {
      await page.setViewportSize({ width, height: 812 });
      await page.waitForFunction(() => {
        const el = document.querySelector('.pixel-stars');
        return el.width === Math.round(el.clientWidth * 2);
      });
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `No page overflow at ${width}px`);
    }
    await page.screenshot({ path: '/tmp/pixel-stars-mobile.png' });
    assert.deepEqual(errors, []);
    console.log('Pixel stars: full-page animation, shooting stars, themes, portrait interaction, reduced motion, visibility pause/resume, retina sizing, and mobile layout passed.');
  } finally {
    if (browser) await browser.close();
    server.kill('SIGTERM');
  }
})().catch((error) => { console.error(error); process.exitCode = 1; });
