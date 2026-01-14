import { apiClient } from "../api/apiClient";
import { LoginCredentials, LoginResponse } from "../types";
import {jwtDecode} from "jwt-decode";

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    console.log("🔐 Sending login request:", credentials);

    // 🔴 Backend returns STRING, not object
    const response = await apiClient.post<string>(
      "http://localhost:8084/auth/login",
      credentials
    );

    const token = response.data;
    console.log("✅ LOGIN RESPONSE TOKEN:", token);

    if (!token || token.split(".").length !== 3) {
      throw new Error("Invalid JWT received from server");
    }

    // 🔓 Decode JWT to extract customerId
    const decoded: any = jwtDecode(token);
    const customerId = decoded.bankCustomerId;

    console.log("✅ DECODED CUSTOMER ID:", customerId);

    // 🔐 Store where interceptor expects
    localStorage.setItem("token", token);
    localStorage.setItem("customerId", customerId.toString());

    console.log("💾 STORED JWT + CUSTOMER ID");

    return {
      success: true,
      token,
    };
  },

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("customerId");
  },
};
