---
title: "Vanilla Bean Ice Cream"
date: 2026-10-02
identity: recipe/vanilla-bean-ice-cream
version: 1
yield: "approximately 750 ml finished ice cream"
scale_basis:
  ingredient: ingredient/whole-milk
  quantity_g: 330
tags: [dish-dessert]
---

The project's smoother vanilla base, balanced for a dense texture and clean vanilla flavour

## PHASE A — INFUSE

### Ingredient Uses

| Key | Ingredient | Quantity | Scaling | Use |
| --- | --- | --- | --- | --- |
| whole-milk | [Whole milk](ref:ingredient/whole-milk) | 330 g | 100.00% | Whole milk. |
| vanilla-bean | [Vanilla bean](ref:ingredient/vanilla-bean) | 5 g | 1.52% | Vanilla bean. |

### Method

1. Split the vanilla bean and scrape the seeds into the milk. Add the pod.
2. Heat milk and vanilla to 70 C. Cover and infuse for 30 min.

### Phase Outputs

| Key | Phase Output | Description |
| --- | --- | --- |
| vanilla-infused-milk | Vanilla infused milk | Prepared intermediate for a later Phase. Use all, including the pod until removal in the next Phase. |

## PHASE B — MIX AND PASTEURISE

### Ingredient Uses

| Key | Ingredient | Quantity | Scaling | Use |
| --- | --- | --- | --- | --- |
| cream-approximately-35-fat | [Cream, approximately 35% fat](ref:ingredient/heavy-cream) | 200 g | 60.61% | Cream, approximately 35% fat. |
| sucrose | [Sucrose](ref:ingredient/sugar) | 85 g | 25.76% | Sucrose. |
| dextrose | [Dextrose](ref:ingredient/dextrose) | 25 g | 7.58% | Dextrose. |
| skim-milk-powder | [Skim milk powder](ref:ingredient/skim-milk-powder) | 25 g | 7.58% | Skim milk powder. |
| egg-yolk | [Egg yolk](ref:ingredient/egg-yolk) | 50 g | 15.15% | Egg yolk. |
| ice-cream-stabiliser | [Ice cream stabiliser](ref:ingredient/ice-cream-stabiliser) | 1.5 g | 0.45% | Ice cream stabiliser. |
| fine-salt | [Fine salt](ref:ingredient/salt) | 1 g | 0.30% | Fine salt. |

### Method

1. Whisk sucrose, dextrose, skim milk powder, stabiliser, and salt together.
2. Add cream to the infused milk. Blend in the dry mixture.
3. Whisk egg yolk in a separate bowl. Temper with the warm dairy mixture, then recombine.
4. Heat while stirring to 82 C–84 C and hold for 30 s. Do not boil.

### Phase Outputs Used

| Phase Output | Use |
| --- | --- |
| Vanilla infused milk | Use `vanilla-infused-milk`. Use all, including the pod until removal in the next Phase. |

### Phase Outputs

| Key | Phase Output | Description |
| --- | --- | --- |
| custard-base | Custard base | Prepared intermediate for a later Phase. Remove the pod, then cool, age and churn all. |

## PHASE C — AGE AND CHURN

### Technique Applications

| Technique | Controls | Purpose |
| --- | --- | --- |
| [Ice cream churning](ref:technique/ice-cream-churning) | Machine instructions; draw approximately -6 C | Churn the aged custard. |

### Method

1. Remove the vanilla pod. Blend for 30 s, then cool the base to below 4 C as quickly as possible.
2. Refrigerate for 6 h–12 h.
3. Churn according to the machine's instructions until the draw temperature is approximately -6 C.
4. Pack into a chilled container and harden at -18 C for at least 4 h.

Mix the stabiliser thoroughly with the sugars before adding it to prevent clumping.

Recorded alternatives (no separate variation-specific testing observations were supplied):

- **Without egg:** Omit yolk, increase milk by 35 g and skim milk powder by 15 g.
- **Vanilla paste:** Replace the bean with 8 g high-quality vanilla paste.

### Phase Outputs Used

| Phase Output | Use |
| --- | --- |
| Custard base | Use `custard-base`. Remove the pod, then cool, age and churn all. |

## FAILURE MODES

| Symptom | Likely cause | Corrective action |
| --- | --- | --- |
| Stabiliser clumps | poor powder dispersion | premix with sugars |
| Curdled base | overheating | stir and avoid boiling |
