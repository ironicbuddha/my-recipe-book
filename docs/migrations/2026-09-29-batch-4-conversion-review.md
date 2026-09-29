# Batch 4 conversion review

Issue: #24. The approved inventory is `records/migrations/batch-4.md`; its six text snapshots are the exact pre-conversion sources. All six mapped versions remain canonical. This conversion adds no Experiment or Promotion Record and grants no exemption beyond the inventory's historical evidence and Promotion Record exception.

| Recipe | Mapped version | Conversion review |
| --- | --- | --- |
| Cowboy Beans | `recipe/cowboy-beans@1` | Uses measured 112.5 g dried pinto beans as the scale basis. Navy beans, ground beef, crushed tomato, Dijon mustard, amber beer, optional jalapeno and Worcestershire remain visible alternatives or options. Bean liquid and assembled pot are Phase Outputs; browning, spice bloom, reduction, rest, failure modes, and source variations remain visible. |
| Gratin Dauphinois | `recipe/gratin-dauphinois@1` | Distributes the full 6 g salt, 0.5 g white pepper, and 4 g garlic between potato layers. Preserves 2–3 mm unwashed slices, 35% cream, 170 C no-fan bake, 93–96 C centre, 30 min rest, and no-cheese note. |
| Tomato Bredie | `recipe/tomato-bredie@2` | Splits 7.5 g ginger into 5 g cooked and 2.5 g fresh. Reserves half the toasted coriander for finishing, keeps cinnamon whole and bone-in lamb neck, and uses the potato thickening Technique without the rice-specific Starch Absorption Principle. |
| Traditional Greek Lentil Soup (Fakes) | `recipe/traditional-greek-lentil-soup-fakes@1` | Uses measured 166.67 g dry lentils as the scale basis, so 500 g water scales to 299.99%. Preserves light vegetable stock and red wine vinegar alternatives, optional dried oregano and pre-boil, gentle simmer, and off-heat acid and oil finish. |
| Creamy Porcini Mushroom Ragout with Polenta | `recipe/creamy-porcini-mushroom-ragout-polenta@1` | Steeps 15 g dried porcini in 150 g hot water, strains the liquor, and measures/tops it up to 140 g for the ragout. Models cooked and set polenta, porcini solids and liquor, and ragout as Phase Outputs. Parmesan remains; the unsupported `vegetarian` tag is removed. |
| Spanish Chicken and Chorizo Stew | `recipe/spanish-chicken-chorizo-stew@1` | Returns both reserved chorizo and browned chicken to the tomato stew. Preserves wine-glaze reduction, 85 C tender-thigh endpoint, late beans, rice service, and all named bean and rice alternatives. |

The six legacy paths in `publisher/recipe-routes.json` each resolve directly to the corresponding identity-derived canonical recipe path. The Batch 4 route test checks all six identities, versions, destinations, 301 statuses, and lack of a second redirect. No Batch 4 source is moved to draft, so no withdrawn public route is expected.

Local review on 2026-09-29: `make validate` passed with 24 canonical Recipes, 268 Knowledge Notes, and no Completed Experiments. `pnpm check` passed with 300 generated pages. `pnpm test` passed 61 tests. The tests ran after the build to avoid concurrent writes to `dist`.

Preview HTTP and rendered-page verification will be recorded with the PR before merge.
