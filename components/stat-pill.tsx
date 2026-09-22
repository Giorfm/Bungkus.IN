import { ReactNode } from "react";

interface StatPillProps {
  icon: ReactNode;
  value: string;
  label: string;
}

export function StatPill({ icon, value, label }: StatPillProps) {
  return (
    <div className="flex flex-col items-center gap-1 bg-white/20 backdrop-blur-sm px-4 py-3 rounded-2xl min-w-[90px]">
      <div className="text-xl">{icon}</div>
      <span className="text-white font-extrabold text-sm leading-none">{value}</span>
      <span className="text-white/75 text-[10px] font-medium text-center leading-tight">{label}</span>
    </div>
  );
}
