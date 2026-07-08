import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion.mjs";
import { $ as Bell, B as CircleQuestionMark, D as LayoutDashboard, H as ChevronsLeft, I as Download, J as ChartColumn, K as ChevronDown, R as Database, T as LoaderCircle, V as ChevronsRight, Z as Bookmark, b as Menu, f as Sparkles, h as Plus, k as Globe, l as Trash2, m as Search, p as Settings, t as X, u as Sun, v as Moon, y as MessageSquare } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AppShell-BhUDBud7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Base URL for the FastAPI backend.
* Set via .env or Netlify environment variable: VITE_API_URL
* Example: VITE_API_URL=https://api.your-domain.com
*/
var API_BASE_URL = "".replace(/\/$/, "");
var ApiError = class extends Error {
	status;
	body;
	constructor(message, status, body) {
		super(message);
		this.name = "ApiError";
		this.status = status;
		this.body = body;
	}
};
function detailToString(detail) {
	if (!detail) return void 0;
	if (typeof detail === "string") return detail;
	if (Array.isArray(detail)) return detail.map((d) => d.msg).join("; ");
}
async function parseError(res) {
	let body;
	try {
		body = await res.json();
	} catch {}
	return new ApiError(detailToString(body?.detail) ?? `Request failed with status ${res.status} ${res.statusText}`, res.status, body);
}
var sleep = (ms) => new Promise((r) => setTimeout(r, ms));
/** Low-level fetch wrapper. Prefer the helpers below. */
async function apiFetch(path, opts = {}) {
	const { body, asBlob = false, retries = 1, retryDelayMs = 500, headers, signal, ...rest } = opts;
	if (!API_BASE_URL) throw new ApiError("VITE_API_URL is not configured", 0);
	const url = `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
	const init = {
		...rest,
		signal,
		headers: {
			Accept: asBlob ? "*/*" : "application/json",
			...body !== void 0 ? { "Content-Type": "application/json" } : {},
			...headers
		},
		body: body !== void 0 ? JSON.stringify(body) : void 0
	};
	let lastError;
	for (let attempt = 0; attempt <= retries; attempt++) try {
		const res = await fetch(url, init);
		if (!res.ok) {
			if (res.status >= 500 && attempt < retries) {
				await sleep(retryDelayMs * 2 ** attempt);
				continue;
			}
			throw await parseError(res);
		}
		if (asBlob) return await res.blob();
		if (res.status === 204) return void 0;
		return await res.json();
	} catch (err) {
		lastError = err;
		if (!(err instanceof ApiError) && attempt < retries && err.name !== "AbortError") {
			await sleep(retryDelayMs * 2 ** attempt);
			continue;
		}
		throw err;
	}
	throw lastError instanceof Error ? lastError : /* @__PURE__ */ new Error("Unknown API error");
}
var api = {
	get: (path, opts) => apiFetch(path, {
		...opts,
		method: "GET"
	}),
	post: (path, body, opts) => apiFetch(path, {
		...opts,
		method: "POST",
		body
	}),
	del: (path, opts) => apiFetch(path, {
		...opts,
		method: "DELETE"
	})
};
var sessionsService = {
	/** GET /api/sessions */
	list() {
		return api.get("/api/sessions");
	},
	/** POST /api/sessions */
	create(payload = {}) {
		return api.post("/api/sessions", payload);
	},
	/** GET /api/sessions/{id} */
	get(id) {
		return api.get(`/api/sessions/${encodeURIComponent(id)}`);
	},
	/** DELETE /api/sessions/{id} */
	remove(id) {
		return api.del(`/api/sessions/${encodeURIComponent(id)}`);
	}
};
var MIME = {
	csv: "text/csv",
	excel: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
	json: "application/json",
	pdf: "application/pdf"
};
var EXT = {
	csv: "csv",
	excel: "xlsx",
	json: "json",
	pdf: "pdf"
};
var exportService = { 
/** POST /api/export — returns a Blob for download. */
async download(payload) {
	const blob = await api.post("/api/export", payload, { asBlob: true });
	const typed = blob.type ? blob : new Blob([blob], { type: MIME[payload.format] });
	const filename = `export-${payload.session_id}.${EXT[payload.format]}`;
	triggerBrowserDownload(typed, filename);
	return { filename };
} };
function triggerBrowserDownload(blob, filename) {
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	a.remove();
	setTimeout(() => URL.revokeObjectURL(url), 0);
}
var errText = (e) => e instanceof ApiError ? e.message : e instanceof Error ? e.message : "Something went wrong";
function useSessions() {
	return useQuery({
		queryKey: ["sessions"],
		queryFn: () => sessionsService.list(),
		staleTime: 3e4
	});
}
function useDeleteSession() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (id) => sessionsService.remove(id),
		onSuccess: (_d, id) => {
			qc.invalidateQueries({ queryKey: ["sessions"] });
			qc.removeQueries({ queryKey: ["sessions", id] });
			toast.success("Chat deleted");
		},
		onError: (e) => toast.error("Delete failed", { description: errText(e) })
	});
}
function useExport() {
	return useMutation({
		mutationFn: (payload) => exportService.download(payload),
		onSuccess: (r) => toast.success("Export ready", { description: r.filename }),
		onError: (e) => toast.error("Export failed", { description: errText(e) })
	});
}
var NAV = [
	{
		to: "/dashboard",
		label: "Dashboard",
		icon: LayoutDashboard
	},
	{
		to: "/",
		label: "AI Chat",
		icon: MessageSquare
	},
	{
		to: "/sql",
		label: "SQL Queries",
		icon: Database
	},
	{
		to: "/research",
		label: "Research",
		icon: Globe
	},
	{
		to: "/analytics",
		label: "Analytics",
		icon: ChartColumn
	},
	{
		to: "/saved",
		label: "Saved Chats",
		icon: Bookmark
	},
	{
		to: "/exports",
		label: "Exports",
		icon: Download
	},
	{
		to: "/settings",
		label: "Settings",
		icon: Settings
	},
	{
		to: "/help",
		label: "Help",
		icon: CircleQuestionMark
	}
];
function Sidebar({ collapsed, onToggle }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const sessions = useSessions();
	const del = useDeleteSession();
	const recent = (sessions.data ?? []).slice(0, 8);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.aside, {
		animate: { width: collapsed ? 76 : 260 },
		transition: {
			type: "spring",
			stiffness: 220,
			damping: 28
		},
		className: "relative z-20 hidden shrink-0 border-r border-sidebar-border bg-sidebar/70 backdrop-blur-xl md:flex md:flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 px-4 pt-5 pb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary-glow shadow-[0_0_24px_-4px_var(--color-primary)]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-primary-foreground" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
					initial: false,
					children: !collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							x: -6
						},
						animate: {
							opacity: 1,
							x: 0
						},
						exit: {
							opacity: 0,
							x: -6
						},
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "truncate text-sm font-semibold leading-tight",
							children: "AI Business"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "truncate text-[11px] text-muted-foreground",
							children: "Research Agent"
						})]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: cn("group flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-3 py-2.5 text-sm font-medium text-foreground transition-all hover:bg-primary/20 hover:shadow-[0_0_20px_-4px_var(--color-primary)]", collapsed && "justify-center px-2"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4 text-primary" }), !collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "New Chat" })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "mt-5 flex-1 space-y-0.5 overflow-y-auto px-2",
				children: [NAV.map((item) => {
					const Icon = item.icon;
					const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						className: cn("group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all", active ? "bg-sidebar-accent text-foreground" : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground", collapsed && "justify-center px-2"),
						children: [
							active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
								layoutId: "sidebar-active",
								className: "absolute inset-y-1 left-0 w-0.5 rounded-full bg-primary",
								transition: {
									type: "spring",
									stiffness: 300,
									damping: 30
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: cn("h-4 w-4 shrink-0", active && "text-primary") }),
							!collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate",
								children: item.label
							})
						]
					}, item.to);
				}), !collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 border-t border-sidebar-border pt-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-1 flex items-center justify-between px-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-semibold uppercase tracking-wider text-muted-foreground",
								children: "Recent chats"
							}), sessions.isFetching && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3 w-3 animate-spin text-muted-foreground" })]
						}),
						sessions.isError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "px-2 py-1 text-[11px] text-destructive",
							children: "Couldn't load chats"
						}),
						sessions.isSuccess && recent.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "px-2 py-1 text-[11px] text-muted-foreground",
							children: "No chats yet"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-0.5",
							children: recent.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "group flex items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/",
									search: { sessionId: s.id },
									className: "flex min-w-0 flex-1 items-center gap-2 rounded-md px-2 py-1.5 text-xs text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground",
									title: s.title,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "h-3 w-3 shrink-0 opacity-60" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "truncate",
										children: s.title
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: (e) => {
										e.preventDefault();
										if (confirm(`Delete "${s.title}"?`)) del.mutate(s.id);
									},
									className: "grid h-6 w-6 place-items-center rounded text-muted-foreground opacity-0 transition hover:bg-destructive/20 hover:text-destructive group-hover:opacity-100",
									"aria-label": "Delete chat",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3 w-3" })
								})]
							}, s.id))
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-sidebar-border p-3",
				children: [!collapsed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border/70 bg-card/60 p-3 text-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Model"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: "gemini-1.5-pro"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Storage"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: "64% used"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 h-1.5 overflow-hidden rounded-full bg-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full w-[64%] rounded-full bg-gradient-to-r from-primary to-primary-glow" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex items-center justify-between text-[10px] text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "v1.4.0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-success" }), "Connected"]
							})]
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid h-9 place-items-center rounded-xl bg-card/60 text-[10px] text-muted-foreground",
					children: "v1.4"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: onToggle,
					className: "mt-3 flex w-full items-center justify-center gap-2 rounded-lg py-2 text-xs text-muted-foreground transition hover:bg-sidebar-accent/60 hover:text-foreground",
					children: [collapsed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsRight, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsLeft, { className: "h-4 w-4" }), !collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Collapse" })]
				})]
			})
		]
	});
}
function TopNav({ onMenu }) {
	const [dark, setDark] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		const root = document.documentElement;
		if (dark) root.classList.remove("light");
		else root.classList.add("light");
	}, [dark]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border/70 bg-background/70 px-4 backdrop-blur-xl md:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: onMenu,
				className: "grid h-9 w-9 place-items-center rounded-lg text-muted-foreground hover:bg-accent md:hidden",
				"aria-label": "Open menu",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hidden items-center gap-2 md:flex",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1.5 rounded-full border border-success/30 bg-success/10 px-2.5 py-1 text-[11px] font-medium text-success",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "relative flex h-1.5 w-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex h-1.5 w-1.5 rounded-full bg-success" })]
					}), "Connected"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "inline-flex items-center gap-1.5 rounded-lg border border-border bg-card/70 px-2.5 py-1 text-xs text-foreground/90 transition hover:bg-accent",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--color-primary)]" }),
						"gemini-1.5-pro",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-3 w-3 opacity-60" })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto hidden max-w-md flex-1 md:block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "group relative flex items-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 h-4 w-4 text-muted-foreground" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							placeholder: "Search chats, queries, sources…",
							className: "w-full rounded-xl border border-border bg-card/60 py-2 pl-9 pr-16 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary/60 focus:bg-card focus:shadow-[0_0_0_4px_color-mix(in_oklab,var(--primary)_15%,transparent)]"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
							className: "pointer-events-none absolute right-2.5 hidden rounded-md border border-border bg-background px-1.5 py-0.5 text-[10px] text-muted-foreground md:inline-block",
							children: "⌘K"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ml-auto flex items-center gap-1.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setDark((v) => !v),
						className: "grid h-9 w-9 place-items-center rounded-lg text-muted-foreground transition hover:bg-accent hover:text-foreground",
						"aria-label": "Toggle theme",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
							initial: {
								rotate: -30,
								opacity: 0
							},
							animate: {
								rotate: 0,
								opacity: 1
							},
							className: "grid place-items-center",
							children: dark ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "h-4 w-4" })
						}, dark ? "moon" : "sun")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "relative grid h-9 w-9 place-items-center rounded-lg text-muted-foreground transition hover:bg-accent hover:text-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--color-primary)]" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ml-1 flex items-center gap-2 rounded-full border border-border bg-card/70 py-1 pl-1 pr-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-primary to-primary-glow text-[11px] font-semibold text-primary-foreground",
							children: "AK"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden text-xs text-foreground/90 sm:inline",
							children: "Alex Kim"
						})]
					})
				]
			})
		]
	});
}
function AppShell({ children }) {
	const [collapsed, setCollapsed] = (0, import_react.useState)(false);
	const [mobileOpen, setMobileOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex min-h-screen w-full",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sidebar, {
				collapsed,
				onToggle: () => setCollapsed((v) => !v)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: mobileOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				exit: { opacity: 0 },
				onClick: () => setMobileOpen(false),
				className: "fixed inset-0 z-40 bg-background/70 backdrop-blur-sm md:hidden"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: { x: -280 },
				animate: { x: 0 },
				exit: { x: -280 },
				transition: {
					type: "spring",
					stiffness: 260,
					damping: 30
				},
				className: "fixed inset-y-0 left-0 z-50 md:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex h-full",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sidebar, {
						collapsed: false,
						onToggle: () => setCollapsed((v) => !v)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setMobileOpen(false),
						className: "absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-lg bg-card text-muted-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
					})]
				})
			})] }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 flex min-w-0 flex-1 flex-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopNav, { onMenu: () => setMobileOpen(true) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "min-w-0 flex-1",
					children
				})]
			})
		]
	});
}
//#endregion
export { useSessions as i, useDeleteSession as n, useExport as r, AppShell as t };
