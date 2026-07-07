import { api } from "@/lib/api";
import type { ChatRequest, ChatResponse } from "@/types/api";

export const chatService = {
  /** POST /api/chat — send a message, receive an assistant reply. */
  send(payload: ChatRequest, signal?: AbortSignal) {
    return api.post<ChatResponse>("/api/chat", payload, {
      signal,
      retries: 0, // don't retry user-visible generations
    });
  },
};
