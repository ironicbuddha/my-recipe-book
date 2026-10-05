# Modernist Recipe Presentation Implementation Map

Status: implemented and validated locally on 2026-10-05 from the owner's accepted
design decisions. See [delivery evidence](2026-10-05-modernist-recipe-presentation-evidence.md).

## Inputs

- [Reference analysis and web specification](../../design/modernist-recipe-web-design-specification.html)
- [Supplied book screenshot](../../design/modernist-cusine-screenshot.png)
- [Existing design context](../../.impeccable.md)
- [Culinary authoring contract](../authoring-contract.md)

## Accepted decisions

1. One preparation group projects one existing Phase. Ingredient Uses sit beside
   that Phase's Method; its heading and supporting knowledge remain attached.
   Canonical Markdown does not acquire presentation grouping metadata. See
   [ADR-0003](../adr/0003-project-preparation-groups-from-phases.md).
2. Use a four-column matrix: Ingredient / Quantity / Scaling / Procedure.
   Preserve the authored Quantity (`g`, `ml`, or `As needed`) and validated
   Scaling value, including two decimal places and the discretionary dash.
   Identify the Recipe's declared scale basis in supporting text. Do not infer
   mass/volume conversions or reinterpret existing percentages as mass-only
   ratios. This deliberately adapts the specification's five-column example
   to the repository's existing culinary contract.
3. Scope this change to full Recipe pages (`src/pages/recipes/[slug].astro`)
   and the projection/components/styles needed by those pages. Scope visual
   styles to prevent changes to homepage and index preview cards, navigation,
   and Knowledge Note pages. Shared code changes must retain their behavior.
4. Keep Phase-local supporting knowledge visible. Put the Phase heading and
   authored overlap declarations above its matrix; show Ingredient Use notes
   beneath ingredient names; retain Technique Applications (including Controls
   and Purpose) and Principles below that Phase's matrix. Keep Phase Outputs and
   Phase Outputs Used clearly labeled within their owning Phase, never as
   Ingredient Uses. Preserve all authored text and links. Keep the Recipe-level
   Failure Modes visible after all Phases. Do not introduce collapsed knowledge
   sections in this version.
5. Retain the existing Recipe image as a hero at the top of the full Recipe
   page, followed by title, available facts, introduction, and preparation
   matrix. This is an intentional owner-approved deviation from the supplied
   specification's image-free opening. Recipes without an image still render
   the complete cooking content. This change does not generate or replace
   image assets.
6. Number displayed Method steps continuously from 1 to N across Phases.
   Preserve Phase-local ordered lists in canonical Markdown and retain existing
   Phase heading anchors. Display numbers are derived from source order and
   are not stable identities. The implementation must not claim reorder-stable
   step identities where the source does not author them.
7. The new specification governs the full Recipe page's visual direction:
   compact uppercase sans-serif title and labels, serif culinary text, italic
   fact values, restrained paper surface, and thin muted salmon horizontal
   rules. Use Impeccable to refine readability, responsive behavior, and font
   selection within that direction. Explicitly supersede conflicting full-page
   guidance in `.impeccable.md` during implementation; retain the existing
   guidance for surfaces outside this scope. The specification's sample fonts
   and hex colors are proposed starting points, not identified book originals.
8. Replace the Recipe page's Phase side rail with compact inline Phase jump
   links before the matrix. Retain All recipes and Share and add Print in a
   quiet utility row outside the recipe composition. Give the matrix the full
   recipe reading width. Keep jump targets and keyboard focus behavior usable;
   omit the utility row and jump navigation from print output.

