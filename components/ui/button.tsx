import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-semibold transition-all active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 select-none",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--accent)] text-white hover:bg-[var(--accent-dark)] focus-visible:ring-[var(--accent)] rounded-full shadow-sm",
        outline:
          "border-2 border-[var(--border)] bg-[var(--card)] text-[var(--fg)] hover:bg-[var(--accent-soft)] hover:border-[var(--accent)] rounded-lg",
        ghost:
          "bg-transparent text-[var(--fg)] hover:bg-[var(--accent-soft)] rounded-lg",
        destructive:
          "bg-[var(--danger)] text-white hover:opacity-90 rounded-lg shadow-sm",
        success:
          "bg-[var(--success)] text-white hover:opacity-90 rounded-full shadow-sm",
        secondary:
          "bg-[var(--input-bg)] text-[var(--fg)] hover:bg-[var(--border)] rounded-lg",
      },
      size: {
        default: "h-12 px-6 text-base",
        sm: "h-9 px-4 text-sm",
        lg: "h-14 px-8 text-lg",
        xl: "h-16 px-10 text-xl",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
);
Button.displayName = "Button";

export { Button, buttonVariants };
