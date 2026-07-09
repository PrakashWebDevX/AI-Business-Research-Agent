import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Globe, Loader2, Search, Bookmark } from "lucide-react";
import { chatService } from "@/services/chatService";
import { savedService } from "@/services/sessionsService";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/research")({
  head: () => ({ meta: [{ title: "Web Research · AI Business Research Agent" }] }),
  component: ResearchPage,
});

const SUGGESTIONS = [
  "Latest funding rounds in the fintech sector this quarter",
  "Top competitors of Notion and their differentiators",
  "Emerging trends in B2B SaaS pricing in 2026",
];

function ResearchPage() {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [reply, setReply] = useState<string>("");

  async function run(q?: string) {
    const prompt = (q ?? topic).trim();
    if (!prompt) return;
    setTopic(prompt);
    setLoading(true);
    try {
      const r = await chatService.send(prompt);
      const text = r.message.content;
      setReply(String(text));
    } catch (e) {
      toast.error("Research failed", { description: (e as Error).message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-4 px-4 py-6 md:px-6">
      <div className="flex items-center gap-2">
        <Globe className="h-5 w-5 text-primary" />
        <h1 className="text-lg font-semibold">Web Research Agent</h1>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && run()}
            placeholder="Topic, company, market, trend…"
            className="h-11 w-full rounded-xl border border-input bg-background pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <Button onClick={() => run()} disabled={loading || !topic.trim()} className="h-11">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Research"}
        </Button>
      </div>

      {!reply && !loading && (
        <div className="flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => run(s)}
              className="rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs text-muted-foreground hover:border-primary/50 hover:text-foreground"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {reply && (
        <div className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="font-semibold">Result</h2>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                savedService.save({
                  id: crypto.randomUUID(),
                  title: topic,
                  kind: "research",
                  createdAt: new Date().toISOString(),
                  payload: { topic, reply },
                });
                toast.success("Saved");
              }}
            >
              <Bookmark className="mr-2 h-4 w-4" /> Save
            </Button>
          </div>
          <p className="whitespace-pre-wrap text-sm text-muted-foreground">{reply}</p>
        </div>
      )}
    </div>
  );
}
