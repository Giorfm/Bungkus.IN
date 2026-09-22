import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number as Indonesian Rupiah
 * e.g. 12000 → "Rp 12.000"
 */
export function formatRupiah(amount: number): string {
  return "Rp " + amount.toLocaleString("id-ID");
}

/**
 * Format a number as compact savings display
 * e.g. 345000 → "345 rb"
 */
export function formatCompact(amount: number): string {
  if (amount >= 1_000_000) {
    return (amount / 1_000_000).toFixed(1).replace(".", ",") + " jt";
  }
  if (amount >= 1_000) {
    return Math.round(amount / 1_000) + " rb";
  }
  return amount.toString();
}

/**
 * Time ago in Indonesian
 */
export function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "baru saja";
  if (diffMins < 60) return `${diffMins} menit lalu`;
  if (diffHours < 24) return `${diffHours} jam lalu`;
  if (diffDays < 7) return `${diffDays} hari lalu`;
  return date.toLocaleDateString("id-ID");
}

/**
 * Format a date string as Indonesian local date
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Generate a random pickup code
 */
export function generatePickupCode(): string {
  const num = Math.floor(10000 + Math.random() * 89999);
  return `BKS-${num}`;
}

/**
 * Generate a random order ID
 */
export function generateOrderId(): string {
  return `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

/**
 * Get star array for ratings
 */
export function getStars(rating: number): { full: number; half: boolean; empty: number } {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return { full, half, empty };
}

/**
 * Get initials from a name
 */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}
