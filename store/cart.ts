import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/lib/db";

export interface CartLine {
  productId: number;
  productName: string;
  unit: string;
  qty: number;
  sellPrice: number;
  buyPrice: number;
}

interface CartState {
  lines: CartLine[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQty: (productId: number, qty: number) => void;
  clearCart: () => void;
  total: () => number;
  totalCost: () => number;
  itemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],

      addItem: (product: Product) => {
        const existing = get().lines.find((l) => l.productId === product.id!);
        if (existing) {
          set((s) => ({
            lines: s.lines.map((l) =>
              l.productId === product.id! ? { ...l, qty: l.qty + 1 } : l
            ),
          }));
        } else {
          set((s) => ({
            lines: [
              ...s.lines,
              {
                productId: product.id!,
                productName: product.name,
                unit: product.unit,
                qty: 1,
                sellPrice: product.sellPrice,
                buyPrice: product.buyPrice,
              },
            ],
          }));
        }
      },

      removeItem: (productId: number) =>
        set((s) => ({ lines: s.lines.filter((l) => l.productId !== productId) })),

      updateQty: (productId: number, qty: number) => {
        if (qty <= 0) {
          get().removeItem(productId);
          return;
        }
        set((s) => ({
          lines: s.lines.map((l) =>
            l.productId === productId ? { ...l, qty } : l
          ),
        }));
      },

      clearCart: () => set({ lines: [] }),

      total: () =>
        get().lines.reduce((sum, l) => sum + l.sellPrice * l.qty, 0),

      totalCost: () =>
        get().lines.reduce((sum, l) => sum + l.buyPrice * l.qty, 0),

      itemCount: () =>
        get().lines.reduce((sum, l) => sum + l.qty, 0),
    }),
    {
      name: "tinda-cart",
      partialize: (state) => ({ lines: state.lines }),
    }
  )
);
