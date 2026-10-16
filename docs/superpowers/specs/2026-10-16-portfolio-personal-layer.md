# Portfolio personal layer

Status: Design approved; personal content pending. Implementation has not started.

## Understanding

- Serve recruiters and visitors interested in Jose as a person equally.
- Refine the current portfolio while preserving Catppuccin colors, typography, Wayland navigation, portraits, and Japanese details.
- Use https://chimkenchrls.github.io/portfolio/ as inspiration for spacing, organization, and personal exploration.
- Add a compact Now block, personal notes on favorites, and deeper project stories.
- Support occasional manual updates without a publishing schedule.
- Keep project evidence and contact information easy to find.
- Gather authentic personal content before publication; do not invent opinions, ownership claims, decisions, or results.

## Assumptions and constraints

- The portfolio remains public, at its current traffic scale, without new traffic or availability guarantees.
- Store content in the repository using the existing typed portfolio data.
- Use existing components and dependencies; no new service is required.
- Keep pages lightweight and preserve mobile readability, keyboard access, both themes, and reduced motion.
- Publish only personal information the user chooses to share. Exclude credentials and confidential client or team material.
- External feed failures must not prevent access to personal notes or other page content.
- The user owns occasional content updates. Dates are manually maintained and must reflect actual updates.

## Final design

### Now

Place a compact block inside About with three short entries: building, learning, and enjoying. Display a manually maintained last-updated date. Do not add a separate full-page section or navigation destination.

### Personal notes on favorites

Add a small curated selection inside Interests. Pair each selected film or music title with the user's explanation of why it matters to them. Keep this content independent of the live Last.fm and Letterboxd feeds so notes cannot become attached to a different title when feeds update or fail.

### Project stories

Extend the existing case-study dialogs with the user's specific contribution, one difficult decision, and what they would improve today. Include an earlier screenshot only when a genuine asset is available. Keep team attribution and current project media behavior intact. Hide optional fields without content.

### Data and behavior

Extend the responsible portfolio types and content in `src/types/portfolio.ts` and `src/data/portfolio.ts`. Render content in ChronicleSection, MoodSection, and ProjectModal. Reuse the current styling and dialog behavior. Text content should remain available in server-rendered HTML where the current architecture allows it; project stories remain accessible through the existing dialogs.

## Non-goals

No visual replacement, full blog, setup page, photo collection, interactive experiment, guestbook, visitor accounts, CMS, moderation workflow, or publishing schedule in this release. Résumé publishing awaits a real PDF and is outside this release.

## Validation

- Verify typed content, required assets, and the production build.
- Check the additions in light and dark themes at desktop and mobile widths without page overflow.
- Exercise case-study keyboard access, dismissal, and focus return.
- Check that missing optional story fields stay hidden and curated notes survive unavailable feeds.
- Preserve reduced-motion behavior and run existing relevant regressions.

## Decision log

| Decision | Alternatives considered | Reason |
| --- | --- | --- |
| Balance professional and personal content | Recruiter-first; personal-first | User selected equal attention to both audiences. |
| Occasional manual updates | Regular writing; mostly permanent content | User prefers updates when things change or inspiration hits. |
| Refine current visuals | Full visual redesign | User explicitly wants to preserve the existing visual identity. |
| Start with the personal layer | Add setup/photos; add a playable experiment | User selected the smaller release with strong personal value and limited upkeep. |
| Put Now inside About | Add another full section | Approved placement keeps the page compact. |
| Keep personal notes separate from feeds | Attach notes to current feed items | Approved approach keeps commentary matched to its intended title. |
| Expand existing case-study dialogs | Add separate project pages | Approved approach reuses the existing presentation and interactions. |

## Remaining inputs and risks

- Gather the user's current building, learning, and enjoying entries.
- Gather chosen favorites and personal explanations.
- Gather project contributions, difficult decisions, improvement ideas, and any authentic earlier screenshots.
- Dated content can become stale; maintenance is occasional and manual.
- Live feeds retain their existing external-service availability limits.

Once content is gathered, create a focused implementation plan before changing application behavior.

## Personal content gathered

### Now — proposed wording

User describes their current approach as trusting the process and doing what comes to mind, including coding, playing games, and watching anime. No specific current project or technical learning goal has been supplied.

> Lately, I’m learning to trust the process—coding whatever comes to mind, playing games, and watching a few anime. Taking things little by little and following my curiosity.

Use one short note rather than inventing entries to fill three categories. This is a proposed adjustment to the original three-entry layout; the wording and adjustment await final content review.

### Re:Zero — proposed wording

User recently finished the latest season available to them and particularly connected with Subaru's self-acceptance. Avoid assigning a season number or using a permanently relative “latest season” label.

> **Re:Zero** — Just finished watching, and honestly, it was peak. Seeing Subaru begin to accept himself and try to love himself more really stayed with me.
>
> “You really are an amazing guy, Natsuki Subaru.”

Proposed presentation: show the title and opening reaction, with character-development commentary and the quote inside a native “Show spoilers” disclosure. Wording and presentation await final content review.

### Apex Legends — approved public wording

The user explicitly confirmed comfort with publishing the following note:

> **Apex Legends** — I keep coming back for the ranked climb, even if I’ve been hardstuck for a while. Lately, I’m learning when to step back and give myself a break. The rank can wait.

Keep additional private context out of published content. Do not expand the note into claims about health or personal history.

### Project stories — pending

The user's individual contributions, difficult decisions, and improvement ideas still need to be gathered. Existing project descriptions do not establish individual ownership of team implementation details.

### WebC — approved public wording

The user identifies experimenting with features and repeatedly changing the UI/UX as the work they spent time on. Their dissatisfaction was specifically with the visual style. They currently feel “kind-of” satisfied. Their stated lesson is that even when satisfied, they continue finding things to improve.

The user explicitly approved these case-study additions:

> **My contribution:** I spent a lot of time trying out features and reworking WebC’s UI/UX. The visual style kept bothering me, so I kept changing it. I’m kind of satisfied with where it is now—for now.
>
> **What I learned:** Every time I thought I was satisfied, I eventually found something else to improve. WebC taught me that being happy with a version doesn’t mean there’s nothing left to work on.

Do not invent usability findings, measured improvements, specific feature ownership, a difficult technical decision, or a concrete next improvement. This story establishes visual iteration and a personal lesson; a specific difficult decision and future improvement remain unspecified. Keep team attribution intact.

## Implementation handoff

The first content pass can use the gathered Now note, Re:Zero commentary, Apex note, and WebC story. Apex and WebC wording are explicitly approved. Final review of the Now and Re:Zero drafts, the compact single-note Now adjustment, and implementation authorization remain pending. Other project stories remain absent until authentic content is supplied; do not block the first pass on invented or placeholder stories.

Preserve the approved scope and existing visual identity. Use optional contribution and lesson fields for project stories so WebC's actual account fits without fabricating a difficult decision or future improvement. No additional personal content should be inferred from this discussion.
