import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-PwNqyxv_.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { H as Bookmark, S as LoaderCircle, c as Sparkles, u as Send } from "../_libs/lucide-react.mjs";
import { n as sessionsService, t as savedService } from "./sessionsService-BL_l5wKS.mjs";
import { t as chatService } from "./chatService-B8FzW_mU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/chat-Bu42Ur8o.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ChatPage() {
	const [messages, setMessages] = (0, import_react.useState)([]);
	const [input, setInput] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const sessionId = (0, import_react.useRef)(crypto.randomUUID());
	const scrollRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		scrollRef.current?.scrollTo({
			top: scrollRef.current.scrollHeight,
			behavior: "smooth"
		});
	}, [messages]);
	async function send() {
		const q = input.trim();
		if (!q || loading) return;
		setInput("");
		const now = (/* @__PURE__ */ new Date()).toISOString();
		setMessages((m) => [...m, {
			role: "user",
			content: q,
			createdAt: now
		}]);
		setLoading(true);
		try {
			const r = await chatService.ask(q, sessionId.current);
			const reply = r.reply || r.message || r.content || (typeof r.data === "string" ? r.data : JSON.stringify(r.data ?? r, null, 2));
			const at = (/* @__PURE__ */ new Date()).toISOString();
			setMessages((m) => {
				const next = [...m, {
					role: "assistant",
					content: String(reply),
					createdAt: at
				}];
				sessionsService.save({
					id: sessionId.current,
					title: next[0]?.content.slice(0, 60) || "Chat",
					createdAt: now,
					messages: next
				});
				return next;
			});
		} catch (e) {
			toast.error("Chat failed", { description: e.message });
		} finally {
			setLoading(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex h-[calc(100vh-4rem)] max-w-4xl flex-col px-4 md:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-lg font-semibold",
						children: "AI Chat"
					})]
				}), messages.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					variant: "outline",
					onClick: () => {
						savedService.save({
							id: crypto.randomUUID(),
							title: messages[0]?.content.slice(0, 60) || "Chat",
							kind: "chat",
							createdAt: (/* @__PURE__ */ new Date()).toISOString(),
							payload: messages
						});
						toast.success("Saved to reports");
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "mr-2 h-4 w-4" }), " Save"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: scrollRef,
				className: "flex-1 space-y-4 overflow-y-auto rounded-2xl border border-border bg-card/40 p-4 backdrop-blur",
				children: [
					messages.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-full place-items-center text-center text-sm text-muted-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "mx-auto mb-3 h-8 w-8 text-primary/70" }), "Ask anything — business insights, market research, competitor analysis…"] })
					}),
					messages.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: m.role === "user" ? "flex justify-end" : "flex justify-start",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm " + (m.role === "user" ? "bg-primary text-primary-foreground" : "border border-border bg-background"),
							children: m.content
						})
					}, i)),
					loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-sm text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), " Thinking…"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end gap-2 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: input,
					onChange: (e) => setInput(e.target.value),
					onKeyDown: (e) => {
						if (e.key === "Enter" && !e.shiftKey) {
							e.preventDefault();
							send();
						}
					},
					rows: 2,
					placeholder: "Ask a business research question…",
					className: "min-h-[52px] flex-1 resize-none rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: send,
					disabled: loading || !input.trim(),
					className: "h-[52px]",
					children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4" })
				})]
			})
		]
	});
}
//#endregion
export { ChatPage as component };
