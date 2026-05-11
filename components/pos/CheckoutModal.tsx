"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore, type CartLine } from "@/store/cart";
import { db } from "@/lib/db";
import { formatPeso } from "@/lib/utils";

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
}

export function CheckoutModal({ open, onClose }: CheckoutModalProps) {
  const { lines, total, clearCart } = useCartStore();
  const grandTotal = total();
  const [cash, setCash] = useState("");
  const [loading, setLoading] = useState(false);

  const cashNum = parseFloat(cash) || 0;
  const sukli = cashNum - grandTotal;
  const canCheckout = cashNum >= grandTotal && grandTotal > 0;

  const quickCash = [20, 50, 100, 200, 500, 1000].filter((v) => v >= grandTotal);

  async function handleConfirm() {
    if (!canCheckout) return;
    setLoading(true);
    try {
      const now = Date.now();
      const items = lines.map((l: CartLine) => ({
        productId: l.productId,
        productName: l.productName,
        unit: l.unit,
        qty: l.qty,
        sellPrice: l.sellPrice,
        buyPrice: l.buyPrice,
        subtotal: l.sellPrice * l.qty,
      }));

      await db.transaction("rw", db.transactions, db.products, async () => {
        await db.transactions.add({
          createdAt: now,
          items,
          total: grandTotal,
          cash: cashNum,
          change: sukli,
        });

        for (const line of lines) {
          const product = await db.products.get(line.productId);
          if (product) {
            await db.products.update(line.productId, {
              stock: Math.max(0, product.stock - line.qty),
            });
          }
        }
      });

      clearCart();
      setCash("");
      onClose();
      toast.success(`Nabenta! Sukli: ${formatPeso(sukli)}`);
    } catch (e) {
      toast.error("May error sa pag-save. Subukan ulit.");
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    setCash("");
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Checkout</DialogTitle>
        </DialogHeader>

        {/* Order summary */}
        <div className="space-y-1 mb-4">
          {lines.map((l) => (
            <div key={l.productId} className="flex justify-between text-sm">
              <span className="text-[var(--fg-muted)]">
                {l.productName} × {l.qty}
              </span>
              <span className="font-semibold peso">
                {formatPeso(l.sellPrice * l.qty)}
              </span>
            </div>
          ))}
          <div className="flex justify-between text-lg font-bold pt-2 border-t border-[var(--border)] mt-2">
            <span>Kabuuan</span>
            <span className="peso text-[var(--accent-dark)]">{formatPeso(grandTotal)}</span>
          </div>
        </div>

        {/* Quick cash buttons */}
        <div className="mb-3">
          <p className="text-xs font-semibold text-[var(--fg-muted)] mb-2 uppercase tracking-wide">
            Mabilis na bayad
          </p>
          <div className="flex flex-wrap gap-2">
            {quickCash.slice(0, 4).map((v) => (
              <button
                key={v}
                onClick={() => setCash(String(v))}
                className="px-3 py-1.5 rounded-lg text-sm font-semibold border-2 border-[var(--border)] bg-[var(--input-bg)] hover:border-[var(--accent)] hover:bg-[var(--accent-soft)] transition-colors"
              >
                ₱{v}
              </button>
            ))}
          </div>
        </div>

        {/* Cash input */}
        <Input
          label="Bayad ng Customer (₱)"
          type="number"
          inputMode="decimal"
          placeholder="0.00"
          value={cash}
          onChange={(e) => setCash(e.target.value)}
          className="text-xl font-bold peso"
        />

        {/* Sukli display */}
        {cashNum > 0 && (
          <div
            className={`mt-3 rounded-xl p-4 text-center ${
              sukli >= 0
                ? "bg-emerald-50 border border-emerald-200"
                : "bg-red-50 border border-red-200"
            }`}
          >
            <p className="text-sm font-semibold text-[var(--fg-muted)]">Sukli</p>
            <p
              className={`text-3xl font-bold peso ${
                sukli >= 0 ? "text-emerald-600" : "text-red-500"
              }`}
            >
              {sukli >= 0 ? formatPeso(sukli) : `Kulang ng ${formatPeso(-sukli)}`}
            </p>
          </div>
        )}

        <DialogFooter className="mt-4 gap-2 flex-col sm:flex-row">
          <Button variant="outline" onClick={handleClose} className="w-full sm:w-auto">
            Kanselahin
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!canCheckout || loading}
            className="w-full sm:w-auto"
            size="lg"
          >
            {loading ? "Nagse-save…" : "Ibayad ✓"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
