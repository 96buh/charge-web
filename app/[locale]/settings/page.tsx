import { LocalSwitcher } from "@/components/locale-switcher";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("SettingsPage");
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 mx-8">
      <div className="grid grid-cols-2 grid-rows-2 ">
        <div className="font-bold text-xl ">{t("appearanceTitle")}</div>
        <div className="row-span-2 flex items-center justify-end">
          <ModeToggle />
        </div>
        <div className="text-sm text-gray-400">{t("appearanceDesc")}</div>
      </div>
      <Separator />
      <div className="grid grid-cols-2 grid-rows-2 ">
        <div className="font-bold text-xl ">{t("langTitle")}</div>
        <div className="row-span-2 flex items-center justify-end">
          <LocalSwitcher />
        </div>
        <div className="text-sm text-gray-400">{t("langDesc")}</div>
      </div>
    </div>
  );
}
