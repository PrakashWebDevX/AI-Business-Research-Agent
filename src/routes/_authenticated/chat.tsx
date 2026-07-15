import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, Sparkles, Bookmark, Database, Globe, FileText } from "lucide-react";
import { chatService, type ChatMessage } from "@/services/chatService";
import { sessionsService, savedService } from "@/services/sessionsService";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { MessageBubble } from "@/components/chat/MessageBubble";
import { TypingDots } from "@/components/chat/TypingDots";

export const Route = createFileRoute("/_authenticated/chat")({
  head: () => ({ meta: [{ title: "AI Chat · AI Business Research Agent" }] }),
  component: ChatPage,
});

type Msg =
  | { role: "user"; content: string; createdAt: string }
  | { role: "assistant"; content: string; createdAt: string; meta?: Partial<ChatMessage> };

const EXAMPLES: Array<{ icon: typeof Database; text: string; hint: string }> = [
  { icon: Database, text: "Show highest paid employees", hint: "SQL" },
  { icon: Globe, text: "Latest AI news this week", hint: "Web" },
  { icon: FileText, text: "What does my uploaded document say about my skills?", hint: "Docs" },
];

function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const sessionId = useRef(crypto.randomUUID());
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function send(prompt?: string) {
    const q = (prompt ?? input).trim();
    if (!q || loading) return;
    setInput("");
    const now = new Date().toISOString();
    setMessages((m) => [...m, { role: "user", content: q, createdAt: now }]);
    setLoading(true);
    try {
      const r = await chatService.ask(q, sessionId.current);
      if (r.session_id) sessionId.current = r.session_id as ReturnType<typeof crypto.randomUUID>;
      const reply = r.message?.content ?? "";
      const at = new Date().toISOString();
      setMessages((m) => {
        const next: Msg[] = [
          ...m,
          { role: "assistant", content: String(reply), createdAt: at, meta: r.message },
        ];
        sessionsService.save({
          id: sessionId.current,
          title: next[0]?.content.slice(0, 60) || "Chat",
          createdAt: now,
          messages: next.map((x) => ({ role: x.role, content: x.content, createdAt: x.createdAt })),
        });
        return next;
      });
    } catch (e) {
      console.error("Chat failed:", e);
      toast.error("Chat failed", { description: (e as Error).message || "Unknown error" });
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  const empty = messages.length === 0 && !loading;

  return (
    <div className="mx-auto flex h-[calc(100vh-4rem)] max-w-4xl flex-col px-4 md:px-6">
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-[#3B82F6]" />
          <h1 className="text-lg font-semibold tracking-tight">AI Chat</h1>
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

      <div
        ref={scrollRef}
        className="flex-1 space-y-4 overflow-y-auto rounded-2xl border border-border bg-[#1E293B]/40 p-4 backdrop-blur"
      >
        {empty ? (
          <div className="grid h-full place-items-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-xl text-center"
            >
              <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[#3B82F6] to-[#22C55E] text-white shadow-lg shadow-[#3B82F6]/30">
                <Sparkles className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">Ask Anything</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Query your database, search the web, or ask about your uploaded documents.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {EXAMPLES.map((ex) => {
                  const Icon = ex.icon;
                  return (
                    <button
                      key={ex.text}
                      onClick={() => send(ex.text)}
                      className="group inline-flex items-center gap-2 rounded-full border border-border bg-[#1E293B] px-3.5 py-1.5 text-xs text-muted-foreground transition hover:border-[#3B82F6]/60 hover:text-foreground"
                    >
                      <Icon className="h-3.5 w-3.5 text-[#3B82F6]" />
                      {ex.text}
                      <span className="rounded-full bg-[#3B82F6]/15 px-1.5 py-0.5 text-[10px] font-medium text-[#3B82F6]">
                        {ex.hint}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {messages.map((m, i) => (
              <MessageBubble
                key={i}
                role={m.role}
                content={m.content}
                message={m.role === "assistant" ? m.meta : null}
              />
            ))}
          </AnimatePresence>
        )}
        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex">
            <TypingDots />
          </motion.div>
        )}
      </div>

      <div className="flex items-end gap-2 py-4">
        <textarea
          ref={inputRef}
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
          className="min-h-[52px] flex-1 resize-none rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#3B82F6]"
        />
        <Button
          onClick={() => send()}
          disabled={loading || !input.trim()}
          className="h-[52px] bg-[#3B82F6] hover:bg-[#3B82F6]/90"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}
