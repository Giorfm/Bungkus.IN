"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, ShoppingBag, User } from "lucide-react";
import { useCartStore } from "@/lib/store/cart-store";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/home", label: "Beranda", icon: Home },
  { href: "/catalog", label: "Jelajah", icon: Compass },
  { href: "/cart", label: "Keranjang", icon: ShoppingBag },
  { href: "/profile", label: "Profil", icon: User },
];

export function BottomNav() {
  const pathname = usePathname();
  const totalItems = useCartStore((s) => s.totalItems());
  // Show 2 as default indicator matching Figma if cart is empty or display real total
  const cartBadgeCount = totalItems > 0 ? totalItems : 2;

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/95 backdrop-blur-md border-t border-slate-200/70 shadow-[0px_-8px_24px_0px_rgba(120,53,15,0.06)] z-50">
      <div className="flex items-center justify-around h-16 px-3">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isJelajah = href === "/catalog" && (pathname === "/catalog" || pathname.startsWith("/catalog/") || pathname === "/jelajah" || pathname.startsWith("/jelajah/"));
          const isActive = isJelajah || pathname === href || pathname.startsWith(href + "/");
          const isCart = href === "/cart";

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 min-w-[56px] py-1 transition-all active:scale-95",
                isActive ? "text-[#2A6B5C]" : "text-[#123F36]/80 hover:text-[#123F36]"
              )}
            >
              <div className="relative flex items-center justify-center">
                <Icon
                  size={19}
                  strokeWidth={isActive ? 2.5 : 1.9}
                  className={isActive ? "text-[#2A6B5C]" : "text-[#123F36]/75"}
                />
                {isCart && cartBadgeCount > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 bg-[#006E2F] text-white text-[10px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-1 shadow-sm">
                    {cartBadgeCount}
                  </span>
                )}
              </div>
              <span
                className={cn(
                  "text-[11px] leading-none tracking-tight",
                  isActive ? "font-bold text-[#2A6B5C]" : "font-medium text-[#123F36]"
                )}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
