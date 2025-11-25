import type { InlineProps } from "../types";

export default function Inline({
  as = "span",
  className = "",
  children,
}: InlineProps) {
  const Tag = as;
  const base =
    as === "strong"
      ? "font-semibold text-[#e6eef6]"
      : as === "em"
        ? "italic text-[#e6eef6]"
        : "text-[#e6eef6]";
  const classes = [base, className].filter(Boolean).join(" ");
  return <Tag className={classes}>{children}</Tag>;
}
