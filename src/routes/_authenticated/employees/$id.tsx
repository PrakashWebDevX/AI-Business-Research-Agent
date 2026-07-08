import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { ArrowLeft, Edit, Trash2, Mail, Phone, MapPin, Building2, DollarSign, Calendar, User, Loader2 } from "lucide-react";
import { employeeService } from "@/services/employeeService";
import { storageService } from "@/services/storageService";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const Route = createFileRoute("/_authenticated/employees/$id")({
  head: () => ({ meta: [{ title: "Employee · EMS" }] }),
  component: EmployeeDetail,
});

function EmployeeDetail() {
  const { id } = Route.useParams();
  const qc = useQueryClient();
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["employees", id],
    queryFn: () => employeeService.get(id),
  });

  const delMut = useMutation({
    mutationFn: async () => {
      if (data?.profile_image) await storageService.deleteByPublicUrl(data.profile_image);
      await employeeService.remove(id);
    },
    onSuccess: () => {
      toast.success("Employee deleted");
      qc.invalidateQueries({ queryKey: ["employees"] });
      navigate({ to: "/employees" });
    },
    onError: (e) => toast.error("Delete failed", { description: (e as Error).message }),
  });

  if (isLoading) {
    return (
      <div className="grid min-h-[60vh] place-items-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }
  if (error || !data) {
    return (
      <div className="mx-auto max-w-lg p-8 text-center">
        <p className="text-sm text-muted-foreground">{(error as Error)?.message ?? "Not found"}</p>
        <Button asChild className="mt-4"><Link to="/employees">Back</Link></Button>
      </div>
    );
  }

  const fullName = `${data.first_name} ${data.last_name}`;
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 md:px-8">
      <div className="mb-4 flex items-center justify-between">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/employees"><ArrowLeft className="mr-1 h-4 w-4" /> Back</Link>
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link to="/employees/$id/edit" params={{ id }}><Edit className="mr-1 h-4 w-4" /> Edit</Link>
          </Button>
          <Button variant="destructive" onClick={() => setConfirmOpen(true)}>
            <Trash2 className="mr-1 h-4 w-4" /> Delete
          </Button>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-6">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <div className="grid h-24 w-24 shrink-0 place-items-center overflow-hidden rounded-2xl bg-muted">
            {data.profile_image ? (
              <img src={data.profile_image} alt={fullName} className="h-full w-full object-cover" />
            ) : (
              <User className="h-10 w-10 text-muted-foreground" />
            )}
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">{fullName}</h1>
            <p className="text-sm text-muted-foreground">{data.designation || "—"} · {data.department || "—"}</p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <Badge className="border-none bg-primary/15 text-primary">{data.employee_id}</Badge>
              <StatusBadge status={data.status} />
            </div>
          </div>
        </div>
      </motion.div>

      <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-2">
        <Card title="Contact">
          <Row icon={Mail} label="Email" value={data.email} />
          <Row icon={Phone} label="Phone" value={data.phone || "—"} />
          <Row icon={MapPin} label="Address" value={
            [data.address, data.city, data.state, data.country, data.zip_code].filter(Boolean).join(", ") || "—"
          } />
        </Card>
        <Card title="Employment">
          <Row icon={Building2} label="Department" value={data.department || "—"} />
          <Row icon={User} label="Designation" value={data.designation || "—"} />
          <Row icon={DollarSign} label="Salary" value={data.salary != null ? `$${data.salary.toLocaleString()}` : "—"} />
          <Row icon={Calendar} label="Joining date" value={data.joining_date || "—"} />
          <Row icon={Calendar} label="Date of birth" value={data.date_of_birth || "—"} />
        </Card>
        {data.notes && (
          <Card title="Notes" className="lg:col-span-2">
            <p className="whitespace-pre-wrap text-sm text-muted-foreground">{data.notes}</p>
          </Card>
        )}
      </div>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {fullName}?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => delMut.mutate()}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function StatusBadge({ status }: { status: "active" | "inactive" | "on_leave" }) {
  const cls = {
    active: "bg-success/15 text-success",
    inactive: "bg-destructive/15 text-destructive",
    on_leave: "bg-warning/15 text-warning",
  }[status];
  const label = { active: "Active", inactive: "Inactive", on_leave: "On leave" }[status];
  return <Badge className={`${cls} border-none`}>{label}</Badge>;
}

function Card({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`glass rounded-2xl p-6 ${className ?? ""}`}>
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">{title}</h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Row({ icon: Icon, label, value }: { icon: typeof Mail; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 text-sm">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
      <div className="min-w-0 flex-1">
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="truncate">{value}</div>
      </div>
    </div>
  );
}
