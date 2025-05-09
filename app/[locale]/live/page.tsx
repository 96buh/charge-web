"use client";
import { useState, useEffect } from "react";
import { Clock7, Thermometer } from "lucide-react";
import { useTranslations } from "next-intl";
import { MyLineChart } from "@/components/myLineChart";
import StatCard from "@/components/statCard";
import { useLiveData } from "@/hooks/useLiveData";
import { type Point } from "@/lib/types";

export default function Page() {
  const t = useTranslations();
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
      if (prev.length && prev.at(-1)!.ts === sample.ts) return prev; // ← 去重
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
    if (!online) setSeries([]); // 失聯就把資料點清空
  }, [online]);

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
      </div>
    </div>
  );
}
