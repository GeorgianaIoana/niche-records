"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Disc3,
  Heart,
  Package,
  Users,
  Settings,
  User,
  LogOut,
  Store,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout";
import { CartDrawer } from "@/components/cart";
import type { ReactNode } from "react";

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  badge?: number;
}

const navItems: NavItem[] = [
  { href: "/dashboard", label: "Acasă", icon: LayoutGrid },
  { href: "/dashboard/collection", label: "Colecția Mea", icon: Disc3 },
  { href: "/dashboard/wishlist", label: "Wishlist", icon: Heart, badge: 4 },
  { href: "/dashboard/orders", label: "Comenzi", icon: Package, badge: 1 },
  { href: "/dashboard/artists", label: "Artiști", icon: Users },
];

function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {navItems.map((item) => {
        const isActive = pathname === item.href ||
          (item.href !== "/dashboard" && pathname.startsWith(item.href));

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
              "group",
              isActive
                ? "bg-gradient-to-r from-gold/15 to-gold/5 text-gold shadow-sm"
                : "text-gray-400 hover:text-white hover:bg-white/[0.03]"
            )}
          >
            <div className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center transition-all",
              isActive
                ? "bg-gold/20"
                : "bg-white/5 group-hover:bg-white/10"
            )}>
              <item.icon className={cn(
                "w-4 h-4 transition-colors",
                isActive ? "text-gold" : "text-gray-500 group-hover:text-gray-300"
              )} />
            </div>

            <span className="flex-1 text-sm font-medium">{item.label}</span>

            {item.badge && (
              <span className={cn(
                "min-w-[20px] h-5 px-1.5 text-[11px] font-bold rounded-full flex items-center justify-center",
                isActive
                  ? "bg-gold text-bleu-dark"
                  : "bg-gold/20 text-gold"
              )}>
                {item.badge}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}

function MobileBottomNav() {
  const pathname = usePathname();

  const mobileItems = [
    { href: "/", label: "Shop", icon: Store },
    { href: "/dashboard/collection", label: "Colecție", icon: Disc3 },
    { href: "/dashboard/orders", label: "Comenzi", icon: Package, badge: 1 },
    { href: "/dashboard/wishlist", label: "Wishlist", icon: Heart, badge: 4 },
    { href: "/dashboard", label: "Cont", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      {/* Gradient fade effect */}
      <div className="absolute inset-x-0 -top-6 h-6 bg-gradient-to-t from-bleu-dark to-transparent pointer-events-none" />

      <div className="bg-bleu-deep/98 backdrop-blur-xl border-t border-white/[0.06]">
        <div className="flex items-center justify-around px-1 py-1.5 max-w-md mx-auto">
          {mobileItems.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative flex flex-col items-center gap-0.5 px-4 py-2 rounded-xl transition-all",
                  isActive
                    ? "text-gold"
                    : "text-gray-500 active:scale-95"
                )}
              >
                {/* Active background pill */}
                {isActive && (
                  <div className="absolute inset-0 bg-gold/10 rounded-xl" />
                )}

                <div className="relative">
                  <item.icon className={cn("w-5 h-5 relative z-10", isActive && "drop-shadow-[0_0_6px_rgba(212,184,122,0.5)]")} />
                  {item.badge && (
                    <span className="absolute -top-1 -right-1.5 min-w-[14px] h-[14px] px-1 text-[9px] font-bold bg-gold text-bleu-dark rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className={cn(
                  "text-[10px] font-medium relative z-10",
                  isActive ? "text-gold" : "text-gray-500"
                )}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Safe area padding for iOS */}
        <div className="h-[env(safe-area-inset-bottom)]" />
      </div>
    </nav>
  );
}

function UserProfileCard() {
  return (
    <div className="p-4">
      <div className="relative p-4 rounded-2xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/[0.06]">
        {/* Subtle glow */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex items-center gap-3">
          {/* Avatar with ring */}
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-gold via-gold-light to-gold p-[2px]">
            <div className="w-full h-full rounded-full bg-bleu-deep flex items-center justify-center">
              <span className="text-sm font-bold text-gold">AI</span>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <p className="font-semibold text-white text-sm truncate">Alexandru</p>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-gold" />
              127 albume
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarFooter() {
  return (
    <div className="p-3 space-y-2">
      {/* Settings link */}
      <Link
        href="/dashboard/settings"
        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:text-white hover:bg-white/[0.03] transition-all group"
      >
        <div className="w-8 h-8 rounded-lg bg-white/5 group-hover:bg-white/10 flex items-center justify-center transition-all">
          <Settings className="w-4 h-4" />
        </div>
        <span className="text-sm font-medium">Setări</span>
      </Link>

      {/* Logout */}
      <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-500/5 transition-all group">
        <div className="w-8 h-8 rounded-lg bg-white/5 group-hover:bg-red-500/10 flex items-center justify-center transition-all">
          <LogOut className="w-4 h-4" />
        </div>
        <span className="text-sm font-medium">Deconectare</span>
      </button>

      {/* Copyright */}
      <div className="pt-3 mt-2 border-t border-white/5">
        <p className="text-[10px] text-gray-600 text-center tracking-wide">
          NICHE RECORDS © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-bleu-dark">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:fixed lg:top-20 lg:bottom-0 lg:left-0 lg:z-40 lg:flex lg:w-[24rem] lg:flex-col">
          <div className="flex flex-col flex-1 bg-gradient-to-b from-bleu-deep to-bleu-dark border-r border-white/[0.04] pl-20">
            <UserProfileCard />

            <div className="flex-1 px-3 py-2 overflow-y-auto scrollbar-hide">
              <SidebarNav />
            </div>

            <SidebarFooter />
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:pl-[24rem]">
          <div className="pt-24 pb-28 lg:pb-12 px-4 sm:px-6 lg:px-10">
            <div className="max-w-4xl mx-auto">
              {children}
            </div>
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <MobileBottomNav />
      </div>
      <CartDrawer />
    </>
  );
}
