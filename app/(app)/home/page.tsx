"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, Utensils } from "lucide-react";
import { TopBar } from "@/components/top-bar";
import { HeroBanner } from "@/components/home/hero-banner";
import { StatsBar } from "@/components/home/stats-bar";
import { CategoryTabs } from "@/components/home/category-tabs";
import { FoodCard } from "@/components/food-card";
import { HowItWorks } from "@/components/home/how-it-works";
import { foodItems, stores } from "@/lib/data";
import { Category } from "@/lib/types";

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<Category>("Semua");

  const filteredItems =
    activeCategory === "Semua"
      ? foodItems.slice(0, 3)
      : foodItems.filter((f) => f.category === activeCategory);

  return (
    <div className="min-h-screen bg-bg">
      {/* 1. Top Navigation Bar (Sticky Top) */}
      <TopBar variant="home" />

      <main className="space-y-1">
        {/* 2. Hero Banner */}
        <HeroBanner />

        {/* 3. Impact Metrics Bar */}
        <StatsBar />

        {/* 4. Category Filter Tabs */}
        <CategoryTabs
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />

        {/* 5. Section Header */}
        <div className="flex items-end justify-between px-4 pt-6 pb-2">
          <div className="flex flex-col">
            <h2 className="text-[18px] font-bold tracking-tight text-[#121C2A]">
              Jelajahi Makanan Hari Ini
            </h2>
            <p className="text-xs text-[#584237] mt-0.5">
              Siap diambil sebelum toko tutup malam ini
            </p>
          </div>

          <div className="flex items-center gap-1 pb-0.5">
            <span className="text-[11px] font-bold bg-gradient-to-r from-[#3A8B79] to-[#2A6B5C] bg-clip-text text-transparent">
              {filteredItems.length} Tersedia
            </span>
            <SlidersHorizontal size={11} className="text-[#2A6B5C]" />
          </div>
        </div>

        {/* 6. Food Surplus Cards Feed */}
        <div className="flex flex-col gap-4 px-4 pt-1">
          <AnimatePresence mode="wait">
            {filteredItems.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="flex flex-col items-center justify-center rounded-2xl bg-white p-8 text-center border border-slate-100 shadow-sm"
              >
                <div className="flex size-12 items-center justify-center rounded-full bg-slate-100 text-slate-400 mb-3">
                  <Utensils size={22} />
                </div>
                <p className="text-sm font-bold text-[#121C2A]">
                  Belum ada makanan di kategori ini
                </p>
                <p className="text-xs text-[#584237] mt-1">
                  Coba pilih kategori lain untuk melihat surplus makanan hari ini.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveCategory("Semua")}
                  className="mt-4 text-xs font-bold text-[#2A6B5C] underline underline-offset-4"
                >
                  Kembali ke Semua
                </button>
              </motion.div>
            ) : (
              filteredItems.map((food, index) => {
                const store =
                  stores.find((s) => s.id === food.storeId) ?? stores[0];
                return (
                  <motion.div
                    key={food.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <FoodCard food={food} store={store} variant="featured" />
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>

        {/* 7. How It Works / Explainer Callout */}
        <HowItWorks />
      </main>
    </div>
  );
}
