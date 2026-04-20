import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useTheme } from "@/context/ThemeContext";
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
 * A list item component with consistent styling and flexible layout options.
 * 
 * ## Features
 * - **Flexible Layout**: Left/right icons, title, and subtitle support
 * - **Pressable Mode**: Optional touch interaction with callback
 * - **Icon Support**: Type-safe icon integration with all icon libraries
 * - **Custom Styling**: Override container and content styles
 * - **Type Safety**: TypeScript validates all icon names and props
 * - **Consistent Design**: Standardized list item appearance
 * 
 * ## Layout Options
 * - **Left Icon**: Icon displayed before title/subtitle
 * - **Right Icon**: Icon displayed after content
 * - **Title**: Primary text (required)
 * - **Subtitle**: Secondary text (optional)
 * - **Pressable**: Touch interaction with visual feedback
 *
 * @example
 * ```tsx
 * // Basic list item with icon
 * <ListItem
 *   title="Settings"
 *   subtitle="Manage your preferences"
 *   leftIcon={{ name: "settings", library: "Ionicons" }}
 *   pressable={true}
 *   onPress={() => {}}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // List item with right icon
 * <ListItem
 *   title="Notifications"
 *   subtitle="3 new messages"
 *   rightIcon={{ name: "chevron-forward", library: "Ionicons", color: "#666" }}
 *   pressable={true}
 *   onPress={() => navigation.navigate('Notifications')}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // List item with both icons
 * <ListItem
 *   title="Profile"
 *   subtitle="john@example.com"
 *   leftIcon={{ name: "person", library: "Ionicons", color: "#007AFF" }}
 *   rightIcon={{ name: "edit", library: "Ionicons", color: "#666" }}
 *   pressable={true}
 *   onPress={() => navigation.navigate('EditProfile')}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Non-pressable list item
 * <ListItem
 *   title="Version"
 *   subtitle="1.2.3"
 *   leftIcon={{ name: "information-circle", library: "Ionicons" }}
 *   pressable={false}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // List item with custom styling
 * <ListItem
 *   title="Custom Item"
 *   subtitle="With custom colors"
 *   leftIcon={{ name: "star", library: "Ionicons", color: "#FFD700" }}
 *   style={{ backgroundColor: '#F8F9FA', borderRadius: 8 }}
 *   contentStyle={{ marginLeft: 16 }}
 *   pressable={true}
 *   onPress={() => console.log('Custom item pressed')}
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
  const { colors } = useTheme();
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
      style={[styles.itemContainer, { backgroundColor: colors.surface }, style]}
      onPress={pressable ? onPress : undefined}
      activeOpacity={0.7}
    >
      {leftIcon && renderIcon(leftIcon)}
      <View style={[styles.contentContainer, contentStyle]}>
        <TextComponent weight="medium" size="base" color={colors.text}>
          {title}
        </TextComponent>
        {subtitle && (
          <TextComponent style={styles.subtitle} color={colors.textSecondary} size="sm">
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
   * @default theme **`colors.separator`**
   */
  dividerColor?: string;

  /**
   * Custom styles for the list container
   */
  containerStyle?: ViewStyle;
}

/**
 * A list component with consistent styling and item rendering using FlatList.
 * 
 * ## Features
 * - **FlatList Integration**: High-performance list rendering with virtualization
 * - **Flexible Data**: Accepts any data type with custom rendering function
 * - **Divider Support**: Optional dividers between list items
 * - **Custom Styling**: Override list container styles
 * - **Type Safety**: TypeScript validates data types and rendering functions
 * - **Performance Optimized**: Efficient rendering for large datasets
 * 
 * ## Rendering Pattern
 * - Uses renderItem function to convert data to ListItemProps
 * - Supports all FlatList props for advanced customization
 * - Automatic key generation and item separation
 *
 * @example
 * ```tsx
 * // Basic list with simple data
 * <List
 *   data={items}
 *   renderItem={(item) => ({
 *     title: item.name,
 *     subtitle: item.description,
 *     leftIcon: { name: item.icon, library: "Ionicons" }
 *   })}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // List with custom dividers and styling
 * <List
 *   data={menuItems}
 *   renderItem={(item) => ({
 *     title: item.title,
 *     subtitle: item.subtitle,
 *     leftIcon: { name: item.icon, library: "Ionicons", color: item.color },
 *     pressable: true,
 *     onPress: () => navigation.navigate(item.route)
 *   })}
 *   showDivider={true}
 *   dividerColor="#E5E5E5"
 *   containerStyle={{ backgroundColor: '#F8F9FA' }}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // List with complex data transformation
 * <List
 *   data={users}
 *   renderItem={(user) => ({
 *     title: `${user.firstName} ${user.lastName}`,
 *     subtitle: user.email,
 *     leftIcon: { 
 *       name: "person", 
 *       library: "Ionicons", 
 *       color: user.isOnline ? "#4CD964" : "#666" 
 *     },
 *     rightIcon: { name: "chevron-forward", library: "Ionicons" },
 *     pressable: true,
 *     onPress: () => navigation.navigate('UserProfile', { userId: user.id })
 *   })}
 *   showsVerticalScrollIndicator={false}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // List with FlatList props
 * <List
 *   data={notifications}
 *   renderItem={(notification) => ({
 *     title: notification.title,
 *     subtitle: notification.message,
 *     leftIcon: { 
 *       name: notification.type === 'error' ? 'alert-circle' : 'checkmark-circle',
 *       library: "Ionicons",
 *       color: notification.type === 'error' ? '#FF3B30' : '#4CD964'
 *     },
 *     pressable: true,
 *     onPress: () => handleNotificationPress(notification.id)
 *   })}
 *   refreshControl={
 *     <RefreshControl refreshing={loading} onRefresh={onRefresh} />
 *   }
 *   onEndReached={loadMoreNotifications}
 *   onEndReachedThreshold={0.1}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // List without dividers for compact design
 * <List
 *   data={settings}
 *   renderItem={(setting) => ({
 *     title: setting.name,
 *     subtitle: setting.description,
 *     leftIcon: { name: setting.icon, library: "Ionicons" },
 *     pressable: true,
 *     onPress: () => handleSettingPress(setting.key)
 *   })}
 *   showDivider={false}
 *   contentContainerStyle={{ paddingVertical: 8 }}
 * />
 * ```
 */
export function List<T>({
  data,
  renderItem,
  showDivider = true,
  dividerColor,
  containerStyle,
  ...restProps
}: ListProps<T>) {
  const { colors } = useTheme();
  const resolvedDividerColor = dividerColor ?? colors.separator;

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
                style={[styles.divider, { backgroundColor: resolvedDividerColor }]}
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
