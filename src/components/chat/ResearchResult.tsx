import type { MessageMeta } from "@/lib/mock-data";
import { ExternalLink, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function ResearchResult({ research }: { research: NonNullable<MessageMeta["research"]> }) {
  return (
    <div className="mt-3 space-y-3">
      <div className="rounded-xl border border-border bg-background/40 p-4">
        <div className="mb-2 flex items-center gap-2 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          <Sparkles className="h-3 w-3 text-primary" /> Synthesis
        </div>
        <p className="text-sm leading-relaxed text-foreground/90">{research.summary}</p>
        <ul className="mt-3 space-y-1.5 text-sm">
          {research.keyPoints.map((k, i) => (
            <li key={i} className="flex items-start gap-2 text-foreground/85">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
              {k}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div className="mb-2 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          Sources · {research.sources.length}
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {research.sources.map((s, i) => (
            <motion.a
              key={i}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -2 }}
              className="group flex items-start gap-3 rounded-xl border border-border bg-background/40 p-3 transition hover:border-primary/50 hover:bg-card"
            >
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 text-primary">
                <Sparkles className="h-3.5 w-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <div className="truncate text-xs font-medium text-foreground">{s.title}</div>
                  <ExternalLink className="h-3 w-3 shrink-0 text-muted-foreground opacity-0 transition group-hover:opacity-100" />
                </div>
                <div className="mt-0.5 line-clamp-2 text-[11px] text-muted-foreground">
                  {s.snippet}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}
