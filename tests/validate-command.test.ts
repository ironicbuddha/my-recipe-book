import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

import { afterEach, describe, expect, it } from 'vitest';

const roots: string[] = [];

afterEach(() => {
  for (const root of roots.splice(0)) {
    fs.rmSync(root, { force: true, recursive: true });
  }
});

function copyPilotLibrary(): string {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'culinary-command-'));
  roots.push(root);
  for (const directory of [
    'ingredients',
    'principles',
    'recipes',
    'records',
    'techniques',
  ]) {
    fs.cpSync(path.join(process.cwd(), directory), path.join(root, directory), {
      recursive: true,
    });
  }
  return root;
}

function validate(root: string) {
  return spawnSync('make', ['validate'], {
    cwd: process.cwd(),
    encoding: 'utf8',
    env: { ...process.env, CULINARY_LIBRARY_ROOT: root },
  });
}

function build(root: string) {
  return spawnSync('pnpm', ['build'], {
    cwd: process.cwd(),
    encoding: 'utf8',
    env: { ...process.env, CULINARY_LIBRARY_ROOT: root },
  });
}

function writeSupersededRecipe(root: string, bodySuffix = ''): string {
  const canonicalPath = path.join(
    root,
    'recipes/2026-02-19 - Singapore Chicken Rice.md',
  );
  const supersededPath = path.join(
    root,
    'recipes/superseded/singapore-chicken-rice@2.md',
  );
  const source = fs
    .readFileSync(canonicalPath, 'utf8')
    .replace('version: 1', 'version: 2');
  fs.mkdirSync(path.dirname(supersededPath), { recursive: true });
  fs.writeFileSync(supersededPath, `${source.trimEnd()}${bodySuffix}\n`);
  return supersededPath;
}

function writeCanonicalRecipeWithoutHero(root: string): void {
  const sourcePath = path.join(root, 'recipes/2026-02-19 - Singapore Chicken Rice.md');
  const destinationPath = path.join(root, 'recipes/2026-09-11 - Hero Fallback Pilot.md');
  const source = fs
    .readFileSync(sourcePath, 'utf8')
    .replace('Singapore Chicken Rice (Hainanese)', 'Hero fallback pilot')
    .replace('recipe/singapore-chicken-rice', 'recipe/hero-fallback-pilot');
  fs.writeFileSync(destinationPath, source);

  const inventoryPath = path.join(root, 'records/migrations/first-pilot.md');
  fs.writeFileSync(
    inventoryPath,
    fs.readFileSync(inventoryPath, 'utf8').replace(
      '\n## Route Preservation',
      '\n| `recipes/2026-09-11 - Hero Fallback Pilot.md` | recipe/hero-fallback-pilot | v1.0 | 1 | retain-canonical | historical evidence and Promotion Record only |\n\n## Route Preservation',
    ),
  );
}

describe('make validate', () => {
  it('accepts the isolated approved library', () => {
    const result = validate(copyPilotLibrary());

    expect(result.status).toBe(0);
    expect(result.stdout).toContain(
      'Validation passed: 1 recipe(s), 23 Knowledge Note(s).',
    );
  });

  it('fails the entire command for invalid authoritative content', () => {
    const root = copyPilotLibrary();
    const sourcePath = path.join(
      root,
      'recipes/2026-02-19 - Singapore Chicken Rice.md',
    );
    fs.writeFileSync(
      sourcePath,
      fs
        .readFileSync(sourcePath, 'utf8')
        .replace('800 g | 100.00%', '800 g | 80.00%'),
    );

    const result = validate(root);

    expect(result.status).toBe(2);
    expect(result.stderr).toContain('scaling 80.00% must be 100.00%');
  });

  it('fails the Astro publication build for invalid authoritative content', () => {
    const root = copyPilotLibrary();
    const sourcePath = path.join(root, 'recipes/2026-02-19 - Singapore Chicken Rice.md');
    fs.writeFileSync(sourcePath, fs.readFileSync(sourcePath, 'utf8').replace('800 g | 100.00%', '800 g | 80.00%'));

    const result = build(root);

    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain('scaling 80.00% must be 100.00%');
  });

  it('builds a recipe without a matching hero asset as a readable page without a hero figure', () => {
    const root = copyPilotLibrary();
    writeCanonicalRecipeWithoutHero(root);

    const result = build(root);
    const page = fs.readFileSync(
      path.join(process.cwd(), 'dist/recipes/hero-fallback-pilot/index.html'),
      'utf8',
    );

    expect(result.status).toBe(0);
    expect(page).toContain('<h1>Hero fallback pilot</h1>');
    expect(page).not.toContain('recipe-hero');
  });

  it('accepts a canonical Recipe reference to an exact Superseded Recipe Version', () => {
    const root = copyPilotLibrary();
    const canonicalPath = path.join(
      root,
      'recipes/2026-02-19 - Singapore Chicken Rice.md',
    );
    fs.writeFileSync(
      canonicalPath,
      `${fs.readFileSync(canonicalPath, 'utf8').trimEnd()}\nSee [the prior version](ref:recipe/singapore-chicken-rice@2).\n`,
    );
    writeSupersededRecipe(root);

    const result = validate(root);

    expect(result.status).toBe(0);
    expect(build(root).status).toBe(0);
    const ingredientPage = fs.readFileSync(
      path.join(process.cwd(), 'dist/ingredients/whole-chicken/index.html'),
      'utf8',
    );
    expect(ingredientPage).toContain('href="/recipes/singapore-chicken-rice/"');
    expect(ingredientPage).toContain('Singapore Chicken Rice (Hainanese)');
  });

  it('fails a missing exact Recipe Version in an unpublished authoritative record with its physical line', () => {
    const root = copyPilotLibrary();
    const supersededPath = writeSupersededRecipe(
      root,
      '\nSee [a missing version](ref:recipe/singapore-chicken-rice@9).',
    );
    const missingLine =
      fs
        .readFileSync(supersededPath, 'utf8')
        .split(/\r?\n/u)
        .findIndex((line) => line.includes('@9')) + 1;

    const result = validate(root);

    expect(result.status).toBe(2);
    expect(result.stderr).toContain(
      `recipes/superseded/singapore-chicken-rice@2.md:${missingLine}: missing Recipe Version recipe/singapore-chicken-rice@9`,
    );
  });

  it('rejects a versioned non-Recipe target through the public validation command', () => {
    const root = copyPilotLibrary();
    const supersededPath = writeSupersededRecipe(
      root,
      '\nSee [salt version](ref:ingredient/salt@2).',
    );
    const line =
      fs
        .readFileSync(supersededPath, 'utf8')
        .split(/\r?\n/u)
        .findIndex((source) => source.includes('salt@2')) + 1;

    const result = validate(root);

    expect(result.status).toBe(2);
    expect(result.stderr).toContain(
      `recipes/superseded/singapore-chicken-rice@2.md:${line}: exact version reference ingredient/salt@2 must target a Recipe`,
    );
  });

  it('rejects duplicate exact Recipe Versions even when their source files differ', () => {
    const root = copyPilotLibrary();
    const firstVersion = writeSupersededRecipe(root);
    const duplicateVersion = path.join(
      root,
      'recipes/drafts/singapore-chicken-rice@2.md',
    );
    fs.mkdirSync(path.dirname(duplicateVersion), { recursive: true });
    fs.copyFileSync(firstVersion, duplicateVersion);

    const result = validate(root);

    expect(result.status).toBe(2);
    expect(result.stderr).toContain(
      'recipes/superseded/singapore-chicken-rice@2.md: Recipe Version recipe/singapore-chicken-rice@2 is not unique',
    );
  });
});
