"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MapPin, Phone, HelpCircle, Clock } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { TopBar } from "@/components/top-bar";
import { OrderStatusTimeline } from "@/components/order-status-timeline";
import { PriceSummaryRow } from "@/components/price-summary-row";
import { useOrdersStore } from "@/lib/store/orders-store";
import { foodItems, stores } from "@/lib/data";
import { formatRupiah } from "@/lib/utils";

export default function PaymentPage({ params }: { params: { orderId: string } }) {
  const router = useRouter();
  const getOrder = useOrdersStore((s) => s.getOrder);
  const order = getOrder(params.orderId);

  useEffect(() => {
    if (!order) {
      router.replace("/home");
    }
  }, [order, router]);

  if (!order) return null;

  const store = stores.find((s) => s.id === order.storeId)!;
  const orderItems = order.items.map((ci) => ({
    food: foodItems.find((f) => f.id === ci.foodId)!,
    quantity: ci.quantity,
  })).filter((x) => x.food);

  const originalTotal = orderItems.reduce((sum, { food, quantity }) => sum + food.originalPrice * quantity, 0);
  const discountTotal = originalTotal - order.total + 1000;

  const statusStep = { received: 1, paid: 2, ready: 3, completed: 4 };
  const stepCount = statusStep[order.status];

  return (
    <div className="bg-bg min-h-screen">
      <TopBar variant="simple" title="Pembayaran dan Pickup" />

      <div className="px-4 py-4 space-y-4">
        {/* Store summary card */}
        <div className="bg-surface rounded-2xl p-4 shadow-card">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden">
              <Image src={store.logoUrl} alt={store.name} fill className="object-cover" unoptimized />
            </div>
            <div className="flex-1">
              <p className="font-bold text-text">{store.name}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <Clock size={12} className="text-accent" />
                <span className="text-xs text-text-muted">Tersisa 2 jam untuk pengambilan</span>
              </div>
            </div>
            <button className="flex items-center gap-1 text-primary text-xs font-semibold">
              <MapPin size={12} />
              Lihat Rute
            </button>
          </div>
          <div className="mt-3 bg-bg rounded-xl px-3 py-2 flex items-center gap-2">
            <Clock size={12} className="text-primary" />
            <span className="text-xs font-semibold text-text">
              Slot: {order.pickupWindow} WIB
            </span>
          </div>
        </div>

        {/* Order items */}
        <div className="bg-surface rounded-2xl p-4 shadow-card space-y-3">
          <h3 className="font-bold text-text text-sm">Pesanan</h3>
          {orderItems.map(({ food, quantity }) => (
            <div key={food.id} className="flex items-center gap-3">
              <div className="relative w-14 h-12 rounded-xl overflow-hidden flex-shrink-0">
                <Image src={food.imageUrl} alt={food.title} fill className="object-cover" unoptimized />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-text text-xs line-clamp-2">{food.title}</p>
                <p className="text-text-muted text-xs">x{quantity}</p>
              </div>
              <p className="font-bold text-text text-sm">{formatRupiah(food.discountedPrice * quantity)}</p>
            </div>
          ))}
        </div>

        {/* QR Code panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-surface rounded-2xl p-5 shadow-card flex flex-col items-center"
        >
          <p className="font-bold text-text text-sm mb-4">Kode Pengambilan QR</p>
          <div className="p-4 bg-bg rounded-2xl border-2 border-border">
            <QRCodeSVG
              value={`BUNGKUSIN:${order.id}:${order.pickupCode}`}
              size={160}
              fgColor="#16A34A"
              bgColor="transparent"
              level="M"
            />
          </div>
          <div className="mt-4 bg-primary-soft rounded-xl px-6 py-3 text-center">
            <p className="font-mono font-extrabold text-primary text-2xl tracking-widest">
              {order.pickupCode}
            </p>
          </div>
          <p className="text-text-muted text-xs mt-3 text-center">
            Tunjukkan QR ini kepada kasir saat pengambilan
          </p>
        </motion.div>

        {/* Status timeline */}
        <div className="bg-surface rounded-2xl p-4 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-text text-sm">Status Pembayaran</h3>
            <span className="bg-primary-soft text-primary text-xs font-bold px-3 py-1 rounded-pill">
              Lengkapi {stepCount}/4
            </span>
          </div>
          <OrderStatusTimeline status={order.status} createdAt={order.createdAt} />
        </div>

        {/* Price detail */}
        <div className="bg-surface rounded-2xl p-4 shadow-card space-y-3">
          <h3 className="font-bold text-text text-sm">Rincian Paket Hemat</h3>
          {orderItems.map(({ food, quantity }) => (
            <div key={food.id} className="flex justify-between text-xs">
              <span className="text-text-muted line-clamp-1 flex-1 mr-2">
                {food.title} x{quantity}
              </span>
              <span className="text-text font-semibold flex-shrink-0">
                {formatRupiah(food.discountedPrice * quantity)}
              </span>
            </div>
          ))}
          <div className="h-px bg-border" />
          <PriceSummaryRow label="Harga Awal" value={formatRupiah(originalTotal)} />
          <PriceSummaryRow
            label="Diskon Surplus Makanan"
            value={`−${formatRupiah(discountTotal)}`}
            isGreen
          />
          <PriceSummaryRow label="Total Pembayaran" value={formatRupiah(order.total)} isBold isLarge />
        </div>

        {/* Footer buttons */}
        <div className="grid grid-cols-2 gap-3 pb-4">
          <button className="py-3.5 border-2 border-primary text-primary font-bold rounded-2xl text-sm flex items-center justify-center gap-2">
            <Phone size={16} />
            Hubungi Toko
          </button>
          <button className="py-3.5 bg-primary text-white font-bold rounded-2xl text-sm flex items-center justify-center gap-2">
            <HelpCircle size={16} />
            Bantuan
          </button>
        </div>
      </div>
    </div>
  );
}
