---
title: "Pressure-Cooker Charro Beans — retrospective whole-Recipe report"
date: 2026-10-02
identity: experiment/pressure-cooker-charro-beans-retrospective-v1
status: completed
primary_subject:
  type: recipe-version
  recipe: recipe/pressure-cooker-charro-beans
  version: 1
---

## Hypothesis

Retrospective review expectation stated at recording time: the complete recorded
formulation and Method can reach its intended endpoints and produce the following
finished dish: Brothy pinto beans enriched with bacon, tomato, chilli, and warm spices. This is not a hypothesis documented before historical
cooking and is not itself an observed outcome.

## Procedure

This record was written on 2026-10-02 from Carlo Kruger's retrospective report
on that date. Historical cooking dates and trial counts were not recorded.
The exact whole Recipe Version is [Pressure-Cooker Charro Beans v1](ref:recipe/pressure-cooker-charro-beans@1).
Its preserved source is `recipes-tmp/pressure-cooker-charro-beans.md` with SHA-256 `410da9a95fffe9a76e9a2a2ace128fd69c97fa956bd77d058538b222f8a98c3a`.
The serialized draft SHA-256 is `13aa80b802bef34f683060e4e4a289e189990f4e56986060c64f32f0458c1f7e`.
The complete formulation and work sequence below are the recorded specification,
not newly observed timings, temperatures or yields. Correspondence to past cooking
is attributed to Carlo's statement that the recipes as recorded were fully tested.
The historical reconstruction caveats remain in the unchanged source; Carlo's
2026-10-02 acceptance applies to this formulation and the packet's explicit clarifications.

### PHASE A — AROMATIC BASE

#### Ingredient Uses

| Key | Ingredient | Quantity | Scaling | Use |
| --- | --- | --- | --- | --- |
| white-onion-diced | [White onion, diced](ref:ingredient/onion) | 200 g | 40.00% | White onion, diced. |
| garlic-finely-chopped | [Garlic, finely chopped](ref:ingredient/garlic) | 20 g | 4.00% | Garlic, finely chopped. |
| bacon-diced | [Bacon, diced](ref:ingredient/bacon) | 200 g | 40.00% | Bacon, diced. |
| tomato-diced | [Tomato, diced](ref:ingredient/tomato) | 300 g | 60.00% | Tomato, diced. |
| jalape-o-finely-diced | [Jalapeño, finely diced](ref:ingredient/jalapeno) | 30 g | 6.00% | Jalapeño, finely diced. |
| chipotle-in-adobo-minced | [Chipotle in adobo, minced](ref:ingredient/chipotle-in-adobo) | 20 g | 4.00% | Chipotle in adobo, minced. |
| ground-cumin | [Ground cumin](ref:ingredient/cumin) | 4 g | 0.80% | Ground cumin. |
| dried-oregano | [Dried oregano](ref:ingredient/oregano) | 3 g | 0.60% | Dried oregano. |

#### Method

1. Render bacon in the pressure-cooker pot over medium heat for 8 min.
2. Add onion and jalapeño; cook for 6 min. Add garlic, cumin, oregano, and chipotle; cook for 1 min.
3. Add tomato and cook for 5 min, scraping the base clean.

#### Phase Outputs

| Key | Phase Output | Description |
| --- | --- | --- |
| aromatic-base | Aromatic base | Prepared intermediate for a later Phase. Use all. |

### PHASE B — PRESSURE COOK

#### Ingredient Uses

| Key | Ingredient | Quantity | Scaling | Use |
| --- | --- | --- | --- | --- |
| dried-pinto-beans-rinsed | [Dried pinto beans, rinsed](ref:ingredient/pinto-beans) | 500 g | 100.00% | Dried pinto beans, rinsed. |
| water | [Water](ref:ingredient/water) | 1500 g | 300.00% | Water. |
| bay-leaf | [Bay leaf](ref:ingredient/bay-leaf) | 1 g | 0.20% | Bay leaf. |
| fine-salt | [Fine salt](ref:ingredient/salt) | 12 g | 2.40% | Fine salt. |

#### Technique Applications

| Technique | Controls | Purpose |
| --- | --- | --- |
| [Pressure cooking](ref:technique/pressure-cooking) | High pressure 40 min; natural release 20 min | Cook the beans in the aromatic broth. |

#### Method

1. Add beans, water, bay leaf, and salt.
2. Cook at high pressure for 40 min.
3. Allow a 20 min natural pressure release, then release remaining pressure.

#### Phase Outputs Used

| Phase Output | Use |
| --- | --- |
| Aromatic base | Use `aromatic-base`. Use all. |

#### Phase Outputs

| Key | Phase Output | Description |
| --- | --- | --- |
| cooked-charro-beans | Cooked charro beans | Prepared intermediate for a later Phase. Use all; approximately 1500 g is a source finished-weight estimate. |

### PHASE C — FINISH

#### Ingredient Uses

| Key | Ingredient | Quantity | Scaling | Use |
| --- | --- | --- | --- | --- |
| coriander-leaves-chopped | [Coriander leaves, chopped](ref:ingredient/fresh-coriander) | 30 g | 6.00% | Coriander leaves, chopped. |
| lime-juice | [Lime juice](ref:ingredient/lime-juice) | 30 g | 6.00% | Lime juice. |

#### Method

1. Discard bay leaf. Simmer uncovered until the broth reaches the desired concentration.
2. Stir in coriander and lime juice. Adjust salt.

Reconstructed as an unsoaked method; old beans may require another 5 min–10 min at high pressure.
Keep charro beans brothy. They should not reduce to the texture of taco beans.

#### Phase Outputs Used

| Phase Output | Use |
| --- | --- |
| Cooked charro beans | Use `cooked-charro-beans`. Use all; approximately 1500 g is a source finished-weight estimate. |

## Results

Carlo retrospectively reported that the recipes as recorded were all successful
and fully tested, and approved this whole formulation for production. No further
Recipe-specific observations were supplied. Cooking dates, trial counts, detailed
tasting notes and instrument measurements were not supplied. Source yields are
estimates, not measured results of this retrospective record. Recorded alternatives
have no separate variation-specific testing observations in this report.

## Decision

Carlo accepted the formulation as recorded, including the explicit reviewed
clarifications, for production in the complete 25-Recipe batch on 2026-10-02.
Proceed to normal exact-version Promotion after valid serialization, applicable
Curation and reference resolution. Technical validation does not perform that
human acceptance. A materially changed formulation needs its own exact-version
evidence and acceptance; this report does not automatically follow future changes.
