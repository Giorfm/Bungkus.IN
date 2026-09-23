"use client";

import { ReactNode } from "react";

interface PhoneShellProps {
  children: ReactNode;
}

export function PhoneShell({ children }: PhoneShellProps) {
  return (
    <div className="min-h-screen bg-slate-100 flex items-start justify-center">
      {/* Desktop: subtle clean frame backdrop */}
      <div className="hidden md:block fixed inset-0 bg-gradient-to-br from-slate-100 via-emerald-50/20 to-slate-200 pointer-events-none" />
      {/* Mobile container constrained to max-w-md */}
      <div className="relative w-full max-w-md min-h-screen bg-bg md:shadow-[0_20px_50px_rgba(0,0,0,0.1)] md:border-x md:border-slate-200/60 overflow-x-hidden flex flex-col">
        {children}
      </div>
    </div>
  );
}
