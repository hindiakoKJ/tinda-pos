import { AppShell } from "@/components/shell/AppShell";
import { ProductList } from "@/components/paninda/ProductList";

export default function PanindaPage() {
  return (
    <AppShell title="Paninda">
      <div className="h-full">
        <ProductList />
      </div>
    </AppShell>
  );
}
