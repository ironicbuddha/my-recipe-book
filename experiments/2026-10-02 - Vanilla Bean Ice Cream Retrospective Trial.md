---
title: "Vanilla Bean Ice Cream — retrospective whole-Recipe report"
date: 2026-10-02
identity: experiment/vanilla-bean-ice-cream-retrospective-v1
status: completed
primary_subject:
  type: recipe-version
  recipe: recipe/vanilla-bean-ice-cream
  version: 1
---

## Hypothesis

Retrospective review expectation stated at recording time: the complete recorded
formulation and Method can reach its intended endpoints and produce the following
finished dish: The project's smoother vanilla base, balanced for a dense texture and clean vanilla flavour. This is not a hypothesis documented before historical
cooking and is not itself an observed outcome.

## Procedure

This record was written on 2026-10-02 from Carlo Kruger's retrospective report
on that date. Historical cooking dates and trial counts were not recorded.
The exact whole Recipe Version is [Vanilla Bean Ice Cream v1](ref:recipe/vanilla-bean-ice-cream@1).
Its preserved source is `recipes-tmp/vanilla-bean-ice-cream.md` with SHA-256 `8fac87a916afdaaa3b7e9061e545118fad87db8d2b6aab054002de53d3453502`.
The serialized draft SHA-256 is `51eab235034821085269015c6b98c1c0cd719f102be537ae3a65d78c2aa75ca2`.
The complete formulation and work sequence below are the recorded specification,
not newly observed timings, temperatures or yields. Correspondence to past cooking
is attributed to Carlo's statement that the recipes as recorded were fully tested.
The historical reconstruction caveats remain in the unchanged source; Carlo's
2026-10-02 acceptance applies to this formulation and the packet's explicit clarifications.

### PHASE A — INFUSE

#### Ingredient Uses

| Key | Ingredient | Quantity | Scaling | Use |
| --- | --- | --- | --- | --- |
| whole-milk | [Whole milk](ref:ingredient/whole-milk) | 330 g | 100.00% | Whole milk. |
| vanilla-bean | [Vanilla bean](ref:ingredient/vanilla-bean) | 5 g | 1.52% | Vanilla bean. |

#### Method

1. Split the vanilla bean and scrape the seeds into the milk. Add the pod.
2. Heat milk and vanilla to 70 C. Cover and infuse for 30 min.

#### Phase Outputs

| Key | Phase Output | Description |
| --- | --- | --- |
| vanilla-infused-milk | Vanilla infused milk | Prepared intermediate for a later Phase. Use all, including the pod until removal in the next Phase. |

### PHASE B — MIX AND PASTEURISE

#### Ingredient Uses

| Key | Ingredient | Quantity | Scaling | Use |
| --- | --- | --- | --- | --- |
| cream-approximately-35-fat | [Cream, approximately 35% fat](ref:ingredient/heavy-cream) | 200 g | 60.61% | Cream, approximately 35% fat. |
| sucrose | [Sucrose](ref:ingredient/sugar) | 85 g | 25.76% | Sucrose. |
| dextrose | [Dextrose](ref:ingredient/dextrose) | 25 g | 7.58% | Dextrose. |
| skim-milk-powder | [Skim milk powder](ref:ingredient/skim-milk-powder) | 25 g | 7.58% | Skim milk powder. |
| egg-yolk | [Egg yolk](ref:ingredient/egg-yolk) | 50 g | 15.15% | Egg yolk. |
| ice-cream-stabiliser | [Ice cream stabiliser](ref:ingredient/ice-cream-stabiliser) | 1.5 g | 0.45% | Ice cream stabiliser. |
| fine-salt | [Fine salt](ref:ingredient/salt) | 1 g | 0.30% | Fine salt. |

#### Method

1. Whisk sucrose, dextrose, skim milk powder, stabiliser, and salt together.
2. Add cream to the infused milk. Blend in the dry mixture.
3. Whisk egg yolk in a separate bowl. Temper with the warm dairy mixture, then recombine.
4. Heat while stirring to 82 C–84 C and hold for 30 s. Do not boil.

#### Phase Outputs Used

| Phase Output | Use |
| --- | --- |
| Vanilla infused milk | Use `vanilla-infused-milk`. Use all, including the pod until removal in the next Phase. |

#### Phase Outputs

| Key | Phase Output | Description |
| --- | --- | --- |
| custard-base | Custard base | Prepared intermediate for a later Phase. Remove the pod, then cool, age and churn all. |

### PHASE C — AGE AND CHURN

#### Technique Applications

| Technique | Controls | Purpose |
| --- | --- | --- |
| [Ice cream churning](ref:technique/ice-cream-churning) | Machine instructions; draw approximately -6 C | Churn the aged custard. |

#### Method

1. Remove the vanilla pod. Blend for 30 s, then cool the base to below 4 C as quickly as possible.
2. Refrigerate for 6 h–12 h.
3. Churn according to the machine's instructions until the draw temperature is approximately -6 C.
4. Pack into a chilled container and harden at -18 C for at least 4 h.

Mix the stabiliser thoroughly with the sugars before adding it to prevent clumping.

#### Phase Outputs Used

| Phase Output | Use |
| --- | --- |
| Custard base | Use `custard-base`. Remove the pod, then cool, age and churn all. |

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
