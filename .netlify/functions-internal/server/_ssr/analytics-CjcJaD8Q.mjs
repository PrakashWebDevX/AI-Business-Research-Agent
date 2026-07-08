import { E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { t as AppShell } from "./AppShell-BhUDBud7.mjs";
import { a as YAxis, c as Line, d as Pie, f as Cell, i as LineChart, l as CartesianGrid, m as Tooltip, n as PieChart, o as XAxis, p as ResponsiveContainer, r as BarChart, s as Area, t as AreaChart, u as Bar } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/analytics-CjcJaD8Q.js
var import_jsx_runtime = require_jsx_runtime();
var days = Array.from({ length: 30 }).map((_, i) => ({
	d: `${i + 1}`,
	sql: Math.round(30 + Math.sin(i / 3) * 12 + Math.random() * 10),
	web: Math.round(15 + Math.cos(i / 4) * 8 + Math.random() * 6),
	hybrid: Math.round(6 + Math.random() * 5),
	ms: Math.round(1200 + Math.sin(i / 2) * 200 + Math.random() * 150)
}));
var dbActivity = [
	{
		name: "SELECT",
		value: 68
	},
	{
		name: "JOIN",
		value: 42
	},
	{
		name: "AGG",
		value: 31
	},
	{
		name: "SUBQ",
		value: 18
	},
	{
		name: "CTE",
		value: 12
	}
];
var research = [
	{
		name: "News",
		value: 34,
		c: "var(--color-primary)"
	},
	{
		name: "Docs",
		value: 22,
		c: "var(--color-success)"
	},
	{
		name: "Filings",
		value: 14,
		c: "var(--color-warning)"
	},
	{
		name: "Social",
		value: 9,
		c: "var(--color-destructive)"
	}
];
function AnalyticsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-7xl px-4 py-8 md:px-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-semibold tracking-tight md:text-3xl",
				children: "Analytics"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "30-day rollup of agent activity and workspace performance."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 gap-3 lg:grid-cols-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					className: "lg:col-span-4",
					title: "Query trends",
					hint: "stacked by agent",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-72",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
								data: days,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
											id: "s1",
											x1: "0",
											y1: "0",
											x2: "0",
											y2: "1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
												offset: "0%",
												stopColor: "var(--color-success)",
												stopOpacity: .55
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
												offset: "100%",
												stopColor: "var(--color-success)",
												stopOpacity: 0
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
											id: "s2",
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
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
											id: "s3",
											x1: "0",
											y1: "0",
											x2: "0",
											y2: "1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
												offset: "0%",
												stopColor: "var(--color-warning)",
												stopOpacity: .55
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
												offset: "100%",
												stopColor: "var(--color-warning)",
												stopOpacity: 0
											})]
										})
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										stroke: "var(--color-border)",
										strokeDasharray: "3 3",
										vertical: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "d",
										stroke: "var(--color-muted-foreground)",
										fontSize: 11,
										tickLine: false,
										axisLine: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										stroke: "var(--color-muted-foreground)",
										fontSize: 11,
										tickLine: false,
										axisLine: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: ts }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
										stackId: "1",
										type: "monotone",
										dataKey: "sql",
										stroke: "var(--color-success)",
										fill: "url(#s1)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
										stackId: "1",
										type: "monotone",
										dataKey: "web",
										stroke: "var(--color-primary)",
										fill: "url(#s2)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
										stackId: "1",
										type: "monotone",
										dataKey: "hybrid",
										stroke: "var(--color-warning)",
										fill: "url(#s3)"
									})
								]
							})
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					className: "lg:col-span-2",
					title: "Agent share",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-72",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
								data: research,
								dataKey: "value",
								innerRadius: 50,
								outerRadius: 90,
								paddingAngle: 3,
								children: research.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: s.c }, i))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: ts })] })
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					className: "lg:col-span-3",
					title: "Response time (ms)",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-64",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
								data: days,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										stroke: "var(--color-border)",
										strokeDasharray: "3 3",
										vertical: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "d",
										stroke: "var(--color-muted-foreground)",
										fontSize: 11,
										tickLine: false,
										axisLine: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										stroke: "var(--color-muted-foreground)",
										fontSize: 11,
										tickLine: false,
										axisLine: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: ts }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
										type: "monotone",
										dataKey: "ms",
										stroke: "var(--color-primary)",
										strokeWidth: 2,
										dot: false
									})
								]
							})
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					className: "lg:col-span-3",
					title: "Database activity",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-64",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								data: dbActivity,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										stroke: "var(--color-border)",
										strokeDasharray: "3 3",
										vertical: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "name",
										stroke: "var(--color-muted-foreground)",
										fontSize: 11,
										tickLine: false,
										axisLine: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										stroke: "var(--color-muted-foreground)",
										fontSize: 11,
										tickLine: false,
										axisLine: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: ts }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "value",
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
					})
				})
			]
		})]
	}) });
}
var ts = {
	background: "var(--color-popover)",
	border: "1px solid var(--color-border)",
	borderRadius: 10,
	fontSize: 12
};
function Panel({ title, hint, children, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: {
			opacity: 0,
			y: 8
		},
		animate: {
			opacity: 1,
			y: 0
		},
		className: `glass rounded-2xl p-4 ${className}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-sm font-medium",
				children: title
			}), hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[11px] text-muted-foreground",
				children: hint
			})]
		}), children]
	});
}
//#endregion
export { AnalyticsPage as component };
