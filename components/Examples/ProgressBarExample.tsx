import { ProgressBar } from "@/components/ui";
import { Screen } from "@/components/ui/Screen";
import TextComponent from "@/components/ui/TextComponent";
import { useTheme } from "@/hooks/useTheme";
import React, { useEffect, useState } from "react";
import { View } from "react-native";

export default function ProgressBarExample() {
  const { colors } = useTheme();
  const [pct, setPct] = useState(0.35);

  useEffect(() => {
    const id = setInterval(() => {
      setPct((p) => (p >= 1 ? 0 : Math.min(1, p + 0.08)));
    }, 800);
    return () => clearInterval(id);
  }, []);

  return (
    <Screen safeAreaEdges={["bottom"]}>
      <View style={{ gap: 24 }}>
        <TextComponent size="lg" weight="bold">
          Progress bar
        </TextComponent>

        <View style={{ gap: 8 }}>
          <TextComponent size="sm" color={colors.textSecondary}>
            Determinate + label
          </TextComponent>
          <ProgressBar progress={0.62} showLabel />
        </View>

        <View style={{ gap: 8 }}>
          <TextComponent size="sm" color={colors.textSecondary}>
            Animated (demo)
          </TextComponent>
          <ProgressBar progress={pct} showLabel height={10} />
        </View>

        <View style={{ gap: 8 }}>
          <TextComponent size="sm" color={colors.textSecondary}>
            Success color
          </TextComponent>
          <ProgressBar progress={0.9} color={colors.success} showLabel />
        </View>

        <View style={{ gap: 8 }}>
          <TextComponent size="sm" color={colors.textSecondary}>
            Indeterminate
          </TextComponent>
          <ProgressBar />
        </View>
      </View>
    </Screen>
  );
}
