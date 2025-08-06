import { z } from "zod";
import { LucideIcon } from "lucide-react";

export const signupSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords do not match.",
    path: ["confirm"],
  });

export type SignupSchema = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(1, { message: "Password can't be empty." }),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export type StatCardProps = {
  title: string;
  value: string;
  icon?: LucideIcon;
};

export type Point = {
  ts: number;
  voltage: number;
  current: number;
  power: number;
};
