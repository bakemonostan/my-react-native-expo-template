import { FormField } from "@/components/ui";
import { Screen } from "@/components/ui/Screen";
import TextComponent from "@/components/ui/TextComponent";
import { useTheme } from "@/hooks/useTheme";
import React, { useState } from "react";
import { View } from "react-native";

export default function FormFieldExample() {
  const { colors } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Screen safeAreaEdges={["bottom"]}>
      <View style={{ gap: 20 }}>
        <TextComponent size="lg" weight="bold">
          Form field
        </TextComponent>

        <FormField
          label="Email"
          required
          placeholder="you@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
          leftIcon={{ name: "mail-outline", library: "Ionicons" }}
        />

        <FormField
          label="Password"
          placeholder="••••••••"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          leftIcon={{ name: "lock-closed-outline", library: "Ionicons" }}
          rightIcon={{
            name: showPassword ? "eye-off-outline" : "eye-outline",
            library: "Ionicons",
          }}
          onRightIconPress={() => setShowPassword((v) => !v)}
          error={
            password.length > 0 && password.length < 8
              ? "Use at least 8 characters."
              : undefined
          }
          helper="Use a mix of letters and numbers."
        />

        <TextComponent size="sm" color={colors.textSecondary}>
          Toggle the eye icon to show or hide the password.
        </TextComponent>
      </View>
    </Screen>
  );
}
