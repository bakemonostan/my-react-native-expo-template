import { useTheme } from "@/hooks/useTheme";
import React from "react";
import {
  Modal,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
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
   * Custom styles for the backdrop (merged with theme overlay)
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Custom styles for the sheet (merged with theme surface)
   */
  contentStyle?: StyleProp<ViewStyle>;
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
  const { colors } = useTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <Pressable
        style={[styles.overlay, { backgroundColor: colors.overlay }, style]}
        onPress={onClose}>
        <Pressable onPress={(e) => e.stopPropagation()}>
          <View
            style={[
              styles.content,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
              contentStyle,
            ]}>
            {title && (
              <TextComponent
                size="lg"
                weight="bold"
                color={colors.text}
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
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 20,
    width: "90%",
    maxWidth: 400,
  },
  title: {
    marginBottom: 16,
  },
});
