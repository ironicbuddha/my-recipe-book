---
title: "Sourdough Bread"
date: 2026-02-23
identity: recipe/sourdough-bread
version: 1
yield: "2 loaves (~900 g each)"
scale_basis:
  ingredient: ingredient/bread-flour
  quantity_g: 1100
tags: [dish-side-dish, bread, sourdough]
---

Lean naturally leavened bread with staged fermentation, folds, and covered baking.

## PHASE A — BUILD LEVAIN

### Ingredient Uses

| Key | Ingredient | Quantity | Scaling | Use |
| --- | --- | --- | --- | --- |
| starter | [Mature sourdough starter](ref:ingredient/mature-sourdough-starter) | 20 g | 1.82% | Inoculate the levain. |
| flour | [Bread flour](ref:ingredient/bread-flour) | 100 g | 9.09% | Feed the levain. |
| water | [Water](ref:ingredient/water) | 100 g | 9.09% | Hydrate the levain. |

### Technique Applications

| Technique | Controls | Purpose |
| --- | --- | --- |
| [Levain build](ref:technique/levain-build) | Ferment about 8 h at room temperature until expanded and active. | Produce ripe leaven. |

### Principles

- [Yeast and lactic acid bacteria fermentation](ref:principle/yeast-and-lactic-acid-bacteria-fermentation) — The culture produces gas and acidity.

### Method

1. Mix starter, flour, and water until homogeneous.
2. Cover and ferment until expanded and active.

### Phase Outputs

| Key | Phase Output | Description |
| --- | --- | --- |
| ripe-levain | Ripe levain | Active leaven for the dough. |

## PHASE B — MIX AND DEVELOP DOUGH

### Ingredient Uses

| Key | Ingredient | Quantity | Scaling | Use |
| --- | --- | --- | --- | --- |
| flour | [Bread flour](ref:ingredient/bread-flour) | 1000 g | 90.91% | Mix into the dough. |
| water | [Water](ref:ingredient/water) | 640 g | 58.18% | Use 600 g to hydrate the flour and reserve 40 g to dissolve salt. |
| salt | [Salt](ref:ingredient/salt) | 20 g | 1.82% | Dissolve in the additional water. |

### Technique Applications

| Technique | Controls | Purpose |
| --- | --- | --- |
| [Autolyse](ref:technique/autolyse) | Rest flour and water 30 min to 4 h. | Hydrate flour before salt incorporation. |
| [Folding](ref:technique/folding) | Perform 3 stretch-and-fold sets over 90 min. | Strengthen dough without intensive kneading. |
| [Bulk fermentation](ref:technique/bulk-fermentation) | Ferment 2–3 h until visibly aerated. | Develop gas and dough structure. |

### Principles

- [Hydration ratio](ref:principle/hydration-ratio) — Water proportion controls dough handling and crumb.
- [Gluten development](ref:principle/gluten-development) — Resting and folding develop structure.
- [Salt control of fermentation](ref:principle/salt-control-of-fermentation) — Salt affects fermentation timing.

### Method

1. Combine water, ripe levain, and flour; cover and rest.
2. Dissolve salt in the additional water, mix it into the dough, and perform three stretch-and-fold sets.
3. Let the dough bulk ferment until visibly aerated.

### Phase Outputs Used

| Phase Output | Use |
| --- | --- |
| Ripe levain | Dissolve `ripe-levain` in the dough water. |

### Phase Outputs

| Key | Phase Output | Description |
| --- | --- | --- |
| bulk-dough | Bulk-fermented dough | Aerated dough ready to divide. |

## PHASE C — SHAPE, PROOF, AND BAKE

### Technique Applications

| Technique | Controls | Purpose |
| --- | --- | --- |
| [Staged baking](ref:technique/staged-baking) | Bake covered then uncover for the last 10 min; total about 40 min at 240 C. | Allow spring before browning the crust. |

### Principles

- [Steam-assisted oven spring](ref:principle/steam-assisted-oven-spring) — Covered baking delays crust setting during expansion.
- [Maillard reaction](ref:principle/maillard-reaction) — The uncovered finish browns the crust.

### Method

1. Divide the dough into two, pre-shape, rest 30 min, shape, and proof 2–3 h at room temperature or overnight in the refrigerator.
2. Preheat a lidded casserole at 240 C for at least 20 min.
3. Bake each scored loaf covered, uncover for the final 10 min, and cool completely before slicing.

### Phase Outputs Used

| Phase Output | Use |
| --- | --- |
| Bulk-fermented dough | Divide `bulk-dough`, pre-shape, rest, shape, proof, and score. |

## FAILURE MODES

| Symptom | Likely cause | Corrective action |
| --- | --- | --- |
| Dense loaf | Levain or bulk fermentation was insufficient. | Extend fermentation and confirm levain activity. |
| Flat dough | Gluten was weak or dough overproofed. | Add a fold set and shorten final proof. |
| Gummy crumb | Centre was underbaked or sliced hot. | Bake to about 98 C and cool fully. |
