"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { db, type Product } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

const UNITS = ["pcs", "pack", "kilo", "bote", "sachet", "dose", "metro", "lata"];
const CATEGORIES = ["Inumin", "Pagkain", "Pang-araw-araw", "Iba Pa"];

interface ProductFormProps {
  open: boolean;
  product: Product | null;
  onClose: () => void;
}

const BLANK = { name: "", category: "Inumin", unit: "pcs", buyPrice: "", sellPrice: "", stock: "" };

export function ProductForm({ open, product, onClose }: ProductFormProps) {
  const [form, setForm] = useState(BLANK);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        category: product.category,
        unit: product.unit,
        buyPrice: String(product.buyPrice),
        sellPrice: String(product.sellPrice),
        stock: String(product.stock),
      });
    } else {
      setForm(BLANK);
    }
  }, [product, open]);

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const valid =
    form.name.trim().length > 0 &&
    Number(form.buyPrice) >= 0 &&
    Number(form.sellPrice) > 0 &&
    Number(form.stock) >= 0;

  async function handleSave() {
    if (!valid) return;
    setSaving(true);
    try {
      const data: Omit<Product, "id"> = {
        name: form.name.trim(),
        category: form.category,
        unit: form.unit,
        buyPrice: Number(form.buyPrice),
        sellPrice: Number(form.sellPrice),
        stock: Math.floor(Number(form.stock)),
        createdAt: product?.createdAt ?? Date.now(),
      };
      if (product?.id) {
        await db.products.update(product.id, data);
        toast.success("Na-update ang produkto");
      } else {
        await db.products.add(data);
        // Add category if new
        const exists = await db.categories.where("name").equals(form.category).count();
        if (!exists) await db.categories.add({ name: form.category });
        toast.success("Naidagdag ang produkto");
      }
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
          <DialogTitle>{product ? "I-edit ang Produkto" : "Bagong Produkto"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            label="Pangalan ng Produkto"
            placeholder="hal. Lucky Me Instant Noodles"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
          />

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[var(--fg)]">Kategorya</label>
              <Select value={form.category} onValueChange={(v) => set("category", v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[var(--fg)]">Unit</label>
              <Select value={form.unit} onValueChange={(v) => set("unit", v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {UNITS.map((u) => <SelectItem key={u} value={u}>{u}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Presyo ng Bilhin (₱)"
              type="number"
              inputMode="decimal"
              placeholder="0.00"
              value={form.buyPrice}
              onChange={(e) => set("buyPrice", e.target.value)}
            />
            <Input
              label="Presyo ng Benta (₱)"
              type="number"
              inputMode="decimal"
              placeholder="0.00"
              value={form.sellPrice}
              onChange={(e) => set("sellPrice", e.target.value)}
            />
          </div>

          <Input
            label="Stock (bilang)"
            type="number"
            inputMode="numeric"
            placeholder="0"
            value={form.stock}
            onChange={(e) => set("stock", e.target.value)}
          />

          {/* Margin preview */}
          {Number(form.buyPrice) > 0 && Number(form.sellPrice) > 0 && (
            <div className="rounded-xl bg-[var(--accent-soft)] px-4 py-3 text-sm">
              <span className="font-semibold text-[var(--accent-dark)]">
                Kita bawat {form.unit}:{" "}
                ₱{(Number(form.sellPrice) - Number(form.buyPrice)).toFixed(2)}
                {" "}
                ({(((Number(form.sellPrice) - Number(form.buyPrice)) / Number(form.sellPrice)) * 100).toFixed(0)}% margin)
              </span>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Kanselahin</Button>
          <Button onClick={handleSave} disabled={!valid || saving}>
            {saving ? "Nagse-save…" : product ? "I-update" : "Idagdag"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
