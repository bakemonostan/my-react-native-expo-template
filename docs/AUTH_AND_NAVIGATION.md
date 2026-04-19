# Auth & navigation (Expo Router)

This template ships a **generic, mock-only** auth flow so clones have a place to plug real APIs.

## Official references

- [Authentication in Expo Router](https://docs.expo.dev/router/advanced/authentication/) — session, splash, and stack structure.
- [Protected routes](https://docs.expo.dev/router/advanced/protected/) — `Stack.Protected` / guards (when your SDK exposes them). This repo uses a **compatible** pattern: **`Redirect` in `app/(app)/_layout.tsx`** when there is no session (client-side only; not a substitute for server auth).

## What is implemented

| Piece | Location |
|-------|-----------|
| Session (Zustand + persist) | `store/authStore.ts` — `user`, `signIn` / `signOut` / `register`, OTP stub fields |
| Persist hydration flag | `components/AuthPersistBridge.tsx` + root `app/_layout.tsx` |
| Entry redirect | `app/index.tsx` — `/` → `(app)/(tabs)` or `(auth)/login` |
| Auth UI | `app/(auth)/login.tsx`, `register.tsx`, `forgot-password.tsx`, `verify-otp.tsx` — stack `headerShown: false`; custom `components/auth/AuthHeader.tsx` in `Screen`’s `header` slot |
| Guarded app shell | `app/(app)/_layout.tsx` — requires `user`; otherwise `Redirect` to login |
| Main app | `app/(app)/(tabs)/…` (tabs moved under `(app)`) |
| Sign out | Home tab (`app/(app)/(tabs)/index.tsx`) |

## What you should replace

1. **`signIn` / `register` / `verifyOtp`** — call your backend; store **access tokens** with [`expo-secure-store`](https://docs.expo.dev/versions/latest/sdk/securestore/), not only AsyncStorage.
2. **Token hydration** — if you use JWT, rehydrate user from `/me` (or similar) on app start.
3. **`Stack.Protected`** — when your Expo Router build includes it, you can mirror the [protected routes](https://docs.expo.dev/router/advanced/protected/) doc and simplify redirects.

## Route URLs (groups do not appear in the path)

- `/` — gate (`app/index.tsx`)
- `/login`, `/register`, … — `app/(auth)/…`
- Tab routes — e.g. `/` after redirect goes to the tab navigator’s default tab (see Expo Router tab docs).
