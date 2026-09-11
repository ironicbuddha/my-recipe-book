import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import { afterEach, describe, expect, it } from 'vitest';

import {
  ContentValidationError,
  loadLibrary,
  renderContent,
} from '../src/lib/library';
import {
  getAllRecipes,
  getLibraryCounts,
  getRecipePhases,
  renderRecipeBody,
} from '../src/lib/recipes';

const roots: string[] = [];

afterEach(() => {
  for (const root of roots.splice(0)) {
    fs.rmSync(root, { force: true, recursive: true });
  }
});

function writeLibrary(files: Record<string, string>): string {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'culinary-library-'));
  roots.push(root);

  for (const [relativePath, contents] of Object.entries(files)) {
    const destination = path.join(root, relativePath);
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.writeFileSync(destination, contents);
  }

  return root;
}

function copyPilotLibrary(): string {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'culinary-pilot-'));
  roots.push(root);
  for (const directory of [
    'experiments',
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

const recipe = `---
title: "Pilot chicken"
date: 2026-09-11
identity: recipe/pilot-chicken
version: 1
yield: "2 servings"
scale_basis:
  ingredient: ingredient/chicken
  quantity_g: 500
tags: [dish-main-course]
---

Pilot dish.

## PHASE A — PREPARE

### Ingredient Uses

| Key | Ingredient | Quantity | Scaling | Use |
| --- | --- | --- | --- | --- |
| chicken | [Chicken](ref:ingredient/chicken) | 500 g | 100.00% | Portion the chicken. |

### Method

1. Portion the chicken.

## FAILURE MODES

| Symptom | Likely cause | Corrective action |
| --- | --- | --- |
| Dry chicken | Too much heat. | Lower the heat. |
`;

function completedExperiment(
  identity: string,
  subject: string,
  corrects = '',
): string {
  return `---
title: "${identity}"
date: 2026-09-11
identity: ${identity}
status: completed
primary_subject:
${subject}
${corrects ? `corrects: ${corrects}\n` : ''}---

## Hypothesis

The tested control is reproducible.

## Procedure

1. Follow the recorded conditions.

## Results

The observed result is recorded even if it does not support the hypothesis.

## Decision

Keep the evidence available for review.
`;
}

describe('loadLibrary', () => {
  it('publishes identity-derived routes and relationship backlinks', () => {
    const root = writeLibrary({
      'recipes/2026-09-11 - Pilot Chicken.md': recipe,
      'ingredients/Ingredient - Chicken.md': `---
title: "Chicken"
identity: ingredient/chicken
---

## Functional Profile

Poultry meat.

## Handling

Keep chilled.

## Culinary Use

Cook thoroughly.
`,
      'records/migrations/pilot.md': `---
record_type: grandfathering-inventory
approved_by: "Curator"
approved_on: 2026-09-11
---

| Source file | Recipe | Old version | Mapped version | Disposition | Exemption |
| --- | --- | --- | --- | --- | --- |
| \`recipes/2026-09-11 - Pilot Chicken.md\` | recipe/pilot-chicken | v1.0 | 1 | retain-canonical | historical evidence and Promotion Record only |
`,
      'records/curation/chicken.md': `---
record_type: curation
candidate: candidate/chicken-label
candidate_label: "Chicken"
evidence_sources: [recipe/pilot-chicken@1]
decision: establish-subject
subject: ingredient/chicken
decided_by: "Curator"
decided_on: 2026-09-11
---

## Evidence

The pilot recipe uses chicken as its basis.

## Rationale

Establish the approved ingredient subject.
`,
    });

    const library = loadLibrary(root);

    expect(library.recipes).toHaveLength(1);
    expect(library.recipes[0]?.href).toBe('/recipes/pilot-chicken/');
    expect(library.knowledge[0]?.href).toBe('/ingredients/chicken/');
    expect(library.knowledge[0]?.backlinks).toEqual(['recipe/pilot-chicken']);
  });

  it('rejects a missing typed reference with its source and rule', () => {
    const root = writeLibrary({
      'recipes/2026-09-11 - Pilot Chicken.md': recipe.replaceAll(
        'ingredient/chicken',
        'ingredient/missing-chicken',
      ),
      'records/migrations/pilot.md': `---
record_type: grandfathering-inventory
approved_by: "Curator"
approved_on: 2026-09-11
---

| Source file | Recipe | Old version | Mapped version | Disposition | Exemption |
| --- | --- | --- | --- | --- | --- |
| \`recipes/2026-09-11 - Pilot Chicken.md\` | recipe/pilot-chicken | v1.0 | 1 | retain-canonical | historical evidence and Promotion Record only |
`,
    });

    expect(() => loadLibrary(root)).toThrow(ContentValidationError);
    expect(() => loadLibrary(root)).toThrow(
      /Pilot Chicken.md.*missing reference.*ingredient\/missing-chicken/is,
    );
  });

  it('rejects a reference to an unavailable exact Recipe Version with its source and line', () => {
    const root = copyPilotLibrary();
    const sourcePath = path.join(
      root,
      'recipes/2026-02-19 - Singapore Chicken Rice.md',
    );
    fs.writeFileSync(
      sourcePath,
      `${fs.readFileSync(sourcePath, 'utf8')}\nSee [an unavailable version](ref:recipe/singapore-chicken-rice@2).\n`,
    );

    expect(() => loadLibrary(root)).toThrow(
      /recipes\/2026-02-19 - Singapore Chicken Rice.md:\d+: missing Recipe Version recipe\/singapore-chicken-rice@2/is,
    );
  });

  it('keeps an unpublished exact Recipe Version out of routes and renders it without an anchor', () => {
    const root = writeLibrary({
      'recipes/2026-09-11 - Pilot Chicken.md': recipe.replace(
        'Pilot dish.',
        'See [next version](ref:recipe/pilot-chicken@2).',
      ),
      'recipes/drafts/pilot-chicken@2.md': recipe
        .replace('Pilot chicken', 'Pilot chicken draft')
        .replace('version: 1', 'version: 2')
        .replace('Pilot dish.', 'Unpublished draft.'),
      'ingredients/Ingredient - Chicken.md': `---
title: "Chicken"
identity: ingredient/chicken
---

## Functional Profile

Poultry meat.

## Handling

Keep chilled.

## Culinary Use

Cook thoroughly.
`,
      'records/migrations/pilot.md': `---
record_type: grandfathering-inventory
approved_by: "Curator"
approved_on: 2026-09-11
---

| Source file | Recipe | Old version | Mapped version | Disposition | Exemption |
| --- | --- | --- | --- | --- | --- |
| \`recipes/2026-09-11 - Pilot Chicken.md\` | recipe/pilot-chicken | v1.0 | 1 | retain-canonical | historical evidence and Promotion Record only |
`,
      'records/curation/chicken.md': `---
record_type: curation
candidate: candidate/chicken-label
candidate_label: "Chicken"
evidence_sources: [recipe/pilot-chicken@1]
decision: establish-subject
subject: ingredient/chicken
decided_by: "Curator"
decided_on: 2026-09-11
---

## Evidence

The pilot recipe uses chicken as its basis.

## Rationale

Establish the approved ingredient subject.
`,
    });

    const library = loadLibrary(root);

    expect(library.recipes).toHaveLength(1);
    expect(renderContent(library.recipes[0]?.body ?? '', library)).toContain(
      'See next version.',
    );
    expect(
      renderContent(library.recipes[0]?.body ?? '', library),
    ).not.toContain('href="/recipes/pilot-chicken/"');
  });

  it('accepts alias merges and candidate retirements without publishing either record', () => {
    const root = copyPilotLibrary();
    fs.writeFileSync(
      path.join(root, 'records/curation/whole-chicken-alias.md'),
      `---
record_type: curation
candidate: candidate/ingredient-whole-chicken
candidate_label: "Whole chicken"
evidence_sources: [recipe/singapore-chicken-rice@1]
decision: merge-alias
survivor: ingredient/whole-chicken
alias: "Whole chicken"
decided_by: "Curator"
decided_on: 2026-09-11
---
`,
    );
    fs.writeFileSync(
      path.join(root, 'records/curation/square-pan-retired.md'),
      `---
record_type: curation
candidate: candidate/ingredient-square-pan
candidate_label: "Square pan"
evidence_sources: [recipe/masterclass-chocolate-brownie@1]
decision: retire-candidate
retirement_reason: "Equipment, not an Ingredient."
decided_by: "Curator"
decided_on: 2026-09-11
---
`,
    );

    expect(loadLibrary(root).knowledge).toHaveLength(23);
  });

  it('projects the approved pilot through the recipe-facing public helpers', () => {
    const recipes = getAllRecipes();

    expect(recipes).toHaveLength(1);
    expect(recipes[0]).toMatchObject({
      href: '/recipes/singapore-chicken-rice/',
      slug: 'singapore-chicken-rice',
      title: 'Singapore Chicken Rice (Hainanese)',
    });
    expect(getLibraryCounts()).toMatchObject({
      ingredients: 15,
      principles: 4,
      recipes: 1,
      techniques: 4,
    });
    expect(getRecipePhases(recipes[0]?.body ?? '')).toHaveLength(5);
    expect(renderRecipeBody(recipes[0]?.body ?? '')).toContain(
      '/ingredients/whole-chicken/',
    );
    expect(renderRecipeBody(recipes[0]?.body ?? '')).toContain(
      'table--failure-modes',
    );
  });

  it('keeps classified observations out of authoritative knowledge collections', () => {
    const candidates = fs.readdirSync(
      path.join(process.cwd(), 'records', 'candidates'),
    );
    const generated = ['ingredients', 'principles', 'techniques'].flatMap(
      (directory) =>
        fs
          .readdirSync(path.join(process.cwd(), directory))
          .filter((name) => name.endsWith('.md'))
          .filter((name) =>
            fs
              .readFileSync(path.join(process.cwd(), directory, name), 'utf8')
              .includes('generated: true'),
          ),
    );

    expect(candidates).toHaveLength(302);
    expect(generated).toEqual([]);
    expect(getLibraryCounts()).toMatchObject({
      ingredients: 15,
      principles: 4,
      recipes: 1,
      techniques: 4,
    });
  });

  it('admits a complete exact-version Promotion Record without treating it as automated Curation', () => {
    const previousRoot = copyPilotLibrary();
    const previousCanonicalPath = path.join(
      previousRoot,
      'recipes/2026-02-19 - Singapore Chicken Rice.md',
    );
    fs.mkdirSync(path.join(previousRoot, 'recipes/drafts'), {
      recursive: true,
    });
    fs.writeFileSync(
      path.join(previousRoot, 'recipes/drafts/singapore-chicken-rice@2.md'),
      fs
        .readFileSync(previousCanonicalPath, 'utf8')
        .replace('version: 1', 'version: 2'),
    );
    const root = copyPilotLibrary();
    const canonicalPath = path.join(
      root,
      'recipes/2026-02-19 - Singapore Chicken Rice.md',
    );
    const versionOne = fs.readFileSync(canonicalPath, 'utf8');
    fs.mkdirSync(path.join(root, 'recipes/superseded'), { recursive: true });
    fs.writeFileSync(
      path.join(root, 'recipes/superseded/singapore-chicken-rice@1.md'),
      versionOne,
    );
    fs.writeFileSync(
      canonicalPath,
      versionOne.replace('version: 1', 'version: 2'),
    );
    fs.mkdirSync(path.join(root, 'experiments'), { recursive: true });
    fs.writeFileSync(
      path.join(root, 'experiments/2026-09-11 - Promotion trial.md'),
      completedExperiment(
        'experiment/promotion-trial',
        '  type: recipe-version\n  recipe: recipe/singapore-chicken-rice\n  version: 2',
      ),
    );
    fs.mkdirSync(path.join(root, 'records/promotions'), { recursive: true });
    fs.writeFileSync(
      path.join(root, 'records/promotions/singapore-chicken-rice@2.md'),
      `---
record_type: promotion
recipe: recipe/singapore-chicken-rice
version: 2
supporting_experiments:
  - experiment/promotion-trial
accepted_by: "Fixture Curator"
accepted_on: 2026-09-11
---

## Rationale

The result is accepted for this fixture only.

## Known Shortcomings

The fixture preserves the accepted limitation.
`,
    );

    const priorRoot = process.env.CULINARY_LIBRARY_PREVIOUS_ROOT;
    process.env.CULINARY_LIBRARY_PREVIOUS_ROOT = previousRoot;
    try {
      expect(loadLibrary(root).recipes).toMatchObject([
        { identity: 'recipe/singapore-chicken-rice', version: 2 },
      ]);
    } finally {
      if (priorRoot) {
        process.env.CULINARY_LIBRARY_PREVIOUS_ROOT = priorRoot;
      } else {
        delete process.env.CULINARY_LIBRARY_PREVIOUS_ROOT;
      }
    }
  });

  it('rejects wrong reference types and contract violations in the approved source', () => {
    const root = copyPilotLibrary();
    const sourcePath = path.join(
      root,
      'recipes/2026-02-19 - Singapore Chicken Rice.md',
    );
    const source = fs
      .readFileSync(sourcePath, 'utf8')
      .replace(
        '[Whole chicken](ref:ingredient/whole-chicken)',
        '[Wrong target](ref:technique/poaching)',
      )
      .replace('| 800 g | 100.00% |', '| 800 g | 99.99% |')
      .replace(
        'Poached chicken, aromatic chicken-fat rice, broth, and two sauces.',
        '# Invalid extra title',
      );
    fs.writeFileSync(sourcePath, source);

    expect(() => loadLibrary(root)).toThrow(
      /recipe body must not contain an H1.*Ingredient Uses requires an ingredient target.*must be 100.00%/is,
    );
  });

  it('rejects Phase Output consumption that does not resolve to an earlier local key', () => {
    const root = copyPilotLibrary();
    const sourcePath = path.join(
      root,
      'recipes/2026-02-19 - Singapore Chicken Rice.md',
    );
    fs.writeFileSync(
      sourcePath,
      fs
        .readFileSync(sourcePath, 'utf8')
        .replace(
          '`chicken-stock` with the rice',
          '`missing-stock` with the rice',
        ),
    );

    expect(() => loadLibrary(root)).toThrow(
      /PHASE B — COOK AROMATIC RICE Phase Outputs Used must name an earlier local key/,
    );
  });

  it('keeps the recipe route stable when its filename and title change', () => {
    const root = copyPilotLibrary();
    const oldPath = path.join(
      root,
      'recipes/2026-02-19 - Singapore Chicken Rice.md',
    );
    const renamedPath = path.join(
      root,
      'recipes/2026-09-11 - Renamed Pilot.md',
    );
    fs.renameSync(oldPath, renamedPath);
    fs.writeFileSync(
      renamedPath,
      fs
        .readFileSync(renamedPath, 'utf8')
        .replace('Singapore Chicken Rice (Hainanese)', 'Renamed pilot'),
    );

    expect(loadLibrary(root).recipes[0]).toMatchObject({
      href: '/recipes/singapore-chicken-rice/',
      title: 'Renamed pilot',
    });
  });

  it('publishes completed Experiments for every supported primary subject and derives correction notices', () => {
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
    const experiments = {
      'experiments/2026-09-11 - Whole recipe.md': completedExperiment(
        'experiment/whole-recipe-trial',
        '  type: recipe-version\n  recipe: recipe/singapore-chicken-rice\n  version: 1',
      ),
      'experiments/2026-09-11 - Ingredient use.md': completedExperiment(
        'experiment/ingredient-use-trial',
        '  type: ingredient-use\n  recipe: recipe/singapore-chicken-rice\n  version: 1\n  phase: PHASE A — POACH CHICKEN AND MAKE STOCK\n  key: chicken',
      ),
      'experiments/2026-09-11 - Technique.md': completedExperiment(
        'experiment/poaching-trial',
        '  type: technique\n  identity: technique/poaching',
      ),
      'experiments/2026-09-11 - Principle.md': completedExperiment(
        'experiment/skin-trial',
        '  type: principle\n  identity: principle/thermal-shock-for-skin-texture',
      ),
      'experiments/2026-09-11 - Correction.md': completedExperiment(
        'experiment/whole-recipe-correction',
        '  type: recipe-version\n  recipe: recipe/singapore-chicken-rice\n  version: 1',
        'experiment/whole-recipe-trial',
      ),
      'experiments/2026-09-11 - Draft.md': completedExperiment(
        'experiment/draft-recipe-trial',
        '  type: recipe-version\n  recipe: recipe/singapore-chicken-rice\n  version: 2',
      ),
    };
    for (const [relativePath, contents] of Object.entries(experiments)) {
      const destination = path.join(root, relativePath);
      fs.mkdirSync(path.dirname(destination), { recursive: true });
      fs.writeFileSync(destination, contents);
    }

    const library = loadLibrary(root);
    const original = library.entries.find(
      (entry) => entry.identity === 'experiment/whole-recipe-trial',
    );

    expect(
      library.entries.filter((entry) => entry.type === 'experiment'),
    ).toHaveLength(6);
    expect(library.recipes).toHaveLength(1);
    expect(
      library.entries.find(
        (entry) => entry.identity === 'experiment/ingredient-use-trial',
      ),
    ).toMatchObject({
      href: '/experiments/ingredient-use-trial/',
      subjectLabel:
        'recipe/singapore-chicken-rice v1; PHASE A — POACH CHICKEN AND MAKE STOCK; Ingredient Use chicken',
    });
    expect(original?.corrections).toEqual([
      'experiment/whole-recipe-correction',
    ]);
    expect(
      library.entries.find(
        (entry) => entry.identity === 'experiment/draft-recipe-trial',
      ),
    ).toMatchObject({ subjectLabel: 'recipe/singapore-chicken-rice v2' });
  });

  it('rejects incomplete evidence, unresolved scoped subjects, and changed completed evidence from a prior library', () => {
    const root = copyPilotLibrary();
    const previousRoot = copyPilotLibrary();
    const source = completedExperiment(
      'experiment/whole-recipe-trial',
      '  type: recipe-version\n  recipe: recipe/singapore-chicken-rice\n  version: 1',
    );
    for (const target of [root, previousRoot]) {
      fs.writeFileSync(
        path.join(target, 'experiments/2026-09-11 - Whole recipe.md'),
        source,
      );
    }
    fs.writeFileSync(
      path.join(root, 'experiments/2026-09-11 - Broken.md'),
      source
        .replace('experiment/whole-recipe-trial', 'experiment/broken-trial')
        .replace(
          '## Results\n\nThe observed result is recorded even if it does not support the hypothesis.\n\n',
          '',
        )
        .replace('version: 1', 'version: 9'),
    );
    fs.writeFileSync(
      path.join(root, 'experiments/2026-09-11 - Whole recipe.md'),
      source.replace(
        'The tested control is reproducible.',
        'The altered hypothesis is prohibited.',
      ),
    );
    const oldPreviousRoot = process.env.CULINARY_LIBRARY_PREVIOUS_ROOT;
    process.env.CULINARY_LIBRARY_PREVIOUS_ROOT = previousRoot;

    try {
      expect(() => loadLibrary(root)).toThrow(
        /requires ## Results.*recipe\/singapore-chicken-rice@9 does not resolve.*prior completed evidence.*immutable/is,
      );
    } finally {
      if (oldPreviousRoot === undefined) {
        delete process.env.CULINARY_LIBRARY_PREVIOUS_ROOT;
      } else {
        process.env.CULINARY_LIBRARY_PREVIOUS_ROOT = oldPreviousRoot;
      }
    }
  });
});
