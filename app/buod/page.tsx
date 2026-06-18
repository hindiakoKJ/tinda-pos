import { AppShell } from "@/components/shell/AppShell";
import { SummaryCards } from "@/components/buod/SummaryCards";
import { SeedTrigger } from "@/components/buod/SeedTrigger";
import { BUOD_TABS } from "@/lib/tabs";

export default function BuodPage() {
  return (
    <AppShell title="Buod · Ngayon" tabs={BUOD_TABS}>
      <SeedTrigger />
      <SummaryCards />
    </AppShell>
  );
}
