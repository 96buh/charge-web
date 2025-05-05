import { MyBarChart } from "@/components/myBarChart";
import { MyLineChart } from "@/components/myLineChart";
import StatCard from "@/components/statCard";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations();
  // 充電狀態有: charging, full, not_charging
  const status = "not_charging";
  const battery = "50%";
  const chargingTime = "15m";
  const temperature = "40°C";
  return (
    <div className="grid gap-4 p-4 lg:px-10">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title={t("StatsPage.statusTitle")}
          value={t(`StatsPage.statusValue.${status}`)}
        />
        <StatCard title={t("StatsPage.battery")} value={battery} />
        <StatCard title={t("StatsPage.chargingTime")} value={chargingTime} />
        <StatCard title={t("StatsPage.temperature")} value={temperature} />
      </div>
      <div className="grid gap-3 lg:grid-cols-3">
        <MyLineChart />
      </div>
      <div className="grid grid-cols-2 gap-3 ">
        <MyBarChart />
        <StatCard title={t("StatsPage.temperature")} value={temperature} />
      </div>
    </div>
  );
}
