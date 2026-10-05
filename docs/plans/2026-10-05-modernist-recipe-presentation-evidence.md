# Modernist Recipe Presentation — Local Delivery Evidence

Implemented on `fix/recipe-hero-associations` against starting HEAD
`183c6cf9ed67d79146fb26aba8f7254a5a3342cb`. The accepted implementation map and
ADR-0003 govern this delivery. Canonical culinary source, lifecycle records,
validators, image assets and hosting configuration were not changed.

## Delivered behavior

- One preparation group per authored Phase, including Phases with no new
  Ingredient Uses. Quantity and Scaling strings remain exact and read-only.
- Safe token-based projection reuses the existing reference resolver and Markdown
  renderer. Overview, Use notes, overlap prose, Controls, Purpose, Principles,
  consumed/produced outputs and Failure Modes remain visible.
- A single semantic DOM presents ingredients before Method, with native ordered
  lists numbered continuously across Phases and separate Method lists. Existing
  Phase anchors remain unchanged. No reorder-stable step identities are claimed.
- Existing hero lookup and meaningful alternative text remain; no hero renders
  when its asset is absent. Yield has labeled italic facts; the declared Ingredient
  and quantity identify the scale basis. No optional culinary facts are invented.
- Recipe-scoped Archivo / Source Serif 4 typography, near-white paper and thin
  salmon horizontal rules replace the full-page card composition. The rest of
  the library retains its existing typography and presentation.
- Inline Phase jumps, All recipes, existing Share and a Print action sit outside
  the cooking composition. Print omits hero, utilities and site chrome, uses the
  matrix, and allows long Phases to paginate.

Font catalog inspection: [Archivo](https://fonts.google.com/specimen/Archivo)
and [Source Serif 4](https://fonts.google.com/specimen/Source+Serif+4).
The confirmed clinical, precise, uncompromising voice and rejected reflex
choices are recorded in `.impeccable.md`.

## Automated validation

| Command | Actual final outcome |
| --- | --- |
| `make validate` | 55 Recipes, 361 Knowledge Notes, 26 Completed Experiments passed. |
| `pnpm exec vitest run tests/recipe-presentation.test.ts` | 6 tests passed, including all 55 Recipes. |
| `pnpm typecheck` | No errors or warnings; 3 existing hints. |
| `pnpm check` | Lint, typecheck, 450-page build and content validation passed. |
| `pnpm test` | 84 tests passed in 6 files. Coverage: 86.42% statements, 86.03% lines, 97.91% functions. |
| `pnpm exec stylelint src/styles/recipe.css` | Passed after final print refinements. |
| `pnpm build` | Final print refinements built successfully; 450 pages. |
| `git diff --check` | Passed. |

The projection tests cover repeated/split basis Uses, discretionary dash,
`As needed`, decimal ml, Scaling above 100%, Phase-local g values, three-digit
numbering, nested and ancillary lists, typed links and disabled raw HTML.
The existing publication-build test also verifies real absent-image fallback
and migrated hero/card lookup using the new page markup.

## Browser and print evidence

Run the committed local audit with `pnpm preview --host 127.0.0.1 --port 4322`,
then `pnpm exec tsx output/playwright/modernist-audit.ts` (installed Chrome).
The audit uses the built site and writes artifacts under `output/playwright/`.
Its DOM-only long-Phase fixture and removed-hero fixture are layout evidence,
not culinary content.

- Asian Ginger Chicken Noodle Soup, Sourdough Bread and Reverse-Seared Fillet:
  screenshots at 320, 390, 768, 1024 and 1440 px. All 55 Recipes also checked at
  320 and 1440 px: no page-wide overflow.
- All three representative Recipes checked at 200% text enlargement at all five
  widths: no page-wide overflow. The existing navigation uses internal scrolling
  when enlarged text needs it, retaining every destination.
- Native ordered lists and measure definition lists appear in the accessibility
  snapshot in cooking order. Keyboard activation of a Phase jump focuses its
  heading; subsequent Tab continues to the Phase's links. Share opens and Escape
  closes its existing dialog. Print invokes `window.print()`.
- Essential text contrast measured at 16.28:1; Use notes and scale-basis text at
  8.09:1 against paper. Links retain underlines and visible focus.
- Every legacy publisher redirect reached its canonical destination in local
  static preview. The tests still check the hosting-owned redirect contract;
  static preview does not establish production HTTP status or deployment.
- Homepage, Recipe index and Bread flour Knowledge Note captured before and
  after: unchanged layout, type hierarchy, navigation and preview cards. These
  comparisons include minor dev-versus-built image encoding differences and the
  baseline Astro developer toolbar; they are not pixel-equality claims.
- A4 and Letter PDFs generated for all three Recipes and a Phase with 120 added
  fixture steps. All fixture steps survived PDF text extraction. Print layouts
  were rendered with Poppler and visually reviewed for missing text, clipping,
  group boundaries and pagination. Short ingredient entries and table rows stay
  together; long Phases can split.

Selected review artifacts:

- [Desktop cooking sheet](../../output/playwright/modernist-sourdough-bread-1440.png)
- [320 px cooking sheet](../../output/playwright/modernist-sourdough-bread-320.png)
- [Phone at 200% text](../../output/playwright/modernist-sourdough-bread-390-text200.png)
- [Soup A4](../../output/playwright/modernist-asian-ginger-chicken-noodle-soup-A4.pdf)
- [Bread Letter](../../output/playwright/modernist-sourdough-bread-Letter.pdf)
- [Fillet A4](../../output/playwright/modernist-reverse-seared-fillet-hibachi-cabbage-steakhouse-fries-gochujang-sauce-A4.pdf)
- [Long Phase A4](../../output/playwright/modernist-long-phase-A4.pdf)
- [Audit results](../../output/playwright/modernist-audit.json)
- [Text enlargement results](../../output/playwright/modernist-text-enlargement.json)
- [Accessibility sequence](../../output/playwright/modernist-bread-accessibility.yml)
- [Homepage comparison](../../output/playwright/modernist-scope-home.png)
- [Index comparison](../../output/playwright/modernist-scope-index.png)
- [Knowledge comparison](../../output/playwright/modernist-scope-knowledge.png)

## Code review

Used the implementation skill's code-review workflow against starting HEAD and
this plan, adapting its two axes to sequential main-thread review as AGENTS.md
requires. Reviewed the staged implementation and repaired findings before commit.

**Standards:** no remaining documented-standard violations or material code-smell
findings. The projection does not introduce a second recipe dataset or canonical
presentation metadata. No unrelated files are staged.

**Specification:** no remaining implementation findings. Review and validation
repaired separate-list numbering, updated the existing hero assertion for the
new markup, contained enlarged navigation text, and removed whole-Phase print
keep-together rules that caused excessive blank space. A final print refinement
keeps headings with their matrix and separates compact column labels.

Browser evidence is Chromium/Chrome only. Accessibility verification covers native
semantics, the browser accessibility snapshot and keyboard behavior, not a live
screen-reader session. Local implementation and validation do not imply push,
PR, merge or deployment. Yield adjustment remains deferred to issue #51.
