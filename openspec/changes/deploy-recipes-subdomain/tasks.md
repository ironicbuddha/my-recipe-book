# Tasks: deploy recipes subdomain

## Phase 1 — Content cleanup

- [x] Strip the `status:` line from every recipe in `recipes/`. Verify with
      `grep -l '^status:' recipes/*.md` returning empty. Run `pnpm build` to
      confirm all 28 recipes still parse.
- [x] Remove any documentation references to recipe "status" / "draft"
      (README, AGENTS.md, constitution.md) if present.

## Phase 2 — Site configuration

- [x] Set `site: 'https://recipes.carlokruger.com'` in `astro.config.mjs`.
- [x] Add `@astrojs/sitemap` as a dev dependency (`pnpm add -D @astrojs/sitemap`)
      and register it in `astro.config.mjs` integrations.
- [x] Create `public/robots.txt` with `User-agent: *`, `Allow: /`, and a
      `Sitemap:` line pointing at `/sitemap-index.xml`.
- [x] Run `pnpm build` and confirm `dist/sitemap-index.xml` and
      `dist/sitemap-0.xml` exist and list all expected routes.

## Phase 3 — Social metadata

- [x] Produce `public/og-image.jpg` — 1200×630 derivative of `public/hero.png`,
      compressed to <300KB. Switched format PNG → JPG mid-apply because
      photographic PNG exceeded the size budget (946KB vs 142KB at q=85).
      Keep the original `hero.png` untouched.
- [x] Extend `SiteLayout.astro` with `<link rel="canonical" href={...}>` built
      from `Astro.url.pathname` and `Astro.site`.
- [x] Add Open Graph meta tags (`og:title`, `og:description`, `og:url`,
      `og:image`, `og:type`) driven by the existing `title` / `description`
      props.
- [x] Add Twitter card meta (`twitter:card=summary_large_image`,
      `twitter:title`, `twitter:description`, `twitter:image`).
- [x] Manually verify the homepage's rendered `<head>` contains all expected
      tags via `pnpm preview`.

## Phase 4 — Commit and push

- [ ] Commit Phase 1–3 as logical, separate commits (content / config / meta).
- [ ] Push to `origin/main`.
- [ ] Confirm GitHub Actions / pre-commit hooks pass.

## Phase 5 — Vercel project

- [ ] In the Vercel dashboard, switch to the `carlokruger` team.
- [ ] Import `ironicbuddha/my-recipe-book` as a new project. Accept the
      auto-detected Astro framework, default build command, default output
      directory.
- [ ] Trigger the first production deploy.
- [ ] Verify the `*.vercel.app` preview URL renders the homepage, recipe
      index, a sample recipe detail, `/sitemap-index.xml`, and `/robots.txt`.

## Phase 6 — Domain attachment

- [ ] In the Vercel project → Settings → Domains, add
      `recipes.carlokruger.com`. Note the CNAME target Vercel requests
      (typically `cname.vercel-dns.com`).
- [ ] In Namecheap → Advanced DNS for `carlokruger.com`, add a CNAME record:
      Host `recipes`, Value `cname.vercel-dns.com.`, TTL `Automatic`.
- [ ] Wait for Vercel to verify the domain. Confirm SSL is provisioned.

## Phase 7 — Live verification

- [ ] Smoke test `https://recipes.carlokruger.com`: homepage, `/recipes/`,
      at least three recipe detail pages, `/sitemap-index.xml`, `/robots.txt`.
- [ ] Run one social-preview validation (e.g. paste the homepage URL into
      a Slack message or use an OG debugger) and confirm the image renders.
- [ ] Confirm `https://carlokruger.com` and `https://www.carlokruger.com`
      are unaffected.

## Phase 8 — Close out

- [ ] Archive this change via `openspec:archive` once Phase 7 is clean.
- [ ] Open follow-up tickets (not in this change) for: analytics provider,
      Search Console verification, custom 404, per-recipe OG images,
      `hero.png` LCP optimization.
