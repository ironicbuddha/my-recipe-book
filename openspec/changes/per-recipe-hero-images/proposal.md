# Per-recipe hero images

## Why

The site has a clear visual brand — "Lab Station 01," clinical surfaces,
cross-section language — but the 28 recipe detail pages currently have no
hero image of their own. Every recipe reads text-first, with the library
level hero (`src/assets/hero.png`) being the only dish-adjacent visual
anywhere on the site.

Per-recipe hero images would:

- Give the recipe index scannable visual identity so users can recognise
  dishes at a glance without parsing titles.
- Reinforce the "specimen / cross-section" brand on the pages where the
  brand actually matters — the technical pages themselves.
- Close one of the follow-ups captured when deploying the subdomain
  (`openspec/changes/archive/2026-04-24-deploy-recipes-subdomain/tasks.md`
  Phase 8, item "per-recipe OG images" — which naturally extends from
  heroes).

The enabling capability is OpenAI's `gpt-image-2` (released 2026-04-21),
whose `/edit` endpoint accepts reference images — the single feature that
makes visual consistency across 28+ dishes tractable without a human
art-director in the loop.

## What Changes

**Prompt generation**

- Add `scripts/hero-prompt.ts` — a CLI script that reads a recipe's
  markdown, extracts structured signal from its frontmatter and body, and
  emits a gpt-image-2 prompt string to stdout. Template-driven, not
  LLM-driven. Zero API calls.

**Reference image**

- Generate one canonical cross-section hero by hand (prompt-only, no
  reference) to establish the style lock. Commit it to
  `src/assets/recipes/_reference.png`. All subsequent per-recipe
  generations inherit from this file via the `/edit` endpoint.

**Batch generation**

- Add `scripts/generate-heroes.ts` — runs the prompt generator for every
  recipe, calls `gpt-image-2`'s `/edit` endpoint with the reference image
  attached, downloads each result to `src/assets/recipes/<slug>.png`.
  Skips recipes where the file already exists unless `--force` is passed.
  Emits a cost estimate before running.

**Display**

- Extend `src/pages/recipes/[slug].astro` to render an `<Image>` at the
  top of each recipe page, reading from `src/assets/recipes/<slug>.png`.
  Falls back to no-hero rendering if the file does not exist, so new
  recipes do not block the build.
- Extend `src/components/RecipeCard.astro` to show a thumbnail derivative
  of the same image on the index. Astro's `<Image>` pipeline emits the
  AVIF/WebP/PNG derivatives automatically (already wired up via
  `perf: optimize hero image with responsive AVIF/WebP pipeline`).

## Impact

- **Affected surface**: every recipe detail page and every recipe card on
  the index gain a visual. First-paint cost is bounded by the AVIF
  pipeline that already handles the library hero.
- **Affected infra**: one new OpenAI API dependency at generation time.
  Production builds on Vercel remain API-key-free — all generation runs
  locally and is committed as static assets.
- **Affected cost**: approximately USD 5–10 to generate an initial full
  set at ~$0.10/image × ~2 iterations × 28 recipes. Ongoing cost is only
  incurred for new recipes or deliberate regenerations.
- **Affected repo size**: ~1.5–3 MB per original PNG × 28 = ~50–80 MB of
  image binaries committed. Within reason for a personal repo; flag if
  it grows beyond that.

## Non-goals

Explicitly out of scope for this change — each is a reasonable follow-up:

- Per-recipe Open Graph images (the single site-wide `og-image.jpg` stays;
  recipe-specific social previews are a separate change).
- Build-time image generation on Vercel. Pipeline is local/manual only.
- Automatic regeneration triggered by recipe edits or CI.
- An admin UI / review dashboard for managing the generated set.
- Multiple images per recipe (phase shots, ingredient stills, etc.).
- LLM-drafted prompts that read the recipe body holistically. Template
  reads structured signal only.
- Alternative image providers (Midjourney, Flux, Stability, local SD).
  This change commits to `gpt-image-2`; switching providers later is
  contained to the two generator scripts.
- Migration of the library-level `src/assets/hero.png` to an also-generated
  asset. The kitchen/lab scene stays as a human-photographed hero.
