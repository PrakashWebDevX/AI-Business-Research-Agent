import { z } from "zod";

export const employeeSchema = z.object({
  employee_id: z.string().trim().min(1, "Employee ID is required").max(50),
  first_name: z.string().trim().min(1, "First name is required").max(80),
  last_name: z.string().trim().min(1, "Last name is required").max(80),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z
    .string()
    .trim()
    .max(30)
    .regex(/^[+\d\s()-]*$/, "Invalid phone")
    .optional()
    .or(z.literal("")),
  gender: z.string().optional().or(z.literal("")),
  department: z.string().trim().max(80).optional().or(z.literal("")),
  designation: z.string().trim().max(80).optional().or(z.literal("")),
  salary: z.preprocess(
    (v) => (v === "" || v == null ? null : typeof v === "string" ? Number(v) : v),
    z
      .number({ invalid_type_error: "Salary must be a number" })
      .min(0, "Salary must be a positive number")
      .nullable(),
  ),
  joining_date: z.string().optional().or(z.literal("")),
  date_of_birth: z.string().optional().or(z.literal("")),
  address: z.string().max(500).optional().or(z.literal("")),
  city: z.string().max(80).optional().or(z.literal("")),
  state: z.string().max(80).optional().or(z.literal("")),
  country: z.string().max(80).optional().or(z.literal("")),
  zip_code: z.string().max(20).optional().or(z.literal("")),
  status: z.enum(["active", "inactive", "on_leave"]).default("active"),
  profile_image: z.string().optional().or(z.literal("")),
  notes: z.string().max(2000).optional().or(z.literal("")),
});

export type EmployeeFormValues = z.infer<typeof employeeSchema>;

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signupSchema = loginSchema.extend({
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const forgotSchema = z.object({
  email: z.string().email("Invalid email"),
});

export const resetSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
  });
