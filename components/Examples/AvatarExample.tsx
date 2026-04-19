import AvatarComponent from "@/components/ui/AvatarComponent";
import { Screen } from "@/components/ui/Screen";
import TextComponent from "@/components/ui/TextComponent";
import React from "react";
import { View } from "react-native";

export default function AvatarExample() {
  return (
    <Screen safeAreaEdges={["bottom"]}>
      <View style={{ gap: 16 }}>
        <TextComponent size="lg" weight="bold">
          Avatar Component
        </TextComponent>
        <View style={{ flexDirection: "row", gap: 16 }}>
          <AvatarComponent
            size={40}
            source={{ uri: "https://i.pravatar.cc/150?img=1" }}
          />
          <AvatarComponent
            size={50}
            source={{ uri: "https://i.pravatar.cc/150?img=2" }}
          />
          <AvatarComponent
            size={60}
            source={{ uri: "https://i.pravatar.cc/150?img=3" }}
          />
        </View>
      </View>
    </Screen>
  );
}
