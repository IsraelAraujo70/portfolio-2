import { request } from "@/shared/lib/apiClient";
import { getProfile, postLogin, postSignup } from "./authService";
import type { ApiUserResponse } from "../types";

// Mock the apiClient module
jest.mock("@/shared/lib/apiClient");

// Helper to mock request implementation
const mockRequest = request as jest.Mock;

const mockApiUser: ApiUserResponse = {
  id: 1,
  name: "Test User",
  email: "test@example.com",
  role: "user",
  created_at: "2024-01-01T00:00:00Z",
  updated_at: "2024-01-01T00:00:00Z",
};

const mockAuthResponse = {
  user: mockApiUser,
  token: "fake-token",
};

describe("authService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("postLogin", () => {
    it("calls /api/auth/login and transforms response", async () => {
      mockRequest.mockResolvedValueOnce(mockAuthResponse);

      const credentials = { email: "test@example.com", password: "password" };
      const result = await postLogin(credentials);

      expect(mockRequest).toHaveBeenCalledWith("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      });

      expect(result).toEqual({
        token: "fake-token",
        user: {
          id: 1,
          name: "Test User",
          email: "test@example.com",
          role: "user",
          createdAt: "2024-01-01T00:00:00Z",
          updatedAt: "2024-01-01T00:00:00Z",
        },
      });
    });
  });

  describe("postSignup", () => {
    it("calls /api/auth/register and transforms response", async () => {
      mockRequest.mockResolvedValueOnce(mockAuthResponse);

      const payload = {
        name: "Test User",
        email: "test@example.com",
        password: "password",
      };
      const result = await postSignup(payload);

      expect(mockRequest).toHaveBeenCalledWith("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      expect(result).toEqual({
        token: "fake-token",
        user: {
          id: 1,
          name: "Test User",
          email: "test@example.com",
          role: "user",
          createdAt: "2024-01-01T00:00:00Z",
          updatedAt: "2024-01-01T00:00:00Z",
        },
      });
    });
  });

  describe("getProfile", () => {
    it("calls /api/auth/me with auth header and transforms response", async () => {
      mockRequest.mockResolvedValueOnce(mockApiUser);

      const token = "valid-token";
      const result = await getProfile(token);

      expect(mockRequest).toHaveBeenCalledWith("/api/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(result).toEqual({
        id: 1,
        name: "Test User",
        email: "test@example.com",
        role: "user",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-01T00:00:00Z",
      });
    });
  });
});
