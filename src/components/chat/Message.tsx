import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Copy, RefreshCw, ThumbsUp, ThumbsDown, Check } from "lucide-react";
import { useState } from "react";
import type { ChatMessage } from "@/lib/mock-data";
import { AgentBadge } from "./AgentBadge";
import { SqlResult } from "./SqlResult";
import { ResearchResult } from "./ResearchResult";
import { ChartResult } from "./ChartResult";
import { cn } from "@/lib/utils";

function fmtTime(iso: string) {
  return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function Message({ msg }: { msg: ChatMessage }) {
  const [copied, setCopied] = useState(false);
  const isUser = msg.role === "user";

  const copy = async () => {
    await navigator.clipboard.writeText(msg.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={cn("flex w-full gap-3", isUser ? "justify-end" : "justify-start")}
    >
      {!isUser && (
        <div className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-[0_0_18px_-6px_var(--color-primary)]">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M12 3v3m0 12v3M5.6 5.6l2.1 2.1m8.6 8.6 2.1 2.1M3 12h3m12 0h3M5.6 18.4l2.1-2.1m8.6-8.6 2.1-2.1" strokeLinecap="round" />
          </svg>
        </div>
      )}
      <div className={cn("min-w-0 max-w-[85%] md:max-w-[78%]", isUser && "flex flex-col items-end")}>
        {!isUser && msg.agent && (
          <div className="mb-1.5">
            <AgentBadge agent={msg.agent} />
          </div>
        )}
        <div
          className={cn(
            "group relative rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-[0_1px_0_0_rgba(255,255,255,0.02)_inset]",
            isUser
              ? "bg-primary text-primary-foreground"
              : "border border-border bg-card/70 backdrop-blur-xl",
          )}
        >
          <div
            className={cn(
              "prose prose-invert prose-sm max-w-none",
              "prose-p:my-2 prose-strong:text-foreground prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-[12px]",
              isUser && "prose-strong:text-primary-foreground [&_p]:text-primary-foreground",
            )}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
          </div>

          {!isUser && msg.meta?.sql && <SqlResult sql={msg.meta.sql} executionTime={msg.meta.executionTime} />}
          {!isUser && msg.meta?.chart && <ChartResult chart={msg.meta.chart} />}
          {!isUser && msg.meta?.research && <ResearchResult research={msg.meta.research} />}
        </div>

        <div
          className={cn(
            "mt-1.5 flex items-center gap-1 text-[11px] text-muted-foreground",
            isUser ? "flex-row-reverse" : "",
          )}
        >
          <span>{fmtTime(msg.timestamp)}</span>
          {!isUser && (
            <>
              <span className="mx-1 text-border">•</span>
              <button onClick={copy} className="rounded p-1 hover:bg-accent hover:text-foreground">
                {copied ? <Check className="h-3 w-3 text-success" /> : <Copy className="h-3 w-3" />}
              </button>
              <button className="rounded p-1 hover:bg-accent hover:text-foreground">
                <RefreshCw className="h-3 w-3" />
              </button>
              <button className="rounded p-1 hover:bg-accent hover:text-foreground">
                <ThumbsUp className="h-3 w-3" />
              </button>
              <button className="rounded p-1 hover:bg-accent hover:text-foreground">
                <ThumbsDown className="h-3 w-3" />
              </button>
            </>
          )}
        </div>
      </div>
      {isUser && (
        <div className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-card text-[11px] font-semibold text-foreground/80 ring-1 ring-border">
          AK
        </div>
      )}
    </motion.div>
  );
}

export function TypingMessage() {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3">
      <div className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary-glow" />
      <div className="rounded-2xl border border-border bg-card/70 px-4 py-3 backdrop-blur-xl">
        <div className="flex items-center gap-1.5">
          <span className="typing-dot h-1.5 w-1.5 rounded-full bg-primary" />
          <span className="typing-dot h-1.5 w-1.5 rounded-full bg-primary" />
          <span className="typing-dot h-1.5 w-1.5 rounded-full bg-primary" />
          <span className="ml-2 text-xs text-muted-foreground">Thinking…</span>
        </div>
      </div>
    </motion.div>
  );
}
