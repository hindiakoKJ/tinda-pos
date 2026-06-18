"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { AppShell } from "@/components/shell/AppShell";
import { ServiceList } from "@/components/serbisyo/ServiceList";
import { ServiceForm } from "@/components/serbisyo/ServiceForm";
import { BENTA_TABS } from "@/lib/tabs";

export default function SerbisyoPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <AppShell title="Benta · Serbisyo" tabs={BENTA_TABS}>
      <div className="relative h-full">
        <ServiceList />

        {/* Floating add button */}
        <button
          onClick={() => setShowForm(true)}
          className="absolute bottom-4 right-4 w-14 h-14 rounded-full bg-[var(--accent)] text-white flex items-center justify-center active:scale-95 transition-transform"
          style={{ boxShadow: "0 6px 24px rgba(245,158,11,0.45)" }}
          aria-label="Bagong serbisyo"
        >
          <Plus size={24} strokeWidth={2.5} />
        </button>

        <ServiceForm open={showForm} onClose={() => setShowForm(false)} />
      </div>
    </AppShell>
  );
}
