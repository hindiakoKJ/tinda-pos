import { cn } from "@/lib/utils";

type BadgeTone = "default" | "success" | "warn" | "danger" | "accent";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}

const toneStyles: Record<BadgeTone, string> = {
  default: "bg-[var(--input-bg)] text-[var(--fg-muted)]",
  success: "bg-emerald-100 text-emerald-700",
  warn: "bg-amber-100 text-amber-700",
  danger: "bg-red-100 text-red-600",
  accent: "bg-[var(--accent-soft)] text-[var(--accent-dark)]",
};

export function Badge({ tone = "default", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        toneStyles[tone],
        className
      )}
      {...props}
    />
  );
}
