#!/usr/bin/env python3
"""Extract recipe observations into non-authoritative Knowledge Candidates."""

from __future__ import annotations

import argparse
import json
import re
from collections import defaultdict
from datetime import date
from pathlib import Path


def _read(path: Path) -> str:
    return path.read_text(encoding="utf-8")


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
    text = canonicalize_ingredient(text)
    return canonical_term(text)


def canonicalize_ingredient(text: str) -> str:
    lower = text.lower()
    lower = lower.replace("&", " and ")
    lower = cleanup_space(lower)

    # Normalize spelling variants.
    lower = re.sub(r"\bchillies\b", "chili", lower)
    lower = re.sub(r"\bchilies\b", "chili", lower)
    lower = re.sub(r"\bchilli\b", "chili", lower)

    # Collapse clear duplicates and ordering variants.
    replace_map = {
        "bay leaves": "bay leaf",
        "beef sirloin or flank": "beef sirloin",
        "cloves": "clove",
        "coriander seeds": "coriander seed",
        "makrut lime leaves": "makrut lime leaf",
        "shallots": "shallot",
        "spring onions": "spring onion",
        "whole eggs": "egg",
        "whole egg": "egg",
        "eggs": "egg",
        "coriander stems or roots": "coriander roots or stems",
        "fresh red chilli": "fresh red chili",
    }
    lower = replace_map.get(lower, lower)

    # Normalize a few known phrase variants.
    if re.fullmatch(r"fresh red chili(?:es)?", lower):
        lower = "fresh red chili"

    return lower


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


def candidate_key(note_type: str, label: str) -> str:
    key = re.sub(r"[^a-z0-9]+", "-", label.lower()).strip("-")
    return f"{note_type}-{key}"


def has_nonempty_section(text: str, heading: str) -> bool:
    match = re.search(
        rf"^## {re.escape(heading)}\s*\n\s*\n([\s\S]*?)(?=^## |\Z)",
        text,
        flags=re.M,
    )
    return bool(match and match.group(1).strip())


def frontmatter_list(text: str, key: str) -> list[str]:
    frontmatter = re.match(r"^---\n(.*?)\n---\n", text, flags=re.S)
    if not frontmatter:
        return []
    contents = frontmatter.group(1)
    value = parse_frontmatter(text).get(key, "")
    if flow_values := split_flow_list(value):
        return flow_values
    match = re.search(
        rf"^{re.escape(key)}:\s*\n((?:[ \t]+-\s*[^\n]+\n?)*)",
        contents,
        flags=re.M,
    )
    if not match:
        return []
    return [
        strip_quotes(item)
        for item in re.findall(r"^[ \t]+-\s*([^\n]+)$", match.group(1), flags=re.M)
        if strip_quotes(item)
    ]


def valid_date(value: str) -> bool:
    if not re.fullmatch(r"\d{4}-\d{2}-\d{2}", value):
        return False
    try:
        date.fromisoformat(value)
    except ValueError:
        return False
    return True


def recipe_versions(root: Path) -> set[str]:
    versions: set[str] = set()
    recipes_dir = root / "recipes"
    if not recipes_dir.exists():
        return versions
    for path in recipes_dir.rglob("*.md"):
        if path.name == "README.md":
            continue
        record = parse_frontmatter(_read(path))
        identity = record.get("identity", "")
        version = record.get("version", "")
        if re.fullmatch(r"recipe/[a-z0-9]+(?:-[a-z0-9]+)*", identity) and re.fullmatch(
            r"[1-9]\d*", version
        ):
            versions.add(f"{identity}@{version}")
    return versions


def valid_evidence_sources(sources: list[str], known_recipe_versions: set[str]) -> bool:
    return bool(sources) and all(
        source in known_recipe_versions for source in sources
    )


def candidate_matches_label(candidate: str, label: str) -> bool:
    match = re.fullmatch(
        r"candidate/(technique|principle|ingredient)-[a-z0-9]+(?:-[a-z0-9]+)*",
        candidate,
    )
    return bool(
        match and candidate == f"candidate/{candidate_key(match.group(1), label)}"
    )


