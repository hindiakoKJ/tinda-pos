"use client";

import { useEffect } from "react";
import { Toaster } from "sonner";
import { SplashScreen } from "@/components/SplashScreen";
import { RouteLoader } from "@/components/RouteLoader";

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
      <SplashScreen />
      <RouteLoader />
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
