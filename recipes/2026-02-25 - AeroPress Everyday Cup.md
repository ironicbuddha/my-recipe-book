---
title: "AeroPress Everyday Cup"
date: 2026-02-25
identity: recipe/aeropress-everyday-cup
version: 1
yield: "1 cup brewed with 230 g water; finished mass depends on retained liquid"
scale_basis:
  ingredient: ingredient/coffee-beans
  quantity_g: 15
tags: ["dish-breakfast", "coffee", "aeropress", "balanced"]
---

Simple and sweet daily profile: balanced body, low bitterness, easy repeatability. Use a moderate grind and 230 g water at 92 C; this is input water, not a claimed measured beverage recovery.

## PHASE A — IMMERSION BREW (STANDARD)

### Ingredient Uses

| Key | Ingredient | Quantity | Scaling | Use |
| --- | --- | --- | --- | --- |
| coffee-beans | [Coffee](ref:ingredient/coffee-beans) | 15 g | 100.00% | Coffee. |
| water | [Water](ref:ingredient/water) | 230 g | 1533.33% | Water. |

### Technique Applications

| Technique | Controls | Purpose |
| --- | --- | --- |
| [Immersion brewing](ref:technique/immersion-brewing) | 15 g coffee; 230 g water at 92 C; 2 min steep | Brew in the standard setup. |
| [Controlled agitation](ref:technique/controlled-agitation) | Brief stir to wet all grounds | Distribute water without excessive fines movement. |

### Principles

- [Coffee extraction](ref:principle/coffee-extraction) — Full-volume immersion, moderate grind, and the authored steep give the intended daily profile.

### Method

1. Assemble AeroPress in standard position over cup.
2. Add coffee.
3. Pour all 230 g water at 92 C.
4. Stir briefly to wet all grounds.
5. Steep for 2 min.

### Phase Outputs

| Key | Phase Output | Description |
| --- | --- | --- |
| coffee-slurry | Brewed coffee slurry | Full-volume immersion brew before pressing. |

Full-volume immersion with a moderate grind supports the intended even extraction and sweetness; keep the wetting stir short.

## PHASE B — PRESS AND SERVE

### Technique Applications

| Technique | Controls | Purpose |
| --- | --- | --- |
| [Gentle pressing](ref:technique/gentle-pressing) | 30 s; stop when resistance spikes | Press gently to the authored endpoint. |

### Method

1. Press gently over 30 s.
2. Stop when resistance spikes to avoid over-extracting fines.
3. Serve immediately.

### Phase Outputs Used

| Phase Output | Use |
| --- | --- |
| Brewed coffee slurry | Use all of `coffee-slurry` from PHASE A as directed above. |

The gentle 30 s press follows the source control for reducing channeling and bitterness near the end of extraction.

## FAILURE MODES

| Symptom | Likely cause | Corrective action |
| --- | --- | --- |
| Sour, thin cup. | Grind too coarse, steep too short, or water below target temperature. | Grind finer, keep the full 2 min steep, and brew at 92 C. |
| Bitter, hollow finish. | Grind too fine or pressing through the final high-resistance stage. | Coarsen grind slightly and stop pressing when resistance sharply increases. |
| Inconsistent strength across brews. | Unstable pour mass or variable steep timing. | Use a scale and timer for repeatable dose, water mass, and contact time. |
