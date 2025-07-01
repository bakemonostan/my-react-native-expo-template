import { colors } from "@/constants/Colors";
import React, { useRef } from "react";
import {
  ActivityIndicator,
  Animated,
  Pressable,
  PressableProps,
  StyleProp,
  View,
  ViewStyle,
} from "react-native";
import IconComponent, { IconComponentProps } from "./IconComponent";
import ResponsiveText, { TEXT_VARIANTS } from "./ResponsiveText";

/**
 * Pressable size presets for consistent touch targets
 */
export type PressableSize =
  | "xs" // 26px height
  | "sm" // 32px height
  | "base" // 44px height
  | "lg" // 56px height
  | "xl" // 64px height
  | number;

/**
 * Common pressable variants
 */
export type PressableVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "alert"
  | "login"
  | "outline"
  | "wisty"
  | "social";

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
  buttonText?: string;

  /**
   * Button label variant from ResponsiveText variants
   * @default 'body1Bold'
   */
  labelVariant?: keyof typeof TEXT_VARIANTS;

  /**
   * Button label text color
   */
  buttonTextColor?: string;

  /**
   * Whether the pressable is rounded
   * @default false
   */
  rounded?: boolean;

  /**
   * Left accessory (icon) to display before the text
   */
  leftAccessory?: IconComponentProps | React.ReactNode;

  /**
   * Right accessory (icon) to display after the text
   */
  rightAccessory?: IconComponentProps | React.ReactNode;

  /**
   * Spacing between accessories and text
   * @default 8
   */
  accessorySpacing?: number;

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
  { height: number; paddingHorizontal: number; paddingVertical?: number }
> = {
  xs: { height: 26, paddingHorizontal: 8, paddingVertical: 0 },
  sm: { height: 36, paddingHorizontal: 12 },
  base: { height: 42, paddingHorizontal: 16 },
  lg: { height: 56, paddingHorizontal: 20 },
  xl: { height: 64, paddingHorizontal: 24 },
};

/**
 * Text styles for each variant
 */
