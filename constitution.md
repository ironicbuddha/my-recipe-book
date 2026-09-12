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
- Deployment target: `Vercel static hosting`

## Working Standards

- Markdown content remains the source of truth. The site reads existing files;
  it does not introduce a parallel CMS.
- TypeScript runs in strict mode.
- Public site changes must pass `pnpm lint`, `pnpm typecheck`, and
  `pnpm build`.
- Content changes must continue to pass `make validate`.
- Vercel deployments must run `pnpm release:verify`; a failed or incomplete
  gate must not replace the active production deployment.
- New non-obvious logic gets short comments or nearby documentation.
- Repo-local guidance in `AGENTS.md` takes precedence for content structure and
  recipe authoring rules.

## Delivery Gates

Pull requests should not merge unless these pass:

- `make validate`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm build`
- `pnpm release:verify` for deployable changes

## Exceptions

- Preview-rehearsal results do not constitute Curator acceptance or Promotion.

## Versioning

- Version: `0.1.0`
- Ratified: `2026-04-24`
- Last amended: `2026-04-24`
