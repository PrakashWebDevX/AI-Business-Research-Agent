import type { MessageMeta } from "@/lib/mock-data";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Area,
  AreaChart,
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const COLORS = ["var(--color-primary)", "var(--color-success)", "var(--color-warning)", "var(--color-destructive)", "var(--color-chart-5)"];

export function ChartResult({ chart }: { chart: NonNullable<MessageMeta["chart"]> }) {
  const commonAxis = {
    stroke: "var(--color-muted-foreground)",
    fontSize: 11,
    tickLine: false,
    axisLine: false,
  };
  return (
    <div className="mt-3 rounded-xl border border-border bg-background/40 p-3">
      <div className="mb-2 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
        Visualization · {chart.type}
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {chart.type === "bar" ? (
            <BarChart data={chart.data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey={chart.xKey} {...commonAxis} />
              <YAxis {...commonAxis} />
              <Tooltip
                contentStyle={{
                  background: "var(--color-popover)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 10,
                  fontSize: 12,
                }}
              />
              <Bar dataKey={chart.yKey} fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
            </BarChart>
          ) : chart.type === "line" ? (
            <LineChart data={chart.data}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey={chart.xKey} {...commonAxis} />
              <YAxis {...commonAxis} />
              <Tooltip />
              <Line type="monotone" dataKey={chart.yKey} stroke="var(--color-primary)" strokeWidth={2} dot={false} />
            </LineChart>
          ) : chart.type === "area" ? (
            <AreaChart data={chart.data}>
              <defs>
                <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey={chart.xKey} {...commonAxis} />
              <YAxis {...commonAxis} />
              <Tooltip />
              <Area type="monotone" dataKey={chart.yKey} stroke="var(--color-primary)" fill="url(#g)" />
            </AreaChart>
          ) : (
            <PieChart>
              <Pie data={chart.data} dataKey={chart.yKey} nameKey={chart.xKey} innerRadius={50} outerRadius={80} paddingAngle={3}>
                {chart.data.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
