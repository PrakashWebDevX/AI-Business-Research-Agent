import { E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { N as CircleQuestionMark } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/help-CYImnOoK.js
var import_jsx_runtime = require_jsx_runtime();
function HelpPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl space-y-5 px-4 py-6 md:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, { className: "h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-lg font-semibold",
					children: "Help"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				title: "Getting started",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
					className: "list-decimal space-y-1 pl-5 text-sm text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Sign in with Google or email/password." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Use the AI Chat for open questions." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Use SQL Agent to query your database in plain language." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Use Web Research for market and competitive intel." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Save results and export as CSV, Excel, or JSON." })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				title: "Environment",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted-foreground",
					children: [
						"The frontend calls your FastAPI backend at",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
							className: "rounded bg-muted px-1 py-0.5 text-xs",
							children: "VITE_API_URL"
						}),
						". Supabase is used only for authentication (",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
							className: "rounded bg-muted px-1 py-0.5 text-xs",
							children: "VITE_SUPABASE_URL"
						}),
						",",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
							className: "rounded bg-muted px-1 py-0.5 text-xs",
							children: "VITE_SUPABASE_ANON_KEY"
						}),
						")."
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				title: "Expected FastAPI endpoints",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "list-disc space-y-1 pl-5 text-sm text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: "POST /chat" }),
							" — ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: `{ message, session_id }` })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: "POST /sql" }),
							" — ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: `{ query }` })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: "POST /research" }),
							" — ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: `{ topic }` })
						] })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-xs text-muted-foreground",
					children: [
						"Requests include the Supabase JWT as ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: "Authorization: Bearer <token>" }),
						" when a user is signed in."
					]
				})]
			})
		]
	});
}
function Card({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-border bg-card/60 p-5 backdrop-blur",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-2 font-semibold",
			children: title
		}), children]
	});
}
//#endregion
export { HelpPage as component };
