"use client";

import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
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
