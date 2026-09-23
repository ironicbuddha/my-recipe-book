---
record_type: grandfathering-inventory
approved_by: "Carlo Kruger, Curator"
approved_on: 2026-09-21
---

| Source file | Recipe | Old version | Mapped version | Disposition | Exemption | Evidence snapshot |
| --- | --- | --- | --- | --- | --- | --- |
| `recipes/2026-02-19 - Grilled Pork Al Pastor.md` | recipe/grilled-pork-al-pastor | v1.0 | 1 | retain-canonical | historical evidence and Promotion Record only | `records/migrations/legacy-sources/batch-3/grilled-pork-al-pastor.txt` |
| `recipes/2026-02-19 - Hibachi Pork with Charred Greens & Spanish Green Sauce.md` | recipe/hibachi-pork-charred-greens-spanish-green-sauce | v1.0 | 1 | retain-canonical | historical evidence and Promotion Record only | `records/migrations/legacy-sources/batch-3/hibachi-pork-charred-greens-spanish-green-sauce.txt` |
| `recipes/2026-02-19 - Italian Sausages with Puy Lentils.md` | recipe/italian-sausages-puy-lentils | v1.0 | 1 | retain-canonical | historical evidence and Promotion Record only | `records/migrations/legacy-sources/batch-3/italian-sausages-puy-lentils.txt` |
| `recipes/2026-02-19 - Guanciale, Olive & Chili Pasta Sauce.md` | recipe/guanciale-olive-chili-pasta-sauce | v1.0 | 1 | retain-canonical | historical evidence and Promotion Record only | `records/migrations/legacy-sources/batch-3/guanciale-olive-chili-pasta-sauce.txt` |
| `recipes/2026-05-29 - Porchetta-with-fennel-pollen-and-salsa-verde.md` | recipe/porchetta-fennel-pollen-salsa-verde | v1.0 | 1 | retain-canonical | historical evidence and Promotion Record only | `records/migrations/legacy-sources/batch-3/porchetta-fennel-pollen-salsa-verde.txt` |
| `recipes/2026-05-29 - Soy-garlic-sesame-gochujang-hibachi-chicken-tacos.md` | recipe/soy-garlic-sesame-gochujang-hibachi-chicken-tacos | v1.0 | 1 | retain-canonical | historical evidence and Promotion Record only | `records/migrations/legacy-sources/batch-3/soy-garlic-sesame-gochujang-hibachi-chicken-tacos.txt` |

Each row is an exact, one-time migration exemption. All content and reference
contracts still apply; no exemption carries into a new version.

Each evidence snapshot is the exact pre-conversion source Markdown. It is held
only for exact historical Curation observation and migration review, never as a
Recipe, Knowledge Note, or public page.

## Ingredient decisions for conversion

- `recipe/soy-garlic-sesame-gochujang-hibachi-chicken-tacos@1`: on
  2026-09-23 the Curator selected 10 g of prepared
  `ingredient/gluten-free-flour-mix` for the source's “gluten-free flour mix,
  rice flour and potato starch.” The source gives no split among those
  materials. Do not invent separate rice-flour or potato-starch quantities in
  the converted Recipe.
- `recipe/porchetta-fennel-pollen-salsa-verde@1`: on 2026-09-23 the Curator
  selected the measured 3000 g pork belly as the only meat. The legacy
  overview and preparation step mention loin without a quantity; omit that
  unmeasured addition from the converted Recipe. This is an explicit Culinary
  Change, not an inferred loin amount.
- `recipe/hibachi-pork-charred-greens-spanish-green-sauce@1`: the Curator selected
  `ingredient/pork-shoulder` as the 500 g scale-basis Ingredient on 2026-09-23.
  The legacy source also offers pork collar and loin; preserve those alternatives
  explicitly and review their identities before converting this Recipe.
- `recipe/hibachi-pork-charred-greens-spanish-green-sauce@1`: the Curator selected
  broccoli for the 300 g charred-greens Ingredient Use on 2026-09-23. The legacy
  parenthetical also names “beans” and courgettes. The Curator identified the
  “beans” alternative as green beans on 2026-09-23; preserve green beans and
  courgettes as alternatives to the broccoli default.
- `recipe/grilled-pork-al-pastor@1`: the Curator selected the source's 40 g
  grilled pineapple puree as a distinct prepared Ingredient on 2026-09-23. The
  source supplies no method or raw yield for making it. Preserve the 66.67 g
  pineapple used in the salsa separately; its charring is a preparation step
  stated in that Recipe.
- For Batch 3, the Curator selected `ingredient/flat-leaf-parsley` for both
  “flat-leaf parsley” and generic “fresh parsley” uses on 2026-09-23. This
  makes the previously unspecified fresh-parsley cultivar explicit. Preserve
  the porchetta slaw's parsley-or-mint option.
- `recipe/italian-sausages-puy-lentils@1`: the Curator selected the existing
  `ingredient/canned-whole-tomatoes` subject for “plum tomatoes (tinned,
  crushed)” on 2026-09-23. Keep the plum variety and crushing instruction on
  that Recipe's Ingredient Use; do not establish a duplicate tomato identity.
- `recipe/italian-sausages-puy-lentils@1`: the Curator selected generic
  `ingredient/cinnamon` on 2026-09-23, distinct from the existing
  `ingredient/cassia-cinnamon` subject. Preserve the source's stick-or-ground
  choice; remove the stick only when that form is used.
- `recipe/italian-sausages-puy-lentils@1`: the Curator selected generic
  `ingredient/dried-chili` on 2026-09-23, distinct from the existing
  `ingredient/dried-red-chili`; the source names no colour or variety.
- `recipe/italian-sausages-puy-lentils@1`: the Curator selected
  `ingredient/water` for the source's approximately 600 g “water or light
  stock” on 2026-09-23 and approved removal of the unspecified stock
  alternative from the converted Recipe. Retain the source wording here as
  migration evidence of that Culinary Change.

## Conversion review

On 2026-09-23, all six approved `retain-canonical` Recipe versions were
converted in place. The six exact pre-conversion snapshots above preserve the
legacy wording used by Curation. `make validate` passed with 18 Recipes and
214 Knowledge Notes; `pnpm test` passed 60 tests; `pnpm check` passed and
built 240 static pages. The Batch 3 route test checks six eligible canonical
destinations and six direct 301 declarations.

The local Astro preview served each of the six old paths as an HTML redirect
page with a direct meta refresh to its canonical path, and each destination
returned 200. That local server returns 200 for the redirect pages. The
publisher-owned Vercel 301 response still requires a deployed preview request
before issue #23's HTTP outcome can be accepted.
