import fs from 'node:fs';
import path from 'node:path';

import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';

export const CONTENT_TYPES = [
  'recipe',
  'ingredient',
  'technique',
  'principle',
  'experiment',
] as const;
export type ContentType = (typeof CONTENT_TYPES)[number];
export type KnowledgeType = Exclude<ContentType, 'recipe' | 'experiment'>;

type Frontmatter = Record<string, unknown>;

type SourceRecord = {
  body: string;
  bodyStartLine: number;
  data: Frontmatter;
  filePath: string;
  relativePath: string;
};

export type ContentReference = {
  identity: string;
  line: number;
  version?: number;
};

export type LibraryEntry = {
  basisIngredient?: string;
  backlinks: string[];
  body: string;
  corrections: string[];
  date?: string;
  href?: string;
  identity: string;
  references: ContentReference[];
  subjectLabel?: string;
  sourcePath: string;
  title: string;
  tags: string[];
  type: ContentType;
  version?: number;
  yieldText?: string;
};

export type RecipeEntry = Omit<
  LibraryEntry,
  'date' | 'href' | 'type' | 'version'
> & {
  date: string;
  href: string;
  type: 'recipe';
  version: number;
};

export type CulinaryLibrary = {
  entries: LibraryEntry[];
  knowledge: LibraryEntry[];
  recipes: RecipeEntry[];
  root: string;
};

export class ContentValidationError extends Error {
  constructor(readonly diagnostics: string[]) {
    super(diagnostics.join('\n'));
    this.name = 'ContentValidationError';
  }
}

const DIRECTORY_TYPE: Record<string, ContentType> = {
  experiments: 'experiment',
  ingredients: 'ingredient',
  principles: 'principle',
  recipes: 'recipe',
  techniques: 'technique',
};
const IDENTITY_PATTERN =
  /^(recipe|ingredient|technique|principle|experiment)\/[a-z0-9]+(?:-[a-z0-9]+)*$/u;
const REF_PATTERN =
  /\[[^\]]+\]\(ref:([a-z]+\/[a-z0-9]+(?:-[a-z0-9]+)*)(?:@(\d+))?\)/gu;
const RECIPE_FRONTMATTER = new Set([
  'title',
  'date',
  'identity',
  'version',
  'yield',
  'scale_basis',
  'tags',
]);
const EXPERIMENT_FRONTMATTER = new Set([
  'title',
  'date',
  'identity',
  'status',
  'primary_subject',
  'corrects',
]);
const DISH_TAGS = new Set([
  'dish-main-course',
  'dish-side-dish',
  'dish-dessert',
  'dish-breakfast',
  'dish-appetizer',
  'dish-soup',
  'dish-sauce',
]);

