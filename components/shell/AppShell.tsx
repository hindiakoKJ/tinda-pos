"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Wallet,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart";

// 4 major sections — each with its own group of routes
const NAV = [
  { href: "/buod",    label: "Buod",    icon: LayoutDashboard, group: ["/buod", "/kita", "/benta"] },
  { href: "/pos",     label: "Benta",   icon: ShoppingCart,    group: ["/pos", "/serbisyo"] },
  { href: "/paninda", label: "Paninda", icon: Package,         group: ["/paninda"] },
  { href: "/gastos",  label: "Gastos",  icon: Wallet,          group: ["/gastos"] },
];

export interface TabItem {
  href: string;
  label: string;
}

interface AppShellProps {
  children: React.ReactNode;
  title: string;
  tabs?: TabItem[];
}

export function AppShell({ children, title, tabs }: AppShellProps) {
  const pathname = usePathname();
  const itemCount = useCartStore((s) => s.itemCount());

  return (
    <div className="fixed inset-0 flex flex-col bg-[var(--bg)] overflow-hidden">
      <div className="flex flex-col w-full h-full overflow-hidden">

        {/* Header */}
        <header className="bg-[var(--accent)] safe-top shrink-0">
          {/* Brand area */}
          <div
            className="flex items-center justify-between px-4 py-3"
            style={tabs && tabs.length > 0 ? { borderBottom: "1px solid rgba(255,255,255,0.22)" } : undefined}
          >
            <div className="flex items-center gap-3">
              <Image
                src="/icons/icon-192.png"
                alt="TindaPOS"
                width={36}
                height={36}
                className="rounded-xl"
              />
              <div className="flex flex-col">
                <span className="font-black text-white text-lg leading-tight tracking-tight">TindaPOS</span>
                <span className="text-white/70 text-xs font-medium leading-tight">{title}</span>
              </div>
            </div>
          </div>

          {/* Sub-tabs (if provided) — on a slightly darker amber band */}
          {tabs && tabs.length > 0 && (
            <div
              className="flex gap-1.5 px-3 py-2 overflow-x-auto"
              style={{ background: "var(--accent-dark)" }}
            >
              {tabs.map((t) => {
                const tabActive = pathname === t.href;
                return (
                  <Link
                    key={t.href}
                    href={t.href}
                    className={cn(
                      "shrink-0 px-4 py-1.5 rounded-full text-xs font-bold transition-colors",
                      tabActive
                        ? "bg-white text-[var(--accent-dark)] shadow-sm"
                        : "text-white/80 bg-white/10 hover:bg-white/20 hover:text-white"
                    )}
                  >
                    {t.label}
                  </Link>
                );
              })}
            </div>
          )}
        </header>

        {/* Page body */}
        <main className="flex-1 overflow-y-auto">{children}</main>

        {/* Bottom tab nav — always visible */}
        <nav className="bg-[var(--card)] border-t border-[var(--border)] safe-bottom shrink-0">
          <div className="grid grid-cols-4 h-16">
            {NAV.map(({ href, label, icon: Icon, group }) => {
              // Active if current pathname is in this tab's group
              const active = group.some((g) => pathname === g || pathname.startsWith(g + "/"));
              const isBenta = label === "Benta";
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
                    <Icon size={22} strokeWidth={active ? 2.5 : 1.75} />
                    {isBenta && itemCount > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[var(--accent)] text-white text-[9px] font-bold flex items-center justify-center">
                        {itemCount > 9 ? "9+" : itemCount}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] leading-none font-semibold">{label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
