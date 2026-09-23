"use client";

import Link from "next/link";
import { ArrowRight, Store, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function HeroBanner() {
  return (
    <div className="px-4 pt-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="relative overflow-hidden rounded-2xl bg-[#E6FFF8] p-5 shadow-[0px_8px_24px_-4px_rgba(120,53,15,0.06)] border border-emerald-100/50"
      >
        {/* Decorative background glow blobs */}
        <div className="pointer-events-none absolute -right-8 -top-8 size-36 rounded-full bg-orange-500/10 blur-[20px]" />
        <div className="pointer-events-none absolute -bottom-6 -left-6 size-28 rounded-full bg-[#006E2F]/10 blur-[14px]" />

        <div className="relative z-10 flex flex-col gap-3">
          {/* Floating Eco Pill */}
          <div className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#F8F9FF] px-3 py-1 shadow-[0px_2px_4px_rgba(0,110,47,0.08)]">
            <span className="text-xs">🌱</span>
            <span className="text-[11px] font-bold tracking-tight text-[#006E2F]">
              3.2 ton makanan terselamatkan minggu ini
            </span>
          </div>

          {/* Heading & Subtitle */}
          <div className="space-y-1.5">
            <h1 className="text-[24px] sm:text-[26px] font-extrabold tracking-tight leading-[1.2] text-[#121C2A]">
              Selamatkan Makanan,
              <br />
              <span className="bg-gradient-to-r from-[#3A8B79] to-[#2A6B5C] bg-clip-text text-transparent">
                Hemat Uang
              </span>
            </h1>

            <p className="text-[13px] leading-relaxed text-[#123F36] max-w-[280px]">
              Nikmati makanan lezat berkualitas tinggi dari kafe & restoran favoritmu
              dengan diskon 50–80% sebelum jam operasional berakhir!
            </p>
          </div>

          {/* CTA & Quick Action */}
          <div className="flex items-center gap-3 pt-1">
            <Link
              href="/catalog"
              className="flex-1 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#3A8B79] to-[#2A6B5C] px-5 py-3 text-sm font-bold text-white shadow-[0px_4px_10px_rgba(42,107,92,0.35)] active:scale-95 transition-all hover:brightness-105"
            >
              <span>Lihat Makanan</span>
              <ArrowRight size={15} />
            </Link>

            <Link
              href="/catalog"
              className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#E6FFF8] text-[#2A6B5C] border border-emerald-200/60 shadow-sm active:scale-95 transition-all hover:bg-[#d9faee]"
              aria-label="Jelajahi Mitra Toko"
            >
              <Store size={18} />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
