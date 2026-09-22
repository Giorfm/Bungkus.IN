"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, PaymentMethod } from "../types";
import { foodItems } from "../data";

interface CartState {
  items: CartItem[];
  pickupWindow: string;
  paymentMethod: PaymentMethod;
  // actions
  addItem: (foodId: string, quantity?: number) => void;
  removeItem: (foodId: string) => void;
  updateQty: (foodId: string, quantity: number) => void;
  setPickupWindow: (window: string) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  clearCart: () => void;
  // computed
  totalItems: () => number;
  originalTotal: () => number;
  discountTotal: () => number;
  handlingFee: () => number;
  grandTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      pickupWindow: "",
      paymentMethod: "gopay",

      addItem: (foodId: string, quantity = 1) => {
        const existing = get().items.find((i) => i.foodId === foodId);
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.foodId === foodId ? { ...i, quantity: i.quantity + quantity } : i
            ),
          });
        } else {
          set({ items: [...get().items, { foodId, quantity }] });
        }
      },

      removeItem: (foodId: string) => {
        set({ items: get().items.filter((i) => i.foodId !== foodId) });
      },

      updateQty: (foodId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(foodId);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.foodId === foodId ? { ...i, quantity } : i
          ),
        });
      },

      setPickupWindow: (window: string) => set({ pickupWindow: window }),
      setPaymentMethod: (method: PaymentMethod) => set({ paymentMethod: method }),
      clearCart: () => set({ items: [], pickupWindow: "" }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      originalTotal: () =>
        get().items.reduce((sum, item) => {
          const food = foodItems.find((f) => f.id === item.foodId);
          return sum + (food ? food.originalPrice * item.quantity : 0);
        }, 0),

      discountTotal: () =>
        get().items.reduce((sum, item) => {
          const food = foodItems.find((f) => f.id === item.foodId);
          return sum + (food ? (food.originalPrice - food.discountedPrice) * item.quantity : 0);
        }, 0),

      handlingFee: () => (get().items.length > 0 ? 1000 : 0),

      grandTotal: () => {
        const items = get().items;
        const subtotal = items.reduce((sum, item) => {
          const food = foodItems.find((f) => f.id === item.foodId);
          return sum + (food ? food.discountedPrice * item.quantity : 0);
        }, 0);
        return subtotal + get().handlingFee();
      },
    }),
    {
      name: "bungkus-cart",
    }
  )
);
