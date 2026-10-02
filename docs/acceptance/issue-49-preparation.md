# Issue 49: complete intake prepared for preview acceptance

## Authority and scope

The [accepted packet](../plans/2026-10-02-recipes-tmp-review/README.md) and
[issue #49](https://github.com/ironicbuddha/my-recipe-book/issues/49) record
Carlo Kruger's 2026-10-02 culinary acceptance, concrete 63-Ingredient and
three-Technique Curation, component handling and Carbonara clarification.
This implementation serializes those existing decisions. It does not claim
new cooking, variation-specific observations, preview acceptance or deployment
approval.

All 25 original `recipes-tmp` files remain byte-for-byte unchanged. All five
packet documents match the issue snapshot manifest. `resume.txt` is untouched.
The image-prompt packet supplies the required 25 recipe-faithful prompts;
no image provider was called and no image was generated.

## Lifecycle and content

Draft-history revision `7456df1` preserves all 25 exact version 1 Recipe Drafts,
25 Completed Experiments, 66 new substantive Knowledge Notes and their Curation
records. Its archived source-only library validates independently against the
pre-intake revision: 30 Canonical Recipes, 361 Knowledge Notes and 26 Completed
Experiments, with the intake Recipe Drafts remaining unpublished.

Every newly canonical version is byte-for-byte identical to its preserved draft.
Each matching Promotion Record names Carlo's actual acceptance date, exact
whole-Recipe evidence, draft revision and SHA-256. Completed evidence is unchanged
from the preserved revision. Historical cooking dates, trial counts and instrument
measurements remain unrecorded; record dates are 2026-10-02. Carbonara retains
Carlo's detailed recollection and its observable off-heat emulsion cues.

The three source-derived reconstruction qualifiers in the Nachos and bean
cooking notes remain verbatim to preserve the evidence-bound draft. The
retrospective evidence and Promotion Records explain their provenance and the
later human acceptance. No authored draft-status flag remains in the Recipes.

Source-to-canonical auditing and publication tests verify all 25 immutable
identities, basis quantities, recalculated percentages, split Uses and raw
Ingredient totals without counting internal outputs twice. Methods preserve
recorded alternatives without claiming separate testing observations. Component
consumption retains the reviewed portions and explicit remainder handling.
Nachos links the three separately prepared companion Recipes.

## Validation

- `pnpm release:verify` passed every required stage: content validation, lint,
  Astro checking, complete test suite/coverage and fresh build.
- Full suite: 77 passing tests across five files. Coverage: 85.52% statements,
  85.26% lines, 98.29% functions and 81.07% branches; required thresholds passed.
- `pnpm check` passed after the complete draft-history revision was preserved.
- Final authoritative library: 55 Recipes, 361 Knowledge Notes and
  26 Completed Experiments. Fresh Astro build: 450 pages.
- Focused prompt regressions cover canonical basis/overview/Phase applications,
  ice-cream scoops, lasagna layers and lookup by an immutable key despite an
  accented title. Prompt extraction uses the authoritative library.
- Existing rejection tests remain intact for missing ancestry, invalid or
  mismatched whole-Recipe evidence, and mutation of completed evidence.

## Local preview and production readback

The built local preview runs at `http://127.0.0.1:4333/`. HTTP inspection confirmed
all 442 eligible content routes return 200, all 50 tested intake draft/exact-version
URLs return 404, and 178 distinct linked targets from the new Recipe and Experiment
pages resolve. All 25 Recipe, 66 new Knowledge Note and 25 new Experiment routes
are included in that complete-library readback.

Browser inspection used 1440 × 1000 and 390 × 844 viewports. Nachos Phase navigation
reached `#phase-b-layer-and-bake`; Nachos, vanilla ice cream and the Carbonara
Experiment had a 390 px document width on mobile. Wide tables remain contained.
The inspected pages render without hero images and reported no browser errors.

Screenshots:

- [Nachos desktop](../../output/playwright/issue-49/nachos-desktop.png)
- [Nachos mobile](../../output/playwright/issue-49/nachos-mobile.png)
- [Nachos assembly](../../output/playwright/issue-49/nachos-mobile-assembly.png)
- [Ice cream mobile](../../output/playwright/issue-49/ice-cream-mobile.png)
- [Experiment mobile](../../output/playwright/issue-49/experiment-mobile.png)
- [Lasagna desktop](../../output/playwright/issue-49/lasagna-desktop.png)
- [Aggregate HTTP readback](../../output/playwright/issue-49/http-readback.json)

Production deployment `my-recipe-book-hrz6mi8h8-carlo-krugers-projects.vercel.app`
was inspected as Ready/Production. Live readback of `recipes.carlokruger.com`
confirmed all 30 existing redirect statuses and exact Location destinations,
plus HTTP 410 for the single withdrawal. The publisher inventory is unchanged.
The new intake has not been pushed or deployed, and no hosted-preview or
new-production success is claimed.

## Standards review

Reviewed sequentially in the main thread against `dd7f38d`, following the
repository's agent-tool mapping. Sources: AGENTS.md, the authoring contract,
CONTEXT.md, the human-controlled Promotion ADR and release-gate contract.
No blocking Standards findings remain. Typed identities, canonical serialization,
human attribution, immutable evidence and source preservation were checked.
The fixture adjustment keeps later normal Promotions as drafts when reconstructing
isolated grandfathered libraries; it does not relax production validation.

## Spec review

Reviewed against issue #49 and the five exact packet snapshots. No blocking
implementation findings remain. Prompt framing and the completeness of accented
Knowledge Note filenames in preserved history were corrected before finalization.
The complete batch is prepared and locally verified. Concrete human preview
acceptance and explicit production deployment authority remain required future
execution gates; issue #49 remains open for release and production verification.
