"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { AppShell } from "@/components/shell/AppShell";
import { ProductGrid } from "@/components/pos/ProductGrid";
import { CartPanel } from "@/components/pos/CartPanel";
import { useCartStore } from "@/store/cart";

export default function POSPage() {
  const [showCart, setShowCart] = useState(false);
  const itemCount = useCartStore((s) => s.itemCount());
  const total = useCartStore((s) => s.total());

  return (
    <AppShell title="Benta">
      {/* Mobile: toggle between product grid and cart */}
      <div className="sm:hidden flex flex-col h-full">
        {showCart ? (
          <>
            <div className="px-4 py-2 border-b border-[var(--border)]">
              <button
                onClick={() => setShowCart(false)}
                className="text-sm font-semibold text-[var(--accent)]"
              >
                ← Mga produkto
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <CartPanel />
            </div>
          </>
        ) : (
          <div className="flex-1 overflow-hidden relative">
            <ProductGrid />
            {itemCount > 0 && (
              <div className="absolute bottom-2 left-4 right-4">
                <button
                  onClick={() => setShowCart(true)}
                  className="w-full flex items-center justify-between bg-[var(--accent)] text-white rounded-2xl px-5 py-3.5 shadow-lg shadow-amber-200 active:scale-[0.98] transition-transform"
                >
                  <div className="flex items-center gap-2">
                    <ShoppingCart size={20} />
                    <span className="font-bold">
                      {itemCount} item{itemCount !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <span className="font-bold peso text-lg">
                    ₱{total.toFixed(2)}
                  </span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Desktop: two columns */}
      <div className="hidden sm:flex h-full">
        <div className="flex-1 overflow-hidden border-r border-[var(--border)]">
          <ProductGrid />
        </div>
        <div className="w-80 flex flex-col overflow-hidden">
          <CartPanel />
        </div>
      </div>
    </AppShell>
  );
}
