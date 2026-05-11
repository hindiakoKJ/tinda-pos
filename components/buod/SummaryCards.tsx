"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { TrendingUp, ShoppingBag, Wallet, DollarSign, AlertTriangle, Package } from "lucide-react";
import { db } from "@/lib/db";
import { formatPeso, startOfDay, endOfDay } from "@/lib/utils";
import Link from "next/link";

export function SummaryCards() {
  const todayStart = startOfDay().getTime();
  const todayEnd = endOfDay().getTime();

  const todayTransactions = useLiveQuery(
    () => db.transactions.where("createdAt").between(todayStart, todayEnd).toArray(),
    [todayStart, todayEnd]
  );

  const todayExpenses = useLiveQuery(
    () => db.expenses.where("date").between(todayStart, todayEnd).toArray(),
    [todayStart, todayEnd]
  );

  const lowStockProducts = useLiveQuery(
    () => db.products.filter((p) => p.stock <= 5).toArray(),
    []
  );

  const grossSales = (todayTransactions ?? []).reduce((s, t) => s + t.total, 0);
  const grossCOGS = (todayTransactions ?? []).reduce(
    (s, t) => s + t.items.reduce((a, i) => a + i.buyPrice * i.qty, 0),
    0
  );
  const grossProfit = grossSales - grossCOGS;
  const totalExpenses = (todayExpenses ?? []).reduce((s, e) => s + e.amount, 0);
  const netProfit = grossProfit - totalExpenses;

  // Top sellers today
  const salesMap: Record<number, { name: string; qty: number }> = {};
  for (const t of todayTransactions ?? []) {
    for (const item of t.items) {
      if (!salesMap[item.productId]) {
        salesMap[item.productId] = { name: item.productName, qty: 0 };
      }
      salesMap[item.productId].qty += item.qty;
    }
  }
  const topSellers = Object.values(salesMap)
    .sort((a, b) => b.qty - a.qty)
    .slice(0, 5);

  const cards = [
    {
      label: "Benta Ngayon",
      value: formatPeso(grossSales),
      icon: ShoppingBag,
      color: "bg-amber-50 text-amber-600 border-amber-200",
      iconBg: "bg-amber-100",
    },
    {
      label: "Gross na Kita",
      value: formatPeso(grossProfit),
      icon: TrendingUp,
      color: "bg-emerald-50 text-emerald-700 border-emerald-200",
      iconBg: "bg-emerald-100",
    },
    {
      label: "Gastos Ngayon",
      value: formatPeso(totalExpenses),
      icon: Wallet,
      color: "bg-blue-50 text-blue-700 border-blue-200",
      iconBg: "bg-blue-100",
    },
    {
      label: "Net na Kita",
      value: formatPeso(netProfit),
      icon: DollarSign,
      color: netProfit >= 0
        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
        : "bg-red-50 text-red-600 border-red-200",
      iconBg: netProfit >= 0 ? "bg-emerald-100" : "bg-red-100",
    },
  ];

  return (
    <div className="p-4 space-y-5">
      {/* Date header */}
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--fg-muted)]">
          Buod ngayon
        </h2>
        <p className="text-sm text-[var(--fg-muted)]">
          {new Date().toLocaleDateString("en-PH", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
        </p>
      </div>

      {/* Summary cards — 2 col on phone, 4 col on tablet */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {cards.map(({ label, value, icon: Icon, color, iconBg }) => (
          <div key={label} className={`rounded-2xl border p-4 ${color}`}>
            <div className={`w-9 h-9 rounded-xl ${iconBg} flex items-center justify-center mb-3`}>
              <Icon size={18} />
            </div>
            <p className="text-xs font-semibold uppercase tracking-wide opacity-70 mb-1">{label}</p>
            <p className="text-xl font-bold peso leading-tight">{value}</p>
          </div>
        ))}
      </div>

      {/* Top sellers */}
      {topSellers.length > 0 && (
        <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-4">
          <h3 className="font-bold text-sm text-[var(--fg)] mb-3 flex items-center gap-2">
            <TrendingUp size={16} className="text-[var(--accent)]" />
            Pinaka-maraming Nabenta
          </h3>
          <div className="space-y-2">
            {topSellers.map((item, i) => (
              <div key={item.name} className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[var(--accent-soft)] text-[var(--accent-dark)] text-xs font-bold flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <span className="flex-1 text-sm font-medium text-[var(--fg)] truncate">{item.name}</span>
                <span className="text-sm font-bold text-[var(--fg-muted)]">{item.qty} pcs</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Low stock warnings */}
      {(lowStockProducts ?? []).length > 0 && (
        <div className="bg-[var(--card)] rounded-2xl border border-amber-200 p-4">
          <h3 className="font-bold text-sm text-amber-700 mb-3 flex items-center gap-2">
            <AlertTriangle size={16} />
            Mababang Stock
          </h3>
          <div className="space-y-2">
            {(lowStockProducts ?? []).map((p) => (
              <div key={p.id} className="flex items-center gap-3">
                <Package size={14} className="text-[var(--fg-muted)] shrink-0" />
                <span className="flex-1 text-sm font-medium text-[var(--fg)] truncate">{p.name}</span>
                <span className={`text-sm font-bold ${p.stock === 0 ? "text-red-500" : "text-amber-600"}`}>
                  {p.stock === 0 ? "Ubos!" : `${p.stock} ${p.unit}`}
                </span>
              </div>
            ))}
          </div>
          <Link
            href="/paninda"
            className="mt-3 block text-center text-xs font-semibold text-[var(--accent)] hover:underline"
          >
            I-update ang stock →
          </Link>
        </div>
      )}

      {/* Empty state */}
      {(todayTransactions ?? []).length === 0 && (
        <div className="text-center py-8 text-[var(--fg-muted)]">
          <ShoppingBag size={40} strokeWidth={1} className="mx-auto mb-3 opacity-40" />
          <p className="text-sm font-medium">Wala pang benta ngayon</p>
          <Link href="/pos" className="mt-2 inline-block text-sm font-semibold text-[var(--accent)]">
            Magsimula ng benta →
          </Link>
        </div>
      )}
    </div>
  );
}
