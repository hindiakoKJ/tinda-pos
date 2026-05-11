"use client";

import { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { Plus, Search, Package } from "lucide-react";
import { toast } from "sonner";
import { db, type Product } from "@/lib/db";
import { useCartStore } from "@/store/cart";
import { formatPeso, cn } from "@/lib/utils";

export function ProductGrid() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Lahat");

  const products = useLiveQuery(() => db.products.orderBy("name").toArray(), []);
  const categories = useLiveQuery(() => db.categories.orderBy("name").toArray(), []);
  const addItem = useCartStore((s) => s.addItem);

  const allCategories = ["Lahat", ...(categories?.map((c) => c.name) ?? [])];

  const filtered = (products ?? []).filter((p) => {
    const matchCat = activeCategory === "Lahat" || p.category === activeCategory;
    const matchSearch =
      search === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  function handleAdd(product: Product) {
    if (product.stock <= 0) {
      toast.error(`${product.name} — wala nang stock`);
      return;
    }
    addItem(product);
    toast.success(`Naidagdag: ${product.name}`, { duration: 1000 });
  }

  return (
    <div className="flex flex-col h-full">
      {/* Search */}
      <div className="px-4 pt-3 pb-2 shrink-0">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--fg-muted)]" />
          <input
            type="search"
            placeholder="Hanapin ang produkto…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-11 pl-9 pr-4 rounded-xl border border-[var(--border)] bg-[var(--input-bg)] text-sm text-[var(--fg)] placeholder:text-[var(--fg-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          />
        </div>
      </div>

      {/* Category chips */}
      <div className="flex gap-2 px-4 pb-3 overflow-x-auto shrink-0" style={{ scrollbarWidth: "none" }}>
        {allCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "shrink-0 h-8 px-4 rounded-full text-sm font-semibold transition-colors",
              activeCategory === cat
                ? "bg-[var(--accent)] text-white"
                : "bg-[var(--input-bg)] text-[var(--fg-muted)] hover:bg-[var(--border)]"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid — 2 cols on phone, 3 cols on tablet */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 gap-2 text-[var(--fg-muted)]">
            <Package size={32} strokeWidth={1} />
            <p className="text-sm font-medium">Walang produkto</p>
            {search && (
              <button onClick={() => setSearch("")} className="text-xs text-[var(--accent)] font-semibold">
                I-clear ang search
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} onAdd={handleAdd} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ProductCard({ product, onAdd }: { product: Product; onAdd: (p: Product) => void }) {
  const outOfStock = product.stock <= 0;
  const lowStock = product.stock > 0 && product.stock <= 5;

  return (
    <button
      onClick={() => onAdd(product)}
      disabled={outOfStock}
      className={cn(
        "relative flex flex-col items-start text-left rounded-xl border-2 p-3 transition-all active:scale-[0.97] min-h-[88px]",
        outOfStock
          ? "border-[var(--border)] bg-[var(--input-bg)] opacity-50 cursor-not-allowed"
          : "border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)] hover:shadow-md hover:shadow-amber-100"
      )}
    >
      {outOfStock && (
        <span className="absolute top-2 right-2 text-[9px] font-bold text-red-500 uppercase tracking-wide">Ubos</span>
      )}
      {lowStock && (
        <span className="absolute top-2 right-2 text-[9px] font-bold text-amber-600 uppercase tracking-wide">Mababa</span>
      )}

      <span className="text-[10px] font-semibold text-[var(--fg-muted)] uppercase tracking-wide mb-1">
        {product.category}
      </span>
      <p className="font-semibold text-sm text-[var(--fg)] leading-snug mb-2 line-clamp-2 flex-1">
        {product.name}
      </p>
      <div className="flex items-center justify-between w-full mt-auto">
        <span className="text-base font-bold peso text-[var(--accent-dark)]">
          {formatPeso(product.sellPrice)}
        </span>
        {!outOfStock && (
          <span className="w-7 h-7 rounded-full bg-[var(--accent)] flex items-center justify-center shrink-0">
            <Plus size={14} className="text-white" strokeWidth={3} />
          </span>
        )}
      </div>
      <p className="text-[10px] text-[var(--fg-muted)] mt-1">
        Stock: {product.stock} {product.unit}
      </p>
    </button>
  );
}
