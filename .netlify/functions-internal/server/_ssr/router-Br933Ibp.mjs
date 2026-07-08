import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, j as redirect, m as createFileRoute, p as lazyRouteComponent, s as Scripts, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Route$15 } from "../_id-BWu_Bu4z.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as Route$16 } from "../_id.edit-BxAjIRfs.mjs";
import { i as objectType, o as stringType } from "../_libs/zod.mjs";
import { t as AuthProvider } from "./useAuth-BK1by1Rh.mjs";
import { t as ThemeProvider } from "./useTheme-BO-0R1eM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-Br933Ibp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-56QJDF2S.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/dashboard",
						className: "inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90",
						children: "Go to dashboard"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold",
					children: "Something went wrong"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: error.message
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent",
						children: "Home"
					})]
				})
			]
		})
	});
}
var Route$14 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Employee Management System" },
			{
				name: "description",
				content: "Modern employee management platform — manage your workforce with beautiful dashboards, analytics, and secure Supabase-powered auth."
			},
			{
				property: "og:title",
				content: "Employee Management System"
			},
			{
				property: "og:description",
				content: "Manage your workforce with a modern SaaS dashboard."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "dark",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$14.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
			position: "top-right",
			toastOptions: { style: {
				background: "var(--color-popover)",
				color: "var(--color-popover-foreground)",
				border: "1px solid var(--color-border)"
			} }
		})] }) })
	});
}
var $$splitComponentImporter$12 = () => import("./sql-DZ1Xaz-3.mjs");
var Route$13 = createFileRoute("/sql")({
	head: () => ({ meta: [{ title: "SQL Queries · AI Business Research Agent" }, {
		name: "description",
		content: "Run natural-language SQL against your warehouse."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./saved-KFB9_zCO.mjs");
var Route$12 = createFileRoute("/saved")({
	head: () => ({ meta: [{ title: "Saved Chats · AI Business Research Agent" }, {
		name: "description",
		content: "Search and manage your saved conversations."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./reset-password-9Y2DHfEL.mjs");
var Route$11 = createFileRoute("/reset-password")({
	ssr: false,
	head: () => ({ meta: [{ title: "Reset password · EMS" }] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./research-DsXkntXg.mjs");
var Route$10 = createFileRoute("/research")({
	head: () => ({ meta: [{ title: "Research · AI Business Research Agent" }, {
		name: "description",
		content: "Live web research with cited sources and synthesis."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./help-dj1qso0_.mjs");
var Route$9 = createFileRoute("/help")({
	head: () => ({ meta: [{ title: "Help · AI Business Research Agent" }, {
		name: "description",
		content: "Docs, shortcuts, and support for the AI Business Research Agent."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./exports-BvhVQBf_.mjs");
var Route$8 = createFileRoute("/exports")({
	head: () => ({ meta: [{ title: "Exports · AI Business Research Agent" }, {
		name: "description",
		content: "Download conversation, SQL, and research artifacts."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./auth-t8UW70C8.mjs");
var searchSchema = objectType({ redirect: stringType().optional() });
var Route$7 = createFileRoute("/auth")({
	ssr: false,
	validateSearch: searchSchema,
	head: () => ({ meta: [{ title: "Sign in · Employee Management System" }, {
		name: "description",
		content: "Sign in to your Employee Management workspace."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./analytics-CjcJaD8Q.mjs");
var Route$6 = createFileRoute("/analytics")({
	head: () => ({ meta: [{ title: "Analytics · AI Business Research Agent" }, {
		name: "description",
		content: "Deep-dive analytics on agent usage, response time, and query patterns."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./route-D-nIrM7u.mjs");
var Route$5 = createFileRoute("/_authenticated")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var Route$4 = createFileRoute("/")({ beforeLoad: () => {
	throw redirect({ to: "/dashboard" });
} });
var $$splitComponentImporter$3 = () => import("./settings-g0EHDZwb.mjs");
var Route$3 = createFileRoute("/_authenticated/settings")({
	head: () => ({ meta: [{ title: "Settings · EMS" }] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./dashboard-BE_SxVgr.mjs");
var Route$2 = createFileRoute("/_authenticated/dashboard")({
	head: () => ({ meta: [{ title: "Dashboard · EMS" }] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./employees-BoRJcz4H.mjs");
var Route$1 = createFileRoute("/_authenticated/employees/")({
	head: () => ({ meta: [{ title: "Employees · EMS" }] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./new-eVIX362A.mjs");
var Route = createFileRoute("/_authenticated/employees/new")({
	head: () => ({ meta: [{ title: "New employee · EMS" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var SqlRoute = Route$13.update({
	id: "/sql",
	path: "/sql",
	getParentRoute: () => Route$14
});
var SavedRoute = Route$12.update({
	id: "/saved",
	path: "/saved",
	getParentRoute: () => Route$14
});
var ResetPasswordRoute = Route$11.update({
	id: "/reset-password",
	path: "/reset-password",
	getParentRoute: () => Route$14
});
var ResearchRoute = Route$10.update({
	id: "/research",
	path: "/research",
	getParentRoute: () => Route$14
});
var HelpRoute = Route$9.update({
	id: "/help",
	path: "/help",
	getParentRoute: () => Route$14
});
var ExportsRoute = Route$8.update({
	id: "/exports",
	path: "/exports",
	getParentRoute: () => Route$14
});
var AuthRoute = Route$7.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$14
});
var AnalyticsRoute = Route$6.update({
	id: "/analytics",
	path: "/analytics",
	getParentRoute: () => Route$14
});
var AuthenticatedRouteRoute = Route$5.update({
	id: "/_authenticated",
	getParentRoute: () => Route$14
});
var IndexRoute = Route$4.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$14
});
var AuthenticatedSettingsRoute = Route$3.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedDashboardRoute = Route$2.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedEmployeesIndexRoute = Route$1.update({
	id: "/employees/",
	path: "/employees/",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedEmployeesNewRoute = Route.update({
	id: "/employees/new",
	path: "/employees/new",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedEmployeesIdRoute = Route$15.update({
	id: "/employees/$id",
	path: "/employees/$id",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedEmployeesIdRouteChildren = { AuthenticatedEmployeesIdEditRoute: Route$16.update({
	id: "/edit",
	path: "/edit",
	getParentRoute: () => AuthenticatedEmployeesIdRoute
}) };
var AuthenticatedRouteRouteChildren = {
	AuthenticatedDashboardRoute,
	AuthenticatedSettingsRoute,
	AuthenticatedEmployeesIdRoute: AuthenticatedEmployeesIdRoute._addFileChildren(AuthenticatedEmployeesIdRouteChildren),
	AuthenticatedEmployeesNewRoute,
	AuthenticatedEmployeesIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren),
	AnalyticsRoute,
	AuthRoute,
	ExportsRoute,
	HelpRoute,
	ResearchRoute,
	ResetPasswordRoute,
	SavedRoute,
	SqlRoute
};
var routeTree = Route$14._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
