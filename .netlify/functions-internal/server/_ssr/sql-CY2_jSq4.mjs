import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-PwNqyxv_.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { H as Bookmark, S as LoaderCircle, j as Database, k as Download, p as Play } from "../_libs/lucide-react.mjs";
import { t as savedService } from "./sessionsService-BL_l5wKS.mjs";
import { t as chatService } from "./chatService-B8FzW_mU.mjs";
import { t as exportService } from "./exportService-AXf_ZU26.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sql-CY2_jSq4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SUGGESTIONS = [
	"How many orders were placed last month?",
	"Top 10 customers by revenue this year",
	"Average deal size by region for Q3"
];
function SqlPage() {
	const [query, setQuery] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [result, setResult] = (0, import_react.useState)(null);
	async function run(q) {
		const prompt = (q ?? query).trim();
		if (!prompt) return;
		setQuery(prompt);
		setLoading(true);
		try {
			const r = await chatService.send(prompt);
			setResult(r);
		} catch (e) {
			toast.error("Query failed", { description: e.message });
		} finally {
			setLoading(false);
		}
	}
	const rows = result?.rows ?? [];
	const cols = result?.columns ?? (rows[0] && Array.isArray(rows[0]) ? rows[0].map((_, i) => `col_${i}`) : []);
	const replyText = result && (result.reply || result.message || result.content || result.answer || result.output || (typeof result.data === "string" ? result.data : ""));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl space-y-4 px-4 py-6 md:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { className: "h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-lg font-semibold",
					children: "SQL Agent"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-border bg-card/60 p-4 backdrop-blur",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: query,
						onChange: (e) => setQuery(e.target.value),
						rows: 5,
						placeholder: "Ask a data question in plain English — the agent will run SQL for you…",
						className: "w-full resize-y rounded-xl border border-input bg-background px-3 py-2 font-mono text-sm outline-none focus:ring-2 focus:ring-ring"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								onClick: () => run(),
								disabled: loading || !query.trim(),
								children: [loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "mr-2 h-4 w-4" }), "Run"]
							}),
							rows.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								onClick: () => exportService.csv("sql-result", rows.map((r) => Object.fromEntries(cols.map((c, i) => [c, r[i]])))),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "mr-2 h-4 w-4" }), " CSV"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								onClick: () => exportService.json("sql-result", result),
								children: "JSON"
							})] }),
							result && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								onClick: () => {
									savedService.save({
										id: crypto.randomUUID(),
										title: query.slice(0, 60),
										kind: "sql",
										createdAt: (/* @__PURE__ */ new Date()).toISOString(),
										payload: {
											query,
											result
										}
									});
									toast.success("Saved");
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "mr-2 h-4 w-4" }), " Save"]
							})
						]
					}),
					!result && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: SUGGESTIONS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => run(s),
							className: "rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground hover:border-primary/50 hover:text-foreground",
							children: s
						}, s))
					})
				]
			}),
			result && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [replyText && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-2xl border border-border bg-card/60 p-4 text-sm whitespace-pre-wrap backdrop-blur",
					children: String(replyText)
				}), rows.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-auto rounded-2xl border border-border bg-card/60 backdrop-blur",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "min-w-full text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "bg-muted/50",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: cols.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2 text-left font-medium",
								children: c
							}, c)) })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
							className: "border-t border-border",
							children: r.map((v, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-2",
								children: v == null ? "" : String(v)
							}, j))
						}, i)) })]
					})
				})]
			})
		]
	});
}
//#endregion
export { SqlPage as component };
