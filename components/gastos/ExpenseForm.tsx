"use client";

import { useState } from "react";
import { toast } from "sonner";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

const CATEGORIES = ["Kuryente", "Tubig", "Transportasyon", "Pagkain (restocking)", "Internet", "Renta", "Iba Pa"];

interface ExpenseFormProps {
  open: boolean;
  onClose: () => void;
}

export function ExpenseForm({ open, onClose }: ExpenseFormProps) {
  const [category, setCategory] = useState("Kuryente");
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [saving, setSaving] = useState(false);

  const valid = Number(amount) > 0 && date !== "";

  async function handleSave() {
    if (!valid) return;
    setSaving(true);
    try {
      await db.expenses.add({
        date: new Date(date).getTime(),
        category,
        amount: Number(amount),
        notes: notes.trim(),
      });
      toast.success("Naitala ang gastos");
      setAmount("");
      setNotes("");
      onClose();
    } catch {
      toast.error("May error. Subukan ulit.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Itala ang Gastos</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-[var(--fg)]">Kategorya</label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <Input
            label="Halaga (₱)"
            type="number"
            inputMode="decimal"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="text-xl font-bold peso"
          />

          <Input
            label="Petsa"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-[var(--fg)]">Tala (opsyonal)</label>
            <textarea
              placeholder="hal. Bayad ng kuryente para sa Abril"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--input-bg)] px-4 py-3 text-sm text-[var(--fg)] placeholder:text-[var(--fg-muted)] resize-none focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Kanselahin</Button>
          <Button onClick={handleSave} disabled={!valid || saving}>
            {saving ? "Nagse-save…" : "Itala"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
