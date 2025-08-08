"use client";

import { useState, useEffect } from "react";
import { Clock7, Thermometer } from "lucide-react";
import { useTranslations } from "next-intl";

import { MyLineChart } from "@/components/myLineChart";
import StatCard from "@/components/statCard";

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

  // 每秒從 mock server 拉一次 sequence
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8080/get_result");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        setSequence(json.sequence);
        setError(null);
      } catch (err: any) {
        console.error(err);
        setSequence([]);
        setError("伺服器連線失敗，目前無數據");
      }
    };

    fetchData();
    const timer = setInterval(fetchData, 1000);
    return () => clearInterval(timer);
  }, []);

  // 充電狀態示範
  const status = "not_charging";
  const battery = "50%";
  const chargingTime = "15m";

  // 取最新溫度
  const latestTemp =
    sequence.length > 0
      ? `${(Math.round(sequence.at(-1)!.temp_C * 10) / 10).toFixed(1)}°C`
      : "--";

  return (
    <div className="grid gap-4 p-4 lg:px-10">
      {error && (
        <div className="col-span-full p-2 bg-yellow-100 text-yellow-800 rounded">
          {error}
        </div>
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
          value={latestTemp}
          icon={Thermometer}
        />
      </div>

      <div className="grid gap-3 lg:grid-cols-3">
        <MyLineChart
          sequence={sequence}
          field="voltage"
          title={t("StatsPage.voltage") + " (V)"}
        />
        <MyLineChart
          sequence={sequence}
          field="current"
          title={t("StatsPage.current") + " (A)"}
        />
        <MyLineChart
          sequence={sequence}
          field="power"
          title={t("StatsPage.power") + " (W)"}
        />
      </div>
    </div>
  );
}
