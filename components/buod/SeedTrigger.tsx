"use client";

import { useEffect } from "react";
import { seedIfEmpty } from "@/lib/seed";

export function SeedTrigger() {
  useEffect(() => {
    seedIfEmpty();
  }, []);
  return null;
}
