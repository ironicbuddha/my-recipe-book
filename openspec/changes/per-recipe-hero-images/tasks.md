# Tasks: per-recipe hero images

## Phase 1 — Prompt generator (no API calls, fast iteration)

- [x] Create `scripts/hero-prompt.ts`. Accepts a recipe slug or filename
      as an argument. Reads the recipe, parses frontmatter via
      `gray-matter`, extracts structured fields plus the first sensory
      line of the body, and emits a prompt string to stdout.
- [x] Add a prompt template as a top-of-file constant. Mandatory
      boilerplate: stark neutral surface, flat even light, no hands,
      no garnish flourishes, no text, 3:2 aspect ratio. Dish-type
      branching for framing (cross-section for solids, overhead bowl
      for soups, cup for coffee, etc.). Interpolate dish-specific fields.
- [x] Add a `pnpm hero-prompt <slug>` script alias in `package.json`.
- [ ] Iterate on the template by pasting outputs into the ChatGPT
      Playground (or any web UI) until a sample recipe (e.g. Hash
      Brownies) produces an output that matches the target aesthetic.
      Zero API cost during this loop. ← awaiting user review

## Phase 2 — Reference image

- [ ] Decide reference image origin (see design.md open question 2):
      generate from scratch, curate from existing photo, or skip.
- [ ] If generating: prompt-only generation via ChatGPT Images UI (not
      API) to let the user iterate without script plumbing. Pick one
      keeper.
- [ ] Save the chosen reference to
      `src/assets/recipes/_reference.png`. Commit it. Future
      regenerations draw style from this file.
- [ ] Document the reference prompt in
      `src/assets/recipes/_reference.md` so the reference itself is
      reproducible.

## Phase 3 — Batch generation script

- [ ] Confirm user has an OpenAI API key (see design.md open question 1).
      Store it locally in `.env.local` (already gitignored via `.env`).
- [ ] Add `openai` SDK as a devDependency (`pnpm add -D openai`).
- [ ] Create `scripts/generate-heroes.ts`. Accepts an optional
      comma-separated slug list (default: all recipes without an
      existing hero). Flags: `--force` to regenerate existing,
      `--dry-run` to print prompts + cost estimate without calling the
      API, `--only <slug>` for a single recipe.
- [ ] Pin the model snapshot: `model: 'gpt-image-2-2026-04-21'`.
- [ ] On each recipe: call the `/edit` endpoint with
      `src/assets/recipes/_reference.png` as the image input and the
      prompt from `hero-prompt.ts`, download the returned PNG to
      `src/assets/recipes/<slug>.png`.
- [ ] Print running cost estimate and final total. Hard-cap at 28 × 3
      calls as a safety against runaway loops.
- [ ] Add a `pnpm gen-heroes` script alias in `package.json`.

## Phase 4 — Generate the initial set

- [ ] Run `pnpm gen-heroes --dry-run` first. Review prompt outputs and
      cost estimate.
- [ ] Run `pnpm gen-heroes` for all 28 recipes.
- [ ] Human-review each generated image. Regenerate per-recipe with
      `pnpm gen-heroes --only <slug> --force` for rejects.
- [ ] Commit the full set under `src/assets/recipes/`. Check repo size
      delta.

## Phase 5 — Display

- [ ] Extend `src/pages/recipes/[slug].astro` to render an `<Image>` at
      the top of the recipe-sheet layout. Source:
      `src/assets/recipes/<slug>.png` when it exists, otherwise omit
      the element entirely.
- [ ] Import pattern: dynamic import via `import.meta.glob()` so
      missing files don't break the build.
- [ ] Extend `src/components/RecipeCard.astro` to render a small
      thumbnail (e.g. 480px wide) above the title. Same fallback.
- [ ] Update `src/styles/global.css` with layout rules for the detail
      hero and card thumbnail. Maintain existing specimen-card overlay
      on the library hero; do not collide visually.
- [ ] Run `pnpm build`. Verify the generated HTML has `<picture>`
      elements for recipes that have images and no hero markup for
      recipes that don't.

## Phase 6 — Commit and deploy

- [ ] Commit Phases 1, 3, and 5 as separate logical commits. Phase 4
      (the image binaries themselves) can be a single bulk commit.
- [ ] Push to `origin/main`. Vercel auto-deploys.
- [ ] Smoke test `https://recipes.carlokruger.com/recipes/` — heroes
      visible on card grid. Open at least three recipe detail pages —
      hero at top, responsive.
- [ ] Confirm LCP has not regressed. Card thumbnails at 480px AVIF
      should be in the ~20–40 KB range each.

## Phase 7 — Close out

- [ ] Archive this change via `/opsx:archive` once Phase 6 smoke tests
      pass.
- [ ] Note remaining follow-ups in the archive tasks.md Phase 7:
      per-recipe OG images (1200×630 second output from the same
      pipeline), build-warning for missing heroes, style refresh plan.
