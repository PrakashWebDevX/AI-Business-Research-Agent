import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Paperclip, Mic, Send, Square, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  onSend: (text: string) => void;
  streaming?: boolean;
  onStop?: () => void;
}

export function ChatInput({ onSend, streaming, onStop }: Props) {
  const [value, setValue] = useState("");

  const submit = (e?: FormEvent) => {
    e?.preventDefault();
    const v = value.trim();
    if (!v || streaming) return;
    onSend(v);
    setValue("");
  };

  return (
    <form
      onSubmit={submit}
      className="glass relative rounded-2xl p-2 shadow-[0_10px_40px_-20px_var(--color-primary)]"
    >
      <div className="flex items-end gap-2">
        <button
          type="button"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-muted-foreground transition hover:bg-accent hover:text-foreground"
          aria-label="Attach"
        >
          <Paperclip className="h-4 w-4" />
        </button>

        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
          rows={1}
          placeholder="Ask anything about your business or research…"
          className="max-h-40 min-h-[40px] flex-1 resize-none bg-transparent px-2 py-2 text-sm outline-none placeholder:text-muted-foreground"
        />

        {value && (
          <button
            type="button"
            onClick={() => setValue("")}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-muted-foreground transition hover:bg-accent hover:text-foreground"
            aria-label="Clear"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        <button
          type="button"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-muted-foreground transition hover:bg-accent hover:text-foreground"
          aria-label="Voice"
        >
          <Mic className="h-4 w-4" />
        </button>

        {streaming ? (
          <motion.button
            type="button"
            onClick={onStop}
            whileTap={{ scale: 0.94 }}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-destructive text-destructive-foreground shadow-[0_0_16px_-4px_var(--color-destructive)]"
            aria-label="Stop"
          >
            <Square className="h-3.5 w-3.5 fill-current" />
          </motion.button>
        ) : (
          <motion.button
            type="submit"
            whileTap={{ scale: 0.94 }}
            disabled={!value.trim()}
            className={cn(
              "grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-[0_0_16px_-4px_var(--color-primary)] transition",
              !value.trim() && "opacity-50",
            )}
            aria-label="Send"
          >
            <Send className="h-4 w-4" />
          </motion.button>
        )}
      </div>

      <div className="mt-1 flex items-center justify-between px-2 pb-1 pt-0.5 text-[10px] text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <Sparkles className="h-3 w-3 text-primary" />
          Auto-selects the best agent
        </span>
        <span>
          <kbd className="rounded border border-border bg-background px-1 py-0.5">⏎</kbd> send ·{" "}
          <kbd className="rounded border border-border bg-background px-1 py-0.5">⇧⏎</kbd> newline
        </span>
      </div>
    </form>
  );
}
