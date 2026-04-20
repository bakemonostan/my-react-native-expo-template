/**
 * Example usage of Toggle components
 *
 * This file demonstrates how to use the project-agnostic Toggle components
 * (Switch, Checkbox, Radio) in your React Native application.
 */

import { useTheme } from "@/hooks/useTheme";
import React, { useState } from "react";
import { View } from "react-native";
import { Checkbox, Radio, Switch } from "./index";

// Example 1: Basic Switch
export function BasicSwitchExample() {
  const [enabled, setEnabled] = useState(false);

  return (
    <Switch
      value={enabled}
      onValueChange={setEnabled}
      label="Enable notifications"
      helper="You will receive push notifications"
    />
  );
}

// Example 2: Switch with error state
export function SwitchWithErrorExample() {
  const [enabled, setEnabled] = useState(false);

  return (
    <Switch
      value={enabled}
      onValueChange={setEnabled}
      label="Required setting"
      helper="This setting is required"
      status="error"
    />
  );
}

// Example 3: Basic Checkbox
export function BasicCheckboxExample() {
  const [agreed, setAgreed] = useState(false);

  return (
    <Checkbox
      value={agreed}
      onValueChange={setAgreed}
      label="I agree to the terms and conditions"
    />
  );
}

// Example 4: Multiple Checkboxes
export function MultipleCheckboxExample() {
  const [preferences, setPreferences] = useState({
    email: false,
    sms: false,
    push: false,
  });

  return (
    <View>
      <Checkbox
        value={preferences.email}
        onValueChange={(value) =>
          setPreferences({ ...preferences, email: value })
        }
        label="Email notifications"
      />
      <Checkbox
        value={preferences.sms}
        onValueChange={(value) =>
          setPreferences({ ...preferences, sms: value })
        }
        label="SMS notifications"
      />
      <Checkbox
        value={preferences.push}
        onValueChange={(value) =>
          setPreferences({ ...preferences, push: value })
        }
        label="Push notifications"
      />
    </View>
  );
}

// Example 5: Radio buttons
export function RadioButtonExample() {
  const [selected, setSelected] = useState<"option1" | "option2" | "option3">(
    "option1"
  );

  return (
    <View>
      <Radio
        value={selected === "option1"}
        onValueChange={() => setSelected("option1")}
        label="Option 1"
        helper="This is the first option"
      />
      <Radio
        value={selected === "option2"}
        onValueChange={() => setSelected("option2")}
        label="Option 2"
        helper="This is the second option"
      />
      <Radio
        value={selected === "option3"}
        onValueChange={() => setSelected("option3")}
        label="Option 3"
        helper="This is the third option"
      />
    </View>
  );
}

// Example 6: Disabled state
export function DisabledToggleExample() {
  return (
    <View>
      <Switch
        value={true}
        onValueChange={() => {}}
        label="Disabled switch"
        status="disabled"
      />
      <Checkbox
        value={true}
        onValueChange={() => {}}
        label="Disabled checkbox"
        status="disabled"
      />
      <Radio
        value={true}
        onValueChange={() => {}}
        label="Disabled radio"
        status="disabled"
      />
    </View>
  );
}

// Example 7: Label on left side
export function LeftLabelExample() {
  const [enabled, setEnabled] = useState(false);

  return (
    <Switch
      value={enabled}
      onValueChange={setEnabled}
      label="Enable dark mode"
      labelPosition="left"
    />
  );
}

// Example 8: Custom styling
export function CustomStyledExample() {
  const { colors } = useTheme();
  const [enabled, setEnabled] = useState(false);

  return (
    <Switch
      value={enabled}
      onValueChange={setEnabled}
      label="Custom styled switch"
      labelStyle={{ fontSize: 18, fontWeight: "bold" }}
      containerStyle={{
        padding: 16,
        backgroundColor: colors.backgroundSecondary,
        borderRadius: 8,
      }}
    />
  );
}
