import Dexie, { type Table } from "dexie";

export interface Product {
  id?: number;
  name: string;
  category: string;
  unit: string;
  buyPrice: number;
  sellPrice: number;
  stock: number;
  createdAt: number;
}

export interface Category {
  id?: number;
  name: string;
}

export interface TransactionItem {
  productId: number;
  productName: string;
  unit: string;
  qty: number;
  sellPrice: number;
  buyPrice: number;
  subtotal: number;
}

export interface Transaction {
  id?: number;
  createdAt: number;
  items: TransactionItem[];
  total: number;
  cash: number;
  change: number;
}

export interface Expense {
  id?: number;
  date: number;
  category: string;
  amount: number;
  notes: string;
}

// ── Serbisyo: GCash cash-in/out + e-load tracking ──
export type ServiceType = "gcash-in" | "gcash-out" | "load";

export const NETWORKS = ["Globe", "Smart", "TNT", "TM", "DITO", "Sun"] as const;
export type Network = (typeof NETWORKS)[number];

export interface ServiceTxn {
  id?: number;
  type: ServiceType;
  amount: number;        // principal (GCash sent/received, or load denomination)
  fee: number;           // service fee / load margin charged to customer
  network?: Network;     // load only
  mobileNumber?: string; // optional — customer phone
  reference?: string;    // GCash ref # (optional)
  notes?: string;
  createdAt: number;
}

class TindaDB extends Dexie {
  products!: Table<Product, number>;
  categories!: Table<Category, number>;
  transactions!: Table<Transaction, number>;
  expenses!: Table<Expense, number>;
  services!: Table<ServiceTxn, number>;

  constructor() {
    super("tinda-pos-db");
    this.version(1).stores({
      products: "++id, name, category, createdAt",
      categories: "++id, name",
      transactions: "++id, createdAt",
      expenses: "++id, date, category",
    });
    // v2 — add Serbisyo (GCash + Load) tracking
    this.version(2).stores({
      products: "++id, name, category, createdAt",
      categories: "++id, name",
      transactions: "++id, createdAt",
      expenses: "++id, date, category",
      services: "++id, type, createdAt",
    });
  }
}

export const db = new TindaDB();
