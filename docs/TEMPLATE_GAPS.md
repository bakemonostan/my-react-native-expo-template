# Template gaps

**What is done in-tree:** backend-shaped auth (`services/authBackend.ts` + SecureStore tokens), session sync (`services/sessionSync.ts`), i18n (`context/I18nContext.tsx`, `i18n/locales/`), push permission + native token logging (`services/pushNotifications.ts`, opt-in via `EXPO_PUBLIC_PUSH_SETUP`), Android app-link `intentFilters` + optional iOS `associatedDomains` in `app.config.ts`, and `config/featureFlags.ts`. See `.env.example` and `docs/AUTH_AND_NAVIGATION.md`.

**Intentionally not included:** EAS / cloud builds (local Xcode + Gradle only). Auth shell swap boundary and optional Google IDs remain documented in `docs/AUTH_AND_NAVIGATION.md` and `utils/googleAuth.ts`.

### Deferred (lower priority)

| Area | Note |
|------|------|
| Sheets / menus | Gorhom is present; no extra recipe screens |
| Product | No analytics placeholder |
| Security UX | No biometric re-auth gate |
| Ops | No “update available” / version helper |

Pick one deferred row when you need it.
