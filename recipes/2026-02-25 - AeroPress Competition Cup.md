---
title: "AeroPress Competition Cup"
date: 2026-02-25
identity: recipe/aeropress-competition-cup
version: 1
yield: "1 cup (200–220 g measured final beverage)"
scale_basis:
  ingredient: ingredient/coffee-beans
  quantity_g: 18
tags: ["dish-breakfast", "coffee", "aeropress", "high-clarity"]
---

Modern high-clarity profile: fruit-forward acidity, low sludge, precise dilution. Use brew water at 90–94 C and a moderate-fine grind; measure the actual pressed concentrate before bypass dilution.

## PHASE A — BREW CONCENTRATE (INVERTED)

### Ingredient Uses

| Key | Ingredient | Quantity | Scaling | Use |
| --- | --- | --- | --- | --- |
| coffee-beans | [Coffee](ref:ingredient/coffee-beans) | 18 g | 100.00% | Coffee. |
| water | [Water (brew)](ref:ingredient/water) | 105 g | 583.33% | 105 g baseline; the source permits 90–120 g brew water at 90–94 C. |

### Technique Applications

| Technique | Controls | Purpose |
| --- | --- | --- |
| [Immersion brewing](ref:technique/immersion-brewing) | 18 g coffee; 105 g baseline water at 90–94 C; 60–90 s total contact | Brew the concentrate in the inverted setup. |
| [Controlled agitation](ref:technique/controlled-agitation) | Gentle stir for 5–10 s | Wet grounds without excessive stirring. |

### Principles

- [Coffee extraction](ref:principle/coffee-extraction) — Ratio, grind, temperature, agitation, and contact time set this concentrated brew profile.
- [Agitation and fines](ref:principle/agitation-and-fines) — Gentle stirring follows the source control for fines and mouthfeel.

### Method

1. Assemble AeroPress in inverted position.
2. Add coffee.
3. Start the timer and pour 90–120 g water at 90–94 C (105 g baseline).
4. Stir gently for 5–10 s.
5. Steep to a total contact time of 60–90 s.

### Phase Outputs

| Key | Phase Output | Description |
| --- | --- | --- |
| coffee-slurry | Brewed coffee slurry | Coffee grounds and liquid before pressing. |

Short contact time and a moderate-fine grind are the source controls for a clean concentrate. Controlled agitation limits fines suspension in the intended profile.

## PHASE B — PRESS AND BYPASS

### Ingredient Uses

| Key | Ingredient | Quantity | Scaling | Use |
| --- | --- | --- | --- | --- |
| water | [Water (bypass)](ref:ingredient/water) | As needed | — | Add hot bypass water to reach a measured final beverage mass of 200–220 g; do not assume complete brew-water recovery. |

### Technique Applications

| Technique | Controls | Purpose |
| --- | --- | --- |
| [Gentle pressing](ref:technique/gentle-pressing) | 20–30 s; steady pressure | Press the brew gently. |
| [Bypass dilution](ref:technique/bypass-dilution) | Measured final beverage mass 200–220 g | Set final strength with hot water. |

### Principles

- [Dilution and strength](ref:principle/dilution-and-strength) — Bypass water changes concentration; it does not remove fines.

### Method

1. Flip onto cup and press slowly for 20–30 s.
2. Weigh the actual pressed concentrate and add hot bypass water until the total beverage mass reaches 200–220 g.
3. Swirl once and serve immediately.

### Phase Outputs Used

| Phase Output | Use |
| --- | --- |
| Brewed coffee slurry | Use all of `coffee-slurry` from PHASE A as directed above. |

Bypass dilution sets final strength while preserving the source fruit-forward profile. Added water changes concentration rather than filtering suspended fines.

## FAILURE MODES

| Symptom | Likely cause | Corrective action |
| --- | --- | --- |
| Flat, dull cup with low acidity. | Water temperature too low, grind too coarse, or insufficient concentrate strength. | Raise brew water toward 94 C and tighten grind slightly. |
| Harsh bitterness or drying finish. | Excessive agitation, long steep, or overly fine grind. | Reduce stir time to 5 s, keep total steep under 90 s, and coarsen grind slightly. |
| Muddy mouthfeel. | Pressed too fast, forcing fines through. | Extend plunge to 20–30 s with steady, gentle pressure. |
