"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Minus, Plus, X, Clock, ShoppingBag, Loader2 } from "lucide-react";
import { TopBar } from "@/components/top-bar";
import { PaymentMethodRow } from "@/components/payment-method-row";
import { PriceSummaryRow } from "@/components/price-summary-row";
import { useCartStore } from "@/lib/store/cart-store";
import { useOrdersStore } from "@/lib/store/orders-store";
import { foodItems, stores } from "@/lib/data";
import { formatRupiah } from "@/lib/utils";
import { PaymentMethod } from "@/lib/types";

const pickupWindows = [
  "16:00 – 17:00",
  "17:00 – 18:00",
  "18:00 – 19:00",
  "19:00 – 20:00",
  "20:00 – 21:00",
  "21:00 – 22:00",
];

const paymentMethods: {
  value: PaymentMethod;
  icon: string;
  label: string;
  sublabel?: string;
}[] = [
  { value: "gopay", icon: "💚", label: "GoPay / OVO / Dana", sublabel: "Dompet digital" },
  { value: "qris", icon: "📱", label: "QRIS Instan", sublabel: "Scan & bayar langsung" },
  { value: "bank_transfer", icon: "🏦", label: "Transfer Bank BCA/Mandiri", sublabel: "Via m-banking / ATM" },
  { value: "cod", icon: "💵", label: "Bayar di Tempat", sublabel: "COD saat pengambilan" },
];

export default function CartPage() {
  const router = useRouter();
  const { items, updateQty, removeItem, pickupWindow, paymentMethod, setPickupWindow, setPaymentMethod,
    originalTotal, discountTotal, handlingFee, grandTotal, clearCart } = useCartStore();
  const createOrder = useOrdersStore((s) => s.createOrder);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    if (!pickupWindow) {
      alert("Pilih jam pengambilan terlebih dahulu!");
      return;
    }
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const order = createOrder(items, pickupWindow, paymentMethod);
    clearCart();
    router.push(`/payment/${order.id}`);
  };

  if (items.length === 0) {
    return (
      <div className="bg-bg min-h-screen">
        <TopBar variant="simple" title="Keranjang Belanja" showBack={false} />
        <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
          <ShoppingBag size={56} className="text-border mb-4" />
          <h2 className="font-bold text-text text-lg">Keranjang Kosong</h2>
          <p className="text-text-muted text-sm mt-2 mb-6">
            Tambahkan makanan surplus dari restoran terdekat
          </p>
          <button
            onClick={() => router.push("/catalog")}
            className="bg-primary text-white font-bold px-8 py-3 rounded-2xl"
          >
            Jelajahi Makanan
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bg min-h-screen">
      <div className="bg-surface px-4 pt-4 pb-3">
        <h1 className="font-extrabold text-text text-lg">Keranjang Belanja</h1>
        <p className="text-text-muted text-xs">{items.length} pesanan siap diselamatkan</p>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Cart items */}
        {items.map((item) => {
          const food = foodItems.find((f) => f.id === item.foodId)!;
          const store = stores.find((s) => s.id === food?.storeId)!;
          if (!food) return null;
          return (
            <motion.div
              key={item.foodId}
              layout
              exit={{ opacity: 0, x: -50 }}
              className="bg-surface rounded-2xl p-3 shadow-card flex gap-3"
            >
              <div className="relative w-20 h-16 rounded-xl overflow-hidden flex-shrink-0">
                <Image src={food.imageUrl} alt={food.title} fill className="object-cover" unoptimized />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] text-text-muted">{store?.name}</p>
                    <p className="font-bold text-text text-sm line-clamp-2 leading-tight">{food.title}</p>
                    <p className="text-primary font-bold text-sm mt-0.5">{formatRupiah(food.discountedPrice)}</p>
                  </div>
                  <button onClick={() => removeItem(item.foodId)} className="ml-2 text-text-muted">
                    <X size={16} />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2 bg-bg rounded-xl px-2 py-1">
                    <button onClick={() => updateQty(item.foodId, item.quantity - 1)}>
                      <Minus size={13} className="text-text" />
                    </button>
                    <span className="font-bold text-text text-xs w-3 text-center">{item.quantity}</span>
                    <button onClick={() => updateQty(item.foodId, item.quantity + 1)}>
                      <Plus size={13} className="text-primary" />
                    </button>
                  </div>
                  <p className="font-bold text-text text-sm">{formatRupiah(food.discountedPrice * item.quantity)}</p>
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Pickup time */}
        <div className="bg-surface rounded-2xl p-4 shadow-card">
          <div className="flex items-center gap-2 mb-3">
            <Clock size={16} className="text-primary" />
            <h3 className="font-bold text-text text-sm">Pilih Jam Pengambilan</h3>
            <span className="bg-danger text-white text-[10px] font-bold px-2 py-0.5 rounded-pill ml-auto">
              Wajib
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {pickupWindows.map((window) => (
              <button
                key={window}
                onClick={() => setPickupWindow(window)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                  pickupWindow === window
                    ? "bg-primary text-white border-primary"
                    : "bg-bg text-text-muted border-border"
                }`}
              >
                {window} WIB
              </button>
            ))}
          </div>
          {pickupWindow && (
            <div className="mt-3 bg-primary-soft rounded-xl px-3 py-2 flex items-center gap-2">
              <Clock size={13} className="text-primary" />
              <p className="text-primary text-xs font-semibold">
                Ambil pada {pickupWindow} WIB
              </p>
            </div>
          )}
        </div>

        {/* Payment method */}
        <div className="bg-surface rounded-2xl p-4 shadow-card">
          <h3 className="font-bold text-text text-sm mb-3">Metode Pembayaran</h3>
          <div className="space-y-2">
            {paymentMethods.map((pm) => (
              <PaymentMethodRow
                key={pm.value}
                icon={pm.icon}
                label={pm.label}
                sublabel={pm.sublabel}
                value={pm.value}
                selected={paymentMethod === pm.value}
                onSelect={() => setPaymentMethod(pm.value)}
              />
            ))}
          </div>
        </div>

        {/* Price breakdown */}
        <div className="bg-surface rounded-2xl p-4 shadow-card space-y-3">
          <h3 className="font-bold text-text text-sm">Rincian Pembayaran</h3>
          <PriceSummaryRow label="Harga Asli Total" value={formatRupiah(originalTotal())} />
          <PriceSummaryRow
            label="Diskon Surplus Makanan"
            value={`−${formatRupiah(discountTotal())}`}
            isGreen
          />
          <PriceSummaryRow
            label="Biaya Penanganan Aplikasi"
            value={handlingFee() > 0 ? formatRupiah(handlingFee()) : "Gratis"}
          />
          <div className="h-px bg-border" />
          <PriceSummaryRow label="Total Bayar" value={formatRupiah(grandTotal())} isBold isLarge />
        </div>

        <div className="h-4" />
      </div>

      {/* Sticky checkout button */}
      <div className="fixed bottom-16 left-1/2 -translate-x-1/2 w-full max-w-phone px-4 pb-3 z-40">
        <button
          onClick={handleCheckout}
          disabled={isLoading}
          className="w-full bg-primary text-white font-bold py-4 rounded-2xl text-sm flex items-center justify-center gap-2 shadow-lg disabled:opacity-70 active:scale-95 transition"
        >
          {isLoading ? <Loader2 size={18} className="animate-spin" /> : null}
          {isLoading ? "Memproses..." : `Bayar Sekarang • ${formatRupiah(grandTotal())}`}
        </button>
      </div>
    </div>
  );
}
