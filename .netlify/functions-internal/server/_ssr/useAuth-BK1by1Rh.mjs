import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as supabase } from "./supabase-DaTckOMQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useAuth-BK1by1Rh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Ctx = (0, import_react.createContext)({
	user: null,
	session: null,
	loading: true
});
function AuthProvider({ children }) {
	const [session, setSession] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		let mounted = true;
		const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
			if (!mounted) return;
			setSession(s);
			setLoading(false);
		});
		supabase.auth.getSession().then(({ data }) => {
			if (!mounted) return;
			setSession(data.session);
			setLoading(false);
		});
		return () => {
			mounted = false;
			subscription.unsubscribe();
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ctx.Provider, {
		value: {
			user: session?.user ?? null,
			session,
			loading
		},
		children
	});
}
function useAuth() {
	return (0, import_react.useContext)(Ctx);
}
//#endregion
export { useAuth as n, AuthProvider as t };
