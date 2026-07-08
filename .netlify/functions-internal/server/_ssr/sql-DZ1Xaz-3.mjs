import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { R as Database, g as Play } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-BhUDBud7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sql-DZ1Xaz-3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SqlPage() {
	const [q, setQ] = (0, import_react.useState)("");
	const navigate = useNavigate();
	const run = () => {
		const prompt = q.trim() || "Run a SQL query on the warehouse";
		navigate({
			to: "/",
			search: { sessionId: void 0 }
		});
		setTimeout(() => {
			window.dispatchEvent(new CustomEvent("agent:prefill", { detail: { text: prompt } }));
		}, 0);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-5xl px-4 py-8 md:px-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-semibold tracking-tight md:text-3xl",
				children: "SQL Queries"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Ask a data question in plain English — the SQL agent generates and runs it."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "inline-flex items-center gap-1.5 rounded-full border border-success/30 bg-success/10 px-2.5 py-1 text-[11px] font-medium text-success",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { className: "h-3 w-3" }), " SQL agent"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "glass rounded-2xl p-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: q,
					onChange: (e) => setQ(e.target.value),
					onKeyDown: (e) => e.key === "Enter" && run(),
					placeholder: "e.g. 'Top 10 customers by MRR last month'",
					className: "flex-1 rounded-xl border border-border bg-background/60 px-3 py-2.5 text-sm outline-none focus:border-primary/60"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: run,
					className: "inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-br from-primary to-primary-glow px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-[0_0_16px_-4px_var(--color-primary)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-4 w-4" }), " Run"]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 px-1 text-[11px] text-muted-foreground",
				children: "Queries and results appear in a new chat, powered by your backend."
			})]
		})]
	}) });
}
//#endregion
export { SqlPage as component };
