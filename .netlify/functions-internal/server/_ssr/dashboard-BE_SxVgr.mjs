import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as employeeService } from "./employeeService-BXujRalG.mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { T as LoaderCircle, X as Building2, a as UserCheck, c as TrendingUp, h as Plus, i as UserX, n as Users } from "../_libs/lucide-react.mjs";
import { a as YAxis, d as Pie, f as Cell, l as CartesianGrid, m as Tooltip, n as PieChart, o as XAxis, p as ResponsiveContainer, r as BarChart, s as Area, t as AreaChart, u as Bar } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-BE_SxVgr.js
var import_jsx_runtime = require_jsx_runtime();
function DashboardPage() {
	const { data, isLoading, error } = useQuery({
		queryKey: ["employees", "stats"],
		queryFn: () => employeeService.stats()
	});
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {});
	if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, { message: error.message });
	const employees = data ?? [];
	const total = employees.length;
	const active = employees.filter((e) => e.status === "active").length;
	const inactive = total - active;
	const depMap = /* @__PURE__ */ new Map();
	for (const e of employees) if (e.department) depMap.set(e.department, (depMap.get(e.department) ?? 0) + 1);
	const departments = depMap.size;
	const now = /* @__PURE__ */ new Date();
	const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
	const joinedThisMonth = employees.filter((e) => e.joining_date?.startsWith(monthKey)).length;
	const growth = buildGrowth(employees);
	const departmentData = Array.from(depMap.entries()).map(([name, value]) => ({
		name,
		value
	}));
	const salaryBuckets = buildSalaryBuckets(employees);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-7xl px-4 py-8 md:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-6 flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-semibold tracking-tight md:text-3xl",
					children: "Dashboard"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Overview of your workforce."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/employees/new",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 h-4 w-4" }), " Add employee"]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3 lg:grid-cols-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						icon: Users,
						label: "Total employees",
						value: total,
						tone: "primary"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						icon: UserCheck,
						label: "Active",
						value: active,
						tone: "success"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						icon: UserX,
						label: "Inactive",
						value: inactive,
						tone: "destructive"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						icon: Building2,
						label: "Departments",
						value: departments,
						tone: "warning"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						icon: TrendingUp,
						label: "Joined this month",
						value: joinedThisMonth,
						tone: "primary"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 grid grid-cols-1 gap-3 lg:grid-cols-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "lg:col-span-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
							title: "Employee growth",
							hint: "Last 6 months"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-64",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
								width: "100%",
								height: "100%",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
									data: growth,
									margin: {
										top: 8,
										right: 8,
										left: -12,
										bottom: 0
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
											id: "g",
											x1: "0",
											y1: "0",
											x2: "0",
											y2: "1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
												offset: "0%",
												stopColor: "var(--color-primary)",
												stopOpacity: .55
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
												offset: "100%",
												stopColor: "var(--color-primary)",
												stopOpacity: 0
											})]
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
											strokeDasharray: "3 3",
											stroke: "var(--color-border)",
											vertical: false
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
											dataKey: "label",
											stroke: "var(--color-muted-foreground)",
											fontSize: 11,
											tickLine: false,
											axisLine: false
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
											stroke: "var(--color-muted-foreground)",
											fontSize: 11,
											tickLine: false,
											axisLine: false,
											allowDecimals: false
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: tooltip }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
											type: "monotone",
											dataKey: "count",
											stroke: "var(--color-primary)",
											strokeWidth: 2,
											fill: "url(#g)"
										})
									]
								})
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "lg:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, { title: "Department distribution" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-64",
							children: departmentData.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyChart, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
								width: "100%",
								height: "100%",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
									data: departmentData,
									dataKey: "value",
									innerRadius: 44,
									outerRadius: 80,
									paddingAngle: 3,
									children: departmentData.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: CHART[i % CHART.length] }, i))
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: tooltip })] })
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "lg:col-span-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
							title: "Salary distribution",
							hint: "Grouped ranges"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-56",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
								width: "100%",
								height: "100%",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
									data: salaryBuckets,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
											strokeDasharray: "3 3",
											stroke: "var(--color-border)",
											vertical: false
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
											dataKey: "range",
											stroke: "var(--color-muted-foreground)",
											fontSize: 11,
											tickLine: false,
											axisLine: false
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
											stroke: "var(--color-muted-foreground)",
											fontSize: 11,
											tickLine: false,
											axisLine: false,
											allowDecimals: false
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: tooltip }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
											dataKey: "count",
											fill: "var(--color-primary)",
											radius: [
												6,
												6,
												0,
												0
											]
										})
									]
								})
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "lg:col-span-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
							title: "Recent employees",
							hint: "Latest additions"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecentList, { employees: employees.slice(0, 6) })]
					})
				]
			})
		]
	});
}
var CHART = [
	"var(--color-primary)",
	"var(--color-success)",
	"var(--color-warning)",
	"var(--color-destructive)",
	"var(--color-chart-5)"
];
var tooltip = {
	background: "var(--color-popover)",
	border: "1px solid var(--color-border)",
	borderRadius: 10,
	fontSize: 12
};
function Card({ children, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: {
			opacity: 0,
			y: 8
		},
		animate: {
			opacity: 1,
			y: 0
		},
		className: `glass rounded-2xl p-4 ${className}`,
		children
	});
}
function Header({ title, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-3 flex items-center justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-sm font-medium",
			children: title
		}), hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[11px] text-muted-foreground",
			children: hint
		})]
	});
}
function Kpi({ icon: Icon, label, value, tone }) {
	const bg = {
		primary: "bg-primary/15 text-primary",
		success: "bg-success/15 text-success",
		warning: "bg-warning/15 text-warning",
		destructive: "bg-destructive/15 text-destructive"
	}[tone];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		whileHover: { y: -2 },
		className: "glass rounded-2xl p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `grid h-9 w-9 place-items-center rounded-lg ${bg}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 text-2xl font-semibold tracking-tight",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs text-muted-foreground",
				children: label
			})
		]
	});
}
function RecentList({ employees }) {
	if (!employees.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "py-10 text-center text-sm text-muted-foreground",
		children: "No employees yet. Add your first one."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "divide-y divide-border",
		children: employees.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "flex items-center gap-3 py-2.5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
					url: e.profile_image,
					name: `${e.first_name} ${e.last_name}`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "truncate text-sm font-medium",
						children: [
							e.first_name,
							" ",
							e.last_name
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "truncate text-xs text-muted-foreground",
						children: e.email
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hidden text-xs text-muted-foreground sm:block",
					children: e.department || "—"
				})
			]
		}, e.id))
	});
}
function Avatar({ url, name }) {
	if (url) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: url,
		alt: name,
		className: "h-8 w-8 rounded-full object-cover"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-primary to-primary-glow text-[11px] font-semibold text-primary-foreground",
		children: name.split(" ").filter(Boolean).map((n) => n[0]).join("").slice(0, 2).toUpperCase() || "?"
	});
}
function EmptyChart() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid h-full place-items-center text-xs text-muted-foreground",
		children: "No data yet"
	});
}
function Skeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-[60vh] place-items-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-6 w-6 animate-spin text-muted-foreground" })
	});
}
function ErrorState({ message }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-lg p-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "glass rounded-2xl p-6 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-lg font-semibold",
				children: "Failed to load"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: message
			})]
		})
	});
}
function buildGrowth(employees) {
	const now = /* @__PURE__ */ new Date();
	const buckets = [];
	for (let i = 5; i >= 0; i--) {
		const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
		buckets.push({
			label: d.toLocaleString("en", { month: "short" }),
			count: 0
		});
	}
	for (const e of employees) {
		const d = new Date(e.created_at);
		const idx = 5 - (now.getFullYear() * 12 + now.getMonth() - (d.getFullYear() * 12 + d.getMonth()));
		if (idx >= 0 && idx < 6) buckets[idx].count += 1;
	}
	let running = 0;
	return buckets.map((b) => {
		running += b.count;
		return {
			label: b.label,
			count: running
		};
	});
}
function buildSalaryBuckets(employees) {
	return [
		{
			range: "<30k",
			min: 0,
			max: 3e4
		},
		{
			range: "30–60k",
			min: 3e4,
			max: 6e4
		},
		{
			range: "60–100k",
			min: 6e4,
			max: 1e5
		},
		{
			range: "100–150k",
			min: 1e5,
			max: 15e4
		},
		{
			range: "150k+",
			min: 15e4,
			max: Infinity
		}
	].map((r) => ({
		range: r.range,
		count: employees.filter((e) => e.salary != null && e.salary >= r.min && e.salary < r.max).length
	}));
}
//#endregion
export { DashboardPage as component };
