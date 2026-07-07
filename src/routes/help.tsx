import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { LifeBuoy, BookOpen, Keyboard, Mail } from "lucide-react";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Help · AI Business Research Agent" },
      { name: "description", content: "Docs, shortcuts, and support for the AI Business Research Agent." },
    ],
  }),
  component: HelpPage,
});

const items = [
  { icon: BookOpen, title: "Documentation", desc: "Learn how to connect your data and configure agents." },
  { icon: Keyboard, title: "Keyboard shortcuts", desc: "Move faster with hotkeys — press ⌘K to search." },
  { icon: LifeBuoy, title: "Community", desc: "Ask questions and share workflows with other teams." },
  { icon: Mail, title: "Contact support", desc: "Get in touch with our team for account and billing help." },
];

function HelpPage() {
  return (
    <AppShell>
      <div className="mx-auto w-full max-w-4xl px-4 py-8 md:px-8">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Help & docs</h1>
        <p className="mt-1 text-sm text-muted-foreground">Everything you need to get productive.</p>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {items.map((i) => {
            const Icon = i.icon;
            return (
              <a
                key={i.title}
                href="#"
                className="glass group flex items-start gap-3 rounded-2xl p-4 transition hover:border-primary/40"
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold">{i.title}</div>
                  <div className="text-xs text-muted-foreground">{i.desc}</div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
