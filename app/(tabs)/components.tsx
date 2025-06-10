import AlertExample from "@/components/Examples/AlertExample";
import AvatarExample from "@/components/Examples/AvatarExample";
import BadgeExample from "@/components/Examples/BadgeExample";
import CardExample from "@/components/Examples/CardExample";
import DividerExample from "@/components/Examples/DividerExample";
import IconExample from "@/components/Examples/IconExample";
import ImageExample from "@/components/Examples/ImageExample";
import ListExample from "@/components/Examples/ListExample";
import ModalExample from "@/components/Examples/ModalExample";
import IconComponent from "@/components/ui/IconComponent";
import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";

const Drawer = createDrawerNavigator();

export default function ComponentsScreen() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        headerTitle: "Components",
      }}
    >
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
    </Drawer.Navigator>
  );
}
