---
title: "Maple-Bourbon Butter Pecan Ice Cream"
date: 2026-10-02
identity: recipe/maple-bourbon-butter-pecan-ice-cream
version: 1
yield: "approximately 900 ml finished ice cream"
scale_basis:
  ingredient: ingredient/whole-milk
  quantity_g: 300
tags: [dish-dessert]
---

Maple custard ice cream folded with buttery toasted pecans and a restrained bourbon finish

## PHASE A — BUTTER PECANS

### Ingredient Uses

| Key | Ingredient | Quantity | Scaling | Use |
| --- | --- | --- | --- | --- |
| pecan-halves | [Pecan halves](ref:ingredient/pecans) | 160 g | 53.33% | Pecan halves. |
| unsalted-butter | [Unsalted butter](ref:ingredient/butter) | 35 g | 11.67% | Unsalted butter. |
| maple-syrup | [Maple syrup](ref:ingredient/maple-syrup) | 50 g | 16.67% | Maple syrup. |
| bourbon | [Bourbon](ref:ingredient/bourbon) | 30 g | 10.00% | Bourbon. |
| fine-salt | [Fine salt](ref:ingredient/salt) | 2 g | 0.67% | Fine salt. |

### Method

1. Toast pecans at 160 C for 8 min–10 min. Cool and chop into 8 mm–12 mm pieces.
2. Melt butter over medium heat. Add maple syrup and cook for 1 min.
3. Remove from heat, add bourbon and salt, then return to low heat for 2 min.
4. Fold in pecans. Spread on a lined tray and cool completely; freeze for 30 min before churning the ice cream.

### Phase Outputs

| Key | Phase Output | Description |
| --- | --- | --- |
| cold-butter-pecans | Cold butter pecans | Prepared intermediate for a later Phase. Fold in 180 g during the final 30 s; retain any remainder. |

## PHASE B — ICE CREAM BASE

### Ingredient Uses

| Key | Ingredient | Quantity | Scaling | Use |
| --- | --- | --- | --- | --- |
| whole-milk | [Whole milk](ref:ingredient/whole-milk) | 300 g | 100.00% | Whole milk. |
| cream-approximately-35-fat | [Cream, approximately 35% fat](ref:ingredient/heavy-cream) | 180 g | 60.00% | Cream, approximately 35% fat. |
| sucrose | [Sucrose](ref:ingredient/sugar) | 70 g | 23.33% | Sucrose. |
| maple-syrup | [Maple syrup](ref:ingredient/maple-syrup) | 70 g | 23.33% | Maple syrup. |
| dextrose | [Dextrose](ref:ingredient/dextrose) | 20 g | 6.67% | Dextrose. |
| skim-milk-powder | [Skim milk powder](ref:ingredient/skim-milk-powder) | 30 g | 10.00% | Skim milk powder. |
| egg-yolk | [Egg yolk](ref:ingredient/egg-yolk) | 45 g | 15.00% | Egg yolk. |
| ice-cream-stabiliser | [Ice cream stabiliser](ref:ingredient/ice-cream-stabiliser) | 1.5 g | 0.50% | Ice cream stabiliser. |
| fine-salt | [Fine salt](ref:ingredient/salt) | 1 g | 0.33% | Fine salt. |

### Method

1. Whisk sucrose, dextrose, skim milk powder, stabiliser, and salt together.
2. Combine milk, cream, and maple syrup. Blend in the dry mixture and heat to 70 C.
3. Temper egg yolk with the warm mixture, recombine, and heat while stirring to 82 C–84 C for 30 s.
4. Blend for 30 s and cool to below 4 C as quickly as possible.
5. Refrigerate for 6 h–12 h.

### Phase Outputs

| Key | Phase Output | Description |
| --- | --- | --- |
| aged-base | Aged base | Prepared intermediate for a later Phase. Churn all. |

## PHASE C — CHURN AND PACK

### Technique Applications

| Technique | Controls | Purpose |
| --- | --- | --- |
| [Ice cream churning](ref:technique/ice-cream-churning) | Draw approximately -6 C; inclusions in final 30 s | Distribute cold pecans in churned base. |

### Method

1. Churn to approximately -6 C.
2. Fold in 180 g cold maple-bourbon butter pecans during the final 30 s.
3. Pack and harden at -18 C for at least 4 h.
4. Retain any prepared pecans beyond the selected 180 g portion.

Too much residual alcohol softens ice cream. Cook the bourbon briefly and do not increase it without rebalancing the base.

Recorded alternatives (no separate variation-specific testing observations were supplied):

- **Classic butter pecan:** Omit bourbon and replace it with 20 g maple syrup.
- **Stronger maple:** Add 2 g maple extract to the cold aged base.

### Phase Outputs Used

| Phase Output | Use |
| --- | --- |
| Cold butter pecans | Use `cold-butter-pecans`. Fold in 180 g during the final 30 s; retain any remainder. |
| Aged base | Use `aged-base`. Churn all. |

## FAILURE MODES

| Symptom | Likely cause | Corrective action |
| --- | --- | --- |
| Soft set | too much residual alcohol | preserve recorded bourbon amount and cooking step |
| Soft pecans | warm addition | cool and freeze before folding |
