import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BarChart3 } from "lucide-react";
import { sessionsService, savedService, type StoredSession, type SavedReport } from "@/services/sessionsService";

export const Route = createFileRoute("/_authenticated/analytics")({
  head: () => ({ meta: [{ title: "Analytics · AI Business Research Agent" }] }),
  component: AnalyticsPage,
});

function AnalyticsPage() {
  const [sessions, setSessions] = useState<StoredSession[]>([]);
  const [saved, setSaved] = useState<SavedReport[]>([]);
  useEffect(() => {
    sessionsService.list().then(setSessions);
    setSaved(savedService.list());
  }, []);
  const msgCount = sessions.reduce((n, s) => n + (s.messages?.length ?? 0), 0);
  const byKind = saved.reduce<Record<string, number>>((acc, r) => {
    acc[r.kind] = (acc[r.kind] || 0) + 1;
    return acc;
  }, {});


  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-6 md:px-6">
      <div className="flex items-center gap-2">
        <BarChart3 className="h-5 w-5 text-primary" />
        <h1 className="text-lg font-semibold">Analytics</h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Chat sessions" value={sessions.length} />
        <Stat label="Messages sent" value={msgCount} />
        <Stat label="Saved reports" value={saved.length} />
      </div>

      <div className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur">
        <h2 className="mb-3 font-semibold">Saved by type</h2>
        {saved.length === 0 ? (
          <p className="text-sm text-muted-foreground">No saved reports yet.</p>
        ) : (
          <div className="space-y-2">
            {Object.entries(byKind).map(([k, n]) => (
              <div key={k} className="flex items-center gap-3">
                <div className="w-24 text-sm capitalize">{k}</div>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full bg-primary"
                    style={{ width: `${(n / saved.length) * 100}%` }}
                  />
                </div>
                <div className="w-8 text-right text-sm text-muted-foreground">{n}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur">
      <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="mt-2 text-3xl font-semibold">{value}</div>
    </div>
  );
}
