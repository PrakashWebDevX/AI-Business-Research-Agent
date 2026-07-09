import { api } from "@/lib/api";

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
  created_at?: string;
}

export interface ChatResponse {
  session_id: string;
  message: {
    id: string;
    role: string;
    content: string;
    tool_used?: string;
    execution_time_seconds?: number;
    generated_sql?: string | null;
    table_data?: unknown;
    sources?: unknown;
    chart?: unknown;
    created_at?: string;
  };
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