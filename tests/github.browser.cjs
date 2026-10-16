const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

const server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '--port', '3110'], {
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
    const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
    await page.goto('http://localhost:3110/#github');
    const section = page.locator('#github');
    await section.scrollIntoViewIfNeeded();
    await page.waitForFunction(() => document.querySelector('#github canvas') !== null);
    assert.equal(await section.locator('a').getAttribute('href'), 'https://github.com/TwilightDust12');
    for (const dark of [false, true]) {
      await page.evaluate((value) => document.documentElement.classList.toggle('dark', value), dark);
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'No page overflow');
    }
    console.log('GitHub skyline canvas loading, themes, mobile viewport, and profile link passed.');
  } finally {
    if (browser) await browser.close();
    server.kill('SIGTERM');
  }
})().catch((error) => { console.error(error); process.exitCode = 1; });
