"use client";

import { LucideIcon, Utensils, Croissant, Soup, Cookie, Coffee, Apple } from "lucide-react";
import { Category } from "@/lib/types";
import { cn } from "@/lib/utils";

interface CategoryItem {
  name: Category;
  label: string;
  icon: LucideIcon;
}

const categories: CategoryItem[] = [
  { name: "Semua", label: "Semua", icon: Utensils },
  { name: "Roti & Kue", label: "Roti & Kue", icon: Croissant },
  { name: "Nasi & Lauk", label: "Nasi & Lauk", icon: Soup },
  { name: "Camilan", label: "Camilan", icon: Cookie },
  { name: "Minuman", label: "Minuman", icon: Coffee },
  { name: "Buah & Sayur", label: "Buah & Sayur", icon: Apple },
];

interface CategoryTabsProps {
  activeCategory: Category;
  onSelectCategory: (category: Category) => void;
}

export function CategoryTabs({ activeCategory, onSelectCategory }: CategoryTabsProps) {
  return (
    <div className="pt-4">
      <div className="flex gap-2.5 overflow-x-auto scrollbar-hide px-4 pb-1">
        {categories.map(({ name, label, icon: Icon }) => {
          const isActive = activeCategory === name;

          return (
            <button
              key={name}
              type="button"
              onClick={() => onSelectCategory(name)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs transition-all shrink-0 active:scale-95",
                isActive
                  ? "bg-gradient-to-r from-[#3A8B79] to-[#2A6B5C] font-bold text-white shadow-[0px_2px_6px_rgba(42,107,92,0.3)]"
                  : "bg-white font-semibold text-[#123F36] border border-slate-100/90 shadow-[0px_1px_2px_rgba(0,0,0,0.04)] hover:bg-slate-50"
              )}
            >
              <Icon
                size={13}
                strokeWidth={isActive ? 2.4 : 2}
                className={isActive ? "text-white" : "text-[#584237]"}
              />
              <span className="whitespace-nowrap">{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
