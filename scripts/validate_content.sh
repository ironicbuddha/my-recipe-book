#!/usr/bin/env bash
set -euo pipefail

cleanup_previous_root() {
  if [[ -n "${CULINARY_PREVIOUS_ROOT:-}" ]]; then
    rm -rf "$CULINARY_PREVIOUS_ROOT"
  fi
}

if [[ -z "${CULINARY_LIBRARY_PREVIOUS_ROOT:-}" && "${CULINARY_LIBRARY_ROOT:-$PWD}" == "$PWD" ]] && git rev-parse --verify HEAD >/dev/null 2>&1; then
  CULINARY_PREVIOUS_ROOT="$(mktemp -d)"
  trap cleanup_previous_root EXIT
  CULINARY_PREVIOUS_REF=HEAD
  if git diff --quiet && git diff --cached --quiet && git rev-parse --verify HEAD^ >/dev/null 2>&1; then
    CULINARY_PREVIOUS_REF=HEAD^
  fi
  git archive "$CULINARY_PREVIOUS_REF" | tar -x -C "$CULINARY_PREVIOUS_ROOT"
  export CULINARY_LIBRARY_PREVIOUS_ROOT="$CULINARY_PREVIOUS_ROOT"
fi

pnpm exec tsx scripts/validate-content.ts
