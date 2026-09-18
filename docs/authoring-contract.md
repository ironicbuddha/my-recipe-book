# Culinary Authoring Contract

This guide is the portable source contract for new culinary records. It does
not migrate the legacy corpus or implement the later validator and publisher.

## Authority and presentation

The following are accepted semantics: repository Markdown is authoritative;
Astro projects it; publication eligibility comes from valid lifecycle state; and
human Curation and Promotion cannot be automated or fabricated. Source Markdown
uses ordinary headings, paragraphs, lists, tables, YAML, and ordinary Markdown
links only. It contains no HTML, Obsidian callouts, CSS classes, layout columns,
or presentation instructions.

The following are repository serialization choices, not new domain decisions:

| Record | Repository location | Filename choice |
| --- | --- | --- |
| Canonical Recipe | `recipes/` | `YYYY-MM-DD - Dish Name.md` |
| Recipe Draft | `recipes/drafts/` | `<recipe-key>@<version>.md` |
| Superseded Recipe Version | `recipes/superseded/` | `<recipe-key>@<version>.md` |
| Experiment | `experiments/` | `YYYY-MM-DD - Dish Trial.md` |
| Promotion Record | `records/promotions/` | `<recipe-key>@<version>.md` |
| Curation and retirement record | `records/curation/` | `<candidate-or-subject-key>.md` |
| Grandfathering inventory | `records/migrations/` | `<batch-key>.md` |

Directories and filenames do not create identity, lifecycle, or public routes.
The later migration must create these record directories when it first writes a
record; this documentation change intentionally creates no fictional evidence.

## Identities and references

An identity is immutable and follows `<type>/<lowercase-ascii-key>`, where the
key uses lowercase letters and digits separated by single hyphens. The supported
types are `recipe`, `experiment`, `ingredient`, `technique`, and `principle`.
Knowledge Notes use their Ingredient, Technique, or Principle subject identity.

| Relationship | Structured form | Markdown form |
| --- | --- | --- |
| Recipe | `recipe/example-dish` | `[Example dish](ref:recipe/example-dish)` |
| Exact Recipe Version | `recipe: recipe/example-dish`, `version: 2` | `[Example dish v2](ref:recipe/example-dish@2)` |
| Ingredient | `ingredient/fine-salt` | `[Fine salt](ref:ingredient/fine-salt)` |
| Technique | `technique/sear` | `[Sear](ref:technique/sear)` |
| Principle | `principle/maillard-reaction` | `[Maillard reaction](ref:principle/maillard-reaction)` |
| Phase | `phase: PHASE B — SEAR` with its exact Recipe Version | n/a; it is scoped metadata |
| Ingredient Use | exact Recipe Version, Phase, and `key: seasoning-salt` | n/a; it is scoped metadata |
| Phase Output | exact Recipe Version and `key: browned-vegetables` | n/a; it is scoped metadata |
| Correction | `corrects: experiment/example-trial` | `[Corrected trial](ref:experiment/example-trial)` |

Structured metadata stores bare identities, not Markdown links. A reference must
resolve once to its declared type and scope. References to valid unpublished
targets remain graph edges but do not become public anchors. Aliases have no
identity or route. Retired identities cannot be used by current references;
the historical-primary-subject exception is described below.

## Recipe contract

Recipe frontmatter contains only `title`, `date`, `identity`, positive-integer
`version`, scalar `yield`, `scale_basis`, and `tags`. Tags have exactly one of
`dish-main-course`, `dish-side-dish`, `dish-dessert`, `dish-breakfast`,
`dish-appetizer`, `dish-soup`, or `dish-sauce`; other tags are classificatory
only. Do not encode lifecycle, identities, Techniques, or Principles in tags.

The frontmatter title is the only authored title. An optional unheaded overview
can precede contiguous, uniquely named `## PHASE …` headings. Source order is
the intended dependency and start order. Use `**May overlap:** PHASE …` only to
make concurrency explicit. Each Phase has `### Method` with an ordered,
imperative list. Omit conditional subsections when absent. When present, use
this fixed order: Ingredient Uses, Technique Applications, Principles, Method,
Phase Outputs or Phase Outputs Used.

