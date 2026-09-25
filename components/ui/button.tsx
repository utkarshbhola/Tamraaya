import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "gold"
    | "gold-outline"
    | "plum"
    | "plum-outline"
    | "ghost"
    | "whatsapp";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B58A3C] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none tracking-wider text-xs uppercase";

    const variants = {
      primary:
        "bg-[#2B1A13] text-[#F4EEE3] border border-[#B58A3C]/40 hover:bg-[#4A2F20] hover:border-[#B58A3C] active:scale-[0.99]",
      gold: "bg-[#B58A3C] text-[#2B1A13] font-semibold hover:bg-[#C9A96A] shadow-sm active:scale-[0.99]",
      "gold-outline":
        "border border-[#B58A3C] text-[#B58A3C] bg-transparent hover:bg-[#B58A3C]/10 active:scale-[0.99]",
      plum: "bg-[#4A2F20] text-[#F4EEE3] border border-[#4A2F20] hover:bg-[#2B1A13] active:scale-[0.99]",
      "plum-outline":
        "border border-[#2B1A13] text-[#2B1A13] bg-transparent hover:bg-[#2B1A13]/5 active:scale-[0.99]",
      ghost:
        "text-[#2B1A13] hover:bg-[#2B1A13]/5 hover:text-[#2B1A13] border-transparent",
      whatsapp:
        "bg-[#25D366] text-white hover:bg-[#20ba59] font-medium shadow-sm active:scale-[0.99]",
    };

    const sizes = {
      sm: "h-9 px-3.5 text-[11px]",
      md: "h-11 px-5 text-xs",
      lg: "h-13 px-7 text-sm tracking-widest",
      icon: "h-10 w-10 p-0",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin h-4 w-4 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>Processing...</span>
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);
Button.displayName = "Button";
