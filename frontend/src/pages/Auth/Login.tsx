import { useState, type ChangeEvent, type FormEventHandler } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import Text from "@/components/typography/Text";
import { AuthCard } from "./components/AuthCard";
import { AuthForm } from "./components/AuthForm";
import { useAuth } from "@/hooks/useAuth";
import type { LoginCredentials } from "@/lib/apiClient";

type LocationState = {
  from?: string;
};

function normalizeTarget(target: string | undefined): string {
  if (!target) {
    return "/#chat";
  }
  if (target === "/chat") {
    return "/#chat";
  }
  return target;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading, error } = useAuth();

  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: "",
    password: "",
  });
  const [localError, setLocalError] = useState<string | null>(null);

  const from = normalizeTarget(
    (location.state as LocationState | undefined)?.from,
  );

  const handleChange =
    (field: keyof LoginCredentials) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setCredentials((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setLocalError(null);

    try {
      await login(credentials);
      navigate(from, { replace: true });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Não foi possível entrar";
      setLocalError(message);
    }
  };

  const errorMessage = localError ?? error;

  return (
    <AuthCard
      title="Entre na sua conta"
      subtitle="Faça login para continuar a conversa comigo"
      footer={
        <Text as="div" className="text-center text-sm text-white/70">
          Ainda não tem conta?{" "}
          <Link
            to="/signup"
            className="text-cyan-300 hover:text-cyan-200 underline"
          >
            Crie agora
          </Link>
        </Text>
      }
    >
      <AuthForm onSubmit={handleSubmit} className="space-y-6">
        <FormField id="email" label="E-mail">
          <Input
            id="email"
            type="email"
            autoComplete="email"
            value={credentials.email}
            onChange={handleChange("email")}
            required
          />
        </FormField>
        <FormField id="password" label="Senha">
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            value={credentials.password}
            onChange={handleChange("password")}
            required
          />
        </FormField>
        {errorMessage ? (
          <Text as="div" className="text-sm text-red-400 text-center">
            {errorMessage}
          </Text>
        ) : null}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Entrando..." : "Entrar"}
        </Button>
      </AuthForm>
    </AuthCard>
  );
}
