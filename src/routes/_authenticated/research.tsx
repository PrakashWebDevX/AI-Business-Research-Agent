import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Globe, Loader2, Search, Bookmark } from "lucide-react";
import { chatService, type ChatResponse } from "@/services/chatService";
import { savedService } from "@/services/sessionsService";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { MessageBubble } from "@/components/chat/MessageBubble";
import { TypingDots } from "@/components/chat/TypingDots";

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
  const [result, setResult] = useState<ChatResponse | null>(null);

  async function run(q?: string) {
    const prompt = (q ?? topic).trim();
    if (!prompt) return;
    setTopic(prompt);
    setLoading(true);
    try {
      const r = await chatService.send(prompt);
      setResult(r);
    } catch (e) {
      console.error("Research failed:", e);
      toast.error("Research failed", { description: (e as Error).message || "Unknown error" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-4 px-4 py-6 md:px-6">
      <div className="flex items-center gap-2">
        <Globe className="h-5 w-5 text-[#3B82F6]" />
        <h1 className="text-lg font-semibold tracking-tight">Web Research Agent</h1>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && run()}
            placeholder="Topic, company, market, trend…"
            className="h-11 w-full rounded-xl border border-input bg-background pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-[#3B82F6]"
          />
        </div>
        <Button
          onClick={() => run()}
          disabled={loading || !topic.trim()}
          className="h-11 bg-[#3B82F6] hover:bg-[#3B82F6]/90"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Research"}
        </Button>
      </div>

      {!result && !loading && (
        <div className="flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => run(s)}
              className="rounded-full border border-border bg-[#1E293B] px-3 py-1.5 text-xs text-muted-foreground hover:border-[#3B82F6]/50 hover:text-foreground"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {loading && <TypingDots label="Researching" />}

      {result && (
        <div className="space-y-3">
          <div className="flex justify-end">
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                savedService.save({
                  id: crypto.randomUUID(),
                  title: topic,
                  kind: "research",
                  createdAt: new Date().toISOString(),
                  payload: { topic, result },
                });
                toast.success("Saved");
              }}
            >
              <Bookmark className="mr-2 h-4 w-4" /> Save
            </Button>
          </div>
          <MessageBubble
            role="assistant"
            content={result.message?.content ?? ""}
            message={result.message}
          />
        </div>
      )}
    </div>
  );
}