```md
---
title: "Charred Chicken with Lemon Pan Sauce"
date: 2026-09-11
identity: recipe/charred-chicken-lemon-pan-sauce
version: 2
yield: "2 servings"
scale_basis:
  ingredient: ingredient/chicken-thigh
  quantity_g: 600
tags: [dish-main-course, poultry, skillet]
---

Chicken thighs with a quick pan sauce.

## PHASE A — SEASON CHICKEN

### Ingredient Uses

| Key | Ingredient | Quantity | Scaling | Use |
| --- | --- | --- | --- | --- |
| chicken | [Chicken thigh](ref:ingredient/chicken-thigh) | 600 g | 100.00% | Pat dry and portion. |
| seasoning-salt | [Fine salt](ref:ingredient/fine-salt) | 9 g | 1.50% | Season the chicken. |

### Method

1. Season the declared chicken with the salt.

## PHASE B — SEAR CHICKEN

### Ingredient Uses

| Key | Ingredient | Quantity | Scaling | Use |
| --- | --- | --- | --- | --- |
| oil | [Neutral oil](ref:ingredient/neutral-oil) | 15 ml | 2.50% | Film the hot pan. |

### Technique Applications

| Technique | Controls | Purpose |
| --- | --- | --- |
| [Searing](ref:technique/searing) | 220 C surface; 4 min per side | Brown the exterior before the centre overcooks. |

### Principles

- [Maillard reaction](ref:principle/maillard-reaction) — A dry, hot surface builds roasted flavour and colour.

### Method

1. Sear the seasoned chicken in the oil until browned.

### Phase Outputs

| Key | Phase Output | Description |
| --- | --- | --- |
| seared-chicken | Seared chicken | Browned chicken ready to finish with sauce. |

## PHASE C — MAKE SAUCE AND SERVE

**May overlap:** PHASE B — SEAR CHICKEN during its final minute.

### Ingredient Uses

| Key | Ingredient | Quantity | Scaling | Use |
| --- | --- | --- | --- | --- |
| lemon-juice | [Lemon juice](ref:ingredient/lemon-juice) | 30 ml | 5.00% | Deglaze the pan. |

### Phase Outputs Used

| Phase Output | Use |
| --- | --- |
| Seared chicken | Return all of `seared-chicken` to the sauce. |

### Method

1. Deglaze with the lemon juice.
2. Coat the seared chicken in the sauce and serve.

## FAILURE MODES

| Symptom | Likely cause | Corrective action |
| --- | --- | --- |
| Pale chicken | Pan surface was too cool or wet. | Dry the chicken and preheat the pan longer. |
```

Numeric Ingredient Use scaling is `(authored mass / scale basis mass) × 100`,
with exactly two decimals and halfway rounding up. The example uses a `600 g`
basis: `9 g = 1.50%` and `15 ml = 2.50%`. Units are `g` or `ml`; temperatures
are `C`; times are `s`, `min`, or `h`, with a space after every number. A
discretionary or non-mass Use may use `As needed` and `—`. Split Uses of the
basis Ingredient must total its declared basis mass. The final plated dish is
never a Phase Output; each Phase Output has exactly one producer and at least
one later consumer.

## Experiment contract

Every Experiment has a new immutable `experiment/...` identity. A Completed
Experiment freezes its primary subject, hypothesis, procedure, results, and
decision together. Completion records complete evidence, not a successful
outcome. A repeat, new evidence, or correction needs a new identity. Each
complete form below has all frozen fields; only one may appear in a record.

```md
---
title: "Chicken whole-recipe trial"
date: 2026-09-11
identity: experiment/chicken-whole-recipe-trial
status: completed
primary_subject:
  type: recipe-version
  recipe: recipe/charred-chicken-lemon-pan-sauce
  version: 2
---

## Hypothesis

A 9 g salt dose seasons the complete recipe evenly.

## Procedure

1. Cook Recipe Version 2 exactly as authored.

## Results

Both servings were seasoned through the centre.

## Decision

Evidence supports promotion review.
```

```md
---
title: "Chicken salt-use trial"
date: 2026-09-11
identity: experiment/chicken-salt-use-trial
status: completed
primary_subject:
  type: ingredient-use
  recipe: recipe/charred-chicken-lemon-pan-sauce
  version: 2
  phase: PHASE A — SEASON CHICKEN
  key: seasoning-salt
---

## Hypothesis

The 9 g salt use seasons the chicken.

## Procedure

1. Apply only the declared seasoning-salt Use.

## Results

The surface was well seasoned.

## Decision

Keep this scoped evidence; it cannot authorize Promotion.
```

```md
---
title: "Searing control trial"
date: 2026-09-11
identity: experiment/searing-control-trial
status: completed
primary_subject:
  type: technique
  identity: technique/searing
---

## Hypothesis

A 220 C surface browns chicken before it dries out.

## Procedure

1. Sear chicken on a 220 C surface for 4 min per side.

## Results

The exterior browned and the centre remained moist.

## Decision

Retain the control range.
```

```md
---
title: "Maillard explanation trial"
date: 2026-09-11
identity: experiment/maillard-explanation-trial
status: completed
primary_subject:
  type: principle
  identity: principle/maillard-reaction
---

## Hypothesis

Drying the surface improves roasted flavour.

## Procedure

1. Compare patted-dry and wet chicken under the same heat control.

## Results

The dry sample browned more readily.

## Decision

Use this explanation in the searing Phase.
```

An Ingredient Use experiment cannot authorize whole-Recipe Promotion. A
Completed Experiment can publish when its Recipe Draft subject is unpublished;
the publisher displays the exact subject as plain text and gives the draft no
route. A correction points to the original and the publisher derives a notice
on the original after the correction publishes:

