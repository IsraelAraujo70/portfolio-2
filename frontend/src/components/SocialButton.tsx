import type { SocialButtonProps } from "./types";

export default function SocialButton({
  href,
  icon,
  label,
  newTab = true,
  className = "",
}: SocialButtonProps) {
  const classes = [
    "glass-button inline-flex items-center justify-center",
    "rounded-xl p-3 text-[#e6eef6]",
    "hover:scale-105 transition-transform",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <a
      href={href}
      aria-label={label}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noopener noreferrer" : undefined}
      className={classes}
    >
      {icon}
    </a>
  );
}

