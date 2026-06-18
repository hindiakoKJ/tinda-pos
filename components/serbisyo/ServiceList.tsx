"use client";

import { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { ArrowDownToLine, ArrowUpFromLine, Smartphone, Trash2, Wallet } from "lucide-react";
import { toast } from "sonner";
import { db, type ServiceTxn } from "@/lib/db";
import { formatPeso, cn } from "@/lib/utils";
import { DateRangePicker, buildRange, type DateRange } from "@/components/ui/DateRangePicker";

type Filter = "all" | "gcash-in" | "gcash-out" | "load";

export function ServiceList() {
  const [filter, setFilter] = useState<Filter>("all");
  const [range, setRange] = useState<DateRange>(buildRange("today"));

  const services = useLiveQuery(
    () => db.services.orderBy("createdAt").reverse().toArray(),
    []
  );

  const filtered = (services ?? []).filter((s) => {
    if (s.createdAt < range.start || s.createdAt > range.end) return false;
    if (filter !== "all" && s.type !== filter) return false;
    return true;
  });

  // Summary
  const summary = filtered.reduce(
    (acc, s) => {
      acc.totalFees += s.fee;
      if (s.type === "gcash-in") acc.cashIn += s.amount;
      if (s.type === "gcash-out") acc.cashOut += s.amount;
      if (s.type === "load") acc.loadSold += s.amount;
      return acc;
    },
    { totalFees: 0, cashIn: 0, cashOut: 0, loadSold: 0 }
  );

  async function handleDelete(id: number) {
    if (!confirm("Burahin ang transaction na ito?")) return;
    await db.services.delete(id);
    toast.success("Nabura");
  }

  return (
    <div className="flex flex-col h-full">
      {/* Date range picker */}
      <div className="px-4 pt-3 pb-2 shrink-0">
        <DateRangePicker value={range} onChange={setRange} />
      </div>

      {/* Summary cards */}
      <div className="px-4 pb-3 shrink-0">
        <div className="rounded-2xl border border-[var(--border)] bg-white p-3.5">
          <div className="text-[10px] font-bold text-[var(--fg-muted)] uppercase tracking-widest mb-1.5">
            Kita sa serbisyo
          </div>
          <div className="flex items-baseline gap-1.5 mb-3">
            <span className="text-2xl font-black text-emerald-700 peso">
              {formatPeso(summary.totalFees)}
            </span>
            <span className="text-xs text-[var(--fg-muted)]">na fees</span>
          </div>
          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[var(--border)]">
            <SummaryStat label="Cash-in" value={summary.cashIn} icon={<ArrowDownToLine size={12} />} color="text-blue-600" />
            <SummaryStat label="Cash-out" value={summary.cashOut} icon={<ArrowUpFromLine size={12} />} color="text-purple-600" />
            <SummaryStat label="Load" value={summary.loadSold} icon={<Smartphone size={12} />} color="text-orange-600" />
          </div>
        </div>
      </div>

      {/* Type filter chips */}
      <div className="flex gap-1.5 px-4 pb-2 overflow-x-auto shrink-0">
        {([
          { key: "all", label: "Lahat" },
          { key: "gcash-in", label: "Cash-in" },
          { key: "gcash-out", label: "Cash-out" },
          { key: "load", label: "Load" },
        ] as { key: Filter; label: string }[]).map((c) => (
          <button
            key={c.key}
            onClick={() => setFilter(c.key)}
            className={cn(
              "shrink-0 h-8 px-4 rounded-full text-xs font-bold transition-colors",
              filter === c.key
                ? "bg-[var(--fg)] text-white"
                : "bg-[var(--input-bg)] text-[var(--fg-muted)]"
            )}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto pb-24">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 gap-2 text-[var(--fg-muted)] px-4">
            <Wallet size={32} strokeWidth={1} />
            <p className="text-sm font-medium">Walang serbisyo</p>
            <p className="text-xs text-center">Mag-tap ng &quot;+&quot; para magdagdag ng GCash o Load</p>
          </div>
        ) : (
          <div className="divide-y divide-[var(--border)]">
            {filtered.map((s) => (
              <ServiceRow key={s.id} service={s} onDelete={() => s.id && handleDelete(s.id)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SummaryStat({ label, value, icon, color }: { label: string; value: number; icon: React.ReactNode; color: string }) {
  return (
    <div>
      <div className={cn("flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider mb-0.5", color)}>
        {icon} {label}
      </div>
      <div className="text-sm font-bold text-[var(--fg)] peso">
        {formatPeso(value)}
      </div>
    </div>
  );
}

function ServiceRow({ service, onDelete }: { service: ServiceTxn; onDelete: () => void }) {
  const isCashIn = service.type === "gcash-in";
  const isCashOut = service.type === "gcash-out";
  const isLoad = service.type === "load";

  const icon = isCashIn ? <ArrowDownToLine size={16} /> : isCashOut ? <ArrowUpFromLine size={16} /> : <Smartphone size={16} />;
  const iconBg = isCashIn ? "bg-blue-100 text-blue-700" : isCashOut ? "bg-purple-100 text-purple-700" : "bg-orange-100 text-orange-700";
  const typeLabel = isCashIn ? "Cash-in" : isCashOut ? "Cash-out" : `${service.network} Load`;

  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-white">
      <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center shrink-0", iconBg)}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-bold text-[var(--fg)]">{typeLabel}</span>
          {service.mobileNumber && (
            <span className="text-[10px] font-mono text-[var(--fg-muted)]">· {service.mobileNumber}</span>
          )}
        </div>
        <div className="flex items-baseline gap-2 mt-0.5">
          <span className="text-xs text-[var(--fg-muted)]">{formatTime(service.createdAt)}</span>
          {service.reference && (
            <span className="text-[10px] font-mono text-[var(--fg-muted)]">ref · {service.reference}</span>
          )}
        </div>
      </div>
      <div className="text-right shrink-0">
        <div className="text-sm font-bold text-[var(--fg)] peso">{formatPeso(service.amount)}</div>
        <div className="text-[11px] text-emerald-700 font-semibold">+{formatPeso(service.fee)} fee</div>
      </div>
      <button
        onClick={onDelete}
        className="shrink-0 w-8 h-8 rounded-lg text-[var(--fg-muted)] hover:bg-red-50 hover:text-red-600 transition-colors flex items-center justify-center"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}

function formatTime(ts: number) {
  return new Date(ts).toLocaleString("en-PH", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}
