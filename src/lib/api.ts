import type { ApiErrorBody } from "@/types/api";

/**
 * Base URL for the FastAPI backend.
 * Set via .env or Netlify environment variable: VITE_API_URL
 * Example: VITE_API_URL=https://api.your-domain.com
 */
export const API_BASE_URL: string = (
  import.meta.env.VITE_API_URL ?? "http://localhost:8000"
).replace(/\/$/, "");

export class ApiError extends Error {
  status: number;
  body?: ApiErrorBody;
  constructor(message: string, status: number, body?: ApiErrorBody) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

interface RequestOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
  /** Read the response as a Blob (for file downloads). */
  asBlob?: boolean;
  /** Number of retry attempts for network / 5xx errors. */
  retries?: number;
  /** ms to wait between retries (exponential backoff applied). */
  retryDelayMs?: number;
  /** Abort signal. */
  signal?: AbortSignal;
}

function detailToString(detail: ApiErrorBody["detail"]): string | undefined {
  if (!detail) return undefined;
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) return detail.map((d) => d.msg).join("; ");
  return undefined;
}

async function parseError(res: Response): Promise<ApiError> {
  let body: ApiErrorBody | undefined;
  try {
    body = (await res.json()) as ApiErrorBody;
  } catch {
    /* not JSON */
  }
  const msg =
    detailToString(body?.detail) ??
    `Request failed with status ${res.status} ${res.statusText}`;
  return new ApiError(msg, res.status, body);
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Low-level fetch wrapper. Prefer the helpers below. */
export async function apiFetch<T>(
  path: string,
  opts: RequestOptions = {},
): Promise<T> {
  const {
    body,
    asBlob = false,
    retries = 1,
    retryDelayMs = 500,
    headers,
    signal,
    ...rest
  } = opts;

  const url = `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  const init: RequestInit = {
    ...rest,
    signal,
    headers: {
      Accept: asBlob ? "*/*" : "application/json",
      ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  };

  let lastError: unknown;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, init);
      if (!res.ok) {
        // Retry only on 5xx
        if (res.status >= 500 && attempt < retries) {
          await sleep(retryDelayMs * 2 ** attempt);
          continue;
        }
        throw await parseError(res);
      }
      if (asBlob) return (await res.blob()) as unknown as T;
      if (res.status === 204) return undefined as T;
      return (await res.json()) as T;
    } catch (err) {
      lastError = err;
      // Network error → retry
      if (
        !(err instanceof ApiError) &&
        attempt < retries &&
        (err as Error).name !== "AbortError"
      ) {
        await sleep(retryDelayMs * 2 ** attempt);
        continue;
      }
      throw err;
    }
  }
  throw lastError instanceof Error ? lastError : new Error("Unknown API error");
}

export const api = {
  get: <T,>(path: string, opts?: RequestOptions) =>
    apiFetch<T>(path, { ...opts, method: "GET" }),
  post: <T,>(path: string, body?: unknown, opts?: RequestOptions) =>
    apiFetch<T>(path, { ...opts, method: "POST", body }),
  del: <T,>(path: string, opts?: RequestOptions) =>
    apiFetch<T>(path, { ...opts, method: "DELETE" }),
};
