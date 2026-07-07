import type { AgentKind } from "@/lib/mock-data";
import { Database, Globe, Brain } from "lucide-react";
import { cn } from "@/lib/utils";

const CONFIG: Record<AgentKind, { label: string; icon: typeof Database; classes: string; dot: string }> = {
  sql: {
    label: "SQL Agent",
    icon: Database,
    classes: "border-success/30 bg-success/10 text-success",
    dot: "bg-success shadow-[0_0_8px_var(--color-success)]",
  },
  web: {
    label: "Web Research Agent",
    icon: Globe,
    classes: "border-primary/30 bg-primary/10 text-primary",
    dot: "bg-primary shadow-[0_0_8px_var(--color-primary)]",
  },
  hybrid: {
    label: "Hybrid Agent",
    icon: Brain,
    classes: "border-warning/30 bg-warning/10 text-warning",
    dot: "bg-warning shadow-[0_0_8px_var(--color-warning)]",
  },
};

export function AgentBadge({ agent, className }: { agent: AgentKind; className?: string }) {
  const cfg = CONFIG[agent];
  const Icon = cfg.icon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium",
        cfg.classes,
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", cfg.dot)} />
      <Icon className="h-3 w-3" />
      {cfg.label}
    </span>
  );
}
