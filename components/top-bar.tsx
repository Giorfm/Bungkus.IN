"use client";

import { useRouter } from "next/navigation";
import { Bell, ChevronDown, ChevronLeft, Leaf, Settings } from "lucide-react";
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
      <div className="flex items-center justify-between px-4 pt-4 pb-3 bg-surface">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Leaf size={16} className="text-white" />
          </div>
          <span className="font-extrabold text-text text-base">Bungkus.in</span>
        </div>

        {/* Location */}
        <button className="flex items-center gap-1 bg-primary-soft px-3 py-1.5 rounded-pill">
          <span className="text-primary text-xs font-semibold">Jakarta Selatan</span>
          <ChevronDown size={14} className="text-primary" />
        </button>

        {/* Right icons */}
        <div className="flex items-center gap-2">
          <Link href="/notifications" className="relative">
            <div className="w-9 h-9 bg-bg rounded-xl flex items-center justify-center">
              <Bell size={18} className="text-accent" />
            </div>
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-danger rounded-full" />
            )}
          </Link>
          <Link href="/profile">
            <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">
                {user?.name?.slice(0, 2)?.toUpperCase() ?? "SN"}
              </span>
            </div>
          </Link>
        </div>
      </div>
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