/** Loads the eligible, identity-addressed publication library from a repository root. */
export function loadLibrary(
  root = process.env.CULINARY_LIBRARY_ROOT ?? process.cwd(),
): CulinaryLibrary {
  const diagnostics: string[] = [];
  const sourceRecords = readSourceRecords(root, diagnostics);
  const inventories = readInventories(root, diagnostics);
  const curations = readCurations(root, diagnostics);
  const entriesByIdentity = new Map<string, LibraryEntry[]>();
  const recipeVersions = new Map<string, LibraryEntry>();
  const eligible: LibraryEntry[] = [];

  for (const source of sourceRecords) {
    const expectedType =
      DIRECTORY_TYPE[source.relativePath.split(path.sep)[0] ?? ''];
    const identity = stringValue(source.data.identity);

    // Legacy files deliberately have no stable identity and are excluded until migration.
    if (!identity) {
      continue;
    }

    validateIdentity(source, expectedType, identity, diagnostics);
    const entry = makeEntry(source, expectedType, identity, diagnostics);
    const identityEntries = entriesByIdentity.get(identity) ?? [];
    if (expectedType === 'recipe') {
      const exactIdentity = recipeVersionIdentity(entry);
      if (exactIdentity && recipeVersions.has(exactIdentity)) {
        diagnostics.push(
          `${source.relativePath}: Recipe Version ${exactIdentity} is not unique`,
        );
        continue;
      }
      if (exactIdentity) {
        recipeVersions.set(exactIdentity, entry);
      }
    } else if (identityEntries.length > 0) {
      diagnostics.push(
        `${source.relativePath}: identity ${identity} is not unique`,
      );
      continue;
    }
    entriesByIdentity.set(identity, [...identityEntries, entry]);
    entriesByIdentity.set(identity, [...identityEntries, entry]);

    if (expectedType === 'recipe') {
      recipeVersions.set(`${identity}@${entry.version ?? 0}`, entry);
      validateRecipe(source, entry, inventories, diagnostics);
      if (isApprovedRecipe(entry, inventories)) {
        eligible.push(entry);
      }
    } else if (
      expectedType === 'ingredient' ||
      expectedType === 'technique' ||
      expectedType === 'principle'
    ) {
      validateKnowledge(source, entry, curations, diagnostics);
      if (curations.has(identity)) {
        eligible.push(entry);
      }
    } else if (expectedType === 'experiment') {
      validateExperiment(source, diagnostics);
      if (source.data.status === 'completed') {
        eligible.push(entry);
      }
    }
  }

  validateInventorySources(inventories, diagnostics);
  validateExperiments(
    sourceRecords,
    entriesByIdentity,
    recipeVersions,
    diagnostics,
  );
  validateReferences(entriesByIdentity, recipeVersions, diagnostics);
  validatePriorCompletedEvidence(sourceRecords, diagnostics);

  if (diagnostics.length > 0) {
    throw new ContentValidationError(diagnostics);
  }

  const backlinks = new Map<string, Set<string>>();
  for (const entry of eligible) {
    for (const reference of entry.references) {
      if (!backlinks.has(reference.identity)) {
        backlinks.set(reference.identity, new Set());
      }
      backlinks.get(reference.identity)?.add(entry.identity);
    }
  }

  const correctionNotices = new Map<string, string[]>();
  for (const entry of eligible.filter(
    (candidate) => candidate.type === 'experiment',
  )) {
    const source = sourceRecords.find(
      (candidate) => candidate.relativePath === entry.sourcePath,
    );
    const corrected = source && stringValue(source.data.corrects);
    if (corrected) {
      correctionNotices.set(corrected, [
        ...(correctionNotices.get(corrected) ?? []),
        entry.identity,
      ]);
    }
  }
  const withBacklinks = eligible.map((entry) => ({
    ...entry,
    backlinks: [...(backlinks.get(entry.identity) ?? [])].sort(),
    corrections: [...(correctionNotices.get(entry.identity) ?? [])].sort(),
    href: routeFor(entry.identity),
  }));
  const recipes: RecipeEntry[] = withBacklinks
    .filter((entry) => entry.type === 'recipe')
    .map((entry) => ({
      ...entry,
      date: entry.date ?? '',
      href: entry.href ?? routeFor(entry.identity),
      type: 'recipe' as const,
      version: entry.version ?? 0,
    }))
    .sort(
      (left, right) =>
        right.date.localeCompare(left.date) ||
        left.title.localeCompare(right.title),
    );

  return {
    entries: withBacklinks,
    knowledge: withBacklinks.filter(
      (entry) => entry.type !== 'recipe' && entry.type !== 'experiment',
    ),
    recipes,
    root,
  };
}

export function renderContent(body: string, library: CulinaryLibrary): string {
  const published = new Set(library.entries.map((entry) => entry.identity));
  const publishedRecipeVersions = new Set(
    library.entries
      .filter((entry) => entry.type === 'recipe')
      .flatMap((entry) => (entry.version === undefined ? [] : [`${entry.identity}@${entry.version}`])),
  );
  const renderer = new MarkdownIt({ linkify: true, typographer: true });
  renderer.renderer.rules.table_open = (tokens, index, options, _env, self) => {
    const header = tokens
      .slice(index, index + 8)
      .find((token) => token.type === 'inline')?.content;
    if (header === 'Symptom') {
      tokens[index]?.attrJoin('class', 'table--failure-modes');
    }
    return self.renderToken(tokens, index, options);
  };
  const resolved = body.replace(REF_PATTERN, (match, identity: string, version: string | undefined) => {
    const label = match.slice(1, match.indexOf(']'));
    const isPublished = version === undefined ? published.has(identity) : publishedRecipeVersions.has(`${identity}@${version}`);
    return isPublished
      ? `[${label}](${routeFor(identity)})`
      : label;
  });
  return renderer.render(resolved);
}

export function routeFor(identity: string): string {
  const [type, key] = identity.split('/');
  const plural = `${type}s`;
  return `/${plural}/${key}/`;
}

function readSourceRecords(
  root: string,
  diagnostics: string[],
): SourceRecord[] {
  const rootRecords = Object.keys(DIRECTORY_TYPE).flatMap((directory) => {
    const absoluteDirectory = path.join(root, directory);
    if (!fs.existsSync(absoluteDirectory)) {
      return [];
    }

    return fs
      .readdirSync(absoluteDirectory, { withFileTypes: true })
      .filter(
        (item) =>
          item.isFile() &&
          item.name.endsWith('.md') &&
          item.name !== 'README.md',
      )
      .sort((left, right) => left.name.localeCompare(right.name))
      .map((item) =>
        readRecord(root, path.join(directory, item.name), diagnostics),
      );
  });
  const recipeHistory = ['recipes/drafts', 'recipes/superseded'].flatMap(
    (directory) => {
      const absoluteDirectory = path.join(root, directory);
      return fs.existsSync(absoluteDirectory)
        ? readMarkdownFiles(absoluteDirectory).map((filePath) =>
            readRecord(root, path.relative(root, filePath), diagnostics),
          )
        : [];
    },
  );
  return [...rootRecords, ...recipeHistory];
}

