import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
 * A drawer component that provides a sliding panel from the edge of the screen
 *
 * @example
 * ```tsx
 * // Basic drawer usage
 * <DrawerComponent
 *   isOpen={drawerOpen}
 *   onToggle={setDrawerOpen}
 * >
 *   <View>
 *     <Text>Drawer Content</Text>
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
 *     <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Menu</Text>
 *     <TouchableOpacity onPress={() => console.log('Option 1')}>
 *       <Text>Option 1</Text>
 *     </TouchableOpacity>
 *     <TouchableOpacity onPress={() => console.log('Option 2')}>
 *       <Text>Option 2</Text>
 *     </TouchableOpacity>
 *   </View>
 * </DrawerComponent>
 */
export default function DrawerComponent({
  children,
  isOpen,
  onToggle,
}: DrawerComponentProps) {
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
          <Text style={styles.drawerItemText}>Close</Text>
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
        {/* Main content - no header */}
        <View style={styles.content}>{children}</View>
      </View>
    </Drawer>
  );
}

const styles = StyleSheet.create({
  drawer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  drawerContent: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
    paddingTop: 50, // Account for status bar
  },
  drawerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  drawerItem: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  drawerItemText: {
    fontSize: 16,
    color: "#333",
  },
  closeButton: {
    backgroundColor: "#007AFF",
    marginTop: 20,
  },
  mainContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
