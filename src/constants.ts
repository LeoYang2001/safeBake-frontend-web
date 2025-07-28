// App-wide constants
export const APP_NAME = "SafeBake";
export const APP_VERSION = "1.0.0";
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api";

// Navigation routes
export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  PRODUCTS: "/products",
  CONTACT: "/contact",
} as const;

// Theme colors - Dark Theme Color Map
export const COLORS = {
  // Main Background & Text
  BACKGROUND: "#1b1b1d",
  TEXT_PRIMARY: "#f9f9f9",
  TEXT_SECONDARY: "#b3b3b3",
  TEXT_MUTED: "#888888",

  // Surface Colors (for cards, modals, etc.)
  SURFACE_PRIMARY: "#2a2a2d",
  SURFACE_SECONDARY: "#3a3a3d",
  SURFACE_ELEVATED: "#4a4a4d",

  // Brand Colors
  BRAND_PRIMARY: "#3b82f6", // blue-500
  BRAND_SECONDARY: "#1e40af", // blue-700
  BRAND_ACCENT: "#60a5fa", // blue-400

  // Status Colors
  SUCCESS: "#10b981", // emerald-500
  WARNING: "#f59e0b", // amber-500
  ERROR: "#ef4444", // red-500
  INFO: "#06b6d4", // cyan-500

  // Border Colors
  BORDER_PRIMARY: "#404040",
  BORDER_SECONDARY: "#525252",
  BORDER_ACCENT: "#737373",

  // Hover & Active States
  HOVER_OVERLAY: "rgba(255, 255, 255, 0.05)",
  ACTIVE_OVERLAY: "rgba(255, 255, 255, 0.1)",
  FOCUS_RING: "#3b82f6",

  // Button Variants
  BUTTON_PRIMARY_BG: "#3b82f6",
  BUTTON_PRIMARY_HOVER: "#2563eb",
  BUTTON_SECONDARY_BG: "#374151",
  BUTTON_SECONDARY_HOVER: "#4b5563",
  BUTTON_GHOST_HOVER: "rgba(59, 130, 246, 0.1)",

  // Input Colors
  INPUT_BG: "#2a2a2d",
  INPUT_BORDER: "#404040",
  INPUT_BORDER_FOCUS: "#3b82f6",
  INPUT_PLACEHOLDER: "#888888",
} as const;

// Breakpoints (matching Tailwind CSS)
export const BREAKPOINTS = {
  SM: "640px",
  MD: "768px",
  LG: "1024px",
  XL: "1280px",
  "2XL": "1536px",
} as const;
