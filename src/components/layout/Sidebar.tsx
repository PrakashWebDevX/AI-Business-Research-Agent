import { Link, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  LayoutDashboard,
  MessageSquare,
  Database,
  Globe,
  BarChart3,
  Bookmark,
  Download,
  Settings,
  HelpCircle,
  Sparkles,
  ChevronsLeft,
  ChevronsRight,
  Trash2,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSessions, useDeleteSession } from "@/hooks/useApi";

interface Props {
  collapsed: boolean;
  onToggle: () => void;
}

const NAV = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/", label: "AI Chat", icon: MessageSquare },
  { to: "/sql", label: "SQL Queries", icon: Database },
  { to: "/research", label: "Research", icon: Globe },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/saved", label: "Saved Chats", icon: Bookmark },
  { to: "/exports", label: "Exports", icon: Download },
  { to: "/settings", label: "Settings", icon: Settings },
  { to: "/help", label: "Help", icon: HelpCircle },
] as const;

export function Sidebar({ collapsed, onToggle }: Props) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const sessions = useSessions();
  const del = useDeleteSession();
  const recent = (sessions.data ?? []).slice(0, 8);

  return (
    <motion.aside
      animate={{ width: collapsed ? 76 : 260 }}
      transition={{ type: "spring", stiffness: 220, damping: 28 }}
      className="relative z-20 hidden shrink-0 border-r border-sidebar-border bg-sidebar/70 backdrop-blur-xl md:flex md:flex-col"
    >
      <div className="flex items-center gap-2 px-4 pt-5 pb-4">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary-glow shadow-[0_0_24px_-4px_var(--color-primary)]">
          <Sparkles className="h-4 w-4 text-primary-foreground" />
        </div>
        <AnimatePresence initial={false}>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -6 }}
              className="min-w-0"
            >
              <div className="truncate text-sm font-semibold leading-tight">AI Business</div>
              <div className="truncate text-[11px] text-muted-foreground">Research Agent</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="px-3">
        <Link
          to="/"
          className={cn(
            "group flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-3 py-2.5 text-sm font-medium text-foreground transition-all hover:bg-primary/20 hover:shadow-[0_0_20px_-4px_var(--color-primary)]",
            collapsed && "justify-center px-2",
          )}
        >
          <Plus className="h-4 w-4 text-primary" />
          {!collapsed && <span>New Chat</span>}
        </Link>
      </div>

      <nav className="mt-5 flex-1 space-y-0.5 overflow-y-auto px-2">
        {NAV.map((item) => {
          const Icon = item.icon;
          const active =
            item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
                active
                  ? "bg-sidebar-accent text-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground",
                collapsed && "justify-center px-2",
              )}
            >
              {active && (
                <motion.span
                  layoutId="sidebar-active"
                  className="absolute inset-y-1 left-0 w-0.5 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <Icon className={cn("h-4 w-4 shrink-0", active && "text-primary")} />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}

        {!collapsed && (
          <div className="mt-4 border-t border-sidebar-border pt-3">
            <div className="mb-1 flex items-center justify-between px-2">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Recent chats
              </span>
              {sessions.isFetching && <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />}
            </div>
            {sessions.isError && (
              <div className="px-2 py-1 text-[11px] text-destructive">Couldn't load chats</div>
            )}
            {sessions.isSuccess && recent.length === 0 && (
              <div className="px-2 py-1 text-[11px] text-muted-foreground">No chats yet</div>
            )}
            <ul className="space-y-0.5">
              {recent.map((s) => (
                <li key={s.id} className="group flex items-center">
                  <Link
                    to="/"
                    search={{ sessionId: s.id }}
                    className="flex min-w-0 flex-1 items-center gap-2 rounded-md px-2 py-1.5 text-xs text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground"
                    title={s.title}
                  >
                    <MessageSquare className="h-3 w-3 shrink-0 opacity-60" />
                    <span className="truncate">{s.title}</span>
                  </Link>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      if (confirm(`Delete "${s.title}"?`)) del.mutate(s.id);
                    }}
                    className="grid h-6 w-6 place-items-center rounded text-muted-foreground opacity-0 transition hover:bg-destructive/20 hover:text-destructive group-hover:opacity-100"
                    aria-label="Delete chat"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      <div className="border-t border-sidebar-border p-3">
        {!collapsed ? (
          <div className="rounded-xl border border-border/70 bg-card/60 p-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Model</span>
              <span className="font-medium">gemini-1.5-pro</span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-muted-foreground">Storage</span>
              <span className="font-medium">64% used</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
              <div className="h-full w-[64%] rounded-full bg-gradient-to-r from-primary to-primary-glow" />
            </div>
            <div className="mt-2 flex items-center justify-between text-[10px] text-muted-foreground">
              <span>v1.4.0</span>
              <span className="inline-flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                Connected
              </span>
            </div>
          </div>
        ) : (
          <div className="grid h-9 place-items-center rounded-xl bg-card/60 text-[10px] text-muted-foreground">
            v1.4
          </div>
        )}

        <button
          onClick={onToggle}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg py-2 text-xs text-muted-foreground transition hover:bg-sidebar-accent/60 hover:text-foreground"
        >
          {collapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </motion.aside>
  );
}
