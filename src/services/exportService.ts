function download(filename: string, blob: Blob) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function toCSV(rows: Record<string, unknown>[]): string {
  if (!rows.length) return "";
  const cols = Array.from(
    rows.reduce((set, r) => {
      Object.keys(r).forEach((k) => set.add(k));
      return set;
    }, new Set<string>()),
  );
  const esc = (v: unknown) => {
    const s = v == null ? "" : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return [cols.join(","), ...rows.map((r) => cols.map((c) => esc(r[c])).join(","))].join("\n");
}

export const exportService = {
  json(name: string, data: unknown) {
    download(`${name}.json`, new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }));
  },
  csv(name: string, rows: Record<string, unknown>[]) {
    download(`${name}.csv`, new Blob([toCSV(rows)], { type: "text/csv" }));
  },
  excel(name: string, rows: Record<string, unknown>[]) {
    // Excel-compatible CSV with BOM
    download(
      `${name}.xls`,
      new Blob(["\uFEFF" + toCSV(rows)], { type: "application/vnd.ms-excel" }),
    );
  },
};
