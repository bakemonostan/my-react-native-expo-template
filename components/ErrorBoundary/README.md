# ErrorBoundary Component

Project-agnostic error boundary components for React Native applications.

## Features

- ✅ **No external dependencies** - Only uses shared `@/components/ui` primitives
- ✅ **Self-contained** - No theme or i18n dependencies
- ✅ **Customizable** - Easy to modify colors and styles
- ✅ **TypeScript** - Full type safety

## Components

### ErrorBoundary

A React error boundary component that catches JavaScript errors in child components.

### ErrorDetails

The error display screen shown when an error is caught.

## Usage

```tsx
import { ErrorBoundary } from "@/components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary catchErrors="always">
      <YourApp />
    </ErrorBoundary>
  );
}
```

## Props

### ErrorBoundary

- `children`: ReactNode - The app components to wrap
- `catchErrors`: "always" | "dev" | "prod" | "never" - When to catch errors

## Customization

All colors and styles are defined inline and can be easily customized:

- Error color: `#DC2626` (red)
- Background: `#F3F4F6` (light gray)
- Text colors: Various grays

## Dependencies

- `@/components/ui/IconComponent`
- `@/components/ui/PressableComponent`
- `@/components/ui/Screen`
- `@/components/ui/TextComponent`
