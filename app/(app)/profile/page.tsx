"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Wallet, Tag, ChevronRight, ShoppingBag, Heart, Star, MapPin,
  Bell, HelpCircle, Info, LogOut, Leaf
} from "lucide-react";
import { TopBar } from "@/components/top-bar";
import { useAuthStore } from "@/lib/store/auth-store";
import { formatCompact, formatRupiah, getInitials } from "@/lib/utils";
import { useOrdersStore } from "@/lib/store/orders-store";

export default function ProfilePage() {
  const router = useRouter();
  const { user, signOut } = useAuthStore();
  const orders = useOrdersStore((s) => s.orders);

  const handleSignOut = () => {
    signOut();
    router.replace("/auth/sign-in");
  };

  if (!user) return null;

  const activityItems = [
    { icon: ShoppingBag, label: "Riwayat Pesanan", count: orders.length, href: "/home" },
    { icon: Heart, label: "Toko & Resto Favorit", count: 7, href: "/catalog" },
    { icon: Star, label: "Ulasan & Penilaian", count: 3, href: "/home" },
  ];

  const settingsItems = [
    { icon: MapPin, label: "Alamat Pengambilan", href: "#" },
    { icon: Bell, label: "Pengingat & Jam Ambil", href: "#" },
    { icon: Wallet, label: "Metode Pembayaran", href: "#" },
  ];

  return (
    <div className="bg-bg min-h-screen">
      <TopBar variant="profile" title="Profil Saya" />

      <div className="px-4 py-4 space-y-4">
        {/* Profile header */}
        <div className="bg-surface rounded-2xl p-4 shadow-card flex items-center gap-4">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xl font-extrabold">{getInitials(user.name)}</span>
          </div>
          <div className="flex-1">
            <h2 className="font-extrabold text-text text-base">{user.name}</h2>
            <p className="text-text-muted text-xs">{user.email}</p>
            {user.phone && <p className="text-text-muted text-xs">{user.phone}</p>}
          </div>
          <button className="text-primary text-sm font-bold">Ubah</button>
        </div>

        {/* Impact card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-5 text-white"
        >
          <div className="flex items-center gap-2 mb-4">
            <Leaf size={16} className="text-white/80" />
            <p className="font-bold text-sm">Dampak Penyelamatanmu</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: `${user.impactKg.toString().replace(".", ",")} kg`, label: "Makanan Diselamatkan" },
              { value: formatCompact(user.impactSavings), label: "Total Hemat" },
              { value: user.ordersCompleted.toString(), label: "Pesanan Selesai" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-xl font-extrabold">{value}</p>
                <p className="text-white/70 text-[10px] mt-0.5 leading-tight">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Balance & vouchers */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-surface rounded-2xl p-4 shadow-card flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-soft rounded-xl flex items-center justify-center">
              <Wallet size={18} className="text-primary" />
            </div>
            <div>
              <p className="font-extrabold text-primary text-sm">{formatRupiah(0)}</p>
              <p className="text-text-muted text-[11px]">Bungkus.in Pay</p>
            </div>
          </div>
          <div className="bg-surface rounded-2xl p-4 shadow-card flex items-center gap-3">
            <div className="w-10 h-10 bg-warning-bg rounded-xl flex items-center justify-center">
              <Tag size={18} className="text-accent" />
            </div>
            <div>
              <p className="font-extrabold text-accent text-sm">2 Voucher</p>
              <p className="text-text-muted text-[11px]">Voucher Saya</p>
            </div>
          </div>
        </div>

        {/* Aktivitas Saya */}
        <div className="bg-surface rounded-2xl shadow-card overflow-hidden">
          <div className="px-4 py-3 border-b border-border">
            <h3 className="font-bold text-text text-sm">Aktivitas Saya</h3>
          </div>
          {activityItems.map(({ icon: Icon, label, count, href }, idx) => (
            <button
              key={label}
              onClick={() => router.push(href)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 ${idx < activityItems.length - 1 ? "border-b border-border" : ""}`}
            >
              <div className="w-9 h-9 bg-bg rounded-xl flex items-center justify-center">
                <Icon size={16} className="text-text-muted" />
              </div>
              <span className="flex-1 text-sm font-medium text-text text-left">{label}</span>
              {count > 0 && (
                <span className="bg-primary-soft text-primary text-xs font-bold px-2.5 py-0.5 rounded-pill">
                  {count}
                </span>
              )}
              <ChevronRight size={16} className="text-text-muted" />
            </button>
          ))}
        </div>

        {/* Pengaturan Akun */}
        <div className="bg-surface rounded-2xl shadow-card overflow-hidden">
          <div className="px-4 py-3 border-b border-border">
            <h3 className="font-bold text-text text-sm">Pengaturan Akun</h3>
          </div>
          {settingsItems.map(({ icon: Icon, label, href }, idx) => (
            <button
              key={label}
              onClick={() => router.push(href)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 ${idx < settingsItems.length - 1 ? "border-b border-border" : ""}`}
            >
              <div className="w-9 h-9 bg-bg rounded-xl flex items-center justify-center">
                <Icon size={16} className="text-text-muted" />
              </div>
              <span className="flex-1 text-sm font-medium text-text text-left">{label}</span>
              <ChevronRight size={16} className="text-text-muted" />
            </button>
          ))}
        </div>

        {/* Misc */}
        <div className="bg-surface rounded-2xl shadow-card overflow-hidden">
          {[
            { icon: HelpCircle, label: "Pusat Bantuan & FAQ" },
            { icon: Info, label: "Tentang Bungkus.in", sublabel: "v1.0.0" },
          ].map(({ icon: Icon, label, sublabel }, idx) => (
            <button
              key={label}
              className={`w-full flex items-center gap-3 px-4 py-3.5 ${idx === 0 ? "border-b border-border" : ""}`}
            >
              <div className="w-9 h-9 bg-bg rounded-xl flex items-center justify-center">
                <Icon size={16} className="text-text-muted" />
              </div>
              <span className="flex-1 text-sm font-medium text-text text-left">{label}</span>
              {sublabel && <span className="text-xs text-text-muted">{sublabel}</span>}
              <ChevronRight size={16} className="text-text-muted" />
            </button>
          ))}
        </div>

        {/* Sign out */}
        <button
          onClick={handleSignOut}
          className="w-full flex items-center justify-center gap-2 py-4 text-danger font-bold text-sm rounded-2xl border border-danger/20 bg-surface shadow-card"
        >
          <LogOut size={16} />
          Keluar dari Akun
        </button>

        <div className="h-4" />
      </div>
    </div>
  );
}
