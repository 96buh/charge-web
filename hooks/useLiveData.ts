"use client";
import { useEffect, useRef, useState } from "react";

export interface Sample {
  ts: number;
  voltage: number;
  current: number;
  power: number;
  temperature: number;
  device_id: string;
}

export function useLiveData() {
  const [sample, setSample] = useState<Sample | null>(null);
  const [online, setOnline] = useState<boolean>(false);
  const esRef = useRef<EventSource | null>(null);

  useEffect(() => {
    if (esRef.current) return;

    const es = new EventSource(process.env.NEXT_PUBLIC_SSE_URL!);
    esRef.current = es;
    es.onopen = () => setOnline(true);
    es.onmessage = (ev) => {
      try {
        setSample(JSON.parse(ev.data));
      } catch {
        console.warn("Bad SSE frame");
      }
    };

    es.onerror = () => {
      /* 短暫網路波動時 EventSource 會自動重連—這裡只標示離線狀態 */
      setOnline(false);
      setSample(null);
    };

    // return () => es.close();
    return () => {
      if (esRef.current) {
        esRef.current.close();
        esRef.current = null;
        setOnline(false); // 斷線即離線
        setSample(null); // 清掉舊資料（可選）
      }
    };
  }, []);

  return { sample, online };
}
