import React from "react";
import { Modal, Pressable, StyleSheet, View, ViewStyle } from "react-native";
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
 * A customizable modal component with title and content overlay.
 *
 * ## Features
 * - **Overlay Background**: Semi-transparent backdrop with fade animation
 * - **Flexible Content**: Accepts any React components as modal content
 * - **Custom Styling**: Override container and content styles
 * - **Title Support**: Optional title with consistent styling
 * - **Close Handling**: Proper callback management for modal dismissal
 * - **Type Safety**: TypeScript validates all props and callbacks
 *
 * ## Animation
 * - Fade-in/out animation for smooth user experience
 * - Backdrop press to close functionality
 * - Hardware back button support on Android
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
 * // Modal without title
 * <ModalComponent
 *   visible={isVisible}
 *   onClose={() => setIsVisible(false)}
 * >
 *   <View style={{ alignItems: 'center' }}>
 *     <Text>This modal has no title</Text>
 *     <TouchableOpacity onPress={() => setIsVisible(false)}>
 *       <Text>Close</Text>
 *     </TouchableOpacity>
 *   </View>
 * </ModalComponent>
 * ```
 *
 * @example
 * ```tsx
 * // Custom styled modal with complex content
 * <ModalComponent
 *   visible={isVisible}
 *   onClose={() => setIsVisible(false)}
 *   title="User Profile"
 *   style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
 *   contentStyle={{ padding: 24, borderRadius: 16 }}
 * >
 *   <View style={{ alignItems: 'center' }}>
 *     <AvatarComponent source={{ uri: 'https://example.com/avatar.jpg' }} size={80} />
 *     <Text style={{ marginTop: 16, fontSize: 18, fontWeight: 'bold' }}>John Doe</Text>
 *     <Text style={{ marginTop: 8, color: '#666' }}>Software Engineer</Text>
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
      onRequestClose={onClose}>
      <Pressable
        style={[styles.overlay, style]}
        onPress={onClose}>
        <Pressable onPress={(e) => e.stopPropagation()}>
          <View style={[styles.content, contentStyle]}>
            {title && (
              <TextComponent
                size="lg"
                weight="bold"
                style={styles.title}>
                {title}
              </TextComponent>
            )}
            {children}
          </View>
        </Pressable>
      </Pressable>
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
