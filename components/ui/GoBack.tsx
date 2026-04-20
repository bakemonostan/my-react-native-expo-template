import { mScale } from "@/constants/mixins";
import { useTheme } from "@/hooks/useTheme";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import IconComponent from "./IconComponent";

export interface GoBackProps {
  /** Defaults to `router.back()` from `expo-router` */
  onPress?: () => void;
}

/**
 * Circular pressable chevron; default action navigates back via **`router.back()`**.
 *
 * @example Default
 * ```tsx
 * import GoBack from "@/components/ui/GoBack";
 *
 * <GoBack />
 * ```
 *
 * @example Custom handler
 * ```tsx
 * <GoBack onPress={() => navigation.navigate("Home")} />
 * ```
 */
const GoBack = ({
  onPress = () => {
    router.back();
  },
}: GoBackProps) => {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        { backgroundColor: colors.backgroundSecondary },
      ]}>
      <IconComponent
        library="Feather"
        name="chevron-left"
        size={20}
        color={colors.text}
      />
    </Pressable>
  );
};

export default GoBack;

const styles = StyleSheet.create({
  container: {
    width: mScale(32),
    height: mScale(32),
    borderRadius: mScale(16),
    alignItems: "center",
    justifyContent: "center",
  },
});
