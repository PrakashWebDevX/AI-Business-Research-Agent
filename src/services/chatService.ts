import { api } from "@/lib/api";

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
  createdAt?: string;
}

export interface ChatResponse {
  reply?: string;
  message?: string;
  content?: string;
  answer?: string;
  output?: string;
  data?: unknown;
  tool?: string;
  agent?: string;
  sources?: Array<{ title?: string; url?: string; snippet?: string }>;
  columns?: string[];
  rows?: unknown[][];
  result?: unknown;
  findings?: Array<{ title: string; url?: string; snippet?: string }>;
  summary?: string;
}

/**
 * All prompts (chat, SQL-style, research-style) go through the single
 * FastAPI endpoint POST /api/chat. The backend BusinessAgent routes to
 * the correct tool (SQL or Web Search) automatically.
 */
async function send(prompt: string, sessionId?: string): Promise<ChatResponse> {
  return api<ChatResponse>("/api/chat", {
    method: "POST",
    body: { message: prompt, session_id: sessionId },
  });
}

export const chatService = {
  send,
  // Back-compat aliases — all route to the same /api/chat endpoint.
  ask: send,
  sql: (query: string, sessionId?: string) => send(query, sessionId),
  research: (topic: string, sessionId?: string) => send(topic, sessionId),
};
