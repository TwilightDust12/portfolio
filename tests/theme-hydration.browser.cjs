const { spawn } = require('node:child_process');
const path = require('node:path');
const assert = require('node:assert/strict');
const { chromium } = require('playwright');

const server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '--port', '3109'], {
  cwd: path.resolve(__dirname, '..'), stdio: ['ignore', 'pipe', 'inherit'],
});
(async () => {
  let browser;
  try {
    await new Promise((resolve, reject) => {
      server.stdout.on('data', (data) => { if (data.toString().includes('Ready')) resolve(); });
      server.on('exit', (code) => reject(new Error(`Preview exited: ${code}`)));
      setTimeout(() => reject(new Error('Preview startup timed out')), 15000).unref();
    });
    browser = await chromium.launch();
    const hydrationErrors = [];
    for (const theme of ['light', 'dark']) {
      const context = await browser.newContext();
      await context.addInitScript((savedTheme) => {
        if (!localStorage.getItem('theme')) localStorage.setItem('theme', savedTheme);
      }, theme);
      const page = await context.newPage();
      await page.route('**/api/**', (route) => route.fulfill({ json: {} }));
      page.on('console', (message) => {
        if (/hydrat|didn't match/i.test(message.text())) hydrationErrors.push(message.text());
      });
      page.on('pageerror', (error) => hydrationErrors.push(error.message));
      await page.goto('http://localhost:3109/#project-owlset', { waitUntil: 'networkidle' });
      const button = page.getByRole('button', { name: theme === 'dark' ? 'Switch to Latte light theme' : 'Switch to Mocha dark theme' });
      await button.waitFor();
      assert(await button.isEnabled());
      assert.equal(await page.locator('html').evaluate((el) => el.classList.contains('dark')), theme === 'dark');
      await button.click();
      assert.equal(await page.locator('html').evaluate((el) => el.classList.contains('dark')), theme !== 'dark');
      await page.reload({ waitUntil: 'networkidle' });
      await page.getByRole('button', { name: theme === 'dark' ? 'Switch to Mocha dark theme' : 'Switch to Latte light theme' }).waitFor();
      await context.close();
    }
    assert.deepEqual(hydrationErrors, [], 'No hydration warnings or browser errors');
    console.log('Saved light/dark themes, toggling, hash reloads, and hydration passed.');
    const ssr = await browser.newPage({ javaScriptEnabled: false });
    await ssr.goto('http://localhost:3109/');
    assert.equal(await ssr.locator('.theme-toggle').count(), 1, 'Theme control reserves its layout before hydration');
    assert.equal(await ssr.locator('button.theme-toggle').count(), 0, 'Theme-dependent button is not server-rendered');
    console.log('Server placeholder check passed.');
  } finally {
    if (browser) await browser.close();
    server.kill('SIGTERM');
  }
})().catch((error) => { console.error(error); process.exitCode = 1; });
