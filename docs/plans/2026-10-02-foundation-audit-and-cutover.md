# Final foundation audit and cutover plan

Issue: [#27](https://github.com/ironicbuddha/my-recipe-book/issues/27)

Prepared on 2026-10-02. This is preparation for a production decision;
it does not record final Curator acceptance or authorize deployment.

## Goal and operating boundary

Publish the complete validated culinary foundation on the existing Astro/Vercel
project and `recipes.carlokruger.com`, with exact eligible content, enduring
identity routes, verified legacy URL outcomes, and a recoverable prior artifact.
Keep canonical Markdown authoritative. Preserve queued candidates, reconstructed
sources, the Hash Brownies draft, and immutable Recipe and Experiment history.
Do not close or modify parent #10 or the Wayfinder map #1.

## Verified baseline

The live domain already serves the migrated library; the final release is not
a first replacement of an untouched legacy site. `vercel inspect` resolved
the domain to this retained successful production artifact on 2026-10-02:

| Field | Baseline |
| --- | --- |
| Project | `my-recipe-book`, `prj_Xa131HBUXGbAt5U3oKVVFviuaOB6` |
| Team | `carlo-krugers-projects`, `team_n6ndCLrwIh5VMUVU2fIgh1Ug` |
| Production branch | `main` (observed Git deployment provenance) |
| Production commit | `817c792d49b2d4a835232f1dfe678d85f7a3fbea` |
| Retained deployment | `dpl_9hJeR42NKeTZFb3WsM8t36EMU7hz` |
| Retained URL | `https://my-recipe-book-d55dhalum-carlo-krugers-projects.vercel.app` |
| Final-release work | PR #47, `issue-26-soup-promotion`; not merged |

Refresh these identities immediately before authorization. Do not delete the
retained deployment. The current production baseline precedes soup v3 and the
first Completed Experiment.

## Foundation reconciliation

| Scope | Durable authority and current evidence |
| --- | --- |
| Pilot | `records/migrations/first-pilot.md`; #12 and #13 closed |
| Batch 1 | `records/migrations/batch-1.md`; #21 closed, explicit Curator mappings and Knowledge decisions in its comments |
| Batch 2 | `records/migrations/batch-2.md`; #22 closed with Curator decisions and six deployed route checks |
| Batch 3 | `records/migrations/batch-3.md`; #23 closed, exact snapshots and conversion evidence retained |
| Batch 4 | `records/migrations/batch-4.md`; #24 closed, review in `docs/migrations/2026-09-29-batch-4-conversion-review.md` |
| Batch 5 | `records/migrations/batch-5.md`; #25 closed, PR #46 merged and production readback recorded in its closeout comment |
| Normal Promotion | `records/promotions/asian-ginger-chicken-noodle-soup@3.md` and `docs/acceptance/issue-26-normal-promotion.md`; Carlo's culinary acceptance is distinct from agent delivery acceptance |
| Release gate | #19 closed; `docs/release-gate.md`, `scripts/release-gate.sh`, and `vercel.ts` |

The six migration inventories contain 31 approved exact source/version rows:
30 retain-canonical and one move-to-draft. The current library has 30 Canonical
Recipes, 295 curated Knowledge Notes, and one Completed Experiment. Soup v3
uses normal Promotion; its grandfathered v2 remains Superseded history.
The repository retains 396 Candidate files, 409 Curation files, 18 legacy
source snapshots, one Recipe Draft, and one Superseded Recipe Version. File
counts are preservation evidence, not a claim that every queued candidate is
accepted. Compare exact identity/path sets and hashes at the final gate.

Some migration review documents still describe remote verification as pending.
Their tracker closeouts contain later evidence. Reconcile those statements in
the final audit without replacing the original Curator decisions.

## Outstanding release blockers

1. The old Hash Brownies URL `/recipes/2026-02-27-hash-brownies/` currently
   returns HTTP 404 on production. The migration packet proposes HTTP 410,
   but `publisher/recipe-routes.json` contains only 30 redirects and no
   withdrawal. Batch 1 approval confirms a draft variation and no public route;
   it does not explicitly confirm HTTP 410. Obtain or locate exact withdrawal
   authority before implementing it. Keep the preserved draft intact.
   `validatePublisherRoutes` currently requires a Superseded Recipe Version
   for withdrawals; resolve that preservation requirement with the approved
   move-to-draft disposition, without inventing a former Canonical state.
2. Run the final all-URL HTTP audit on a successful immutable deployment,
   including this withdrawal after correction. A local meta-refresh, an
   authenticated login response, or a failed-deployment page does not qualify.
3. Obtain final Curator acceptance of the complete foundation and explicit
   production authorization for the exact final commit and release operation.

## Audit completed during preparation

On 2026-10-02, successful preview `dpl_2N5U2H5dJdgpuoZJD8nGVosrv6tg`
at `ba356786f4278593967c1a3f1ba85f8425c82bcf` passed authenticated HTTP
readback for all 326 eligible pages, expected titles, and all Recipe phase
targets. All 30 old redirects returned direct HTTP 301 to exact identity routes
returning 200. Six unpublished-route probes returned 404. The Recipe index
includes soup and excludes Hash Brownies. The old Hash Brownies URL returns 404
in both preview and production; it remains the explicit unresolved outcome.

The [result matrix](../acceptance/issue-27-preview-http-audit.json) records every
tested path and status against the immutable preview. Desktop/mobile soup and
Experiment evidence is linked in
[normal Promotion acceptance](../acceptance/issue-26-normal-promotion.md).
GitHub validation and Vercel's complete release gate passed; the local full
gate passed with 69 tests and a fresh 334-page build. Hash comparison of all
418 Candidate, source-snapshot, Draft, Superseded, and Experiment files found
no differences from this reviewed commit during documentation preparation.

These are current preparation results, not final foundation acceptance. Repeat
the required audit after route remediation and tie it to the accepted final
head. HTTP 404 for the withdrawal cannot satisfy the proposed HTTP 410 outcome.

PR #47's first remote attempt also exposed an obsolete grandfathering check
on merge/later revisions and a test that repeatedly loaded the whole corpus.
Commit `ba35678` corrects the exact-version check and validates every phase
from a shared library snapshot. Regression checks exercise a later commit,
a merge checkout, immutable completed evidence, missing ancestry, and rejection
of a new exemption. Require green final-head GitHub and Vercel gates.

## Audit procedure and acceptance evidence

Perform these steps on the final reviewed feature-branch tree before changing
`main`. Route remediation belongs to #27 and needs its own review; this plan
does not implement it.

1. Reconcile every approved migration row against the exact source, identity,
   integer version, disposition, Curator record, and old URL. Establish that
   the 31-row inventory covers every original Recipe, not just current files.
   Record every exclusion or discrepancy. Verify every required Knowledge
   subject has human Curation and a valid authoritative Note.
2. Run `pnpm release:verify` sequentially. It includes `make validate`, lint,
   typecheck, full tests with coverage, and a fresh build. Capture commit SHA,
   command exit/results, counts, generated paths, and output integrity.
   Do not run competing builds/tests against shared `dist/`.
3. Derive the exact public set from `loadLibrary().entries` and compare it
   with built paths, sitemap, category counts, navigation, and deployed pages.
   Check 30 Recipe routes, 295 Knowledge routes, one Experiment route, and
   indexes; verify all phase anchors. Exclude Candidate and raw-record paths,
   `recipes/drafts/`, `recipes/superseded/`, and version archive routes.
4. Capture no-follow HTTP status and `Location` for all 30 approved old
   redirects. Each must return a permanent HTTP 301 directly to its identity
   route; the destination must return HTTP 200 with no intermediate redirect.
   Check the withdrawal separately for actual HTTP 410 and explanatory content.
   Include any retired-identity redirects derived by `retirementRedirects()`.
5. Inspect representative desktop/mobile pages: soup v3 and its Experiment,
   pilot, each batch, Knowledge links, long tables, phase navigation, and
   indexes. Record content corrections and limitations accurately. Retain
   screenshots and an HTTP result matrix tied to an immutable preview URL.
6. Verify preservation by hashes of all Candidate files, source snapshots,
   the Recipe Draft, Superseded versions, and frozen Experiment evidence.
   Compare against the pre-remediation baseline, with only approved additions.
7. Record agent technical acceptance and request Carlo's final foundation
   acceptance. Neither replaces the existing culinary Promotion Record.

## Cutover procedure — execute only after authorization

Continue preparation on feature branches. Because a main merge triggers a
production build, do not merge PR #47 merely to start #27. Complete the final
route remediation and audit in preview, then settle the final PR scope before
requesting the release decision. The release may use PR #47 with its final
scope updated; do not create artificial PR slices just for this procedure.

The authorization packet must name the final PR/head SHA, accepted immutable
preview deployment, current main SHA, domain/project, all-URL matrix, retained
rollback artifact, and the intended single main merge. Ask explicitly for
production cutover and rollback authority if post-release verification fails.
Any head change invalidates that packet and requires fresh verification.

After explicit authorization:

1. Refresh PR head, main, checks, domain aliases, retained deployment, and
   access. Require the same accepted head and zero audit blockers.
2. Merge the final reviewed PR to `main` with a merge commit, for example
   `gh pr merge 47 --merge --match-head-commit <accepted-head-sha>` if #47 is
   still the release PR. Preserve the intermediate Draft commit: squash/rebase
   landing is not covered by the lifecycle proof. Do not additionally promote
   the preview or run `vercel deploy --prod`; the Git integration is the single
   release path.
3. Observe the resulting production deployment. Require Ready status, the
   expected merge SHA, and successful `pnpm release:verify`. Confirm
   `recipes.carlokruger.com` resolves to that exact deployment.
4. Repeat the complete legacy URL matrix and eligible-page checks against the
   public domain without protection bypass. Verify soup v3, the Completed
   Experiment and exact subject, category counts, Knowledge links, phase
   navigation, draft exclusion, and the withdrawal explanation.
5. Record production deployment ID, commit, timestamp, results, and remaining
   deferred work in #27. Close #27 only after all its criteria are satisfied;
   leave #10 and #1 unchanged.

## Recovery procedure

A failed build must leave the previous production alias untouched. Verify that
readback explicitly rather than inferring retention from a failed check.
If a Ready release fails the authorized post-cutover checks, stop further
release actions and, under the requested rollback authority, restore the
refreshed retained successful artifact:

```sh
vercel rollback https://my-recipe-book-d55dhalum-carlo-krugers-projects.vercel.app --yes --scope carlo-krugers-projects
vercel inspect recipes.carlokruger.com
```

Confirm the alias points to the retained deployment and repeat the baseline
HTTP/content smoke checks. Rollback restores the earlier library, which has
soup v2 and no Completed Experiment; it is recovery, not foundation acceptance.
Keep #27 open, record the discrepancy, and repair on a feature branch. Do not
reset Git history or discard the rejected artifact. A retry needs a fresh
acceptance/authorization packet; do not immediately re-promote the failed build.

Command syntax was checked with the installed CLI and
[Vercel rollback documentation](https://vercel.com/docs/cli/rollback).
No rollback was executed or claimed as rehearsed in this preparation.

## Definition of done and deferred work

#27 is complete only when every approved disposition and Curation decision is
reconciled, all mandatory gates and exact preview URL outcomes pass, Carlo
accepts the final foundation and authorizes its deployment, one cutover is
verified on the public domain, and recovery evidence is retained.

Queued Candidates and reconstructed sources remain for later culinary work.
Hash Brownies remains an unpublished draft variation unless later human
Curation and lifecycle decisions change it. Wing mass, cooking date, collagen,
and clarity limitations remain in the real soup Experiment and Promotion Record.
No new experiment, Curation, or deployment authority is inferred from this plan.
