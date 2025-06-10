import ModalComponent from "@/components/ui/ModalComponent";
import PressableComponent from "@/components/ui/PressableComponent";
import SafeAreaViewComponent from "@/components/ui/SafeAreaViewComponent";
import TextComponent from "@/components/ui/TextComponent";
import { PresetStyles } from "@/theme/presets";
import React, { useState } from "react";
import { View } from "react-native";

export default function ModalExample() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <SafeAreaViewComponent style={PresetStyles.screenContainer}>
      <View style={{ gap: 16, padding: 16 }}>
        <TextComponent size="lg" weight="bold">
          Modal Component
        </TextComponent>

        <PressableComponent
          variant="primary"
          btnLabel="Open Modal"
          onPress={() => setIsVisible(true)}
        />

        <ModalComponent
          visible={isVisible}
          onClose={() => setIsVisible(false)}
          title="Example Modal"
        >
          <View style={{ gap: 16 }}>
            <TextComponent>
              This is a modal example with a title and content.
            </TextComponent>
            <PressableComponent
              variant="secondary"
              btnLabel="Close"
              onPress={() => setIsVisible(false)}
            />
          </View>
        </ModalComponent>
      </View>
    </SafeAreaViewComponent>
  );
}
