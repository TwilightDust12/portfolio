const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { before, after, test } = require('node:test');
const ts = require('typescript');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

const base = process.env.PORTFOLIO_BASE_URL || 'http://localhost:3120';
const { outputText } = ts.transpileModule(
  fs.readFileSync(path.resolve(__dirname, '../src/lib/sky.ts'), 'utf8'),
  { compilerOptions: { module: ts.ModuleKind.CommonJS } },
);
const sky = {};
new Function('exports', outputText)(sky);
const SUNSET = sky.SKY_BANDS.find((b) => b.id === 'sunset');

let browser;
before(async () => { browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined }); });
after(async () => { await browser?.close(); });

async function open(time, options = {}) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, ...options });
  const page = await context.newPage();
  await page.route('**/api/**', (route) => route.fulfill({ json: {} }));
  if (options.javaScriptEnabled !== false) await page.clock.install({ time: new Date(time) });
  await page.goto(base, { waitUntil: 'networkidle' });
  return { page, context };
}
const cssVar = (page, name) => page.evaluate((n) => getComputedStyle(document.documentElement).getPropertyValue(n).trim(), name);
const rgb = (hex) => `rgb(${[1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)).join(', ')})`; // @property <color> computes to rgb()
const skyId = (page) => page.evaluate(() => document.documentElement.dataset.sky);

test('sunset band paints before hydration', async () => {
  const { page, context } = await open('2026-11-12T10:00:00Z');
  try {
    assert.equal(await skyId(page), 'sunset');
    assert.equal(await cssVar(page, '--accent-text'), rgb(SUNSET.mocha));
    assert.match(await page.locator('.sky-line').innerText(), /It's sunset in Lucena City\./);
    assert.equal(await page.evaluate(() => getComputedStyle(document.querySelector('.page-shell'), '::before').backgroundImage), 'none');
  } finally { await context.close(); }
});

test('visitor timezone does not matter', async () => {
  const { page, context } = await open('2026-11-12T10:00:00Z', { timezoneId: 'America/New_York' });
  try { assert.equal(await skyId(page), 'sunset'); } finally { await context.close(); }
});

test('band change while open', async () => {
  const { page, context } = await open('2026-11-12T09:29:30Z');
  try {
    assert.equal(await skyId(page), 'afternoon');
    await page.clock.runFor(31_000); // the band boundary is 30s away
    assert.equal(await skyId(page), 'sunset');
    assert.match(await page.locator('.sky-line').innerText(), /sunset/);
    assert.equal(await page.evaluate(() => document.documentElement.hasAttribute('data-sky-transition')), true);
    await page.clock.runFor(2_200);
    assert.equal(await page.evaluate(() => document.documentElement.hasAttribute('data-sky-transition')), false);
  } finally { await context.close(); }
});

test('reduced motion switches without transition', async () => {
  const { page, context } = await open('2026-11-12T09:29:30Z', { reducedMotion: 'reduce' });
  try {
    await page.evaluate(() => {
      window.__seen = false;
      new MutationObserver(() => { if (document.documentElement.hasAttribute('data-sky-transition')) window.__seen = true; })
        .observe(document.documentElement, { attributes: true });
    });
    await page.clock.runFor(60_000);
    assert.equal(await skyId(page), 'sunset');
    assert.equal(await page.evaluate(() => window.__seen), false);
  } finally { await context.close(); }
});

test('light theme uses latte value', async () => {
  const { page, context } = await open('2026-11-12T10:00:00Z');
  try {
    await page.getByRole('button', { name: /Switch to Latte light theme/ }).click();
    await page.waitForFunction(() => !document.documentElement.classList.contains('dark'));
    assert.equal(await cssVar(page, '--accent-text'), rgb(SUNSET.latte));
  } finally { await context.close(); }
});

test('no-JS falls back to default accent', async () => {
  const { page, context } = await open('2026-11-12T10:00:00Z', { javaScriptEnabled: false });
  try {
    assert.equal(await skyId(page), undefined);
    assert.equal(await cssVar(page, '--accent-text'), rgb('#8839ef')); // no JS means no dark class, so the light default applies;
    assert.equal(await page.locator('.sky-line').count(), 0);
  } finally { await context.close(); }
});
