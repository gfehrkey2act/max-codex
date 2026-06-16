# Repository Guidelines

## Project Structure & Module Organization

This is a Bun-managed Next.js App Router project for the TinyNotes scaffold. Route files live in `app/`, with route groups separating authenticated-style pages in `app/(app)/` from public pages in `app/(public)/`. Reusable UI components live in `src/components/`. Global styles are in `app/globals.css`, static assets belong in `public/`, and project configuration is kept at the root (`next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `postcss.config.mjs`). Product notes and requirements are in `SPEC.MD`.

## Build, Test, and Development Commands

Use Bun for local workflows:

- `bun run dev`: starts the Next.js development server.
- `bun run build`: creates a production build and runs Next.js compile checks.
- `bun run start`: serves the production build after `bun run build`.
- `bun run lint`: runs `oxlint`.
- `bun run format`: formats code with `oxfmt`.

Install dependencies with `bun install` and keep `bun.lock` committed when dependency versions change.

## Coding Style & Naming Conventions

Write TypeScript and React function components. Keep strict TypeScript compatibility; avoid `any` unless the boundary is genuinely untyped. Use two-space indentation, double quotes, and existing Tailwind utility patterns. Component files use kebab-case names such as `page-shell.tsx`, while exported components use PascalCase, such as `PageShell`. Prefer the `@/*` path alias when it makes imports clearer.

## Testing Guidelines

No automated test framework is configured yet. For now, use `bun run lint` and `bun run build` as the minimum verification before opening a PR. When adding tests, colocate them near the feature or place them under a clearly named test directory, and use descriptive names such as `notes-list.test.tsx`. Add test scripts to `package.json` as part of the same change that introduces the framework.

## Commit & Pull Request Guidelines

The current history uses short step-style commits (`Step 31`, `Step 29`) plus `Initial Commit`. Continue with concise imperative subjects, and prefer a more descriptive form when the change is not part of a numbered sequence, for example `Add note detail loading state`.

Pull requests should include a short summary, verification commands run, and any linked issue or spec reference. Include screenshots or screen recordings for visible UI changes, especially updates under `app/(public)/` or `app/(app)/`.

## Security & Configuration Tips

Do not commit local secrets, environment files, or generated build output such as `.next/`. Keep user-facing configuration explicit in code or documented in the PR. If new environment variables are required, document their names, purpose, and safe example values.
