import { AppShell } from "@/components/shell/AppShell";
import { TransactionList } from "@/components/benta/TransactionList";
import { BUOD_TABS } from "@/lib/tabs";

export default function BentaPage() {
  return (
    <AppShell title="Buod · Kasaysayan" tabs={BUOD_TABS}>
      <div className="h-full">
        <TransactionList />
      </div>
    </AppShell>
  );
}
