import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, j as redirect, m as createFileRoute, p as lazyRouteComponent, s as Scripts, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Route$16 } from "../_id-DtfmKEjo.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as Route$17 } from "../_id.edit-CL0COmaf.mjs";
import { i as objectType, o as stringType } from "../_libs/zod.mjs";
import { t as AuthProvider } from "./useAuth-BK1by1Rh.mjs";
import { t as ThemeProvider } from "./useTheme-BO-0R1eM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-9iiWikv6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-DkISHVgI.css";
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
var Route$15 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "AI Business Research Agent" },
			{
				name: "description",
				content: "AI-powered business research agent — chat, SQL, and web research with a FastAPI backend and Supabase auth."
			},
			{
				property: "og:title",
				content: "AI Business Research Agent"
			},
			{
				property: "og:description",
				content: "Chat, query, and research with AI."
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
	const { queryClient } = Route$15.useRouteContext();
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
var $$splitComponentImporter$13 = () => import("./reset-password-qzyX88cW.mjs");
var Route$14 = createFileRoute("/reset-password")({
	ssr: false,
	head: () => ({ meta: [{ title: "Reset password · EMS" }] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./auth-Q93DOwLA.mjs");
var searchSchema = objectType({ redirect: stringType().optional() });
var Route$13 = createFileRoute("/auth")({
	ssr: false,
	validateSearch: searchSchema,
	head: () => ({ meta: [{ title: "Sign in · Employee Management System" }, {
		name: "description",
		content: "Sign in to your Employee Management workspace."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./route-fO1kh4UC.mjs");
var Route$12 = createFileRoute("/_authenticated")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var Route$11 = createFileRoute("/")({ beforeLoad: () => {
	throw redirect({ to: "/dashboard" });
} });
var $$splitComponentImporter$10 = () => import("./sql-CY2_jSq4.mjs");
var Route$10 = createFileRoute("/_authenticated/sql")({
	head: () => ({ meta: [{ title: "SQL Agent · AI Business Research Agent" }] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./settings-DM_tpd_j.mjs");
var Route$9 = createFileRoute("/_authenticated/settings")({
	head: () => ({ meta: [{ title: "Settings · AI Business Research Agent" }] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./saved-XKf-uC0K.mjs");
var Route$8 = createFileRoute("/_authenticated/saved")({
	head: () => ({ meta: [{ title: "Saved Reports · AI Business Research Agent" }] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./research-Q1SSbdFh.mjs");
var Route$7 = createFileRoute("/_authenticated/research")({
	head: () => ({ meta: [{ title: "Web Research · AI Business Research Agent" }] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./help-CYImnOoK.mjs");
var Route$6 = createFileRoute("/_authenticated/help")({
	head: () => ({ meta: [{ title: "Help · AI Business Research Agent" }] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./exports-uuvtRZBu.mjs");
var Route$5 = createFileRoute("/_authenticated/exports")({
	head: () => ({ meta: [{ title: "Exports · AI Business Research Agent" }] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./dashboard-Byr5o278.mjs");
var Route$4 = createFileRoute("/_authenticated/dashboard")({
	head: () => ({ meta: [{ title: "Dashboard · AI Business Research Agent" }] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./chat-Bu42Ur8o.mjs");
var Route$3 = createFileRoute("/_authenticated/chat")({
	head: () => ({ meta: [{ title: "AI Chat · AI Business Research Agent" }] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./analytics-8P9PnveL.mjs");
var Route$2 = createFileRoute("/_authenticated/analytics")({
	head: () => ({ meta: [{ title: "Analytics · AI Business Research Agent" }] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./employees-BP1sP57K.mjs");
var Route$1 = createFileRoute("/_authenticated/employees/")({
	head: () => ({ meta: [{ title: "Employees · EMS" }] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./new-BuClMkX2.mjs");
var Route = createFileRoute("/_authenticated/employees/new")({
	head: () => ({ meta: [{ title: "New employee · EMS" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var ResetPasswordRoute = Route$14.update({
	id: "/reset-password",
	path: "/reset-password",
	getParentRoute: () => Route$15
});
var AuthRoute = Route$13.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$15
});
var AuthenticatedRouteRoute = Route$12.update({
	id: "/_authenticated",
	getParentRoute: () => Route$15
});
var IndexRoute = Route$11.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$15
});
var AuthenticatedSqlRoute = Route$10.update({
	id: "/sql",
	path: "/sql",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedSettingsRoute = Route$9.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedSavedRoute = Route$8.update({
	id: "/saved",
	path: "/saved",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedResearchRoute = Route$7.update({
	id: "/research",
	path: "/research",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedHelpRoute = Route$6.update({
	id: "/help",
	path: "/help",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedExportsRoute = Route$5.update({
	id: "/exports",
	path: "/exports",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedDashboardRoute = Route$4.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedChatRoute = Route$3.update({
	id: "/chat",
	path: "/chat",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAnalyticsRoute = Route$2.update({
	id: "/analytics",
	path: "/analytics",
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
var AuthenticatedEmployeesIdRoute = Route$16.update({
	id: "/employees/$id",
	path: "/employees/$id",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedEmployeesIdRouteChildren = { AuthenticatedEmployeesIdEditRoute: Route$17.update({
	id: "/edit",
	path: "/edit",
	getParentRoute: () => AuthenticatedEmployeesIdRoute
}) };
var AuthenticatedRouteRouteChildren = {
	AuthenticatedAnalyticsRoute,
	AuthenticatedChatRoute,
	AuthenticatedDashboardRoute,
	AuthenticatedExportsRoute,
	AuthenticatedHelpRoute,
	AuthenticatedResearchRoute,
	AuthenticatedSavedRoute,
	AuthenticatedSettingsRoute,
	AuthenticatedSqlRoute,
	AuthenticatedEmployeesIdRoute: AuthenticatedEmployeesIdRoute._addFileChildren(AuthenticatedEmployeesIdRouteChildren),
	AuthenticatedEmployeesNewRoute,
	AuthenticatedEmployeesIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren),
	AuthRoute,
	ResetPasswordRoute
};
var routeTree = Route$15._addFileChildren(rootRouteChildren)._addFileTypes();
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
