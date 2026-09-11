# AGENTS.md

## Purpose

This repository is a Markdown-first culinary knowledge system. Repository-held
Markdown is authoritative; Astro is a projection of eligible content and owns
all presentation. Do not add a CMS, browser editor, Obsidian callouts, CSS
classes, or layout tokens to canonical source.

## Authoring contract

Read [docs/authoring-contract.md](docs/authoring-contract.md) before adding or
migrating canonical content. It is the repository's complete serialization
guide and records which rules are accepted semantics versus local storage
choices.

- Use the templates in `templates/`; do not copy legacy recipe formatting.
- Canonical Recipes live directly in `recipes/`. Recipe Drafts and Superseded
  Recipe Versions are repository-held but are not canonical or publication
  eligible.
- Keep identities immutable and independent of titles, filenames, aliases, and
  routes. Structured metadata uses bare typed identities; Markdown links use
  `ref:<identity>` targets.
- Recipes use a single frontmatter title, a positive-integer `version`, one
  `scale_basis`, exactly one approved `dish-*` tag, semantic PHASE headings,
  and a Recipe-level Failure Modes table. Do not add a body H1, Structural
  Notes, recipe-wide technique/principle lists, `cssclass`, status, or
  presentation metadata.
- Ingredient Uses are introduced in their first-use Phase. Numeric quantities
  are `g` or `ml`; temperatures are `C`; times are `s`, `min`, or `h`.
- Promotion, Curation, retirement, and grandfathering records require the
  relevant templates and human Curator decisions. Do not fabricate acceptance,
  experimental evidence, or Curation.

## Naming and layout

- Recipes: `YYYY-MM-DD - Dish Name.md`
- Techniques: `Technique - Name.md`
- Principles: `Principle - Name.md`
- Experiments: `YYYY-MM-DD - Dish Trial.md`

The existing corpus is legacy material awaiting a separately approved migration.
Do not silently rewrite it while authoring the new contract.

## Validation and commits

- Run `make validate` after content or template changes.
- Run `pnpm check` after Astro, frontend, or tooling changes.
- Preserve unrelated working-tree edits.
- Use one conceptual commit with the applicable prefix: `recipe:`,
  `technique:`, `principle:`, or `experiment:`.
