"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Star, MapPin, ShoppingBag, Store as StoreIcon, Clock, Tag } from "lucide-react";
import { FoodItem, Store } from "@/lib/types";
import { formatRupiah, cn } from "@/lib/utils";
import { DiscountBadge } from "./discount-badge";
import { useCartStore } from "@/lib/store/cart-store";

interface FoodCardProps {
  food: FoodItem;
  store: Store;
  variant?: "featured" | "grid" | "list";
}

export function FoodCard({ food, store, variant = "featured" }: FoodCardProps) {
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);

  const handleBungkus = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(food.id, 1);
  };

  if (variant === "featured") {
    return (
      <div
        onClick={() => router.push(`/food/${food.id}`)}
        className="group bg-white rounded-2xl shadow-[0px_4px_16px_-2px_rgba(120,53,15,0.07)] overflow-hidden border border-slate-100/70 cursor-pointer active:scale-[0.99] transition-all hover:shadow-[0px_8px_24px_-4px_rgba(120,53,15,0.1)]"
      >
        {/* Card Image Banner with Overlays */}
        <div className="relative h-44 w-full overflow-hidden bg-slate-100">
          <Image
            src={food.imageUrl}
            alt={food.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 430px) 100vw, 400px"
            unoptimized
          />

          {/* Discount Pill (Top Left) */}
          <div className="absolute top-3 left-3 z-10 flex items-center gap-1 rounded-full bg-gradient-to-r from-[#3A8B79] to-[#2A6B5C] px-2.5 py-1 text-white text-[11px] font-bold shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1)]">
            <Tag size={11} className="stroke-[2.5]" />
            <span>HEMAT {food.discountPercent}%</span>
          </div>

          {/* Urgency Pill (Top Right) */}
          <div className="absolute top-3 right-3 z-10 flex items-center gap-1 rounded-full backdrop-blur-md bg-[#F8F9FF]/90 px-2.5 py-1 text-[11px] font-bold shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border border-white/60">
            <Clock size={11} className="text-[#2A6B5C] stroke-[2.5]" />
            <span className="bg-gradient-to-r from-[#3A8B79] to-[#2A6B5C] bg-clip-text text-transparent">
              {food.urgencyText ?? "Tersisa 45 menit"}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 flex flex-col gap-2">
          {/* Store row & Rating */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 min-w-0">
              <StoreIcon size={13} className="text-[#2A6B5C] shrink-0" />
              <span className="text-[11px] font-semibold text-[#123F36] truncate">
                {store.name}
              </span>
            </div>

            <div className="flex items-center gap-1 rounded-full bg-[#EFF4FF] px-2 py-0.5 shrink-0">
              <Star size={11} className="fill-[#F9BD22] text-[#F9BD22]" />
              <span className="text-[11px] font-bold text-[#121C2A]">{store.rating}</span>
              <span className="text-[11px] font-normal text-[#584237]">
                ({food.reviewCount})
              </span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-[17px] font-bold text-[#121C2A] leading-snug line-clamp-1 group-hover:text-[#2A6B5C] transition-colors">
            {food.title}
          </h3>

          {/* Price & Action row */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex flex-col">
              <span className="text-xs text-[#8C7164] line-through font-normal leading-tight">
                {formatRupiah(food.originalPrice)}
              </span>
              <span className="text-[22px] font-extrabold text-[#2A6B5C] leading-none mt-0.5 tracking-tight">
                {formatRupiah(food.discountedPrice)}
              </span>
            </div>

            <button
              type="button"
              onClick={handleBungkus}
              className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#3A8B79] to-[#2A6B5C] px-4 py-2 text-xs font-bold text-white shadow-[0px_2px_4px_#649E90] active:scale-95 transition-all hover:brightness-105"
            >
              <ShoppingBag size={13} className="stroke-[2.5]" />
              <span>Bungkus</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "list") {
    return (
      <div
        onClick={() => router.push(`/food/${food.id}`)}
        className="bg-surface rounded-card shadow-card flex gap-3 p-3 cursor-pointer active:scale-[0.99] transition-transform"
      >
        {/* Image */}
        <div className="relative w-28 h-24 flex-shrink-0 rounded-xl overflow-hidden">
          <Image
            src={food.imageUrl}
            alt={food.title}
            fill
            className="object-cover"
            sizes="112px"
            unoptimized
          />
          <DiscountBadge percent={food.discountPercent} size="sm" className="absolute top-1.5 left-1.5" />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
          <div>
            <div className="flex items-center gap-1 mb-0.5">
              <span className="text-[11px] text-text-muted font-medium line-clamp-1">{store.name}</span>
              <span className="text-[10px] text-text-muted">·</span>
              <Star size={10} className="text-yellow-400 fill-yellow-400" />
              <span className="text-[10px] font-semibold text-text">{store.rating}</span>
              <span className="text-[10px] text-text-muted">· {store.distance}</span>
            </div>
            <h3 className="font-bold text-text text-sm line-clamp-2 leading-tight">{food.title}</h3>
            <p className="text-[10px] text-text-muted mt-0.5">Tersisa {food.portionsLeft} porsi</p>
          </div>

          <div className="flex items-center justify-between mt-1">
            <div>
              <span className="text-danger line-through text-[11px] mr-1">
                {formatRupiah(food.originalPrice)}
              </span>
              <span className="text-primary font-extrabold text-sm">
                {formatRupiah(food.discountedPrice)}
              </span>
            </div>
            <button
              onClick={handleBungkus}
              className="flex items-center gap-1 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-pill active:scale-95 transition"
            >
              <ShoppingBag size={12} />
              Bungkus
            </button>
          </div>
        </div>
      </div>
    );
  }

  // grid variant
  return (
    <div
      onClick={() => router.push(`/food/${food.id}`)}
      className="bg-surface rounded-card shadow-card overflow-hidden cursor-pointer active:scale-[0.98] transition-transform"
    >
      {/* Image */}
      <div className="relative h-36 w-full">
        <Image
          src={food.imageUrl}
          alt={food.title}
          fill
          className="object-cover"
          sizes="200px"
          unoptimized
        />
        <DiscountBadge percent={food.discountPercent} size="sm" className="absolute top-2 left-2" />
        {food.portionsLeft <= 3 && (
          <span className="absolute top-2 right-2 bg-accent text-white text-[10px] font-bold px-2 py-0.5 rounded-pill">
            Segera Habis
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-2.5">
        <div className="flex items-center gap-1 mb-1">
          <span className="text-[10px] text-text-muted font-medium line-clamp-1 flex-1">{store.name}</span>
          <Star size={10} className="text-yellow-400 fill-yellow-400 flex-shrink-0" />
          <span className="text-[10px] font-semibold text-text">{store.rating}</span>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-text-muted mb-1.5">
          <MapPin size={9} />
          <span>{store.distance}</span>
        </div>
        <h3 className="font-bold text-text text-[13px] line-clamp-2 leading-tight mb-2">{food.title}</h3>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-danger line-through text-[10px] block">
              {formatRupiah(food.originalPrice)}
            </span>
            <span className="text-primary font-extrabold text-sm">
              {formatRupiah(food.discountedPrice)}
            </span>
          </div>
          <button
            onClick={handleBungkus}
            className="flex items-center gap-1 bg-primary text-white text-[11px] font-bold px-2.5 py-1.5 rounded-pill active:scale-95 transition"
          >
            <ShoppingBag size={11} />
            Bungkus
          </button>
        </div>
      </div>
    </div>
  );
}
