import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import { afterEach, describe, expect, it } from 'vitest';

import { ContentValidationError, loadLibrary, renderContent } from '../src/lib/library';
import { getAllRecipes, getLibraryCounts, getRecipePhases, renderRecipeBody } from '../src/lib/recipes';

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
  for (const directory of ['ingredients', 'principles', 'recipes', 'records', 'techniques']) {
    fs.cpSync(path.join(process.cwd(), directory), path.join(root, directory), { recursive: true });
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
    expect(() => loadLibrary(root)).toThrow(/Pilot Chicken.md.*missing reference.*ingredient\/missing-chicken/is);
  });

  it('keeps resolved drafts out of routes and renders them without anchors', () => {
    const root = writeLibrary({
      'recipes/2026-09-11 - Pilot Chicken.md': recipe.replace(
        'Pilot dish.',
        'See [next version](ref:recipe/pilot-chicken-draft@2).',
      ),
      'recipes/drafts/pilot-chicken-draft@2.md': recipe
        .replaceAll('pilot-chicken', 'pilot-chicken-draft')
        .replace('Pilot chicken', 'Pilot chicken draft')
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
    expect(renderContent(library.recipes[0]?.body ?? '', library)).toContain('See next version.');
    expect(renderContent(library.recipes[0]?.body ?? '', library)).not.toContain('pilot-chicken-draft/');
  });

  it('projects the approved pilot through the recipe-facing public helpers', () => {
    const recipes = getAllRecipes();

    expect(recipes).toHaveLength(1);
    expect(recipes[0]).toMatchObject({
      href: '/recipes/singapore-chicken-rice/',
      slug: 'singapore-chicken-rice',
      title: 'Singapore Chicken Rice (Hainanese)',
    });
    expect(getLibraryCounts()).toMatchObject({ ingredients: 15, principles: 4, recipes: 1, techniques: 4 });
    expect(getRecipePhases(recipes[0]?.body ?? '')).toHaveLength(5);
    expect(renderRecipeBody(recipes[0]?.body ?? '')).toContain('/ingredients/whole-chicken/');
    expect(renderRecipeBody(recipes[0]?.body ?? '')).toContain('table--failure-modes');
  });

  it('rejects wrong reference types and contract violations in the approved source', () => {
    const root = copyPilotLibrary();
    const sourcePath = path.join(root, 'recipes/2026-02-19 - Singapore Chicken Rice.md');
    const source = fs.readFileSync(sourcePath, 'utf8')
      .replace('[Whole chicken](ref:ingredient/whole-chicken)', '[Wrong target](ref:technique/poaching)')
      .replace('| 800 g | 100.00% |', '| 800 g | 99.99% |')
      .replace('Poached chicken, aromatic chicken-fat rice, broth, and two sauces.', '# Invalid extra title');
    fs.writeFileSync(sourcePath, source);

    expect(() => loadLibrary(root)).toThrow(/recipe body must not contain an H1.*Ingredient Uses requires an ingredient target.*must be 100.00%/is);
  });

  it('rejects Phase Output consumption that does not resolve to an earlier local key', () => {
    const root = copyPilotLibrary();
    const sourcePath = path.join(root, 'recipes/2026-02-19 - Singapore Chicken Rice.md');
    fs.writeFileSync(
      sourcePath,
      fs.readFileSync(sourcePath, 'utf8').replace('`chicken-stock` with the rice', '`missing-stock` with the rice'),
    );

    expect(() => loadLibrary(root)).toThrow(/PHASE B — COOK AROMATIC RICE Phase Outputs Used must name an earlier local key/);
  });

  it('keeps the recipe route stable when its filename and title change', () => {
    const root = copyPilotLibrary();
    const oldPath = path.join(root, 'recipes/2026-02-19 - Singapore Chicken Rice.md');
    const renamedPath = path.join(root, 'recipes/2026-09-11 - Renamed Pilot.md');
    fs.renameSync(oldPath, renamedPath);
    fs.writeFileSync(renamedPath, fs.readFileSync(renamedPath, 'utf8').replace('Singapore Chicken Rice (Hainanese)', 'Renamed pilot'));

    expect(loadLibrary(root).recipes[0]).toMatchObject({ href: '/recipes/singapore-chicken-rice/', title: 'Renamed pilot' });
  });
});
