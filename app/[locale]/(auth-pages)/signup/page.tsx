import { SignupForm } from "@/components/signup-form";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations();
  return (
    <div className="flex flex-col justify-center h-80 mt-20 items-center">
      <h1 className="text-3xl mb-8">{t("Auth.signupTitle")}</h1>
      <SignupForm />
    </div>
  );
}
