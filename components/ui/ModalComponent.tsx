import React from "react";
import { Modal, StyleSheet, View, ViewStyle } from "react-native";
import TextComponent from "./TextComponent";

export interface ModalComponentProps {
  /**
   * Whether the modal is visible
   */
  visible: boolean;

  /**
   * Callback when the modal should close
   */
  onClose: () => void;

  /**
   * Modal title
   */
  title?: string;

  /**
   * Modal content
   */
  children: React.ReactNode;

  /**
   * Custom styles for the modal container
   */
  style?: ViewStyle;

  /**
   * Custom styles for the content container
   */
  contentStyle?: ViewStyle;
}

/**
 * A customizable modal component with title and content
 *
 * @example
 * ```tsx
 * // Basic modal with title
 * <ModalComponent
 *   visible={isVisible}
 *   onClose={() => setIsVisible(false)}
 *   title="Confirmation"
 * >
 *   <Text>Are you sure you want to proceed?</Text>
 * </ModalComponent>
 * ```
 *
 * @example
 * ```tsx
 * // Custom styled modal
 * <ModalComponent
 *   visible={isVisible}
 *   onClose={() => setIsVisible(false)}
 *   style={{ backgroundColor: '#F5F5F5' }}
 *   contentStyle={{ padding: 20 }}
 * >
 *   <View>
 *     <Text>Custom styled content</Text>
 *   </View>
 * </ModalComponent>
 * ```
 */
export default function ModalComponent({
  visible,
  onClose,
  title,
  children,
  style,
  contentStyle,
}: ModalComponentProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={[styles.overlay, style]}>
        <View style={[styles.content, contentStyle]}>
          {title && (
            <TextComponent size="lg" weight="bold" style={styles.title}>
              {title}
            </TextComponent>
          )}
          {children}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    width: "90%",
    maxWidth: 400,
  },
  title: {
    marginBottom: 16,
  },
});
