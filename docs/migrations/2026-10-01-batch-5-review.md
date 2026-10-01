# Batch 5 conversion review

Issue: [#25](https://github.com/ironicbuddha/my-recipe-book/issues/25)

## Recorded authority

On 2026-10-01, Carlo Kruger, Curator, approved the six exact source, identity,
integer-version, and retain-canonical mappings in the Batch 5 migration packet.
The approval covers the listed direct legacy redirects and grandfathering only
for historical Experiment evidence and Promotion Records of those exact versions.
`records/migrations/batch-5.md` serializes that decision; its six legacy source
snapshots preserve the approved reconstruction evidence byte for byte.

The Curator also approved the AeroPress yield and cabbage timing corrections
below and the grouped Knowledge Curation proposal on 2026-10-01. The exact
Curation decisions are serialized under `records/curation/batch-5-*.md`.
Recipe conversion and local checks are complete; remote preview verification and
production release remain pending.

## Conversion and review evidence

The six retained Canonical Recipes now use integer version 1, immutable typed
identities, phase-local Ingredient Uses and knowledge relationships, intermediate
Phase Outputs, and Failure Modes tables. Numeric percentages were recalculated
from the preserved measured basis masses with two-decimal halfway-up rounding.
The two-head cabbage count remains explicit in its non-mass Use; no mass was
invented. Optional ingredients, named alternatives, variations, and the sherry
pairing are retained. Only the approved yield, cabbage timing, and steak removal
timing corrections change the source cooking directions.

All six snapshots were checked byte for byte against the original source at
`ea412d4692445db1c29c6649fb41f0f7d3492952`. There are 27 new Knowledge Notes and
57 exact Curation records. Missing candidate observations were recorded without
changing existing candidate evidence or reopening previously retired labels.

The validator and extractor now recognize explicitly named additions under
VARIATIONS and OPTIONAL REFINEMENTS, plus the source's explicit beverage-pairing
wording. They do not treat arbitrary prose in other sections as observation
evidence. Regression coverage removes actual source observations and confirms
that an unrelated-section mention cannot satisfy Curation. The Python extractor
also checks named alternatives and Markdown labels in an executable fixture.

A local rendered-page check caught an inherited layout rule that applied
quantity formatting to Technique controls and purpose columns. The publisher
now derives semantic table classes; numeric alignment is limited to Ingredient
Use quantities/scaling, and Technique names retain readable column width.
Canonical Markdown contains no presentation classes.

Deployed verification caught missing heading targets for the publisher's phase
navigation. The renderer and run-sheet now share the same heading ID function;
regression coverage checks every phase target across all published Recipes.

Review scope: the complete Batch 5 change against `ea412d4`, including all new
records and snapshots. Standards and specification reviews were performed
sequentially in the main thread as required by the project tool mapping.
The review corrected an over-broad “use all” instruction for coffee dust and
retained light honey and dressing application. No unresolved code, identity,
scaling, or scope defects remain. Remote preview verification and Curator visual
acceptance remain pending.

Local verification passed: `make validate` (30 Recipes, 295 Knowledge Notes,
0 Completed Experiments), `pnpm check`, and the sequential `pnpm release:verify`
gate (67 tests plus lint, typecheck, content validation, build, and output
integrity). An earlier parallel build/test run collided over `dist`; its result
was discarded in favour of the successful sequential gate. Content validation
was rerun after the separately approved steak removal correction, and the final
site build was refreshed for that exact content. The sequential gate was rerun
after the phase navigation fix.

## Additional steak removal correction — approved 2026-10-01

Final comparison found that removing steak from refrigeration 45 min before
18:30 service means 17:45, while the illustrative clock schedule salts it at
17:30. A correction to removal at 17:30 (60 min before service), retaining all
oven, sear, rest, and temperature controls, was explicitly approved by the
Curator on 2026-10-01 and applied. The original instruction remains in the exact
source snapshot; the canonical Method now removes the steak at 17:30. Service
clock times remain illustrative.

## AeroPress yield correction — approved 2026-10-01

The Competition Cup specifies 18 g coffee, a 105 g baseline brew-water dose
(90–120 g permitted), and 95–115 g bypass water, then claims a 200–220 g
beverage. That arithmetic treats all brew water as recovered concentrate and
does not account for liquid retained in the grounds. No measured recovery is
recorded. The Everyday Cup similarly labels 230 g input water as approximately
230 g finished beverage without measured recovery evidence.

Carlo Kruger, Curator, explicitly approved the following correction:

- Keep both coffee doses, brew-water doses, temperatures, agitation, steep times,
  and press times as authored.
- For Competition Cup, use the actual pressed-concentrate mass and add bypass
  water to a final beverage mass of 200–220 g. Preserve the original 95–115 g
  bypass amount as legacy evidence, not a guaranteed dose compatible with the
  target yield.
- For Everyday Cup, describe one cup brewed with 230 g water, with finished
  beverage mass dependent on retained liquid. Do not invent a recovery value.

This approval authorizes the stated correction during Batch 5 conversion; it
does not assert measured recovery, Completed Experiment evidence, or Promotion.

## Steak service-timeline correction — approved 2026-10-01

The cabbage Method specifies 3–4 min per side, but its timeline starts at 18:10,
flips at 18:14, and removes it at 18:16. The second side receives only 2 min in
that timeline. The steak's sear is scheduled on the same hibachi at 18:16–18:18.

Carlo Kruger, Curator, explicitly approved this correction: preserve the Method's durations and tenderness endpoint;
start cabbage at 18:08, flip around 18:12, and finish by approximately 18:16,
before the steak sear. Preserve the 18:30 service goal, the steak's 46–48 C
oven endpoint, 52–54 C final target, and 10 min rest. Treat the run-sheet as
illustrative and let temperatures and tenderness govern actual completion.
This approval authorizes the stated timing correction during Batch 5 conversion.
It does not assert a completed cooking trial.

## Completed Knowledge review

The registry already resolves all direct Technique and Principle labels on the
Reverse-Seared Fillet, including retirement of low temperature baking and
moisture control. Keep their practical controls in the Method rather than
recreating retired subjects. Existing subjects also cover infusion, aromatic
infusion, searing, simmering, emulsification, acid balance, Maillard reaction,
and carryover cooking where applicable.

The grouped proposal resolved the following frontmatter labels. Exact decisions
are in the `batch-5-` Curation records; surviving identities and retirements are
listed in `2026-10-01-batch-5-curation-proposal.md`:

| Source | Technique labels | Principle labels |
| --- | --- | --- |
| Manchego | fine grinding; sifting | sweet-bitter contrast; flavour threshold management |
| Competition Cup | inverted AeroPress; controlled agitation; bypass dilution; slow press | high concentration extraction; clarity via dilution; agitation control; bitterness avoidance |
| Everyday Cup | standard AeroPress; full-immersion brew; gentle press | balanced extraction; sweetness preservation; repeatability |
| Monkey Gland Chicken | salting; oven roasting; glazing | surface drying; sweet-sour balance |
| Slaw | knife slicing; cold assembly | aromatic continuity; texture preservation |

Both AeroPress sources were reviewed jointly. Their brewing, agitation, and
pressing applications share subjects without losing distinct controls. The
approved Ingredient review includes all table materials, alternatives, optional
refinements, and variations. Prepared foods remain Phase Outputs; no compound
material identities were introduced.
