# My React Native Expo Template

A production-minded Expo + React Native starter. The goal is to skip the boring setup and start building features — with a proper architecture already in place.

> **Status:** Active development. See [`docs/TEMPLATE_GAPS.md`](docs/TEMPLATE_GAPS.md) for intentionally deferred items only. Web setup wizard (separate Next.js repo) ↔ this app: [`docs/WIZARD_AND_TEMPLATE.md`](docs/WIZARD_AND_TEMPLATE.md).

---

## Quick start

```bash
git clone <repo-url>
cd my-react-native-expo-template
npm install
cp .env.example .env   # fill in your values
npm start
```

---

## First-time iOS build — read this before `npm run ios`

**This matters.** This template uses **custom native code** (not Expo Go). Your first local iOS build depends on **Xcode**, **CocoaPods**, and a **real simulator that exists on your Mac**. Skipping the steps below is the #1 cause of `xcodebuild` error 70, “destination not found,” or mystery UDIDs from another machine.

### Do this on your first iOS run (and after any weird iOS build errors)

1. **Prefer `git clone`** over downloading a random zip. If you use a zip, delete any bundled **`.expo`** folder after unpacking (it is gitignored for a reason — stale paths break the next person).

2. **Install Xcode’s iOS simulator runtimes** (Xcode → **Settings** → **Platforms** / **Components**). If Xcode says an **iOS platform version** is missing, install it — otherwise builds can fail with no useful app output.

3. **Pick a simulator that actually exists**, then pass it by **name** so Expo does not reuse a dead device ID from cache:

   ```bash
   xcrun simctl list devices available
   npx expo run:ios --simulator "iPhone 16"
   ```

   Use a device **name from your own** `simctl` list (yours may say iPhone 15, 16, 17, etc.).

4. If you still see **“Unable to find a destination”** with a random UUID: delete the project’s **`.expo`** folder, run again with `--simulator "…"` as above. Optionally clear **`~/.expo`** if something global is stuck.

5. **Pods** (if `ios/` already exists): from the repo root, `cd ios && pod install && cd ..` before building.

After the first successful run, `npm run ios` is usually enough — the explicit `--simulator` step is mainly to **force a valid destination** the first time (or after Xcode/simulator changes).

---

## Scripts

```bash
# Dev
npm start                         # Expo dev server
npm run start:staging             # APP_ENV=staging
npm run start:prod                # NODE_ENV=production

# iOS (see "First-time iOS build" above — use --simulator on first run)
npm run ios                       # iOS simulator
npm run ios:staging               # iOS (staging env)

# Android
npm run android                   # Android (debug)
npm run android:debug             # Explicit debug build
npm run android:release           # Release build
npm run android:release:device    # Release on physical device
npm run android:staging           # Staging (debug)
npm run android:staging:release   # Staging (release)

# Code quality
npm run lint                      # Expo ESLint

# Versioning
npm run bump-version              # Bump version in package.json, iOS, Android

# Theming
npm run theme-mode light          # Force light mode
npm run theme-mode dark           # Force dark mode
npm run theme-mode auto           # Follow system (default)
```

---

## What's in the box

### Architecture

| Layer | What's here |
|-------|-------------|
| **Routing** | Expo Router — tabs + drawer + stack + typed routes |
| **State** | Zustand (typed slices, store utils) |
| **Data fetching** | TanStack React Query — offline-first, exponential retry, AppState sync |
| **API client** | Axios — auto auth header injection, 401 token clear, typed errors |
| **Theme** | Full design token system (colors, typography, spacing, shadows, touch targets, icon sizes) with light/dark/auto + persistence |
| **Error handling** | Error Boundary wrapping the whole app |
| **Storage** | SecureStore for tokens, AsyncStorage wrapper (`utils/storage.ts`) for preferences |
| **Environment** | `.env` + `app.config.ts` — staging/prod split, gitignored secrets |
| **CI** | GitHub Actions — lint on every push/PR |

### UI Components (`components/ui/`)