9. Quantities remain read-only. Interactive yield adjustment, unit conversion,
   checklists, and cooking timers are outside this implementation.
   Deferred yield rescaling is tracked in
   [issue #51](https://github.com/ironicbuddha/my-recipe-book/issues/51).

## Source boundaries and visual interpretation

Canonical Markdown remains authoritative. Do not edit Recipes, lifecycle records,
the authoring contract, or validators to make the screenshot easier to reproduce.
The specification's sample JSON is illustrative, not a replacement storage model.
Project from validated existing content; do not create a second recipe dataset.

Show authored yield in a labeled facts definition list. Show the declared scale
basis near the matrix, including its resolved Ingredient label and basis quantity.
Do not infer overall timing from step durations or invent storage, difficulty,
equipment, attribution, or serving counts. Current canonical frontmatter does
not provide those optional specification fields. Omit absent facts. Keep date,
version, and taxonomy secondary if displayed; do not let them compete with yield
or imply experimental acceptance beyond the existing publication contract.

Preserve the existing Scaling semantics for both g and ml quantities. Label the
column Scaling, not percent of total or mass percentage. Split Uses of the basis
Ingredient may individually be below 100%; their declared total is the basis.
Do not force an individual row to 100% merely because it names that Ingredient.

Adapt the reference's proportions to four columns, initially 27% Ingredient,
14% Quantity, 10% Scaling, and 49% Procedure. Treat these as tuning values, not
fixed acceptance thresholds. Left-align quantities and use tabular numerals.
Use only horizontal warm rules between groups, with the taller side determining
group height. Do not align individual ingredient rows with particular Method
steps or imply finer associations than the Phase provides.

## Delivery sequence

Dependencies: M1 → M2 → M3 → M4 → M5 → M6.
Each milestone has a concrete exit condition; complete them in order.

| Unit | Work and primary files | Exit condition |
| --- | --- | --- |
| M1 — Confirm the implementation brief | Read this map, the HTML specification, ADR-0003, `.impeccable.md`, and current branch instructions. Update only the full-Recipe-page portion of `.impeccable.md` to encode the accepted decisions. Select representative real Recipes. | The scope and deliberate deviations are explicit; baseline routes and visual screenshots are recorded before frontend edits. |
| M2 — Project structured Phases | Add a focused Recipe presentation projection, preferably `src/lib/recipe-presentation.ts`; extend `src/lib/recipes.ts` only where needed to expose identity/version/basis data. Reuse `src/lib/library.ts` reference resolution and Markdown rendering rather than duplicating their rules. Add `tests/recipe-presentation.test.ts`. | Each source Phase projects exactly once, every subsection is retained, quantities and Scaling are unchanged, and numbering continues correctly. Focused tests pass. |
| M3 — Build semantic recipe markup | Update `src/pages/recipes/[slug].astro`; add narrowly scoped components such as `RecipePreparationGroup.astro` only where the repeated Phase structure benefits. Preserve existing hero lookup and Share behavior. | A single DOM contains all cooking content in useful mobile reading order, with existing Phase anchors, labeled facts, a shared matrix header, and globally numbered native ordered lists. |
| M4 — Apply the visual direction | Add Recipe-scoped styles, preferably `src/styles/recipe.css`. Use Impeccable craft references for typography, spacing, contrast, and responsive layout. Add a Recipe-specific font-loading option in `SiteLayout.astro` only if needed. | Desktop, tablet, and phone layouts express the reference's mixed typography and grouped matrix, with the approved hero. Other surfaces retain their current styles and fonts. |
| M5 — Complete utilities and print | Add the Print action, inline Phase jumps, keyboard states, and print CSS. Reuse `ShareSheet.astro` without broadening its API unnecessarily. | Share, Back, jumps, and Print work; all culinary content prints on A4 and Letter; utilities and site chrome are omitted from print. |
| M6 — Validate, review, and commit | Capture visual and print evidence, run the required checks, use the implementation skill's code-review workflow, repair findings, and commit only this change on the current branch. | Acceptance checks below pass; evidence and any residual limitations are recorded. No unrelated files enter the commit. |

## Projection and markup seam

Parse canonical Markdown into a typed presentation view using Markdown tokens or
the repository's existing structural helpers. Do not reconstruct the matrix by
scraping rendered HTML or guessing ingredient names from Method prose. Keep the
generic `renderContent` path working for Knowledge Notes and Experiments.

The presentation view needs the overview, authored facts, scale basis, and ordered
Phases. Each Phase retains its original heading/anchor, Ingredient Uses with their
local keys and rich-text labels/Use notes, Method items, Technique Applications,
Principles, overlap prose, and produced/consumed outputs. Retain the Failure Modes
and any other valid authored content. Reuse the existing safe rendering and typed
reference resolution for inline formatting and links; never enable raw arbitrary
HTML from content. Do not silently drop a subsection the new renderer overlooks.

Use a Recipe article with one h1 and a section per Phase. Ingredient entries need
programmatic Quantity and Scaling labels even when desktop has shared visual
column labels. Ordered Method lists use the cumulative start value. Decorative
circles must not become duplicate spoken numbers or buttons, and must accommodate
two- and three-digit values without clipping.

DOM order is Phase heading/overlap, Ingredient Uses, Method, visible supporting
knowledge, and outputs, followed by the next Phase. Desktop CSS places Ingredient
Uses and Method alongside each other. Phases without new Ingredient Uses remain
valid groups: their Method and existing outputs still appear, with no invented
ingredient rows. Phase Outputs Used remain distinct from Ingredient Uses and
are available in that Phase; do not turn intermediate products into quantities
to buy or formulate again.

Preserve existing Phase anchor IDs exactly. If Method anchors are added, derive
unique page-local anchors from Phase and local item position and describe their
reordering limitation. Reorder-stable step identities would require separate
authoring work and are not an acceptance requirement for this presentation change.

## Impeccable application

Use `impeccable craft` for M3–M5 with this map and its accepted decisions as the
brief. Preserve the clinical, precise, uncompromising audience context already
confirmed in `.impeccable.md`. Do not restart a generic aesthetic brainstorm.
Confirm any unresolved design choice narrowly before building it.

Load `reference/spatial-design.md` and `reference/typography.md`, then
`reference/responsive-design.md`, `reference/color-and-contrast.md`, and
`reference/interaction-design.md`. Use `reference/ux-writing.md` for short labels
where needed. Motion is unnecessary for this reading/cooking surface.

Choose a readable sans/serif pairing through Impeccable's font-selection process:
record the voice words, reject reflex choices, inspect a font catalog, and verify
the result against the reference. Test italic facts and tabular numerals. Scope
font loading and styling to Recipe pages so the choice does not redesign the site.
Keep the sans title near the specification's restrained 26 px starting point,
body text at least 16 px, and spacing compact but readable. Faithfulness is about
information hierarchy and reading rhythm, not copying the screenshot's line breaks.

Use Recipe-local semantic tokens for paper, ink, secondary ink, rules, and spacing.
Use near-white paper and dark ink with modern color functions where practical;
match the reference's visual restraint. The muted salmon rule is a grouping cue,
not a substitute for structure. Avoid shadows, rounded containers, zebra striping,
vertical dividers, decorative motion, and oversized step badges.

Use `impeccable extract` only if the implementation actually reveals patterns
repeated with the same intent. A new site-wide component library is unnecessary
for this scoped redesign. Keep the existing Stitch design document as historical
context; do not rewrite it to imply it already specified this new composition.

## Responsive and print contract

- At approximately 1024 px and wider, show the four-column matrix and two-column
  introduction. Use natural heights and a roughly 1100 px maximum reading width.
- At 768–1023 px, use a single-column introduction and put each Phase's compact
  ingredient area above its Method. Reveal quantity labels as needed.
- Below 768 px, show each ingredient name/Use note followed by labeled Quantity
  and Scaling, then that same Phase's Method. Facts labels stack above values.
- Support 320 px width and 200% text enlargement. No hidden quantities, clipped
  step markers, or default page-wide horizontal scroll. Supplementary tables also
  need readable responsive treatment; fixing only the primary matrix is insufficient.
- Keep the approved hero responsive, reserve its dimensions to prevent layout
  shifts, and preserve meaningful alternative text. No image means no empty hero.
- Print title, facts, introduction, every Phase, supporting knowledge, and Failure
  Modes. Omit the hero in print to prioritize the cooking sheet. Use the matrix
  where printable width supports readable text; otherwise stack per Phase.
  Prefer unbroken short groups, but allow long Phases to paginate rather than
  clipping them or creating huge blank areas. Check both A4 and Letter output.

## Pre-agreed TDD seams and acceptance evidence

Use TDD for the projection seam in M2, not pixel-by-pixel CSS assertions. Cover:

- One group per Phase, including a Phase without new Ingredient Uses.
- Repeated Ingredients in different Phases retain their separate local Uses.
- Exact Quantity and Scaling preservation: g, ml, decimals, values above 100%,
  `As needed`/dash, and split basis Uses.
- Global display numbering across Phase-local lists, including long sequences.
- Overview and every supporting subsection retained, including Controls, Purpose,
  overlap declarations, produced/consumed outputs, and Failure Modes.
- Inline Markdown and typed links retain existing eligible/unpublished-target
  behavior; existing Phase anchors do not change.

Use real corpus content for visual checks. Start with Asian Chicken Noodle Soup,
Sourdough Bread, and the multi-component Reverse-Seared Fillet recipe, then confirm
their actual feature coverage. Use small focused fixtures only for gaps such as
three-digit numbering and an absent image. A fixture is layout/test evidence, not
new canonical culinary content.

Record browser evidence at 320, 390, 768, 1024, and 1440 px, plus 200% text zoom.
Inspect all Recipes for missing content or overflow after the structured renderer
changes. Check keyboard traversal, visible focus, accessible names and labels,
native ordered-list numbering, Share, Print, and Phase jumps. Check essential
text contrast against 4.5:1 and the screen-reader sequence through multiple Phases.
Inspect A4 and Letter print PDFs visually, including a Phase taller than one page.

Capture homepage, recipe index, and a Knowledge Note before/after as a scope
regression check. Verify canonical URLs and legacy redirects retain their current
behavior. Do not treat local browser checks as evidence of production deployment.

During implementation run `pnpm typecheck` and the focused test file regularly.
At the end run `make validate`, `pnpm check`, `pnpm test` once, and
`git diff --check`; repeat relevant checks only after subsequent fixes. Use the
repository's existing test runner and avoid introducing a new test framework.
Record commands and actual outcomes in the handoff evidence.

## Completion and invocation

Suggested next instruction:

```text
$implement docs/plans/2026-10-05-modernist-recipe-presentation-map.md
Use $impeccable craft for the recipe-page presentation and the pre-agreed TDD seams.
```

The implementation skill requires review and a commit on the current branch.
Use the repository's applicable `recipe:` prefix for this conceptual change.
Preserve unrelated dirty files, existing image-review candidates, and `resume.txt`.
Include the supplied specification and screenshot when committing the scoped
handoff so its references remain available from a fresh checkout. Push, PR,
merge, and deployment are separate from this local implementation handoff.
