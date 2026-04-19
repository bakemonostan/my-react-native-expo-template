import {
  AccordionExample,
  AlertExample,
  AvatarExample,
  BadgeExample,
  CardExample,
  ChipExample,
  ConfirmationDialogExample,
  DateTimePickerExample,
  DividerExample,
  EmptyStateExample,
  FileUploadExample,
  FormFieldExample,
  GradientExample,
  IconExample,
  ImageExample,
  ListExample,
  ModalExample,
  OTPInputExample,
  ProgressBarExample,
  RadioButtonCardExample,
  SelectExample,
  SkeletonExample,
  SliderExample,
  StateHandlerExample,
  TextAreaExample,
  TextInputExample,
  ToastExample,
  ToggleExample,
  ZodFormExample,
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
        name="Date & time"
        component={DateTimePickerExample}
        options={{
          drawerIcon: ({ color, size }) => (
            <IconComponent
              name="calendar-outline"
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
        name="Empty state"
        component={EmptyStateExample}
        options={{
          drawerIcon: ({ color, size }) => (
            <IconComponent
              name="albums-outline"
              library="Ionicons"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Form field"
        component={FormFieldExample}
        options={{
          drawerIcon: ({ color, size }) => (
            <IconComponent
              name="create-outline"
              library="Ionicons"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Form + Zod"
        component={ZodFormExample}
        options={{
          drawerIcon: ({ color, size }) => (
            <IconComponent
              name="shield-checkmark-outline"
              library="Ionicons"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Select"
        component={SelectExample}
        options={{
          drawerIcon: ({ color, size }) => (
            <IconComponent
              name="chevron-down-circle-outline"
              library="Ionicons"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Toast"
        component={ToastExample}
        options={{
          drawerIcon: ({ color, size }) => (
            <IconComponent
              name="chatbox-ellipses-outline"
              library="Ionicons"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Confirmation"
        component={ConfirmationDialogExample}
        options={{
          drawerIcon: ({ color, size }) => (
            <IconComponent
              name="help-circle-outline"
              library="Ionicons"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Chips"
        component={ChipExample}
        options={{
          drawerIcon: ({ color, size }) => (
            <IconComponent
              name="pricetag-outline"
              library="Ionicons"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Accordion"
        component={AccordionExample}
        options={{
          drawerIcon: ({ color, size }) => (
            <IconComponent
              name="newspaper-outline"
              library="Ionicons"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="OTP"
        component={OTPInputExample}
        options={{
          drawerIcon: ({ color, size }) => (
            <IconComponent
              name="keypad-outline"
              library="Ionicons"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Progress"
        component={ProgressBarExample}
        options={{
          drawerIcon: ({ color, size }) => (
            <IconComponent
              name="stats-chart-outline"
              library="Ionicons"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Text input"
        component={TextInputExample}
        options={{
          drawerIcon: ({ color, size }) => (
            <IconComponent
              name="text-outline"
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
        name="Sliders"
        component={SliderExample}
        options={{
          drawerIcon: ({ color, size }) => (
            <IconComponent
              name="reorder-three-outline"
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
