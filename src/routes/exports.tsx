import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import {
  FileSpreadsheet,
  FileDown,
  FileJson,
  FileText,
  Download,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useSessions, useExport } from "@/hooks/useApi";
import type { ExportFormat } from "@/types/api";

export const Route = createFileRoute("/exports")({
  head: () => ({
    meta: [
      { title: "Exports · AI Business Research Agent" },
      { name: "description", content: "Download conversation, SQL, and research artifacts." },
    ],
  }),
  component: ExportsPage,
});

const FORMATS: Array<{ icon: typeof FileSpreadsheet; label: string; format: ExportFormat; desc: string }> = [
  { icon: FileSpreadsheet, label: "CSV", format: "csv", desc: "Tabular data · rows/columns" },
  { icon: FileDown, label: "Excel", format: "excel", desc: "Formatted .xlsx workbook" },
  { icon: FileJson, label: "JSON", format: "json", desc: "Structured, machine readable" },
  { icon: FileText, label: "PDF", format: "pdf", desc: "Human-readable report" },
];

function ExportsPage() {
  const sessions = useSessions();
  const exportMut = useExport();
  const [selected, setSelected] = useState<string | null>(null);

  const list = sessions.data ?? [];
  const activeId = selected ?? list[0]?.id ?? null;

  const download = (format: ExportFormat) => {
    if (!activeId) return;
    exportMut.mutate({ session_id: activeId, format });
  };

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-5xl px-4 py-8 md:px-8">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Exports</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Pick a conversation, then download it in your team's preferred format.
        </p>

        {/* Session picker */}
        <div className="glass mt-6 rounded-2xl">
          <div className="border-b border-border px-4 py-3 text-sm font-medium">Choose a chat</div>
          {sessions.isLoading && (
            <div className="flex items-center justify-center gap-2 py-8 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> Loading sessions…
            </div>
          )}
          {sessions.isError && (
            <div className="flex flex-col items-center gap-2 py-8 text-center">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <div className="text-sm">Could not load sessions</div>
              <button
                onClick={() => sessions.refetch()}
                className="rounded-lg border border-border bg-card/60 px-3 py-1.5 text-xs hover:bg-accent"
              >
                Retry
              </button>
            </div>
          )}
          {sessions.isSuccess && list.length === 0 && (
            <div className="px-4 py-8 text-center text-sm text-muted-foreground">
              No sessions yet. Start a chat to export it.
            </div>
          )}
          {sessions.isSuccess && list.length > 0 && (
            <ul className="max-h-64 divide-y divide-border overflow-y-auto">
              {list.map((s) => (
                <li key={s.id}>
                  <label className="flex cursor-pointer items-center gap-3 px-4 py-2.5 hover:bg-accent/40">
                    <input
                      type="radio"
                      name="session"
                      className="accent-primary"
                      checked={activeId === s.id}
                      onChange={() => setSelected(s.id)}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium">{s.title}</div>
                      {s.preview && (
                        <div className="truncate text-[11px] text-muted-foreground">{s.preview}</div>
                      )}
                    </div>
                    <div className="text-[11px] text-muted-foreground">
                      {new Date(s.updated_at).toLocaleDateString()}
                    </div>
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Format grid */}
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {FORMATS.map((f) => {
            const Icon = f.icon;
            const busy = exportMut.isPending && exportMut.variables?.format === f.format;
            return (
              <motion.button
                key={f.label}
                whileHover={{ y: -3 }}
                onClick={() => download(f.format)}
                disabled={!activeId || exportMut.isPending}
                className="glass rounded-2xl p-4 text-left transition hover:border-primary/40 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="mt-3 text-base font-semibold">{f.label}</div>
                <div className="text-xs text-muted-foreground">{f.desc}</div>
                <div className="mt-3 inline-flex items-center gap-1 text-xs text-primary">
                  {busy ? (
                    <>
                      <Loader2 className="h-3 w-3 animate-spin" /> Preparing…
                    </>
                  ) : (
                    <>
                      <Download className="h-3 w-3" /> Download
                    </>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>

        {!activeId && sessions.isSuccess && list.length > 0 && (
          <p className="mt-4 text-xs text-muted-foreground">Select a chat above to enable export.</p>
        )}
      </div>
    </AppShell>
  );
}
