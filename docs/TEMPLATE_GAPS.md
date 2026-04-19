# Template gaps (planning doc)

Honest backlog for a wizard / roadmap — **not** a mandate to ship everything. Treat rows as **candidates**; pick 1–2 per iteration.

---

## Where we are

The template is a **solid UI + infra starter**: themed primitives (`ThemeContext`, `TextComponent`, `Themed`), layout (`Screen`, keyboard avoiding, scroll), feedback (alerts, toasts, loading, skeleton, progress, error/empty states), inputs (text, textarea, `FormField`, select, OTP, date/time, toggles + `RadioButtonCard`), overlays (modal, confirmation), content (list helpers, cards, chips, accordion, sliders, file upload, etc.), and **Expo Router** with **mock auth** and **tab/drawer** examples.

**Auth (generic / mock):** `(auth)` screens (login, register, forgot password, OTP verify), `store/authStore.ts` (Zustand + persist), gate at `app/index.tsx`, guard in `app/(app)/_layout.tsx`. See **`docs/AUTH_AND_NAVIGATION.md`** and [Expo Router authentication](https://docs.expo.dev/router/advanced/authentication/).

**Hooks** (`@/hooks`): debounce, keyboard, app state, media permissions, previous value, React Query invalidate + refresh-on-focus, **`useOffsetInfiniteQuery`** (offset/limit infinite list), network + `onlineManager`, toast, theme — with JSDoc and examples.

**Still “template-shaped” (not a product):** real API auth / SecureStore tokens, shared **Zod + form** recipe, i18n, push, deep-link hardening.

---

## Where next (suggested order)

1. **Forms** — One golden-path screen: Zod + your `FormField` / inputs + submit/error (add `react-hook-form` only if you want it).
2. **Real auth** — Replace mock `signIn` / `register` / `verifyOtp` in `store/authStore.ts`; persist tokens with **SecureStore**; optional **`Stack.Protected`** when your Expo Router version exposes it ([protected routes](https://docs.expo.dev/router/advanced/protected/)).
3. **Quality pass** — Theme/text consistency; keep `package-lock.json` in sync with `package.json` for `npm ci`.
4. **Defer** — Full bottom-sheet chapter, analytics, biometrics, remote flags.

---

## Already covered (no longer “gaps”)

| Area | Notes |
|------|--------|
| Storage / theme | `utils/storage.ts`; `ThemeContext` + persisted `theme_mode` |
| Feedback | `ToastComponent` + `useToast`; alerts, loading, skeleton, progress |
| Forms (UI only) | `FormField`; not yet a full form *pattern* with Zod |
| Pickers | `SelectComponent`, `DateTimePickerField` |
| OTP UI / empty / chips / accordion / sliders / divider | In `components/ui` + barrel |
| Toggles | Re-exported from `components/ui/index.ts` |
| Auth shell (mock) | `app/(auth)/*`, `store/authStore.ts`, `app/(app)/_layout.tsx`, `docs/AUTH_AND_NAVIGATION.md` |
| Infinite list hook | `useOffsetInfiniteQuery` + **Querying** tab uses DummyJSON |
| Hooks | See `hooks/index.ts` |
| Discoverability | UI barrel + Examples drawer in `app/(app)/(tabs)/components.tsx` |

---

## High priority (most real apps need these soon)

| Area | Gap |
|------|-----|
| Auth | `utils/googleAuth.ts` commented / unwired — connect or remove |
| Forms | Zod installed; no **documented** shared pattern (schema + submit + errors across fields) |

---

## Medium priority

| Area | Gap |
|------|-----|
| i18n | No localization |
| Push | `expo-notifications` not in dependencies |
| Deep linking | `scheme` baseline only; Android `intentFilters`, iOS Universal Links, project docs |
| Feature flags | No typed `config/featureFlags.ts` |
| CI / deps | Lockfile must match `package.json` for `npm ci` |

---

## Lower priority (product-specific or “later”)

| Area | Gap |
|------|-----|
| Sheets / menus | Gorhom present; no opinionated template flows |
| Product | No analytics placeholder |
| Security UX | No biometric gate |
| Ops | No app version / “update available” helper |

---

## Deep linking — current state (short)

- **Have:** `scheme` in `app.config.ts` (and env override when used).
- **Missing for “full” deep linking:** Android intent filters, iOS associated domains, project-specific link docs.

---

## Feature flags — recommendation (keep it simple)

Flip booleans per clone or build flavor; avoid remote services unless needed.

---

## How to use this file

- Pick **1–2** gaps per iteration; ship, then revisit.
- Prefer **real auth + form pattern** before rare polish.
- Shrink this doc as items ship.
