import { List } from "@/components/ui/ListComponents";
import SafeAreaViewComponent from "@/components/ui/SafeAreaViewComponent";
import TextComponent from "@/components/ui/TextComponent";
import { vScale } from "@/constants/mixins";
import { PresetStyles } from "@/theme/presets";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

type IconName = React.ComponentProps<typeof Ionicons>["name"];

interface ListItem {
  id: string;
  title: string;
  subtitle?: string;
  icon?: IconName;
  rightIcon?: IconName;
  badge?: string;
  time?: string;
}

type ExampleSection = {
  id: string;
  title: string;
  items: ListItem[];
};

export default function ListExample() {
  const settingsItems: ListItem[] = [
    { id: "1", title: "Account", icon: "person-outline" },
    { id: "2", title: "Notifications", icon: "notifications-outline" },
    { id: "3", title: "Privacy", icon: "lock-closed-outline" },
    { id: "4", title: "Help & Support", icon: "help-circle-outline" },
  ];

  const notificationItems: ListItem[] = [
    {
      id: "1",
      title: "New Message",
      subtitle: "You have a new message from John",
      icon: "mail-outline",
      time: "2m ago",
    },
    {
      id: "2",
      title: "Payment Received",
      subtitle: "Your payment of $50 has been received",
      icon: "cash-outline",
      time: "1h ago",
    },
    {
      id: "3",
      title: "System Update",
      subtitle: "New features are available",
      icon: "refresh-outline",
      time: "3h ago",
    },
  ];

  const socialItems: ListItem[] = [
    {
      id: "1",
      title: "John Doe",
      subtitle: "Just posted a new photo",
      icon: "person-circle-outline",
      time: "5m ago",
    },
    {
      id: "2",
      title: "Sarah Smith",
      subtitle: "Shared an article about React Native",
      icon: "person-circle-outline",
      time: "1h ago",
    },
    {
      id: "3",
      title: "Mike Johnson",
      subtitle: "Started following you",
      icon: "person-circle-outline",
      time: "2h ago",
    },
  ];

  const taskItems: ListItem[] = [
    {
      id: "1",
      title: "Complete Project Proposal",
      subtitle: "Due in 2 days",
      icon: "document-text-outline",
      badge: "High",
    },
    {
      id: "2",
      title: "Team Meeting",
      subtitle: "10:00 AM",
      icon: "people-outline",
      badge: "Medium",
    },
    {
      id: "3",
      title: "Review Code Changes",
      subtitle: "Due today",
      icon: "code-outline",
      badge: "Low",
    },
  ];

  const chatItems: ListItem[] = [
    {
      id: "1",
      title: "John Doe",
      subtitle: "Hey, how's it going?",
      icon: "person-circle-outline",
      time: "2m ago",
      badge: "2",
    },
    {
      id: "2",
      title: "Sarah Smith",
      subtitle: "Can we meet tomorrow?",
      icon: "person-circle-outline",
      time: "1h ago",
    },
    {
      id: "3",
      title: "Mike Johnson",
      subtitle: "Thanks for the help!",
      icon: "person-circle-outline",
      time: "3h ago",
    },
  ];

  const sections: ExampleSection[] = [
    {
      id: "settings",
      title: "Settings List",
      items: settingsItems,
    },
    {
      id: "notifications",
      title: "Notifications List",
      items: notificationItems,
    },
    {
      id: "social",
      title: "Social Media Feed",
      items: socialItems,
    },
    {
      id: "tasks",
      title: "Task List",
      items: taskItems,
    },
    {
      id: "chat",
      title: "Chat List",
      items: chatItems,
    },
  ];

  const renderItem = (item: ListItem) => ({
    title: item.title,
    subtitle: item.subtitle,
    leftIcon: item.icon
      ? { name: item.icon, library: "Ionicons" as const }
      : undefined,
    rightIcon: item.rightIcon
      ? { name: item.rightIcon, library: "Ionicons" as const }
      : undefined,
    badge: item.badge,
    time: item.time,
    pressable: true,
    onPress: () => console.log("Pressed:", item),
  });

  const renderSection = ({ item: section }: { item: ExampleSection }) => (
    <View style={styles.section}>
      <TextComponent size="base" weight="medium" style={styles.sectionTitle}>
        {section.title}
      </TextComponent>
      <List data={section.items} renderItem={renderItem} />
    </View>
  );

  return (
    <SafeAreaViewComponent
      style={PresetStyles.screenContainer}
      withEdges={false}
    >
      <View style={styles.container}>
        <TextComponent size="lg" weight="bold" style={styles.header}>
          List Examples
        </TextComponent>
        <FlatList
          data={sections}
          renderItem={renderSection}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaViewComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginBottom: vScale(16),
  },
  section: {
    marginBottom: vScale(24),
  },
  sectionTitle: {
    marginBottom: vScale(12),
  },
});
