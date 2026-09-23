"use client";

import { useRouter } from "next/navigation";
import { Bell, ChevronDown, ChevronLeft, Leaf, Settings, MapPin } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/lib/store/auth-store";
import { notifications } from "@/lib/data";
import { cn } from "@/lib/utils";

interface TopBarHomeProps {
  variant: "home";
}

interface TopBarDetailProps {
  variant: "detail";
  title: string;
  rightElement?: React.ReactNode;
}

interface TopBarProfileProps {
  variant: "profile";
  title: string;
}

interface TopBarSimpleProps {
  variant: "simple";
  title: string;
  showBack?: boolean;
  rightElement?: React.ReactNode;
}

type TopBarProps = TopBarHomeProps | TopBarDetailProps | TopBarProfileProps | TopBarSimpleProps;

export function TopBar(props: TopBarProps) {
  const router = useRouter();
  const { user } = useAuthStore();
  const unreadCount = notifications.filter((n) => !n.read).length;

  if (props.variant === "home") {
    return (
      <header className="sticky top-0 z-40 bg-[#f8f9ff]/90 backdrop-blur-md shadow-[0px_4px_20px_-4px_rgba(120,53,15,0.06)] border-b border-slate-100/60">
        <div className="flex h-16 items-center justify-between px-4">
          {/* Left: Brand Logo & Location */}
          <div className="flex items-center gap-2.5">
            {/* Bungkus.in App Icon */}
            <div className="relative size-8 shrink-0 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-sm overflow-hidden">
              <svg viewBox="0 0 32 32" fill="none" className="size-5">
                {/* Food parcel / tote bag outline */}
                <path
                  d="M8 12C8 10.8954 8.89543 10 10 10H22C23.1046 10 24 10.8954 24 12V24C24 25.1046 23.1046 26 22 26H10C8.89543 26 8 25.1046 8 24V12Z"
                  fill="#FFF7ED"
                />
                <path
                  d="M12 10V8C12 5.79086 13.7909 4 16 4C18.2091 4 20 5.79086 20 8V10"
                  stroke="#2A6B5C"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                {/* Green Leaf Accent */}
                <path
                  d="M16 14C16 14 18 16 20 15C20 17 18 19 16 18C14 19 12 17 12 15C14 16 16 14 16 14Z"
                  fill="#2A6B5C"
                />
              </svg>
            </div>

            {/* Title & Location Stack */}
            <div className="flex flex-col items-start">
              <span className="font-extrabold text-[17px] leading-tight tracking-tight text-[#2A6B5C]">
                Bungkus.in
              </span>
              <button
                type="button"
                className="mt-0.5 inline-flex items-center gap-1 bg-[#e6fff8] px-2 py-0.5 rounded-full text-[#121c2a] text-[11px] font-semibold hover:bg-[#d8faee] transition-colors"
              >
                <MapPin size={10} className="text-[#006e2f]" />
                <span className="truncate max-w-[100px]">Jakarta Selatan</span>
                <ChevronDown size={11} className="text-[#121c2a]" />
              </button>
            </div>
          </div>

          {/* Right: Notifications & Profile Avatar */}
          <div className="flex items-center gap-1">
            <Link
              href="/notifications"
              className="relative size-10 flex items-center justify-center rounded-full hover:bg-slate-100 active:scale-95 transition-all text-[#123f36]"
              aria-label="Notifikasi"
            >
              <Bell size={20} className="text-[#123f36]" />
              {unreadCount > 0 && (
                <span className="absolute top-2.5 right-2.5 size-2 bg-red-500 rounded-full ring-2 ring-white" />
              )}
            </Link>

            <Link
              href="/profile"
              className="size-9 p-0.5 rounded-full hover:opacity-90 active:scale-95 transition-all"
              aria-label="Profil"
            >
              <div className="size-8 rounded-full overflow-hidden shadow-[0px_2px_6px_0px_rgba(120,53,15,0.15)] ring-1 ring-white/80 bg-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                  alt={user?.name ?? "User"}
                  className="size-full object-cover"
                  onError={(e) => {
                    // Fallback to text initials
                    (e.currentTarget as HTMLElement).style.display = "none";
                  }}
                />
                <div className="size-full bg-emerald-700 text-white text-xs font-bold flex items-center justify-center">
                  {user?.name?.slice(0, 2)?.toUpperCase() ?? "ST"}
                </div>
              </div>
            </Link>
          </div>
        </div>
      </header>
    );
  }

  if (props.variant === "detail") {
    return (
      <div className="flex items-center justify-between px-4 pt-4 pb-3 bg-surface">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 bg-bg rounded-xl flex items-center justify-center"
        >
          <ChevronLeft size={20} className="text-text" />
        </button>
        <h1 className="font-bold text-text text-base">{props.title}</h1>
        <div>{props.rightElement ?? <div className="w-9" />}</div>
      </div>
    );
  }

  if (props.variant === "profile") {
    return (
      <div className="flex items-center justify-between px-4 pt-4 pb-3 bg-surface">
        <h1 className="font-bold text-text text-lg">{props.title}</h1>
        <button className="w-9 h-9 bg-bg rounded-xl flex items-center justify-center">
          <Settings size={18} className="text-text-muted" />
        </button>
      </div>
    );
  }

  // simple
  return (
    <div
      className={cn(
        "flex items-center px-4 pt-4 pb-3 bg-surface",
        "justify-between"
      )}
    >
      <div className="flex items-center gap-2">
        {(props as TopBarSimpleProps).showBack !== false && (
          <button
            onClick={() => router.back()}
            className="w-9 h-9 bg-bg rounded-xl flex items-center justify-center mr-1"
          >
            <ChevronLeft size={20} className="text-text" />
          </button>
        )}
        <h1 className="font-bold text-text text-base">{props.title}</h1>
      </div>
      <div>{(props as TopBarSimpleProps).rightElement ?? <div className="w-9" />}</div>
    </div>
  );
}
