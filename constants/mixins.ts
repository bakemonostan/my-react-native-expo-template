import { Dimensions, PixelRatio } from 'react-native';

// Get fresh dimensions every time
function getWidth() {
  return Dimensions.get('window').width;
}

function getHeight() {
  return Dimensions.get('window').height;
}

// Check if device is a tablet
function isTablet() {
  const width = getWidth();
  const height = getHeight();
  const aspectRatio = height / width;
  // Tablets usually have width >= 600 and aspect ratio closer to 4:3 or 16:10
  return width >= 600 || (width >= 500 && aspectRatio < 1.6);
}

// Get dynamic base dimensions based on current screen size
function getBaseWidth() {
  // For tablets, use a reasonable base width to prevent over-scaling
  if (isTablet()) {
    return 600;
  }
  return 390; // iPhone 12/13/14 base
}

function getBaseHeight() {
  if (isTablet()) {
    return 1024;
  }
  return 844; // iPhone 12/13/14 base
}

function scale(size: number): number {
  if (isTablet()) {
    // For tablets, limit scaling to prevent UI from being too large
    const maxScale = 1.3;
    const calculatedScale = getWidth() / getBaseWidth();
    return size * Math.min(calculatedScale, maxScale);
  }
  return (getWidth() / getBaseWidth()) * size;
}

function vScale(size: number): number {
  if (isTablet()) {
    // For tablets, limit vertical scaling
    const maxScale = 1.2;
    const calculatedScale = getHeight() / getBaseHeight();
    return size * Math.min(calculatedScale, maxScale);
  }
  return (getHeight() / getBaseHeight()) * size;
}

function mScale(size: number, factor = 0.5): number {
  // Moderate scaling - increased default factor for better tablet adaptation
  return size + (scale(size) - size) * factor;
}

function toDp(px: number) {
  return px / PixelRatio.get();
}

function applyOpacity(hexColor: string, opacity: number): string {
  const red = parseInt(hexColor.slice(1, 3), 16);
  const green = parseInt(hexColor.slice(3, 5), 16);
  const blue = parseInt(hexColor.slice(5, 7), 16);
  return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
}

// Get responsive padding for horizontal spacing on tablets
function getResponsiveHorizontalPadding(): number {
  if (isTablet()) {
    const width = getWidth();
    // Add more padding on wider screens to center content
    return Math.max(24, (width - 600) / 2);
  }
  return 0;
}

// Get max content width for tablets
function getMaxContentWidth(): number | undefined {
  return isTablet() ? 700 : undefined;
}

export {
  applyOpacity,
  getBaseHeight as baseHeight,
  getBaseWidth as baseWidth, getMaxContentWidth,
  getResponsiveHorizontalPadding, getHeight as height, isTablet,
  mScale,
  scale,
  toDp,
  vScale,
  getWidth as width
};

