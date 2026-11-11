const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'src/lib/sky.ts'), 'utf8');
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
});
const sky = {};
new Function('exports', outputText)(sky);

const lum = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (a, b) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const at = (iso) => sky.skyBandAt(new Date(iso)); // ISO in UTC; PHT = UTC+8
assert.equal(at('2026-11-12T09:29:00Z'), 'afternoon'); // 17:29 PHT
assert.equal(at('2026-11-12T09:30:00Z'), 'sunset');    // 17:30
assert.equal(at('2026-11-12T20:59:00Z'), 'night');     // 04:59
assert.equal(at('2026-11-12T21:00:00Z'), 'dawn');      // 05:00
assert.equal(at('2026-11-12T14:00:00Z'), 'night');     // 22:00
assert.equal(at('2026-11-12T04:00:00Z'), 'midday');    // 12:00
assert.equal(at('2026-11-12T12:00:00Z'), 'evening');   // 20:00
assert.deepEqual(sky.SKY_BANDS.map((b) => b.id), ['dawn','morning','midday','afternoon','sunset','evening','night']);
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
