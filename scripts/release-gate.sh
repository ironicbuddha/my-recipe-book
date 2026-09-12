#!/usr/bin/env bash
set -euo pipefail

run_required() {
  "$@"
}

run_required make validate
run_required pnpm lint
run_required pnpm typecheck
run_required pnpm test
rm -rf -- dist
run_required pnpm build

if [[ ! -f dist/index.html ]]; then
  echo 'release gate: build completed without dist/index.html' >&2
  exit 1
fi
