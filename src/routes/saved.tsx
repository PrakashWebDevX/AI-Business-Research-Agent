import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Search, Trash2, MessageSquare, Loader2, AlertTriangle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useSessions, useDeleteSession } from "@/hooks/useApi";

export const Route = createFileRoute("/saved")({
  head: () => ({
    meta: [
      { title: "Saved Chats · AI Business Research Agent" },
      { name: "description", content: "Search and manage your saved conversations." },
    ],
  }),
  component: SavedPage,
});

function fmtWhen(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString([], { dateStyle: "medium", timeStyle: "short" });
}

function SavedPage() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const sessions = useSessions();
  const del = useDeleteSession();

  const list = (sessions.data ?? []).filter((s) => {
    const term = q.toLowerCase();
    return (
      s.title.toLowerCase().includes(term) || (s.preview ?? "").toLowerCase().includes(term)
    );
  });

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-4xl px-4 py-8 md:px-8">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Saved chats</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          All your conversations, backed by your FastAPI service.
        </p>

        <div className="glass mt-6 rounded-2xl p-2">
          <label className="flex items-center gap-2">
            <Search className="ml-2 h-4 w-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search chats…"
              className="flex-1 bg-transparent px-2 py-2 text-sm outline-none"
            />
          </label>
        </div>

        <div className="mt-4">
          {sessions.isLoading && (
            <div className="flex items-center justify-center gap-2 py-10 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> Loading sessions…
            </div>
          )}
          {sessions.isError && (
            <div className="glass flex flex-col items-center gap-2 rounded-2xl p-8 text-center">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <div className="text-sm font-medium">Could not load sessions</div>
              <div className="text-xs text-muted-foreground">
                {sessions.error instanceof Error ? sessions.error.message : "Unknown error"}
              </div>
              <button
                onClick={() => sessions.refetch()}
                className="mt-1 rounded-lg border border-border bg-card/60 px-3 py-1.5 text-xs hover:bg-accent"
              >
                Retry
              </button>
            </div>
          )}
          {sessions.isSuccess && list.length === 0 && (
            <div className="glass flex flex-col items-center gap-2 rounded-2xl p-10 text-center">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/15 text-primary">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="text-sm font-medium">No chats yet</div>
              <p className="max-w-sm text-xs text-muted-foreground">
                Start a new conversation to see it here.
              </p>
              <button
                onClick={() => navigate({ to: "/" })}
                className="mt-2 rounded-lg bg-gradient-to-br from-primary to-primary-glow px-3 py-1.5 text-xs font-medium text-primary-foreground"
              >
                Start a chat
              </button>
            </div>
          )}

          <div className="space-y-2">
            {list.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                onClick={() => navigate({ to: "/", search: { sessionId: s.id } })}
                className="group flex cursor-pointer items-center gap-3 rounded-xl border border-border bg-card/60 p-3 transition hover:border-primary/40 hover:bg-card"
              >
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <MessageSquare className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{s.title}</div>
                  {s.preview && (
                    <div className="truncate text-xs text-muted-foreground">{s.preview}</div>
                  )}
                </div>
                <div className="text-[11px] text-muted-foreground">{fmtWhen(s.updated_at)}</div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm(`Delete "${s.title}"?`)) del.mutate(s.id);
                  }}
                  disabled={del.isPending}
                  className="ml-2 grid h-8 w-8 place-items-center rounded-lg text-muted-foreground opacity-0 transition hover:bg-destructive/20 hover:text-destructive group-hover:opacity-100 disabled:opacity-40"
                  aria-label="Delete chat"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
