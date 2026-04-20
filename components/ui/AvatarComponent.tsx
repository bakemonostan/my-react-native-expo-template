import { useTheme } from "@/hooks/useTheme";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import TextComponent from "./TextComponent";

export interface AvatarComponentProps {
  /**
   * Image source for the avatar
   */
  source?: ImageSourcePropType;

  /**
   * Size of the avatar
   * @default 40
   */
  size?: number;

  /**
   * Initials to show when no image is provided
   */
  initials?: string;

  /**
   * Background color for the avatar
   * @default **`colors.backgroundSecondary`**
   */
  backgroundColor?: string;

  /**
   * Custom styles for the container
   */
  style?: ViewStyle;

  /**
   * Custom styles for the image
   */
  imageStyle?: ImageStyle;

  /**
   * Whether to show a border around the avatar
   * @default false
   */
  bordered?: boolean;

  /**
   * Border color when bordered is true
   * @default **`colors.surface`**
   */
  borderColor?: string;
}

/**
 * An avatar component that supports images, initials, and fallback states.
 *
 * ## Features
 * - **Multiple Display Modes**: Image, initials, or empty state
 * - **Flexible Sizing**: Custom size with proportional scaling
 * - **Border Support**: Optional border with custom color
 * - **Fallback Handling**: Graceful fallback when image fails to load
 * - **Custom Styling**: Override container and image styles
 * - **Type Safety**: TypeScript validates all props and image sources
 *
 * ## Display Modes
 * - **Image Avatar**: Shows user profile picture with proper scaling
 * - **Initials Avatar**: Shows user initials when no image is available
 * - **Empty Avatar**: Shows background color when no content is provided
 *
 * @example
 * ```tsx
 * // Image avatar with custom size
 * <AvatarComponent
 *   source={{ uri: 'https://example.com/avatar.jpg' }}
 *   size={50}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Initials avatar with custom styling
 * <AvatarComponent
 *   initials="JD"
 *   size={40}
 *   backgroundColor="#007AFF"
 *   bordered={true}
 *   borderColor="#FFFFFF"
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Large avatar with local image
 * <AvatarComponent
 *   source={require('../../assets/images/default-avatar.png')}
 *   size={80}
 *   style={{ marginRight: 12 }}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Small avatar with initials and custom colors
 * <AvatarComponent
 *   initials="AB"
 *   size={32}
 *   backgroundColor="#E3F2FD"
 *   style={{ borderWidth: 2, borderColor: '#2196F3' }}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Avatar with custom image styling
 * <AvatarComponent
 *   source={{ uri: 'https://example.com/avatar.jpg' }}
 *   size={60}
 *   imageStyle={{ borderRadius: 30 }}
 *   style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25 }}
 * />
 * ```
 */
export default function AvatarComponent({
  source,
  size = 40,
  initials,
  backgroundColor,
  style,
  imageStyle,
  bordered = false,
  borderColor,
}: AvatarComponentProps) {
  const { colors } = useTheme();
  const bg = backgroundColor ?? colors.backgroundSecondary;
  const border = borderColor ?? colors.surface;

  const containerStyle = [
    styles.container,
    {
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: bg,
    },
    bordered && {
      borderWidth: 2,
      borderColor: border,
    },
    style,
  ];

  if (source) {
    return (
      <View style={containerStyle}>
        <Image
          source={source}
          style={[
            styles.image,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
            },
            imageStyle,
          ]}
        />
      </View>
    );
  }

  if (initials) {
    // Scale font size based on avatar size (40% of avatar size, min 12px)
    const fontSize = Math.max(Math.round(size * 0.4), 12);

    return (
      <View style={containerStyle}>
        <TextComponent
          style={styles.initials}
          color={colors.text}
          weight="semi_bold"
          size={fontSize}>
          {initials}
        </TextComponent>
      </View>
    );
  }

  return <View style={containerStyle} />;
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  initials: {
    textAlign: "center",
  },
});
