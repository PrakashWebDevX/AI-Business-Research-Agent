import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "At least 6 characters"),
});

export const signupSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "At least 8 characters"),
});

export const forgotSchema = z.object({
  email: z.string().email("Enter a valid email"),
});

export const resetSchema = z
  .object({
    password: z.string().min(8, "At least 8 characters"),
    confirm: z.string().min(8, "At least 8 characters"),
  })
  .refine((v) => v.password === v.confirm, { message: "Passwords do not match", path: ["confirm"] });
