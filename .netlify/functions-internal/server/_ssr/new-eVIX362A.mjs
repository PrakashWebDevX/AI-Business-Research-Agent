import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as employeeService } from "./employeeService-BXujRalG.mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { i as useQueryClient, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { tt as ArrowLeft } from "../_libs/lucide-react.mjs";
import { t as EmployeeForm } from "./EmployeeForm-CC_AuJos.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/new-eVIX362A.js
var import_jsx_runtime = require_jsx_runtime();
function NewEmployeePage() {
	const qc = useQueryClient();
	const navigate = useNavigate();
	const mut = useMutation({
		mutationFn: employeeService.create,
		onSuccess: (e) => {
			toast.success("Employee created");
			qc.invalidateQueries({ queryKey: ["employees"] });
			qc.invalidateQueries({ queryKey: ["departments"] });
			navigate({
				to: "/employees/$id",
				params: { id: e.id }
			});
		},
		onError: (e) => toast.error("Create failed", { description: e.message })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-5xl px-4 py-8 md:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "sm",
				asChild: true,
				className: "mb-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/employees",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "mr-1 h-4 w-4" }), " Back to employees"]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mb-6 text-2xl font-semibold tracking-tight md:text-3xl",
				children: "New employee"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmployeeForm, {
				submitLabel: "Create employee",
				onSubmit: async (v) => {
					await mut.mutateAsync(v);
				}
			})
		]
	});
}
//#endregion
export { NewEmployeePage as component };
