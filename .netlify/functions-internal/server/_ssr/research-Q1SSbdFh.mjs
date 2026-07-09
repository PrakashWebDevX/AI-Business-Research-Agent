import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-PwNqyxv_.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { H as Bookmark, S as LoaderCircle, d as Search, w as Globe } from "../_libs/lucide-react.mjs";
import { t as savedService } from "./sessionsService-BL_l5wKS.mjs";
import { t as chatService } from "./chatService-B8FzW_mU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/research-Q1SSbdFh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SUGGESTIONS = [
	"Latest funding rounds in the fintech sector this quarter",
	"Top competitors of Notion and their differentiators",
	"Emerging trends in B2B SaaS pricing in 2026"
];
function ResearchPage() {
	const [topic, setTopic] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [reply, setReply] = (0, import_react.useState)("");
	async function run(q) {
		const prompt = (q ?? topic).trim();
		if (!prompt) return;
		setTopic(prompt);
		setLoading(true);
		try {
			const r = await chatService.send(prompt);
			const text = r.reply || r.message || r.content || r.answer || r.output || r.summary || (typeof r.data === "string" ? r.data : JSON.stringify(r.data ?? r, null, 2));
			setReply(String(text));
		} catch (e) {
			toast.error("Research failed", { description: e.message });
		} finally {
			setLoading(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-4xl space-y-4 px-4 py-6 md:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-lg font-semibold",
					children: "Web Research Agent"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: topic,
						onChange: (e) => setTopic(e.target.value),
						onKeyDown: (e) => e.key === "Enter" && run(),
						placeholder: "Topic, company, market, trend…",
						className: "h-11 w-full rounded-xl border border-input bg-background pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => run(),
					disabled: loading || !topic.trim(),
					className: "h-11",
					children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : "Research"
				})]
			}),
			!reply && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: SUGGESTIONS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => run(s),
					className: "rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs text-muted-foreground hover:border-primary/50 hover:text-foreground",
					children: s
				}, s))
			}),
			reply && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-border bg-card/60 p-5 backdrop-blur",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold",
						children: "Result"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "outline",
						onClick: () => {
							savedService.save({
								id: crypto.randomUUID(),
								title: topic,
								kind: "research",
								createdAt: (/* @__PURE__ */ new Date()).toISOString(),
								payload: {
									topic,
									reply
								}
							});
							toast.success("Saved");
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "mr-2 h-4 w-4" }), " Save"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "whitespace-pre-wrap text-sm text-muted-foreground",
					children: reply
				})]
			})
		]
	});
}
//#endregion
export { ResearchPage as component };
