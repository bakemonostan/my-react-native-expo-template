# Auth & navigation (Expo Router)

This template ships a **working auth flow** with two modes, controlled at build time:

| Mode | Env | Behavior |
|------|-----|----------|
| **mock** (default) | `EXPO_PUBLIC_AUTH_MODE` unset or not `api` | `services/authBackend.ts` succeeds locally; **SecureStore** still receives a placeholder access token so axios + session sync behave like production. |
| **api** | `EXPO_PUBLIC_AUTH_MODE=api` | Same module calls your REST routes with the shared axios client (`api/config.ts`). |

## Swappable boundary

**UI and routing** depend on `useAuthStore` (`user`, `hydrated`, `pendingOtpEmail`). **HTTP + tokens** live in:

- `services/authBackend.ts` — `backendSignIn`, `backendRegister`, `backendVerifyOtp`, `backendRequestPasswordReset`, `fetchSessionUser`, `backendSignOut`
- `api/api.utils.ts` — `tokenUtils` (**SecureStore** `auth_token`)
- `services/sessionSync.ts` — after persist, aligns persisted `user` with token (and restores from `GET /auth/me` in api mode)

Replace endpoint paths and JSON shapes inside `authBackend.ts` to match your server.

### Expected API shapes (api mode)

Adjust in `authBackend.ts` if your API differs.

| Action | Method | Path | Body | Response (minimal) |
|--------|--------|------|------|---------------------|
| Login | POST | `/auth/login` | `{ email, password }` | `{ access_token, user: { email, name? } }` |
| Register | POST | `/auth/register` | `{ email, password, name }` | same as login |
| Verify OTP | POST | `/auth/verify-otp` | `{ email, code }` | same as login |
| Forgot | POST | `/auth/forgot-password` | `{ email }` | any 2xx |
| Session | GET | `/auth/me` | — | `{ user: { email, name? } }` or user object at root |
| Logout | POST | `/auth/logout` | `{}` | any (errors ignored) |

## Official references

- [Authentication in Expo Router](https://docs.expo.dev/router/advanced/authentication/)
- [Protected routes](https://docs.expo.dev/router/advanced/protected/) — this repo uses **`Redirect` in `app/(app)/_layout.tsx`** when there is no session.

## What is implemented

| Piece | Location |
|-------|----------|
| Session (Zustand + persist profile) | `store/authStore.ts` — async `signIn` / `signOut` / `register` / `verifyOtp` |
| Token storage | `api/api.utils.ts` — SecureStore |
| Persist + SecureStore sync | `components/AuthPersistBridge.tsx` + `services/sessionSync.ts` |
| 401 handling | `api/config.ts` — clears token + clears Zustand user |
| Entry redirect | `app/index.tsx` |
| Auth UI | `app/(auth)/…` — uses `useI18n()` for strings |
| Guarded app shell | `app/(app)/_layout.tsx` |
| Sign out | Home tab — awaits `signOut()` |

## Optional: Google native sign-in (`utils/googleAuth.ts`)

**Not wired** to login UI or `authStore` — safe for template clones.

| Step | What to do |
|------|------------|
| IDs | Set `EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID` and `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID` in `.env`. |
| Native module | Install [@react-native-google-signin/google-signin](https://react-native-google-signin.github.io/docs/install) when you need on-device Google. |
| Session | After Google `signIn`, call **your** backend, then `useAuthStore.getState().signIn` or set token + user yourself. |

## Route URLs (groups do not appear in the path)

- `/` — gate (`app/index.tsx`)
- `/login`, `/register`, … — `app/(auth)/…`
- Tab routes — see Expo Router tab docs for default tab path.
