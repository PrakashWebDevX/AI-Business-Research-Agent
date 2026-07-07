import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { motion } from "framer-motion";
import {
  Activity,
  Database,
  Globe,
  Clock,
  Brain,
  HardDrive,
  Target,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
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

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard · AI Business Research Agent" },
      { name: "description", content: "Overview of your AI workspace: queries, agents, and performance." },
    ],
  }),
  component: DashboardPage,
});

const trend = Array.from({ length: 14 }).map((_, i) => ({
  d: `D${i + 1}`,
  q: Math.round(40 + Math.sin(i / 2) * 20 + i * 3 + Math.random() * 10),
}));

const agentBreakdown = [
  { name: "SQL", value: 62, color: "var(--color-success)" },
  { name: "Web", value: 27, color: "var(--color-primary)" },
  { name: "Hybrid", value: 11, color: "var(--color-warning)" },
];

const activity = [
  { time: "2m ago", agent: "SQL", text: "Top 5 sales reps by revenue this quarter" },
  { time: "18m ago", agent: "Web", text: "Latest EU AI Act disclosure requirements" },
  { time: "1h ago", agent: "Hybrid", text: "Cross-reference churn with support tickets" },
  { time: "3h ago", agent: "SQL", text: "MRR by cohort — enterprise tier only" },
  { time: "yesterday", agent: "Web", text: "Competitor pricing snapshot (10 vendors)" },
];

