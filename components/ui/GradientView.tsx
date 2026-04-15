import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, ViewStyle } from "react-native";

/**
 * Props for the GradientView component
 */
export interface GradientViewProps {
  /** Child components to render inside the gradient view */
  children: React.ReactNode;
  /** Width of the gradient border in pixels. Defaults to 1.5 */
  borderWidth?: number;
  /** Array of color strings for the gradient. Defaults to a purple/blue gradient */
  colors?: string[];
  /** Additional styles to apply to the container */
  style?: ViewStyle;
  /** Whether to show the gradient border. When false, renders as a simple rounded view */
  showBorder?: boolean;
  /** Border radius in pixels. Defaults to 6 */
  borderRadius?: number;
  /** Whether to show shadow (currently not implemented). Defaults to false */
  showShadow?: boolean;
}

/**
 * A reusable component that wraps children in a gradient border effect.
 *
 * This component creates a visual effect where content is surrounded by a gradient border
 * using LinearGradient. When `showBorder` is false, it renders as a simple rounded view
 * without the gradient effect.
 *
 * The gradient border is created by using padding on the LinearGradient component,
 * which creates the border width effect. The inner content has a white background
 * and adjusted border radius to fit within the gradient border.
 *
 * @example
 * ```tsx
 * // Basic usage with default gradient
 * <GradientView>
 *   <Text>Content with gradient border</Text>
 * </GradientView>
 * ```
 *
 * @example
 * ```tsx
 * // Custom colors and border radius
 * <GradientView
 *   colors={["#FF0000", "#00FF00", "#0000FF"]}
 *   borderRadius={12}
 *   borderWidth={2}>
 *   <View>
 *     <Text>Custom gradient border</Text>
 *   </View>
 * </GradientView>
 * ```
 *
 * @example
 * ```tsx
 * // Without gradient border (simple rounded view)
 * <GradientView
 *   showBorder={false}
 *   borderRadius={8}
 *   style={{ padding: 16 }}>
 *   <Text>Simple rounded view</Text>
 * </GradientView>
 * ```
 *
 * @example
 * ```tsx
 * // With custom styling
 * <GradientView
 *   style={{ margin: 16, width: 200 }}
 *   borderRadius={20}
 *   borderWidth={3}>
 *   <ResponsiveText variant="h2" text="Styled gradient view" />
 * </GradientView>
 * ```
 */
const DEFAULT_GRADIENT = ["#8B5CF6", "#3B82F6", "#2563EB"] as const;

export default function GradientView({
  children,
  borderWidth = 1.5,
  colors: gradientColors,
  style,
  showBorder = false,
  borderRadius = 6,
  showShadow = false,
}: GradientViewProps) {
  const lineColors = (
    gradientColors?.length ? gradientColors : [...DEFAULT_GRADIENT]
  ) as [string, string, ...string[]];

  if (!showBorder) {
    return (
      <View style={[$container, style, { borderRadius }]}>
        <View style={[$content, { borderRadius }]}>{children}</View>
      </View>
    );
  }

  return (
    <View
      style={[
        $container,
        style,
        { borderRadius },
        showShadow && $shadowContainer,
      ]}>
      <LinearGradient
        colors={lineColors}
        locations={[0, 0.3, 0.7, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[$gradient, { padding: borderWidth, borderRadius }]}>
        <View
          style={[
            $content,
            { borderRadius: Math.max(0, borderRadius - borderWidth) },
          ]}>
          {children}
        </View>
      </LinearGradient>
    </View>
  );
}

const $container: ViewStyle = {
  overflow: "hidden",
  borderWidth: 0,
  backgroundColor: "transparent",
};

const $shadowContainer: ViewStyle = {
  // shadowColor: "#010101",
  // shadowOffset: {
  //   width: 0,
  //   height: 1,
  // },
  // shadowOpacity: 0.05,
  // shadowRadius: 6,
  // elevation: 1,
};

const $gradient: ViewStyle = {
  overflow: "hidden",
};

const $content: ViewStyle = {
  backgroundColor: "white",
  overflow: "hidden",
};
