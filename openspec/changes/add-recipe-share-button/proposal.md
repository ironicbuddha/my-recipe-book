# Add Recipe Share Button

## Summary

Add a share affordance to recipe detail pages so readers can copy or send the
canonical recipe URL without leaving the page.

## Acceptance Criteria

- Each recipe detail page shows a visible `Share` button near the recipe title.
- Activating the button opens a share sheet styled like a common web share
  dialog: destination buttons, a URL field, and a `Copy` action.
- The shared value is the canonical recipe page URL.
- Copying the URL works with the Clipboard API and provides visible feedback.
- The dialog is keyboard accessible, dismissible, and responsive on narrow
  screens.

## Non-goals

- Do not change recipe Markdown content.
- Do not introduce a CMS or move sharing metadata into recipes.
- Do not add third-party share widgets or tracking scripts.
