
import axios from "axios";

// Axios instances
export const bookBaseUrl = axios.create({
  baseURL: "https://shelf-sync-2.onrender.com/book",
});

export const userBaseUrl = axios.create({
  baseURL: "https://shelf-sync-2.onrender.com/user",
});

// Request Interceptor
// JWT token automatically attach hoga protected book APIs ke saath
bookBaseUrl.interceptors.request.use(
  (config) => {
    try {
      const authData = JSON.parse(
        localStorage.getItem("userAuth") || "null"
      );

      const token = authData?.token;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Auth token error:", error);
      localStorage.removeItem("userAuth");
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
// 401 Unauthorized aane par user ko login page par redirect karenge
bookBaseUrl.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("userAuth");

      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);
