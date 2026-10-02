# Retrospective whole-Recipe evidence outline
Created: 2026-10-02

[Packet overview](README.md)

## What is actually reported

Carlo stated that all 25 recipes as recorded were successful, fully tested, and
approved for production. That is a retrospective human report covering the
whole specifications, not an agent cooking trial. The source hashes in
[the inventory](conversion-proposals.md) identify the recorded collection.

Detailed observations were supplied for Carbonara only. Do not extend its
richness, funk, al dente endpoint or absence of recalled shortcomings to the
other recipes. Their reported result is successful whole-Recipe testing and
acceptance; dish-specific tasting notes, exact trial counts, cooking dates,
measurements, equipment models, photos and variant-specific testing were not
provided. The source controls remain accepted specification, not independent
proof that every timing or temperature was measured during a past trial.

## Proposed record shape

For each proposed version, use `templates/Experiment - Template.md`, an immutable
`experiment/<recipe-key>-retrospective-whole-recipe-trial` identity, and exact
`primary_subject: {type: recipe-version, recipe: recipe/<recipe-key>, version: 1}`.
The Experiment record date is the actual evidence-recording date. Say explicitly
that the cooking date is unrecorded; never label 2026-10-02 as a known trial date.

The following is proposed evidence wording for human review, not frozen completed
evidence written by this packet:

### Hypothesis

Retrospective review expectation stated at evidence-recording time: the complete
recorded formulation and Method can produce the intended finished dish to its
specified endpoints and be accepted for use. This is not represented as a
hypothesis documented before the historical cooking. Tailor the endpoints to
the source, and keep the distinction between an intended endpoint and a
reported observation.

### Procedure

Identify the exact whole Recipe Version and reproduce or faithfully summarize
its actual recorded ingredients, quantities, work sequence and endpoints.
Attribute correspondence to Carlo's statement that the recipes as recorded
were fully tested. Cross-reference the preserved source hash and source path in
ordinary provenance prose. Do not use the summary to substitute an ingredient,
choose an alternative or omit a companion preparation. Resolve the packet's
conversion ambiguities before freezing this evidence against a draft version.

### Results

Carlo retrospectively reports successful testing of the whole recorded recipe
and approves it for production. No further recipe-specific observations were
provided, except for the Carbonara result below. Quantitative yield, timing and
temperature measurements were not supplied. Describe source yields as estimates,
not new measured Results.

### Decision

Carlo accepts the formulation as recorded for production in the full 25-recipe
batch. Proceed to normal Promotion after valid serialization, reference
resolution and applicable Curation. Technical validation does not perform the
human acceptance and does not replace the reported cooking evidence.

## Carbonara-specific evidence

The following recollections were individually confirmed before the collection
approval:

- Core formulation: 200 g dried spaghetti, 100 g guanciale, 72 g egg yolk,
  50 g whole egg and 80 g Pecorino Romano.
- Other quantities approximately confirmed: 8 g salt in 2000 g pasta-cooking
  water, 3 g black pepper and about 100 g reserved pasta water used in the sauce.
- Method confirmed generally: render guanciale, combine eggs and cheese, finish
  pasta in the guanciale pan, remove from heat before adding the egg mixture,
  and loosen with reserved pasta water.
- Reported result: “rich sauce with a bit of funk and al dente pasta”.
- Carlo confirmed the slight funk is an intended flavour to retain.
- Shortcomings: none recalled. This is a retrospective recollection, not a
  guarantee that every future cook succeeds.
- Precise timings and temperatures were not verified. Carlo chose observable
  off-heat instructions instead of requiring a fresh numeric-control trial:
  remove from heat, cool briefly, toss in the egg mixture, and add pasta water
  until glossy. Do not retain an unverified 30 s cooling requirement or roughly
  70 C pan threshold as measured evidence.

Record those limitations in the Experiment and Promotion rationale. Do not claim
measured egg temperature, exact cooling duration or a historical cooking date.

## Exact-version binding and history

Rendang clarification confirmed by Carlo on 2026-10-02: use the entire prepared
spice paste. The source's 700 g is an approximate finished weight after frying,
not a separate measured portion. Record that clarification when preparing the
exact draft and its retrospective procedure; do not claim a measured paste yield.

Component-portion clarification confirmed by Carlo on 2026-10-02: prepare each
component as recorded, consume the specified assembly portion and identify any
unused remainder as leftover. The confirmed portions are 600 g pasta, 1500 g
ragù and 1000 g béchamel in lasagna, 240 g caramelised onion on pizza, 120 g miso
butter on sprouts, 180 g prepared pecans in maple ice cream and 150 g ripple in
salted caramel ice cream. Do not claim a measured total output or invent the
weight of any leftover from raw input arithmetic.

