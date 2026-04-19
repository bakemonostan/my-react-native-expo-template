import { useTheme } from "@/context/ThemeContext";
import React, { useState } from "react";
import {
  LayoutAnimation,
  Platform,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  UIManager,
  View,
  ViewStyle,
} from "react-native";
import IconComponent from "./IconComponent";
import TextComponent from "./TextComponent";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

export interface AccordionItem {
  /** Unique key for the item. */
  key: string;
  /** Header / trigger text. */
  title: string;
  /** Expandable content. Can be a string or any React node. */
  content: React.ReactNode | string;
  /** Whether this item starts expanded. @default false */
  defaultOpen?: boolean;
}

export interface AccordionComponentProps {
  /**
   * Array of accordion sections.
   */
  items: AccordionItem[];

  /**
   * Whether only one item can be open at a time.
   * @default false
   */
  singleOpen?: boolean;

  /**
   * Container style override.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Style override for each item's outer wrapper.
   */
  itemStyle?: StyleProp<ViewStyle>;
}

/**
 * A grouped expand/collapse accordion — theme-aware, animated.
 *
 * @example FAQ section
 * ```tsx
 * <AccordionComponent
 *   items={[
 *     { key: "1", title: "What is this?", content: "This is the answer." },
 *     { key: "2", title: "How does it work?", content: "Here's how it works..." },
 *   ]}
 *   singleOpen
 * />
 * ```
 *
 * @example Settings section with React Node content
 * ```tsx
 * <AccordionComponent
 *   items={[
 *     {
 *       key: "notifications",
 *       title: "Notifications",
 *       content: <NotificationSettings />,
 *       defaultOpen: true,
 *     },
 *   ]}
 * />
 * ```
 */
export default function AccordionComponent({
  items,
  singleOpen = false,
  style,
  itemStyle,
}: AccordionComponentProps) {
  const { colors } = useTheme();

  const initialOpen = new Set(
    items.filter((i) => i.defaultOpen).map((i) => i.key)
  );
  const [openKeys, setOpenKeys] = useState<Set<string>>(initialOpen);

  const toggle = (key: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        if (singleOpen) next.clear();
        next.add(key);
      }
      return next;
    });
  };

  return (
    <View style={[styles.container, style]}>
      {items.map((item, index) => {
        const isOpen = openKeys.has(item.key);
        const isLast = index === items.length - 1;

        return (
          <View
            key={item.key}
            style={[
              styles.item,
              {
                borderColor: colors.border,
                backgroundColor: colors.surface,
                borderBottomWidth: isLast ? 1 : 0,
              },
              index === 0 && styles.firstItem,
              isLast && styles.lastItem,
              itemStyle,
            ]}
          >
            <TouchableOpacity
              onPress={() => toggle(item.key)}
              activeOpacity={0.7}
              style={[styles.header, { borderBottomColor: colors.border }]}
            >
              <TextComponent
                weight="medium"
                size="base"
                color={colors.text}
                style={styles.headerText}
              >
                {item.title}
              </TextComponent>
              <IconComponent
                name={isOpen ? "chevron-up" : "chevron-down"}
                library="Feather"
                size={18}
                color={colors.textSecondary}
              />
            </TouchableOpacity>

            {isOpen && (
              <View style={[styles.content, { borderTopColor: colors.border }]}>
                {typeof item.content === "string" ? (
                  <TextComponent size="base" color={colors.textSecondary} style={styles.contentText}>
                    {item.content}
                  </TextComponent>
                ) : (
                  item.content
                )}
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  item: {
    borderWidth: 1,
    borderBottomWidth: 0,
    overflow: "hidden",
  },
  firstItem: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  lastItem: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomWidth: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  headerText: {
    flex: 1,
  },
  content: {
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  contentText: {
    lineHeight: 22,
  },
});
