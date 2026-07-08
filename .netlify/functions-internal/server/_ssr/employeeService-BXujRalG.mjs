import { t as supabase } from "./supabase-DaTckOMQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/employeeService-BXujRalG.js
var TABLE = "employees";
var employeeService = {
	async list(params = {}) {
		const { search = "", department = "", status = "all", sortBy = "created_at", sortDir = "desc", page = 1, pageSize = 10 } = params;
		let q = supabase.from(TABLE).select("*", { count: "exact" });
		if (search) {
			const s = `%${search}%`;
			q = q.or(`first_name.ilike.${s},last_name.ilike.${s},email.ilike.${s},employee_id.ilike.${s},department.ilike.${s},designation.ilike.${s}`);
		}
		if (department) q = q.eq("department", department);
		if (status && status !== "all") q = q.eq("status", status);
		q = q.order(sortBy, { ascending: sortDir === "asc" });
		const from = (page - 1) * pageSize;
		const to = from + pageSize - 1;
		q = q.range(from, to);
		const { data, error, count } = await q;
		if (error) throw error;
		return {
			data: data ?? [],
			count: count ?? 0
		};
	},
	async getAll() {
		const { data, error } = await supabase.from(TABLE).select("*").order("created_at", { ascending: false });
		if (error) throw error;
		return data ?? [];
	},
	async get(id) {
		const { data, error } = await supabase.from(TABLE).select("*").eq("id", id).single();
		if (error) throw error;
		return data;
	},
	async create(input) {
		const { data, error } = await supabase.from(TABLE).insert(input).select().single();
		if (error) throw error;
		return data;
	},
	async update(id, input) {
		const { data, error } = await supabase.from(TABLE).update({
			...input,
			updated_at: (/* @__PURE__ */ new Date()).toISOString()
		}).eq("id", id).select().single();
		if (error) throw error;
		return data;
	},
	async remove(id) {
		const { error } = await supabase.from(TABLE).delete().eq("id", id);
		if (error) throw error;
	},
	async bulkRemove(ids) {
		if (!ids.length) return;
		const { error } = await supabase.from(TABLE).delete().in("id", ids);
		if (error) throw error;
	},
	async departments() {
		const { data, error } = await supabase.from(TABLE).select("department");
		if (error) throw error;
		const set = /* @__PURE__ */ new Set();
		for (const r of data ?? []) if (r.department) set.add(r.department);
		return Array.from(set).sort();
	},
	async stats() {
		const { data, error } = await supabase.from(TABLE).select("id, status, department, salary, joining_date, first_name, last_name, email, profile_image, created_at");
		if (error) throw error;
		return data ?? [];
	},
	async bulkInsert(rows) {
		if (!rows.length) return { inserted: 0 };
		const { error, count } = await supabase.from(TABLE).insert(rows, { count: "exact" });
		if (error) throw error;
		return { inserted: count ?? rows.length };
	}
};
//#endregion
export { employeeService as t };
