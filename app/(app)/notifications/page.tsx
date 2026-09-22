"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell } from "lucide-react";
import { TopBar } from "@/components/top-bar";
import { NotificationItem } from "@/components/notification-item";
import { notifications } from "@/lib/data";
import { FilterChip } from "@/components/filter-chip";
import { Notification } from "@/lib/types";

type Tab = "Semua" | "Pesanan" | "Promo";

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Semua");

  const filtered = notifications.filter((n) => {
    if (activeTab === "Pesanan") return n.type === "order";
    if (activeTab === "Promo") return n.type === "promo";
    return true;
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const todayNotifs = filtered.filter(
    (n) => new Date(n.createdAt) >= today
  );
  const yesterdayNotifs = filtered.filter((n) => {
    const d = new Date(n.createdAt);
    return d >= yesterday && d < today;
  });
  const olderNotifs = filtered.filter((n) => new Date(n.createdAt) < yesterday);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const renderGroup = (title: string, items: Notification[]) => {
    if (items.length === 0) return null;
    return (
      <div key={title}>
        <div className="flex items-center gap-2 px-1 mb-2 mt-4">
          <span className="text-[11px] font-extrabold text-text-muted tracking-wider uppercase">
            {title}
          </span>
          <div className="flex-1 h-px bg-border" />
        </div>
        <div className="space-y-2">
          {items.map((n) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl overflow-hidden shadow-card"
            >
              <NotificationItem notification={n} />
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-bg min-h-screen">
      {/* Header */}
      <div className="bg-surface px-4 pt-4 pb-0">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h1 className="font-extrabold text-text text-lg">Notifikasi</h1>
            {unreadCount > 0 && (
              <span className="bg-danger text-white text-[11px] font-bold px-2 py-0.5 rounded-pill">
                {unreadCount} baru
              </span>
            )}
          </div>
          <div className="w-9 h-9 bg-bg rounded-xl flex items-center justify-center">
            <Bell size={16} className="text-text-muted" />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 pb-0">
          {(["Semua", "Pesanan", "Promo"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 px-1 text-sm font-semibold border-b-2 transition-all ${
                activeTab === tab
                  ? "text-primary border-primary"
                  : "text-text-muted border-transparent"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pb-6">
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center py-16 text-center">
              <Bell size={40} className="text-border mb-3" />
              <p className="font-bold text-text-muted">Tidak ada notifikasi</p>
            </div>
          ) : (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {renderGroup("HARI INI", todayNotifs)}
              {renderGroup("KEMARIN", yesterdayNotifs)}
              {renderGroup("LEBIH LAMA", olderNotifs)}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
