import { MyBarChart } from "@/components/myBarChart";
import { useTranslations } from "next-intl";
import { Clock7, Thermometer } from "lucide-react";

export default function Page() {
  const t = useTranslations();
  return (
    <div className="grid gap-4 p-4 lg:px-10">
      <MyBarChart />
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
          value={temperature}
          icon={Thermometer}
        />
      </div>
      <div className="grid gap-3 lg:grid-cols-3">{/*<MyLineChart />*/}</div>
      {/*左右圖表*/}
      <div className="grid grid-cols-2 gap-3 ">
        <MyBarChart />
        <StatCard title={t("StatsPage.temperature")} value={"還沒決定"} />
      </div>
    </div>
  );
}
