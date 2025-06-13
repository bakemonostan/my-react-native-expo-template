import SafeAreaViewComponent from "@/components/ui/SafeAreaViewComponent";
import TextComponent from "@/components/ui/TextComponent";
import { PresetStyles } from "@/theme/presets";
import { View } from "react-native";

const QueryingScreen = () => {
  return (
    <SafeAreaViewComponent style={PresetStyles.screenContainer}>
      <View style={[PresetStyles.centerContainerStyle, { gap: 10 }]}>
        <TextComponent style={{ textAlign: "center" }}>
          Querying and Data Fetching with React Query
        </TextComponent>
      </View>
    </SafeAreaViewComponent>
  );
};

export default QueryingScreen;
