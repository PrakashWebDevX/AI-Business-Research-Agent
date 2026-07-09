import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { r as cn, t as Button } from "./button-PwNqyxv_.mjs";
import { t as storageService } from "./storageService-CV7i3PHS.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { S as LoaderCircle, i as Upload, r as User } from "../_libs/lucide-react.mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { t as Input } from "./input-uzm9g8Y7.mjs";
import { t as Label } from "./label-BeT0bXvu.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DamjaduW.mjs";
import { a as preprocessType, i as objectType, n as literalType, o as stringType, r as numberType, t as enumType } from "../_libs/zod.mjs";
import { n as useForm, t } from "../_libs/@hookform/resolvers+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/EmployeeForm-Cej0oq5m.js
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
objectType({
	email: stringType().email("Invalid email"),
	password: stringType().min(6, "Password must be at least 6 characters")
}).extend({ password: stringType().min(8, "Password must be at least 8 characters") });
objectType({ email: stringType().email("Invalid email") });
objectType({
	password: stringType().min(8, "Password must be at least 8 characters"),
	confirm: stringType()
}).refine((d) => d.password === d.confirm, {
	message: "Passwords do not match",
	path: ["confirm"]
});
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
function EmployeeForm({ initial, submitLabel, onSubmit, onDeleteOldImage }) {
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const [imageUrl, setImageUrl] = (0, import_react.useState)(initial?.profile_image ?? null);
	const fileRef = (0, import_react.useRef)(null);
	const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
		resolver: t(employeeSchema),
		defaultValues: {
			employee_id: initial?.employee_id ?? "",
			first_name: initial?.first_name ?? "",
			last_name: initial?.last_name ?? "",
			email: initial?.email ?? "",
			phone: initial?.phone ?? "",
			gender: initial?.gender ?? "",
			department: initial?.department ?? "",
			designation: initial?.designation ?? "",
			salary: initial?.salary ?? null,
			joining_date: initial?.joining_date ?? "",
			date_of_birth: initial?.date_of_birth ?? "",
			address: initial?.address ?? "",
			city: initial?.city ?? "",
			state: initial?.state ?? "",
			country: initial?.country ?? "",
			zip_code: initial?.zip_code ?? "",
			status: initial?.status ?? "active",
			profile_image: initial?.profile_image ?? "",
			notes: initial?.notes ?? ""
		}
	});
	const handleUpload = async (file) => {
		setUploading(true);
		try {
			const oldUrl = imageUrl;
			const url = await storageService.uploadProfileImage(file, watch("employee_id") || "new");
			setImageUrl(url);
			setValue("profile_image", url);
			if (oldUrl && onDeleteOldImage) await onDeleteOldImage(oldUrl);
			toast.success("Photo uploaded");
		} catch (e) {
			toast.error("Upload failed", { description: e.message });
		} finally {
			setUploading(false);
		}
	};
	const submit = handleSubmit(async (v) => {
		setSubmitting(true);
		try {
			await onSubmit({
				employee_id: v.employee_id,
				first_name: v.first_name,
				last_name: v.last_name,
				email: v.email,
				phone: v.phone || null,
				gender: v.gender || null,
				department: v.department || null,
				designation: v.designation || null,
				salary: v.salary ?? null,
				joining_date: v.joining_date || null,
				date_of_birth: v.date_of_birth || null,
				address: v.address || null,
				city: v.city || null,
				state: v.state || null,
				country: v.country || null,
				zip_code: v.zip_code || null,
				status: v.status,
				profile_image: v.profile_image || imageUrl || null,
				notes: v.notes || null
			});
		} finally {
			setSubmitting(false);
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.form, {
		initial: {
			opacity: 0,
			y: 8
		},
		animate: {
			opacity: 1,
			y: 0
		},
		onSubmit: submit,
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "glass rounded-2xl p-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center gap-4 sm:flex-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-24 w-24 shrink-0 place-items-center overflow-hidden rounded-2xl bg-muted",
						children: imageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: imageUrl,
							alt: "",
							className: "h-full w-full object-cover"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-8 w-8 text-muted-foreground" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							ref: fileRef,
							type: "file",
							accept: "image/*",
							className: "hidden",
							onChange: (e) => {
								const f = e.target.files?.[0];
								if (f) handleUpload(f);
								e.target.value = "";
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							variant: "outline",
							onClick: () => fileRef.current?.click(),
							disabled: uploading,
							children: [uploading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "mr-2 h-4 w-4" }), "Upload photo"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs text-muted-foreground",
							children: "JPG or PNG · up to 5MB"
						})
					] })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Personal information",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Grid, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Employee ID *",
						error: errors.employee_id?.message,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { ...register("employee_id") })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "First name *",
						error: errors.first_name?.message,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { ...register("first_name") })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Last name *",
						error: errors.last_name?.message,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { ...register("last_name") })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Email *",
						error: errors.email?.message,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "email",
							...register("email")
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Phone",
						error: errors.phone?.message,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { ...register("phone") })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Gender",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: watch("gender") || "",
							onValueChange: (v) => setValue("gender", v),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "male",
									children: "Male"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "female",
									children: "Female"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "other",
									children: "Other"
								})
							] })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Date of birth",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "date",
							...register("date_of_birth")
						})
					})
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Employment",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Grid, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Department",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							...register("department"),
							placeholder: "e.g. Engineering"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Designation",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							...register("designation"),
							placeholder: "e.g. Senior Developer"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Salary",
						error: errors.salary?.message,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							step: "0.01",
							...register("salary")
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Joining date",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "date",
							...register("joining_date")
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Status",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: watch("status"),
							onValueChange: (v) => setValue("status", v),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "active",
									children: "Active"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "inactive",
									children: "Inactive"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "on_leave",
									children: "On leave"
								})
							] })]
						})
					})
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Address",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Grid, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Address",
						className: "sm:col-span-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { ...register("address") })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "City",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { ...register("city") })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "State",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { ...register("state") })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Country",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { ...register("country") })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "ZIP / Postal",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { ...register("zip_code") })
					})
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Notes",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					rows: 4,
					...register("notes"),
					placeholder: "Additional notes about this employee…"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "sticky bottom-0 flex justify-end gap-2 rounded-2xl border border-border bg-card/70 p-3 backdrop-blur",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "submit",
					disabled: submitting,
					children: [submitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }) : null, submitLabel]
				})
			})
		]
	});
}
function Section({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass rounded-2xl p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground",
			children: title
		}), children]
	});
}
function Grid({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
		children
	});
}
function Field({ label, error, className, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `space-y-1 ${className ?? ""}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }),
			children,
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-destructive",
				children: error
			})
		]
	});
}
//#endregion
export { EmployeeForm as t };
