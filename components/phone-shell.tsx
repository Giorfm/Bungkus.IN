"use client";

import { ReactNode } from "react";

interface PhoneShellProps {
  children: ReactNode;
}

export function PhoneShell({ children }: PhoneShellProps) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center">
      {/* Desktop: phone frame */}
      <div className="hidden md:block fixed left-0 top-0 w-full h-full bg-gradient-to-br from-gray-100 to-gray-200" />
      <div className="relative w-full max-w-phone md:shadow-2xl md:min-h-screen md:rounded-none overflow-hidden bg-bg">
        {children}
      </div>
    </div>
  );
}
