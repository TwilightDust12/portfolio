// Run against a production server: PORTFOLIO_BASE_URL=http://localhost:3120 node tests/chapters.browser.cjs
const assert = require('node:assert/strict');
const { before, after, test } = require('node:test');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

const base = process.env.PORTFOLIO_BASE_URL || 'http://localhost:3120';
const chapterIds = ['webc', 'owlset', 'sphere8', 'lily-chou-chou'];
let browser;
before(async () => { browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined }); });
after(async () => { await browser?.close(); });

async function open(options = {}) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, ...options });
  await page.route('**/api/**', (route) => route.fulfill({ json: {} }));
  await page.goto(base, { waitUntil: 'networkidle' });
  return page;
}

test('four chapters with three beats each', async () => {
  const page = await open();
  try {
    const chapters = page.locator('article.project-feature');
    assert.equal(await chapters.count(), 4);
    for (const id of chapterIds) {
      const dts = await page.locator(`#project-${id} .chapter-beats dt`).allInnerTexts();
      assert.deepEqual(dts, ['What it asked of me', 'What I had to figure out', 'What shipped']);
    }
    assert.deepEqual(await chapters.evaluateAll((els) => els.map((e) => e.dataset.layout)), ['media-left', 'phone', 'media-right', 'full-bleed']);
    assert.match(await page.locator('#project-owlset').innerText(), /llama\.rn/);
    assert.equal(await page.locator('.supporting-projects, .supporting-project').count(), 0, 'The rice no longer trails the chapters');
  } finally { await page.close(); }
});

test('layouts actually differ', async () => {
  const page = await open();
  try {
    const boxes = [];
    for (const id of chapterIds) {
      const box = await page.locator(`#project-${id} .project-media`).boundingBox();
      assert(box, `#project-${id} shows its media`);
      boxes.push({ id, x: Math.round(box.x), width: Math.round(box.width) });
    }
    assert.equal(new Set(boxes.map((b) => `${b.x}:${b.width}`)).size, 4, `Each chapter places its media differently: ${JSON.stringify(boxes)}`);
    const lily = boxes.find((b) => b.id === 'lily-chou-chou');
    for (const other of boxes.filter((b) => b !== lily)) assert(lily.width > other.width * 1.3, `Lily's full-bleed media is the widest: ${JSON.stringify(boxes)}`);
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Full-bleed media does not cause horizontal scroll');
  } finally { await page.close(); }
});

test('project index no longer sticks', async () => {
  const page = await open();
  try {
    assert.notEqual(await page.locator('.project-index').evaluate((e) => getComputedStyle(e).position), 'sticky');
  } finally { await page.close(); }
});

test('no-JS readable chapters', async () => {
  const page = await open({ javaScriptEnabled: false });
  try {
    const beats = page.locator('.chapter-beats dd');
    assert.equal(await beats.count(), 12);
    for (let i = 0; i < 12; i++) {
      assert(await beats.nth(i).isVisible(), `Beat ${i} is visible without JavaScript`);
      assert((await beats.nth(i).innerText()).trim().length > 20, `Beat ${i} has text`);
    }
  } finally { await page.close(); }
});

test('no gradients on chapter text', async () => {
  const page = await open();
  try {
    const offenders = await page.locator('#works').evaluate((works) => [works, ...works.querySelectorAll('*')]
      .filter((el) => {
        const style = getComputedStyle(el);
        return style.backgroundClip === 'text' || style.webkitBackgroundClip === 'text' || /gradient/.test(style.backgroundImage);
      })
      .map((el) => el.className || el.tagName));
    assert.deepEqual(offenders, []);
  } finally { await page.close(); }
});
