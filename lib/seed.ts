import { db } from "./db";

const SEED_CATEGORIES = ["Inumin", "Pagkain", "Pang-araw-araw", "Iba Pa"];

const SEED_PRODUCTS = [
  // Inumin
  { name: "Coke Mismo (250ml)", category: "Inumin", unit: "bote", buyPrice: 13, sellPrice: 20, stock: 24 },
  { name: "Royal (237ml)", category: "Inumin", unit: "bote", buyPrice: 13, sellPrice: 20, stock: 18 },
  { name: "Mineral Water (500ml)", category: "Inumin", unit: "bote", buyPrice: 9, sellPrice: 15, stock: 30 },
  // Pagkain
  { name: "Lucky Me Instant Noodles", category: "Pagkain", unit: "pcs", buyPrice: 10, sellPrice: 16, stock: 48 },
  { name: "SkyFlakes (10pcs)", category: "Pagkain", unit: "pack", buyPrice: 6, sellPrice: 10, stock: 36 },
  { name: "Chips More (original)", category: "Pagkain", unit: "pcs", buyPrice: 18, sellPrice: 25, stock: 20 },
  // Pang-araw-araw
  { name: "Safeguard Bar Soap", category: "Pang-araw-araw", unit: "pcs", buyPrice: 20, sellPrice: 28, stock: 15 },
  { name: "Colgate Twin Pack", category: "Pang-araw-araw", unit: "pack", buyPrice: 18, sellPrice: 25, stock: 12 },
  { name: "Ariel Sachet", category: "Pang-araw-araw", unit: "sachet", buyPrice: 5, sellPrice: 8, stock: 3 },
  // Iba Pa
  { name: "Marlboro Red (tingi)", category: "Iba Pa", unit: "pcs", buyPrice: 5, sellPrice: 8, stock: 50 },
  { name: "Disposable Lighter", category: "Iba Pa", unit: "pcs", buyPrice: 10, sellPrice: 15, stock: 8 },
  { name: "Mixed Candy (10pcs)", category: "Iba Pa", unit: "pack", buyPrice: 5, sellPrice: 10, stock: 4 },
];

export async function seedIfEmpty() {
  const count = await db.products.count();
  if (count > 0) return;

  await db.transaction("rw", db.categories, db.products, async () => {
    for (const cat of SEED_CATEGORIES) {
      await db.categories.add({ name: cat });
    }
    const now = Date.now();
    for (const p of SEED_PRODUCTS) {
      await db.products.add({ ...p, createdAt: now });
    }
  });
}
