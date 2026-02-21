# Dailer – Tech stack

## Core

| Technology | Version | Role |
|------------|--------|------|
| **Expo** | ~54.0.31 | React Native tooling, build, dev server |
| **React** | 19.1.0 | UI library |
| **React Native** | 0.81.5 | Mobile (iOS/Android) + react-native-web |
| **TypeScript** | ~5.9.2 | Typing, strict mode |

## Routing & navigation

| Package | Version | Role |
|---------|--------|------|
| **expo-router** | ~6.0.21 | File-based routing (`app/` directory) |
| **@react-navigation/native** | ^7.1.8 | Navigation primitives |
| **@react-navigation/bottom-tabs** | ^7.4.0 | Tab bar |
| **@react-navigation/elements** | ^2.6.3 | Navigation UI elements |

## Data & API

| Package | Version | Role |
|---------|--------|------|
| **@tanstack/react-query** | ^5.90.21 | Server state (mutations, future queries) |
| **axios** | ^1.13.5 | HTTP client; single instance in `api/axios-instance.ts` |

## Forms & validation

| Package | Version | Role |
|---------|--------|------|
| **react-hook-form** | ^7.71.1 | Form state and submission |
| **@hookform/resolvers** | ^5.2.2 | Yup resolver for RHF |
| **yup** | ^1.7.1 | Validation schemas (login, registration) |

## UI & UX

| Package | Version | Role |
|---------|--------|------|
| **expo-splash-screen** | ~31.0.13 | Splash screen |
| **expo-status-bar** | ~3.0.9 | Status bar style |
| **expo-haptics** | ~15.0.8 | Haptic feedback (e.g. tabs) |
| **expo-symbols** | ~1.0.8 | SF Symbols (icons) |
| **react-native-gesture-handler** | ~2.28.0 | Gestures |
| **react-native-reanimated** | ~4.1.1 | Animations |
| **react-native-safe-area-context** | ~5.6.0 | Safe areas |
| **react-native-screens** | ~4.16.0 | Native screen stack |

## Expo modules (selected)

| Package | Role |
|---------|------|
| **expo-constants** | App config (e.g. `extra.apiUrl`) |
| **expo-font** | Custom fonts (if used) |
| **expo-image** | Optimized images |
| **expo-linking** | Deep links (scheme: `dailer`) |
| **expo-system-ui** | UI styling (e.g. status bar) |
| **expo-web-browser** | In-app browser if needed |

## Dev & tooling

| Package | Version | Role |
|---------|--------|------|
| **eslint** | ^9.25.0 | Linting |
| **eslint-config-expo** | ~10.0.0 | Expo ESLint config |
| **@types/react** | ~19.1.0 | React type definitions |

## Config

- **app.json** – Expo app config (name, scheme, icons, plugins, `extra.apiUrl`).
- **tsconfig.json** – Extends `expo/tsconfig.base`; `paths`: `@/*` → project root; `jsx: "react-native"`.
- **New Architecture** and **React Compiler** are enabled in `app.json` experiments.
