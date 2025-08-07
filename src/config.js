const env = import.meta.env.VITE_ENVIRONMENT || "development";

const BACKEND_URL = {
  production: import.meta.env.VITE_BACKEND_URL_PRODUCTION,
  staging: import.meta.env.VITE_BACKEND_URL_STAGING,
  development: import.meta.env.VITE_BACKEND_URL_DEVELOPMENT,
}[env];

console.log(BACKEND_URL);

export { BACKEND_URL, env as ENVIRONMENT };
