// Streamlined Design System Constants

// Spacing System
export const SPACING = {
  // Base spacing units
  xs: 4,
  sm: 8,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 100,
  
  // Specific measurements
  radius: 12,
  radiusSmall: 8,
  borderWidth: 1,
  headerHeight: 80,
  headerHeightIOS: 88,
  headerHeightAndroid: 64,
  posterWidth: 200,
  posterHeight: 300,
} as const;

// Typography System
export const TYPOGRAPHY = {
  // Font sizes
  caption: 14,
  body: 16,
  subtitle: 18,
  title: 24,
  icon: 64,
  
  // Line heights
  lineHeight: 20,
  lineHeightLarge: 24,
  
  // Font weights & families
  fontWeight: '600',
  fontMono: 'monospace',
} as const;

// Animation & Timing
export const ANIMATION = {
  // Durations
  fast: 100,
  normal: 200,
  
  // Opacities
  hidden: 0,
  visible: 1,
  pressed: 0.7,
  
  // Scales
  scalePressed: 0.8,
  scaleNormal: 1,
  
  // Performance
  throttle: 16,
  debounce: 500,
} as const;

// Shadow System
export const SHADOW = {
  // Light shadow
  opacity: 0.07,
  radius: 8,
  offset: 4,
  elevation: 3,
  
  // Medium shadow
  opacityMedium: 0.1,
  radiusMedium: 3.84,
  offsetMedium: 2,
  elevationMedium: 5,
} as const;

// Layout & Interaction
export const LAYOUT = {
  // Z-index
  overlay: 10,
  
  // Thresholds
  scrollThreshold: 0.3,
  scrollDivider: 2,
  zeroOffset: 0,
  
  // Performance
  flatListInitial: 8,
  flatListBatch: 12,
  flatListWindow: 11,
} as const;

// API Constants
export const API = {
  defaultPage: 1,
  maxCastMembers: 5,
  firstCountryIndex: 0,
} as const;

// Search Configuration
export const SEARCH = {
  debounceDelay: 500,
  minQueryLength: 0,
} as const;