import { useState, type ChangeEvent, type FormEventHandler } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";
import { FormField } from "@/shared/components/ui/form-field";
import { Input } from "@/shared/components/ui/input";
import Text from "@/shared/components/typography/Text";
import { AuthCard } from "./AuthCard";
import { AuthForm } from "./AuthForm";
import { useAuth } from "../hooks/useAuth";
import type { SignupPayload } from "../types";

type SignupFormState = SignupPayload & { confirmPassword: string };

export default function SignupPage() {
  const navigate = useNavigate();
  const { signup, isLoading, error } = useAuth();

  const [form, setForm] = useState<SignupFormState>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    adminCode: "",
  });
  const [localError, setLocalError] = useState<string | null>(null);

  const handleChange =
    (field: keyof SignupFormState) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setLocalError(null);

    if (form.password !== form.confirmPassword) {
      setLocalError("As senhas não conferem");
      return;
    }

    try {
      await signup({
        name: form.name,
        email: form.email,
        password: form.password,
        adminCode: form.adminCode ? form.adminCode : undefined,
      });
      navigate("/#chat", { replace: true });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Não foi possível criar sua conta";
      setLocalError(message);
    }
  };

  const errorMessage = localError ?? error;

  return (
    <AuthCard
      title="Crie sua conta"
      subtitle="Cadastre-se para falar comigo em tempo real"
      footer={
        <Text as="div" className="text-center text-sm text-white/70">
          Já possui conta?{" "}
          <Link
            to="/login"
            className="text-cyan-300 hover:text-cyan-200 underline"
          >
            Entre aqui
          </Link>
        </Text>
      }
    >
      <AuthForm onSubmit={handleSubmit} className="space-y-6">
        <FormField id="name" label="Nome completo">
          <Input
            id="name"
            value={form.name}
            onChange={handleChange("name")}
            autoComplete="name"
            required
          />
        </FormField>
        <FormField id="email" label="E-mail">
          <Input
            id="email"
            type="email"
            value={form.email}
            onChange={handleChange("email")}
            autoComplete="email"
            required
          />
        </FormField>
        <FormField id="password" label="Senha">
          <Input
            id="password"
            type="password"
            value={form.password}
            onChange={handleChange("password")}
            autoComplete="new-password"
            required
            minLength={6}
          />
        </FormField>
        <FormField id="confirmPassword" label="Confirmar senha">
          <Input
            id="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange("confirmPassword")}
            autoComplete="new-password"
            required
            minLength={6}
          />
        </FormField>
        <FormField
          id="adminCode"
          label="Código admin"
          description="Opcional. Use apenas se recebido diretamente de mim."
        >
          <Input
            id="adminCode"
            value={form.adminCode}
            onChange={handleChange("adminCode")}
            autoComplete="off"
            placeholder="Opcional"
          />
        </FormField>
        {errorMessage ? (
          <Text as="div" className="text-sm text-red-400 text-center">
            {errorMessage}
          </Text>
        ) : null}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Criando conta..." : "Cadastrar"}
        </Button>
      </AuthForm>
    </AuthCard>
  );
}