Curry chicken representation confirmed by Carlo on 2026-10-02: retain one 1200 g
Ingredient Use and scale basis referencing proposed `ingredient/chicken`, with
bone-in thighs and drumsticks described in the Use. Their individual weights
and proportions are unrecorded and remain flexible, rather than invented.

Carne Asada beef representation confirmed by Carlo on 2026-10-02: retain one
800 g Ingredient Use and scale basis referencing proposed `ingredient/beef`,
with skirt or flank as options in the Use. Do not silently require one cut.

Carne Asada salsa representation confirmed by Carlo on 2026-10-02: retain
200 g salsa of the cook's choice, referencing proposed `ingredient/salsa`,
without claiming a particular salsa formula was required in the cooking trial.

Nachos component handling confirmed by Carlo on 2026-10-02: cheese sauce,
Peppadew salsa and lime crema remain separately prepared companion Recipes.
Declare their recorded portions as Ingredient Uses in Nachos and link the
preparation Recipes in Methods; do not duplicate their preparation as local
Nachos Phases or pretend they are internally produced Phase Outputs.

This outline covers the approved recorded formulations, with the explicit
Carbonara treatment. Converting layout and recalculating scaling do not by
themselves create a new culinary formulation. Resolving conflicting component
amounts or selecting a different ingredient may do so; obtain the human
resolution before freezing the draft/evidence pair. Once a Completed Experiment
targets a Recipe Draft or one of its Ingredient Uses, any subsequent Culinary
Change creates the next draft version and the existing evidence does not
silently follow it.

Preserve all exact drafts and their reviewed evidence in an earlier Git revision
before Promotion, as required by `docs/release-gate.md`. Each Promotion Record
names that exact Recipe Version, this matching whole-Recipe Completed Experiment,
Carlo, the actual applicable acceptance date, rationale and known reporting
limitations. Carlo's acceptance statement was made on 2026-10-02; if a materially
changed formulation is accepted later, use its real later acceptance date.

## Proposed Experiment and Promotion inventory

