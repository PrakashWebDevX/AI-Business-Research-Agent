import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useNavigate, f as Outlet, g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { r as cn, t as Button } from "./button-PwNqyxv_.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { C as LayoutDashboard, H as Bookmark, N as CircleQuestionMark, S as LoaderCircle, _ as Menu, b as LogOut, c as Sparkles, g as MessageSquare, h as Moon, j as Database, k as Download, l as Settings, o as Sun, t as X, w as Globe, z as ChartColumn } from "../_libs/lucide-react.mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion.mjs";
import { n as useAuth } from "./useAuth-BK1by1Rh.mjs";
import { t as authService } from "./authService-D2p47ZSo.mjs";
import { a as DropdownMenuSeparator, i as DropdownMenuLabel, n as DropdownMenuContent, o as DropdownMenuTrigger, r as DropdownMenuItem, t as DropdownMenu } from "./dropdown-menu-CsR71wG4.mjs";
import { n as useTheme } from "./useTheme-BO-0R1eM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/route-fO1kh4UC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var NAV = [
	{
		to: "/dashboard",
		label: "Dashboard",
		icon: LayoutDashboard
	},
	{
		to: "/chat",
		label: "AI Chat",
		icon: MessageSquare
	},
	{
		to: "/sql",
		label: "SQL Agent",
		icon: Database
	},
	{
		to: "/research",
		label: "Web Research",
		icon: Globe
	},
	{
		to: "/analytics",
		label: "Analytics",
		icon: ChartColumn
	},
	{
		to: "/saved",
		label: "Saved Reports",
		icon: Bookmark
	},
	{
		to: "/exports",
		label: "Exports",
		icon: Download
	},
	{
		to: "/settings",
		label: "Settings",
		icon: Settings
	},
	{
		to: "/help",
		label: "Help",
		icon: CircleQuestionMark
	}
];
function AuthedLayout() {
	const { user, loading } = useAuth();
	const navigate = useNavigate();
	const [mobileOpen, setMobileOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!loading && !user) navigate({
			to: "/auth",
			search: { redirect: window.location.pathname }
		});
	}, [
		user,
		loading,
		navigate
	]);
	if (loading || !user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-screen place-items-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-6 w-6 animate-spin text-muted-foreground" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex min-h-screen w-full",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DesktopSidebar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileSidebar, {
				open: mobileOpen,
				onClose: () => setMobileOpen(false)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-1 flex-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, { onMenu: () => setMobileOpen(true) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "min-w-0 flex-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
				})]
			})
		]
	});
}
function DesktopSidebar() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
		className: "sticky top-0 hidden h-screen w-64 shrink-0 border-r border-border bg-sidebar/70 backdrop-blur md:block",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarInner, {})
	});
}
function MobileSidebar({ open, onClose }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		onClick: onClose,
		className: "fixed inset-0 z-40 bg-background/70 backdrop-blur-sm md:hidden"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.aside, {
		initial: { x: -280 },
		animate: { x: 0 },
		exit: { x: -280 },
		transition: {
			type: "spring",
			stiffness: 260,
			damping: 30
		},
		className: "fixed inset-y-0 left-0 z-50 w-64 border-r border-border bg-sidebar md:hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: onClose,
			className: "absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:bg-accent",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarInner, { onNavigate: onClose })]
	})] }) });
}
function SidebarInner({ onNavigate }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/dashboard",
			className: "mb-6 flex items-center gap-3",
			onClick: onNavigate,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-lg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-sm font-semibold tracking-tight",
				children: "AI Research"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[11px] text-muted-foreground",
				children: "Business intelligence agent"
			})] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
			className: "flex-1 space-y-1 overflow-y-auto",
			children: NAV.map((n) => {
				const active = pathname === n.to || pathname.startsWith(n.to + "/");
				const Icon = n.icon;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: n.to,
					onClick: onNavigate,
					className: cn("group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors", active ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-accent hover:text-foreground"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: n.label })]
				}, n.to);
			})
		})]
	});
}
function TopBar({ onMenu }) {
	const { user } = useAuth();
	const { theme, toggle } = useTheme();
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/70 px-4 backdrop-blur md:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "icon",
			variant: "ghost",
			className: "md:hidden",
			onClick: onMenu,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "ml-auto flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "icon",
				variant: "ghost",
				onClick: toggle,
				"aria-label": "Toggle theme",
				children: theme === "dark" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "h-4 w-4" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "flex items-center gap-2 rounded-full border border-border bg-card/60 p-1 pr-3 text-sm hover:bg-accent",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-primary to-primary-glow text-xs font-semibold text-primary-foreground",
						children: (user?.email?.[0] || "U").toUpperCase()
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden max-w-[160px] truncate md:inline",
						children: user?.email
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
				align: "end",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuLabel, {
						className: "max-w-[220px] truncate",
						children: user?.email
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
						onClick: () => navigate({ to: "/settings" }),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "mr-2 h-4 w-4" }), " Settings"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
						onClick: async () => {
							try {
								await authService.signOut();
								toast.success("Signed out");
								navigate({ to: "/auth" });
							} catch (e) {
								toast.error("Sign out failed", { description: e.message });
							}
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "mr-2 h-4 w-4" }), " Sign out"]
					})
				]
			})] })]
		})]
	});
}
//#endregion
export { AuthedLayout as component };
