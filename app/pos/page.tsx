"use client";

import { useState } from "react";
import { ShoppingCart, X } from "lucide-react";
import { AppShell } from "@/components/shell/AppShell";
import { ProductGrid } from "@/components/pos/ProductGrid";
import { CartPanel } from "@/components/pos/CartPanel";
import { useCartStore } from "@/store/cart";
import { formatPeso } from "@/lib/utils";
import { BENTA_TABS } from "@/lib/tabs";

export default function POSPage() {
  const [showCart, setShowCart] = useState(false);
  const itemCount = useCartStore((s) => s.itemCount());
  const total = useCartStore((s) => s.total());

  return (
    <AppShell title="Benta · Produkto" tabs={BENTA_TABS}>
      {/* ── Tablet (md+): side-by-side split ── */}
      <div className="hidden md:flex h-full">
        <div className="flex-1 min-w-0 overflow-hidden border-r border-[var(--border)]">
          <ProductGrid />
        </div>
        <div className="w-80 xl:w-96 shrink-0 flex flex-col overflow-hidden bg-[var(--card)]">
          <CartPanel />
        </div>
      </div>

      {/* ── Mobile: stacked with slide-up cart ── */}
      <div className="flex md:hidden flex-col h-full relative">
        {showCart && (
          <div className="absolute inset-0 z-20 flex flex-col bg-[var(--bg)]">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] bg-[var(--card)] shrink-0">
              <h2 className="font-bold text-[var(--fg)]">Cart</h2>
              <button
                onClick={() => setShowCart(false)}
                className="w-9 h-9 rounded-xl bg-[var(--input-bg)] flex items-center justify-center text-[var(--fg-muted)]"
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <CartPanel />
            </div>
          </div>
        )}

        <div className="flex-1 overflow-hidden">
          <ProductGrid />
        </div>

        {itemCount > 0 && !showCart && (
          <div className="absolute bottom-3 left-4 right-4 z-10">
            <button
              onClick={() => setShowCart(true)}
              className="w-full flex items-center justify-between rounded-2xl px-5 py-3.5 text-white active:scale-[0.98] transition-transform"
              style={{ background: "var(--accent)", boxShadow: "0 4px 20px rgba(245,158,11,0.35)" }}
            >
              <div className="flex items-center gap-2.5">
                <ShoppingCart size={20} />
                <span className="font-bold text-sm">
                  {itemCount} item{itemCount !== 1 ? "s" : ""}
                </span>
              </div>
              <span className="font-black text-base peso">{formatPeso(total)}</span>
            </button>
          </div>
        )}
      </div>
    </AppShell>
  );
}
