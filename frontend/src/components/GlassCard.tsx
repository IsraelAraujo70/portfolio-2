import type { GlassCardProps } from "./types";

export default function GlassCard({
  children,
  className = "",
  hover = true,
}: GlassCardProps) {
  const classes = ["glass", hover ? "glass-hover" : null, className]
    .filter(Boolean)
    .join(" ");

  return <div className={classes}>{children}</div>;
}
