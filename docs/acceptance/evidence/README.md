# Archived review evidence

`playwright/` holds the final evidence linked from acceptance and presentation
review documents. These files record the reviewed revisions; new browser audit
runs write to ignored `output/playwright/` and do not overwrite this archive.

The image approval manifest lives at
[`../recipe-image-approval-manifest.json`](../recipe-image-approval-manifest.json).
It preserves the original review paths and approval hashes as historical facts.
The candidate files under `output/recipe-image-review/` were removed after all 55
installed assets in `src/assets/recipes/` were verified against those hashes.
Paths in archived reports likewise describe the original audit workspace.
