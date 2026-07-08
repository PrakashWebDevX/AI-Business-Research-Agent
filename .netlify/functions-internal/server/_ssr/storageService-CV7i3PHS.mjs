import { t as supabase } from "./supabase-DaTckOMQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/storageService-CV7i3PHS.js
var BUCKET = "employee-images";
var storageService = {
	async uploadProfileImage(file, employeeId) {
		const ext = file.name.split(".").pop() || "jpg";
		const path = `${employeeId}/${Date.now()}.${ext}`;
		const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
			upsert: true,
			contentType: file.type
		});
		if (error) throw error;
		const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
		return data.publicUrl;
	},
	async deleteByPublicUrl(publicUrl) {
		if (!publicUrl) return;
		const marker = `/${BUCKET}/`;
		const idx = publicUrl.indexOf(marker);
		if (idx === -1) return;
		const path = publicUrl.substring(idx + marker.length);
		await supabase.storage.from(BUCKET).remove([path]);
	}
};
//#endregion
export { storageService as t };
