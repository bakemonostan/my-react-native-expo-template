# React Native Template

A comprehensive React Native template with a rich set of pre-built components, utilities, and best practices for building modern mobile applications.

## 🚀 Features

- **Component Library**: A rich set of pre-built, customizable components
- **TypeScript Support**: Full TypeScript integration for better development experience
- **Theme System**: Flexible theming with light/dark mode support
- **Responsive Design**: Built-in responsive utilities and components
- **Navigation**: Integrated with Expo Router for seamless navigation
- **Bottom Sheets**: Custom bottom sheet components with smooth animations
- **Form Handling**: Utilities for form data management
- **Authentication**: Google authentication integration
- **UI Components**: Extensive collection of UI components

## 📦 Component Library

### Core Components

- **AlertComponent**: Customizable alert messages with different variants
- **AvatarComponent**: User avatar display with fallback options
- **BadgeComponent**: Status indicators and notification badges
- **CardComponent**: Flexible card layouts with elevation and customization
- **DividerComponent**: Visual separators with customizable styles
- **IconComponent**: Multi-library icon support (Ionicons, FontAwesome, etc.)
- **ImageComponent**: Enhanced image component with loading and error states
- **ListComponents**: Flexible list implementations with various layouts
- **ModalComponent**: Custom modal dialogs with animations
- **PressableComponent**: Enhanced touchable components with variants
- **TextComponent**: Typography components with responsive scaling
- **TextInputComponent**: Enhanced input fields with validation

### Layout Components

- **SafeAreaViewComponent**: Safe area handling with customization
- **ScrollViewComponent**: Enhanced scroll views with customization
- **SimpleKeyboardAvoidingView**: Keyboard handling with customization
- **DrawerComponent**: Custom drawer implementation

## 🎨 Theme System

The template includes a comprehensive theme system with:

- **Colors**: Predefined color palettes
- **Typography**: Font scales and weights
- **Spacing**: Consistent spacing system
- **Borders & Shadows**: Reusable border and shadow styles
- **Component Dimensions**: Standardized component sizes
- **Layout Dimensions**: Responsive layout utilities
- **Touch Targets**: Accessibility-friendly touch areas

## 🛠️ Utilities

### Form Data Helpers

```typescript
// Append images to form data
appendImagesToFormData(formData, images, fieldName);

// Create form data from object
createFormData(data);

// Append array to form data
appendArrayToFormData(formData, fieldName, data);

// Append single image
appendSingleImageToFormData(formData, imageUri, fieldName);
```

### Scaling Utilities

```typescript
// Scale dimensions
scale(size);
vScale(size);
mScale(size, factor);
toDp(px);

// Apply opacity to colors
applyOpacity(hexColor, opacity);
```

## 📱 Navigation

The template uses Expo Router for navigation with:

- Tab-based navigation
- Drawer navigation
- Modal presentations
- Deep linking support

## 🔐 Authentication

Includes Google authentication integration with:

- OAuth flow handling
- Token management
- User session handling

## 🎯 Best Practices

- TypeScript for type safety
- Component composition
- Responsive design
- Accessibility considerations
- Performance optimization
- Code organization

## 📦 Installation

```bash
# Clone the repository
git clone [repository-url]

# Install dependencies
npm install

# Start the development server
npm start
```

## 🏗️ Project Structure

```
├── app/                    # Main application code
│   ├── (tabs)/            # Tab-based navigation
│   └── _layout.tsx        # Root layout
├── components/            # Reusable components
│   ├── ui/               # UI components
│   └── Examples/         # Component examples
├── constants/            # Constants and configurations
├── hooks/               # Custom React hooks
├── theme/               # Theme configurations
└── utils/              # Utility functions
```

## 🧪 Component Examples

The template includes example implementations for all components in the `components/Examples` directory, demonstrating:

- Basic usage
- Props customization
- Different variants
- Layout patterns
- Best practices

## 📚 Documentation

Each component and utility is documented with:

- TypeScript interfaces
- Prop descriptions
- Usage examples
- Best practices
- Performance considerations

## 📝 JSDoc Documentation

All components are thoroughly documented with JSDoc comments, providing:

- Detailed component descriptions
- Complete props interface documentation
- Default values and types
- Multiple usage examples
- TypeScript type definitions

Example of component documentation:

```tsx
/**
 * A customizable alert component with different variants and styling options
 *
 * @example
 * // Basic usage with variant
 * <AlertComponent
 *   variant="info"
 *   title="Information"
 *   message="This is an info alert"
 * />
 */
```

Every prop is documented with:

```tsx
interface AlertComponentProps {
  /**
   * Alert message
   */
  message: string;

  /**
   * Alert title
   */
  title?: string;

  /**
   * Visual variant of the alert
   * @default 'info'
   */
  variant?: AlertVariant;
}
```

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
