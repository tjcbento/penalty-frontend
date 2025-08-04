// src/config.js

const ENV = (import.meta.env.VITE_ENVIRONMENT || "development").toLowerCase();

const configs = {
  production: {
    BACKEND_URL: import.meta.env.VITE_BACKEND_URL_PRODUCTION,
  },
  staging: {
    BACKEND_URL: import.meta.env.VITE_BACKEND_URL_STAGING,
  },
  development: {
    BACKEND_URL: import.meta.env.VITE_BACKEND_URL_DEVELOPMENT,
  },
};

const selected = configs[ENV];

export const BACKEND_URL = selected.BACKEND_URL;
export const ENVIRONMENT = ENV;
