export interface Department {
  id: number;
  name: string;
}

export interface Country {
  id: number;
  name: string;
  currency: string;
}

export interface Salary {
  id: number;
  baseSalary: number;
  currency: string;
  isCurrent: boolean;
  effectiveFrom: string;
  effectiveTo?: string;
}

export interface Employee {
  id: number;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  designation: string;

  department: Department;
  country: Country;

  salaries: Salary[];

  createdAt: string;
  updatedAt: string;
}

export interface EmployeeListResult {
  items: Employee[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface EmployeeApiResponse {
  success: boolean;
  message: string;
  data: EmployeeListResult;
}

export interface EmployeeQuery {
  page: number;
  limit: number;
  search?: string;
  department?: string;
  country?: string;
  designation?: string;
}