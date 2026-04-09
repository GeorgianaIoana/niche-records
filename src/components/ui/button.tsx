import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-colors",
          "disabled:pointer-events-none disabled:opacity-50",
          variant === "primary" && "bg-gold text-[#030810] hover:bg-gold-light",
          variant === "secondary" && "bg-[#122535] text-white hover:bg-[#1a3045]",
          variant === "outline" && "border border-white/20 text-white hover:bg-white/5",
          variant === "ghost" && "text-gray-400 hover:text-white",
          size === "sm" && "h-9 px-4 text-sm",
          size === "md" && "h-11 px-6 text-sm",
          size === "lg" && "h-12 px-8 text-sm tracking-wide",
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
