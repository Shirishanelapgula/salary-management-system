export interface EmployeeQuery {
  page?: number;
  limit?: number;
  search?: string;
  department?: string;
  country?: string;
  designation?: string;
  sort?: "firstName" | "lastName" | "createdAt";
  order?: "asc" | "desc";
}

export interface CreateEmployeeRequest {
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  designation: string;
  departmentId: number;
  countryId: number;
  baseSalary: number;
}

export interface UpdateEmployeeRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  designation?: string;
  departmentId?: number;
  countryId?: number;
  baseSalary?: number;
}