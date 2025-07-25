// Application configuration settings
import { config as globalConfig } from "../globals";

export const appConfig = {
  // API Configuration
  api: {
    baseUrl: globalConfig.apiBaseUrl,
    timeout: 10000, // 10 seconds
    retryAttempts: 3,
  },

  // App Settings
  app: {
    name: "SafeBake",
    version: "1.0.0",
    description:
      "Innovative baking solutions for safe and delicious results every time.",
    supportEmail: "support@safebake.com",
    contactEmail: "info@safebake.com",
  },

  // Feature Flags
  features: {
    enableAnalytics: globalConfig.isProduction,
    enableNotifications: true,
    enableDarkMode: false,
    enableBetaFeatures: globalConfig.isDevelopment,
  },

  // UI Configuration
  ui: {
    itemsPerPage: 12,
    maxUploadSize: 5 * 1024 * 1024, // 5MB
    supportedImageTypes: ["image/jpeg", "image/png", "image/webp"],
    defaultTheme: "light",
  },

  // Social Media Links
  social: {
    twitter: "https://twitter.com/safebake",
    facebook: "https://facebook.com/safebake",
    instagram: "https://instagram.com/safebake",
    linkedin: "https://linkedin.com/company/safebake",
  },

  // SEO Configuration
  seo: {
    defaultTitle: "SafeBake - Innovative Baking Solutions",
    titleTemplate: "%s | SafeBake",
    defaultDescription:
      "Discover SafeBake's innovative baking equipment designed with safety and quality in mind. Perfect for both professionals and home bakers.",
    keywords: [
      "baking",
      "kitchen equipment",
      "safe baking",
      "baking tools",
      "ovens",
      "mixers",
    ],
    siteUrl: "https://safebake.com",
  },
};

export default appConfig;
