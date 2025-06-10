import PressableComponent from "@/components/ui/PressableComponent";
import ResponsiveText from "@/components/ui/ResponsiveText";
import SafeAreaViewComponent from "@/components/ui/SafeAreaViewComponent";
import { PresetStyles } from "@/theme/presets";
import { useRouter } from "expo-router";
import { View } from "react-native";

export default function Index() {
  const router = useRouter();
  return (
    <SafeAreaViewComponent style={PresetStyles.screenContainer}>
      <View
        style={{
          gap: 10,
          justifyContent: "center",
          flex: 1,
        }}
      >
        <ResponsiveText size="lg">
          Edit app/index.tsx to edit this screen.
        </ResponsiveText>
        <PressableComponent
          onPress={() => router.push("/Modal")}
          btnLabel="Show Modal"
        />
        <PressableComponent
          variant="secondary"
          onPress={() => router.push("/(tabs)")}
          btnLabel="Go to Tabs screen"
        />
      </View>
    </SafeAreaViewComponent>
  );
}
