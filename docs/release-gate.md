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

## Prior revision for Promotion and evidence

Every repository library load, including Astro configuration, checks lifecycle
history against a temporary Git snapshot. Working changes compare with `HEAD`;
a clean commit compares with its parent. A merge compares with its second
parent, the reviewed branch. Only Markdown, preserved migration source evidence,
and publisher metadata are included; presentation assets are not needed.

An isolated library does not inherit the repository's automatic history. Supply
`CULINARY_LIBRARY_PREVIOUS_ROOT` explicitly when checking its Promotion or
Completed Experiment immutability. This variable also overrides automatic
history for repository loads. A missing required prior revision remains a hard
failure. Preserve a draft revision before promoting so the comparison can prove
the exact version was a Recipe Draft and its predecessor was preserved.

## Safe rehearsal

Run a deliberately invalid revision through a preview deployment. Confirm that
Vercel reports the release gate failure and that the production URL still serves
the previous successful deployment. Do not use a production deployment or
change any human Curation or Promotion record for this rehearsal.
