import { useEffect, useRef, useState } from "react";
import { FileText, Loader2, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import { documentsService, type KBDocument } from "@/services/documentsService";
import { cn } from "@/lib/utils";

export function KnowledgeBase() {
  const [docs, setDocs] = useState<KBDocument[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function refresh() {
    setLoading(true);
    try {
      setDocs(await documentsService.list());
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploading(true);
    try {
      await documentsService.upload(file);
      toast.success(`Uploaded ${file.name}`);
      await refresh();
    } catch (err) {
      toast.error((err as Error).message || "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function remove(id: string, name: string) {
    try {
      await documentsService.remove(id);
      toast.success(`Removed ${name}`);
      setDocs((d) => d.filter((x) => x.id !== id));
    } catch (err) {
      toast.error((err as Error).message || "Delete failed");
    }
  }

  return (
    <div className="mt-4 border-t border-border pt-4">
      <div className="mb-2 flex items-center justify-between px-1">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Knowledge Base
        </span>
        {docs.length > 0 && (
          <span className="text-[11px] text-muted-foreground">{docs.length}</span>
        )}
      </div>

      <button
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className={cn(
          "flex w-full items-center gap-2 rounded-lg border border-dashed border-border bg-background/40 px-3 py-2 text-xs text-muted-foreground transition hover:border-[#3B82F6]/60 hover:text-foreground",
          uploading && "opacity-60",
        )}
      >
        {uploading ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <Upload className="h-3.5 w-3.5" />
        )}
        {uploading ? "Uploading…" : "Upload document"}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.txt,.md,application/pdf,text/plain,text/markdown"
        onChange={onFile}
        className="hidden"
      />

      <ul className="mt-2 space-y-1">
        {loading && docs.length === 0 && (
          <li className="px-2 py-1 text-[11px] text-muted-foreground">Loading…</li>
        )}
        {!loading && docs.length === 0 && (
          <li className="px-2 py-1 text-[11px] text-muted-foreground">
            No documents yet
          </li>
        )}
        {docs.map((d) => (
          <li
            key={d.id}
            className="group flex items-center gap-2 rounded-md px-2 py-1.5 text-xs hover:bg-accent/60"
          >
            <FileText className="h-3.5 w-3.5 shrink-0 text-[#3B82F6]" />
            <span className="min-w-0 flex-1 truncate" title={d.filename}>
              {d.filename}
            </span>
            <button
              onClick={() => remove(d.id, d.filename)}
              className="opacity-0 transition group-hover:opacity-100 hover:text-destructive"
              aria-label={`Delete ${d.filename}`}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
