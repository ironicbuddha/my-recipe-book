# Modernist Kitchen

A version-controlled culinary knowledge system. Markdown in this repository is
the source of truth; Astro presents valid, publication-eligible content without
becoming a competing content system.

## Start here

Use [the authoring contract](docs/authoring-contract.md) and the templates in
`templates/` for all new content. The contract defines the portable Markdown
model for Recipes, Experiments, Promotion Records, Knowledge Curation, stable
identities, scoped references, and grandfathering. It also separates accepted
culinary semantics from this repository's chosen file layout.

The current recipe corpus uses a legacy format and awaits a separately approved
migration. Do not treat it as a template or silently convert it while adding new
work.

## Repository layout

```text
recipes/                 current Canonical Recipe admission boundary
techniques/              curated Technique Knowledge Notes
principles/              curated Principle Knowledge Notes
ingredients/             curated Ingredient Knowledge Notes
experiments/             Experiment records
records/                 Promotion, Curation, retirement, and migration records
templates/               portable authoring templates
docs/                    contract and implementation documentation
```

Canonical state is admission to `recipes/`, not a frontmatter flag. Valid
Canonical Recipes, Completed Experiments, and substantive curated Knowledge
Notes are eligible for publication. Drafts, Superseded Recipe Versions,
Knowledge Candidates, and Retired Candidates are not.

## Checks

- `make validate` validates the current content boundary.
- `pnpm check` runs linting, Astro typechecking, a build, and content validation.
- `make install-hooks` installs the content-validation pre-commit hook.

## Commit discipline

Keep one conceptual change per commit. Use `recipe:`, `technique:`,
`principle:`, or `experiment:` as appropriate.
