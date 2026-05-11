import { AppShell } from "@/components/shell/AppShell";
import { ExpenseList } from "@/components/gastos/ExpenseList";

export default function GastosPage() {
  return (
    <AppShell title="Gastos">
      <div className="h-full">
        <ExpenseList />
      </div>
    </AppShell>
  );
}
