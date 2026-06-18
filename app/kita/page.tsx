import { AppShell } from "@/components/shell/AppShell";
import { ProfitTable } from "@/components/kita/ProfitTable";
import { BUOD_TABS } from "@/lib/tabs";

export default function KitaPage() {
  return (
    <AppShell title="Buod · Kita" tabs={BUOD_TABS}>
      <div className="h-full">
        <ProfitTable />
      </div>
    </AppShell>
  );
}
