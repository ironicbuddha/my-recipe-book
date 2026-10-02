import fs from 'node:fs';
import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { loadLibrary, renderContent } from '../src/lib/library';

const recipeKeys = [
  'air-fryer-roast-potatoes',
  'banana-desiccated-coconut-curry-accompaniment',
  'beef-rendang',
  'black-bean-corn-mint-peppadew-salsa',
  'butter-braised-leeks',
  'carbonara',
  'carne-asada-tacos',
  'chicken-nachos',
  'chunky-tomato-burger-sauce',
  'creme-fraiche-lime-crema',
  'fennel-sausage-caramelised-red-onion-roman-style-pizza',
  'home-style-chicken-curry-with-coconut-milk-potatoes-peas',
  'lasagna-bolognese-with-bechamel',
  'malted-milk-chocolate-ice-cream-with-lindt-milk-chocolate-milo',
  'maple-bourbon-butter-pecan-ice-cream',
  'mint-chutney',
  'miso-butter-for-roasted-brussels-sprouts',
  'nacho-cheese-sauce',
  'pressure-cooker-black-beans-for-tacos',
  'pressure-cooker-charro-beans',
  'salsa-verde',
  'salted-caramel-ice-cream-with-salted-caramel-ripple',
  'tamarind-chutney',
  'tomato-onion-curry-chutney',
  'vanilla-bean-ice-cream',
] as const;
const knowledgeIdentities = [
  'ingredient/00-flour',
  'ingredient/balsamic-vinegar',
  'ingredient/banana',
  'ingredient/beef-stock',
  'ingredient/beef',
  'ingredient/black-bean-corn-mint-peppadew-salsa',
  'ingredient/bourbon',
  'ingredient/brussels-sprouts',
  'ingredient/canned-chopped-tomatoes',
  'ingredient/cayenne-pepper',
  'ingredient/cheddar',
  'ingredient/chicken-stock',
  'ingredient/chicken',
  'ingredient/chipotle-in-adobo',
  'ingredient/coconut-milk',
  'ingredient/corn-kernels',
  'ingredient/creme-fraiche-lime-crema',
  'ingredient/creme-fraiche',
  'ingredient/curry-powder',
  'ingredient/dates',
  'ingredient/desiccated-coconut',
  'ingredient/dextrose',
  'ingredient/dill-pickle',
  'ingredient/duck-fat',
  'ingredient/fresh-green-chili',
  'ingredient/galangal',
  'ingredient/garam-masala',
  'ingredient/glucose-syrup',
  'ingredient/ground-ginger',
  'ingredient/ice-cream-stabiliser',
  'ingredient/instant-yeast',
  'ingredient/jaggery',
  'ingredient/kashmiri-chili-powder',
  'ingredient/leek',
  'ingredient/lime-zest',
  'ingredient/lime',
  'ingredient/low-moisture-mozzarella',
  'ingredient/malt-vinegar',
  'ingredient/malted-milk-powder',
  'ingredient/mayonnaise',
  'ingredient/milk-chocolate',
  'ingredient/milo',
  'ingredient/monterey-jack',
  'ingredient/mustard-seed',
  'ingredient/nacho-cheese-sauce',
  'ingredient/nutmeg',
  'ingredient/orange-juice',
  'ingredient/palm-sugar',
  'ingredient/pancetta',
  'ingredient/passata',
  'ingredient/peas',
  'ingredient/peppadew-peppers',
  'ingredient/pickled-jalapeno-brine',
  'ingredient/pickled-jalapeno',
  'ingredient/plain-yoghurt',
  'ingredient/salsa',
  'ingredient/skim-milk-powder',
  'ingredient/sodium-citrate',
  'ingredient/tamarind-concentrate',
  'ingredient/tortilla-chips',
  'ingredient/turmeric',
  'ingredient/vanilla-bean',
  'ingredient/white-miso',
  'technique/air-frying',
  'technique/ice-cream-churning',
  'technique/pressure-cooking',
] as const;

