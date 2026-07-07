import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { z } from "zod";
import { AppShell } from "@/components/layout/AppShell";
import { Message, TypingMessage } from "@/components/chat/Message";
import { ChatInput } from "@/components/chat/ChatInput";
import { RightPanel } from "@/components/chat/RightPanel";
import { SUGGESTIONS, type ChatMessage } from "@/lib/mock-data";
import { Trophy, BookOpen, Globe, LineChart, Sparkles, Loader2, AlertTriangle } from "lucide-react";
import { useSendMessage, useSession } from "@/hooks/useApi";
import type { ApiMessage } from "@/types/api";

const searchSchema = z.object({
  sessionId: z.string().optional(),
});

export const Route = createFileRoute("/")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "AI Chat · AI Business Research Agent" },
      {
        name: "description",
        content:
          "A premium AI workspace with SQL, web-research, and hybrid agents for enterprise business intelligence.",
      },
      { property: "og:title", content: "AI Business Research Agent" },
      {
        property: "og:description",
        content: "Chat with SQL and Web Research agents on your business data.",
      },
    ],
  }),
  component: ChatPage,
});

const ICONS = { trophy: Trophy, book: BookOpen, globe: Globe, chart: LineChart } as const;

function mapApiMessage(m: ApiMessage): ChatMessage {
  return {
    id: m.id,
    role: m.role === "assistant" ? "assistant" : "user",
    content: m.content,
    timestamp: m.timestamp,
    agent: m.agent,
    meta: m.meta
      ? {
          executionTime: m.meta.execution_time,
          confidence: m.meta.confidence,
          toolCalls: m.meta.tool_calls,
          sql: m.meta.sql,
          research: m.meta.research
            ? {
                summary: m.meta.research.summary,
                keyPoints: m.meta.research.key_points,
                sources: m.meta.research.sources,
                searchTime: m.meta.research.search_time,
              }
            : undefined,
          chart: m.meta.chart
            ? {
                type: m.meta.chart.type,
                data: m.meta.chart.data,
                xKey: m.meta.chart.x_key,
                yKey: m.meta.chart.y_key,
              }
            : undefined,
        }
      : undefined,
  };
}

function ChatPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const routeSessionId = search.sessionId ?? null;

  // Local optimistic transcript; hydrated from server session when routeSessionId is set.
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(routeSessionId);
  const bottomRef = useRef<HTMLDivElement>(null);
  const sendMessage = useSendMessage();
  const streaming = sendMessage.isPending;

  const sessionQuery = useSession(routeSessionId);

  // When the URL session changes, reset local state and hydrate from the server.
  useEffect(() => {
    setSessionId(routeSessionId);
    if (!routeSessionId) setMessages([]);
  }, [routeSessionId]);

  useEffect(() => {
    if (sessionQuery.data) {
      setMessages(sessionQuery.data.messages.map(mapApiMessage));
    }
  }, [sessionQuery.data]);

  const lastAssistant = useMemo(
    () => [...messages].reverse().find((m) => m.role === "assistant") ?? null,
    [messages],
  );

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streaming]);

  // Allow other routes (SQL / Research pages) to pre-send a prompt into the chat.
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ text: string }>).detail;
      if (detail?.text) void send(detail.text);
    };
    window.addEventListener("agent:prefill", handler);
    return () => window.removeEventListener("agent:prefill", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  const send = async (text: string) => {
    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      timestamp: new Date().toISOString(),
    };
    setMessages((m) => [...m, userMsg]);

    try {
      const res = await sendMessage.mutateAsync({
        session_id: sessionId ?? undefined,
        message: text,
      });
      if (res.session_id && res.session_id !== sessionId) {
        setSessionId(res.session_id);
        navigate({ to: "/", search: { sessionId: res.session_id }, replace: true });
      }
      setMessages((m) => [...m, mapApiMessage(res.message)]);
    } catch {
      // Toast is emitted by the mutation hook. Keep the user message so they can retry.
    }
  };

  const loadingSession = routeSessionId && sessionQuery.isLoading;
  const sessionError = routeSessionId && sessionQuery.isError;
  const isEmpty = messages.length === 0 && !loadingSession && !sessionError;

  return (
    <AppShell>
      <div className="flex h-[calc(100vh-4rem)] min-w-0">
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex-1 overflow-y-auto">
            <div className="mx-auto w-full max-w-3xl px-4 py-6 md:px-6">
              {loadingSession && <LoadingState />}
              {sessionError && (
                <ErrorState
                  message={sessionQuery.error instanceof Error ? sessionQuery.error.message : "Could not load chat"}
                  onRetry={() => sessionQuery.refetch()}
                />
              )}
              {!loadingSession && !sessionError && isEmpty && <EmptyState onPick={send} />}
              {!loadingSession && !sessionError && !isEmpty && (
                <div className="space-y-5">
                  <AnimatePresence initial={false}>
                    {messages.map((m) => (
                      <Message key={m.id} msg={m} />
                    ))}
                  </AnimatePresence>
                  {streaming && <TypingMessage />}
                  <div ref={bottomRef} />
                </div>
              )}
            </div>
          </div>
          <div className="border-t border-border bg-background/60 backdrop-blur-xl">
            <div className="mx-auto w-full max-w-3xl px-4 py-3 md:px-6">
              <ChatInput onSend={send} streaming={streaming} onStop={() => sendMessage.reset()} />
            </div>
          </div>
        </div>
        <RightPanel message={lastAssistant} />
      </div>
    </AppShell>
  );
}

function LoadingState() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
      <Loader2 className="mb-3 h-6 w-6 animate-spin text-primary" />
      <p className="text-sm text-muted-foreground">Loading conversation…</p>
    </div>
  );
}

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="glass mx-auto flex max-w-md flex-col items-center gap-3 rounded-2xl p-8 text-center">
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-destructive/15 text-destructive">
        <AlertTriangle className="h-5 w-5" />
      </div>
      <div>
        <div className="text-sm font-semibold">Something went wrong</div>
        <div className="mt-1 text-xs text-muted-foreground">{message}</div>
      </div>
      <button
        onClick={onRetry}
        className="rounded-lg border border-border bg-card/60 px-3 py-1.5 text-xs hover:bg-accent"
      >
        Try again
      </button>
    </div>
  );
}

function EmptyState({ onPick }: { onPick: (t: string) => void }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-primary to-primary-glow shadow-[0_0_40px_-8px_var(--color-primary)]"
      >
        <Sparkles className="h-7 w-7 text-primary-foreground" />
        <div className="absolute -inset-3 -z-10 rounded-3xl bg-primary/20 blur-xl" />
      </motion.div>
      <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
        What would you like to research today?
      </h1>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        Ask across your business data or the open web. The router picks the best agent
        automatically — SQL, Web Research, or Hybrid.
      </p>
      <div className="mt-8 grid w-full max-w-2xl grid-cols-1 gap-2 sm:grid-cols-2">
        {SUGGESTIONS.map((s) => {
          const Icon = ICONS[s.icon as keyof typeof ICONS];
          return (
            <motion.button
              key={s.title}
              whileHover={{ y: -2 }}
              onClick={() => onPick(s.title)}
              className="group flex items-center gap-3 rounded-xl border border-border bg-card/60 p-3 text-left transition hover:border-primary/40 hover:bg-card"
            >
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-medium">{s.title}</div>
                <div className="truncate text-[11px] text-muted-foreground">{s.subtitle}</div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
