## Resolution

The canonical-content validation and Promotion gates were agreed through live
Grilling and Domain Modeling.

### Promotion and evidence

- Every future Promotion requires a repository-held Promotion Record identifying
  the exact Recipe identity and version, supporting Completed Experiments,
  accepting Curator, acceptance date, and acceptance rationale including known
  shortcomings. Missing or mismatched acceptance blocks admission to `recipes/`.
- At least one qualifying Completed Experiment must target the exact whole
  Recipe Draft. Missing, incomplete, or differently targeted evidence cannot
  satisfy this gate. A successful outcome is not required: the Curator judges
  culinary acceptability and explains why the evidence supports acceptance.
- One-time grandfathering requires a Curator-approved list of exact existing
  Recipe Versions. Only historical Experiment evidence and historical Promotion
  Records are exempted. Content and reference contracts still apply; the
  exception never carries forward to a new version.

### Validation and publication

- Provable content-contract violations are hard failures: invalid required
  structure or fields, units, scaling, Phase dependencies, identities or
  references, and missing required acceptance or evidence.
- Possible editorial or culinary concerns requiring judgment, and missing
  optional presentation assets, are warnings. Warnings do not block publication
  and cannot downgrade a known contract violation. Human review remains
  responsible for culinary meaning that validation cannot reliably establish.
- Invalid authoritative content blocks the entire new publication; it must not
  be silently omitted. The last successful site remains live. Content
  diagnostics identify the source file, location, and violated rule.
- Required validators, typechecks, builds, and publication-integrity checks must
  complete successfully. Failure, crash, unavailability, or skipping a required
  check blocks publication. Optional work may fail with a warning only when the
  site still renders correctly without its output.
- Unfinished Recipe Drafts and Knowledge Candidates do not independently block
  publication. Anything required to validate authoritative content must remain
  valid and resolvable, including unpublished historical reference targets.
- These gates cover Canonical Recipes, Completed Experiments, and Knowledge
  Notes under their respective contracts. Experiments require complete,
  preserved evidence and a valid exact subject reference. Knowledge Notes
  require human-curated substance about exactly one Ingredient, Technique, or
  Principle, with valid identity and references. Generated placeholders cannot
  become Knowledge Notes merely by passing structural checks.

### Contract clarifications

- Recipe Versions are positive integers in Recipe frontmatter, Experiment
  subjects, Promotion Records, and references such as `recipe/bun-cha@3`.
  Migration must explicitly map existing version labels to positive integers.
- Phase references use the exact heading code: `## PHASE B — NAME` is referenced
  as `phase: PHASE B`. These clarifications replace the conflicting `v0.3` and
  `PHASE-02` examples in the earlier Experiment identity decision.
- Numeric Ingredient Use scaling percentages use exactly two decimal places,
  including trailing zeros. Calculate from authored mass divided by declared
  basis mass, multiplied by 100, with halfway rounding up: `250 g` against
  `1600 g` gives `15.63%`. Incorrect values or precision fail validation. The
  existing non-numeric `—` exception remains for discretionary or non-mass Uses.

### Artifacts and verification

The durable local artifacts are the [canonical glossary](../../CONTEXT.md),
[Promotion ADR](../../docs/adr/0001-human-controlled-evidence-backed-promotion.md),
and [identity ADR](../../docs/adr/0002-decouple-culinary-identity-from-presentation.md).
The [portable Recipe prototype](../../docs/prototypes/portable-recipe-contract/recipe.md)
now demonstrates two-decimal scaling. These remain uncommitted local changes.

At the user's explicit request, the failing `pnpm check` command was repaired:
the obsolete `package.json` build-approval setting was replaced with explicit
`esbuild` and `sharp` approvals in `pnpm-workspace.yaml`. No dependency versions
or lockfile changed. Full `pnpm check` passed, including lint, Astro typecheck,
static build, and content validation; Astro reported two non-blocking hints.
Content validation, scoped Markdownlint, and diff whitespace checks also passed
after the final documentation edits.

The agreed future gates have not been implemented in the validator or publisher.
Migration and delivery sequencing remain with
[Shape the corpus migration and feature-development handoff](https://github.com/ironicbuddha/my-recipe-book/issues/7).
No additional investigation ticket is required by these decisions.
