"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Order, CartItem, PaymentMethod } from "../types";
import { generatePickupCode, generateOrderId } from "../utils";
import { foodItems, stores } from "../data";

interface OrdersState {
  orders: Order[];
  createOrder: (
    items: CartItem[],
    pickupWindow: string,
    paymentMethod: PaymentMethod
  ) => Order;
  getOrder: (id: string) => Order | undefined;
  updateOrderStatus: (id: string, status: Order["status"]) => void;
}

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set, get) => ({
      orders: [],

      createOrder: (items, pickupWindow, paymentMethod) => {
        // Determine primary store from first item
        const firstFood = foodItems.find((f) => f.id === items[0]?.foodId);
        const storeId = firstFood?.storeId ?? stores[0].id;

        const total = items.reduce((sum, item) => {
          const food = foodItems.find((f) => f.id === item.foodId);
          return sum + (food ? food.discountedPrice * item.quantity : 0);
        }, 0) + 1000; // handling fee

        const order: Order = {
          id: generateOrderId(),
          items,
          storeId,
          pickupWindow,
          paymentMethod,
          status: "paid",
          pickupCode: generatePickupCode(),
          total,
          createdAt: new Date().toISOString(),
        };

        set({ orders: [order, ...get().orders] });
        return order;
      },

      getOrder: (id) => get().orders.find((o) => o.id === id),

      updateOrderStatus: (id, status) => {
        set({
          orders: get().orders.map((o) => (o.id === id ? { ...o, status } : o)),
        });
      },
    }),
    {
      name: "bungkus-orders",
    }
  )
);
