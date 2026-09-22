import { cn } from "@/lib/utils";

interface PriceSummaryRowProps {
  label: string;
  value: string;
  isBold?: boolean;
  isGreen?: boolean;
  isDanger?: boolean;
  isLarge?: boolean;
}

export function PriceSummaryRow({
  label,
  value,
  isBold,
  isGreen,
  isDanger,
  isLarge,
}: PriceSummaryRowProps) {
  return (
    <div className="flex items-center justify-between">
      <span
        className={cn(
          "text-text-muted",
          isLarge ? "text-sm font-bold text-text" : "text-sm",
          isBold && "font-bold text-text"
        )}
      >
        {label}
      </span>
      <span
        className={cn(
          "text-sm",
          isBold && "font-extrabold",
          isLarge && "text-base font-extrabold",
          isGreen && "text-primary",
          isDanger && "text-danger",
          !isGreen && !isDanger && "text-text"
        )}
      >
        {value}
      </span>
    </div>
  );
}
