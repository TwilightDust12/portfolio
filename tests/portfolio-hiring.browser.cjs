const assert = require('node:assert/strict');
const { before, after, beforeEach, afterEach, test } = require('node:test');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

const baseUrl = process.env.PORTFOLIO_BASE_URL || 'http://localhost:3120';
let browser;
let page;

before(async () => {
  browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
});
after(async () => { await browser?.close(); });
beforeEach(async () => {
  page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.route('**/api/music', (route) => route.fulfill({ json: {
    title: 'Test track', artist: 'Test artist', album: 'Test album', albumArt: '',
    songUrl: 'https://www.last.fm/', isPlaying: false, isFallback: true,
  } }));
  await page.route('**/api/cinema', (route) => route.fulfill({ json: { films: [], isFallback: true } }));
});
afterEach(async () => { await page?.close(); });

test('a pending GitHub request shows labeled real history', async () => {
  let release;
  const pending = new Promise((resolve) => { release = resolve; });
  await page.route('**/api/github', async (route) => {
    await pending;
    await route.abort();
  });
  try {
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    await page.getByRole('button', { name: /Switch to .* theme/ }).waitFor();
    const section = page.locator('#github');
    assert.match(await section.innerText(), /214 contributions/);
    assert.match(await section.innerText(), /Cached activity record.*2026-10-16/);
  } finally {
    release();
  }
});

for (const [name, response] of [
  ['network failure', null],
  ['HTTP failure', { status: 503, json: {} }],
  ['malformed data', { json: { total: 99999, username: 'TwilightDust12', contributions: null, isFallback: false } }],
  ['invalid contribution count', { json: { total: 1, username: 'TwilightDust12', contributions: [{ date: '2026-10-01', count: -1 }], isFallback: false } }],
  ['invalid contribution date', { json: { total: 1, username: 'TwilightDust12', contributions: [{ date: '2026-02-31', count: 1 }], isFallback: false } }],
]) {
  test(`${name} preserves labeled real history`, async () => {
    await page.route('**/api/github', (route) => response ? route.fulfill(response) : route.abort());
    await page.goto(baseUrl, { waitUntil: 'networkidle' });
    const section = page.locator('#github');
    assert.match(await section.innerText(), /214 contributions/);
    assert.match(await section.innerText(), /Cached activity record.*2026-10-16/);
  });
}

test('valid GitHub data replaces the cached record', async () => {
  await page.route('**/api/github', (route) => route.fulfill({ json: {
    username: 'TwilightDust12', total: 7, isFallback: false,
    contributions: [{ date: '2026-10-01', count: 5 }, { date: '2026-10-02', count: 2 }],
  } }));
  await page.goto(baseUrl, { waitUntil: 'networkidle' });
  const section = page.locator('#github');
  assert.match(await section.innerText(), /7 contributions on GitHub/);
  assert.doesNotMatch(await section.innerText(), /Cached activity record/);
});

test('skyline controls have 44px targets and the view indicator follows selection', async () => {
  await page.route('**/api/github', (route) => route.abort());
  await page.goto(baseUrl, { waitUntil: 'networkidle' });
  const section = page.locator('#github');
  const controls = section.getByRole('button');
  for (const control of await controls.all()) {
    const box = await control.boundingBox();
    assert(box.width >= 44 && box.height >= 44, `${await control.getAttribute('aria-label')}: ${box.width}×${box.height}`);
  }
  const flat = section.getByRole('button', { name: 'Flat heat map' });
  await flat.click();
  assert.equal(await flat.getAttribute('aria-pressed'), 'true');
  const skyline = section.getByRole('button', { name: '3D skyline' });
  await skyline.click();
  assert.equal(await skyline.getAttribute('aria-pressed'), 'true');
  assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Controls fit the phone viewport');
});

test('project evidence arrives earlier on desktop and phones', async () => {
  await page.route('**/api/github', (route) => route.abort());
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const [width, height, maxTop] of [[1440, 1000, 850], [390, 844, 1000], [320, 844, 1100]]) {
    await page.setViewportSize({ width, height });
    await page.goto(baseUrl, { waitUntil: 'networkidle' });
    const heading = await page.locator('#works h2').boundingBox();
    assert(heading.y < maxTop, `Projects heading at ${heading.y}px for ${width}px viewport; expected before ${maxTop}px`);
    assert(await page.getByRole('button', { name: /Change portrait/ }).isVisible(), 'Portrait identity remains');
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `No overflow at ${width}px`);
  }
});

test('the OwlSet app demo is visible in the project gallery without autoplay', async () => {
  await page.route('**/api/github', (route) => route.abort());
  await page.goto(baseUrl, { waitUntil: 'networkidle' });
  const video = page.locator('#project-owlset video');
  assert.equal(await video.count(), 1, 'Show the app itself before a visitor opens its case study');
  assert.equal(await video.getAttribute('preload'), 'none');
  assert.equal(await video.getAttribute('controls'), '');
  assert.equal(await video.getAttribute('autoplay'), null);
  assert(await video.evaluate(async (element) => {
    const poster = new Image();
    poster.src = element.poster;
    await poster.decode();
    return poster.naturalWidth > 0;
  }), 'The app has a visible poster before its video loads');
});

test('sharing metadata uses the public domain and a working preview image', async () => {
  await page.route('**/api/github', (route) => route.abort());
  await page.goto(baseUrl, { waitUntil: 'networkidle' });
  assert.equal(new URL(await page.locator('link[rel=canonical]').getAttribute('href')).href, 'https://twilightdust.me/');
  assert.equal(new URL(await page.locator('meta[property="og:url"]').getAttribute('content')).href, 'https://twilightdust.me/');
  assert.equal(await page.locator('meta[name="twitter:card"]').getAttribute('content'), 'summary_large_image');
  const image = new URL(await page.locator('meta[property="og:image"]').getAttribute('content'));
  assert.equal(image.origin, 'https://twilightdust.me');
  const response = await page.request.get(`${baseUrl}${image.pathname}${image.search}`);
  assert(response.ok(), 'Preview image endpoint works');
  assert.match(response.headers()['content-type'], /image\/png/);
});
