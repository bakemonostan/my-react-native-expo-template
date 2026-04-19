/**
 * Golden-path pattern: **Zod** schema + **`FormField`** + submit + per-field errors (no `react-hook-form`).
 * Map `safeParse` failures with `flatten().fieldErrors` into `FormField` `error` props.
 */
import { FormField, PressableComponent } from "@/components/ui";
import { Screen } from "@/components/ui/Screen";
import TextComponent from "@/components/ui/TextComponent";
import { useTheme } from "@/hooks/useTheme";
import { useToast } from "@/hooks/useToast";
import React, { useCallback, useState } from "react";
import { View } from "react-native";
import { z } from "zod";

const profileSchema = z.object({
  email: z.string().min(1, "Required").email("Enter a valid email"),
  password: z
    .string()
    .min(1, "Required")
    .min(8, "Use at least 8 characters"),
});

type FieldKey = "email" | "password";

export default function ZodFormExample() {
  const { colors } = useTheme();
  const { success } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});

  const clearFieldError = (key: FieldKey) => {
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const onSubmit = useCallback(() => {
    const result = profileSchema.safeParse({ email: email.trim(), password });
    if (!result.success) {
      const fe = result.error.flatten().fieldErrors;
      setErrors({
        email: fe.email?.[0],
        password: fe.password?.[0],
      });
      return;
    }
    setErrors({});
    success("Valid", "Schema passed — wire this handler to your API.");
  }, [email, password, success]);

  return (
    <Screen safeAreaEdges={["bottom"]}>
      <View style={{ gap: 20 }}>
        <TextComponent size="lg" weight="bold">
          Form + Zod
        </TextComponent>
        <TextComponent size="sm" color={colors.textSecondary}>
          Submit runs `profileSchema.safeParse(...)`. Errors come from
          `flatten().fieldErrors` and feed each `FormField` `error` prop.
        </TextComponent>

        <FormField
          label="Email"
          required
          placeholder="you@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={(t) => {
            setEmail(t);
            clearFieldError("email");
          }}
          error={errors.email}
        />

        <FormField
          label="Password"
          placeholder="••••••••"
          secureTextEntry
          value={password}
          onChangeText={(t) => {
            setPassword(t);
            clearFieldError("password");
          }}
          error={errors.password}
          helper="Minimum 8 characters for this demo schema."
        />

        <PressableComponent buttonText="Validate with Zod" onPress={onSubmit} />
      </View>
    </Screen>
  );
}
