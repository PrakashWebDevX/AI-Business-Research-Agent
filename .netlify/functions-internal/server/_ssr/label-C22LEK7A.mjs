import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { a as preprocessType, i as objectType, n as literalType, o as stringType, r as numberType, t as enumType } from "../_libs/zod.mjs";
import { t as Root } from "../_libs/radix-ui__react-label.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/label-C22LEK7A.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var employeeSchema = objectType({
	employee_id: stringType().trim().min(1, "Employee ID is required").max(50),
	first_name: stringType().trim().min(1, "First name is required").max(80),
	last_name: stringType().trim().min(1, "Last name is required").max(80),
	email: stringType().trim().email("Invalid email").max(255),
	phone: stringType().trim().max(30).regex(/^[+\d\s()-]*$/, "Invalid phone").optional().or(literalType("")),
	gender: stringType().optional().or(literalType("")),
	department: stringType().trim().max(80).optional().or(literalType("")),
	designation: stringType().trim().max(80).optional().or(literalType("")),
	salary: preprocessType((v) => v === "" || v == null ? null : typeof v === "string" ? Number(v) : v, numberType({ invalid_type_error: "Salary must be a number" }).min(0, "Salary must be a positive number").nullable()),
	joining_date: stringType().optional().or(literalType("")),
	date_of_birth: stringType().optional().or(literalType("")),
	address: stringType().max(500).optional().or(literalType("")),
	city: stringType().max(80).optional().or(literalType("")),
	state: stringType().max(80).optional().or(literalType("")),
	country: stringType().max(80).optional().or(literalType("")),
	zip_code: stringType().max(20).optional().or(literalType("")),
	status: enumType([
		"active",
		"inactive",
		"on_leave"
	]).default("active"),
	profile_image: stringType().optional().or(literalType("")),
	notes: stringType().max(2e3).optional().or(literalType(""))
});
var loginSchema = objectType({
	email: stringType().email("Invalid email"),
	password: stringType().min(6, "Password must be at least 6 characters")
});
var signupSchema = loginSchema.extend({ password: stringType().min(8, "Password must be at least 8 characters") });
var forgotSchema = objectType({ email: stringType().email("Invalid email") });
var resetSchema = objectType({
	password: stringType().min(8, "Password must be at least 8 characters"),
	confirm: stringType()
}).refine((d) => d.password === d.confirm, {
	message: "Passwords do not match",
	path: ["confirm"]
});
var labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn(labelVariants(), className),
	...props
}));
Label.displayName = Root.displayName;
//#endregion
export { resetSchema as a, loginSchema as i, employeeSchema as n, signupSchema as o, forgotSchema as r, Label as t };
