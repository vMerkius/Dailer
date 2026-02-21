# Dailer – Skills (AI / assistant instructions)

Use this file when you want the assistant to follow project patterns and avoid common mistakes. You can @-mention it in chat or rely on `.cursorrules` that reference it.

---

## Project identity

- **App name:** Dailer. Expo (React Native) app; targets iOS, Android, web (static).
- **Routing:** expo-router, file-based; main UI under `app/(tabs)/`.
- **API:** REST client in `api/`; base URL from `app.json` → `extra.apiUrl`.

---

## Do

1. **Imports**  
   Use the `@/` path alias for all project code (e.g. `@/api`, `@/components/...`, `@/hooks/...`, `@/constants/theme`).

2. **Forms**  
   - Use **react-hook-form** with **yup** via `@hookform/resolvers/yup`.  
   - Put schemas in `components/forms/schemas/` and export types with `yup.InferType`.  
   - Use **TanStack Query `useMutation`** for submit: handle loading (`isPending`), errors, and `onSuccess` (e.g. close modal). Do not add an `isLoading` prop from outside.

3. **API layer**  
   - Keep `api/` thin: axios instance, request functions, types.  
   - Add new endpoints as functions (e.g. in `auth.ts` or a new file); export from `api/index.ts`.  
   - Return `response.data` (or `response.data.response ?? response.data` if backend nests under `response`).

4. **Errors from API**  
   Use a small helper (e.g. `getErrorMessage(error)`) that reads `error.response?.data?.message` for Axios and falls back to `error.message` or a generic string. Show the result in the form (e.g. above submit button).

5. **Naming**  
   - Files: kebab-case.  
   - Components/hooks: PascalCase / useCamelCase.  
   - Barrel exports: `index.ts` in `api/`, `components/forms/`, `components/modals/`, `components/forms/schemas/`.

6. **Commits**  
   Use conventional commits: **feat:**, **fix:**, **refactor:** with a short, clear message. **No AI tracking:** do not add Co-authored-by or any AI/assistant attribution; keep commits plain.

7. **Theme / dark mode**  
   Use `useColorScheme()` and `constants/theme` (Colors, Fonts); avoid hardcoded colors where theme exists.

---

## Don’t

1. **Imports**  
   Avoid long relative paths (e.g. `../../../api`) when `@/api` is available.

2. **Forms**  
   Do not add a parent-driven `isLoading` prop for submit; use mutation state (`isPending`) inside the form.

3. **API**  
   Do not put business logic or navigation inside `api/`; no direct `router.push` or global state in API functions.

4. **Validation**  
   Keep Yup schemas in sync with backend rules (e.g. username min length, password strength). If the user provides backend validator rules, mirror them in the schema.

5. **New dependencies**  
   Prefer existing stack (Expo, React Query, RHF, yup, axios). If suggesting a new lib, say why and where it fits (e.g. “for X, use Y already in the project”).

6. **Routing**  
   Do not invent custom routing; use expo-router and the existing `app/` structure.

7. **Commits**  
   Do not add Co-authored-by, Signed-off-by (from bots), or any AI attribution to commits.

---

## File layout reminder

- **app/** – screens and layout (expo-router).  
- **api/** – axios instance, auth (or other) API, types, barrel.  
- **components/forms/** – form components + **schemas/** (yup + exported types).  
- **components/modals/** – modal components.  
- **components/ui/** – reusable UI (buttons, pickers, trackers, etc.).  
- **constants/** – e.g. theme.  
- **hooks/** – shared hooks (color scheme, theme color).  

When adding a new feature, place it in the correct folder and update barrel exports if needed.
