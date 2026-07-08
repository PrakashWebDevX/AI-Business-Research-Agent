import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ArrowLeft, Loader2 } from "lucide-react";
import { EmployeeForm } from "@/components/employees/EmployeeForm";
import { employeeService } from "@/services/employeeService";
import { storageService } from "@/services/storageService";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/employees/$id/edit")({
  head: () => ({ meta: [{ title: "Edit employee · EMS" }] }),
  component: EditEmployeePage,
});

function EditEmployeePage() {
  const { id } = Route.useParams();
  const qc = useQueryClient();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["employees", id],
    queryFn: () => employeeService.get(id),
  });

  const mut = useMutation({
    mutationFn: (input: Parameters<typeof employeeService.update>[1]) => employeeService.update(id, input),
    onSuccess: () => {
      toast.success("Employee updated");
      qc.invalidateQueries({ queryKey: ["employees"] });
      qc.invalidateQueries({ queryKey: ["departments"] });
      navigate({ to: "/employees/$id", params: { id } });
    },
    onError: (e) => toast.error("Update failed", { description: (e as Error).message }),
  });

  if (isLoading || !data) {
    return (
      <div className="grid min-h-[60vh] place-items-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 md:px-8">
      <Button variant="ghost" size="sm" asChild className="mb-4">
        <Link to="/employees/$id" params={{ id }}>
          <ArrowLeft className="mr-1 h-4 w-4" /> Back
        </Link>
      </Button>
      <h1 className="mb-6 text-2xl font-semibold tracking-tight md:text-3xl">
        Edit {data.first_name} {data.last_name}
      </h1>
      <EmployeeForm
        initial={data}
        submitLabel="Save changes"
        onSubmit={async (v) => { await mut.mutateAsync(v); }}
        onDeleteOldImage={async (url) => { if (url && url !== data.profile_image) await storageService.deleteByPublicUrl(url); }}
      />
    </div>
  );
}
