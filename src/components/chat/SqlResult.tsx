import { useMemo, useState } from "react";
import type { MessageMeta } from "@/lib/mock-data";
import { Copy, Download, Search, ArrowUpDown, Check } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  sql: NonNullable<MessageMeta["sql"]>;
  executionTime?: string;
}

export function SqlResult({ sql, executionTime }: Props) {
  const [q, setQ] = useState("");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [asc, setAsc] = useState(true);
  const [copied, setCopied] = useState(false);

  const filtered = useMemo(() => {
    const rows = sql.data.filter((r) =>
      q ? Object.values(r).some((v) => String(v).toLowerCase().includes(q.toLowerCase())) : true,
    );
    if (!sortKey) return rows;
    return [...rows].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (typeof av === "number" && typeof bv === "number") return asc ? av - bv : bv - av;
      return asc ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
    });
  }, [sql.data, q, sortKey, asc]);

  const copy = async () => {
    await navigator.clipboard.writeText(sql.query);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-3 overflow-hidden rounded-xl border border-border bg-background/40"
    >
      <div className="flex items-center justify-between border-b border-border bg-card/60 px-3 py-2">
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
          <span className="rounded-md bg-muted px-1.5 py-0.5 font-mono">{sql.database}</span>
          <span>·</span>
          <span>{sql.rows} rows</span>
          {executionTime && (
            <>
              <span>·</span>
              <span>{executionTime}</span>
            </>
          )}
        </div>
        <button
          onClick={copy}
          className="inline-flex items-center gap-1 rounded-md border border-border bg-background/70 px-2 py-1 text-[11px] transition hover:bg-accent"
        >
          {copied ? <Check className="h-3 w-3 text-success" /> : <Copy className="h-3 w-3" />}
          {copied ? "Copied" : "Copy SQL"}
        </button>
      </div>
      <pre className="max-h-64 overflow-auto bg-background/60 px-4 py-3 text-[12px] leading-relaxed">
        <code className="font-mono text-foreground/90">{sql.query}</code>
      </pre>

      <div className="flex flex-wrap items-center gap-2 border-t border-border bg-card/60 px-3 py-2">
        <div className="relative flex-1 min-w-[180px]">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search results…"
            className="w-full rounded-lg border border-border bg-background/70 py-1.5 pl-8 pr-3 text-xs outline-none focus:border-primary/60"
          />
        </div>
        <div className="flex items-center gap-1">
          {(["csv", "excel", "json"] as const).map((k) => (
            <button
              key={k}
              className="inline-flex items-center gap-1 rounded-md border border-border bg-background/70 px-2 py-1 text-[11px] uppercase tracking-wide text-muted-foreground transition hover:bg-accent hover:text-foreground"
            >
              <Download className="h-3 w-3" /> {k}
            </button>
          ))}
        </div>
      </div>

      <div className="max-h-72 overflow-auto">
        <table className="w-full text-xs">
          <thead className="sticky top-0 bg-card/80 backdrop-blur">
            <tr>
              {sql.columns.map((c) => (
                <th
                  key={c}
                  onClick={() => {
                    if (sortKey === c) setAsc((v) => !v);
                    else {
                      setSortKey(c);
                      setAsc(true);
                    }
                  }}
                  className="cursor-pointer border-b border-border px-3 py-2 text-left font-medium text-muted-foreground hover:text-foreground"
                >
                  <span className="inline-flex items-center gap-1">
                    {c}
                    <ArrowUpDown className="h-3 w-3 opacity-50" />
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, i) => (
              <tr key={i} className="border-b border-border/60 hover:bg-accent/40">
                {sql.columns.map((c) => (
                  <td key={c} className="px-3 py-2 font-mono text-foreground/90">
                    {typeof row[c] === "number"
                      ? (row[c] as number).toLocaleString()
                      : String(row[c])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
