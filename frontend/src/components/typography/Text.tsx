import type { TextProps } from "../types";

export default function Text({ as = "p", className = "", children }: TextProps) {
  const Tag = as;
  const base = "text-[#a7b8c6] leading-relaxed text-sm md:text-base";
  const classes = [base, className].filter(Boolean).join(" ");
  return <Tag className={classes}>{children}</Tag>;
}