| Component | Description |
|-----------|-------------|
| `AlertComponent` | Info / success / warning / error variants |
| `AvatarComponent` | Image avatar with fallback |
| `BadgeComponent` | Status badges and notification counts |
| `CardComponent` | Flexible card with elevation options |
| `DividerComponent` | Visual separator |
| `ErrorState` | Full-screen error display |
| `FileUploadComponent` | File picker with validation |
| `GoBack` | Back navigation button |
| `GradientView` | Linear gradient wrapper |
| `Header` | Screen header with back/action slots |
| `IconComponent` | Multi-library icon support (Ionicons, FontAwesome, etc.) |
| `ImageComponent` | Expo Image with loading and error states |
| `ListComponents` | FlatList and SectionList wrappers |
| `LoadingComponent` | Spinner / loading indicator |
| `ModalComponent` | Animated modal dialog |
| `PressableComponent` | Touchable with haptics and variants |
| `RadioButtonCard` | Selectable card with radio state |
| `SafeAreaViewComponent` | Safe area wrapper |
| `Screen` | Base screen wrapper (safe area + scroll) |
| `ScrollViewComponent` | Enhanced scroll view |
| `SimpleKeyboardAvoidingView` | Keyboard avoidance |
| `SkeletonComponent` | Loading skeleton |
| `StateHandler` | Unified loading/error/empty/success switcher |
| `TextComponent` | Typography with responsive scaling |
| `TextAreaComponent` | Multi-line text input |
| `TextInputComponent` | Text input with label, error, icons |

### Toggle / Selection Components (`components/Toggle/`)

| Component | Description |
|-----------|-------------|
| `Checkbox` | Checked / unchecked with custom styling |
| `Radio` | Single-select radio button |
| `Switch` | On/off toggle |
| `Toggle` | Generic toggle primitive |

> These are **not** re-exported from `components/ui/index.ts` yet — tracked in [`docs/TEMPLATE_GAPS.md`](docs/TEMPLATE_GAPS.md).

### Bottom Sheet Components

- `GorhomSheetWrapper` — standard bottom sheet
- `GorhomSheetModalWrapper` — modal-style bottom sheet
- `ScrollableBottomSheetWithFooter` — scrollable content + sticky footer

### Hooks (`hooks/`)

| Hook | Description |
|------|-------------|
| `useTheme` | Access active color tokens + isDark + setMode |
| `useColorScheme` | System color scheme (web-compatible) |
| `useNetwork` | Network connectivity state |
| `useInvalidateQuery` | React Query cache invalidation helper |
| `useFocusEffect` | Screen focus lifecycle |

### Utilities (`utils/`)

| Utility | Description |
|---------|-------------|
| `storage` | AsyncStorage wrapper — `get`, `set`, `getObject`, `setObject`, `remove` |
| `scaling` | `scale`, `vScale`, `mScale`, `toDp` — responsive dimension helpers |
| `formDataHelpers` | `createFormData`, `appendImagesToFormData`, `appendSingleImageToFormData` |
| `useSafeAreaInsetsStyle` | Safe area insets as style object |

### API layer (`api/`)

```
api/
├── config.ts           # Axios instance (interceptors, timeout, base URL)
├── fetchClient.ts      # fetch + bearer + 401 clear (when EXPO_PUBLIC_HTTP_CLIENT=fetch)
├── api.constants.ts    # BASE_URL (env-driven), TOKEN_KEY
├── api.types.ts        # ApiError and shared response types
└── api.utils.ts        # tokenUtils (get/set/clear), isAuthenticated, getErrorMessage
```

### Theme system (`theme/`)

```
theme/
├── index.ts                    # Single Theme export — use this everywhere
├── typography.ts               # Font families + responsive font sizes + line heights
├── spacing.ts                  # Spacing scale
├── borders-shadows-animations.ts # BorderRadius, Shadows, AnimationValues, ScaleUtils
├── component-dimensions.ts     # Standard component sizes (buttons, inputs, etc.)
├── layout-dimensions.ts        # Screen-level layout values
├── icon-sizes.ts               # Icon size scale
├── touch-targets.ts            # Accessibility min touch sizes
└── presets.ts                  # Preset style combinations
```

**Usage:**

