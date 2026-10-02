---
title: "Carbonara — retrospective whole-Recipe report"
date: 2026-10-02
identity: experiment/carbonara-retrospective-v1
status: completed
primary_subject:
  type: recipe-version
  recipe: recipe/carbonara
  version: 1
---

## Hypothesis

Retrospective review expectation stated at recording time: the complete recorded
formulation and Method can reach its intended endpoints and produce the following
finished dish: Roman-style spaghetti emulsified with guanciale, egg, Pecorino Romano, and black pepper. This is not a hypothesis documented before historical
cooking and is not itself an observed outcome.

## Procedure

This record was written on 2026-10-02 from Carlo Kruger's retrospective report
on that date. Historical cooking dates and trial counts were not recorded.
The exact whole Recipe Version is [Carbonara v1](ref:recipe/carbonara@1).
Its preserved source is `recipes-tmp/carbonara.md` with SHA-256 `a9c16d2e3fc43959b96505fc76a2dddb60a21e4cfd08c144626b9e46278d03b9`.
The serialized draft SHA-256 is `66262b2b2f0d0077a97cfd4642ed9f4160c199ab89593915814fabc72180fb09`.
The complete formulation and work sequence below are the recorded specification,
not newly observed timings, temperatures or yields. Correspondence to past cooking
is attributed to Carlo's statement that the recipes as recorded were fully tested.
The historical reconstruction caveats remain in the unchanged source; Carlo's
2026-10-02 acceptance applies to this formulation and the packet's explicit clarifications.

### PHASE A — MIX EGGS AND CHEESE

#### Ingredient Uses

| Key | Ingredient | Quantity | Scaling | Use |
| --- | --- | --- | --- | --- |
| egg-yolk | [Egg yolk](ref:ingredient/egg-yolk) | 72 g | 36.00% | Egg yolk. |
| whole-egg | [Whole egg](ref:ingredient/egg) | 50 g | 25.00% | Whole egg. |
| pecorino-romano-finely-grated | [Pecorino Romano, finely grated](ref:ingredient/pecorino) | 80 g | 40.00% | Pecorino Romano, finely grated. |
| black-pepper-coarsely-ground | [Black pepper, coarsely ground](ref:ingredient/black-pepper) | 1.5 g | 0.75% | Use half the total pepper in the egg mixture. |

#### Method

1. Combine yolks, whole egg, Pecorino, and half the black pepper to form a thick paste.

#### Phase Outputs

| Key | Phase Output | Description |
| --- | --- | --- |
| egg-cheese-mixture | Egg cheese mixture | Prepared intermediate for a later Phase. Use all. |

### PHASE B — RENDER GUANCIALE

#### Ingredient Uses

| Key | Ingredient | Quantity | Scaling | Use |
| --- | --- | --- | --- | --- |
| guanciale-cut-into-batons | [Guanciale, cut into batons](ref:ingredient/guanciale) | 100 g | 50.00% | Guanciale, cut into batons. |

#### Technique Applications

| Technique | Controls | Purpose |
| --- | --- | --- |
| [Fat rendering](ref:technique/fat-rendering) | Cold pan; medium-low heat; crisp edges | Render guanciale fat. |

#### Method

1. Place guanciale in a cold pan. Cook over medium-low heat for 8 min–10 min until the fat renders and the meat is crisp at the edges.
2. Remove the pan from heat, keeping the guanciale and rendered fat together.

#### Phase Outputs

| Key | Phase Output | Description |
| --- | --- | --- |
| rendered-guanciale | Rendered guanciale | Prepared intermediate for a later Phase. Use all guanciale and its rendered fat. |

### PHASE C — COOK PASTA AND RESERVE WATER

#### Ingredient Uses

| Key | Ingredient | Quantity | Scaling | Use |
| --- | --- | --- | --- | --- |
| dried-spaghetti | [Dried spaghetti](ref:ingredient/dried-pasta) | 200 g | 100.00% | Dried spaghetti. |
| fine-salt-for-pasta-water | [Fine salt, for pasta water](ref:ingredient/salt) | 8 g | 4.00% | Fine salt, for pasta water. |
| water | [Water](ref:ingredient/water) | 2000 g | 1000.00% | Water. |

#### Method

1. Bring water and salt to a boil.
2. Cook spaghetti until 2 min short of al dente. Reserve at least 150 g pasta water.

#### Phase Outputs

| Key | Phase Output | Description |
| --- | --- | --- |
| reserved-pasta-water | Reserved pasta water | Prepared intermediate for a later Phase. Use about 100 g, adding gradually until glossy; retain any remainder. |
| nearly-cooked-pasta | Nearly cooked pasta | Prepared intermediate for a later Phase. Use all. |

### PHASE D — EMULSIFY OFF HEAT AND SERVE

#### Ingredient Uses

| Key | Ingredient | Quantity | Scaling | Use |
| --- | --- | --- | --- | --- |
| finishing-pepper | [Black pepper](ref:ingredient/black-pepper) | 1.5 g | 0.75% | Finish with the remaining half. |

#### Technique Applications

| Technique | Controls | Purpose |
| --- | --- | --- |
| [Sauce emulsion](ref:technique/sauce-emulsion) | Off heat; brief cooling; toss and add water until glossy | Combine egg, cheese, fat and pasta water without curds. |

#### Method

1. Transfer pasta to the guanciale pan and toss briefly over low heat.
2. Remove from heat and cool briefly. Add the egg mixture and toss vigorously.
3. Add about 100 g reserved pasta water gradually, in 15 g–20 g increments, until the sauce is glossy and fluid, with no visible curds.
4. Divide between warm bowls and finish with remaining black pepper.

#### Phase Outputs Used

| Phase Output | Use |
| --- | --- |
| Egg cheese mixture | Use `egg-cheese-mixture`. Use all. |
| Rendered guanciale | Use `rendered-guanciale`. Use all guanciale and its rendered fat. |
| Reserved pasta water | Use `reserved-pasta-water`. Use about 100 g, adding gradually until glossy; retain any remainder. |
| Nearly cooked pasta | Use `nearly-cooked-pasta`. Use all. |

## Results

Carlo approximately confirmed the formulation: 200 g spaghetti, 100 g guanciale,
72 g yolk, 50 g whole egg, 80 g Pecorino, 8 g salt in 2000 g cooking water,
3 g pepper and about 100 g reserved pasta water used in the sauce. The general
off-heat emulsion method was confirmed. His reported result was “rich sauce with
a bit of funk and al dente pasta”; the funk was intended and no shortcomings
were recalled. Precise cooling duration, pan temperature, historical cooking
date and instrument measurements were not verified. The exact version uses
brief cooling off heat and observable glossy-emulsion cues. Recorded alternatives
have no separate variation-specific testing observations.

## Decision

Carlo accepted the formulation as recorded, including the explicit reviewed
clarifications, for production in the complete 25-Recipe batch on 2026-10-02.
Proceed to normal exact-version Promotion after valid serialization, applicable
Curation and reference resolution. Technical validation does not perform that
human acceptance. A materially changed formulation needs its own exact-version
evidence and acceptance; this report does not automatically follow future changes.
