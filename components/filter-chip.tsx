import { cn } from "@/lib/utils";

interface FilterChipProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export function FilterChip({ label, active, onClick }: FilterChipProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-pill text-xs font-semibold border whitespace-nowrap transition-all",
        active
          ? "bg-primary text-white border-primary"
          : "bg-surface text-text-muted border-border hover:border-primary hover:text-primary"
      )}
    >
      {label}
    </button>
  );
}
