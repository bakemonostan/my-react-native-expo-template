import IconComponent from "@/components/ui/IconComponent";
import { useTheme } from "@/hooks/useTheme";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

export default function TabLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: colors.border,
        },
        tabBarLabelStyle: { fontSize: 11 },
      }}>
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
      <Tabs.Screen
        name="querying/QueryingScreen"
        options={{
          headerShown: false,
          title: "Querying",
          tabBarIcon: ({ color, size }) => (
            <IconComponent
              name="search"
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
