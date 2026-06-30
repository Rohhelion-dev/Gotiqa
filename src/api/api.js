import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = api.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Optional: request logger (helps debugging)
api.interceptors.request.use((config) => {
  console.log("🚀 API Request:", config.method.toUpperCase(), config.url);
  return config;
});

// Optional: response logger
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("❌ API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;