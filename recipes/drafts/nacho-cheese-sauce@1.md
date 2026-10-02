---
title: "Nacho Cheese Sauce"
date: 2026-10-02
identity: recipe/nacho-cheese-sauce
version: 1
yield: "approximately 650 g sauce"
scale_basis:
  ingredient: ingredient/cheddar
  quantity_g: 400
tags: [dish-sauce]
---

Smooth, pourable cheddar sauce stabilised with sodium citrate for clean reheating

## PHASE A — BASE

### Ingredient Uses

| Key | Ingredient | Quantity | Scaling | Use |
| --- | --- | --- | --- | --- |
| whole-milk | [Whole milk](ref:ingredient/whole-milk) | 250 g | 62.50% | Whole milk. |
| sodium-citrate | [Sodium citrate](ref:ingredient/sodium-citrate) | 10 g | 2.50% | Sodium citrate. |

### Method

1. Combine milk and sodium citrate in a saucepan.
2. Heat to 75 C–80 C, whisking until the sodium citrate dissolves.

### Phase Outputs

| Key | Phase Output | Description |
| --- | --- | --- |
| heated-milk-base | Heated milk base | Prepared intermediate for a later Phase. Use all. |

## PHASE B — EMULSION

### Ingredient Uses

| Key | Ingredient | Quantity | Scaling | Use |
| --- | --- | --- | --- | --- |
| cheddar-finely-grated | [Cheddar, finely grated](ref:ingredient/cheddar) | 400 g | 100.00% | Cheddar, finely grated. |
| pickled-jalape-o-brine | [Pickled jalapeño brine](ref:ingredient/pickled-jalapeno-brine) | 25 g | 6.25% | Pickled jalapeño brine. |
| smoked-paprika | [Smoked paprika](ref:ingredient/smoked-paprika) | 2 g | 0.50% | Smoked paprika. |
| garlic-powder | [Garlic powder](ref:ingredient/garlic-powder) | 1 g | 0.25% | Garlic powder. |
| cayenne-pepper | [Cayenne pepper](ref:ingredient/cayenne-pepper) | 0.5 g | 0.13% | Cayenne pepper. |

### Method

1. Add cheddar in four additions, blending or whisking each addition smooth before adding the next.
2. Blend in jalapeño brine, paprika, garlic powder, and cayenne.
3. Hold at 60 C for service, or cool rapidly and refrigerate.

### Phase Outputs Used

| Phase Output | Use |
| --- | --- |
| Heated milk base | Use `heated-milk-base`. Use all. |

### Phase Outputs

| Key | Phase Output | Description |
| --- | --- | --- |
| cheese-emulsion | Cheese emulsion | Prepared intermediate for a later Phase. Reheat the prepared sauce gently if cooled; otherwise serve at the stated holding temperature. |

## PHASE C — REHEAT

### Method

1. Reheat gently to 65 C while stirring. Add 10 g–30 g milk if the sauce is too thick.

Do not boil after adding cheese or the emulsion may become grainy.

Recorded alternatives (no separate variation-specific testing observations were supplied):

- **No sodium citrate:** Replace it with a roux made from 25 g butter and 25 g flour; the sauce will be less fluid when reheated.
- **Hot:** Blend in 30 g minced pickled jalapeño.

### Phase Outputs Used

| Phase Output | Use |
| --- | --- |
| Cheese emulsion | Use `cheese-emulsion`. Reheat the prepared sauce gently if cooled; otherwise serve at the stated holding temperature. |

## FAILURE MODES

| Symptom | Likely cause | Corrective action |
| --- | --- | --- |
| Grainy sauce | boiling after cheese addition | reheat gently |
| Thick sauce | insufficient liquid | add recorded adjustment milk gradually |
