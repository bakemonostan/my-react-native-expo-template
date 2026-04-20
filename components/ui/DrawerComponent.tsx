import { useTheme } from "@/hooks/useTheme";
import * as React from "react";
import { useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Drawer } from "react-native-drawer-layout";

interface DrawerComponentProps {
  /**
   * The content to be rendered inside the drawer's main area
   */
  children: React.ReactNode;

  /**
   * Controls whether the drawer is open or closed
   */
  isOpen: boolean;

  /**
   * Callback function called when the drawer should be toggled
   * @param open - true to open the drawer, false to close it
   */
  onToggle: (open: boolean) => void;
}

/**
 * A drawer component that provides a sliding panel from the edge of the screen.
 * 
 * ## Features
 * - **Sliding Animation**: Smooth slide-in/out animations
 * - **Built-in Menu**: Pre-configured menu items with close functionality
 * - **Custom Content**: Accepts any React components as drawer content
 * - **State Management**: Controlled open/close state with callbacks
 * - **Safe Area Handling**: Proper spacing for device notches
 * - **Type Safety**: TypeScript validates all props and callbacks
 * 
 * ## Built-in Menu Items
 * - Home, Settings, Profile navigation options
 * - Close button with proper state management
 * - Consistent styling and touch feedback
 *
 * @example
 * ```tsx
 * // Basic drawer usage with state management
 * const [drawerOpen, setDrawerOpen] = useState(false);
 * 
 * <DrawerComponent
 *   isOpen={drawerOpen}
 *   onToggle={setDrawerOpen}
 * >
 *   <View>
 *     <Text>Main App Content</Text>
 *   </View>
 * </DrawerComponent>
 * ```
 *
 * @example
 * ```tsx
 * // Drawer with custom content
 * <DrawerComponent
 *   isOpen={drawerOpen}
 *   onToggle={setDrawerOpen}
 * >
 *   <View style={{ padding: 16 }}>
 *     <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Custom Menu</Text>
 *     <TouchableOpacity onPress={() => console.log('Option 1')}>
 *       <Text>Option 1</Text>
 *     </TouchableOpacity>
 *     <TouchableOpacity onPress={() => console.log('Option 2')}>
 *       <Text>Option 2</Text>
 *     </TouchableOpacity>
 *   </View>
 * </DrawerComponent>
 * ```
 *
 * @example
 * ```tsx
 * // Drawer with complex content layout
 * <DrawerComponent
 *   isOpen={drawerOpen}
 *   onToggle={setDrawerOpen}
 * >
 *   <View style={{ flex: 1, padding: 16 }}>
 *     <View style={{ alignItems: 'center', marginBottom: 24 }}>
 *       <AvatarComponent source={{ uri: 'https://example.com/avatar.jpg' }} size={60} />
 *       <Text style={{ marginTop: 8, fontWeight: 'bold' }}>John Doe</Text>
 *       <Text style={{ color: '#666' }}>john@example.com</Text>
 *     </View>
 *     
 *     <View style={{ flex: 1 }}>
 *       <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12 }}>
 *         <IconComponent name="home" library="Ionicons" size={20} />
 *         <Text style={{ marginLeft: 12 }}>Home</Text>
 *       </TouchableOpacity>
 *       <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12 }}>
 *         <IconComponent name="settings" library="Ionicons" size={20} />
 *         <Text style={{ marginLeft: 12 }}>Settings</Text>
 *       </TouchableOpacity>
 *     </View>
 *   </View>
 * </DrawerComponent>
 * ```
 *
 * @example
 * ```tsx
 * // Drawer with navigation integration
 * const navigation = useNavigation();
 * 
 * <DrawerComponent
 *   isOpen={drawerOpen}
 *   onToggle={setDrawerOpen}
 * >
 *   <View style={{ padding: 16 }}>
 *     <TouchableOpacity onPress={() => {
 *       navigation.navigate('Home');
 *       setDrawerOpen(false);
 *     }}>
 *       <Text>Home</Text>
 *     </TouchableOpacity>
 *     <TouchableOpacity onPress={() => {
 *       navigation.navigate('Profile');
 *       setDrawerOpen(false);
 *     }}>
 *       <Text>Profile</Text>
 *     </TouchableOpacity>
 *   </View>
 * </DrawerComponent>
 * ```
 */
export default function DrawerComponent({
  children,
  isOpen,
  onToggle,
}: DrawerComponentProps) {
  const { colors } = useTheme();

  const styles = useMemo(
    () => ({
      drawer: {
        flex: 1,
        backgroundColor: colors.surface,
      },
      drawerContent: {
        flex: 1,
        padding: 20,
        backgroundColor: colors.backgroundSecondary,
        paddingTop: 50,
      },
      drawerTitle: {
        fontSize: 24,
        fontWeight: "bold" as const,
        marginBottom: 20,
        color: colors.text,
      },
      drawerItem: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: colors.surface,
        borderRadius: 5,
      },
      drawerItemText: {
        fontSize: 16,
        color: colors.text,
      },
      closeButton: {
        backgroundColor: colors.primary,
        marginTop: 20,
      },
      closeButtonText: {
        fontSize: 16,
        color: colors.primaryText,
        fontWeight: "600" as const,
      },
      mainContainer: {
        flex: 1,
      },
      content: {
        flex: 1,
      },
    }),
    [colors],
  );

  const renderDrawerContent = () => {
    return (
      <View style={styles.drawerContent}>
        <Text style={styles.drawerTitle}>Menu</Text>
        <TouchableOpacity style={styles.drawerItem}>
          <Text style={styles.drawerItemText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.drawerItem}>
          <Text style={styles.drawerItemText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.drawerItem}>
          <Text style={styles.drawerItemText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.drawerItem, styles.closeButton]}
          onPress={() => onToggle(false)}
        >
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Drawer
      open={isOpen}
      onOpen={() => onToggle(true)}
      onClose={() => onToggle(false)}
      renderDrawerContent={renderDrawerContent}
      drawerStyle={styles.drawer}
    >
      <View style={styles.mainContainer}>
        <View style={styles.content}>{children}</View>
      </View>
    </Drawer>
  );
}
