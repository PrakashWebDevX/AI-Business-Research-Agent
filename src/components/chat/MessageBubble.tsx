import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Check,
  Copy,
  Database,
  Download,
  FileText,
  Globe,
  Layers,
  Sparkles,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { exportService } from "@/services/exportService";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/services/chatService";

type ToolName = string;

const TOOL_STYLES: Record<string, { label: string; className: string; Icon: typeof Sparkles }> = {
  "SQL Agent": {
    label: "SQL Agent",
    className: "bg-[#3B82F6]/15 text-[#3B82F6] border-[#3B82F6]/30",
    Icon: Database,
  },
  "Web Research": {
    label: "Web Research",
    className: "bg-[#22C55E]/15 text-[#22C55E] border-[#22C55E]/30",
    Icon: Globe,
  },
  "Document Search": {
    label: "Document Search",
    className: "bg-purple-500/15 text-purple-400 border-purple-500/30",
    Icon: FileText,
  },
  Mixed: {
    label: "Mixed",
    className:
      "border-transparent text-white bg-gradient-to-r from-[#3B82F6] via-purple-500 to-[#22C55E]",
    Icon: Layers,
  },
  "Direct Answer": {
    label: "Direct Answer",
    className: "bg-slate-500/15 text-slate-300 border-slate-500/30",
    Icon: Sparkles,
  },
};

function ToolBadge({ tool }: { tool?: ToolName | null }) {
  if (!tool) return null;
  const style = TOOL_STYLES[tool] ?? {
    label: tool,
    className: "bg-slate-500/15 text-slate-300 border-slate-500/30",
    Icon: Sparkles,
  };
  const Icon = style.Icon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium",
        style.className,
      )}
    >
      <Icon className="h-3 w-3" />
      {style.label}
    </span>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch {
          /* ignore */
        }
      }}
      className="inline-flex items-center gap-1 rounded-md border border-border bg-background/70 px-2 py-1 text-[11px] text-muted-foreground hover:text-foreground"
    >
      {copied ? <Check className="h-3 w-3 text-[#22C55E]" /> : <Copy className="h-3 w-3" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function highlightSql(sql: string) {
  const keywords =
    /\b(SELECT|FROM|WHERE|GROUP BY|ORDER BY|HAVING|LIMIT|OFFSET|JOIN|LEFT|RIGHT|INNER|OUTER|ON|AS|AND|OR|NOT|IN|IS|NULL|DISTINCT|COUNT|SUM|AVG|MIN|MAX|CASE|WHEN|THEN|ELSE|END|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|TABLE|WITH|UNION|ALL|DESC|ASC)\b/gi;
  const parts: Array<{ t: string; k: "kw" | "str" | "num" | "txt" }> = [];
  const re = /'[^']*'|"[^"]*"|\b\d+(?:\.\d+)?\b|--[^\n]*|\/\*[\s\S]*?\*\//g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(sql))) {
    if (m.index > last) parts.push({ t: sql.slice(last, m.index), k: "txt" });
    const tok = m[0];
    parts.push({
      t: tok,
      k: /^['"]/.test(tok) ? "str" : /^\d/.test(tok) ? "num" : "txt",
    });
    last = m.index + tok.length;
  }
  if (last < sql.length) parts.push({ t: sql.slice(last), k: "txt" });

  return parts.flatMap((p, i) => {
    if (p.k !== "txt") {
      const cls =
        p.k === "str"
          ? "text-[#22C55E]"
          : p.k === "num"
            ? "text-amber-400"
            : "";
      return (
        <span key={i} className={cls}>
          {p.t}
        </span>
      );
    }
    const chunks = p.t.split(keywords);
    return chunks.map((c, j) =>
      keywords.test(c) ? (
        <span key={`${i}-${j}`} className="font-semibold text-[#3B82F6]">
          {c}
        </span>
      ) : (
        <span key={`${i}-${j}`}>{c}</span>
      ),
    );
  });
}

