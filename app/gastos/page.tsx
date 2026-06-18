"use client";

import { useState, useEffect } from "react";
import { Info, X } from "lucide-react";
import { AppShell } from "@/components/shell/AppShell";
import { ExpenseList } from "@/components/gastos/ExpenseList";

const DISMISS_KEY = "tinda-gastos-fyi-dismissed";

export default function GastosPage() {
  const [showFyi, setShowFyi] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const dismissed = localStorage.getItem(DISMISS_KEY);
    if (!dismissed) setShowFyi(true);
  }, []);

  function dismiss() {
    localStorage.setItem(DISMISS_KEY, "1");
    setShowFyi(false);
  }

  return (
    <AppShell title="Gastos">
      <div className="flex flex-col h-full">
        {showFyi && (
          <div className="mx-4 mt-3 mb-1 rounded-2xl border border-amber-200 bg-amber-50 p-3.5 flex gap-3 shrink-0">
            <div className="shrink-0 w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
              <Info size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-amber-900 leading-snug">Paalala sa gastos</p>
              <p className="text-xs text-amber-800 leading-snug mt-1">
                Para tama ang Net Kita, ilagay lang ang <b>gastos sa negosyo</b> — kuryente sa tindahan, tubig, pamasahe para sa stock, atbp.
                <br />
                <b>Huwag ihalo</b> ang personal na gastos (groceries, allowance, baon ng anak). Ito ay para sa kita, hindi sabay-sabay sa personal.
              </p>
            </div>
            <button
              onClick={dismiss}
              className="shrink-0 w-7 h-7 rounded-lg text-amber-700 hover:bg-amber-100 flex items-center justify-center"
              aria-label="Isara ang paalala"
            >
              <X size={16} />
            </button>
          </div>
        )}
        <div className="flex-1 min-h-0">
          <ExpenseList />
        </div>
      </div>
    </AppShell>
  );
}