```tsx
import { Theme } from "@/theme";
import { useTheme } from "@/hooks/useTheme";

// Static token (non-theme-aware)
const gap = Theme.Spacing.md;

// Theme-aware (follows light/dark)
const { colors, isDark } = useTheme();
<View style={{ backgroundColor: colors.surface }} />
```

---

## Environment setup

Copy `.env.example` to `.env` and fill in your values:

```bash
APP_ENV=development
EXPO_PUBLIC_API_BASE_URL=https://api.example.com
EXPO_PUBLIC_API_BASE_URL_STAGING=https://staging-api.example.com
IOS_BUNDLE_ID=com.company.app
ANDROID_PACKAGE=com.company.app

# Auth: mock (default) or api — see docs/AUTH_AND_NAVIGATION.md
EXPO_PUBLIC_AUTH_MODE=mock

# State + HTTP mode (RN Init wizard syncs these; see config/featureFlags.ts → runtimeModes)
EXPO_PUBLIC_STATE_MODE=zustand
EXPO_PUBLIC_HTTP_CLIENT=axios+rq

# Push: 1 = request permission + log native device token in dev (no EAS)
EXPO_PUBLIC_PUSH_SETUP=0

# Optional Universal Links hosts (comma-separated), e.g. app.example.com
# EXPO_PUBLIC_IOS_ASSOCIATED_DOMAINS=
```

> Only `EXPO_PUBLIC_*` variables are bundled into the client. Everything else is build-time only.

---

## Project structure

```
├── app/                        # Expo Router screens
│   ├── (app)/                  # Authenticated shell (guard) + `(tabs)/` main UI
│   ├── (auth)/                 # Login, register, forgot password, OTP
│   ├── _layout.tsx             # Root layout (providers, QueryClient, ErrorBoundary)
│   ├── index.tsx               # Entry gate → (app) or (auth)
│   └── Modal.tsx               # Modal screen example
├── api/                        # Axios + optional fetch client + types + utilities
├── assets/                     # Fonts, images
├── components/
│   ├── ui/                     # Core UI components (exported via index.ts)
│   ├── Toggle/                 # Checkbox, Radio, Switch, Toggle
│   ├── BottomSheetComponents/  # Bottom sheet wrappers
│   ├── BottomSheetScreens/     # Bottom sheet screen examples
│   ├── ErrorBoundary/          # Error boundary + error details UI
│   └── Examples/               # Usage examples for every component
├── constants/
│   ├── Colors.ts               # Palette + light/dark semantic tokens
│   └── mixins.ts               # Shared style helpers
├── config/
│   └── featureFlags.ts         # featureFlags + runtimeModes (state / HTTP client from env)
├── context/
│   ├── I18nContext.tsx         # useI18n() + locale from expo-localization
│   └── ThemeContext.tsx        # ThemeProvider + useTheme (persisted)
├── docs/                       # TEMPLATE_GAPS, AUTH_AND_NAVIGATION, etc.
├── i18n/                       # Locale catalogs (en, es) + translate helpers
├── hooks/                      # Custom hooks
├── scripts/                    # CLI scripts (bump-version, theme-mode, etc.)
├── services/                   # authBackend, sessionSync, pushNotifications
├── store/                      # Zustand stores
├── theme/                      # Design token system
└── utils/                      # Utility functions
```

---

## Known gaps / roadmap

See [`docs/TEMPLATE_GAPS.md`](docs/TEMPLATE_GAPS.md) for the small **deferred** list (sheets recipes, analytics, biometrics, update prompts). **Zod + `FormField`** demo: Components tab → **Form + Zod**. Optional **Google** helper: `utils/googleAuth.ts`.

- **Auth + tokens + API shapes:** [`docs/AUTH_AND_NAVIGATION.md`](docs/AUTH_AND_NAVIGATION.md)

---

## What this is NOT (yet)

- **Not your production backend** — set `EXPO_PUBLIC_AUTH_MODE=api` and adapt `services/authBackend.ts` to your routes; mock mode stays for UI-only work
- **Not a UI kit** — components cover common patterns but are not exhaustive
- **Not tested** — zero test files currently; jest and jest-expo are installed ready to go

---

## License

MIT
