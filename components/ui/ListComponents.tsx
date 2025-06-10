import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import {
  FlatList,
  FlatListProps,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import IconComponent, { IconLibrary } from "./IconComponent";
import TextComponent from "./TextComponent";

type IconName =
  | React.ComponentProps<typeof FontAwesome>["name"]
  | React.ComponentProps<typeof MaterialIcons>["name"]
  | React.ComponentProps<typeof Ionicons>["name"]
  | React.ComponentProps<typeof Feather>["name"]
  | React.ComponentProps<typeof AntDesign>["name"]
  | React.ComponentProps<typeof Entypo>["name"]
  | React.ComponentProps<typeof MaterialCommunityIcons>["name"];

export interface ListItemProps {
  /**
   * Title of the list item
   */
  title: string;

  /**
   * Optional subtitle of the list item
   */
  subtitle?: string;

  /**
   * Optional icon to display on the left
   */
  leftIcon?: {
    name: IconName;
    library: Exclude<IconLibrary, "custom">;
    color?: string;
    size?: number;
  };

  /**
   * Optional icon to display on the right
   */
  rightIcon?: {
    name: IconName;
    library: Exclude<IconLibrary, "custom">;
    color?: string;
    size?: number;
  };

  /**
   * Whether the item is pressable
   * @default false
   */
  pressable?: boolean;

  /**
   * Callback when the item is pressed
   */
  onPress?: () => void;

  /**
   * Custom styles for the item container
   */
  style?: ViewStyle;

  /**
   * Custom styles for the content container
   */
  contentStyle?: ViewStyle;
}

/**
 * A list item component with consistent styling
 *
 * @example
 * ```tsx
 * <ListItem
 *   title="Settings"
 *   subtitle="Manage your preferences"
 *   leftIcon={{ name: "settings", library: "Ionicons" }}
 *   pressable={true}
 *   onPress={() => {}}
 * />
 * ```
 */
export function ListItem({
  title,
  subtitle,
  leftIcon,
  rightIcon,
  pressable = false,
  onPress,
  style,
  contentStyle,
}: ListItemProps) {
  const Container = pressable ? TouchableOpacity : View;

  const renderIcon = (
    icon: NonNullable<ListItemProps["leftIcon"] | ListItemProps["rightIcon"]>
  ) => (
    <View style={icon === leftIcon ? styles.leftIcon : styles.rightIcon}>
      <IconComponent {...(icon as any)} />
    </View>
  );

  return (
    <Container
      style={[styles.itemContainer, style]}
      onPress={pressable ? onPress : undefined}
      activeOpacity={0.7}
    >
      {leftIcon && renderIcon(leftIcon)}
      <View style={[styles.contentContainer, contentStyle]}>
        <TextComponent weight="medium" size="base">
          {title}
        </TextComponent>
        {subtitle && (
          <TextComponent style={styles.subtitle} color="#666666" size="sm">
            {subtitle}
          </TextComponent>
        )}
      </View>
      {rightIcon && renderIcon(rightIcon)}
    </Container>
  );
}

export interface ListProps<T> extends Omit<FlatListProps<T>, "renderItem"> {
  /**
   * Data to render in the list
   */
  data: T[];

  /**
   * Function to render each item
   */
  renderItem: (item: T) => ListItemProps;

  /**
   * Whether to show a divider between items
   * @default true
   */
  showDivider?: boolean;

  /**
   * Color of the divider
   * @default '#E1E1E1'
   */
  dividerColor?: string;

  /**
   * Custom styles for the list container
   */
  containerStyle?: ViewStyle;
}

/**
 * A list component with consistent styling and item rendering
 *
 * @example
 * ```tsx
 * <List
 *   data={items}
 *   renderItem={(item) => ({
 *     title: item.name,
 *     subtitle: item.description,
 *     leftIcon: { name: item.icon, library: "Ionicons" }
 *   })}
 * />
 * ```
 */
export function List<T>({
  data,
  renderItem,
  showDivider = true,
  dividerColor = "#E1E1E1",
  containerStyle,
  ...restProps
}: ListProps<T>) {
  const renderListItem = ({ item }: { item: T }) => {
    const itemProps = renderItem(item);
    return <ListItem {...itemProps} />;
  };

  return (
    <FlatList
      data={data}
      renderItem={renderListItem}
      ItemSeparatorComponent={
        showDivider
          ? () => (
              <View
                style={[styles.divider, { backgroundColor: dividerColor }]}
              />
            )
          : undefined
      }
      style={[styles.list, containerStyle]}
      {...restProps}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  contentContainer: {
    flex: 1,
    marginLeft: 12,
  },
  subtitle: {
    marginTop: 4,
  },
  leftIcon: {
    marginRight: 12,
  },
  rightIcon: {
    marginLeft: 12,
  },
  divider: {
    height: 1,
    marginLeft: 16,
  },
});
