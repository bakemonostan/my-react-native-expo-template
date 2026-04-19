import PressableComponent from "@/components/ui/PressableComponent";
import StateHandler from "@/components/ui/StateHandler";
import { Screen } from "@/components/ui/Screen";
import TextComponent from "@/components/ui/TextComponent";
import { useTheme } from "@/hooks/useTheme";
import React, { useState } from "react";
import { View } from "react-native";

type DemoPhase = "loading" | "error" | "empty" | "data";

export default function StateHandlerExample() {
  const { colors } = useTheme();
  const [phase, setPhase] = useState<DemoPhase>("loading");

  const isLoading = phase === "loading";
  const error = phase === "error" ? new Error("Something went wrong") : null;
  const data =
    phase === "data" ? ["Apple", "Banana", "Cherry"] : phase === "empty" ? [] : null;

  return (
    <Screen safeAreaEdges={["bottom"]}>
      <View style={{ gap: 16 }}>
        <TextComponent size="lg" weight="bold">
          State handler
        </TextComponent>
        <TextComponent size="sm" color={colors.textSecondary}>
          Tap a button to simulate loading, error, empty, or data.
        </TextComponent>

        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
          {(["loading", "error", "empty", "data"] as const).map((p) => (
            <PressableComponent
              key={p}
              size="sm"
              variant={phase === p ? "primary" : "outline"}
              buttonText={p}
              onPress={() => setPhase(p)}
            />
          ))}
        </View>

        <StateHandler
          isLoading={isLoading}
          error={error}
          data={data}
          onRetry={() => setPhase("loading")}
          empty={<TextComponent textAlign="center">No items (empty)</TextComponent>}
        >
          {(items) => (
            <View style={{ gap: 8 }}>
              {items.map((item) => (
                <TextComponent key={item}>• {item}</TextComponent>
              ))}
            </View>
          )}
        </StateHandler>
      </View>
    </Screen>
  );
}
