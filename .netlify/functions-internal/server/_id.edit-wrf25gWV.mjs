import { _ as useNavigate, g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { E as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./_ssr/button-PwNqyxv_.mjs";
import { t as storageService } from "./_ssr/storageService-CV7i3PHS.mjs";
import { t as employeeService } from "./_ssr/employeeService-BXujRalG.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "./_libs/tanstack__react-query.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { S as LoaderCircle, W as ArrowLeft } from "./_libs/lucide-react.mjs";
import { t as Route } from "./_id.edit-CL0COmaf.mjs";
import { t as EmployeeForm } from "./_ssr/EmployeeForm-Cej0oq5m.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_id.edit-wrf25gWV.js
var import_jsx_runtime = require_jsx_runtime();
function EditEmployeePage() {
	const { id } = Route.useParams();
	const qc = useQueryClient();
	const navigate = useNavigate();
	const { data, isLoading } = useQuery({
		queryKey: ["employees", id],
		queryFn: () => employeeService.get(id)
	});
	const mut = useMutation({
		mutationFn: (input) => employeeService.update(id, input),
		onSuccess: () => {
			toast.success("Employee updated");
			qc.invalidateQueries({ queryKey: ["employees"] });
			qc.invalidateQueries({ queryKey: ["departments"] });
			navigate({
				to: "/employees/$id",
				params: { id }
			});
		},
		onError: (e) => toast.error("Update failed", { description: e.message })
	});
	if (isLoading || !data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-[60vh] place-items-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-6 w-6 animate-spin text-muted-foreground" })
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
					to: "/employees/$id",
					params: { id },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "mr-1 h-4 w-4" }), " Back"]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "mb-6 text-2xl font-semibold tracking-tight md:text-3xl",
				children: [
					"Edit ",
					data.first_name,
					" ",
					data.last_name
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmployeeForm, {
				initial: data,
				submitLabel: "Save changes",
				onSubmit: async (v) => {
					await mut.mutateAsync(v);
				},
				onDeleteOldImage: async (url) => {
					if (url && url !== data.profile_image) await storageService.deleteByPublicUrl(url);
				}
			})
		]
	});
}
//#endregion
export { EditEmployeePage as component };
