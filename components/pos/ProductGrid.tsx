"use client";

import { useState, useRef } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { Plus, Search, Package } from "lucide-react";
import { toast } from "sonner";
import { db, type Product } from "@/lib/db";
import { useCartStore } from "@/store/cart";
import { formatPeso, cn } from "@/lib/utils";

// Session-scoped recent taps (persist across re-renders, reset on page reload)
let _recent: Product[] = [];

export function ProductGrid() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Lahat");
  const [recent, setRecent] = useState<Product[]>([]);
  const searchRef = useRef<HTMLInputElement>(null);

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
    // Track recent
    _recent = [product, ..._recent.filter((r) => r.id !== product.id)].slice(0, 8);
    setRecent([..._recent]);
    toast.success(`Naidagdag: ${product.name}`, { duration: 800 });
  }

  return (
    <div className="flex flex-col h-full bg-[var(--bg)]">

      {/* ── Hero scan / search bar ── */}
      <div className="px-4 pt-4 pb-3 shrink-0 bg-[var(--bg)]">
        <div
          className="flex items-center gap-3 h-14 px-4 rounded-2xl border-2 border-[var(--accent)] bg-white cursor-text"
          style={{ boxShadow: "0 0 0 4px rgba(245,158,11,0.10)" }}
          onClick={() => searchRef.current?.focus()}
        >
          <Search size={20} className="text-[var(--accent)] shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="text-[10px] font-bold text-[var(--fg-muted)] uppercase tracking-widest leading-none mb-0.5">
              Hanapin ang produkto
            </div>
            <input
              ref={searchRef}
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Pangalan o kategorya…"
              className="w-full bg-transparent text-sm font-semibold text-[var(--fg)] placeholder:text-[var(--fg-muted)] placeholder:font-normal focus:outline-none"
            />
          </div>
          {search && (
            <button
              onClick={(e) => { e.stopPropagation(); setSearch(""); }}
              className="shrink-0 text-xs font-bold text-[var(--fg-muted)] bg-[var(--input-bg)] rounded-lg px-2.5 py-1"
            >
              I-clear
            </button>
          )}
        </div>
      </div>

      {/* ── Recent strip ── */}
      {recent.length > 0 && (
        <div className="shrink-0 px-4 pb-3">
          <div className="text-[10px] font-bold text-[var(--fg-muted)] uppercase tracking-widest mb-2">
            Kamakailan
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {recent.map((p) => (
              <button
                key={p.id}
                onClick={() => handleAdd(p)}
                className="shrink-0 flex flex-col items-start bg-white border border-[var(--border)] rounded-xl px-3 py-2.5 w-32 active:scale-[0.96] transition-transform text-left"
              >
                <span className="text-[9px] font-semibold text-[var(--fg-muted)] uppercase tracking-wide mb-1 truncate w-full">
                  {p.category}
                </span>
                <span className="text-xs font-semibold text-[var(--fg)] line-clamp-2 leading-tight mb-2 min-h-[2.4em]">
                  {p.name}
                </span>
                <span className="text-sm font-bold text-[var(--accent-dark)] peso">
                  {formatPeso(p.sellPrice)}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Category chips ── */}
      <div className="flex gap-2 px-4 pb-2 overflow-x-auto shrink-0">
        {allCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "shrink-0 h-8 px-4 rounded-full text-xs font-bold transition-colors",
              activeCategory === cat
                ? "bg-[var(--accent)] text-white"
                : "bg-[var(--input-bg)] text-[var(--fg-muted)]"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── Table header (tablet only) ── */}
      <div className="hidden md:grid shrink-0 px-4 py-2 border-b border-[var(--border)] bg-[var(--input-bg)]"
        style={{ gridTemplateColumns: "1fr 80px 100px 48px" }}>
        <span className="text-[10px] font-bold text-[var(--fg-muted)] uppercase tracking-widest">Produkto</span>
        <span className="text-[10px] font-bold text-[var(--fg-muted)] uppercase tracking-widest text-right">Stock</span>
        <span className="text-[10px] font-bold text-[var(--fg-muted)] uppercase tracking-widest text-right">Presyo</span>
        <span />
      </div>

      {/* ── Product list ── */}
      <div className="flex-1 overflow-y-auto pb-24 md:pb-4 bg-white">
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
          <div className="divide-y divide-[var(--border)]">
            {filtered.map((product) => (
              <ProductRow key={product.id} product={product} onAdd={handleAdd} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ProductRow({ product, onAdd }: { product: Product; onAdd: (p: Product) => void }) {
  const outOfStock = product.stock <= 0;
  const lowStock = product.stock > 0 && product.stock <= 5;

  return (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-3 bg-white transition-colors active:bg-[var(--input-bg)]",
        outOfStock && "opacity-40"
      )}
    >
      {/* Name + meta */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
          <span className="text-[10px] text-[var(--fg-muted)] font-medium">{product.category}</span>
          {lowStock && (
            <span className="text-[9px] font-bold text-amber-700 bg-amber-50 border border-amber-200 rounded px-1.5 py-px uppercase tracking-wide">
              Mababa · {product.stock}
            </span>
          )}
          {outOfStock && (
            <span className="text-[9px] font-bold text-red-600 bg-red-50 border border-red-200 rounded px-1.5 py-px uppercase tracking-wide">
              Ubos
            </span>
          )}
        </div>
        <p className="text-sm font-semibold text-[var(--fg)] leading-snug">{product.name}</p>
        {/* Stock — mobile only */}
        <p className="text-[10px] text-[var(--fg-muted)] mt-0.5 md:hidden">
          {product.stock} {product.unit} natitira
        </p>
      </div>

      {/* Stock — tablet only */}
      <span className="hidden md:block w-20 text-right text-xs text-[var(--fg-muted)] font-medium shrink-0">
        {product.stock} {product.unit}
      </span>

      {/* Price */}
      <span className="w-24 text-right text-sm font-bold text-[var(--accent-dark)] peso shrink-0">
        {formatPeso(product.sellPrice)}
      </span>

      {/* Add button */}
      <button
        onClick={() => onAdd(product)}
        disabled={outOfStock}
        className={cn(
          "shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all active:scale-90",
          outOfStock
            ? "bg-[var(--input-bg)] text-[var(--fg-muted)] cursor-not-allowed"
            : "bg-[var(--accent)] text-white shadow-sm"
        )}
        style={!outOfStock ? { boxShadow: "0 2px 8px rgba(245,158,11,0.30)" } : {}}
      >
        <Plus size={18} strokeWidth={2.5} />
      </button>
    </div>
  );
}
