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
  for (const directory of ['ingredients', 'principles', 'recipes', 'records', 'techniques']) {
    fs.cpSync(path.join(process.cwd(), directory), path.join(root, directory), { recursive: true });
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

describe('make validate', () => {
  it('accepts the isolated approved library', () => {
    const result = validate(copyPilotLibrary());

    expect(result.status).toBe(0);
    expect(result.stdout).toContain('Validation passed: 1 recipe(s), 23 Knowledge Note(s).');
  });

  it('fails the entire command for invalid authoritative content', () => {
    const root = copyPilotLibrary();
    const sourcePath = path.join(root, 'recipes/2026-02-19 - Singapore Chicken Rice.md');
    fs.writeFileSync(sourcePath, fs.readFileSync(sourcePath, 'utf8').replace('800 g | 100.00%', '800 g | 80.00%'));

    const result = validate(root);

    expect(result.status).toBe(2);
    expect(result.stderr).toContain('scaling 80.00% must be 100.00%');
  });
});
