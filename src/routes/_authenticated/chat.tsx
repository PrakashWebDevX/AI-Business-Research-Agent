import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Send, Loader2, Sparkles, Bookmark } from "lucide-react";
import { chatService } from "@/services/chatService";
import { sessionsService, savedService } from "@/services/sessionsService";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/chat")({
  head: () => ({ meta: [{ title: "AI Chat · AI Business Research Agent" }] }),
  component: ChatPage,
});

interface Msg { role: "user" | "assistant"; content: string; createdAt: string }

function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const sessionId = useRef(crypto.randomUUID());
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  async function send() {
    const q = input.trim();
    if (!q || loading) return;
    setInput("");
    const now = new Date().toISOString();
    setMessages((m) => [...m, { role: "user", content: q, createdAt: now }]);
    setLoading(true);
    try {
      const r = await chatService.ask(q, sessionId.current);

      const reply =
        r.message?.content ??
        r.reply ??
        r.content ??
        (typeof r.data === "string"
          ? r.data
          : JSON.stringify(r.data ?? r, null, 2));
      const at = new Date().toISOString();
      setMessages((m) => {
        const next = [...m, { role: "assistant" as const, content: String(reply), createdAt: at }];
        sessionsService.save({
          id: sessionId.current,
          title: next[0]?.content.slice(0, 60) || "Chat",
          createdAt: now,
          messages: next,
        });
        return next;
      });
    } catch (e) {
      toast.error("Chat failed", { description: (e as Error).message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex h-[calc(100vh-4rem)] max-w-4xl flex-col px-4 md:px-6">
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h1 className="text-lg font-semibold">AI Chat</h1>
        </div>
        {messages.length > 0 && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              savedService.save({
                id: crypto.randomUUID(),
                title: messages[0]?.content.slice(0, 60) || "Chat",
                kind: "chat",
                createdAt: new Date().toISOString(),
                payload: messages,
              });
              toast.success("Saved to reports");
            }}
          >
            <Bookmark className="mr-2 h-4 w-4" /> Save
          </Button>
        )}
      </div>

      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto rounded-2xl border border-border bg-card/40 p-4 backdrop-blur">
        {messages.length === 0 && (
          <div className="grid h-full place-items-center text-center text-sm text-muted-foreground">
            <div>
              <Sparkles className="mx-auto mb-3 h-8 w-8 text-primary/70" />
              Ask anything — business insights, market research, competitor analysis…
            </div>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
            <div
              className={
                "max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm " +
                (m.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-background")
              }
            >
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" /> Thinking…
          </div>
        )}
      </div>

      <div className="flex items-end gap-2 py-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
          rows={2}
          placeholder="Ask a business research question…"
          className="min-h-[52px] flex-1 resize-none rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
        <Button onClick={send} disabled={loading || !input.trim()} className="h-[52px]">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}
