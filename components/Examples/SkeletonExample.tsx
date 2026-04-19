import SkeletonComponent, {
  ANIMATION_DIRECTION,
  ANIMATION_TYPE,
} from "@/components/ui/SkeletonComponent";
import { Screen } from "@/components/ui/Screen";
import TextComponent from "@/components/ui/TextComponent";
import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { View } from "react-native";

export default function SkeletonExample() {
  const { colors } = useTheme();
  return (
    <Screen safeAreaEdges={["bottom"]}>
      <View style={{ gap: 24 }}>
        <TextComponent size="lg" weight="bold">
          Skeleton
        </TextComponent>

        <View style={{ gap: 8 }}>
          <TextComponent size="sm" color={colors.textSecondary}>
            Shimmer (default)
          </TextComponent>
          <SkeletonComponent height={20} rounded style={{ marginBottom: 4 }} />
          <SkeletonComponent width="90%" height={14} rounded />
          <SkeletonComponent width="60%" height={14} rounded />
        </View>

        <View style={{ gap: 8 }}>
          <TextComponent size="sm" color={colors.textSecondary}>
            Pulse
          </TextComponent>
          <SkeletonComponent
            height={48}
            rounded
            borderRadius={8}
            animationType={ANIMATION_TYPE.pulse}
          />
        </View>

        <View style={{ gap: 8 }}>
          <TextComponent size="sm" color={colors.textSecondary}>
            Avatar-ish
          </TextComponent>
          <SkeletonComponent
            width={56}
            height={56}
            rounded
            borderRadius={28}
            direction={ANIMATION_DIRECTION.leftToRight}
          />
        </View>
      </View>
    </Screen>
  );
}
