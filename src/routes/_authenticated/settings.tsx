import { createFileRoute } from "@tanstack/react-router";
import { Settings as SettingsIcon, Trash2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import { API_URL, isApiConfigured } from "@/lib/api";
import { sessionsService } from "@/services/sessionsService";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/settings")({
  head: () => ({ meta: [{ title: "Settings · AI Business Research Agent" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const { user } = useAuth();
  const { theme, toggle } = useTheme();
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-6 md:px-6">
      <div className="flex items-center gap-2">
        <SettingsIcon className="h-5 w-5 text-primary" />
        <h1 className="text-lg font-semibold">Settings</h1>
      </div>

      <Section title="Account">
        <Row label="Email" value={user?.email ?? "—"} />
        <Row label="User ID" value={user?.id ?? "—"} mono />
      </Section>

      <Section title="Appearance">
        <div className="flex items-center justify-between">
          <div className="text-sm">Theme: <span className="font-medium capitalize">{theme}</span></div>
          <Button size="sm" variant="outline" onClick={toggle}>Toggle</Button>
        </div>
      </Section>

      <Section title="Backend">
        <Row label="VITE_API_URL" value={isApiConfigured ? API_URL : "Not configured"} mono />
      </Section>

      <Section title="Data">
        <Button
          variant="outline"
          onClick={async () => {
            const all = await sessionsService.list();
            await Promise.all(all.map((s) => sessionsService.remove(s.id)));
            toast.success("Chat history cleared");
          }}
        >
          <Trash2 className="mr-2 h-4 w-4" /> Clear chat history
        </Button>
      </Section>

    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur">
      <h2 className="mb-3 font-semibold">{title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className={"truncate " + (mono ? "font-mono text-xs" : "")}>{value}</span>
    </div>
  );
}
