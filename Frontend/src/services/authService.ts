import { apiClient } from "../api/apiClient";
import { LoginCredentials, LoginResponse } from "../types";

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    console.log("🔐 Sending login request:", credentials);

    // 🔴 Backend returns STRING, not object
    const response = await apiClient.post<string>(
      "http://localhost:8084/auth/login",
      credentials
    );

    const token = response.data;

    if (!token || token.split(".").length !== 3) {
      throw new Error("Invalid JWT received from server");
    }

    // 🔐 Store token only
    localStorage.setItem("token", token);

    console.log("💾 STORED JWT");

    return {
      success: true,
      token,
    };
  },

  logout() {
    localStorage.removeItem("token");
  },
};
