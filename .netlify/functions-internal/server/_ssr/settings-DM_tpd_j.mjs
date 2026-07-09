import { E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-PwNqyxv_.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as Trash2, l as Settings } from "../_libs/lucide-react.mjs";
import { n as isApiConfigured } from "./api-CZU_4io-.mjs";
import { n as sessionsService } from "./sessionsService-BL_l5wKS.mjs";
import { n as useAuth } from "./useAuth-BK1by1Rh.mjs";
import { n as useTheme } from "./useTheme-BO-0R1eM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-DM_tpd_j.js
var import_jsx_runtime = require_jsx_runtime();
function SettingsPage() {
	const { user } = useAuth();
	const { theme, toggle } = useTheme();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl space-y-6 px-4 py-6 md:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-lg font-semibold",
					children: "Settings"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				title: "Account",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					label: "Email",
					value: user?.email ?? "—"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					label: "User ID",
					value: user?.id ?? "—",
					mono: true
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Appearance",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-sm",
						children: ["Theme: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium capitalize",
							children: theme
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "outline",
						onClick: toggle,
						children: "Toggle"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Backend",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					label: "VITE_API_URL",
					value: isApiConfigured ? "" : "Not configured",
					mono: true
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Data",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					onClick: async () => {
						const all = await sessionsService.list();
						await Promise.all(all.map((s) => sessionsService.remove(s.id)));
						toast.success("Chat history cleared");
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "mr-2 h-4 w-4" }), " Clear chat history"]
				})
			})
		]
	});
}
function Section({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-border bg-card/60 p-5 backdrop-blur",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-3 font-semibold",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-3",
			children
		})]
	});
}
function Row({ label, value, mono }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between gap-3 text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "truncate " + (mono ? "font-mono text-xs" : ""),
			children: value
		})]
	});
}
//#endregion
export { SettingsPage as component };
