import type { ListProps, ListItemProps } from "../types";

export function List({
  as = "ul",
  size = "md",
  nested = false,
  className = "",
  children,
}: ListProps) {
  const Tag = as;

  const base = [
    "list-inside",
    as === "ul" ? "list-disc" : "list-decimal",
    size === "sm"
      ? "space-y-1 text-[11px] sm:text-xs"
      : "space-y-2 text-xs sm:text-sm",
    nested ? "ps-5 mt-1" : null,
    "text-foreground-tertiary",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <Tag className={base}>{children}</Tag>;
}

export function ListItem({ className = "", children }: ListItemProps) {
  return <li className={className}>{children}</li>;
}

export default List;
