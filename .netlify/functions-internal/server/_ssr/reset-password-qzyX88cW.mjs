import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-PwNqyxv_.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { S as LoaderCircle } from "../_libs/lucide-react.mjs";
import { t as Input } from "./input-uzm9g8Y7.mjs";
import { t as Label } from "./label-BeT0bXvu.mjs";
import { n as useForm, t } from "../_libs/@hookform/resolvers+[...].mjs";
import { t as authService } from "./authService-D2p47ZSo.mjs";
import { r as resetSchema } from "./auth-BNbGfHUP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reset-password-qzyX88cW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ResetPage() {
	const [loading, setLoading] = (0, import_react.useState)(false);
	const navigate = useNavigate();
	const { register, handleSubmit, formState: { errors } } = useForm({ resolver: t(resetSchema) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "relative flex min-h-screen items-center justify-center px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "glass w-full max-w-md rounded-2xl p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-lg font-semibold",
					children: "Set a new password"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Choose a strong password to secure your account."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "mt-5 space-y-3",
					onSubmit: handleSubmit(async (v) => {
						setLoading(true);
						try {
							await authService.updatePassword(v.password);
							toast.success("Password updated");
							navigate({ to: "/dashboard" });
						} catch (e) {
							toast.error("Update failed", { description: e.message });
						} finally {
							setLoading(false);
						}
					}),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "New password" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									...register("password"),
									type: "password"
								}),
								errors.password && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-destructive",
									children: String(errors.password.message)
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Confirm password" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									...register("confirm"),
									type: "password"
								}),
								errors.confirm && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-destructive",
									children: String(errors.confirm.message)
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: loading,
							className: "w-full",
							children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : "Update password"
						})
					]
				})
			]
		})
	});
}
//#endregion
export { ResetPage as component };
