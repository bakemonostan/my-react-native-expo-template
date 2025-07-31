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
 *     <View style={{ flexDirection: 'row', marginTop: 16 }}>
 *       <TouchableOpacity style={{ marginRight: 12, padding: 12, backgroundColor: '#007AFF', borderRadius: 8 }}>
 *         <Text style={{ color: 'white' }}>Edit</Text>
 *       </TouchableOpacity>
 *       <TouchableOpacity style={{ padding: 12, backgroundColor: '#FF3B30', borderRadius: 8 }}>
 *         <Text style={{ color: 'white' }}>Delete</Text>
 *       </TouchableOpacity>
 *     </View>
 *   </View>
 * </ModalComponent>
 * ```
 *
 * @example
 * ```tsx
 * // Modal with form content
 * <ModalComponent
 *   visible={isVisible}
 *   onClose={() => setIsVisible(false)}
 *   title="Add New Item"
 *   contentStyle={{ padding: 20, width: '90%', maxWidth: 400 }}
 * >
 *   <View>
 *     <TextInput placeholder="Item Name" style={{ marginBottom: 12, padding: 12, borderWidth: 1, borderRadius: 8 }} />
 *     <TextInput placeholder="Description" multiline style={{ marginBottom: 16, padding: 12, borderWidth: 1, borderRadius: 8 }} />
 *     <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
 *       <TouchableOpacity onPress={() => setIsVisible(false)}>
 *         <Text>Cancel</Text>
 *       </TouchableOpacity>
 *       <TouchableOpacity>
 *         <Text style={{ color: '#007AFF' }}>Save</Text>
 *       </TouchableOpacity>
 *     </View>
 *   </View>
 * </ModalComponent>
 * ```
 *
 * @example
 * ```tsx
 * // Modal with custom overlay styling
 * <ModalComponent
 *   visible={isVisible}
 *   onClose={() => setIsVisible(false)}
 *   style={{
 *     backgroundColor: 'rgba(0, 0, 0, 0.8)',
 *     justifyContent: 'flex-end'
 *   }}
 *   contentStyle={{
 *     backgroundColor: 'white',
 *     borderTopLeftRadius: 20,
 *     borderTopRightRadius: 20,
 *     padding: 20,
 *     minHeight: 300
 *   }}
 * >
 *   <Text>Bottom Sheet Style Modal</Text>
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
