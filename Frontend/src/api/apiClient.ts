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

    console.log("➡️ API REQUEST:", config.method?.toUpperCase(), config.url);

    // Only attach JWT for requests going to the bank server (localhost:8080)
    const url = config.url || "";
    const isAbsolute = url.startsWith("http://") || url.startsWith("https://");
    const isBankServer =
      (!isAbsolute) || // relative paths → go to apiClient.baseURL (localhost:8080)
      url.startsWith("http://localhost:8080") ||
      (config.baseURL && config.baseURL.startsWith("http://localhost:8080"));

    console.log("➡️ IS BANK SERVER:", isBankServer);

    if (isBankServer && token) {
      config.headers = config.headers || {};
      (config.headers as any).Authorization = `Bearer ${token}`;
    }

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
