# Current culinary content and publication contracts audit

Date: 2026-08-26  
Wayfinder question: [Audit the current culinary content and publication contracts](https://github.com/ironicbuddha/my-recipe-book/issues/2)  
Foundation being tested: [Establish the feature-ready culinary publishing foundation](https://github.com/ironicbuddha/my-recipe-book/issues/1)  
Repository snapshot: `538ed1a7520a7787cdb13c87e2dfab69ebbbc519`, plus the preserved working-tree guidance supplied for this effort.

## Executive answer

The reliable contract today is narrower than the documented culinary model:

1. Every direct `.md` file in `recipes/`, except `README.md`, is read at build time and receives a public, date-bearing recipe route. There is no draft, status, or publication filter. This matches the confirmed rule that `recipes/` contains Canonical Recipes and is automatically published (`src/lib/recipes.ts:7-15`, `src/lib/recipes.ts:69-109`, `src/lib/recipes.ts:200-205`; `src/pages/recipes/[slug].astro:20-29`).
2. The validator enforces filenames and a handful of text patterns, not the documented recipe schema, metric/scaling rules, chronology, callout shape, link integrity, or publication safety (`scripts/validate_content.sh:50-86`). `make validate` passed this snapshot.
3. The Astro projection consumes only a small subset of recipe frontmatter and renders custom Obsidian callouts, but it does not resolve Wikilinks. Nineteen recipes therefore publish generated knowledge references as literal `[[...]]` text; the live [Cowboy Beans page](https://recipes.carlokruger.com/recipes/2026-02-19-cowboy-beans/) demonstrates the break.
4. Techniques, Principles, and Ingredients are not currently first-class curated publication content. All 302 current notes (64 Techniques, 50 Principles, 188 Ingredients) are generated link-node stubs, are not routed, and can be overwritten or deleted by the generator. The live homepage reports those counts, while the live `/techniques/`, `/principles/`, `/ingredients/`, and `/experiments/` paths return 404 ([live library](https://recipes.carlokruger.com/)).
5. Astro, Vercel, the custom domain, and static publication are operationally settled: the live homepage, recipe index, and recipe detail return 200; HTTP responses identify Vercel; and the live sitemap contains the homepage, recipe index, and 31 recipe pages (33 URLs total). The code fixes the site origin and sitemap integration (`astro.config.mjs:1-9`; [sitemap](https://recipes.carlokruger.com/sitemap-0.xml); [robots](https://recipes.carlokruger.com/robots.txt)). Documentation saying hosting is still TBD is stale (`constitution.md:7-16`, `constitution.md:38-41`).

## What is actually enforced

### Canonical recipe corpus

The written contract says recipes are canonical Markdown, phase-based, metric, scaled against a primary ingredient, versioned, and include Structural Notes and Failure Modes (`README.md:64-76`, `README.md:80-93`, `README.md:97-117`; `AGENTS.md:25-36`, `AGENTS.md:38-59`). The current corpus contains 31 recipe files; every one has YAML frontmatter, the full current frontmatter key set, a dish tag, `cssclass: modernist-recipe`, at least one Phase, Structural Notes, Failure Modes, and the two-column callout marker. The current corpus therefore satisfies the textual checks, but this is observed consistency rather than schema enforcement.

Several documented rules have no executable check:

- valid YAML values or types, a closing frontmatter delimiter, unique slugs, and agreement between filename date, frontmatter date, and title;
- exactly one allowed dish-type tag in frontmatter;
- metric-only quantities and temperature notation;
- a valid primary basis, percentage arithmetic, or two-portion sizing;
- chronological/unique Phase labels, correct two-column structure, horizontal-rule placement, and first-use ordering of ingredients.

The reason is mechanical: validation checks the first line, searches anywhere in the file for `version:`, any accepted `dish-*` text, and required heading regexes (`scripts/validate_content.sh:32-57`, `scripts/validate_content.sh:66-74`). It does not parse YAML or Markdown structure. It also accepts `dish-snack`, which is absent from the documented seven-value vocabulary (`scripts/validate_content.sh:70`; `AGENTS.md:35-36`). Techniques and Principles receive filename checks only; Experiments receive a filename check; Ingredients receive no per-file validation (`scripts/validate_content.sh:76-86`).

The Recipe template is itself unsafe under automatic publication: it still declares `status: draft`, although status is not read by Astro and the archived deployment decision removed status because every recipe is public (`templates/Recipe - Template.md:1-16`; `openspec/changes/archive/2026-04-24-deploy-recipes-subdomain/design.md:44-54`). A new file created from that template in `recipes/` would be published regardless of the word `draft`.

### Generated knowledge notes and graph

The crosslink generator parses only simple, one-line frontmatter and flow lists, extracts component-table ingredients, normalizes selected spellings, and inserts `RELATED LINKS` into recipes (`scripts/generate_crosslinks.py:40-89`, `scripts/generate_crosslinks.py:227-260`, `scripts/generate_crosslinks.py:344-360`). It then rewrites every expected Technique, Principle, and Ingredient note as a minimal `generated: true` stub and deletes generated notes no longer expected (`scripts/generate_crosslinks.py:267-314`, `scripts/generate_crosslinks.py:403-436`). A representative note contains only the generated flag, an expansion prompt, and recipe backlinks (`techniques/Technique - Browning.md:1-15`).

That means the generator currently owns those files more strongly than a curator does. Curating an expected generated note in place is not durable because the next run overwrites it; a generated note that falls out of the extracted set is deleted. This directly conflicts with the foundation's confirmed requirement that curated Techniques, Principles, and Ingredients remain first-class knowledge content.

The graph is also stale and optional. `make crosslinks` is separate from `make validate`, and `pnpm check` invokes validation but not crosslink generation (`Makefile:1-10`; `package.json:17-23`). Only 19 of 31 recipes currently contain generated `RELATED LINKS`. For example, the newer slaw declares `knife slicing`, `cold assembly`, and `aromatic continuity`, but the corresponding generated nodes are absent and the recipe has no Related Links block (`recipes/2026-05-29 - Celery-green-apple-fennel-pollen-slaw.md:1-15`, `recipes/2026-05-29 - Celery-green-apple-fennel-pollen-slaw.md:90-115`).

### Astro parser and presentation contract

Astro reads all direct recipe Markdown files synchronously with `gray-matter`. It consumes `title`, `date`, `tags`, `yield`, `primary_ingredient`, and optional `service_target`; it ignores `version`, `portions`, `target_internal_temperature_c`, `primary_mass_g`, `techniques`, `principles`, and `cssclass` (`src/lib/recipes.ts:37-44`, `src/lib/recipes.ts:69-101`). Route identity comes from slugifying the filename, including its date, while display title comes from frontmatter or a filename fallback (`src/lib/recipes.ts:79-100`, `src/lib/recipes.ts:145-149`, `src/lib/recipes.ts:281-289`).

Presentation is partly encoded in source Markdown. The renderer recognizes only the exact `[!col]`/`[!col-left]`/`[!col-right]`/`[!col-time]` syntax and turns it into Astro-owned HTML panels (`src/lib/recipes.ts:232-279`, `src/lib/recipes.ts:317-347`). The written authoring contract calls this a two-column, Obsidian-oriented CSS pattern and additionally requires an Obsidian `cssclass` (`AGENTS.md:38-65`). That contradicts the foundation's “no Obsidian” and “Astro owns Modernist presentation” boundary unless these callout tokens are deliberately retained as a portable semantic structure rather than presentation instructions.

Markdown rendering enables raw HTML, autolinking, and typographic substitutions (`src/lib/recipes.ts:18-22`), but no Wikilink resolver is registered. This contradicts the current glossary, which says source Wikilinks become Website Links and that the Knowledge Graph spans all five content types (`CONTEXT.md:14-37`). The renderer instead emits Wikilinks as literal text, confirmed on the live [Cowboy Beans page](https://recipes.carlokruger.com/recipes/2026-02-19-cowboy-beans/).

Only Recipes have routes. The homepage counts all five directories, but only the Recipes count links anywhere (`src/pages/index.astro:6-16`, `src/pages/index.astro:97-106`). The recipe index and static detail route are the entire knowledge publication surface (`src/pages/recipes/index.astro:1-27`; `src/pages/recipes/[slug].astro:20-40`).

### Build and deployment contract

The repository declares `pnpm check` as lint, typecheck, build, and content validation, and the constitution makes those checks delivery gates (`package.json:17-31`; `constitution.md:17-36`). On this snapshot, direct markdownlint, ESLint, stylelint, `astro check`, and `astro build` succeed; `astro check` reports two non-blocking hints. However, the aggregate `pnpm check` fails before its scripts under pnpm 11.22 because the `pnpm.onlyBuiltDependencies` setting in `package.json` is no longer read and `esbuild`/`sharp` build scripts are unapproved (`package.json:58-62`). No `packageManager` field pins a compatible pnpm version. The documented gate is therefore not deterministic for a fresh current-toolchain invocation even though the underlying code checks pass.

Deployment itself is consistent with the confirmed foundation. Astro is static, the custom `site` origin feeds canonical/share URLs, and every parsed Recipe generates a static path (`astro.config.mjs:6-9`; `src/layouts/SiteLayout.astro:13-19`, `src/layouts/SiteLayout.astro:33-49`; `src/pages/recipes/[slug].astro:20-33`). The live [recipe index](https://recipes.carlokruger.com/recipes/) exposes 31 cards and the live [sitemap](https://recipes.carlokruger.com/sitemap-0.xml) exposes exactly 33 URLs. There is no evidence requiring the map to reopen Astro, Vercel, `main`, or the custom domain.

## Representative edge cases for the contract prototype

1. **Generated links render as broken prose.** Cowboy Beans has a complete generated Related Links block (`recipes/2026-02-19 - Cowboy Beans.md:143-178`), but the live page displays every Wikilink literally because no resolver exists.
2. **Newer taxonomy is absent from the graph.** The slaw's frontmatter names knowledge concepts that have no generated note or Related Links block (`recipes/2026-05-29 - Celery-green-apple-fennel-pollen-slaw.md:9-13`, `recipes/2026-05-29 - Celery-green-apple-fennel-pollen-slaw.md:90-115`).
3. **Lead metadata variants leak into summaries.** `stripRecipeLead` recognizes only four exact labels, and excerpt extraction takes the first other non-skipped line (`src/lib/recipes.ts:16-17`, `src/lib/recipes.ts:151-170`, `src/lib/recipes.ts:291-315`). Consequently AeroPress publishes `Target Water Temperature: 90-94 C` as its excerpt (`recipes/2026-02-25 - AeroPress Competition Cup.md:17-25`), and Asian Chicken Noodle Soup publishes `Service Style: ...` (`recipes/2026-03-03 - Asian Chicken Noodle Soup.md:17-25`).
4. **A bare callout separator becomes content.** Sour Cherry Pie has a bare `>` inside its first callout (`recipes/2026-02-19 - Cherry Pie.md:28-44`); excerpt extraction does not skip it, so the live recipe index shows `>` as the card excerpt ([recipe index](https://recipes.carlokruger.com/recipes/)).
5. **The real format is already three-column.** The reverse-seared fillet recipe uses `[!col-time]` in every phase (`recipes/2026-03-08 - Reverse-Seared Fillet with Hibachi Cabbage, Steakhouse Fries & Gochujang Sauce.md:55-87`). The renderer supports it, but the Recipe template and authoring docs define only Components and Method. A prototype that covers only the documented two-column shape would discard a real service-timeline use case.
6. **Frontmatter duplicates prose with different types and vocabulary.** Temperature can be numeric, null, zero, or a descriptive string; the body separately carries “Internal,” “Serving,” or “Water” temperature. Astro ignores the frontmatter temperature entirely. This makes one-file ownership true at the file level but ambiguous at the field level (`templates/Recipe - Template.md:7-24`; `recipes/2026-02-25 - AeroPress Competition Cup.md:6-23`).
7. **The handoff pointer is dead.** `CONTEXT.md` requires loading an external handoff and names a most-recent path that no longer exists (`CONTEXT.md:3-10`). It cannot serve as durable architecture context.

## Contradictions against the confirmed foundation

| Confirmed foundation | Current contract | Consequence |
| --- | --- | --- |
| Repository authoring; no Obsidian | README and AGENTS describe an Obsidian vault, callout syntax, snippet, and `cssclass` (`README.md:3-6`; `AGENTS.md:5-10`, `AGENTS.md:61-65`) | The durable content/presentation boundary is unresolved in the docs and file format. |
| Astro owns Modernist presentation | Canonical Markdown embeds layout callouts, while Astro maps those exact tokens to CSS panels (`src/lib/recipes.ts:232-279`) | The prototype must decide which source structures are semantic and which are presentational residue. |
| Curated Techniques, Principles, and Ingredients stay first-class | All 302 are overwriteable generated stubs and have no routes | Curation, generation, identity, and publication need separate lifecycles. |
| `recipes/` only contains Canonical Recipes and is automatically published | Astro publishes every direct `.md`; the template still says `draft` | Automatic publication is implemented, but admission to `recipes/` is not guarded strongly enough. |
| Vercel/custom domain are settled | Live deployment is healthy, but constitution says static host TBD (`constitution.md:15`, `constitution.md:38-41`) | Correct documentation; do not spend a new decision ticket reselecting infrastructure. |
| Durable architecture language should live in `CONTEXT.md` | Current glossary promises a resolver that does not exist and calls generated notes Canonical Notes (`CONTEXT.md:14-37`) | Language should distinguish Canonical Recipe, curated Knowledge Note, generated index/projection, Wikilink, and Website Link. |

## Implications and questions for downstream Wayfinder tickets

- **Recipe-contract prototype:** cover at least a normal two-column recipe, the three-column service-timeline recipe, a non-temperature endpoint, a beverage, and a batch-constrained bake. Decide one authoritative representation for yield, portions, temperature/endpoint, primary basis, and summary instead of preserving duplicated frontmatter/prose by accident.
- **Validation contract:** decide whether entry into `recipes/` is the publication decision. If yes, validation must parse YAML/Markdown and fail closed on schema, exactly one dish type, route collisions, structural invariants, and unresolved knowledge references before `main` can deploy.
- **Presentation boundary:** decide whether canonical Markdown retains semantic Phase/Components/Method/Timing structures in portable Markdown or uses another Markdown-native representation. Retire Obsidian-only `cssclass` and layout language if Astro truly owns presentation.
- **Knowledge lifecycle:** separate curated notes from generated backlinks/indexes. The generator must never overwrite or prune curated content. Decide stable identities, aliases/normalization, and whether references are validated against curated nodes before adding public routes.
- **Graph publication:** decide the Website Link route scheme and missing-target behavior before implementing Wikilink resolution. Counts without navigable content should not imply a published library.
- **Toolchain/release documentation:** pin pnpm or migrate build-approval configuration, then update the constitution and README to state the already-settled static Vercel release path. This is operational cleanup, not an infrastructure decision.
- **Migration inventory:** keep bulk migration out of this foundation map, but retain the observed seams as acceptance fixtures: 31 auto-published recipes, 19 with stale generated link blocks, 12 without them, one three-column timeline recipe, multiple lead-label variants, and generated-node normalization oddities such as compound ingredient names (`ingredients/Ingredient - Salt + Black Pepper.md:1-15`).

## Verification performed

- `make validate` — passed.
- Direct markdownlint, ESLint, stylelint, `astro check`, and `astro build` — passed; `astro check` emitted two hints.
- Aggregate `pnpm check` under pnpm 11.22 — blocked before scripts by ignored build-approval configuration.
- Local parser inventory — 31 Recipes, 64 Techniques, 50 Principles, 188 Ingredients, 0 Experiments; 31 unique recipe slugs; 19 rendered recipe bodies contain literal Wikilinks.
- Live smoke test — homepage, recipe index, representative recipe, robots, and sitemap return 200; knowledge-section paths return 404; sitemap contains 33 URLs.

No pre-existing repository content file was changed; this audit is the only new
repository artifact. Wayfinder tracker resolution is handled separately.
