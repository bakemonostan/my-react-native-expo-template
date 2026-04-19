# Template gaps

**Only what is still open.** Pick 1–2 per iteration. Auth swap boundary: `docs/AUTH_AND_NAVIGATION.md`. **Zod + `FormField` example:** Components drawer → **Form + Zod** (`components/Examples/ZodFormExample.tsx`). **Optional Google IDs:** `utils/googleAuth.ts` + same doc.

### Suggested order

1. **Backend auth (per clone)** — Replace `signIn` / `register` / `verifyOtp` in `store/authStore.ts` with your API; **SecureStore** for tokens; optional [protected routes](https://docs.expo.dev/router/advanced/authentication/) when your Router setup supports them.
2. **Quality / hygiene** — Theme/text pass; keep `package-lock.json` aligned with `package.json` for `npm ci`.

### Medium priority

| Area | Gap |
|------|-----|
| i18n | No localization |
| Push | `expo-notifications` not in dependencies |
| Deep linking | `scheme` only; add Android `intentFilters`, iOS Universal Links, link docs when needed |
| Feature flags | No `config/featureFlags.ts` (booleans per flavor are fine for many apps) |
| EAS / cloud builds | Not in CI; [EAS Build in GitHub Actions](https://docs.expo.dev/build-reference/github-actions/) after `eas init` if wanted |

### Lower priority (defer)

| Area | Gap |
|------|-----|
| Sheets / menus | Gorhom present; no template recipe screens |
| Product | No analytics placeholder |
| Security UX | No biometric re-auth gate |
| Ops | No “update available” / version helper |
