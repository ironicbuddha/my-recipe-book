import fs from 'node:fs';
import path from 'node:path';

import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';

const REPO_ROOT = process.cwd();
const RECIPES_DIR = path.join(REPO_ROOT, 'recipes');
const KNOWLEDGE_DIRS = [
  'recipes',
  'techniques',
  'principles',
  'ingredients',
  'experiments',
] as const;
const LEAD_META_PATTERN =
  /^(Yield|Portions|Service Target|Target Internal Temperature):/;
const markdownRenderer = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

type KnowledgeDirectory = (typeof KNOWLEDGE_DIRS)[number];

type RecipeFrontmatter = {
  date?: Date | string;
  primary_ingredient?: string;
  service_target?: string;
  tags?: string[] | string;
  title?: string;
  yield?: string;
};

export type RecipeEntry = {
  body: string;
  date: string;
  dateLabel: string;
  dishType?: string;
  excerpt: string;
  fileName: string;
  href: string;
  phaseCount: number;
  primaryIngredient?: string;
  serviceTarget?: string;
  slug: string;
  tags: string[];
  title: string;
  yieldText?: string;
};

export type LibraryCounts = Record<KnowledgeDirectory, number>;

export function getAllRecipes(): RecipeEntry[] {
  return getMarkdownFiles(RECIPES_DIR)
    .map((fileName) => {
      const absolutePath = path.join(RECIPES_DIR, fileName);
      const fileContents = fs.readFileSync(absolutePath, 'utf8');
      const parsed = matter(fileContents);
      const data = parsed.data as RecipeFrontmatter;
      const body = parsed.content.trim();
      const tags = normalizeTags(data.tags);

      return {
        body,
        date: normalizeDate(data.date),
        dateLabel: formatDateLabel(data.date),
        dishType: formatDishType(tags),
        excerpt: extractExcerpt(body),
        fileName,
        href: `/recipes/${slugify(fileName.replace(/\.md$/u, ''))}/`,
        phaseCount: countPhases(body),
        primaryIngredient:
          typeof data.primary_ingredient === 'string'
            ? data.primary_ingredient
            : undefined,
        serviceTarget:
          typeof data.service_target === 'string' ? data.service_target : undefined,
        slug: slugify(fileName.replace(/\.md$/u, '')),
        tags,
        title:
          typeof data.title === 'string' && data.title.trim().length > 0
            ? data.title.trim()
            : deriveTitleFromFileName(fileName),
        yieldText: typeof data.yield === 'string' ? data.yield : undefined,
      };
    })
    .sort((left, right) => {
      if (left.date !== right.date) {
        return right.date.localeCompare(left.date);
      }

      return left.title.localeCompare(right.title);
    });
}

export function getFeaturedRecipes(limit = 6): RecipeEntry[] {
  return getAllRecipes().slice(0, limit);
}

export function getLibraryCounts(): LibraryCounts {
  return KNOWLEDGE_DIRS.reduce<LibraryCounts>((counts, directory) => {
    counts[directory] = getMarkdownFiles(path.join(REPO_ROOT, directory)).length;
    return counts;
  }, {} as LibraryCounts);
}

export function renderRecipeBody(markdown: string): string {
  return markdownRenderer.render(transformColumnCallouts(stripRecipeLead(markdown)));
}

