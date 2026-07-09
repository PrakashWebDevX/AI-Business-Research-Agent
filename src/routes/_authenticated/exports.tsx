import { createFileRoute } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { savedService } from "@/services/sessionsService";
import { exportService } from "@/services/exportService";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/exports")({
  head: () => ({ meta: [{ title: "Exports · AI Business Research Agent" }] }),
  component: ExportsPage,
});

function ExportsPage() {
  const items = savedService.list();
  const flat = items.map((r) => ({
    id: r.id,
    title: r.title,
    kind: r.kind,
    createdAt: r.createdAt,
    payload: JSON.stringify(r.payload).slice(0, 500),
  }));

  return (
    <div className="mx-auto max-w-4xl space-y-4 px-4 py-6 md:px-6">
      <div className="flex items-center gap-2">
        <Download className="h-5 w-5 text-primary" />
        <h1 className="text-lg font-semibold">Exports</h1>
      </div>
      <p className="text-sm text-muted-foreground">
        Export your saved reports in the format you need.
      </p>

      <div className="grid gap-3 sm:grid-cols-3">
        <Button variant="outline" disabled={!flat.length} onClick={() => exportService.csv("reports", flat)}>
          Export CSV
        </Button>
        <Button variant="outline" disabled={!flat.length} onClick={() => exportService.excel("reports", flat)}>
          Export Excel
        </Button>
        <Button variant="outline" disabled={!flat.length} onClick={() => exportService.json("reports", items)}>
          Export JSON
        </Button>
      </div>

      {!flat.length && (
        <div className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          Save reports first from Chat, SQL, or Research to enable exports.
        </div>
      )}
    </div>
  );
}
