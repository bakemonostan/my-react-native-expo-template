# Template gaps (planning doc)

Working list of what this Expo template does **not** cover yet, or covers only partially. Goal: honest backlog for a wizard / roadmap — **not** a mandate to over-engineer.

**Already addressed (recent work):**

- AsyncStorage wrapper: `utils/storage.ts`
- Theme mode persistence: `context/ThemeContext.tsx` + key `theme_mode`

---

## High priority (most apps hit these fast)

| Area | Gap |
|------|-----|
| Feedback | No toast / snackbar system |
| Auth | No auth screens (login, register, forgot password, OTP verify) |
| Auth | No auth-oriented Zustand slice (e.g. `isLoggedIn`, `user`) |
| Auth | `utils/googleAuth.ts` is fully commented out — not wired |
| Routing | No protected-route / auth-guard pattern for Expo Router |
| Forms | Zod is installed but there is no shared form pattern (no `useForm` + schema wiring) |

---

## Medium priority

| Area | Gap |
|------|-----|
| UI | No select / dropdown / picker component |
| UI | No OTP input component |
| UI | No generic **empty state** (error/loading patterns exist elsewhere) |
| Hooks | No `useDebounce` |
| Hooks | No `usePermissions` (camera, gallery, etc.) despite image picker usage |
| Hooks | No `useKeyboard` (height / visibility) |
| i18n | No localization setup |
| Push | `expo-notifications` not in dependencies; no push flow |
| Deep linking | `scheme` is set in `app.config.ts` (e.g. `myrntemplate://`) — good baseline. Missing: Android `intentFilters`, iOS Universal Links (`associatedDomains`), and any **explicit** link-handling docs or helpers beyond Expo Router defaults |
| Feature flags | No typed feature-flag surface (even a simple `config/featureFlags.ts` object) |
| Discoverability | `components/Toggle/` (Checkbox, Radio, Switch, Toggle) exists but is **not** re-exported from `components/ui/index.ts` — easy to miss when scanning the template |

---

## Lower priority (nice-to-have / product-specific)

| Area | Gap |
|------|-----|
| UI | No chip / tag component |
| UI | No accordion / collapsible |
| UI | No date picker |
| UI | Divider lives more in examples / adjacent paths; not clearly part of the main `ui` barrel |
| Hooks | No `usePagination` helper for list + React Query |
| Product | No analytics placeholder / hook |
| Security UX | No biometric gate (`expo-local-authentication` not present) |
| Ops | No app version / “update available” helper |

---

## Deep linking — current state (short)

- **Have:** `scheme` in `app.config.ts` (and env override `EXPO_PUBLIC_SCHEME`). Expo Router can open `scheme://…` style links when configured.
- **Missing for “full” deep linking:** Android intent filters for custom paths, iOS associated domains for `https` Universal Links, and any project-specific documentation or helpers for marketing / email links.

---

## Feature flags — recommendation (keep it simple)

For a **template**, a small typed object is enough:

- Flip booleans per clone or per build flavor.
- Avoid pulling in remote flag services unless a real app needs them.

Remote flags / A/B infra belong in the product repo, not necessarily in the starter.

---

## How to use this file

- Treat rows as **candidates**, not todos.
- Pick 1–2 gaps per iteration; ship, then revisit.
- Delete or shrink this doc when items are done or moved to a real issue tracker.
