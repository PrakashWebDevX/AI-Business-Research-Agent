import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Database, Play } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/sql")({
  head: () => ({
    meta: [
      { title: "SQL Queries · AI Business Research Agent" },
      { name: "description", content: "Run natural-language SQL against your warehouse." },
    ],
  }),
  component: SqlPage,
});

function SqlPage() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const run = () => {
    const prompt = q.trim() || "Run a SQL query on the warehouse";
    // Route the request through the main chat; the backend router dispatches to the SQL agent.
    navigate({ to: "/", search: { sessionId: undefined } });
    // Defer so the chat mounts before we dispatch a prefilled message.
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("agent:prefill", { detail: { text: prompt } }));
    }, 0);
  };

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-5xl px-4 py-8 md:px-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">SQL Queries</h1>
            <p className="text-sm text-muted-foreground">
              Ask a data question in plain English — the SQL agent generates and runs it.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-success/30 bg-success/10 px-2.5 py-1 text-[11px] font-medium text-success">
            <Database className="h-3 w-3" /> SQL agent
          </span>
        </div>

        <div className="glass rounded-2xl p-3">
          <div className="flex items-center gap-2">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && run()}
              placeholder="e.g. 'Top 10 customers by MRR last month'"
              className="flex-1 rounded-xl border border-border bg-background/60 px-3 py-2.5 text-sm outline-none focus:border-primary/60"
            />
            <button
              onClick={run}
              className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-br from-primary to-primary-glow px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-[0_0_16px_-4px_var(--color-primary)]"
            >
              <Play className="h-4 w-4" /> Run
            </button>
          </div>
          <p className="mt-3 px-1 text-[11px] text-muted-foreground">
            Queries and results appear in a new chat, powered by your backend.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
