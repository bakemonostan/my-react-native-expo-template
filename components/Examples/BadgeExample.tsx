import BadgeComponent from "@/components/ui/BadgeComponent";
import SafeAreaViewComponent from "@/components/ui/SafeAreaViewComponent";
import TextComponent from "@/components/ui/TextComponent";
import { PresetStyles } from "@/theme/presets";
import React from "react";
import { View } from "react-native";

export default function BadgeExample() {
  return (
    <SafeAreaViewComponent style={PresetStyles.screenContainer}>
      <View style={{ gap: 16, padding: 16 }}>
        <TextComponent size="lg" weight="bold">
          Badge Component
        </TextComponent>
        <View style={{ flexDirection: "row", gap: 16 }}>
          <BadgeComponent content="New" />
          <BadgeComponent content="Hot" backgroundColor="#FF3B30" />
          <BadgeComponent content="Sale" backgroundColor="#4CD964" />
        </View>
      </View>
    </SafeAreaViewComponent>
  );
}
