import { o as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useNavigate, g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { E as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Route } from "./_id-BWu_Bu4z.mjs";
import { t as employeeService } from "./_ssr/employeeService-BXujRalG.mjs";
import { t as Button } from "./_ssr/button-BkEeRci-.mjs";
import { t as storageService } from "./_ssr/storageService-CV7i3PHS.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, l as Badge, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./_ssr/alert-dialog-xLw1GTfb.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "./_libs/tanstack__react-query.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { t as motion } from "./_libs/framer-motion.mjs";
import { L as DollarSign, S as Mail, T as LoaderCircle, X as Building2, Y as Calendar, _ as Phone, d as SquarePen, l as Trash2, r as User, tt as ArrowLeft, x as MapPin } from "./_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_id-fwE16Uzm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function EmployeeDetail() {
	const { id } = Route.useParams();
	const qc = useQueryClient();
	const navigate = useNavigate();
	const [confirmOpen, setConfirmOpen] = (0, import_react.useState)(false);
	const { data, isLoading, error } = useQuery({
		queryKey: ["employees", id],
		queryFn: () => employeeService.get(id)
	});
	const delMut = useMutation({
		mutationFn: async () => {
			if (data?.profile_image) await storageService.deleteByPublicUrl(data.profile_image);
			await employeeService.remove(id);
		},
		onSuccess: () => {
			toast.success("Employee deleted");
			qc.invalidateQueries({ queryKey: ["employees"] });
			navigate({ to: "/employees" });
		},
		onError: (e) => toast.error("Delete failed", { description: e.message })
	});
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-[60vh] place-items-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-6 w-6 animate-spin text-muted-foreground" })
	});
	if (error || !data) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-lg p-8 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: error?.message ?? "Not found"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			className: "mt-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/employees",
				children: "Back"
			})
		})]
	});
	const fullName = `${data.first_name} ${data.last_name}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-5xl px-4 py-8 md:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "sm",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/employees",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "mr-1 h-4 w-4" }), " Back"]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/employees/$id/edit",
							params: { id },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "mr-1 h-4 w-4" }), " Edit"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "destructive",
						onClick: () => setConfirmOpen(true),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "mr-1 h-4 w-4" }), " Delete"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: {
					opacity: 0,
					y: 8
				},
				animate: {
					opacity: 1,
					y: 0
				},
				className: "glass rounded-2xl p-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-start gap-6 sm:flex-row sm:items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-24 w-24 shrink-0 place-items-center overflow-hidden rounded-2xl bg-muted",
						children: data.profile_image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: data.profile_image,
							alt: fullName,
							className: "h-full w-full object-cover"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-10 w-10 text-muted-foreground" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-2xl font-semibold tracking-tight",
							children: fullName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted-foreground",
							children: [
								data.designation || "—",
								" · ",
								data.department || "—"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex flex-wrap items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								className: "border-none bg-primary/15 text-primary",
								children: data.employee_id
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: data.status })]
						})
					] })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 grid grid-cols-1 gap-3 lg:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						title: "Contact",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								icon: Mail,
								label: "Email",
								value: data.email
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								icon: Phone,
								label: "Phone",
								value: data.phone || "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								icon: MapPin,
								label: "Address",
								value: [
									data.address,
									data.city,
									data.state,
									data.country,
									data.zip_code
								].filter(Boolean).join(", ") || "—"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						title: "Employment",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								icon: Building2,
								label: "Department",
								value: data.department || "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								icon: User,
								label: "Designation",
								value: data.designation || "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								icon: DollarSign,
								label: "Salary",
								value: data.salary != null ? `$${data.salary.toLocaleString()}` : "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								icon: Calendar,
								label: "Joining date",
								value: data.joining_date || "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								icon: Calendar,
								label: "Date of birth",
								value: data.date_of_birth || "—"
							})
						]
					}),
					data.notes && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						title: "Notes",
						className: "lg:col-span-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "whitespace-pre-wrap text-sm text-muted-foreground",
							children: data.notes
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
				open: confirmOpen,
				onOpenChange: setConfirmOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogTitle, { children: [
					"Delete ",
					fullName,
					"?"
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: "This action cannot be undone." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Cancel" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
					onClick: () => delMut.mutate(),
					children: "Delete"
				})] })] })
			})
		]
	});
}
function StatusBadge({ status }) {
	const cls = {
		active: "bg-success/15 text-success",
		inactive: "bg-destructive/15 text-destructive",
		on_leave: "bg-warning/15 text-warning"
	}[status];
	const label = {
		active: "Active",
		inactive: "Inactive",
		on_leave: "On leave"
	}[status];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		className: `${cls} border-none`,
		children: label
	});
}
function Card({ title, children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `glass rounded-2xl p-6 ${className ?? ""}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-3",
			children
		})]
	});
}
function Row({ icon: Icon, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-start gap-3 text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 flex-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs text-muted-foreground",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "truncate",
				children: value
			})]
		})]
	});
}
//#endregion
export { EmployeeDetail as component };
