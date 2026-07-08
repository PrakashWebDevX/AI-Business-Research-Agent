import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Users, UserCheck, UserX, Building2, TrendingUp, Plus, Loader2 } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { employeeService } from "@/services/employeeService";
import type { Employee } from "@/types/employee";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard · EMS" }] }),
  component: DashboardPage,
});

function DashboardPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["employees", "stats"],
    queryFn: () => employeeService.stats(),
  });

  if (isLoading) return <Skeleton />;
  if (error) return <ErrorState message={(error as Error).message} />;

  const employees = data ?? [];
  const total = employees.length;
  const active = employees.filter((e) => e.status === "active").length;
  const inactive = total - active;
  const depMap = new Map<string, number>();
  for (const e of employees) if (e.department) depMap.set(e.department, (depMap.get(e.department) ?? 0) + 1);
  const departments = depMap.size;

  const now = new Date();
  const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const joinedThisMonth = employees.filter((e) => e.joining_date?.startsWith(monthKey)).length;

  const growth = buildGrowth(employees);
  const departmentData = Array.from(depMap.entries()).map(([name, value]) => ({ name, value }));
  const salaryBuckets = buildSalaryBuckets(employees);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Overview of your workforce.</p>
        </div>
        <Button asChild>
          <Link to="/employees/new">
            <Plus className="mr-2 h-4 w-4" /> Add employee
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        <Kpi icon={Users} label="Total employees" value={total} tone="primary" />
        <Kpi icon={UserCheck} label="Active" value={active} tone="success" />
        <Kpi icon={UserX} label="Inactive" value={inactive} tone="destructive" />
        <Kpi icon={Building2} label="Departments" value={departments} tone="warning" />
        <Kpi icon={TrendingUp} label="Joined this month" value={joinedThisMonth} tone="primary" />
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-6">
        <Card className="lg:col-span-4">
          <Header title="Employee growth" hint="Last 6 months" />
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growth} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
                <defs>
                  <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.55} />
                    <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="label" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
                <Tooltip contentStyle={tooltip} />
                <Area type="monotone" dataKey="count" stroke="var(--color-primary)" strokeWidth={2} fill="url(#g)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <Header title="Department distribution" />
          <div className="h-64">
            {departmentData.length === 0 ? (
              <EmptyChart />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={departmentData} dataKey="value" innerRadius={44} outerRadius={80} paddingAngle={3}>
                    {departmentData.map((_, i) => (
                      <Cell key={i} fill={CHART[i % CHART.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltip} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </Card>

        <Card className="lg:col-span-3">
          <Header title="Salary distribution" hint="Grouped ranges" />
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salaryBuckets}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="range" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
                <Tooltip contentStyle={tooltip} />
                <Bar dataKey="count" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="lg:col-span-3">
          <Header title="Recent employees" hint="Latest additions" />
          <RecentList employees={employees.slice(0, 6)} />
        </Card>
      </div>
    </div>
  );
}

const CHART = ["var(--color-primary)", "var(--color-success)", "var(--color-warning)", "var(--color-destructive)", "var(--color-chart-5)"];
const tooltip = { background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 10, fontSize: 12 };

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`glass rounded-2xl p-4 ${className}`}>
      {children}
    </motion.div>
  );
}
function Header({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <div className="text-sm font-medium">{title}</div>
      {hint && <div className="text-[11px] text-muted-foreground">{hint}</div>}
    </div>
  );
}

function Kpi({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: typeof Users;
  label: string;
  value: number;
  tone: "primary" | "success" | "warning" | "destructive";
}) {
  const bg = {
    primary: "bg-primary/15 text-primary",
    success: "bg-success/15 text-success",
    warning: "bg-warning/15 text-warning",
    destructive: "bg-destructive/15 text-destructive",
  }[tone];
  return (
    <motion.div whileHover={{ y: -2 }} className="glass rounded-2xl p-4">
      <div className={`grid h-9 w-9 place-items-center rounded-lg ${bg}`}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="mt-3 text-2xl font-semibold tracking-tight">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </motion.div>
  );
}

function RecentList({ employees }: { employees: Array<Pick<Employee, "id" | "first_name" | "last_name" | "email" | "profile_image" | "department" | "created_at">> }) {
  if (!employees.length) {
    return <div className="py-10 text-center text-sm text-muted-foreground">No employees yet. Add your first one.</div>;
  }
  return (
    <ul className="divide-y divide-border">
      {employees.map((e) => (
        <li key={e.id} className="flex items-center gap-3 py-2.5">
          <Avatar url={e.profile_image} name={`${e.first_name} ${e.last_name}`} />
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-medium">{e.first_name} {e.last_name}</div>
            <div className="truncate text-xs text-muted-foreground">{e.email}</div>
          </div>
          <div className="hidden text-xs text-muted-foreground sm:block">{e.department || "—"}</div>
        </li>
      ))}
    </ul>
  );
}

function Avatar({ url, name }: { url: string | null; name: string }) {
  if (url) return <img src={url} alt={name} className="h-8 w-8 rounded-full object-cover" />;
  const initials = name.split(" ").filter(Boolean).map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-primary to-primary-glow text-[11px] font-semibold text-primary-foreground">
      {initials || "?"}
    </div>
  );
}

function EmptyChart() {
  return <div className="grid h-full place-items-center text-xs text-muted-foreground">No data yet</div>;
}

function Skeleton() {
  return (
    <div className="grid min-h-[60vh] place-items-center">
      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="mx-auto max-w-lg p-8">
      <div className="glass rounded-2xl p-6 text-center">
        <h2 className="text-lg font-semibold">Failed to load</h2>
        <p className="mt-1 text-sm text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}

function buildGrowth(employees: Array<{ created_at: string }>) {
  const now = new Date();
  const buckets: Array<{ label: string; count: number }> = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    buckets.push({ label: d.toLocaleString("en", { month: "short" }), count: 0 });
  }
  for (const e of employees) {
    const d = new Date(e.created_at);
    const idx = 5 - (now.getFullYear() * 12 + now.getMonth() - (d.getFullYear() * 12 + d.getMonth()));
    if (idx >= 0 && idx < 6) buckets[idx].count += 1;
  }
  let running = 0;
  return buckets.map((b) => {
    running += b.count;
    return { label: b.label, count: running };
  });
}

function buildSalaryBuckets(employees: Array<{ salary: number | null }>) {
  const ranges = [
    { range: "<30k", min: 0, max: 30000 },
    { range: "30–60k", min: 30000, max: 60000 },
    { range: "60–100k", min: 60000, max: 100000 },
    { range: "100–150k", min: 100000, max: 150000 },
    { range: "150k+", min: 150000, max: Infinity },
  ];
  return ranges.map((r) => ({
    range: r.range,
    count: employees.filter((e) => e.salary != null && e.salary >= r.min && e.salary < r.max).length,
  }));
}
