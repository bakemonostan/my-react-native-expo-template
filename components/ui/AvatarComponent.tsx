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
   * @default '#E1E1E1'
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
   * @default '#FFFFFF'
   */
  borderColor?: string;
}

/**
 * An avatar component that supports images, initials, and fallback states
 *
 * @example
 * ```tsx
 * <AvatarComponent
 *   source={{ uri: 'https://example.com/avatar.jpg' }}
 *   size={50}
 * />
 * ```
 *
 * @example
 * ```tsx
 * <AvatarComponent
 *   initials="JD"
 *   size={40}
 *   backgroundColor="#007AFF"
 *   bordered={true}
 * />
 * ```
 */
export default function AvatarComponent({
  source,
  size = 40,
  initials,
  backgroundColor = "#E1E1E1",
  style,
  imageStyle,
  bordered = false,
  borderColor = "#FFFFFF",
}: AvatarComponentProps) {
  const containerStyle = [
    styles.container,
    {
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor,
    },
    bordered && {
      borderWidth: 2,
      borderColor,
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
    return (
      <View style={containerStyle}>
        <TextComponent
          style={styles.initials}
          color="#FFFFFF"
          weight="semi_bold"
          size="base"
        >
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
