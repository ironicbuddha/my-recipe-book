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

function rehearse(
  options: { fail?: string; omitBuildArtifact?: boolean; staleArtifact?: boolean } = {},
) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'release-gate-'));
  roots.push(root);
  const bin = path.join(root, 'bin');
  const log = path.join(root, 'checks.log');
  const dist = path.join(root, 'dist');
  fs.mkdirSync(bin, { recursive: true });
  fs.mkdirSync(dist, { recursive: true });
  fs.writeFileSync(path.join(dist, 'last-successful-artifact'), 'preserved');
  if (options.staleArtifact) {
    fs.writeFileSync(path.join(dist, 'index.html'), 'stale');
  }

  fs.writeFileSync(
    path.join(bin, 'make'),
    `#!/usr/bin/env bash
set -euo pipefail
echo "make $*" >> "$RELEASE_GATE_LOG"
if [[ "make $*" == "$RELEASE_GATE_FAIL" ]]; then
  exit 37
fi
`,
    { mode: 0o755 },
  );
  fs.writeFileSync(
    path.join(bin, 'pnpm'),
    `#!/usr/bin/env bash
set -euo pipefail
echo "pnpm $*" >> "$RELEASE_GATE_LOG"
if [[ "pnpm $*" == "$RELEASE_GATE_FAIL" ]]; then
  exit 37
fi
if [[ "$*" == "build" && "\${RELEASE_GATE_OMIT_BUILD_ARTIFACT:-}" != "1" ]]; then
  mkdir -p dist
  touch dist/index.html
fi
`,
    { mode: 0o755 },
  );

  const result = spawnSync(path.join(process.cwd(), 'scripts/release-gate.sh'), {
    cwd: root,
    encoding: 'utf8',
    env: {
      ...process.env,
      PATH: `${bin}:${process.env.PATH}`,
      RELEASE_GATE_FAIL: options.fail ?? '',
      RELEASE_GATE_LOG: log,
      ...(options.omitBuildArtifact ? { RELEASE_GATE_OMIT_BUILD_ARTIFACT: '1' } : {}),
    },
  });
  return { dist, log, result };
}

describe('release gate command', () => {
  it('configures Vercel to use the release gate and its checked artifact', async () => {
    const { config } = await import('../vercel');

    expect(config).toMatchObject({
      buildCommand: 'pnpm release:verify',
      outputDirectory: 'dist',
    });
  });

  it('runs every required check before accepting the build artifact', () => {
    const { log, result } = rehearse();

    expect(result.status).toBe(0);
    expect(fs.readFileSync(log, 'utf8').trim().split('\n')).toEqual([
      'make validate',
      'pnpm lint',
      'pnpm typecheck',
      'pnpm test',
      'pnpm build',
    ]);
  });

  it('fails closed at a failed required check and leaves an existing artifact untouched', () => {
    const { dist, log, result } = rehearse({ fail: 'pnpm typecheck' });

    expect(result.status).not.toBe(0);
    expect(fs.readFileSync(log, 'utf8').trim().split('\n')).toEqual([
      'make validate',
      'pnpm lint',
      'pnpm typecheck',
    ]);
    expect(fs.readFileSync(path.join(dist, 'last-successful-artifact'), 'utf8')).toBe(
      'preserved',
    );
  });

  it('rejects a successful build command that produces no publication artifact', () => {
    const { result } = rehearse({ omitBuildArtifact: true });

    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain('dist/index.html');
  });

  it('does not accept a stale publication artifact when the build produces none', () => {
    const { dist, result } = rehearse({
      omitBuildArtifact: true,
      staleArtifact: true,
    });

    expect(result.status).not.toBe(0);
    expect(fs.existsSync(path.join(dist, 'index.html'))).toBe(false);
  });
});
