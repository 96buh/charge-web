import { MyBarChart } from "@/components/myBarChart";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations();
  return (
    <div className="grid gap-4 p-4 lg:px-10">
      <MyBarChart />
    </div>
  );
}
