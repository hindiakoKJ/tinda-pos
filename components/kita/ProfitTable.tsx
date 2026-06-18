"use client";

import { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { TrendingUp, TrendingDown } from "lucide-react";
import { db } from "@/lib/db";
import { formatPeso, cn } from "@/lib/utils";
import { DateRangePicker, buildRange, type DateRange } from "@/components/ui/DateRangePicker";

interface ProductStat {
  productName: string;
  qtySold: number;
  revenue: number;
  cogs: number;
  profit: number;
  margin: number;
}

export function ProfitTable() {
  const [range, setRange] = useState<DateRange>(buildRange("today"));

  const transactions = useLiveQuery(
    () =>
      db.transactions
        .where("createdAt")
        .between(range.start, range.end, true, true)
        .toArray(),
    [range.start, range.end]
  );

  // Aggregate per product
  const statMap: Record<string, ProductStat> = {};
  for (const t of transactions ?? []) {
    for (const item of t.items) {
      const key = item.productName;
      if (!statMap[key]) {
        statMap[key] = { productName: key, qtySold: 0, revenue: 0, cogs: 0, profit: 0, margin: 0 };
      }
      statMap[key].qtySold += item.qty;
      statMap[key].revenue += item.sellPrice * item.qty;
      statMap[key].cogs += item.buyPrice * item.qty;
    }
  }

  const stats = Object.values(statMap)
    .map((s) => ({
      ...s,
      profit: s.revenue - s.cogs,
      margin: s.revenue > 0 ? ((s.revenue - s.cogs) / s.revenue) * 100 : 0,
    }))
    .sort((a, b) => b.profit - a.profit);

  const totals = stats.reduce(
    (acc, s) => ({ revenue: acc.revenue + s.revenue, cogs: acc.cogs + s.cogs, profit: acc.profit + s.profit }),
    { revenue: 0, cogs: 0, profit: 0 }
  );

  return (
    <div className="flex flex-col h-full">
      {/* Date range picker */}
      <div className="px-4 pt-3 pb-3 border-b border-[var(--border)] shrink-0">
        <DateRangePicker value={range} onChange={setRange} />
      </div>

      {/* Overall summary cards */}
      <div className="grid grid-cols-3 gap-3 p-4 shrink-0">
        <div className="rounded-xl bg-[var(--card)] border border-[var(--border)] p-3 text-center">
          <p className="text-xs text-[var(--fg-muted)] font-semibold mb-1">Benta</p>
          <p className="font-bold peso text-sm">{formatPeso(totals.revenue)}</p>
        </div>
        <div className="rounded-xl bg-[var(--card)] border border-[var(--border)] p-3 text-center">
          <p className="text-xs text-[var(--fg-muted)] font-semibold mb-1">Gastos (COGS)</p>
          <p className="font-bold peso text-sm text-red-500">{formatPeso(totals.cogs)}</p>
        </div>
        <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-center">
          <p className="text-xs text-emerald-700 font-semibold mb-1">Gross Kita</p>
          <p className="font-bold peso text-sm text-emerald-700">{formatPeso(totals.profit)}</p>
        </div>
      </div>

      {/* Per-product table */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {stats.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 gap-2 text-[var(--fg-muted)]">
            <TrendingUp size={36} strokeWidth={1} />
            <p className="text-sm font-medium">Walang datos para sa panahong ito</p>
          </div>
        ) : (
          <div className="rounded-2xl border border-[var(--border)] overflow-hidden bg-[var(--card)]">
            {/* Header */}
            <div className="grid grid-cols-[1fr_auto_auto_auto] gap-2 px-4 py-2.5 bg-[var(--input-bg)] border-b border-[var(--border)]">
              <span className="text-xs font-bold uppercase tracking-wide text-[var(--fg-muted)]">Produkto</span>
              <span className="text-xs font-bold uppercase tracking-wide text-[var(--fg-muted)] text-right w-12">Nabenta</span>
              <span className="text-xs font-bold uppercase tracking-wide text-[var(--fg-muted)] text-right w-20">Kita</span>
              <span className="text-xs font-bold uppercase tracking-wide text-[var(--fg-muted)] text-right w-14">Margin</span>
            </div>

            {/* Rows */}
            <div className="divide-y divide-[var(--border)]">
              {stats.map((s) => (
                <div key={s.productName} className="grid grid-cols-[1fr_auto_auto_auto] gap-2 px-4 py-3 items-center">
                  <div>
                    <p className="font-semibold text-sm text-[var(--fg)] leading-snug">{s.productName}</p>
                    <p className="text-xs text-[var(--fg-muted)]">
                      Benta: {formatPeso(s.revenue)} · COGS: {formatPeso(s.cogs)}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-right w-12">{s.qtySold}</span>
                  <span className={cn("text-sm font-bold peso text-right w-20", s.profit >= 0 ? "text-emerald-600" : "text-red-500")}>
                    {formatPeso(s.profit)}
                  </span>
                  <div className="flex items-center justify-end gap-1 w-14">
                    {s.profit >= 0
                      ? <TrendingUp size={12} className="text-emerald-500 shrink-0" />
                      : <TrendingDown size={12} className="text-red-400 shrink-0" />}
                    <span className={cn("text-sm font-bold", s.margin >= 20 ? "text-emerald-600" : s.margin >= 10 ? "text-amber-600" : "text-red-500")}>
                      {s.margin.toFixed(0)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer total */}
            <div className="grid grid-cols-[1fr_auto_auto_auto] gap-2 px-4 py-3 bg-[var(--input-bg)] border-t border-[var(--border)]">
              <span className="text-sm font-bold text-[var(--fg)]">Kabuuan</span>
              <span className="w-12" />
              <span className="text-sm font-bold peso text-emerald-600 text-right w-20">{formatPeso(totals.profit)}</span>
              <span className="text-sm font-bold text-right w-14">
                {totals.revenue > 0 ? ((totals.profit / totals.revenue) * 100).toFixed(0) : 0}%
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
