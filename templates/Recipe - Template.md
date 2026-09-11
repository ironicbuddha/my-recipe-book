---
title: ""
date: YYYY-MM-DD
identity: recipe/example-dish
version: 1
yield: "2 servings"
scale_basis:
  ingredient: ingredient/example-primary-ingredient
  quantity_g: 500
tags: [dish-main-course]
---

One unheaded overview paragraph may describe the dish and supplies the excerpt.

## PHASE A — PREPARE BASE

### Ingredient Uses

| Key | Ingredient | Quantity | Scaling | Use |
| --- | --- | --- | --- | --- |
| primary | [Example primary ingredient](ref:ingredient/example-primary-ingredient) | 500 g | 100.00% | Cut into 25 mm pieces. |

### Technique Applications

| Technique | Controls | Purpose |
| --- | --- | --- |
| [Example technique](ref:technique/example-technique) | 180 C; 20 min | Develop colour without drying the centre. |

### Principles

- [Example principle](ref:principle/example-principle) — Explain the causal effect in this Phase.

### Method

1. Prepare the declared ingredient.
2. Apply the stated technique until the control is reached.

### Phase Outputs

| Key | Phase Output | Description |
| --- | --- | --- |
| prepared-base | Prepared base | The seasoned cooked base for finishing. |

## PHASE B — FINISH AND SERVE

### Phase Outputs Used

| Phase Output | Use |
| --- | --- |
| Prepared base | Plate all of `prepared-base`. |

### Method

1. Plate the prepared base and serve.

## FAILURE MODES

| Symptom | Likely cause | Corrective action |
| --- | --- | --- |
| Dry centre | Heat was too high or cooking went too long. | Reduce the control temperature or stop sooner. |
