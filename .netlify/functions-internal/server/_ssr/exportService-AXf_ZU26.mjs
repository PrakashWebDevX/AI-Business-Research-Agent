//#region node_modules/.nitro/vite/services/ssr/assets/exportService-AXf_ZU26.js
function download(filename, blob) {
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	a.remove();
	URL.revokeObjectURL(url);
}
function toCSV(rows) {
	if (!rows.length) return "";
	const cols = Array.from(rows.reduce((set, r) => {
		Object.keys(r).forEach((k) => set.add(k));
		return set;
	}, /* @__PURE__ */ new Set()));
	const esc = (v) => {
		const s = v == null ? "" : String(v);
		return /[",\n]/.test(s) ? `"${s.replace(/"/g, "\"\"")}"` : s;
	};
	return [cols.join(","), ...rows.map((r) => cols.map((c) => esc(r[c])).join(","))].join("\n");
}
var exportService = {
	json(name, data) {
		download(`${name}.json`, new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }));
	},
	csv(name, rows) {
		download(`${name}.csv`, new Blob([toCSV(rows)], { type: "text/csv" }));
	},
	excel(name, rows) {
		download(`${name}.xls`, new Blob(["﻿" + toCSV(rows)], { type: "application/vnd.ms-excel" }));
	}
};
//#endregion
export { exportService as t };