function SqlBlock({ sql }: { sql: string }) {
  return (
    <div className="mt-3 overflow-hidden rounded-xl border border-border bg-[#0F172A]">
      <div className="flex items-center justify-between border-b border-border px-3 py-1.5">
        <div className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          <Database className="h-3 w-3" /> Generated SQL
        </div>
        <CopyButton text={sql} />
      </div>
      <pre className="overflow-x-auto p-3 font-mono text-[12.5px] leading-relaxed text-foreground">
        <code>{highlightSql(sql)}</code>
      </pre>
    </div>
  );
}

type Row = Record<string, unknown>;

function normalizeTableData(td: unknown): Row[] {
  if (!td) return [];
  if (Array.isArray(td)) {
    if (td.length === 0) return [];
    if (typeof td[0] === "object" && !Array.isArray(td[0])) return td as Row[];
    // array of arrays: first row headers? fallback to col_N
    const arr = td as unknown[][];
    const cols = arr[0]?.map((_, i) => `col_${i}`) ?? [];
    return arr.map((r) => Object.fromEntries(cols.map((c, i) => [c, r[i]])));
  }
  if (typeof td === "object") {
    const o = td as { columns?: string[]; rows?: unknown[][] };
    if (o.columns && o.rows)
      return o.rows.map((r) => Object.fromEntries(o.columns!.map((c, i) => [c, r[i]])));
  }
  return [];
}

