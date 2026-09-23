"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  X,
  MapPin,
  ChevronDown,
  Bell,
  Leaf,
  Navigation,
  Percent,
  Croissant,
  Utensils,
  Cookie,
  Apple,
  CheckCircle2,
  Clock,
  Flame,
  ArrowUpDown,
  LucideIcon,
} from "lucide-react";
import { FoodRescueCard } from "@/components/food-rescue-card";
import { foodItems, stores, notifications } from "@/lib/data";
import { FoodItem } from "@/lib/types";
import { useCartStore } from "@/lib/store/cart-store";
import { cn } from "@/lib/utils";

interface CategoryChip {
  id: string;
  label: string;
  icon: LucideIcon;
}

const CATEGORIES: CategoryChip[] = [
  { id: "terdekat", label: "Terdekat (500m)", icon: Navigation },
  { id: "diskon-60", label: "Diskon >60%", icon: Percent },
  { id: "roti", label: "Roti & Pastry", icon: Croissant },
  { id: "nasi", label: "Nasi & Lauk", icon: Utensils },
  { id: "camilan", label: "Camilan", icon: Cookie },
  { id: "buah", label: "Sayur / Buah", icon: Apple },
];

const SORT_OPTIONS = [
  { id: "closing", label: "Paling Segera Tutup ⏱️" },
  { id: "discount", label: "Diskon Terbesar 🔥" },
  { id: "price", label: "Harga Terendah 💰" },
];