const VARIANT_TEXT_STYLES: Record<PressableVariant, { color: string }> = {
  primary: {
    color: "#FFFFFF",
  },
  secondary: {
    color: colors.palette.takersBlue100,
  },
  login: {
    color: "#FFFFFF",
  },
  outline: {
    color: colors.palette.takersBlue100,
  },
  ghost: {
    color: colors.palette.takersBlue100,
  },
  alert: {
    color: colors.palette.takersBlue100,
  },
  wisty: {
    color: colors.palette.takersBlue100,
  },
  social: {
    color: colors.palette.takersBlue100,
  },
};
const VARIANT_STYLES: Record<PressableVariant, ViewStyle> = {
  primary: {
    backgroundColor: colors.palette.takersBlue100,
    borderWidth: 0,
  },
  secondary: {
    backgroundColor: colors.palette.takersSky100,
    borderWidth: 1,
    borderColor: colors.palette.takersSky100,
  },
  ghost: {
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  alert: {
    backgroundColor: colors.palette.takersSky25,
    borderWidth: 1,
    borderColor: colors.palette.alert100,
  },
  wisty: {
    backgroundColor: colors.palette.wisty25,
    borderWidth: 0,
  },
  login: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#CADFFD",
  },
  outline: {
    backgroundColor: "#FFFFFF",
  },
  social: {
    backgroundColor: colors.palette.takersSky15,
    borderWidth: 1,
    borderColor: colors.primary,
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
 *   buttonText="Submit"
 *   labelVariant="body1Bold"
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
 *
 * @example
 * ```tsx
 * // Button with left icon
 * <PressableComponent
 *   variant="primary"
 *   buttonText="Save"
 *   labelVariant="body1Medium"
 *   leftAccessory={{
 *     library: "Ionicons",
 *     name: "save-outline",
 *     color: "#FFFFFF"
 *   }}
 *   onPress={handleSave}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Button with right icon
 * <PressableComponent
 *   variant="ghost"
 *   buttonText="Next"
 *   labelVariant="body1Regular"
 *   rightAccessory={{
 *     library: "Feather",
 *     name: "arrow-right",
 *     color: "#007AFF"
 *   }}
 *   onPress={handleNext}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Button with both icons
 * <PressableComponent
 *   variant="secondary"
 *   buttonText="Share"
 *   labelVariant="body1Bold"
 *   leftAccessory={{
 *     library: "Ionicons",
 *     name: "share-outline",
 *     color: "#007AFF"
 *   }}
 *   rightAccessory={{
 *     library: "Ionicons",
 *     name: "chevron-forward",
 *     color: "#007AFF"
 *   }}
 *   accessorySpacing={12}
 *   onPress={handleShare}
 * />
 * ```
 */
export default function PressableComponent({
  size = "base",
  variant = "primary",
  backgroundColor,
  borderRadius = 8,
  rounded = true,
  buttonText,
  labelVariant = "body1Bold",
  buttonTextColor,
  leftAccessory,
  rightAccessory,
  accessorySpacing = 8,
  pressableStyle,
  loading = false,
  activeOpacity,
  disabled,
  style,
  children,
  ...restProps
}: PressableComponentProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 0.99,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: activeOpacity || 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

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
    borderRadius: rounded ? 100 : borderRadius,
    ...dimensions,
    ...VARIANT_STYLES[variant],
  };

  const disabledStyles: ViewStyle = {
    opacity: 0.9,
    backgroundColor: variant === "ghost" ? undefined : "#251D4B1A", // Light gray background
  };

  // Override background color if provided
  if (backgroundColor) {
    baseStyles.backgroundColor = backgroundColor;
  }

  // Handle loading and disabled states
  const isInteractionDisabled = loading || disabled;
  // const finalOpacity = isInteractionDisabled ? 0.5 : 1;

  /**
   * Render button content
   */
  const renderContent = () => {
    if (buttonText) {
      return (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {leftAccessory && (
            <View style={{ marginRight: accessorySpacing }}>
              {typeof leftAccessory === "object" &&
              "library" in leftAccessory ? (
                <IconComponent
                  {...(leftAccessory as IconComponentProps)}
                  size={leftAccessory.size || 20}
                  {...(leftAccessory.library !== "custom" && {
                    color: isInteractionDisabled
                      ? "#00000033"
                      : leftAccessory.color,
                  })}
                />
              ) : (
                leftAccessory
              )}
            </View>
          )}
          <ResponsiveText
            variant={labelVariant}
            color={
              isInteractionDisabled
                ? "#00000033"
                : buttonTextColor || VARIANT_TEXT_STYLES[variant].color
            }
            text={buttonText}
          />
          {loading ? (
            <View style={{ marginLeft: accessorySpacing }}>
              <ActivityIndicator
                size="small"
                color={colors.textDim}
              />
            </View>
          ) : (
            rightAccessory && (
              <View style={{ marginLeft: accessorySpacing }}>
                {typeof rightAccessory === "object" &&
                "library" in rightAccessory ? (
                  <IconComponent
                    {...(rightAccessory as IconComponentProps)}
                    size={rightAccessory.size || 20}
                    {...(rightAccessory.library !== "custom" && {
                      color: isInteractionDisabled
                        ? "#00000033"
                        : rightAccessory.color,
                    })}
                  />
                ) : (
                  rightAccessory
                )}
              </View>
            )
          )}
        </View>
      );
    }
    return children as React.ReactNode;
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={isInteractionDisabled || disabled}
      {...restProps}>
      <Animated.View
        style={[
          baseStyles,
          isInteractionDisabled && disabledStyles,
          { opacity: isInteractionDisabled ? 0.9 : opacityAnim },
          pressableStyle,
          typeof style === "function"
            ? style({ pressed: false, hovered: false })
            : style,
          { transform: [{ scale: scaleAnim }] },
        ]}>
        {renderContent()}
      </Animated.View>
    </Pressable>
  );
}
