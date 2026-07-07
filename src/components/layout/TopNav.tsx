import { Bell, Search, Sun, Moon, ChevronDown, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Props {
  onMenu?: () => void;
}

export function TopNav({ onMenu }: Props) {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.remove("light");
    } else {
      root.classList.add("light");
    }
  }, [dark]);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border/70 bg-background/70 px-4 backdrop-blur-xl md:px-6">
      <button
        onClick={onMenu}
        className="grid h-9 w-9 place-items-center rounded-lg text-muted-foreground hover:bg-accent md:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="hidden items-center gap-2 md:flex">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-success/30 bg-success/10 px-2.5 py-1 text-[11px] font-medium text-success">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
          </span>
          Connected
        </span>
        <button className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card/70 px-2.5 py-1 text-xs text-foreground/90 transition hover:bg-accent">
          <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--color-primary)]" />
          gemini-1.5-pro
          <ChevronDown className="h-3 w-3 opacity-60" />
        </button>
      </div>

      <div className="mx-auto hidden max-w-md flex-1 md:block">
        <label className="group relative flex items-center">
          <Search className="pointer-events-none absolute left-3 h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Search chats, queries, sources…"
            className="w-full rounded-xl border border-border bg-card/60 py-2 pl-9 pr-16 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary/60 focus:bg-card focus:shadow-[0_0_0_4px_color-mix(in_oklab,var(--primary)_15%,transparent)]"
          />
          <kbd className="pointer-events-none absolute right-2.5 hidden rounded-md border border-border bg-background px-1.5 py-0.5 text-[10px] text-muted-foreground md:inline-block">
            ⌘K
          </kbd>
        </label>
      </div>

      <div className="ml-auto flex items-center gap-1.5">
        <button
          onClick={() => setDark((v) => !v)}
          className="grid h-9 w-9 place-items-center rounded-lg text-muted-foreground transition hover:bg-accent hover:text-foreground"
          aria-label="Toggle theme"
        >
          <motion.span
            key={dark ? "moon" : "sun"}
            initial={{ rotate: -30, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            className="grid place-items-center"
          >
            {dark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </motion.span>
        </button>
        <button className="relative grid h-9 w-9 place-items-center rounded-lg text-muted-foreground transition hover:bg-accent hover:text-foreground">
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--color-primary)]" />
        </button>
        <div className="ml-1 flex items-center gap-2 rounded-full border border-border bg-card/70 py-1 pl-1 pr-3">
          <div className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-primary to-primary-glow text-[11px] font-semibold text-primary-foreground">
            AK
          </div>
          <span className="hidden text-xs text-foreground/90 sm:inline">Alex Kim</span>
        </div>
      </div>
    </header>
  );
}
