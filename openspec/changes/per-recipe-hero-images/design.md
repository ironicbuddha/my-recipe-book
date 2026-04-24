# Design: per-recipe hero images

## Context

- `gpt-image-2` (OpenAI, released 2026-04-21) is the target image model.
  Accessible via OpenAI API, supports a `/edit` endpoint that accepts a
  reference image plus a text prompt. Token-priced at ~$0.05–0.15/image.
- Astro's `<Picture>` pipeline with `src/assets/` source + sharp is
  already wired up (commit `17f24fd`) — any image dropped into
  `src/assets/` gets AVIF/WebP/PNG derivatives, responsive srcsets, and
  intrinsic width/height at build time.
- Recipe frontmatter carries structured signal: `title`,
  `primary_ingredient`, `primary_mass_g`, `dishType`, `techniques`,
  `tags`, `yield`. Recipe body carries sensory descriptors in its lead
  paragraphs and structural notes (e.g. "dense matrix. crackled surface.
  controlled set." on the brownies).
- The site's brand is documented in `.impeccable.md`: clinical,
  Modernist Cuisine-inspired, "flat hierarchy; 1px rules; tonal surfaces;
  restrained red emphasis; no ornamental depth."
- There are 28 recipes at time of writing.

## Decisions

### 1. Aesthetic = cross-section specimen

Every generated hero is a cross-section of the finished dish on a stark
neutral surface, overhead or slight-angle composition, flat even light,
no human hands or action, no serving context. Reference image enforces
the language.

- **Rationale**: matches the site's existing voice ("failure mode
  logged," "dense matrix," "PROTOCOL / LIVE FILE"). A consistent
  cross-section family gives the library index a recognizable pattern
  even as the dishes themselves differ wildly. Other aesthetics
  (contextual kitchen, process frames) fight the brand.
- **Trade-off**: cross-sections are the hardest thing AI image models
  get right. Some dishes (soups, sauces, thin foods) will need prompt
  accommodations — overhead bowl view with visible depth, etc.

### 2. Template-based prompt generation

`scripts/hero-prompt.ts` is pure string interpolation over frontmatter
fields plus the first sensory line of the recipe body. No LLM in the
prompt-generation loop.

- **Rationale**: consistency comes from boilerplate, not from clever
  phrasing. The recipes already carry the signal — primary ingredient,
  dish type, sensory words — so an LLM adds variance without adding
  insight. Deterministic prompts also make "regenerate to match updated
  content" trivial.
- **Trade-off**: edge recipes (beverages, sauces) may need prompt
  customisation the template can't express. A `hero_prompt_override`
  frontmatter field can be added later if the pattern emerges.

### 3. Pre-generated reference image, not per-call

One canonical cross-section image lives at
`src/assets/recipes/_reference.png`. All 28 generation calls use `/edit`
with this reference attached.

- **Rationale**: `gpt-image-2`'s `/edit` endpoint with a reference is the
  single most reliable way to keep 28 images visually coherent. Without
  a reference, each prompt draws from the model's own distribution of
  "cross-section food photography" which drifts recipe-to-recipe.
- **Trade-off**: the reference image itself has to earn its keep — if
  it's mediocre, all 28 inherit its mediocrity. Generating the reference
  is a deliberate step (Phase 2) with human review, not a one-shot.

### 4. Local one-off generation, not build-time

`scripts/generate-heroes.ts` runs manually from a developer machine.
Generated PNGs are committed to the repo. Production Vercel builds never
call the OpenAI API.

- **Rationale**: deterministic builds, zero API keys in Vercel env, zero
  per-build cost, zero failure modes where a build breaks because
  OpenAI had an outage. The generation pipeline is infrequent work —
  weekly at most, realistically only when new recipes land.
- **Trade-off**: a new recipe needs a manual script run to get its hero.
  Until then, the recipe page falls back to the no-hero layout (see
  decision 6).

### 5. Images stored under `src/assets/recipes/<slug>.png`

Filename matches the URL slug exactly. PNG source, Astro emits AVIF/WebP
derivatives at build time.

- **Rationale**: reuses the existing image pipeline. The slug is the
  only stable identifier tying a recipe to its hero — not the filename
  (filenames carry spaces and special chars), not the title (can
  change).
- **Trade-off**: renaming a recipe's slug orphans the image and
  regeneration is needed. Slugs are derived from filenames
  (`src/lib/recipes.ts`), which are stable in practice.

### 6. Silent fallback when hero missing

If `src/assets/recipes/<slug>.png` does not exist at build time, the
recipe detail page and card render without a hero rather than failing
the build.

- **Rationale**: a new recipe must be able to land in `recipes/` and
  ship to production before an image has been generated. Blocking the
  build forces image generation into the recipe-authoring loop, which
  is the wrong order of operations.
- **Trade-off**: a recipe with no hero looks visually incomplete on a
  site where most recipes have one. Acceptable as a transient state;
  can add a build-time warning listing missing heroes later.

### 7. No new frontmatter fields for v1

The prompt template pulls only from existing fields (`title`,
`primary_ingredient`, `dishType`, `techniques`, `tags`). No
`hero_prompt`, no `hero_style`, no `reference_override`.

- **Rationale**: adding frontmatter for content that the body already
  carries is dead metadata (same mistake the `status:` field made). If
  a specific recipe truly needs a custom prompt, the generator can
  accept `--prompt-override` as a CLI arg, no schema change required.
- **Trade-off**: edge recipes that need custom treatment are a CLI
  flag away, not a YAML line. Fine for a personal library of 28; might
  revisit if the library grows past 100.

## Risks

| Risk | Severity | Mitigation |
| --- | --- | --- |
| Reference image is the load-bearing dependency; a bad ref = 28 bad heroes | high | Phase 2 is explicitly human-in-the-loop with iteration budget |
| API cost runs away via retry loops or bugs | medium | Script emits cost estimate before generation; hard cap at 28 × 3 iterations; `--dry-run` flag |
| OpenAI ToS rejects some prompts (e.g. alcohol, specific cuts of meat) | medium | Phase 4 handles rejections per-recipe; document workarounds |
| Repo grows past comfortable size (~80 MB image binaries) | low | `.gitignore` pattern can exclude generated PNGs if LFS or external hosting becomes warranted later |
| Model drift: `gpt-image-2-2026-04-21` snapshot changes behavior on re-run | low | Pin the snapshot id in the script; re-runs are optional, not on a schedule |
| Slug collisions between recipes | low | Slugs are derived from filenames which are unique by date-prefix convention |
| Image is semantically wrong (AI hallucinates ingredients) | medium | Human review before commit is part of Phase 4; regenerate-on-reject is cheap |

## Non-decisions

Punted deliberately:

- Whether to also generate per-recipe OG images (1200×630) as a second
  output from the same pipeline. Likely yes eventually; out of scope
  here to keep v1 focused.
- Style refresh strategy when the aesthetic needs to evolve — does the
  whole library get regenerated, or is there a "vintage/current"
  distinction? Revisit when it matters.
- Phase shots / process imagery / ingredient stills. One cross-section
  per recipe for v1.
- Whether `_reference.png` itself is AI-generated or a curated photo
  from an existing cookbook / portfolio. Phase 2 will settle this in
  practice.

## Resolved questions

Both questions that blocked execution are settled:

1. **OpenAI API key availability.** ✓ User has an OpenAI API key with
   a topped-up budget as of 2026-04-24. Spend cap will be respected by
   the `--dry-run` estimate and the hard 28 × 3 call cap in the
   batch script.
2. **Reference image origin.** ✓ Option (a) — generate from scratch
   with careful prompting in Phase 2. No existing photo will be
   curated; no non-referenced generation will be attempted.