function readRecord(
  root: string,
  relativePath: string,
  diagnostics: string[],
): SourceRecord {
  const filePath = path.join(root, relativePath);
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(raw);
    const body = parsed.content.trim();
    const firstBodyCharacter = parsed.content.search(/\S/u);
    const bodyStart =
      raw.indexOf(parsed.content) + Math.max(firstBodyCharacter, 0);
    return {
      body,
      bodyStartLine: raw.slice(0, bodyStart).split(/\r?\n/u).length,
      data: parsed.data,
      filePath,
      relativePath,
    };
  } catch (error) {
    diagnostics.push(
      `${relativePath}: cannot parse frontmatter (${messageOf(error)})`,
    );
    return { body: '', bodyStartLine: 1, data: {}, filePath, relativePath };
    return { body: '', bodyStartLine: 1, data: {}, filePath, relativePath };
  }
}

function makeEntry(
  source: SourceRecord,
  type: ContentType,
  identity: string,
  diagnostics: string[],
): LibraryEntry {
  const title = stringValue(source.data.title);
  if (!title) {
    diagnostics.push(`${source.relativePath}: title is required`);
  }
  const version = positiveInteger(source.data.version);
  if (type === 'recipe' && version === undefined) {
    diagnostics.push(
      `${source.relativePath}: recipe version must be a positive integer`,
    );
  }
  const date = dateValue(source.data.date);
  if (type === 'recipe' && !date) {
    diagnostics.push(`${source.relativePath}: recipe date must be YYYY-MM-DD`);
  }

  return {
    basisIngredient: isRecord(source.data.scale_basis)
      ? stringValue(source.data.scale_basis.ingredient)
      : undefined,
    backlinks: [],
    body: source.body,
    corrections: [],
    date,
    identity,
    references: referencesIn(source.body, source.bodyStartLine),
    subjectLabel:
      type === 'experiment'
        ? primarySubjectLabel(source.data.primary_subject)
        : undefined,
    sourcePath: source.relativePath,
    tags: stringArray(source.data.tags),
    title: title ?? '',
    type,
    version,
    yieldText: stringValue(source.data.yield),
  };
}

function validateIdentity(
  source: SourceRecord,
  expectedType: ContentType,
  identity: string,
  diagnostics: string[],
): void {
  if (!IDENTITY_PATTERN.test(identity)) {
    diagnostics.push(
      `${source.relativePath}: identity ${identity} violates the typed identity rule`,
    );
    return;
  }
  if (!identity.startsWith(`${expectedType}/`)) {
    diagnostics.push(
      `${source.relativePath}: identity ${identity} has type mismatched with ${expectedType}`,
    );
  }
}

type InventoryRow = {
  identity: string;
  source: string;
  version: number;
  disposition: string;
};

function readInventories(root: string, diagnostics: string[]): InventoryRow[] {
  const directory = path.join(root, 'records/migrations');
  if (!fs.existsSync(directory)) {
    return [];
  }
  return readMarkdownFiles(directory).flatMap((filePath) => {
    const relativePath = path.relative(root, filePath);
    const source = readRecord(root, relativePath, diagnostics);
    if (source.data.record_type !== 'grandfathering-inventory') {
      diagnostics.push(
        `${relativePath}: migration record must declare grandfathering-inventory`,
      );
      return [];
    }
    if (
      !stringValue(source.data.approved_by) ||
      !dateValue(source.data.approved_on)
    ) {
      diagnostics.push(
        `${relativePath}: grandfathering inventory needs Curator and approval date`,
      );
    }
    return parseTable(source.body.split(/^## /mu)[0] ?? '').flatMap((row) => {
      const sourceFile = unquoteCode(row['Source file']);
      const identity = row.Recipe;
      const version = positiveIntegerText(row['Mapped version']);
      if (
        !sourceFile ||
        !identity ||
        version === undefined ||
        !row.Disposition
      ) {
        diagnostics.push(
          `${relativePath}: invalid grandfathering inventory row`,
        );
        return [];
      }
      return [
        { identity, source: sourceFile, version, disposition: row.Disposition },
      ];
    });
  });
}

function readCurations(
  root: string,
  diagnostics: string[],
): Map<string, SourceRecord> {
  const directory = path.join(root, 'records/curation');
  if (!fs.existsSync(directory)) {
    return new Map();
  }
  const curations = new Map<string, SourceRecord>();
  for (const filePath of readMarkdownFiles(directory)) {
    const relativePath = path.relative(root, filePath);
    const record = readRecord(root, relativePath, diagnostics);
    const subject = stringValue(record.data.subject);
    const candidate = stringValue(record.data.candidate);
    const curator = stringValue(record.data.decided_by);
    const date = dateValue(record.data.decided_on);
    if (
      record.data.record_type !== 'curation' ||
      !candidate ||
      !curator ||
      !date
    ) {
      diagnostics.push(
        `${relativePath}: Curation requires candidate, Curator, and decision date`,
      );
      continue;
    }
    if (record.data.decision === 'merge-alias') {
      if (
        !stringValue(record.data.survivor) ||
        !stringValue(record.data.alias)
      ) {
        diagnostics.push(
          `${relativePath}: merge-alias Curation requires survivor and alias`,
        );
      }
      continue;
    }
    if (record.data.decision === 'retire-candidate') {
      if (!stringValue(record.data.retirement_reason)) {
        diagnostics.push(
          `${relativePath}: retire-candidate Curation requires retirement_reason`,
        );
      }
      continue;
    }
    if (record.data.decision !== 'establish-subject' || !subject) {
      diagnostics.push(`${relativePath}: invalid Curation decision`);
      continue;
    }
    if (curations.has(subject)) {
      diagnostics.push(
        `${relativePath}: multiple Curation records establish ${subject}`,
      );
      continue;
    }
    curations.set(subject, record);
  }
  return curations;
}

