import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Request logger
api.interceptors.request.use((config) => {
  console.log("🚀 API:", config.method?.toUpperCase(), config.url);
  return config;
});

// Response logger
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      "❌ API ERROR:",
      error.response?.data || error.message
    );
    return Promise.reject(error);
  }
);

export default api;
