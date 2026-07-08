import { t as supabase } from "./supabase-DaTckOMQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/authService-D2p47ZSo.js
var authService = {
	async signInWithPassword(email, password) {
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password
		});
		if (error) throw error;
		return data;
	},
	async signUp(email, password) {
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: { emailRedirectTo: `${window.location.origin}/auth` }
		});
		if (error) throw error;
		return data;
	},
	async signInWithGoogle() {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: "google",
			options: { redirectTo: `${window.location.origin}/dashboard` }
		});
		if (error) throw error;
		return data;
	},
	async forgotPassword(email) {
		const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` });
		if (error) throw error;
	},
	async updatePassword(password) {
		const { error } = await supabase.auth.updateUser({ password });
		if (error) throw error;
	},
	async signOut() {
		const { error } = await supabase.auth.signOut();
		if (error) throw error;
	},
	async getSession() {
		const { data } = await supabase.auth.getSession();
		return data.session;
	}
};
//#endregion
export { authService as t };
