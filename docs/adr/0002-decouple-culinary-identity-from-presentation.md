# Decouple Culinary Identity from Files and Presentation

Recipes and curated culinary subjects need durable relationships and public
addresses even when titles, filenames, and presentation code change. Each
Recipe, Experiment, Ingredient, Technique, and Principle owns an immutable typed
identity, while publication projects routes and redirects from those identities
without placing Astro paths in canonical Markdown.

## Decision

Stable identities use a typed, lowercase ASCII key:

```text
recipe/bun-cha
experiment/bun-cha-charcoal-trial-01
ingredient/shaoxing-wine
technique/low-temperature-baking
principle/maillard-reaction
```

The grammar is
`(recipe|experiment|ingredient|technique|principle)/[a-z0-9]+(-[a-z0-9]+)*`.
The key may be seeded from the initial name, but it is never regenerated after
a rename. Canonical frontmatter stores the bare identity; canonical Markdown
uses ordinary links whose target is `ref:<identity>`, for example
`[Chicken](ref:ingredient/chicken)`. Filenames remain human-facing storage
conventions only.

The publisher derives plural, type-scoped routes such as
`/recipes/bun-cha/` and `/ingredients/shaoxing-wine/`. Aliases support
recognition and search but do not create identities or routes. Former public
paths live in a publisher-owned redirect registry outside canonical content;
each maps directly to a surviving identity. Redirects must be permanent,
one-hop, collision-free, acyclic, and resolvable.

Recipe Versions use positive integers consistently in Recipe frontmatter,
Experiment subjects, Promotion Records, and references. Recipe Version locators
append `@<version>` to the Recipe identity, for example `recipe/bun-cha@3`.
Migration must explicitly map existing version labels to positive integers.
Phase, Phase Output, and Ingredient Use locators are scoped beneath that exact
version. Phase references use the exact code from the Recipe heading: a heading
`## PHASE B — NAME` is referenced as `phase: PHASE B`, without its descriptive
name. Phase Outputs use a version-local key, and
Ingredient Uses use a phase-local key. The enduring Recipe route serves the
current Canonical Recipe; exact Recipe Versions do not automatically receive
public archive routes.

Every authoritative reference must resolve uniquely with the declared type.
Missing, ambiguous, or type-mismatched targets are invalid. Retired targets are
invalid except for preserved historical primary-subject references in Completed
Experiments, as described below. A resolved
target that is not Publication Eligible remains a Knowledge Graph edge but is
rendered without a public anchor. Semantic Markdown structure owns the
relationship predicate, ordinary prose references are navigational mentions,
and backlinks and indexes are derived rather than authored twice.

If established subjects are merged, current references migrate to the
survivor, the losing identity is permanently retired, and any former public
route redirects to the survivor. Retired identities are never reused and are
not accepted in current canonical content except for that historical-reference
exception.

### Experiment identity and evidence

An Experiment receives its identity when created and retains it on completion.
Its public route is `/experiments/<key>/`, eligible only when it is a Completed
Experiment that satisfies its content contract. A repeat trial or new or
corrected evidence requires a new Experiment identity. Editorial corrections
retain the existing identity and do not change the evidence.

Exactly one structured `primary_subject` field identifies the trial's subject.
The four allowed forms are:

```yaml
primary_subject:
  type: recipe-version
  recipe: recipe/bun-cha
  version: 3
```

```yaml
primary_subject:
  type: ingredient-use
  recipe: recipe/bun-cha
  version: 3
  phase: PHASE B
  key: marinade-sugar
```

```yaml
primary_subject:
  type: technique
  identity: technique/low-temperature-baking
```

```yaml
primary_subject:
  type: principle
  identity: principle/maillard-reaction
```

Validation requires the fields for the declared type and unique resolution to
that type. Recipe Versions resolve exactly; Ingredient Uses resolve within the
specified Recipe Version and Phase. Technique and Principle subjects resolve by
Stable Identity. The procedure records the actual conditions tested.

Completion freezes the primary-subject reference, hypothesis, procedure,
results, and decision. The reference never follows the current Canonical Recipe.
Once a Completed Experiment targets a Recipe Draft or an Ingredient Use within
it, any Culinary Change requires a new Recipe Draft version. An Ingredient Use
trial does not satisfy the whole-Recipe-Draft evidence requirement for Promotion.

A Completed Experiment may publish even when its subject is a Recipe Draft.
The unpublished subject renders as plain text identifying its exact version and
local scope where applicable. The Experiment's own recorded procedure and
results provide context; publication gives the draft neither eligibility nor a
public route.

An Experiment correcting earlier evidence explicitly references the Experiment
it corrects. Both retain their identities and evidence records. Once the
correction publishes, a derived notice on the original links to it. An ordinary
repeat trial does not imply a correction.

If a primary subject's identity is later merged, a Completed Experiment retains
its historical reference. A durable retirement record preserves resolution of
the original identity and identifies the survivor. This is an exception to
reference migration, preserving what the trial actually targeted. New
Experiments must use the surviving identity.

## Considered Options

UUIDs were rejected because they make a small, manually curated corpus painful
to author and inspect. Filename-derived identities, authored slugs, public URLs,
and Obsidian Wikilinks were rejected because they couple durable culinary
relationships to mutable storage or presentation choices. Automatic alias
routes and transparent identity aliases were rejected because they create route
collisions and conceal stale canonical references.

Rewriting a Completed Experiment's primary subject after a merge was rejected
because it changes the historical evidence relationship. Retaining that
reference requires retirement records to remain resolvable, but preserves the
trial's meaning without admitting retired targets in new Experiments.

## Consequences

Validation must enforce identity grammar, uniqueness, immutability, typed
resolution, local locator rules, and redirect integrity before authoritative
content is published. Migration must mint identities, replace Wikilinks,
preserve existing date-bearing public Recipe URLs as redirects, and keep
publisher metadata outside canonical Markdown.
