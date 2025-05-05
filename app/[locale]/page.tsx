import { getTranslations } from "next-intl/server";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const t = await getTranslations("HomePage");

  return (
    <div className="flex bg-purple-300 p-4 justify-center">
      <div className="font-bold text-7xl">{t("title")}</div>
      {user ? <div>登入了</div> : <div>沒有登入</div>}
    </div>
  );
}
