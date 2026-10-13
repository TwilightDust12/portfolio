const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'src/data/portfolio.ts'), 'utf8');
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
});
const exportsObject = {};
new Function('exports', outputText)(exportsObject);
const projects = exportsObject.portfolioData.projects;

assert.deepEqual(projects.filter((project) => project.featured).map((project) => project.id),
  ['webc', 'owlset', 'sphere8', 'lily-chou-chou']);
assert.equal(new Set(projects.map((project) => project.id)).size, projects.length);
for (const project of projects) {
  const media = (project.screenshots ?? []).flatMap((screen) =>
    [screen.desktopUrl, screen.mobileUrl].filter(Boolean));
  if (project.videoUrl) media.push(project.videoUrl);
  for (const url of media) assert(fs.existsSync(path.join(root, 'public', url)), `Missing media: ${url}`);
  if (project.featured && project.id !== 'webc') {
    assert.equal(new URL(project.demoUrl).protocol, 'https:');
    assert.equal(new URL(project.githubUrl).hostname, 'github.com');
  }
}
assert(projects.find((project) => project.id === 'owlset').isTeamProject);
assert(!projects.find((project) => project.id === 'webc').screenshots.some((screen) => screen.mobileUrl),
  'Do not pair redesigned WebC screenshots with the old mobile UI');
console.log('Project content and media checks passed.');
