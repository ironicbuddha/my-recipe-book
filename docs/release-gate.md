# Release gate

Every Vercel deployment runs `pnpm release:verify` before Vercel accepts its
`dist/` output. The gate requires, in order:

1. Content and publication-integrity validation (`make validate`)
2. Linting
3. Astro type checking
4. The complete test suite and coverage threshold
5. A fresh Astro build that produces `dist/index.html`

Each command is required. Before building, the gate removes the local `dist/`
output so a stale artifact cannot satisfy it. A non-zero exit, a crash, or an
absent fresh build artifact rejects the deployment, so Vercel cannot replace the current production
deployment with that revision. The deployment platform retains the previous
production artifact; the gate never alters a production alias itself.

`make validate` loads the full authoritative library: Canonical Recipes,
Completed Experiments, and curated Knowledge Notes. It follows their required
references even when those targets are unpublished. Unrelated Recipe Drafts and
Knowledge Candidates remain outside that authoritative publication boundary.

## Safe rehearsal

Run a deliberately invalid revision through a preview deployment. Confirm that
Vercel reports the release gate failure and that the production URL still serves
the previous successful deployment. Do not use a production deployment or
change any human Curation or Promotion record for this rehearsal.
