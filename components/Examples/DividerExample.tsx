import DividerComponent from "@/components/ui/DividerComponent";
import SafeAreaViewComponent from "@/components/ui/SafeAreaViewComponent";
import TextComponent from "@/components/ui/TextComponent";
import { PresetStyles } from "@/theme/presets";
import React from "react";
import { View } from "react-native";

export default function DividerExample() {
  return (
    <SafeAreaViewComponent style={PresetStyles.screenContainer}>
      <View style={{ gap: 16, padding: 16 }}>
        <TextComponent size="lg" weight="bold">
          Divider Component
        </TextComponent>
        <View style={{ gap: 16 }}>
          <TextComponent>Above divider</TextComponent>
          <DividerComponent />
          <TextComponent>Below divider</TextComponent>
        </View>
      </View>
    </SafeAreaViewComponent>
  );
}
