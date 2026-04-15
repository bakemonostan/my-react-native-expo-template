import {
  AlertExample,
  AvatarExample,
  BadgeExample,
  CardExample,
  DividerExample,
  FileUploadExample,
  GradientExample,
  IconExample,
  ImageExample,
  ListExample,
  ModalExample,
  RadioButtonCardExample,
  SkeletonExample,
  StateHandlerExample,
  TextAreaExample,
  ToggleExample,
} from "@/components/Examples";
import { useTheme } from "@/context/ThemeContext";
import IconComponent from "@/components/ui/IconComponent";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity } from "react-native";

const Drawer = createDrawerNavigator();

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

export default function ComponentsScreen() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        headerTitle: "Components",
        headerLeft: () => <DrawerToggle />,
      }}>
      <Drawer.Screen
        name="Icons"
        component={IconExample}
        options={{
          drawerIcon: ({ color, size }) => (
            <IconComponent
              name="star"
              library="Ionicons"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Lists"
        component={ListExample}
        options={{
          drawerIcon: ({ color, size }) => (
            <IconComponent
              name="list"
              library="Ionicons"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Cards"
        component={CardExample}
        options={{
          drawerIcon: ({ color, size }) => (
            <IconComponent
              name="card"
              library="Ionicons"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Badges"
        component={BadgeExample}
        options={{
          drawerIcon: ({ color, size }) => (
            <IconComponent
              name="pricetag"
              library="Ionicons"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Avatars"
        component={AvatarExample}
        options={{
          drawerIcon: ({ color, size }) => (
            <IconComponent
              name="person"
              library="Ionicons"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Dividers"
        component={DividerExample}
        options={{
          drawerIcon: ({ color, size }) => (
            <IconComponent
              name="remove"
              library="Ionicons"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Images"
        component={ImageExample}
        options={{
          drawerIcon: ({ color, size }) => (
            <IconComponent
              name="image"
              library="Ionicons"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Modals"
        component={ModalExample}
        options={{
          drawerIcon: ({ color, size }) => (
            <IconComponent
              name="albums"
              library="Ionicons"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Alerts"
        component={AlertExample}
        options={{
          drawerIcon: ({ color, size }) => (
            <IconComponent
              name="notifications"
              library="Ionicons"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Toggles"
        component={ToggleExample}
        options={{
          drawerIcon: ({ color, size }) => (
            <IconComponent
              name="options-outline"
              library="Ionicons"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Text area"
        component={TextAreaExample}
        options={{
          drawerIcon: ({ color, size }) => (
            <IconComponent
              name="document-text-outline"
              library="Ionicons"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="File upload"
        component={FileUploadExample}
        options={{
          drawerIcon: ({ color, size }) => (
            <IconComponent
              name="cloud-upload-outline"
              library="Ionicons"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Gradient"
        component={GradientExample}
        options={{
          drawerIcon: ({ color, size }) => (
            <IconComponent
              name="color-filter-outline"
              library="Ionicons"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="State"
        component={StateHandlerExample}
        options={{
          drawerIcon: ({ color, size }) => (
            <IconComponent
              name="layers-outline"
              library="Ionicons"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Skeleton"
        component={SkeletonExample}
        options={{
          drawerIcon: ({ color, size }) => (
            <IconComponent
              name="pulse-outline"
              library="Ionicons"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Radio cards"
        component={RadioButtonCardExample}
        options={{
          drawerIcon: ({ color, size }) => (
            <IconComponent
              name="radio-button-on-outline"
              library="Ionicons"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
