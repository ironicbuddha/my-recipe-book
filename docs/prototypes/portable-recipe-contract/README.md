# Portable Recipe contract prototype

> **THROWAWAY PROTOTYPE** — this exists to answer a Wayfinder question, not to
> define production parser code.

## Question

Can one presentation-free Markdown document express the settled Recipe model
while giving Astro enough semantics to project the content into the existing
Modernist layout?

The candidate contract is in [`recipe.md`](./recipe.md). It deliberately uses
only YAML frontmatter, headings, paragraphs, lists, and tables. It contains no
Obsidian callouts, CSS classes, HTML, column names, or other layout commands.

Run the rendered proof with:

```sh
pnpm dev
```

Then open <http://localhost:4321/prototype-recipe-contract/>.

## Boundary under test

- Frontmatter carries Recipe Version metadata needed across the whole document.
- Numeric Ingredient Use scaling percentages use exactly two decimal places,
  including trailing zeros, rounded from the authored masses with halfway
  values rounded up. Discretionary or non-mass Uses retain `—` scaling.
- Each `## PHASE` heading establishes a Phase; source order gives dependency and
  intended start order.
- An optional unheaded overview precedes the run sheet.
- Phase-local subsections conditionally express Ingredient Uses, consumed and
  produced Phase Outputs, Technique Applications, timing, overlap, and
  Principles; Method is the only required Phase subsection.
- `## FAILURE MODES` is the only required Recipe-level tail section.
- Phase headings, rather than horizontal rules, separate the run sheet.
- Astro chooses the panels and visual hierarchy from semantic headings.
- Stable identities and reference syntax are placeholders for the separate
  publication-identity decision; this prototype tests their required slots,
  not their final spelling.

The renderer route is intentionally crude and should be deleted or absorbed
once the contract decision is captured.
