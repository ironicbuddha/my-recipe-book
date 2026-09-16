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
    'publisher',
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

function validate(root: string, previousRoot?: string) {
  return spawnSync('make', ['validate'], {
    cwd: process.cwd(),
    encoding: 'utf8',
    env: {
      ...process.env,
      CULINARY_LIBRARY_ROOT: root,
      ...(previousRoot ? { CULINARY_LIBRARY_PREVIOUS_ROOT: previousRoot } : {}),
    },
  });
}

function completedExperiment(
  identity: string,
  primarySubject: string,
  corrects = '',
): string {
  return `---
title: "${identity}"
date: 2026-09-11
identity: ${identity}
status: completed
primary_subject:
${primarySubject}
${corrects ? `corrects: ${corrects}\n` : ''}---

## Hypothesis

The control can be reproduced.

## Procedure

1. Follow the recorded conditions.

## Results

The observed result is recorded even when it does not support the hypothesis.

## Decision

Keep the evidence available for review.
`;
}

function writeExperiment(root: string, name: string, contents: string): void {
  const destination = path.join(root, 'experiments', name);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, contents);
}

function writePromotion(root: string, contents: string): void {
  const destination = path.join(
    root,
    'records/promotions/singapore-chicken-rice@2.md',
  );
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, contents);
}

function writeRetirement(root: string, contents: string): void {
  const destination = path.join(root, 'records/curation/legacy-poaching.md');
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, contents);
}

function writePublisherRoutes(root: string, contents: string): void {
  const destination = path.join(root, 'publisher/recipe-routes.json');
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, contents);
}

function retirementRecord(
  survivor = 'technique/poaching',
  retiredIdentity = 'technique/legacy-poaching',
): string {
  return `---
record_type: identity-retirement
retired_identity: ${retiredIdentity}
survivor: ${survivor}
reason: "Fixture duplicate merged through the retirement mechanics."
decided_by: "Fixture Curator"
decided_on: 2026-09-11
---
`;
}

function legacyPoachingNote(): string {
  return `---
title: "Legacy poaching"
identity: technique/legacy-poaching
---

## Purpose

Fixture-only legacy technique.

## Controls

Keep a gentle simmer.

## Process

Poach gently.

## Failure Modes

Avoid boiling.
`;
}

function legacyPoachingCuration(): string {
  return `---
record_type: curation
candidate: candidate/legacy-poaching-label
candidate_label: "Legacy poaching"
evidence_sources: [recipe/singapore-chicken-rice@1]
decision: establish-subject
subject: technique/legacy-poaching
decided_by: "Fixture Curator"
decided_on: 2026-09-11
---

## Evidence

Fixture-only predecessor subject.

## Rationale

Fixture-only Curation record for retirement mechanics.
`;
}

function promotionRecord(
  supportingExperiments = '  - experiment/promotion-trial',
): string {
  return `---
record_type: promotion
recipe: recipe/singapore-chicken-rice
version: 2
supporting_experiments:
${supportingExperiments}
accepted_by: "Fixture Curator"
accepted_on: 2026-09-11
---

## Rationale

The recorded result is acceptable despite the hypothesis outcome.

## Known Shortcomings

The fixture records a remaining limitation for Curator review.
`;
}

function preparePromotionTransition(root: string): void {
  const canonicalPath = path.join(
    root,
    'recipes/2026-02-19 - Singapore Chicken Rice.md',
  );
  const versionOne = fs.readFileSync(canonicalPath, 'utf8');
  const versionTwo = versionOne.replace('version: 1', 'version: 2');
  fs.mkdirSync(path.join(root, 'recipes/superseded'), { recursive: true });
  fs.writeFileSync(
    path.join(root, 'recipes/superseded/singapore-chicken-rice@1.md'),
    versionOne,
  );
  fs.writeFileSync(canonicalPath, versionTwo);
  writeExperiment(
    root,
    '2026-09-11 - Promotion trial.md',
    completedExperiment(
      'experiment/promotion-trial',
      '  type: recipe-version\n  recipe: recipe/singapore-chicken-rice\n  version: 2',
    ),
  );
  writePromotion(root, promotionRecord());
}

