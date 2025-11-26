import { request } from "@/shared/lib/apiClient";
import type {
  ApiUserResponse,
  AuthResponse,
  AuthUser,
  LoginCredentials,
  SignupPayload,
} from "../types";

function mapUser(payload: ApiUserResponse): AuthUser {
  return {
    id: payload.id,
    name: payload.name,
    email: payload.email,
    role: payload.role,
    createdAt: payload.created_at,
    updatedAt: payload.updated_at,
  };
}

export async function postLogin(
  credentials: LoginCredentials,
): Promise<AuthResponse> {
  const result = await request<{ user: ApiUserResponse; token: string }>(
    "/api/auth/login",
    {
      method: "POST",
      body: JSON.stringify(credentials),
    },
  );

  return {
    user: mapUser(result.user),
    token: result.token,
  };
}

export async function postSignup(
  payload: SignupPayload,
): Promise<AuthResponse> {
  const result = await request<{ user: ApiUserResponse; token: string }>(
    "/api/auth/register",
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
  );

  return {
    user: mapUser(result.user),
    token: result.token,
  };
}

export async function getProfile(token: string): Promise<AuthUser> {
  const result = await request<ApiUserResponse>("/api/auth/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return mapUser(result);
}
