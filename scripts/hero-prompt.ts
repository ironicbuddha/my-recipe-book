#!/usr/bin/env tsx
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadLibrary } from '../src/lib/library.js';

export const RECIPES_DIR = path.join(process.cwd(), 'recipes');

const STYLE_RULES = [
  'clinical Modernist Cuisine reference-plate aesthetic',
  'stark neutral surface (white or pale grey), no patterns, no props',
  'flat even studio light, crisp edge-to-edge focus, no harsh shadows',
  'single specimen centered in frame',
  'no hands, no utensils held in action, no garnish flourishes beyond what the recipe specifies',
  'no text, no labels, no measurement annotations on the image itself',
  'muted colour palette with restrained contrast; red tones only if the dish carries them',
  '3:2 aspect ratio, sized for a web hero image',
].join('; ');

function usage(code = 0): never {
  const message = [
    'Usage: pnpm hero-prompt <slug-or-filename-fragment>',
    '',
    'Examples:',
    '  pnpm hero-prompt hash-brownies',
    '  pnpm hero-prompt "asian chicken"',
    '  pnpm hero-prompt 2026-02-27',
  ].join('\n');
  console[code === 0 ? 'log' : 'error'](message);
  process.exit(code);
}

function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/\.md$/, '')
    .replace(/[\s\-_]+/g, '-');
}

export function findRecipeFile(query: string): string {
  const needle = normalize(query);
  const matches = loadLibrary()
    .recipes.filter((recipe) =>
      [
        recipe.identity.split('/')[1],
        recipe.title,
        path.basename(recipe.sourcePath),
      ].some((value) => normalize(value).includes(needle)),
    )
    .map((recipe) => path.basename(recipe.sourcePath));

  if (matches.length === 0) {
    throw new Error(
      `No recipe matches "${query}". Run with no args to see usage.`,
    );
  }
  if (matches.length > 1) {
    const list = matches.map((m) => `  - ${m}`).join('\n');
    throw new Error(`Ambiguous match for "${query}". Candidates:\n${list}`);
  }
  return matches[0];
}

function dishTypeFromTags(tags: string[]): string {
  const dish = tags.find((t) => t.startsWith('dish-'));
  return dish ? dish.replace(/^dish-/, '').replace(/-/g, ' ') : 'dish';
}

function framingFor(dishType: string, primaryIngredient: string): string {
  const lower = `${dishType} ${primaryIngredient}`.toLowerCase();

  if (/ice[ -]?cream|gelato|sorbet/.test(lower)) {
    return 'slightly elevated three-quarter photograph of frozen scoops in a plain bowl, showing scoop surface texture';
  }
  if (/soup|broth|stock/.test(lower)) {
    return 'overhead photograph of a specimen bowl, showing broth surface with scattered solid components visible through the liquid';
  }
  if (/sauce/.test(lower)) {
    return 'overhead photograph of a specimen sample pooled on a pale surface, showing colour, viscosity, and surface reflectivity';
  }
  if (/coffee|espresso|tea|aeropress/.test(lower)) {
    return 'overhead photograph of a cup, showing crema or surface detail with visible depth and micro-bubble structure';
  }
  if (/lasagna/.test(lower)) {
    return 'low three-quarter photograph of a cut portion revealing internal layers of pasta, ragù and béchamel with its browned surface visible';
  }
  // Layered desserts (pies, stacked cakes) want explicit layer language.
  if (/pie|layer cake|tiramisu/.test(lower)) {
    return 'vertical cross-section photograph revealing internal layers, crumb, and set';
  }
  // Homogeneous bakes (brownies, pancakes, bread) are a single material —
  // avoid the word "layer" which Flux interprets as visible filling.
  if (/dessert|brownie|pancake|flapjack|bread|sourdough|cookie/.test(lower)) {
    return 'vertical cross-section photograph revealing uniform internal crumb and surface crust, no filling, no interior layers';
  }
  return 'slight-angle cross-section photograph showing plating, surface crust, and internal structure';
}

export function buildPrompt(filePath: string): string {
  const library = loadLibrary();
  const recipe = library.recipes.find(
    (entry) =>
      path.resolve(library.root, entry.sourcePath) === path.resolve(filePath),
  );
  if (!recipe)
    throw new Error(`Not a publication-eligible Recipe: ${filePath}`);

  const { title, tags, body } = recipe;
  const primary =
    library.knowledge.find((entry) => entry.identity === recipe.basisIngredient)
      ?.title ?? '';
  const dishType = dishTypeFromTags(tags);
  const applicationSections = [
    ...body.matchAll(
      /^### Technique Applications\s*\n([\s\S]*?)(?=^#{2,3} |(?![\s\S]))/gmu,
    ),
  ];
  const techniqueIdentities = [
    ...new Set(
      applicationSections.flatMap((section) =>
        [...section[1].matchAll(/\(ref:(technique\/[a-z0-9-]+)\)/gu)].map(
          (match) => match[1],
        ),
      ),
    ),
  ];
  const techniques = techniqueIdentities
    .slice(0, 3)
    .map(
      (identity) =>
        library.knowledge.find((entry) => entry.identity === identity)!.title,
    );
  const descriptors = tags
    .filter((tag) => !tag.startsWith('dish-'))
    .slice(0, 5);
  const sensory = body
    .split(/^## /mu)[0]
    .trim()
    .split(/\n\s*\n/u)[0]
    .replace(/\[([^\]]+)\]\(ref:[^)]+\)/gu, '$1')
    .replace(/[*`]/gu, '')
    .replace(/\s+/gu, ' ')
    .slice(0, 240);
  const framing = framingFor(dishType, `${title} ${primary}`);

  const subjectLine = primary
    ? `Specimen: ${title}, built on ${primary}.`
    : `Specimen: ${title}.`;

  const characterLine = sensory ? `Character: ${sensory}` : '';

  const contextParts = [
    techniques.length ? `Preparation uses ${techniques.join(', ')}` : '',
    descriptors.length ? `visual qualities: ${descriptors.join(', ')}` : '',
  ].filter(Boolean);
  const contextLine = contextParts.length
    ? `Context: ${contextParts.join('; ')}.`
    : '';

  return [
    subjectLine,
    characterLine,
    contextLine,
    `Framing: ${framing}.`,
    `Style rules: ${STYLE_RULES}.`,
  ]
    .filter(Boolean)
    .join('\n\n');
}

function main(): void {
  const query = process.argv[2];
  if (!query || query === '--help' || query === '-h') usage(query ? 0 : 1);

  const filename = findRecipeFile(query);
  const filePath = path.join(RECIPES_DIR, filename);
  console.log(buildPrompt(filePath));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
