# Dailer – Cursor setup & usage

## Purpose of this file

This document describes how to use Cursor effectively with the Dailer repo: what to reference, where conventions live, and how to get consistent results.

## Project context to attach when needed

For non-trivial changes, attach or mention:

- **Architecture & structure:** `docs/architecture.md`
- **Stack & versions:** `docs/stack.md`
- **Conventions (commits, imports, forms, API):** `docs/conventions.md`
- **AI-oriented rules:** `docs/skills.md`

You can reference with `@docs/architecture.md` (or other paths) so the assistant uses the right context.

## Path alias

All project imports use **`@/`** (e.g. `@/api`, `@/components/...`, `@/hooks/...`). When suggesting new imports, use `@/` instead of long relative paths.

## Key files to touch by task

| Task | Files / areas |
|------|----------------|
| New API endpoint | `api/axios-instance.ts` (if config change), new fn in `api/` or new file, `api/types.ts`, `api/index.ts` |
| New form (e.g. auth-like) | `components/forms/` + `components/forms/schemas/`, `api/auth.ts` or new API module |
| New screen | `app/` (expo-router), possibly new tab in `app/(tabs)/_layout.tsx` |
| New reusable UI | `components/ui/` or `components/modals/`, barrel in `index.ts` |
| Theme / global styles | `constants/theme.ts`, `hooks/use-theme-color.ts`, `hooks/use-color-scheme*.ts` |
| Validation rules | `components/forms/schemas/*.schema.ts`; keep in sync with backend |

## Commits

Use conventional prefixes: **feat:**, **fix:**, **refactor:**. Prefer one logical change per commit; see `docs/conventions.md`. **No AI tracking:** do not add Co-authored-by or any AI/assistant attribution; keep commit messages plain.

## Running the app

- `npx expo start` (then choose device/tunnel).
- API base URL: `app.json` → `expo.extra.apiUrl` (default `http://localhost:3000/api`). Change there or via env if needed.

## Cursor rules (optional)

To bake project rules into Cursor, you can add a **`.cursorrules`** (or rule in Cursor settings) that points to:

- Use `@/` for imports.
- Follow `docs/conventions.md` for commits, naming, forms, API (plain commits only; no Co-authored-by / AI attribution).
- Prefer TanStack Query for server state; react-hook-form + yup for forms.
- Keep API layer thin; validation schemas aligned with backend.

Then `docs/skills.md` can be the single “AI instructions” doc you @-mention when you want the model to follow project patterns strictly.
