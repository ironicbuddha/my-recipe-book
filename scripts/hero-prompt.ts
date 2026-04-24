#!/usr/bin/env tsx
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

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

type RecipeFrontmatter = {
  title?: string;
  primary_ingredient?: string;
  techniques?: string[];
  tags?: string[];
};

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
  return s.toLowerCase().replace(/\.md$/, '').replace(/[\s\-_]+/g, '-');
}

export function findRecipeFile(query: string): string {
  const files = fs.readdirSync(RECIPES_DIR).filter((f) => f.endsWith('.md'));
  const needle = normalize(query);
  const matches = files.filter((f) => normalize(f).includes(needle));

  if (matches.length === 0) {
    throw new Error(`No recipe matches "${query}". Run with no args to see usage.`);
  }
  if (matches.length > 1) {
    const list = matches.map((m) => `  - ${m}`).join('\n');
    throw new Error(`Ambiguous match for "${query}". Candidates:\n${list}`);
  }
  return matches[0];
}

function extractSensoryLead(body: string): { sensory: string; serviceStyle: string } {
  const lines = body.split(/\r?\n/);
  let sensory = '';
  let serviceStyle = '';
  let seenBasisLine = false;

  for (const raw of lines) {
    const line = raw.trim();

    const serviceMatch = line.match(/^Service\s+(Style|Target):\s*(.+)$/i);
    if (serviceMatch) {
      serviceStyle = serviceMatch[2].trim();
      continue;
    }
    if (/^Primary Ingredient Basis:/i.test(line)) {
      seenBasisLine = true;
      continue;
    }

    if (!seenBasisLine) continue;

    // After seeing the basis line, the first free-text paragraph is the sensory lead.
    // Stop scanning at any section boundary: heading, horizontal rule, or callout block.
    if (line === '' && sensory) break;
    if (!line) continue;
    if (line.startsWith('---')) break;
    if (line.startsWith('##')) break;
    if (line.startsWith('>')) break;
    if (/^(Yield|Portions|Target Internal Temperature):/i.test(line)) continue;

    if (!sensory) {
      const cleaned = line.replace(/[*`]/g, '').trim();
      if (cleaned) sensory = cleaned.slice(0, 240);
    }
  }

  return { sensory, serviceStyle };
}

function dishTypeFromTags(tags: string[]): string {
  const dish = tags.find((t) => t.startsWith('dish-'));
  return dish ? dish.replace(/^dish-/, '').replace(/-/g, ' ') : 'dish';
}

function framingFor(dishType: string, primaryIngredient: string): string {
  const lower = `${dishType} ${primaryIngredient}`.toLowerCase();

  if (/soup|broth|stock/.test(lower)) {
    return 'overhead photograph of a specimen bowl, showing broth surface with scattered solid components visible through the liquid';
  }
  if (/sauce/.test(lower)) {
    return 'overhead photograph of a specimen sample pooled on a pale surface, showing colour, viscosity, and surface reflectivity';
  }
  if (/coffee|espresso|tea|aeropress/.test(lower)) {
    return 'overhead photograph of a cup, showing crema or surface detail with visible depth and micro-bubble structure';
  }
  if (/dessert|pie|brownie|pancake|flapjack/.test(lower)) {
    return 'vertical cross-section photograph revealing internal crumb, layer, or structural texture';
  }
  return 'slight-angle cross-section photograph showing plating, surface crust, and internal structure';
}

export function buildPrompt(filePath: string): string {
  const raw = fs.readFileSync(filePath, 'utf8');
  const parsed = matter(raw);
  const data = parsed.data as RecipeFrontmatter;
  const tags = Array.isArray(data.tags) ? data.tags : [];

  const title = data.title ?? 'untitled dish';
  const primary = data.primary_ingredient ?? '';
  const dishType = dishTypeFromTags(tags);
  const techniques = Array.isArray(data.techniques) ? data.techniques.slice(0, 3) : [];
  const descriptors = tags.filter((t) => !t.startsWith('dish-')).slice(0, 5);
  const { sensory, serviceStyle } = extractSensoryLead(parsed.content);
  const framing = framingFor(dishType, primary);

  const subjectLine = primary
    ? `Specimen: ${title}, built on ${primary}.`
    : `Specimen: ${title}.`;

  const characterLine = sensory
    ? `Character: ${sensory}`
    : serviceStyle
      ? `Character: ${serviceStyle}.`
      : '';

  const contextParts = [
    techniques.length ? `Preparation uses ${techniques.join(', ')}` : '',
    descriptors.length ? `visual qualities: ${descriptors.join(', ')}` : '',
  ].filter(Boolean);
  const contextLine = contextParts.length ? `Context: ${contextParts.join('; ')}.` : '';

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
