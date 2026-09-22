"use client";

import { useState } from "react";
import { CheckCircle, Tag, Package, Copy, Check } from "lucide-react";
import { Notification } from "@/lib/types";
import { timeAgo, cn } from "@/lib/utils";

interface NotificationItemProps {
  notification: Notification;
}

export function NotificationItem({ notification }: NotificationItemProps) {
  const [copied, setCopied] = useState(false);

  const iconConfig = {
    order: { icon: CheckCircle, bg: "bg-primary-soft", color: "text-primary" },
    promo: { icon: Tag, bg: "bg-warning-bg", color: "text-accent" },
    system: { icon: Package, bg: "bg-blue-50", color: "text-blue-500" },
  };

  const { icon: Icon, bg, color } = iconConfig[notification.type];

  const handleCopy = async () => {
    if (notification.promoCode) {
      await navigator.clipboard.writeText(notification.promoCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className={cn(
        "flex gap-3 p-4 rounded-2xl",
        !notification.read ? "bg-primary-soft/50" : "bg-surface"
      )}
    >
      {/* Icon circle */}
      <div
        className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
          bg
        )}
      >
        <Icon size={18} className={color} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className="font-bold text-text text-sm leading-tight">{notification.title}</p>
          <span className="text-text-muted text-[10px] whitespace-nowrap flex-shrink-0">
            {timeAgo(notification.createdAt)}
          </span>
        </div>
        <p className="text-text-muted text-xs mt-1 leading-relaxed">{notification.message}</p>

        {/* Promo code chip */}
        {notification.promoCode && (
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-2 bg-warning-bg border border-amber-200 rounded-xl px-3 py-1.5">
              <span className="font-mono font-bold text-accent text-xs">
                {notification.promoCode}
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-[11px] font-semibold text-accent"
              >
                {copied ? <Check size={12} /> : <Copy size={12} />}
                {copied ? "Disalin!" : "Salin Kode"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
