# Page grammar and scroll score

The later [motion refinement](../../../docs/animation-opportunities.md) changes project entrances to a once-only fade-up. The original composition and layer contract below remain the design baseline.

## Grammar: personal workspace album

The navigation is a working Waybar workspace selector with direct anchors. The opening is a personal contact sheet, the body is an explorable portfolio, and the ending is a correspondence plate with real email/copy actions. Sections remain natural document flow and readable at any speed. No fake terminal, invented dashboard, pinned copy, cursor replacement, or forced lateral navigation.

The eight standard grammars were considered: filmic one-shot and continuous world conflict with distinct scenes and early project access; live surface would misrepresent a portfolio as an application; chaptered editorial forbids the existing working top bar and portrait opening; gallery requires the first project as the opening and excludes the personal introduction; split stage has no truthful comparison here; typographic poster would subordinate the work; rhythmic cutlist is too loud for melancholy and has no room for project evidence. The workspace album defines its own navigation, sequence, ending and bans while retaining the site's real structure.

## Fingerprint gate

Read `scrollcraft/FINGERPRINTS.md` before scoring. No previous rows exist. First build clears the gate with no comparisons required.

## Layer contract

| Plane | Contents | Movement | Constraint |
|---|---|---|---|
| Far | Existing pixel stars and outlined twilight word | Small vertical displacement on word | No text or controls depend on it |
| Middle | Fine orbit and oversized Japanese twilight lettering | Independent rotation / restrained rise | Never crosses readable copy |
| Subject | Current real portrait | Slow scroll translation | Single interactive front portrait |
| Rear subject | Two alternate existing portraits | Separate translation and rotation | Permanently behind front, decorative and noninteractive |
| Foreground | Frame, caption and stable introduction | Caption stays attached to front photo | All copy and actions remain readable |

Mobile: smaller portrait stack beside the name; details and actions below on full width. Shorter travel, no rotated scroll motion. Reduced motion: stable layered stack, no positional animation. Keyboard focus restores the front portrait's stable position.

## Score

| Beat | Main device | Purpose |
|---|---|---|
| Introduction | Layered parallax + bespoke portrait stack | Quiet, personal depth; existing button cycles all profiles |
| Projects (peak) | Reveal / settle | Actual interfaces become the focus; controls stay usable |
| Interlude | Lateral pan | Brief release after the evidence, not a navigation rail |
| GitHub, skills, experience | Flow + restrained entry | Readable proof, no forced dwell or staged numbers |
| Interests | Static personal spread with discrete hover feedback | A quieter invitation into music, film and Linux |
| Contact | Typographic held close | Stable final invitation with useful email actions |

Four distinct motion families: parallax, reveal, pan, entry. No adjacent beats repeat a family, no scrub footage, no pinning, no added scroll spacers. Project collection owns the largest span because it contains four real projects, not artificial dwell.

## Runtime ownership

The unmodified skill engine and stylesheet are preserved in `engine/` as required by the skill. The production page reuses its installed Framer Motion driver in `ScrollEffects.tsx`; adding a second global animation engine would duplicate progress observers, animation loops and reduced-motion ownership. The skill's visual verification procedure is applied with a repository-native browser harness that samples every scene and checks actual rendered states. No runtime or stylesheet from the archived engine is shipped to visitors.

## Scope and acceptance

Changes reach the hero markup and existing scroll driver, the shared stylesheet, project reveal wrappers, contact presentation, and one browser acceptance suite. No changes to API routes, content claims, résumé, metadata/domain, dependencies, project media logic, dialogs, or starfield runtime. Preserve active navigation, motion preference changes, native/fallback scrolling, keyboard focus, portrait cycling, case studies, screenshot enlargement, video controls, downloads, themes and email actions. Confirm desktop, 390px and compact 360px phone layouts, intermediates, reduced motion, and no horizontal overflow.
