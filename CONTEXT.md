# Modernist Recipe Book

<!-- BEGIN HANDOFF DISCOVERY -->
## Handoff Discovery

Before starting work in this repository, check `/Users/carlo/dev/handoff-docs` for handoff documents whose metadata `source_repo` matches this repository path. Load the most recently modified matching handoff document into context before making changes.

Most recent handoff: `/Users/carlo/dev/handoff-docs/recipe-site-handoff-20260529-153127.md`
Last updated: 2026-05-29 15:31
<!-- END HANDOFF DISCOVERY -->

A Markdown-first culinary knowledge system where Obsidian-compatible notes remain the canonical source and the website publishes them as a navigable presentation layer.

## Language

**Canonical Note**:
A Markdown file in `recipes/`, `techniques/`, `principles/`, `ingredients/`, or `experiments/` that owns the source content for a culinary concept.
_Avoid_: CMS entry, website page

**Wikilink**:
An Obsidian-style `[[...]]` reference from one Canonical Note to another.
_Avoid_: Website link, Markdown link

**Website Link**:
The rendered navigation target produced by resolving a Wikilink in the Astro presentation layer.
_Avoid_: Obsidian link

**Knowledge Graph**:
The set of relationships formed when Canonical Notes reference one another through Wikilinks.
_Avoid_: Recipe-only links, technique-only links

## Relationships

- A **Canonical Note** may contain many **Wikilinks**
- A **Wikilink** may resolve to one **Website Link**
- A **Website Link** must not replace the **Wikilink** in source Markdown
- The **Knowledge Graph** spans recipes, techniques, principles, ingredients, and experiments

## Example dialogue

> **Dev:** "Should `[[Technique - Braising]]` be rewritten as `/techniques/braising/` in the recipe file?"
> **Domain expert:** "No — keep the **Wikilink** in the **Canonical Note** and let the website render it as a **Website Link**."

## Flagged ambiguities

- "links" can mean either source-level **Wikilinks** or rendered **Website Links** — resolved: source Markdown keeps Wikilinks, the website generates Website Links.
- "technique links" was too narrow for the intended feature — resolved: the resolver belongs to the broader **Knowledge Graph**.
