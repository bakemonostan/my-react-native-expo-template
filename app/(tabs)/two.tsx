import TextComponent from '@/components/ui/TextComponent';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View } from 'react-native';

export default function TabTwoScreen() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      initialRouteName='Tab screen Two'
      screenOptions={{
        drawerType: 'slide',
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
