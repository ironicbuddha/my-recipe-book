---
title: "Guanciale, Olive & Chili Pasta Sauce"
date: 2026-02-19
identity: recipe/guanciale-olive-chili-pasta-sauce
version: 1
yield: "2 portions"
scale_basis:
  ingredient: ingredient/guanciale
  quantity_g: 150
tags: [dish-sauce, pasta, italian, pork, olives, chili]
---

Rendered guanciale, olives, and tomato coat pasta in a glossy, lightly spicy sauce.

## PHASE A — RENDER GUANCIALE AND AROMATICS

### Ingredient Uses

| Key | Ingredient | Quantity | Scaling | Use |
| --- | --- | --- | --- | --- |
| guanciale | [Guanciale](ref:ingredient/guanciale) | 150 g | 100.00% | Cut into lardons and start in a cold pan. |
| garlic | [Garlic](ref:ingredient/garlic) | 8 g | 5.33% | Slice thinly. |
| chili | [Fresh red chili](ref:ingredient/fresh-red-chili) | 5 g | 3.33% | Slice. |
| pepper | [Black pepper](ref:ingredient/black-pepper) | 2 g | 1.33% | Season the aromatic fat. |

### Technique Applications

| Technique | Controls | Purpose |
| --- | --- | --- |
| [Fat rendering](ref:technique/fat-rendering) | Cold pan; medium heat; 6–8 min | Release pork fat without scorching the guanciale. |

### Principles

- [Fat as flavour carrier](ref:principle/fat-as-flavour-carrier) — The rendered pork fat carries the garlic and chili aromatics into the sauce.

### Method

1. Place the guanciale in a cold, wide pan. Bring to medium heat and render slowly for 6–8 min, until the fat releases and the meat is golden and lightly crisp.
2. Remove the guanciale with a slotted spoon and reserve it. Keep the rendered fat in the pan.
3. Gently sauté the sliced garlic, chili, and black pepper in the rendered fat until fragrant, without browning the garlic.

### Phase Outputs

| Key | Phase Output | Description |
| --- | --- | --- |
| rendered-guanciale | Rendered guanciale | Crisped meat reserved for the final toss. |
| aromatic-fat | Aromatic fat | Rendered pork fat carrying garlic, chili, and black pepper. |

## PHASE B — BUILD THE TOMATO SAUCE

### Ingredient Uses

| Key | Ingredient | Quantity | Scaling | Use |
| --- | --- | --- | --- | --- |
| olives | [Black olives](ref:ingredient/black-olives) | 80 g | 53.33% | Chop. |
| capers | [Capers](ref:ingredient/capers) | 15 g | 10.00% | Rinse. |
| tomatoes | [Canned whole tomatoes](ref:ingredient/canned-whole-tomatoes) | 400 g | 266.67% | Crush before adding. |

### Technique Applications

| Technique | Controls | Purpose |
| --- | --- | --- |
| [Reduction](ref:technique/reduction) | Steady simmer; 10–15 min | Concentrate the tomatoes until thick and glossy. |

### Principles

- [Salt balance](ref:principle/salt-balance) — Guanciale, olives, and capers contribute substantial salt; taste before adding any more.

### Method

1. Add the olives and capers to the aromatic fat and sauté for 1–2 min.
2. Add the crushed tomatoes, bring to a steady simmer, and reduce for 10–15 min until thick and glossy.
3. Taste before adjusting seasoning; the guanciale, olives, and capers may provide enough salt.

### Phase Outputs Used

| Phase Output | Use |
| --- | --- |
| Aromatic fat | Cook the olives and capers in `aromatic-fat` before adding tomato. |

### Phase Outputs

| Key | Phase Output | Description |
| --- | --- | --- |
| tomato-sauce | Tomato sauce | Reduced tomato, olive, and caper sauce in aromatic pork fat. |

## PHASE C — COOK PASTA AND EMULSIFY

### Ingredient Uses

| Key | Ingredient | Quantity | Scaling | Use |
| --- | --- | --- | --- | --- |
| pasta | [Dried pasta](ref:ingredient/dried-pasta) | 300 g | 200.00% | Use rigatoni or spaghetti; cook until al dente. |
| reserved-water | [Water](ref:ingredient/water) | 60 g | 40.00% | Reserve about 60 g of the starchy pasta cooking water for the sauce. |
| parsley | [Flat-leaf parsley](ref:ingredient/flat-leaf-parsley) | 10 g | 6.67% | Chop for finishing. |
| finishing-pepper | [Black pepper](ref:ingredient/black-pepper) | As needed | — | Finish to taste. |

### Technique Applications

| Technique | Controls | Purpose |
| --- | --- | --- |
| [Emulsification](ref:technique/emulsification) | About 60 g hot pasta water; vigorous tossing | Bring rendered fat, tomato, and starch-rich water into a cohesive glaze. |

### Principles

- [Starch-water emulsification](ref:principle/starch-water-emulsification) — Starchy cooking water and agitation bind the fat and tomato around the pasta.

### Method

1. Cook the pasta in heavily salted water until al dente and reserve about 60 g of its hot, starchy cooking water.
2. Transfer the pasta to the tomato sauce with the reserved water. Return the guanciale to the pan.
3. Toss vigorously until the fat, tomato, and starch form a cohesive glaze. Add small increments of hot pasta water if the sauce separates.
4. Finish with parsley and black pepper; serve immediately.

### Phase Outputs Used

| Phase Output | Use |
| --- | --- |
| Tomato sauce | Toss the cooked pasta through `tomato-sauce`. |
| Rendered guanciale | Return all of `rendered-guanciale` during the final toss. |

## FAILURE MODES

| Symptom | Likely cause | Corrective action |
| --- | --- | --- |
| Sauce feels greasy and separated | Too little pasta water or inadequate tossing | Add small increments of hot pasta water and toss vigorously. |
| Sauce tastes flat | Tomatoes were under-reduced | Simmer longer to concentrate their flavour. |
| Guanciale is tough or burnt | Rendering heat was too high | Start in a cold pan and render gently. |
