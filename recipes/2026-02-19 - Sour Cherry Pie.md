---
title: "Sour Cherry Pie"
date: 2026-02-19
identity: recipe/sour-cherry-pie
version: 2
yield: "1 × 23 cm pie"
scale_basis:
  ingredient: ingredient/sour-cherries
  quantity_g: 900
tags: [dish-dessert, cherry, pie]
---

A double-crust sour cherry pie with a laminated butter crust.

## PHASE A — MAKE CRUST

### Ingredient Uses

| Key | Ingredient | Quantity | Scaling | Use |
| --- | --- | --- | --- | --- |
| flour | [All-purpose flour](ref:ingredient/all-purpose-flour) | 375 g | 41.67% | Form the dough. |
| butter | [Butter](ref:ingredient/butter) | 250 g | 27.78% | Keep frozen for flakes. |
| shortening | [Vegetable shortening](ref:ingredient/vegetable-shortening) | 60 g | 6.67% | Optional fat for tenderness. |
| salt | [Salt](ref:ingredient/salt) | 5 g | 0.56% | Season the dough. |
| water | [Water](ref:ingredient/water) | 135 g | 15.00% | Bind the dough. |

### Technique Applications

| Technique | Controls | Purpose |
| --- | --- | --- |
| [Lamination](ref:technique/lamination) | Keep butter cold; rest dough 30–60 min. | Preserve separate fat layers. |

### Method

1. Whisk flour and salt, grate in butter, then add the water until the dough holds when pressed.
2. Divide, press into discs, wrap, and chill before rolling a bottom and top crust.

### Phase Outputs

| Key | Phase Output | Description |
| --- | --- | --- |
| pie-crust | Pie crust | Chilled double crust ready for filling. |

## PHASE B — FILL PIE

### Ingredient Uses

| Key | Ingredient | Quantity | Scaling | Use |
| --- | --- | --- | --- | --- |
| cherries | [Sour cherries](ref:ingredient/sour-cherries) | 900 g | 100.00% | Use frozen, pitted fruit. |
| sugar | [Sugar](ref:ingredient/sugar) | 150 g | 16.67% | Sweeten the filling. |
| cornstarch | [Cornstarch](ref:ingredient/cornstarch) | 45 g | 5.00% | Thicken juices. |
| lemon-juice | [Lemon juice](ref:ingredient/lemon-juice) | 15 g | 1.67% | Balance the filling. |
| butter | [Butter](ref:ingredient/butter) | 30 g | 3.33% | Dot over the filling. |
| almond-extract | [Almond extract](ref:ingredient/almond-extract) | 5 g | 0.56% | Perfume the fruit. |
| salt | [Salt](ref:ingredient/salt) | 3 g | 0.33% | Season the filling. |

### Principles

- [Acid balance](ref:principle/acid-balance) — Lemon juice sharpens the fruit flavour.
- [Starch gelatinisation](ref:principle/starch-gelatinisation) — Cornstarch thickens released fruit juices during baking.

### Method

1. Combine cherries, sugar, cornstarch, lemon juice, almond extract, and salt in the lined crust.
2. Dot with butter, cover with the top crust, and vent it.

### Phase Outputs Used

| Phase Output | Use |
| --- | --- |
| Pie crust | Line the tin with `pie-crust` and reserve the top crust. |

### Phase Outputs

| Key | Phase Output | Description |
| --- | --- | --- |
| filled-pie | Filled pie | Assembled pie ready to bake. |

## PHASE C — BAKE PIE

### Technique Applications

| Technique | Controls | Purpose |
| --- | --- | --- |
| [Staged baking](ref:technique/staged-baking) | 200 C for 20 min, then 180 C for 35–45 min. | Set the crust before finishing the fruit. |

### Method

1. Bake at 200 C for 20 min, then reduce to 180 C and bake until the filling bubbles and the crust is browned.
2. Cool fully before slicing.

### Phase Outputs Used

| Phase Output | Use |
| --- | --- |
| Filled pie | Bake `filled-pie` until the filling bubbles. |

## FAILURE MODES

| Symptom | Likely cause | Corrective action |
| --- | --- | --- |
| Runny filling | Pie was cut before the starch set. | Cool completely before slicing. |
| Tough crust | Dough was overworked or warm. | Mix minimally and keep the fat cold. |
