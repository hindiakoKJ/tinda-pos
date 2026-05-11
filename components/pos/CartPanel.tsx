"use client";

import { useState } from "react";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart";
import { formatPeso } from "@/lib/utils";
import { CheckoutModal } from "./CheckoutModal";

export function CartPanel() {
  const { lines, updateQty, removeItem, total, itemCount } = useCartStore();
  const [showCheckout, setShowCheckout] = useState(false);
  const grandTotal = total();
  const count = itemCount();

  if (count === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-3 text-[var(--fg-muted)] py-12">
        <ShoppingCart size={48} strokeWidth={1} />
        <p className="text-sm font-medium">Walang laman ang cart</p>
        <p className="text-xs">Mag-tap ng produkto para idagdag</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)]">
          <h2 className="font-bold text-[var(--fg)]">
            Cart <span className="text-[var(--fg-muted)] font-normal text-sm">({count} item{count !== 1 ? "s" : ""})</span>
          </h2>
          <button
            onClick={() => useCartStore.getState().clearCart()}
            className="text-xs text-[var(--danger)] font-semibold hover:opacity-70 transition-opacity"
          >
            I-clear lahat
          </button>
        </div>

        {/* Line items */}
        <div className="flex-1 overflow-y-auto divide-y divide-[var(--border)]">
          {lines.map((line) => (
            <div key={line.productId} className="flex items-center gap-3 px-4 py-3">
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-[var(--fg)] truncate">
                  {line.productName}
                </p>
                <p className="text-xs text-[var(--fg-muted)]">
                  {formatPeso(line.sellPrice)} / {line.unit}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => updateQty(line.productId, line.qty - 1)}
                  className="w-8 h-8 rounded-lg border border-[var(--border)] flex items-center justify-center hover:bg-[var(--input-bg)] text-[var(--fg-muted)] transition-colors"
                >
                  {line.qty === 1 ? <Trash2 size={14} className="text-[var(--danger)]" /> : <Minus size={14} />}
                </button>
                <span className="w-8 text-center font-bold text-sm">{line.qty}</span>
                <button
                  onClick={() => updateQty(line.productId, line.qty + 1)}
                  className="w-8 h-8 rounded-lg border border-[var(--border)] flex items-center justify-center hover:bg-[var(--input-bg)] transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
              <p className="w-20 text-right font-bold text-sm peso">
                {formatPeso(line.sellPrice * line.qty)}
              </p>
            </div>
          ))}
        </div>

        {/* Total + Checkout */}
        <div className="border-t border-[var(--border)] px-4 py-4 space-y-3 bg-[var(--card)]">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-[var(--fg-muted)]">Kabuuan</span>
            <span className="text-2xl font-bold peso text-[var(--accent-dark)]">
              {formatPeso(grandTotal)}
            </span>
          </div>
          <Button
            onClick={() => setShowCheckout(true)}
            className="w-full"
            size="lg"
          >
            Mag-checkout →
          </Button>
        </div>
      </div>

      <CheckoutModal open={showCheckout} onClose={() => setShowCheckout(false)} />
    </>
  );
}
