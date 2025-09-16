import type { FormEventHandler, ReactNode } from "react";

type AuthFormProps = {
  onSubmit: FormEventHandler<HTMLFormElement>;
  children: ReactNode;
  className?: string;
};

export function AuthForm({ onSubmit, children, className }: AuthFormProps) {
  return (
    <form onSubmit={onSubmit} className={className}>
      {children}
    </form>
  );
}
