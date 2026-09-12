# Recipe Migration Inventory and Curator Review Packets

Date: 2026-09-12

Issue: [#20](https://github.com/ironicbuddha/my-recipe-book/issues/20)

Source snapshot: `fef4e74` (`origin/main` on 2026-09-12)

## Status and boundary

This is a review proposal, not a `grandfathering-inventory` record. It grants no
exemption, imports no source, creates no Canonical Recipe, and records no
Curation, acceptance, Promotion, retirement, or withdrawal decision. Only a
Curator can approve an exact grandfathering inventory after review.

The source snapshot contains 31 direct legacy Recipe files. The completed
Singapore Chicken Rice pilot is accounted for separately below; the 30 remaining
files fit exactly into five fixed batches of six. No batch expansion is proposed.
If a source is added, removed, or found to have another legacy public URL, this
packet is stale and the discrepancy must be resolved before approval rather than
silently adding it to a batch.

Every proposed Recipe identity, version mapping, disposition, and route outcome
below is provisional. “Retain canonical” means the proposed target after a
successful mechanical conversion and a Curator-approved grandfathering row; it
does not assert that the source is Canonical today. “Move to draft” means no
public route is proposed until later evidence and Promotion.

## Accounted pilot

| Source file                                      | Approved mapping                  | Legacy public URL                             | Status                                                                                                                                                                                       |
| ------------------------------------------------ | --------------------------------- | --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `recipes/2026-02-19 - Singapore Chicken Rice.md` | `recipe/singapore-chicken-rice@1` | `/recipes/2026-02-19-singapore-chicken-rice/` | Completed pilot. Its sole approved grandfathering row and redirect live in `records/migrations/first-pilot.md` and `publisher/recipe-routes.json`. Excluded from the five remaining batches. |

The pilot's approved Knowledge Notes and Curation records are evidence for that
pilot only. They do not approve a subject, alias, duplicate reconciliation, or
Recipe mapping for a remaining source.

## Complete remaining-source inventory

Legacy routes are reproduced from the former filename-slug algorithm: NFKD
normalization, diacritic removal, lowercase, `&` to `and`, non-alphanumeric
runs to one hyphen, and a `/recipes/` prefix. Each row has exactly one observed
legacy source and URL. The integer mapping preserves the one extant legacy
version as the initial migrated version; it is not a claim about unavailable
revision history.

| Batch | Source file                                                                                              | Legacy version | Proposed identity                                                               | Mapped version | Proposed disposition | Proposed route outcome                                                                                          |
| ----- | -------------------------------------------------------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------- | -------------: | -------------------- | --------------------------------------------------------------------------------------------------------------- |
| 1     | `recipes/2026-02-19 - Cherry Pie.md`                                                                     | v2.0           | `recipe/sour-cherry-pie`                                                        |              2 | retain-canonical     | redirect `/recipes/2026-02-19-cherry-pie/`                                                                      |
| 1     | `recipes/2026-02-19 - Flapjacks (American Pancakes).md`                                                  | v1.0           | `recipe/flapjacks-american-pancakes`                                            |              1 | retain-canonical     | redirect `/recipes/2026-02-19-flapjacks-american-pancakes/`                                                     |
| 1     | `recipes/2026-02-19 - Maple Pecan Pie.md`                                                                | v3.0           | `recipe/maple-pecan-pie`                                                        |              3 | retain-canonical     | redirect `/recipes/2026-02-19-maple-pecan-pie/`                                                                 |
| 1     | `recipes/2026-02-19 - Masterclass Chocolate Brownie.md`                                                  | v1.3           | `recipe/masterclass-chocolate-brownie`                                          |              1 | retain-canonical     | redirect `/recipes/2026-02-19-masterclass-chocolate-brownie/`                                                   |
| 1     | `recipes/2026-02-23 - Sourdough Bread.md`                                                                | v1.0           | `recipe/sourdough-bread`                                                        |              1 | retain-canonical     | redirect `/recipes/2026-02-23-sourdough-bread/`                                                                 |
| 1     | `recipes/2026-02-27 - Hash Brownies.md`                                                                  | v1.0           | `recipe/hash-brownies`                                                          |              1 | move-to-draft        | no redirect decision until Curator resolves scope and relationship to the Masterclass Chocolate Brownie source  |
| 2     | `recipes/2026-02-19 - Bún bò nướng (Grilled Beef with Rice Noodles).md`                                  | v1.0           | `recipe/bun-bo-nuong`                                                           |              1 | retain-canonical     | redirect `/recipes/2026-02-19-bun-bo-nuong-grilled-beef-with-rice-noodles/`                                     |
| 2     | `recipes/2026-02-19 - Bún chả (Hanoi Grilled Pork with Noodles).md`                                      | v1.0           | `recipe/bun-cha`                                                                |              1 | retain-canonical     | redirect `/recipes/2026-02-19-bun-cha-hanoi-grilled-pork-with-noodles/`                                         |
| 2     | `recipes/2026-02-19 - Fried Master Stock Chicken.md`                                                     | v1.0           | `recipe/fried-master-stock-chicken`                                             |              1 | retain-canonical     | redirect `/recipes/2026-02-19-fried-master-stock-chicken/`                                                      |
| 2     | `recipes/2026-02-19 - Lao Herbaceous Chicken Noodle Soup.md`                                             | v1.0           | `recipe/lao-herbaceous-chicken-noodle-soup`                                     |              1 | retain-canonical     | redirect `/recipes/2026-02-19-lao-herbaceous-chicken-noodle-soup/`                                              |
| 2     | `recipes/2026-03-03 - Asian Chicken Noodle Soup.md`                                                      | v2.0           | `recipe/asian-ginger-chicken-noodle-soup`                                       |              2 | retain-canonical     | redirect `/recipes/2026-03-03-asian-chicken-noodle-soup/`                                                       |
| 2     | `recipes/2026-02-19 - Spicy Korean Fried Chicken.md`                                                     | v1.0           | `recipe/spicy-korean-fried-chicken`                                             |              1 | retain-canonical     | redirect `/recipes/2026-02-19-spicy-korean-fried-chicken/`                                                      |
| 3     | `recipes/2026-02-19 - Grilled Pork Al Pastor.md`                                                         | v1.0           | `recipe/grilled-pork-al-pastor`                                                 |              1 | retain-canonical     | redirect `/recipes/2026-02-19-grilled-pork-al-pastor/`                                                          |
| 3     | `recipes/2026-02-19 - Hibachi Pork with Charred Greens & Spanish Green Sauce.md`                         | v1.0           | `recipe/hibachi-pork-charred-greens-spanish-green-sauce`                        |              1 | retain-canonical     | redirect `/recipes/2026-02-19-hibachi-pork-with-charred-greens-and-spanish-green-sauce/`                        |
| 3     | `recipes/2026-02-19 - Italian Sausages with Puy Lentils.md`                                              | v1.0           | `recipe/italian-sausages-puy-lentils`                                           |              1 | retain-canonical     | redirect `/recipes/2026-02-19-italian-sausages-with-puy-lentils/`                                               |
| 3     | `recipes/2026-02-19 - Guanciale, Olive & Chili Pasta Sauce.md`                                           | v1.0           | `recipe/guanciale-olive-chili-pasta-sauce`                                      |              1 | retain-canonical     | redirect `/recipes/2026-02-19-guanciale-olive-and-chili-pasta-sauce/`                                           |
| 3     | `recipes/2026-05-29 - Porchetta-with-fennel-pollen-and-salsa-verde.md`                                   | v1.0           | `recipe/porchetta-fennel-pollen-salsa-verde`                                    |              1 | retain-canonical     | redirect `/recipes/2026-05-29-porchetta-with-fennel-pollen-and-salsa-verde/`                                    |
| 3     | `recipes/2026-05-29 - Soy-garlic-sesame-gochujang-hibachi-chicken-tacos.md`                              | v1.0           | `recipe/soy-garlic-sesame-gochujang-hibachi-chicken-tacos`                      |              1 | retain-canonical     | redirect `/recipes/2026-05-29-soy-garlic-sesame-gochujang-hibachi-chicken-tacos/`                               |
| 4     | `recipes/2026-02-19 - Cowboy Beans.md`                                                                   | v1.0           | `recipe/cowboy-beans`                                                           |              1 | retain-canonical     | redirect `/recipes/2026-02-19-cowboy-beans/`                                                                    |
| 4     | `recipes/2026-02-19 - Gratin Dauphinois.md`                                                              | v1.0           | `recipe/gratin-dauphinois`                                                      |              1 | retain-canonical     | redirect `/recipes/2026-02-19-gratin-dauphinois/`                                                               |
| 4     | `recipes/2026-02-19 - Tomato Bredie.md`                                                                  | v2.0           | `recipe/tomato-bredie`                                                          |              2 | retain-canonical     | redirect `/recipes/2026-02-19-tomato-bredie/`                                                                   |
| 4     | `recipes/2026-02-19 - Traditional Greek Lentil Soup (Fakes).md`                                          | v1.0           | `recipe/traditional-greek-lentil-soup-fakes`                                    |              1 | retain-canonical     | redirect `/recipes/2026-02-19-traditional-greek-lentil-soup-fakes/`                                             |
| 4     | `recipes/2026-02-21 - Creamy Porcini Mushroom Ragout with Polenta.md`                                    | v1.0           | `recipe/creamy-porcini-mushroom-ragout-polenta`                                 |              1 | retain-canonical     | redirect `/recipes/2026-02-21-creamy-porcini-mushroom-ragout-with-polenta/`                                     |
| 4     | `recipes/2026-02-24 - Spanish Chicken and Chorizo Stew.md`                                               | v1.0           | `recipe/spanish-chicken-chorizo-stew`                                           |              1 | retain-canonical     | redirect `/recipes/2026-02-24-spanish-chicken-and-chorizo-stew/`                                                |
| 5     | `recipes/2026-02-19 - Manchego with Thyme-Infused Honey and Coffee Dust.md`                              | v1.0           | `recipe/manchego-thyme-infused-honey-coffee-dust`                               |              1 | retain-canonical     | redirect `/recipes/2026-02-19-manchego-with-thyme-infused-honey-and-coffee-dust/`                               |
| 5     | `recipes/2026-02-25 - AeroPress Competition Cup.md`                                                      | v1.0           | `recipe/aeropress-competition-cup`                                              |              1 | retain-canonical     | redirect `/recipes/2026-02-25-aeropress-competition-cup/`                                                       |
| 5     | `recipes/2026-02-25 - AeroPress Everyday Cup.md`                                                         | v1.0           | `recipe/aeropress-everyday-cup`                                                 |              1 | retain-canonical     | redirect `/recipes/2026-02-25-aeropress-everyday-cup/`                                                          |
| 5     | `recipes/2026-02-27 - Monkey Gland Chicken.md`                                                           | v1.0           | `recipe/monkey-gland-chicken`                                                   |              1 | retain-canonical     | redirect `/recipes/2026-02-27-monkey-gland-chicken/`                                                            |
| 5     | `recipes/2026-03-08 - Reverse-Seared Fillet with Hibachi Cabbage, Steakhouse Fries & Gochujang Sauce.md` | v1.0           | `recipe/reverse-seared-fillet-hibachi-cabbage-steakhouse-fries-gochujang-sauce` |              1 | retain-canonical     | redirect `/recipes/2026-03-08-reverse-seared-fillet-with-hibachi-cabbage-steakhouse-fries-and-gochujang-sauce/` |
| 5     | `recipes/2026-05-29 - Celery-green-apple-fennel-pollen-slaw.md`                                          | v1.0           | `recipe/celery-green-apple-fennel-pollen-slaw`                                  |              1 | retain-canonical     | redirect `/recipes/2026-05-29-celery-green-apple-fennel-pollen-slaw/`                                           |

## Fixed review packets

Each packet is bounded to the six inventory rows above. It may create no
additional Recipe membership. Its “exact grandfathering list” is intentionally
proposed rather than a record: the Curator must decide whether to admit each
listed mapping as a row in a later `records/migrations/<batch>.md` record.

### Batch 1 — Bakes and the brownie relationship

**Membership:** Sour Cherry Pie; Flapjacks; Maple Pecan Pie; Masterclass
Chocolate Brownie; Sourdough Bread; Hash Brownies.

**Needed knowledge subjects:** only the candidates observed directly in these
six sources, including lamination, staged baking, folding, low-temperature
baking, fermentation, and their ingredients/principles. Reconcile only through
the source-linked entries in `records/candidates/` and the 2026-09-02 candidate
classification; do not create a subject merely because it is named in legacy
frontmatter.

**Exact proposed grandfathering list:**
`recipe/sour-cherry-pie@2`, `recipe/flapjacks-american-pancakes@1`,
`recipe/maple-pecan-pie@3`, `recipe/masterclass-chocolate-brownie@1`, and
`recipe/sourdough-bread@1`. `recipe/hash-brownies@1` is explicitly excluded
pending disposition review.

**Possible Culinary Changes, separate from mechanical conversion:** determine
whether Hash Brownies is a distinct recipe, a draft variation, or a duplicate
of Masterclass Chocolate Brownie; then decide its appropriate scope and any
needed new version. Do not make that determination while converting formatting.

### Batch 2 — Noodles and chicken methods

**Membership:** Bún bò nướng; Bún chả; Fried Master Stock Chicken; Lao
Herbaceous Chicken Noodle Soup; Asian Ginger Chicken Noodle Soup; Spicy Korean
Fried Chicken.

**Shared-subject ownership:** this packet owns review of its direct labels for
grilling, marination, poaching, frying, broth/stock practices, noodles, and
their ingredients/principles. Singapore Chicken Rice pilot subjects remain
evidence only; reuse requires a fresh, explicit Curator decision for the
remaining records.

**Exact proposed grandfathering list:** `recipe/bun-bo-nuong@1`,
`recipe/bun-cha@1`, `recipe/fried-master-stock-chicken@1`,
`recipe/lao-herbaceous-chicken-noodle-soup@1`,
`recipe/asian-ginger-chicken-noodle-soup@2`, and
`recipe/spicy-korean-fried-chicken@1`.

**Possible Culinary Changes:** resolve whether shared chicken-stock and
noodle-service patterns are only repeated methods or merit any new subject;
do not normalize ingredients, controls, or endpoints without Curator review.

### Batch 3 — Pork and live-fire plates

**Membership:** Grilled Pork Al Pastor; Hibachi Pork; Italian Sausages with Puy
Lentils; Guanciale, Olive & Chili Pasta Sauce; Porchetta; Soy Garlic Sesame
Gochujang Hibachi Chicken Tacos.

**Shared-subject ownership:** this packet owns its observed live-fire,
braising, sauce, pork, and compound-label candidate questions. In particular,
ingredient alternatives and output-like labels must remain provenance until a
Curator resolves them under the compound-label rule.

**Exact proposed grandfathering list:** `recipe/grilled-pork-al-pastor@1`,
`recipe/hibachi-pork-charred-greens-spanish-green-sauce@1`,
`recipe/italian-sausages-puy-lentils@1`,
`recipe/guanciale-olive-chili-pasta-sauce@1`,
`recipe/porchetta-fennel-pollen-salsa-verde@1`, and
`recipe/soy-garlic-sesame-gochujang-hibachi-chicken-tacos@1`.

**Possible Culinary Changes:** choose the intended identity of alternatives
such as pork cuts and sauces, and separate intermediate outputs from
Ingredients. Those are culinary decisions, not mechanical migration work.

### Batch 4 — Braises, soups, and vegetable dishes

**Membership:** Cowboy Beans; Gratin Dauphinois; Tomato Bredie; Traditional
Greek Lentil Soup; Creamy Porcini Mushroom Ragout with Polenta; Spanish Chicken
and Chorizo Stew.

**Shared-subject ownership:** this packet owns its direct simmering, braising,
starch, dairy-emulsion, spice, legume, and mushroom candidate questions. It
must not silently treat generated duplicate/alias classifications as Curation.

**Exact proposed grandfathering list:** `recipe/cowboy-beans@1`,
`recipe/gratin-dauphinois@1`, `recipe/tomato-bredie@2`,
`recipe/traditional-greek-lentil-soup-fakes@1`,
`recipe/creamy-porcini-mushroom-ragout-polenta@1`, and
`recipe/spanish-chicken-chorizo-stew@1`.

**Possible Culinary Changes:** decide how to represent alternative finishing
acids, texture-driven endpoints, and component relationships before any new
Recipe version; preserve legacy text as source evidence meanwhile.

### Batch 5 — Beverage, service, and remaining standalone dishes

**Membership:** Manchego with Thyme-Infused Honey and Coffee Dust; AeroPress
Competition Cup; AeroPress Everyday Cup; Monkey Gland Chicken; Reverse-Seared
Fillet; Celery, Green Apple & Fennel Pollen Slaw.

**Shared-subject ownership:** this packet owns direct beverage-extraction,
coffee, service-timing, searing, cold-assembly, and related candidate questions.
The two AeroPress sources are jointly reviewed to avoid inventing duplicate
Technique or Principle subjects from near-synonymous labels.

**Exact proposed grandfathering list:**
`recipe/manchego-thyme-infused-honey-coffee-dust@1`,
`recipe/aeropress-competition-cup@1`, `recipe/aeropress-everyday-cup@1`,
`recipe/monkey-gland-chicken@1`,
`recipe/reverse-seared-fillet-hibachi-cabbage-steakhouse-fries-gochujang-sauce@1`,
and `recipe/celery-green-apple-fennel-pollen-slaw@1`.

**Possible Culinary Changes:** decide whether the recorded beverage parameters,
service timeline, and cold-assembly terminology need substantive revision. The
three-column legacy service timeline is reconstruction evidence, not a license
to retain presentation callouts in canonical Markdown.

## Reconstructed material, provenance, and deferred import

The legacy recipes are retained in place as reconstruction input. Their
filename-derived routes, frontmatter labels, body callouts, generated Related
Links blocks, and duplicate-reconciliation clues are not accepted canonical
content. The authoritative provenance remains the legacy source files,
`docs/research/2026-08-26-current-culinary-content-publication-contracts-audit.md`,
and `docs/research/2026-09-02-generated-knowledge-candidate-classification.md`.

The latter preserves a fixed universe of 302 generated placeholders and records
156 additional live-extracted labels outside that universe. Neither group may
be imported, converted into identities, merged, aliased, or retired by this
packet. In particular, the source-linked candidate records are unaccepted
evidence; batch authors must ask for the relevant Curator decision before using
one as a culinary reference.

Import is deferred until after cutover. A later implementation packet may
mechanically convert only a Curator-approved batch, write its exact
grandfathering inventory, and add direct one-hop redirects only for
retain-canonical mappings. A move-to-draft source has no public-route decision
until later Curation, evidence, and Promotion permit one.

## Curator decisions required before implementation

1. Approve, amend, or reject every proposed identity, integer version mapping,
   disposition, and legacy route in the applicable batch.
2. Approve the exact grandfathering rows, if any; no proposed row is an
   exemption before that explicit decision.
3. Make each needed Knowledge Curation, duplicate, alias, component, and
   retirement decision using the preserved candidate evidence.
4. Separate any Culinary Change from mechanical conversion and decide whether it
   needs a new Draft version and new evidence.
5. For Hash Brownies, decide the relationship to Masterclass Chocolate Brownie
   and whether either source may be admitted, drafted, withdrawn, or otherwise
   handled. This packet intentionally makes no such decision.
