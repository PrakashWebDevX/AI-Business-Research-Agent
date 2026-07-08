import { useState, useRef, useMemo } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Trash2,
  Edit,
  Eye,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Loader2,
  FileSpreadsheet,
  FileText,
  Users,
} from "lucide-react";
import { employeeService } from "@/services/employeeService";
import type { Employee, EmployeeListParams } from "@/types/employee";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { exportEmployeesCSV, exportEmployeesXLSX, parseEmployeesCSV } from "@/lib/csv";

export const Route = createFileRoute("/_authenticated/employees/")({
  head: () => ({ meta: [{ title: "Employees · EMS" }] }),
  component: EmployeesPage,
});

const PAGE_SIZE = 10;

function EmployeesPage() {
  const qc = useQueryClient();
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState<string>("");
  const [status, setStatus] = useState<EmployeeListParams["status"]>("all");
  const [sortBy, setSortBy] = useState<keyof Employee>("created_at");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [confirmDelete, setConfirmDelete] = useState<{ ids: string[]; open: boolean }>({ ids: [], open: false });

  const params: EmployeeListParams = { search, department, status, sortBy, sortDir, page, pageSize: PAGE_SIZE };

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["employees", params],
    queryFn: () => employeeService.list(params),
    placeholderData: keepPreviousData,
  });

  const { data: departments = [] } = useQuery({
    queryKey: ["departments"],
    queryFn: () => employeeService.departments(),
  });

  const delMut = useMutation({
    mutationFn: (ids: string[]) => employeeService.bulkRemove(ids),
    onSuccess: (_r, ids) => {
      toast.success(`${ids.length} employee${ids.length > 1 ? "s" : ""} deleted`);
      setSelected(new Set());
      qc.invalidateQueries({ queryKey: ["employees"] });
      qc.invalidateQueries({ queryKey: ["departments"] });
    },
    onError: (e) => toast.error("Delete failed", { description: (e as Error).message }),
  });

  const importMut = useMutation({
    mutationFn: async (file: File) => {
      const rows = await parseEmployeesCSV(file);
      return employeeService.bulkInsert(rows);
    },
    onSuccess: (r) => {
      toast.success(`Imported ${r.inserted} employees`);
      qc.invalidateQueries({ queryKey: ["employees"] });
    },
    onError: (e) => toast.error("Import failed", { description: (e as Error).message }),
  });

  const rows = data?.data ?? [];
  const total = data?.count ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const allSelectedOnPage = rows.length > 0 && rows.every((r) => selected.has(r.id));
  const someSelectedOnPage = rows.some((r) => selected.has(r.id)) && !allSelectedOnPage;

  const toggleAll = () => {
    const next = new Set(selected);
    if (allSelectedOnPage) rows.forEach((r) => next.delete(r.id));
    else rows.forEach((r) => next.add(r.id));
    setSelected(next);
  };
  const toggleOne = (id: string) => {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
  };
  const toggleSort = (col: keyof Employee) => {
    if (sortBy === col) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else {
      setSortBy(col);
      setSortDir("asc");
    }
  };

  const exportRows = useMemo(async () => rows, [rows]);
  void exportRows;

  const handleExport = async (kind: "csv" | "xlsx") => {
    try {
      const all = await employeeService.getAll();
      const target = selected.size > 0 ? all.filter((e) => selected.has(e.id)) : all;
      if (!target.length) return toast.error("Nothing to export");
      if (kind === "csv") exportEmployeesCSV(target);
      else exportEmployeesXLSX(target);
      toast.success(`Exported ${target.length} employees`);
    } catch (e) {
      toast.error("Export failed", { description: (e as Error).message });
    }
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Employees</h1>
          <p className="text-sm text-muted-foreground">
            {total} total · {selected.size} selected
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <input
            ref={fileRef}
            type="file"
            accept=".csv"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) importMut.mutate(f);
              e.target.value = "";
            }}
          />
          <Button variant="outline" onClick={() => fileRef.current?.click()} disabled={importMut.isPending}>
            <Upload className="mr-2 h-4 w-4" />
            {importMut.isPending ? "Importing…" : "Import CSV"}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" /> Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleExport("csv")}>
                <FileText className="mr-2 h-4 w-4" /> CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport("xlsx")}>
                <FileSpreadsheet className="mr-2 h-4 w-4" /> Excel
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button onClick={() => navigate({ to: "/employees/new" })}>
            <Plus className="mr-2 h-4 w-4" /> New employee
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="glass mb-3 flex flex-wrap items-center gap-2 rounded-2xl p-3">
        <div className="relative min-w-[220px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search name, email, employee ID…"
            className="pl-9"
          />
        </div>
        <Select value={department || "__all"} onValueChange={(v) => { setDepartment(v === "__all" ? "" : v); setPage(1); }}>
          <SelectTrigger className="w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="__all">All departments</SelectItem>
            {departments.map((d) => (
              <SelectItem key={d} value={d}>{d}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={status ?? "all"} onValueChange={(v) => { setStatus(v as EmployeeListParams["status"]); setPage(1); }}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="on_leave">On leave</SelectItem>
          </SelectContent>
        </Select>
        {selected.size > 0 && (
          <Button
            variant="destructive"
            onClick={() => setConfirmDelete({ ids: Array.from(selected), open: true })}
          >
            <Trash2 className="mr-2 h-4 w-4" /> Delete {selected.size}
          </Button>
        )}
      </div>

      {/* Table */}
      <div className="glass overflow-hidden rounded-2xl">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-sm">
            <thead className="border-b border-border bg-card/50 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="w-10 px-3 py-3">
                  <Checkbox
                    checked={allSelectedOnPage ? true : someSelectedOnPage ? "indeterminate" : false}
                    onCheckedChange={toggleAll}
                  />
                </th>
                <SortHead label="Employee" col="first_name" sortBy={sortBy} sortDir={sortDir} onClick={toggleSort} />
                <SortHead label="Email" col="email" sortBy={sortBy} sortDir={sortDir} onClick={toggleSort} />
                <SortHead label="Department" col="department" sortBy={sortBy} sortDir={sortDir} onClick={toggleSort} />
                <SortHead label="Designation" col="designation" sortBy={sortBy} sortDir={sortDir} onClick={toggleSort} />
                <SortHead label="Status" col="status" sortBy={sortBy} sortDir={sortDir} onClick={toggleSort} />
                <SortHead label="Joined" col="joining_date" sortBy={sortBy} sortDir={sortDir} onClick={toggleSort} />
                <th className="w-24 px-3 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i} className="border-b border-border">
                    <td colSpan={8} className="px-3 py-4">
                      <div className="shimmer h-5 rounded-md">
                        <div className="shimmer-inner h-full w-full rounded-md" />
                      </div>
                    </td>
                  </tr>
                ))
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={8}>
                    <EmptyState />
                  </td>
                </tr>
              ) : (
                rows.map((e) => (
                  <motion.tr
                    key={e.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b border-border/70 last:border-none hover:bg-accent/30"
                  >
                    <td className="px-3 py-3">
                      <Checkbox checked={selected.has(e.id)} onCheckedChange={() => toggleOne(e.id)} />
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar url={e.profile_image} name={`${e.first_name} ${e.last_name}`} />
                        <div>
                          <div className="font-medium">{e.first_name} {e.last_name}</div>
                          <div className="text-xs text-muted-foreground">{e.employee_id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-muted-foreground">{e.email}</td>
                    <td className="px-3 py-3">{e.department || "—"}</td>
                    <td className="px-3 py-3 text-muted-foreground">{e.designation || "—"}</td>
                    <td className="px-3 py-3"><StatusBadge status={e.status} /></td>
                    <td className="px-3 py-3 text-muted-foreground">{e.joining_date || "—"}</td>
                    <td className="px-3 py-3 text-right">
                      <div className="inline-flex gap-1">
                        <Button size="icon" variant="ghost" asChild>
                          <Link to="/employees/$id" params={{ id: e.id }}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button size="icon" variant="ghost" asChild>
                          <Link to="/employees/$id/edit" params={{ id: e.id }}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => setConfirmDelete({ ids: [e.id], open: true })}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-3 py-3 text-xs text-muted-foreground">
          <div>
            {isFetching && <Loader2 className="mr-2 inline h-3 w-3 animate-spin" />}
            Page {page} of {totalPages}
          </div>
          <div className="flex items-center gap-1">
            <Button size="sm" variant="outline" disabled={page <= 1} onClick={() => setPage(page - 1)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline" disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-3 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
          {(error as Error).message}
        </div>
      )}

      <AlertDialog open={confirmDelete.open} onOpenChange={(o) => setConfirmDelete((s) => ({ ...s, open: o }))}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {confirmDelete.ids.length} employee(s)?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. All associated data will be removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                delMut.mutate(confirmDelete.ids);
                setConfirmDelete({ ids: [], open: false });
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function SortHead({
  label,
  col,
  sortBy,
  sortDir,
  onClick,
}: {
  label: string;
  col: keyof Employee;
  sortBy: keyof Employee;
  sortDir: "asc" | "desc";
  onClick: (c: keyof Employee) => void;
}) {
  const active = sortBy === col;
  return (
    <th className="px-3 py-3 text-left">
      <button onClick={() => onClick(col)} className="inline-flex items-center gap-1 hover:text-foreground">
        {label}
        {active && (sortDir === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}
      </button>
    </th>
  );
}

function StatusBadge({ status }: { status: Employee["status"] }) {
  const map = {
    active: "bg-success/15 text-success",
    inactive: "bg-destructive/15 text-destructive",
    on_leave: "bg-warning/15 text-warning",
  };
  const label = { active: "Active", inactive: "Inactive", on_leave: "On leave" }[status];
  return <Badge className={`${map[status]} border-none`}>{label}</Badge>;
}

function Avatar({ url, name }: { url: string | null; name: string }) {
  if (url) return <img src={url} alt={name} className="h-9 w-9 rounded-full object-cover" />;
  const initials = name.split(" ").filter(Boolean).map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-primary to-primary-glow text-xs font-semibold text-primary-foreground">
      {initials || "?"}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary">
        <Users className="h-6 w-6" />
      </div>
      <div>
        <div className="font-medium">No employees found</div>
        <div className="mt-1 text-xs text-muted-foreground">Add your first employee or adjust filters.</div>
      </div>
      <Button asChild size="sm">
        <Link to="/employees/new"><Plus className="mr-1 h-4 w-4" /> Add employee</Link>
      </Button>
    </div>
  );
}