```md
---
title: "Chicken salt-use correction"
date: 2026-09-12
identity: experiment/chicken-salt-correction
status: completed
corrects: experiment/chicken-salt-use-trial
primary_subject:
  type: ingredient-use
  recipe: recipe/charred-chicken-lemon-pan-sauce
  version: 2
  phase: PHASE A — SEASON CHICKEN
  key: seasoning-salt
---

## Hypothesis

The original observation overstated surface seasoning.

## Procedure

1. Repeat the original procedure with blind tasting.

## Results

The centre needs the same 9 g dose, not more salt.

## Decision

Publish this correction beside the original evidence.
```

Do not change the original's frozen evidence. An ordinary repeat omits
`corrects`.

## Promotion and Recipe history

Only a Curator promotes. The Promotion Record must name the exact whole Recipe
Version, at least one supporting Completed Experiment whose exact primary
subject is that version, the accepting Curator, date, rationale, and known
shortcomings:

```yaml
record_type: promotion
recipe: recipe/charred-chicken-lemon-pan-sauce
version: 2
supporting_experiments:
  - experiment/chicken-whole-recipe-trial
accepted_by: "Carlo Kruger"
accepted_on: 2026-09-11
```

Promotion admits that version as the Canonical Recipe and preserves the former
Canonical Recipe as immutable, referenceable Superseded Recipe Version. A
Culinary Change after evidence targets a Recipe Draft or its Ingredient Use
creates the next Recipe Draft version. An editorial correction does neither.

## Knowledge Curation and retirement

A Knowledge Note is substantive human-curated content about exactly one
Ingredient, Technique, or Principle subject. A Candidate is evidence only, not
authoritative or publication eligible. This repository gives it an immutable,
repository-local `candidate/<lowercase-ascii-key>` locator for evidence and
Curation records. That locator is not a culinary Stable Identity and has no
public route. Record the original label and provenance under `## Evidence`.
Curation records one of these outcomes:

```md
---
record_type: curation
candidate: candidate/pan-searing-label
candidate_label: "Pan searing"
evidence_sources:
  - recipe/charred-chicken-lemon-pan-sauce@2
decision: establish-subject
subject: technique/searing
decided_by: "Carlo Kruger"
decided_on: 2026-09-11
---

## Evidence

The cited Recipe uses the label for the controlled high-heat technique.

## Rationale

Establish `technique/searing` and create its substantive Knowledge Note.
```

```md
---
record_type: curation
candidate: candidate/hard-sear-label
candidate_label: "Hard sear"
evidence_sources:
  - recipe/charred-chicken-lemon-pan-sauce@2
decision: merge-alias
survivor: technique/searing
alias: "Hard sear"
decided_by: "Carlo Kruger"
decided_on: 2026-09-11
---

## Evidence

The label names the same controlled technique.

## Rationale

Retain the candidate evidence and recognize the label as an alias only.
```

```md
---
record_type: curation
candidate: candidate/wok-pan-label
candidate_label: "Wok pan"
evidence_sources:
  - recipe/charred-chicken-lemon-pan-sauce@2
decision: retire-candidate
retirement_reason: "Equipment label, not a Technique subject."
decided_by: "Carlo Kruger"
decided_on: 2026-09-11
---

## Evidence

The label refers to equipment rather than culinary knowledge.

## Rationale

Retain the evidence and do not reopen this candidate automatically.
```

Retirement evidence must observe the candidate in each cited exact Recipe
Version. A historical Curation decision whose source was recorded before that
linkage requirement may declare
`evidence_observation_exemption: historical-curation`; it remains an explicit
Curator exception and does not weaken the requirement for later retirements.

An established-subject merge migrates current references to the survivor and
permanently reserves the losing identity. Completed Experiments retain their
historical primary subject through a resolvable retirement record:

```yaml
record_type: identity-retirement
retired_identity: technique/hard-searing
survivor: technique/searing
reason: merged duplicate subject
decided_by: "Carlo Kruger"
decided_on: 2026-09-11
```

New Experiments must use `technique/searing`; only historical Completed
Experiment subjects may resolve through the retired identity.

## Grandfathering

Grandfathering is a bounded migration exception, not a content state. A
Curator-approved inventory records each source file, old version, mapped
positive integer version, and retain-canonical or move-to-draft disposition.
It exempts only historical Experiment evidence and historical Promotion Records
for that exact mapped version. Structure, identity, references, measurements,
and all other contracts still apply; the exemption never carries forward.

```md
| Source file | Recipe | Old version | Mapped version | Disposition | Exemption |
| --- | --- | --- | --- | --- | --- |
| `2024-06-01 - Chicken.md` | recipe/charred-chicken-lemon-pan-sauce | v1.0 | 1 | retain-canonical | historical evidence and Promotion Record only |
```

## Current implementation boundary

This guide establishes authoring examples and record serialization. The current
content validator still protects the legacy corpus; the later migration and
publication work must extend it with the accepted hard failures for structure,
measurements, scaling, dependencies, identity, references, evidence, and
acceptance. Diagnostics, routes, redirects, HTTP 410 withdrawal handling, and
Astro rendering are implementation work, not excuses to alter the portable
source contract.
