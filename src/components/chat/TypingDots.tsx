export function TypingDots({ label = "Thinking" }: { label?: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-2xl border border-border bg-card/60 px-4 py-2.5 text-sm text-muted-foreground">
      <span>{label}</span>
      <span className="inline-flex gap-1">
        <span className="typing-dot h-1.5 w-1.5 rounded-full bg-primary" />
        <span className="typing-dot h-1.5 w-1.5 rounded-full bg-primary" />
        <span className="typing-dot h-1.5 w-1.5 rounded-full bg-primary" />
      </span>
    </div>
  );
}