function validateRecipe(
  source: SourceRecord,
  entry: LibraryEntry,
  inventories: InventoryRow[],
  diagnostics: string[],
): void {
  for (const key of Object.keys(source.data)) {
    if (!RECIPE_FRONTMATTER.has(key)) {
      diagnostics.push(
        `${source.relativePath}: recipe frontmatter field ${key} is not allowed`,
      );
    }
  }
  const tags = stringArray(source.data.tags);
  const dishTags = tags.filter((tag) => DISH_TAGS.has(tag));
  if (dishTags.length !== 1) {
    diagnostics.push(
      `${source.relativePath}: recipe requires exactly one approved dish-* tag`,
    );
  }
  const basis = source.data.scale_basis;
  if (
    !isRecord(basis) ||
    !isIdentityOfType(basis.ingredient, 'ingredient') ||
    !positiveNumber(basis.quantity_g)
  ) {
    diagnostics.push(
      `${source.relativePath}: scale_basis requires ingredient identity and positive quantity_g`,
    );
  }
  if (/^#\s+/mu.test(source.body)) {
    diagnostics.push(
      `${source.relativePath}: recipe body must not contain an H1`,
    );
  }
  if (/^##\s+(STRUCTURAL NOTES|Structural Notes)/mu.test(source.body)) {
    diagnostics.push(
      `${source.relativePath}: Structural Notes are not part of the recipe contract`,
    );
  }
  validatePhases(source, basis, diagnostics);
  if (
    !isUnpublishedRecipe(source.relativePath) &&
    !isApprovedRecipe(entry, inventories)
  ) {
    diagnostics.push(
      `${source.relativePath}: recipe is not admitted by an exact approved inventory row`,
    );
  }
}

function isUnpublishedRecipe(relativePath: string): boolean {
  return (
    relativePath.startsWith(`recipes${path.sep}drafts${path.sep}`) ||
    relativePath.startsWith(`recipes${path.sep}superseded${path.sep}`)
  );
}

function validateKnowledge(
  source: SourceRecord,
  entry: LibraryEntry,
  curations: Map<string, SourceRecord>,
  diagnostics: string[],
): void {
  if (!curations.has(entry.identity)) {
    diagnostics.push(
      `${source.relativePath}: Knowledge Note lacks an establish-subject Curation record`,
    );
  }
  const requiredSections: Record<KnowledgeType, string[]> = {
    ingredient: ['## Functional Profile', '## Handling', '## Culinary Use'],
    principle: [
      '## Core Mechanism',
      '## Conditions and Controls',
      '## Culinary Implications',
    ],
    technique: ['## Purpose', '## Controls', '## Process', '## Failure Modes'],
  };
  for (const heading of requiredSections[entry.type as KnowledgeType]) {
    if (!source.body.includes(heading)) {
      diagnostics.push(
        `${source.relativePath}: Knowledge Note requires ${heading}`,
      );
    }
  }
}

function validateExperiment(source: SourceRecord, diagnostics: string[]): void {
  for (const key of Object.keys(source.data)) {
    if (!EXPERIMENT_FRONTMATTER.has(key)) {
      diagnostics.push(
        `${source.relativePath}: experiment frontmatter field ${key} is not allowed`,
      );
    }
  }
  if (!isExperimentSubject(source.data.primary_subject)) {
    diagnostics.push(
      `${source.relativePath}: Experiment requires exactly one valid primary_subject`,
    );
  }
  if (source.data.status !== 'draft' && source.data.status !== 'completed') {
    diagnostics.push(
      `${source.relativePath}: Experiment status must be draft or completed`,
    );
    return;
  }
  if (
    source.data.corrects !== undefined &&
    source.data.corrects !== null &&
    !isIdentityOfType(source.data.corrects, 'experiment')
  ) {
    diagnostics.push(
      `${source.relativePath}: corrects must be a bare Experiment identity or null`,
    );
  }
  if (source.data.status !== 'completed') {
    return;
  }
  for (const section of ['Hypothesis', 'Procedure', 'Results', 'Decision']) {
    if (!sectionBody(source.body, section)) {
      diagnostics.push(
        `${source.relativePath}: Completed Experiment requires ## ${section}`,
      );
    }
  }
}

