import BadgeComponent from "@/components/ui/BadgeComponent";
import { Screen } from "@/components/ui/Screen";
import TextComponent from "@/components/ui/TextComponent";
import React from "react";
import { View } from "react-native";

export default function BadgeExample() {
  return (
    <Screen safeAreaEdges={["bottom"]}>
      <View style={{ gap: 16 }}>
        <TextComponent size="lg" weight="bold">
          Badge Component
        </TextComponent>
        <View style={{ flexDirection: "row", gap: 16 }}>
          <BadgeComponent content="New" />
          <BadgeComponent content="Hot" backgroundColor="#FF3B30" />
          <BadgeComponent content="Sale" backgroundColor="#4CD964" />
        </View>
      </View>
    </Screen>
  );
}
