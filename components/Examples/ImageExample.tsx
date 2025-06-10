import ImageComponent from "@/components/ui/ImageComponent";
import SafeAreaViewComponent from "@/components/ui/SafeAreaViewComponent";
import TextComponent from "@/components/ui/TextComponent";
import { PresetStyles } from "@/theme/presets";
import React from "react";
import { View } from "react-native";

export default function ImageExample() {
  return (
    <SafeAreaViewComponent style={PresetStyles.screenContainer}>
      <View style={{ gap: 16, padding: 16 }}>
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
    </SafeAreaViewComponent>
  );
}
