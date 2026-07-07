import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { motion } from "framer-motion";

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics · AI Business Research Agent" },
      { name: "description", content: "Deep-dive analytics on agent usage, response time, and query patterns." },
    ],
  }),
  component: AnalyticsPage,
});

const days = Array.from({ length: 30 }).map((_, i) => ({
  d: `${i + 1}`,
  sql: Math.round(30 + Math.sin(i / 3) * 12 + Math.random() * 10),
  web: Math.round(15 + Math.cos(i / 4) * 8 + Math.random() * 6),
  hybrid: Math.round(6 + Math.random() * 5),
  ms: Math.round(1200 + Math.sin(i / 2) * 200 + Math.random() * 150),
}));

const dbActivity = [
  { name: "SELECT", value: 68 },
  { name: "JOIN", value: 42 },
  { name: "AGG", value: 31 },
  { name: "SUBQ", value: 18 },
  { name: "CTE", value: 12 },
];

const research = [
  { name: "News", value: 34, c: "var(--color-primary)" },
  { name: "Docs", value: 22, c: "var(--color-success)" },
  { name: "Filings", value: 14, c: "var(--color-warning)" },
  { name: "Social", value: 9, c: "var(--color-destructive)" },
];

function AnalyticsPage() {
  return (
    <AppShell>
      <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Analytics</h1>
          <p className="text-sm text-muted-foreground">
            30-day rollup of agent activity and workspace performance.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-6">
          <Panel className="lg:col-span-4" title="Query trends" hint="stacked by agent">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={days}>
                  <defs>
                    <linearGradient id="s1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-success)" stopOpacity={0.55} />
                      <stop offset="100%" stopColor="var(--color-success)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="s2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.55} />
                      <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="s3" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-warning)" stopOpacity={0.55} />
                      <stop offset="100%" stopColor="var(--color-warning)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="d" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={ts} />
                  <Area stackId="1" type="monotone" dataKey="sql" stroke="var(--color-success)" fill="url(#s1)" />
                  <Area stackId="1" type="monotone" dataKey="web" stroke="var(--color-primary)" fill="url(#s2)" />
                  <Area stackId="1" type="monotone" dataKey="hybrid" stroke="var(--color-warning)" fill="url(#s3)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Panel>

          <Panel className="lg:col-span-2" title="Agent share">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={research} dataKey="value" innerRadius={50} outerRadius={90} paddingAngle={3}>
                    {research.map((s, i) => (
                      <Cell key={i} fill={s.c} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={ts} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Panel>

          <Panel className="lg:col-span-3" title="Response time (ms)">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={days}>
                  <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="d" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={ts} />
                  <Line type="monotone" dataKey="ms" stroke="var(--color-primary)" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Panel>

          <Panel className="lg:col-span-3" title="Database activity">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dbActivity}>
                  <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={ts} />
                  <Bar dataKey="value" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Panel>
        </div>
      </div>
    </AppShell>
  );
}

const ts = {
  background: "var(--color-popover)",
  border: "1px solid var(--color-border)",
  borderRadius: 10,
  fontSize: 12,
};

function Panel({
  title,
  hint,
  children,
  className = "",
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`glass rounded-2xl p-4 ${className}`}>
      <div className="mb-3 flex items-center justify-between">
        <div className="text-sm font-medium">{title}</div>
        {hint && <div className="text-[11px] text-muted-foreground">{hint}</div>}
      </div>
      {children}
    </motion.div>
  );
}
