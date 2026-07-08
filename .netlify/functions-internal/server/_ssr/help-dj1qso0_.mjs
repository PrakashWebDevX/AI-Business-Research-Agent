import { E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { E as LifeBuoy, O as Keyboard, Q as BookOpen, S as Mail } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-BhUDBud7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/help-dj1qso0_.js
var import_jsx_runtime = require_jsx_runtime();
var items = [
	{
		icon: BookOpen,
		title: "Documentation",
		desc: "Learn how to connect your data and configure agents."
	},
	{
		icon: Keyboard,
		title: "Keyboard shortcuts",
		desc: "Move faster with hotkeys — press ⌘K to search."
	},
	{
		icon: LifeBuoy,
		title: "Community",
		desc: "Ask questions and share workflows with other teams."
	},
	{
		icon: Mail,
		title: "Contact support",
		desc: "Get in touch with our team for account and billing help."
	}
];
function HelpPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-4xl px-4 py-8 md:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-semibold tracking-tight md:text-3xl",
				children: "Help & docs"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Everything you need to get productive."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2",
				children: items.map((i) => {
					const Icon = i.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "#",
						className: "glass group flex items-start gap-3 rounded-2xl p-4 transition hover:border-primary/40",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm font-semibold",
							children: i.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-muted-foreground",
							children: i.desc
						})] })]
					}, i.title);
				})
			})
		]
	}) });
}
//#endregion
export { HelpPage as component };
