import ResponsiveText from "@/components/ui/ResponsiveText";
import SafeAreaViewComponent from "@/components/ui/SafeAreaViewComponent";
import { colors } from "@/constants/Colors";
import { PresetStyles } from "@/theme/presets";
import { View } from "react-native";

export default function TabOneScreen() {
  return (
    <SafeAreaViewComponent style={PresetStyles.screenContainer}>
      <View style={{ gap: 16, padding: 16 }}>
        <ResponsiveText size="xl" weight="bold" color={colors.text}>
          Welcome
        </ResponsiveText>
        <ResponsiveText size="base" color={colors.text}>
          This is your starting screen. Replace this content with your app's home view.
        </ResponsiveText>
        <ResponsiveText size="sm" color={colors.text}>
          Browse the Components tab to explore the available UI primitives.
        </ResponsiveText>
      </View>
    </SafeAreaViewComponent>
  );
}
