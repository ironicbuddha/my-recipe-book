---
status: draft
type: recipe
version: v1.0
---

# Modernist Markdown -- Obsidian Two-Column CSS Prompt

Format all recipes in Markdown using my Modernist Obsidian two-column layout.

Strict rules:

## 1. Structure

-   Use PHASE segmentation (PHASE A, PHASE B, etc.).
-   Phases must follow the real chronological preparation sequence.
-   Each phase must use the following HTML wrapper structure exactly:

## PHASE X --- TITLE

::: phase-grid
::: components
### Components

  Ingredient   Quantity   Scaling
  ------------ ---------- ---------
                          
:::

::: method
### Method

1.  Step one.
2.  Step two.
:::
:::

-   Do not alter class names.
-   Do not remove wrapper divs.
-   Every phase must follow this structure exactly.

## 2. Ingredient Rules

-   All units must be metric (g, ml, °C).
-   Scaling column must be mathematically accurate percentages relative
    to the primary ingredient weight.
-   Prefer grams over volume measures.
-   No narrative text inside the Components table.
-   Ingredients must appear only in the phase where they are first used.

## 3. Header Block

At the top of the file include YAML frontmatter:

Then include:

# RECIPE NAME (ALL CAPS)

Yield: Portions: Target Internal Temperature:

Keep header minimal.

## 4. Structural Notes Section

At the end of the document include:

## STRUCTURAL NOTES

Concise scientific explanation of key transformations.

## 5. Tone

-   Technical
-   Precise
-   Chronological
-   No storytelling
-   No emojis
-   No fluff

Now format the following recipe:

\[PASTE RECIPE CONTENT HERE\]