function countPhases(markdown: string): number {
  return (markdown.match(/^## PHASE [A-Z]/gmu) ?? []).length;
}

function deriveTitleFromFileName(fileName: string): string {
  return fileName
    .replace(/^\d{4}-\d{2}-\d{2} - /u, '')
    .replace(/\.md$/u, '');
}

function extractExcerpt(markdown: string): string {
  for (const line of stripRecipeLead(markdown).split(/\r?\n/u)) {
    const trimmed = line.trim();

    if (
      trimmed.length === 0 ||
      trimmed === '---' ||
      trimmed.startsWith('## ') ||
      trimmed.startsWith('> [!') ||
      trimmed.startsWith('>> ') ||
      trimmed.startsWith('Primary Ingredient Basis:')
    ) {
      continue;
    }

    return trimmed.replace(/`/gu, '');
  }

  return 'A phase-based recipe note from the Modernist recipe library.';
}

function formatDateLabel(value: Date | string | undefined): string {
  const normalizedDate = normalizeDate(value);

  if (normalizedDate.length === 0) {
    return 'Undated';
  }

  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${normalizedDate}T00:00:00`));
}

function formatDishType(tags: string[]): string | undefined {
  const dishType = tags.find((tag) => tag.startsWith('dish-'));

  if (!dishType) {
    return undefined;
  }

  return dishType
    .replace(/^dish-/u, '')
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function getMarkdownFiles(directory: string): string[] {
  return fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.md') && entry.name !== 'README.md')
    .map((entry) => entry.name)
    .sort();
}

function normalizeDate(value: Date | string | undefined): string {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  if (typeof value === 'string') {
    return value.slice(0, 10);
  }

  return '';
}

function normalizeTags(value: string[] | string | undefined): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === 'string');
  }

  if (typeof value === 'string') {
    return [value];
  }

  return [];
}

function renderColumnCallout(blockLines: string[]): string {
  const sections: Array<{ kind: string; markdown: string[] }> = [];
  let currentSection: { kind: string; markdown: string[] } | undefined;

  for (const line of blockLines.slice(1)) {
    const trimmed = line.trim();
    const sectionMatch = trimmed.match(/^>> \[!(col-left|col-right|col-time)\]$/u);

    if (sectionMatch) {
      currentSection = {
        kind: sectionMatch[1].replace('col-', ''),
        markdown: [],
      };
      sections.push(currentSection);
      continue;
    }

    if (!currentSection || trimmed === '' || trimmed === '>') {
      continue;
    }

    if (line.startsWith('>> ')) {
      currentSection.markdown.push(line.slice(3));
      continue;
    }

    if (trimmed === '>>') {
      currentSection.markdown.push('');
    }
  }

  if (sections.length === 0) {
    return blockLines.join('\n');
  }

  return [
    '',
    '<div class="phase-grid">',
    ...sections.map(
      (section) =>
        `<section class="phase-panel phase-panel--${section.kind}">${markdownRenderer.render(
          section.markdown.join('\n').trim(),
        )}</section>`,
    ),
    '</div>',
    '',
  ].join('\n');
}

function slugify(value: string): string {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/gu, '')
    .toLowerCase()
    .replace(/&/gu, ' and ')
    .replace(/[^a-z0-9]+/gu, '-')
    .replace(/^-+|-+$/gu, '');
}

function stripRecipeLead(markdown: string): string {
  const lines = markdown.split(/\r?\n/u);

  while (lines[0]?.trim() === '') {
    lines.shift();
  }

  if (lines[0]?.startsWith('# ')) {
    lines.shift();
  }

  while (lines[0]?.trim() === '') {
    lines.shift();
  }

  while (LEAD_META_PATTERN.test(lines[0]?.trim() ?? '')) {
    lines.shift();
  }

  while (lines[0]?.trim() === '') {
    lines.shift();
  }

  return lines.join('\n').trim();
}

function transformColumnCallouts(markdown: string): string {
  const lines = markdown.split(/\r?\n/u);
  const output: string[] = [];

  for (let index = 0; index < lines.length; ) {
    if (lines[index].trim() !== '> [!col]') {
      output.push(lines[index]);
      index += 1;
      continue;
    }

    const blockLines = [lines[index]];
    index += 1;

    while (index < lines.length) {
      const line = lines[index];

      if (line.startsWith('>') || line.trim() === '') {
        blockLines.push(line);
        index += 1;
        continue;
      }

      break;
    }

    output.push(renderColumnCallout(blockLines));
  }

  return output.join('\n');
}
