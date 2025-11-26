import * as React from "react";
import { Card } from "@/shared/components/ui/card";
import { cn } from "@/shared/lib/utils";

type Accent = "cyan" | "teal" | "pink";

type Props = {
  accent: Accent;
  className?: string;
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<typeof Card>;

const accentClass: Record<Accent, string> = {
  cyan: "border-cyan-400/40 shadow-[0_12px_40px_-20px_rgba(34,211,238,0.45)]",
  teal: "border-teal-400/40 shadow-[0_12px_40px_-20px_rgba(45,212,191,0.45)]",
  pink: "border-pink-400/40 shadow-[0_12px_40px_-20px_rgba(236,72,153,0.45)]",
};

const overlayGradient: Record<Accent, string> = {
  cyan: "from-cyan-500/15 via-transparent to-cyan-400/10",
  teal: "from-teal-500/15 via-transparent to-teal-400/10",
  pink: "from-pink-500/15 via-transparent to-pink-400/10",
};

const AccentCard = React.forwardRef<HTMLDivElement, Props>(
  ({ accent, className = "", children, style, ...props }, ref) => {
    const classes = cn(
      "relative overflow-hidden rounded-2xl border-2 border-transparent",
      "bg-gradient-to-br from-background-secondary/90 via-background-secondary/75 to-background-tertiary/60",
      "backdrop-blur-2xl",
      accentClass[accent],
      className,
    );

    return (
      <Card ref={ref} className={classes} style={style} {...props}>
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-1 rounded-2xl",
            "bg-gradient-to-br",
            overlayGradient[accent],
          )}
        />
        <div className="relative">{children}</div>
      </Card>
    );
  },
);

export default AccentCard;
