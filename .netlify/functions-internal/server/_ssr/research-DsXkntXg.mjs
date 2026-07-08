import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { k as Globe, m as Search } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-BhUDBud7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/research-DsXkntXg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ResearchPage() {
	const [q, setQ] = (0, import_react.useState)("");
	const navigate = useNavigate();
	const submit = () => {
		const prompt = q.trim() || "Research this topic on the open web";
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
				children: "Research"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Cited synthesis across the open web."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "h-3 w-3" }), " Web crawler"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "glass rounded-2xl p-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "ml-2 h-4 w-4 text-muted-foreground" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: q,
						onChange: (e) => setQ(e.target.value),
						onKeyDown: (e) => e.key === "Enter" && submit(),
						placeholder: "Research a topic — e.g. 'Latest AI regulation in the EU'",
						className: "flex-1 rounded-xl border border-border bg-background/60 px-3 py-2.5 text-sm outline-none focus:border-primary/60"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: submit,
						className: "rounded-xl bg-gradient-to-br from-primary to-primary-glow px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-[0_0_16px_-4px_var(--color-primary)]",
						children: "Research"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 px-1 text-[11px] text-muted-foreground",
				children: "Results appear in a new chat, powered by your backend."
			})]
		})]
	}) });
}
//#endregion
export { ResearchPage as component };
