import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import { getProfile, postLogin, postSignup } from "../services/authService";
import type {
  AuthResponse,
  AuthUser,
  LoginCredentials,
  SignupPayload,
} from "../types";

type AuthContextValue = {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<AuthResponse>;
  signup: (payload: SignupPayload) => Promise<AuthResponse>;
  logout: () => void;
  refreshProfile: () => Promise<AuthUser | null>;
};

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);

const STORAGE_KEY = "portfolio-auth";

type StoredAuth = {
  token: string;
  user: AuthUser;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      setIsLoading(false);
      return;
    }

    try {
      const stored = JSON.parse(raw) as StoredAuth;
      setToken(stored.token);
      setUser(stored.user);

      // Confirm token still valid, but don't block rendering
      void refreshProfileInternal(stored.token);
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
      setToken(null);
      setUser(null);
      setError("Erro ao restaurar sessão");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const persistAuth = useCallback((auth: AuthResponse) => {
    setToken(auth.token);
    setUser(auth.user);
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        token: auth.token,
        user: auth.user,
      } satisfies StoredAuth),
    );
  }, []);

  const clearAuth = useCallback(() => {
    setToken(null);
    setUser(null);
    window.localStorage.removeItem(STORAGE_KEY);
  }, []);

  const refreshProfileInternal = useCallback(
    async (currentToken: string) => {
      try {
        const profile = await getProfile(currentToken);
        setUser(profile);
        window.localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            token: currentToken,
            user: profile,
          } satisfies StoredAuth),
        );
        return profile;
      } catch (err) {
        console.error("Failed to refresh profile", err);
        clearAuth();
        return null;
      }
    },
    [clearAuth],
  );

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await postLogin(credentials);
        persistAuth(result);
        return result;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Falha no login";
        setError(message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [persistAuth],
  );

  const signup = useCallback(
    async (payload: SignupPayload) => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await postSignup(payload);
        persistAuth(result);
        return result;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Falha no cadastro";
        setError(message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [persistAuth],
  );

  const logout = useCallback(() => {
    clearAuth();
  }, [clearAuth]);

  const refreshProfile = useCallback(async () => {
    if (!token) {
      return null;
    }
    setIsLoading(true);
    try {
      return await refreshProfileInternal(token);
    } finally {
      setIsLoading(false);
    }
  }, [refreshProfileInternal, token]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isLoading,
      error,
      login,
      signup,
      logout,
      refreshProfile,
    }),
    [user, token, isLoading, error, login, signup, logout, refreshProfile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
