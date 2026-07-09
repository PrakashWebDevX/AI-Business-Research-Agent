import { api } from "@/lib/api";

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
  created_at?: string;
}

export interface ChatResponse {
  session_id?: string;

  message?: ChatMessage;

  reply?: string;
  content?: string;
  answer?: string;
  output?: string;
  summary?: string;

  tool?: string;
  agent?: string;
  result?: unknown;
  data?: unknown;

  sources?: Array<{
    title?: string;
    url?: string;
    snippet?: string;
  }>;

  findings?: Array<{
    title: string;
    url?: string;
    snippet?: string;
  }>;

  columns?: string[];
  rows?: unknown[][];
}

/**
 * Every request goes through POST /api/chat.
 * The FastAPI BusinessAgent automatically decides whether to use:
 * - Chat
 * - SQL
 * - Web Search
 */
async function send(
  prompt: string,
  sessionId?: string,
): Promise<ChatResponse> {
  return api.post<ChatResponse>(
    "/api/chat",
    {
      message: prompt,
      session_id: sessionId,
    },
    {
      retries: 0,
    },
  );
}

export const chatService = {
  send,

  // aliases
  ask: send,
  sql: send,
  research: send,
};