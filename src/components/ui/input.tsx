import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", error, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "w-full h-11 px-4 bg-transparent border border-white/10",
          "text-white placeholder:text-gray-500",
          "transition-colors",
          "focus:outline-none focus:border-gold",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-red-500 focus:border-red-500",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
