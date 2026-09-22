"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { PhoneShell } from "@/components/phone-shell";
import { BottomNav } from "@/components/bottom-nav";
import { useAuthStore } from "@/lib/store/auth-store";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/auth/sign-in");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <PhoneShell>
      <div className="pb-20">{children}</div>
      <BottomNav />
    </PhoneShell>
  );
}
