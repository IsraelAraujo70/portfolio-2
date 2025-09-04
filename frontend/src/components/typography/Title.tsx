import type { TitleProps } from "../types";

const sizeClasses: Record<NonNullable<TitleProps["as"]>, string> = {
  h1: "text-4xl md:text-5xl font-bold text-[#e6eef6]",
  h2: "text-3xl md:text-4xl font-bold text-[#e6eef6]",
  h3: "text-2xl md:text-3xl font-semibold text-[#e6eef6]",
  h4: "text-xl md:text-2xl font-semibold text-[#e6eef6]",
  h5: "text-lg md:text-xl font-medium text-[#e6eef6]",
  h6: "text-base md:text-lg font-medium text-[#e6eef6]",
};

export default function Title({ as = "h1", className = "", children }: TitleProps) {
  const Tag = as;
  const classes = [sizeClasses[as], className].filter(Boolean).join(" ");
  return <Tag className={classes}>{children}</Tag>;
}

