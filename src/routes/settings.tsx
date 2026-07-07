import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Key, Copy, Check } from "lucide-react";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings · AI Business Research Agent" },
      { name: "description", content: "Configure providers, databases, keys, and export defaults." },
    ],
  }),
  component: SettingsPage,
});

const PROVIDERS = [
  { id: "groq", label: "Groq", desc: "Ultra-low latency inference" },
  { id: "gemini", label: "Gemini", desc: "Google's multimodal models" },
  { id: "openai", label: "OpenAI", desc: "GPT-class general purpose" },
];

const DATABASES = [
  { id: "sqlite", label: "SQLite" },
  { id: "mysql", label: "MySQL" },
  { id: "postgres", label: "PostgreSQL" },
];

function SettingsPage() {
  const [provider, setProvider] = useState("gemini");
  const [database, setDatabase] = useState("postgres");
  const [copied, setCopied] = useState(false);
  const key = "sk-ai-••••••••••••••••3f9a";

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-4xl px-4 py-8 md:px-8">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Tune providers, storage, and defaults.</p>

        <Section title="General">
          <Row label="Theme" hint="Interface color scheme">
            <div className="inline-flex rounded-xl border border-border bg-background/60 p-0.5 text-xs">
              {["Dark", "Light", "System"].map((t, i) => (
                <button
                  key={t}
                  className={`rounded-lg px-3 py-1.5 ${i === 0 ? "bg-primary text-primary-foreground shadow-[0_0_16px_-6px_var(--color-primary)]" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </Row>
          <Row label="Workspace name">
            <input
              defaultValue="Alex Kim · Research"
              className="w-64 rounded-xl border border-border bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary/60"
            />
          </Row>
        </Section>

        <Section title="LLM Provider">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {PROVIDERS.map((p) => (
              <motion.button
                key={p.id}
                whileHover={{ y: -2 }}
                onClick={() => setProvider(p.id)}
                className={`rounded-xl border p-3 text-left transition ${
                  provider === p.id
                    ? "border-primary/60 bg-primary/10 shadow-[0_0_20px_-8px_var(--color-primary)]"
                    : "border-border bg-card/60 hover:bg-card"
                }`}
              >
                <div className="text-sm font-medium">{p.label}</div>
                <div className="text-[11px] text-muted-foreground">{p.desc}</div>
              </motion.button>
            ))}
          </div>
        </Section>

        <Section title="Database">
          <div className="flex flex-wrap gap-2">
            {DATABASES.map((d) => (
              <button
                key={d.id}
                onClick={() => setDatabase(d.id)}
                className={`rounded-xl border px-3 py-1.5 text-sm ${
                  database === d.id
                    ? "border-primary/60 bg-primary/10 text-foreground"
                    : "border-border bg-card/60 text-muted-foreground hover:text-foreground"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </Section>

        <Section title="API Keys">
          <Row label="Primary key" hint="Rotated 3 days ago">
            <div className="inline-flex items-center gap-2 rounded-xl border border-border bg-background/60 px-3 py-2 font-mono text-xs">
              <Key className="h-3.5 w-3.5 text-primary" />
              {key}
              <button
                onClick={() => {
                  navigator.clipboard.writeText(key);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1200);
                }}
                className="ml-2 text-muted-foreground hover:text-foreground"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
          </Row>
        </Section>

        <Section title="Export defaults">
          <Row label="Default format">
            <select className="rounded-xl border border-border bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary/60">
              <option>CSV</option>
              <option>Excel</option>
              <option>JSON</option>
              <option>PDF</option>
            </select>
          </Row>
        </Section>

        <div className="mt-6 rounded-2xl border border-destructive/30 bg-destructive/5 p-4">
          <div className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-4 w-4" />
            <div className="text-sm font-semibold">Danger zone</div>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Permanently delete this workspace and all associated conversations, exports, and API keys.
          </p>
          <button className="mt-3 rounded-xl border border-destructive/40 bg-destructive/10 px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/20">
            Delete workspace
          </button>
        </div>
      </div>
    </AppShell>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-6">
      <div className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </div>
      <div className="glass rounded-2xl p-4">{children}</div>
    </div>
  );
}

function Row({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 py-3 last:border-0 last:pb-0 first:pt-0">
      <div>
        <div className="text-sm font-medium">{label}</div>
        {hint && <div className="text-[11px] text-muted-foreground">{hint}</div>}
      </div>
      {children}
    </div>
  );
}
