import { api } from "@/lib/api";

export interface KBDocument {
  id: string;
  filename: string;
  size?: number;
  created_at?: string;
  status?: string;
}

/**
 * Knowledge base (RAG) documents:
 *   GET    /api/documents
 *   POST   /api/documents/upload  (multipart form, field: file)
 *   DELETE /api/documents/{id}
 */
export const documentsService = {
  async list(): Promise<KBDocument[]> {
    try {
      const r = await api<KBDocument[] | { documents?: KBDocument[] }>("/api/documents");
      return Array.isArray(r) ? r : (r?.documents ?? []);
    } catch {
      return [];
    }
  },
  async upload(file: File): Promise<KBDocument | null> {
    const fd = new FormData();
    fd.append("file", file);
    return await api<KBDocument>("/api/documents/upload", { method: "POST", body: fd });
  },
  async remove(id: string): Promise<void> {
    await api(`/api/documents/${id}`, { method: "DELETE" });
  },
};
