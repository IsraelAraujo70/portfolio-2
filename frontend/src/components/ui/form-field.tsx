import type { ReactNode } from "react";
import { Label } from "./label";
import { cn } from "@/lib/utils";

type FormFieldProps = {
  id: string;
  label: string;
  description?: string;
  error?: string | null;
  className?: string;
  children: ReactNode;
};

export function FormField({ id, label, description, error, className, children }: FormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id}>{label}</Label>
      {children}
      {description ? (
        <p className="text-xs text-muted-foreground">{description}</p>
      ) : null}
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}
