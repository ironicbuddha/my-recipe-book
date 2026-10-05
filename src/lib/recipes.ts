import {
  loadLibrary,
  phaseHeadingId,
  renderContent,
  type CulinaryLibrary,
} from './library';

export type RecipeEntry = {
  identity: string;
  version: number;
  basisQuantityG?: number;
  body: string;
  date: string;
  dateLabel: string;
  dishType?: string;
  excerpt: string;
  fileName: string;
  href: string;
  heroImageKey: string;
  phaseCount: number;
  primaryIngredient?: string;
  serviceTarget?: string;
  slug: string;
  tags: string[];
  title: string;
  yieldText?: string;
};

export type LibraryCounts = Record<
  'recipes' | 'techniques' | 'principles' | 'ingredients' | 'experiments',
  number
>;
export type RecipePhaseLink = { id: string; title: string };

export function getAllRecipes(): RecipeEntry[] {
  const currentLibrary = library();
  // Existing hero filenames follow legacy routes, not canonical identities.
  const legacyHeroKeys = new Map(
    currentLibrary.publisherRoutes.flatMap((route) =>
      route.type === 'redirect'
        ? [[route.destination, route.source.split('/')[2]] as const]
        : [],
    ),
  );
  return currentLibrary.recipes.map((recipe) => {
    const primaryIngredient = currentLibrary.entries.find(
      (entry) => entry.identity === recipe.basisIngredient,
    );
    return {
      identity: recipe.identity,
      version: recipe.version,
      basisQuantityG: recipe.basisQuantityG,
      body: recipe.body,
      date: recipe.date,
      dateLabel: formatDate(recipe.date),
      dishType: formatDishType(recipe.tags),
      excerpt: excerpt(recipe.body),
      fileName: recipe.sourcePath.split('/').at(-1) ?? recipe.identity,
      href: recipe.href,
      heroImageKey:
        legacyHeroKeys.get(recipe.identity) ??
        recipe.identity.split('/')[1] ??
        '',
      phaseCount: getRecipePhases(recipe.body).length,
      primaryIngredient: primaryIngredient?.title,
      slug: recipe.identity.split('/')[1] ?? '',
      tags: recipe.tags,
      title: recipe.title,
      yieldText: recipe.yieldText,
    };
  });
}

export function getFeaturedRecipes(limit = 6): RecipeEntry[] {
  return getAllRecipes().slice(0, limit);
}

export function getLibraryCounts(): LibraryCounts {
  const entries = library().entries;
  return {
    experiments: entries.filter((entry) => entry.type === 'experiment').length,
    ingredients: entries.filter((entry) => entry.type === 'ingredient').length,
    principles: entries.filter((entry) => entry.type === 'principle').length,
    recipes: entries.filter((entry) => entry.type === 'recipe').length,
    techniques: entries.filter((entry) => entry.type === 'technique').length,
  };
}

export function renderRecipeBody(markdown: string): string {
  return renderContent(markdown, library());
}

export function getRecipePhases(markdown: string): RecipePhaseLink[] {
  return [...markdown.matchAll(/^## (PHASE [A-Z]+ — .+)$/gmu)].map((match) => ({
    id: phaseHeadingId(match[1] ?? ''),
    title: match[1] ?? '',
  }));
}

function library(): CulinaryLibrary {
  return loadLibrary();
}

function excerpt(markdown: string): string {
  return (
    markdown
      .split(/\r?\n/u)
      .find((line) => line.trim() && !line.startsWith('#'))
      ?.trim() ?? ''
  );
}

function formatDate(date: string): string {
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${date}T00:00:00`));
}

function formatDishType(tags: string[]): string | undefined {
  const tag = tags.find((candidate) => candidate.startsWith('dish-'));
  return tag
    ?.replace(/^dish-/u, '')
    .replace(/-/gu, ' ')
    .replace(/\b\w/gu, (character) => character.toUpperCase());
}
