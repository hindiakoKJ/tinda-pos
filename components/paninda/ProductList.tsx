"use client";

import { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { Plus, Pencil, Trash2, Search, Package } from "lucide-react";
import { toast } from "sonner";
import { db, type Product } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPeso } from "@/lib/utils";
import { ProductForm } from "./ProductForm";

export function ProductList() {
  const [search, setSearch] = useState("");
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const products = useLiveQuery(
    () => db.products.orderBy("name").toArray(),
    []
  );

  const filtered = (products ?? []).filter((p) =>
    search === "" ||
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  async function handleDelete(id: number) {
    await db.products.delete(id);
    toast.success("Natanggal ang produkto");
    setDeleteId(null);
  }

  function openAdd() {
    setEditProduct(null);
    setShowForm(true);
  }

  function openEdit(p: Product) {
    setEditProduct(p);
    setShowForm(true);
  }

  function stockBadge(p: Product) {
    if (p.stock === 0) return <Badge tone="danger">Ubos</Badge>;
    if (p.stock <= 5) return <Badge tone="warn">Mababa ({p.stock})</Badge>;
    return <Badge tone="success">{p.stock} {p.unit}</Badge>;
  }

  return (
    <>
      <div className="flex flex-col h-full">
        {/* Toolbar */}
        <div className="flex gap-3 px-4 py-3 shrink-0 border-b border-[var(--border)]">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--fg-muted)]" />
            <input
              type="search"
              placeholder="Hanapin…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-11 pl-9 pr-4 rounded-xl border border-[var(--border)] bg-[var(--input-bg)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            />
          </div>
          <Button onClick={openAdd} size="sm" className="shrink-0 gap-1">
            <Plus size={16} strokeWidth={2.5} />
            <span className="hidden sm:inline">Idagdag</span>
          </Button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 gap-3 text-[var(--fg-muted)]">
              <Package size={40} strokeWidth={1} />
              <p className="text-sm font-medium">
                {search ? "Walang nahanap" : "Wala pang produkto"}
              </p>
              {!search && (
                <Button size="sm" onClick={openAdd}>
                  <Plus size={16} /> Mag-dagdag ng produkto
                </Button>
              )}
            </div>
          ) : (
            <div className="divide-y divide-[var(--border)]">
              {filtered.map((p) => (
                <div key={p.id} className="flex items-center gap-3 px-4 py-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-sm text-[var(--fg)] truncate">{p.name}</p>
                      {stockBadge(p)}
                    </div>
                    <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                      <span className="text-xs text-[var(--fg-muted)]">{p.category} · {p.unit}</span>
                      <span className="text-xs text-[var(--fg-muted)]">
                        Bilhin: <span className="font-semibold peso">{formatPeso(p.buyPrice)}</span>
                        {" · "}
                        Benta: <span className="font-semibold peso text-[var(--accent-dark)]">{formatPeso(p.sellPrice)}</span>
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => openEdit(p)}
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-[var(--fg-muted)] hover:bg-[var(--input-bg)] hover:text-[var(--fg)] transition-colors"
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      onClick={() => setDeleteId(p.id!)}
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-[var(--fg-muted)] hover:bg-red-50 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit form */}
      <ProductForm
        open={showForm}
        product={editProduct}
        onClose={() => setShowForm(false)}
      />

      {/* Delete confirm */}
      {deleteId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-[var(--card)] rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <h3 className="font-bold text-lg mb-2">Tanggalin ang Produkto?</h3>
            <p className="text-sm text-[var(--fg-muted)] mb-6">
              Hindi na ito maibabalik. Ang mga nakaraang benta ay hindi maaapektuhan.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setDeleteId(null)}>
                Hindi
              </Button>
              <Button variant="destructive" className="flex-1" onClick={() => handleDelete(deleteId)}>
                Oo, tanggalin
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
