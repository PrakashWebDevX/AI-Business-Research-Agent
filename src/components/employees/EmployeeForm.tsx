import { useState, useRef } from "react";
import { useForm, type UseFormRegister, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Loader2, Upload, User } from "lucide-react";
import { toast } from "sonner";
import { employeeSchema, type EmployeeFormValues } from "@/schemas/employee";
import { storageService } from "@/services/storageService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Employee, EmployeeInput } from "@/types/employee";

export interface EmployeeFormProps {
  initial?: Partial<Employee>;
  submitLabel: string;
  onSubmit: (input: EmployeeInput) => Promise<void>;
  onDeleteOldImage?: (url: string | null) => Promise<void>;
}

export function EmployeeForm({ initial, submitLabel, onSubmit, onDeleteOldImage }: EmployeeFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(initial?.profile_image ?? null);
  const fileRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      employee_id: initial?.employee_id ?? "",
      first_name: initial?.first_name ?? "",
      last_name: initial?.last_name ?? "",
      email: initial?.email ?? "",
      phone: initial?.phone ?? "",
      gender: initial?.gender ?? "",
      department: initial?.department ?? "",
      designation: initial?.designation ?? "",
      salary: initial?.salary ?? null,
      joining_date: initial?.joining_date ?? "",
      date_of_birth: initial?.date_of_birth ?? "",
      address: initial?.address ?? "",
      city: initial?.city ?? "",
      state: initial?.state ?? "",
      country: initial?.country ?? "",
      zip_code: initial?.zip_code ?? "",
      status: initial?.status ?? "active",
      profile_image: initial?.profile_image ?? "",
      notes: initial?.notes ?? "",
    },
  });

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const oldUrl = imageUrl;
      const url = await storageService.uploadProfileImage(file, watch("employee_id") || "new");
      setImageUrl(url);
      setValue("profile_image", url);
      if (oldUrl && onDeleteOldImage) await onDeleteOldImage(oldUrl);
      toast.success("Photo uploaded");
    } catch (e) {
      toast.error("Upload failed", { description: (e as Error).message });
    } finally {
      setUploading(false);
    }
  };

  const submit = handleSubmit(async (v) => {
    setSubmitting(true);
    try {
      const input: EmployeeInput = {
        employee_id: v.employee_id,
        first_name: v.first_name,
        last_name: v.last_name,
        email: v.email,
        phone: v.phone || null,
        gender: v.gender || null,
        department: v.department || null,
        designation: v.designation || null,
        salary: v.salary ?? null,
        joining_date: v.joining_date || null,
        date_of_birth: v.date_of_birth || null,
        address: v.address || null,
        city: v.city || null,
        state: v.state || null,
        country: v.country || null,
        zip_code: v.zip_code || null,
        status: v.status,
        profile_image: v.profile_image || imageUrl || null,
        notes: v.notes || null,
      };
      await onSubmit(input);
    } finally {
      setSubmitting(false);
    }
  });

  return (
    <motion.form
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={submit}
      className="space-y-6"
    >
      <div className="glass rounded-2xl p-6">
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <div className="grid h-24 w-24 shrink-0 place-items-center overflow-hidden rounded-2xl bg-muted">
            {imageUrl ? (
              <img src={imageUrl} alt="" className="h-full w-full object-cover" />
            ) : (
              <User className="h-8 w-8 text-muted-foreground" />
            )}
          </div>
          <div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleUpload(f);
                e.target.value = "";
              }}
            />
            <Button type="button" variant="outline" onClick={() => fileRef.current?.click()} disabled={uploading}>
              {uploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
              Upload photo
            </Button>
            <p className="mt-2 text-xs text-muted-foreground">JPG or PNG · up to 5MB</p>
          </div>
        </div>
      </div>

      <Section title="Personal information">
        <Grid>
          <Field label="Employee ID *" error={errors.employee_id?.message}>
            <Input {...register("employee_id")} />
          </Field>
          <Field label="First name *" error={errors.first_name?.message}>
            <Input {...register("first_name")} />
          </Field>
          <Field label="Last name *" error={errors.last_name?.message}>
            <Input {...register("last_name")} />
          </Field>
          <Field label="Email *" error={errors.email?.message}>
            <Input type="email" {...register("email")} />
          </Field>
          <Field label="Phone" error={errors.phone?.message}>
            <Input {...register("phone")} />
          </Field>
          <Field label="Gender">
            <Select value={watch("gender") || ""} onValueChange={(v) => setValue("gender", v)}>
              <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Date of birth">
            <Input type="date" {...register("date_of_birth")} />
          </Field>
        </Grid>
      </Section>

      <Section title="Employment">
        <Grid>
          <Field label="Department">
            <Input {...register("department")} placeholder="e.g. Engineering" />
          </Field>
          <Field label="Designation">
            <Input {...register("designation")} placeholder="e.g. Senior Developer" />
          </Field>
          <Field label="Salary" error={errors.salary?.message as string | undefined}>
            <Input type="number" step="0.01" {...register("salary")} />
          </Field>
          <Field label="Joining date">
            <Input type="date" {...register("joining_date")} />
          </Field>
          <Field label="Status">
            <Select value={watch("status")} onValueChange={(v) => setValue("status", v as "active" | "inactive" | "on_leave")}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="on_leave">On leave</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </Grid>
      </Section>

      <Section title="Address">
        <Grid>
          <Field label="Address" className="sm:col-span-2">
            <Input {...register("address")} />
          </Field>
          <Field label="City"><Input {...register("city")} /></Field>
          <Field label="State"><Input {...register("state")} /></Field>
          <Field label="Country"><Input {...register("country")} /></Field>
          <Field label="ZIP / Postal"><Input {...register("zip_code")} /></Field>
        </Grid>
      </Section>

      <Section title="Notes">
        <Textarea rows={4} {...register("notes")} placeholder="Additional notes about this employee…" />
      </Section>

      <div className="sticky bottom-0 flex justify-end gap-2 rounded-2xl border border-border bg-card/70 p-3 backdrop-blur">
        <Button type="submit" disabled={submitting}>
          {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {submitLabel}
        </Button>
      </div>
    </motion.form>
  );
}

void ({} as UseFormRegister<EmployeeFormValues>);
void ({} as FieldErrors<EmployeeFormValues>);

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">{title}</h3>
      {children}
    </div>
  );
}
function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">{children}</div>;
}
function Field({ label, error, className, children }: { label: string; error?: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={`space-y-1 ${className ?? ""}`}>
      <Label>{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
