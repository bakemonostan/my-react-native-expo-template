import IconComponent from "@/components/ui/IconComponent";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <IconComponent
              name="home"
              library="Ionicons"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          headerShown: false,
          title: "Two",
          tabBarIcon: ({ color, size }) => (
            <IconComponent
              name="list"
              library="Ionicons"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="components"
        options={{
          headerShown: false,
          title: "Components",
          tabBarIcon: ({ color, size }) => (
            <IconComponent
              name="apps"
              library="Ionicons"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}
