// UI-only types & static prompt suggestions. No mock backend data — every
// piece of runtime content in the app comes from the FastAPI backend via
// src/services/*.

export type Role = "user" | "assistant";
export type AgentKind = "sql" | "web" | "hybrid";

export interface ChatMessage {
  id: string;
  role: Role;
  content: string;
  timestamp: string;
  agent?: AgentKind;
  meta?: MessageMeta;
  liked?: boolean | null;
}

export interface MessageMeta {
  executionTime?: string;
  confidence?: number;
  toolCalls?: string[];
  sql?: {
    query: string;
    database: string;
    rows: number;
    columns: string[];
    data: Array<Record<string, string | number>>;
  };
  research?: {
    summary: string;
    keyPoints: string[];
    sources: Array<{ title: string; url: string; snippet: string; favicon?: string }>;
    searchTime: string;
  };
  chart?: {
    type: "bar" | "line" | "area" | "pie";
    data: Array<Record<string, string | number>>;
    xKey: string;
    yKey: string;
  };
}

// Static empty-state prompt hints (UI copy, not backend data).
export const SUGGESTIONS: Array<{ title: string; subtitle: string; icon: "trophy" | "book" | "globe" | "chart" }> = [
  { title: "Show top employees by revenue this quarter", subtitle: "SQL agent · warehouse", icon: "trophy" },
  { title: "Summarize the latest EU AI regulation", subtitle: "Web research · cited", icon: "book" },
  { title: "Compare our pricing vs 3 main competitors", subtitle: "Hybrid · SQL + Web", icon: "globe" },
  { title: "Break down churn by cohort and region", subtitle: "SQL agent · charts", icon: "chart" },
];
