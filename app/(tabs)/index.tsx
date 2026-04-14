import ResponsiveText from "@/components/ui/ResponsiveText";
import SafeAreaViewComponent from "@/components/ui/SafeAreaViewComponent";
import { useTheme } from "@/hooks/useTheme";
import { PresetStyles } from "@/theme/presets";
import { View } from "react-native";

export default function TabOneScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaViewComponent
      style={[PresetStyles.screenContainer, { backgroundColor: colors.background }]}>
      <View style={{ gap: 16, padding: 16 }}>
        <ResponsiveText size="xl" weight="bold" color={colors.text}>
          Welcome
        </ResponsiveText>
        <ResponsiveText size="base" color={colors.text}>
          This is your starting screen. Replace this content with your app's home view.
        </ResponsiveText>
        <ResponsiveText size="sm" color={colors.textSecondary}>
          Browse the Components tab to explore the available UI primitives.
        </ResponsiveText>
      </View>
    </SafeAreaViewComponent>
  );
}
