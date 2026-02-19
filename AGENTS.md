# AGENTS.md

Guidance for coding agents and contributors working in this repository.

## Purpose

This repo is a structured culinary knowledge system for Obsidian.
All content is Markdown-first, phase-based, and versioned in git.

## Repository Standards

Follow the rules in `README.md`:

- Keep content in the canonical folders:
  - `recipes/`
  - `techniques/`
  - `principles/`
  - `ingredients/`
  - `experiments/`
  - `templates/`
- Use naming conventions exactly:
  - Recipes: `YYYY-MM-DD - Dish Name.md`
  - Techniques: `Technique - Name.md`
  - Principles: `Principle - Name.md`
  - Experiments: `YYYY-MM-DD - Dish Trial.md`
- Use metric units only (`g`, `ml`, `C`).
- Keep recipe scaling relative to the primary ingredient basis.
- Include one dish-type tag in each recipe frontmatter `tags`:
  - `dish-main-course`, `dish-side-dish`, `dish-dessert`, `dish-breakfast`, `dish-appetizer`, `dish-soup`, or `dish-sauce`.

## Recipe Authoring Rules

- Start from `templates/Recipe - Template.md`.
- Keep YAML frontmatter and `version`.
- Use chronological `PHASE` sections.
- Use the current two-column callout pattern:

```md
> [!columns]
>
> > [!column]
> > ### Components
> > | Ingredient | Quantity | Scaling |
>
> > [!column]
> > ### Method
> > 1. Step one.
```

- Include `## STRUCTURAL NOTES` and `## FAILURE MODES`.
- Do not introduce ingredients before their first-use phase.

## Obsidian Layout

- Active snippet: `.obsidian/snippets/modernist-layout.css`
- Recipe notes should include `cssclass: modernist-recipe` in frontmatter.
- Keep layout changes in the snippet file, not ad hoc inline styles.

## Validation and Hooks

- Run checks locally with:
  - `make validate`
- Install commit hooks once per clone:
  - `make install-hooks`
- Pre-commit runs `./scripts/validate_content.sh`.

## Commit Discipline

Use one conceptual change per commit with structured prefixes:

- `recipe: ...`
- `technique: ...`
- `principle: ...`
- `experiment: ...`

## Agent Behavior

- Prefer minimal, targeted edits.
- Preserve existing style and structure.
- Do not rename or move files unless required.
- After changes, run `make validate`.
