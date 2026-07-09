import { api } from "@/lib/api";

const SAVED_KEY = "abra.saved.v1";

export interface StoredSession {
  id: string;
  title: string;
  createdAt: string;
  messages: Array<{ role: "user" | "assistant"; content: string; createdAt: string }>;
}

export interface SavedReport {
  id: string;
  title: string;
  kind: "chat" | "sql" | "research";
  createdAt: string;
  payload: unknown;
}

/**
 * Sessions are persisted by the FastAPI backend:
 *   GET    /api/sessions
 *   POST   /api/sessions
 *   GET    /api/sessions/{id}
 *   DELETE /api/sessions/{id}
 */
export const sessionsService = {
  async list(): Promise<StoredSession[]> {
    try {
      return await api<StoredSession[]>("/api/sessions");
    } catch {
      return [];
    }
  },
  async get(id: string): Promise<StoredSession | null> {
    try {
      return await api<StoredSession>(`/api/sessions/${id}`);
    } catch {
      return null;
    }
  },
  async save(s: StoredSession): Promise<void> {
    try {
      await api("/api/sessions", { method: "POST", body: s });
    } catch {
      /* non-fatal */
    }
  },
  async remove(id: string): Promise<void> {
    try {
      await api(`/api/sessions/${id}`, { method: "DELETE" });
    } catch {
      /* non-fatal */
    }
  },
};

function readLocal<T>(k: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(k);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function writeLocal<T>(k: string, v: T) {
  if (typeof window === "undefined") return;
  localStorage.setItem(k, JSON.stringify(v));
}

// Saved reports remain a local, frontend-only concept.
export const savedService = {
  list(): SavedReport[] {
    return readLocal<SavedReport[]>(SAVED_KEY, []);
  },
  save(r: SavedReport) {
    const all = savedService.list().filter((x) => x.id !== r.id);
    all.unshift(r);
    writeLocal(SAVED_KEY, all.slice(0, 200));
  },
  remove(id: string) {
    writeLocal(SAVED_KEY, savedService.list().filter((s) => s.id !== id));
  },
};
