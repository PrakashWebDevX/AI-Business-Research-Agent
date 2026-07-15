import { api } from "@/lib/api";

export interface ChatMessage {
  id?: string;
  role: "user" | "assistant" | "system";
  content: string;
  tool_used?: string | null;
  execution_time_seconds?: number | null;
  generated_sql?: string | null;
  table_data?: unknown | null;
  sources?: Array<{ title?: string; url?: string; snippet?: string }> | null;
  chart?: unknown | null;
  created_at?: string;
}

export interface ChatResponse {
  session_id: string;
  message: ChatMessage;
}

/**
 * All prompts (chat, SQL-style, research-style) go through the single
 * FastAPI endpoint POST /api/chat. The backend BusinessAgent routes to
 * the correct tool (SQL or Web Search) automatically.
 *
 * Backend response schema:
 *   { session_id: string, message: { content: string, ... } }
 */
async function send(prompt: string, sessionId?: string): Promise<ChatResponse> {
  try {
    const res = await api<ChatResponse>("/api/chat", {
      method: "POST",
      body: { message: prompt, session_id: sessionId },
    });
    console.log("API Response:", res);
    if (res?.message) {
      console.log("[chat] tool_used:", res.message.tool_used);
      if (res.message.generated_sql) console.log("[chat] generated_sql:", res.message.generated_sql);
      if (res.message.table_data) console.log("[chat] table_data:", res.message.table_data);
      if (res.message.sources) console.log("[chat] sources:", res.message.sources);
      if (res.message.chart) console.log("[chat] chart:", res.message.chart);
    }
    if (!res || !res.message || typeof res.message.content === "undefined") {
      console.error("Invalid /api/chat response shape:", res);
      throw new Error("Invalid response from backend: missing message.content");
    }
    return res;
  } catch (err) {
    console.error("[chatService.send] failed:", err);
    throw err;
  }
}

export const chatService = {
  send,
  ask: send,
  sql: (query: string, sessionId?: string) => send(query, sessionId),
  research: (topic: string, sessionId?: string) => send(topic, sessionId),
};
