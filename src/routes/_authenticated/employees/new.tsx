import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { EmployeeForm } from "@/components/employees/EmployeeForm";
import { employeeService } from "@/services/employeeService";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/employees/new")({
  head: () => ({ meta: [{ title: "New employee · EMS" }] }),
  component: NewEmployeePage,
});

function NewEmployeePage() {
  const qc = useQueryClient();
  const navigate = useNavigate();
  const mut = useMutation({
    mutationFn: employeeService.create,
    onSuccess: (e) => {
      toast.success("Employee created");
      qc.invalidateQueries({ queryKey: ["employees"] });
      qc.invalidateQueries({ queryKey: ["departments"] });
      navigate({ to: "/employees/$id", params: { id: e.id } });
    },
    onError: (e) => toast.error("Create failed", { description: (e as Error).message }),
  });

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 md:px-8">
      <Button variant="ghost" size="sm" asChild className="mb-4">
        <Link to="/employees"><ArrowLeft className="mr-1 h-4 w-4" /> Back to employees</Link>
      </Button>
      <h1 className="mb-6 text-2xl font-semibold tracking-tight md:text-3xl">New employee</h1>
      <EmployeeForm submitLabel="Create employee" onSubmit={async (v) => { await mut.mutateAsync(v); }} />
    </div>
  );
}