def retired_candidate_keys(root: Path) -> set[str]:
    """Return candidates whose Curator decision permanently retired the observation."""
    curation_dir = root / "records" / "curation"
    if not curation_dir.exists():
        return set()
    retired: set[str] = set()
    known_recipe_versions = recipe_versions(root)
    for path in curation_dir.rglob("*.md"):
        text = _read(path)
        record = parse_frontmatter(text)
        candidate = record.get("candidate", "")
        candidate_label = strip_quotes(record.get("candidate_label", ""))
        evidence_sources = frontmatter_list(text, "evidence_sources")
        if (
            record.get("record_type") == "curation"
            and record.get("decision") == "retire-candidate"
            and candidate_label
            and candidate_matches_label(candidate, candidate_label)
            and valid_evidence_sources(evidence_sources, known_recipe_versions)
            and strip_quotes(record.get("retirement_reason", ""))
            and strip_quotes(record.get("decided_by", ""))
            and valid_date(record.get("decided_on", ""))
            and has_nonempty_section(text, "Evidence")
            and has_nonempty_section(text, "Rationale")
        ):
            retired.add(candidate.removeprefix("candidate/"))
    return retired


def extraction_block(linked_recipes: list[str]) -> str:
    evidence = "\n".join(f"- `{recipe}`" for recipe in linked_recipes)
    return "\n".join(
        [
            "## Current Extraction",
            "",
            "<!-- CANDIDATE-EXTRACTOR:START -->",
            f"Frequency: {len(linked_recipes)} current Recipe(s).",
            evidence,
            "<!-- CANDIDATE-EXTRACTOR:END -->",
        ]
    )


def update_extraction_block(path: Path, linked_recipes: list[str]) -> bool:
    """Update only extractor-owned current-observation data, preserving all evidence."""
    text = _read(path)
    block = extraction_block(linked_recipes)
    pattern = re.compile(
        r"<!-- CANDIDATE-EXTRACTOR:START -->.*?<!-- CANDIDATE-EXTRACTOR:END -->",
        re.S,
    )
    updated = pattern.sub(block, text)
    if updated == text:
        updated = text.rstrip() + "\n\n" + block + "\n"
    if updated != text:
        path.write_text(updated, encoding="utf-8")
        return True
    return False


def record_candidate(
    candidates_dir: Path,
    retired_candidates: set[str],
    note_type: str,
    label: str,
    linked_recipes: list[str],
) -> str:
    """Record a current observation without altering Knowledge Notes or Curation."""
    candidates_dir.mkdir(parents=True, exist_ok=True)
    key = candidate_key(note_type, label)
    if key in retired_candidates:
        return "unchanged"
    path = candidates_dir / f"{key}.md"
    if path.exists():
        return "updated" if update_extraction_block(path, linked_recipes) else "unchanged"
    path.write_text(
        "\n".join(
            [
                "---",
                f"candidate: candidate/{key}",
                f"observed_type: {note_type}",
                f"observed_label: {json.dumps(label)}",
                "classification: unclassified-current-observation",
                "source_placeholder: null",
                "---",
                "",
                "## Evidence",
                "",
                f"Original label: {json.dumps(label)}.",
                "Provenance: current Recipe extraction.",
                "",
                extraction_block(linked_recipes),
                "",
                "## Disposition",
                "",
                "Await human Curation; extraction cannot establish a subject, alias, or retirement.",
                "",
            ]
        ),
        encoding="utf-8",
    )
    return "created"


def main(root: Path) -> None:
    recipes_dir = root / "recipes"
    candidates_dir = root / "records" / "candidates"
    recipe_paths = sorted(p for p in recipes_dir.glob("*.md") if p.name != "README.md")

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

    created = 0
    updated = 0
    retired_candidates = retired_candidate_keys(root)
    for note_type, observations in (
        ("technique", techniques_to_recipes),
        ("principle", principles_to_recipes),
        ("ingredient", ingredients_to_recipes),
    ):
        for label, linked in observations.items():
            result = record_candidate(
                candidates_dir,
                retired_candidates,
                note_type,
                label,
                sorted_casefold(linked),
            )
            if result == "created":
                created += 1
            elif result == "updated":
                updated += 1

    print(
        "Recorded candidate observations for "
        f"{len(recipe_paths)} recipes, "
        f"{len(techniques_to_recipes)} techniques, "
        f"{len(principles_to_recipes)} principles, "
        f"{len(ingredients_to_recipes)} ingredients; "
        f"{created} new candidate(s), {updated} updated candidate(s)."
    )


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--root",
        type=Path,
        default=Path(__file__).resolve().parent.parent,
        help="repository root (defaults to this script's repository)",
    )
    main(parser.parse_args().root.resolve())
