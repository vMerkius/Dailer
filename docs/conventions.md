# Dailer – Conventions

## Commit messages

Use [Conventional Commits](https://www.conventionalcommits.org/):

- **feat:** new feature or new file/API.
- **fix:** bug fix or alignment with backend/contract.
- **refactor:** change without changing behaviour (e.g. useMutation, rename module).

Example: `feat: add QueryClientProvider to root layout`, `fix: align login schema with backend`.

**No AI tracking in commits:** Use plain commit messages only. Do not add `Co-authored-by`, `Signed-off-by` from bots, or any other AI/assistant attribution to commit messages or trailers.

## Imports

- Prefer **path alias** `@/` for project code:
  - `import { loginUser } from "@/api";`
  - `import { useColorScheme } from "@/hooks/use-color-scheme";`
  - `import { Colors } from "@/constants/theme";`
- Order: external packages first, then `@/` imports, then relative (e.g. `./schemas`).
- Barrel exports: use `api/index`, `components/forms`, `components/modals` where they exist.

## Naming

- **Files:** kebab-case (`login-form.tsx`, `use-color-scheme.ts`, `axios-instance.ts`).
- **Components:** PascalCase (`LoginForm`, `YearTracker`).
- **Hooks:** `use-` prefix, camelCase in code (`useColorScheme`).
- **Types/Interfaces:** PascalCase; prefix with `I` for interfaces only if the project keeps that (e.g. `IUserCredentials`).
- **Constants:** PascalCase or UPPER_SNAKE for true constants (e.g. `Colors`, `PASSWORD_REGEX`).

## API layer (`api/`)

- One **axios instance** in `axios-instance.ts` (baseURL from `expo-constants`, timeout).
- **Auth** in `auth.ts`: `loginUser`, `registerUser`; return `response.data` (or `response.data.response ?? response.data` if backend nests under `response`).
- **Types** in `types.ts`; re-export from `api/index.ts`.
- Do not put business logic in `api/`; keep it as thin HTTP + typing.

## Forms

- **react-hook-form** + **yup** via `@hookform/resolvers/yup`.
- Validation schemas in `components/forms/schemas/` (e.g. `login.schema.ts`, `registration.schema.ts`); export type from schema (`yup.InferType`).
- Use **TanStack Query `useMutation`** for submit (loading, error, onSuccess); no external `isLoading` prop.
- API errors: central `getErrorMessage(error)` (e.g. `error.response?.data?.message` for Axios); show above submit button.

## Components

- **Barrel exports:** `components/forms/index.ts`, `components/modals/index.ts`, `components/forms/schemas/index.ts`.
- **Theme:** Prefer `useColorScheme()` and `constants/theme` (Colors, Fonts) for styles; support light/dark where applicable.
- **Modals/forms:** Receive `onClose`, `onToggleForm` (or similar) as props; no internal navigation unless required.

## Styles

- **StyleSheet.create** in the same file; no global CSS.
- Themed colors from `constants/theme`; avoid hardcoded hex except for borders/errors (e.g. `#ef4444` for errors).

## TypeScript

- **Strict** mode enabled.
- Prefer explicit types for function args and API responses; infer where obvious (e.g. form data from Yup schema).
