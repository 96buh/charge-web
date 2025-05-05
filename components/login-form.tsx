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
import { PasswordInput } from "@/components/ui/password-input";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { LoginSchema, loginSchema } from "@/lib/types";
import { login } from "@/app/[locale]/(auth-pages)/action";

export function LoginForm() {
  const t = useTranslations();
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: LoginSchema) {
    const result = await login(values);
    if (result.error) {
      form.setError("password", { message: result.error });
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
                  <Input {...field} />
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
                  <PasswordInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            {t("Btns.loginBtn")}
          </Button>
        </form>
      </Form>
      <div className="mt-4 text-center">
        {t("Auth.dontHaveAcc")}{" "}
        <Link href="/signup" className="underline underline-offset-4">
          {t("Btns.signupBtn")}
        </Link>
      </div>
    </div>
  );
}
