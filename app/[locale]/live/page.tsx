"use client";
import { useState, useEffect } from "react";
import { Clock7, Thermometer } from "lucide-react";
import { useTranslations } from "next-intl";

import { MyBarChart } from "@/components/myBarChart";
import { MyLineChart } from "@/components/myLineChart";
import StatCard from "@/components/statCard";
import { useLiveData } from "@/hooks/useLiveData";
import { type Point } from "@/lib/types";

interface SequenceItem {
  current: number;
  voltage: number;
  power: number;
  temp_C: number;
}

export default function Page() {
  const t = useTranslations();

  const [sequence, setSequence] = useState<SequenceItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let timerId: NodeJS.Timer;

    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8080/get_result");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        setSequence(json.sequence);
      } catch (err: any) {
        console.error(err);
        setSequence([]);
        setError(err.message);
      }
    };

    // 然後每秒更新
    fetchData();
    timerId = setInterval(fetchData, 1000);

    return () => clearInterval(timerId);
  }, []);

  // 充電狀態有: charging, full, not_charging
  const status = "not_charging";
  const battery = "50%";
  const chargingTime = "15m";

  const { sample, online } = useLiveData();
  const tempStr = sample ? `${sample.temperature.toFixed(1)} °C` : "--";
  const [series, setSeries] = useState<Point[]>([]);
  useEffect(() => {
    if (!sample) return;

    setSeries((prev) => {
      if (prev.length && prev.at(-1)!.ts === sample.ts) return prev;
      const next = [
        ...prev,
        {
          ts: sample.ts,
          voltage: sample.voltage,
          current: sample.current,
          power: sample.power,
        },
      ];
      const cutoff = sample.ts - 30_000; // 30 秒 (= 30 000 ms)
      return next.filter((p) => p.ts >= cutoff);
    });
  }, [sample]);
  useEffect(() => {
    if (!online) setSeries([]);
  }, [online]);
  // 溫度
  const latestTemp =
    sequence.length > 0
      ? Math.round(sequence[sequence.length - 1].temp_C * 10) / 10
      : null;

  return (
    <div className="grid gap-4 p-4 lg:px-10">
      {online ? (
        sample ? (
          <pre className="bg-gray-800 text-white p-4 rounded">
            {JSON.stringify(sample, null, 2)}
          </pre>
        ) : (
          <p>Waiting for data…</p>
        )
      ) : (
        <p className="text-red-600">Gateway offline</p>
      )}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title={t("StatsPage.statusTitle")}
          value={t(`StatsPage.statusValue.${status}`)}
        />
        <StatCard title={t("StatsPage.battery")} value={battery} />
        <StatCard
          title={t("StatsPage.chargingTime")}
          value={chargingTime}
          icon={Clock7}
        />
        <StatCard
          title={t("StatsPage.temperature")}
          value={tempStr}
          value={latestTemp != null ? `${latestTemp}°C` : "--"}
          icon={Thermometer}
        />
      </div>
      <div className="grid gap-3 lg:grid-cols-3">
        <MyLineChart
          series={series}
          yKey="voltage"
          label={t("StatsPage.voltage") + " (V)"}
        />
        <MyLineChart
          series={series}
          yKey="current"
          label={t("StatsPage.current") + " (A)"}
        />
        <MyLineChart
          series={series}
          yKey="power"
          label={t("StatsPage.power") + " (W)"}
        />
        <MyLineChart sequence={sequence} field="voltage" />
        <MyLineChart sequence={sequence} field="current" />
        <MyLineChart sequence={sequence} field="power" />
      </div>
    </div>
  );
}
