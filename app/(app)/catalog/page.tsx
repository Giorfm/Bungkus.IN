"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { TopBar } from "@/components/top-bar";
import { FoodCard } from "@/components/food-card";
import { FilterChip } from "@/components/filter-chip";
import { foodItems, stores } from "@/lib/data";

const filters = ["Terdekat 500m", "Diskon >50%", "Roti & Pastri", "Nasi & Lauk", "Minuman", "Ayam & Bebek"];

export default function CatalogPage() {
  const [search, setSearch] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sort, setSort] = useState("closing");

  const toggleFilter = (f: string) => {
    setActiveFilters((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
    );
  };

  const filtered = useMemo(() => {
    let items = [...foodItems];

    if (search) {
      const q = search.toLowerCase();
      items = items.filter(
        (f) =>
          f.title.toLowerCase().includes(q) ||
          stores.find((s) => s.id === f.storeId)?.name.toLowerCase().includes(q)
      );
    }

    if (activeFilters.includes("Diskon >50%")) {
      items = items.filter((f) => f.discountPercent > 50);
    }
    if (activeFilters.includes("Roti & Pastri")) {
      items = items.filter((f) => f.category === "Roti & Kue");
    }
    if (activeFilters.includes("Nasi & Lauk")) {
      items = items.filter((f) => f.category === "Nasi & Lauk");
    }
    if (activeFilters.includes("Minuman")) {
      items = items.filter((f) => f.category === "Minuman");
    }
    if (activeFilters.includes("Ayam & Bebek")) {
      items = items.filter((f) => f.category === "Ayam & Bebek");
    }

    if (sort === "closing") {
      items.sort((a, b) => new Date(a.expiresAt).getTime() - new Date(b.expiresAt).getTime());
    } else if (sort === "discount") {
      items.sort((a, b) => b.discountPercent - a.discountPercent);
    } else if (sort === "price") {
      items.sort((a, b) => a.discountedPrice - b.discountedPrice);
    }

    return items;
  }, [search, activeFilters, sort]);

  return (
    <div className="bg-bg min-h-screen">
      {/* Search TopBar */}
      <div className="bg-surface px-4 pt-4 pb-3 sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2 bg-bg rounded-2xl px-3 py-2.5 border border-border">
            <Search size={16} className="text-text-muted flex-shrink-0" />
            <input
              type="text"
              placeholder="Cari makanan terdekat di sekitarmu"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent text-sm text-text outline-none placeholder:text-text-muted"
            />
            {search && (
              <button onClick={() => setSearch("")}>
                <X size={14} className="text-text-muted" />
              </button>
            )}
          </div>
          <button className="w-10 h-10 bg-primary-soft rounded-xl flex items-center justify-center">
            <SlidersHorizontal size={16} className="text-primary" />
          </button>
        </div>
      </div>

      <div className="px-4 py-3 space-y-3">
        {/* Result count */}
        <div className="flex items-center justify-between">
          <p className="text-text-muted text-xs font-medium">
            <span className="font-bold text-text">{filtered.length}</span> makanan tersedia di sekitarmu
          </p>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="text-xs font-semibold text-primary bg-primary-soft border-0 rounded-xl px-2 py-1 outline-none cursor-pointer"
          >
            <option value="closing">⏰ Segera Tutup</option>
            <option value="discount">🔥 Diskon Terbesar</option>
            <option value="price">💰 Harga Terendah</option>
          </select>
        </div>

        {/* Filter chips */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {filters.map((f) => (
            <FilterChip
              key={f}
              label={f}
              active={activeFilters.includes(f)}
              onClick={() => toggleFilter(f)}
            />
          ))}
        </div>

        {/* Food list */}
        <div className="space-y-3">
          {filtered.map((food, idx) => {
            const store = stores.find((s) => s.id === food.storeId)!;
            return (
              <motion.div
                key={food.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.04, duration: 0.3 }}
              >
                <FoodCard food={food} store={store} variant="list" />
              </motion.div>
            );
          })}

          {filtered.length === 0 && (
            <div className="flex flex-col items-center py-16 text-center">
              <Search size={40} className="text-border mb-3" />
              <p className="font-bold text-text-muted">Tidak ada hasil</p>
              <p className="text-xs text-text-muted mt-1">Coba ubah filter atau kata kunci pencarian</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
