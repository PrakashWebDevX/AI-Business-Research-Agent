import Papa from "papaparse";
import * as XLSX from "xlsx";
import type { Employee, EmployeeInput } from "@/types/employee";

const EXPORT_FIELDS: (keyof Employee)[] = [
  "employee_id",
  "first_name",
  "last_name",
  "email",
  "phone",
  "gender",
  "department",
  "designation",
  "salary",
  "joining_date",
  "date_of_birth",
  "address",
  "city",
  "state",
  "country",
  "zip_code",
  "status",
];

export function exportEmployeesCSV(employees: Employee[]) {
  const rows = employees.map((e) =>
    Object.fromEntries(EXPORT_FIELDS.map((f) => [f, e[f] ?? ""])),
  );
  const csv = Papa.unparse(rows);
  triggerDownload(new Blob([csv], { type: "text/csv;charset=utf-8" }), "employees.csv");
}

export function exportEmployeesXLSX(employees: Employee[]) {
  const rows = employees.map((e) =>
    Object.fromEntries(EXPORT_FIELDS.map((f) => [f, e[f] ?? ""])),
  );
  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Employees");
  const buf = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  triggerDownload(new Blob([buf], { type: "application/octet-stream" }), "employees.xlsx");
}

export function parseEmployeesCSV(file: File): Promise<EmployeeInput[]> {
  return new Promise((resolve, reject) => {
    Papa.parse<Record<string, string>>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (res) => {
        try {
          const rows: EmployeeInput[] = res.data.map((r) => ({
            employee_id: r.employee_id?.trim() || "",
            first_name: r.first_name?.trim() || "",
            last_name: r.last_name?.trim() || "",
            email: r.email?.trim() || "",
            phone: r.phone || null,
            gender: r.gender || null,
            department: r.department || null,
            designation: r.designation || null,
            salary: r.salary ? Number(r.salary) : null,
            joining_date: r.joining_date || null,
            date_of_birth: r.date_of_birth || null,
            address: r.address || null,
            city: r.city || null,
            state: r.state || null,
            country: r.country || null,
            zip_code: r.zip_code || null,
            status:
              (r.status?.toLowerCase() as "active" | "inactive" | "on_leave") || "active",
            profile_image: null,
            notes: r.notes || null,
          }));
          resolve(rows.filter((r) => r.employee_id && r.email));
        } catch (e) {
          reject(e);
        }
      },
      error: reject,
    });
  });
}

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
