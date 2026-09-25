import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "default"
    | "gold"
    | "plum"
    | "outline"
    | "draft"
    | "published"
    | "archived"
    | "in_stock"
    | "made_to_order";
}

export function Badge({
  className,
  variant = "default",
  children,
  ...props
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center px-2.5 py-0.5 text-[10px] uppercase font-semibold tracking-wider transition-colors";

  const variants = {
    default: "bg-[#1D1B1A10] text-[#1D1B1A]",
    gold: "bg-[#C9A45C20] text-[#8C6D2B] border border-[#C9A45C40]",
    plum: "bg-[#1B0B22] text-[#D8B875] border border-[#C9A45C30]",
    outline: "border border-[#1D1B1A30] text-[#1D1B1A]",
    draft: "bg-amber-100 text-amber-800 border border-amber-300",
    published: "bg-emerald-100 text-emerald-800 border border-emerald-300",
    archived: "bg-stone-200 text-stone-700 border border-stone-300",
    in_stock: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    made_to_order: "bg-amber-50 text-amber-700 border border-amber-200",
  };

  return (
    <span className={cn(baseStyles, variants[variant], className)} {...props}>
      {children}
    </span>
  );
}
