import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { T as LoaderCircle, f as Sparkles, l as Trash2, m as Search, s as TriangleAlert, y as MessageSquare } from "../_libs/lucide-react.mjs";
import { i as useSessions, n as useDeleteSession, t as AppShell } from "./AppShell-BhUDBud7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/saved-KFB9_zCO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function fmtWhen(iso) {
	const d = new Date(iso);
	if (Number.isNaN(d.getTime())) return iso;
	return d.toLocaleString([], {
		dateStyle: "medium",
		timeStyle: "short"
	});
}
function SavedPage() {
	const [q, setQ] = (0, import_react.useState)("");
	const navigate = useNavigate();
	const sessions = useSessions();
	const del = useDeleteSession();
	const list = (sessions.data ?? []).filter((s) => {
		const term = q.toLowerCase();
		return s.title.toLowerCase().includes(term) || (s.preview ?? "").toLowerCase().includes(term);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-4xl px-4 py-8 md:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-semibold tracking-tight md:text-3xl",
				children: "Saved chats"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "All your conversations, backed by your FastAPI service."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "glass mt-6 rounded-2xl p-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "ml-2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: q,
						onChange: (e) => setQ(e.target.value),
						placeholder: "Search chats…",
						className: "flex-1 bg-transparent px-2 py-2 text-sm outline-none"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4",
				children: [
					sessions.isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-center gap-2 py-10 text-sm text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), " Loading sessions…"]
					}),
					sessions.isError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass flex flex-col items-center gap-2 rounded-2xl p-8 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-5 w-5 text-destructive" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm font-medium",
								children: "Could not load sessions"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground",
								children: sessions.error instanceof Error ? sessions.error.message : "Unknown error"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => sessions.refetch(),
								className: "mt-1 rounded-lg border border-border bg-card/60 px-3 py-1.5 text-xs hover:bg-accent",
								children: "Retry"
							})
						]
					}),
					sessions.isSuccess && list.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass flex flex-col items-center gap-2 rounded-2xl p-10 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-11 w-11 place-items-center rounded-xl bg-primary/15 text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm font-medium",
								children: "No chats yet"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "max-w-sm text-xs text-muted-foreground",
								children: "Start a new conversation to see it here."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => navigate({ to: "/" }),
								className: "mt-2 rounded-lg bg-gradient-to-br from-primary to-primary-glow px-3 py-1.5 text-xs font-medium text-primary-foreground",
								children: "Start a chat"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-2",
						children: list.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 6
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: { delay: i * .03 },
							onClick: () => navigate({
								to: "/",
								search: { sessionId: s.id }
							}),
							className: "group flex cursor-pointer items-center gap-3 rounded-xl border border-border bg-card/60 p-3 transition hover:border-primary/40 hover:bg-card",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "h-4 w-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "truncate text-sm font-medium",
										children: s.title
									}), s.preview && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "truncate text-xs text-muted-foreground",
										children: s.preview
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[11px] text-muted-foreground",
									children: fmtWhen(s.updated_at)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: (e) => {
										e.stopPropagation();
										if (confirm(`Delete "${s.title}"?`)) del.mutate(s.id);
									},
									disabled: del.isPending,
									className: "ml-2 grid h-8 w-8 place-items-center rounded-lg text-muted-foreground opacity-0 transition hover:bg-destructive/20 hover:text-destructive group-hover:opacity-100 disabled:opacity-40",
									"aria-label": "Delete chat",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
								})
							]
						}, s.id))
					})
				]
			})
		]
	}) });
}
//#endregion
export { SavedPage as component };
