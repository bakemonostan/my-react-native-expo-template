import { useTheme } from "@/context/ThemeContext";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { Image, ImageSourcePropType } from "react-native";

// Create a type-safe icon components object for vector icons
const IconComponents = {
  FontAwesome,
  MaterialIcons,
  Ionicons,
  Feather,
  AntDesign,
  Entypo,
  MaterialCommunityIcons,
} as const;

// Infer everything from the objects
type VectorIconName<L extends keyof typeof IconComponents> =
  React.ComponentProps<(typeof IconComponents)[L]>["name"];

interface BaseIconProps {
  /**
   * Size of the icon
   * @default 24
   */
  size?: number;
}

interface VectorIconProps<L extends keyof typeof IconComponents>
  extends BaseIconProps {
  library: L;
  name: VectorIconName<L>;
  color?: string;
}

interface CustomIconProps extends BaseIconProps {
  library: "custom";
  source: ImageSourcePropType;
}

export type IconLibrary = keyof typeof IconComponents | "custom";

export type IconComponentProps =
  | VectorIconProps<keyof typeof IconComponents>
  | CustomIconProps;

/**
 * Vector-only icon props for slots (chips, form fields, empty states, etc.).
 * Excludes `library: "custom"` so `name` is always required and matches `IconComponent`.
 */
export type VectorIconSlotProps = Pick<
  Extract<IconComponentProps, { library: keyof typeof IconComponents }>,
  "name" | "library" | "size"
>;

/**
 * A flexible Icon component that supports multiple vector icon libraries and custom image icons.
 *
 * ## Features
 * - **Type Safety**: TypeScript validates icon names for each library
 * - **Multiple Libraries**: Supports 7 popular icon libraries
 * - **Custom Icons**: Use your own image files as icons
 * - **Consistent API**: Same props interface across all icon types
 *
 * ## Supported Libraries
 * - `FontAwesome` - Classic font awesome icons
 * - `MaterialIcons` - Google Material Design icons
 * - `Ionicons` - Ionic framework icons
 * - `Feather` - Feather icon set
 * - `AntDesign` - Ant Design icon library
 * - `Entypo` - Entypo icon set
 * - `MaterialCommunityIcons` - Extended Material Design icons
 *
 * @example
 * ```tsx
 * // Vector Icon with type-safe name validation
 * <IconComponent
 *   library="Ionicons"
 *   name="home" // TypeScript autocomplete and validation
 *   size={24}
 *   color="#007AFF"
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Different icon libraries
 * <IconComponent library="FontAwesome" name="heart" size={20} color="red" />
 * <IconComponent library="MaterialIcons" name="settings" size={28} />
 * <IconComponent library="Feather" name="search" size={16} color="#666" />
 * <IconComponent library="AntDesign" name="plus" size={32} />
 * ```
 *
 * @example
 * ```tsx
 * // Custom image icon from local assets
 * <IconComponent
 *   library="custom"
 *   source={require('../../assets/images/custom-icon.png')}
 *   size={24}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Custom icon from remote URL
 * <IconComponent
 *   library="custom"
 *   source={{ uri: 'https://example.com/icon.png' }}
 *   size={32}
 * />
 * ```
 */
export default function IconComponent(props: IconComponentProps) {
  const { colors } = useTheme();
  const { size = 24 } = props;

  if (props.library === "custom") {
    return (
      <Image
        source={props.source}
        style={{ width: size, height: size }}
        resizeMode="contain"
      />
    );
  }

  const Icon = IconComponents[props.library];
  if (!Icon) {
    console.warn(`Icon library "${props.library}" not found`);
    return null;
  }

  return (
    <Icon
      name={props.name as any}
      size={size}
      color={props.color ?? colors.text}
    />
  );
}
