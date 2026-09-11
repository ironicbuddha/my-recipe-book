---
title: ""
date: YYYY-MM-DD
identity: recipe/example-service-dish
version: 1
yield: "2 servings"
scale_basis:
  ingredient: ingredient/example-primary-ingredient
  quantity_g: 500
tags: [dish-main-course]
---

An optional unheaded overview can explain the service plan.

## PHASE A — PREPARE

**Timing:** Start 45 min before service.

### Ingredient Uses

| Key | Ingredient | Quantity | Scaling | Use |
| --- | --- | --- | --- | --- |
| primary | [Example primary ingredient](ref:ingredient/example-primary-ingredient) | 500 g | 100.00% | Portion for cooking. |

### Method

1. Portion the ingredient.

### Phase Outputs

| Key | Phase Output | Description |
| --- | --- | --- |
| portions | Portioned ingredient | Prepared portions for the cook phase. |

## PHASE B — COOK

**Timing:** Start 20 min before service.
**May overlap:** PHASE C — SET TABLE.

### Phase Outputs Used

| Phase Output | Use |
| --- | --- |
| Portioned ingredient | Cook all of `portions`. |

### Method

1. Cook the portions and hold briefly.

## PHASE C — SET TABLE

### Method

1. Set warm plates while Phase B cooks.

## FAILURE MODES

| Symptom | Likely cause | Corrective action |
| --- | --- | --- |
| Late service | The overlap was not started on time. | Start Phase C with Phase B. |
