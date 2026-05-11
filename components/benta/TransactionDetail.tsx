"use client";

import { type Transaction } from "@/lib/db";
import { formatPeso, formatDateTime } from "@/lib/utils";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Receipt } from "lucide-react";

interface TransactionDetailProps {
  transaction: Transaction | null;
  onClose: () => void;
}

export function TransactionDetail({ transaction: t, onClose }: TransactionDetailProps) {
  if (!t) return null;
  const cogs = t.items.reduce((s, i) => s + i.buyPrice * i.qty, 0);
  const profit = t.total - cogs;

  return (
    <Dialog open={!!t} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Receipt size={18} className="text-[var(--accent)]" />
            Resibo #{t.id}
          </DialogTitle>
          <p className="text-xs text-[var(--fg-muted)] mt-1">{formatDateTime(t.createdAt)}</p>
        </DialogHeader>

        {/* Items */}
        <div className="divide-y divide-[var(--border)] -mx-6 px-6">
          {t.items.map((item, i) => (
            <div key={i} className="flex items-center justify-between py-2.5">
              <div>
                <p className="font-semibold text-sm text-[var(--fg)]">{item.productName}</p>
                <p className="text-xs text-[var(--fg-muted)]">
                  {formatPeso(item.sellPrice)} × {item.qty} {item.unit}
                </p>
              </div>
              <p className="font-bold text-sm peso">{formatPeso(item.subtotal)}</p>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="space-y-2 pt-3 border-t border-[var(--border)]">
          <div className="flex justify-between text-sm">
            <span className="text-[var(--fg-muted)]">Kabuuan</span>
            <span className="font-bold peso">{formatPeso(t.total)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[var(--fg-muted)]">Bayad</span>
            <span className="font-semibold peso">{formatPeso(t.cash)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[var(--fg-muted)]">Sukli</span>
            <span className="font-semibold peso text-emerald-600">{formatPeso(t.change)}</span>
          </div>
          <div className="flex justify-between text-sm pt-2 border-t border-[var(--border)]">
            <span className="text-[var(--fg-muted)]">Kita sa transaksyong ito</span>
            <span className={`font-bold peso ${profit >= 0 ? "text-emerald-600" : "text-red-500"}`}>
              {formatPeso(profit)}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
