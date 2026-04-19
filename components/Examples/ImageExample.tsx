import ImageComponent from "@/components/ui/ImageComponent";
import { Screen } from "@/components/ui/Screen";
import TextComponent from "@/components/ui/TextComponent";
import React from "react";
import { View } from "react-native";

export default function ImageExample() {
  return (
    <Screen safeAreaEdges={["bottom"]}>
      <View style={{ gap: 16 }}>
        <TextComponent size="lg" weight="bold">
          Image Component
        </TextComponent>
        <View style={{ gap: 16 }}>
          <ImageComponent
            source={{ uri: "https://picsum.photos/200/300" }}
            imageStyle={{ width: 200, height: 200, borderRadius: 8 }}
          />
        </View>
      </View>
    </Screen>
  );
}