function validateExperiments(
  sources: SourceRecord[],
  entries: Map<string, LibraryEntry[]>,
  recipeVersions: Map<string, LibraryEntry>,
  diagnostics: string[],
): void {
  for (const source of sources.filter((candidate) =>
    candidate.relativePath.startsWith(`experiments${path.sep}`),
  )) {
    const subject = source.data.primary_subject;
    if (!isExperimentSubject(subject)) {
      continue;
    }
    if (subject.type === 'recipe-version') {
      if (!recipeVersions.has(`${subject.recipe}@${subject.version}`)) {
        diagnostics.push(
          `${source.relativePath}: primary_subject recipe version ${subject.recipe}@${subject.version} does not resolve`,
        );
      }
    } else if (subject.type === 'ingredient-use') {
      const recipe = recipeVersions.get(`${subject.recipe}@${subject.version}`);
      if (!recipe) {
        diagnostics.push(
          `${source.relativePath}: primary_subject recipe version ${subject.recipe}@${subject.version} does not resolve`,
        );
      } else if (!hasIngredientUse(recipe.body, subject.phase, subject.key)) {
        diagnostics.push(
          `${source.relativePath}: primary_subject Ingredient Use ${subject.phase}/${subject.key} does not resolve in ${subject.recipe}@${subject.version}`,
        );
      }
    } else if (
      !entries
        .get(subject.identity)
        ?.some((entry) => entry.type === subject.type)
    ) {
      diagnostics.push(
        `${source.relativePath}: primary_subject ${subject.identity} does not resolve as a ${subject.type}`,
      );
    }
    const corrects = stringValue(source.data.corrects);
    if (corrects) {
      const corrected = entries
        .get(corrects)
        ?.find((entry) => entry.type === 'experiment');
      const correctedSource = sources.find(
        (candidate) => stringValue(candidate.data.identity) === corrects,
      );
      if (
        corrected?.type !== 'experiment' ||
        correctedSource?.data.status !== 'completed'
      ) {
        diagnostics.push(
          `${source.relativePath}: corrects must resolve to a Completed Experiment`,
        );
      } else if (corrected.identity === stringValue(source.data.identity)) {
        diagnostics.push(
          `${source.relativePath}: an Experiment cannot correct itself`,
        );
      }
    }
  }
}

function validatePriorCompletedEvidence(
  sources: SourceRecord[],
  diagnostics: string[],
): void {
  const previousRoot = process.env.CULINARY_LIBRARY_PREVIOUS_ROOT;
  if (!previousRoot) {
    return;
  }
  const previousDirectory = path.join(previousRoot, 'experiments');
  if (!fs.existsSync(previousDirectory)) {
    return;
  }
  const previous = new Map<string, string>();
  for (const filePath of readMarkdownFiles(previousDirectory)) {
    const source = readRecord(
      previousRoot,
      path.relative(previousRoot, filePath),
      diagnostics,
    );
    const identity = stringValue(source.data.identity);
    if (identity && source.data.status === 'completed') {
      previous.set(identity, completedEvidenceFingerprint(source));
    }
  }
  const current = new Map(
    sources
      .filter((candidate) =>
        candidate.relativePath.startsWith(`experiments${path.sep}`),
      )
      .flatMap((source) => {
        const identity = stringValue(source.data.identity);
        return identity ? [[identity, source] as const] : [];
      }),
  );
  for (const [identity, fingerprint] of previous) {
    const source = current.get(identity);
    if (!source) {
      diagnostics.push(
        `experiments: prior completed evidence for ${identity} is missing`,
      );
    } else if (
      source.data.status !== 'completed' ||
      fingerprint !== completedEvidenceFingerprint(source)
    ) {
      diagnostics.push(
        `${source.relativePath}: prior completed evidence for ${identity} is immutable`,
      );
    }
  }
}

function completedEvidenceFingerprint(source: SourceRecord): string {
  return stableJson({
    decision: sectionBody(source.body, 'Decision'),
    hypothesis: sectionBody(source.body, 'Hypothesis'),
    primary_subject: source.data.primary_subject,
    procedure: sectionBody(source.body, 'Procedure'),
    results: sectionBody(source.body, 'Results'),
  });
}

function stableJson(value: unknown): string {
  if (Array.isArray(value)) {
    return `[${value.map(stableJson).join(',')}]`;
  }
  if (isRecord(value)) {
    return `{${Object.keys(value)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${stableJson(value[key])}`)
      .join(',')}}`;
  }
  return JSON.stringify(value);
}

function sectionBody(body: string, heading: string): string | undefined {
  const match = body.match(
    new RegExp(
      `^## ${heading}\\s*\\n\\s*\\n([\\s\\S]*?)(?=^## |(?![\\s\\S]))`,
      'mu',
    ),
  );
  return match?.[1]?.trim() || undefined;
}