function DashboardPage() {
  return (
    <AppShell>
      <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[11px] text-primary">
              <Sparkles className="h-3 w-3" /> Live workspace
            </div>
            <h1 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
              Good afternoon, Alex
            </h1>
            <p className="text-sm text-muted-foreground">
              Here's what your agents did today.
            </p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-primary to-primary-glow px-4 py-2 text-sm font-medium text-primary-foreground shadow-[0_0_24px_-6px_var(--color-primary)]">
            <Sparkles className="h-4 w-4" /> New chat
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Kpi icon={Activity} label="Today's queries" value="184" delta="+12%" />
          <Kpi icon={Database} label="SQL queries" value="112" delta="+18%" />
          <Kpi icon={Globe} label="Web searches" value="47" delta="+6%" />
          <Kpi icon={Clock} label="Avg. response" value="1.42s" delta="-8%" positive />
        </div>

        <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-6">
          <Bento className="lg:col-span-4">
            <BentoHeader title="Query volume · last 14 days" hint="+22.4% vs prior period" />
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trend} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
                  <defs>
                    <linearGradient id="dq" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.55} />
                      <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="d" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Area type="monotone" dataKey="q" stroke="var(--color-primary)" strokeWidth={2} fill="url(#dq)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Bento>

          <Bento className="lg:col-span-2">
            <BentoHeader title="Agent usage" hint="This week" />
            <div className="flex h-64 items-center">
              <div className="h-40 w-1/2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={agentBreakdown} dataKey="value" innerRadius={38} outerRadius={62} paddingAngle={4}>
                      {agentBreakdown.map((s, i) => (
                        <Cell key={i} fill={s.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <ul className="w-1/2 space-y-2 text-xs">
                {agentBreakdown.map((a) => (
                  <li key={a.name} className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 text-muted-foreground">
                      <span className="h-2 w-2 rounded-full" style={{ background: a.color }} />
                      {a.name}
                    </span>
                    <span className="font-semibold">{a.value}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </Bento>

          <Bento className="lg:col-span-2">
            <BentoHeader title="Most used tool" />
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-success/15 text-success">
                <Database className="h-5 w-5" />
              </div>
              <div>
                <div className="text-lg font-semibold">SQL Agent</div>
                <div className="text-xs text-muted-foreground">62% of today's queries</div>
              </div>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-full w-[62%] rounded-full bg-gradient-to-r from-success to-primary" />
            </div>
          </Bento>

          <Bento className="lg:col-span-2">
            <BentoHeader title="AI accuracy" />
            <div className="flex items-end gap-2">
              <div className="text-3xl font-semibold tracking-tight">94.2%</div>
              <div className="mb-1 inline-flex items-center gap-0.5 text-xs text-success">
                <ArrowUpRight className="h-3 w-3" /> 1.8%
              </div>
            </div>
            <div className="text-xs text-muted-foreground">Rolling 7-day average confidence</div>
            <div className="mt-4 h-16">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trend.slice(0, 8)}>
                  <Bar dataKey="q" fill="var(--color-primary)" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Bento>

          <Bento className="lg:col-span-2">
            <BentoHeader title="Database size" />
            <div className="flex items-center gap-3">
              <HardDrive className="h-8 w-8 text-primary" />
              <div>
                <div className="text-2xl font-semibold">2.4 GB</div>
                <div className="text-xs text-muted-foreground">analytics.postgres</div>
              </div>
            </div>
            <div className="mt-4 space-y-1.5 text-xs">
              <MiniBar label="deals" pct={72} />
              <MiniBar label="users" pct={48} />
              <MiniBar label="events" pct={91} />
            </div>
          </Bento>

          <Bento className="lg:col-span-4">
            <BentoHeader title="Recent activity" hint="Latest agent runs" />
            <ul className="divide-y divide-border">
              {activity.map((a, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-center gap-3 py-2.5"
                >
                  <AgentDot agent={a.agent} />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm">{a.text}</div>
                  </div>
                  <div className="text-[11px] text-muted-foreground">{a.time}</div>
                </motion.li>
              ))}
            </ul>
          </Bento>

          <Bento className="lg:col-span-2">
            <BentoHeader title="Health" />
            <div className="space-y-2 text-sm">
              <HealthRow label="Gateway" value="Operational" ok />
              <HealthRow label="Vector store" value="Operational" ok />
              <HealthRow label="Warehouse" value="Operational" ok />
              <HealthRow label="Web crawler" value="Degraded" />
            </div>
          </Bento>
        </div>
      </div>
    </AppShell>
  );
}

const tooltipStyle = {
  background: "var(--color-popover)",
  border: "1px solid var(--color-border)",
  borderRadius: 10,
  fontSize: 12,
};

function Bento({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className={`glass rounded-2xl p-4 ${className}`}
    >
      {children}
    </motion.div>
  );
}

function BentoHeader({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <div className="text-sm font-medium text-foreground">{title}</div>
      {hint && <div className="text-[11px] text-muted-foreground">{hint}</div>}
    </div>
  );
}

function Kpi({
  icon: Icon,
  label,
  value,
  delta,
  positive,
}: {
  icon: typeof Activity;
  label: string;
  value: string;
  delta: string;
  positive?: boolean;
}) {
  const good = positive ?? !delta.startsWith("-");
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="glass relative overflow-hidden rounded-2xl p-4"
    >
      <div className="flex items-center justify-between">
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-4 w-4" />
        </div>
        <span
          className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[10px] font-medium ${
            good ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"
          }`}
        >
          {delta}
        </span>
      </div>
      <div className="mt-4 text-2xl font-semibold tracking-tight">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </motion.div>
  );
}

function MiniBar({ label, pct }: { label: string; pct: number }) {
  return (
    <div>
      <div className="flex items-center justify-between text-[11px] text-muted-foreground">
        <span className="font-mono">{label}</span>
        <span>{pct}%</span>
      </div>
      <div className="mt-0.5 h-1 overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function AgentDot({ agent }: { agent: string }) {
  const map: Record<string, { color: string; Icon: typeof Database }> = {
    SQL: { color: "text-success bg-success/15", Icon: Database },
    Web: { color: "text-primary bg-primary/15", Icon: Globe },
    Hybrid: { color: "text-warning bg-warning/15", Icon: Brain },
  };
  const c = map[agent] ?? map.SQL;
  const Icon = c.Icon;
  return (
    <div className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${c.color}`}>
      <Icon className="h-3.5 w-3.5" />
    </div>
  );
}

function HealthRow({ label, value, ok }: { label: string; value: string; ok?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span
        className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium ${
          ok ? "bg-success/15 text-success" : "bg-warning/15 text-warning"
        }`}
      >
        <span
          className={`h-1.5 w-1.5 rounded-full ${ok ? "bg-success" : "bg-warning"}`}
          style={{ boxShadow: ok ? "0 0 8px var(--color-success)" : "0 0 8px var(--color-warning)" }}
        />
        {value}
      </span>
    </div>
  );
}

// Silences unused Target import warning if bundler is strict — kept for future card use
void Target;
