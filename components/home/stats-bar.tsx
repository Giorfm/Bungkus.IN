"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "5.000+", label: "Pesanan" },
  { value: "180+", label: "Mitra Toko" },
  { value: "27 Ton", label: "Diselamatkan" },
];

export function StatsBar() {
  return (
    <div className="px-4 pt-3.5">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.08 }}
        className="grid grid-cols-3 gap-2 rounded-2xl bg-white p-2 shadow-[0px_4px_16px_-2px_rgba(120,53,15,0.05)] border border-slate-100/70"
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center justify-center rounded-xl bg-[#F3FFFC]/80 py-2.5 px-1 text-center transition-colors"
          >
            <span className="text-[17px] font-extrabold tracking-tight bg-gradient-to-r from-[#3A8B79] to-[#2A6B5C] bg-clip-text text-transparent leading-none">
              {stat.value}
            </span>
            <span className="text-[11px] font-semibold text-[#584237] mt-1 leading-tight">
              {stat.label}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
