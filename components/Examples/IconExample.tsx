import IconComponent from "@/components/ui/IconComponent";
import { Screen } from "@/components/ui/Screen";
import TextComponent from "@/components/ui/TextComponent";
import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { View } from "react-native";

export default function IconExample() {
  const { colors } = useTheme();

  return (
    <Screen safeAreaEdges={["bottom"]}>
      <View style={{ gap: 16 }}>
        <TextComponent
          size="lg"
          weight="bold">
          Icon Component
        </TextComponent>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 16 }}>
          <IconComponent
            name="woman-sharp"
            library="Ionicons"
            size={28}
            color={colors.error}
          />
          <IconComponent
            name="star"
            library="FontAwesome"
            size={24}
            color={colors.error}
          />
          <IconComponent
            name="heart"
            library="AntDesign"
            size={32}
            color={colors.primary}
          />
          <IconComponent
            name="heart"
            library="MaterialCommunityIcons"
            size={42}
            color={colors.warning}
          />
          <IconComponent
            name="heart-broken"
            library="MaterialIcons"
            size={52}
            color={colors.tint}
          />
          <IconComponent
            name="heart"
            library="Feather"
            size={62}
            color={colors.text}
          />
          <IconComponent
            name="heart"
            library="Entypo"
            size={72}
            color={colors.error}
          />
          <IconComponent
            source={require("@/assets/images/react-logo.png")}
            library="custom"
            size={82}
          />
          <IconComponent
            source={require("@/assets/images/splash-icon.png")}
            library="custom"
            size={92}
          />
        </View>
      </View>
    </Screen>
  );
}
