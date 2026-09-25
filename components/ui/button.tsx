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
      "inline-flex items-center justify-center font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A45C] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none tracking-wider text-xs uppercase";

    const variants = {
      primary:
        "bg-[#1B0B22] text-[#D8B875] border border-[#C9A45C40] hover:bg-[#2B1234] hover:border-[#C9A45C] active:scale-[0.99]",
      gold: "bg-[#C9A45C] text-[#1B0B22] font-semibold hover:bg-[#D8B875] shadow-sm active:scale-[0.99]",
      "gold-outline":
        "border border-[#C9A45C] text-[#C9A45C] bg-transparent hover:bg-[#C9A45C15] active:scale-[0.99]",
      plum: "bg-[#2B1234] text-[#F6F0E6] border border-[#2B1234] hover:bg-[#1B0B22] active:scale-[0.99]",
      "plum-outline":
        "border border-[#1B0B22] text-[#1B0B22] bg-transparent hover:bg-[#1B0B2210] active:scale-[0.99]",
      ghost:
        "text-[#1D1B1A] hover:bg-[#1D1B1A10] hover:text-[#1B0B22] border-transparent",
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