describe('approved recipes-tmp intake', () => {
  it('publishes all 25 exact Recipes, 66 curated subjects and 25 whole-Recipe reports', () => {
    const library = loadLibrary();
    expect(recipeKeys).toHaveLength(25);
    expect(knowledgeIdentities).toHaveLength(66);
    for (const key of recipeKeys) {
      expect(
        library.recipes.find((entry) => entry.identity === `recipe/${key}`),
      ).toMatchObject({ version: 1, href: `/recipes/${key}/` });
      expect(
        library.entries.find(
          (entry) => entry.identity === `experiment/${key}-retrospective-v1`,
        ),
      ).toMatchObject({ type: 'experiment', subjectLabel: `recipe/${key} v1` });
    }
    for (const identity of knowledgeIdentities) {
      expect(
        library.knowledge.find((entry) => entry.identity === identity)?.href,
      ).toBeDefined();
    }
    expect(
      library.entries.filter((entry) => entry.type === 'recipe'),
    ).toHaveLength(55);
    expect(
      library.entries.some(
        (entry) =>
          entry.sourcePath.includes('/drafts/') ||
          entry.sourcePath.includes('/superseded/'),
      ),
    ).toBe(false);
  });

  it('preserves source hashes and raw Ingredient totals from the accepted packet without double counting internal outputs', () => {
    const library = loadLibrary();
    const packet = fs.readFileSync(
      'docs/plans/2026-10-02-recipes-tmp-review/conversion-proposals.md',
      'utf8',
    );
    const sourceRows = [
      ...packet.matchAll(
        /\| `(recipes-tmp\/[^`]+)` \| `recipe\/([^`]+)@1`.*?\| `([a-f0-9]{64})` \|/gu,
      ),
    ];
    expect(sourceRows).toHaveLength(25);
    for (const [, source, key, digest] of sourceRows) {
      expect(
        createHash('sha256').update(fs.readFileSync(source)).digest('hex'),
      ).toBe(digest);
      const proposal = packet
        .split('\n### ')
        .find((section) => section.includes(`- Source: \`${source}\``))!;
      const expected = new Map<string, number>();
      for (const [, quantity, identity] of proposal.matchAll(
        /\| [^|]+ \| ([\d.]+) g(?: combined)? \| (?:proposed )?(ingredient\/[a-z0-9-]+)/gu,
      )) {
        expected.set(
          identity,
          (expected.get(identity) ?? 0) + Number(quantity),
        );
      }
      const recipe = library.recipes.find(
        (entry) => entry.identity === `recipe/${key}`,
      )!;
      const actual = new Map<string, number>();
      for (const [, identity, quantity] of recipe.body.matchAll(
        /\| [^|]+ \| \[[^\]]+\]\(ref:(ingredient\/[a-z0-9-]+)\) \| ([\d.]+) g \|/gu,
      )) {
        actual.set(identity, (actual.get(identity) ?? 0) + Number(quantity));
      }
      expect([...actual].sort()).toEqual([...expected].sort());
    }
  });

  it('renders prepared Nachos companions as links and keeps internal portions separate from raw inputs', () => {
    const library = loadLibrary();
    const nachos = library.recipes.find(
      (entry) => entry.identity === 'recipe/chicken-nachos',
    )!;
    const html = renderContent(nachos.body, library);
    for (const key of [
      'nacho-cheese-sauce',
      'black-bean-corn-mint-peppadew-salsa',
      'creme-fraiche-lime-crema',
    ]) {
      expect(html).toContain(`/recipes/${key}/`);
      expect(html).toContain(`/ingredients/${key}/`);
    }
    const lasagna = library.recipes.find(
      (entry) => entry.identity === 'recipe/lasagna-bolognese-with-bechamel',
    )!;
    expect(lasagna.body).toContain(
      '1500 g ragù, 600 g prepared pasta sheets and 1000 g béchamel',
    );
    expect(lasagna.body).not.toContain('ref:ingredient/bechamel');
    expect(lasagna.body).not.toContain('ref:ingredient/bolognese-ragu');
  });
});
