"use client";

import { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { Plus, Trash2, Wallet } from "lucide-react";
import { toast } from "sonner";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { formatPeso, formatDate, cn } from "@/lib/utils";
import { ExpenseForm } from "./ExpenseForm";
import { DateRangePicker, buildRange, type DateRange } from "@/components/ui/DateRangePicker";

const CATEGORY_COLORS: Record<string, string> = {
  Kuryente: "bg-yellow-100 text-yellow-700",
  Tubig: "bg-blue-100 text-blue-700",
  Transportasyon: "bg-purple-100 text-purple-700",
  "Pagkain (restocking)": "bg-orange-100 text-orange-700",
  Internet: "bg-cyan-100 text-cyan-700",
  Renta: "bg-pink-100 text-pink-700",
  "Iba Pa": "bg-gray-100 text-gray-600",
};

export function ExpenseList() {
  const [range, setRange] = useState<DateRange>(buildRange("today"));
  const [showForm, setShowForm] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const expenses = useLiveQuery(
    () =>
      db.expenses
        .where("date")
        .between(range.start, range.end, true, true)
        .reverse()
        .toArray(),
    [range.start, range.end]
  );

  const total = (expenses ?? []).reduce((s, e) => s + e.amount, 0);

  async function handleDelete(id: number) {
    await db.expenses.delete(id);
    toast.success("Natanggal");
    setDeleteId(null);
  }

  return (
    <>
      <div className="flex flex-col h-full">
        {/* Toolbar — date range + add button */}
        <div className="px-4 py-3 border-b border-[var(--border)] shrink-0 space-y-2">
          <div className="flex items-start gap-3">
            <div className="flex-1 min-w-0">
              <DateRangePicker value={range} onChange={setRange} />
            </div>
            <Button size="sm" onClick={() => setShowForm(true)} className="shrink-0 gap-1 mt-0">
              <Plus size={16} strokeWidth={2.5} />
              <span className="hidden sm:inline">Idagdag</span>
            </Button>
          </div>
        </div>

        {/* Total */}
        {(expenses ?? []).length > 0 && (
          <div className="flex items-center justify-between px-4 py-2.5 bg-blue-50 border-b border-blue-100 shrink-0">
            <span className="text-sm font-semibold text-blue-700">
              {(expenses ?? []).length} gastos
            </span>
            <span className="text-sm font-bold peso text-blue-700">
              Kabuuan: {formatPeso(total)}
            </span>
          </div>
        )}

        {/* List */}
        <div className="flex-1 overflow-y-auto">
          {(expenses ?? []).length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 gap-3 text-[var(--fg-muted)]">
              <Wallet size={40} strokeWidth={1} />
              <p className="text-sm font-medium">Walang naitala na gastos</p>
              <Button size="sm" onClick={() => setShowForm(true)}>
                <Plus size={16} /> Itala ang gastos
              </Button>
            </div>
          ) : (
            <div className="divide-y divide-[var(--border)]">
              {(expenses ?? []).map((e) => (
                <div key={e.id} className="flex items-center gap-3 px-4 py-3.5">
                  <div
                    className={cn(
                      "shrink-0 px-2.5 py-1 rounded-lg text-xs font-semibold",
                      CATEGORY_COLORS[e.category] ?? "bg-gray-100 text-gray-600"
                    )}
                  >
                    {e.category}
                  </div>
                  <div className="flex-1 min-w-0">
                    {e.notes && (
                      <p className="text-sm text-[var(--fg)] truncate">{e.notes}</p>
                    )}
                    <p className="text-xs text-[var(--fg-muted)]">{formatDate(e.date)}</p>
                  </div>
                  <p className="font-bold peso text-sm text-blue-700 shrink-0">
                    {formatPeso(e.amount)}
                  </p>
                  <button
                    onClick={() => setDeleteId(e.id!)}
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-[var(--fg-muted)] hover:bg-red-50 hover:text-red-500 transition-colors shrink-0"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <ExpenseForm open={showForm} onClose={() => setShowForm(false)} />

      {deleteId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-[var(--card)] rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <h3 className="font-bold text-lg mb-2">Tanggalin?</h3>
            <p className="text-sm text-[var(--fg-muted)] mb-6">Aalisin ang tala ng gastos na ito.</p>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setDeleteId(null)}>Hindi</Button>
              <Button variant="destructive" className="flex-1" onClick={() => handleDelete(deleteId)}>Tanggalin</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
