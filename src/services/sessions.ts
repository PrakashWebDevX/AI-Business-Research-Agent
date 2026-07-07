import { api } from "@/lib/api";
import type { CreateSessionRequest, Session, SessionDetail } from "@/types/api";

export const sessionsService = {
  /** GET /api/sessions */
  list() {
    return api.get<Session[]>("/api/sessions");
  },
  /** POST /api/sessions */
  create(payload: CreateSessionRequest = {}) {
    return api.post<Session>("/api/sessions", payload);
  },
  /** GET /api/sessions/{id} */
  get(id: string) {
    return api.get<SessionDetail>(`/api/sessions/${encodeURIComponent(id)}`);
  },
  /** DELETE /api/sessions/{id} */
  remove(id: string) {
    return api.del<void>(`/api/sessions/${encodeURIComponent(id)}`);
  },
};
