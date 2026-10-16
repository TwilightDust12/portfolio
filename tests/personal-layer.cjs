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
const data = exportsObject.portfolioData;

// 1. Now block verification
assert(data.personal.now, 'personal.now must exist');
assert.equal(typeof data.personal.now.note, 'string');
assert.equal(typeof data.personal.now.updated, 'string');
assert(data.personal.now.note.includes('Lately, I’m learning to trust the process'), 'Now note wording matches approved text');
assert.equal(data.personal.now.updated, 'October 2026');

// 2. Curated anime note (Re:Zero) verification
assert(Array.isArray(data.animeInterests.notes), 'animeInterests.notes must be an array');
const rezero = data.animeInterests.notes.find((n) => n.title === 'Re:Zero');
assert(rezero, 'Re:Zero note must exist');
assert.equal(rezero.reaction, 'Just finished watching, and honestly, it was peak.');
assert.equal(rezero.spoilerContent, 'Seeing Subaru begin to accept himself and try to love himself more really stayed with me.');
assert.equal(rezero.quote, '“You really are an amazing guy, Natsuki Subaru.”');

// 3. Curated gaming note (Apex Legends) verification
assert(Array.isArray(data.gamingInterests.notes), 'gamingInterests.notes must be an array');
const apex = data.gamingInterests.notes.find((n) => n.title === 'Apex Legends');
assert(apex, 'Apex Legends note must exist');
assert.equal(apex.note, 'I keep coming back for the ranked climb, even if I’ve been hardstuck for a while. Lately, I’m learning when to step back and give myself a break. The rank can wait.');

// 4. Project story (WebC) verification
const webc = data.projects.find((p) => p.id === 'webc');
assert(webc, 'WebC project must exist');
assert(webc.story, 'WebC story must exist');
assert.equal(webc.story.contribution, 'I spent a lot of time trying out features and reworking WebC’s UI/UX. The visual style kept bothering me, so I kept changing it. I’m kind of satisfied with where it is now—for now.');
assert.equal(webc.story.learned, 'Every time I thought I was satisfied, I eventually found something else to improve. WebC taught me that being happy with a version doesn’t mean there’s nothing left to work on.');
assert(!webc.story.difficultDecision, 'Unspecified difficultDecision must remain absent');
assert(!webc.story.improvement, 'Unspecified improvement must remain absent');

// 5. Other projects must not have stories fabricated
for (const project of data.projects) {
  if (project.id !== 'webc') {
    assert(!project.story, `Project ${project.id} must not have fabricated story`);
  }
}

// 6. Component checks: ensure ChronicleSection, MoodSection, ProjectModal include personal layer markup
const chronicleSource = fs.readFileSync(path.join(root, 'src/components/sections/ChronicleSection.tsx'), 'utf8');
assert(chronicleSource.includes('now-card'), 'ChronicleSection must render now-card');
assert(chronicleSource.includes('now-note'), 'ChronicleSection must render now-note');

const moodSource = fs.readFileSync(path.join(root, 'src/components/sections/MoodSection.tsx'), 'utf8');
assert(moodSource.includes('curated-note'), 'MoodSection must render curated-note');
assert(moodSource.includes('spoiler-disclosure'), 'MoodSection must render spoiler-disclosure');
assert(moodSource.includes('<details'), 'MoodSection must use native details');
assert(moodSource.includes('Show spoilers'), 'MoodSection must have Show spoilers summary');

const modalSource = fs.readFileSync(path.join(root, 'src/components/ui/ProjectModal.tsx'), 'utf8');
assert(modalSource.includes('project.story?.contribution'), 'ProjectModal must render contribution if present');
assert(modalSource.includes('project.story?.learned'), 'ProjectModal must render learned if present');

// 7. Github contributions & Skyline verification
const githubSectionSource = fs.readFileSync(path.join(root, 'src/components/sections/GithubSection.tsx'), 'utf8');
assert(githubSectionSource.includes('ContributionSkyline'), 'GithubSection must render ContributionSkyline');
assert(githubSectionSource.includes('/api/github'), 'GithubSection must fetch /api/github');
assert(fs.existsSync(path.join(root, 'src/app/api/github/route.ts')), '/api/github route must exist');
const fallbackJson = JSON.parse(fs.readFileSync(path.join(root, 'src/data/github-contributions.json'), 'utf8'));
assert.equal(fallbackJson.username, 'TwilightDust12');
assert.equal(fallbackJson.total, 214);
assert.equal(fallbackJson.contributions.length, 370);

console.log('All personal layer verification checks passed.');