function DataTable({ rows }: { rows: Row[] }) {
  const cols = useMemo(() => {
    const set = new Set<string>();
    for (const r of rows) Object.keys(r).forEach((k) => set.add(k));
    return Array.from(set);
  }, [rows]);
  const [sortCol, setSortCol] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const sorted = useMemo(() => {
    if (!sortCol) return rows;
    const copy = [...rows];
    copy.sort((a, b) => {
      const av = a[sortCol];
      const bv = b[sortCol];
      if (av == null && bv == null) return 0;
      if (av == null) return 1;
      if (bv == null) return -1;
      if (typeof av === "number" && typeof bv === "number")
        return sortDir === "asc" ? av - bv : bv - av;
      return sortDir === "asc"
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av));
    });
    return copy;
  }, [rows, sortCol, sortDir]);

  return (
    <div className="mt-3 space-y-2">
      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant="outline" onClick={() => exportService.csv("result", sorted)}>
          <Download className="mr-1.5 h-3.5 w-3.5" /> CSV
        </Button>
        <Button size="sm" variant="outline" onClick={() => exportService.excel("result", sorted)}>
          <Download className="mr-1.5 h-3.5 w-3.5" /> Excel
        </Button>
        <Button size="sm" variant="outline" onClick={() => exportService.json("result", sorted)}>
          <Download className="mr-1.5 h-3.5 w-3.5" /> JSON
        </Button>
        <span className="ml-auto self-center text-[11px] text-muted-foreground">
          {rows.length} row{rows.length === 1 ? "" : "s"}
        </span>
      </div>
      <div className="max-h-[420px] overflow-auto rounded-xl border border-border bg-background/60">
        <table className="min-w-full text-sm">
          <thead className="sticky top-0 bg-[#1E293B] text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              {cols.map((c) => {
                const active = sortCol === c;
                return (
                  <th key={c} className="px-3 py-2 text-left font-medium">
                    <button
                      onClick={() => {
                        if (sortCol === c) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
                        else {
                          setSortCol(c);
                          setSortDir("asc");
                        }
                      }}
                      className="inline-flex items-center gap-1 hover:text-foreground"
                    >
                      {c}
                      {active ? (
                        sortDir === "asc" ? (
                          <ArrowUp className="h-3 w-3" />
                        ) : (
                          <ArrowDown className="h-3 w-3" />
                        )
                      ) : (
                        <ArrowUpDown className="h-3 w-3 opacity-40" />
                      )}
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {sorted.map((r, i) => (
              <tr key={i} className="border-t border-border hover:bg-accent/30">
                {cols.map((c) => (
                  <td key={c} className="whitespace-nowrap px-3 py-2">
                    {r[c] == null ? (
                      <span className="text-muted-foreground">—</span>
                    ) : (
                      String(r[c])
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const CHART_COLORS = ["#3B82F6", "#22C55E", "#A855F7", "#F59E0B", "#EF4444", "#06B6D4"];

function ChartBlock({
  chart,
}: {
  chart: { chart_type: "bar" | "pie" | "line"; title: string; labels: string[]; values: number[] };
}) {
  const data = chart.labels.map((l, i) => ({ name: l, value: chart.values[i] ?? 0 }));
  return (
    <div className="mt-3 rounded-xl border border-border bg-background/60 p-3">
      <div className="mb-2 text-xs font-medium text-muted-foreground">{chart.title}</div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {chart.chart_type === "pie" ? (
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                label
              >
                {data.map((_, i) => (
                  <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: "#1E293B", border: "1px solid #334155" }} />
              <Legend />
            </PieChart>
          ) : chart.chart_type === "line" ? (
            <LineChart data={data}>
              <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} />
              <YAxis stroke="#94A3B8" fontSize={11} />
              <Tooltip contentStyle={{ background: "#1E293B", border: "1px solid #334155" }} />
              <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          ) : (
            <BarChart data={data}>
              <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} />
              <YAxis stroke="#94A3B8" fontSize={11} />
              <Tooltip contentStyle={{ background: "#1E293B", border: "1px solid #334155" }} />
              <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function SourcesList({
  sources,
}: {
  sources: Array<{ title?: string; url?: string; snippet?: string }>;
}) {
  if (!sources.length) return null;
  return (
    <div className="mt-3 rounded-xl border border-border bg-background/60 p-3">
      <div className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        <Globe className="h-3 w-3" /> Sources
      </div>
      <ol className="space-y-1.5 text-sm">
        {sources.map((s, i) => (
          <li key={i} className="flex gap-2">
            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#3B82F6]/15 text-[11px] font-semibold text-[#3B82F6]">
              {i + 1}
            </span>
            {s.url ? (
              <a
                href={s.url}
                target="_blank"
                rel="noreferrer noopener"
                className="text-[#3B82F6] hover:underline"
              >
                {s.title || s.url}
              </a>
            ) : (
              <span>{s.title}</span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

export interface MessageBubbleProps {
  role: "user" | "assistant";
  content: string;
  message?: Partial<ChatMessage> | null;
}

export function MessageBubble({ role, content, message }: MessageBubbleProps) {
  const isUser = role === "user";
  const tool = message?.tool_used ?? null;
  const exec = message?.execution_time_seconds ?? null;
  const sql = message?.generated_sql ?? null;
  const tableRows = normalizeTableData(message?.table_data);
  const chart = message?.chart as
    | { chart_type: "bar" | "pie" | "line"; title: string; labels: string[]; values: number[] }
    | null
    | undefined;
  const sources = (message?.sources ?? null) as
    | Array<{ title?: string; url?: string; snippet?: string }>
    | null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-[92%] rounded-2xl px-4 py-3 text-sm md:max-w-[85%]",
          isUser
            ? "bg-[#3B82F6] text-white shadow-lg shadow-[#3B82F6]/20"
            : "border border-border bg-[#1E293B]/80 text-foreground backdrop-blur",
        )}
      >
        {!isUser && (tool || exec != null) && (
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <ToolBadge tool={tool} />
            {exec != null && (
              <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                <Zap className="h-3 w-3 text-amber-400" />
                {Number(exec).toFixed(2)}s
              </span>
            )}
          </div>
        )}

        <div className="whitespace-pre-wrap break-words leading-relaxed">{content}</div>

        {!isUser && sql && <SqlBlock sql={sql} />}
        {!isUser && tableRows.length > 0 && <DataTable rows={tableRows} />}
        {!isUser && chart && chart.labels?.length ? <ChartBlock chart={chart} /> : null}
        {!isUser && sources && sources.length > 0 && <SourcesList sources={sources} />}
      </div>
    </motion.div>
  );
}
