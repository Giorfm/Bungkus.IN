"use client";

import { BadgeCheck } from "lucide-react";

export function HowItWorks() {
  return (
    <div className="px-4 pt-5 pb-6">
      <div className="flex items-start gap-3.5 rounded-2xl bg-[#E6FFF8] p-4 border border-emerald-100/60 shadow-[0px_1px_2px_rgba(0,0,0,0.04)]">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-[#2A6B5C] shadow-sm">
          <BadgeCheck size={22} className="stroke-[2.2]" />
        </div>
        <div className="flex flex-col gap-0.5">
          <h3 className="text-xs font-bold text-[#121C2A]">
            Cara Kerja Singkat Bungkus.in
          </h3>
          <p className="text-xs leading-relaxed text-[#584237]">
            Toko pasang surplus → Kamu beli dengan diskon hemat → Ambil langsung di toko
            sebelum tutup!
          </p>
        </div>
      </div>
    </div>
  );
}
