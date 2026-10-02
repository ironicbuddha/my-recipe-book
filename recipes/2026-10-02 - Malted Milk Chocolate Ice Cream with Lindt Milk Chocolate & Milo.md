---
title: "Malted Milk Chocolate Ice Cream with Lindt Milk Chocolate & Milo"
date: 2026-10-02
identity: recipe/malted-milk-chocolate-ice-cream-with-lindt-milk-chocolate-milo
version: 1
yield: "approximately 750 ml finished ice cream"
scale_basis:
  ingredient: ingredient/whole-milk
  quantity_g: 300
tags: [dish-dessert]
---

Milk-chocolate ice cream layered with malt from both malted milk powder and Milo

## PHASE A — DRY MIX

### Ingredient Uses

| Key | Ingredient | Quantity | Scaling | Use |
| --- | --- | --- | --- | --- |
| milo-powder | [Milo powder](ref:ingredient/milo) | 45 g | 15.00% | Milo powder. |
| malted-milk-powder | [Malted milk powder](ref:ingredient/malted-milk-powder) | 30 g | 10.00% | Malted milk powder. |
| sucrose | [Sucrose](ref:ingredient/sugar) | 50 g | 16.67% | Sucrose. |
| dextrose | [Dextrose](ref:ingredient/dextrose) | 20 g | 6.67% | Dextrose. |
| ice-cream-stabiliser | [Ice cream stabiliser](ref:ingredient/ice-cream-stabiliser) | 1.5 g | 0.50% | Ice cream stabiliser. |
| fine-salt | [Fine salt](ref:ingredient/salt) | 1.5 g | 0.50% | Fine salt. |

### Method

1. Whisk Milo, malted milk powder, sucrose, dextrose, stabiliser, and salt together.

### Phase Outputs

| Key | Phase Output | Description |
| --- | --- | --- |
| dry-mix | Dry mix | Prepared intermediate for a later Phase. Blend all into the dairy. |

## PHASE B — MIX AND PASTEURISE

### Ingredient Uses

| Key | Ingredient | Quantity | Scaling | Use |
| --- | --- | --- | --- | --- |
| whole-milk | [Whole milk](ref:ingredient/whole-milk) | 300 g | 100.00% | Whole milk. |
| cream-approximately-35-fat | [Cream, approximately 35% fat](ref:ingredient/heavy-cream) | 150 g | 50.00% | Cream, approximately 35% fat. |
| lindt-milk-chocolate-finely-chopped | [Lindt milk chocolate, finely chopped](ref:ingredient/milk-chocolate) | 120 g | 40.00% | Lindt milk chocolate, finely chopped. |

### Method

1. Combine milk and cream. Blend in the dry mixture.
2. Heat while stirring to 82 C and hold for 30 s.
3. Pour the hot mixture over the chopped milk chocolate. Rest for 1 min, then blend until glossy and homogeneous.

### Phase Outputs Used

| Phase Output | Use |
| --- | --- |
| Dry mix | Use `dry-mix`. Blend all into the dairy. |

### Phase Outputs

| Key | Phase Output | Description |
| --- | --- | --- |
| chocolate-base | Chocolate base | Prepared intermediate for a later Phase. Cool, age and churn the entire base. |

## PHASE C — AGE AND CHURN

### Technique Applications

| Technique | Controls | Purpose |
| --- | --- | --- |
| [Ice cream churning](ref:technique/ice-cream-churning) | Age 6 h–12 h; draw approximately -6 C | Churn the cold chocolate base. |

### Method

1. Cool to below 4 C as quickly as possible.
2. Refrigerate for 6 h–12 h.
3. Blend the cold base for 20 s, then churn to approximately -6 C.
4. Pack into a chilled container and harden at -18 C for at least 4 h.

This recipe was explicitly still in development; the quantities are a best-effort starting formulation, not a tested final protocol.
Milo and milk chocolate both add sugar. Do not increase either without rebalancing sweetness and freezing point.
Milk chocolate can make the base feel waxy if overused; test texture after a full 24 h hardening cycle.

Recorded alternatives (no separate variation-specific testing observations were supplied):

- **Chocolate-malt ripple:** Reserve 100 g base before churning, blend with 20 g Milo, cook to 85 C, cool, and layer sparingly after churning.
- **Crunch:** Fold in 80 g frozen chocolate-coated malted cereal during the final 30 s of churning.

### Phase Outputs Used

| Phase Output | Use |
| --- | --- |
| Chocolate base | Use `chocolate-base`. Cool, age and churn the entire base. |

## FAILURE MODES

| Symptom | Likely cause | Corrective action |
| --- | --- | --- |
| Powder clumps | poor dry mixing | mix powders thoroughly before blending |
| Grainy base | incompletely melted chocolate | blend warm mixture until homogeneous |
