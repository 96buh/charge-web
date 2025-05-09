import { MyBarChart } from "@/components/myBarChart";
import { MyLineChart } from "@/components/myLineChart";
import StatCard from "@/components/statCard";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations();
  return <div className="grid gap-4 p-4 lg:px-10"></div>;
}
