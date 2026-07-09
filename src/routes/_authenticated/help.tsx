import { createFileRoute } from "@tanstack/react-router";
import { HelpCircle } from "lucide-react";

export const Route = createFileRoute("/_authenticated/help")({
  head: () => ({ meta: [{ title: "Help · AI Business Research Agent" }] }),
  component: HelpPage,
});

function HelpPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-5 px-4 py-6 md:px-6">
      <div className="flex items-center gap-2">
        <HelpCircle className="h-5 w-5 text-primary" />
        <h1 className="text-lg font-semibold">Help</h1>
      </div>

      <Card title="Getting started">
        <ol className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
          <li>Sign in with Google or email/password.</li>
          <li>Use the AI Chat for open questions.</li>
          <li>Use SQL Agent to query your database in plain language.</li>
          <li>Use Web Research for market and competitive intel.</li>
          <li>Save results and export as CSV, Excel, or JSON.</li>
        </ol>
      </Card>

      <Card title="Environment">
        <p className="text-sm text-muted-foreground">
          The frontend calls your FastAPI backend at{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">VITE_API_URL</code>. Supabase is used only for
          authentication (<code className="rounded bg-muted px-1 py-0.5 text-xs">VITE_SUPABASE_URL</code>,{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">VITE_SUPABASE_ANON_KEY</code>).
        </p>
      </Card>

      <Card title="Expected FastAPI endpoints">
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          <li><code>POST /chat</code> — <code>{`{ message, session_id }`}</code></li>
          <li><code>POST /sql</code> — <code>{`{ query }`}</code></li>
          <li><code>POST /research</code> — <code>{`{ topic }`}</code></li>
        </ul>
        <p className="mt-2 text-xs text-muted-foreground">
          Requests include the Supabase JWT as <code>Authorization: Bearer &lt;token&gt;</code> when a user is signed in.
        </p>
      </Card>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur">
      <h2 className="mb-2 font-semibold">{title}</h2>
      {children}
    </div>
  );
}
