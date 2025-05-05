"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "./ui/password-input";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { SignupSchema, signupSchema } from "@/lib/types";
import { signup } from "@/app/[locale]/(auth-pages)/action";

export function SignupForm() {
  const t = useTranslations();
  const form = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirm: "",
    },
  });
  async function onSubmit(values: SignupSchema) {
    const user = {
      email: values.email,
      password: values.password,
    };
    const result = await signup(user);
    if (result.error) {
      form.setError("email", { message: result.error });
    } else {
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("Auth.email")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("Auth.email")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/*Password*/}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("Auth.password")}</FormLabel>
                <FormControl>
                  <PasswordInput placeholder={t("Auth.password")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("Auth.confirmPass")}</FormLabel>
                <FormControl>
                  <PasswordInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/*註冊按鈕*/}
          <Button type="submit" className="w-full">
            {t("Btns.continueBtn")}
          </Button>
        </form>
      </Form>
      <div className="mt-4 text-center">
        {t("Auth.alreadyHaveAcc")}{" "}
        <Link href="/login" className="underline underline-offset-4">
          {t("Btns.loginBtn")}
        </Link>
      </div>
    </div>
  );
}
