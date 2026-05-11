import { AppShell } from "@/components/shell/AppShell";
import { ProfitTable } from "@/components/kita/ProfitTable";

export default function KitaPage() {
  return (
    <AppShell title="Kita at Margin">
      <div className="h-full">
        <ProfitTable />
      </div>
    </AppShell>
  );
}
