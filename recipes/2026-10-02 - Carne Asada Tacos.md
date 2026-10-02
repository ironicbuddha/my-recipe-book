---
title: "Carne Asada Tacos"
date: 2026-10-02
identity: recipe/carne-asada-tacos
version: 1
yield: "12 tacos; 4 portions"
scale_basis:
  ingredient: ingredient/beef
  quantity_g: 800
tags: [dish-main-course]
---

Charred citrus-garlic beef served in warm corn tortillas with onion, coriander, and lime

## PHASE A — MARINATE

### Ingredient Uses

| Key | Ingredient | Quantity | Scaling | Use |
| --- | --- | --- | --- | --- |
| beef-skirt-or-flank-steak | [Beef skirt or flank steak](ref:ingredient/beef) | 800 g | 100.00% | Beef skirt or flank steak. |
| orange-juice | [Orange juice](ref:ingredient/orange-juice) | 100 g | 12.50% | Orange juice. |
| lime-juice | [Lime juice](ref:ingredient/lime-juice) | 50 g | 6.25% | Lime juice. |
| neutral-oil | [Neutral oil](ref:ingredient/neutral-oil) | 40 g | 5.00% | Neutral oil. |
| garlic-finely-grated | [Garlic, finely grated](ref:ingredient/garlic) | 15 g | 1.88% | Garlic, finely grated. |
| ground-cumin | [Ground cumin](ref:ingredient/cumin) | 4 g | 0.50% | Ground cumin. |
| ground-coriander | [Ground coriander](ref:ingredient/coriander-seed) | 4 g | 0.50% | Ground coriander. |
| smoked-paprika | [Smoked paprika](ref:ingredient/smoked-paprika) | 4 g | 0.50% | Smoked paprika. |
| dried-oregano | [Dried oregano](ref:ingredient/oregano) | 2 g | 0.25% | Dried oregano. |
| fine-salt | [Fine salt](ref:ingredient/salt) | 12 g | 1.50% | Fine salt. |
| black-pepper | [Black pepper](ref:ingredient/black-pepper) | 2 g | 0.25% | Black pepper. |

### Technique Applications

| Technique | Controls | Purpose |
| --- | --- | --- |
| [Marination](ref:technique/marination) | Refrigerate 2 h–4 h | Coat beef with the citrus-garlic marinade. |

### Method

1. Combine orange juice, lime juice, oil, garlic, spices, salt, and pepper.
2. Coat beef and refrigerate for 2 h–4 h. Remove from refrigeration 30 min before cooking.

### Phase Outputs

| Key | Phase Output | Description |
| --- | --- | --- |
| marinated-beef | Marinated beef | Prepared intermediate for a later Phase. Drain excess marinade and grill all beef. |

## PHASE B — GRILL

### Technique Applications

| Technique | Controls | Purpose |
| --- | --- | --- |
| [Grilling](ref:technique/grilling) | 3 min–5 min per side; core 54 C–57 C | Char beef, then rest and slice across the grain. |

### Method

1. Heat a grill or cast-iron pan until very hot.
2. Drain excess marinade from beef. Grill for 3 min–5 min per side, depending on thickness, to a core temperature of 54 C–57 C.
3. Rest for 8 min. Slice thinly across the grain, then cut into bite-size pieces.

### Phase Outputs Used

| Phase Output | Use |
| --- | --- |
| Marinated beef | Use `marinated-beef`. Drain excess marinade and grill all beef. |

### Phase Outputs

| Key | Phase Output | Description |
| --- | --- | --- |
| rested-carne-asada | Rested carne asada | Prepared intermediate for a later Phase. Divide approximately 650 g among the tortillas; this is a source finished-weight estimate. |

## PHASE C — ASSEMBLY

### Ingredient Uses

| Key | Ingredient | Quantity | Scaling | Use |
| --- | --- | --- | --- | --- |
| corn-tortillas-approximately-25-g-each | [Corn tortillas, approximately 25 g each](ref:ingredient/corn-tortillas) | 300 g | 37.50% | Corn tortillas, approximately 25 g each. |
| white-onion-finely-diced | [White onion, finely diced](ref:ingredient/onion) | 120 g | 15.00% | White onion, finely diced. |
| coriander-leaves-chopped | [Coriander leaves, chopped](ref:ingredient/fresh-coriander) | 30 g | 3.75% | Coriander leaves, chopped. |
| lime-wedges | [Lime wedges](ref:ingredient/lime) | 160 g | 20.00% | Lime wedges. |
| salsa | [Salsa](ref:ingredient/salsa) | 200 g | 25.00% | Salsa. |

### Method

1. Warm tortillas on the hot grill for 20 s–30 s per side and hold in a cloth.
2. Divide beef among tortillas. Add onion, coriander, salsa, and lime.

Do not marinate longer than 8 h because the citrus can soften the surface excessively.
Slice across the grain for tenderness.

Recorded alternatives (no separate variation-specific testing observations were supplied):

- **Hotter:** Add 10 g minced chipotle in adobo to the marinade.
- **Plancha service:** Chop the rested beef and return it to a very hot plancha for 30 s to crisp the edges.

### Phase Outputs Used

| Phase Output | Use |
| --- | --- |
| Rested carne asada | Use `rested-carne-asada`. Divide approximately 650 g among the tortillas; this is a source finished-weight estimate. |

## FAILURE MODES

| Symptom | Likely cause | Corrective action |
| --- | --- | --- |
| Tough slices | cutting with grain | slice across grain |
| Soggy tacos | excessive wet toppings | drain meat and portion salsa |
