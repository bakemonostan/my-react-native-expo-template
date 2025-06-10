import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { Image, ImageSourcePropType, StyleSheet } from "react-native";

export type IconLibrary =
  | "FontAwesome"
  | "MaterialIcons"
  | "Ionicons"
  | "Feather"
  | "AntDesign"
  | "Entypo"
  | "MaterialCommunityIcons"
  | "custom";

// Type assertions for icon names
type FontAwesomeIconName = React.ComponentProps<typeof FontAwesome>["name"];
type MaterialIconsName = React.ComponentProps<typeof MaterialIcons>["name"];
type IoniconsName = React.ComponentProps<typeof Ionicons>["name"];
type FeatherIconName = React.ComponentProps<typeof Feather>["name"];
type AntDesignIconName = React.ComponentProps<typeof AntDesign>["name"];
type EntypoIconName = React.ComponentProps<typeof Entypo>["name"];
type MaterialCommunityIconsName = React.ComponentProps<
  typeof MaterialCommunityIcons
>["name"];

interface BaseIconProps {
  /**
   * Size of the icon
   * @default 24
   */
  size?: number;
}

interface FontAwesomeIconProps extends BaseIconProps {
  library: "FontAwesome";
  name: FontAwesomeIconName;
  color?: string;
}

interface MaterialIconsProps extends BaseIconProps {
  library: "MaterialIcons";
  name: MaterialIconsName;
  color?: string;
}

interface IoniconsProps extends BaseIconProps {
  library: "Ionicons";
  name: IoniconsName;
  color?: string;
}

interface FeatherIconProps extends BaseIconProps {
  library: "Feather";
  name: FeatherIconName;
  color?: string;
}

interface AntDesignIconProps extends BaseIconProps {
  library: "AntDesign";
  name: AntDesignIconName;
  color?: string;
}

interface EntypoIconProps extends BaseIconProps {
  library: "Entypo";
  name: EntypoIconName;
  color?: string;
}

interface MaterialCommunityIconsProps extends BaseIconProps {
  library: "MaterialCommunityIcons";
  name: MaterialCommunityIconsName;
  color?: string;
}

interface CustomIconProps extends BaseIconProps {
  library: "custom";
  source: ImageSourcePropType;
}

export type IconComponentProps =
  | FontAwesomeIconProps
  | MaterialIconsProps
  | IoniconsProps
  | FeatherIconProps
  | AntDesignIconProps
  | EntypoIconProps
  | MaterialCommunityIconsProps
  | CustomIconProps;

const IconComponents = {
  FontAwesome,
  MaterialIcons,
  Ionicons,
  Feather,
  AntDesign,
  Entypo,
  MaterialCommunityIcons,
} as const;

/**
 * A flexible Icon component that supports multiple icon libraries and custom image icons
 *
 * @example
 * ```tsx
 * // Vector Icon with type-safe name
 * <IconComponent
 *   name="home" // TypeScript will validate this exists in Ionicons
 *   library="Ionicons"
 *   size={24}
 *   color="#007AFF"
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Custom Image Icon
 * <IconComponent
 *   library="custom"
 *   source={require('./assets/custom-icon.png')}
 *   size={24}
 * />
 * ```
 */
export default function IconComponent(props: IconComponentProps) {
  const { size = 24 } = props;

  // Handle custom image icons
  if (props.library === "custom") {
    return (
      <Image
        source={props.source}
        style={[
          styles.image,
          {
            width: size,
            height: size,
          },
        ]}
      />
    );
  }

  // Handle vector icons with type assertion
  const Icon = IconComponents[props.library];
  if (!Icon) {
    console.warn(`Icon library "${props.library}" not found`);
    return null;
  }

  return (
    <Icon
      name={props.name as any} // Type assertion needed due to union type complexity
      size={size}
      color={props.color || "#000000"}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    resizeMode: "contain",
  },
});
