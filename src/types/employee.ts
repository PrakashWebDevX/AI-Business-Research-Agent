export type EmployeeStatus = "active" | "inactive" | "on_leave";

export interface Employee {
  id: string;
  employee_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  gender: string | null;
  department: string | null;
  designation: string | null;
  salary: number | null;
  joining_date: string | null;
  date_of_birth: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  zip_code: string | null;
  status: EmployeeStatus;
  profile_image: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export type EmployeeInput = Omit<Employee, "id" | "created_at" | "updated_at">;

export interface EmployeeListParams {
  search?: string;
  department?: string;
  status?: EmployeeStatus | "all";
  sortBy?: keyof Employee;
  sortDir?: "asc" | "desc";
  page?: number;
  pageSize?: number;
}
