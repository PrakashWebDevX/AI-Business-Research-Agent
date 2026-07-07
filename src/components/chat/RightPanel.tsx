import type { ChatMessage } from "@/lib/mock-data";
import { AgentBadge } from "./AgentBadge";
import {
  Clock,
  Cpu,
  Gauge,
  FileDown,
  FileSpreadsheet,
  FileJson,
  FileText,
  Wrench,
  Link as LinkIcon,
} from "lucide-react";
import { motion } from "framer-motion";

export function RightPanel({ message }: { message: ChatMessage | null }) {
  const meta = message?.meta;
  const agent = message?.agent;

  return (
    <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-[340px] shrink-0 border-l border-border bg-background/40 backdrop-blur-xl lg:block">
      <div className="flex h-full flex-col overflow-y-auto p-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Response Inspector
          </div>
          {agent && <AgentBadge agent={agent} />}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <MetaCard icon={Clock} label="Execution" value={meta?.executionTime ?? "—"} />
          <MetaCard
            icon={Gauge}
            label="Confidence"
            value={meta?.confidence ? `${Math.round(meta.confidence * 100)}%` : "—"}
            tone="success"
          />
          <MetaCard icon={Cpu} label="Model" value="gemini-1.5-pro" />
          <MetaCard
            icon={Wrench}
            label="Tool calls"
            value={meta?.toolCalls?.length?.toString() ?? "0"}
          />
        </div>

        {meta?.toolCalls?.length ? (
          <div className="mt-4">
            <div className="mb-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              Tool trace
            </div>
            <div className="space-y-1.5">
              {meta.toolCalls.map((t, i) => (
                <motion.div
                  key={t}
                  initial={{ opacity: 0, x: 6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-2 rounded-lg border border-border bg-card/60 px-2.5 py-1.5 text-[11px] font-mono"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--color-primary)]" />
                  {t}
                  <span className="ml-auto text-muted-foreground">ok</span>
                </motion.div>
              ))}
            </div>
          </div>
        ) : null}

        {meta?.sql && (
          <div className="mt-4">
            <div className="mb-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              Generated SQL
            </div>
            <pre className="max-h-40 overflow-auto rounded-lg border border-border bg-background/60 p-2 font-mono text-[11px] leading-relaxed text-foreground/80">
              {meta.sql.query}
            </pre>
            <div className="mt-1.5 grid grid-cols-2 gap-1.5 text-[10px] text-muted-foreground">
              <div className="rounded-md border border-border bg-card/60 px-2 py-1">
                <div className="uppercase tracking-wide">Database</div>
                <div className="font-mono text-foreground/80">{meta.sql.database}</div>
              </div>
              <div className="rounded-md border border-border bg-card/60 px-2 py-1">
                <div className="uppercase tracking-wide">Rows</div>
                <div className="font-mono text-foreground/80">{meta.sql.rows}</div>
              </div>
            </div>
          </div>
        )}

        {meta?.research && (
          <div className="mt-4">
            <div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              <LinkIcon className="h-3 w-3" /> Visited websites
            </div>
            <div className="space-y-1">
              {meta.research.sources.map((s) => (
                <a
                  key={s.url}
                  href={s.url}
                  className="block truncate rounded-lg border border-border bg-card/60 px-2.5 py-1.5 text-[11px] text-foreground/85 hover:border-primary/40 hover:bg-card"
                >
                  {s.title}
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="mt-auto pt-4">
          <div className="mb-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            Export response
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {[
              { icon: FileSpreadsheet, label: "CSV" },
              { icon: FileDown, label: "Excel" },
              { icon: FileJson, label: "JSON" },
              { icon: FileText, label: "PDF" },
            ].map((b) => {
              const Icon = b.icon;
              return (
                <button
                  key={b.label}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border bg-card/60 px-2 py-1.5 text-[11px] font-medium text-foreground/85 transition hover:border-primary/40 hover:bg-card"
                >
                  <Icon className="h-3.5 w-3.5 text-primary" />
                  {b.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}

function MetaCard({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: typeof Clock;
  label: string;
  value: string;
  tone?: "success";
}) {
  return (
    <div className="rounded-xl border border-border bg-card/60 p-2.5">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-muted-foreground">
        <Icon className="h-3 w-3" /> {label}
      </div>
      <div className={`mt-1 text-sm font-semibold ${tone === "success" ? "text-success" : ""}`}>
        {value}
      </div>
    </div>
  );
}
