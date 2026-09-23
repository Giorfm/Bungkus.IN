"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Star, MapPin, ShoppingBag, Store as StoreIcon, Clock, Zap } from "lucide-react";
import { FoodItem, Store } from "@/lib/types";
import { formatRupiah, cn } from "@/lib/utils";

interface FoodRescueCardProps {
  food: FoodItem;
  store: Store;
  onBungkus?: (food: FoodItem) => void;
  className?: string;
}

export function FoodRescueCard({ food, store, onBungkus, className }: FoodRescueCardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/food/${food.id}`);
  };

  const handleBungkusClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onBungkus) {
      onBungkus(food);
    }
  };

  const isCriticalStock = food.portionsLeft === 1;
  const unitText = food.unitLabel || "porsi";
  const displayUrgencyNote = food.urgencyTagline || (food.portionsLeft <= 2 ? "Segera ditutup" : "Bungkus sebelum habis");

  return (
    <article
      onClick={handleCardClick}
      className={cn(
        "group bg-white rounded-2xl p-3 shadow-sm border border-slate-100/90 flex flex-col gap-3 cursor-pointer active:scale-[0.99] transition-all hover:shadow-md",
        className
      )}
    >
      {/* Top Image Section */}
      <div className="relative h-40 w-full rounded-xl overflow-hidden bg-slate-100">
        <Image
          src={food.imageUrl}
          alt={food.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 448px) 100vw, 400px"
          unoptimized
        />

        {/* Top-Left Badge: Discount */}
        <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1 rounded-full bg-[#FFDF9F] px-2.5 py-0.5 text-[#261A00] text-xs font-bold shadow-sm">
          <Zap size={11} className="fill-[#261A00] text-[#261A00]" />
          <span>HEMAT {food.discountPercent}%</span>
        </div>

        {/* Top-Right Urgency Pill */}
        {isCriticalStock ? (
          <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1.5 rounded-full bg-red-600 text-white text-xs font-bold px-2.5 py-0.5 shadow-sm">
            <span className="size-1.5 rounded-full bg-white animate-pulse" />
            <span>Tersisa 1 porsi!</span>
          </div>
        ) : (
          <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-md text-[#9D4300] text-xs font-semibold px-2.5 py-0.5 border border-white/60 shadow-sm">
            <span
              className={cn(
                "size-1.5 rounded-full",
                food.portionsLeft <= 2 ? "bg-orange-500" : "bg-emerald-600"
              )}
            />
            <span>
              Sisa {food.portionsLeft} {unitText}
            </span>
          </div>
        )}

        {/* Bottom Floating Info Bar */}
        <div className="absolute bottom-2 left-2 right-2 z-10 bg-white/95 backdrop-blur-md rounded-lg px-2.5 py-1 flex justify-between items-center text-xs shadow-sm border border-white/60">
          <div className="flex items-center gap-1 text-[#9D4300] font-semibold">
            <Clock size={12} className="stroke-[2.5]" />
            <span>{food.urgencyText || `Layak sampai ${store.closingTime}`}</span>
          </div>
          <span
            className={cn(
              "text-[11px] font-medium truncate max-w-[130px]",
              displayUrgencyNote === "Segera ditutup"
                ? "text-red-600 font-bold"
                : displayUrgencyNote === "100% Buah Asli"
                ? "text-emerald-700 font-semibold"
                : "text-stone-500"
            )}
          >
            {displayUrgencyNote}
          </span>
        </div>
      </div>

      {/* Body Details */}
      <div className="flex flex-col gap-1.5">
        {/* Merchant row & Rating */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <StoreIcon size={13} className="text-emerald-700 shrink-0" />
            <span className="text-xs font-semibold text-[#123F36] truncate">
              {store.name}
            </span>
          </div>

          <div className="flex items-center gap-1 rounded-full bg-[#EFF4FF] px-2 py-0.5 shrink-0">
            <Star size={11} className="fill-[#F9BD22] text-[#F9BD22]" />
            <span className="text-xs font-bold text-[#121C2A]">{store.rating}</span>
            <span className="text-[11px] font-normal text-stone-500">
              ({food.reviewCount})
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base md:text-lg font-bold text-gray-900 line-clamp-1 leading-snug group-hover:text-emerald-700 transition-colors">
          {food.title}
        </h3>

        {/* Meta tags */}
        <div className="flex items-center gap-1.5 text-xs">
          <div className="flex items-center gap-0.5 text-emerald-700 font-medium">
            <MapPin size={11} />
            <span>{store.distance}</span>
          </div>
          <span className="text-stone-300">•</span>
          <span className="text-stone-600 font-normal truncate">
            {food.packagingTag || food.category}
          </span>
        </div>

        {/* Pricing & CTA Row */}
        <div className="flex items-end justify-between pt-1">
          <div className="flex flex-col">
            <span className="text-xs text-stone-400 line-through font-normal leading-tight">
              {formatRupiah(food.originalPrice)}
            </span>
            <span className="text-xl font-extrabold text-emerald-700 leading-none mt-0.5 tracking-tight">
              {formatRupiah(food.discountedPrice)}
            </span>
          </div>

          <button
            type="button"
            onClick={handleBungkusClick}
            className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-700 text-white text-xs font-semibold px-4 py-2 shadow-sm active:scale-95 transition-transform hover:brightness-105"
            aria-label={`Bungkus ${food.title}`}
          >
            <ShoppingBag size={13} className="stroke-[2.5]" />
            <span>Bungkus</span>
          </button>
        </div>
      </div>
    </article>
  );
}
