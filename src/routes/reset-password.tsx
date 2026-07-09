import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { resetSchema } from "@/schemas/auth";
import { authService } from "@/services/authService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/reset-password")({
  ssr: false,
  head: () => ({ meta: [{ title: "Reset password · EMS" }] }),
  component: ResetPage,
});

function ResetPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(resetSchema) });

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4">
      <div className="glass w-full max-w-md rounded-2xl p-8">
        <h1 className="text-lg font-semibold">Set a new password</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Choose a strong password to secure your account.
        </p>
        <form
          className="mt-5 space-y-3"
          onSubmit={handleSubmit(async (v) => {
            setLoading(true);
            try {
              await authService.updatePassword(v.password);
              toast.success("Password updated");
              navigate({ to: "/dashboard" });
            } catch (e) {
              toast.error("Update failed", { description: (e as Error).message });
            } finally {
              setLoading(false);
            }
          })}
        >
          <div className="space-y-1">
            <Label>New password</Label>
            <Input {...register("password")} type="password" />
            {errors.password && <p className="text-xs text-destructive">{String(errors.password.message)}</p>}
          </div>
          <div className="space-y-1">
            <Label>Confirm password</Label>
            <Input {...register("confirm")} type="password" />
            {errors.confirm && <p className="text-xs text-destructive">{String(errors.confirm.message)}</p>}
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Update password"}
          </Button>
        </form>
      </div>
    </div>
  );
}
