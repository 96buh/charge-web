"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function login(user: unknown) {
  const supabase = await createClient();

  const data = user as { email: string; password: string };
  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.log(error);
    return { error: "電子郵件地址或密碼錯誤" };
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(user: unknown) {
  const supabase = await createClient();
  const data = user as { email: string; password: string };
  const { data: existingProfile, error: profileError } = await supabase
    .from("profiles")
    .select("email")
    .eq("email", data.email)
    .maybeSingle();

  if (profileError) {
    console.error("查詢 profile 時出錯:", profileError);
    return { error: "系統錯誤，請稍後再試" };
  }
  if (existingProfile) {
    return { error: "信箱已被使用" };
  }

  const { error } = await supabase.auth.signUp(data);
  if (error) {
    console.log(error);
    return { error: error.message };
  }

  return { success: true };
}

export const logout = async () => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  return redirect("/");
};
