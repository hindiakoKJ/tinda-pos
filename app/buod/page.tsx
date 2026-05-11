import { AppShell } from "@/components/shell/AppShell";
import { SummaryCards } from "@/components/buod/SummaryCards";
import { SeedTrigger } from "@/components/buod/SeedTrigger";

export default function BuodPage() {
  return (
    <AppShell title="Buod">
      <SeedTrigger />
      <SummaryCards />
    </AppShell>
  );
}