export default function CatalogPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("terdekat");
  const [sortOption, setSortOption] = useState("closing");
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const addItem = useCartStore((s) => s.addItem);
  const unreadCount = notifications.filter((n) => !n.read).length;

  // Handle toast timeout
  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 2500);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const handleBungkus = (food: FoodItem) => {
    addItem(food.id, 1);
    setToastMessage("Makanan berhasil dimasukkan keranjang!");
  };

  const filteredItems = useMemo(() => {
    let items = [...foodItems];

    // Filter by search query
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter((f) => {
        const store = stores.find((s) => s.id === f.storeId);
        return (
          f.title.toLowerCase().includes(q) ||
          f.description.toLowerCase().includes(q) ||
          f.category.toLowerCase().includes(q) ||
          store?.name.toLowerCase().includes(q)
        );
      });
    }

    // Filter by selected category
    if (selectedCategory === "terdekat") {
      // Prioritize nearby items (under 1km or default order)
      items = items.filter((f) => {
        const store = stores.find((s) => s.id === f.storeId);
        return store ? !store.distance.includes("km") || parseFloat(store.distance) <= 1.2 : true;
      });
    } else if (selectedCategory === "diskon-60") {
      items = items.filter((f) => f.discountPercent >= 60);
    } else if (selectedCategory === "roti") {
      items = items.filter(
        (f) =>
          f.category === "Roti & Pastry" ||
          f.category === "Roti & Kue" ||
          f.title.toLowerCase().includes("roti") ||
          f.title.toLowerCase().includes("croissant")
      );
    } else if (selectedCategory === "nasi") {
      items = items.filter(
        (f) =>
          f.category === "Nasi & Lauk" ||
          f.title.toLowerCase().includes("nasi") ||
          f.title.toLowerCase().includes("bento") ||
          f.title.toLowerCase().includes("ayam")
      );
    } else if (selectedCategory === "camilan") {
      items = items.filter(
        (f) =>
          f.category === "Camilan" ||
          f.category === "Dessert" ||
          f.title.toLowerCase().includes("martabak")
      );
    } else if (selectedCategory === "buah") {
      items = items.filter(
        (f) =>
          f.category === "Sayur / Buah" ||
          f.category === "Minuman" ||
          f.title.toLowerCase().includes("jus") ||
          f.title.toLowerCase().includes("buah")
      );
    }

    // Sort items
    if (sortOption === "closing") {
      items.sort((a, b) => new Date(a.expiresAt).getTime() - new Date(b.expiresAt).getTime());
    } else if (sortOption === "discount") {
      items.sort((a, b) => b.discountPercent - a.discountPercent);
    } else if (sortOption === "price") {
      items.sort((a, b) => a.discountedPrice - b.discountedPrice);
    }

    return items;
  }, [search, selectedCategory, sortOption]);

  const currentSortLabel =
    SORT_OPTIONS.find((s) => s.id === sortOption)?.label || "Paling Segera Tutup ⏱️";

  return (
    <div className="bg-slate-50 min-h-screen relative flex flex-col pb-24">
      {/* 2. Header & Sticky Top Bar */}
      <header className="sticky top-0 z-30 w-full bg-slate-50/90 backdrop-blur-md px-4 h-16 flex items-center justify-between shadow-sm border-b border-slate-100/70">
        {/* Left: Brand logo icon + "Bungkus.in" brand text + Location chip */}
        <div className="flex items-center gap-2.5">
          {/* Brand logo icon */}
          <div className="relative size-8 shrink-0 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-sm overflow-hidden">
            <svg viewBox="0 0 32 32" fill="none" className="size-5">
              <path
                d="M8 12C8 10.8954 8.89543 10 10 10H22C23.1046 10 24 10.8954 24 12V24C24 25.1046 23.1046 26 22 26H10C8.89543 26 8 25.1046 8 24V12Z"
                fill="#FFF7ED"
              />
              <path
                d="M12 10V8C12 5.79086 13.7909 4 16 4C18.2091 4 20 5.79086 20 8V10"
                stroke="#2A6B5C"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M16 14C16 14 18 16 20 15C20 17 18 19 16 18C14 19 12 17 12 15C14 16 16 14 16 14Z"
                fill="#2A6B5C"
              />
            </svg>
          </div>

          {/* Brand Title & Location Sub-element */}
          <div className="flex flex-col items-start leading-none">
            <span className="font-extrabold text-lg text-emerald-700 tracking-tight">
              Bungkus.in
            </span>
            <button
              type="button"
              className="mt-0.5 bg-emerald-50 text-slate-800 text-xs px-2 py-0.5 rounded-full flex items-center gap-1 hover:bg-emerald-100/80 transition-colors"
            >
              <MapPin size={10} className="text-emerald-700 shrink-0" />
              <span className="font-semibold text-[11px] truncate max-w-[95px]">Jakarta Selatan</span>
              <ChevronDown size={10} className="text-slate-600 shrink-0" />
            </button>
          </div>
        </div>

        {/* Right: Notification Bell & User Avatar */}
        <div className="flex items-center gap-1">
          <Link
            href="/notifications"
            className="relative size-10 flex items-center justify-center rounded-full hover:bg-slate-200/50 active:scale-95 transition-all text-[#123F36]"
            aria-label="Notifikasi"
          >
            <Bell size={20} className="text-slate-700" />
            {unreadCount > 0 && (
              <span className="absolute top-2.5 right-2.5 size-2 bg-orange-500 rounded-full ring-2 ring-white" />
            )}
          </Link>

          <Link
            href="/profile"
            className="relative size-8 rounded-full overflow-hidden ring-1 ring-slate-200 shadow-sm active:scale-95 transition-all ml-1"
            aria-label="Profil"
          >
            <Image
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop"
              alt="User Avatar"
              fill
              className="object-cover"
              sizes="32px"
              unoptimized
            />
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col gap-3 px-4 pt-3">
        {/* 3. Search & Quick Filters Section */}
        <div className="flex flex-col gap-2.5">
          {/* Search Bar & Adjustments Button */}
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center gap-2 bg-white rounded-full px-3.5 py-2.5 shadow-sm border border-slate-100">
              <Search size={16} className="text-stone-400 shrink-0" />
              <input
                type="text"
                placeholder="Cari makanan surplus terdekat..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-stone-400"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="text-stone-400 hover:text-stone-600 transition-colors"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Filter Adjustments Button */}
            <button
              type="button"
              className="size-11 rounded-full bg-sky-50 flex items-center justify-center relative hover:bg-sky-100 active:scale-95 transition-all shrink-0 shadow-sm"
              aria-label="Filter"
            >
              <SlidersHorizontal size={16} className="text-sky-800" />
              <span className="absolute top-2.5 right-2.5 size-2 bg-orange-500 rounded-full" />
            </button>
          </div>

          {/* Live Status Row */}
          <div className="flex items-center justify-between px-1">
            {/* Left: Pulse dot + Rescue count */}
            <div className="flex items-center gap-2">
              <span className="relative flex size-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full size-2.5 bg-emerald-600" />
              </span>
              <p className="text-xs font-bold text-emerald-800">
                <span>124 makanan</span>
                <span className="font-semibold text-emerald-800/90"> tersedia di sekitarmu</span>
              </p>
            </div>

            {/* Right: Sustainability badge */}
            <div className="bg-emerald-50 text-emerald-800 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-emerald-100/70 shadow-xs">
              <Leaf size={11} className="text-emerald-700" />
              <span>Anti-Mubazir</span>
            </div>
          </div>

          {/* Horizontal Category Scroll */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-1 -mx-4 px-4 scroll-smooth">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all active:scale-95 shrink-0",
                    isActive
                      ? "bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-sm"
                      : "bg-sky-50 text-slate-700 hover:bg-sky-100/80"
                  )}
                >
                  <Icon size={12} className={isActive ? "text-white" : "text-slate-600"} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Subheader / Sort Bar */}
          <div className="flex items-center justify-between px-1 pt-1 relative">
            <p className="text-xs text-stone-500 font-medium">
              Menampilkan penyelamatan hari ini
            </p>

            {/* Sort Pill Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsSortDropdownOpen((prev) => !prev)}
                className="bg-blue-50 text-slate-800 text-xs px-3 py-1 rounded-full font-semibold border border-blue-100/60 flex items-center gap-1 hover:bg-blue-100/70 transition-colors shadow-xs"
              >
                <span>{currentSortLabel}</span>
                <ChevronDown size={11} className="text-slate-600" />
              </button>

              {/* Dropdown Menu */}
              {isSortDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsSortDropdownOpen(false)}
                  />
                  <div className="absolute right-0 top-8 z-50 bg-white rounded-xl shadow-lg border border-slate-100 py-1 min-w-[170px] overflow-hidden">
                    {SORT_OPTIONS.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          setSortOption(opt.id);
                          setIsSortDropdownOpen(false);
                        }}
                        className={cn(
                          "w-full text-left px-3 py-2 text-xs font-medium transition-colors flex items-center justify-between",
                          sortOption === opt.id
                            ? "bg-emerald-50 text-emerald-800 font-bold"
                            : "text-slate-700 hover:bg-slate-50"
                        )}
                      >
                        <span>{opt.label}</span>
                        {sortOption === opt.id && (
                          <span className="size-1.5 rounded-full bg-emerald-600" />
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* 4. Food Rescue Item Cards Feed */}
        <div className="flex flex-col gap-4 mt-1">
          {filteredItems.map((food, idx) => {
            const store = stores.find((s) => s.id === food.storeId) || {
              id: "store-unknown",
              name: "Mitra Resto",
              rating: 4.8,
              distance: "500 m",
              logoUrl: "",
              address: "Jakarta Selatan",
              closingTime: "21:00",
            };

            return (
              <motion.div
                key={food.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(idx * 0.05, 0.25), duration: 0.25 }}
              >
                <FoodRescueCard
                  food={food}
                  store={store}
                  onBungkus={handleBungkus}
                />
              </motion.div>
            );
          })}

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-white rounded-2xl border border-slate-100 shadow-sm mt-2">
              <div className="size-14 rounded-full bg-emerald-50 flex items-center justify-center mb-3">
                <Search size={24} className="text-emerald-700" />
              </div>
              <h3 className="font-bold text-slate-800 text-sm">Tidak ada makanan ditemukan</h3>
              <p className="text-xs text-stone-500 mt-1 max-w-[220px]">
                Coba ubah kata kunci pencarian atau pilih filter kategori lainnya.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("terdekat");
                }}
                className="mt-4 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold hover:bg-emerald-100 transition-colors"
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>
      </main>

      {/* 5. Floating Micro Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 15, x: "-50%" }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-slate-800 text-white text-xs rounded-full px-4 py-2.5 shadow-xl flex items-center gap-2 pointer-events-none whitespace-nowrap border border-slate-700/60"
          >
            <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
            <span className="font-medium tracking-tight">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
