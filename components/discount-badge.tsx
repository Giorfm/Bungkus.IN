import { cn } from "@/lib/utils";

interface DiscountBadgeProps {
  percent: number;
  className?: string;
  size?: "sm" | "md";
}

export function DiscountBadge({ percent, className, size = "md" }: DiscountBadgeProps) {
  return (
    <span
      className={cn(
        "bg-primary text-white font-bold rounded-pill whitespace-nowrap",
        size === "sm" ? "text-[10px] px-2 py-0.5" : "text-xs px-2.5 py-1",
        className
      )}
    >
      HEMAT {percent}%
    </span>
  );
}
