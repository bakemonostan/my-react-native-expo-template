import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import {
  Modal,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import PressableComponent from './PressableComponent';
import TextComponent from './TextComponent';

export interface ConfirmationDialogProps {
  /**
   * Whether the dialog is visible.
   */
  visible: boolean;

  /**
   * Dialog title.
   */
  title: string;

  /**
   * Descriptive message — explain the consequence of the action.
   */
  message: string;

  /**
   * Label for the confirm button.
   * @default "Confirm"
   */
  confirmLabel?: string;

  /**
   * Label for the cancel button.
   * @default "Cancel"
   */
  cancelLabel?: string;

  /**
   * Whether the action is destructive (confirm button renders in error/red).
   * @default false
   */
  destructive?: boolean;

  /**
   * Whether the confirm button is in a loading state.
   * @default false
   */
  loading?: boolean;

  /**
   * Called when the user taps the confirm button.
   */
  onConfirm: () => void;

  /**
   * Called when the user taps cancel or the backdrop.
   */
  onCancel: () => void;

  /**
   * Container style override for the dialog box.
   */
  style?: StyleProp<ViewStyle>;
}

/**
 * A modal confirmation dialog for destructive or important actions.
 *
 * @example Destructive delete confirmation
 * ```tsx
 * <ConfirmationDialog
 *   visible={showDelete}
 *   title="Delete account"
 *   message="This will permanently remove your account and all data. This cannot be undone."
 *   confirmLabel="Delete"
 *   destructive
 *   onConfirm={handleDelete}
 *   onCancel={() => setShowDelete(false)}
 * />
 * ```
 *
 * @example Standard confirm
 * ```tsx
 * <ConfirmationDialog
 *   visible={showConfirm}
 *   title="Submit application"
 *   message="Are you sure you want to submit? You cannot edit after submission."
 *   confirmLabel="Submit"
 *   onConfirm={handleSubmit}
 *   onCancel={() => setShowConfirm(false)}
 *   loading={isSubmitting}
 * />
 * ```
 */
export default function ConfirmationDialog({
  visible,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  destructive = false,
  loading = false,
  onConfirm,
  onCancel,
  style,
}: ConfirmationDialogProps) {
  const { colors } = useTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType='fade'
      onRequestClose={onCancel}>
      <Pressable
        style={[
          styles.backdrop,
          { backgroundColor: colors.palette.black, opacity: 0.5 },
        ]}
        onPress={onCancel}>
        <Pressable onPress={(e) => e.stopPropagation()}>
          <View
            style={[styles.dialog, { backgroundColor: colors.surface }, style]}>
            <TextComponent
              weight='bold'
              size='lg'
              color={colors.text}
              style={styles.title}>
              {title}
            </TextComponent>

            <TextComponent
              size='base'
              color={colors.textSecondary}
              style={styles.message}>
              {message}
            </TextComponent>

            <View
              style={[styles.divider, { backgroundColor: colors.border }]}
            />

            <View style={styles.actions}>
              <PressableComponent
                buttonText={cancelLabel}
                onPress={onCancel}
                variant='ghost'
                size='base'
                style={styles.cancelBtn}
              />
              <PressableComponent
                buttonText={confirmLabel}
                onPress={onConfirm}
                variant='primary'
                size='base'
                loading={loading}
                style={[
                  styles.confirmBtn,
                  destructive && { backgroundColor: colors.error },
                ]}
              />
            </View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  dialog: {
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 380,
  },
  title: {
    marginBottom: 10,
  },
  message: {
    lineHeight: 22,
    marginBottom: 24,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginBottom: 16,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelBtn: {
    flex: 1,
  },
  confirmBtn: {
    flex: 1,
  },
});
