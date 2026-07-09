import { t as api } from "./api-CZU_4io-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sessionsService-BL_l5wKS.js
var SAVED_KEY = "abra.saved.v1";
/**
* Sessions are persisted by the FastAPI backend:
*   GET    /api/sessions
*   POST   /api/sessions
*   GET    /api/sessions/{id}
*   DELETE /api/sessions/{id}
*/
var sessionsService = {
	async list() {
		try {
			return await api("/api/sessions");
		} catch {
			return [];
		}
	},
	async get(id) {
		try {
			return await api(`/api/sessions/${id}`);
		} catch {
			return null;
		}
	},
	async save(s) {
		try {
			await api("/api/sessions", {
				method: "POST",
				body: s
			});
		} catch {}
	},
	async remove(id) {
		try {
			await api(`/api/sessions/${id}`, { method: "DELETE" });
		} catch {}
	}
};
function readLocal(k, fallback) {
	if (typeof window === "undefined") return fallback;
	try {
		const raw = localStorage.getItem(k);
		return raw ? JSON.parse(raw) : fallback;
	} catch {
		return fallback;
	}
}
function writeLocal(k, v) {
	if (typeof window === "undefined") return;
	localStorage.setItem(k, JSON.stringify(v));
}
var savedService = {
	list() {
		return readLocal(SAVED_KEY, []);
	},
	save(r) {
		const all = savedService.list().filter((x) => x.id !== r.id);
		all.unshift(r);
		writeLocal(SAVED_KEY, all.slice(0, 200));
	},
	remove(id) {
		writeLocal(SAVED_KEY, savedService.list().filter((s) => s.id !== id));
	}
};
//#endregion
export { sessionsService as n, savedService as t };
