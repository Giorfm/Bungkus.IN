"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter, notFound } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronLeft, Star, MapPin, Clock, ShieldCheck, Heart, Minus, Plus } from "lucide-react";
import { DiscountBadge } from "@/components/discount-badge";
import { ReviewCard } from "@/components/review-card";
import { foodItems, stores, reviews } from "@/lib/data";
import { formatRupiah } from "@/lib/utils";
import { useCartStore } from "@/lib/store/cart-store";

export default function FoodDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const food = foodItems.find((f) => f.id === params.id);
  const addItem = useCartStore((s) => s.addItem);
  const [qty, setQty] = useState(1);
  const [liked, setLiked] = useState(false);

  if (!food) return notFound();

  const store = stores.find((s) => s.id === food.storeId)!;
  const foodReviews = reviews.filter((r) => r.foodId === food.id).slice(0, 3);
  const expiresDate = new Date(food.expiresAt);
  const progressPct = Math.max(10, Math.min(90, (food.portionsLeft / 10) * 100));

  const handleAddToCart = () => {
    addItem(food.id, qty);
    router.push("/cart");
  };

  return (
    <div className="bg-bg min-h-screen">
      {/* Hero image */}
      <div className="relative h-64 w-full">
        <Image
          src={food.imageUrl}
          alt={food.title}
          fill
          className="object-cover"
          sizes="430px"
          unoptimized
          priority
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />

        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow"
        >
          <ChevronLeft size={20} className="text-text" />
        </button>

        {/* Heart */}
        <button
          onClick={() => setLiked(!liked)}
          className="absolute top-4 right-4 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow"
        >
          <Heart size={18} className={liked ? "text-danger fill-danger" : "text-text"} />
        </button>

        {/* Image badges */}
        <div className="absolute bottom-3 left-3 flex gap-2">
          <DiscountBadge percent={food.discountPercent} />
          <span className="bg-accent text-white text-xs font-bold px-2.5 py-1 rounded-pill">
            Pesan Sore Ini
          </span>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Store row */}
        <div className="flex items-center gap-3 bg-surface rounded-2xl p-3 shadow-card">
          <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
            <Image src={store.logoUrl} alt={store.name} fill className="object-cover" unoptimized />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-text text-sm">{store.name}</p>
            <div className="flex items-center gap-2 mt-0.5">
              <Star size={11} className="text-yellow-400 fill-yellow-400" />
              <span className="text-xs font-semibold text-text">{store.rating}</span>
              <span className="text-xs text-text-muted">({food.reviewCount} ulasan)</span>
              <span className="text-xs text-text-muted">·</span>
              <MapPin size={10} className="text-text-muted" />
              <span className="text-xs text-text-muted">{store.distance}</span>
            </div>
          </div>
        </div>

        {/* Title + description */}
        <div>
          <h1 className="text-xl font-extrabold text-text leading-tight">{food.title}</h1>
          <p className="text-text-muted text-sm mt-2 leading-relaxed">{food.description}</p>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-3">
          <span className="text-2xl font-extrabold text-primary">
            {formatRupiah(food.discountedPrice)}
          </span>
          <span className="text-base font-medium text-text-muted">/porsi</span>
          <span className="text-danger line-through text-sm ml-auto">
            {formatRupiah(food.originalPrice)}
          </span>
        </div>

        {/* Expiry info banner */}
        <div className="bg-primary-soft rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-primary" />
              <span className="text-xs font-semibold text-primary">
                Layak dikonsumsi s/d{" "}
                {expiresDate.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })} WIB
              </span>
            </div>
            <span className="bg-accent text-white text-[10px] font-bold px-2 py-0.5 rounded-pill">
              {food.portionsLeft <= 3 ? "Segera Habis!" : `${food.portionsLeft} Tersisa`}
            </span>
          </div>
          <div className="h-1.5 bg-white rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full bg-primary rounded-full"
            />
          </div>
          <p className="text-xs text-text-muted mt-1.5">Slot pengambilan: {food.pickupWindow} WIB</p>
        </div>

        {/* Freshness guarantee */}
        <div className="bg-surface border border-primary/20 rounded-2xl p-4 flex gap-3">
          <div className="w-9 h-9 bg-primary-soft rounded-xl flex items-center justify-center flex-shrink-0">
            <ShieldCheck size={18} className="text-primary" />
          </div>
          <div>
            <p className="font-bold text-text text-sm">Garansi Standar Kesegaran</p>
            <p className="text-xs text-text-muted mt-1 leading-relaxed">
              Semua makanan telah diverifikasi standar kebersihan & kelayakan konsumsi Bungkus.in sebelum tersedia.
            </p>
          </div>
        </div>

        {/* Reviews */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-text text-base">
              Ulasan Penyelamat Makanan ({food.reviewCount})
            </h2>
            <button className="text-primary text-xs font-semibold">Lihat Semua</button>
          </div>

          {foodReviews.length > 0 ? (
            <div className="space-y-3">
              {foodReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          ) : (
            <div className="bg-surface rounded-2xl p-6 text-center">
              <Star size={28} className="text-border mx-auto mb-2" />
              <p className="text-text-muted text-sm">Belum ada ulasan. Jadilah yang pertama!</p>
            </div>
          )}
        </div>

        {/* Bottom padding for sticky bar */}
        <div className="h-8" />
      </div>

      {/* Sticky bottom bar */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-phone bg-surface border-t border-border px-4 py-3 flex items-center gap-3 z-40">
        {/* Quantity stepper */}
        <div className="flex items-center gap-3 bg-bg rounded-2xl px-3 py-2">
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="w-7 h-7 bg-surface rounded-lg flex items-center justify-center shadow-sm"
          >
            <Minus size={14} className="text-text" />
          </button>
          <span className="font-bold text-text text-sm w-4 text-center">{qty}</span>
          <button
            onClick={() => setQty(Math.min(food.portionsLeft, qty + 1))}
            className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center shadow-sm"
          >
            <Plus size={14} className="text-white" />
          </button>
        </div>

        {/* Add to cart */}
        <button
          onClick={handleAddToCart}
          className="flex-1 bg-primary text-white font-bold text-sm py-3.5 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition shadow-md"
        >
          PAY NOW • {formatRupiah(food.discountedPrice * qty)}
        </button>
      </div>
    </div>
  );
}
