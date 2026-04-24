# Design: deploy recipes subdomain

## Context

- Astro 6.1.9, pure static output, no SSR adapter. Build is `astro build` → `dist/`.
- `carlokruger.com` is already on Vercel; DNS zone is hosted at Namecheap
  (`registrar-servers.com` nameservers).
- Repo is public on GitHub: `ironicbuddha/my-recipe-book`.
- Recipe markdown in `recipes/` is canonical; the site is a projection over it.
- 28 recipes currently carry a `status:` frontmatter field that no code path
  reads.

## Decisions

### 1. Subdomain, not subpath

`recipes.carlokruger.com` over `carlokruger.com/recipes`.

- **Rationale**: keeps the main site's Vercel project untouched, isolates build
  failures, and lets the two sites have independent deploy cadences, redirects,
  and future routing.
- **Trade-off**: two DNS records to think about over the long run, and no
  shared navigation. Acceptable — the sites have different purposes.

### 2. Git integration, no CLI deploys

Vercel's GitHub app triggers a build on every push to `main`.

- **Rationale**: matches the existing "edit markdown, push, it's live" loop.
  No local Vercel env needed. The build only happens where it's authoritative.
- **Trade-off**: the repo becomes coupled to Vercel for the deploy path. The
  code remains portable — only the deploy config would need replacing.

### 3. No `@astrojs/vercel` adapter

Pure static output deployed as static files.

- **Rationale**: the adapter opts into serverless / edge functions, adding cold
  starts and complexity this site cannot use. The site reads local markdown at
  build time — there is nothing to run per-request.
- **Trade-off**: no ISR, no on-demand revalidation. Every content change
  requires a push (which rebuilds). This is the intended workflow.

### 4. Strip `status:` field entirely

Remove the field from all 28 recipes rather than repurpose it or filter on it.

- **Rationale**: the field is currently dead metadata. Keeping it invites
  future confusion ("is this site filtering on status?") and the obvious
  alternative — filtering drafts out of the public build — conflicts with the
  "fully public" decision. Killing the field is the simplest truthful state.
- **Trade-off**: loses an obsidian-side signal of maturity. If that signal is
  wanted back, it can be reintroduced as a new, explicitly-consumed field
  without legacy baggage.

### 5. Single site-wide OG image

One `/og-image.png` referenced from every page, not per-recipe dynamic images.

- **Rationale**: per-recipe OG images require either build-time image
  generation or an edge endpoint. Both are scope creep for a first deploy.
  A single branded image is correct social-preview etiquette for v1.
- **Trade-off**: every recipe share looks identical in link previews. If
  per-recipe previews become valuable, the retrofit is contained to
  `SiteLayout.astro` plus an image generator.

### 6. DNS stays at Namecheap; CNAME only

Do not transfer the zone to Vercel.

- **Rationale**: Vercel recommends moving DNS for apex domains to use their
  ANAME flattening, but `recipes.` is a pure subdomain — a `CNAME` is the
  textbook, most portable answer. Transferring DNS would couple the main
  `carlokruger.com` site's resolution to this change, which is the opposite of
  what decision #1 optimizes for.
- **Trade-off**: if future carlokruger.com subdomains multiply, centralizing
  DNS at Vercel might eventually be easier. Not a v1 concern.

### 7. `site:` as the keystone

Set `site: 'https://recipes.carlokruger.com'` in `astro.config.mjs` before
anything else. Sitemap refuses to build without it, canonical URLs cannot
resolve without it, and OG `url` tags depend on it.

## Risks

| Risk | Severity | Mitigation |
| --- | --- | --- |
| `hero.png` at 2MB hurts homepage LCP | medium | Out of scope for this change; separate polish task |
| pnpm / Node version drift on Vercel | low | Vercel auto-detects pnpm from lockfile; `engines.node: >=22.12.0` matches Vercel default |
| DNS propagation delay blocks verification | low | TTL stays low during cutover; worst case is a one-hour wait |
| `set:html` XSS from markdown | low | Content authored by repo owner; MarkdownIt defaults are safe |
| A recipe frontmatter edit breaks YAML parsing | low | Change is mechanical (remove one line); a failed `astro build` surfaces it immediately |

## Non-decisions

Things considered and explicitly punted:

- Analytics provider (Plausible vs Fathom vs Vercel Analytics) — no provider
  chosen. Add in a follow-up change when traffic is a real question.
- OG image generation pipeline — single static image is the v1 answer.
- `noindex` on drafts — not applicable once the field is stripped.
- Whether `ingredients/`, `techniques/`, `principles/`, `experiments/` should
  also become site sections — out of scope; today only `recipes/` renders.
