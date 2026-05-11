"use client";

import { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { Receipt, ChevronRight } from "lucide-react";
import { db, type Transaction } from "@/lib/db";
import { formatPeso, formatDate, formatTime, startOfDay, startOfWeek, startOfMonth } from "@/lib/utils";
import { TransactionDetail } from "./TransactionDetail";
import { cn } from "@/lib/utils";

type Range = "today" | "week" | "month" | "all";

const RANGE_LABELS: Record<Range, string> = {
  today: "Ngayon",
  week: "Linggong ito",
  month: "Buwang ito",
  all: "Lahat",
};

export function TransactionList() {
  const [range, setRange] = useState<Range>("today");
  const [selected, setSelected] = useState<Transaction | null>(null);

  const rangeStart =
    range === "today" ? startOfDay().getTime()
    : range === "week" ? startOfWeek().getTime()
    : range === "month" ? startOfMonth().getTime()
    : 0;

  const transactions = useLiveQuery(
    () =>
      db.transactions
        .where("createdAt")
        .aboveOrEqual(rangeStart)
        .reverse()
        .toArray(),
    [rangeStart]
  );

  const total = (transactions ?? []).reduce((s, t) => s + t.total, 0);
  const totalCOGS = (transactions ?? []).reduce(
    (s, t) => s + t.items.reduce((a, i) => a + i.buyPrice * i.qty, 0), 0
  );

  // Group by date
  const grouped: Record<string, Transaction[]> = {};
  for (const t of transactions ?? []) {
    const key = formatDate(t.createdAt);
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(t);
  }

  return (
    <>
      <div className="flex flex-col h-full">
        {/* Range filter */}
        <div className="flex gap-2 px-4 py-3 border-b border-[var(--border)] shrink-0 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {(Object.keys(RANGE_LABELS) as Range[]).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={cn(
                "shrink-0 h-9 px-4 rounded-full text-sm font-semibold transition-colors",
                range === r
                  ? "bg-[var(--accent)] text-white"
                  : "bg-[var(--input-bg)] text-[var(--fg-muted)] hover:bg-[var(--border)]"
              )}
            >
              {RANGE_LABELS[r]}
            </button>
          ))}
        </div>

        {/* Summary bar */}
        {(transactions ?? []).length > 0 && (
          <div className="flex items-center gap-4 px-4 py-2.5 bg-[var(--accent-soft)] border-b border-[var(--border)] shrink-0 flex-wrap">
            <span className="text-xs font-semibold text-[var(--fg-muted)]">
              {(transactions ?? []).length} transaksyon
            </span>
            <span className="text-xs font-bold peso text-[var(--accent-dark)]">
              Benta: {formatPeso(total)}
            </span>
            <span className="text-xs font-bold peso text-emerald-700">
              Kita: {formatPeso(total - totalCOGS)}
            </span>
          </div>
        )}

        {/* Transaction list grouped by date */}
        <div className="flex-1 overflow-y-auto">
          {Object.keys(grouped).length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 gap-2 text-[var(--fg-muted)]">
              <Receipt size={40} strokeWidth={1} />
              <p className="text-sm font-medium">Walang benta</p>
            </div>
          ) : (
            Object.entries(grouped).map(([date, txns]) => (
              <div key={date}>
                <div className="px-4 py-2 bg-[var(--input-bg)] border-b border-[var(--border)]">
                  <p className="text-xs font-bold uppercase tracking-wider text-[var(--fg-muted)]">{date}</p>
                </div>
                <div className="divide-y divide-[var(--border)]">
                  {txns.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setSelected(t)}
                      className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-[var(--input-bg)] transition-colors active:bg-[var(--accent-soft)]"
                    >
                      <div className="w-9 h-9 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center shrink-0">
                        <Receipt size={16} className="text-[var(--accent)]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-[var(--fg)]">
                          {t.items.length} item{t.items.length !== 1 ? "s" : ""}
                        </p>
                        <p className="text-xs text-[var(--fg-muted)]">{formatTime(t.createdAt)}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold peso text-sm">{formatPeso(t.total)}</p>
                        <p className="text-xs text-emerald-600 font-semibold peso">
                          +{formatPeso(t.total - t.items.reduce((s, i) => s + i.buyPrice * i.qty, 0))}
                        </p>
                      </div>
                      <ChevronRight size={14} className="text-[var(--fg-muted)] shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <TransactionDetail transaction={selected} onClose={() => setSelected(null)} />
    </>
  );
}
