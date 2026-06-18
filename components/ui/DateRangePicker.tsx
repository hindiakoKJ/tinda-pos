"use client";

import { useState } from "react";
import { Calendar } from "lucide-react";
import { cn, startOfDay, endOfDay, startOfWeek, startOfMonth } from "@/lib/utils";

export type RangePreset = "today" | "week" | "month" | "all" | "custom";

export interface DateRange {
  preset: RangePreset;
  start: number; // unix ms (inclusive)
  end: number;   // unix ms (inclusive)
  customFrom?: string; // "YYYY-MM-DD"
  customTo?: string;
}

const PRESET_LABELS: Record<Exclude<RangePreset, "custom">, string> = {
  today: "Ngayon",
  week: "Linggo",
  month: "Buwan",
  all: "Lahat",
};

export function buildRange(preset: Exclude<RangePreset, "custom">): DateRange {
  const now = new Date();
  const end = endOfDay(now).getTime();
  let start = 0;
  if (preset === "today") start = startOfDay(now).getTime();
  else if (preset === "week") start = startOfWeek(now).getTime();
  else if (preset === "month") start = startOfMonth(now).getTime();
  else start = 0;
  return { preset, start, end };
}

export function buildCustomRange(from: string, to: string): DateRange {
  // from/to are "YYYY-MM-DD"
  const start = from ? startOfDay(new Date(from)).getTime() : 0;
  const end = to ? endOfDay(new Date(to)).getTime() : Date.now();
  return { preset: "custom", start, end, customFrom: from, customTo: to };
}

function todayStr() {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

interface Props {
  value: DateRange;
  onChange: (range: DateRange) => void;
}

export function DateRangePicker({ value, onChange }: Props) {
  const [showCustom, setShowCustom] = useState(value.preset === "custom");
  const [from, setFrom] = useState(value.customFrom ?? todayStr());
  const [to, setTo] = useState(value.customTo ?? todayStr());

  function selectPreset(p: Exclude<RangePreset, "custom">) {
    setShowCustom(false);
    onChange(buildRange(p));
  }

  function toggleCustom() {
    if (showCustom) {
      setShowCustom(false);
    } else {
      setShowCustom(true);
      // Apply current custom immediately
      onChange(buildCustomRange(from, to));
    }
  }

  function applyCustom(newFrom: string, newTo: string) {
    setFrom(newFrom);
    setTo(newTo);
    if (newFrom && newTo) {
      onChange(buildCustomRange(newFrom, newTo));
    }
  }

  return (
    <div className="flex flex-col gap-2">
      {/* Preset chips */}
      <div className="flex gap-1.5 overflow-x-auto">
        {(Object.keys(PRESET_LABELS) as Exclude<RangePreset, "custom">[]).map((p) => (
          <button
            key={p}
            onClick={() => selectPreset(p)}
            className={cn(
              "shrink-0 h-9 px-3.5 rounded-full text-xs font-bold transition-colors",
              value.preset === p && !showCustom
                ? "bg-[var(--accent)] text-white"
                : "bg-[var(--input-bg)] text-[var(--fg-muted)]"
            )}
          >
            {PRESET_LABELS[p]}
          </button>
        ))}
        <button
          onClick={toggleCustom}
          className={cn(
            "shrink-0 h-9 px-3.5 rounded-full text-xs font-bold transition-colors flex items-center gap-1.5",
            value.preset === "custom" || showCustom
              ? "bg-[var(--accent)] text-white"
              : "bg-[var(--input-bg)] text-[var(--fg-muted)]"
          )}
        >
          <Calendar size={13} />
          Petsa
        </button>
      </div>

      {/* Custom date pickers */}
      {showCustom && (
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[var(--input-bg)] border border-[var(--border)]">
          <div className="flex-1">
            <label className="text-[9px] font-bold text-[var(--fg-muted)] uppercase tracking-wider mb-0.5 block">
              Mula
            </label>
            <input
              type="date"
              value={from}
              max={to || todayStr()}
              onChange={(e) => applyCustom(e.target.value, to)}
              className="w-full h-9 px-2 rounded-lg bg-white border border-[var(--border)] text-xs font-semibold focus:outline-none focus:border-[var(--accent)]"
            />
          </div>
          <span className="text-[var(--fg-muted)] text-xs font-bold pt-4">→</span>
          <div className="flex-1">
            <label className="text-[9px] font-bold text-[var(--fg-muted)] uppercase tracking-wider mb-0.5 block">
              Hanggang
            </label>
            <input
              type="date"
              value={to}
              min={from}
              max={todayStr()}
              onChange={(e) => applyCustom(from, e.target.value)}
              className="w-full h-9 px-2 rounded-lg bg-white border border-[var(--border)] text-xs font-semibold focus:outline-none focus:border-[var(--accent)]"
            />
          </div>
        </div>
      )}
    </div>
  );
}
