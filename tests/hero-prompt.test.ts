import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { buildPrompt, findRecipeFile } from '../scripts/hero-prompt';
import { loadLibrary } from '../src/lib/library';

describe('canonical hero prompts', () => {
  it('uses the curated basis, overview and Phase-local Techniques', () => {
    const library = loadLibrary();
    const recipe = library.recipes.find(
      (entry) => entry.identity === 'recipe/singapore-chicken-rice',
    );
    expect(recipe).toBeDefined();
    const prompt = buildPrompt(path.join(process.cwd(), recipe!.sourcePath));
    expect(prompt).toContain('built on Whole chicken');
    expect(prompt).toContain('Character:');
    expect(prompt).toContain('Preparation uses Poaching');
    expect(prompt).not.toContain('ref:');
    expect(prompt).toContain('3:2');
  });
  it('frames frozen desserts as scoops', () => {
    const recipe = loadLibrary().recipes.find(
      (entry) => entry.identity === 'recipe/vanilla-bean-ice-cream',
    );
    expect(recipe).toBeDefined();
    const prompt = buildPrompt(path.join(process.cwd(), recipe!.sourcePath));
    expect(prompt).toContain('scoops');
    expect(prompt).not.toContain('cross-section');
    expect(prompt).not.toContain('crumb');
  });

  it('reveals the layers of a cut lasagna portion', () => {
    const recipe = loadLibrary().recipes.find(
      (entry) => entry.identity === 'recipe/lasagna-bolognese-with-bechamel',
    );
    expect(recipe).toBeDefined();
    expect(buildPrompt(path.join(process.cwd(), recipe!.sourcePath))).toContain(
      'internal layers',
    );
  });

  it('finds an accented title by its immutable Recipe key', () => {
    expect(findRecipeFile('creme-fraiche-lime-crema')).toContain(
      'Crème Fraîche Lime Crema.md',
    );
  });
});
