import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2, Play, Database, Download, Bookmark } from "lucide-react";
import { chatService, type ChatResponse } from "@/services/chatService";
import { exportService } from "@/services/exportService";
import { savedService } from "@/services/sessionsService";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/sql")({
  head: () => ({ meta: [{ title: "SQL Agent · AI Business Research Agent" }] }),
  component: SqlPage,
});

const SUGGESTIONS = [
  "How many orders were placed last month?",
  "Top 10 customers by revenue this year",
  "Average deal size by region for Q3",
];

function SqlPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ChatResponse | null>(null);

  async function run(q?: string) {
    const prompt = (q ?? query).trim();
    if (!prompt) return;
    setQuery(prompt);
    setLoading(true);
    try {
      const r = await chatService.send(prompt);
      setResult(r);
    } catch (e) {
      console.error("SQL query failed:", e);
      toast.error((e as Error).message || "Query failed");
    } finally {
      setLoading(false);
    }
  }

  const tableData = (result?.message?.table_data ?? null) as
    | { columns?: string[]; rows?: unknown[][] }
    | unknown[][]
    | null;
  const rows: unknown[][] = Array.isArray(tableData)
    ? (tableData as unknown[][])
    : (tableData?.rows ?? []);
  const cols: string[] = Array.isArray(tableData)
    ? (rows[0] && Array.isArray(rows[0]) ? (rows[0] as unknown[]).map((_v, i) => `col_${i}`) : [])
    : (tableData?.columns ?? []);
  const replyText = result?.message?.content ?? "";

  return (
    <div className="mx-auto max-w-6xl space-y-4 px-4 py-6 md:px-6">
      <div className="flex items-center gap-2">
        <Database className="h-5 w-5 text-primary" />
        <h1 className="text-lg font-semibold">SQL Agent</h1>
      </div>

      <div className="rounded-2xl border border-border bg-card/60 p-4 backdrop-blur">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          rows={5}
          placeholder="Ask a data question in plain English — the agent will run SQL for you…"
          className="w-full resize-y rounded-xl border border-input bg-background px-3 py-2 font-mono text-sm outline-none focus:ring-2 focus:ring-ring"
        />
        <div className="mt-3 flex flex-wrap gap-2">
          <Button onClick={() => run()} disabled={loading || !query.trim()}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Play className="mr-2 h-4 w-4" />}
            Run
          </Button>
          {rows.length > 0 && (
            <>
              <Button
                variant="outline"
                onClick={() =>
                  exportService.csv(
                    "sql-result",
                    rows.map((r) => Object.fromEntries(cols.map((c, i) => [c, (r as unknown[])[i]]))),
                  )
                }
              >
                <Download className="mr-2 h-4 w-4" /> CSV
              </Button>
              <Button variant="outline" onClick={() => exportService.json("sql-result", result)}>
                JSON
              </Button>
            </>
          )}
          {result && (
            <Button
              variant="outline"
              onClick={() => {
                savedService.save({
                  id: crypto.randomUUID(),
                  title: query.slice(0, 60),
                  kind: "sql",
                  createdAt: new Date().toISOString(),
                  payload: { query, result },
                });
                toast.success("Saved");
              }}
            >
              <Bookmark className="mr-2 h-4 w-4" /> Save
            </Button>
          )}
        </div>
        {!result && !loading && (
          <div className="mt-3 flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => run(s)}
                className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground hover:border-primary/50 hover:text-foreground"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {result && (
        <div className="space-y-3">
          {replyText && (
            <div className="rounded-2xl border border-border bg-card/60 p-4 text-sm whitespace-pre-wrap backdrop-blur">
              {String(replyText)}
            </div>
          )}
          {rows.length > 0 && (
            <div className="overflow-auto rounded-2xl border border-border bg-card/60 backdrop-blur">
              <table className="min-w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    {cols.map((c) => (
                      <th key={c} className="px-3 py-2 text-left font-medium">{c}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr key={i} className="border-t border-border">
                      {(r as unknown[]).map((v, j) => (
                        <td key={j} className="px-3 py-2">{v == null ? "" : String(v)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
