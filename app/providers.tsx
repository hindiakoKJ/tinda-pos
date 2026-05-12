"use client";

import { useEffect } from "react";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => console.log("SW registered:", reg.scope))
        .catch((err) => console.error("SW registration failed:", err));
    }
  }, []);

  return (
    <>
      {children}
      <Toaster
        richColors
        position="top-center"
        toastOptions={{
          style: { fontFamily: "var(--font-inter, sans-serif)" },
        }}
      />
    </>
  );
}
