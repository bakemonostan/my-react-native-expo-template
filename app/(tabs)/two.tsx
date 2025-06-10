import ResponsiveText from "@/components/ui/ResponsiveText";
import TextComponent from "@/components/ui/TextComponent";
import { View } from "@/components/ui/Themed";
import { Colors } from "@/constants/Colors";
import { PresetStyles } from "@/theme/presets";
import { createDrawerNavigator } from "@react-navigation/drawer";

export default function TabTwoScreen() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      initialRouteName="Tab screen Two"
      screenOptions={{
        drawerType: "slide",
      }}
    >
      <Drawer.Screen name="Tab screen Two" component={TabScreenTwo} />
    </Drawer.Navigator>
  );
}

const TabScreenTwo = () => {
  return (
    <View style={PresetStyles.screenContainer}>
      <View style={PresetStyles.card}>
        <TextComponent>Hello I am using the card preset style 🎨</TextComponent>
        <TextComponent>And a fixed text component 💪🏾</TextComponent>
        <ResponsiveText size="base" color={Colors.light.primary}>
          I am a responsive text component 👋🏾
        </ResponsiveText>
      </View>
    </View>
  );
};
