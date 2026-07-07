import { api } from "@/lib/api";
import type { ExportFormat, ExportRequest } from "@/types/api";

const MIME: Record<ExportFormat, string> = {
  csv: "text/csv",
  excel: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  json: "application/json",
  pdf: "application/pdf",
};

const EXT: Record<ExportFormat, string> = {
  csv: "csv",
  excel: "xlsx",
  json: "json",
  pdf: "pdf",
};

export const exportService = {
  /** POST /api/export — returns a Blob for download. */
  async download(payload: ExportRequest) {
    const blob = await api.post<Blob>("/api/export", payload, { asBlob: true });
    // Ensure MIME type is set even if the server omits it
    const typed = blob.type ? blob : new Blob([blob], { type: MIME[payload.format] });
    const filename = `export-${payload.session_id}.${EXT[payload.format]}`;
    triggerBrowserDownload(typed, filename);
    return { filename };
  },
};

function triggerBrowserDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 0);
}
