# Recipes-tmp production review packet
Created: 2026-10-02

## Purpose and authority

Prepare all 25 existing `recipes-tmp/*.md` specifications for one production
release on the existing Astro/Vercel site. This packet is a source inventory and
conversion plan, with Carlo's accepted Curation proposal. It is not a set of
canonical Recipes, Completed Experiments, per-subject Curation records, or
Promotion Records. Preparation is authorized; implementation and publication
have not been started by this packet.

Carlo explicitly stated during the 2026-10-02 grilling conversation:

> the recipes as recorded were all succesful and fully tested so we can deem them approved for production

This is the human culinary approval for the recorded collection, including
files whose older reconstruction notes call them uncertain or in development.
Do not reinterpret those older notes as revoking this current decision. Retain
source provenance; attribute successful testing to Carlo's retrospective report.
The statement does not supply individual cooking dates, machine measurements,
or detailed outcomes for the other 24 recipes. Do not invent those details.

The approval applies to the culinary formulations as recorded, plus the
explicitly agreed Carbonara treatment below. It does not resolve a contradictory
quantity by granting the agent authority to choose a different formulation.
Any necessary Culinary Change is presented to Carlo with its affected exact
Recipe Version and evidence implications.

## Settled decisions

| Decision | Agreed approach | Provenance |
| --- | --- | --- |
| Evidence | Review real past cooking; use retrospective whole-Recipe evidence rather than require 25 fresh trials. | session-settled: user-approved — retrospective evidence chosen after considering fresh trials |
| Release scope | All 25 together; no partial production batch. | session-settled: user-directed — chosen over small releases |
| Culinary acceptance | All specifications as recorded were successfully tested and approved by Carlo. | Explicit Curator statement quoted above |
| Carbonara | Retain confirmed quantities and intended slight funk; replace unverified precise cooling controls with observable instructions. | session-settled: user-approved — chosen over a fresh trial of numeric controls |
| Knowledge | Reuse applicable existing subjects; Carlo accepted the consolidated 63-Ingredient/three-Technique establishment proposal after the ambiguous representations were resolved. | session-settled: user-approved — concrete Curation proposal accepted on 2026-10-02 |
| Images | Deliver 25 prompts; actual images are optional and need not delay release. | session-settled: user-directed — added prompt requirement to optional-image decision |
| Prompt style | Modernist Cuisine reference photography, pale background, even light, crisp focus, 3:2 frame, recipe-faithful subject. | session-settled: user-approved — established style retained |

## Packet contents

- [Inventory and conversion proposals](conversion-proposals.md): exact source
  hashes, proposed identities, versions, routes, scale bases, Phase order,
  intermediate handling, and proposed Failure Modes for every recipe.
- [Accepted consolidated Curation proposal](curation-proposal.md): every ingredient label,
  proposed typed target or Phase Output treatment, material alternatives,
  new-subject note briefs, and Technique/Principle reuse.
- [Retrospective evidence outline](evidence-outline.md): truthful per-version
  evidence shape and the more detailed Carbonara recollection.
- [Image prompts](image-prompts.md): 25 complete, dish-specific prompts outside
  canonical Recipe Markdown.

## Conversion rules

1. Preserve original sources byte-for-byte during preparation and retain the
   source hashes in the inventory. Do not clean up `recipes-tmp` or `resume.txt`.
2. Use `templates/Recipe - Template.md` and `docs/authoring-contract.md`.
   Proposed new identities start at version 1; check the full graph for
   collisions again immediately before writing them.
3. Use the conversion date as the record date if no historical date is known;
   explicitly distinguish that date from the cooking date in evidence. The
   proposed canonical filename is `2026-10-02 - <title>.md` if authored on that
   date; use the actual later authoring date if preparation happens later.
   Identity and route do not change with that filename date.
4. Keep quantities and endpoints; normalize `°C` to `C`, `sec` to `s`, and
   numeric liquid yield units `mL` to `ml`. Do not convert authored liquid
   masses in `g` to `ml` without density evidence.
5. Recalculate all Ingredient Use percentages against the single proposed
   Recipe-level mass basis, exactly two decimals, halfway rounding up. Split
   basis Uses must total its basis mass. Do not count prepared components again
   as raw ingredients. Keep first-use placement and explicit intermediate
   producers and consumers.
6. Preserve ingredient alternatives rather than silently choose one. Each
   alternative must resolve to an appropriate Ingredient subject; the chosen
   scale basis must remain truthful for both options. An unresolved mixed
   chicken cut or alternative beef basis is an explicit review item.
7. Organize work into dependency-ordered Phases, with Phase-local Technique
   Applications and explanatory Principles only where the source supports
   them. No body H1, recipe-wide technique/principle lists, presentation fields,
   or authored lifecycle flags.
