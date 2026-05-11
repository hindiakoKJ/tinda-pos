import { AppShell } from "@/components/shell/AppShell";
import { TransactionList } from "@/components/benta/TransactionList";

export default function BentaPage() {
  return (
    <AppShell title="Kasaysayan ng Benta">
      <div className="h-full">
        <TransactionList />
      </div>
    </AppShell>
  );
}
