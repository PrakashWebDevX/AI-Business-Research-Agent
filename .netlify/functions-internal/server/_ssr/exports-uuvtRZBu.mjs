import { E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-PwNqyxv_.mjs";
import { k as Download } from "../_libs/lucide-react.mjs";
import { t as savedService } from "./sessionsService-BL_l5wKS.mjs";
import { t as exportService } from "./exportService-AXf_ZU26.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/exports-uuvtRZBu.js
var import_jsx_runtime = require_jsx_runtime();
function ExportsPage() {
	const items = savedService.list();
	const flat = items.map((r) => ({
		id: r.id,
		title: r.title,
		kind: r.kind,
		createdAt: r.createdAt,
		payload: JSON.stringify(r.payload).slice(0, 500)
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-4xl space-y-4 px-4 py-6 md:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-lg font-semibold",
					children: "Exports"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Export your saved reports in the format you need."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						disabled: !flat.length,
						onClick: () => exportService.csv("reports", flat),
						children: "Export CSV"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						disabled: !flat.length,
						onClick: () => exportService.excel("reports", flat),
						children: "Export Excel"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						disabled: !flat.length,
						onClick: () => exportService.json("reports", items),
						children: "Export JSON"
					})
				]
			}),
			!flat.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground",
				children: "Save reports first from Chat, SQL, or Research to enable exports."
			})
		]
	});
}
//#endregion
export { ExportsPage as component };
