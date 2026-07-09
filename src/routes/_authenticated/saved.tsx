import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Bookmark, Trash2 } from "lucide-react";
import { savedService, type SavedReport } from "@/services/sessionsService";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/saved")({
  head: () => ({ meta: [{ title: "Saved Reports · AI Business Research Agent" }] }),
  component: SavedPage,
});

function SavedPage() {
  const [items, setItems] = useState<SavedReport[]>(savedService.list());
  const [open, setOpen] = useState<SavedReport | null>(null);

  return (
    <div className="mx-auto max-w-5xl space-y-4 px-4 py-6 md:px-6">
      <div className="flex items-center gap-2">
        <Bookmark className="h-5 w-5 text-primary" />
        <h1 className="text-lg font-semibold">Saved Reports</h1>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
          No saved reports yet. Save chat, SQL, or research results to see them here.
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {items.map((r) => (
            <div key={r.id} className="rounded-2xl border border-border bg-card/60 p-4 backdrop-blur">
              <div className="mb-1 flex items-center justify-between">
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] uppercase tracking-wide text-primary">
                  {r.kind}
                </span>
                <span className="text-xs text-muted-foreground">
                  {new Date(r.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="line-clamp-2 text-sm font-medium">{r.title}</div>
              <div className="mt-3 flex gap-2">
                <Button size="sm" variant="outline" onClick={() => setOpen(r)}>View</Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    savedService.remove(r.id);
                    setItems(savedService.list());
                    toast.success("Deleted");
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {open && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-background/70 p-4 backdrop-blur"
          onClick={() => setOpen(null)}
        >
          <div
            className="max-h-[80vh] w-full max-w-2xl overflow-auto rounded-2xl border border-border bg-card p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 font-semibold">{open.title}</div>
            <pre className="whitespace-pre-wrap break-words text-xs">{JSON.stringify(open.payload, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
