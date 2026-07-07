// Central request/response types. Adjust to match your FastAPI schema.
export type AgentKind = "sql" | "web" | "hybrid";
export type Role = "user" | "assistant" | "system";

export type ExportFormat = "csv" | "excel" | "json" | "pdf";

export interface ApiMessageMeta {
  execution_time?: string;
  confidence?: number;
  tool_calls?: string[];
  sql?: {
    query: string;
    database: string;
    rows: number;
    columns: string[];
    data: Array<Record<string, string | number>>;
  };
  research?: {
    summary: string;
    key_points: string[];
    sources: Array<{ title: string; url: string; snippet: string }>;
    search_time: string;
  };
  chart?: {
    type: "bar" | "line" | "area" | "pie";
    data: Array<Record<string, string | number>>;
    x_key: string;
    y_key: string;
  };
}

export interface ApiMessage {
  id: string;
  role: Role;
  content: string;
  timestamp: string;
  agent?: AgentKind;
  meta?: ApiMessageMeta;
}

export interface Session {
  id: string;
  title: string;
  updated_at: string;
  preview?: string;
  pinned?: boolean;
}

export interface SessionDetail extends Session {
  messages: ApiMessage[];
}

// Request payloads
export interface ChatRequest {
  session_id?: string;
  message: string;
}

export interface ChatResponse {
  session_id: string;
  message: ApiMessage;
}

export interface CreateSessionRequest {
  title?: string;
}

export interface ExportRequest {
  session_id: string;
  format: ExportFormat;
}

// FastAPI-style error body
export interface ApiErrorBody {
  detail?: string | Array<{ msg: string; loc?: (string | number)[] }>;
}
