import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MessageSquare, Database, Globe, BarChart3, Bookmark, Download, Sparkles } from "lucide-react";
import { API_URL, isApiConfigured } from "@/lib/api";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard · AI Business Research Agent" }] }),
  component: DashboardPage,
});

const TILES = [
  { to: "/chat", title: "AI Chat", desc: "Ask questions and get grounded answers.", icon: MessageSquare },
  { to: "/sql", title: "SQL Agent", desc: "Query your database in natural language.", icon: Database },
  { to: "/research", title: "Web Research", desc: "Deep research across the web.", icon: Globe },
  { to: "/analytics", title: "Analytics", desc: "Usage and performance insights.", icon: BarChart3 },
  { to: "/saved", title: "Saved Reports", desc: "Revisit reports you've bookmarked.", icon: Bookmark },
  { to: "/exports", title: "Exports", desc: "Download data as CSV, Excel, or JSON.", icon: Download },
] as const;

function DashboardPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-10">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="mb-8 flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-lg">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">AI Business Research Agent</h1>
            <p className="text-sm text-muted-foreground">
              Chat, query, and research — powered by your FastAPI backend.
            </p>
          </div>
        </div>

        {!isApiConfigured && (
          <div className="mb-6 rounded-xl border border-yellow-500/40 bg-yellow-500/10 p-4 text-sm">
            <strong>VITE_API_URL is not set.</strong> Add it to your environment to connect to your FastAPI backend on
            Railway.
          </div>
        )}
        {isApiConfigured && (
          <div className="mb-6 rounded-xl border border-border bg-card/60 p-4 text-xs text-muted-foreground">
            Backend: <code className="text-foreground">{API_URL}</code>
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TILES.map((t, i) => {
            const Icon = t.icon;
            return (
              <motion.div
                key={t.to}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={t.to}
                  className="group block rounded-2xl border border-border bg-card/60 p-5 backdrop-blur transition hover:border-primary/50 hover:bg-card"
                >
                  <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="text-base font-semibold">{t.title}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{t.desc}</div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
