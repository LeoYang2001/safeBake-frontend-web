// Global app configuration
declare global {
  interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string;
    readonly VITE_APP_TITLE: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

export const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api",
  appTitle: import.meta.env.VITE_APP_TITLE || "SafeBake",
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};

export default config;
