"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag, Store, Leaf } from "lucide-react";
import { TopBar } from "@/components/top-bar";
import { FoodCard } from "@/components/food-card";
import { StatPill } from "@/components/stat-pill";
import { FilterChip } from "@/components/filter-chip";
import { foodItems, stores } from "@/lib/data";
import { Category } from "@/lib/types";

const categories: Category[] = [
  "Semua",
  "Roti & Kue",
  "Nasi & Lauk",
  "Ayam & Bebek",
  "Minuman",
  "Dessert",
  "Seafood",
  "Vegetarian",
];

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<Category>("Semua");

  const filteredItems =
    activeCategory === "Semua"
      ? foodItems.slice(0, 10)
      : foodItems.filter((f) => f.category === activeCategory).slice(0, 10);

  return (
    <div className="bg-bg min-h-screen">
      <TopBar variant="home" />

      <div className="px-4 space-y-5 pb-6">
        {/* Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-3xl bg-gradient-to-br from-primary to-primary-dark p-5 text-white overflow-hidden relative"
        >
          <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-white/10 rounded-full" />
          <div className="absolute -right-4 -top-4 w-20 h-20 bg-white/10 rounded-full" />
          <p className="text-white/80 text-xs font-medium mb-1">🌿 Bungkus.in</p>
          <h2 className="text-xl font-extrabold leading-tight mb-2">
            Selamatkan Makanan,<br />Hemat Uang
          </h2>
          <p className="text-white/70 text-xs leading-relaxed mb-4 max-w-[200px]">
            Nikmati makanan berkualitas dari restoran & bakery terdekat dengan diskon 50–75%
          </p>
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 bg-white text-primary font-bold text-xs px-4 py-2 rounded-pill shadow-sm"
          >
            Lihat Makanan <ArrowRight size={14} />
          </Link>

          {/* Stats */}
          <div className="flex gap-2 mt-4 overflow-x-auto scrollbar-hide">
            <StatPill icon="🛍️" value="5.000+" label="Pesanan" />
            <StatPill icon="🏪" value="180+" label="Mitra Toko" />
            <StatPill icon="♻️" value="27 Ton" label="Diselamatkan" />
          </div>
        </motion.div>

        {/* Category chips */}
        <div>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {categories.map((cat) => (
              <FilterChip
                key={cat}
                label={cat}
                active={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
              />
            ))}
          </div>
        </div>

        {/* Food section */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <div>
              <h2 className="font-bold text-text text-base">Jelajahi Makanan Hari Ini</h2>
              <p className="text-text-muted text-xs">Siap diambil hari ini sebelum tutup</p>
            </div>
            <Link href="/catalog" className="text-primary text-xs font-semibold">
              Lihat Semua
            </Link>
          </div>

          {filteredItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Leaf size={40} className="text-border mb-3" />
              <p className="font-semibold text-text-muted">Tidak ada makanan tersedia</p>
              <p className="text-xs text-text-muted">Coba kategori lain</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {filteredItems.map((food) => {
                const store = stores.find((s) => s.id === food.storeId)!;
                return (
                  <motion.div
                    key={food.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FoodCard food={food} store={store} variant="grid" />
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
