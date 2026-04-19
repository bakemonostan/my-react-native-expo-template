import GoBack from "@/components/ui/GoBack";
import TextComponent from "@/components/ui/TextComponent";
import { useTheme } from "@/hooks/useTheme";
import { StyleSheet, View } from "react-native";

export interface AuthHeaderProps {
  title: string;
  /** When `false`, shows a large left-aligned title (e.g. sign-in). */
  showBack?: boolean;
}

/**
 * Custom auth top bar (replaces the default stack header). Uses theme colors.
 */
export function AuthHeader({ title, showBack = true }: AuthHeaderProps) {
  const { colors } = useTheme();

  if (!showBack) {
    return (
      <View style={styles.block}>
        <TextComponent size="xxl" weight="bold" color={colors.text}>
          {title}
        </TextComponent>
        <View style={{ height: 12 }} />
      </View>
    );
  }

  return (
    <View style={styles.block}>
      <View style={styles.row}>
        <View style={styles.backSlot}>
          <GoBack />
        </View>
        <TextComponent
          numberOfLines={1}
          size="lg"
          weight="semi_bold"
          color={colors.text}
          style={styles.titleCenter}
        >
          {title}
        </TextComponent>
        <View style={styles.backSlot} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 44,
    justifyContent: "center",
  },
  backSlot: {
    width: 44,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  titleCenter: {
    flex: 1,
    textAlign: "center",
    paddingHorizontal: 8,
  },
});
