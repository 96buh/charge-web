"use client";
import {
  Home,
  ChartColumnBig,
  Settings,
  RefreshCcw,
  TriangleAlert,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavUser } from "./nav-user";
import { useTranslations, useLocale } from "next-intl";
import { type User } from "@supabase/supabase-js";

const testUser = {
  name: "USER1",
  email: "test@example.com",
  avatar: "/avatars/shadcn.jpg",
};

export function AppSidebar({ user }: { user: User | null }) {
  const locale = useLocale();
  const t = useTranslations("Sidebar");
  const pathname = usePathname();

  const normalizedPathname = pathname.startsWith(`/${locale}`)
    ? pathname.slice(locale.length + 1) || "/"
    : pathname;
  // 定義sidebar顯示的內容
  const items = [
    { title: t("home"), url: "/", icon: Home },
    { title: t("settings"), url: "settings", icon: Settings },
    { title: t("live"), url: "live", icon: RefreshCcw },
    { title: t("stats"), url: "stats", icon: ChartColumnBig },
    { title: t("alerts"), url: "#", icon: TriangleAlert },
  ];
  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive =
                  normalizedPathname === item.url ||
                  normalizedPathname === `/${item.url}`;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
