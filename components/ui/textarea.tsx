import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  label?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, label, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-[11px] uppercase tracking-wider font-semibold text-[#1D1B1A]/80"
          >
            {label}
          </label>
        )}
        <textarea
          id={inputId}
          ref={ref}
          className={cn(
            "flex min-h-[100px] w-full border border-[#B8A58D]/60 bg-[#FFFDF8] px-3.5 py-2.5 text-sm text-[#2B1A13] placeholder:text-[#2B1A13]/50 transition-colors focus:border-[#B58A3C] focus:bg-[#FFFDF8] focus:outline-none focus:ring-1 focus:ring-[#B58A3C]/60 disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
