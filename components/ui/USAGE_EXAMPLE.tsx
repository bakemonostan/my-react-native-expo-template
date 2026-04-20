/**
 * Usage examples for shared UI components.
 *
 * Copy these patterns to get started quickly.
 */

import { useTheme } from "@/hooks/useTheme";
import React, { useState } from "react";
import { View } from "react-native";
import {
  AlertComponent,
  AvatarComponent,
  BadgeComponent,
  FONT_FAMILY_MAP,
  IconComponent,
  ImageComponent,
  LoadingComponent,
  ModalComponent,
  PressableComponent,
  Screen,
  TextComponent,
  TextInputComponent,
} from "./index";

// ============================================
// STEP 1: Configure Fonts (Do this once in your app entry point)
// ============================================

// Option A: Use system fonts (default - no configuration needed)
// Components will use "System" font

// Option B: Use custom fonts
FONT_FAMILY_MAP.regular = "Inter-Regular";
FONT_FAMILY_MAP.medium = "Inter-Medium";
FONT_FAMILY_MAP.semi_bold = "Inter-SemiBold";
FONT_FAMILY_MAP.bold = "Inter-Bold";

// ============================================
// STEP 2: Use Components
// ============================================

export function ExampleScreen() {
  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Screen
      header={
        <View style={{ padding: 16 }}>
          <TextComponent
            weight="bold"
            size="xl">
            UI Components Demo
          </TextComponent>
        </View>
      }>
      {/* Text Components */}
      <TextComponent
        weight="bold"
        size="lg"
        color={colors.primary}>
        Basic Text Component
      </TextComponent>

      <TextComponent
        variant="h1"
        color={colors.text}>
        Responsive Heading
      </TextComponent>

      {/* Buttons */}
      <PressableComponent
        variant="primary"
        size="lg"
        buttonText="Primary Button"
        onPress={() => console.log("Pressed")}
      />

      <PressableComponent
        variant="secondary"
        buttonText="With Icon"
        leftAccessory={{
          library: "Ionicons",
          name: "heart",
          color: colors.primary,
        }}
        onPress={() => console.log("Pressed")}
      />

      {/* Alerts */}
      <AlertComponent
        variant="success"
        title="Success"
        message="Your action was completed successfully!"
      />

      <AlertComponent
        variant="error"
        message="Something went wrong"
        showIcon={true}
      />

      {/* Avatars */}
      <View style={{ flexDirection: "row", gap: 12 }}>
        <AvatarComponent
          initials="JD"
          size={40}
          backgroundColor={colors.primary}
        />

        <AvatarComponent
          source={{ uri: "https://example.com/avatar.jpg" }}
          size={60}
          bordered
        />
      </View>

      {/* Badges */}
      <View style={{ flexDirection: "row", gap: 12 }}>
        <BadgeComponent content="5" />
        <BadgeComponent
          content="New"
          backgroundColor={colors.success}
        />
        <BadgeComponent
          dot
          size="small"
        />
      </View>

      {/* Icons */}
      <View style={{ flexDirection: "row", gap: 12 }}>
        <IconComponent
          library="Ionicons"
          name="home"
          size={24}
          color={colors.primary}
        />
        <IconComponent
          library="Feather"
          name="search"
          size={24}
          color={colors.textSecondary}
        />
        <IconComponent
          library="MaterialIcons"
          name="settings"
          size={24}
        />
      </View>

      {/* Text Input */}
      <TextInputComponent
        placeholder="Enter your name"
        weight="medium"
        size="base"
        inputStyle={{
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: 8,
          padding: 12,
        }}
      />

      <TextInputComponent
        placeholder="Email"
        error="Please enter a valid email"
        inputStyle={{
          borderWidth: 1,
          borderRadius: 8,
          padding: 12,
        }}
      />

      {/* Loading */}
      <LoadingComponent message="Loading..." />

      {/* Image with loading/error states */}
      <ImageComponent
        source={{ uri: "https://example.com/image.jpg" }}
        imageStyle={{ width: 200, height: 200, borderRadius: 8 }}
        showLoading={true}
        showError={true}
      />

      {/* Modal Trigger */}
      <PressableComponent
        variant="outline"
        buttonText="Open Modal"
        onPress={() => setModalVisible(true)}
      />

      {/* Modal */}
      <ModalComponent
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Example Modal">
        <TextComponent>This is a modal. Tap outside to close.</TextComponent>

        <PressableComponent
          variant="primary"
          buttonText="Close"
          onPress={() => setModalVisible(false)}
          pressableStyle={{ marginTop: 16 }}
        />
      </ModalComponent>
    </Screen>
  );
}

// ============================================
// Common Patterns
// ============================================

// Form with validation
export function FormExample() {
  const { colors } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <Screen>
      <TextComponent
        weight="bold"
        size="xl"
        styles={{ marginBottom: 24 }}>
        Login
      </TextComponent>

      <TextInputComponent
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        inputStyle={{
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: 8,
          padding: 12,
          marginBottom: 16,
        }}
      />

      <TextInputComponent
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        error={error}
        inputStyle={{
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: 8,
          padding: 12,
          marginBottom: 16,
        }}
      />

      <PressableComponent
        variant="primary"
        size="lg"
        buttonText="Login"
        onPress={() => {
          if (!email || !password) {
            setError("Please fill in all fields");
          }
        }}
      />
    </Screen>
  );
}

// List with avatars and badges
export function ListExample() {
  const { colors } = useTheme();
  const users = [
    { id: 1, name: "John Doe", initials: "JD", unread: 3 },
    { id: 2, name: "Jane Smith", initials: "JS", unread: 0 },
  ];

  return (
    <Screen>
      {users.map((user) => (
        <PressableComponent
          key={user.id}
          variant="ghost"
          pressableStyle={{
            flexDirection: "row",
            alignItems: "center",
            padding: 12,
          }}
          onPress={() => console.log("User pressed:", user.name)}>
          <AvatarComponent
            initials={user.initials}
            size={48}
            backgroundColor={colors.primary}
          />

          <TextComponent
            weight="medium"
            size="base"
            styles={{ flex: 1, marginLeft: 12 }}>
            {user.name}
          </TextComponent>

          {user.unread > 0 && <BadgeComponent content={user.unread} />}
        </PressableComponent>
      ))}
    </Screen>
  );
}
