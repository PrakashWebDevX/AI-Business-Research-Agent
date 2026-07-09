import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { H as Bookmark, c as Sparkles, g as MessageSquare, j as Database, k as Download, w as Globe, z as ChartColumn } from "../_libs/lucide-react.mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { n as isApiConfigured } from "./api-CZU_4io-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-Byr5o278.js
var import_jsx_runtime = require_jsx_runtime();
var TILES = [
	{
		to: "/chat",
		title: "AI Chat",
		desc: "Ask questions and get grounded answers.",
		icon: MessageSquare
	},
	{
		to: "/sql",
		title: "SQL Agent",
		desc: "Query your database in natural language.",
		icon: Database
	},
	{
		to: "/research",
		title: "Web Research",
		desc: "Deep research across the web.",
		icon: Globe
	},
	{
		to: "/analytics",
		title: "Analytics",
		desc: "Usage and performance insights.",
		icon: ChartColumn
	},
	{
		to: "/saved",
		title: "Saved Reports",
		desc: "Revisit reports you've bookmarked.",
		icon: Bookmark
	},
	{
		to: "/exports",
		title: "Exports",
		desc: "Download data as CSV, Excel, or JSON.",
		icon: Download
	}
];
function DashboardPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				y: 12
			},
			animate: {
				opacity: 1,
				y: 0
			},
			transition: { duration: .4 },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-8 flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-lg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-semibold tracking-tight",
						children: "AI Business Research Agent"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Chat, query, and research — powered by your FastAPI backend."
					})] })]
				}),
				!isApiConfigured && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-6 rounded-xl border border-yellow-500/40 bg-yellow-500/10 p-4 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "VITE_API_URL is not set." }), " Add it to your environment to connect to your FastAPI backend on Railway."]
				}),
				isApiConfigured && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-6 rounded-xl border border-border bg-card/60 p-4 text-xs text-muted-foreground",
					children: ["Backend: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
						className: "text-foreground",
						children: ""
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
					children: TILES.map((t, i) => {
						const Icon = t.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							initial: {
								opacity: 0,
								y: 10
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: { delay: i * .05 },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: t.to,
								className: "group block rounded-2xl border border-border bg-card/60 p-5 backdrop-blur transition hover:border-primary/50 hover:bg-card",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mb-3 grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-base font-semibold",
										children: t.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1 text-sm text-muted-foreground",
										children: t.desc
									})
								]
							})
						}, t.to);
					})
				})
			]
		})
	});
}
//#endregion
export { DashboardPage as component };