function build(root: string, previousRoot?: string) {
  return spawnSync('pnpm', ['build'], {
    cwd: process.cwd(),
    encoding: 'utf8',
    env: {
      ...process.env,
      CULINARY_LIBRARY_ROOT: root,
      ...(previousRoot ? { CULINARY_LIBRARY_PREVIOUS_ROOT: previousRoot } : {}),
    },
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
  const sourcePath = path.join(
    root,
    'recipes/2026-02-19 - Singapore Chicken Rice.md',
  );
  const destinationPath = path.join(
    root,
    'recipes/2026-09-11 - Hero Fallback Pilot.md',
  );
  const source = fs
    .readFileSync(sourcePath, 'utf8')
    .replace('Singapore Chicken Rice (Hainanese)', 'Hero fallback pilot')
    .replace('recipe/singapore-chicken-rice', 'recipe/hero-fallback-pilot');
  fs.writeFileSync(destinationPath, source);

  const inventoryPath = path.join(root, 'records/migrations/first-pilot.md');
  fs.writeFileSync(
    inventoryPath,
    fs
      .readFileSync(inventoryPath, 'utf8')
      .replace(
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
      'Validation passed: 6 recipe(s), 70 Knowledge Note(s), 0 Completed Experiment(s).',
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

    const result = build(root);

    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain('scaling 80.00% must be 100.00%');
  });

  it(
    'builds a recipe without a matching hero asset as a readable page without a hero figure',
    () => {
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
    },
    15_000,
  );

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

  it('publishes completed evidence and derived correction notices for every subject form', () => {
    const root = copyPilotLibrary();
    const draftPath = path.join(
      root,
      'recipes/drafts/singapore-chicken-rice@2.md',
    );
    fs.mkdirSync(path.dirname(draftPath), { recursive: true });
    fs.writeFileSync(
      draftPath,
      fs
        .readFileSync(
          path.join(root, 'recipes/2026-02-19 - Singapore Chicken Rice.md'),
          'utf8',
        )
        .replace('version: 1', 'version: 2'),
    );
    writeExperiment(
      root,
      '2026-09-11 - Recipe.md',
      completedExperiment(
        'experiment/recipe-trial',
        '  type: recipe-version\n  recipe: recipe/singapore-chicken-rice\n  version: 1',
      ),
    );
    writeExperiment(
      root,
      '2026-09-11 - Ingredient use.md',
      completedExperiment(
        'experiment/ingredient-use-trial',
        '  type: ingredient-use\n  recipe: recipe/singapore-chicken-rice\n  version: 1\n  phase: PHASE A — POACH CHICKEN AND MAKE STOCK\n  key: chicken',
      ),
    );
    writeExperiment(
      root,
      '2026-09-11 - Technique.md',
      completedExperiment(
        'experiment/technique-trial',
        '  type: technique\n  identity: technique/poaching',
      ),
    );
    writeExperiment(
      root,
      '2026-09-11 - Principle.md',
      completedExperiment(
        'experiment/principle-trial',
        '  type: principle\n  identity: principle/thermal-shock-for-skin-texture',
      ),
    );
    writeExperiment(
      root,
      '2026-09-11 - Correction.md',
      completedExperiment(
        'experiment/recipe-trial-correction',
        '  type: recipe-version\n  recipe: recipe/singapore-chicken-rice\n  version: 1',
        'experiment/recipe-trial',
      ),
    );
    writeExperiment(
      root,
      '2026-09-11 - Unpublished recipe.md',
      completedExperiment(
        'experiment/unpublished-recipe-trial',
        '  type: recipe-version\n  recipe: recipe/singapore-chicken-rice\n  version: 2',
      ),
    );

    const result = validate(root);

    expect(result.status).toBe(0);
    expect(result.stdout).toContain('6 Completed Experiment(s).');
    expect(build(root).status).toBe(0);

    const experiment = fs.readFileSync(
      path.join(
        process.cwd(),
        'dist/experiments/ingredient-use-trial/index.html',
      ),
      'utf8',
    );
    const original = fs.readFileSync(
      path.join(process.cwd(), 'dist/experiments/recipe-trial/index.html'),
      'utf8',
    );
    const unpublishedSubject = fs.readFileSync(
      path.join(
        process.cwd(),
        'dist/experiments/unpublished-recipe-trial/index.html',
      ),
      'utf8',
    );
    expect(experiment).toContain('recipe/singapore-chicken-rice v1; PHASE A');
    expect(experiment).not.toContain('href="/recipes/singapore-chicken-rice/"');
    expect(unpublishedSubject).toContain('recipe/singapore-chicken-rice v2');
    expect(unpublishedSubject).not.toContain(
      'href="/recipes/singapore-chicken-rice/"',
    );
    expect(original).toContain('Published corrections');
    expect(original).toContain('href="/experiments/recipe-trial-correction/"');
  });

  it('rejects missing subjects, incomplete completion evidence, and changed prior evidence', () => {
    const root = copyPilotLibrary();
    const previousRoot = copyPilotLibrary();
    const original = completedExperiment(
      'experiment/immutable-trial',
      '  type: recipe-version\n  recipe: recipe/singapore-chicken-rice\n  version: 1',
    );
    writeExperiment(previousRoot, '2026-09-11 - Immutable.md', original);
    writeExperiment(
      root,
      '2026-09-11 - Immutable.md',
      original.replace('The control can be reproduced.', 'Changed evidence.'),
    );
    writeExperiment(
      root,
      '2026-09-11 - Broken.md',
      completedExperiment(
        'experiment/broken-trial',
        '  type: recipe-version\n  recipe: recipe/singapore-chicken-rice\n  version: 99',
      ).replace(
        '## Results\n\nThe observed result is recorded even when it does not support the hypothesis.\n\n',
        '',
      ),
    );

    const result = validate(root, previousRoot);

    expect(result.status).toBe(2);
    expect(result.stderr).toContain('requires ## Results');
    expect(result.stderr).toContain(
      'recipe/singapore-chicken-rice@99 does not resolve',
    );
    expect(result.stderr).toContain(
      'prior completed evidence for experiment/immutable-trial is immutable',
    );
  });

  it('admits an exact Curator Promotion only with a prior draft, matching whole-Recipe evidence, and preserved predecessor', () => {
    const previousRoot = copyPilotLibrary();
    const draftPath = path.join(
      previousRoot,
      'recipes/drafts/singapore-chicken-rice@2.md',
    );
    fs.mkdirSync(path.dirname(draftPath), { recursive: true });
    fs.writeFileSync(
      draftPath,
      fs
        .readFileSync(
          path.join(
            previousRoot,
            'recipes/2026-02-19 - Singapore Chicken Rice.md',
          ),
          'utf8',
        )
        .replace('version: 1', 'version: 2'),
    );
    const root = copyPilotLibrary();
    preparePromotionTransition(root);

    const result = validate(root, previousRoot);

    expect(result.status).toBe(0);
    expect(build(root, previousRoot).status).toBe(0);
    expect(
      fs.existsSync(
        path.join(
          process.cwd(),
          'dist/recipes/singapore-chicken-rice@1/index.html',
        ),
      ),
    ).toBe(false);
  }, 15_000);

  it('fails closed when the public command cannot compare a Promotion with a prior revision', () => {
    const root = copyPilotLibrary();
    preparePromotionTransition(root);

    const result = validate(root);

    expect(result.status).toBe(2);
    expect(result.stderr).toContain(
      'records/promotions: prior revision is required to validate Promotion history',
    );
  });

  it('rejects incomplete or wrongly scoped Promotion evidence and a mutated predecessor through the public command', () => {
    const previousRoot = copyPilotLibrary();
    const draftPath = path.join(
      previousRoot,
      'recipes/drafts/singapore-chicken-rice@2.md',
    );
    fs.mkdirSync(path.dirname(draftPath), { recursive: true });
    fs.writeFileSync(
      draftPath,
      fs
        .readFileSync(
          path.join(
            previousRoot,
            'recipes/2026-02-19 - Singapore Chicken Rice.md',
          ),
          'utf8',
        )
        .replace('version: 1', 'version: 2'),
    );
    const root = copyPilotLibrary();
    preparePromotionTransition(root);
    fs.writeFileSync(
      path.join(root, 'experiments/2026-09-11 - Promotion trial.md'),
      completedExperiment(
        'experiment/promotion-trial',
        '  type: ingredient-use\n  recipe: recipe/singapore-chicken-rice\n  version: 2\n  phase: PHASE A — POACH CHICKEN AND MAKE STOCK\n  key: chicken',
      ),
    );
    const predecessorPath = path.join(
      root,
      'recipes/superseded/singapore-chicken-rice@1.md',
    );
    fs.writeFileSync(
      predecessorPath,
      fs.readFileSync(predecessorPath, 'utf8').replace('800 g', '799 g'),
    );

    const result = validate(root, previousRoot);

    expect(result.status).toBe(2);
    expect(result.stderr).toContain(
      'must be Completed evidence for exact whole Recipe Version recipe/singapore-chicken-rice@2',
    );
    expect(result.stderr).toContain(
      'Superseded Recipe Version recipe/singapore-chicken-rice@1 is immutable',
    );
  });

  it('rejects an inventory exemption added for a new Recipe Version', () => {
    const previousRoot = copyPilotLibrary();
    const root = copyPilotLibrary();
    const canonicalPath = path.join(
      root,
      'recipes/2026-02-19 - Singapore Chicken Rice.md',
    );
    fs.writeFileSync(
      canonicalPath,
      fs
        .readFileSync(canonicalPath, 'utf8')
        .replace('version: 1', 'version: 2'),
    );
    const inventoryPath = path.join(root, 'records/migrations/first-pilot.md');
    fs.writeFileSync(
      inventoryPath,
      fs
        .readFileSync(inventoryPath, 'utf8')
        .replace('| v1.0 | 1 |', '| v2.0 | 2 |'),
    );

    const result = validate(root, previousRoot);

    expect(result.status).toBe(2);
    expect(result.stderr).toContain(
      'grandfathering exemption recipe/singapore-chicken-rice@2 was not an existing Canonical Recipe in the prior revision',
    );
  });

  it('requires a new Recipe Draft version for a culinary change after completed draft evidence', () => {
    const previousRoot = copyPilotLibrary();
    const draftPath = path.join(
      previousRoot,
      'recipes/drafts/singapore-chicken-rice@2.md',
    );
    fs.mkdirSync(path.dirname(draftPath), { recursive: true });
    fs.writeFileSync(
      draftPath,
      fs
        .readFileSync(
          path.join(
            previousRoot,
            'recipes/2026-02-19 - Singapore Chicken Rice.md',
          ),
          'utf8',
        )
        .replace('version: 1', 'version: 2'),
    );
    writeExperiment(
      previousRoot,
      '2026-09-11 - Draft evidence.md',
      completedExperiment(
        'experiment/draft-evidence',
        '  type: recipe-version\n  recipe: recipe/singapore-chicken-rice\n  version: 2',
      ),
    );
    const root = copyPilotLibrary();
    fs.mkdirSync(
      path.dirname(
        path.join(root, 'recipes/drafts/singapore-chicken-rice@2.md'),
      ),
      {
        recursive: true,
      },
    );
    fs.writeFileSync(
      path.join(root, 'recipes/drafts/singapore-chicken-rice@2.md'),
      fs
        .readFileSync(draftPath, 'utf8')
        .replace('Poached chicken', 'Roasted chicken'),
    );
    fs.mkdirSync(path.join(root, 'experiments'), { recursive: true });
    fs.copyFileSync(
      path.join(previousRoot, 'experiments/2026-09-11 - Draft evidence.md'),
      path.join(root, 'experiments/2026-09-11 - Draft evidence.md'),
    );

    const result = validate(root, previousRoot);

    expect(result.status).toBe(2);
    expect(result.stderr).toContain(
      'Recipe Draft recipe/singapore-chicken-rice@2 changed after completed evidence; Culinary Changes require a new Recipe Draft version',
    );
  });

  it('rejects malformed and duplicate Promotion Records through the public command', () => {
    const root = copyPilotLibrary();
    const malformedPath = path.join(root, 'records/promotions/malformed.md');
    fs.mkdirSync(path.dirname(malformedPath), { recursive: true });
    fs.writeFileSync(
      malformedPath,
      `---
record_type: not-promotion
recipe: ingredient/not-a-recipe
version: 0
supporting_experiments: []
---
`,
    );
    const duplicatePath = path.join(root, 'records/promotions/duplicate.md');
    fs.mkdirSync(path.dirname(duplicatePath), { recursive: true });
    fs.writeFileSync(duplicatePath, promotionRecord());
    fs.writeFileSync(
      path.join(root, 'recipes/2026-02-19 - Singapore Chicken Rice.md'),
      fs
        .readFileSync(
          path.join(root, 'recipes/2026-02-19 - Singapore Chicken Rice.md'),
          'utf8',
        )
        .replace('version: 1', 'version: 2'),
    );
    writePromotion(root, promotionRecord());

    const result = validate(root);

    expect(result.status).toBe(2);
    expect(result.stderr).toContain('record_type must be promotion');
    expect(result.stderr).toContain(
      'Promotion requires an exact Recipe Version',
    );
    expect(result.stderr).toContain(
      'Promotion requires accepting Curator, date, Rationale, and Known Shortcomings',
    );
    expect(result.stderr).toContain(
      'Promotion requires supporting Completed Experiments',
    );
    expect(result.stderr).toContain(
      'multiple Promotion Records admit recipe/singapore-chicken-rice@2',
    );
  });

  it('migrates an established identity without rewriting completed evidence and publishes a direct permanent redirect', () => {
    const previousRoot = copyPilotLibrary();
    fs.writeFileSync(
      path.join(previousRoot, 'techniques/Technique - Legacy Poaching.md'),
      legacyPoachingNote(),
    );
    fs.writeFileSync(
      path.join(previousRoot, 'records/curation/legacy-poaching.md'),
      legacyPoachingCuration(),
    );
    writeExperiment(
      previousRoot,
      '2026-09-11 - Legacy poaching evidence.md',
      completedExperiment(
        'experiment/legacy-poaching-evidence',
        '  type: technique\n  identity: technique/legacy-poaching',
      ),
    );

    const root = copyPilotLibrary();
    fs.writeFileSync(
      path.join(root, 'recipes/2026-02-19 - Singapore Chicken Rice.md'),
      fs
        .readFileSync(
          path.join(root, 'recipes/2026-02-19 - Singapore Chicken Rice.md'),
          'utf8',
        )
        .replaceAll('technique/poaching', 'technique/legacy-poaching'),
    );
    fs.writeFileSync(
      path.join(root, 'techniques/Technique - Legacy Poaching.md'),
      legacyPoachingNote(),
    );
    fs.writeFileSync(
      path.join(root, 'records/curation/legacy-poaching.md'),
      legacyPoachingCuration(),
    );
    writeExperiment(
      root,
      '2026-09-11 - Legacy poaching evidence.md',
      completedExperiment(
        'experiment/legacy-poaching-evidence',
        '  type: technique\n  identity: technique/legacy-poaching',
      ),
    );

    fs.rmSync(path.join(root, 'techniques/Technique - Legacy Poaching.md'));
    fs.writeFileSync(
      path.join(root, 'records/curation/legacy-poaching.md'),
      retirementRecord(),
    );
    fs.writeFileSync(
      path.join(root, 'recipes/2026-02-19 - Singapore Chicken Rice.md'),
      fs
        .readFileSync(
          path.join(root, 'recipes/2026-02-19 - Singapore Chicken Rice.md'),
          'utf8',
        )
        .replaceAll('technique/legacy-poaching', 'technique/poaching'),
    );

    const result = validate(root, previousRoot);

    expect(result.status).toBe(0);
    expect(build(root, previousRoot).status).toBe(0);
    const redirect = fs.readFileSync(
      path.join(process.cwd(), 'dist/techniques/legacy-poaching/index.html'),
      'utf8',
    );
    expect(redirect).toContain(
      'https://recipes.carlokruger.com/techniques/poaching/',
    );
  }, 15_000);

  it('rejects retired identity reuse, a new Experiment subject, and invalid retirement destinations through the public command', () => {
    const root = copyPilotLibrary();
    writeRetirement(root, retirementRecord());
    fs.writeFileSync(
      path.join(root, 'recipes/2026-02-19 - Singapore Chicken Rice.md'),
      `${fs
        .readFileSync(
          path.join(root, 'recipes/2026-02-19 - Singapore Chicken Rice.md'),
          'utf8',
        )
        .trimEnd()}\n\nSee [legacy method](ref:technique/legacy-poaching).\n`,
    );
    writeExperiment(
      root,
      '2026-09-11 - New legacy subject.md',
      completedExperiment(
        'experiment/new-legacy-subject',
        '  type: technique\n  identity: technique/legacy-poaching',
      ),
    );

    const result = validate(root);

    expect(result.status).toBe(2);
    expect(result.stderr).toContain(
      'retired identity technique/legacy-poaching cannot be used by a current reference',
    );
    expect(result.stderr).toContain(
      'retired identity technique/legacy-poaching is only valid for a preserved Completed Experiment subject',
    );

    fs.writeFileSync(
      path.join(root, 'records/curation/legacy-poaching.md'),
      retirementRecord('technique/missing-survivor'),
    );
    const invalidDestination = validate(root);
    expect(invalidDestination.status).toBe(2);
    expect(invalidDestination.stderr).toContain(
      'retirement survivor technique/missing-survivor does not resolve to an eligible Knowledge Note',
    );
  });

  it('fails closed for malformed, colliding, chained, and reused retirement identities through the public command', () => {
    const root = copyPilotLibrary();
    writeRetirement(root, retirementRecord('technique/legacy-poaching'));
    const selfRetirement = validate(root);
    expect(selfRetirement.status).toBe(2);
    expect(selfRetirement.stderr).toContain(
      'identity retirement survivor must differ from retired_identity',
    );

    writeRetirement(root, retirementRecord());
    fs.writeFileSync(
      path.join(root, 'records/curation/duplicate-retirement.md'),
      retirementRecord(),
    );
    fs.writeFileSync(
      path.join(root, 'techniques/Technique - Legacy Poaching.md'),
      legacyPoachingNote(),
    );
    const collision = validate(root);
    expect(collision.status).toBe(2);
    expect(collision.stderr).toContain(
      'multiple retirement records reserve technique/legacy-poaching',
    );
    expect(collision.stderr).toContain(
      'retired identity technique/legacy-poaching is permanently reserved',
    );

    fs.rmSync(path.join(root, 'records/curation/duplicate-retirement.md'));
    fs.rmSync(path.join(root, 'techniques/Technique - Legacy Poaching.md'));
    fs.writeFileSync(
      path.join(root, 'records/curation/chained-retirement.md'),
      retirementRecord('technique/legacy-poaching', 'technique/older-poaching'),
    );
    const chained = validate(root);
    expect(chained.status).toBe(2);
    expect(chained.stderr).toContain(
      'cannot redirect through retired survivor technique/legacy-poaching',
    );
    expect(chained.stderr).toContain(
      'must preserve an established identity from the prior revision',
    );
  });

  it('publishes direct identity-targeted recipe redirects and an explanatory withdrawal page through public commands', () => {
    const root = copyPilotLibrary();
    writePublisherRoutes(
      root,
      JSON.stringify({
        routes: [
          {
            source: '/recipes/original-singapore-chicken-rice/',
            type: 'redirect',
            destination: 'recipe/singapore-chicken-rice',
          },
          {
            source: '/recipes/withdrawn-pilot-chicken/',
            type: 'withdrawal',
            recipe: 'recipe/withdrawn-pilot-chicken',
          },
        ],
      }),
    );
    fs.mkdirSync(path.join(root, 'recipes/superseded'), { recursive: true });
    fs.writeFileSync(
      path.join(root, 'recipes/superseded/withdrawn-pilot-chicken@1.md'),
      fs
        .readFileSync(
          path.join(root, 'recipes/2026-02-19 - Singapore Chicken Rice.md'),
          'utf8',
        )
        .replaceAll(
          'recipe/singapore-chicken-rice',
          'recipe/withdrawn-pilot-chicken',
        )
        .replace(
          'Singapore Chicken Rice (Hainanese)',
          'Withdrawn pilot chicken',
        ),
    );

    expect(validate(root).status).toBe(0);
    expect(build(root).status).toBe(0);
    expect(
      fs.readFileSync(
        path.join(
          process.cwd(),
          'dist/recipes/original-singapore-chicken-rice/index.html',
        ),
        'utf8',
      ),
    ).toContain(
      'https://recipes.carlokruger.com/recipes/singapore-chicken-rice/',
    );
    expect(
      fs.readFileSync(
        path.join(process.cwd(), 'dist/withdrawn-recipe/index.html'),
        'utf8',
      ),
    ).toContain('This recipe has been withdrawn.');
  });

  it('rejects colliding, indirect, unresolved, and draft recipe publisher routes through the public validation command', () => {
    const root = copyPilotLibrary();
    writePublisherRoutes(
      root,
      JSON.stringify({
        routes: [
          {
            source: '/recipes/singapore-chicken-rice/',
            type: 'redirect',
            destination: 'recipe/singapore-chicken-rice',
          },
          {
            source: '/recipes/old-chicken/',
            type: 'redirect',
            destination: 'recipe/missing-chicken',
          },
          {
            source: '/recipes/draft-chicken/',
            type: 'redirect',
            destination: 'recipe/draft-chicken',
          },
          {
            source: '/recipes/withdrawn-chicken/',
            type: 'withdrawal',
            recipe: 'recipe/singapore-chicken-rice',
          },
          {
            source: '/recipes/old-chicken/',
            type: 'withdrawal',
            recipe: 'recipe/draft-chicken',
          },
        ],
      }),
    );
    fs.mkdirSync(path.join(root, 'recipes/drafts'), { recursive: true });
    fs.writeFileSync(
      path.join(root, 'recipes/drafts/draft-chicken@1.md'),
      fs
        .readFileSync(
          path.join(root, 'recipes/2026-02-19 - Singapore Chicken Rice.md'),
          'utf8',
        )
        .replaceAll('recipe/singapore-chicken-rice', 'recipe/draft-chicken')
        .replace('Singapore Chicken Rice (Hainanese)', 'Draft chicken'),
    );

    const result = validate(root);

    expect(result.status).toBe(2);
    expect(result.stderr).toContain(
      'publisher route /recipes/singapore-chicken-rice/ collides with canonical route',
    );
    expect(result.stderr).toContain(
      'publisher redirect destination recipe/missing-chicken does not resolve to an eligible Canonical Recipe',
    );
    expect(result.stderr).toContain(
      'publisher redirect destination recipe/draft-chicken does not resolve to an eligible Canonical Recipe',
    );
    expect(result.stderr).toContain(
      'publisher withdrawal recipe recipe/singapore-chicken-rice remains a Canonical Recipe',
    );
    expect(result.stderr).toContain(
      'publisher withdrawal recipe recipe/draft-chicken has no preserved Superseded Recipe Version',
    );
    expect(result.stderr).toContain(
      'publisher route /recipes/old-chicken/ is not unique',
    );
  });
});