type ExperimentSubject =
  | { type: 'recipe-version'; recipe: string; version: number }
  | {
      type: 'ingredient-use';
      recipe: string;
      version: number;
      phase: string;
      key: string;
    }
  | { type: 'technique' | 'principle'; identity: string };

function isExperimentSubject(value: unknown): value is ExperimentSubject {
  if (!isRecord(value) || typeof value.type !== 'string') {
    return false;
  }
  if (value.type === 'recipe-version') {
    return (
      hasExactlyKeys(value, ['type', 'recipe', 'version']) &&
      isIdentityOfType(value.recipe, 'recipe') &&
      positiveInteger(value.version) !== undefined
    );
  }
  if (value.type === 'ingredient-use') {
    return (
      hasExactlyKeys(value, ['type', 'recipe', 'version', 'phase', 'key']) &&
      isIdentityOfType(value.recipe, 'recipe') &&
      positiveInteger(value.version) !== undefined &&
      typeof value.phase === 'string' &&
      /^PHASE [A-Z]+ — .+/u.test(value.phase) &&
      typeof value.key === 'string' &&
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/u.test(value.key)
    );
  }
  return (
    hasExactlyKeys(value, ['type', 'identity']) &&
    (value.type === 'technique' || value.type === 'principle') &&
    isIdentityOfType(value.identity, value.type)
  );
}

function hasExactlyKeys(
  value: Record<string, unknown>,
  keys: string[],
): boolean {
  const actual = Object.keys(value).sort();
  return (
    actual.length === keys.length &&
    actual.every((key, index) => key === keys.slice().sort()[index])
  );
}

function primarySubjectLabel(value: unknown): string | undefined {
  if (!isExperimentSubject(value)) {
    return undefined;
  }
  if (value.type === 'recipe-version') {
    return `${value.recipe} v${value.version}`;
  }
  if (value.type === 'ingredient-use') {
    return `${value.recipe} v${value.version}; ${value.phase}; Ingredient Use ${value.key}`;
  }
  return value.identity;
}

