import { ExternalPathString, Link, RelativePathString } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { Platform } from 'react-native';

/**
 * A component for handling external links with platform-specific behavior.
 *
 * ## Features
 * - **Platform Optimization**: Different behavior for web vs native platforms
 * - **In-App Browser**: Opens external links in app browser on native platforms
 * - **Web Compatibility**: Uses standard link behavior on web platform
 * - **Type Safety**: TypeScript validates all Link props
 * - **Seamless UX**: Prevents default browser opening on mobile
 *
 * ## Platform Behavior
 * - **Web**: Opens link in new tab/window (standard browser behavior)
 * - **Native**: Opens link in in-app browser using expo-web-browser
 *
 * @example
 * ```tsx
 * // Basic external link
 * <ExternalLink href="https://example.com">
 *   <Text>Visit our website</Text>
 * </ExternalLink>
 * ```
 *
 * @example
 * ```tsx
 * // External link with custom styling
 * <ExternalLink
 *   href="https://docs.expo.dev"
 *   style={{ color: '#007AFF', textDecorationLine: 'underline' }}
 * >
 *   <Text>Read the documentation</Text>
 * </ExternalLink>
 * ```
 *
 * @example
 * ```tsx
 * // External link with icon
 * <ExternalLink href="https://github.com/your-repo">
 *   <View style={{ flexDirection: 'row', alignItems: 'center' }}>
 *     <IconComponent name="logo-github" library="Ionicons" size={16} />
 *     <Text style={{ marginLeft: 8 }}>View on GitHub</Text>
 *   </View>
 * </ExternalLink>
 * ```
 *
 * @example
 * ```tsx
 * // External link in a button style
 * <ExternalLink href="https://support.example.com">
 *   <View style={{
 *     backgroundColor: '#007AFF',
 *     padding: 12,
 *     borderRadius: 8,
 *     alignItems: 'center'
 *   }}>
 *     <Text style={{ color: 'white', fontWeight: 'bold' }}>
 *       Get Help
 *     </Text>
 *   </View>
 * </ExternalLink>
 * ```
 *
 * @example
 * ```tsx
 * // External link with custom press handling
 * <ExternalLink
 *   href="https://example.com"
 *   onPress={(e) => {
 *     console.log('External link pressed');
 *     // Custom logic before opening link
 *   }}
 * >
 *   <Text>Custom link</Text>
 * </ExternalLink>
 * ```
 */
export function ExternalLink(
  props: Omit<React.ComponentProps<typeof Link>, 'href'> & { href: string },
) {
  return (
    <Link
      target='_blank'
      {...props}
      href={props.href as RelativePathString | ExternalPathString}
      onPress={(e) => {
        if (Platform.OS !== 'web') {
          // Prevent the default behavior of linking to the default browser on native.
          e.preventDefault();
          // Open the link in an in-app browser.
          WebBrowser.openBrowserAsync(props.href as string);
        }
      }}
    />
  );
}
