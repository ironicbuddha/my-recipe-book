#!/usr/bin/env python3
"""Generate cross-links and extracted notes from recipe markdown files.

This script:
- Parses recipe frontmatter for techniques/principles/primary ingredient.
- Extracts ingredients from recipe component tables.
- Creates/updates:
  - techniques/Technique - <Name>.md
  - principles/Principle - <Name>.md
  - ingredients/Ingredient - <Name>.md
- Inserts an auto-generated "RELATED LINKS" section in each recipe.
"""

from __future__ import annotations

import datetime as _dt
import re
from collections import defaultdict
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
RECIPES_DIR = ROOT / "recipes"
TECHNIQUES_DIR = ROOT / "techniques"
PRINCIPLES_DIR = ROOT / "principles"
INGREDIENTS_DIR = ROOT / "ingredients"

AUTO_START = "<!-- AUTO-GENERATED:RELATED-LINKS:START -->"
AUTO_END = "<!-- AUTO-GENERATED:RELATED-LINKS:END -->"


def _read(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def _write(path: Path, content: str) -> None:
    path.write_text(content, encoding="utf-8")


def parse_frontmatter(text: str) -> dict[str, str]:
    m = re.match(r"^---\n(.*?)\n---\n", text, flags=re.S)
    if not m:
        return {}
    frontmatter = m.group(1)
    out: dict[str, str] = {}
    for line in frontmatter.splitlines():
        if ":" not in line:
            continue
        k, v = line.split(":", 1)
        out[k.strip()] = v.strip()
    return out


def split_flow_list(raw: str) -> list[str]:
    raw = raw.strip()
    if not (raw.startswith("[") and raw.endswith("]")):
        return []
    inner = raw[1:-1].strip()
    if not inner:
        return []

    parts: list[str] = []
    buf = []
    quote: str | None = None
    for ch in inner:
        if ch in {"'", '"'}:
            if quote is None:
                quote = ch
            elif quote == ch:
                quote = None
            buf.append(ch)
            continue
        if ch == "," and quote is None:
            token = "".join(buf).strip()
            if token:
                parts.append(token)
            buf = []
            continue
        buf.append(ch)
    tail = "".join(buf).strip()
    if tail:
        parts.append(tail)

    cleaned: list[str] = []
    for p in parts:
        p = p.strip().strip('"').strip("'").strip()
        if p:
            cleaned.append(p)
    return cleaned


def strip_quotes(raw: str) -> str:
    return raw.strip().strip('"').strip("'").strip()


def cleanup_space(text: str) -> str:
    return re.sub(r"\s+", " ", text).strip()


def _title_token(token: str) -> str:
    if not token:
        return token
    if token.isupper() and len(token) <= 4:
        return token
    return token[:1].upper() + token[1:].lower()


def titleize(text: str) -> str:
    text = cleanup_space(text.replace("_", " ").replace("/", " / "))
    if not text:
        return text
    words = []
    for word in text.split(" "):
        if "-" in word:
            words.append("-".join(_title_token(seg) for seg in word.split("-")))
        else:
            words.append(_title_token(word))
    return " ".join(words)


def safe_file_component(text: str) -> str:
    text = text.replace("/", " or ")
    text = re.sub(r"[<>:\"\\|?*]", "", text)
    text = text.replace("  ", " ")
    return text.strip(" .")


def strip_quote_prefix(line: str) -> str:
    out = line
    while True:
        s = out.lstrip()
        if not s.startswith(">"):
            return s
        s = s[1:]
        out = s.lstrip()


def normalize_term(raw: str) -> str:
    text = strip_quotes(raw).replace("—", "-").replace("–", "-")
    text = cleanup_space(text)
    text = re.sub(r"[-_]+", " ", text)
    text = cleanup_space(text).lower()
    return text


def canonical_term(raw: str) -> str:
    return titleize(normalize_term(raw))


def normalize_ingredient(raw: str) -> str | None:
    text = cleanup_space(raw)
    if not text:
        return None
    lower = text.lower()
    skip_contains = [
        "from phase",
        "dry mix",
        "wet mix",
        "prepared ",
        "reserved ",
        "assembled ",
        "baked ",
        "cooked ",
        "poached ",
        "initial bake",
        "finish temp",
        "finish time",
        "duration",
        "parameter",
        "batter per pancake",
    ]
    if any(token in lower for token in skip_contains):
        return None
    if lower in {"ingredient", "---"}:
        return None

    text = re.sub(r"\([^)]*\)", "", text)
    text = text.split(",", 1)[0]
    text = cleanup_space(text)
    text = re.sub(
        r"^(prepared|reserved|assembled|baked|cooked|poached)\s+",
        "",
        text,
        flags=re.I,
    )
    text = cleanup_space(text.strip("-"))
    if not text:
        return None
    return canonical_term(text)


def extract_table_ingredients(text: str) -> list[str]:
    lines = text.splitlines()
    out: list[str] = []
    i = 0
    while i < len(lines):
        clean = strip_quote_prefix(lines[i])
        if re.match(r"^\|\s*Ingredient\s*\|\s*Quantity\s*\|\s*Scaling\s*\|", clean, re.I):
            j = i + 1
            # Skip separator line.
            if j < len(lines):
                sep = strip_quote_prefix(lines[j])
                if re.match(r"^\|\s*-+\s*\|\s*-+\s*\|\s*-+\s*\|", sep):
                    j += 1
            while j < len(lines):
                row_clean = strip_quote_prefix(lines[j]).strip()
                if not row_clean.startswith("|"):
                    break
                cells = [c.strip() for c in row_clean.strip("|").split("|")]
                if cells:
                    ing = normalize_ingredient(cells[0])
                    if ing is not None:
                        out.append(ing)
                j += 1
            i = j
            continue
        i += 1
    # Stable de-dup preserving first appearance.
    seen: set[str] = set()
    uniq: list[str] = []
    for ing in out:
        if ing not in seen:
            seen.add(ing)
            uniq.append(ing)
    return uniq


def sorted_casefold(values: set[str]) -> list[str]:
    return sorted(values, key=lambda x: x.casefold())


def generate_note(
    path: Path,
    note_type: str,
    display_name: str,
    linked_recipes: list[str],
) -> None:
    today = _dt.date.today().isoformat()
    if note_type == "technique":
        heading = f"# Technique: {display_name}"
        purpose = "Auto-generated link node. Expand with process controls and failure modes."
    elif note_type == "principle":
        heading = f"# Principle: {display_name}"
        purpose = "Auto-generated link node. Expand with mechanism, control levers, and evidence."
    else:
        heading = f"# Ingredient: {display_name}"
        purpose = "Auto-generated link node. Expand with composition, handling, and behavior."

    body = [
        "---",
        f'title: "{display_name}"',
        f"date: {today}",
        f"type: {note_type}",
        "version: v1.0",
        "generated: true",
        "---",
        "",
        heading,
        "",
        "## Purpose",
        purpose,
        "",
        "## Used In Recipes",
    ]
    for recipe in linked_recipes:
        body.append(f"- [[{recipe}]]")
    body.append("")
    _write(path, "\n".join(body))


def prune_generated_notes(directory: Path, expected_paths: set[Path]) -> None:
    for path in directory.glob("*.md"):
        if path.name == "README.md":
            continue
        if path in expected_paths:
            continue
        text = _read(path)
        if "generated: true" in text:
            path.unlink()


def build_related_block(
    techniques: list[str], principles: list[str], ingredients: list[str]
) -> str:
    lines = [
        "## RELATED LINKS",
        AUTO_START,
        "",
        "### Techniques",
    ]
    if techniques:
        lines.extend([f"- [[Technique - {t}]]" for t in techniques])
    else:
        lines.append("- None")
    lines.extend(["", "### Principles"])
    if principles:
        lines.extend([f"- [[Principle - {p}]]" for p in principles])
    else:
        lines.append("- None")
    lines.extend(["", "### Ingredients"])
    if ingredients:
        lines.extend([f"- [[Ingredient - {i}]]" for i in ingredients])
    else:
        lines.append("- None")
    lines.extend(["", AUTO_END, ""])
    return "\n".join(lines)


def upsert_related_block(recipe_text: str, block: str) -> str:
    if AUTO_START in recipe_text and AUTO_END in recipe_text:
        pattern = re.compile(
            rf"## RELATED LINKS\n{re.escape(AUTO_START)}.*?{re.escape(AUTO_END)}\n?",
            flags=re.S,
        )
        return pattern.sub(block, recipe_text)

    marker = "## STRUCTURAL NOTES"
    idx = recipe_text.find(marker)
    if idx == -1:
        if not recipe_text.endswith("\n"):
            recipe_text += "\n"
        return recipe_text + "\n" + block
    prefix = recipe_text[:idx].rstrip() + "\n\n"
    suffix = recipe_text[idx:]
    return prefix + block + "\n" + suffix


def main() -> None:
    recipe_paths = sorted(p for p in RECIPES_DIR.glob("*.md") if p.name != "README.md")

    techniques_to_recipes: dict[str, set[str]] = defaultdict(set)
    principles_to_recipes: dict[str, set[str]] = defaultdict(set)
    ingredients_to_recipes: dict[str, set[str]] = defaultdict(set)

    recipe_to_techniques: dict[Path, list[str]] = {}
    recipe_to_principles: dict[Path, list[str]] = {}
    recipe_to_ingredients: dict[Path, list[str]] = {}

    for recipe_path in recipe_paths:
        text = _read(recipe_path)
        frontmatter = parse_frontmatter(text)
        recipe_name = recipe_path.stem

        raw_techniques = split_flow_list(frontmatter.get("techniques", "[]"))
        raw_principles = split_flow_list(frontmatter.get("principles", "[]"))
        primary_ingredient = strip_quotes(frontmatter.get("primary_ingredient", ""))

        techniques = sorted_casefold({canonical_term(t) for t in raw_techniques if cleanup_space(t)})
        principles = sorted_casefold({canonical_term(p) for p in raw_principles if cleanup_space(p)})

        ingredients_set = set(extract_table_ingredients(text))
        primary_norm = normalize_ingredient(primary_ingredient)
        if primary_norm:
            ingredients_set.add(primary_norm)
        ingredients = sorted_casefold(ingredients_set)

        recipe_to_techniques[recipe_path] = techniques
        recipe_to_principles[recipe_path] = principles
        recipe_to_ingredients[recipe_path] = ingredients

        for technique in techniques:
            techniques_to_recipes[technique].add(recipe_name)
        for principle in principles:
            principles_to_recipes[principle].add(recipe_name)
        for ingredient in ingredients:
            ingredients_to_recipes[ingredient].add(recipe_name)

    for recipe_path in recipe_paths:
        text = _read(recipe_path)
        block = build_related_block(
            recipe_to_techniques[recipe_path],
            recipe_to_principles[recipe_path],
            recipe_to_ingredients[recipe_path],
        )
        updated = upsert_related_block(text, block)
        if updated != text:
            _write(recipe_path, updated)

    expected_technique_paths: set[Path] = set()
    for technique, linked in techniques_to_recipes.items():
        name = safe_file_component(technique)
        path = TECHNIQUES_DIR / f"Technique - {name}.md"
        expected_technique_paths.add(path)
        generate_note(path, "technique", technique, sorted_casefold(linked))
    prune_generated_notes(TECHNIQUES_DIR, expected_technique_paths)

    expected_principle_paths: set[Path] = set()
    for principle, linked in principles_to_recipes.items():
        name = safe_file_component(principle)
        path = PRINCIPLES_DIR / f"Principle - {name}.md"
        expected_principle_paths.add(path)
        generate_note(path, "principle", principle, sorted_casefold(linked))
    prune_generated_notes(PRINCIPLES_DIR, expected_principle_paths)

    expected_ingredient_paths: set[Path] = set()
    for ingredient, linked in ingredients_to_recipes.items():
        name = safe_file_component(ingredient)
        path = INGREDIENTS_DIR / f"Ingredient - {name}.md"
        expected_ingredient_paths.add(path)
        generate_note(path, "ingredient", ingredient, sorted_casefold(linked))
    prune_generated_notes(INGREDIENTS_DIR, expected_ingredient_paths)

    print(
        "Generated cross-links for "
        f"{len(recipe_paths)} recipes, "
        f"{len(techniques_to_recipes)} techniques, "
        f"{len(principles_to_recipes)} principles, "
        f"{len(ingredients_to_recipes)} ingredients."
    )


if __name__ == "__main__":
    main()
