import ImageComponent from "@/components/ui/ImageComponent";
import ResponsiveText from "@/components/ui/ResponsiveText";
import SafeAreaViewComponent from "@/components/ui/SafeAreaViewComponent";
import { Colors } from "@/constants/Colors";
import { PresetStyles } from "@/theme/presets";
import { View } from "react-native";

export default function TabOneScreen() {
  return (
    <SafeAreaViewComponent style={PresetStyles.screenContainer}>
      <View style={{ gap: 16, padding: 16 }}>
        <ResponsiveText size="lg" color={Colors.light.primary}>
          Hello
        </ResponsiveText>
        <ResponsiveText size="base" color={Colors.light.Alert}>
          To see examples of components, navigate to the components tab. We have
          a lot of components to show you. We have the following components: -
          Icons - Buttons - Inputs - Lists - Modals - Images - Texts - Safe
          Areas - and more! 😀😀
        </ResponsiveText>
        <ImageComponent
          source={require("@/assets/images/splash-icon.png")}
          showError={false}
          errorIconSize={0}
          errorIconColor="transparent"
          containerStyle={{ width: 100, height: 100 }}
        />
      </View>
    </SafeAreaViewComponent>
  );
}
