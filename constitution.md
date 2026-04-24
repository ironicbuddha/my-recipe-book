# my-recipe-book Constitution

This repo is a Markdown-first culinary knowledge system with an Astro frontend.
The canonical content lives in the repository root folders such as `recipes/`,
`techniques/`, `principles/`, `ingredients/`, and `experiments/`.

## Project Profile

- Project type: `web-app`
- Primary language: `TypeScript`
- Frontend stack: `Astro`
- Build tool: `Vite`
- Package manager: `pnpm`
- Runtime versions: `Node 22.x`
- Deployment target: `static host (TBD)`

## Working Standards

- Markdown content remains the source of truth. The site reads existing files;
  it does not introduce a parallel CMS.
- TypeScript runs in strict mode.
- Public site changes must pass `pnpm lint`, `pnpm typecheck`, and
  `pnpm build`.
- Content changes must continue to pass `make validate`.
- New non-obvious logic gets short comments or nearby documentation.
- Repo-local guidance in `AGENTS.md` takes precedence for content structure and
  recipe authoring rules.

## Delivery Gates

Pull requests should not merge unless these pass:

- `make validate`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm build`

## Exceptions

- Deployment hosting is not chosen yet. When a host is selected, document the
  build and release path here and in `README.md`.

## Versioning

- Version: `0.1.0`
- Ratified: `2026-04-24`
- Last amended: `2026-04-24`
