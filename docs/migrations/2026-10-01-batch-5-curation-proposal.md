# Batch 5 grouped Curation proposal

Issue: [#25](https://github.com/ironicbuddha/my-recipe-book/issues/25)

Status: approved by Carlo Kruger, Curator, on 2026-10-01 in the issue #25
review conversation. Exact decisions are serialized under `records/curation/`
with the `batch-5-` prefix; this document is the supporting review packet.

## Scope and evidence

This proposal covers only the six approved Batch 5 source versions in
`records/migrations/batch-5.md`. Their exact source snapshots are under
`records/migrations/legacy-sources/batch-5/`. Existing candidates are evidence,
not acceptance. Add source-linked candidate observations for missing labels
before serializing approved Curation records; no historical evidence exemption
is proposed for these decisions.

The source abbreviations below denote exact versions:

| Abbreviation | Exact Recipe Version |
| --- | --- |
| Manchego | `recipe/manchego-thyme-infused-honey-coffee-dust@1` |
| Competition | `recipe/aeropress-competition-cup@1` |
| Everyday | `recipe/aeropress-everyday-cup@1` |
| Chicken | `recipe/monkey-gland-chicken@1` |
| Steak | `recipe/reverse-seared-fillet-hibachi-cabbage-steakhouse-fries-gochujang-sauce@1` |
| Slaw | `recipe/celery-green-apple-fennel-pollen-slaw@1` |

The approved yield and timing corrections, including the separately approved
17:30 steak removal, are recorded in `2026-10-01-batch-5-review.md`.
This Curation proposal makes no further changes to
quantities, controls, endpoints, named alternatives, refinements, or variations.
It proposes 12 new Ingredient subjects, 10 new Technique subjects, and five new
Principle subjects. All others reuse established identities or remain Recipe
instructions without a new subject.

## New Ingredient subjects

| Source observation | Source | Proposed identity | Scope |
| --- | --- | --- | --- |
| Aged Manchego (12+ months) | Manchego | `ingredient/manchego` | Preserve the age specification in the Use. |
| Whole coffee beans (medium roast); Coffee | Manchego, Competition, Everyday | `ingredient/coffee-beans` | One material; roast and grind belong in Uses and controls. |
| Apricot chutney | Chicken | `ingredient/apricot-chutney` | Prepared condiment; not apricot alone. |
| Beef fillet | Steak | `ingredient/beef-fillet` | Specific cut, distinct from existing sirloin. |
| MSG | Steak | `ingredient/monosodium-glutamate` | Preserve discretionary pinch. |
| Green apples | Slaw | `ingredient/green-apple` | Preserve julienne preparation. |
| Celery leaves, optional | Slaw | `ingredient/celery-leaves` | Leaf material distinct from the stalk basis; preserve optionality. |
| Radicchio | Slaw variation | `ingredient/radicchio` | Discretionary variation, not a new baseline dose. |
| Pecorino | Slaw variation | `ingredient/pecorino` | Keep Parmesan as the separate existing alternative. |
| Calabrian chilli | Slaw variation | `ingredient/calabrian-chili` | Preserve the unspecified source form; do not infer a paste. |
| Dill | Slaw variation | `ingredient/dill` | Keep existing mint as the separate alternative. |
| Dry fino sherry alongside | Manchego refinement | `ingredient/fino-sherry` | Optional pairing, not an ingredient added to the plate or cooking sherry. |

## Existing Ingredient identities and aliases

Approve reuse of the following established identities for these observations.
Where a candidate label needs resolution, record a merge-alias to the listed
survivor rather than establishing another subject. Exact matching observations
need no duplicate Curation record. Preserve named forms in Ingredient Uses.

| Source | Observed material → established identity |
| --- | --- |
| Manchego | Good-quality honey / wildflower / thyme-origin honey → `ingredient/honey`; fresh thyme leaves → `ingredient/thyme`; optional sea salt → `ingredient/salt`. |
| Competition, Everyday | Brew and bypass water → `ingredient/water`; these are separate Uses where applicable. |
| Chicken | Bone-in, skin-on chicken thighs → `ingredient/chicken-thigh`; salt → `ingredient/salt`; black pepper → `ingredient/black-pepper`; neutral oil → `ingredient/neutral-oil`; rendered chicken fat → `ingredient/chicken-fat`; minced garlic → `ingredient/garlic`; grated ginger → `ingredient/fresh-ginger`; tomato sauce explicitly identified as ketchup → `ingredient/ketchup`; Worcestershire → `ingredient/worcestershire-sauce`; Dijon → `ingredient/dijon-mustard`; red wine vinegar → `ingredient/red-wine-vinegar`; soy sauce → `ingredient/soy-sauce`; optional brown sugar → `ingredient/brown-sugar`; smoked paprika → `ingredient/smoked-paprika`; chili flakes → `ingredient/chili-flakes`; water → `ingredient/water`. |
| Steak | Neutral/frying oil → `ingredient/neutral-oil`; garlic → `ingredient/garlic`; ginger → `ingredient/fresh-ginger`; gochujang → `ingredient/gochujang`; soy sauce → `ingredient/soy-sauce`; rice vinegar → `ingredient/rice-vinegar`; honey → `ingredient/honey`; optional Worcestershire → `ingredient/worcestershire-sauce`; kosher / Celtic grey / discretionary salt → `ingredient/salt`; potatoes → `ingredient/potato`; baby red cabbage → `ingredient/cabbage`; sesame oil → `ingredient/sesame-oil`; optional sesame seeds → `ingredient/sesame-seeds`; butter → `ingredient/butter`; smoked paprika → `ingredient/smoked-paprika`; black pepper → `ingredient/black-pepper`. |
| Slaw | Celery stalks → `ingredient/celery`; flat-leaf parsley → `ingredient/flat-leaf-parsley`; lemon juice → `ingredient/lemon-juice`; extra virgin olive oil → `ingredient/extra-virgin-olive-oil`; cider vinegar → `ingredient/apple-cider-vinegar`; toasted/crushed fennel seeds → `ingredient/fennel-seeds`; fennel pollen → `ingredient/fennel-pollen`; kosher salt → `ingredient/salt`; coarse black pepper → `ingredient/black-pepper`; variation Parmesan → `ingredient/parmesan`; chilli flakes → `ingredient/chili-flakes`; mint → `ingredient/mint`. |

The existing Chicken Thigh note currently specifies only the boneless taco
application. Extend its handling guidance to cover the source-specified
bone-in, skin-on form without changing that earlier Recipe's form or dose.

Retire candidate labels that name same-Recipe intermediates: Prepared Manchego,
Thyme Honey, Coffee Dust, brewed concentrate/slurry, seasoned or roasted chicken,
Monkey Gland Sauce, reverse-seared/rested fillet, par-cooked/finished fries,
reserved/finished gochujang sauce, charred cabbage, prepared celery/apple/herbs,
and fennel dressing. Preserve them as Phase Outputs with producing and consuming
Phases. Do not treat Coffee Dust as another Ingredient or as an alias that
conceals its Phase Output relationship.

Preserve neutral oil or rendered chicken fat as two alternative Ingredient
Uses, with the first-listed oil as primary; do not create a compound identity.
Keep all optional Uses, named variations, and the sherry pairing discretionary.

## Technique decisions

| Observed label | Source | Proposed outcome | Reason / application scope |
| --- | --- | --- | --- |
| fine grinding | Manchego | Establish `technique/fine-grinding` | Produce fine coffee powder; particle size belongs in controls. |
| sifting | Manchego | Establish `technique/sifting` | Remove coarse coffee particles with a fine sieve. |
| full-immersion brew | Everyday; Competition immersion method | Establish `technique/immersion-brewing` | Shared coffee/water contact workflow; doses, orientation, and contact times stay in each Recipe. |
| inverted AeroPress; standard AeroPress | Competition; Everyday | Retire these labels as separate subjects | Device orientation is an application control of immersion brewing, not a second brewing identity. Preserve each setup instruction. |
| controlled agitation | Competition; Everyday stirring method | Establish `technique/controlled-agitation` | Wet grounds while controlling stirring time and intensity. |
| bypass dilution | Competition | Establish `technique/bypass-dilution` | Add water after pressing to adjust beverage strength and final mass. |
| slow press; gentle press | Competition; Everyday | Establish `technique/gentle-pressing`; merge both labels into it | One controlled pressing practice; retain distinct authored press times and stop conditions. |
| salting | Chicken | Establish `technique/salting` | Apply the stated salt evenly; do not recast the short rest as a long dry-brine process. |
| oven roasting | Chicken | Establish `technique/oven-roasting` | Roast seared chicken at 200 C to its authored internal endpoint; not an alias of low roasting. |
| glazing | Chicken | Establish `technique/glazing` | Apply warm sauce once or coat over low heat; distinct from repeatedly setting lacquer layers. |
| knife slicing | Slaw | Establish `technique/knife-slicing` | Thin biased celery slices and apple matchsticks; not mandoline slicing. |
| cold assembly | Slaw | Retire as a separate Technique candidate | Chilled bowl, dressing, tossing, and short rest remain explicit Method controls. |
| infusion; searing; simmering; emulsification | Manchego; Chicken; Slaw | Reuse `technique/infusion`, `technique/searing`, `technique/simmering`, `technique/emulsification` | Established subjects. |
| low temperature baking; hibachi sear; high heat charring; double frying; paste frying | Steak | Preserve existing outcomes | Low temperature baking remains retired; use existing `technique/searing`, `technique/charring`, `technique/double-frying`, and `technique/paste-frying` for the resolved labels. |

Use established `technique/dry-toasting-spices` for the Slaw's fennel-seed
toasting Method. Preserve the Manchego coffee-powder pan refinement as authored
prose; do not equate coffee powder with whole spices or invent a demonstrated
effect. These observations need no new Technique subject beyond the list above.

## Principle decisions

New notes must explain the scoped relationship from the source, not claim
experimental proof. Preserve practical instructions even when an outcome label
is retired from the Principle namespace.

| Observed label | Source | Proposed outcome | Scope / reason |
| --- | --- | --- | --- |
| sweet-bitter contrast | Manchego | Establish `principle/sweet-bitter-contrast` | Relative honey sweetness and coffee bitterness determine the plate's sensory balance. |
| flavour threshold management | Manchego | Establish `principle/flavour-threshold-management` | Coffee dose and particle distribution determine whether roast complexity or dominant bitterness is perceived. Avoid inventing a measured sensory threshold. |
| high concentration extraction; balanced extraction | Competition; Everyday | Establish `principle/coffee-extraction`; merge both labels into it | Coffee extraction responds to water ratio, grind, temperature, agitation, and contact time; different Recipe controls remain distinct. Do not equate beverage strength with extraction yield. |
| clarity via dilution | Competition | Establish `principle/dilution-and-strength`; merge the label into it | Added water changes concentration. Describe sensory strength, not removal of fines or a demonstrated increase in extraction. |
| agitation control | Competition | Establish `principle/agitation-and-fines`; merge the label into it | Scope to the source's relationship between stirring, suspended fines, and mouthfeel; the intentional stirring practice has its separate Technique identity. |
| bitterness avoidance; sweetness preservation; repeatability | Competition; Everyday | Retire as separate Principle candidates | These are desired outcomes. Retain the source's corrective grind, agitation, press, dose, and timing controls. |
| surface drying | Chicken | Merge into existing `principle/skin-dehydration` | This source specifically dries chicken skin; the application is narrower than arbitrary surface-moisture control. |
| sweet-sour balance | Chicken | Merge into existing `principle/acid-balance` | Preserve the chutney/ketchup sweetness and vinegar adjustment in this application. |
| aromatic continuity | Slaw | Retire as a separate Principle candidate | Describes matching fennel flavour across dishes, without a distinct causal mechanism; preserve that pairing rationale in prose. |
| texture preservation | Slaw | Retire as a separate Principle candidate | Outcome label; preserve slicing, late apple preparation, chilled assembly, and short dressing/rest controls in the Method. |
| aromatic infusion; Maillard reaction; carryover cooking; protein denaturation; acid balance; textural contrast | Applicable Manchego, Chicken, Steak, and Slaw Phases | Reuse existing same-name Principle identities | Existing Curation already establishes these subjects; no duplicate identities. |
| moisture control | Steak | Preserve existing retirement | Keep drying and fry controls in the Method; do not recreate the retired broad subject. |

## Recorded grouped approval

The Curator approved the exact establish, merge-alias, retire-candidate, and
existing-subject reuse directions above for these six versions only, including preservation of
forms, alternatives, optional refinements, and variations. Then serialize
source-linked observations, exact Curation records, and substantive Knowledge
Notes using repository templates. Conversion readiness requires validation of
those records; this proposal alone does not create Curation or authorize a
production release.
