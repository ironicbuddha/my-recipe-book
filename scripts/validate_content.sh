#!/usr/bin/env bash
set -euo pipefail

errors=0

error() {
  printf 'ERROR: %s\n' "$1"
  errors=1
}

has_rg() {
  command -v rg >/dev/null 2>&1
}

check_dir() {
  local dir="$1"
  if [[ ! -d "$dir" ]]; then
    error "Missing required directory: $dir"
  fi
}

check_name_pattern() {
  local file="$1"
  local regex="$2"
  local label="$3"
  local base
  base="$(basename "$file")"
  if [[ ! "$base" =~ $regex ]]; then
    error "$label file has invalid name: $base"
  fi
}

check_contains() {
  local file="$1"
  local pattern="$2"
  local desc="$3"
  if has_rg; then
    if ! rg -q "$pattern" "$file"; then
      error "$(basename "$file") missing required section: $desc"
    fi
    return
  fi

  # Fallback for environments without ripgrep.
  if ! grep -Eq -- "$pattern" "$file"; then
    error "$(basename "$file") missing required section: $desc"
  fi
}

check_frontmatter() {
  local file="$1"
  local first
  first="$(head -n 1 "$file")"
  if [[ "$first" != "---" ]]; then
    error "$(basename "$file") must start with YAML frontmatter (---)"
  fi
}

check_dir recipes
check_dir techniques
check_dir principles
check_dir ingredients
check_dir experiments
check_dir templates

while IFS= read -r file; do
  check_name_pattern "$file" '^[0-9]{4}-[0-9]{2}-[0-9]{2} - .+\.md$' 'Recipe'
  check_frontmatter "$file"
  check_contains "$file" '^version:' 'version field'
  check_contains "$file" 'dish-(main-course|side-dish|dessert|breakfast|appetizer|soup|sauce|snack)' 'dish type tag'
  check_contains "$file" '^## PHASE [A-Z]+' 'PHASE section'
  check_contains "$file" '^## (STRUCTURAL NOTES|Structural Notes)' 'Structural Notes'
  check_contains "$file" '^## (FAILURE MODES|Failure Modes)' 'Failure Modes'
done < <(find recipes -maxdepth 1 -type f -name '*.md' ! -name 'README.md' | sort)

while IFS= read -r file; do
  check_name_pattern "$file" '^Technique - .+\.md$' 'Technique'
done < <(find techniques -maxdepth 1 -type f -name '*.md' ! -name 'README.md' | sort)

while IFS= read -r file; do
  check_name_pattern "$file" '^Principle - .+\.md$' 'Principle'
done < <(find principles -maxdepth 1 -type f -name '*.md' ! -name 'README.md' | sort)

while IFS= read -r file; do
  check_name_pattern "$file" '^[0-9]{4}-[0-9]{2}-[0-9]{2} - .+ Trial\.md$' 'Experiment'
done < <(find experiments -maxdepth 1 -type f -name '*.md' ! -name 'README.md' | sort)

if [[ "$errors" -ne 0 ]]; then
  exit 1
fi

printf 'Validation passed.\n'
