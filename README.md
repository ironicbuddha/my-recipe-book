# Modernist Kitchen

A structured, version-controlled culinary knowledge system.

This repository documents recipes, techniques, principles, ingredients, and experiments using a Modernist Cuisine–inspired format.  
All content is written in Markdown and designed for use within an Obsidian vault.

---

## Philosophy

Cooking is applied chemistry under constraints.

This system prioritizes:

- Structural thinking over storytelling
- Measurable ratios over intuition
- Phase-based execution over narrative flow
- Reproducibility over improvisation
- Versioned evolution over static recipes

Each recipe follows a chronological, phase-driven structure aligned with real preparation timelines.

---

## Repository Structure
my-recipe-book/
│
├── recipes/
├── techniques/
├── principles/
├── ingredients/
├── experiments/
├── templates/
└── README.md
### recipes/
Canonical dishes formatted in Modernist house style.

### techniques/
Execution mechanics (e.g., hibachi grilling, emulsification).

### principles/
Scientific mechanisms (e.g., Maillard reaction, enzyme activity).

### ingredients/
Ingredient-specific technical notes.

### experiments/
Non-canonical trials, variations, and failures.

### templates/
Standardized Markdown templates for consistency.

---

## Recipe Format Standard

Each recipe must include:

- YAML frontmatter
- Clear PHASE segmentation (A, B, C…)
- Two-column logic (Components + Method)
- Metric units only (g, ml, °C)
- Percentage-based scaling relative to primary ingredient
- Structural Notes section
- Failure Modes section
- Version number

No ingredient may appear before it is used.

---

## Scaling Discipline

All recipes define a primary mass basis.

Example:

If pork = 600 g  
All ingredient percentages are calculated relative to 600 g.

This enables:

- Instant scaling
- Ratio clarity
- Reproducibility
- Structural comparison between recipes

Avoid volumetric measures. Prefer grams.

---

## Naming Conventions

Recipes:
`YYYY-MM-DD - Dish Name.md`

Techniques:
`Technique - Name.md`

Principles:
`Principle - Name.md`

Experiments:
`YYYY-MM-DD - Dish Trial.md`

Consistency prevents entropy.

---

## Versioning

Recipes evolve.

Version is tracked in two ways:

1. YAML frontmatter (`version: v1.0`)
2. Git history

Canonical recipes live on `main`.
Experimental variants may live on branches until promoted.

---

## Commit Discipline

Use structured commit messages:
recipe: add grilled pork al pastor v1
technique: add hibachi grilling note
principle: add enzyme activity reference
experiment: log al pastor trial 01
One conceptual change per commit.

Pre-commit linting:

1. Run `make install-hooks` once per clone.
2. Every commit will run `./scripts/validate_content.sh`.

---

## Tagging Rules

Tags should remain minimal and functional.

Suggested categories:

Cuisine: #mexican #french #italian  
Protein: #pork #chicken #beef  
Heat Source: #charcoal #oven #frying  
Transformation: #maillard #emulsion #gelatinization  
Texture: #crisp #tender #set  

Avoid tag inflation.

---

## Long-Term Goals

- Build a linked culinary knowledge graph
- Track experimental iterations
- Compare ratios across cuisines
- Export canonical recipes to publication-ready PDFs
- Maintain a living laboratory of applied food science

---

Cooking is a system.

This repository is the documentation of that system.
