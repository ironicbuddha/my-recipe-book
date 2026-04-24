# Deploy recipes subdomain

## Why

The Astro site is production-ready but only runs locally. The recipe library has
real reference value — ratios, phase procedures, failure modes — and deserves a
stable public URL rather than living only in a git repository.

`carlokruger.com` already runs on Vercel with DNS at Namecheap, so the cheapest
useful step is to publish the site as `recipes.carlokruger.com` on the same
infrastructure, with enough SEO scaffolding that it behaves like a real public
site rather than a naked build.

## What Changes

**Content**

- Strip the unused `status:` field from all 28 recipe frontmatter blocks. The
  field is not consumed by any code path and the concept of "draft" has no
  runtime meaning.

**Code**

- Set `site: 'https://recipes.carlokruger.com'` in `astro.config.mjs`. This is
  the prerequisite for absolute URLs in sitemap and canonical links.
- Add the `@astrojs/sitemap` integration. Auto-emits `/sitemap-index.xml` from
  generated routes.
- Add a static `public/robots.txt` allowing all crawlers and pointing to the
  sitemap.
- Add `public/og-image.png` — a ~1200×630 derivative of `hero.png`, compressed
  to <300KB.
- Extend `SiteLayout.astro` with `<link rel="canonical">`, `og:*`, and
  `twitter:card` meta tags driven by the layout's existing `title` /
  `description` props.

**Ops (outside the repo)**

- Import `ironicbuddha/my-recipe-book` as a Vercel project under the
  `carlokruger` team. No adapter, no env vars, no custom `vercel.json`.
- Attach `recipes.carlokruger.com` as a domain in the Vercel project.
- Add a `CNAME` record at Namecheap: `recipes` → `cname.vercel-dns.com.`.
- Verify SSL issuance and smoke-test the live URL.

## Impact

- **Affected surface**: homepage, recipe index, and all 28 recipe detail pages
  gain canonical URLs and social preview metadata. All recipe markdown files
  lose one frontmatter line.
- **Affected infra**: a new Vercel project and one new DNS record. The apex
  `carlokruger.com` and `www` records are untouched — this change is strictly
  additive.
- **User-visible**: `https://recipes.carlokruger.com` becomes reachable, link
  previews render correctly in Slack / iMessage / social, and search engines
  can crawl the site cleanly.

## Non-goals

Explicitly out of scope for this change — each is a reasonable follow-up, but
bundling would expand risk and delay the basic deploy:

- `@astrojs/vercel` adapter / SSR / ISR — the site is pure static.
- Per-recipe Open Graph images (single site-wide image for v1).
- Analytics (Plausible, Fathom, Vercel Analytics) — separate decision.
- Google Search Console / Bing Webmaster verification.
- Custom 404 page.
- Image optimization via `astro:assets` for inline content.
- Auth / access control of any kind. The site is fully public.
- Preview deployments on branches — the workflow is push-to-main.
- Subpath deployment (`carlokruger.com/recipes`); subdomain is the chosen shape.
