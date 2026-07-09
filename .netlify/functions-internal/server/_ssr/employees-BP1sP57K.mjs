import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { r as cn, t as Button } from "./button-PwNqyxv_.mjs";
import { t as employeeService } from "./employeeService-BXujRalG.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, l as Badge, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./alert-dialog-2sUK3ztb.mjs";
import { o as keepPreviousData } from "../_libs/tanstack__query-core.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { D as FileSpreadsheet, E as FileText, F as ChevronRight, I as ChevronLeft, L as ChevronDown, O as Eye, P as ChevronUp, R as Check, S as LoaderCircle, T as Funnel, a as Trash2, d as Search, f as Plus, i as Upload, k as Download, n as Users, s as SquarePen } from "../_libs/lucide-react.mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { t as Input } from "./input-uzm9g8Y7.mjs";
import { n as CheckboxIndicator, t as Checkbox$1 } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DamjaduW.mjs";
import { n as DropdownMenuContent, o as DropdownMenuTrigger, r as DropdownMenuItem, t as DropdownMenu } from "./dropdown-menu-CsR71wG4.mjs";
import { t as require_papaparse } from "../_libs/papaparse.mjs";
import { n as writeSync, t as utils } from "../_libs/xlsx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/employees-BP1sP57K.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_papaparse = /* @__PURE__ */ __toESM(require_papaparse());
var Checkbox = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$1, {
	ref,
	className: cn("grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxIndicator, {
		className: cn("grid place-content-center text-current"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" })
	})
}));
Checkbox.displayName = Checkbox$1.displayName;
var EXPORT_FIELDS = [
	"employee_id",
	"first_name",
	"last_name",
	"email",
	"phone",
	"gender",
	"department",
	"designation",
	"salary",
	"joining_date",
	"date_of_birth",
	"address",
	"city",
	"state",
	"country",
	"zip_code",
	"status"
];
function exportEmployeesCSV(employees) {
	const rows = employees.map((e) => Object.fromEntries(EXPORT_FIELDS.map((f) => [f, e[f] ?? ""])));
	const csv = import_papaparse.default.unparse(rows);
	triggerDownload(new Blob([csv], { type: "text/csv;charset=utf-8" }), "employees.csv");
}
function exportEmployeesXLSX(employees) {
	const rows = employees.map((e) => Object.fromEntries(EXPORT_FIELDS.map((f) => [f, e[f] ?? ""])));
	const ws = utils.json_to_sheet(rows);
	const wb = utils.book_new();
	utils.book_append_sheet(wb, ws, "Employees");
	const buf = writeSync(wb, {
		bookType: "xlsx",
		type: "array"
	});
	triggerDownload(new Blob([buf], { type: "application/octet-stream" }), "employees.xlsx");
}
function parseEmployeesCSV(file) {
	return new Promise((resolve, reject) => {
		import_papaparse.default.parse(file, {
			header: true,
			skipEmptyLines: true,
			complete: (res) => {
				try {
					resolve(res.data.map((r) => ({
						employee_id: r.employee_id?.trim() || "",
						first_name: r.first_name?.trim() || "",
						last_name: r.last_name?.trim() || "",
						email: r.email?.trim() || "",
						phone: r.phone || null,
						gender: r.gender || null,
						department: r.department || null,
						designation: r.designation || null,
						salary: r.salary ? Number(r.salary) : null,
						joining_date: r.joining_date || null,
						date_of_birth: r.date_of_birth || null,
						address: r.address || null,
						city: r.city || null,
						state: r.state || null,
						country: r.country || null,
						zip_code: r.zip_code || null,
						status: r.status?.toLowerCase() || "active",
						profile_image: null,
						notes: r.notes || null
					})).filter((r) => r.employee_id && r.email));
				} catch (e) {
					reject(e);
				}
			},
			error: reject
		});
	});
}
function triggerDownload(blob, filename) {
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	a.click();
	URL.revokeObjectURL(url);
}
var PAGE_SIZE = 10;
function EmployeesPage() {
	const qc = useQueryClient();
	const navigate = useNavigate();
	const fileRef = (0, import_react.useRef)(null);
	const [page, setPage] = (0, import_react.useState)(1);
	const [search, setSearch] = (0, import_react.useState)("");
	const [department, setDepartment] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("all");
	const [sortBy, setSortBy] = (0, import_react.useState)("created_at");
	const [sortDir, setSortDir] = (0, import_react.useState)("desc");
	const [selected, setSelected] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const [confirmDelete, setConfirmDelete] = (0, import_react.useState)({
		ids: [],
		open: false
	});
	const params = {
		search,
		department,
		status,
		sortBy,
		sortDir,
		page,
		pageSize: PAGE_SIZE
	};
	const { data, isLoading, isFetching, error } = useQuery({
		queryKey: ["employees", params],
		queryFn: () => employeeService.list(params),
		placeholderData: keepPreviousData
	});
	const { data: departments = [] } = useQuery({
		queryKey: ["departments"],
		queryFn: () => employeeService.departments()
	});
	const delMut = useMutation({
		mutationFn: (ids) => employeeService.bulkRemove(ids),
		onSuccess: (_r, ids) => {
			toast.success(`${ids.length} employee${ids.length > 1 ? "s" : ""} deleted`);
			setSelected(/* @__PURE__ */ new Set());
			qc.invalidateQueries({ queryKey: ["employees"] });
			qc.invalidateQueries({ queryKey: ["departments"] });
		},
		onError: (e) => toast.error("Delete failed", { description: e.message })
	});
	const importMut = useMutation({
		mutationFn: async (file) => {
			const rows = await parseEmployeesCSV(file);
			return employeeService.bulkInsert(rows);
		},
		onSuccess: (r) => {
			toast.success(`Imported ${r.inserted} employees`);
			qc.invalidateQueries({ queryKey: ["employees"] });
		},
		onError: (e) => toast.error("Import failed", { description: e.message })
	});
	const rows = data?.data ?? [];
	const total = data?.count ?? 0;
	const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
	const allSelectedOnPage = rows.length > 0 && rows.every((r) => selected.has(r.id));
	const someSelectedOnPage = rows.some((r) => selected.has(r.id)) && !allSelectedOnPage;
	const toggleAll = () => {
		const next = new Set(selected);
		if (allSelectedOnPage) rows.forEach((r) => next.delete(r.id));
		else rows.forEach((r) => next.add(r.id));
		setSelected(next);
	};
	const toggleOne = (id) => {
		const next = new Set(selected);
		next.has(id) ? next.delete(id) : next.add(id);
		setSelected(next);
	};
	const toggleSort = (col) => {
		if (sortBy === col) setSortDir(sortDir === "asc" ? "desc" : "asc");
		else {
			setSortBy(col);
			setSortDir("asc");
		}
	};
	(0, import_react.useMemo)(async () => rows, [rows]);
	const handleExport = async (kind) => {
		try {
			const all = await employeeService.getAll();
			const target = selected.size > 0 ? all.filter((e) => selected.has(e.id)) : all;
			if (!target.length) return toast.error("Nothing to export");
			if (kind === "csv") exportEmployeesCSV(target);
			else exportEmployeesXLSX(target);
			toast.success(`Exported ${target.length} employees`);
		} catch (e) {
			toast.error("Export failed", { description: e.message });
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-7xl px-4 py-8 md:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-6 flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-semibold tracking-tight md:text-3xl",
					children: "Employees"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted-foreground",
					children: [
						total,
						" total · ",
						selected.size,
						" selected"
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							ref: fileRef,
							type: "file",
							accept: ".csv",
							className: "hidden",
							onChange: (e) => {
								const f = e.target.files?.[0];
								if (f) importMut.mutate(f);
								e.target.value = "";
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							onClick: () => fileRef.current?.click(),
							disabled: importMut.isPending,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "mr-2 h-4 w-4" }), importMut.isPending ? "Importing…" : "Import CSV"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "mr-2 h-4 w-4" }), " Export"]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
							align: "end",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
								onClick: () => handleExport("csv"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "mr-2 h-4 w-4" }), " CSV"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
								onClick: () => handleExport("xlsx"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, { className: "mr-2 h-4 w-4" }), " Excel"]
							})]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: () => navigate({ to: "/employees/new" }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 h-4 w-4" }), " New employee"]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass mb-3 flex flex-wrap items-center gap-2 rounded-2xl p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative min-w-[220px] flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: search,
							onChange: (e) => {
								setSearch(e.target.value);
								setPage(1);
							},
							placeholder: "Search name, email, employee ID…",
							className: "pl-9"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: department || "__all",
						onValueChange: (v) => {
							setDepartment(v === "__all" ? "" : v);
							setPage(1);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger, {
							className: "w-[180px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "mr-2 h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Department" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "__all",
							children: "All departments"
						}), departments.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: d,
							children: d
						}, d))] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: status ?? "all",
						onValueChange: (v) => {
							setStatus(v);
							setPage(1);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "w-[160px]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Status" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "all",
								children: "All statuses"
							}),
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
					}),
					selected.size > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "destructive",
						onClick: () => setConfirmDelete({
							ids: Array.from(selected),
							open: true
						}),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "mr-2 h-4 w-4" }),
							" Delete ",
							selected.size
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass overflow-hidden rounded-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[820px] text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "border-b border-border bg-card/50 text-xs uppercase text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "w-10 px-3 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
										checked: allSelectedOnPage ? true : someSelectedOnPage ? "indeterminate" : false,
										onCheckedChange: toggleAll
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortHead, {
									label: "Employee",
									col: "first_name",
									sortBy,
									sortDir,
									onClick: toggleSort
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortHead, {
									label: "Email",
									col: "email",
									sortBy,
									sortDir,
									onClick: toggleSort
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortHead, {
									label: "Department",
									col: "department",
									sortBy,
									sortDir,
									onClick: toggleSort
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortHead, {
									label: "Designation",
									col: "designation",
									sortBy,
									sortDir,
									onClick: toggleSort
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortHead, {
									label: "Status",
									col: "status",
									sortBy,
									sortDir,
									onClick: toggleSort
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortHead, {
									label: "Joined",
									col: "joining_date",
									sortBy,
									sortDir,
									onClick: toggleSort
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "w-24 px-3 py-3 text-right",
									children: "Actions"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: isLoading ? Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
							className: "border-b border-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								colSpan: 8,
								className: "px-3 py-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "shimmer h-5 rounded-md",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "shimmer-inner h-full w-full rounded-md" })
								})
							})
						}, i)) : rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							colSpan: 8,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {})
						}) }) : rows.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.tr, {
							initial: { opacity: 0 },
							animate: { opacity: 1 },
							className: "border-b border-border/70 last:border-none hover:bg-accent/30",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
										checked: selected.has(e.id),
										onCheckedChange: () => toggleOne(e.id)
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
											url: e.profile_image,
											name: `${e.first_name} ${e.last_name}`
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "font-medium",
											children: [
												e.first_name,
												" ",
												e.last_name
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs text-muted-foreground",
											children: e.employee_id
										})] })]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-3 text-muted-foreground",
									children: e.email
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-3",
									children: e.department || "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-3 text-muted-foreground",
									children: e.designation || "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: e.status })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-3 text-muted-foreground",
									children: e.joining_date || "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-3 text-right",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "inline-flex gap-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												size: "icon",
												variant: "ghost",
												asChild: true,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
													to: "/employees/$id",
													params: { id: e.id },
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" })
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												size: "icon",
												variant: "ghost",
												asChild: true,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
													to: "/employees/$id/edit",
													params: { id: e.id },
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "h-4 w-4" })
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												size: "icon",
												variant: "ghost",
												onClick: () => setConfirmDelete({
													ids: [e.id],
													open: true
												}),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4 text-destructive" })
											})
										]
									})
								})
							]
						}, e.id)) })]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-3 border-t border-border px-3 py-3 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						isFetching && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 inline h-3 w-3 animate-spin" }),
						"Page ",
						page,
						" of ",
						totalPages
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "outline",
							disabled: page <= 1,
							onClick: () => setPage(page - 1),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-4 w-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "outline",
							disabled: page >= totalPages,
							onClick: () => setPage(page + 1),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4" })
						})]
					})]
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive",
				children: error.message
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
				open: confirmDelete.open,
				onOpenChange: (o) => setConfirmDelete((s) => ({
					...s,
					open: o
				})),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogTitle, { children: [
					"Delete ",
					confirmDelete.ids.length,
					" employee(s)?"
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: "This action cannot be undone. All associated data will be removed." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Cancel" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
					onClick: () => {
						delMut.mutate(confirmDelete.ids);
						setConfirmDelete({
							ids: [],
							open: false
						});
					},
					children: "Delete"
				})] })] })
			})
		]
	});
}
function SortHead({ label, col, sortBy, sortDir, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
		className: "px-3 py-3 text-left",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: () => onClick(col),
			className: "inline-flex items-center gap-1 hover:text-foreground",
			children: [label, sortBy === col && (sortDir === "asc" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "h-3 w-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-3 w-3" }))]
		})
	});
}
function StatusBadge({ status }) {
	const map = {
		active: "bg-success/15 text-success",
		inactive: "bg-destructive/15 text-destructive",
		on_leave: "bg-warning/15 text-warning"
	};
	const label = {
		active: "Active",
		inactive: "Inactive",
		on_leave: "On leave"
	}[status];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		className: `${map[status]} border-none`,
		children: label
	});
}
function Avatar({ url, name }) {
	if (url) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: url,
		alt: name,
		className: "h-9 w-9 rounded-full object-cover"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-primary to-primary-glow text-xs font-semibold text-primary-foreground",
		children: name.split(" ").filter(Boolean).map((n) => n[0]).join("").slice(0, 2).toUpperCase() || "?"
	});
}
function EmptyState() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center justify-center gap-3 py-16 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-6 w-6" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "font-medium",
				children: "No employees found"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 text-xs text-muted-foreground",
				children: "Add your first employee or adjust filters."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				size: "sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/employees/new",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1 h-4 w-4" }), " Add employee"]
				})
			})
		]
	});
}
//#endregion
export { EmployeesPage as component };
