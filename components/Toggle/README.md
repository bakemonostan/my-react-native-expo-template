# Toggle Components

Project-agnostic toggle/checkbox/radio/switch components for React Native applications.

## Features

- ✅ **No external dependencies** - Only uses `@/components/ui/TextComponent`
- ✅ **Self-contained** - No theme or i18n dependencies
- ✅ **Animated** - Smooth transitions
- ✅ **Accessible** - Proper accessibility roles and states
- ✅ **TypeScript** - Full type safety

## Components

### Toggle

Base toggle component that powers all other variants.

### Switch

iOS-style switch toggle.

### Checkbox

Standard checkbox with checkmark.

### Radio

Radio button for single selection.

## Usage

### Switch

```tsx
import { Switch } from "@/components/Toggle";

function Example() {
  const [enabled, setEnabled] = useState(false);

  return (
    <Switch
      value={enabled}
      onValueChange={setEnabled}
      label="Enable notifications"
    />
  );
}
```

### Checkbox

```tsx
import { Checkbox } from "@/components/Toggle";

function Example() {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox
      value={checked}
      onValueChange={setChecked}
      label="I agree to terms"
    />
  );
}
```

### Radio

```tsx
import { Radio } from "@/components/Toggle";

function Example() {
  const [selected, setSelected] = useState("option1");

  return (
    <>
      <Radio
        value={selected === "option1"}
        onValueChange={() => setSelected("option1")}
        label="Option 1"
      />
      <Radio
        value={selected === "option2"}
        onValueChange={() => setSelected("option2")}
        label="Option 2"
      />
    </>
  );
}
```

## Props

### Common Props

- `value`: boolean - Current state
- `onValueChange`: (value: boolean) => void - Callback when toggled
- `label`: string - Label text
- `helper`: string - Helper text below toggle
- `status`: "error" | "disabled" - Visual state
- `editable`: boolean - Whether toggle is editable
- `labelPosition`: "left" | "right" - Label position
- `labelStyle`: StyleProp<TextStyle> - Custom label styles
- `inputOuterStyle`: ViewStyle - Outer container style
- `inputInnerStyle`: ViewStyle - Inner container style
- `inputDetailStyle`: ViewStyle - Detail element style

### Switch-specific Props

- `accessibilityMode`: "text" | "icon" - Accessibility indicator style

### Checkbox-specific Props

- `icon`: IconTypes - Custom icon (default: "check")

## Customization

All colors are defined inline and can be easily customized:

- Primary: `#3B82F6` (blue)
- Error: `#DC2626` (red)
- Disabled: Various grays
- Background: Various grays

## Dependencies

- `@/components/ui/TextComponent`
