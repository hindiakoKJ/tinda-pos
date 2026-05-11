import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-semibold text-[var(--fg)]"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "h-12 w-full rounded-lg border border-[var(--border)] bg-[var(--input-bg)] px-4 text-base text-[var(--fg)] placeholder:text-[var(--fg-muted)] transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-1 focus:border-[var(--accent)]",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error && "border-[var(--danger)] focus:ring-[var(--danger)]",
            className
          )}
          {...props}
        />
        {error && <p className="text-sm text-[var(--danger)]">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
