import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PaymentMethodRowProps {
  icon: ReactNode;
  label: string;
  sublabel?: string;
  value: string;
  selected: boolean;
  onSelect: () => void;
}

export function PaymentMethodRow({
  icon,
  label,
  sublabel,
  value,
  selected,
  onSelect,
}: PaymentMethodRowProps) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "w-full flex items-center gap-3 p-3.5 rounded-2xl border transition-all",
        selected ? "border-primary bg-primary-soft" : "border-border bg-surface"
      )}
    >
      {/* Icon */}
      <div className="w-10 h-10 rounded-xl bg-bg flex items-center justify-center flex-shrink-0 text-lg">
        {icon}
      </div>

      {/* Label */}
      <div className="flex-1 text-left">
        <p className="font-semibold text-text text-sm">{label}</p>
        {sublabel && <p className="text-text-muted text-xs">{sublabel}</p>}
      </div>

      {/* Radio */}
      <div
        className={cn(
          "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0",
          selected ? "border-primary" : "border-border"
        )}
      >
        {selected && <div className="w-2.5 h-2.5 bg-primary rounded-full" />}
      </div>
    </button>
  );
}
