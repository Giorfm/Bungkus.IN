"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Star, MapPin, ShoppingBag } from "lucide-react";
import { FoodItem, Store } from "@/lib/types";
import { formatRupiah, cn } from "@/lib/utils";
import { DiscountBadge } from "./discount-badge";
import { useCartStore } from "@/lib/store/cart-store";

interface FoodCardProps {
  food: FoodItem;
  store: Store;
  variant?: "grid" | "list";
}

export function FoodCard({ food, store, variant = "grid" }: FoodCardProps) {
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);

  const handleBungkus = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(food.id, 1);
  };

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
