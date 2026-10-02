---
title: "Chicken Nachos"
date: 2026-10-02
identity: recipe/chicken-nachos
version: 1
yield: "4 generous portions; approximately 1.5 kg finished nachos"
scale_basis:
  ingredient: ingredient/chicken-thigh
  quantity_g: 600
tags: [dish-main-course]
---

Layered tortilla chips, spiced chicken, black beans, cheese sauce, and fresh garnishes

## PHASE A — CHICKEN

### Ingredient Uses

| Key | Ingredient | Quantity | Scaling | Use |
| --- | --- | --- | --- | --- |
| boneless-skinless-chicken-thigh | [Boneless skinless chicken thigh](ref:ingredient/chicken-thigh) | 600 g | 100.00% | Boneless skinless chicken thigh. |
| neutral-oil | [Neutral oil](ref:ingredient/neutral-oil) | 25 g | 4.17% | Neutral oil. |
| lime-juice | [Lime juice](ref:ingredient/lime-juice) | 25 g | 4.17% | Lime juice. |
| ground-cumin | [Ground cumin](ref:ingredient/cumin) | 4 g | 0.67% | Ground cumin. |
| smoked-paprika | [Smoked paprika](ref:ingredient/smoked-paprika) | 4 g | 0.67% | Smoked paprika. |
| garlic-powder | [Garlic powder](ref:ingredient/garlic-powder) | 3 g | 0.50% | Garlic powder. |
| fine-salt | [Fine salt](ref:ingredient/salt) | 9 g | 1.50% | Fine salt. |
| black-pepper | [Black pepper](ref:ingredient/black-pepper) | 2 g | 0.33% | Black pepper. |

### Method

1. Combine chicken with oil, lime juice, spices, salt, and pepper. Rest for 20 min.
2. Sear over medium-high heat for 5 min–6 min per side until the core reaches 74 C.
3. Rest for 5 min, then chop into 15 mm–20 mm pieces.

### Phase Outputs

| Key | Phase Output | Description |
| --- | --- | --- |
| cooked-spiced-chicken | Cooked spiced chicken | Prepared intermediate for a later Phase. Use the stated 500 g chopped chicken portion; retain any remainder. |

## PHASE B — LAYER AND BAKE

### Ingredient Uses

| Key | Ingredient | Quantity | Scaling | Use |
| --- | --- | --- | --- | --- |
| tortilla-chips | [Tortilla chips](ref:ingredient/tortilla-chips) | 300 g | 50.00% | Tortilla chips. |
| cooked-black-beans-drained | [Cooked black beans, drained](ref:ingredient/black-beans) | 250 g | 41.67% | Cooked black beans, drained. |
| nacho-cheese-sauce | [Nacho cheese sauce](ref:ingredient/nacho-cheese-sauce) | 400 g | 66.67% | Nacho cheese sauce. |
| cheddar-or-monterey-jack-grated | [Cheddar or Monterey Jack, grated](ref:ingredient/cheddar) | 150 g | 25.00% | Cheddar or Monterey Jack, grated. |

### Technique Applications

| Technique | Controls | Purpose |
| --- | --- | --- |
| [Layered assembly](ref:technique/layered-assembly) | Two layers; 220 C; 6 min–8 min | Distribute toppings before finishing. |

### Method

1. Prepare [Nacho Cheese Sauce](ref:recipe/nacho-cheese-sauce) separately and measure the declared 400 g portion; retain any remainder.
2. Heat oven to 220 C.
3. Spread half the chips in a wide tray. Layer with half the chicken, beans, cheese sauce, and grated cheese.
4. Repeat with remaining chips, chicken, beans, cheese sauce, and grated cheese.
5. Bake for 6 min–8 min until hot and bubbling but before the chips soften.
6. Retain the recorded Cheddar or Monterey Jack, grated option; [the alternative](ref:ingredient/monterey-jack) uses the same declared quantity, in place of the first material.

### Phase Outputs Used

| Phase Output | Use |
| --- | --- |
| Cooked spiced chicken | Use `cooked-spiced-chicken`. Use the stated 500 g chopped chicken portion; retain any remainder. |

### Phase Outputs

| Key | Phase Output | Description |
| --- | --- | --- |
| baked-nachos | Baked nachos | Prepared intermediate for a later Phase. Finish the entire tray. |

## PHASE C — FINISH

### Ingredient Uses

| Key | Ingredient | Quantity | Scaling | Use |
| --- | --- | --- | --- | --- |
| black-bean-corn-mint-and-peppadew-salsa | [Black bean, corn, mint, and Peppadew salsa](ref:ingredient/black-bean-corn-mint-peppadew-salsa) | 250 g | 41.67% | Black bean, corn, mint, and Peppadew salsa. |
| cr-me-fra-che-lime-crema | [Crème fraîche lime crema](ref:ingredient/creme-fraiche-lime-crema) | 150 g | 25.00% | Crème fraîche lime crema. |
| pickled-jalape-o-sliced | [Pickled jalapeño, sliced](ref:ingredient/pickled-jalapeno) | 50 g | 8.33% | Pickled jalapeño, sliced. |
| coriander-leaves | [Coriander leaves](ref:ingredient/fresh-coriander) | 20 g | 3.33% | Coriander leaves. |

### Method

1. Prepare [Black Bean, Corn, Mint & Peppadew Salsa](ref:recipe/black-bean-corn-mint-peppadew-salsa) and [Crème Fraîche Lime Crema](ref:recipe/creme-fraiche-lime-crema) separately; use 250 g salsa and 150 g crema, retaining any remainder.
2. Spoon salsa and crema over the nachos.
3. Finish with jalapeño and coriander; serve immediately.

Reconstructed assembly quantities; keep wet garnishes concentrated in small spoonfuls to preserve crispness.
Two thinner layers distribute toppings better than one overloaded layer.

Recorded alternatives (no separate variation-specific testing observations were supplied):

- **Half batch:** Scale to 50% and bake on a 300 mm tray.
- **Sharper finish:** Add 60 g finely diced pickled red onion after baking.

### Phase Outputs Used

| Phase Output | Use |
| --- | --- |
| Baked nachos | Use `baked-nachos`. Finish the entire tray. |

## FAILURE MODES

| Symptom | Likely cause | Corrective action |
| --- | --- | --- |
| Soggy chips | too much wet garnish | add salsa and crema just before service |
| Uneven toppings | one overloaded layer | distribute in two thin layers |