function hasIngredientUse(
  body: string,
  phaseName: string,
  key: string,
): boolean {
  const phase =
    body.match(
      new RegExp(
        `^## ${escapeRegExp(phaseName)}\\s*\\n([\\s\\S]*?)(?=^## |(?![\\s\\S]))`,
        'mu',
      ),
    )?.[1] ?? '';
  return tableAfter(phase, 'Ingredient Uses').some(
    (row) => row.Key?.trim() === key,
  );
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');
}
function validatePhases(
  source: SourceRecord,
  basis: unknown,
  diagnostics: string[],
): void {
  const phaseStarts = [...source.body.matchAll(/^## (PHASE [A-Z]+ — .+)$/gmu)];
  if (phaseStarts.length === 0) {
    diagnostics.push(
      `${source.relativePath}: recipe requires semantic PHASE headings`,
    );
    return;
  }
  const phaseNames = new Set<string>();
  const producedOutputs = new Map<
    string,
    { consumers: number; phase: string }
  >();
  let basisTotal = 0;
  for (let index = 0; index < phaseStarts.length; index += 1) {
    const match = phaseStarts[index];
    const phaseName = match?.[1] ?? '';
    if (phaseNames.has(phaseName)) {
      diagnostics.push(`${source.relativePath}: duplicate phase ${phaseName}`);
    }
    phaseNames.add(phaseName);
    const start = (match?.index ?? 0) + (match?.[0].length ?? 0);
    const end =
      phaseStarts[index + 1]?.index ??
      source.body.search(/^## FAILURE MODES$/mu);
    const phase = source.body.slice(start, end < 0 ? source.body.length : end);
    const headings = [...phase.matchAll(/^### (.+)$/gmu)].map(
      (heading) => heading[1] ?? '',
    );
    const knownOrder = [
      'Ingredient Uses',
      'Technique Applications',
      'Principles',
      'Method',
      'Phase Outputs Used',
      'Phase Outputs',
    ];
    let last = -1;
    for (const heading of headings) {
      const position = knownOrder.indexOf(heading);
      if (position < 0) {
        diagnostics.push(
          `${source.relativePath}: ${phaseName} has unsupported subsection ${heading}`,
        );
      } else if (position < last) {
        diagnostics.push(
          `${source.relativePath}: ${phaseName} subsections are out of semantic order`,
        );
      } else {
        last = position;
      }
    }
    if (
      !headings.includes('Method') ||
      !/^### Method\s*\n\s*\n1\. /mu.test(phase)
    ) {
      diagnostics.push(
        `${source.relativePath}: ${phaseName} requires an ordered imperative Method`,
      );
    }
    const uses = tableAfter(phase, 'Ingredient Uses');
    const phaseIngredientReferences = new Set<string>();
    for (const row of uses) {
      const ingredient = referenceIdentity(row.Ingredient);
      const quantity = row.Quantity?.trim();
      if (!ingredient || !quantity) {
        diagnostics.push(
          `${source.relativePath}: ${phaseName} Ingredient Use needs ingredient and quantity`,
        );
        continue;
      }
      if (!ingredient.startsWith('ingredient/')) {
        diagnostics.push(
          `${source.relativePath}: ${phaseName} Ingredient Uses requires an ingredient target, not ${ingredient}`,
        );
      }
      if (phaseIngredientReferences.has(ingredient)) {
        diagnostics.push(
          `${source.relativePath}: ${phaseName} repeats Ingredient Use ${ingredient}`,
        );
      }
      phaseIngredientReferences.add(ingredient);
      const numeric = quantity.match(/^(\d+(?:\.\d+)?) (g|ml)$/u);
      if (!numeric && quantity !== 'As needed') {
        diagnostics.push(
          `${source.relativePath}: ${phaseName} quantity ${quantity} must use g, ml, or As needed`,
        );
      }
      const scale = row.Scaling?.trim();
      if (numeric && isRecord(basis) && positiveNumber(basis.quantity_g)) {
        const expected = scalingFor(
          numeric[1] ?? '0',
          String(basis.quantity_g),
        );
        if (scale !== expected) {
          diagnostics.push(
            `${source.relativePath}: ${phaseName} scaling ${scale ?? ''} must be ${expected}`,
          );
        }
        if (ingredient === basis.ingredient && numeric[2] === 'g') {
          basisTotal += Number(numeric[1]);
        }
      } else if (quantity === 'As needed' && scale !== '—') {
        diagnostics.push(
          `${source.relativePath}: ${phaseName} As needed quantity must use — scaling`,
        );
      }
    }
    for (const reference of referencesIn(
      sectionAfter(phase, 'Technique Applications'),
    )) {
      if (!reference.identity.startsWith('technique/')) {
        diagnostics.push(
          `${source.relativePath}: ${phaseName} Technique Applications requires a technique target, not ${reference.identity}`,
        );
      }
    }
    for (const reference of referencesIn(sectionAfter(phase, 'Principles'))) {
      if (!reference.identity.startsWith('principle/')) {
        diagnostics.push(
          `${source.relativePath}: ${phaseName} Principles requires a principle target, not ${reference.identity}`,
        );
      }
    }
    for (const output of tableAfter(phase, 'Phase Outputs')) {
      const key = output.Key?.trim();
      if (!key || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/u.test(key)) {
        diagnostics.push(
          `${source.relativePath}: ${phaseName} Phase Output requires a lowercase local key`,
        );
      } else if (producedOutputs.has(key)) {
        diagnostics.push(
          `${source.relativePath}: ${phaseName} duplicates Phase Output ${key}`,
        );
      } else {
        producedOutputs.set(key, { consumers: 0, phase: phaseName });
      }
    }
    for (const outputUse of tableAfter(phase, 'Phase Outputs Used')) {
      const key = outputUse.Use?.match(/`([a-z0-9]+(?:-[a-z0-9]+)*)`/u)?.[1];
      const producer = key ? producedOutputs.get(key) : undefined;
      if (!key || !producer) {
        diagnostics.push(
          `${source.relativePath}: ${phaseName} Phase Outputs Used must name an earlier local key`,
        );
      } else {
        producer.consumers += 1;
      }
    }
  }
  if (
    !/^## FAILURE MODES\s*\n\s*\n\| Symptom \| Likely cause \| Corrective action \|/mu.test(
      source.body,
    )
  ) {
    diagnostics.push(
      `${source.relativePath}: recipe requires a Failure Modes table`,
    );
  }
  if (
    isRecord(basis) &&
    positiveNumber(basis.quantity_g) &&
    basisTotal !== Number(basis.quantity_g)
  ) {
    diagnostics.push(
      `${source.relativePath}: scale basis Ingredient Uses total ${basisTotal} g, not ${basis.quantity_g} g`,
    );
  }
  for (const [key, output] of producedOutputs) {
    if (output.consumers === 0) {
      diagnostics.push(
        `${source.relativePath}: Phase Output ${key} from ${output.phase} has no later consumer`,
      );
    }
  }
}

function validateInventorySources(
  inventories: InventoryRow[],
  diagnostics: string[],
): void {
  const seen = new Set<string>();
  for (const inventory of inventories) {
    const exactVersion = `${inventory.identity}@${inventory.version}`;
    if (seen.has(exactVersion)) {
      diagnostics.push(
        `records/migrations: multiple inventory rows admit ${exactVersion}`,
      );
    }
    seen.add(exactVersion);
  }
}

function validateReferences(
  entriesByIdentity: Map<string, LibraryEntry[]>,
  recipeVersions: Map<string, LibraryEntry>,
  diagnostics: string[],
): void {
  for (const entries of entriesByIdentity.values()) {
    for (const entry of entries) {
      for (const reference of entry.references) {
        const targets = entriesByIdentity.get(reference.identity) ?? [];
        if (targets.length === 0) {
          diagnostics.push(
            `${entry.sourcePath}:${reference.line}: missing reference ${reference.identity}`,
          );
        } else if (
          reference.version !== undefined &&
          !reference.identity.startsWith('recipe/')
        ) {
          diagnostics.push(
            `${entry.sourcePath}:${reference.line}: exact version reference ${reference.identity}@${reference.version} must target a Recipe`,
          );
        } else if (
          reference.version !== undefined &&
          !recipeVersions.has(`${reference.identity}@${reference.version}`)
        ) {
          diagnostics.push(
            `${entry.sourcePath}:${reference.line}: missing Recipe Version ${reference.identity}@${reference.version}`,
          );
        }
      }
    }
  }
}

function recipeVersionIdentity(entry: LibraryEntry): string | undefined {
  return entry.version === undefined
    ? undefined
    : `${entry.identity}@${entry.version}`;
}
function isApprovedRecipe(
  entry: LibraryEntry,
  inventories: InventoryRow[],
): boolean {
  return inventories.some(
    (row) =>
      row.identity === entry.identity &&
      row.version === entry.version &&
      row.disposition === 'retain-canonical',
  );
}

function referencesIn(body: string, startLine = 1): ContentReference[] {
  return [...body.matchAll(REF_PATTERN)].map((match) => ({
    identity: match[1] ?? '',
    line: startLine + body.slice(0, match.index).split(/\r?\n/u).length - 1,
    version: match[2] ? Number(match[2]) : undefined,
  }));
}

function tableAfter(
  markdown: string,
  heading: string,
): Record<string, string>[] {
  const match = markdown.match(
    new RegExp(`^### ${heading}\\s*\\n\\s*\\n((?:\\|.*\\n?)+)`, 'mu'),
  );
  return match ? parseTable(match[1] ?? '') : [];
}

function sectionAfter(markdown: string, heading: string): string {
  const match = markdown.match(
    new RegExp(`^### ${heading}\\s*\\n([\\s\\S]*?)(?=^### |$)`, 'mu'),
  );
  return match?.[1] ?? '';
}

function parseTable(markdown: string): Record<string, string>[] {
  const lines = markdown
    .split(/\r?\n/u)
    .filter((line) => line.trim().startsWith('|'));
  if (lines.length < 2) {
    return [];
  }
  const headers = splitTableLine(lines[0] ?? '');
  return lines.slice(2).map((line) => {
    const values = splitTableLine(line);
    return Object.fromEntries(
      headers.map((header, index) => [header, values[index] ?? '']),
    );
  });
}

function splitTableLine(line: string): string[] {
  return line
    .trim()
    .replace(/^\||\|$/gu, '')
    .split('|')
    .map((value) => value.trim());
}

function referenceIdentity(value: string | undefined): string | undefined {
  return value?.match(/\]\(ref:([^@)]+)(?:@\d+)?\)/u)?.[1];
}

function scalingFor(quantity: string, basis: string): string {
  const numerator = decimalToInteger(quantity);
  const denominator = decimalToInteger(basis);
  const quantityScale = 10n ** BigInt(decimalPlaces(quantity));
  const basisScale = 10n ** BigInt(decimalPlaces(basis));
  const scaledNumerator = numerator * basisScale * 10_000n;
  const scaledDenominator = denominator * quantityScale;
  const hundredths =
    (scaledNumerator + scaledDenominator / 2n) / scaledDenominator;
  return `${(hundredths / 100n).toString()}.${(hundredths % 100n).toString().padStart(2, '0')}%`;
}

function decimalToInteger(value: string): bigint {
  return BigInt(value.replace('.', ''));
}

function decimalPlaces(value: string): number {
  return value.split('.')[1]?.length ?? 0;
}

function readMarkdownFiles(directory: string): string[] {
  const files = fs
    .readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) => {
      const filePath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        return readMarkdownFiles(filePath);
      }
      return entry.isFile() && entry.name.endsWith('.md') ? [filePath] : [];
    });
  return files.sort();
}

function stringValue(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined;
}

function dateValue(value: unknown): string | undefined {
  const candidate =
    value instanceof Date
      ? value.toISOString().slice(0, 10)
      : stringValue(value);
  return candidate && /^\d{4}-\d{2}-\d{2}$/u.test(candidate)
    ? candidate
    : undefined;
}

function positiveInteger(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isInteger(value) && value > 0
    ? value
    : undefined;
}

function positiveIntegerText(value: string | undefined): number | undefined {
  return value && /^\d+$/u.test(value)
    ? positiveInteger(Number(value))
    : undefined;
}

function positiveNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value > 0;
}

function stringArray(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === 'string')
    : [];
}

function isIdentityOfType(value: unknown, type: ContentType): boolean {
  return (
    typeof value === 'string' &&
    value.startsWith(`${type}/`) &&
    IDENTITY_PATTERN.test(value)
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function unquoteCode(value: string | undefined): string | undefined {
  return value?.replace(/^`|`$/gu, '').trim() || undefined;
}

function messageOf(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
