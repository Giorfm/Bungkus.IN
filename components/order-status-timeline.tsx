import { Check, Clock, Package, CheckCircle } from "lucide-react";
import { Order } from "@/lib/types";
import { cn } from "@/lib/utils";

const steps: {
  key: Order["status"];
  label: string;
  icon: React.ElementType;
}[] = [
  { key: "received", label: "Pesanan Diterima", icon: Package },
  { key: "paid", label: "Pembayaran Berhasil", icon: Check },
  { key: "ready", label: "Siap Diambil", icon: Clock },
  { key: "completed", label: "Pesanan Selesai", icon: CheckCircle },
];

const statusOrder: Order["status"][] = ["received", "paid", "ready", "completed"];

interface OrderStatusTimelineProps {
  status: Order["status"];
  createdAt: string;
}

export function OrderStatusTimeline({ status, createdAt }: OrderStatusTimelineProps) {
  const currentIdx = statusOrder.indexOf(status);

  return (
    <div className="space-y-0">
      {steps.map((step, idx) => {
        const isDone = idx <= currentIdx;
        const isCurrent = idx === currentIdx;
        const isLast = idx === steps.length - 1;
        const Icon = step.icon;

        return (
          <div key={step.key} className="flex gap-3">
            {/* Left: icon + line */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all",
                  isDone
                    ? "bg-primary text-white shadow-sm"
                    : "bg-bg border-2 border-border text-text-muted"
                )}
              >
                <Icon size={15} />
              </div>
              {!isLast && (
                <div
                  className={cn(
                    "w-0.5 flex-1 mt-1 mb-1 min-h-[24px]",
                    idx < currentIdx ? "bg-primary" : "bg-border"
                  )}
                />
              )}
            </div>

            {/* Right: label + timestamp */}
            <div className={cn("pb-4", isLast ? "pb-0" : "")}>
              <p
                className={cn(
                  "text-sm font-semibold leading-none",
                  isDone ? "text-text" : "text-text-muted"
                )}
              >
                {step.label}
              </p>
              {isCurrent && step.key === "ready" && (
                <p className="text-xs text-text-muted mt-1">
                  Makanan sedang disiapkan, silakan diambil sesuai slot
                </p>
              )}
              {isDone && (
                <p className="text-[11px] text-text-muted mt-0.5">
                  {new Date(
                    new Date(createdAt).getTime() + idx * 3 * 60 * 1000
                  ).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
