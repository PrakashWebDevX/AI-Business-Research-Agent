import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { I as Download, M as FileSpreadsheet, N as FileDown, P as FileBraces, T as LoaderCircle, j as FileText, s as TriangleAlert } from "../_libs/lucide-react.mjs";
import { i as useSessions, r as useExport, t as AppShell } from "./AppShell-BhUDBud7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/exports-BvhVQBf_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FORMATS = [
	{
		icon: FileSpreadsheet,
		label: "CSV",
		format: "csv",
		desc: "Tabular data · rows/columns"
	},
	{
		icon: FileDown,
		label: "Excel",
		format: "excel",
		desc: "Formatted .xlsx workbook"
	},
	{
		icon: FileBraces,
		label: "JSON",
		format: "json",
		desc: "Structured, machine readable"
	},
	{
		icon: FileText,
		label: "PDF",
		format: "pdf",
		desc: "Human-readable report"
	}
];
function ExportsPage() {
	const sessions = useSessions();
	const exportMut = useExport();
	const [selected, setSelected] = (0, import_react.useState)(null);
	const list = sessions.data ?? [];
	const activeId = selected ?? list[0]?.id ?? null;
	const download = (format) => {
		if (!activeId) return;
		exportMut.mutate({
			session_id: activeId,
			format
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-5xl px-4 py-8 md:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-semibold tracking-tight md:text-3xl",
				children: "Exports"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Pick a conversation, then download it in your team's preferred format."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass mt-6 rounded-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border-b border-border px-4 py-3 text-sm font-medium",
						children: "Choose a chat"
					}),
					sessions.isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-center gap-2 py-8 text-sm text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), " Loading sessions…"]
					}),
					sessions.isError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center gap-2 py-8 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-5 w-5 text-destructive" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm",
								children: "Could not load sessions"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => sessions.refetch(),
								className: "rounded-lg border border-border bg-card/60 px-3 py-1.5 text-xs hover:bg-accent",
								children: "Retry"
							})
						]
					}),
					sessions.isSuccess && list.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-4 py-8 text-center text-sm text-muted-foreground",
						children: "No sessions yet. Start a chat to export it."
					}),
					sessions.isSuccess && list.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "max-h-64 divide-y divide-border overflow-y-auto",
						children: list.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex cursor-pointer items-center gap-3 px-4 py-2.5 hover:bg-accent/40",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "radio",
									name: "session",
									className: "accent-primary",
									checked: activeId === s.id,
									onChange: () => setSelected(s.id)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "truncate text-sm font-medium",
										children: s.title
									}), s.preview && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "truncate text-[11px] text-muted-foreground",
										children: s.preview
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[11px] text-muted-foreground",
									children: new Date(s.updated_at).toLocaleDateString()
								})
							]
						}) }, s.id))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4",
				children: FORMATS.map((f) => {
					const Icon = f.icon;
					const busy = exportMut.isPending && exportMut.variables?.format === f.format;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
						whileHover: { y: -3 },
						onClick: () => download(f.format),
						disabled: !activeId || exportMut.isPending,
						className: "glass rounded-2xl p-4 text-left transition hover:border-primary/40 disabled:cursor-not-allowed disabled:opacity-50",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 text-base font-semibold",
								children: f.label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground",
								children: f.desc
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 inline-flex items-center gap-1 text-xs text-primary",
								children: busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3 w-3 animate-spin" }), " Preparing…"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-3 w-3" }), " Download"] })
							})
						]
					}, f.label);
				})
			}),
			!activeId && sessions.isSuccess && list.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-xs text-muted-foreground",
				children: "Select a chat above to enable export."
			})
		]
	}) });
}
//#endregion
export { ExportsPage as component };
