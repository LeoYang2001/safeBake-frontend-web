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

// Theme colors
export const COLORS = {
  PRIMARY: "#2563eb", // blue-600
  SECONDARY: "#64748b", // slate-500
  SUCCESS: "#10b981", // emerald-500
  WARNING: "#f59e0b", // amber-500
  ERROR: "#ef4444", // red-500
} as const;

// Breakpoints (matching Tailwind CSS)
export const BREAKPOINTS = {
  SM: "640px",
  MD: "768px",
  LG: "1024px",
  XL: "1280px",
  "2XL": "1536px",
} as const;
