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
  if (project.image) media.push(project.image);
  for (const url of media) assert(fs.existsSync(path.join(root, 'public', url)), `Missing media: ${url}`);
  if (project.featured && project.id !== 'webc') {
    assert.equal(new URL(project.demoUrl).protocol, 'https:');
    assert.equal(new URL(project.githubUrl).hostname, 'github.com');
  }
}
assert(projects.find((project) => project.id === 'owlset').isTeamProject);
assert(!projects.find((project) => project.id === 'webc').screenshots.some((screen) => screen.mobileUrl),
  'Do not pair redesigned WebC screenshots with the old mobile UI');

const featured = projects.filter((p) => p.featured);
for (const p of featured) for (const k of ['asked', 'figuredOut', 'shipped']) assert(p.chapter?.[k]?.length > 20, `${p.id}.chapter.${k}`);
assert(!projects.find((p) => p.id === 'wayland-rice').chapter);
const owl = projects.find((p) => p.id === 'owlset');
assert.match(owl.chapter.figuredOut, /llama\.rn/);
assert.doesNotMatch(JSON.stringify(projects), /ollama/i);
assert.match(owl.chapter.asked, /first hackathon outside STI College Lucena/);
assert.match(projects.find((p) => p.id === 'sphere8').chapter.figuredOut, /Netlify[\s\S]*Search visibility is what I’m working on next/);
assert.match(projects.find((p) => p.id === 'lily-chou-chou').chapter.figuredOut, /first time with the Web Audio API/);
assert.equal(projects.find((p) => p.id === 'webc').chapter.shipped, projects.find((p) => p.id === 'webc').outcome);
console.log('Project content and media checks passed.');
