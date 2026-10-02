# Issue 26: real normal Promotion

## Curator decision and evidence

On 2026-10-01, Carlo Kruger explicitly accepted
`recipe/asian-ginger-chicken-noodle-soup@3` as the new Canonical Recipe,
based on his real whole-Recipe cooking trial and the stated limitations.

- [Completed Experiment](../../experiments/2026-10-01%20-%20Asian%20Ginger%20Chicken%20Noodle%20Soup%20Wing%20Stock%20Trial.md)
- [Exact v3 Promotion Record](../../records/promotions/asian-ginger-chicken-noodle-soup@3.md)
- [Canonical v3](../../recipes/2026-03-03%20-%20Asian%20Chicken%20Noodle%20Soup.md)
- [Immutable superseded v2](../../recipes/superseded/asian-ginger-chicken-noodle-soup@2.md)

The trial added 4 whole chicken wings from the start, in addition to the existing
chicken. Extraction followed the existing 85–90 C control, 20 min skimming,
and 90 min gentle simmer. The wings were discarded; the rest of the complete
Recipe was unchanged. Carlo reported better mouthfeel and some additional fat
that did not require removal. He requested the instruction to keep only a few
bubbles breaking the surface to preserve clarity.

The wings were not weighed. Their estimated 200–300 g total is explicitly
retrospective; the accepted Recipe specifies them by count. The cooking date
is unrecorded, the hypothesis was stated retrospectively, and collagen and
clarity were not measured. These limitations were included in the acceptance
question and accepted by Carlo.

## Lifecycle preservation

Commit `8691c0a` preserves the exact Recipe Draft v3 and its Completed Experiment
before Promotion. Byte comparisons confirmed that Canonical v3 is identical
to that draft and Superseded v2 is identical to the previous Canonical Recipe.
The completed evidence was not rewritten during Promotion.

## Validation and preview

- Content validation: 30 Recipes, 295 Knowledge Notes, 1 Completed Experiment.
- Full suite: 69 passing tests; coverage thresholds passed.
- `pnpm check`: lint, Astro checking, fresh build, and content validation passed.
- Fresh build: 334 pages, with the enduring soup route
  `/recipes/asian-ginger-chicken-noodle-soup/` and Completed Experiment route
  `/experiments/asian-ginger-chicken-noodle-soup-wing-stock-trial/`.
- The Experiment identifies its exact primary subject as
  `recipe/asian-ginger-chicken-noodle-soup v3`.
- Output inspection found no v2/v3 archive routes and no Hash Brownies draft
  route. The promoted v3 is no longer held in `recipes/drafts/`.
- Local browser inspection used 1440 × 1000 and 390 × 844 viewports. The soup
  phase link reached stock extraction. Both mobile pages had a 390 px document
  width; navigation and wide tables scroll within their containers.

Screenshots: [soup desktop](../../output/playwright/issue-26/soup-desktop.png),
[soup mobile](../../output/playwright/issue-26/soup-mobile.png),
[stock phase mobile](../../output/playwright/issue-26/soup-mobile-stock.png),
[Experiment desktop](../../output/playwright/issue-26/experiment-desktop.png),
and [Experiment mobile](../../output/playwright/issue-26/experiment-mobile.png).

## Gaps exposed and fixed

The first real Promotion exposed that Astro's library loads did not receive the
prior revision automatically, although the content-validation shell command
did. All repository library loads now prepare the same source-only Git history
snapshot. Missing ancestry cannot silently satisfy a Promotion check; CI fetches
complete history. Explicit history overrides and isolated-library checks remain
available. See [release gate](../release-gate.md).

The lifecycle fixtures also assumed there were no real Promotions. Their copied
libraries now reconstruct the explicitly grandfathered baseline from preserved
history and exclude real Experiments and Promotion Records. The actual library
has a separate v3/Experiment publication regression. A temporary Git repository
regression proves automatic Promotion checks before and after committing,
rejects modified completed evidence, and rejects shallow ancestry.

Mobile preview inspection found navigation overflow and narrow table columns.
Publisher CSS now contains navigation scrolling within the viewport and keeps
mobile table columns readable with contained horizontal scrolling.

## Review and delivery boundary

Main-thread review covered correctness, repository standards, testing,
adversarial lifecycle scenarios, reliability, and performance. No actionable
findings remain. Review was sequential in the main thread as required by the
repository instructions; no independent agent or cross-model review is claimed.

## Deployed preview and agent technical acceptance — 2026-10-02

PR [#47](https://github.com/ironicbuddha/my-recipe-book/pull/47) publishes the
work on `issue-26-soup-promotion`. GitHub validation and the Vercel release gate
passed for `ba356786f4278593967c1a3f1ba85f8425c82bcf`; deployment
`dpl_2N5U2H5dJdgpuoZJD8nGVosrv6tg` is Ready:
[immutable preview](https://my-recipe-book-3ua9b948x-carlo-krugers-projects.vercel.app/).

The first remote attempt exposed a grandfathering check that applied the old
v2 row to the promoted identity on later/merge revisions, plus repeated corpus
loads that exceeded a phase-link test's timeout. The exact-version check now
applies to the current version matching that inventory row. Regression coverage
proves later commits and merge checkouts, while retaining immutable-evidence,
missing-ancestry, and new-exemption rejection. The phase test still checks all
Recipes but renders them from one validated library snapshot. The full local
release gate then passed: 69 tests, coverage thresholds, validation, lint,
typecheck, and a fresh 334-page build. The deployed phase test took 706 ms.

Authenticated no-follow HTTP readback confirmed the soup and Completed
Experiment routes return 200. The soup contains four additional wings and the
low-simmer clarity instruction. The Experiment displays its exact v3 subject,
all four evidence sections, and the retrospective limitations. All 326 eligible
pages returned 200 with their expected titles, all 30 old Recipe paths returned
direct 301 redirects to destinations returning 200, and no Recipe phase target
was missing. The tested draft, superseded-source, version-archive, and Candidate
paths returned 404. The Recipe index includes soup and excludes Hash Brownies.
The full [HTTP matrix](issue-27-preview-http-audit.json) retains the separate
Hash Brownies withdrawal gap for #27; that gap does not invalidate this normal
Promotion demonstration.

Browser inspection at 1440 × 1000 and 390 × 844 confirmed readable soup and
Experiment pages. The mobile document width equals the 390 px viewport on both
pages; the soup phase link reaches `#phase-a-extract-stock`. Tables and navigation
remain contained. Deployed screenshots:
[soup desktop](../../output/playwright/issue-26/deployed-soup-desktop.png),
[stock phase mobile](../../output/playwright/issue-26/deployed-soup-mobile-stock.png),
[Experiment desktop](../../output/playwright/issue-26/deployed-experiment-desktop.png),
[Experiment mobile](../../output/playwright/issue-26/deployed-experiment-mobile.png).

Codex accepts #26's technical delivery against its five acceptance criteria.
This records agent verification, separately from Carlo's already-recorded
culinary Curator acceptance. The PR remains open; no production merge or
deployment is authorized by this acceptance. Production still resolves to
`dpl_9hJeR42NKeTZFb3WsM8t36EMU7hz` at `817c792d49b2d4a835232f1dfe678d85f7a3fbea`.
