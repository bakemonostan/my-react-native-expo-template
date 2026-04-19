import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import IconComponent, { VectorIconSlotProps } from './IconComponent';
import PressableComponent from './PressableComponent';
import TextComponent from './TextComponent';

export interface EmptyStateProps {
  /**
   * Main heading text.
   * @default "Nothing here yet"
   */
  title?: string;

  /**
   * Supporting description below the title.
   */
  description?: string;

  /**
   * Optional icon displayed above the title.
   */
  icon?: VectorIconSlotProps;

  /**
   * Label for the optional action button.
   */
  actionLabel?: string;

  /**
   * Called when the action button is pressed.
   */
  onAction?: () => void;

  /**
   * Container style override.
   */
  style?: StyleProp<ViewStyle>;
}

/**
 * Generic empty state for lists, search results, and empty screens.
 *
 * @example Basic
 * ```tsx
 * <EmptyState
 *   title="No notifications"
 *   description="You're all caught up!"
 *   icon={{ name: "notifications-off", library: "Ionicons" }}
 * />
 * ```
 *
 * @example With action button
 * ```tsx
 * <EmptyState
 *   title="No items found"
 *   description="Try adding your first item."
 *   icon={{ name: "add-circle-outline", library: "Ionicons" }}
 *   actionLabel="Add item"
 *   onAction={() => navigation.navigate("AddItem")}
 * />
 * ```
 *
 * @example Search result
 * ```tsx
 * <EmptyState
 *   title="No results"
 *   description={`Nothing matched "${query}". Try a different search.`}
 *   icon={{ name: "search", library: "Feather" }}
 * />
 * ```
 */
export default function EmptyState({
  title = 'Nothing here yet',
  description,
  icon,
  actionLabel,
  onAction,
  style,
}: EmptyStateProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, style]}>
      {icon && (
        <View
          style={[
            styles.iconWrapper,
            { backgroundColor: colors.backgroundSecondary },
          ]}>
          <IconComponent
            {...icon}
            size={icon.size ?? 36}
            color={colors.textDim}
          />
        </View>
      )}

      <TextComponent
        weight='semi_bold'
        size='lg'
        color={colors.text}
        style={styles.title}>
        {title}
      </TextComponent>

      {description && (
        <TextComponent
          size='base'
          color={colors.textSecondary}
          style={styles.description}>
          {description}
        </TextComponent>
      )}

      {actionLabel && onAction && (
        <PressableComponent
          buttonText={actionLabel}
          onPress={onAction}
          variant='primary'
          size='base'
          style={styles.action}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 48,
  },
  iconWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  action: {
    minWidth: 160,
  },
});
