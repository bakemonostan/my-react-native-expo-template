import PressableComponent from "@/components/ui/PressableComponent";
import SafeAreaViewComponent from "@/components/ui/SafeAreaViewComponent";
import TextComponent from "@/components/ui/TextComponent";
import { useCounterStore } from "@/store/testStore/TestStore";
import { PresetStyles } from "@/theme/presets";
import React from "react";
import { View } from "react-native";

const StoreExampleScreen = () => {
  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((state) => state.increment);
  //reset the store
  const reset = useCounterStore((state) => state.reset);
  return (
    <SafeAreaViewComponent style={PresetStyles.screenContainer}>
      <View style={[PresetStyles.centerContainerStyle, { gap: 10 }]}>
        <TextComponent>
          Persistent Store Example with Zustand and AsyncStorage
        </TextComponent>
        <TextComponent>Count: {count}</TextComponent>
        <PressableComponent
          buttonText="Increment"
          onPress={increment}></PressableComponent>
        <PressableComponent
          buttonText="Reset"
          onPress={reset}></PressableComponent>
      </View>
    </SafeAreaViewComponent>
  );
};

export default StoreExampleScreen;