| Exact proposed subject | Proposed Experiment identity | Future Promotion record | Reported outcome |
| --- | --- | --- | --- |
| `recipe/air-fryer-roast-potatoes@1` | `experiment/air-fryer-roast-potatoes-retrospective-whole-recipe-trial` | `records/promotions/air-fryer-roast-potatoes@1.md` | Successful, fully tested whole recorded recipe; Carlo approves production. |
| `recipe/banana-desiccated-coconut-curry-accompaniment@1` | `experiment/banana-desiccated-coconut-curry-accompaniment-retrospective-whole-recipe-trial` | `records/promotions/banana-desiccated-coconut-curry-accompaniment@1.md` | Successful, fully tested whole recorded recipe; Carlo approves production. |
| `recipe/beef-rendang@1` | `experiment/beef-rendang-retrospective-whole-recipe-trial` | `records/promotions/beef-rendang@1.md` | Successful, fully tested whole recorded recipe; Carlo approves production. |
| `recipe/black-bean-corn-mint-peppadew-salsa@1` | `experiment/black-bean-corn-mint-peppadew-salsa-retrospective-whole-recipe-trial` | `records/promotions/black-bean-corn-mint-peppadew-salsa@1.md` | Successful, fully tested whole recorded recipe; Carlo approves production. |
| `recipe/butter-braised-leeks@1` | `experiment/butter-braised-leeks-retrospective-whole-recipe-trial` | `records/promotions/butter-braised-leeks@1.md` | Successful, fully tested whole recorded recipe; Carlo approves production. |
| `recipe/carbonara@1` | `experiment/carbonara-retrospective-whole-recipe-trial` | `records/promotions/carbonara@1.md` | Rich sauce, intended slight funk, al dente pasta; no shortcomings recalled. |
| `recipe/carne-asada-tacos@1` | `experiment/carne-asada-tacos-retrospective-whole-recipe-trial` | `records/promotions/carne-asada-tacos@1.md` | Successful, fully tested whole recorded recipe; Carlo approves production. |
| `recipe/chicken-nachos@1` | `experiment/chicken-nachos-retrospective-whole-recipe-trial` | `records/promotions/chicken-nachos@1.md` | Successful, fully tested whole recorded recipe; Carlo approves production. |
| `recipe/chunky-tomato-burger-sauce@1` | `experiment/chunky-tomato-burger-sauce-retrospective-whole-recipe-trial` | `records/promotions/chunky-tomato-burger-sauce@1.md` | Successful, fully tested whole recorded recipe; Carlo approves production. |
| `recipe/creme-fraiche-lime-crema@1` | `experiment/creme-fraiche-lime-crema-retrospective-whole-recipe-trial` | `records/promotions/creme-fraiche-lime-crema@1.md` | Successful, fully tested whole recorded recipe; Carlo approves production. |
| `recipe/fennel-sausage-caramelised-red-onion-roman-style-pizza@1` | `experiment/fennel-sausage-caramelised-red-onion-roman-style-pizza-retrospective-whole-recipe-trial` | `records/promotions/fennel-sausage-caramelised-red-onion-roman-style-pizza@1.md` | Successful, fully tested whole recorded recipe; Carlo approves production. |
| `recipe/home-style-chicken-curry-with-coconut-milk-potatoes-peas@1` | `experiment/home-style-chicken-curry-with-coconut-milk-potatoes-peas-retrospective-whole-recipe-trial` | `records/promotions/home-style-chicken-curry-with-coconut-milk-potatoes-peas@1.md` | Successful, fully tested whole recorded recipe; Carlo approves production. |
| `recipe/lasagna-bolognese-with-bechamel@1` | `experiment/lasagna-bolognese-with-bechamel-retrospective-whole-recipe-trial` | `records/promotions/lasagna-bolognese-with-bechamel@1.md` | Successful, fully tested whole recorded recipe; Carlo approves production. |
| `recipe/malted-milk-chocolate-ice-cream-with-lindt-milk-chocolate-milo@1` | `experiment/malted-milk-chocolate-ice-cream-with-lindt-milk-chocolate-milo-retrospective-whole-recipe-trial` | `records/promotions/malted-milk-chocolate-ice-cream-with-lindt-milk-chocolate-milo@1.md` | Successful, fully tested whole recorded recipe; Carlo approves production. |
| `recipe/maple-bourbon-butter-pecan-ice-cream@1` | `experiment/maple-bourbon-butter-pecan-ice-cream-retrospective-whole-recipe-trial` | `records/promotions/maple-bourbon-butter-pecan-ice-cream@1.md` | Successful, fully tested whole recorded recipe; Carlo approves production. |
| `recipe/mint-chutney@1` | `experiment/mint-chutney-retrospective-whole-recipe-trial` | `records/promotions/mint-chutney@1.md` | Successful, fully tested whole recorded recipe; Carlo approves production. |
| `recipe/miso-butter-for-roasted-brussels-sprouts@1` | `experiment/miso-butter-for-roasted-brussels-sprouts-retrospective-whole-recipe-trial` | `records/promotions/miso-butter-for-roasted-brussels-sprouts@1.md` | Successful, fully tested whole recorded recipe; Carlo approves production. |
| `recipe/nacho-cheese-sauce@1` | `experiment/nacho-cheese-sauce-retrospective-whole-recipe-trial` | `records/promotions/nacho-cheese-sauce@1.md` | Successful, fully tested whole recorded recipe; Carlo approves production. |
| `recipe/pressure-cooker-black-beans-for-tacos@1` | `experiment/pressure-cooker-black-beans-for-tacos-retrospective-whole-recipe-trial` | `records/promotions/pressure-cooker-black-beans-for-tacos@1.md` | Successful, fully tested whole recorded recipe; Carlo approves production. |
| `recipe/pressure-cooker-charro-beans@1` | `experiment/pressure-cooker-charro-beans-retrospective-whole-recipe-trial` | `records/promotions/pressure-cooker-charro-beans@1.md` | Successful, fully tested whole recorded recipe; Carlo approves production. |
| `recipe/salsa-verde@1` | `experiment/salsa-verde-retrospective-whole-recipe-trial` | `records/promotions/salsa-verde@1.md` | Successful, fully tested whole recorded recipe; Carlo approves production. |
| `recipe/salted-caramel-ice-cream-with-salted-caramel-ripple@1` | `experiment/salted-caramel-ice-cream-with-salted-caramel-ripple-retrospective-whole-recipe-trial` | `records/promotions/salted-caramel-ice-cream-with-salted-caramel-ripple@1.md` | Successful, fully tested whole recorded recipe; Carlo approves production. |
| `recipe/tamarind-chutney@1` | `experiment/tamarind-chutney-retrospective-whole-recipe-trial` | `records/promotions/tamarind-chutney@1.md` | Successful, fully tested whole recorded recipe; Carlo approves production. |
| `recipe/tomato-onion-curry-chutney@1` | `experiment/tomato-onion-curry-chutney-retrospective-whole-recipe-trial` | `records/promotions/tomato-onion-curry-chutney@1.md` | Successful, fully tested whole recorded recipe; Carlo approves production. |
| `recipe/vanilla-bean-ice-cream@1` | `experiment/vanilla-bean-ice-cream-retrospective-whole-recipe-trial` | `records/promotions/vanilla-bean-ice-cream@1.md` | Successful, fully tested whole recorded recipe; Carlo approves production. |
