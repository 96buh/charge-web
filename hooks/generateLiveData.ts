"use client";
import { useEffect, useRef, useState } from "react";

const WINDOW_SIZE = 30;
const INTERVAL_MS = 1_000;

export function generateLiveData() {
  const [data, setData] = useState(
    Array.from({ length: WINDOW_SIZE }, (_, i) => ({
      sec: i, // 0 – 29
      voltage: 150 + Math.round(Math.random() * 100),
    })),
  );

  const tickRef = useRef(WINDOW_SIZE);

  useEffect(() => {
    const id = setInterval(() => {
      setData((prev) => {
        const nextVal =
          prev[prev.length - 1].voltage +
          (Math.random() < 0.5 ? -1 : 1) * Math.round(Math.random() * 20);

        /* 先丟掉最舊一筆，再重新編號 0‥28，最後補上新的 sec: 29 */
        const shifted = prev.slice(1).map((d, i) => ({ ...d, sec: i }));
        shifted.push({ sec: WINDOW_SIZE - 1, voltage: Math.max(0, nextVal) });
        tickRef.current++;
        return shifted;
      });
    }, INTERVAL_MS);

    return () => clearInterval(id);
  }, []);

  return data;
}
