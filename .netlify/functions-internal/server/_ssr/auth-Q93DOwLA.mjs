import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useNavigate, g as Link, v as useSearch } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { r as cn, t as Button } from "./button-PwNqyxv_.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { S as LoaderCircle, U as ArrowRight, n as Users, x as Lock, y as Mail } from "../_libs/lucide-react.mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { t as Input } from "./input-uzm9g8Y7.mjs";
import { t as Label } from "./label-BeT0bXvu.mjs";
import { n as useForm, t } from "../_libs/@hookform/resolvers+[...].mjs";
import { n as useAuth } from "./useAuth-BK1by1Rh.mjs";
import { t as authService } from "./authService-D2p47ZSo.mjs";
import { i as signupSchema, n as loginSchema, t as forgotSchema } from "./auth-BNbGfHUP.mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-Q93DOwLA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Tabs = Root2;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
	ref,
	className: cn("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", className),
	...props
}));
TabsList.displayName = List.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
	ref,
	className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow", className),
	...props
}));
TabsTrigger.displayName = Trigger.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
	ref,
	className: cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className),
	...props
}));
TabsContent.displayName = Content.displayName;
function AuthPage() {
	const { user, loading } = useAuth();
	const navigate = useNavigate();
	const search = useSearch({ from: "/auth" });
	(0, import_react.useEffect)(() => {
		if (!loading && user) navigate({ to: search.redirect ?? "/dashboard" });
	}, [
		user,
		loading,
		navigate,
		search.redirect
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex min-h-screen items-center justify-center px-4 py-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuroraBackground, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				y: 20
			},
			animate: {
				opacity: 1,
				y: 0
			},
			transition: { duration: .5 },
			className: "glass relative z-10 w-full max-w-md rounded-2xl p-8 shadow-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-6 flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-lg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-lg font-semibold tracking-tight",
						children: "Employee Management"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Sign in to your workspace"
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
					defaultValue: "login",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
							className: "grid w-full grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "login",
									children: "Sign in"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "signup",
									children: "Sign up"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "forgot",
									children: "Reset"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "login",
							className: "mt-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoginForm, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "signup",
							className: "mt-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignupForm, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "forgot",
							className: "mt-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ForgotForm, {})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "my-5 flex items-center gap-3 text-xs text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px flex-1 bg-border" }),
						"OR",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px flex-1 bg-border" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoogleButton, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-center text-xs text-muted-foreground",
					children: "By continuing you agree to our terms and privacy policy."
				})
			]
		})]
	});
}
function LoginForm() {
	const [loading, setLoading] = (0, import_react.useState)(false);
	const navigate = useNavigate();
	const { register, handleSubmit, formState: { errors } } = useForm({ resolver: t(loginSchema) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: handleSubmit(async (v) => {
			setLoading(true);
			try {
				await authService.signInWithPassword(v.email, v.password);
				toast.success("Welcome back!");
				navigate({ to: "/dashboard" });
			} catch (e) {
				toast.error("Sign in failed", { description: e.message });
			} finally {
				setLoading(false);
			}
		}),
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldEmail, {
				register: register("email"),
				error: errors.email?.message
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldPassword, {
				register: register("password"),
				error: errors.password?.message
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				disabled: loading,
				className: "w-full",
				children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Sign in ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-2 h-4 w-4" })] })
			})
		]
	});
}
function SignupForm() {
	const [loading, setLoading] = (0, import_react.useState)(false);
	const { register, handleSubmit, formState: { errors } } = useForm({ resolver: t(signupSchema) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: handleSubmit(async (v) => {
			setLoading(true);
			try {
				await authService.signUp(v.email, v.password);
				toast.success("Check your email to confirm your account.");
			} catch (e) {
				toast.error("Sign up failed", { description: e.message });
			} finally {
				setLoading(false);
			}
		}),
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldEmail, {
				register: register("email"),
				error: errors.email?.message
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldPassword, {
				register: register("password"),
				error: errors.password?.message
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				disabled: loading,
				className: "w-full",
				children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : "Create account"
			})
		]
	});
}
function ForgotForm() {
	const [loading, setLoading] = (0, import_react.useState)(false);
	const { register, handleSubmit, formState: { errors } } = useForm({ resolver: t(forgotSchema) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: handleSubmit(async (v) => {
			setLoading(true);
			try {
				await authService.forgotPassword(v.email);
				toast.success("Reset link sent to your email.");
			} catch (e) {
				toast.error("Reset failed", { description: e.message });
			} finally {
				setLoading(false);
			}
		}),
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldEmail, {
				register: register("email"),
				error: errors.email?.message
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				disabled: loading,
				className: "w-full",
				children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : "Send reset link"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-center text-xs text-muted-foreground",
				children: ["Have an account? ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					className: "text-primary hover:underline",
					to: "/auth",
					children: "Sign in"
				})]
			})
		]
	});
}
function FieldEmail({ register, error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Email" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					...register,
					type: "email",
					placeholder: "you@company.com",
					className: "pl-9"
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-destructive",
				children: error
			})
		]
	});
}
function FieldPassword({ register, error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Password" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					...register,
					type: "password",
					placeholder: "••••••••",
					className: "pl-9"
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-destructive",
				children: error
			})
		]
	});
}
function GoogleButton() {
	const [loading, setLoading] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		variant: "outline",
		className: "w-full",
		onClick: async () => {
			setLoading(true);
			try {
				await authService.signInWithGoogle();
			} catch (e) {
				toast.error("Google sign in failed", { description: e.message });
				setLoading(false);
			}
		},
		disabled: loading,
		children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoogleIcon, {}),
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "ml-2",
				children: "Continue with Google"
			})
		] })
	});
}
function GoogleIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		className: "h-4 w-4",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "#EA4335",
			d: "M12 10.2v3.9h5.5c-.24 1.4-1.7 4.1-5.5 4.1-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.9 3.4 14.7 2.4 12 2.4 6.7 2.4 2.4 6.7 2.4 12S6.7 21.6 12 21.6c6.9 0 9.5-4.8 9.5-9.7 0-.7-.1-1.2-.2-1.7H12z"
		})
	});
}
function AuroraBackground() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"aria-hidden": true,
		className: "pointer-events-none absolute inset-0 overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-primary/25 blur-3xl" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-0 right-0 h-[400px] w-[600px] rounded-full bg-fuchsia-500/20 blur-3xl" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-10 left-0 h-[300px] w-[500px] rounded-full bg-cyan-400/20 blur-3xl" })
		]
	});
}
//#endregion
export { AuthPage as component };
