---
title: "Masterclass Chocolate Brownie"
date: 2026-02-19
identity: recipe/masterclass-chocolate-brownie
version: 1
yield: "~1.1 kg batter"
scale_basis:
  ingredient: ingredient/butter
  quantity_g: 250
tags: [dish-dessert, chocolate, brownie]
---

Dense chocolate brownie with a crackled surface and controlled set.

## PHASE A — MELT CHOCOLATE

### Ingredient Uses

| Key | Ingredient | Quantity | Scaling | Use |
| --- | --- | --- | --- | --- |
| butter | [Butter](ref:ingredient/butter) | 250 g | 100.00% | Melt gently. |
| chocolate | [Dark chocolate](ref:ingredient/dark-chocolate) | 200 g | 80.00% | Melt with the butter. |

### Method

1. Melt butter and chocolate gently to 45–50 C until smooth.
2. Cool slightly before incorporation.

### Phase Outputs

| Key | Phase Output | Description |
| --- | --- | --- |
| chocolate-mixture | Chocolate mixture | Smooth melted chocolate and butter. |

## PHASE B — MAKE EMULSION

### Ingredient Uses

| Key | Ingredient | Quantity | Scaling | Use |
| --- | --- | --- | --- | --- |
| muscovado | [Muscovado sugar](ref:ingredient/muscovado-sugar) | 300 g | 120.00% | Whisk with eggs. |
| egg | [Egg](ref:ingredient/egg) | 200 g | 80.00% | Whisk until glossy. |

### Technique Applications

| Technique | Controls | Purpose |
| --- | --- | --- |
| [Emulsification](ref:technique/emulsification) | Whisk until glossy, then fold in cooled chocolate. | Form a stable batter. |

### Method

1. Whisk sugar and eggs until glossy and slightly thickened.
2. Fold in the chocolate mixture.

### Phase Outputs Used

| Phase Output | Use |
| --- | --- |
| Chocolate mixture | Fold `chocolate-mixture` into the egg mixture. |

### Phase Outputs

| Key | Phase Output | Description |
| --- | --- | --- |
| brownie-batter | Brownie batter | Stable chocolate batter. |

## PHASE C — ADD DRY INGREDIENTS

### Ingredient Uses

| Key | Ingredient | Quantity | Scaling | Use |
| --- | --- | --- | --- | --- |
| flour | [All-purpose flour](ref:ingredient/all-purpose-flour) | 100 g | 40.00% | Sift before folding. |
| cocoa | [Cocoa powder](ref:ingredient/cocoa-powder) | 50 g | 20.00% | Sift before folding. |
| salt | [Salt](ref:ingredient/salt) | 2 g | 0.80% | Season the batter. |
| vanilla | [Vanilla extract](ref:ingredient/vanilla-extract) | 5 g | 2.00% | Flavour the batter. |
| walnuts | [Walnuts](ref:ingredient/walnuts) | 150 g | 60.00% | Optional addition. |

### Technique Applications

| Technique | Controls | Purpose |
| --- | --- | --- |
| [Folding](ref:technique/folding) | Fold gently; avoid overmixing. | Incorporate dry ingredients while limiting gluten. |

### Principles

- [Gluten limitation](ref:principle/gluten-limitation) — Gentle mixing preserves a fudgy crumb.

### Method

1. Sift flour, cocoa, and salt, then fold them into the batter with vanilla and optional walnuts.

### Phase Outputs Used

| Phase Output | Use |
| --- | --- |
| Brownie batter | Fold the dry ingredients into `brownie-batter`. |

### Phase Outputs

| Key | Phase Output | Description |
| --- | --- | --- |
| finished-batter | Finished brownie batter | Batter ready for the tin. |

## PHASE D — BAKE AND SET

### Principles

- [Protein coagulation](ref:principle/protein-coagulation) — Heat sets egg proteins for structure.
- [Sugar film formation](ref:principle/sugar-film-formation) — Dissolved sugar forms the crackled surface.
- [Starch gelatinisation](ref:principle/starch-gelatinisation) — Flour starch helps set the cooled matrix.

### Method

1. Bake at 170 C for 22–30 min until the centre is 88–92 C and wobbles slightly.
2. Cool for at least 2 h, then slice with a warm clean knife.

### Phase Outputs Used

| Phase Output | Use |
| --- | --- |
| Finished brownie batter | Transfer `finished-batter` to a lined 20 × 20 × 4 cm tin. |

## FAILURE MODES

| Symptom | Likely cause | Corrective action |
| --- | --- | --- |
| Cakey dry crumb | Brownie was overbaked or eggs overwhipped. | Pull at 88–92 C with visible wobble. |
| No crackled surface | Sugar was not dissolved into the eggs. | Whisk until glossy before adding chocolate. |
| Greasy texture | Chocolate mixture was too hot. | Cool it to about 45 C before folding. |