8. Retain useful controls and cooking notes in Methods or Failure Modes.
   Omit speculative Story prose from authoritative explanations. Put historical
   reconstruction limitations in evidence/provenance rather than as live draft
   flags. Existing variations are retained as clearly labeled alternatives in
   relevant Methods when compatible with the contract; do not claim each was
   independently tested or promoted on the strength of the base formulation.
9. Proposed Failure Modes in this packet are troubleshooting guidance, not
   observations that a trial failed. Human review confirms culinary suitability.

## Review items

The source inventory identifies these conversion questions; they do not reopen
Carlo's overall culinary acceptance:

- **A1 — Rendang paste, resolved by Carlo on 2026-10-02:** use the entire
  prepared spice paste. The 800 g raw inputs produce approximately 700 g after
  frying; 700 g is a finished-weight estimate, not a weighed portion or a
  measured trial result. Carry all of the fried-paste Phase Output into the
  beef-cooking Phase. Preserve the original source unchanged.
- **A2 — Component portions and leftovers, resolved by Carlo on 2026-10-02:**
  prepare components as recorded, use the stated assembly portions, and identify
  any unused remainder as leftover. Retain 600 g pasta, 1500 g ragù and 1000 g
  béchamel for lasagna; 240 g caramelised onion for pizza; 120 g miso butter for
  sprouts; 180 g prepared pecans for maple ice cream; and 150 g caramel ripple
  for salted caramel ice cream. Lasagna makes 654 g pasta dough and
  1172 g nominal béchamel input but declares 600 g pasta and 1000 g béchamel in
  assembly. Pizza dough inputs total 744 g; onion input becomes a 240 g portion.
  Miso butter inputs total 210 g but only 120 g is used. Maple pecan inputs total
  277 g before cooking but only 180 g is folded in; caramel ripple inputs total
  393 g before cooking but only 150 g is layered. State selected portions and
  retained leftovers; never scale preparations down silently or equate raw
  input mass with measured finished mass.
- **A3 — Multi-cut and alternative material identities, partly resolved:**
  Carlo confirmed on 2026-10-02 that the curry retains one combined 1200 g
  Ingredient Use referencing proposed `ingredient/chicken`, with bone-in thighs
  and drumsticks described in the Use and no invented split or fixed proportions.
  Use that same general chicken subject as its 1200 g scale basis. Carlo also
  confirmed one 800 g Use and scale basis for tacos referencing proposed
  `ingredient/beef`, with skirt or flank described as options in the Use.
  Other alternatives (duck fat/oil, cheddar/Monterey Jack, shallot/red onion,
  jaggery/dark brown sugar, malt/cider vinegar) are enumerated in Curation.
- **A4 — External prepared components, resolved by Carlo on 2026-10-02:**
  Chicken Nachos retains separately prepared cheese sauce, Peppadew salsa and
  lime crema. Declare their prepared portions as Ingredient Uses, establish the
  proposed prepared-food Knowledge Notes through Curation, and link the companion
  Recipes in Methods. Keep Nachos focused on chicken cooking, assembly and
  finishing; do not duplicate those preparations as local Phases. Cooked black
  beans reuse the existing black-bean subject with prepared state in the Use.
  Carlo confirmed on 2026-10-02 that Carne Asada retains 200 g salsa of the
  cook's choice, referencing proposed `ingredient/salsa`. No specific companion
  Recipe is required for that Use; do not infer Italian or Peppadew salsa.
- **A5 — Yield estimates:** preserve source estimates as estimates. Several
  finished yield labels differ from input totals. Evaporation, drainage, unused
  components, and overrun mean arithmetic alone cannot determine finished yield.
- **A6 — Optional variations:** preserve base approval; record variation
  provenance without inventing variant-specific evidence. If a variation
  requires a different basis or substantial new method, propose a separate
  Recipe Draft rather than force it into the accepted base specification.

## Delivery sequence and owners

| Stage | Agent preparation or implementation | Human decision / completion evidence |
| --- | --- | --- |
| 1. Packet review | Complete: preserve A1–A4 decisions, source-estimate handling and recorded alternatives; carry accepted Curation into implementation. | Carlo accepted the exact 63-Ingredient/three-Technique Curation proposal on 2026-10-02. |
| 2. Authoring | After implementation authority, create Recipe Drafts, substantive approved Knowledge Notes and Curation records, and retrospective evidence from the templates. | No fabricated acceptance or experimental detail; exact source-to-draft comparison. |
| 3. Draft history | Preserve a reviewed draft/evidence revision in Git before Promotion. | History check can prove each promoted exact version was a Recipe Draft. |
| 4. Promotion | Serialize Carlo's existing acceptance for unchanged, approved formulations into exact per-version Promotion Records. | Any changed formulation requires explicit acceptance of that exact version; supporting whole-Recipe Experiments resolve. |
| 5. Preview | Run the full release gate; inspect all new routes, indexes, links, scaling and intermediate handling, plus representative desktop/mobile pages. | Concrete batch preview review; all 25 included, no draft/candidate routes. |
| 6. Production | Publish the accepted batch on the existing platform after concrete review and implementation/release authority. | Production readback of all 25 recipes and required evidence/knowledge routes; existing route/redirect/410 inventory remains correct. |

