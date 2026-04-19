# My React Native Expo Template

A production-minded Expo + React Native starter. The goal is to skip the boring setup and start building features — with a proper architecture already in place.

> **Status:** Active development. See [`docs/TEMPLATE_GAPS.md`](docs/TEMPLATE_GAPS.md) for the honest backlog.

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

## Scripts

```bash
# Dev
npm start                         # Expo dev server
npm run start:staging             # APP_ENV=staging
npm run start:prod                # NODE_ENV=production

# iOS
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
```

> Only `EXPO_PUBLIC_*` variables are bundled into the client. Everything else is build-time only.

---

## Project structure

```
├── app/                        # Expo Router screens
│   ├── (tabs)/                 # Tab navigator screens
│   ├── _layout.tsx             # Root layout (providers, QueryClient, ErrorBoundary)
│   ├── index.tsx               # Entry / redirect
│   └── Modal.tsx               # Modal screen example
├── api/                        # Axios client + types + utilities
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
├── context/
│   └── ThemeContext.tsx         # ThemeProvider + useTheme (persisted)
├── docs/                       # Internal docs and planning
├── hooks/                      # Custom hooks
├── scripts/                    # CLI scripts (bump-version, theme-mode, etc.)
├── store/                      # Zustand stores
├── theme/                      # Design token system
└── utils/                      # Utility functions
```

---

## Known gaps / roadmap

See [`docs/TEMPLATE_GAPS.md`](docs/TEMPLATE_GAPS.md) for the full list. Top items:

- Toast / snackbar system
- Auth flow screens + auth Zustand slice + protected routes
- Form handling pattern (Zod + React Hook Form)
- Select, OTP input, EmptyState components
- Push notifications
- Feature flags
- `useDebounce`, `usePermissions`, `useKeyboard` hooks
- Toggle/Checkbox/Radio re-export from main `ui/index.ts`

---

## What this is NOT (yet)

- **Not a full auth boilerplate** — token storage and utilities are in place but screens, guards, and social sign-in are not wired
- **Not a UI kit** — components cover common patterns but are not exhaustive
- **Not tested** — zero test files currently; jest and jest-expo are installed ready to go

---

## License

MIT
