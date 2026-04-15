import GradientView from "@/components/ui/GradientView";
import { Screen } from "@/components/ui/Screen";
import TextComponent from "@/components/ui/TextComponent";
import React from "react";
import { View } from "react-native";

export default function GradientExample() {
  return (
    <Screen safeAreaEdges={["top", "bottom"]} scrollable>
      <View style={{ gap: 24, padding: 16 }}>
        <TextComponent size="lg" weight="bold">
          Gradient border
        </TextComponent>

        <GradientView showBorder borderRadius={12} borderWidth={2}>
          <View style={{ padding: 16 }}>
            <TextComponent variant="body1Medium">
              Default gradient ring
            </TextComponent>
          </View>
        </GradientView>

        <GradientView
          showBorder
          borderRadius={16}
          colors={["#F97316", "#EC4899", "#8B5CF6"]}
        >
          <View style={{ padding: 20 }}>
            <TextComponent variant="body1Regular">
              Custom colors
            </TextComponent>
          </View>
        </GradientView>

        <GradientView showBorder={false} borderRadius={8} style={{ padding: 12 }}>
          <TextComponent size="sm">showBorder=false (plain rounded box)</TextComponent>
        </GradientView>
      </View>
    </Screen>
  );
}
