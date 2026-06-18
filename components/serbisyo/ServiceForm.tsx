"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ArrowDownToLine, ArrowUpFromLine, Smartphone, X, AlertTriangle, Check, ArrowRight } from "lucide-react";
import { db, NETWORKS, type ServiceType, type Network } from "@/lib/db";
import { cn } from "@/lib/utils";

interface Props {
  open: boolean;
  onClose: () => void;
  defaultType?: ServiceType;
}

export function ServiceForm({ open, onClose, defaultType = "gcash-in" }: Props) {
  const [type, setType] = useState<ServiceType>(defaultType);
  // Two amount fields per type — the difference is the fee/markup
  const [inAmount, setInAmount] = useState("");   // money coming IN to the store (cash or gcash)
  const [outAmount, setOutAmount] = useState(""); // money going OUT of the store (gcash, cash, or load)
  const [network, setNetwork] = useState<Network>("Globe");
  const [mobileNumber, setMobileNumber] = useState("");
  const [reference, setReference] = useState("");
  const [notes, setNotes] = useState("");
  const [checks, setChecks] = useState<Record<string, boolean>>({});

  if (!open) return null;

  const inAmt = parseFloat(inAmount) || 0;
  const outAmt = parseFloat(outAmount) || 0;
  const fee = inAmt - outAmt; // service fee / markup

  function reset() {
    setInAmount("");
    setOutAmount("");
    setMobileNumber("");
    setReference("");
    setNotes("");
    setChecks({});
  }

  function changeType(newType: ServiceType) {
    setType(newType);
    setChecks({});
  }

  function toggleCheck(key: string) {
    setChecks((c) => ({ ...c, [key]: !c[key] }));
  }

  const checklistItems = getChecklist(type);
  const allChecked = checklistItems.every((c) => checks[c.key]);
  const validAmounts = inAmt > 0 && outAmt > 0 && fee >= 0;
  const canSave = validAmounts && allChecked;

  async function handleSave() {
    if (!canSave) return;
    await db.services.add({
      type,
      // Stored: amount = principal (gcash/load value), fee = the markup
      amount: outAmt,
      fee,
      network: type === "load" ? network : undefined,
      mobileNumber: mobileNumber || undefined,
      reference: reference || undefined,
      notes: notes || undefined,
      createdAt: Date.now(),
    });
    toast.success(
      type === "load"
        ? `${network} load ₱${outAmt.toFixed(2)} naisave`
        : type === "gcash-in"
        ? `Cash-in ₱${outAmt.toFixed(2)} naisave`
        : `Cash-out ₱${outAmt.toFixed(2)} naisave`
    );
    reset();
    onClose();
  }

  function handleClose() {
    reset();
    onClose();
  }

  const labels = getLabels(type);

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center md:justify-center bg-black/40">
      <div className="w-full md:max-w-lg md:rounded-2xl rounded-t-2xl bg-white max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between px-4 py-3 bg-white border-b border-[var(--border)] z-10">
          <h2 className="font-bold text-[var(--fg)]">Bagong Serbisyo</h2>
          <button onClick={handleClose} className="w-9 h-9 rounded-xl bg-[var(--input-bg)] flex items-center justify-center text-[var(--fg-muted)]">
            <X size={18} />
          </button>
        </div>

        <div className="p-4">
          {/* Type tabs */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <TypeButton active={type === "gcash-in"}  onClick={() => changeType("gcash-in")}  icon={<ArrowDownToLine size={18} />} label="Cash-in"  sub="GCash" />
            <TypeButton active={type === "gcash-out"} onClick={() => changeType("gcash-out")} icon={<ArrowUpFromLine size={18} />} label="Cash-out" sub="GCash" />
            <TypeButton active={type === "load"}      onClick={() => changeType("load")}      icon={<Smartphone size={18} />}      label="Load"     sub="E-load" />
          </div>

          {/* Flow explanation */}
          <FlowCard type={type} />

          {/* Load network */}
          {type === "load" && (
            <div className="mb-4">
              <label className="text-[10px] font-bold text-[var(--fg-muted)] uppercase tracking-widest mb-2 block">
                Network
              </label>
              <div className="flex gap-1.5 overflow-x-auto pb-1">
                {NETWORKS.map((n) => (
                  <button
                    key={n}
                    onClick={() => setNetwork(n)}
                    className={cn(
                      "shrink-0 h-9 px-3 rounded-full text-xs font-bold transition-colors",
                      network === n ? "bg-[var(--accent)] text-white" : "bg-[var(--input-bg)] text-[var(--fg-muted)]"
                    )}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Two amount fields — IN and OUT */}
          <div className="rounded-2xl border-2 border-[var(--border)] p-3 mb-4 bg-[var(--input-bg)]">
            <AmountField
              label={labels.inLabel}
              sublabel={labels.inSublabel}
              value={inAmount}
              onChange={setInAmount}
              tone="in"
            />
            <div className="flex justify-center my-2">
              <div className="w-8 h-8 rounded-full bg-white border border-[var(--border)] flex items-center justify-center text-[var(--fg-muted)]">
                <ArrowRight size={14} className="rotate-90" />
              </div>
            </div>
            <AmountField
              label={labels.outLabel}
              sublabel={labels.outSublabel}
              value={outAmount}
              onChange={setOutAmount}
              tone="out"
            />

            {/* Auto-calculated fee */}
            <div className="mt-3 pt-3 border-t border-[var(--border)] flex items-center justify-between">
              <span className="text-xs font-bold text-[var(--fg-muted)] uppercase tracking-wider">
                {labels.feeLabel}
              </span>
              <span className={cn(
                "text-base font-black peso",
                fee < 0 ? "text-red-600" : fee === 0 ? "text-[var(--fg-muted)]" : "text-emerald-700"
              )}>
                {fee < 0 ? "—" : `+₱${fee.toFixed(2)}`}
              </span>
            </div>
            {fee < 0 && inAmt > 0 && outAmt > 0 && (
              <p className="text-[11px] text-red-600 mt-1.5 font-semibold leading-snug">
                ⚠ Mas malaki ang ibibigay kaysa natanggap. Tingnan ang amounts.
              </p>
            )}
          </div>

          {/* Mobile number */}
          <FormField label={type === "load" ? "Numero na ila-load-an" : "Numero ng customer / target (optional)"}>
            <input
              type="tel"
              inputMode="tel"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder="09XX XXX XXXX"
              className="w-full h-12 px-3 rounded-xl border border-[var(--border)] bg-white text-base font-semibold focus:outline-none focus:border-[var(--accent)]"
            />
          </FormField>

          {type !== "load" && (
            <FormField label="GCash reference # (optional)">
              <input
                type="text"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                placeholder="XXXXX XXXXX"
                className="w-full h-12 px-3 rounded-xl border border-[var(--border)] bg-white text-sm font-mono focus:outline-none focus:border-[var(--accent)]"
              />
            </FormField>
          )}

          <FormField label="Notes (optional)">
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Anumang dagdag…"
              className="w-full h-12 px-3 rounded-xl border border-[var(--border)] bg-white text-sm focus:outline-none focus:border-[var(--accent)]"
            />
          </FormField>

          {/* ── Check & Balance ── */}
          <div className="mt-5 rounded-2xl border-2 border-amber-300 bg-amber-50 overflow-hidden">
            <div className="flex items-center gap-2 px-3.5 py-2.5 bg-amber-100 border-b border-amber-300">
              <AlertTriangle size={16} className="text-amber-700 shrink-0" />
              <span className="text-xs font-black text-amber-900 uppercase tracking-wider">Check Bago I-save</span>
            </div>
            <div className="p-3 space-y-2.5">
              {checklistItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => toggleCheck(item.key)}
                  className="w-full flex items-start gap-2.5 text-left active:opacity-80"
                >
                  <div
                    className={cn(
                      "shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center mt-0.5 transition-colors",
                      checks[item.key] ? "bg-emerald-600 border-emerald-600" : "bg-white border-amber-400"
                    )}
                  >
                    {checks[item.key] && <Check size={12} className="text-white" strokeWidth={3} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-amber-900 leading-snug">{item.title}</p>
                    {item.desc && (
                      <p className="text-[11px] text-amber-800 leading-snug mt-0.5">
                        {typeof item.desc === "function" ? item.desc({ inAmt, outAmt, fee }) : item.desc}
                      </p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Save */}
          <button
            onClick={handleSave}
            disabled={!canSave}
            className={cn(
              "w-full mt-4 h-12 rounded-xl font-bold text-base transition-all",
              canSave ? "bg-[var(--accent)] text-white active:scale-[0.98]" : "bg-[var(--input-bg)] text-[var(--fg-muted)] cursor-not-allowed"
            )}
          >
            {canSave
              ? "I-save"
              : !validAmounts
              ? "Maglagay ng tamang amounts"
              : `${Object.values(checks).filter(Boolean).length} / ${checklistItems.length} checked`}
          </button>
        </div>
      </div>
    </div>
  );
}

// ────────────── helpers ──────────────

function AmountField({
  label,
  sublabel,
  value,
  onChange,
  tone,
}: {
  label: string;
  sublabel: string;
  value: string;
  onChange: (v: string) => void;
  tone: "in" | "out";
}) {
  const toneClass = tone === "in"
    ? "border-emerald-300 bg-emerald-50/60"
    : "border-blue-300 bg-blue-50/60";
  const toneText = tone === "in" ? "text-emerald-800" : "text-blue-800";
  const toneIconBg = tone === "in" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700";

  return (
    <div className={cn("rounded-xl border-2 p-2.5", toneClass)}>
      <div className="flex items-center gap-2 mb-1.5">
        <div className={cn("w-6 h-6 rounded-md flex items-center justify-center text-xs font-black", toneIconBg)}>
          {tone === "in" ? "↓" : "↑"}
        </div>
        <div className="flex-1 min-w-0">
          <div className={cn("text-[10px] font-black uppercase tracking-widest leading-none", toneText)}>{label}</div>
          <div className="text-[10px] text-[var(--fg-muted)] mt-0.5 leading-snug">{sublabel}</div>
        </div>
      </div>
      <div className="flex items-center gap-2 h-11 px-3 rounded-lg bg-white border border-[var(--border)]">
        <span className="text-[var(--fg-muted)] font-bold">₱</span>
        <input
          type="number"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="0.00"
          className="flex-1 bg-transparent text-base font-bold focus:outline-none"
        />
      </div>
    </div>
  );
}

function FlowCard({ type }: { type: ServiceType }) {
  const config = {
    "gcash-in": {
      title: "Paano ito ginagawa:",
      steps: [
        "1. Tatanggap ka ng cash sa customer",
        "2. Magpadala ka ng GCash sa numero ng customer / target",
      ],
      bg: "bg-blue-50 border-blue-200",
      text: "text-blue-900",
    },
    "gcash-out": {
      title: "Paano ito ginagawa:",
      steps: [
        "1. Magpapadala ang customer ng GCash sa iyong account",
        "2. Bibigyan mo siya ng cash (mas maliit kaysa GCash na natanggap)",
      ],
      bg: "bg-purple-50 border-purple-200",
      text: "text-purple-900",
    },
    load: {
      title: "Paano ito ginagawa:",
      steps: [
        "1. Tatanggap ka ng cash sa customer",
        "2. Magpadala ka ng load sa numero ng customer",
      ],
      bg: "bg-orange-50 border-orange-200",
      text: "text-orange-900",
    },
  };
  const c = config[type];
  return (
    <div className={cn("mb-4 p-3 rounded-xl border", c.bg)}>
      <p className={cn("text-[10px] font-black uppercase tracking-widest mb-1.5", c.text)}>{c.title}</p>
      {c.steps.map((s, i) => (
        <p key={i} className={cn("text-xs leading-snug", c.text)}>{s}</p>
      ))}
    </div>
  );
}

function getLabels(type: ServiceType) {
  if (type === "gcash-in") {
    return {
      inLabel:  "Cash na natanggap",
      inSublabel:  "Halaga ng pera na binigay ng customer sa iyo",
      outLabel: "GCash na ipapadala",
      outSublabel: "Amount na ise-send mo sa GCash ng customer",
      feeLabel: "Service fee (kita)",
    };
  }
  if (type === "gcash-out") {
    return {
      inLabel:  "GCash na natanggap",
      inSublabel:  "Amount na dumating sa iyong GCash account",
      outLabel: "Cash na ibibigay",
      outSublabel: "Halaga ng pera na ibibigay mo sa customer",
      feeLabel: "Service fee (kita)",
    };
  }
  return {
    inLabel:  "Cash na natanggap",
    inSublabel:  "Halaga ng pera na binigay ng customer",
    outLabel: "Load na ipapadala",
    outSublabel: "Load value (halimbawa ₱20 load)",
    feeLabel: "Markup (kita)",
  };
}

type ChecklistItem = {
  key: string;
  title: string;
  desc?: string | ((v: { inAmt: number; outAmt: number; fee: number }) => string);
};

function getChecklist(type: ServiceType): ChecklistItem[] {
  if (type === "gcash-in") {
    return [
      {
        key: "cash-received",
        title: "Tama ang cash na natanggap?",
        desc: ({ inAmt }) => `Bilangin: ₱${inAmt.toFixed(2)}. Tingnan na hindi peke ang bills.`,
      },
      {
        key: "gcash-sent",
        title: "Naipadala ko na ang GCash sa tamang numero",
        desc: ({ outAmt }) => `Padala lang: ₱${outAmt.toFixed(2)}. I-double-check ang numero bago i-send.`,
      },
    ];
  }
  if (type === "gcash-out") {
    return [
      {
        key: "gcash-received-app",
        title: "Nakita ko sa GCash app ko ang pera",
        desc: "WAG MAGTIWALA SA SCREENSHOT LANG! Buksan ang sariling GCash app at tingnan ang transactions.",
      },
      {
        key: "amount-correct",
        title: "Tama ang amount na natanggap sa GCash?",
        desc: ({ inAmt }) => `Dapat ₱${inAmt.toFixed(2)} ang dumating sa iyong GCash account.`,
      },
      {
        key: "cash-ready",
        title: "Handa na ang cash na ibibigay",
        desc: ({ outAmt }) => `Ibibigay sa customer: ₱${outAmt.toFixed(2)}.`,
      },
    ];
  }
  // load
  return [
    {
      key: "cash-received",
      title: "Natanggap na ang cash sa customer",
      desc: ({ inAmt }) => `Bilangin: ₱${inAmt.toFixed(2)}.`,
    },
    {
      key: "load-sent",
      title: "Naipadala ko na ang load sa tamang numero",
      desc: ({ outAmt }) => `₱${outAmt.toFixed(2)} load sent. I-double-check ang numero at network.`,
    },
  ];
}

function TypeButton({ active, onClick, icon, label, sub }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string; sub: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center gap-1 py-3 rounded-xl border-2 transition-all",
        active
          ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent-dark)]"
          : "border-[var(--border)] bg-white text-[var(--fg-muted)]"
      )}
    >
      {icon}
      <span className="text-xs font-bold leading-none">{label}</span>
      <span className="text-[9px] font-medium uppercase tracking-wider opacity-70">{sub}</span>
    </button>
  );
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-3">
      <label className="text-[10px] font-bold text-[var(--fg-muted)] uppercase tracking-widest mb-1.5 block">
        {label}
      </label>
      {children}
    </div>
  );
}
