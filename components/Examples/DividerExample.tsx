import DividerComponent from "@/components/ui/DividerComponent";
import { Screen } from "@/components/ui/Screen";
import TextComponent from "@/components/ui/TextComponent";
import React from "react";
import { View } from "react-native";

export default function DividerExample() {
  return (
    <Screen safeAreaEdges={["bottom"]}>
      <View style={{ gap: 16 }}>
        <TextComponent size="lg" weight="bold">
          Divider Component
        </TextComponent>
        <View style={{ gap: 16 }}>
          <TextComponent>Above divider</TextComponent>
          <DividerComponent />
          <TextComponent>Below divider</TextComponent>
        </View>
      </View>
    </Screen>
  );
}
