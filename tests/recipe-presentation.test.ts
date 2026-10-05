import { describe, expect, it } from 'vitest';
import { loadLibrary } from '../src/lib/library';
import { projectRecipe } from '../src/lib/recipe-presentation';

const library = loadLibrary();
const bread = library.recipes.find(
  (recipe) => recipe.identity === 'recipe/sourdough-bread',
)!;

describe('recipe presentation', () => {
  it('projects each authored Phase, including one without Ingredient Uses, with continuous steps', () => {
    const view = projectRecipe(bread.body, library);
    expect(view.phases).toHaveLength(3);
    expect(view.phases.map((phase) => phase.methodStart)).toEqual([1, 3, 6]);
    expect(view.phases.map((phase) => phase.stepCount)).toEqual([2, 3, 3]);
    expect(view.phases[2].ingredients).toEqual([]);
    expect(view.phases[1].methodHtml).toContain('<ol start="3">');
    expect(view.phases[0].id).toBe('phase-a-build-levain');
    expect(view.phases[0].ingredients[1].quantity).toBe('100 g');
    expect(view.phases[1].ingredients[0].quantity).toBe('1000 g');
    expect(view.phases[0].ingredients[1].scaling).toBe('9.09%');
  });
});

it('retains overview, Controls, Purpose, Principles, overlap, outputs and Failure Modes', () => {
  const body = bread.body.replace(
    '### Technique Applications',
    '**May overlap:** PHASE B — MIX AND DEVELOP DOUGH.\n\n### Technique Applications',
  );
  const view = projectRecipe(body, library);
  expect(view.overviewHtml).toContain('Lean naturally leavened bread');
  expect(view.phases[0].supportingHtml).toContain('<th>Controls</th>');
  expect(view.phases[0].supportingHtml).toContain('<th>Purpose</th>');
  expect(view.phases[0].supportingHtml).toContain('Produce ripe leaven.');
  expect(view.phases[0].supportingHtml).toContain('Principles');
  expect(view.phases[0].supportingHtml).toContain('Phase Outputs');
  expect(view.phases[1].supportingHtml).toContain('Phase Outputs Used');
  expect(view.phases[0].ingredientNotesHtml).toContain('May overlap:');
  expect(view.endingHtml).toContain('FAILURE MODES');
  expect(view.endingHtml).toContain('Bake to about 98 C');
});

it('preserves exact quantities, discretionary scaling, rich text and reference eligibility', () => {
  const body = `Intro with **emphasis**.\n\n## PHASE A — MIX\n\n### Ingredient Uses\n\n| Key | Ingredient | Quantity | Scaling | Use |\n| --- | --- | --- | --- | --- |\n| oil | [Oil](ref:ingredient/neutral-oil) | 12.5 ml | 125.00% | *Coat* first. |\n| salt | [Unpublished](ref:ingredient/unpublished) | As needed | — | Taste. |\n\nA note outside the table.\n\n### Method\n\n1. [Follow](ref:technique/autolyse) safely.\n\n## FAILURE MODES\n\nKeep <script>alert(1)</script> as text.`;
  const view = projectRecipe(body, library);
  expect(view.phases[0].ingredients[0]).toMatchObject({
    quantity: '12.5 ml',
    scaling: '125.00%',
    noteHtml: '<em>Coat</em> first.',
  });
  expect(view.phases[0].ingredients[1]).toMatchObject({
    quantity: 'As needed',
    scaling: '—',
    labelHtml: 'Unpublished',
  });
  expect(view.phases[0].methodHtml).toContain('href="/techniques/autolyse/"');
  expect(view.phases[0].ingredientNotesHtml).toContain(
    'A note outside the table.',
  );
  expect(view.overviewHtml).toContain('<strong>emphasis</strong>');
  expect(view.endingHtml).not.toContain('<script>');
});

it('numbers beyond 100 and keeps nested lists out of the displayed step count', () => {
  const first = Array.from(
    { length: 100 },
    (_, index) => `${index + 1}. Stir.`,
  ).join('\n');
  const view = projectRecipe(
    `## PHASE A — STIR\n\n### Method\n\n${first}\n\n## PHASE B — FINISH\n\n### Method\n\n1. Serve.\n   - Add garnish.\n\n## FAILURE MODES\n\nNone.`,
    library,
  );
  expect(view.phases[1].methodStart).toBe(101);
  expect(view.phases[1].methodHtml).toContain('<ol start="101">');
  expect(view.phases[1].stepCount).toBe(1);
});

it('projects every published Recipe without losing phase or subsection content', () => {
  for (const recipe of library.recipes) {
    const view = projectRecipe(recipe.body, library);
    expect(view.phases.length).toBe(
      (recipe.body.match(/^## PHASE /gm) ?? []).length,
    );
    expect(view.endingHtml).toContain('FAILURE MODES');
    expect(view.phases.every((phase) => phase.stepCount > 0)).toBe(true);
    expect(view.phases.map((phase) => phase.supportingHtml).join('')).toContain(
      recipe.body.includes('### Principles') ? 'Principles' : '',
    );
  }
});

it('continues across separate ordered lists and does not count ancillary bullet lists as steps', () => {
  const view = projectRecipe(
    `## PHASE A — MIX\n\n### Method\n\n1. Mix.\n\nCheck consistency.\n\n1. Rest.\n\n- Keep covered.\n\n## PHASE B — SERVE\n\n### Method\n\n1. Serve.\n\n## FAILURE MODES\n\nNone.`,
    library,
  );
  expect(view.phases[0].stepCount).toBe(2);
  expect(view.phases[0].methodHtml).toContain('<ol start="2">');
  expect(view.phases[1].methodStart).toBe(3);
});
