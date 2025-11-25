export interface ApiUserResponse {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
  adminCode?: string;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
}

export class ApiError extends Error {
  status: number;
  payload: unknown;

  constructor(message: string, status: number, payload: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.payload = payload;
  }
}

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

async function request<T>(path: string, init: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });

  const text = await response.text();
  const data = text ? safeJsonParse(text) : null;

  if (!response.ok) {
    throw new ApiError(
      (data as { error?: string })?.error ?? response.statusText,
      response.status,
      data,
    );
  }

  return data as T;
}

function safeJsonParse(value: string): unknown {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

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
