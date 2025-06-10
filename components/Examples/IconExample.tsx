import IconComponent from "@/components/ui/IconComponent";
import SafeAreaViewComponent from "@/components/ui/SafeAreaViewComponent";
import TextComponent from "@/components/ui/TextComponent";
import { Colors } from "@/constants/Colors";
import { PresetStyles } from "@/theme/presets";
import React from "react";
import { View } from "react-native";

export default function IconExample() {
  return (
    <SafeAreaViewComponent style={PresetStyles.screenContainer}>
      <View style={{ gap: 16, padding: 16 }}>
        <TextComponent size="lg" weight="bold">
          Icon Component
        </TextComponent>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 16 }}>
          <IconComponent
            name="woman-sharp"
            library="Ionicons"
            size={28}
            color={Colors.light.Wisteria}
          />
          <IconComponent
            name="star"
            library="FontAwesome"
            size={24}
            color={Colors.light.Alert}
          />
          <IconComponent
            name="heart"
            library="AntDesign"
            size={32}
            color="#255992"
          />
          <IconComponent
            name="heart"
            library="MaterialCommunityIcons"
            size={42}
            color="#aa26aa"
          />
          <IconComponent
            name="heart-broken"
            library="MaterialIcons"
            size={52}
            color="#3B30FF"
          />
          <IconComponent
            name="heart"
            library="Feather"
            size={62}
            color="#222222"
          />
          <IconComponent
            name="heart"
            library="Entypo"
            size={72}
            color={Colors.light.primary}
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
    </SafeAreaViewComponent>
  );
}
