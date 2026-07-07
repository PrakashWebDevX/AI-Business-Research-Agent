import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Globe, Search } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Research · AI Business Research Agent" },
      { name: "description", content: "Live web research with cited sources and synthesis." },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const submit = () => {
    const prompt = q.trim() || "Research this topic on the open web";
    navigate({ to: "/", search: { sessionId: undefined } });
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("agent:prefill", { detail: { text: prompt } }));
    }, 0);
  };

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-5xl px-4 py-8 md:px-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Research</h1>
            <p className="text-sm text-muted-foreground">Cited synthesis across the open web.</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary">
            <Globe className="h-3 w-3" /> Web crawler
          </span>
        </div>

        <div className="glass rounded-2xl p-3">
          <label className="flex items-center gap-2">
            <Search className="ml-2 h-4 w-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              placeholder="Research a topic — e.g. 'Latest AI regulation in the EU'"
              className="flex-1 rounded-xl border border-border bg-background/60 px-3 py-2.5 text-sm outline-none focus:border-primary/60"
            />
            <button
              onClick={submit}
              className="rounded-xl bg-gradient-to-br from-primary to-primary-glow px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-[0_0_16px_-4px_var(--color-primary)]"
            >
              Research
            </button>
          </label>
          <p className="mt-3 px-1 text-[11px] text-muted-foreground">
            Results appear in a new chat, powered by your backend.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
