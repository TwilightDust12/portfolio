const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

const load = (file) => {
  const { outputText } = ts.transpileModule(fs.readFileSync(path.resolve(__dirname, '..', file), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } });
  const exports = {};
  new Function('exports', outputText)(exports);
  return exports;
};
const data = load('src/data/portfolio.ts').portfolioData;
const { pickedUp, toolKey } = load('src/lib/picked-up.ts');

assert.deepEqual(pickedUp(data.projects, data.skills), [
  { projectId: 'webc', tools: ['Next.js 15', 'TypeScript', 'Supabase', 'Drizzle ORM', 'Azure MSAL', 'Tailwind CSS'] },
  { projectId: 'owlset', tools: ['React Native', 'Expo', 'SQLite', 'Zod', 'llama.rn'] },
  { projectId: 'sphere8', tools: ['React', 'Vite', 'Netlify Forms'] },
  { projectId: 'lily-chou-chou', tools: ['HTML', 'CSS', 'JavaScript', 'Web Audio API'] },
  { projectId: 'wayland-rice', tools: ['CachyOS', 'Hyprland', 'Waybar', 'Pywal', 'Bash', 'PipeWire'] },
  { projectId: null, tools: ['Bootstrap', 'Node.js', 'SQL Server', 'ASP.NET (Web Forms & MVC)', 'Docker', 'GitHub Actions', 'Playwright', 'Git & GitHub', 'Android (Kotlin)', 'Jetpack Compose', 'Room Database', 'MVVM Architecture', 'Unity (C#)', 'Linux Administration'] },
]);
assert.equal(toolKey('Next.js 15'), 'next.js');
assert.equal(toolKey('Hyprland (Wayland)'), 'hyprland');
assert.notEqual(toolKey('React'), toolKey('React Native'));
console.log('picked-up ok');
