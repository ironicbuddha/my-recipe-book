# Batch 4 Curation proposal

Date: 2026-09-29

Issue: [#24](https://github.com/ironicbuddha/my-recipe-book/issues/24)

## Boundary

This document is the review packet that the Curator approved on 2026-09-29. It
is not itself a Curation record, Knowledge Note, Recipe conversion, or
publication approval. The Curator approved the six exact
source/version/identity/disposition mappings from the [migration review
packet](2026-09-12-recipe-migration-review-packets.md) in the preceding
conversation. That decision is serialized in `records/migrations/batch-4.md`.
The candidate outcomes below were approved as directions for the exact
Curation records under `records/curation/`. Do not relabel #24 or convert its
sources based on this document alone.

The scope is exactly `recipe/cowboy-beans@1`,
`recipe/gratin-dauphinois@1`, `recipe/tomato-bredie@2`,
`recipe/traditional-greek-lentil-soup-fakes@1`,
`recipe/creamy-porcini-mushroom-ragout-polenta@1`, and
`recipe/spanish-chicken-chorizo-stew@1`. Candidate keys below resolve to
repository-held evidence, not authority.

## Conversion choices already settled in conversation

- Preserve each named alternative in its Ingredient Use; use the first-listed
  choice as its structured primary. Do not turn compound labels into subjects.
- In Gratin Dauphinois, distribute the 6 g salt, 0.5 g white pepper, and 4 g
  garlic mixture between potato layers before adding cream. Use the measured
  500 g potatoes and keep 170 C as an oven control, not a new Technique.
- Use Cowboy Beans' measured 112.5 g beans rather than its rounded 113 g
  frontmatter basis. Use Fakes' measured 166.67 g lentils rather than its
  rounded 167 g frontmatter basis.
- In Tomato Bredie, use 5 g ginger in Phase C and 2.5 g in Phase F. Do not use
  the rice-specific `principle/starch-absorption` for its potato-thickened
  sauce. Explain the thickening in the Recipe.
- In the porcini ragout, steep with 150 g water and top up the strained liquor
  to the 140 g needed in Phase D. The source's “reserve ~280 g” is impossible
  from its measured steeping water. Remove the unsupported `vegetarian` tag
  while retaining the Parmesan.
- Return the reserved chorizo with the chicken in the Spanish stew. Keep the
  named bean and rice alternatives.
- The grandfathering exemption applies only to historical Experiment evidence
  and Promotion Records for the six exact versions; all other contracts apply.

## Already curated subjects to reuse

Current Curation records already establish or resolve these Batch 4 candidate
labels. Reuse the surviving identities; do not create a second subject:

| Type | Existing outcomes relevant to the six sources |
| --- | --- |
| Ingredient | Apple cider vinegar, bay leaf, black pepper, carrot, cloves, coriander seed, extra virgin olive oil, fine salt/salt, fish sauce, flat-leaf parsley, garlic, ground cumin/cumin, lemon juice, neutral oil, olive oil, onion, red wine vinegar, shallot, sherry vinegar, smoked paprika, white pepper |
| Technique | Emulsification, Reduction, Sweating; `low-temperature baking` was retired as a control label |
| Principle | Fat As Flavour Carrier, Maillard Reaction, Starch Gelatinisation, Collagen Conversion; the rice-specific Starch Absorption subject exists but does not describe Tomato Bredie's potato phase |

The matching candidate and Curation files under `records/` remain the exact
authority. A label in this summary is not a new approval.

## Pending source-linked Ingredient candidates

Each row refers to `records/candidates/<key>.md`. `Establish` means create a
substantive Knowledge Note at the named identity. `Merge` means recognize only
an alias of an established or concurrently approved survivor. `Retire` means
retain evidence but create no Ingredient subject for the label. Exact Curation
records must cite the approved source version(s) and an evidence snapshot.

| Candidate key | Recommended outcome | Reason or use |
| --- | --- | --- |
| `ingredient-bacon` | Establish `ingredient/bacon` | Distinct food material in Cowboy Beans. |
| `ingredient-beef` | Retire | The source's “chuck or ground” needs two specific alternatives, not an unspecific beef Use. |
| `ingredient-beer` | Retire | The source offers lager or amber beer; each needs its own material identity to preserve the first-listed primary and its alternative. |
| `ingredient-brown-lentils` | Establish `ingredient/brown-lentils` | Distinct from curated Puy lentils. |
| `ingredient-chili-powder` | Establish `ingredient/chili-powder` | Prepared spice blend; do not equate it with ground chili. |
| `ingredient-cinnamon-stick` | Merge into `ingredient/cinnamon` | Stick is a form; preserve it in the Use. |
| `ingredient-crushed-tomatoes` | Merge into `ingredient/tomato` | Crushed is the stated preparation; do not infer a canned form for Fakes. |
| `ingredient-dark-brown-sugar` | Establish `ingredient/dark-brown-sugar` | Dark grade affects molasses content. |
| `ingredient-dried-oregano` | Establish `ingredient/oregano` | Dried form stays in the Use. |
| `ingredient-dried-pinto-beans` | Establish `ingredient/pinto-beans` | Dried form and navy-bean alternative stay in the Use. |
| `ingredient-fresh-ginger` | Merge into existing `ingredient/fresh-ginger` | Existing subject; no duplicate identity. |
| `ingredient-fresh-lemon-juice-or-red-wine-vinegar` | Retire | Two alternative existing Ingredients, never one compound subject. |
| `ingredient-fresh-thyme-leaves` | Establish `ingredient/thyme` | Sprigs and leaves are forms of the same herb. |
| `ingredient-ground-spices` | Retire | Phase A output, not a new material. |
| `ingredient-heavy-cream` | Establish `ingredient/heavy-cream` | Preserve Gratin's 35% specification. |
| `ingredient-hot-water` | Merge into existing `ingredient/water` | Temperature is a Use control. |
| `ingredient-jalapeno` | Establish `ingredient/jalapeno` | Optional but distinct material. |
| `ingredient-lamb-neck` | Establish `ingredient/lamb-neck` | Preserve bone-in form. |
| `ingredient-mild-cape-malay-curry-powder` | Establish `ingredient/mild-cape-malay-curry-powder` | Named prepared blend; do not replace with generic curry powder. |
| `ingredient-molasses` | Establish `ingredient/molasses` | Distinct sweetener. |
| `ingredient-potato` | Establish `ingredient/potato` | Generic potato in Tomato Bredie. |
| `ingredient-remaining-ginger` | Retire | The 2.5 g finishing portion is another Use of fresh ginger. |
| `ingredient-salt-black-pepper` | Retire | Two Ingredients, each already established. |
| `ingredient-tomato-paste` | Establish `ingredient/tomato-paste` | Concentrated prepared tomato. |
| `ingredient-tomato-sauce-crushed-tomato` | Retire | Two alternatives in Cowboy Beans. |
| `ingredient-tomato` | Establish `ingredient/tomato` | Preserve Bredie's tinned specification in its Use; do not assume whole or plum. |
| `ingredient-unsalted-butter` | Merge into existing `ingredient/butter` | Unsalted form remains explicit in each Use. |
| `ingredient-water-or-light-vegetable-stock` | Retire | Two alternative materials in Fakes. |
| `ingredient-water` | Merge into existing `ingredient/water` | Existing subject; amounts and temperature are Use controls. |
| `ingredient-waxy-potatoes` | Establish `ingredient/waxy-potatoes` | Waxy variety is structurally important to Gratin. |
| `ingredient-worcestershire` | Establish `ingredient/worcestershire-sauce` | The source abbreviation names this sauce; no existing survivor exists. |
| `ingredient-yellow-or-dijon-mustard` | Retire | Two alternatives; Dijon already has a subject. |

## Pending source-linked Technique candidates

| Candidate key | Recommended outcome | Reason or control |
| --- | --- | --- |
| `technique-acid-finishing` | Establish `technique/acid-finishing` | Add acid off heat near serving. |
| `technique-aggressive-browning` | Merge into existing `technique/browning` | Intensity belongs in controls. |
| `technique-bean-hydration` | Establish `technique/bean-hydration` | Soak and partially cook dried beans before sauce assembly. |
| `technique-dry-toasting-spices` | Establish `technique/dry-toasting-spices` | Heat whole spices before grinding. |
| `technique-fond-development` | Establish `technique/fond-development` | Brown meat to create pot fond. |
| `technique-layered-assembly` | Establish `technique/layered-assembly` | Arrange uniformly sliced potatoes with seasoning. |
| `technique-lentil-simmering` | Establish `technique/simmering`, merging the lentil-specific label | Lentils are the application material. |
| `technique-low-braise` | Merge into existing `technique/braising` | Low heat belongs in controls. |
| `technique-mandoline-slicing` | Establish `technique/mandoline-slicing` | Consistent 2–3 mm slices are a repeatable control. |
| `technique-slow-reduction` | Merge into existing `technique/reduction` | Rate belongs in controls. |
| `technique-soffritto` | Establish `technique/soffritto` | Controlled aromatic base in Fakes. |
| `technique-spice-blooming` | Establish `technique/spice-blooming` | Shared across Cowboy Beans, Bredie, and Spanish stew. |
| `technique-starch-thickening` | Establish `technique/starch-thickening` | Add potato and simmer to tighten Bredie's sauce. |

## Pending source-linked Principle candidates

| Candidate key | Recommended outcome | Reason or use |
| --- | --- | --- |
| `principle-acid-brightness-preservation` | Merge into existing `principle/acid-balance` | Late acid application preserves the sensory effect. |
| `principle-acid-brightness` | Merge into existing `principle/acid-balance` | Established sensory relationship. |
| `principle-aromatic-base-development` | Retire | Describes the soffritto process/outcome, not a causal Principle. |
| `principle-carryover-setting` | Merge into existing `principle/carryover-cooking` | Setting is the application outcome. |
| `principle-collagen-breakdown` | Merge into existing `principle/collagen-conversion` | Same slow-cooking mechanism. |
| `principle-cream-emulsion-stability` | Establish `principle/cream-emulsion-stability` | Excessive heat can split Gratin's cream. |
| `principle-molasses-bitterness-balance` | Establish `principle/molasses-bitterness-balance` | Sweetness and bitterness need a controlled balance in Cowboy Beans. |
| `principle-spice-fat-solubility` | Merge into existing `principle/fat-as-flavour-carrier` | Previously agreed shared mechanism. |
| `principle-starch-absorption` | Merge into existing `principle/starch-absorption`, but omit Bredie's reference | Existing note describes rice absorbing measured liquid, not potato-thickened sauce. |
| `principle-starch-thickening` | Merge into existing `principle/starch-gelatinisation` | Thickening is the observed outcome. |

## Direct frontmatter labels needing evidence repair

The six legacy sources also name these labels directly, but the candidate
registry has no matching source-linked entry for the exact spelling. Add
evidence-only candidate records or extend an existing candidate's observation
before seeking Curation. These are recommendations, not silent normalization.

| Legacy label | Recommended handling |
| --- | --- |
| Technique: `gelatinization` | Retire from the Technique namespace; relate polenta setting to `principle/starch-gelatinisation`. |
| Technique: `hydration` | Establish `technique/rehydration` for the dried porcini step. |
| Technique: `stewing` | Establish `technique/stewing` for the Spanish chicken, tomato, and bean method. |
| Technique: `wine reduction` | Merge into existing `technique/reduction`, with wine and glaze endpoint in controls. |
| Principle: `aroma extraction` | Merge into existing `principle/aromatic-extraction`. |
| Principle: `fat-soluble spice extraction` | Merge into existing `principle/fat-as-flavour-carrier`. |
| Principle: `fond dissolution` | Establish `principle/fond-dissolution` for deglazing the browned pot. |
| Principle: `starch gelatinization` | Merge spelling into existing `principle/starch-gelatinisation`. |
| Principle: `water activity control` | Retire: the ragout source describes moisture evaporation for browning, not measured water activity or shelf stability. Keep that practical control in its Method. |

## Ingredient alternatives and source-only observations

The candidate registry does not yet cover every material named inside the six
legacy Phase tables, especially alternatives and ingredient forms. Before
conversion, preserve the exact observations and prepare evidence-linked
Ingredient Curation for any identity not already established. The primary and
alternatives below are proposals, never compound identities:

| Source | Structured primary and preserved alternatives or forms |
| --- | --- |
| Cowboy Beans | Pinto beans (navy alternative); beef chuck (ground beef alternative); tomato sauce (crushed tomato alternative); yellow mustard (existing Dijon alternative); lager beer (amber beer alternative). Prepare distinct identities for each named option. Preserve optional jalapeno and Worcestershire. |
| Gratin Dauphinois | Waxy potatoes, heavy cream at 35%, unsalted butter form, and the approved layered salt/pepper/garlic application. |
| Tomato Bredie | Bone-in lamb neck; tinned tomato without an inferred whole/plum form; generic potato; half of the ground coriander reserved for finishing. |
| Fakes | Brown lentils; water (light vegetable stock alternative); existing lemon juice (existing red wine vinegar alternative); optional dried oregano. |
| Porcini ragout | Dried porcini, fresh mushrooms, whole milk, coarse polenta, Parmesan, dry white wine, thyme sprigs/leaves, heavy cream, neutral frying oil. Cooked polenta and strained liquor are Phase Outputs, not new Ingredients. |
| Spanish stew | Cured Spanish chorizo; existing chicken thigh; tinned whole tomato; cannellini beans (kidney, black, or pinto alternatives); basmati rice (existing jasmine rice or other white rice alternatives). Keep the source's fish sauce, Worcestershire sauce, and sherry vinegar. |

These source-named materials have no matching established Ingredient identity
and no direct candidate row above. They need source-linked evidence records and
explicit Curator Curation before use. Each proposed identity is scoped to the
material named by the legacy source; preparation and form stay in the Recipe
Use unless named here as a distinct material.

| Legacy source | Material | Proposed identity |
| --- | --- | --- |
| Cowboy Beans | Navy beans | `ingredient/navy-beans` |
| Cowboy Beans | Beef chuck | `ingredient/beef-chuck` |
| Cowboy Beans | Ground beef | `ingredient/ground-beef` |
| Cowboy Beans | Tomato sauce | `ingredient/tomato-sauce` |
| Cowboy Beans | Yellow mustard | `ingredient/yellow-mustard` |
| Cowboy Beans | Lager beer | `ingredient/lager-beer` |
| Cowboy Beans | Amber beer, style unspecified | `ingredient/amber-beer` |
| Fakes | Light vegetable stock | `ingredient/vegetable-stock` |
| Porcini ragout | Dried porcini | `ingredient/dried-porcini` |
| Porcini ragout | Fresh mushrooms, species unspecified | `ingredient/fresh-mushrooms` |
| Porcini ragout | Whole milk | `ingredient/whole-milk` |
| Porcini ragout | Coarse polenta | `ingredient/polenta` |
| Porcini ragout | Parmesan | `ingredient/parmesan` |
| Porcini ragout | Dry white wine | `ingredient/white-wine` |
| Spanish stew | Cured Spanish chorizo | `ingredient/spanish-chorizo` |
| Spanish stew | Bird's eye chili | `ingredient/birds-eye-chili` |
| Spanish stew | Red wine | `ingredient/red-wine` |
| Spanish stew | Cannellini beans | `ingredient/cannellini-beans` |
| Spanish stew | Kidney beans | `ingredient/kidney-beans` |
| Spanish stew | Black beans | `ingredient/black-beans` |
| Spanish stew | Basmati rice | `ingredient/basmati-rice` |
| Spanish stew | White rice, unspecified variety | `ingredient/white-rice` |

No new material identity should be inferred solely from a generated candidate
classification. Existing identities take precedence where they accurately
cover the source material. The Curator must approve each missing subject or
alternative before conversion can reference it.

## Review points

The recommendations above settle clear duplicate, alias, and fragment cases
from source evidence. The potentially consequential judgments for Curator
review are:

1. Retire the generic `ingredient-beef` candidate and establish the two
   source-specified cuts/forms separately. This avoids calling both a single
   structured material while retaining the source's alternative.
2. Retire the generic `ingredient-beer` candidate and distinguish lager from
   amber beer for the same reason. The source does not specify an amber beer
   style beyond that wording.
3. Establish `ingredient/waxy-potatoes` separately from generic potato because
   the Gratin depends on waxy texture.
4. Retire `water activity control` as a Principle claim in the porcini ragout;
   keep the source's moisture-evaporation cooking instruction.

The exact candidate decisions, six-row grandfathering inventory, source
snapshots, and substantive Knowledge Notes are serialized on the Batch 4
Curation branch. Recipe conversion and the issue #24 readiness gate are later
steps.
