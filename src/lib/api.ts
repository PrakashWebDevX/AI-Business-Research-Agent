import { supabase } from "@/lib/supabase";

const BASE = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, "") ?? "";

export const API_URL = BASE;
export const isApiConfigured = Boolean(BASE);

async function authHeader(): Promise<Record<string, string>> {
  try {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    return token ? { Authorization: `Bearer ${token}` } : {};
  } catch {
    return {};
  }
}

export interface ApiOptions extends Omit<RequestInit, "body" | "headers"> {
  body?: unknown;
  headers?: Record<string, string>;
  raw?: boolean;
}

export async function api<T = unknown>(path: string, opts: ApiOptions = {}): Promise<T> {
  if (!BASE) {
    throw new Error(
      "VITE_API_URL is not configured. Set it in your environment to your FastAPI backend URL.",
    );
  }
  const { body, headers, raw, ...rest } = opts;
  const auth = await authHeader();
  const isForm = body instanceof FormData;
  const res = await fetch(`${BASE}${path.startsWith("/") ? path : `/${path}`}`, {
    ...rest,
    headers: {
      ...(isForm ? {} : { "Content-Type": "application/json" }),
      ...auth,
      ...(headers ?? {}),
    },
    body: body === undefined ? undefined : isForm ? (body as FormData) : JSON.stringify(body),
  });
  if (!res.ok) {
    let msg = `${res.status} ${res.statusText}`;
    try {
      const j = await res.json();
      msg = (j.detail || j.message || j.error || msg) as string;
    } catch {
      /* ignore */
    }
    throw new Error(msg);
  }
  if (raw) return res as unknown as T;
  const ct = res.headers.get("content-type") || "";
  if (ct.includes("application/json")) return (await res.json()) as T;
  return (await res.text()) as unknown as T;
}
