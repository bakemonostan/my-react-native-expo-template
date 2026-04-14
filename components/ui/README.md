# Shared UI components (project-agnostic)

This folder contains project-agnostic versions of UI components that can be easily copied to other React Native projects without dependencies on project-specific constants, utilities, or configurations.

## Components Included

### Text & Typography

- **TextComponent** - Basic text component with font weights and sizes
- **ResponsiveText** - Text component with responsive scaling and variants
- **TextInputComponent** - Text input with error handling and custom styling

### Layout & Structure

- **Screen** - Screen layout component with header/body/footer, safe areas, and keyboard handling
- **ScrollViewComponent** - Enhanced ScrollView with customizable indicators
- **SimpleKeyboardAvoidingView** - Keyboard avoiding view with scroll support

### Interactive Elements

- **PressableComponent** - Customizable button/pressable with variants, icons, and loading states
- **ExternalLink** - External link handler with platform-specific behavior

### Display Components

- **AlertComponent** - Alert/notification component with variants (info, success, warning, error)
- **AvatarComponent** - Avatar with image, initials, or empty states
- **BadgeComponent** - Badge for notifications and status indicators
- **IconComponent** - Icon component supporting multiple libraries and custom images
- **ImageComponent** - Image with loading and error states
- **LoadingComponent** - Loading spinner with optional message
- **ModalComponent** - Modal overlay with customizable content

## Key Features

### ✅ No Project Dependencies

- No imports from `@/constants/Colors`
- No imports from `@/utils/*`
- No imports from `@/theme/*`
- All colors and styles are inline or use default values

### ✅ Self-Contained

- Each component includes all necessary types and utilities
- Components only depend on:
  - React Native core components
  - Expo packages (expo-router, expo-status-bar, expo-web-browser)
  - @expo/vector-icons
  - react-native-safe-area-context
  - @react-navigation/native (only Screen)

### ✅ Fully Documented

- Comprehensive JSDoc comments
- Multiple usage examples for each component
- TypeScript type definitions

## Usage

### Configure Fonts (Important!)

**Before using any text components**, configure the font families to match your project:

```tsx
// In your app entry point (App.tsx or _layout.tsx)
import { FONT_FAMILY_MAP } from "./components/ui";

// Option 1: Use system fonts (default)
// No configuration needed - components will use "System" font

// Option 2: Use custom fonts
FONT_FAMILY_MAP.regular = "Inter-Regular";
FONT_FAMILY_MAP.medium = "Inter-Medium";
FONT_FAMILY_MAP.semi_bold = "Inter-SemiBold";
FONT_FAMILY_MAP.bold = "Inter-Bold";
FONT_FAMILY_MAP.extra_bold = "Inter-ExtraBold";
FONT_FAMILY_MAP.black = "Inter-Black";

// Option 3: Use the same font for all weights
FONT_FAMILY_MAP.regular = "MyFont";
FONT_FAMILY_MAP.medium = "MyFont";
FONT_FAMILY_MAP.semi_bold = "MyFont";
FONT_FAMILY_MAP.bold = "MyFont";
```

### Import Individual Components

```tsx
import { AlertComponent, PressableComponent } from "./components/ui";

// Or import directly
import AlertComponent from "./components/ui/AlertComponent";
```

### Copy to Another Project

1. Copy the entire `ui` folder to your new project
2. Install required dependencies:
   ```bash
   npm install expo-router expo-status-bar expo-web-browser
   npm install @expo/vector-icons
   npm install react-native-safe-area-context
   npm install @react-navigation/native
   ```
3. **Configure fonts** (see "Configure Fonts" section above)
4. Import and use components as needed

## Customization

All components accept style props and can be customized:

```tsx
// Custom colors
<PressableComponent
  variant="primary"
  backgroundColor="#FF6B6B"
  buttonTextColor="#FFFFFF"
/>

// Custom styling
<AlertComponent
  variant="info"
  backgroundColor="#E3F2FD"
  textColor="#0D47A1"
  borderColor="#90CAF9"
/>
```

## Component Dependencies

### External Dependencies

- `react-native` - Core React Native components
- `expo-router` - Navigation (ExternalLink only)
- `expo-status-bar` - Status bar (Screen only)
- `expo-web-browser` - Web browser (ExternalLink only)
- `@expo/vector-icons` - Icon libraries (IconComponent)
- `react-native-safe-area-context` - Safe area handling (Screen, SimpleKeyboardAvoidingView)
- `@react-navigation/native` - Navigation utilities (Screen only)

### Internal Dependencies

Some components depend on other components in this folder:

- `AlertComponent` → `IconComponent`, `TextComponent`
- `AvatarComponent` → `TextComponent`
- `BadgeComponent` → `TextComponent`
- `ImageComponent` → `LoadingComponent`
- `LoadingComponent` → `TextComponent`
- `ModalComponent` → `TextComponent`
- `PressableComponent` → `IconComponent`, `ResponsiveText`

## Font Configuration Details

### How It Works

All text components use a centralized font configuration in `fontConfig.ts`:

```tsx
// components/ui/fontConfig.ts
export const FONT_FAMILY_MAP: Record<FontWeight, string> = {
  regular: "System",
  light: "System",
  medium: "System",
  semi_bold: "System",
  bold: "System",
  extra_bold: "System",
  black: "System",
  variable: "System",
};
```

This mapping is used by:

- TextComponent
- ResponsiveText
- TextInputComponent
- AlertComponent (via TextComponent)
- AvatarComponent (via TextComponent)
- BadgeComponent (via TextComponent)
- LoadingComponent (via TextComponent)
- ModalComponent (via TextComponent)
- PressableComponent (via ResponsiveText)

### Customizing Fonts

You can customize fonts in two ways:

**Method 1: Direct modification (recommended)**

```tsx
import { FONT_FAMILY_MAP } from "./components/ui";

FONT_FAMILY_MAP.regular = "YourFont-Regular";
FONT_FAMILY_MAP.bold = "YourFont-Bold";
```

**Method 2: Edit fontConfig.ts directly**

```tsx
// Edit components/ui/fontConfig.ts
export const FONT_FAMILY_MAP: Record<FontWeight, string> = {
  regular: "YourFont-Regular",
  light: "YourFont-Light",
  medium: "YourFont-Medium",
  // ... etc
};
```

## Migration from Original Components

If you're migrating from the original `ui` folder components:

1. **Colors**: Replace project-specific colors with inline hex values
2. **Typography**: Configure FONT_FAMILY_MAP instead of using theme imports
3. **Utilities**: Replace `useSafeAreaInsetsStyle` with inline implementation (included in Screen)
4. **Scaling**: ResponsiveText includes its own `mScale` function (now with rotation support)

## Notes

- **Default fonts**: Components use "System" font by default (works on all platforms)
- **Custom fonts**: Configure FONT_FAMILY_MAP before using components
- **Rotation support**: ResponsiveText now properly handles device rotation
- Some components use `@react-navigation/native` - if not using React Navigation, you may need to adjust Screen

## License

These components are part of your project and follow your project's license.
