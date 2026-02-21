# Dailer – Architecture

## Overview

Dailer is an Expo (React Native) mobile app with file-based routing, a REST API client, and shared UI components. The app targets iOS, Android, and web (static output).

## High-level architecture

```
┌─────────────────────────────────────────────────────────────┐
│  app/ (expo-router)                                         │
│  Screens & layout, Stack + Tabs                             │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│  components/                                                │
│  forms, modals, ui, themed primitives                        │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│  hooks/ · constants/                                        │
│  useColorScheme, useThemeColor, theme (Colors, Fonts)        │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│  api/                                                       │
│  axios instance, auth (login/register), types               │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
                   Backend REST API
                   (apiUrl from app.json extra)
```

## Folder structure

| Path | Purpose |
|------|--------|
| **app/** | Expo Router: file-based routes. `_layout.tsx` = root layout; `(tabs)/` = tab group. |
| **api/** | HTTP client: `axios-instance.ts`, `auth.ts` (login/register), `types.ts`, barrel `index.ts`. |
| **components/** | Reusable UI. `forms/` (login, registration + schemas), `modals/`, `ui/`, themed text/view. |
| **constants/** | App constants, e.g. `theme.ts` (Colors, Fonts). |
| **hooks/** | Shared hooks: `use-color-scheme`, `use-theme-color` (platform-specific where needed). |
| **assets/images/** | Icons, splash, favicon. |
| **scripts/** | One-off scripts (e.g. reset-project). |

## Data flow

- **Auth:** User submits login/register → form validates with Yup → `api.auth` (axios) → TanStack Query `useMutation` → on success/error UI updates (loading, errors).
- **API base URL:** From `expo-constants` via `app.json` → `extra.apiUrl` (e.g. `http://localhost:3000/api`).
- **Theme:** System color scheme via `useColorScheme` → React Navigation `ThemeProvider` (Dark/Default) and `constants/theme` (Colors, Fonts).

## Routing

- **expo-router** with `app` directory.
- Root: `app/_layout.tsx` (QueryClient, ThemeProvider, Stack).
- Main entry: `app/(tabs)/_layout.tsx` (Tabs) and `app/(tabs)/index.tsx` (Home).
- `unstable_settings.anchor: "(tabs)"` keeps tabs as the main anchor.

## Key dependencies (architecture-related)

- **expo-router** – routing and layout.
- **@tanstack/react-query** – server state (mutations for auth; future queries).
- **axios** – HTTP; single instance in `api/axios-instance.ts`.
- **react-hook-form + yup** – forms and validation; schemas live next to forms under `components/forms/schemas/`.
