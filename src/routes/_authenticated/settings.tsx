import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Moon, Sun, LogOut, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import { authService } from "@/services/authService";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/settings")({
  head: () => ({ meta: [{ title: "Settings · EMS" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 md:px-8">
      <h1 className="mb-6 text-2xl font-semibold tracking-tight md:text-3xl">Settings</h1>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">Account</h2>
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/15 text-primary">
            <User className="h-4 w-4" />
          </div>
          <div>
            <div className="text-sm font-medium">{user?.email}</div>
            <div className="text-xs text-muted-foreground">Signed in via Supabase</div>
          </div>
        </div>
      </motion.div>

      <div className="mt-3 glass rounded-2xl p-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">Appearance</h2>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setTheme("light")}
            className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-colors ${
              theme === "light" ? "border-primary bg-primary/10" : "border-border hover:bg-accent"
            }`}
          >
            <Sun className="h-5 w-5" />
            <div>
              <div className="text-sm font-medium">Light</div>
              <div className="text-xs text-muted-foreground">Clean and bright</div>
            </div>
          </button>
          <button
            onClick={() => setTheme("dark")}
            className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-colors ${
              theme === "dark" ? "border-primary bg-primary/10" : "border-border hover:bg-accent"
            }`}
          >
            <Moon className="h-5 w-5" />
            <div>
              <div className="text-sm font-medium">Dark</div>
              <div className="text-xs text-muted-foreground">Focused and elegant</div>
            </div>
          </button>
        </div>
      </div>

      <div className="mt-3 glass rounded-2xl p-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">Session</h2>
        <Button
          variant="destructive"
          onClick={async () => {
            try {
              await authService.signOut();
              toast.success("Signed out");
              navigate({ to: "/auth" });
            } catch (e) {
              toast.error("Sign out failed", { description: (e as Error).message });
            }
          }}
        >
          <LogOut className="mr-2 h-4 w-4" /> Sign out
        </Button>
      </div>
    </div>
  );
}
