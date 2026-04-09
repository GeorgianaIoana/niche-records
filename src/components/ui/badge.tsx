import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "gold" | "outline";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        "transition-colors duration-200",
        variant === "default" && "bg-[#122535] text-gray-300 border border-[#1e3a50]/50",
        variant === "gold" && "bg-gold/15 text-gold border border-gold/30",
        variant === "outline" && "border border-[#1e3a50] text-gray-400",
        className
      )}
      {...props}
    />
  );
}

export { Badge };
