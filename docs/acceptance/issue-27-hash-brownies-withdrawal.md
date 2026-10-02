# Hash Brownies legacy URL withdrawal

Issue: [#27](https://github.com/ironicbuddha/my-recipe-book/issues/27)

## Curator decision and authorized scope

On 2026-10-02, Carlo approved this exact recommendation in the delivery
conversation by replying “ok”:

> Return 410 Gone for `/recipes/2026-02-27-hash-brownies/`, while preserving
> the approved draft variation without publishing it or inventing a former
> canonical version. Implement the withdrawal and verify the preview.

This records the human decision faithfully. It authorizes implementation and
preview verification. Final foundation acceptance and production release
approval remain separate decisions.

Batch 1's earlier decision remains authoritative: Hash Brownies is a draft
variation of Masterclass Chocolate Brownie, with no public Recipe route and
no new canonical identity. Preserve `recipes/drafts/hash-brownies@1.md` and
its exact approved `move-to-draft` mapping in `records/migrations/batch-1.md`.
Do not create a fictional Superseded Recipe Version or change culinary content.

## Implementation and preservation rule

The publisher registry withdraws only the dated legacy path. Vercel serves the
existing explanatory withdrawal page with HTTP 410 and no redirect.
`/recipes/hash-brownies/` and the draft's source path remain unpublished.

Withdrawal preservation continues to require either a Superseded Recipe Version
or the exact preserved Draft version named by a Curator-approved `move-to-draft`
inventory row. An incidental draft, missing draft, or mismatched mapped version
cannot satisfy that rule. A current Canonical Recipe still cannot be withdrawn.

The branch starts from merged PR #47 at
`8ad9d41c05860d3a59b241c3ef99a31f3954396f`. The currently retained production
artifact is `dpl_2tDnwBEXqF5RGLaRbBaUkSuMoh8n`, at
`https://my-recipe-book-9k23m3qdt-carlo-krugers-projects.vercel.app`.
The previous plan's main merge has occurred; any later merge is the reviewed
withdrawal remediation release, not a replay of that cutover.

## Verification

The focused regression failed before the validator change and passes after it.
It exercises the public validation command for the exact approved draft,
missing draft, mismatched version, and removed inventory approval. Existing
canonical-withdrawal, unapproved-draft, route collision, and redirect checks
remain in force.

The local full release gate passed: 70 tests with coverage, content validation,
lint, type checking, and a fresh 334-page Astro build. Sequential standards and
scope review against `8ad9d41` found no outstanding findings. Every existing
culinary and source-evidence file is byte-identical to that baseline.

Deployed-preview results will be recorded on #27 after verification. This record does not claim final foundation acceptance or a
production 410 outcome.

## Remote gate reliability repair

The first preview gate passed the withdrawal tests but exceeded five seconds
in the existing public-helper projection test. That test loaded the corpus
eight times; it now uses one expected-library snapshot and one rendered body,
reducing the load count to four without dropping assertions.

The first GitHub gate repeated the soup release's 15-second timeout in the
first successful integration build (missing hero asset). That cold build now
has a 30-second limit; its exit-status, readable-heading, and absent-hero checks
are unchanged. The four-command withdrawal regression has a 15-second limit.
These repairs do not bypass or skip any release checks.
