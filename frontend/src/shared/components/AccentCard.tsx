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
  cyan: "border-cyan-400/40 ring-1 ring-cyan-400/30 shadow-[0_10px_30px_-15px_rgba(34,211,238,0.35)]",
  teal: "border-teal-400/40 ring-1 ring-teal-400/30 shadow-[0_10px_30px_-15px_rgba(45,212,191,0.35)]",
  pink: "border-pink-400/40 ring-1 ring-pink-400/30 shadow-[0_10px_30px_-15px_rgba(236,72,153,0.35)]",
};

const ACCENT_HEX: Record<Accent, string> = {
  cyan: "rgba(34, 211, 238, 0.4)", // cyan-400 /40
  teal: "rgba(45, 212, 191, 0.4)", // teal-400 /40
  pink: "rgba(236, 72, 153, 0.4)", // pink-500-ish /40
};

const AccentCard = React.forwardRef<HTMLDivElement, Props>(
  ({ accent, className = "", children, style, ...props }, ref) => {
    const classes = cn(
      "glass rounded-2xl border-2 border-transparent",
      accentClass[accent],
      className,
    );

    return (
      <Card
        ref={ref}
        className={classes}
        style={{ borderColor: ACCENT_HEX[accent], ...(style || {}) }}
        {...props}
      >
        {children}
      </Card>
    );
  },
);

export default AccentCard;
