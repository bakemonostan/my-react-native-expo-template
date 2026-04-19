# Template gaps

**Only what is still open.** Pick 1–2 per iteration. Mock auth + UI baseline are in the repo; see `docs/AUTH_AND_NAVIGATION.md` for the auth swap boundary.

### Suggested order

1. **Forms** — One golden-path screen: Zod + `FormField` / inputs + submit + field errors (`react-hook-form` optional). `zod` is installed but not wired to a shared pattern.
2. **Backend auth (per clone)** — Replace `signIn` / `register` / `verifyOtp` in `store/authStore.ts` with your API; **SecureStore** for tokens; optional [protected routes](https://docs.expo.dev/router/advanced/authentication/) when your Router setup supports them.
3. **Quality / hygiene** — Theme/text pass; keep `package-lock.json` aligned with `package.json` for `npm ci`.

### High priority

| Area | Gap |
|------|-----|
| OAuth stub | `utils/googleAuth.ts` — wire a flow or delete |
| Forms | Document + ship one **Zod + submit + errors** example |

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
