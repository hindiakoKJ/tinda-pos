"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Receipt,
  TrendingUp,
  Wallet,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart";

const NAV = [
  { href: "/buod",    label: "Buod",       icon: LayoutDashboard },
  { href: "/pos",     label: "Benta",      icon: ShoppingCart },
  { href: "/paninda", label: "Paninda",    icon: Package },
  { href: "/benta",   label: "Kasaysayan", icon: Receipt },
  { href: "/kita",    label: "Kita",       icon: TrendingUp },
  { href: "/gastos",  label: "Gastos",     icon: Wallet },
];

interface AppShellProps {
  children: React.ReactNode;
  title: string;
}

export function AppShell({ children, title }: AppShellProps) {
  const pathname = usePathname();
  const itemCount = useCartStore((s) => s.itemCount());
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-dvh bg-[var(--bg)]">
      {/* ── Tablet sidebar (md+) ── */}
      <aside
        className={cn(
          "hidden md:flex flex-col border-r border-[var(--border)] bg-[var(--card)] transition-all duration-200",
          collapsed ? "w-16" : "w-52"
        )}
      >
        {/* Brand */}
        <div className={cn(
          "flex items-center gap-2.5 px-4 py-4 border-b border-[var(--border)]",
          collapsed && "justify-center px-0"
        )}>
          <div className="w-8 h-8 shrink-0 rounded-lg bg-[var(--accent)] flex items-center justify-center">
            <span className="text-white font-bold text-sm">₱</span>
          </div>
          {!collapsed && (
            <span className="font-bold text-[var(--fg)] text-base truncate">TindaPOS</span>
          )}
        </div>

        {/* Nav items */}
        <nav className="flex-1 flex flex-col gap-1 p-2 overflow-y-auto">
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            const isPOS = href === "/pos";
            return (
              <Link
                key={href}
                href={href}
                title={collapsed ? label : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-3 font-semibold text-sm transition-colors relative",
                  active
                    ? "bg-[var(--accent-soft)] text-[var(--accent-dark)]"
                    : "text-[var(--fg-muted)] hover:bg-[var(--input-bg)] hover:text-[var(--fg)]",
                  collapsed && "justify-center px-0"
                )}
              >
                <div className="relative shrink-0">
                  <Icon size={20} strokeWidth={active ? 2.5 : 1.75} />
                  {isPOS && itemCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[var(--accent)] text-white text-[9px] font-bold flex items-center justify-center">
                      {itemCount > 9 ? "9+" : itemCount}
                    </span>
                  )}
                </div>
                {!collapsed && <span className="truncate">{label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className={cn(
            "flex items-center gap-2 px-3 py-3 m-2 rounded-xl text-[var(--fg-muted)] hover:bg-[var(--input-bg)] hover:text-[var(--fg)] transition-colors text-sm font-semibold",
            collapsed && "justify-center px-0"
          )}
        >
          {collapsed ? <ChevronRight size={16} /> : <><ChevronLeft size={16} /><span>Itago</span></>}
        </button>
      </aside>

      {/* ── Main content area ── */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Header */}
        <header className="flex items-center gap-3 px-4 py-3 bg-[var(--card)] border-b border-[var(--border)] safe-top shrink-0">
          {/* Mobile brand */}
          <div className="flex md:hidden items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[var(--accent)] flex items-center justify-center">
              <span className="text-white font-bold text-xs">₱</span>
            </div>
            <span className="font-bold text-[var(--fg)] text-sm">TindaPOS</span>
          </div>
          <span className="text-[var(--fg-muted)] md:hidden text-sm">·</span>
          <h1 className="font-bold text-[var(--fg)] text-sm">{title}</h1>
        </header>

        {/* Page body */}
        <main className="flex-1 overflow-y-auto">{children}</main>

        {/* ── Phone bottom tab nav (< md) ── */}
        <nav className="md:hidden bg-[var(--card)] border-t border-[var(--border)] safe-bottom shrink-0">
          <div className="grid grid-cols-6 h-16">
            {NAV.map(({ href, label, icon: Icon }) => {
              const active = pathname === href;
              const isPOS = href === "/pos";
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex flex-col items-center justify-center gap-0.5 transition-colors relative",
                    active ? "text-[var(--accent)]" : "text-[var(--fg-muted)]"
                  )}
                >
                  {active && (
                    <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-[var(--accent)] rounded-b-full" />
                  )}
                  <div className="relative">
                    <Icon size={20} strokeWidth={active ? 2.5 : 1.75} />
                    {isPOS && itemCount > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[var(--accent)] text-white text-[9px] font-bold flex items-center justify-center">
                        {itemCount > 9 ? "9+" : itemCount}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] leading-none font-medium">{label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