Approval of this packet alone is not a claim that those delivery stages ran.
A normal new Recipe has no historical public URL, so no new legacy redirects
are proposed. Existing migration inventories remain unchanged; grandfathering
is not the route for these recipes.

## Image-prompt integration

`scripts/hero-prompt.ts` currently reads legacy `primary_ingredient`, recipe-wide
`techniques`, and a `Primary Ingredient Basis:` body marker. During implementation,
adapt it to read canonical title, scale basis, first overview paragraph and
Phase-local applications. Read `src/lib/library.ts` rather than introduce a
second authority for typed references. Add focused regression coverage for
canonical prompt extraction and for ice cream framing: frozen scoops are not
cake cross-sections. No provider call, credential access or generated image is
part of this packet. The prompts here can be used without that tooling change.

## Release checklist

- [ ] Recount the unchanged 25 source files and verify hashes against inventory.
- [x] Resolve reviewed conversion ambiguities and approve the concrete Curation proposal.
- [ ] All 25 exact Recipe Drafts are valid and preserve accepted culinary meaning.
- [ ] Approved knowledge subjects have substantive notes and durable Curation.
- [ ] Each exact whole Recipe Version has a complete truthful retrospective
      Experiment, including its reporting limitations.
- [ ] Preserve draft and evidence history before Promotion; completed evidence
      remains immutable and Culinary Changes create a new draft version.
- [ ] All 25 exact Promotion Records reflect Carlo's applicable acceptance.
- [ ] All 25 image prompts exist, are recipe-faithful and remain outside canonical
      Markdown; a missing image does not block publication.
- [ ] `make validate`, lint, type checking, complete tests/coverage, and fresh
      build pass via `pnpm release:verify`; no skip counts as a passing check.
- [ ] Full preview batch review verifies every new recipe/evidence route and
      required new Knowledge Note route, graph links, readable tables and scaling.
- [ ] Record accepted preview revision and retain the previous production artifact.
- [ ] Publish all 25 together; verify production titles, content and route status.
- [ ] Check existing canonical routes, one-hop redirects and HTTP 410 withdrawals.
- [ ] If readback is wrong, preserve evidence and restore the previous deployment
      rather than repeatedly publish an uncertain revision.

## Sources and current checks

Inspected repository revision: `dd7f38dccf1425fae4ba9bf16a08e73e272b4873`.
Issue #27 is closed: the foundation cutover is already complete. The previous
migration's Batch 5 status is not a gate for this new intake.

Authoritative references: `AGENTS.md`, `CONTEXT.md`, `docs/authoring-contract.md`,
`docs/adr/0001-human-controlled-evidence-backed-promotion.md`,
`docs/adr/0002-decouple-culinary-identity-from-presentation.md`,
`docs/release-gate.md`, `docs/acceptance/issue-26-normal-promotion.md`, the templates,
`src/lib/library.ts`, and `scripts/hero-prompt.ts`.

Preparation verification on 2026-10-02:

- `make validate` passed for the unchanged authoritative library: 30 Recipes,
  295 Knowledge Notes and 1 Completed Experiment.
- Markdown lint passed for all five packet documents with zero errors.
- Packet checks confirmed 25 source hashes, 25 conversion sections, 25 proposed
  evidence bindings, 25 complete image prompts and working local document links.
- The Curation table covers all 179 distinct ingredient labels observed in the
  source ingredient tables, including 52 ordinary new Ingredient proposals.
- No canonical content, lifecycle record, source recipe, image or production
  deployment was changed. The unrelated untracked `resume.txt` remains present.

These checks verify preparation and the existing library; they do not establish
that the proposed new batch passes its eventual release gate.

## Current handoff

Packet review is complete. All 25 source formulations have Carlo's culinary
acceptance; the reviewed conversion representations and 66 new knowledge
subject scopes are accepted. Preserve source yield estimates as estimates and
recorded alternatives as alternatives. Do not invent variation-specific trial
details. The next action is implementation of this accepted packet, followed by
full-batch preview review and production publication. No implementation, Git
commit, remote push or deployment is claimed by this handoff.
