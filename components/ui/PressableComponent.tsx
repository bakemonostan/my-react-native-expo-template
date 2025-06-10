import React from "react";
import { Pressable, PressableProps, StyleProp, ViewStyle } from "react-native";
import TextComponent, { FontWeight } from "./TextComponent";

/**
 * Pressable size presets for consistent touch targets
 */
export type PressableSize =
  | "sm" // 32px height
  | "base" // 44px height
  | "lg" // 56px height
  | "xl" // 64px height
  | number;

/**
 * Common pressable variants
 */
export type PressableVariant = "primary" | "secondary" | "ghost" | "danger";

/**
 * Props interface for the PressableComponent
 */
export interface PressableComponentProps extends PressableProps {
  /**
   * Pressable size - affects height and padding
   * @default 'base'
   */
  size?: PressableSize;

  /**
   * Visual variant of the pressable
   * @default 'primary'
   */
  variant?: PressableVariant;

  /**
   * Background color - overrides variant color
   */
  backgroundColor?: string;

  /**
   * Border radius for the pressable
   * @default 8
   */
  borderRadius?: number;

  /**
   * Button label text
   */
  btnLabel?: string;

  /**
   * Custom styles applied to the pressable
   */
  pressableStyle?: StyleProp<ViewStyle>;

  /**
   * Whether the pressable is in a loading state
   * @default false
   */
  loading?: boolean;

  /**
   * Opacity when pressed
   * @default 0.6
   */
  activeOpacity?: number;
}

/**
 * Size mapping for consistent touch targets
 */
const SIZE_MAP: Record<
  Exclude<PressableSize, number>,
  { height: number; paddingHorizontal: number }
> = {
  sm: { height: 32, paddingHorizontal: 12 },
  base: { height: 44, paddingHorizontal: 16 },
  lg: { height: 56, paddingHorizontal: 20 },
  xl: { height: 64, paddingHorizontal: 24 },
};

/**
 * Text styles for each variant
 */
const VARIANT_TEXT_STYLES: Record<
  PressableVariant,
  { weight: FontWeight; color: string }
> = {
  primary: {
    weight: "semi_bold",
    color: "#FFFFFF",
  },
  secondary: {
    weight: "medium",
    color: "#007AFF",
  },
  ghost: {
    weight: "medium",
    color: "#007AFF",
  },
  danger: {
    weight: "semi_bold",
    color: "#FFFFFF",
  },
};
const VARIANT_STYLES: Record<PressableVariant, ViewStyle> = {
  primary: {
    backgroundColor: "#007AFF",
    borderWidth: 0,
  },
  secondary: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#007AFF",
  },
  ghost: {
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  danger: {
    backgroundColor: "#FF3B30",
    borderWidth: 0,
  },
};

/**
 * A customizable Pressable component with consistent sizing and variants
 *
 * @example
 * ```tsx
 * <PressableComponent
 *   variant="primary"
 *   size="lg"
 *   btnLabel="Submit"
 *   onPress={() => console.log('Pressed!')}
 * />
 * ```
 *
 * @example
 * ```tsx
 * <PressableComponent
 *   variant="secondary"
 *   size={48}
 *   borderRadius={12}
 *   activeOpacity={0.8}
 *   pressableStyle={{ marginTop: 20 }}
 * >
 *   <CustomIcon name="heart" />
 * </PressableComponent>
 * ```
 */
export default function PressableComponent({
  size = "base",
  variant = "primary",
  backgroundColor,
  borderRadius = 8,
  btnLabel,
  pressableStyle,
  loading = false,
  activeOpacity = 0.6,
  disabled,
  style,
  children,
  ...restProps
}: PressableComponentProps) {
  /**
   * Get size dimensions
   */
  const getSizeDimensions = (sizeValue: PressableSize) => {
    if (typeof sizeValue === "number") {
      return {
        height: sizeValue,
        paddingHorizontal: Math.round(sizeValue * 0.36), // Proportional padding
      };
    }
    return SIZE_MAP[sizeValue];
  };

  const dimensions = getSizeDimensions(size);

  /**
   * Base styles for the pressable
   */
  const baseStyles: ViewStyle = {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: borderRadius,
    ...dimensions,
    ...VARIANT_STYLES[variant],
  };

  // Override background color if provided
  if (backgroundColor) {
    baseStyles.backgroundColor = backgroundColor;
  }

  // Handle loading and disabled states
  const isInteractionDisabled = loading || disabled;
  // const finalOpacity = isInteractionDisabled ? 0.5 : 1;

  /**
   * Combine all styles
   */
  const resolveStyle = (pressed: boolean, hovered: boolean = false) => {
    // If style is a function, call it with the pressed and hovered state
    const resolvedStyle =
      typeof style === "function" ? style({ pressed, hovered }) : style;

    return [
      baseStyles,
      { opacity: isInteractionDisabled ? 0.5 : pressed ? activeOpacity : 1 },
      pressableStyle,
      resolvedStyle,
    ];
  };

  return (
    <Pressable
      style={({ pressed, hovered }) => resolveStyle(pressed, hovered)}
      disabled={isInteractionDisabled}
      {...restProps}
    >
      {btnLabel ? (
        <TextComponent
          weight={VARIANT_TEXT_STYLES[variant].weight}
          color={VARIANT_TEXT_STYLES[variant].color}
          size="base"
        >
          {btnLabel}
        </TextComponent>
      ) : (
        children
      )}
    </Pressable>
  );
}
