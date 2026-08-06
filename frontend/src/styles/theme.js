/**
 * NimbusOps Enterprise Design System Theme
 * This file serves as the single source of truth for UI colors and spacing.
 * It strictly adheres to the dark, premium aesthetic of the platform.
 */

export const theme = {
  colors: {
    // Brand Colors
    primary: '#FF9D00',     // NimbusOps Orange
    primaryHover: '#ffaa22',
    secondary: '#2563EB',   // Deep Blue
    
    // Backgrounds
    bgBase: '#0c0c0c',      // Deepest background (body)
    bgSurface: '#111111',   // Cards, Modals, Sidebars
    bgElevated: '#1a1a1a',  // Dropdowns, Hover states
    
    // Borders
    borderNormal: 'rgba(255, 255, 255, 0.1)',
    borderFocus: 'rgba(255, 157, 0, 0.5)',
    borderHover: 'rgba(255, 255, 255, 0.2)',
    
    // Text
    textPrimary: '#FFFFFF',
    textSecondary: 'rgba(255, 255, 255, 0.6)',
    textMuted: 'rgba(255, 255, 255, 0.4)',
    textInverted: '#000000',

    // Status Colors (Mapping for Chips/Badges/Progress)
    status: {
      healthy: '#10B981',   // Emerald 500
      success: '#10B981',
      warning: '#F59E0B',   // Amber 500
      pending: '#F59E0B',
      critical: '#EF4444',  // Red 500
      danger: '#EF4444',
      offline: '#6B7280',   // Gray 500
      info: '#3B82F6',      // Blue 500
      connected: '#10B981',
      disconnected: '#6B7280',
    }
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.5)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.6)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.7)',
    glow: '0 8px 24px rgba(255, 157, 0, 0.25)', // The signature orange glow
    glowBlue: '0 8px 24px rgba(37, 99, 235, 0.25)',
  },

  radius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    full: '9999px',
  },

  transitions: {
    fast: '150ms ease-in-out',
    normal: '300ms ease-out',
    slow: '500ms ease-out',
  }
};

export default theme;
