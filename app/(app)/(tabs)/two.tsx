import { useTheme } from '@/context/ThemeContext';
import IconComponent from '@/components/ui/IconComponent';
import TextComponent from '@/components/ui/TextComponent';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { TouchableOpacity, View } from 'react-native';

function DrawerToggle() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      style={{ paddingHorizontal: 16 }}>
      <IconComponent name="menu" library="Ionicons" color={colors.text} size={24} />
    </TouchableOpacity>
  );
}

export default function TabTwoScreen() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      initialRouteName='Tab screen Two'
      screenOptions={{
        drawerType: 'slide',
        headerLeft: () => <DrawerToggle />,
      }}>
      <Drawer.Screen
        name='Tab screen Two'
        component={TabScreenTwo}
      />
    </Drawer.Navigator>
  );
}

const TabScreenTwo = () => {
  return (
    <View>
      <TextComponent>Hello I am using the card preset style 🎨</TextComponent>
      <TextComponent>And a fixed text component 💪🏾</TextComponent>
      <TextComponent>I am a responsive text component 👋🏾</TextComponent>
    </View>
  );
};
