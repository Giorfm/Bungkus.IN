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

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-phone bg-surface border-t border-border z-50">
      <div className="flex items-center justify-around py-2 px-2">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/");
          const isCart = href === "/cart";

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl transition-all min-w-[60px]",
                isActive ? "text-primary" : "text-text-muted"
              )}
            >
              <div className="relative">
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2.5 : 1.8}
                  className={isActive ? "text-primary" : "text-text-muted"}
                />
                {isCart && totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-primary text-white text-[10px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-1">
                    {totalItems}
                  </span>
                )}
              </div>
              <span
                className={cn(
                  "text-[10px] font-semibold",
                  isActive ? "text-primary" : "text-text-muted"
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
