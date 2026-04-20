import { mScale } from '@/constants/mixins';
import { useTheme } from '@/hooks/useTheme';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import GoBack from './GoBack';
import TextComponent from './TextComponent';

/**
 * Top bar with back (**`GoBack`**), centered **`title`** / optional **`description`**, and optional **`rightItem`**.
 * Defaults use **`useTheme().colors`** — override with **`backgroundColor`** / **`titleColor`** when needed.
 *
 * @example Stack screen header
 * ```tsx
 * import Header from "@/components/ui/Header";
 *
 * <Header title="Settings" description="Account" />
 * ```
 *
 * @example Custom back handler
 * ```tsx
 * <Header title="Edit" onPress={() => router.push("/")} />
 * ```
 */
export interface HeaderProps {
  title?: string;
  description?: string;
  backgroundColor?: string;
  withChild?: boolean;
  children?: React.ReactNode;
  onPress?: () => void;
  paddingTop?: number;
  rightItem?: React.ReactNode;
  titleColor?: string;
}

const Header = ({
  title,
  description,
  backgroundColor,
  withChild,
  children,
  onPress,
  rightItem,
  titleColor,
}: HeaderProps) => {
  const { colors } = useTheme();
  const headerBg = backgroundColor ?? colors.surface;
  const headerTitleColor = titleColor ?? colors.text;

  const handleBack = () => {
    if (onPress) {
      onPress();
    } else {
      router.back();
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: headerBg }]}>
      <GoBack onPress={handleBack} />
      <View style={styles.titleContainer}>
        <TextComponent
          text={title}
          variant='h4'
          weight='bold'
          color={headerTitleColor}
        />
        {description && (
          <TextComponent
            text={description}
            variant='body2Regular'
            color={colors.textSecondary}
            style={styles.description}
          />
        )}
      </View>
      {rightItem ? (
        <View style={styles.rightItemContainer}>{rightItem}</View>
      ) : (
        <View style={styles.placeholder} />
      )}
      {withChild && <View style={styles.childContainer}>{children}</View>}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: mScale(0),
    paddingVertical: mScale(12),
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    marginLeft: mScale(10),
  },
  description: {
    marginTop: mScale(4),
  },
  rightItemContainer: {
    minWidth: mScale(32),
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  placeholder: {
    width: mScale(32),
  },
  childContainer: {
    width: '100%',
    marginTop: mScale(12),
  },
});
