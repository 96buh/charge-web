// hooks/useAnomalies.ts
"use client";
import { useSyncExternalStore } from "react";
import { anomalyStore, type Anomaly } from "@/lib/anomalyStore";

export function useAnomalies(): Anomaly[] {
  return useSyncExternalStore(
    (callback) => {
      const id = setInterval(callback, 500);
      return () => clearInterval(id);
    },
    () => anomalyStore.rows,
  );
}
