import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: false,
});

/**
 * 🔐 Attach JWT + Customer ID to EVERY request
 */
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    const customerId = localStorage.getItem("customerId");

    console.log("➡️ API REQUEST:", config.method?.toUpperCase(), config.url);
    console.log("➡️ JWT FROM STORAGE:", token);
    console.log("➡️ CUSTOMER ID FROM STORAGE:", customerId);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (customerId) {
      config.headers["X-Bank-Customer-Id"] = customerId;
    }

    console.log("➡️ FINAL HEADERS:", config.headers);

    return config;
  },
  (error) => {
    console.error("❌ REQUEST INTERCEPTOR ERROR", error);
    return Promise.reject(error);
  }
);

/**
 * 🔁 Response logging
 */
apiClient.interceptors.response.use(
  (response) => {
    console.log("✅ API RESPONSE:", response.config.url, response.status);
    return response;
  },
  (error) => {
    console.error(
      "❌ API ERROR:",
      error?.response?.config?.url,
      error?.response?.status,
      error?.response?.data
    );
    return Promise.reject(error);
  }
);
