import GradientView from "@/components/ui/GradientView";
import { Screen } from "@/components/ui/Screen";
import TextComponent from "@/components/ui/TextComponent";
import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { View } from "react-native";

export default function GradientExample() {
  const { colors } = useTheme();
  return (
    <Screen safeAreaEdges={["bottom"]}>
      <View style={{ gap: 24 }}>
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
          colors={[
            colors.palette.warning500,
            colors.palette.error500,
            colors.palette.primary600,
          ]}
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
