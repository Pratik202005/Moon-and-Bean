// Dynamic API Base URL Configuration for Moon & Bean (Development & Production)
const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  // When running Vite dev server locally, requests to /api are proxied to http://localhost:5000
  if (import.meta.env.DEV) {
    return '/api';
  }
  // Production relative API fallback
  return '/api';
};

export const API_BASE_URL = getApiBaseUrl();

export default API_BASE_URL;
