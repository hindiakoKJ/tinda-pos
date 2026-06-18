"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Slim 2.5px amber progress bar at the top of the screen.
 * Animates briefly whenever the route changes — gives users feedback
 * that "something is loading" without showing the full splash again.
 */
export function RouteLoader() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<"idle" | "loading" | "done">("idle");

  useEffect(() => {
    // Trigger loading state on every pathname change
    setPhase("loading");
    const doneTimer = setTimeout(() => setPhase("done"), 350);
    const resetTimer = setTimeout(() => setPhase("idle"), 700);
    return () => {
      clearTimeout(doneTimer);
      clearTimeout(resetTimer);
    };
  }, [pathname]);

  return (
    <div
      className={
        "route-loader" +
        (phase === "loading" ? " is-loading" : phase === "done" ? " is-done" : "")
      }
    />
  );
}
