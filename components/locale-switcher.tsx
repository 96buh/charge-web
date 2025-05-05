"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Button } from "./ui/button";

const languageNames: Record<string, string> = {
  en: "English",
  "zh-TW": "繁體中文",
};

export function LocalSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleSelect = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };
  return (
    <DropdownMenu
      onOpenChange={() => {
        console.log("HELLL");
      }}
    >
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">{languageNames[locale] || locale}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {routing.locales.map((cur) => (
          <DropdownMenuItem key={cur} onClick={() => handleSelect(cur)}>
            {languageNames[cur] || cur}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
